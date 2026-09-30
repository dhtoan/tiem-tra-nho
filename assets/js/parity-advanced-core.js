/* Tiệm Trà Nhỏ - advanced feature parity layer.
   Reimplements missing gameplay systems against the Aunomay runtime without importing another site's runtime wholesale. */
'use strict';

const AP_VERSION='1.0.0-parity2';
const TAX_CYCLE=72*60*60*1000;
const STAFF_EXTRA=[
  {id:'staff0',n:'Thử việc 0 lương',d:'Hỗ trợ rót trà và đá; đôi lúc vụng về hoặc xin nghỉ. Không tốn phí tuyển và không có lương ngày.',cost:0,wage:'wage0',from:1},
  {id:'staffBuyer',n:'Nhân viên đi chợ',d:'Tự phát hiện nguyên liệu sắp hết trong ca và chạy đi nhập bổ sung. Đi quá nhiều chuyến có rủi ro kê chênh hóa đơn.',cost:500000,wage:'wageBuyer',from:1,need:()=>TOP_KEYS.every(k=>S.unlocked[k]),needT:'Cần mở đủ topping'},
  {id:'staffSv',n:'Sinh viên cuối tháng',d:'Hỗ trợ ca muộn sau 22:00. Làm nhanh nhưng có thể nảy ý định bán lén trang bị nếu quá mệt; chủ quán có thể khuyên ngăn.',cost:800000,wage:'wageSv',from:1},
  {id:'staffMkt',n:'Nhân viên Me két tinh',d:'Tăng 20% khách ghé và tốc độ hỗ trợ, tự phản hồi đánh giá, và có thể tự đóng thuế khi đã quá hạn 12 giờ để bảo vệ sổ tiết kiệm.',cost:1500000,wage:'wageMkt',from:1}
];

function ensureAdvancedState(){
  if(!S)return;
  CFG.wage0=0;
  CFG.wageBuyer=CFG.wageBuyer||100000;
  CFG.wageSv=CFG.wageSv||200000;
  CFG.wageMkt=CFG.wageMkt||200000;
  const ids=new Set(STAFF.map(x=>x.id));
  STAFF_EXTRA.forEach(x=>{if(!ids.has(x.id))STAFF.push(x)});
  S.hired=S.hired||{};
  S.staffKpi=S.staffKpi||{};
  S.kpiPeriodStats=S.kpiPeriodStats||{};
  S.staffNames=S.staffNames||{};
  S.staffAvatars=S.staffAvatars||{};
  S.partyContract=S.partyContract||null;
  S.partyContractCheckedDay=S.partyContractCheckedDay||0;
  S.bankSaving=S.bankSaving||{cap:10000000,balance:0,principal:0,termDays:7,daysPassed:0,totalInterest:0};
  STAFF.forEach((u,i)=>{
    S.staffKpi[u.id]=S.staffKpi[u.id]||{trafficBuff:0,speedBuff:0,billBonus:0,level:0};
    S.kpiPeriodStats[u.id]=S.kpiPeriodStats[u.id]||{daysWorked:0,served:0,errors:0,wageEarned:0};
    if(!S.staffAvatars[u.id])S.staffAvatars[u.id]=1+(i%6);
  });
}

function staffPersonName(u){
  ensureAdvancedState();
  return S.staffNames[u.id]||u.n;
}
function staffFullName(u){return staffPersonName(u)}
function genStaffAvatar(id){
  ensureAdvancedState();
  const idx=STAFF.findIndex(x=>x.id===id);
  const n=1+((idx<0?0:idx)%6);
  S.staffAvatars[id]=n;return n;
}
function staffAvatarUrl(u){
  ensureAdvancedState();
  const n=Number(S.staffAvatars[u.id]||genStaffAvatar(u.id));
  return '/assets/img/nv/'+Math.max(1,Math.min(6,n))+'.png';
}
function staffAvatarImg(u){return '<img class="staff-avt-img" src="'+staffAvatarUrl(u)+'" alt="" loading="lazy">'}
function isStaffActive(id){return !!(S&&S.upg&&S.upg[id])}
function getActiveStaffList(){ensureAdvancedState();return STAFF.filter(u=>isStaffActive(u.id))}
function getStaffTrafficBuffTotal(){
  ensureAdvancedState();
  let v=0;
  STAFF.forEach(u=>{if(isStaffActive(u.id))v+=(S.staffKpi[u.id]?.trafficBuff||0)});
  if(isStaffActive('staffMkt'))v+=.20;
  return v;
}
function getStaffSpeedBuff(){
  ensureAdvancedState();
  let v=0;
  STAFF.forEach(u=>{if(isStaffActive(u.id))v+=(S.staffKpi[u.id]?.speedBuff||0)});
  if(isStaffActive('staffMkt'))v+=.20;
  if(isStaffActive('staffSv')&&R&&R.closing)v+=.25;
  return Math.min(.75,v);
}
function getStaffBillBonusTotal(){
  ensureAdvancedState();
  let v=0;
  STAFF.forEach(u=>{if(isStaffActive(u.id))v+=(S.staffKpi[u.id]?.billBonus||0)});
  return Math.min(.20,v);
}

