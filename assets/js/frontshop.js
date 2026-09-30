/* Tiệm Trà Nhỏ: Xuống Phố, Bảo vệ Karin và Bản đồ Shipper */
let frontPedTimer=null,frontShopTimer=null,frontPeds=[];
const KARIN_COOLDOWN=5*60*1000;
const FRONT_PED_POOLS=[
  {src:'/assets/img/nv/1.png',name:'Bo Scooter',quotes:['Ghé tiệm làm ly trà sữa mát lạnh rồi vi vu tiếp! 🛵🧋','Trà sữa ở đây thơm nức mũi cả con phố! ✨','Cho em một ly size L nhiều trân châu nhé! 🥤']},
  {src:'/assets/img/nv/2.png',name:'Mai Dạo Phố',quotes:['Trời mát thế này ghé tiệm uống trà sữa là nhất! 💖','Mùi trà sữa thơm quá, tí phải ghé mua mới được! 🧋','Quán xinh xắn quá, phục vụ lại nhiệt tình nữa! 🥰']},
  {src:'/assets/img/nv/3.png',name:'Hoa Áo Dài',quotes:['Đạp xe dạo phố ghé mua ly trà lài thơm ngát! 🚲🌸','Trà sữa ngọt thanh làm một ngày thêm tươi tắn! 🧋✨','Em mua một ly đem về thưởng trà ngắm hoa nhé! 🍵']},
  {src:'/assets/img/nv/4.png',name:'Phong Biker',quotes:['Lượn vài vòng phố rồi tấp vào làm ly đậm vị! 🏍️⚡','Trà sữa đậm vị chuẩn gu luôn! 🧋🔥','Cho một ly full topping nạp năng lượng lên đường! 🥤']},
  {src:'/assets/img/nv/5.png',name:'Chú Cảnh Sát',quotes:['Tuần tra giữ an ninh trật tự cho phố trà sữa! 👮‍♂️','Tiệm buôn bán văn minh, trà sữa ngon chuẩn vị! 🧋✨','Bà con ghé ủng hộ quán trà uy tín nhé! ☕👍']},
  {src:'/assets/img/nv/6.png',name:'Shipper Thỏ Vàng',quotes:['Đang đi giao đơn trà sữa nóng hổi đây! 🛵📦','Tiệm làm đồ uống nhanh quá, shipper nhận đơn là thích mê! 🧋⚡','Hôm nay đơn tiệm nổ ầm ầm, chạy mỏi tay luôn! 🌟🥤']}
];

