const JSON_HEADERS={'content-type':'application/json; charset=utf-8','cache-control':'no-store'};
const MAX_CODE_SAVE_BYTES=512*1024;
const MAX_ACCOUNT_SAVE_BYTES=512*1024;
const AUTH_COOKIE='ttn_session';
const SESSION_MS=30*24*60*60*1000;
const USER_RE=/^[\p{L}\p{N}][\p{L}\p{N}._-]{2,31}$/u;
const LOCAL_HOSTS=new Set(['localhost','127.0.0.1','0.0.0.0','::1']);
let authSchemaReady=false;
let authSchemaInit=null;

export default {
  async fetch(request,env){
    const url=new URL(request.url);
    if(!hostAllowed(url.hostname,env)) return withSecurity(new Response('Forbidden',{status:403}),url);
    try{
      if(url.pathname.startsWith('/api/')){
        const response=await handleApi(request,env,url);
        return withSecurity(response,url);
      }
      const response=await env.ASSETS.fetch(request);
      return withSecurity(response,url);
    }catch(error){
      console.error('request failed',error);
      return withSecurity(json({error:'Lỗi máy chủ tạm thời'},500),url);
    }
  }
};

function hostAllowed(hostname,env){
  const raw=String(env.ALLOWED_HOSTS||'').trim();
  if(!raw||LOCAL_HOSTS.has(hostname))return true;
  return raw.split(',').map(x=>x.trim().toLowerCase()).filter(Boolean).includes(hostname.toLowerCase());
}

async function handleApi(request,env,url){
  const p=url.pathname.replace(/\/+$/,'');
  if(p==='/api/health'&&request.method==='GET')return json({ok:true,app:'tiem-tra-nho',version:'12.47.11-aunomay',database:Boolean(env.DB)});
  if(!env.DB){
    if(p==='/api/auth/me'&&request.method==='GET'){
      return json({ok:true,authenticated:false,user:null,cloudAvailable:false});
    }
    return json({error:'Database chưa được cấu hình.',cloudAvailable:false},503);
  }

  if(p==='/api/auth/register')return authRegister(request,env,url);
  if(p==='/api/auth/login')return authLogin(request,env,url);
  if(p==='/api/auth/logout')return authLogout(request,env,url);
  if(p==='/api/auth/me')return authMe(request,env);
  if(p==='/api/account/save')return accountSave(request,env,url);

  // Legacy 8-digit backup API kept for backwards compatibility.
  if(p==='/api/save'&&request.method==='POST')return saveCloudCode(request,env);
  if(p==='/api/load'&&request.method==='GET')return loadCloudCode(request,env,url);
  return json({error:'Không tìm thấy API'},404);
}

async function ensureAuthSchema(db){
  if(authSchemaReady)return;
  if(!authSchemaInit){
    authSchemaInit=db.batch([
      db.prepare(`CREATE TABLE IF NOT EXISTS accounts(
        id TEXT PRIMARY KEY,
        username TEXT NOT NULL COLLATE NOCASE UNIQUE,
        display_name TEXT NOT NULL,
        password_hash TEXT NOT NULL,
        password_salt TEXT NOT NULL,
        password_iterations INTEGER NOT NULL,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL
      )`),
      db.prepare(`CREATE TABLE IF NOT EXISTS sessions(
        token_hash TEXT PRIMARY KEY,
        account_id TEXT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
        created_at INTEGER NOT NULL,
        expires_at INTEGER NOT NULL,
        last_seen INTEGER NOT NULL
      )`),
      db.prepare('CREATE INDEX IF NOT EXISTS idx_sessions_account ON sessions(account_id)'),
      db.prepare('CREATE INDEX IF NOT EXISTS idx_sessions_expires ON sessions(expires_at)'),
      db.prepare(`CREATE TABLE IF NOT EXISTS account_cloud_saves(
        account_id TEXT PRIMARY KEY REFERENCES accounts(id) ON DELETE CASCADE,
        save_data TEXT NOT NULL,
        revision INTEGER NOT NULL DEFAULT 1,
        client_updated_at INTEGER,
        updated_at INTEGER NOT NULL
      )`)
    ]).then(()=>{authSchemaReady=true}).catch(e=>{authSchemaInit=null;throw e});
  }
  await authSchemaInit;
}

