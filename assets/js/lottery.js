/* Tiệm Trà Nhỏ - Xổ Số Tiệm Trà (in-game currency only) */
(function(){
'use strict';
const PRICE=100000,MAX_PER_DAY=10;
const STATIONS=[
  ['TP.HCM','HCM'],['Hà Nội','HN'],['Đà Nẵng','DN'],['Cần Thơ','CT'],
  ['Tiền Giang','TG'],['Bình Dương','BD'],['Đồng Nai','DNA'],['Vũng Tàu','VT'],
  ['An Giang','AG'],['Bến Tre','BT'],['Long An','LA'],['Tây Ninh','TN'],
  ['Khánh Hòa','KH'],['Lâm Đồng','LD'],['Quảng Nam','QN'],['Huế','HUE']
];
function escL(v){return String(v==null?'':v).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]))}
function fmtL(v){return typeof fmt==='function'?fmt(Math.round(v||0)):Math.round(v||0).toLocaleString('vi-VN')+'đ'}
function state(){
  S.lottery=S.lottery||{tickets:[],wins:0,spent:0,won:0,lastStation:'HCM',lastNumber:'00000'};
  if(!Array.isArray(S.lottery.tickets))S.lottery.tickets=[];
  return S.lottery;
}
function hash(str){
  let h=2166136261>>>0;
  for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619)}
  return h>>>0;
}
function drawNumber(day,station){
  let x=hash('TTN|'+day+'|'+station+'|2026');
  let out='';
  for(let i=0;i<5;i++){x=(Math.imul(x,1664525)+1013904223)>>>0;out+=String(x%10)}
  return out;
}
function matchPrize(ticket,winning){
  const n=ticket.number;
  if(n===winning)return 50000000;
  if(n.slice(-4)===winning.slice(-4))return 5000000;
  if(n.slice(-3)===winning.slice(-3))return 500000;
  if(n.slice(-2)===winning.slice(-2))return 100000;
  if(n.slice(-1)===winning.slice(-1))return 20000;
  return 0;
}
function settle(){
  const st=state();let gained=0,changed=false;
  st.tickets.forEach(t=>{
    if(t.checked||S.day<=t.day)return;
    t.winning=drawNumber(t.day,t.station);
    t.prize=matchPrize(t,t.winning);
    t.checked=true;changed=true;
    if(t.prize>0){S.money+=t.prize;st.won+=t.prize;st.wins++;gained+=t.prize}
  });
  if(changed){save();head()}
  if(gained>0)toast('🎉 Xổ số: Bạn vừa nhận '+fmtL(gained)+' tiền thưởng!',4200,1);
}
function ticketCountToday(){return state().tickets.filter(t=>t.day===S.day).length}
function buyTicket(){
  const st=state(),input=document.getElementById('lotteryNumber'),sel=document.getElementById('lotteryStation');
  const number=String(input&&input.value||'').replace(/\D/g,'').slice(0,5).padStart(5,'0');
  const station=String(sel&&sel.value||st.lastStation||'HCM');
  if(ticketCountToday()>=MAX_PER_DAY)return toast('Mỗi ngày chỉ mua tối đa '+MAX_PER_DAY+' vé.');
  if(S.money<PRICE)return toast('Két chưa đủ '+fmtL(PRICE)+' để mua vé.');
  if(!/^\d{5}$/.test(number))return toast('Nhập đủ 5 chữ số từ 00000 đến 99999.');
  S.money-=PRICE;st.spent+=PRICE;st.lastNumber=number;st.lastStation=station;
  st.tickets.unshift({id:'lot_'+Date.now()+'_'+Math.random().toString(36).slice(2,7),day:S.day,station,number,price:PRICE,checked:false,prize:0,winning:null});
  if(st.tickets.length>120)st.tickets.length=120;
  save();head();sfx&&sfx('coin');render();toast('🎟️ Đã mua vé '+number+' · mở thưởng từ ngày '+(S.day+1)+'.');
}
function randomNumber(){
  const n=String(Math.floor(Math.random()*100000)).padStart(5,'0');
  const i=document.getElementById('lotteryNumber');if(i)i.value=n;
}
function stationName(code){return (STATIONS.find(x=>x[1]===code)||[code])[0]}
function recentResults(){
  const days=[];for(let d=Math.max(1,S.day-5);d<S.day;d++)days.push(d);
  if(!days.length)return '<div class="lot-empty">Chưa có kỳ đã mở thưởng.</div>';
  return days.reverse().map(d=>'<div class="lot-result-row"><b>Ngày '+d+'</b><div>'+STATIONS.slice(0,4).map(s=>'<span>'+escL(s[0])+': <strong>'+drawNumber(d,s[1])+'</strong></span>').join('')+'</div></div>').join('');
}
function ticketsHtml(){
  const list=state().tickets.slice(0,40);
  if(!list.length)return '<div class="lot-empty">Bạn chưa mua vé nào.</div>';
  return list.map(t=>{
    const pending=!t.checked;
    const status=pending?'Chờ mở thưởng':t.prize>0?'Trúng '+fmtL(t.prize):'Không trúng';
    return '<article class="lot-ticket '+(t.prize>0?'win':'')+'"><div class="lot-ticket-top"><span>🎟️ '+escL(stationName(t.station))+'</span><small>Ngày '+t.day+'</small></div><b>'+escL(t.number)+'</b><div class="lot-ticket-foot"><span>'+status+'</span>'+(t.winning?'<em>KQ '+escL(t.winning)+'</em>':'<em>Mở ngày '+(t.day+1)+'</em>')+'</div></article>';
  }).join('');
}
function ensureModal(){
  let m=document.getElementById('lottery-modal');if(m)return m;
  m=document.createElement('div');m.id='lottery-modal';m.className='lottery-modal';m.hidden=true;
  m.innerHTML='<div class="lottery-card"><button id="lotteryClose" class="lottery-close" aria-label="Đóng">✕</button><div id="lotteryBody"></div></div>';
  document.body.appendChild(m);
  m.addEventListener('click',e=>{if(e.target===m)close()});
  m.querySelector('#lotteryClose').onclick=close;
  return m;
}
function render(){
  settle();const m=ensureModal(),root=m.querySelector('#lotteryBody'),st=state();
  root.innerHTML='<header class="lot-head"><div><span>🎟️</span><div><h2>Xổ Số Tiệm Trà Nhỏ</h2><p>Vé số 5 chữ số · chỉ dùng tiền trong game</p></div></div><strong>'+fmtL(PRICE)+'/vé</strong></header>'+
  '<section class="lot-buy"><label>Đài xổ số<select id="lotteryStation">'+STATIONS.map(s=>'<option value="'+s[1]+'" '+(st.lastStation===s[1]?'selected':'')+'>'+escL(s[0])+'</option>').join('')+'</select></label><label>Dãy 5 chữ số<div class="lot-number-line"><input id="lotteryNumber" inputmode="numeric" maxlength="5" pattern="[0-9]*" value="'+escL(st.lastNumber||'00000')+'"><button id="lotteryRandom">🎲</button></div></label><div class="lot-buy-meta"><span>Đã mua hôm nay: <b>'+ticketCountToday()+'/'+MAX_PER_DAY+'</b></span><span>Két: <b>'+fmtL(S.money)+'</b></span></div><button id="lotteryBuy" class="lot-primary">Mua vé '+fmtL(PRICE)+'</button></section>'+
  '<section class="lot-prizes"><h3>🏆 Cơ cấu thưởng</h3><div><span>Đúng 5 số <b>50tr</b></span><span>4 số cuối <b>5tr</b></span><span>3 số cuối <b>500k</b></span><span>2 số cuối <b>100k</b></span><span>1 số cuối <b>20k</b></span></div></section>'+
  '<section class="lot-stats"><span>Đã mua <b>'+fmtL(st.spent)+'</b></span><span>Đã nhận <b>'+fmtL(st.won)+'</b></span><span>Vé trúng <b>'+st.wins+'</b></span></section>'+
  '<section><h3 class="lot-sec-title">Vé của tôi</h3><div class="lot-ticket-list">'+ticketsHtml()+'</div></section>'+
  '<section><h3 class="lot-sec-title">Kết quả gần đây</h3><div class="lot-results">'+recentResults()+'</div></section>';
  root.querySelector('#lotteryRandom').onclick=randomNumber;
  root.querySelector('#lotteryBuy').onclick=()=>{buyTicket();render()};
  root.querySelector('#lotteryNumber').addEventListener('input',e=>{e.target.value=e.target.value.replace(/\D/g,'').slice(0,5)});
}
function open(){ensureModal().hidden=false;render();try{sfx('tap')}catch(_){}}
function close(){const m=document.getElementById('lottery-modal');if(m)m.hidden=true}
function bind(){
  const b=document.getElementById('lotteryBtn');if(b)b.onclick=open;
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){const m=document.getElementById('lottery-modal');if(m&&!m.hidden)close()}});
}
state();bind();settle();
window.TTNLottery={open,close,settle,drawNumber};
})();
