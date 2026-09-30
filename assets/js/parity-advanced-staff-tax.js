/* ---------- STAFF / KPI ---------- */
function hireOrCallStaff(id,done){
  ensureAdvancedState();const u=STAFF.find(x=>x.id===id);if(!u)return;
  if(u.need&&!u.need())return toast(u.needT||'Chưa đủ điều kiện tuyển.');
  if(S.upg[id])return;
  if(S.hired[id]&&id!=='staffGz'){S.upg[id]=true;save();toast(staffPersonName(u)+' đã đi làm lại.');done&&done();return}
  if(S.money<u.cost)return toast('Két chưa đủ '+fmt(u.cost)+'.');
  S.money-=u.cost;S.cur.equip.push({n:'Thuê '+u.n,v:u.cost});S.upg[id]=true;S.hired[id]=true;save();head();toast('Đã tuyển '+u.n+'.');done&&done();
}
function fireStaff(id,done){
  const u=STAFF.find(x=>x.id===id);if(!u)return;S.upg[id]=false;save();toast('Đã cho '+staffPersonName(u)+' nghỉ.');done&&done();
}
function staffKhoHTMLAdvanced(){
  ensureAdvancedState();
  const days=Math.min(7,S.staffSalesDays||0),ready=days>=7;
  let h='<div class="kpi-cycle-banner"><div class="kpi-cycle-header"><b>👥 Chu kỳ KPI nhân viên</b><span class="kpi-cycle-badge '+(ready?'ready':'')+'">'+(ready?'SẴN SÀNG XÉT':days+'/7 ngày')+'</span></div><div class="kpi-progress-bar"><i style="width:'+Math.min(100,days/7*100)+'%"></i></div><div class="kpi-cycle-desc">Mỗi ngày bán ghi nhận ngày công, khách phục vụ và thưởng hiệu suất.</div><div class="kpi-total-buffs"><span>📈 +'+Math.round(getStaffTrafficBuffTotal()*100)+'% khách</span><span>⚡ +'+Math.round(getStaffSpeedBuff()*100)+'% tốc độ</span><span>💵 +'+Math.round(getStaffBillBonusTotal()*100)+'% bill</span></div></div>';
  h+=STAFF.map(u=>{const hired=!!S.hired[u.id],active=isStaffActive(u.id),ps=S.kpiPeriodStats[u.id]||{},k=S.staffKpi[u.id]||{};const lock=S.day<(u.from||1),need=u.need&&!u.need();return '<div class="staff-kho-row"><div class="staff-kho-info">'+staffAvatarImg(u)+'<div class="staff-kho-details"><div class="staff-kho-name">'+esc(staffPersonName(u))+' <span class="'+(active?'kpi-status-working':'kpi-status-off')+'">'+(active?'Đang làm':hired?'Đang nghỉ':'Chưa tuyển')+'</span></div><div class="staff-kho-sub">'+esc(u.n)+' · Lương '+fmt(CFG[u.wage]||0)+'/ngày</div><div class="staff-kho-kpi"><span>📅 '+(ps.daysWorked||0)+'</span><span>🧋 '+(ps.served||0)+'</span><span>⭐ KPI '+(k.level||0)+'</span></div></div></div><div class="staff-kho-actions">'+(active?'<button class="sbtn" data-kpi-fire="'+u.id+'">Cho nghỉ</button>':lock?'<span class="wl">Ngày '+u.from+'</span>':need?'<span class="wl">'+esc(u.needT||'Chưa đủ điều kiện')+'</span>':'<button class="sbtn pri" data-kpi-hire="'+u.id+'" '+(!hired&&S.money<u.cost?'disabled':'')+'>'+(hired?'Gọi đi làm':'Thuê '+fmt(u.cost))+'</button>')+'</div></div>'}).join('');
  h+='<button id="btnOpenStaffKpi" class="big pri" style="width:100%" '+(ready?'':'disabled')+'>⭐ '+(ready?'Xét KPI chu kỳ':'Cần đủ 7 ngày bán')+'</button>';
  return h;
}
function paneKpiAdvanced(){
  const p=$('pane');if(!p)return;p.innerHTML='<div class="kpi-pane-outer">'+staffKhoHTMLAdvanced()+'</div>';
  const k=$('btnOpenStaffKpi');if(k)k.onclick=()=>openStaffKpiModalAdvanced(false);
  p.onclick=e=>{const a=e.target.closest('[data-kpi-hire]'),b=e.target.closest('[data-kpi-fire]');if(a)hireOrCallStaff(a.dataset.kpiHire,()=>paneKpiAdvanced());if(b)fireStaff(b.dataset.kpiFire,()=>paneKpiAdvanced())};
}
function kpiTier(ps){if((ps.daysWorked||0)>=5&&(ps.errors||0)<=2)return'excellent';if((ps.daysWorked||0)>=3)return'standard';return'poor'}
function kpiCalc(u,choice){
  const ps=S.kpiPeriodStats[u.id]||{},rev=S.kpiPeriodTotalRev||0,bills=S.kpiPeriodTotalBills||0,wage=ps.wageEarned||((ps.daysWorked||0)*(CFG[u.wage]||0));
  if(choice==='excellent'){const share=Math.max(Math.round(rev*.01),Math.round(bills*500));return{bonus:100000,share,adjust:100000+share,wage}}
  if(choice==='standard'){const share=Math.max(Math.round(rev*.005),Math.round(bills*250));return{bonus:50000,share,adjust:50000+share,wage}}
  return{bonus:0,share:0,adjust:-Math.round(wage*.20),wage};
}
function openStaffKpiModalAdvanced(){
  ensureAdvancedState();if((S.staffSalesDays||0)<7)return toast('Chưa đủ 7 ngày bán để xét KPI.');
  const list=STAFF.filter(u=>S.hired[u.id]);if(!list.length)return toast('Chưa có nhân viên để xét KPI.');
  S._kpiChoices=S._kpiChoices||{};list.forEach(u=>{if(!S._kpiChoices[u.id])S._kpiChoices[u.id]=kpiTier(S.kpiPeriodStats[u.id]||{})});
  const cards=list.map(u=>{const ps=S.kpiPeriodStats[u.id]||{},ch=S._kpiChoices[u.id],cal=kpiCalc(u,ch);return '<div class="kpi-eval-card"><div class="kpi-eval-head">'+staffAvatarImg(u)+'<div><b>'+esc(staffPersonName(u))+'</b><small>'+((ps.daysWorked||0))+' ngày · '+(ps.served||0)+' khách · '+(ps.errors||0)+' lỗi</small></div></div><div class="kpi-opt-group"><button data-kpi-grade="'+u.id+'" data-grade="excellent" class="kpi-opt-btn '+(ch==='excellent'?'active':'')+'">⭐ Xuất sắc</button><button data-kpi-grade="'+u.id+'" data-grade="standard" class="kpi-opt-btn '+(ch==='standard'?'active':'')+'">✓ Đạt</button><button data-kpi-grade="'+u.id+'" data-grade="poor" class="kpi-opt-btn '+(ch==='poor'?'active-bad':'')+'">⚠ Cần cải thiện</button></div><div class="kpi-pay-preview">Điều chỉnh kỳ này: <b>'+(cal.adjust>=0?'+':'')+fmt(cal.adjust)+'</b></div></div>'}).join('');
  ask('<h2>⭐ Xét KPI chu kỳ 7 ngày</h2><div id="kpiScrollList" class="kpi-scroll-list">'+cards+'</div>',[['Để sau',()=>{}],['Xác nhận KPI',confirmKpiCycle,1]]);
  setTimeout(()=>document.querySelectorAll('[data-kpi-grade]').forEach(b=>b.onclick=()=>{S._kpiChoices[b.dataset.kpiGrade]=b.dataset.grade;openStaffKpiModalAdvanced(false)}),20);
}
function confirmKpiCycle(){
  const list=STAFF.filter(u=>S.hired[u.id]);let total=0;
  list.forEach(u=>{const ch=S._kpiChoices?.[u.id]||'standard',cal=kpiCalc(u,ch),k=S.staffKpi[u.id];total+=cal.adjust;if(ch==='excellent'){k.level=(k.level||0)+1;k.trafficBuff=Math.min(.20,(k.trafficBuff||0)+.01);k.speedBuff=Math.min(.20,(k.speedBuff||0)+.01);k.billBonus=Math.min(.10,(k.billBonus||0)+.005)}else if(ch==='poor'){k.level=Math.max(0,(k.level||0)-1);k.trafficBuff=Math.max(0,(k.trafficBuff||0)-.005);k.speedBuff=Math.max(0,(k.speedBuff||0)-.005);k.billBonus=Math.max(0,(k.billBonus||0)-.0025)}});
  if(total>0&&S.money<total)return toast('Két chưa đủ '+fmt(total)+' để thanh toán thưởng KPI.');
  S.money-=total;S.staffSalesDays=0;S.kpiPeriodStats={};S.kpiPeriodTotalRev=0;S.kpiPeriodTotalBills=0;S._kpiChoices={};ensureAdvancedState();save();head();$('modal').hidden=true;renderPrep();toast(total>=0?'Đã chốt KPI và thanh toán '+fmt(total)+'.':'Đã chốt KPI, hoàn lại '+fmt(-total)+' vào két.');
}
function triggerStaffStrike(reason){
  const list=getActiveStaffList();if(!list.length)return;
  list.forEach(u=>{S.upg[u.id]=false});save();toast('Nhân viên đồng loạt xin nghỉ: '+(reason||'mâu thuẫn KPI')+'.');
}
function staffDramaCheck(){
  const list=getActiveStaffList();if(!list.length||Math.random()>.06)return null;
  const u=list[Math.floor(Math.random()*list.length)];return{u,msg:staffPersonName(u)+' xin đổi ca vì có việc cá nhân.'};
}
function checkStaffExcuses(next){
  const d=staffDramaCheck();if(!d)return next();
  ask('<div class="pbig">💬</div><h2>Nhân viên xin đổi ca</h2><p><b>'+esc(d.u.n)+':</b> '+esc(d.msg)+'</p>',[['Cho nghỉ hôm nay',()=>{R.staffExcused=R.staffExcused||{};R.staffExcused[d.u.id]=true;R.staffExcusedRestore=R.staffExcusedRestore||[];R.staffExcusedRestore.push(d.u.id);S.upg[d.u.id]=false;next()},1],['Vẫn đi làm',next]]);
}
function checkEquipBreakdown(){
  const list=UPG.filter(u=>S.upg[u.id]);if(!list.length||Math.random()>.03)return null;
  const u=list[Math.floor(Math.random()*list.length)],cost=Math.max(20000,Math.round(u.cost*.05));
  if(S.money>=cost){S.money-=cost;S.cur.equip.push({n:'Sửa '+u.n,v:cost});save();head();toast('🔧 '+u.n+' vừa bảo trì nhanh: -'+fmt(cost));}
  return u;
}