async function authRegister(request,env,url){
  await ensureAuthSchema(env.DB);
  if(request.method!=='POST')return methodNotAllowed('POST');
  if(!sameOrigin(request,url))return json({error:'Yêu cầu không hợp lệ.'},403);
  const b=await bodyJson(request); if(!b)return json({error:'Dữ liệu không hợp lệ.'},400);
  const username=normalizeUsername(b.username);
  const password=typeof b.password==='string'?b.password:'';
  const displayName=cleanText(b.displayName||username,32).replace(/[<>]/g,'')||username;
  if(!username)return json({error:'Tên đăng nhập cần 3–32 ký tự và chỉ dùng chữ, số, dấu chấm, gạch dưới hoặc gạch ngang.'},400);
  if(password.length<8||password.length>128)return json({error:'Mật khẩu cần từ 8 đến 128 ký tự.'},400);
  const exists=await env.DB.prepare('SELECT 1 FROM accounts WHERE username=? COLLATE NOCASE').bind(username).first();
  if(exists)return json({error:'Tên đăng nhập đã được sử dụng.'},409);
  const salt=randomHex(16),iterations=120000;
  const passwordHash=await hashPassword(password,salt,iterations);
  const now=Date.now(),id=randomHex(16);
  try{
    await env.DB.prepare(`INSERT INTO accounts(id,username,display_name,password_hash,password_salt,password_iterations,created_at,updated_at)
      VALUES(?,?,?,?,?,?,?,?)`).bind(id,username,displayName,passwordHash,salt,iterations,now,now).run();
  }catch(e){
    if(String(e).toLowerCase().includes('unique'))return json({error:'Tên đăng nhập đã được sử dụng.'},409);
    throw e;
  }
  return issueSession(env.DB,request,{id,username,display_name:displayName},201);
}

async function authLogin(request,env,url){
  await ensureAuthSchema(env.DB);
  if(request.method!=='POST')return methodNotAllowed('POST');
  if(!sameOrigin(request,url))return json({error:'Yêu cầu không hợp lệ.'},403);
  const b=await bodyJson(request); if(!b)return json({error:'Dữ liệu không hợp lệ.'},400);
  const username=normalizeUsername(b.username),password=typeof b.password==='string'?b.password:'';
  if(!username||!password)return json({error:'Tên đăng nhập hoặc mật khẩu không đúng.'},401);
  const row=await env.DB.prepare(`SELECT id,username,display_name,password_hash,password_salt,password_iterations
    FROM accounts WHERE username=? COLLATE NOCASE`).bind(username).first();
  if(!row)return json({error:'Tên đăng nhập hoặc mật khẩu không đúng.'},401);
  const got=await hashPassword(password,row.password_salt,Number(row.password_iterations)||120000);
  if(!timingSafeEqual(got,row.password_hash))return json({error:'Tên đăng nhập hoặc mật khẩu không đúng.'},401);
  return issueSession(env.DB,request,row,200);
}

async function authLogout(request,env,url){
  await ensureAuthSchema(env.DB);
  if(request.method!=='POST')return methodNotAllowed('POST');
  if(!sameOrigin(request,url))return json({error:'Yêu cầu không hợp lệ.'},403);
  const raw=cookieValue(request.headers.get('Cookie'),AUTH_COOKIE);
  if(raw){
    const tokenHash=await sha256Hex(raw);
    await env.DB.prepare('DELETE FROM sessions WHERE token_hash=?').bind(tokenHash).run();
  }
  const res=json({ok:true});
  res.headers.append('Set-Cookie',sessionCookie('',request,0));
  return res;
}

