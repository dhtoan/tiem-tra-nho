import { access, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const root=new URL('../dist/',import.meta.url).pathname;
const required=[
  'index.html',
  'css/style.css','css/baucua.css','css/xidach.css',
  'js/game.js','js/baucua.js','js/xidach.js',
  'account-sync.css','account-sync.js','bootstrap.js',
  'manifest.webmanifest','sw.js',
  'img/ga.png','img/bau.png','img/ca.png','img/cua.png','img/tom.png','img/nai.png','img/xocdia.png'
];
for(const file of required)await access(join(root,file));

const html=await readFile(join(root,'index.html'),'utf8');
for(const ref of ['/css/style.css','/css/baucua.css','/css/xidach.css','/js/game.js','/js/baucua.js','/js/xidach.js','/account-sync.css','/account-sync.js','/bootstrap.js','/manifest.webmanifest']){
  if(!html.includes(ref))throw new Error('index missing '+ref);
}
for(const marker of ['cloudAccountBtn','cloudAccountDlg','cloudSaveNudge']){
  if(!html.includes(marker))throw new Error('account UI missing '+marker);
}
const game=await readFile(join(root,'js/game.js'),'utf8');
if(!game.includes("const GAME_VERSION='12.47.11'"))throw new Error('runtime version 12.47.11 missing');
if(!game.includes("const SAVE='tsShop2'"))throw new Error('expected tsShop2 save key missing');
const bc=await readFile(join(root,'js/baucua.js'),'utf8');
for(const img of ['bau.png','ca.png','cua.png','tom.png','nai.png','ga.png'])if(!bc.includes(img))throw new Error('baucua missing '+img);
const account=await readFile(join(root,'account-sync.js'),'utf8');
for(const ref of ['/api/auth/me','/api/auth/login','/api/auth/register','/api/account/save'])if(!account.includes(ref))throw new Error('account sync missing '+ref);
console.log('build verification passed: 12.47.11 + minigames + login + D1 auto-sync + PWA');
