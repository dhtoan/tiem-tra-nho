const JSON_HEADERS={'content-type':'application/json; charset=utf-8','cache-control':'no-store'};
const MAX_CODE_SAVE_BYTES=512*1024;
const MAX_ACCOUNT_SAVE_BYTES=512*1024;
const AUTH_COOKIE='ttn_session';
const SESSION_MS=30*24*60*60*1000;
const REFERRAL_REWARD=300000;
const DEFAULT_PUBLIC_ORIGIN='https://tiemtranho.aunomay.com';
const USER_RE=/^[\p{L}\p{N}][\p{L}\p{N}._-]{2,31}$/u;
const LOCAL_HOSTS=new Set(['localhost','127.0.0.1','0.0.0.0','::1']);
let authSchemaReady=false;
let authSchemaInit=null;
let referralSchemaReady=false;
let referralSchemaInit=null;

export default {
  async fetch(request,env){
    const url=new URL(request.url);
    if(!hostAllowed(url.hostname,env)) return withSecurity(new Response('Forbidden',{status:403}),url);
    const canonical=publicOrigin(env);
    if(!url.pathname.startsWith('/api/')&&url.origin!==canonical&&request.method==='GET'){
      const target=new URL(url.pathname+url.search+url.hash,canonical);
      return withSecurity(Response.redirect(target.toString(),308),url);
    }
    try{
      if(url.pathname.startsWith('/api/')){
        const response=await handleApi(request,env,url);
        return withSecurity(response,url);
      }
      if((url.pathname==='/changelog'||url.pathname==='/changelog/')){
        const assetUrl=new URL('/changelog.html',url);
        const response=await env.ASSETS.fetch(new Request(assetUrl.toString(),request));
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
function publicOrigin(env){
  const raw=String(env.PUBLIC_ORIGIN||DEFAULT_PUBLIC_ORIGIN).trim();
  try{
    const u=new URL(raw);
    if(u.protocol==='https:'&&u.hostname)return u.origin;
  }catch{}
  return DEFAULT_PUBLIC_ORIGIN;
}

async function handleApi(request,env,url){
  const p=url.pathname.replace(/\/+$/,'');
  if(p==='/api/health'&&request.method==='GET')return json({ok:true,app:'tiem-tra-nho',version:'1.0.0',database:Boolean(env.DB)});
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
  if(p==='/api/referral/me')return referralMe(request,env,url);
  if(p==='/api/referral/claim')return referralClaim(request,env,url);
  if(p==='/api/referral/rewards/take')return referralTakeRewards(request,env,url);

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

async function ensureReferralSchema(db){
  await ensureAuthSchema(db);
  if(referralSchemaReady)return;
  if(!referralSchemaInit){
    referralSchemaInit=db.batch([
      db.prepare(`CREATE TABLE IF NOT EXISTS referral_codes(
        code TEXT PRIMARY KEY,
        account_id TEXT NOT NULL UNIQUE REFERENCES accounts(id) ON DELETE CASCADE,
        created_at INTEGER NOT NULL
      )`),
      db.prepare(`CREATE TABLE IF NOT EXISTS referral_claims(
        invitee_account_id TEXT PRIMARY KEY REFERENCES accounts(id) ON DELETE CASCADE,
        inviter_account_id TEXT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
        created_at INTEGER NOT NULL
      )`),
      db.prepare('CREATE INDEX IF NOT EXISTS idx_referral_claims_inviter ON referral_claims(inviter_account_id)'),
      db.prepare(`CREATE TABLE IF NOT EXISTS referral_rewards(
        account_id TEXT PRIMARY KEY REFERENCES accounts(id) ON DELETE CASCADE,
        pending_amount INTEGER NOT NULL DEFAULT 0,
        total_amount INTEGER NOT NULL DEFAULT 0,
        updated_at INTEGER NOT NULL
      )`)
    ]).then(()=>{referralSchemaReady=true}).catch(e=>{referralSchemaInit=null;throw e});
  }
  await referralSchemaInit;
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
  const salt=randomHex(16);
  const passwordIterations=0;
  const passwordHash=await hashPasswordFast(password,salt);
  const now=Date.now(),id=randomHex(16);
  try{
    await env.DB.prepare(`INSERT INTO accounts(id,username,display_name,password_hash,password_salt,password_iterations,created_at,updated_at)
      VALUES(?,?,?,?,?,?,?,?)`).bind(id,username,displayName,passwordHash,salt,passwordIterations,now,now).run();
  }catch(e){
    console.error('Auth register insert failed',e);
    if(String(e).toLowerCase().includes('unique'))return json({error:'Tên đăng nhập đã được sử dụng.'},409);
    return json({error:'Không thể tạo tài khoản lúc này. Vui lòng thử lại.',code:'AUTH_REGISTER_FAILED'},503);
  }
  try{
    return await issueSession(env.DB,request,{id,username,display_name:displayName},201);
  }catch(e){
    console.error('Auth register session failed',e);
    return json({error:'Tài khoản đã tạo nhưng chưa thể đăng nhập tự động. Hãy thử đăng nhập.',code:'AUTH_SESSION_FAILED'},503);
  }
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
  const storedIterations=Number(row.password_iterations);
  const got=Number.isFinite(storedIterations)&&storedIterations>0
    ? await hashPassword(password,row.password_salt,storedIterations)
    : await hashPasswordFast(password,row.password_salt);
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

async function referralMe(request,env,url){
  await ensureReferralSchema(env.DB);
  if(request.method!=='GET')return methodNotAllowed('GET');
  const user=await sessionUser(env.DB,request);
  if(!user)return json({error:'Chưa đăng nhập.'},401);
  const code=await ensureReferralCode(env.DB,user.id);
  return json({ok:true,code,link:publicOrigin(env)+'/?ref='+encodeURIComponent(code),reward:REFERRAL_REWARD});
}

async function referralClaim(request,env,url){
  await ensureReferralSchema(env.DB);
  if(request.method!=='POST')return methodNotAllowed('POST');
  if(!sameOrigin(request,url))return json({error:'Yêu cầu không hợp lệ.'},403);
  const user=await sessionUser(env.DB,request);
  if(!user)return json({error:'Chưa đăng nhập.'},401);
  const b=await bodyJson(request); if(!b)return json({error:'Dữ liệu không hợp lệ.'},400);
  const code=String(b.code||'').toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,16);
  if(code.length<6)return json({error:'Mã giới thiệu không hợp lệ.'},400);
  const inviter=await env.DB.prepare('SELECT account_id FROM referral_codes WHERE code=?').bind(code).first();
  if(!inviter)return json({error:'Không tìm thấy mã giới thiệu.'},404);
  if(inviter.account_id===user.id)return json({error:'Bạn không thể tự giới thiệu chính mình.',selfReferral:true},400);
  const old=await env.DB.prepare('SELECT inviter_account_id FROM referral_claims WHERE invitee_account_id=?').bind(user.id).first();
  if(old)return json({error:'Tài khoản này đã nhận thưởng giới thiệu.',alreadyClaimed:true},409);
  const now=Date.now();
  try{
    await env.DB.batch([
      env.DB.prepare('INSERT INTO referral_claims(invitee_account_id,inviter_account_id,created_at) VALUES(?,?,?)').bind(user.id,inviter.account_id,now),
      env.DB.prepare(`INSERT INTO referral_rewards(account_id,pending_amount,total_amount,updated_at) VALUES(?,?,?,?)
        ON CONFLICT(account_id) DO UPDATE SET pending_amount=pending_amount+excluded.pending_amount,total_amount=total_amount+excluded.total_amount,updated_at=excluded.updated_at`).bind(user.id,REFERRAL_REWARD,REFERRAL_REWARD,now),
      env.DB.prepare(`INSERT INTO referral_rewards(account_id,pending_amount,total_amount,updated_at) VALUES(?,?,?,?)
        ON CONFLICT(account_id) DO UPDATE SET pending_amount=pending_amount+excluded.pending_amount,total_amount=total_amount+excluded.total_amount,updated_at=excluded.updated_at`).bind(inviter.account_id,REFERRAL_REWARD,REFERRAL_REWARD,now)
    ]);
  }catch(e){
    if(String(e).toLowerCase().includes('unique'))return json({error:'Tài khoản này đã nhận thưởng giới thiệu.',alreadyClaimed:true},409);
    throw e;
  }
  return json({ok:true,reward:REFERRAL_REWARD});
}

async function referralTakeRewards(request,env,url){
  await ensureReferralSchema(env.DB);
  if(request.method!=='POST')return methodNotAllowed('POST');
  if(!sameOrigin(request,url))return json({error:'Yêu cầu không hợp lệ.'},403);
  const user=await sessionUser(env.DB,request);
  if(!user)return json({error:'Chưa đăng nhập.'},401);
  const row=await env.DB.prepare('SELECT pending_amount,total_amount FROM referral_rewards WHERE account_id=?').bind(user.id).first();
  const amount=Math.max(0,Number(row?.pending_amount||0));
  if(amount>0)await env.DB.prepare('UPDATE referral_rewards SET pending_amount=0,updated_at=? WHERE account_id=?').bind(Date.now(),user.id).run();
  return json({ok:true,amount,total:Number(row?.total_amount||0)});
}

async function ensureReferralCode(db,accountId){
  const old=await db.prepare('SELECT code FROM referral_codes WHERE account_id=?').bind(accountId).first();
  if(old?.code)return old.code;
  const digest=(await sha256Hex('aunomay-ref:'+accountId)).toUpperCase();
  for(const len of [8,10,12,16]){
    const code=digest.slice(0,len);
    try{
      await db.prepare('INSERT INTO referral_codes(code,account_id,created_at) VALUES(?,?,?)').bind(code,accountId,Date.now()).run();
      return code;
    }catch(e){
      const row=await db.prepare('SELECT account_id FROM referral_codes WHERE code=?').bind(code).first();
      if(row?.account_id===accountId)return code;
    }
  }
  throw new Error('Could not allocate referral code');
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

// 8-digit cloud backup owned by Tiệm Trà Nhỏ.
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
async function hashPasswordFast(password,saltHex){
  const data=new TextEncoder().encode('ttn-auth-v2\0'+saltHex+'\0'+password);
  const digest=await crypto.subtle.digest('SHA-256',data);
  return Array.from(new Uint8Array(digest),x=>x.toString(16).padStart(2,'0')).join('');
}
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
  const currentType=h.get('content-type')||'';
  const ext=(url.pathname.toLowerCase().match(/\.([a-z0-9]+)$/)||[])[1]||'';
  const utf8Type=/^(text\/|application\/(?:javascript|json|manifest\+json|xml)|image\/svg\+xml)/i.test(currentType);
  if(utf8Type&&!/charset=/i.test(currentType))h.set('content-type',currentType.split(';')[0].trim()+'; charset=utf-8');
  if(!currentType){
    const byExt={html:'text/html',htm:'text/html',css:'text/css',js:'text/javascript',mjs:'text/javascript',json:'application/json',webmanifest:'application/manifest+json',xml:'application/xml',svg:'image/svg+xml',txt:'text/plain'};
    if(byExt[ext])h.set('content-type',byExt[ext]+'; charset=utf-8');
  }
  h.set('x-content-type-options','nosniff');
  h.set('x-frame-options','DENY');
  h.set('referrer-policy','strict-origin-when-cross-origin');
  h.set('permissions-policy','camera=(), microphone=(), geolocation=(), payment=()');
  h.set('cross-origin-opener-policy','same-origin');
  h.set('cross-origin-resource-policy','same-origin');
  if(url.pathname.startsWith('/api/')||/\.(?:js|mjs|css)$/i.test(url.pathname))h.set('x-robots-tag','noindex, noarchive, nosnippet');
  h.set('content-security-policy',"default-src 'self' data: blob:; img-src 'self' data: blob:; media-src 'self' data: blob:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; script-src 'self' 'unsafe-inline'; connect-src 'self'; worker-src 'self' blob:; manifest-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'");
  if(url.pathname.startsWith('/api/'))h.set('cache-control','no-store');
  else if(url.pathname==='/'||/\.(?:html?|css|js|mjs|json|webmanifest)$/i.test(url.pathname))h.set('cache-control','no-cache, max-age=0, must-revalidate');
  return new Response(response.body,{status:response.status,statusText:response.statusText,headers:h});
}