/* ---------- PARTY CONTRACTS ---------- */
const PARTY_TYPES=[
  ['birthday','🎂','Tiệc sinh nhật',['Sinh nhật văn phòng','Tiệc thôi nôi','Sinh nhật bất ngờ','Sinh nhật nhóm bạn']],
  ['company','🏢','Tiệc công ty',['Trà chiều công ty','Khởi động dự án','Chiêu đãi đối tác','Tiệc thứ Sáu']],
  ['alumni','🎓','Họp lớp',['Họp lớp cuối tuần','Tri ân thầy cô','Họp hội khóa','Mừng tốt nghiệp']],
  ['sports','⚽','Hội thao',['Giải bóng đá','Giải cầu lông','Tiệc sau marathon','Giao lưu thể thao']],
  ['festival','🎊','Sự kiện',['Khai trương cửa hàng','Workshop sáng tạo','Hội chợ khu phố','Tri ân khách hàng']]
];
function rollPartyContract(day){
  ensureAdvancedState();
  S.partyContractCheckedDay=day;
  if(day<3){S.partyContract=null;return null}
  const special=evIs('weekend')||evIs('holiday');
  if(Math.random()> (special?.75:.45)){S.partyContract=null;save();return null}
  const t=PARTY_TYPES[Math.floor(Math.random()*PARTY_TYPES.length)];
  const cups=day<=10?8+Math.floor(Math.random()*5):day<=30?14+Math.floor(Math.random()*7):day<=60?22+Math.floor(Math.random()*9):30+Math.floor(Math.random()*16);
  const gross=cups*28000;
  const round10=n=>Math.max(10000,Math.round(n/10000)*10000);
  S.partyContract={id:'ttn_pc_'+day+'_'+Date.now(),day,type:t[0],icon:t[1],typeLabel:t[2],title:t[3][Math.floor(Math.random()*t[3].length)],cups,deposit:round10(gross*.35),payout:round10(gross*.65),bonus:round10(gross*.25),accepted:false,rejected:false,served:0,completed:false,settled:false};
  save();return S.partyContract;
}
function ensurePartyForToday(){
  ensureAdvancedState();
  if(S.partyContractCheckedDay!==S.day)rollPartyContract(S.day);
  return S.partyContract&&S.partyContract.day===S.day?S.partyContract:null;
}
function partyContractCard(){
  const pc=ensurePartyForToday();
  if(!pc||pc.rejected)return '';
  if(!pc.accepted)return '<div class="party-contract-card" id="partyContractCard"><div class="party-header"><span class="party-badge">'+pc.icon+' '+pc.typeLabel+'</span><span class="party-deadline">Giao trong ca hôm nay</span></div><div class="party-title">'+esc(pc.title)+'</div><div class="party-client">Đơn lớn <b>'+pc.cups+' ly</b> · cọc nhận ngay <b>'+fmt(pc.deposit)+'</b></div><div class="party-finance"><div class="p-fin-box"><small>Cọc</small><b>+'+fmt(pc.deposit)+'</b></div><div class="p-fin-box"><small>Kết ca</small><b>+'+fmt(pc.payout)+'</b></div><div class="p-fin-box"><small>Thưởng</small><b>+'+fmt(pc.bonus)+'</b></div></div><div class="party-actions"><button class="sbtn pri" id="btnAcceptParty">Ký hợp đồng & nhận cọc</button><button class="sbtn" id="btnRejectParty">Bỏ qua</button></div></div>';
  return '<div class="party-contract-card accepted" id="partyContractCard"><div class="party-header"><span class="party-badge">'+pc.icon+' '+pc.typeLabel+'</span><span class="party-status">ĐÃ KÝ · '+Math.min(pc.served,pc.cups)+'/'+pc.cups+' ly</span></div><div class="party-title">'+esc(pc.title)+'</div><div class="party-progress"><i style="width:'+Math.min(100,pc.served/pc.cups*100)+'%"></i></div><div class="party-client">Hoàn thành đủ đơn để nhận <b>+'+fmt(pc.payout+pc.bonus)+'</b> cuối ca.</div></div>';
}
function injectPartyCard(){
  if(R.mode!=='prep')return;
  const view=$('view'),tabs=view&&view.querySelector('.tabs');
  if(!view||!tabs)return;
  const old=$('partyContractCard');if(old)old.remove();
  const html=partyContractCard();if(!html)return;
  const box=document.createElement('div');box.innerHTML=html;tabs.before(box.firstElementChild);
  const a=$('btnAcceptParty'),b=$('btnRejectParty');if(a)a.onclick=acceptPartyContract;if(b)b.onclick=rejectPartyContract;
}
function acceptPartyContract(){
  const pc=ensurePartyForToday();if(!pc||pc.accepted)return;
  pc.accepted=true;S.money+=pc.deposit;S.cur.gift=(S.cur.gift||0)+pc.deposit;save();head();sfx('coin');toast('Đã nhận cọc '+fmt(pc.deposit)+' cho đơn '+pc.cups+' ly.');renderPrep();
}
function rejectPartyContract(){const pc=ensurePartyForToday();if(!pc)return;pc.rejected=true;save();toast('Đã bỏ qua đơn đặt tiệc hôm nay.');renderPrep()}
function onCupServedProgress(n=1){
  const pc=ensurePartyForToday();if(!pc||!pc.accepted||pc.rejected||pc.completed)return;
  pc.served=Math.min(pc.cups,(pc.served||0)+Math.max(0,n));
  if(pc.served>=pc.cups){pc.completed=true;sfx('lvup');toast('🎉 Đã đủ '+pc.cups+' ly cho đơn tiệc! Thanh toán sẽ cộng khi kết ca.',4200,1)}
  save();renderPartyWidget();
}
function packCupForParty(){
  const pc=ensurePartyForToday();if(!pc||!pc.accepted||pc.completed)return toast('Không có đơn tiệc đang cần đóng ly.');
  const base=BASE_KEYS.find(k=>S.unlocked[k]&&qty(k)>0);if(!base||qty('cup')<=0)return toast('Thiếu cốt trà hoặc ly để đóng đơn tiệc.');
  take(base);use(base);R.today.cogs+=CFG.cost[base]||0;take('cup');use('cup');R.today.cogs+=CFG.cost.cup||0;const top=TOP_KEYS.find(k=>S.unlocked[k]&&qty(k)>0);if(top&&Math.random()<.7){take(top);use(top);R.today.cogs+=CFG.cost[top]||0}
  onCupServedProgress(1);renderPanel();toast('📦 Đã đóng 1 ly cho đơn tiệc · '+pc.served+'/'+pc.cups,1800);
}
function renderPartyWidget(){
  const stage=$('q3stage');if(!stage)return;
  let w=$('q3partyWrap');const pc=ensurePartyForToday();
  if(!pc||!pc.accepted||pc.rejected){if(w)w.remove();return}
  if(!w){w=document.createElement('div');w.id='q3partyWrap';w.className='q3-party-wrap';stage.appendChild(w)}
  w.innerHTML='<div class="q3-party-title">'+pc.icon+' Đơn tiệc <b>'+pc.served+'/'+pc.cups+'</b></div><div class="q3-party-progress"><i style="width:'+Math.min(100,pc.served/pc.cups*100)+'%"></i></div><button id="q3partyPackBtn" class="q3-party-pack-btn" '+(pc.completed?'disabled':'')+'>'+(pc.completed?'✓ Đã đủ ly':'📦 Đóng 1 ly')+'</button>';
  const b=$('q3partyPackBtn');if(b)b.onclick=packCupForParty;
}
function settlePartyBeforeEnd(){
  const pc=ensurePartyForToday();if(!pc||!pc.accepted||pc.settled)return;
  pc.settled=true;
  if(pc.completed){const reward=pc.payout+pc.bonus;S.money+=reward;S.cur.gift=(S.cur.gift||0)+reward;S.reviews.unshift({s:5,t:'Đơn tiệc hoàn thành đúng hẹn, đủ số lượng và phục vụ rất ổn. Sẽ tiếp tục đặt cho sự kiện sau! 🎉',k:'party_'+pc.id,d:S.day,n:'Khách đặt tiệc',f:pc.icon});S.revTotal=Math.max(S.revTotal||0,S.reviews.length);toast('🎉 Thanh toán đơn tiệc +'+fmt(reward),4500,1)}
  else toast('Đơn tiệc chưa đủ '+pc.cups+' ly nên không nhận phần thanh toán/thưởng cuối ca.',4200,1);
  save();head();
}
