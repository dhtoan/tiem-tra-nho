/* Feature parity module: KPI nhân viên + Đóng thuế 72h + Ngân hàng tiết kiệm.
   Adapted to Tiệm Trà Nhỏ runtime without replacing Aunomay-specific systems. */
(()=>{
'use strict';

const TAX_CYCLE_MS=72*3600*1000;

function initTaxState(){
  if(!S)return;
  if(!S.taxOnline){
    S.taxOnline={paidAt:0,expiresAt:Date.now()+TAX_CYCLE_MS,rate:0,amount:0,totalPaid:0,payCount:0};
  }
  if(!S.taxOnline.expiresAt)S.taxOnline.expiresAt=Date.now()+TAX_CYCLE_MS;
}
function isTaxActive(){
  initTaxState();
  return !!(S.taxOnline&&S.taxOnline.expiresAt>Date.now()&&S.taxOnline.rate>0);
}
function isTaxOverdue(){
  initTaxState();
  return !!(S.taxOnline&&S.taxOnline.expiresAt&&Date.now()>=S.taxOnline.expiresAt);
}
function getTaxTrafficBoost(){
  if(isTaxActive())return 1+(S.taxOnline.rate||0.15);
  if(isTaxOverdue())return .80;
  return 1;
}
function getTaxSpeedBuff(){
  if(isTaxActive())return S.taxOnline.rate||.15;
  if(isTaxOverdue())return -.20;
  return 0;
}
function formatTaxTime(ms){
  if(ms<=0)return '00:00:00';
  const tot=Math.floor(ms/1000),h=Math.floor(tot/3600),m=Math.floor((tot%3600)/60),s=tot%60;
  return String(h).padStart(2,'0')+':'+String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');
}

function initBankState(){
  if(!S)return;
  if(!S.bankSaving)S.bankSaving={cap:10000000,balance:0,principal:0,termDays:7,daysPassed:0,totalInterest:0};
  if(S.bankSaving.cap==null)S.bankSaving.cap=10000000;
  if(S.bankSaving.termDays==null)S.bankSaving.termDays=7;
  if(S.bankSaving.daysPassed==null)S.bankSaving.daysPassed=0;
}
function increaseBankCapOn5Star(){
  initBankState();
  const old=S.bankSaving.cap||10000000;
  if(old>=1000000000)return old;
  const next=Math.min(1000000000,Math.round(old*1.10));
  S.bankSaving.cap=next;save();
  toast('⭐ Hạn mức gửi tiết kiệm tăng lên '+fmt(next)+'!');
  return next;
}
function checkTaxBankPenalty(){
  initTaxState();initBankState();
  if(!isTaxOverdue()||!S.bankSaving.balance)return false;
  const overdue=Date.now()-S.taxOnline.expiresAt;
  if(overdue<12*3600*1000)return false;
  const lost=S.bankSaving.balance;
  S.bankSaving.balance=0;S.bankSaving.principal=0;S.bankSaving.daysPassed=0;
  save();
  ask('<div class="pbig">🏛️⚖️</div><h2>TIỀN GỬI BỊ TỊCH THU</h2><p>Quán đã quá hạn đóng thuế hơn 12 giờ. Toàn bộ <b>'+fmt(lost)+'</b> tiền gửi tiết kiệm bị thu hồi.</p>',[['Đã hiểu',()=>{if(R.mode==='prep')renderPrep()},1]]);
  return true;
}
function openBankDepositDlg(){
  initBankState();
  const b=S.bankSaving,room=Math.max(0,b.cap-b.balance),max=Math.min(S.money||0,room);
  if(max<=0)return toast(S.money<=0?'Két quán không có tiền để gửi.':'Đã đạt hạn mức gửi tiết kiệm.');
  const terms=[7,14,21,28,35];
  ask('<div style="text-align:left"><h2>🏦 Gửi tiết kiệm</h2><p>Két: <b>'+fmt(S.money)+'</b> · Đang gửi: <b>'+fmt(b.balance)+'</b> / '+fmt(b.cap)+'</p><label>Số tiền</label><input id="bankInpAmt" type="number" min="10000" max="'+max+'" step="50000" value="'+Math.min(1000000,max)+'" class="pinbox" style="width:100%;box-sizing:border-box"><label style="display:block;margin-top:10px">Kỳ hạn</label><select id="bankTermSel" class="pinbox" style="width:100%">'+terms.map(x=>'<option value="'+x+'" '+(x===b.termDays?'selected':'')+'>'+x+' ngày bán nước</option>').join('')+'</select><p class="note">Lãi kép 1% mỗi ngày bán. Rút trước hạn chỉ nhận lại tiền gốc.</p></div>',[
    ['Hủy',()=>{}],
    ['Gửi tiền',()=>{
      const inp=$('bankInpAmt'),sel=$('bankTermSel');
      let amt=Math.round(+(inp&&inp.value||0));amt=Math.max(10000,Math.min(max,amt));
      if(amt>S.money)return toast('Két không đủ tiền.');
      S.money-=amt;b.balance+=amt;b.principal+=amt;b.termDays=+(sel&&sel.value||7);
      save();head();paneThue();sfx('coin');toast('Đã gửi '+fmt(amt)+' vào tiết kiệm.');
    },1]
  ]);
}
function openBankWithdrawDlg(){
  initBankState();const b=S.bankSaving;
  if(!b.balance)return toast('Sổ tiết kiệm chưa có số dư.');
  const matured=b.daysPassed>=b.termDays,principal=b.principal||b.balance,interest=Math.max(0,b.balance-principal),receive=matured?b.balance:principal;
  ask('<div style="text-align:left"><h2>🏦 Rút tiết kiệm</h2><p>Tiến độ: <b>'+b.daysPassed+'/'+b.termDays+' ngày</b></p><p>Gốc: '+fmt(principal)+'<br>Lãi hiện tại: +'+fmt(interest)+'</p>'+(matured?'<p class="okline">Đã đủ kỳ hạn, nhận cả gốc và lãi.</p>':'<p class="warnline">Rút trước hạn sẽ mất toàn bộ tiền lãi.</p>')+'</div>',[
    ['Để lại',()=>{}],
    ['Rút '+fmt(receive),()=>{
      S.money+=receive;b.balance=0;b.principal=0;b.daysPassed=0;save();head();paneThue();sfx('coin');toast('Đã rút '+fmt(receive)+' về két.');
    },1]
  ]);
}

function paneThue(){
  initTaxState();initBankState();checkTaxBankPenalty();
  const p=$('pane');if(!p)return;
  const t=S.taxOnline,b=S.bankSaving,active=isTaxActive(),over=isTaxOverdue(),money=S.money||0;
  if(!window._selectedTaxPct||window._selectedTaxPct<5||window._selectedTaxPct>15)window._selectedTaxPct=15;
  const pct=Math.max(5,Math.min(15,window._selectedTaxPct)),amt=Math.round(money*pct/100);
  let status='';
  if(active)status='<div class="tax-status-box active"><b>🟢 ĐÃ ĐÓNG THUẾ HỢP LỆ</b><div id="taxCountdownLive" class="tax-timer-badge active">⏳ '+formatTaxTime(t.expiresAt-Date.now())+'</div><div class="tax-buff-grid"><div class="tax-buff-item">📈 +'+Math.round(t.rate*100)+'% khách ghé quán</div><div class="tax-buff-item">⚡ +'+Math.round(t.rate*100)+'% tốc độ làm việc</div><div class="tax-buff-item">🛡️ Giảm rủi ro sự cố</div><div class="tax-buff-item">💎 Tăng cơ hội doanh thu</div></div></div>';
  else if(over)status='<div class="tax-status-box overdue"><b>🔴 ĐÃ QUÁ HẠN ĐÓNG THUẾ</b><div id="taxCountdownLive" class="tax-timer-badge overdue">⚠️ '+formatTaxTime(Date.now()-t.expiresAt)+'</div><p>Khách giảm 20%; hệ thống nhân sự chịu bất lợi cho tới khi hoàn thành nghĩa vụ.</p></div>';
  else status='<div class="tax-status-box grace"><b>🟡 ĐANG TRONG THỜI GIAN ÂN HẠN</b><div id="taxCountdownLive" class="tax-timer-badge grace">⏳ '+formatTaxTime(t.expiresAt-Date.now())+'</div></div>';
  p.innerHTML='<div class="tax-pane-wrap"><div><h2 style="margin:0">🏛️ Đóng thuế trực tuyến 72h</h2><div class="note">Chọn mức 5–15% két. Mức đã đóng quyết định buff trong 72 giờ thực.</div></div>'+status+
    '<div class="tax-slider-card"><div style="display:flex;justify-content:space-between"><b>Két: '+fmt(money)+'</b><b id="taxSelectedPct">'+pct+'%</b></div><input id="taxRangeIn" class="tax-range-input" type="range" min="5" max="15" step="1" value="'+pct+'"><div class="tax-pills">'+[5,8,10,12,15].map(v=>'<button class="tax-pct-pill '+(v===pct?'on':'')+'" data-tax-pct="'+v+'">'+v+'%</button>').join('')+'</div><div class="tax-amount-row"><span>Số tiền cần nộp</span><b id="taxSelectedAmt">'+fmt(amt)+'</b></div><button id="btnPayTax" class="big pri" style="width:100%">🏛️ Nộp thuế '+fmt(amt)+'</button></div>'+
    '<div class="tatua-bank-card"><div class="bank-head"><b>🏦 Ngân hàng Tiệm Trà Nhỏ</b><span>1%/ngày bán</span></div><div class="bank-grid"><div><small>Số dư</small><b>'+fmt(b.balance)+'</b><small>Gốc '+fmt(b.principal)+'</small></div><div><small>Hạn mức</small><b>'+fmt(b.cap)+'</b><small>Kỳ hạn '+b.daysPassed+'/'+b.termDays+' ngày</small></div></div><div class="bank-actions"><button id="btnBankDeposit" class="sbtn pri">➕ Gửi tiết kiệm</button><button id="btnBankWithdraw" class="sbtn">💸 Rút tiền</button></div></div>'+
    '<div class="note">Tổng thuế đã nộp: <b>'+fmt(t.totalPaid||0)+'</b> · '+(t.payCount||0)+' lần.</div></div>';
  const rng=$('taxRangeIn');if(rng)rng.oninput=()=>onTaxSliderChange(+rng.value);
  p.querySelectorAll('[data-tax-pct]').forEach(bn=>bn.onclick=()=>{if(rng)rng.value=bn.dataset.taxPct;onTaxSliderChange(+bn.dataset.taxPct)});
  if($('btnPayTax'))$('btnPayTax').onclick=executePayTax;
  if($('btnBankDeposit'))$('btnBankDeposit').onclick=openBankDepositDlg;
  if($('btnBankWithdraw'))$('btnBankWithdraw').onclick=openBankWithdrawDlg;
  if(window._taxLiveInterval)clearInterval(window._taxLiveInterval);
  window._taxLiveInterval=setInterval(()=>{const el=$('taxCountdownLive');if(!el){clearInterval(window._taxLiveInterval);return}if(isTaxActive())el.textContent='⏳ '+formatTaxTime(S.taxOnline.expiresAt-Date.now());else if(isTaxOverdue())el.textContent='⚠️ '+formatTaxTime(Date.now()-S.taxOnline.expiresAt);},1000);
}
function onTaxSliderChange(v){
  window._selectedTaxPct=v;const amt=Math.round((S.money||0)*v/100);
  if($('taxSelectedPct'))$('taxSelectedPct').textContent=v+'%';
  if($('taxSelectedAmt'))$('taxSelectedAmt').textContent=fmt(amt);
  if($('btnPayTax'))$('btnPayTax').textContent='🏛️ Nộp thuế '+fmt(amt);
  document.querySelectorAll('.tax-pct-pill').forEach(b=>b.classList.toggle('on',+b.dataset.taxPct===v));
}
function executePayTax(){
  initTaxState();const pct=Math.max(5,Math.min(15,window._selectedTaxPct||15)),amt=Math.round((S.money||0)*pct/100);
  if(amt<=0||S.money<amt)return toast('Két không đủ tiền để đóng thuế.');
  S.money-=amt;S.taxOnline.paidAt=Date.now();S.taxOnline.expiresAt=Date.now()+TAX_CYCLE_MS;S.taxOnline.rate=pct/100;S.taxOnline.amount=amt;S.taxOnline.totalPaid=(S.taxOnline.totalPaid||0)+amt;S.taxOnline.payCount=(S.taxOnline.payCount||0)+1;
  save();head();sfx('coin');paneThue();toast('Đã nộp '+fmt(amt)+' · Buff +'+pct+'% trong 72h.');
}

function initKpiState(){
  S.staffKpi=S.staffKpi||{};S.kpiPeriodStats=S.kpiPeriodStats||{};S.staffSalesDays=S.staffSalesDays||0;
  STAFF.forEach(u=>{
    S.staffKpi[u.id]=S.staffKpi[u.id]||{trafficBuff:0,speedBuff:0,billBonus:0,level:0};
    S.kpiPeriodStats[u.id]=S.kpiPeriodStats[u.id]||{daysWorked:0,served:0,errors:0,wageEarned:0};
  });
}
function staffDisplayName(u){return (S.staffNames&&S.staffNames[u.id])||u.n}
function staffKhoHTML(){
  initKpiState();
  const active=STAFF.filter(u=>S.hired&&S.hired[u.id]),days=Math.min(7,S.staffSalesDays||0),ready=(S.staffSalesDays||0)>=7;
  const totalTraffic=STAFF.reduce((a,u)=>a+((S.staffKpi[u.id]&&S.staffKpi[u.id].trafficBuff)||0),0);
  const totalSpeed=STAFF.reduce((a,u)=>a+((S.staffKpi[u.id]&&S.staffKpi[u.id].speedBuff)||0),0);
  let h='<div class="kpi-cycle-banner"><div class="kpi-cycle-header"><div class="kpi-cycle-title">👥 Chu kỳ KPI nhân viên</div><span class="kpi-cycle-badge '+(ready?'ready':'')+'">'+(ready?'SẴN SÀNG XÉT':days+'/7 ngày')+'</span></div><div class="kpi-progress-bar"><div class="kpi-progress-fill" style="width:'+(ready?100:days/7*100)+'%"></div></div><div class="kpi-cycle-desc">Mỗi ngày bán sẽ ghi nhận ngày công và lượng khách phục vụ. Đủ 7 ngày có thể xét KPI.</div><div class="kpi-total-buffs"><span class="kpi-buff-pill traffic">📈 +'+Math.round(totalTraffic*100)+'% khách</span><span class="kpi-buff-pill speed">⚡ +'+Math.round(totalSpeed*100)+'% tốc độ</span></div></div>';
  if(!active.length)h+='<div class="note">Chưa từng tuyển nhân viên. Vào Nâng cấp → Nhân viên để tuyển.</div>';
  else h+=active.map(u=>{const ps=S.kpiPeriodStats[u.id],working=!!S.upg[u.id],k=S.staffKpi[u.id];return '<div class="staff-kho-row"><div class="staff-kho-info"><div class="staff-kho-avatar">👤</div><div class="staff-kho-details"><div class="staff-kho-name">'+staffDisplayName(u)+' <span class="'+(working?'kpi-status-working':'kpi-status-off')+'">'+(working?'Đang làm':'Đang nghỉ')+'</span></div><div class="staff-kho-sub">'+u.n+' · Lương '+fmt(CFG[u.wage]||0)+'/ngày</div><div class="staff-kho-kpi"><span>📅 '+(ps.daysWorked||0)+' ngày</span><span>🧋 '+(ps.served||0)+' khách</span><span>⭐ KPI '+(k.level||0)+'</span></div></div></div><button class="sbtn '+(working?'':'pri')+'" data-kpi-toggle="'+u.id+'">'+(working?'Cho nghỉ':'Gọi đi làm')+'</button></div>'}).join('');
  h+='<button id="btnOpenStaffKpi" class="big pri" style="width:100%" '+(ready?'':'disabled')+'>⭐ '+(ready?'Xét KPI chu kỳ':'Cần đủ 7 ngày bán')+'</button>';
  return h;
}
function paneKpi(){
  initKpiState();const p=$('pane');if(!p)return;p.innerHTML='<div class="kpi-pane-outer">'+staffKhoHTML()+'</div>';
  if($('btnOpenStaffKpi'))$('btnOpenStaffKpi').onclick=()=>openStaffKpiModal(false);
  p.querySelectorAll('[data-kpi-toggle]').forEach(b=>b.onclick=()=>{const id=b.dataset.kpiToggle,u=STAFF.find(x=>x.id===id);if(!u)return;S.hired=S.hired||{};if(S.upg[id]){S.upg[id]=false;toast('Đã cho '+staffDisplayName(u)+' nghỉ.')}else{if(!S.hired[id])return toast('Hãy tuyển nhân viên này trong Nâng cấp trước.');S.upg[id]=true;toast(staffDisplayName(u)+' đã đi làm lại.')}save();paneKpi();});
}
function openStaffKpiModal(){
  initKpiState();if((S.staffSalesDays||0)<7)return toast('Chưa đủ 7 ngày bán để xét KPI.');
  const list=STAFF.filter(u=>S.hired&&S.hired[u.id]);if(!list.length)return toast('Chưa có nhân viên để xét KPI.');
  const cards=list.map(u=>{const ps=S.kpiPeriodStats[u.id]||{},score=Math.max(0,Math.min(100,40+(ps.daysWorked||0)*8+Math.min(25,(ps.served||0)/4)-Math.min(25,(ps.errors||0)*8)));const tier=score>=80?'Xuất sắc':score>=55?'Đạt':'Cần cố gắng';return '<div class="kpi-eval-card"><div class="kpi-eval-head"><div class="kpi-eval-name">👤 '+staffDisplayName(u)+'</div><b>'+tier+'</b></div><div class="kpi-eval-stats">Ngày công: '+(ps.daysWorked||0)+' · Phục vụ: '+(ps.served||0)+' · Lỗi: '+(ps.errors||0)+'</div><div class="kpi-opt-group"><button class="kpi-opt-btn" data-kpi-grade="'+u.id+'" data-grade="good">⭐ Xuất sắc</button><button class="kpi-opt-btn" data-kpi-grade="'+u.id+'" data-grade="ok">✓ Đạt</button><button class="kpi-opt-btn" data-kpi-grade="'+u.id+'" data-grade="poor">⚠ Cần cải thiện</button></div></div>'}).join('');
  ask('<h2>⭐ Xét KPI nhân viên</h2><p class="note">Chọn đánh giá cho từng nhân viên. KPI tốt tạo buff dài hạn nhỏ cho quán.</p>'+cards,[['Đóng',()=>{}],['Hoàn tất chu kỳ',()=>{document.querySelectorAll('[data-kpi-grade]').forEach(()=>{});finishKpiCycle();},1]]);
  setTimeout(()=>document.querySelectorAll('[data-kpi-grade]').forEach(b=>b.onclick=()=>{document.querySelectorAll('[data-kpi-grade="'+b.dataset.kpiGrade+'"]').forEach(x=>x.classList.remove('active','active-bad'));b.classList.add(b.dataset.grade==='poor'?'active-bad':'active');S._kpiChoices=S._kpiChoices||{};S._kpiChoices[b.dataset.kpiGrade]=b.dataset.grade;}),20);
}
function finishKpiCycle(){
  initKpiState();const choices=S._kpiChoices||{};
  STAFF.filter(u=>S.hired&&S.hired[u.id]).forEach(u=>{const k=S.staffKpi[u.id],g=choices[u.id]||'ok';if(g==='good'){k.level=(k.level||0)+1;k.trafficBuff=Math.min(.20,(k.trafficBuff||0)+.01);k.speedBuff=Math.min(.20,(k.speedBuff||0)+.01)}else if(g==='poor'){k.level=Math.max(0,(k.level||0)-1);k.trafficBuff=Math.max(0,(k.trafficBuff||0)-.005);k.speedBuff=Math.max(0,(k.speedBuff||0)-.005)}});
  S.staffSalesDays=0;S._kpiChoices={};STAFF.forEach(u=>S.kpiPeriodStats[u.id]={daysWorked:0,served:0,errors:0,wageEarned:0});save();$('modal').hidden=true;renderPrep();toast('Đã hoàn tất chu kỳ KPI 7 ngày.');
}
function getKpiTrafficBoost(){
  initKpiState();return 1+STAFF.reduce((a,u)=>a+((S.upg[u.id]&&S.staffKpi[u.id]&&S.staffKpi[u.id].trafficBuff)||0),0);
}
function parityEndDay(rec){
  initKpiState();initBankState();
  S.staffSalesDays=(S.staffSalesDays||0)+1;
  const active=STAFF.filter(u=>S.upg&&S.upg[u.id]);
  const served=rec&&rec.served||0,each=active.length?Math.round(served/active.length):0;
  active.forEach(u=>{const ps=S.kpiPeriodStats[u.id];ps.daysWorked=(ps.daysWorked||0)+1;ps.served=(ps.served||0)+each;ps.wageEarned=(ps.wageEarned||0)+(CFG[u.wage]||0)});
  if(S.bankSaving.balance>0){const interest=Math.max(1,Math.round(S.bankSaving.balance*.01));S.bankSaving.balance+=interest;S.bankSaving.totalInterest=(S.bankSaving.totalInterest||0)+interest;S.bankSaving.daysPassed=(S.bankSaving.daysPassed||0)+1;}
  if(typeof rating==='function'&&rating()>=4.95&&!S._bankCapStarDay){S._bankCapStarDay=S.day;increaseBankCapOn5Star();}
}

Object.assign(window,{initTaxState,isTaxActive,isTaxOverdue,getTaxTrafficBoost,getTaxSpeedBuff,formatTaxTime,paneThue,onTaxSliderChange,executePayTax,openBankDepositDlg,openBankWithdrawDlg,paneKpi,openStaffKpiModal,getKpiTrafficBoost,parityEndDay});
initTaxState();initBankState();initKpiState();
})();
