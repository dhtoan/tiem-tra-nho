/* Tiệm Trà Nhỏ - complete parity/content layer.
   Reimplements richer gameplay interactions and page content in Aunomay's own runtime. */
(function(){
'use strict';

const COMPLETE_VERSION='1.2.0-complete';
const $c=id=>document.getElementById(id);
const safe=v=>String(v==null?'':v).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const money=v=>typeof fmt==='function'?fmt(Math.round(Number(v)||0)):String(Math.round(Number(v)||0));
const roleMeta={
  staff0:{icon:'🧑‍🍳',role:'Thử việc 0 lương',note:'Phụ rót trà và xúc đá. Có thể lơ là hoặc làm sai nếu thiếu giám sát.'},
  staff1:{icon:'🫖',role:'Thử việc chính thức',note:'Phụ trà, hương, đường và đá. Phù hợp ca ít khách.'},
  staff2:{icon:'🥤',role:'Nhân viên pha chế',note:'Nhận khách từ vị trí thứ 3 trở đi và hoàn thành trọn ly.'},
  staffOn:{icon:'📱',role:'Nhân viên đơn online',note:'Chuyên xử lý đơn giao hàng, không tranh khách tại quầy.'},
  staff3:{icon:'🧑‍💼',role:'Quản lý tập sự',note:'Phụ nhiều bước pha chế và topping, giảm tải cho chủ quán.'},
  staffGz:{icon:'⚡',role:'Nhân viên Gen Z',note:'Pha A-Z rất nhanh nhưng có sự kiện cảm xúc và rủi ro đá bill.'},
  staffBuyer:{icon:'🛵',role:'Nhân viên đi chợ',note:'Nhập gấp nguyên liệu giữa ca khi kho cạn; nhiều chuyến làm tăng rủi ro kê chênh.'},
  staffSv:{icon:'🌙',role:'Sinh viên cuối tháng',note:'Trực ca đêm 22:00–06:00 và tự động xử lý ly trong ca đêm.'},
  staffMkt:{icon:'📣',role:'Me Két Tinh',note:'Tăng lưu lượng, hỗ trợ tốc độ, phản hồi đánh giá và xử lý thuế quá hạn.'}
};
function staffObj(x){return typeof x==='string'?STAFF.find(u=>u.id===x):x}
function staffNameC(x){
  const u=staffObj(x);if(!u)return 'Nhân viên';
  const n=S.staffNames&&S.staffNames[u.id];
  return n?String(n):u.n;
}
function staffIcon(id){return (roleMeta[id]&&roleMeta[id].icon)||'👤'}
function staffMeta(id){return roleMeta[id]||{icon:'👤',role:(staffObj(id)||{}).n||'Nhân viên',note:(staffObj(id)||{}).d||''}}
function activeStaff(){return STAFF.filter(u=>S.upg&&S.upg[u.id])}
function hiredStaff(){return STAFF.filter(u=>S.hired&&S.hired[u.id])}
function ensureCompleteState(){
  S.staffKpi=S.staffKpi||{};S.kpiPeriodStats=S.kpiPeriodStats||{};S.hired=S.hired||{};S.upg=S.upg||{};
  STAFF.forEach(u=>{
    S.staffKpi[u.id]=S.staffKpi[u.id]||{trafficBuff:0,speedBuff:0,billBonus:0,level:0};
    S.kpiPeriodStats[u.id]=S.kpiPeriodStats[u.id]||{daysWorked:0,served:0,errors:0,wageEarned:0};
  });
  S.complete=S.complete||{reviewFilter:'all',reviewSource:'all',kpiChoices:{},incidentDay:0};
}

/* ---------------- KPI / NHÂN VIÊN ---------------- */
function kpiTierC(u){
  const ps=S.kpiPeriodStats[u.id]||{};
  if((ps.daysWorked||0)>=5&&(ps.errors||0)<=2)return'excellent';
  if((ps.daysWorked||0)>=3)return'standard';
  return'poor';
}
function kpiCalcC(u,choice){
  const ps=S.kpiPeriodStats[u.id]||{},rev=S.kpiPeriodTotalRev||0,bills=S.kpiPeriodTotalBills||0;
  const wage=ps.wageEarned!=null?ps.wageEarned:(ps.daysWorked||0)*(CFG[u.wage]||0);
  if(choice==='excellent'){
    const share=Math.max(Math.round(rev*.01),Math.round(bills*500));
    return{adjust:100000+share,bonus:100000,share,wage,label:'Xuất sắc'};
  }
  if(choice==='standard'){
    const share=Math.max(Math.round(rev*.005),Math.round(bills*250));
    return{adjust:50000+share,bonus:50000,share,wage,label:'Đạt'};
  }
  return{adjust:-Math.round(wage*.20),bonus:0,share:0,wage,label:'Cần cải thiện'};
}
function kpiBuffText(u){
  const k=S.staffKpi[u.id]||{};
  return 'Khách +'+Math.round((k.trafficBuff||0)*100)+'% · Tốc độ +'+Math.round((k.speedBuff||0)*100)+'% · Bill +'+((k.billBonus||0)*100).toFixed(1).replace('.0','')+'%';
}
function staffCardC(u){
  const ps=S.kpiPeriodStats[u.id]||{},k=S.staffKpi[u.id]||{},meta=staffMeta(u.id);
  const active=!!S.upg[u.id],hired=!!S.hired[u.id],locked=S.day<(u.from||1),need=u.need&&!u.need();
  const wage=CFG[u.wage]||0;
  let action='';
  if(active)action='<button class="sbtn" data-complete-fire="'+u.id+'">Cho nghỉ</button>';
  else if(locked)action='<span class="complete-lock">Ngày '+(u.from||1)+'</span>';
  else if(need)action='<span class="complete-lock">'+safe(u.needT||'Chưa đủ điều kiện')+'</span>';
  else action='<button class="sbtn pri" data-complete-hire="'+u.id+'" '+(!hired&&S.money<u.cost?'disabled':'')+'>'+(hired?'Gọi đi làm':'Thuê '+money(u.cost))+'</button>';
  return '<article class="complete-staff-card '+(active?'is-active':'')+'">'+
    '<div class="complete-staff-avatar">'+staffIcon(u.id)+'</div>'+
    '<div class="complete-staff-main"><div class="complete-staff-title"><b>'+safe(staffNameC(u))+'</b><span>'+(active?'Đang làm':hired?'Đang nghỉ':'Chưa tuyển')+'</span></div>'+
    '<div class="complete-staff-role">'+safe(meta.role)+' · '+money(wage)+'/ngày</div>'+
    '<p>'+safe(meta.note)+'</p>'+
    '<div class="complete-staff-metrics"><span>📅 '+(ps.daysWorked||0)+' ngày</span><span>🧋 '+(ps.served||0)+' khách</span><span>⚠️ '+(ps.errors||0)+' lỗi</span><span>⭐ KPI '+(k.level||0)+'</span></div>'+
    '<div class="complete-staff-buffs">'+safe(kpiBuffText(u))+'</div></div>'+
    '<div class="complete-staff-action">'+action+'</div></article>';
}
function completePaneKpi(){
  ensureCompleteState();const p=$c('pane');if(!p)return;
  const days=Math.min(7,S.staffSalesDays||0),ready=days>=7;
  const active=STAFF.filter(u=>S.upg[u.id]),rest=STAFF.filter(u=>S.hired[u.id]&&!S.upg[u.id]),newcomers=STAFF.filter(u=>!S.hired[u.id]);
  p.innerHTML='<div class="complete-page complete-kpi-page">'+
    '<section class="complete-hero"><div><h2>👥 Chu kỳ KPI nhân viên</h2><p>Ghi nhận 7 ngày bán: ngày công, số khách, lỗi vận hành và tiền lương thực tế.</p></div><b class="complete-badge">'+days+'/7 ngày</b></section>'+
    '<div class="complete-progress"><i style="width:'+Math.min(100,days/7*100)+'%"></i></div>'+
    '<div class="complete-buff-row"><span>📈 Buff khách: +'+Math.round((typeof getStaffTrafficBuffTotal==='function'?getStaffTrafficBuffTotal():0)*100)+'%</span><span>⚡ Tốc độ: +'+Math.round((typeof getStaffSpeedBuff==='function'?getStaffSpeedBuff():0)*100)+'%</span><span>💵 Bill: +'+Math.round((typeof getStaffBillBonusTotal==='function'?getStaffBillBonusTotal():0)*100)+'%</span></div>'+
    '<section class="complete-section"><h3>🟢 Đang làm ('+active.length+')</h3>'+(active.map(staffCardC).join('')||'<div class="complete-empty">Chưa có nhân viên đang làm.</div>')+'</section>'+
    (rest.length?'<section class="complete-section"><h3>⏸️ Đang nghỉ ('+rest.length+')</h3>'+rest.map(staffCardC).join('')+'</section>':'')+
    (newcomers.length?'<section class="complete-section"><h3>➕ Có thể tuyển ('+newcomers.length+')</h3>'+newcomers.map(staffCardC).join('')+'</section>':'')+
    '<section class="complete-kpi-policy"><b>Quy tắc chu kỳ</b><p>Đủ 7 ngày bán mới chốt KPI. Xuất sắc nhận thưởng + chia doanh thu; Đạt nhận thưởng cơ bản; Cần cải thiện hoàn lại 20% lương kỳ vào két. Không xử lý kỳ KPI đúng hạn có thể dẫn đến đình công.</p></section>'+
    '<button id="completeKpiBtn" class="big pri" '+(ready?'':'disabled')+'>⭐ '+(ready?'Xét KPI & thanh toán':'Cần đủ 7 ngày bán')+'</button></div>';
  p.onclick=e=>{
    const h=e.target.closest('[data-complete-hire]'),f=e.target.closest('[data-complete-fire]');
    if(h&&typeof hireOrCallStaff==='function')hireOrCallStaff(h.dataset.completeHire,completePaneKpi);
    if(f&&typeof fireStaff==='function')fireStaff(f.dataset.completeFire,completePaneKpi);
  };
  const b=$c('completeKpiBtn');if(b)b.onclick=()=>completeOpenKpi(false);
}
function completeKpiCard(u){
  const ps=S.kpiPeriodStats[u.id]||{},choice=S.complete.kpiChoices[u.id]||kpiTierC(u),calc=kpiCalcC(u,choice);
  return '<article class="complete-kpi-card"><div class="complete-kpi-card-head"><div class="complete-staff-avatar">'+staffIcon(u.id)+'</div><div><b>'+safe(staffNameC(u))+'</b><small>'+safe(staffMeta(u.id).role)+'</small></div><strong>'+(ps.daysWorked||0)+'/7</strong></div>'+
    '<div class="complete-kpi-stats"><span>🧋 '+(ps.served||0)+' khách</span><span>⚠️ '+(ps.errors||0)+' lỗi</span><span>💰 Lương '+money(calc.wage)+'</span></div>'+
    '<div class="complete-kpi-choice"><button data-complete-grade="'+u.id+'" data-grade="excellent" class="'+(choice==='excellent'?'on':'')+'">⭐ Xuất sắc</button><button data-complete-grade="'+u.id+'" data-grade="standard" class="'+(choice==='standard'?'on':'')+'">✓ Đạt</button><button data-complete-grade="'+u.id+'" data-grade="poor" class="'+(choice==='poor'?'bad on':'')+'">⚠ Cần cải thiện</button></div>'+
    '<div class="complete-kpi-pay"><span>Điều chỉnh kỳ này</span><b class="'+(calc.adjust<0?'neg':'pos')+'">'+(calc.adjust>=0?'+':'')+money(calc.adjust)+'</b></div></article>';
}
function completeOpenKpi(isAuto){
  ensureCompleteState();const list=hiredStaff();if(!list.length)return toast('Chưa có nhân viên để xét KPI.');
  if((S.staffSalesDays||0)<7&&!isAuto)return toast('Cần đủ 7 ngày bán để xét KPI.');
  list.forEach(u=>{if(!S.complete.kpiChoices[u.id])S.complete.kpiChoices[u.id]=kpiTierC(u)});
  const total=()=>list.reduce((a,u)=>a+kpiCalcC(u,S.complete.kpiChoices[u.id]).adjust,0);
  const render=()=>{
    const t=total();
    ask('<div class="complete-modal"><h2>⭐ Xét KPI chu kỳ 7 ngày</h2><p class="complete-modal-lead">Chọn mức đánh giá cho từng nhân viên. Buff KPI sẽ ảnh hưởng trực tiếp đến khách, tốc độ và giá trị bill ở các chu kỳ sau.</p><div id="completeKpiList" class="complete-kpi-list">'+list.map(completeKpiCard).join('')+'</div><div class="complete-kpi-total"><span>Tổng điều chỉnh</span><b class="'+(t<0?'neg':'pos')+'">'+(t>=0?'+':'')+money(t)+'</b></div></div>',[
      ['Để sau',()=>{S.complete.kpiDeferredDay=S.day;save();}],
      ['Xác nhận KPI',completeConfirmKpi,1]
    ]);
    setTimeout(()=>document.querySelectorAll('[data-complete-grade]').forEach(btn=>btn.onclick=()=>{S.complete.kpiChoices[btn.dataset.completeGrade]=btn.dataset.grade;render()}),20);
  };
  render();
}
function completeConfirmKpi(){
  ensureCompleteState();const list=hiredStaff();let total=0;
  list.forEach(u=>{
    const choice=S.complete.kpiChoices[u.id]||kpiTierC(u),calc=kpiCalcC(u,choice),k=S.staffKpi[u.id];
    total+=calc.adjust;
    if(choice==='excellent'){
      k.level=(k.level||0)+1;k.trafficBuff=Math.min(.20,(k.trafficBuff||0)+.01);k.speedBuff=Math.min(.20,(k.speedBuff||0)+.01);k.billBonus=Math.min(.10,(k.billBonus||0)+.005);
    }else if(choice==='poor'){
      k.level=Math.max(0,(k.level||0)-1);k.trafficBuff=Math.max(0,(k.trafficBuff||0)-.005);k.speedBuff=Math.max(0,(k.speedBuff||0)-.005);k.billBonus=Math.max(0,(k.billBonus||0)-.0025);
    }
  });
  if(total>0&&S.money<total)return toast('Két chưa đủ '+money(total)+' để thanh toán KPI.');
  S.money-=total;S.staffSalesDays=0;S.kpiPeriodStats={};S.kpiPeriodTotalRev=0;S.kpiPeriodTotalBills=0;S.complete.kpiChoices={};S.complete.kpiDeferredDay=0;
  ensureCompleteState();save();head();if($c('modal'))$c('modal').hidden=true;renderPrep();toast(total>=0?'Đã chốt KPI và thanh toán '+money(total)+'.':'Đã chốt KPI, hoàn '+money(-total)+' về két.');
}
function completeStrike(reason){
  const list=hiredStaff();if(!list.length)return;
  const taken=Math.max(0,S.money||0),names=list.map(staffNameC);
  list.forEach(u=>{S.upg[u.id]=false;S.hired[u.id]=false;S.staffKpi[u.id]={trafficBuff:0,speedBuff:0,billBonus:0,level:0}});
  S.money=0;S.staffSalesDays=0;S.kpiPeriodStats={};S.kpiPeriodTotalRev=0;S.kpiPeriodTotalBills=0;S.complete.kpiChoices={};S.complete.kpiDeferredDay=0;
  save();head();ask('<div class="complete-modal complete-danger"><h2>🚨 Đình công tập thể</h2><p>'+safe(reason||'Kỳ KPI đã bị bỏ quá hạn')+'. Nhân viên nghỉ việc và dùng số tiền trong két để cấn trừ lương/thưởng còn tranh chấp.</p><div class="complete-alert">Nhân viên: <b>'+safe(names.join(', '))+'</b><br>Tiền két bị cấn trừ: <b>'+money(taken)+'</b></div></div>',[['Đã hiểu',()=>renderPrep(),1]]);
}
function checkKpiDeadlineC(){
  ensureCompleteState();
  if((S.staffSalesDays||0)<7||!hiredStaff().length)return true;
  if(!S.complete.kpiDeferredDay){S.complete.kpiDeferredDay=S.day;save();return true}
  if(S.day>S.complete.kpiDeferredDay){completeStrike('Đã bước sang ngày mới nhưng kỳ KPI 7 ngày trước chưa được xử lý');return false}
  return true;
}

/* ---------------- THUẾ / NGÂN HÀNG ---------------- */
const basePaneThueComplete=window.paneThue;
function completePaneThue(){
  if(typeof basePaneThueComplete==='function')basePaneThueComplete();
  const p=$c('pane');if(!p)return;
  const wrap=p.querySelector('.tax-pane-wrap')||p.firstElementChild;if(!wrap)return;
  const t=S.taxOnline||{},active=typeof isTaxActive==='function'&&isTaxActive(),over=typeof isTaxOverdue==='function'&&isTaxOverdue();
  const rate=Math.round((t.rate||0)*100),bank=S.bankSaving||{};
  const head=document.createElement('section');head.className='complete-tax-overview';
  head.innerHTML='<div><small>Tình trạng thuế</small><b>'+(active?'Đang được bảo hộ':over?'Đã quá hạn':'Đang trong hạn nộp')+'</b></div><div><small>Mức bảo hộ</small><b>'+(rate||0)+'%</b></div><div><small>Đã nộp</small><b>'+money(t.totalPaid||0)+'</b></div><div><small>Tiết kiệm</small><b>'+money(bank.balance||0)+'</b></div>';
  wrap.insertBefore(head,wrap.firstChild);
  const guide=document.createElement('section');guide.className='complete-tax-guide';
  guide.innerHTML='<h3>📜 Quyền lợi & chế tài 72 giờ thực</h3><div class="complete-policy-grid"><div><b>📈 Khách ghé</b><p>Mức thuế đã chọn tạo buff lưu lượng trong thời gian bảo hộ.</p></div><div><b>⚡ Hiệu suất</b><p>Nhân viên hưởng buff tốc độ; KPI và nâng cấp vẫn cộng dồn.</p></div><div><b>🛡️ Rủi ro</b><p>Giảm tác động tiền giả/gian lận; một số bill có cơ hội được bù hoặc nhân đôi.</p></div><div><b>🏦 Tiết kiệm</b><p>Quá hạn dài có thể làm mất bảo hộ sổ; Me Két Tinh có thể tự đóng cứu nguy.</p></div></div><p class="complete-note">Thuế trực tuyến trong game là cơ chế gameplay, không phải hướng dẫn thuế ngoài đời.</p>';
  wrap.appendChild(guide);
}
window.paneThue=completePaneThue;

/* ---------------- ĐÁNH GIÁ ---------------- */
function reviewStats(){
  const list=S.reviews||[],dist=[0,0,0,0,0];list.forEach(r=>{const s=Math.max(1,Math.min(5,Number(r.s)||1));dist[s-1]++});
  const avg=list.length?list.reduce((a,r)=>a+(Number(r.s)||0),0)/list.length:4;
  return{list,dist,avg};
}
function reviewFiltered(){
  ensureCompleteState();const f=S.complete.reviewFilter||'all',src=S.complete.reviewSource||'all';
  return (S.reviews||[]).filter(r=>{
    if(f!=='all'&&Number(r.s)!==Number(f))return false;
    if(src==='online'&&!r.o)return false;if(src==='store'&&r.o)return false;
    if(src==='unreplied'&&r.rp)return false;if(src==='replied'&&!r.rp)return false;
    return true;
  });
}
function reviewCardC(r,idx){
  const stars='★'.repeat(Math.max(1,Math.min(5,Number(r.s)||1)))+'☆'.repeat(5-Math.max(1,Math.min(5,Number(r.s)||1)));
  const meta=[r.o?'Đơn online':'Tại quầy',r.d?'Ngày '+r.d:'',r.tg||r.tag||''].filter(Boolean).join(' · ');
  return '<article class="complete-review-card"><div class="complete-review-head"><div><b>'+safe(r.n||'Khách')+'</b><small>'+safe(meta)+'</small></div><strong>'+stars+'</strong></div><p>'+safe(r.t||'')+'</p>'+
    (r.rp?'<div class="complete-owner-reply"><b>↳ Tiệm Trà Nhỏ</b><span>'+safe(r.rp)+'</span></div>':'<button class="sbtn" data-complete-reply="'+idx+'">💬 Trả lời</button>')+'</article>';
}
function renderReviewsInto(el,limit){
  ensureCompleteState();const st=reviewStats(),list=reviewFiltered(),shown=limit?list.slice(0,limit):list;
  el.innerHTML='<div class="complete-review-summary"><div><b>'+st.avg.toFixed(1).replace('.',',')+'</b><span>★★★★★</span><small>'+st.list.length+' đánh giá</small></div><div class="complete-review-bars">'+[5,4,3,2,1].map(n=>{const count=st.dist[n-1]||0,p=st.list.length?count/st.list.length*100:0;return'<div><span>'+n+'★</span><i><b style="width:'+p+'%"></b></i><em>'+count+'</em></div>'}).join('')+'</div></div>'+
    '<div class="complete-review-filters"><button data-rf="all" class="'+(S.complete.reviewFilter==='all'?'on':'')+'">Tất cả</button>'+[5,4,3,2,1].map(n=>'<button data-rf="'+n+'" class="'+(String(S.complete.reviewFilter)===String(n)?'on':'')+'">'+n+'★</button>').join('')+'</div>'+
    '<div class="complete-review-filters secondary"><button data-rs="all" class="'+(S.complete.reviewSource==='all'?'on':'')+'">Mọi nguồn</button><button data-rs="store" class="'+(S.complete.reviewSource==='store'?'on':'')+'">Tại quầy</button><button data-rs="online" class="'+(S.complete.reviewSource==='online'?'on':'')+'">Online</button><button data-rs="unreplied" class="'+(S.complete.reviewSource==='unreplied'?'on':'')+'">Chưa trả lời</button><button data-rs="replied" class="'+(S.complete.reviewSource==='replied'?'on':'')+'">Đã trả lời</button></div>'+
    (isStaffActive&&isStaffActive('staffMkt')?'<button id="completeMktReply" class="sbtn pri complete-auto-reply">📣 Me Két Tinh trả lời đánh giá chưa xử lý</button>':'')+
    '<div class="complete-review-list">'+(shown.map((r,i)=>reviewCardC(r,(S.reviews||[]).indexOf(r))).join('')||'<div class="complete-empty">Không có đánh giá phù hợp bộ lọc.</div>')+'</div>';
  el.querySelectorAll('[data-rf]').forEach(b=>b.onclick=()=>{S.complete.reviewFilter=b.dataset.rf;save();renderReviewsInto(el,limit)});
  el.querySelectorAll('[data-rs]').forEach(b=>b.onclick=()=>{S.complete.reviewSource=b.dataset.rs;save();renderReviewsInto(el,limit)});
  el.querySelectorAll('[data-complete-reply]').forEach(b=>b.onclick=()=>openReplyC(Number(b.dataset.completeReply),()=>renderReviewsInto(el,limit)));
  const m=$c('completeMktReply');if(m)m.onclick=()=>{if(typeof applyMktAutoReplies==='function'){const n=applyMktAutoReplies();toast('Đã xử lý '+(n||0)+' đánh giá.');renderReviewsInto(el,limit)}};
}
function openReplyC(idx,after){
  const r=(S.reviews||[])[idx];if(!r)return;
  ask('<div class="complete-modal"><h2>💬 Trả lời đánh giá</h2><p><b>'+safe(r.n||'Khách')+'</b> · '+(r.s||0)+'★</p><div class="complete-quote">'+safe(r.t||'')+'</div><textarea id="completeReplyInput" class="complete-textarea" maxlength="420" placeholder="Nhập phản hồi của Tiệm Trà Nhỏ...">'+safe(r.rp||'')+'</textarea></div>',[
    ['Huỷ',()=>{}],['Lưu phản hồi',()=>{const i=$c('completeReplyInput');const v=String(i&&i.value||'').trim();if(!v)return toast('Hãy nhập nội dung phản hồi.');r.rp=v;save();after&&after();},1]
  ]);
}
function completePaneRev(){
  const p=$c('pane');if(!p)return;p.innerHTML='<div class="complete-page"><section class="complete-hero"><div><h2>⭐ Trung tâm đánh giá</h2><p>Theo dõi phản hồi tại quầy, đơn online và hội thoại với khách.</p></div></section><div id="completeReviewsRoot"></div></div>';renderReviewsInto($c('completeReviewsRoot'));
}
function completeOpenSellReviewsModal(){
  ask('<div class="complete-modal"><h2>⭐ Đánh giá trong ca</h2><div id="completeSellReviews"></div></div>',[['Đóng',()=>{}]]);
  setTimeout(()=>{const el=$c('completeSellReviews');if(el)renderReviewsInto(el,10)},20);
}
function completeOpenSellModal(initTab='danhgia'){
  const tabs=[['danhgia','⭐ Đánh giá'],['kho','📦 Kho'],['nangcap','⚡ Nâng cấp'],['tongket','📊 Tổng kết']];
  ask('<div class="complete-sell-modal"><div class="complete-sell-tabs">'+tabs.map(t=>'<button data-complete-selltab="'+t[0]+'" class="'+(t[0]===initTab?'on':'')+'">'+t[1]+'</button>').join('')+'</div><div id="pane" class="pane sell-pane complete-sell-pane"></div></div>',[['Đóng quầy tra cứu',()=>{}]]);
  const render=tab=>{
    document.querySelectorAll('[data-complete-selltab]').forEach(b=>b.classList.toggle('on',b.dataset.completeSelltab===tab));
    if(tab==='danhgia')completePaneRev();
    else if(tab==='kho'&&typeof paneKho==='function')paneKho();
    else if(tab==='nangcap'&&typeof paneUpg==='function')paneUpg();
    else if(tab==='tongket'&&typeof paneSum==='function')paneSum();
  };
  document.querySelectorAll('[data-complete-selltab]').forEach(b=>b.onclick=()=>render(b.dataset.completeSelltab));render(initTab);
}
window.paneRev=completePaneRev;window.openSellReviewsModal=completeOpenSellReviewsModal;window.openSellModal=completeOpenSellModal;

/* ---------------- MARKETING ---------------- */
function completeMktReplies(){
  if(!isStaffActive('staffMkt'))return 0;let n=0;
  (S.reviews||[]).slice(0,30).forEach(r=>{
    if(r.rp)return;
    if((r.s||0)<=2)r.rp='Tiệm đã ghi nhận phản hồi và đang kiểm tra lại ca phục vụ liên quan. Cảm ơn bạn đã nói rõ trải nghiệm để chúng tôi xử lý tốt hơn.';
    else if((r.s||0)===3)r.rp='Cảm ơn bạn đã góp ý. Tiệm sẽ rà lại tốc độ phục vụ và công thức để lần ghé sau trọn vẹn hơn.';
    else r.rp='Cảm ơn bạn đã ghé Tiệm Trà Nhỏ. Rất vui vì bạn có trải nghiệm tốt và hẹn gặp lại ở lần order tiếp theo!';
    if(r.s<5&&Math.random()<.35)r.s++;n++;
  });if(n){save();head()}return n;
}
window.applyMktAutoReplies=completeMktReplies;

/* ---------------- ĐI CHỢ ---------------- */
function completeBuyerModal(){
  if(!isStaffActive('staffBuyer'))return toast('Chưa có nhân viên đi chợ đang làm.');
  const target=typeof findDepletedIngredient==='function'?findDepletedIngredient():null;
  const batch=typeof getBuyerBatch==='function'?getBuyerBatch(target):null;
  const trips=R.buyerTrips||0,risk=Math.min(45,Math.max(0,(trips-1)*8));
  const low=[...BASE_KEYS,...TOP_KEYS,'cup','ice','sugar'].filter(k=>S.stock&&S.stock[k]&&typeof qty==='function'&&qty(k)<=3).slice(0,8);
  ask('<div class="complete-modal"><h2>🛵 Điều phối đi chợ</h2><p class="complete-modal-lead">Nhân viên có thể nhập gấp giữa ca để tránh mất khách khi nguyên liệu cạn.</p><div class="complete-buyer-grid"><div><small>Chuyến hôm nay</small><b>'+trips+'</b></div><div><small>Rủi ro kê chênh</small><b>'+risk+'%</b></div><div><small>Món ưu tiên</small><b>'+safe(batch?(ITEMS[batch.k]?.n||batch.k):'Chưa có')+'</b></div><div><small>Chi phí dự kiến</small><b>'+money(batch?batch.cost:0)+'</b></div></div><div class="complete-stock-low"><b>Kho sắp cạn</b><p>'+(low.map(k=>safe((ITEMS[k]&&ITEMS[k].n)||k)+' ('+qty(k)+')').join(' · ')||'Chưa có nguyên liệu ở mức cảnh báo')+'</p></div></div>',[
    ['Đóng',()=>{}],...(batch?[['Đi nhập ngay',()=>staffBuyerTriggerInstant(batch.k),1]]:[])
  ]);
}
window.openBuyerDispatchModal=completeBuyerModal;

/* ---------------- SỰ CỐ NHÂN SỰ / TRANG BỊ ---------------- */
function completeCheckStaffExcuses(next){
  ensureCompleteState();if(!activeStaff().length||S.complete.lastExcuseDay===S.day||Math.random()>.08)return next();
  S.complete.lastExcuseDay=S.day;const u=activeStaff()[Math.floor(Math.random()*activeStaff().length)],meta=staffMeta(u.id);
  const reasons=['kẹt xe trên đường đến quán','có việc gia đình đột xuất','xin đi trễ vì lịch học/lịch cá nhân','cảm thấy không khỏe và xin đổi ca'];
  const reason=reasons[Math.floor(Math.random()*reasons.length)];
  ask('<div class="complete-modal"><h2>🗓️ Nhân viên xin đổi ca</h2><div class="complete-person-row"><span>'+staffIcon(u.id)+'</span><div><b>'+safe(staffNameC(u))+'</b><small>'+safe(meta.role)+'</small></div></div><p>'+safe(staffNameC(u))+' báo <b>'+safe(reason)+'</b>.</p><p class="complete-note">Cho nghỉ sẽ mất buff của nhân viên trong ca này; yêu cầu đi làm giữ đủ nhân lực nhưng có khả năng phát sinh lỗi.</p></div>',[
    ['Cho nghỉ hôm nay',()=>{R.staffExcusedRestore=R.staffExcusedRestore||[];R.staffExcusedRestore.push(u.id);S.upg[u.id]=false;save();toast(staffNameC(u)+' nghỉ ca hôm nay.');next();},1],
    ['Yêu cầu đi làm',()=>{R.staffDramaBuff=R.staffDramaBuff||{};R.staffDramaBuff[u.id]=-.10;save();toast(staffNameC(u)+' vẫn đi làm nhưng hiệu suất giảm 10% trong ca.');next();}]
  ]);
}
function completeCheckEquipBreakdown(){
  if(S.complete&&S.complete.lastBreakDay===S.day)return null;
  const list=UPG.filter(u=>S.upg&&S.upg[u.id]);if(!list.length||Math.random()>.025)return null;
  ensureCompleteState();S.complete.lastBreakDay=S.day;const u=list[Math.floor(Math.random()*list.length)],repair=Math.max(20000,Math.round((u.cost||100000)*.06));
  ask('<div class="complete-modal"><h2>🔧 Trang bị cần bảo trì</h2><p><b>'+safe(u.n)+'</b> có dấu hiệu trục trặc trước giờ mở cửa.</p><div class="complete-alert">Sửa nhanh: <b>'+money(repair)+'</b><br>Bỏ qua: thiết bị tạm ngừng hoạt động đến khi mua/sửa lại.</div></div>',[
    ['Tạm ngừng thiết bị',()=>{S.upg[u.id]=false;save();renderPrep();toast(u.n+' tạm ngừng hoạt động.');}],
    ['Sửa ngay '+money(repair),()=>{if(S.money<repair)return toast('Két không đủ tiền sửa.');S.money-=repair;S.cur.equip.push({n:'Bảo trì '+u.n,v:repair});save();head();toast('Đã bảo trì '+u.n+'.');},1]
  ]);return u;
}
window.checkStaffExcuses=completeCheckStaffExcuses;window.checkEquipBreakdown=completeCheckEquipBreakdown;

/* ---------------- GEN Z ---------------- */
function addStaffQuitReview(reason){
  const u=staffObj('staffGz'),name=staffNameC(u);
  const text=reason==='accuse'?'Nhân viên phản ánh bị kiểm tra bill sai thời điểm nhiều lần và đã nghỉ việc.':'Nhân viên phản ánh ca làm căng thẳng và đã nghỉ việc sau khi không được xử lý sự cố cảm xúc kịp thời.';
  const r={s:1,t:text,k:'staff_quit_'+Date.now(),d:S.day,o:false,n:name+' (cựu nhân viên)',f:'⚡',tg:'Phản hồi nhân viên'};
  S.reviews.unshift(r);S.revTotal=Math.max(S.revTotal||0,S.reviews.length-1)+1;if(R.today&&Array.isArray(R.today.stars))R.today.stars.push(1);
}
function completeGzQuit(reason){
  if(!S.upg.staffGz&&!S.hired.staffGz)return;
  const name=staffNameC('staffGz');S.upg.staffGz=false;S.hired.staffGz=false;S.staffKpi.staffGz={trafficBuff:0,speedBuff:0,billBonus:0,level:0};
  R.gzWork=null;R.gzSulking=false;R.gzSulkTimer=0;R.gzStolenRecent=false;R.gzCatchExpiresAt=0;R.gzLastStolenBill=0;
  addStaffQuitReview(reason);save();head();if(typeof renderGzWidget==='function')renderGzWidget();
  ask('<div class="complete-modal complete-danger"><h2>💔 '+safe(name)+' nghỉ việc</h2><p>'+(reason==='accuse'?'Nhân viên nghỉ sau nhiều lần bị kiểm tra bill sai thời điểm.':'Thời gian xử lý trạng thái dỗi đã hết và nhân viên quyết định nghỉ ca vĩnh viễn.')+'</p><div class="complete-alert">Muốn tuyển lại phải trả phí tuyển mới. Quán nhận thêm một đánh giá 1★ từ cựu nhân viên.</div></div>',[['Đã hiểu',()=>{if(R.running&&R.paused&&typeof resumeGame==='function')resumeGame();},1]]);
}
function completeCatchGz(){
  const amount=R.gzLastStolenBill||(R.today&&R.today.gzStolen)||0;if(amount<=0)return toast('Không có bill đang trong cửa sổ bắt quả tang.');
  if(R._gzCatchTimer)clearTimeout(R._gzCatchTimer);
  S.money+=amount;R.today.rev=(R.today.rev||0)+amount;S.totalRev=(S.totalRev||0)+amount;R.today.gzStolen=Math.max(0,(R.today.gzStolen||0)-amount);
  let tips=0;if(S.cur&&S.cur.staffTip>0){tips=S.cur.staffTip;S.cur.staffTip=0;S.cur.tips=(S.cur.tips||0)+tips;S.money+=tips;S.totalRev=(S.totalRev||0)+tips;R.today.tips=(R.today.tips||0)+tips}
  R.gzStolenRecent=false;R.gzCatchExpiresAt=0;R.gzLastStolenBill=0;R.gzStealCooldown=Date.now()+60000;R.gzFalseCatchCount=0;R.today.gzTipToShop=true;
  save();head();sfx('lvup');if(typeof renderGzWidget==='function')renderGzWidget();
  ask('<div class="complete-modal"><h2>🚨 Bắt quả tang đá bill</h2><p>Đã thu hồi tiền bill và xử lý vi phạm ngay trong ca.</p><div class="complete-success">Thu hồi bill: <b>+'+money(amount)+'</b><br>Tiền tip chuyển về quán: <b>+'+money(tips)+'</b><br>Nhân viên bị khóa hành vi đá bill trong 60 giây.</div></div>',[['Tiếp tục ca bán',()=>{if(R.running&&R.paused&&typeof resumeGame==='function')resumeGame();},1]]);
}
function completeFalseCatch(){
  R.gzFalseCatchCount=(R.gzFalseCatchCount||0)+1;const now=Date.now(),rapid=R.gzLastCatchClick&&now-R.gzLastCatchClick<3500;R.gzLastCatchClick=now;
  let chance=R.gzFalseCatchCount===1?.25:R.gzFalseCatchCount===2?.55:.90;if(rapid)chance+=.20;
  if(Math.random()<chance)return completeGzQuit('accuse');
  R.gzMsg='Bị kiểm tra bill sai thời điểm · mức bực '+R.gzFalseCatchCount+'/3';sfx('bad');toast('⚠️ Gen Z cho rằng mình bị vu oan. Kiểm tra sai liên tục có thể khiến nhân viên nghỉ việc.',4200,1);if(typeof renderGzWidget==='function')renderGzWidget();
}
function completeOnGzClick(e){
  if(!S.upg.staffGz||!R.running)return;if(e){e.stopPropagation();e.preventDefault&&e.preventDefault()}
  if(R.gzSulking){if(typeof gzCheer==='function')gzCheer(e);return}
  if(R.gzStolenRecent||(R.gzCatchExpiresAt&&Date.now()<R.gzCatchExpiresAt)||(R.gzLastStolenBill>0)){completeCatchGz();return}
  completeFalseCatch();
}
const baseGzStepComplete=window.staffGzStep;
window.staffGzStep=function(){
  const before=(R.today&&R.today.gzStolen)||0;
  const out=typeof baseGzStepComplete==='function'?baseGzStepComplete():undefined;
  const after=(R.today&&R.today.gzStolen)||0;
  if(after>before){
    R.gzLastStolenBill=after-before;R.gzStolenRecent=true;R.gzCatchExpiresAt=Date.now()+5000;
    clearTimeout(R._gzCatchTimer);R._gzCatchTimer=setTimeout(()=>{R.gzStolenRecent=false;R.gzCatchExpiresAt=0;if(typeof renderGzWidget==='function')renderGzWidget();},5000);
  }
  return out;
};
const baseGzTickComplete=window.staffGzTick;
window.staffGzTick=function(dt){
  if(R.gzSulking){
    R.gzSulkTimer=Math.max(0,(R.gzSulkTimer==null?10:R.gzSulkTimer)-dt);
    if(R.gzSulkTimer<=0){completeGzQuit('sulk');return}
    if(typeof renderGzWidget==='function')renderGzWidget();return;
  }
  return typeof baseGzTickComplete==='function'?baseGzTickComplete(dt):undefined;
};
const baseGzTrigger=window.gzTriggerSulk;
window.gzTriggerSulk=function(why,st){
  const r=typeof baseGzTrigger==='function'?baseGzTrigger(why,st):undefined;
  if(R.gzSulking){R.gzSulkTimer=10;R.gzCheers=0;if(typeof renderGzWidget==='function')renderGzWidget()}
  return r;
};
function completeRenderGz(){
  const w=$c('gzWidget'),stage=$c('q3stage');if(!w)return;
  if(!S.upg.staffGz||!R.running||R.isNightShift){w.style.display='none';stage&&stage.classList.remove('has-gz');return}
  w.style.display='flex';stage&&stage.classList.add('has-gz');const name=staffNameC('staffGz');
  const stealing=R.gzStolenRecent||(R.gzCatchExpiresAt&&Date.now()<R.gzCatchExpiresAt)||(R.gzLastStolenBill>0);
  if(R.gzSulking){
    const rem=Math.max(0,Math.ceil(R.gzSulkTimer==null?10:R.gzSulkTimer)),c=Math.min(3,R.gzCheers||0);
    w.className='gz-widget gz-sulking complete-gz';w.innerHTML='<div class="complete-gz-icon">💔</div><div class="gz-body"><div class="gz-head-row"><b>'+safe(name)+'</b><span class="gz-pill gz-pill-sulk">Chữa lành '+rem+'s</span></div><div class="gz-msg">'+safe(R.gzMsg||'Đang dỗi vì áp lực ca bán')+'</div><div class="complete-hearts">'+'💖'.repeat(c)+'🤍'.repeat(3-c)+' · '+c+'/3</div></div><button class="gz-poke-chip cheer-btn" id="completeGzAction">💖 Dỗ dành</button>';
    $c('completeGzAction').onclick=e=>gzCheer(e);return;
  }
  if(stealing){
    const rem=R.gzCatchExpiresAt?Math.max(1,Math.ceil((R.gzCatchExpiresAt-Date.now())/1000)):5;
    w.className='gz-widget gz-stealing complete-gz';w.innerHTML='<div class="complete-gz-icon">🤫</div><div class="gz-body"><div class="gz-head-row"><b>'+safe(name)+'</b><span class="gz-pill gz-pill-stole">Đá bill '+rem+'s</span></div><div class="gz-msg">Bill nghi vấn: '+money(R.gzLastStolenBill||(R.today&&R.today.gzStolen)||0)+'</div></div><button class="gz-poke-chip catch-active" id="completeGzAction">🚨 Bắt quả tang</button>';
    $c('completeGzAction').onclick=completeCatchGz;return;
  }
  w.className='gz-widget gz-normal complete-gz';w.innerHTML='<div class="complete-gz-icon">⚡</div><div class="gz-body"><div class="gz-head-row"><b>'+safe(name)+'</b><span class="gz-pill gz-pill-work">Tự động pha A-Z</span></div><div class="gz-msg">'+safe(R.gzMsg||'Đang sẵn sàng nhận đơn tiếp theo')+'</div></div><button class="gz-poke-chip complete-audit-btn" id="completeGzAction">👀 Kiểm tra bill</button>';
  $c('completeGzAction').onclick=completeFalseCatch;
}
window.renderGzWidget=completeRenderGz;window.catchGenZ=completeCatchGz;window.gzFalseCatchAccusation=completeFalseCatch;window.gzQuitFromSulk=()=>completeGzQuit('sulk');window.gzQuitFromSpamCatch=()=>completeGzQuit('accuse');window.onGzWidgetClick=completeOnGzClick;

/* ---------------- SINH VIÊN CA ĐÊM ---------------- */
function completeRenderSv(){
  const stage=$c('q3stage');if(!stage)return;let w=$c('svWidget');if(!isStaffActive('staffSv')){if(w)w.remove();return}
  if(!w){w=document.createElement('div');w.id='svWidget';w.className='sv-widget complete-sv';stage.appendChild(w)}
  if(R.svStealPending){
    const sec=Math.max(0,Math.ceil((R.svStealPending.until-Date.now())/1000));
    w.innerHTML='<b>⚠️ Sinh viên đang định mang '+safe(R.svStealPending.u.n)+' đi</b><span>Còn '+sec+'s để can thiệp</span><button id="completeSvBtn">🤝 Khuyên ngăn</button>';
    const b=$c('completeSvBtn');if(b)b.onclick=()=>svCheer();
  }else if(R.isNightShift){
    w.innerHTML='<b>🌙 Sinh viên cuối tháng · ĐANG TRỰC</b><span>'+safe(typeof gameClock==='function'?gameClock():'Ca đêm')+' · tự động pha ly</span>';
  }else w.innerHTML='<b>🌙 Sinh viên cuối tháng</b><span>Chờ ca đêm 22:00 → 06:00</span>';
}
window.renderSvWidget=completeRenderSv;

/* ---------------- TỔNG KẾT MỞ RỘNG ---------------- */
function appendDailyAudit(){
  const card=$c('card');if(!card||$c('completeDailyAudit'))return;
  const r=S.history&&S.history[S.history.length-1];if(!r)return;
  const t=R.today||{},box=document.createElement('section');box.id='completeDailyAudit';box.className='complete-daily-audit';
  const incidents=[
    ['🤫 Gen Z đá bill',r.gzStolen||t.gzStolen||0,'loss'],
    ['🛵 Chênh hóa đơn đi chợ',r.buyerStolen||t.buyerMarkup||0,'loss'],
    ['💸 Tiền giả',t.fakeLoss||0,'loss'],
    ['💰 Tip nhân viên giữ',r.staffTip||0,'info'],
    ['🎉 Thưởng đơn tiệc',r.partyPayout||0,'gain'],
    ['⚠️ Phạt đơn tiệc',r.partyPenalty||0,'loss']
  ].filter(x=>Number(x[1])>0);
  box.innerHTML='<h3>📋 Báo cáo vận hành mở rộng</h3><div class="complete-audit-grid"><div><small>Khách phục vụ</small><b>'+Number(r.served||0)+'</b></div><div><small>Khách mất</small><b>'+Number(r.lost||0)+'</b></div><div><small>Thuế online</small><b>'+(typeof isTaxActive==='function'&&isTaxActive()?'Bảo hộ':'Không bảo hộ')+'</b></div><div><small>Tiết kiệm</small><b>'+money((S.bankSaving&&S.bankSaving.balance)||0)+'</b></div></div>'+
    (incidents.length?'<div class="complete-audit-lines">'+incidents.map(x=>'<div><span>'+x[0]+'</span><b class="'+x[2]+'">'+(x[2]==='gain'?'+':'-')+money(x[1])+'</b></div>').join('')+'</div>':'<div class="complete-success">Ca bán không phát sinh sự cố tài chính lớn.</div>');
  card.appendChild(box);
}
const baseEndDayComplete=window.endDay;
window.endDay=function(){
  const out=typeof baseEndDayComplete==='function'?baseEndDayComplete():undefined;
  if(!R.running)setTimeout(appendDailyAudit,20);
  return out;
};
window.finishEndDay=function(){return window.endDay()};

/* ---------------- PHỐ / KHÁCH ĐI ĐƯỜNG ---------------- */
if(typeof window.updateFrontPedestrians==='function'){
  window.updateFrontPedestrians=function(){
    if(typeof updateKarinPatrol==='function')updateKarinPatrol();
    if(!frontPeds||!frontPeds.length)return;
    frontPeds.forEach(p=>{
      if(!p.el)return;const img=p.el.querySelector('.front-pedestrian-img');
      if(p.movingToCenter){
        const diff=50-p.x;if(Math.abs(diff)>.8){p.speed=Math.sign(diff)*.35;p.x+=p.speed}else{p.x=50;p.movingToCenter=false}
        p.el.style.left=p.x+'%';if(img)img.style.transform=p.speed<0?'scaleX(-1)':'scaleX(1)';return;
      }
      if(p.talking)return;p.x+=p.speed;if(p.x>86){p.x=86;p.speed=-Math.abs(p.speed);changePedestrianRandom(p)}else if(p.x<14){p.x=14;p.speed=Math.abs(p.speed);changePedestrianRandom(p)}
      p.el.style.left=p.x+'%';if(img)img.style.transform=p.speed<0?'scaleX(-1)':'scaleX(1)';
    });
  };
}
if(typeof window.onPedestrianClick==='function'){
  window.onPedestrianClick=function(p){
    if(!p||!p.el)return;
    frontPeds.forEach(o=>{if(o!==p&&o.el){o.talking=false;o.movingToCenter=false;o.el.classList.remove('focused');const b=o.el.querySelector('.front-pedestrian-bubble');if(b)b.style.display='none';clearTimeout(o._talkTimeout)}});
    p.talking=true;p.movingToCenter=true;p.el.classList.add('focused');const b=p.el.querySelector('.front-pedestrian-bubble');
    const quotes=(p.item&&p.item.quotes&&p.item.quotes.length)?p.item.quotes:['Cho mình ghé quầy gọi một ly nhé! 🧋','Mùi trà thơm quá, vào order thôi! ✨','Karin dễ thương ghê, ghé uống trà nào! 🐾'];
    if(b){b.textContent=rnd(quotes);b.style.display='block'}try{sfx('bell')}catch(_){}
    if(R.mode==='sell'&&typeof pSlots==='function'&&typeof maxP==='function'&&typeof spawn==='function'&&pSlots().filter(Boolean).length<maxP()){spawn();renderLane();renderPanel()}
    clearTimeout(p._talkTimeout);p._talkTimeout=setTimeout(()=>{if(b)b.style.display='none';p.talking=false;p.movingToCenter=false;p.el.classList.remove('focused');p.speed=(.14+Math.random()*.22)*(Math.random()<.5?1:-1)},3500);
  };
}

/* ---------------- OPEN DAY DEADLINES ---------------- */
const baseTryOpenComplete=window.tryOpen;
window.tryOpen=function(){
  if(!checkKpiDeadlineC())return;
  return typeof baseTryOpenComplete==='function'?baseTryOpenComplete():undefined;
};


/* ---------------- LATEST ACTIVE FEATURE PARITY ---------------- */
function ensureLatestFeatureParity(){
  if(!UPG.some(u=>u.id==='fridge'))UPG.push({id:'fridge',n:'Tủ lạnh',d:'Bảo quản đá viên không hết hạn khi đang sở hữu trang bị.',cost:500000,i:'❄️'});
  if(!UPG.some(u=>u.id==='floor2'))UPG.push({id:'floor2',n:'Nâng tầng',d:'Mở rộng quầy để phục vụ cùng lúc tối đa 10 khách.',cost:1000000,i:'🏢'});
  if(!localStorage.getItem('tsAudio')){
    try{AU.on=false;AU.mus=false;saveAu()}catch(_){}
  }
}
const baseExpireStockLatest=window.expireStock;
window.expireStock=function(){
  if(S.upg&&S.upg.fridge&&S.stock&&S.stock.ice){
    S.stock.ice=S.stock.ice.map(b=>({...b,exp:99999}));
  }
  return typeof baseExpireStockLatest==='function'?baseExpireStockLatest():[];
};
const baseStartDayLatest=window.startDay;
window.startDay=function(){
  const out=typeof baseStartDayLatest==='function'?baseStartDayLatest():undefined;
  if(S.upg&&S.upg.floor2&&R&&Array.isArray(R.slots)&&R.slots.length<10){
    while(R.slots.length<10)R.slots.push(null);
    if(typeof renderLane==='function')renderLane();
  }
  return out;
};
ensureLatestFeatureParity();

window.completeParity={
  version:COMPLETE_VERSION,
  paneKpi:completePaneKpi,
  paneThue:completePaneThue,
  paneRev:completePaneRev,
  openKpi:completeOpenKpi,
  openBuyer:completeBuyerModal,
  appendDailyAudit
};
window.paneKpi=completePaneKpi;window.openStaffKpiModal=completeOpenKpi;
ensureCompleteState();
setTimeout(()=>{if(R&&R.mode==='prep'&&R.tab==='kpi')completePaneKpi()},0);
})();