function getKarinCooldownRem(){
  return Math.max(0,KARIN_COOLDOWN-(Date.now()-(S.karinLastBuffTime||0)));
}
function updateFrontShopUI(){
  const rem=getKarinCooldownRem(),btn=$('frontCallBtn'),info=$('frontBuffInfo');
  if(!btn)return;
  if(rem>0){
    const sec=Math.ceil(rem/1000),m=Math.floor(sec/60),ss=sec%60,t=m+'p '+(ss<10?'0':'')+ss+'s';
    btn.textContent='⏳ Hồi Chiêu: '+t;
    btn.classList.add('on-cooldown');
    if(info)info.innerHTML='<span>🐾 <b>Thần Mèo Karin:</b> Đang tịnh tâm. Quay lại sau <b>'+t+'</b>.</span>';
  }else{
    btn.textContent='📣 Xin Phước (+20s Chờ & Tiền)';
    btn.classList.remove('on-cooldown');
    if(info)info.innerHTML='<span>🐾 <b>Thần Mèo Karin:</b> +20s kiên nhẫn toàn tiệm & cơ hội nhận lì xì tiền vía! (5p/lần)</span>';
  }
}
function openFrontShop(){
  const m=$('frontshop-modal');if(!m)return;
  m.hidden=false;
  if($('frontShopName'))$('frontShopName').textContent=shopName();
  if($('frontDoorShopName'))$('frontDoorShopName').textContent=shopName();
  if($('frontShopLiveTag'))$('frontShopLiveTag').textContent=R.mode==='sell'?'🥤 Ca bán đang mở · Ngày '+S.day:'🏮 Tiệm đang chuẩn bị · Ngày '+S.day;
  const rem=getKarinCooldownRem();
  if($('frontKarinBubble'))$('frontKarinBubble').innerHTML=rem>0
    ?'🐾 <b>Karin:</b> Tớ vừa ban phước rồi, đang tịnh tâm nạp năng lượng! ✨'
    :(R.mode==='sell'?'🐾 <b>Karin:</b> Quán đang mở ca! Chạm vào tớ để xin phước và giữ khách lâu hơn.':'🐾 <b>Karin:</b> Chào bạn! Chạm vào tớ để xin vía buôn may bán đắt nhé!');
  updateFrontShopUI();
  clearInterval(frontShopTimer);
  frontShopTimer=setInterval(updateFrontShopUI,1000);
  initFrontPedestrians();
  try{sfx('tap')}catch(_){}
}
function closeFrontShop(){
  const m=$('frontshop-modal');if(m)m.hidden=true;
  clearInterval(frontPedTimer);clearInterval(frontShopTimer);
  frontPedTimer=frontShopTimer=null;
}
function karinCheer(){
  if(getKarinCooldownRem()>0){
    updateFrontShopUI();
    toast('⏳ Thần Mèo Karin đang hồi năng lượng!');
    try{sfx('tap')}catch(_){}
    return;
  }
  S.karinLastBuffTime=Date.now();
  let bonus=0;
  if(Math.random()<.5){
    bonus=rnd([50000,80000,100000,150000,200000,300000,500000]);
    S.money=(S.money||0)+bonus;
  }
  const img=$('frontKarinImg');
  if(img){img.classList.remove('karin-cheer');void img.offsetWidth;img.classList.add('karin-cheer')}
  R.karinGuardBuff=(R.karinGuardBuff||0)+1;
  (R.slots||[]).forEach(c=>{if(c){c.max=(c.max||45)+20;c.pat=Math.min(c.max,(c.pat||0)+20)}});
  if(R.mode==='sell'&&typeof pSlots==='function'&&typeof maxP==='function'&&typeof spawn==='function'&&pSlots().filter(Boolean).length<maxP())spawn();
  if($('frontKarinBubble'))$('frontKarinBubble').innerHTML=bonus
    ?'🐾 <b>Karin:</b> Tặng tiệm <b>+'+fmt(bonus)+'</b> tiền vía và +20s kiên nhẫn! 💰✨'
    :'🐾 <b>Karin:</b> Đã ban phước +20s kiên nhẫn cho khách! 🛡️✨';
  const wrap=$('frontKarinWrap');
  if(wrap){
    const p=document.createElement('div');
    p.className='front-particle';
    p.textContent=(bonus?'💰 +'+fmt(bonus)+' · ':'')+'+20s KIÊN NHẪN 🐾';
    wrap.appendChild(p);
    setTimeout(()=>p.remove(),1800);
  }
  save();head();
  if(typeof renderLane==='function')renderLane();
  if(typeof renderPanel==='function')renderPanel();
  updateFrontShopUI();
  toast(bonus?'🐾 Karin tặng '+fmt(bonus)+' và tăng kiên nhẫn!':'🐾 Karin đã tăng +20s kiên nhẫn!');
}
function changePedestrianRandom(p){
  if(!p||!p.el)return;
  const pool=FRONT_PED_POOLS.filter(x=>!p.item||x.src!==p.item.src),item=rnd(pool.length?pool:FRONT_PED_POOLS);
  p.item=item;
  const im=p.el.querySelector('.front-pedestrian-img');
  if(im){im.src=item.src;im.alt=item.name}
}
function initFrontPedestrians(){
  const ct=$('frontPedestrians');if(!ct)return;
  ct.innerHTML='';frontPeds=[];
  const item=rnd(FRONT_PED_POOLS),p={item,x:Math.random()<.5?18:82,speed:.11*(Math.random()<.5?1:-1),talking:false};
  const el=document.createElement('div');
  el.className='front-pedestrian';
  el.innerHTML='<div class="front-pedestrian-bubble" style="display:none"></div><img src="'+item.src+'" class="front-pedestrian-img" alt="'+item.name+'">';
  el.onclick=()=>onPedestrianClick(p);
  ct.appendChild(el);p.el=el;frontPeds=[p];
  clearInterval(frontPedTimer);
  frontPedTimer=setInterval(updateFrontPedestrians,100);
}
function updateFrontPedestrians(){
  frontPeds.forEach(p=>{
    if(!p.el||p.talking)return;
    p.x+=p.speed;
    if(p.x>86){p.x=86;p.speed=-Math.abs(p.speed);changePedestrianRandom(p)}
    else if(p.x<14){p.x=14;p.speed=Math.abs(p.speed);changePedestrianRandom(p)}
    p.el.style.left=p.x+'%';
    const im=p.el.querySelector('.front-pedestrian-img');
    if(im)im.style.transform=p.speed<0?'scaleX(-1)':'scaleX(1)';
  });
}
function onPedestrianClick(p){
  if(!p||!p.el)return;
  p.talking=true;p.el.classList.add('focused');
  const b=p.el.querySelector('.front-pedestrian-bubble');
  if(b){b.textContent=rnd(p.item.quotes);b.style.display='block'}
  try{sfx('bell')}catch(_){}
  if(R.mode==='sell'&&typeof pSlots==='function'&&typeof maxP==='function'&&typeof spawn==='function'&&pSlots().filter(Boolean).length<maxP()){
    spawn();renderLane();renderPanel();
  }
  clearTimeout(p._talkTimeout);
  p._talkTimeout=setTimeout(()=>{
    if(b)b.style.display='none';
    p.talking=false;
    if(p.el)p.el.classList.remove('focused');
    p.speed=(.14+Math.random()*.22)*(Math.random()<.5?1:-1);
  },3500);
}
document.addEventListener('visibilitychange',()=>{
  if(document.hidden){clearInterval(frontPedTimer);frontPedTimer=null}
  else{const m=$('frontshop-modal');if(m&&!m.hidden&&!frontPedTimer)frontPedTimer=setInterval(updateFrontPedestrians,100)}
});

