const JSON_HEADERS = {'content-type':'application/json; charset=utf-8','cache-control':'no-store'};
const MAX_SAVE_BYTES = 512 * 1024;
const LOCAL_HOSTS = new Set(['localhost','127.0.0.1','0.0.0.0']);

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (!hostAllowed(url.hostname, env)) return withSecurity(new Response('Forbidden', {status:403}), url);

    try {
      if (url.pathname.startsWith('/api/')) {
        const response = await handleApi(request, env, url);
        return withSecurity(response, url);
      }
      const response = await env.ASSETS.fetch(request);
      return withSecurity(response, url);
    } catch (error) {
      console.error('request failed', error);
      return withSecurity(json({error:'Lỗi máy chủ tạm thời'}, 500), url);
    }
  }
};

function hostAllowed(hostname, env) {
  const raw = String(env.ALLOWED_HOSTS || '').trim();
  if (!raw || LOCAL_HOSTS.has(hostname)) return true;
  return raw.split(',').map(x=>x.trim().toLowerCase()).filter(Boolean).includes(hostname.toLowerCase());
}

async function handleApi(request, env, url) {
  if (url.pathname === '/api/health' && request.method === 'GET') {
    return json({ok:true, app:'tiem-tra-nho', version:'1.0.0', database:Boolean(env.DB)});
  }
  if (url.pathname === '/api/save' && request.method === 'POST') return saveCloud(request, env);
  if (url.pathname === '/api/load' && request.method === 'GET') return loadCloud(request, env, url);
  return json({error:'Không tìm thấy API'}, 404);
}

async function saveCloud(request, env) {
  if (!env.DB) return json({error:'Cloud save chưa được bật. Game vẫn lưu bình thường trên thiết bị này.'}, 503);
  if (!sameOrigin(request)) return json({error:'Origin không hợp lệ'}, 403);
  if (!(await allowRate(env, request, 'save', 120))) return json({error:'Thao tác quá nhanh, thử lại sau.'}, 429);

  let body;
  try { body = await request.json(); } catch { return json({error:'JSON không hợp lệ'}, 400); }
  const key = String(body?.key || '');
  const code = body?.code == null ? '' : String(body.code).replace(/\s+/g, '');
  const data = String(body?.data || '');
  if (!/^[a-z0-9]{16,64}$/i.test(key)) return json({error:'Khóa sao lưu không hợp lệ'}, 400);
  if (code && !/^\d{8}$/.test(code)) return json({error:'Mã sao lưu phải có 8 số'}, 400);
  if (!data.startsWith('TTN1.') || byteLength(data) > MAX_SAVE_BYTES) return json({error:'Dữ liệu sao lưu không hợp lệ hoặc quá lớn'}, 413);

  const ownerHash = await sha256(key);
  const now = Math.floor(Date.now()/1000);

  if (code) {
    const row = await env.DB.prepare('SELECT owner_hash FROM cloud_saves WHERE code = ?').bind(code).first();
    if (!row) return json({error:'Không tìm thấy mã sao lưu này'}, 404);
    if (!safeEqual(String(row.owner_hash), ownerHash)) return json({error:'Mã này thuộc quán khác'}, 403);
    await env.DB.prepare('UPDATE cloud_saves SET data = ?, updated_at = ? WHERE code = ?').bind(data, now, code).run();
    return json({ok:true, code});
  }

  for (let i=0;i<20;i++) {
    const newCode = randomCode();
    try {
      await env.DB.prepare('INSERT INTO cloud_saves(code, owner_hash, data, created_at, updated_at) VALUES(?,?,?,?,?)')
        .bind(newCode, ownerHash, data, now, now).run();
      return json({ok:true, code:newCode}, 201);
    } catch (error) {
      if (!String(error?.message || error).toLowerCase().includes('unique')) throw error;
    }
  }
  return json({error:'Chưa tạo được mã, vui lòng thử lại'}, 503);
}

async function loadCloud(request, env, url) {
  if (!env.DB) return json({error:'Cloud save chưa được bật. Hãy dùng mã dài hoặc file sao lưu.'}, 503);
  if (!(await allowRate(env, request, 'load', 60))) return json({error:'Bạn đã thử quá nhiều mã. Vui lòng thử lại sau.'}, 429);
  const code = String(url.searchParams.get('code') || '').replace(/\s+/g, '');
  if (!/^\d{8}$/.test(code)) return json({error:'Mã sao lưu phải có 8 số'}, 400);
  const row = await env.DB.prepare('SELECT data FROM cloud_saves WHERE code = ?').bind(code).first();
  if (!row) return json({error:'Không tìm thấy mã sao lưu này'}, 404);
  return json({data:row.data});
}

async function allowRate(env, request, action, limit) {
  if (!env.DB) return true;
  const rawIp = request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for') || 'local';
  const ipHash = (await sha256(rawIp)).slice(0,24);
  const now = Math.floor(Date.now()/1000);
  const bucket = `${action}:${ipHash}`;
  const row = await env.DB.prepare('SELECT count, reset_at FROM rate_limits WHERE bucket = ?').bind(bucket).first();
  if (!row || Number(row.reset_at) <= now) {
    await env.DB.prepare('INSERT INTO rate_limits(bucket,count,reset_at) VALUES(?,1,?) ON CONFLICT(bucket) DO UPDATE SET count=1, reset_at=excluded.reset_at')
      .bind(bucket, now + 3600).run();
    return true;
  }
  if (Number(row.count) >= limit) return false;
  await env.DB.prepare('UPDATE rate_limits SET count = count + 1 WHERE bucket = ?').bind(bucket).run();
  return true;
}

function sameOrigin(request) {
  const origin = request.headers.get('origin');
  if (!origin) return true;
  try { return new URL(origin).origin === new URL(request.url).origin; } catch { return false; }
}

function randomCode() {
  const a = new Uint32Array(1); crypto.getRandomValues(a);
  return String(a[0] % 100000000).padStart(8,'0');
}
function byteLength(s) { return new TextEncoder().encode(s).byteLength; }
async function sha256(s) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
  return [...new Uint8Array(digest)].map(b=>b.toString(16).padStart(2,'0')).join('');
}
function safeEqual(a,b) {
  if (a.length !== b.length) return false;
  let diff=0; for(let i=0;i<a.length;i++) diff |= a.charCodeAt(i)^b.charCodeAt(i); return diff===0;
}
function json(data, status=200) { return new Response(JSON.stringify(data), {status, headers:JSON_HEADERS}); }
function withSecurity(response, url) {
  const h = new Headers(response.headers);
  h.set('x-content-type-options','nosniff');
  h.set('x-frame-options','DENY');
  h.set('referrer-policy','strict-origin-when-cross-origin');
  h.set('permissions-policy','camera=(), microphone=(), geolocation=(), payment=()');
  h.set('cross-origin-resource-policy','same-origin');
  h.set('content-security-policy', "default-src 'self'; img-src 'self' data:; media-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; connect-src 'self'; worker-src 'self'; manifest-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'");
  if (url.pathname.startsWith('/api/')) h.set('cache-control','no-store');
  return new Response(response.body, {status:response.status, statusText:response.statusText, headers:h});
}
