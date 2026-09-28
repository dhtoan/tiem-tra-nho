import { readFile, access } from 'node:fs/promises';
for(const p of ['../public/referral.js','../public/referral.css','../public/vendor/qrcode.min.js','../migrations/0003_referrals.sql']) await access(new URL(p,import.meta.url));
const worker=await readFile(new URL('../src/worker.js',import.meta.url),'utf8');
for(const p of ['/api/referral/me','/api/referral/claim','/api/referral/rewards/take']) if(!worker.includes(p)) throw new Error('missing referral API '+p);
const referral=await readFile(new URL('../public/referral.js',import.meta.url),'utf8');
for(const marker of ['navigator.share','QRCode','ref=','getMoney','setMoney','pendingReferral']) if(!referral.includes(marker)) throw new Error('referral client missing '+marker);
const build=await readFile(new URL('../scripts/build.mjs',import.meta.url),'utf8');
if(!build.includes('/referral.css')||!build.includes('/vendor/qrcode.min.js')||!build.includes('/referral.js')) throw new Error('production build must load referral assets');
console.log('referral reward + QR share checks passed');