const SHIPPER_ROUTES=[
  [{x:270,y:520,pause:1200,bubble:'Lấy trà 🧋'},{x:220,y:600},{x:130,y:500},{x:80,y:360},{x:180,y:260},{x:290,y:170,pause:2000,bubble:'Giao Lâu Đài! 🏰',deliver:'+45.000đ ⭐'},{x:420,y:240},{x:390,y:380},{x:270,y:520,pause:1200,bubble:'Về quầy! 💨'}],
  [{x:270,y:520,pause:800,bubble:'Đơn giao gấp! 🛵'},{x:170,y:680},{x:130,y:810},{x:230,y:940},{x:340,y:940,pause:2000,bubble:'Giao Phố Nam! 🏡',deliver:'+35.000đ ⭐'},{x:440,y:800},{x:330,y:660},{x:270,y:520,pause:1000,bubble:'Đã về tiệm! ✨'}],
  [{x:270,y:520,pause:1500,bubble:'Nhận 2 ly Matcha 🍵'},{x:360,y:420},{x:500,y:520,pause:2000,bubble:'Giao Tiệm Kem! 🍨',deliver:'+30.000đ ⭐'},{x:400,y:660},{x:270,y:520,pause:1000,bubble:'Về nạp pin! 🔋'}]
];
class MapShipperRunner{
  constructor(route,speed,delay,parent){
    this.route=route;this.speed=speed||48;this.currentWp=0;this.progress=0;this.pauseUntil=Date.now()+(delay||0);
    this.el=document.createElement('div');this.el.className='shipper-unit';
    this.el.innerHTML='<div class="shipper-bubble">🛵 Đang chạy</div><img src="/assets/img/shipper-map.png" class="shipper-img" alt="Shipper">';
    parent.appendChild(this.el);
    this.bubbleEl=this.el.querySelector('.shipper-bubble');
    this.imgEl=this.el.querySelector('.shipper-img');
    this.el.onclick=e=>{e.stopPropagation();toast(rnd(['🛵 Đơn đang giao hỏa tốc! 💨','🧋 Khách dặn nhiều trân châu nhé!','⭐ Vừa nhận đánh giá 5 sao giao hàng! 🎉']),3000);try{sfx('tap')}catch(_){}};
    this.updatePos(route[0].x,route[0].y,1);
  }
  updatePos(x,y,f){this.el.style.left=x+'px';this.el.style.top=y+'px';this.imgEl.style.transform=f<0?'scaleX(-1)':'scaleX(1)'}
  showFloatToast(t,x,y){
    const c=$('shipperMapCanvas');if(!c)return;
    const f=document.createElement('div');f.className='delivery-float-pop';f.textContent=t;f.style.left=x+'px';f.style.top=y+'px';c.appendChild(f);
    setTimeout(()=>f.remove(),1600);
  }
  tick(dt){
    if(Date.now()<this.pauseUntil)return;
    const a=this.route[this.currentWp],ni=(this.currentWp+1)%this.route.length,b=this.route[ni],dx=b.x-a.x,dy=b.y-a.y,d=Math.hypot(dx,dy)||1;
    this.progress+=(this.speed*dt)/d;
    if(this.progress>=1){
      this.currentWp=ni;this.progress=0;
      const q=this.route[ni];
      if(q.pause)this.pauseUntil=Date.now()+q.pause;
      if(q.bubble)this.bubbleEl.textContent=q.bubble;
      if(q.deliver)this.showFloatToast(q.deliver,q.x,q.y);
    }
    this.updatePos(a.x+(b.x-a.x)*this.progress,a.y+(b.y-a.y)*this.progress,dx>=0?-1:1);
  }
  destroy(){if(this.el)this.el.remove()}
}
let shipperMapRunners=[],shipperMapAnimId=null,shipperMapLastT=0;
function startShipperSimulation(){
  stopShipperSimulation();
  const w=$('shippersWrap');if(!w)return;
  shipperMapRunners=[new MapShipperRunner(SHIPPER_ROUTES[0],52,0,w),new MapShipperRunner(SHIPPER_ROUTES[1],46,2000,w),new MapShipperRunner(SHIPPER_ROUTES[2],48,4500,w)];
  shipperMapLastT=performance.now();
  const loop=now=>{
    const dt=Math.min(.1,(now-shipperMapLastT)/1000);shipperMapLastT=now;
    shipperMapRunners.forEach(x=>x.tick(dt));
    shipperMapAnimId=requestAnimationFrame(loop);
  };
  shipperMapAnimId=requestAnimationFrame(loop);
}
function stopShipperSimulation(){
  if(shipperMapAnimId)cancelAnimationFrame(shipperMapAnimId);
  shipperMapAnimId=null;shipperMapRunners.forEach(x=>x.destroy());shipperMapRunners=[];
  const w=$('shippersWrap');if(w)w.innerHTML='';
}
function updateShipperPhoneBadge(){
  const b=$('q3PhoneBadge'),btn=$('q3PhoneBtn');if(!b||!btn)return;
  const n=(R.online||[]).length;b.textContent=n;b.style.display=n?'flex':'none';btn.classList.toggle('has-orders',n>0);
}
function openShipperMap(){
  const m=$('shippermap-modal');if(!m)return;
  m.hidden=false;
  const n=shopName();
  if($('centerSignName'))$('centerSignName').textContent=n;
  if($('shipperMapShopSub'))$('shipperMapShopSub').textContent=n+' · Ngày '+S.day;
  const count=(R.online||[]).length;
  if($('shipperMapCount'))$('shipperMapCount').textContent=Math.max(3,count+2);
  const vp=$('shipperMapViewport');
  if(vp)setTimeout(()=>vp.scrollTo({top:Math.max(0,460-vp.clientHeight/2),left:Math.max(0,286-vp.clientWidth/2),behavior:'smooth'}),40);
  startShipperSimulation();
  try{sfx('tap')}catch(_){}
}
function closeShipperMap(){
  const m=$('shippermap-modal');if(m)m.hidden=true;
  stopShipperSimulation();
  try{sfx('tap')}catch(_){}
}

