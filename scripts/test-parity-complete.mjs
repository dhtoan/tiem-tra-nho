import {readFile} from 'node:fs/promises';

const root=new URL('../',import.meta.url);
const js=await readFile(new URL('assets/js/parity-complete.js',root),'utf8');
const css=await readFile(new URL('assets/css/parity-complete.css',root),'utf8');
const html=await readFile(new URL('src/index.html',root),'utf8');

for(const marker of [
  'completePaneKpi','completeOpenKpi','completeConfirmKpi','completeStrike',
  'completePaneThue','completePaneRev','completeOpenSellModal','completeMktReplies',
  'completeBuyerModal','completeCheckStaffExcuses','completeCheckEquipBreakdown',
  'completeCatchGz','completeFalseCatch','completeRenderGz','completeRenderSv',
  'appendDailyAudit','checkKpiDeadlineC'
])if(!js.includes(marker))throw new Error('missing complete parity marker: '+marker);

for(const marker of [
  'complete-staff-card','complete-kpi-card','complete-tax-overview',
  'complete-review-summary','complete-buyer-grid','complete-daily-audit'
])if(!css.includes(marker))throw new Error('missing complete parity CSS marker: '+marker);

for(const ref of ['/assets/css/parity-complete.css','/assets/js/parity-complete.js']){
  if(!html.includes(ref))throw new Error('index missing '+ref);
}
if(/(^|\n)\s*(?:link|script) (?:rel|src)=/m.test(html))throw new Error('malformed link/script tag found in index');
console.log('complete parity regression checks passed');
