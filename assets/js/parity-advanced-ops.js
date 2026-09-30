/* ---------- BUYER / STUDENT / MARKETING ---------- */
function directAddStock(k,q){
  if(!S.stock[k])S.stock[k]=[];const life=CFG.life[k]||0,exp=life?S.day+life-1:99999,b=S.stock[k].find(x=>x.exp===exp);if(b)b.q+=q;else S.stock[k].push({q,exp});S.stock[k].sort((a,b)=>a.exp-b.exp);
}
function findDepletedIngredient(){
  const demand=[];[...(R.slots||[]),...(R.online||[])].filter(Boolean).forEach(c=>(c.cups||[]).forEach((o,i)=>{if(!(c.done||[])[i])needs(o).forEach(k=>demand.push(k))}));
  const keys=[...new Set(demand)];return keys.find(k=>S.stock[k]&&qty(k)<=1)||keys.find(k=>S.stock[k]&&qty(k)<4)||null;
}
function getBuyerBatch(k=findDepletedIngredient()){
  if(!k||!S.stock[k])return null;const q=k==='cup'?20:12,cost=Math.max(0,(CFG.cost[k]||1000)*q);return{k,q,cost};
}
function staffBuyerStartTrip(manual=false,requestedKey=null){
  if(!isStaffActive('staffBuyer')||R.staffBuyerTrip)return false;const b=getBuyerBatch(requestedKey||findDepletedIngredient());if(!b){if(manual)toast('Kho chưa có món nào cần đi chợ gấp.');return false}if(S.money<b.cost){if(manual)toast('Két không đủ tiền nhập gấp '+ITEMS[b.k]?.n+'.');return false}
  R.staffBuyerTrip={...b,started:Date.now(),doneAt:Date.now()+5500,manual};R.buyerTrips=(R.buyerTrips||0)+1;renderBuyerWidget();toast('🛵 Nhân viên đi chợ đang mua '+(ITEMS[b.k]?.n||b.k)+'...');return true;
}
function staffBuyerCompleteTrip(){
  const t=R.staffBuyerTrip;if(!t)return;let cost=t.cost,extra=0;if((R.buyerTrips||0)>=3&&Math.random()<.12){extra=Math.round(cost*.15);cost+=extra}
  if(S.money<cost){R.staffBuyerTrip=null;renderBuyerWidget();return toast('Nhân viên đi chợ quay về nhưng két không đủ tiền thanh toán.');}
  S.money-=cost;directAddStock(t.k,t.q);R.today.buyerSpent=(R.today.buyerSpent||0)+cost;if(extra)R.today.buyerMarkup=(R.today.buyerMarkup||0)+extra;R.staffBuyerTrip=null;save();head();renderPanel();renderBuyerWidget();toast('🛍️ Đã nhập gấp '+t.q+' '+(ITEMS[t.k]?.n||t.k)+' · -'+fmt(cost)+(extra?' (hóa đơn có chênh lệch)':''),3500,!!extra);
}
function staffBuyerTriggerInstant(k=null){return staffBuyerStartTrip(true,k)}
function staffBuyerTick(){
  if(!R.running||!isStaffActive('staffBuyer'))return;if(R.staffBuyerTrip){if(Date.now()>=R.staffBuyerTrip.doneAt)staffBuyerCompleteTrip();return}
  if(findDepletedIngredient()&&Math.random()<.035)staffBuyerStartTrip(false);
}
function renderBuyerWidget(){
  const stage=$('q3stage');if(!stage)return;let w=$('buyerWidget');if(!isStaffActive('staffBuyer')){if(w)w.remove();return}if(!w){w=document.createElement('div');w.id='buyerWidget';w.className='buyer-widget';stage.appendChild(w)}const t=R.staffBuyerTrip;w.innerHTML=t?'🛵 Đi chợ: <b>'+(ITEMS[t.k]?.n||t.k)+'</b> <span>'+Math.max(0,Math.ceil((t.doneAt-Date.now())/1000))+'s</span>':'🛍️ Nhân viên đi chợ <button id="buyerDispatchBtn">Đi nhập gấp</button>';const b=$('buyerDispatchBtn');if(b)b.onclick=staffBuyerTriggerInstant;
}
function openBuyerDispatchModal(){const b=getBuyerBatch();ask('<h2>🛍️ Nhân viên đi chợ</h2><p>'+(b?'Món cần ưu tiên: <b>'+esc(ITEMS[b.k]?.n||b.k)+'</b> · '+b.q+' phần · '+fmt(b.cost):'Hiện kho chưa có món cần nhập gấp.')+'</p>',[['Đóng',()=>{}],...(b?[['Đi ngay',staffBuyerTriggerInstant,1]]:[])])}
function onBuyerWidgetClick(){openBuyerDispatchModal()}