/* ---------- TAX / BANK ---------- */
function richerTaxPane(){
  ensureAdvancedState();initTaxState();checkMktAutoPayTax();advancedTaxBankPenalty();
  const p=$('pane');if(!p)return;
  const t=S.taxOnline,b=S.bankSaving,active=isTaxActive(),over=isTaxOverdue(),money=S.money||0;
  if(!window._selectedTaxPct||window._selectedTaxPct<5||window._selectedTaxPct>15)window._selectedTaxPct=15;
  const pct=Math.max(5,Math.min(15,window._selectedTaxPct)),amt=Math.round(money*pct/100),rate=Math.round((t.rate||pct/100)*100);
  let status;
  if(active)status='<div class="tax-status-box active"><div class="tax-status-head"><b>🟢 ĐÃ ĐÓNG THUẾ HỢP LỆ — ĐANG ĐƯỢC BẢO HỘ 72H</b><span id="taxCountdownLive" class="tax-timer-badge">⏳ '+formatTaxTime(t.expiresAt-Date.now())+'</span></div><div class="tax-buff-grid"><div>📈 <b>+'+rate+'% khách ghé</b><small>Uy tín minh bạch</small></div><div>⚡ <b>+'+rate+'% tốc độ</b><small>Nhân viên an tâm</small></div><div>🛡️ <b>Giảm '+rate+'% gian lận</b><small>Hạn chế rủi ro bill</small></div><div>💎 <b>+'+rate+'% cơ hội x2 bill</b><small>Khách sộp thưởng thêm</small></div></div></div>';
  else if(over)status='<div class="tax-status-box overdue"><div class="tax-status-head"><b>🔴 QUÁ HẠN ĐÓNG THUẾ 72H</b><span id="taxCountdownLive" class="tax-timer-badge">⚠️ '+formatTaxTime(Date.now()-t.expiresAt)+'</span></div><div class="tax-buff-grid"><div>🚨 <b>Rủi ro tiền giả/trộm tăng</b><small>Quán bị giám sát</small></div><div>😤 <b>Khách khó tính hơn</b><small>Dễ mất kiên nhẫn</small></div><div>💔 <b>-20% hiệu suất</b><small>Nhân viên bất mãn</small></div></div></div>';
  else status='<div class="tax-status-box grace"><div class="tax-status-head"><b>🟡 ĐANG TRONG THỜI GIAN ÂN HẠN 72H</b><span id="taxCountdownLive" class="tax-timer-badge">⏳ '+formatTaxTime(t.expiresAt-Date.now())+'</span></div><p>Đóng thuế để mở bảo hộ và các buff vận hành.</p></div>';
  const gain=Math.max(0,b.balance-b.principal),progress=Math.min(100,(b.daysPassed||0)/(b.termDays||7)*100);
  p.innerHTML='<div class="tax-pane-wrap"><div class="tax-pane-title"><h2>🏛️ ĐÓNG THUẾ TRỰC TUYẾN 72H (3 NGÀY THỰC)</h2><small>Mức 5–15% tính trên két hiện tại; mức đã đóng quyết định buff.</small></div>'+status+'<div class="tax-slider-card"><div class="tax-row"><b>Chọn mức đóng thuế</b><b id="taxSelectedPct">'+pct+'%</b></div><input id="taxRangeIn" class="tax-range-input" type="range" min="5" max="15" step="1" value="'+pct+'"><div class="tax-pills">'+[5,8,10,12,15].map(v=>'<button data-tax-pct="'+v+'" class="tax-pct-pill '+(v===pct?'on':'')+'">'+v+'%'+(v===5?' · Tối thiểu':v===15?' · Tối đa':'')+'</button>').join('')+'</div><div class="tax-amount-row"><span>Số tiền thuế cần nộp</span><b id="taxSelectedAmt">'+fmt(amt)+'</b></div><div class="tax-benefit-line">Quyền lợi dự kiến: <b>Buff +'+pct+'% / 72h</b></div><button id="btnPayTax" class="big pri">🏛️ Nộp thuế ngay '+fmt(amt)+'</button></div><div class="tatua-bank-card"><div class="bank-head"><div><b>🏦 BẢO HỘ TÀI CHÍNH · NGÂN HÀNG TIỆM TRÀ NHỎ</b><small>Lãi kép 1% mỗi ngày bán</small></div><span>Hạn mức '+fmt(b.cap)+'</span></div><div class="bank-grid"><div><small>Tiền gửi hiện tại</small><b>'+fmt(b.balance)+'</b><small>Gốc '+fmt(b.principal)+' · lãi +'+fmt(gain)+'</small></div><div><small>Kỳ hạn</small><b>'+(b.daysPassed||0)+'/'+(b.termDays||7)+' ngày</b><div class="bank-progress"><i style="width:'+progress+'%"></i></div></div></div><div class="bank-actions"><button id="btnBankDeposit" class="sbtn pri">➕ Gửi tiết kiệm</button><button id="btnBankWithdraw" class="sbtn">💸 Rút tiền</button></div></div><div class="tax-policy-note"><b>📜 Chính sách:</b> hiệu lực thuế kéo dài 72 giờ thực. Tiền gửi tăng lãi theo ngày bán; hạn mức tăng dần khi quán duy trì đánh giá cao. Nếu nợ thuế kéo dài, sổ tiết kiệm có thể mất bảo hộ.</div><div class="note">Tổng thuế đã nộp: <b>'+fmt(t.totalPaid||0)+'</b> · '+(t.payCount||0)+' lần</div></div>';
  const rng=$('taxRangeIn');if(rng)rng.oninput=()=>{window._selectedTaxPct=+rng.value;richerTaxPane()};
  p.querySelectorAll('[data-tax-pct]').forEach(x=>x.onclick=()=>{window._selectedTaxPct=+x.dataset.taxPct;richerTaxPane()});
  $('btnPayTax').onclick=payTaxAdvanced;$('btnBankDeposit').onclick=openBankDepositAdvanced;$('btnBankWithdraw').onclick=openBankWithdrawAdvanced;
  if(window._taxLiveInterval)clearInterval(window._taxLiveInterval);window._taxLiveInterval=setInterval(()=>{const e=$('taxCountdownLive');if(!e){clearInterval(window._taxLiveInterval);return}e.textContent=(isTaxOverdue()?'⚠️ ':'⏳ ')+formatTaxTime(Math.abs(S.taxOnline.expiresAt-Date.now()))},1000);
}