async function authMe(request,env){
  await ensureAuthSchema(env.DB);
  if(request.method!=='GET')return methodNotAllowed('GET');
  const user=await sessionUser(env.DB,request);
  return user?json({ok:true,authenticated:true,user:publicUser(user)}):json({ok:true,authenticated:false,user:null});
}

async function accountSave(request,env,url){
  await ensureAuthSchema(env.DB);
  const user=await sessionUser(env.DB,request);
  if(!user&&request.method==='GET')return json({ok:true,authenticated:false,save:null,revision:0,updatedAt:null});
  if(!user)return json({error:'Chưa đăng nhập.'},401);

  if(request.method==='GET'){
    const row=await env.DB.prepare('SELECT save_data,revision,client_updated_at,updated_at FROM account_cloud_saves WHERE account_id=?').bind(user.id).first();
    if(!row)return json({ok:true,authenticated:true,save:null,revision:0,clientUpdatedAt:null,updatedAt:null});
    return json({ok:true,authenticated:true,save:row.save_data,revision:Number(row.revision||0),clientUpdatedAt:row.client_updated_at==null?null:Number(row.client_updated_at),updatedAt:Number(row.updated_at||0)});
  }
  if(request.method!=='PUT'&&request.method!=='POST')return methodNotAllowed('GET, PUT, POST');
  if(!sameOrigin(request,url))return json({error:'Yêu cầu không hợp lệ.'},403);
  const b=await bodyJson(request);
  if(!b||typeof b.save!=='string')return json({error:'Bản lưu không hợp lệ.'},400);
  const bytes=byteLength(b.save);
  if(bytes<2||bytes>MAX_ACCOUNT_SAVE_BYTES)return json({error:'Bản lưu vượt giới hạn cho phép.'},413);
  const current=await env.DB.prepare('SELECT revision FROM account_cloud_saves WHERE account_id=?').bind(user.id).first();
  const currentRevision=Number(current?.revision||0);
  if(b.revision!=null){
    const expected=Number(b.revision);
    if(!Number.isInteger(expected)||expected!==currentRevision)return json({error:'Bản lưu trên cloud đã thay đổi ở thiết bị khác.',revision:currentRevision},409);
  }
  const revision=currentRevision+1,now=Date.now();
  const clientUpdatedAt=Number.isFinite(Number(b.clientUpdatedAt))?Math.max(0,Math.trunc(Number(b.clientUpdatedAt))):null;
  await env.DB.prepare(`INSERT INTO account_cloud_saves(account_id,save_data,revision,client_updated_at,updated_at)
    VALUES(?,?,?,?,?)
    ON CONFLICT(account_id) DO UPDATE SET save_data=excluded.save_data,revision=excluded.revision,client_updated_at=excluded.client_updated_at,updated_at=excluded.updated_at`)
    .bind(user.id,b.save,revision,clientUpdatedAt,now).run();
  return json({ok:true,revision,updatedAt:now});
}

async function issueSession(db,request,account,status){
  const raw=randomHex(32),tokenHash=await sha256Hex(raw),now=Date.now(),expires=now+SESSION_MS;
  await db.prepare('DELETE FROM sessions WHERE expires_at < ?').bind(now).run();
  await db.prepare('INSERT INTO sessions(token_hash,account_id,created_at,expires_at,last_seen) VALUES(?,?,?,?,?)').bind(tokenHash,account.id,now,expires,now).run();
  const res=json({ok:true,user:publicUser(account)},status);
  res.headers.append('Set-Cookie',sessionCookie(raw,request,Math.floor(SESSION_MS/1000)));
  return res;
}

