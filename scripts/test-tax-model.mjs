import { readFile } from 'node:fs/promises';

const game=await readFile(new URL('../js/game.js',import.meta.url),'utf8');

const num=(re,label)=>{
  const m=game.match(re);
  if(!m)throw new Error('missing '+label);
  return Number(m[1]);
};

const threshold=num(/taxThreshold:(\d+)/,'taxThreshold');
const vat=num(/vat:([\d.]+)/,'vat');
const pit=num(/pit:([\d.]+)/,'pit');

if(threshold!==1_000_000_000)throw new Error('tax threshold must be 1 billion for 2026');
if(vat!==2.4)throw new Error('2026 reduced VAT ratio must be 2.4%');
if(pit!==1.5)throw new Error('revenue-method PIT ratio must be 1.5%');

for(const marker of [
  'S.yearRev>threshold?Math.round(S.yearRev*Number(CFG.vat',
  'Math.max(0,S.yearRev-threshold)*Number(CFG.pit',
  'function taxSnapshot()',
  'Thuế phải nộp hôm nay',
  'Doanh thu năm:'
]) if(!game.includes(marker)) throw new Error('tax model missing '+marker);

const yearRev=1_200_000_000;
const vatDue=Math.round(yearRev*vat/100);
const pitDue=Math.round(Math.max(0,yearRev-threshold)*pit/100);
const total=vatDue+pitDue;
if(vatDue!==28_800_000||pitDue!==3_000_000||total!==31_800_000){
  throw new Error('1.2B tax scenario mismatch: '+JSON.stringify({vatDue,pitDue,total}));
}

const below=999_000_000;
const belowVat=below>threshold?Math.round(below*vat/100):0;
const belowPit=Math.round(Math.max(0,below-threshold)*pit/100);
if(belowVat!==0||belowPit!==0)throw new Error('below-threshold tax must stay zero');

console.log('2026 household-business tax model checks passed');