function bindStreetAndMapUI(){
  if($('frontBtn'))$('frontBtn').onclick=openFrontShop;
  if($('frontShopBackBtn'))$('frontShopBackBtn').onclick=closeFrontShop;
  if($('frontBotBackBtn'))$('frontBotBackBtn').onclick=closeFrontShop;
  if($('frontKarinBtn'))$('frontKarinBtn').onclick=karinCheer;
  if($('frontCallBtn'))$('frontCallBtn').onclick=karinCheer;
  if($('shipperMapBackBtn'))$('shipperMapBackBtn').onclick=closeShipperMap;
  if($('centerSignboard'))$('centerSignboard').onclick=()=>toast('🏪 '+shopName()+': trung tâm điều phối giao hàng.',2600);
  const fm=$('frontshop-modal');if(fm)fm.addEventListener('click',e=>{if(e.target===fm)closeFrontShop()});
  const sm=$('shippermap-modal');if(sm)sm.addEventListener('click',e=>{if(e.target===sm)closeShipperMap()});
}
bindStreetAndMapUI();
document.addEventListener('keydown',e=>{
  if(e.key!=='Escape')return;
  if($('frontshop-modal')&&!$('frontshop-modal').hidden)closeFrontShop();
  if($('shippermap-modal')&&!$('shippermap-modal').hidden)closeShipperMap();
});