async function sessionUser(db,request){
  const raw=cookieValue(request.headers.get('Cookie'),AUTH_COOKIE);
  if(!raw||raw.length<32)return null;
  const tokenHash=await sha256Hex(raw),now=Date.now();
  const row=await db.prepare(`SELECT a.id,a.username,a.display_name,s.expires_at,s.last_seen
    FROM sessions s JOIN accounts a ON a.id=s.account_id WHERE s.token_hash=?`).bind(tokenHash).first();
  if(!row||Number(row.expires_at||0)<=now){
    if(row)await db.prepare('DELETE FROM sessions WHERE token_hash=?').bind(tokenHash).run();
    return null;
  }
  if(now-Number(row.last_seen||0)>15*60*1000)await db.prepare('UPDATE sessions SET last_seen=? WHERE token_hash=?').bind(now,tokenHash).run();
  return row;
}

// Legacy cloud-code backup.
async function saveCloudCode(request,env){
  if(!sameOrigin(request,new URL(request.url)))return json({error:'Origin không hợp lệ'},403);
  if(!(await allowRate(env,request,'save',120)))return json({error:'Thao tác quá nhanh, thử lại sau.'},429);
  const body=await bodyJson(request); if(!body)return json({error:'JSON không hợp lệ'},400);
  const key=String(body.key||''),code=body.code==null?'':String(body.code).replace(/\s+/g,''),data=String(body.data||'');
  if(!/^[a-z0-9]{16,64}$/i.test(key))return json({error:'Khóa sao lưu không hợp lệ'},400);
  if(code&&!/^\d{8}$/.test(code))return json({error:'Mã sao lưu phải có 8 số'},400);
  if(!data.startsWith('TTN1.')||byteLength(data)>MAX_CODE_SAVE_BYTES)return json({error:'Dữ liệu sao lưu không hợp lệ hoặc quá lớn'},413);
  const ownerHash=await sha256Hex(key),now=Math.floor(Date.now()/1000);
  if(code){
    const row=await env.DB.prepare('SELECT owner_hash FROM cloud_saves WHERE code=?').bind(code).first();
    if(!row)return json({error:'Không tìm thấy mã sao lưu này'},404);
    if(!timingSafeEqual(String(row.owner_hash),ownerHash))return json({error:'Mã này thuộc quán khác'},403);
    await env.DB.prepare('UPDATE cloud_saves SET data=?,updated_at=? WHERE code=?').bind(data,now,code).run();
    return json({ok:true,code});
  }
  for(let i=0;i<20;i++){
    const newCode=randomCode();
    try{
      await env.DB.prepare('INSERT INTO cloud_saves(code,owner_hash,data,created_at,updated_at) VALUES(?,?,?,?,?)').bind(newCode,ownerHash,data,now,now).run();
      return json({ok:true,code:newCode},201);
    }catch(e){if(!String(e).toLowerCase().includes('unique'))throw e}
  }
  return json({error:'Chưa tạo được mã, vui lòng thử lại'},503);
}

async function loadCloudCode(request,env,url){
  if(!(await allowRate(env,request,'load',60)))return json({error:'Bạn đã thử quá nhiều mã. Vui lòng thử lại sau.'},429);
  const code=String(url.searchParams.get('code')||'').replace(/\s+/g,'');
  if(!/^\d{8}$/.test(code))return json({error:'Mã sao lưu phải có 8 số'},400);
  const row=await env.DB.prepare('SELECT data FROM cloud_saves WHERE code=?').bind(code).first();
  return row?json({data:row.data}):json({error:'Không tìm thấy mã sao lưu này'},404);
}

async function allowRate(env,request,action,limit){
  const rawIp=request.headers.get('cf-connecting-ip')||request.headers.get('x-forwarded-for')||'local';
  const ipHash=(await sha256Hex(rawIp)).slice(0,24),now=Math.floor(Date.now()/1000),bucket=`${action}:${ipHash}`;
  const row=await env.DB.prepare('SELECT count,reset_at FROM rate_limits WHERE bucket=?').bind(bucket).first();
  if(!row||Number(row.reset_at)<=now){
    await env.DB.prepare('INSERT INTO rate_limits(bucket,count,reset_at) VALUES(?,1,?) ON CONFLICT(bucket) DO UPDATE SET count=1,reset_at=excluded.reset_at').bind(bucket,now+3600).run();
    return true;
  }
  if(Number(row.count)>=limit)return false;
  await env.DB.prepare('UPDATE rate_limits SET count=count+1 WHERE bucket=?').bind(bucket).run();
  return true;
}