function svTriggerStealIntent(){
  if(!isStaffActive('staffSv')||R.svStealPending)return false;const eq=UPG.filter(u=>S.upg[u.id]);if(!eq.length)return false;const u=eq[Math.floor(Math.random()*eq.length)];R.svStealPending={u,until:Date.now()+8000};renderSvWidget();toast('⚠️ Sinh viên đang định mang '+u.n+' đi bán! Bấm Khuyên ngăn.',5000,1);return true;
}
function svCheer(){if(R.svStealPending){R.svStealPending=null;R.svCheered=(R.svCheered||0)+1;toast('🤝 Đã khuyên ngăn kịp thời.');renderSvWidget()}else toast('Sinh viên vẫn đang làm ca ổn định.')}
function svStealFail(){const x=R.svStealPending;if(!x)return;S.upg[x.u.id]=false;R.svStealPending=null;save();toast('💸 Không kịp ngăn: '+x.u.n+' đã biến mất khỏi quán.',4300,1);renderSvWidget()}
function startSvNightShift(){
  if(!R.running||!isStaffActive('staffSv')||R.isNightShift)return false;
  R.isNightShift=true;R.closing=false;R.nightTot=80;R.t=R.nightTot;R.spawnT=.8;R.onT=4;R.svWorkT=.4;R.svNightRolled=false;
  toast('🌙 Sinh viên cuối tháng vào ca: quán bán xuyên đêm 22:00 → 06:00!',5000,1);
  renderSell();head();return true;
}
function staffSvServeOne(){
  if(!R.running||!R.isNightShift||!isStaffActive('staffSv'))return false;
  let lane=-1,order=null;
  for(let i=0;i<R.slots.length;i++){const c=R.slots[i];if(!c)continue;const j=c.cups.findIndex((o,k)=>!c.done[k]&&needs(o).every(x=>qty(x)>0));if(j>=0){lane=i;order=c.cups[j];break}}
  let online=-1;
  if(lane<0){for(let i=0;i<R.online.length;i++){const c=R.online[i];const j=c.cups.findIndex((o,k)=>!c.done[k]&&needs(o).every(x=>qty(x)>0));if(j>=0){online=i;order=c.cups[j];break}}}
  if(!order)return false;
  const mine=cup;cup=newCup();cup.size=order.size;
  if(!useCup()){cup=mine;return false}
  [order.base,...(order.flav?[order.flav]:[]),...(order.tops||[])].forEach(k=>{if(qty(k))consume(k)});
  Object.assign(cup,{base:order.base,flav:order.flav||null,tops:[...(order.tops||[])],cheese:!!order.cheese,sugar:order.sugar,ice:order.ice,fill:.8,used:true,sealed:true});
  if(Math.random()<.04){spoilCup();cup=mine;R.today.wrong=(R.today.wrong||0)+1;toast('🌙 Sinh viên lỡ làm hỏng 1 ly, đã đổ bỏ và làm lại.',2200);return true}
  if(lane>=0){R.slots[lane].order=order;serve(lane)}else if(online>=0){R.online[online].order=order;serveOnline(online)}
  cup=mine;renderCup();renderPanel();return true;
}
function staffSvTick(dt=.1){
  if(!R.running||!isStaffActive('staffSv'))return;
  if(R.svStealPending&&Date.now()>=R.svStealPending.until)return svStealFail();
  if(!R.isNightShift)return;
  R.svWorkT=(R.svWorkT==null?.4:R.svWorkT)-dt;
  if(R.svWorkT<=0){staffSvServeOne();R.svWorkT=Math.max(.22,.85/(1+getStaffSpeedBuff()))}
  if(!R.svStealPending&&!R.svNightRolled&&R.t<(R.nightTot||80)*.55&&Math.random()<.025){R.svNightRolled=true;svTriggerStealIntent()}
}
function staffSvStep(){staffSvTick(.1)}
function renderSvWidget(){
  const stage=$('q3stage');if(!stage)return;let w=$('svWidget');if(!isStaffActive('staffSv')){if(w)w.remove();return}if(!w){w=document.createElement('div');w.id='svWidget';w.className='sv-widget';stage.appendChild(w)}w.innerHTML=R.svStealPending?'⚠️ '+esc(R.svStealPending.u.n)+' <button id="svCheerBtn">Khuyên ngăn</button>':R.isNightShift?'🌙 Sinh viên cuối tháng · <b>đang bán ca đêm</b>':'🌙 Sinh viên cuối tháng · chờ 22:00';const b=$('svCheerBtn');if(b)b.onclick=svCheer;
}
function onSvWidgetClick(){svCheer()}

