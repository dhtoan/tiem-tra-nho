import {readFile} from 'node:fs/promises';

const root=new URL('../',import.meta.url);
const jsFiles=[
  'assets/js/parity-advanced-core.js',
  'assets/js/parity-advanced-staff-tax.js',
  'assets/js/parity-advanced-ops.js',
  'assets/js/parity-advanced-hooks.js'
];
const js=(await Promise.all(jsFiles.map(p=>readFile(new URL(p,root),'utf8')))).join('\n');
const css=await readFile(new URL('assets/css/parity-advanced.css',root),'utf8');
const html=await readFile(new URL('src/index.html',root),'utf8');

for(const marker of [
  'rollPartyContract','partyContractCard','staffBuyerTick','renderBuyerWidget',
  'staffSvTick','renderSvWidget','checkMktAutoPayTax','getStaffSpeedBuff',
  'getStaffBillBonusTotal','openSellReviewsModal','updateKarinPatrol',
  'Nhân viên đi chợ','Sinh viên cuối tháng','Nhân viên Me két tinh',
  'ĐÓNG THUẾ TRỰC TUYẾN 72H','getTotalWorkSpeedBuff'
]){
  if(!js.includes(marker))throw new Error('missing advanced parity marker: '+marker);
}
for(const marker of ['party-contract-card','tax-buff-grid','buyer-widget','sv-widget','kpi-cycle-banner']){
  if(!css.includes(marker))throw new Error('missing advanced parity style: '+marker);
}
for(const p of jsFiles){
  if(!html.includes('/'+p))throw new Error('index missing advanced runtime: '+p);
}
if(!html.includes('/assets/css/parity-advanced.css'))throw new Error('index missing advanced parity stylesheet');
console.log('advanced parity feature checks passed');
