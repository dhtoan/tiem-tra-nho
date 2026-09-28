import { chromium } from 'playwright';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

const SOURCES=[
 {id:'trongnhi',url:'https://trongnhi.trongnhi110266.workers.dev/'},
 {id:'tiemtramouoc',url:'https://tiemtramouoc.tensorship.tech/'}
];
const ROOT=path.resolve('reference');
const ACCEPT=/^(text\/html|text\/css|application\/(javascript|x-javascript|json|manifest\+json|wasm)|text\/javascript|image\/|audio\/|video\/|font\/|application\/(font|vnd\.ms-fontobject|octet-stream))/i;
const ASSET_RE=/((?:https?:\/\/[^"'()<>\s]+|\.{0,2}\/[^"'()<>\s]+|\/[^"'()<>\s]+)\.(?:png|jpe?g|webp|gif|svg|ico|avif|mp3|wav|ogg|m4a|aac|mp4|webm|mov|woff2?|ttf|otf|css|js|json|webmanifest|wasm)(?:\?[^"'()<>\s]*)?)/gi;

const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const clean=s=>s.replace(/[^a-zA-Z0-9._-]/g,'_').replace(/^\.+$/,'_');
function relFor(url,ct=''){
 const u=new URL(url); let p=decodeURIComponent(u.pathname);
 if(p.endsWith('/'))p+='index.html';
 if(!path.extname(p)&&/html/i.test(ct))p+='/index.html';
 if(!path.extname(p)&&/json/i.test(ct))p+='.json';
 let rel=p.split('/').filter(Boolean).map(clean).join('/')||'index.html';
 if(u.search){const e=path.extname(rel);rel=(e?rel.slice(0,-e.length):rel)+'__q_'+sha(Buffer.from(u.search)).slice(0,10)+e}
 return rel;
}
async function save(base,rel,buf){const f=path.join(base,rel);await mkdir(path.dirname(f),{recursive:true});await writeFile(f,buf)}
const same=(u,o)=>{try{return new URL(u).origin===o}catch{return false}};

async function capture(browser,src){
 const out=path.join(ROOT,src.id); await mkdir(out,{recursive:true});
 const origin=new URL(src.url).origin;
 const context=await browser.newContext({viewport:{width:1440,height:1000},serviceWorkers:'block',ignoreHTTPSErrors:true});
 const page=await context.newPage();
 const manifest=new Map(); const pending=new Set();
 async function record(url,buf,ct='',status=200){
   if(!same(url,origin)||!buf||!ACCEPT.test(ct||''))return;
   if(manifest.has(url))return;
   const rel=relFor(url,ct); await save(out,rel,buf);
   manifest.set(url,{url,localPath:rel,contentType:ct,status,bytes:buf.length,sha256:sha(buf)});
 }
 page.on('response',resp=>{
   const p=(async()=>{try{
     const url=resp.url(),ct=resp.headers()['content-type']||'';
     if(!same(url,origin)||!ACCEPT.test(ct))return;
     await record(url,await resp.body(),ct,resp.status());
   }catch{}})();pending.add(p);p.finally(()=>pending.delete(p));
 });
 try{await page.goto(src.url,{waitUntil:'domcontentloaded',timeout:25000})}catch{}
 await page.waitForTimeout(3500);
 await Promise.allSettled([...pending]);

 // Save final DOM even if root response was transformed/client-rendered.
 const html=Buffer.from(await page.content());
 await record(src.url,html,'text/html; charset=utf-8',200);

 const inventory=await page.evaluate(()=>{
   const txt=e=>(e.innerText||e.textContent||'').replace(/\s+/g,' ').trim();
   const vis=e=>!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length);
   const nodes=[...document.querySelectorAll('button,[role="button"],a[href],input,select,textarea,[class*="tab"],[class*="modal"],[class*="popup"],[class*="sheet"]')];
   const media=[...document.querySelectorAll('img,audio,video,source,script[src],link[href]')].map(e=>e.currentSrc||e.src||e.href||'').filter(Boolean);
   const backgrounds=[...document.querySelectorAll('*')].map(e=>getComputedStyle(e).backgroundImage).filter(v=>v&&v!=='none')
     .flatMap(v=>[...v.matchAll(/url\(["']?([^"')]+)["']?\)/g)].map(m=>m[1]));
   return {
     title:document.title,
     bodyText:(document.body?.innerText||'').slice(0,60000),
     interactive:nodes.filter(vis).map(e=>({tag:e.tagName,id:e.id||'',className:e.className?.toString?.()||'',text:txt(e).slice(0,240),type:e.type||'',href:e.href||''})),
     headings:[...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(e=>txt(e)).filter(Boolean),
     dialogs:[...document.querySelectorAll('dialog,[role="dialog"],[class*="modal"],[class*="popup"],[class*="sheet"]')].map(e=>txt(e).slice(0,1200)).filter(Boolean),
     media:[...new Set([...media,...backgrounds])],
     localStorage:Object.fromEntries(Object.keys(localStorage).map(k=>[k,(localStorage.getItem(k)||'').slice(0,5000)])),
     sessionStorageKeys:Object.keys(sessionStorage)
   };
 });

 // Fetch DOM-discovered media in parallel.
 async function fetchOne(url){
   try{const r=await context.request.get(url,{timeout:6000});if(r.ok())await record(url,await r.body(),r.headers()['content-type']||'',r.status())}catch{}
 }
 const domUrls=[...new Set(inventory.media.map(x=>{try{return new URL(x,src.url).href}catch{return null}}).filter(x=>x&&same(x,origin)))];
 for(let i=0;i<domUrls.length;i+=24)await Promise.all(domUrls.slice(i,i+24).map(fetchOne));

 // Recursively discover media/static assets from HTML/CSS/JS/JSON.
 const fetched=new Set(manifest.keys());
 for(let round=0;round<4;round++){
   const candidates=[];
   const textAssets=[...manifest.values()].filter(x=>/html|css|javascript|json|manifest/i.test(x.contentType));
   for(const item of textAssets){
     let t='';try{t=await readFile(path.join(out,item.localPath),'utf8')}catch{continue}
     ASSET_RE.lastIndex=0;
     for(const m of t.matchAll(ASSET_RE)){
       let abs;try{abs=new URL(m[1],item.url).href}catch{continue}
       if(!same(abs,origin)||fetched.has(abs))continue;
       fetched.add(abs);candidates.push(abs);
       if(candidates.length>=1000)break;
     }
     if(candidates.length>=1000)break;
   }
   if(!candidates.length)break;
   for(let i=0;i<candidates.length;i+=32)await Promise.all(candidates.slice(i,i+32).map(fetchOne));
 }

 // Feature clues from source text: visible Vietnamese strings + identifiers near UI verbs.
 const clues=new Set();
 for(const item of [...manifest.values()].filter(x=>/html|javascript|json/i.test(x.contentType))){
   let t='';try{t=await readFile(path.join(out,item.localPath),'utf8')}catch{continue}
   for(const m of t.matchAll(/["'`]([^"'`\n]{3,100})["'`]/g)){
     const s=m[1].replace(/\\n/g,' ').replace(/\\u[da-fA-F]{4}/g,'').trim();
     if(/[À-ỹ]|trà|khách|tiền|ngày|cửa hàng|nâng cấp|kho|nhân viên|đơn|review|đánh giá|menu|công thức|sự kiện|vay|thương hiệu|ship|online|trân châu|đường|đá/i.test(s))clues.add(s);
     if(clues.size>2500)break;
   }
 }
 const list=[...manifest.values()].sort((a,b)=>a.localPath.localeCompare(b.localPath));
 await writeFile(path.join(out,'asset-manifest.json'),JSON.stringify({source:src,generatedAt:new Date().toISOString(),count:list.length,assets:list},null,2));
 await writeFile(path.join(out,'feature-inventory.json'),JSON.stringify({source:src,generatedAt:new Date().toISOString(),inventory,sourceClues:[...clues].sort()},null,2));
 await page.screenshot({path:path.join(out,'page.png'),fullPage:true}).catch(()=>{});
 await context.close();
 return {id:src.id,count:list.length,bytes:list.reduce((a,x)=>a+x.bytes,0),interactive:inventory.interactive.length,clues:clues.size};
}
await mkdir(ROOT,{recursive:true});
const browser=await chromium.launch({headless:true});
const summary=[];
try{for(const s of SOURCES)summary.push(await capture(browser,s))}finally{await browser.close()}
await writeFile(path.join(ROOT,'sync-summary.json'),JSON.stringify({generatedAt:new Date().toISOString(),summary},null,2));
console.log(JSON.stringify(summary,null,2));