function applyMktAutoReplies(){
  if(!isStaffActive('staffMkt'))return 0;let n=0;S.reviews.slice(0,20).forEach(r=>{if(!r.rp){r.rp=r.s<=2?'Quán đã ghi nhận góp ý và sẽ kiểm tra lại quy trình pha chế. Cảm ơn bạn đã phản hồi để tiệm cải thiện.':'Cảm ơn bạn đã ghé Tiệm Trà Nhỏ và để lại đánh giá. Hẹn gặp lại bạn ở ly tiếp theo!';if(r.s<5&&Math.random()<.55)r.s++;n++}});if(n)save();return n;
}
function checkReset5StarRating(){return false}
function triggerFriendBadReview(){return false}

/* ---------- SELL MODALS / HUD ---------- */
function openSellReviewsModal(){
  const rows=(S.reviews||[]).slice(0,12).map(r=>'<div class="sell-rev-row"><b>'+esc(r.n||'Khách')+'</b><span>'+('★'.repeat(r.s))+'</span><p>'+esc(r.t||'')+'</p>'+(r.rp?'<small>↳ '+esc(r.rp)+'</small>':'')+'</div>').join('');
  ask('<h2>⭐ Đánh giá gần nhất</h2><div class="sell-rev-modal">'+(rows||'<p>Chưa có đánh giá.</p>')+'</div>',[['Đóng',()=>{}]]);
}
function openReviews(){if(R.mode==='sell')openSellReviewsModal();else{R.tab='danhgia';renderPrep()}}
function openSellModal(){
  const staff=getActiveStaffList().map(x=>staffPersonName(x)).join(', ')||'Chưa có';const pc=ensurePartyForToday();ask('<h2>📋 Ca đang bán</h2><p>Nhân viên: <b>'+esc(staff)+'</b></p>'+(pc&&pc.accepted?'<p>Đơn tiệc: <b>'+pc.served+'/'+pc.cups+' ly</b></p>':''),[['Đánh giá',openSellReviewsModal],['Đóng',()=>{},1]])
}
function bindHeaderReview(){const b=$('hRatebox');if(b)b.onclick=()=>openReviews()}
function renderAdvancedStaffBar(){renderPartyWidget();renderBuyerWidget();renderSvWidget()}

/* ---------- KARIN STREET MOTION ---------- */
let karinX=50,karinDir=1,lastKarin=0;
function updateKarinPatrol(ts=performance.now()){
  const modal=$('frontshop-modal'),wrap=$('frontKarinWrap');if(!wrap||!modal||modal.hidden)return;
  const dt=Math.min(40,ts-lastKarin||16);lastKarin=ts;karinX+=karinDir*dt*.006;if(karinX>76){karinX=76;karinDir=-1}if(karinX<24){karinX=24;karinDir=1}wrap.style.left=karinX+'%';const img=$('frontKarinImg');if(img)img.style.transform='scaleX('+(karinDir>0?1:-1)+')';
}
function animLoop(ts){updateKarinPatrol(ts);requestAnimationFrame(animLoop)}