function payTaxAdvanced(){
  ensureAdvancedState();initTaxState();
  const pct=Math.max(5,Math.min(15,window._selectedTaxPct||15)),amt=Math.round((S.money||0)*pct/100);
  if(amt<=0)return toast('Két chưa có tiền để nộp thuế.');
  if(S.money<amt)return toast('Két không đủ tiền.');
  S.money-=amt;S.taxOnline.paidAt=Date.now();S.taxOnline.expiresAt=Date.now()+TAX_CYCLE;S.taxOnline.rate=pct/100;S.taxOnline.amount=amt;S.taxOnline.totalPaid=(S.taxOnline.totalPaid||0)+amt;S.taxOnline.payCount=(S.taxOnline.payCount||0)+1;save();head();sfx('coin');toast('✅ Đã nộp '+fmt(amt)+' · bảo hộ 72 giờ được kích hoạt.');richerTaxPane();
}
function openBankDepositAdvanced(){
  ensureAdvancedState();const b=S.bankSaving,max=Math.max(0,Math.min(S.money,b.cap-b.balance));if(max<=0)return toast(b.balance>=b.cap?'Sổ tiết kiệm đã đạt hạn mức.':'Két không có tiền để gửi.');
  const terms=[7,14,21,28,35];
  ask('<h2>🏦 Gửi tiết kiệm</h2><p>Hạn mức còn: <b>'+fmt(b.cap-b.balance)+'</b></p><input id="bankAmtIn" class="pinbox nm" inputmode="numeric" value="'+Math.min(max,1000000)+'" aria-label="Số tiền gửi"><select id="bankTermIn" class="pinbox nm" style="width:100%;margin-top:8px">'+terms.map(x=>'<option value="'+x+'" '+(x===b.termDays?'selected':'')+'>'+x+' ngày bán</option>').join('')+'</select><p class="note">Lãi kép 1% mỗi ngày bán. Rút trước hạn chỉ nhận lại tiền gốc.</p>', [['Huỷ',()=>{}],['Gửi tiền',()=>{const n=Math.max(0,Math.min(max,Number(String($('bankAmtIn').value).replace(/[^0-9]/g,''))||0));if(n<=0)return toast('Nhập số tiền hợp lệ.');S.money-=n;b.balance+=n;b.principal+=n;b.termDays=Number($('bankTermIn').value)||7;b.daysPassed=0;save();head();richerTaxPane();toast('Đã gửi '+fmt(n)+' vào sổ tiết kiệm.')},1]]);
}
function openBankWithdrawAdvanced(){
  ensureAdvancedState();const b=S.bankSaving;if(b.balance<=0)return toast('Sổ tiết kiệm chưa có tiền.');
  const matured=(b.daysPassed||0)>=(b.termDays||7),principal=b.principal||b.balance,interest=Math.max(0,b.balance-principal),receive=matured?b.balance:principal;
  ask('<h2>💸 Rút tiết kiệm</h2><p>Tiến độ: <b>'+(b.daysPassed||0)+'/'+(b.termDays||7)+' ngày</b></p><p>Gốc: '+fmt(principal)+' · Lãi: +'+fmt(interest)+'</p><p>'+(matured?'Đã đủ kỳ hạn, nhận cả gốc và lãi.':'Chưa đủ kỳ hạn: rút bây giờ sẽ mất phần lãi đã phát sinh.')+'</p>', [['Để lại',()=>{}],['Rút '+fmt(receive),()=>{S.money+=receive;b.balance=0;b.principal=0;b.daysPassed=0;save();head();richerTaxPane();toast('Đã rút '+fmt(receive)+' về két.')},1]]);
}
function advancedTaxBankPenalty(){
  ensureAdvancedState();initTaxState();if(!isTaxOverdue()||!S.bankSaving.balance)return false;const overdue=Date.now()-S.taxOnline.expiresAt;if(overdue<12*60*60*1000)return false;if(checkMktAutoPayTax())return false;const lost=S.bankSaving.balance;S.bankSaving.balance=0;S.bankSaving.principal=0;S.bankSaving.daysPassed=0;save();ask('<div class="pbig">🏛️⚖️</div><h2>TIỀN GỬI MẤT BẢO HỘ</h2><p>Quán đã quá hạn đóng thuế hơn 12 giờ. <b>'+fmt(lost)+'</b> trong sổ tiết kiệm bị thu hồi.</p>',[['Đã hiểu',()=>{if(R.mode==='prep')renderPrep()},1]]);return true;
}

function checkMktAutoPayTax(){
  ensureAdvancedState();if(!isStaffActive('staffMkt')||!isTaxOverdue())return false;
  const overdue=Date.now()-S.taxOnline.expiresAt;if(overdue<12*60*60*1000||S.money<100000)return false;
  const pct=[8,10,12,15][Math.floor(Math.random()*4)],amt=Math.round(S.money*pct/100);if(amt<=0)return false;
  S.money-=amt;S.taxOnline.paidAt=Date.now();S.taxOnline.expiresAt=Date.now()+TAX_CYCLE;S.taxOnline.rate=pct/100;S.taxOnline.amount=amt;S.taxOnline.totalPaid=(S.taxOnline.totalPaid||0)+amt;S.taxOnline.payCount=(S.taxOnline.payCount||0)+1;save();head();toast('📊 Me két tinh đã tự nộp '+pct+'% thuế ('+fmt(amt)+') để khôi phục bảo hộ.',4200,1);return true;
}
