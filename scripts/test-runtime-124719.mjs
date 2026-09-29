import { readFile, access } from 'node:fs/promises';

for (const p of ['../assets/js/banbe.js','../assets/css/banbe.css']) await access(new URL(p,import.meta.url));

const files={
  game:await readFile(new URL('../assets/js/game.js',import.meta.url),'utf8'),
  friends:await readFile(new URL('../assets/js/banbe.js',import.meta.url),'utf8'),
  friendCss:await readFile(new URL('../assets/css/banbe.css',import.meta.url),'utf8'),
  build:await readFile(new URL('../scripts/build.mjs',import.meta.url),'utf8'),
  manifest:await readFile(new URL('../public/manifest.webmanifest',import.meta.url),'utf8'),
  version:await readFile(new URL('../public/version.json',import.meta.url),'utf8'),
  pkg:await readFile(new URL('../package.json',import.meta.url),'utf8'),
  sw:await readFile(new URL('../public/sw.js',import.meta.url),'utf8')
};

if(!files.game.includes("const GAME_VERSION='1.0.0'"))throw new Error('Aunomay Tiệm Trà Nhỏ must restart at version 1.0.0');
for(const name of ['game','friends','friendCss','manifest','version','pkg']){
  if(files[name].includes('Tiệm Trà Mơ Ước'))throw new Error(name+' still contains legacy Tiệm Trà Mơ Ước branding');
}
if(!files.build.includes(".replaceAll('Tiệm Trà Mơ Ước','Tiệm Trà Nhỏ')"))throw new Error('build must rewrite legacy brand in upstream HTML');
if(!files.game.includes("friends:[]"))throw new Error('friend state is missing');
if(!files.game.includes("friendBuff"))throw new Error('friend traffic buff integration is missing');
if(!/Full Topping/i.test(files.game))throw new Error('Full Topping support is missing');
if(!files.game.includes("TC nổ"))throw new Error('popping pearl rename is missing');
if(!files.game.includes("const CLOUD='/api'"))throw new Error('same-origin Aunomay cloud backup must be preserved');
if(!files.game.includes("Tài khoản & Cloud Save"))throw new Error('Aunomay account Settings entry must be preserved');
if(!files.game.includes("Đưa game ra màn hình chính"))throw new Error('Aunomay PWA install Settings entry must be preserved');
for(const marker of ['genFriendCode','genGiftCode','genShopCode','activeChallenge','redeemedCodes']){
  if(!files.friends.includes(marker))throw new Error('Friends module missing '+marker);
}
if(!files.build.includes("banbe.css"))throw new Error('production build must load banbe.css');
if(!files.build.includes("banbe.js"))throw new Error('production build must load banbe.js');
if(JSON.parse(files.version).version!=='1.0.0')throw new Error('version.json must be 1.0.0');
if(JSON.parse(files.pkg).version!=='1.0.0')throw new Error('package.json must be 1.0.0');
const manifest=JSON.parse(files.manifest);
if(manifest.id!=='/'||manifest.launch_handler?.client_mode!=='navigate-existing')throw new Error('installed PWA launch identity/handler missing');
for(const marker of ['taxThreshold:1000000000','vat:2.4','function taxSnapshot()','Thuế đã phát sinh','Doanh thu lũy kế năm']){
  if(!files.game.includes(marker))throw new Error('2026 tax UX missing '+marker);
}
if(!files.sw.includes('AUNOMAY_REFERRAL'))throw new Error('service worker referral bridge missing');
for(const marker of ['const COSMETICS=[','function cosmeticShop()','shop_sakura','counter_luxe','cup_gold','Màu mới được mở khi quán lên cấp','maybeAutoInstall','settings-x','sDecor']){
  if(!files.game.includes(marker))throw new Error('new settings/decor/install UX missing '+marker);
}
console.log('Tiệm Trà Nhỏ Aunomay 1.0.0 feature import checks passed');
