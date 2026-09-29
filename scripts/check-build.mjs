import { access, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const root=new URL('../dist/',import.meta.url).pathname;
const MAX_ASSET_BYTES=25*1024*1024;
const required=[
  'index.html',
  'assets/css/style.css','assets/css/baucua.css','assets/css/xidach.css','assets/css/banbe.css',
  'assets/js/game.js','assets/js/baucua.js','assets/js/xidach.js','assets/js/banbe.js',
  'account-sync.css','account-sync.js','referral.css','referral.js','vendor/qrcode.min.js','bootstrap.js',
  'manifest.webmanifest','sw.js','version.json',
  'favicon-16x16.png','favicon-32x32.png','favicon.ico',
  'apple-touch-icon.png','apple-touch-icon-167x167.png','apple-touch-icon-152x152.png','apple-touch-icon-120x120.png',
  'android-chrome-192x192.png','android-chrome-512x512.png',
  'icons/maskable-192x192.png','icons/maskable-512x512.png',
  'Nhạc Chill Quán Cafe - Những Ca Khúc Lofi Nhẹ Nhàng Hay Nhất Dành Cho Quán Cafe - Nhạc Lofi 2026.mp3',
  'Pouring water-liquid into a glass sound effect [HQ].mp3',
  'assets/img/ga.png','assets/img/bau.png','assets/img/ca.png','assets/img/cua.png','assets/img/tom.png','assets/img/nai.png','assets/img/xocdia.png'
];
for(const file of required)await access(join(root,file));
for(const file of required){
  const {size}=await import('node:fs/promises').then(m=>m.stat(join(root,file)));
  if(size>MAX_ASSET_BYTES)throw new Error('Cloudflare static asset exceeds 25 MiB: '+file+' ('+size+' bytes)');
}

const html=await readFile(join(root,'index.html'),'utf8');
const utf8Files=required.filter(file=>/\.(?:html?|css|js|mjs|json|webmanifest)$/i.test(file));
const mojibake=/\uFFFD|đŸ|á»|áº|Ä‘|Æ°|Ã¡|Ã¢|Ãª|Ã´|Ã¹|â€™|â€œ|â€|Â /;
for(const file of utf8Files){
  const text=await readFile(join(root,file),'utf8');
  if(mojibake.test(text))throw new Error('possible UTF-8/mojibake corruption in '+file);
  if(file.endsWith('.css')&&!text.startsWith('@charset "UTF-8";'))throw new Error('CSS missing UTF-8 charset declaration: '+file);
}
for(const ref of ['/assets/css/style.css','/assets/css/baucua.css','/assets/css/xidach.css','/assets/css/banbe.css','/assets/js/banbe.js','/assets/js/game.js','/assets/js/baucua.js','/assets/js/xidach.js','/account-sync.css','/account-sync.js','/referral.css','/vendor/qrcode.min.js','/referral.js','/bootstrap.js','/manifest.webmanifest','/favicon-32x32.png','/favicon-16x16.png','/favicon.ico','/apple-touch-icon.png','/apple-touch-icon-167x167.png','/apple-touch-icon-152x152.png','/apple-touch-icon-120x120.png']){
  if(!html.includes(ref))throw new Error('index missing '+ref);
}
for(const marker of ['cloudAccountBtn','cloudAccountDlg','cloudSaveNudge']){
  if(!html.includes(marker))throw new Error('account UI missing '+marker);
}
const game=await readFile(join(root,'assets/js/game.js'),'utf8');
if(!/GAME_VERSION=["']1\.0\.0["']/.test(game))throw new Error('Aunomay runtime version 1.0.0 missing');
if(!/SAVE=["']tsShop2["']/.test(game))throw new Error('expected tsShop2 save key missing');
for(const [name,text] of [['index',html],['game',game]]){
  if(/reference\//i.test(text)||/\/img\/skins\//i.test(text))throw new Error('non-production asset namespace leaked into '+name);
}
const bc=await readFile(join(root,'assets/js/baucua.js'),'utf8');
const xd=await readFile(join(root,'assets/js/xidach.js'),'utf8');
for(const img of ['bau.png','ca.png','cua.png','tom.png','nai.png','ga.png'])if(!bc.includes(img))throw new Error('baucua missing '+img);
for(const [name,text] of [['baucua',bc],['xidach',xd]]){
  if(/[^\x00-\x7F]/.test(text))throw new Error(name+' production JS must be ASCII-safe to prevent charset mojibake');
  if(/\/\*|\/\//.test(text.slice(0,500)))throw new Error(name+' production JS still contains source comments');
}
const account=await readFile(join(root,'account-sync.js'),'utf8');
for(const ref of ['/api/auth/me','/api/auth/','/api/account/save'])if(!account.includes(ref))throw new Error('account sync missing '+ref);
for(const mode of ['login','register'])if(!new RegExp('auth\\(["\\\']'+mode+'["\\\']\\)').test(account))throw new Error('account sync missing '+mode+' action');
console.log('build verification passed: 1.0.0 + minigames + login + D1 auto-sync + PWA');