function publicUser(row){return{id:row.id,username:row.username,displayName:row.display_name}}
function normalizeUsername(v){const s=String(v||'').normalize('NFKC').trim().toLocaleLowerCase('vi-VN').replace(/\s+/g,'_');return USER_RE.test(s)?s:''}
function cleanText(v,max){return String(v??'').replace(/[\u0000-\u001f\u007f]/g,' ').replace(/\s+/g,' ').trim().slice(0,max)}
function methodNotAllowed(allow){const r=json({error:'Phương thức không được hỗ trợ.'},405);r.headers.set('Allow',allow);return r}
function sameOrigin(request,url){const origin=request.headers.get('Origin');return !origin||origin===url.origin}
function sessionCookie(value,request,maxAge){const secure=new URL(request.url).protocol==='https:'?'; Secure':'';return `${AUTH_COOKIE}=${value}; Path=/; HttpOnly; SameSite=Lax${secure}; Max-Age=${maxAge}`}
function cookieValue(header,name){if(!header)return'';for(const part of header.split(';')){const i=part.indexOf('=');if(i<0)continue;if(part.slice(0,i).trim()===name)return part.slice(i+1).trim()}return''}
function randomHex(bytes){const a=new Uint8Array(bytes);crypto.getRandomValues(a);return Array.from(a,x=>x.toString(16).padStart(2,'0')).join('')}
function randomCode(){const a=new Uint32Array(1);crypto.getRandomValues(a);return String(a[0]%100000000).padStart(8,'0')}
function byteLength(s){return new TextEncoder().encode(s).byteLength}
async function sha256Hex(s){const digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(String(s)));return Array.from(new Uint8Array(digest),b=>b.toString(16).padStart(2,'0')).join('')}
function hexBytes(hex){const out=new Uint8Array(hex.length/2);for(let i=0;i<out.length;i++)out[i]=parseInt(hex.slice(i*2,i*2+2),16);return out}
async function hashPassword(password,saltHex,iterations){
  const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(password),'PBKDF2',false,['deriveBits']);
  const bits=await crypto.subtle.deriveBits({name:'PBKDF2',hash:'SHA-256',salt:hexBytes(saltHex),iterations},key,256);
  return Array.from(new Uint8Array(bits),x=>x.toString(16).padStart(2,'0')).join('');
}
function timingSafeEqual(a,b){if(typeof a!=='string'||typeof b!=='string'||a.length!==b.length)return false;let diff=0;for(let i=0;i<a.length;i++)diff|=a.charCodeAt(i)^b.charCodeAt(i);return diff===0}
async function bodyJson(request){try{const max=600*1024,len=Number(request.headers.get('content-length')||0);if(len>max)return null;const text=await request.text();if(byteLength(text)>max)return null;return JSON.parse(text)}catch{return null}}
function json(data,status=200){return new Response(JSON.stringify(data),{status,headers:JSON_HEADERS})}
function withSecurity(response,url){
  const h=new Headers(response.headers);
  h.set('x-content-type-options','nosniff');
  h.set('x-frame-options','DENY');
  h.set('referrer-policy','strict-origin-when-cross-origin');
  h.set('permissions-policy','camera=(), microphone=(), geolocation=(), payment=()');
  h.set('cross-origin-resource-policy','same-origin');
  h.set('content-security-policy',"default-src 'self' data: blob:; img-src 'self' data: blob:; media-src 'self' data: blob:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; script-src 'self' 'unsafe-inline'; connect-src 'self'; worker-src 'self' blob:; manifest-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'");
  if(url.pathname.startsWith('/api/'))h.set('cache-control','no-store');
  return new Response(response.body,{status:response.status,statusText:response.statusText,headers:h});
}
