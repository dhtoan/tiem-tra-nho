const CACHE='tiem-tra-nho-v103-assets';
const CORE=[
  '/','/index.html',
  '/assets/css/style.css','/assets/css/baucua.css','/assets/css/xidach.css','/assets/css/banbe.css',
  '/assets/js/banbe.js','/assets/js/game.js','/assets/js/baucua.js','/assets/js/xidach.js',
  '/account-sync.css','/account-sync.js','/referral.css','/referral.js','/vendor/qrcode.min.js','/bootstrap.js',
  '/manifest.webmanifest',
  '/assets/img/ga.png','/assets/img/bau.png','/assets/img/ca.png','/assets/img/cua.png','/assets/img/tom.png','/assets/img/nai.png','/assets/img/xocdia.png',
  '/assets/img/cup.png','/assets/img/bg.jpg','/assets/img/bg2.jpg','/assets/img/kho.jpg','/assets/img/splash2.jpg','/assets/img/faces.webp','/assets/img/ship.webp','/assets/img/star.webp'
];
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
  const req=event.request;if(req.method!=='GET')return;
  const url=new URL(req.url);if(url.origin!==location.origin)return;
  if(url.pathname.startsWith('/api/'))return;
  if(req.headers.has('range'))return;
  if(url.pathname==='/version.json'){
    event.respondWith(fetch(req,{cache:'no-store'}));
    return;
  }
  if(req.mode==='navigate'){
    event.respondWith(fetch(req).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put('/index.html',copy));return r}).catch(()=>caches.match('/index.html')));
    return;
  }
  const codeAsset=/\.(?:js|mjs|css|json|webmanifest)$/i.test(url.pathname);
  if(codeAsset){
    event.respondWith(fetch(req,{cache:'no-store'}).then(r=>{
      if(r.ok&&r.status!==206){const copy=r.clone();caches.open(CACHE).then(c=>c.put(req,copy))}
      return r;
    }).catch(()=>caches.match(req)));
    return;
  }
  event.respondWith(caches.match(req).then(hit=>hit||fetch(req).then(r=>{if(r.ok&&r.status!==206){const copy=r.clone();caches.open(CACHE).then(c=>c.put(req,copy))}return r})));
});

self.addEventListener('message',event=>{
  const data=event.data||{};
  if(data.type!=='AUNOMAY_REFERRAL')return;
  event.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(clients=>Promise.all(clients.map(client=>{
    if(event.source&&client.id===event.source.id)return null;
    return client.postMessage({type:'AUNOMAY_REFERRAL',code:data.code||'',friend:data.friend||''});
  }))));
});
