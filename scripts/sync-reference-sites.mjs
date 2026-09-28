import { chromium } from 'playwright';
import { mkdir, writeFile, readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

const SOURCES = [
  { id: 'trongnhi', url: 'https://trongnhi.trongnhi110266.workers.dev/' },
  { id: 'tiemtramouoc', url: 'https://tiemtramouoc.tensorship.tech/' }
];
const ROOT = path.resolve('reference');
const ACCEPT = /^(text\/html|text\/css|application\/(javascript|x-javascript|json|manifest\+json|wasm)|text\/javascript|image\/|audio\/|video\/|font\/|application\/(font|vnd\.ms-fontobject|octet-stream))/i;
const EXT_RE = /(?:["'(=:\s]|^)((?:https?:\/\/[^"'()\s]+|\.{0,2}\/[^"'()\s]+|\/[^"'()\s]+)\.(?:png|jpe?g|webp|gif|svg|ico|avif|mp3|wav|ogg|m4a|aac|mp4|webm|mov|woff2?|ttf|otf|css|js|json|webmanifest|wasm)(?:\?[^"'()\s]*)?)/gi;

function sha(buf){ return crypto.createHash('sha256').update(buf).digest('hex'); }
function safeSeg(s){ return s.replace(/[^a-zA-Z0-9._-]/g,'_').replace(/^\.+$/,'_'); }
function localPathFor(url, origin, contentType=''){
  const u = new URL(url);
  let pathname = decodeURIComponent(u.pathname);
  if (pathname.endsWith('/')) pathname += 'index.html';
  if (!path.extname(pathname) && /text\/html/i.test(contentType)) pathname += '/index.html';
  if (!path.extname(pathname) && /json/i.test(contentType)) pathname += '.json';
  const segs = pathname.split('/').filter(Boolean).map(safeSeg);
  let rel = segs.length ? segs.join('/') : 'index.html';
  if (u.search) {
    const ext = path.extname(rel);
    const base = ext ? rel.slice(0,-ext.length) : rel;
    rel = base + '__q_' + sha(Buffer.from(u.search)).slice(0,10) + ext;
  }
  return rel;
}
async function ensureDir(file){ await mkdir(path.dirname(file),{recursive:true}); }
async function saveBuf(base, rel, buf){ const file=path.join(base,rel); await ensureDir(file); await writeFile(file,buf); return file; }
function sameOrigin(url, origin){ try { return new URL(url).origin===origin; } catch { return false; } }

async function captureSite(browser, source){
  const out = path.join(ROOT, source.id);
  await mkdir(out,{recursive:true});
  const context = await browser.newContext({
    viewport:{width:1440,height:1000},
    serviceWorkers:'block',
    ignoreHTTPSErrors:true
  });
  const page = await context.newPage();
  const origin = new URL(source.url).origin;
  const manifest = new Map();
  const pending = new Set();

  async function record(url, body, contentType='', status=200){
    if(!sameOrigin(url,origin) || !body || !ACCEPT.test(contentType||'')) return;
    const rel=localPathFor(url,origin,contentType);
    const key=url;
    if(manifest.has(key)) return;
    await saveBuf(out,rel,body);
    manifest.set(key,{url,localPath:rel,contentType,status,bytes:body.length,sha256:sha(body)});
  }

  page.on('response', response => {
    const p=(async()=>{
      const url=response.url();
      if(!sameOrigin(url,origin)) return;
      const ct=response.headers()['content-type']||'';
      if(!ACCEPT.test(ct)) return;
      try { await record(url,await response.body(),ct,response.status()); } catch {}
    })();
    pending.add(p); p.finally(()=>pending.delete(p));
  });

  await page.goto(source.url,{waitUntil:'networkidle',timeout:60000});
  await page.waitForTimeout(1200);

  const initial = await page.evaluate(() => {
    const txt=e=>(e.innerText||e.textContent||'').replace(/\s+/g,' ').trim().slice(0,220);
    const vis=e=>!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length);
    const interactive=[...document.querySelectorAll('button,[role="button"],a[href],input[type="button"],input[type="submit"]')]
      .filter(vis).map((e,i)=>({i,tag:e.tagName,text:txt(e),id:e.id||'',cls:e.className?.toString?.()||'',href:e.href||''}));
    const headings=[...document.querySelectorAll('h1,h2,h3,h4,[class*="title"],[class*="tab"]')].filter(vis).map(txt).filter(Boolean);
    const media=[...document.querySelectorAll('img,audio,video,source,link[rel="icon"],link[rel="manifest"],script[src],link[rel="stylesheet"]')]
      .map(e=>e.currentSrc||e.src||e.href||'').filter(Boolean);
    const backgrounds=[...document.querySelectorAll('*')].filter(vis).map(e=>getComputedStyle(e).backgroundImage)
      .filter(v=>v&&v!=='none').flatMap(v=>[...v.matchAll(/url\(["']?([^"')]+)["']?\)/g)].map(m=>m[1]));
    const dialogs=[...document.querySelectorAll('dialog,[role="dialog"],[class*="modal"],[class*="popup"],[class*="sheet"]')].map(e=>txt(e)).filter(Boolean);
    return {title:document.title,interactive,headings,dialogs,media:[...new Set([...media,...backgrounds])],localStorageKeys:Object.keys(localStorage),sessionStorageKeys:Object.keys(sessionStorage)};
  });

  const fetchAsset = async (abs) => {
    try{
      const res=await context.request.get(abs,{timeout:6000});
      if(res.ok()) await record(abs,await res.body(),res.headers()['content-type']||'',res.status());
    }catch{}
  };
  await Promise.all(initial.media.map(u => {
    try{
      const abs=new URL(u,source.url).href;
      return sameOrigin(abs,origin) ? fetchAsset(abs) : Promise.resolve();
    }catch{return Promise.resolve();}
  }));

  const clickLog=[];
  const blocked=/delete|remove|reset|clear data|xoá dữ liệu|xóa dữ liệu|factory|sign out|đăng xuất/i;
  for(let round=0; round<2; round++){
    const count=await page.locator('button,[role="button"],a[href="#"],input[type="button"],input[type="submit"]').count();
    for(let i=0;i<Math.min(count,50);i++){
      const loc=page.locator('button,[role="button"],a[href="#"],input[type="button"],input[type="submit"]').nth(i);
      try{
        if(!(await loc.isVisible())) continue;
        const label=((await loc.innerText().catch(()=>''))||await loc.getAttribute('aria-label')||'').trim().slice(0,120);
        if(blocked.test(label)) continue;
        await loc.click({timeout:450});
        clickLog.push(label||('#'+i));
        await page.waitForTimeout(90);
        await page.keyboard.press('Escape').catch(()=>{});
      }catch{}
    }
  }
  await page.waitForTimeout(600);
  await Promise.allSettled([...pending]);

  const fetched=new Set(manifest.keys());
  for(let round=0; round<3; round++){
    const candidates=[];
    const textFiles=[...manifest.values()].filter(x=>/javascript|css|html|json|manifest/i.test(x.contentType));
    for(const item of textFiles){
      let text='';
      try{text=await readFile(path.join(out,item.localPath),'utf8')}catch{continue}
      EXT_RE.lastIndex=0;
      for(const m of text.matchAll(EXT_RE)){
        let ref=m[1].replace(/^[("'=:\s]+/,'');
        let abs; try{abs=new URL(ref,item.url).href}catch{continue}
        if(!sameOrigin(abs,origin)||fetched.has(abs)) continue;
        fetched.add(abs); candidates.push(abs);
        if(candidates.length>=500) break;
      }
      if(candidates.length>=500) break;
    }
    if(!candidates.length) break;
    for(let i=0;i<candidates.length;i+=24){
      await Promise.all(candidates.slice(i,i+24).map(fetchAsset));
    }
  }

  const finalInventory = await page.evaluate(() => {
    const txt=e=>(e.innerText||e.textContent||'').replace(/\s+/g,' ').trim().slice(0,300);
    const vis=e=>!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length);
    return {
      title:document.title,
      bodyText:document.body.innerText.slice(0,25000),
      visibleButtons:[...document.querySelectorAll('button,[role="button"]')].filter(vis).map(txt).filter(Boolean),
      headings:[...document.querySelectorAll('h1,h2,h3,h4')].map(txt).filter(Boolean),
      forms:[...document.forms].map(f=>({id:f.id||'',action:f.action||'',method:f.method||'get',fields:[...f.elements].map(e=>({name:e.name||'',type:e.type||'',placeholder:e.placeholder||''}))})),
      localStorageKeys:Object.keys(localStorage),
      sessionStorageKeys:Object.keys(sessionStorage)
    };
  });

  const list=[...manifest.values()].sort((a,b)=>a.localPath.localeCompare(b.localPath));
  await writeFile(path.join(out,'asset-manifest.json'),JSON.stringify({source,generatedAt:new Date().toISOString(),count:list.length,assets:list},null,2));
  await writeFile(path.join(out,'feature-inventory.json'),JSON.stringify({source,initial,clickLog,final:finalInventory},null,2));
  await page.screenshot({path:path.join(out,'page.png'),fullPage:true}).catch(()=>{});
  await context.close();
  return {id:source.id,count:list.length,bytes:list.reduce((n,x)=>n+x.bytes,0),buttons:initial.interactive.length};
}

await mkdir(ROOT,{recursive:true});
const browser=await chromium.launch({headless:true});
const summary=[];
try{
  for(const source of SOURCES) summary.push(await captureSite(browser,source));
} finally { await browser.close(); }
await writeFile(path.join(ROOT,'sync-summary.json'),JSON.stringify({generatedAt:new Date().toISOString(),summary},null,2));
console.log(JSON.stringify(summary,null,2));
