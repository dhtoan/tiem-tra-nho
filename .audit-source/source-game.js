const IMG = 'img/';
function ico(n,c){return `<img class="ico${c?' '+c:''}" src="img/ic_${n}.png" alt="" decoding="sync">`}

/* ---------- DATA ---------- */
/* ===== DANH MỤC: [khóa, tên, tên ngắn, màu, hạn dùng (ngày), giá nhập, giá bán, giá mở khóa] ===== */
const ITEMS={};
const mk=(type,g)=>(k,n,sn,c,life,cost,sell,unlock)=>{ITEMS[k]={n,s:sn||n,type,g,c,life,cost,sell,unlock}};
const B=mk('base'),F=mk('flav');
B('tra','Trà sữa','Trà sữa','#c8986a',3,4500,25000,0);
B('matcha','Matcha','Matcha','#8fb866',3,6000,30000,0);
B('hong','Hồng trà','Hồng trà','#b5563c',3,1500,22000,150000);
B('luc','Lục trà','Lục trà','#b9c46a',3,1500,22000,150000);
B('olong','Trà olong','Olong','#a9744a',3,2500,28000,250000);
B('thai','Trà sữa Thái','Thái','#e8894a',3,5000,30000,300000);
F('f_vai','Vải','','#f3dcd4',7,3000,8000,200000);
F('f_dao','Đào','','#f5b66b',7,3000,8000,200000);
F('f_dau','Dâu','','#f07c95',7,3000,8000,200000);
F('f_nho','Nho','','#8e5aa8',7,3500,9000,250000);
F('f_oi','Ổi','','#f4a3a0',1,3000,8000,250000);
F('f_xoai','Xoài','','#f2c14e',7,3500,9000,250000);
F('f_mang','Mãng cầu','','#cfe3b0',1,4000,10000,300000);
F('f_tao','Táo','','#d8e36b',7,3000,8000,220000);
F('f_chanh','Chanh','','#e6e27a',1,1500,5000,120000);
F('f_me','Me','','#9c6b3c',7,2500,7000,200000);
F('f_dua','Dưa gang','','#f6c79a',7,4000,10000,300000);
F('f_choco','Chocolate','','#5b3a29',7,4000,10000,350000);
const TC=mk('top','tc'),TH=mk('top','thach'),FO=mk('top','foam'),PM=mk('top','pm');
TC('tcden','Trân châu đen','TC đen','#2b1d14',1,2000,6000,0);
TC('tcvang','Trân châu hoàng kim','TC h.kim','#e0a526',1,2500,8000,200000);
TC('tcsoi','Trân châu sợi','TC sợi','#6b4a38',1,2500,8000,250000);
TC('popping','Trân châu nổ','TC nổ','#f28fb0',3,3500,9000,300000);
TC('thach','Trân châu trắng','TC trắng','#f4efe4',3,1500,5000,0);
TH('cunang','Thạch củ năng','Củ năng','#9fd49a',3,2000,7000,200000);
TH('thachtc','Thạch trái cây','Trái cây','#f5a0b8',3,2000,6000,200000);
TH('suongsao','Sương sáo','Sương sáo','#1f2a24',3,1500,6000,150000);
TH('thachcf','Thạch cà phê','Cà phê','#5a3a26',3,2000,7000,200000);
FO('cheese','Foam cheese','F.cheese','#f7d35c',2,3500,10000,300000);
FO('fmatcha','Foam matcha','F.matcha','#b6d48f',2,4000,10000,350000);
FO('fsalt','Foam muối','F.muối','#f4efe4',2,3000,9000,300000);
FO('fube','Foam ube','F.ube','#b894d8',2,4500,12000,400000);
PM('pmvien','Phô mai viên','PM viên','#f7d56b',3,4000,10000,350000);
PM('pmtuoi','Phô mai tươi','PM tươi','#fff1c2',3,5000,12000,400000);
PM('thachpm','Thạch phô mai','Thạch PM','#f5e3a0',3,3000,9000,300000);
ITEMS.cup={n:'Ly + ống hút',s:'Ly',type:'supply',life:0,cost:1500,unlock:0};
ITEMS.ice={n:'Đá viên',s:'Đá',type:'supply',life:2,cost:1000,unlock:0};
ITEMS.sugar={n:'Nước đường',s:'Đường',type:'supply',life:7,cost:500,unlock:0};
const BASE_KEYS=Object.keys(ITEMS).filter(k=>ITEMS[k].type==='base');
const FLAV_KEYS=Object.keys(ITEMS).filter(k=>ITEMS[k].type==='flav');
const TOP_KEYS=Object.keys(ITEMS).filter(k=>ITEMS[k].type==='top');
const TGROUPS=[{g:'tc',n:'Trân châu',i:ico('pearlbowl')},{g:'thach',n:'Thạch',i:'🟫'},{g:'foam',n:'Foam',i:'☁️'},{g:'pm',n:'Phô mai',i:'🧀'}];
const SLOW_G=['thach','foam','pm'];
const slowN=o=>o.tops.filter(t=>ITEMS[t]&&SLOW_G.includes(ITEMS[t].g)).length;
const DEF_SELL={L:7000};[...BASE_KEYS,...FLAV_KEYS,...TOP_KEYS].forEach(k=>DEF_SELL[k]=ITEMS[k].sell);
const OLD_NAMES={khoaimon:'Khoai môn',dau:'Sữa dâu',dao:'Trà đào',tctrang:'Trân châu trắng',pudding:'Pudding',kemtrung:'Kem trứng',L:'Phụ thu size L'};
const iname=k=>ITEMS[k]?ITEMS[k].n:(OLD_NAMES[k]||k);
window.ITEMS=ITEMS;window.BASE_KEYS=BASE_KEYS;window.FLAV_KEYS=FLAV_KEYS;window.TOP_KEYS=TOP_KEYS;window.iname=iname;window.TGROUPS=TGROUPS;
const low=n=>n.toLowerCase().replace('3q','3Q').replace('thái','Thái');
const dname=o=>ITEMS[o.base].n+(o.flav&&ITEMS[o.flav]?' '+low(ITEMS[o.flav].n):'');
const PIECE={thachtc:['#ffffff','#e34b4b','#f39a3a'],thachpm:['radial-gradient(circle,#fffaf0 0 34%,#8a5a3b 40%)']};
const pieceBg=(t,i)=>PIECE[t]?PIECE[t][i%PIECE[t].length]:ITEMS[t].c;
/* ---------- HÌNH TRÁI CÂY + FOAM ---------- */
const FEMO={f_dao:'🍑',f_dau:'🍓',f_nho:'🍇',f_xoai:'🥭',f_tao:'🍏',f_dua:'🍈',f_choco:'🍫'};
const FSVG={
  f_vai:'<circle cx="12" cy="13.5" r="8.5" fill="#d64553"/><g fill="#9e2c38"><circle cx="9" cy="11" r="1"/><circle cx="13" cy="10" r="1"/><circle cx="16" cy="13" r="1"/><circle cx="10.5" cy="15" r="1"/><circle cx="14" cy="17" r="1"/><circle cx="7.5" cy="15.5" r=".9"/><circle cx="12" cy="13" r=".9"/></g><path d="M12 5.5c1-2.5 3.5-3 5-2.5-1 2-3 3-5 2.5z" fill="#5fa84a"/>',
  f_oi:'<circle cx="12" cy="12" r="9.5" fill="#8cc152"/><circle cx="12" cy="12" r="7" fill="#f7a1a0"/><g fill="#fff3d6"><circle cx="12" cy="9" r=".9"/><circle cx="14.6" cy="11" r=".9"/><circle cx="14" cy="14.3" r=".9"/><circle cx="10" cy="14.3" r=".9"/><circle cx="9.4" cy="11" r=".9"/></g>',
  f_mang:'<ellipse cx="12" cy="13.5" rx="8" ry="9" fill="#8fbf5a"/><g fill="none" stroke="#5e8f36" stroke-width="1.1"><path d="M7 11q2 1.5 4 0t4 0 4 0"/><path d="M5.5 14.5q2 1.5 4 0t4 0 4 0 3 0"/><path d="M7 18q2 1.5 4 0t4 0 3 0"/></g><path d="M12 4.5v-2" stroke="#6b4a38" stroke-width="1.6" stroke-linecap="round"/>',
  f_me:'<path d="M3.5 15.5C5 8.5 13 5.5 20.5 8.5c1 .5.8 2.3-.4 2.4C14 10.5 9 12.5 6.5 17.5c-.8 1.4-3.3.7-3-2z" fill="#9a6435"/><g stroke="#6e4322" stroke-width="1" fill="none"><path d="M8 11.8l1.4 2.2"/><path d="M11.5 9.8l1 2.3"/><path d="M15.5 8.8l.6 2.3"/></g>',
  f_chanh:'<circle cx="12" cy="12" r="9.5" fill="#5fae3a"/><circle cx="12" cy="12" r="7.6" fill="#c9ec8a"/><g stroke="#f4fbe6" stroke-width="1.1"><path d="M12 4.6v14.8M4.6 12h14.8M6.8 6.8l10.4 10.4M17.2 6.8L6.8 17.2"/></g><circle cx="12" cy="12" r="1.3" fill="#f4fbe6"/>'
};
function flavIcon(k,sz){sz=sz||22;if(FEMO[k])return `<span class="fic" style="font-size:${Math.round(sz*.9)}px">${FEMO[k]}</span>`;
  if(FSVG[k])return `<svg class="fic" width="${sz}" height="${sz}" viewBox="0 0 24 24" aria-hidden="true">${FSVG[k]}</svg>`;
  return `<span class="dot" style="background:${ITEMS[k]?ITEMS[k].c:'#999'}"></span>`}
const cloudSvg=(c,w,h)=>`<svg width="${w}" height="${h}" viewBox="0 0 26 18" aria-hidden="true"><path d="M7 16.5h12.5a4.5 4.5 0 0 0 .8-8.93A6 6 0 0 0 8.9 6.2 5.2 5.2 0 0 0 7 16.5z" fill="${c}" stroke="rgba(0,0,0,.28)" stroke-width="1"/></svg>`;
function topIcon(k,big){const it=ITEMS[k];if(!it)return '';const b=big?' lg':'';
  if(k==='tcsoi')return `<span class="ti2 soi${b}"><i style="background:${it.c}"></i><i style="background:${it.c}"></i></span>`;
  if(PIECE[k])return `<span class="ti2 g-${it.g}${b}">${(k==='thachtc'?[0,1,2]:[0,0]).map(i=>`<i style="background:${pieceBg(k,i)}"></i>`).join('')}</span>`;
  return it.g==='foam'?`<span class="ti2 g-foam${b}">${big?cloudSvg(it.c,30,21):cloudSvg(it.c,22,15)}</span>`:`<span class="ti2 g-${it.g}${b}"><i style="background:${it.c}"></i><i style="background:${it.c}"></i></span>`}
const UPG=[
  {id:'sealer',n:'Máy dán nắp tự động',d:'Pha đúng món là máy tự dán nắp và giao ly, khách tip thêm 30% (2% tỉ lệ hỏng mỗi ngày)',cost:3000000,i:ico('upcups')},
  {id:'fridge',n:'Tủ lạnh',d:'Hạn sử dụng của đá là vĩnh viễn. Tiền điện 100k/ngày (2% tỉ lệ hỏng mỗi ngày)',cost:500000,i:'❄️'},
  {id:'mascot',n:'Mascot quán',d:'Thêm 30% khách ghé quán, khách chịu chờ lâu hơn 30%',cost:1000000,i:'🧸'},
  {id:'sign',n:'Biển hiệu đèn LED',d:'Thêm 20% khách ghé quán (2% tỉ lệ hỏng mỗi ngày)',cost:400000,i:ico('upbulb')},
  {id:'seats',n:'Bàn ghế cho khách ngồi',d:'Khách chịu chờ lâu hơn 25% (2% tỉ lệ hỏng mỗi ngày)',cost:500000,i:ico('upchair')},
  {id:'ads',n:'Quảng cáo mạng xã hội',d:'Thêm 25% khách ghé quán',cost:600000,i:ico('upmega')},
  {id:'slot4',n:'Mở rộng quầy',d:'Phục vụ cùng lúc 4 khách',cost:800000,i:'🧱'},
  {id:'floor2',n:'Nâng tầng',d:'Phục vụ cùng lúc 10 khách',cost:1000000,i:'🏢'},
  {id:'ac',n:'Máy lạnh',d:'Khách ít chê khi phải chờ',cost:900000,i:ico('upsnow')}
];
const STAFF=[
  {id:'staff0',n:'Thử việc 0 lương',d:'Bạn lấy ly, bỏ topping cho hương, đường và dán nắp. Nhân viên rót trà và đá. Tuy nhiên có tỉ lệ làm sai bill và trốn việc. Giá thuê 0k.',cost:0,wage:'wage0',from:1},
  {id:'staff1',n:'Thử việc chính thức',d:'10% làm sai bill, hỏng thì đổ bỏ làm lại. Bạn lấy ly, bỏ topping và dán nắp. Nhân viên rót trà, cho hương, đường và xúc đá. Không thể thuê cùng lúc với Quản lý. Lương 165.000đ/ngày.',cost:500000,wage:'wage1',from:1,need:()=>!(S.upg&&S.upg.staff3),needT:'Không thể thuê cùng Quản lý'},
  {id:'staff2',n:'Nhân viên pha chế',d:'Hỗ trợ từ khách thứ 3 trở đi khi quầy có từ 3 khách trở lên (khách thứ 1 & 2 để chủ quán và Gen Z lo). Pha trọn đơn từ A-Z. Tăng ca 40k/h sau 22:00.',cost:1000000,wage:'wage2',from:30},
  {id:'staffOn',n:'Nhân viên đơn online',d:'Chỉ làm đơn online: nhận trọn đơn và pha hết các ly, mỗi ly khoảng 1 giây. Hiếm khi làm hỏng ly (0,5%), hỏng thì đổ bỏ làm lại.',cost:2000000,wage:'wageOn',from:1,need:()=>!!S.online,needT:'Cần mở đơn online'},
  {id:'staff3',n:'Quản lý tập sự',d:'5% làm sai bill hỏng thì đổ bỏ làm lại. Làm việc như Thử việc chính thức (rót trà, hương, đường, đá) và thêm múc topping. Bạn chỉ cần lấy ly và dán nắp. Không thể thuê cùng lúc với Thử việc chính thức. Lương 200.000đ/ngày.',cost:750000,wage:'wage3',from:1,need:()=>!(S.upg&&S.upg.staff1),needT:'Không thể thuê cùng Thử việc'},
  {id:'staffGz',n:'Nhân viên Gen Z',d:'Tốc độ pha chế siêu tốc (200ms/bước). 1% làm sai bill, hỏng thì đổ bỏ làm lại. Làm tất tần tật từ A đến Z, nhưng đôi lúc đá bill, có tỉ lệ không lấy tiền bo mà trả cho chủ. Tính tình thất thường, dỗi sẽ nghỉ việc cần chủ dỗ dành trong 10s.',cost:1000000,wage:'wageGz',from:1},
  {id:'staffBuyer',n:'Nhân viên đi chợ',d:'Khi hết nguyên liệu (trà sữa, topping, ly, đá...), nhân viên sẽ tự chạy đi chợ mua về bán ngay trong ca để kịp phục vụ khách. Tuy nhiên nếu phải đi chợ nhiều lần trong ngày, có thể sẽ khai gian hóa đơn để đút túi riêng.',cost:500000,wage:'wageBuyer',from:1,need:()=>TOP_KEYS.every(k=>S.unlocked[k]),needT:'Cần mở full topping'},
  {id:'staffSv',n:'Sinh viên cuối tháng',d:'Làm việc sau 22h, tốc độ siêu tốc 200ms/bước giúp quán bán xuyên đêm đến sáng. Tự lấy ly, bỏ topping, đường đá, dán nắp; bạn pha trà. Buồn ngủ có thể lấy nhầm size. Sau 2h sáng túng tiền có ý đồ lén bán trang bị quán, cần bấm khuyên ngăn kịp thời!',cost:800000,wage:'wageSv',from:1},
  {id:'staffMkt',n:'Nhân viên Me két tinh',d:'Tăng 20% khách ghé quán, pha chế +20% tốc độ. Tự động phản hồi mọi đánh giá & nâng sao. Tự động trích két đóng thuế ngẫu nhiên tuỳ hứng nếu quá hạn 12h để bảo vệ sổ tiết kiệm Tà Tưa Bank. Lương 200.000đ/ngày (Tự động rep đánh giá, tăng 20% khách & pha siêu nhanh).',cost:1500000,wage:'wageMkt',from:1}
];
const BRAND_COST=5000000;
const BRAND_ICONS=Array.from({length:50},(_,i)=>'b'+String(i).padStart(2,'0'));
/* Màu nền tem + màu chữ tương phản */
const BRAND_BGS=[
  {c:'#ffffff',t:'#5a4030'},{c:'#fde9cf',t:'#7a5030'},{c:'#fcd9e2',t:'#b8406a'},
  {c:'#cdeee2',t:'#2b7d63'},{c:'#a9744e',t:'#fff6ea'},{c:'#3a2f3a',t:'#ffe9c7'},
  {c:'#ffe08a',t:'#8a5a1a'},{c:'#e0cdf2',t:'#6a3fa0'}
];
const BRAND_FRAMES=[{id:'round',n:'Tròn'},{id:'rounded',n:'Bo góc'},{id:'ribbon',n:'Ruy băng'}];
const BRAND_SLOGANS=['Trà sữa mỗi ngày','Ngon từ giọt đầu','Pha bằng cả tim','Ủ trà thật, vị thật','Nhỏ mà có võ','Chill cùng trà sữa'];
const SUGAR=[30,50,70,100], ICE=['Không đá','Ít đá','Đá thường'];
const FACES=['🧑','👩','👨','👧','🧔','👩‍🦰','👵','🧑‍🎓','👦','👱‍♀️','🧑‍💼','👴','👩‍💻','🧑‍🔧','👩‍🎓','👨‍🍳','👩‍🎨','🧑‍🎤','👱','👩‍🦱','👨‍🦱','🧕','👲','🧒','👸','🤵','👷‍♀️','🧑‍🚀','🥷','🧑‍🌾'];
/* khách ngôi sao (tên hư cấu): 30 ngày ghé 1 lần vào ngày ngẫu nhiên, trả gấp 3, luôn 5 sao */
const STAR_TXT={
  kr:{hi:[['안녕하세요! 여기 밀크티가 유명하다고 들었어요.','Xin chào! Nghe nói trà sữa ở đây nổi tiếng lắm.'],['촬영 끝나고 왔어요. 시원한 거 마시고 싶어요!','Quay hình xong mới ghé. Muốn uống gì đó mát mát!']],
    rv:[['진짜 맛있어요! 다음에 멤버들이랑 또 올게요 💜','Ngon thật sự! Lần sau sẽ dẫn cả nhóm tới nữa 💜'],['사장님 너무 친절하세요. 최고예요!','Chủ quán dễ thương quá. Tuyệt nhất luôn!']]},
  th:{hi:[['สวัสดี{p} ได้ยินว่าชานมที่นี่อร่อยมาก','Xin chào, nghe nói trà sữa ở đây ngon lắm.'],['มาเที่ยวเวียดนามครั้งแรก{p}','Lần đầu mình du lịch Việt Nam.']],
    rv:[['อร่อยมาก{p} จะกลับมาอีกแน่นอน','Ngon lắm, nhất định sẽ quay lại.'],['ร้านน่ารักมาก ชานมหอมสุดๆ','Quán dễ thương quá, trà sữa thơm cực kỳ.']]},
  cn:{hi:[['你好！听说这里的奶茶很好喝。','Xin chào! Nghe nói trà sữa ở đây rất ngon.'],['拍完戏过来的，想喝点冰的。','Quay phim xong ghé qua, muốn uống gì đó mát lạnh.']],
    rv:[['太好喝了！下次还会再来的 ❤️','Ngon quá! Lần sau nhất định lại tới ❤️'],['老板人很好，奶茶很香。','Chủ quán dễ thương, trà sữa rất thơm.']]}};
const STARS=[
  {n:'Baek Si-woo',t:'Idol Kpop · NOVA7',l:'kr',m:1,f:0},{n:'Kang Ha-jun',t:'Idol Kpop · STARLIGHT',l:'kr',m:1,f:1},{n:'Yoon Seo-ah',t:'Idol Kpop · MOONBEAM',l:'kr',m:0,f:2},
  {n:'Nong Thanakorn',t:'Diễn viên Thái',l:'th',m:1,f:3},{n:'Nong Praewa',t:'Diễn viên Thái',l:'th',m:0,f:4},{n:'Nong Sirilada',t:'Diễn viên Thái',l:'th',m:0,f:4},
  {n:'Nong Kittiphat',t:'Diễn viên Thái',l:'th',m:1,f:7},{n:'Lâm Tử Hàn',t:'Diễn viên Trung',l:'cn',m:1,f:6},{n:'Liễu Như Yên',t:'Diễn viên Trung',l:'cn',m:0,f:5},{n:'Tô Vân Hi',t:'Diễn viên Trung',l:'cn',m:0,f:5}];
const starLine=(st,kind)=>{const x=rnd(STAR_TXT[st.l][kind]);return [x[0].replace('{p}',st.m?'ครับ':'ค่ะ'),x[1]]};
function starBg(row,e,w,h){return `background-image:url(${IMG}star.webp);background-size:${w*3}px ${h*8}px;background-position:${-e*w}px ${-row*h}px;background-repeat:no-repeat`}
const PERSONA=[
  {o:['Dạ cho em','Chị ơi, cho em','Cho em'],e:[' ạ!',' nha!',' nhé, em cảm ơn!']},
  {o:['Cho em','Dạ cho em','Làm giúp em'],e:[' ạ!',' nha!',' nhé, cảm ơn nha!']},
  {o:['Cho anh','Em ơi, cho anh','Làm cho anh'],e:[' nha em!',' nhé!',' nha, cảm ơn em!']},
  {o:['Cho chị','Em ơi, cho chị','Làm giúp chị'],e:[' nha em!',' nhé!',' nha, cảm ơn em!']},
  {o:['Cho em','Dạ cho em','Bán cho em'],e:[' ạ!',' nha!',' nhé!']},
  {o:['Cho chú','Cháu ơi, cho chú','Làm cho chú'],e:[' nha cháu!',' nhé!',' nha, cảm ơn cháu!']},
  {o:['Cho bà','Cháu ơi, cho bà','Làm cho bà'],e:[' nghen cháu!',' nha con!',' nha, bà cảm ơn!']},
  {o:['Dạ cho em','Cho em','Cho em xin'],e:[' ạ!',' nha!',' ạ, em cảm ơn!']},
  {o:['Dạ cho em','Cho em','Cho em xin'],e:[' ạ!',' nha!',' ạ, em cảm ơn!']}
];
const NM_NU=["An", "Anh", "Ánh", "Bảo Anh", "Bảo Châu", "Bảo Ngọc", "Bích", "Cẩm", "Cát Tường", "Châu", "Chi", "Diệp", "Diệu", "Diễm", "Dung", "Duyên", "Gia Hân", "Giang", "Hà", "Hạ", "Hải Yến", "Hân", "Hằng", "Hạnh", "Hiền", "Hoa", "Hoài", "Hồng", "Huệ", "Hương", "Huyền", "Khánh Linh", "Khánh Vy", "Khuê", "Kiều", "Kim", "Lam", "Lan", "Lan Anh", "Liên", "Linh", "Loan", "Ly", "Mai", "Mai Anh", "Minh Thư", "My", "Mỹ", "Nga", "Ngân", "Nghi", "Ngọc", "Ngọc Hân", "Nguyệt", "Nhã", "Nhàn", "Nhi", "Nhung", "Như", "Oanh", "Phương", "Phương Anh", "Quế", "Quyên", "Quỳnh", "Quỳnh Anh", "Sa", "Tâm", "Thanh", "Thảo", "Thi", "Thơ", "Thu", "Thùy", "Thủy", "Thư", "Thy", "Tiên", "Trà My", "Trâm", "Trang", "Trinh", "Trúc", "Tuyết", "Uyên", "Vân", "Vi", "Việt Hà", "Vy", "Xuân", "Yến", "Ý", "Hoàng Anh", "Thục Anh", "Khả Hân", "Minh Châu", "Tường Vy", "Hồng Nhung", "Thanh Hà", "Thu Trang", "Bích Ngọc", "Ngọc Trâm", "Diễm My", "Thảo Vy", "An Nhiên", "Hạ Vy", "Hải Đường", "Mộc Miên", "Thiên Kim", "Kim Ngân", "Như Ý", "Bảo Vy", "Tú Anh", "Tố Như", "Thanh Trúc", "Phương Linh", "Yến Nhi", "Mỹ Duyên", "Ngọc Diệp", "Quế Anh", "Lệ Quyên", "Hoàng Yến"],NM_NAM=["An", "Bảo", "Bình", "Cường", "Công", "Danh", "Đạt", "Dũng", "Duy", "Dương", "Đăng", "Đông", "Đức", "Gia Bảo", "Hải", "Hào", "Hậu", "Hiếu", "Hiển", "Hòa", "Hoàng", "Huy", "Hùng", "Hưng", "Khang", "Khải", "Khánh", "Khoa", "Khôi", "Kiên", "Kiệt", "Lâm", "Lộc", "Long", "Luân", "Mạnh", "Minh", "Nam", "Nghĩa", "Nguyên", "Nhân", "Nhật", "Phát", "Phong", "Phúc", "Phước", "Quân", "Quang", "Quốc", "Sang", "Sơn", "Tài", "Tâm", "Tân", "Thái", "Thắng", "Thành", "Thiện", "Thịnh", "Thông", "Tiến", "Toàn", "Trí", "Trọng", "Trung", "Tú", "Tuấn", "Tùng", "Văn", "Việt", "Vinh", "Vũ", "Minh Khang", "Gia Huy", "Đức Anh", "Hoàng Nam", "Quốc Bảo", "Thành Đạt", "Minh Quân", "Tuấn Kiệt", "Nhật Minh", "Hải Đăng", "Anh Khoa", "Bảo Long", "Thiên Ân", "Trung Kiên", "Việt Hoàng", "Quang Huy", "Đình Phong"],NM_BE=["Bé Na", "Bơ", "Mít", "Sữa", "Su Su", "Bin", "Tôm", "Cún", "Mèo Mun", "Kem", "Na Na", "Gấu", "Bống", "Bi", "Xoài", "Chuối", "Heo", "Cà Rốt", "Bắp", "Ốc", "Nấm", "Mochi", "Khoai", "Đậu", "Sóc", "Thỏ", "Kẹo", "Bánh Bao", "Cốm", "Gạo", "Nếp", "Tí", "Tèo", "Bo", "Ken", "Ben", "Bông", "Mận", "Dâu", "Chôm Chôm", "Cam", "Quýt", "Mơ", "Táo", "Nho", "Ruby", "Coca", "Pepsi", "Sushi", "Pudding", "Bột", "Mì", "Tủn", "Hạt Tiêu", "Gừng", "Sả", "Bắp Cải", "Củ Cải", "Su Hào", "Xíu"],NM_CHU=["Hùng", "Tâm", "Phong", "Lâm", "Thành", "Dũng", "Sơn", "Bình", "Tư", "Năm", "Sáu", "Bảy", "Tám", "Hai", "Ba", "Lực", "Quý", "Phúc", "Lộc", "Thọ", "Tài", "Nghĩa", "Trung", "Hiếu", "Hậu", "Đức", "Thắng", "Lợi", "Kha", "Minh", "Hòa", "Thuận", "Vĩnh", "Khương", "Tùng", "Bách", "Trường", "Cảnh", "Toàn", "Chiến"],NM_BA=["Hai", "Ba", "Tư", "Năm", "Sáu", "Bảy", "Tám", "Chín", "Mười", "Út", "Lan", "Cúc", "Mai", "Đào", "Hồng", "Huệ", "Sen", "Thơm", "Tý", "Nhàn", "Hạnh", "Phúc", "Xuân", "Thu", "Liên", "Mận", "Na", "Sương", "Hiền", "Tâm"];
const NM_HO=['Nguyễn','Trần','Lê','Phạm','Hoàng','Huỳnh','Phan','Vũ','Võ','Đặng','Bùi','Đỗ','Hồ','Ngô','Dương','Lý','Trương','Đinh','Lâm','Mai'];
function uniqName(gen){const h=S.nameLog||(S.nameLog=[]),used=new Set([...h,...(R&&R.slots?[...R.slots.filter(Boolean),...(R.online||[])].map(c=>c.name):[])]);
  let n=gen();for(let t=0;t<40&&used.has(n);t++)n=gen();h.push(n);if(h.length>380)h.splice(0,h.length-380);return n}
const HN=L=>rnd(NM_HO)+' '+rnd(L);
const PNAME={0:()=>uniqName(()=>Math.random()<.5?rnd(NM_NU):HN(NM_NU)),1:()=>uniqName(()=>Math.random()<.5?rnd(NM_NU):rnd(NM_BE)),3:()=>uniqName(()=>'Chị '+rnd(NM_NU)),
  4:()=>uniqName(()=>Math.random()<.6?rnd(NM_BE):'Bé '+rnd(Math.random()<.5?NM_NU:NM_NAM)),7:()=>uniqName(()=>rnd(NM_NU)),8:()=>uniqName(()=>HN(NM_NU)),
  2:()=>uniqName(()=>Math.random()<.5?'Anh '+rnd(NM_NAM):HN(NM_NAM)),5:()=>uniqName(()=>'Chú '+rnd(Math.random()<.4?NM_CHU:NM_NAM)),6:()=>uniqName(()=>'Bà '+rnd(Math.random()<.3?NM_BA:NM_NU))};
const OPEN=['Cho mình','Em ơi, cho chị','Bán cho anh','Làm giúp mình','Cho em','Cho tui'],ENDS=[' nha!',' nhé!','.',' nha, cảm ơn!',' nhé em!'];
const N_LAST=['Anh','Trâm','Vy','Linh','Hân','Nhi','My','Thảo','Ngân','Trang','Hương','Uyên','Quyên','Hà','Châu','Duyên','Khuê','Yến','Tú','Nam','Huy','Khoa','Phúc','Bảo','Tuấn','Long','Khang','Đạt','Minh','Hiếu','Quân','Thịnh','Sơn','Tài','Vinh','Kiệt','Duy','Lộc','Toàn','Trí','Ngọc','Thư','Giang','Phương','Nga','Loan','Quang','Tâm','Hưng','Phát'];
const N_MID=['Minh','Ngọc','Thu','Gia','Bảo','Khánh','Hoàng','Thanh','Quỳnh','Tuấn','Hải','Phương','Mai','Đức','Kim','Nhật','Tường','Hồng','Diệu','Anh','Thiên','Xuân','Như','Cát'];
const N_NICK=['Bé Na','Bơ','Mít','Sữa','Su Su','Bin','Tôm','Cún','Mèo Mun','Kem','Na Na','Gấu','Bống','Bi','Xoài','Chuối','Heo Hồng','Cà Rốt','Bắp','Ốc','Nấm','Mochi','Tiểu Muội','Khoai','Đậu'];
function genName(){return uniqName(()=>Math.random()<.5?rnd(NM_HO)+' '+rnd(NM_NU):rnd(NM_HO)+' '+rnd(NM_NAM))}
const SAVE='tsShop2', OWNER_SAVE='tsOwner';
const GAME_VERSION = '12.47.144';
const CHANGELOG=[
  {v:'12.47.144',d:'30/09/2026',items:[
    '📢 Me két tinh: Tăng 20% khách ghé quán, pha chế +20% tốc độ toàn tiệm',
    '⭐ Tự động phản hồi mọi đánh giá khách hàng và nâng sao khích lệ',
    '🏦 Tự động trích két ngẫu nhiên tuỳ hứng đóng thuế nếu quá hạn 12h để bảo vệ sổ tiết kiệm Tà Tưa Bank',
    '💵 Cập nhật lương Me két tinh: 200.000đ/ngày (Tự động rep đánh giá, tăng 20% khách & pha siêu nhanh)'
  ]},
  {v:'12.47.143',d:'30/09/2026',items:[
    '⚡ Tối ưu hoá toàn diện di động: Triệt tiêu 100% hiệu ứng làm mờ nền nặng (backdrop-filter: blur), giúp máy chạy mát và tiết kiệm pin',
    '🔇 Mặc định tắt nhạc nền và hiệu ứng âm thanh (người chơi chủ động bật khi có nhu cầu)',
    '🎯 Chuyển đổi các hiệu ứng animation box-shadow phức tạp sang GPU Compositor (transform/opacity)',
    '⏱️ Tối ưu vòng lặp game: Throttle widget nhân viên về 1s, thêm dirty-check cho thanh kiên nhẫn và nhãn thời gian'
  ]},
  {v:'12.47.142',d:'30/09/2026',items:[
    '🏦 Tà Tưa Bank: Sửa triệt để lỗi gửi thêm tiền tiết kiệm bị reset tiến độ về 0; giờ đây số ngày tích lũy kỳ hạn sẽ được tiếp tục bảo lưu nguyên vẹn khi gửi thêm tiền'
  ]},
  {v:'12.47.141',d:'30/09/2026',items:[
    '🤫 Cân bằng tâm lý Gen Z: Khi đá bill thành công sẽ không bao giờ dỗi nữa; mỗi ngày chỉ cần dỗ dành tối đa 1 lần',
    '✨ Tối giản Avatar nhân viên: Chỉ giữ Avatar tròn thuần túy của Gen Z và Sinh viên, gỡ bỏ toàn bộ icon tai nghe, tiền, thùng hàng phủ lên avatar',
    '🎯 Gỡ bỏ khung màu cam (.q3want) nhấp nháy quanh món pha chế khi Gen Z và Sinh viên đang làm việc',
    '🛵 Điều chỉnh vị trí thanh nhân viên: Tab chạy xe (Đi chợ) luôn nằm trên tab Gen Z, tab Gen Z luôn nằm dưới cùng',
    '🧹 Tinh gọn phản hồi đánh giá: Xoá thông báo "Chủ tiệm đã gửi phản hồi! Khách đã phản hồi lại ở lượt 4." và xoá nhãn "(Cố định - Không thể sửa)"'
  ]},
  {v:'12.47.140',d:'30/09/2026',items:[
    '🧊 Nâng hạn sử dụng của đá viên lên 2 ngày',
    '❄️ Ra mắt trang bị Tủ lạnh (500k, tiền điện 100k/ngày): Bảo quản đá viên vĩnh viễn không bao giờ hết hạn',
    '🛠️ Cơ chế bảo trì trang bị: Tủ lạnh, máy dán nắp, biển hiệu đèn LED, bàn ghế có 2% tỉ lệ hỏng mỗi ngày mới kèm thông báo để chủ tiệm mua lại',
    '🧘 Giảm tỉ lệ drama nhân sự xuống còn 20% giúp quán vận hành êm ả, ổn định hơn'
  ]},
  {v:'12.47.139',d:'30/09/2026',items:[
    '🏢 Thêm trang bị Nâng tầng (1.000.000đ): Mở rộng phục vụ cùng lúc 10 khách hàng tại quầy',
    '⭐ Tăng mạnh tỉ lệ khách phản hồi 5 sao: Gỡ bỏ cơ chế nerf ngầm, khách hàng hài lòng tự tin đánh giá 5 sao'
  ]},
  {v:'12.47.138',d:'30/09/2026',items:[
    '⚡ Tăng tốc pha chế siêu tốc: Giảm thời gian pha chế của Gen Z và Sinh viên cuối tháng xuống còn 200ms/bước, phục vụ khách cực nhanh và mượt mà'
  ]},
  {v:'12.47.137',d:'30/09/2026',items:[
    '🤫 Cân bằng tâm lý Gen Z: Giảm mạnh tỉ lệ đá bill (~1.5%), mỗi ngày chỉ đá bill tối đa 1 lần, khi thành công tuyệt đối không đá bill nữa'
  ]},
  {v:'12.47.136',d:'30/09/2026',items:[
    '⚡ Nâng cấp tốc độ pha chế siêu tốc cho Nhân viên Gen Z và Sinh viên cuối tháng: 250ms/bước, phục vụ khách siêu nhanh và mượt mà'
  ]},

  {v:'12.47.121',d:'30/09/2026',items:[
    '🚨 Bổ sung mục Báo Công An trong Cài đặt: Cho phép chủ quán chủ động tố giác các vụ việc khách đưa tiền giả bất cứ lúc nào để thu hồi tiền và nhận thưởng nóng +1.000.000đ',
    '⏱️ Nâng thời gian báo nhanh lên 60 giây và chuyển nút sang góc trên bên phải nổi bật, đẹp mắt, không còn bị che khuất',
    '👮‍♂️ Bảo lưu hồ sơ tiền giả đến cuối ngày: Trôi qua 60s vẫn được lưu hồ sơ để mở mục Báo Công An hoặc nhận diện phá án cùng Công An cuối ca'
  ]},
  {v:'12.47.120',d:'30/09/2026',items:[
    '✨ Xoá hoàn toàn ly nước và thanh chữ của Gen Z / Sinh viên dưới Avatar khách hàng: Trả lại không gian thoáng đãng cho Avatar và mặt khách, tiến trình pha chế hiển thị trực quan tại thanh Gen Z dưới đáy màn hình'
  ]},
  {v:'12.47.119',d:'30/09/2026',items:[
    '🥤 Khôi phục và nâng cấp Text gợi ý nguyên liệu cần chọn bên dưới ly: Hiển thị tinh gọn 2 dòng gọn gàng, tự động cập nhật nguyên liệu còn thiếu và báo xanh khi đã đủ, triệt tiêu hoàn toàn lỗi tràn sang khay topping',
    '🛑 Sửa triệt để lỗi không thể tắt khuyên ngăn sinh viên bán đồ: Khi bấm đủ số lần hoặc hết sự cố, giao diện được dọn dẹp sạch sẽ tức thì và quay về thanh trạng thái làm việc bình thường'
  ]},
  {v:'12.47.118',d:'30/09/2026',items:[
    '🛡️ Bảo vệ 100% tài khoản khi cập nhật: Cơ chế tự động sao lưu dự phòng (tsShop2_persist & 3 mốc tsBak) trước mọi lần làm mới, load đa tầng chống reset về Ngày 1',
    '⚡ Xoá sạch bộ nhớ đệm (Cache) web tức thì: Bổ sung Anti-Cache Headers trên Cloudflare/Vercel và tự động nhận diện version.json mới để ép tải bản mới nhất',
    '🔄 Nút "Cập nhật bản mới" trong Cài đặt & Khởi động: Tự động lưu tiến trình hiện tại, dọn sạch ServiceWorker & CacheStorage trước khi tải lại web'
  ]},
  {v:'12.47.117',d:'30/09/2026',items:[
    '🎯 Khớp viền chọn & hội thoại với khách đang pha: Viền chọn hồng (outline) và bong bóng thoại luôn khớp chuẩn xác 100% với khách hàng mà Gen Z hoặc Sinh viên đang pha chế',
    '📌 Khóa tab thông báo & banner Gen Z ở dưới đáy màn hình: Chuyển toàn bộ thông báo và tab Gen Z xuống dưới đáy màn hình, triệt tiêu lỗi che khuất thanh thông tin và hàng khách phía trên',
    '🫖 Hoạt ảnh rót trà sống động cho Gen Z & Sinh viên: Hiệu ứng dòng trà tuôn chảy, mực nước dâng dần theo thời gian thực kèm âm thanh nước rót róc rách và bình trà phát sáng ở cả quầy chính lẫn ly mini',
    '⚡ Tăng 25% tốc độ pha chế của Nhân viên Gen Z so với các nhân viên khác'
  ]},
  {v:'12.47.116',d:'30/09/2026',items:[
    '🫖 Hoạt ảnh rót trà sống động cho Gen Z & Sinh viên: Hiệu ứng dòng trà tuôn chảy, mực nước dâng dần theo thời gian thực kèm âm thanh nước rót róc rách và bình trà phát sáng ở cả quầy chính lẫn ly mini',
    '🎯 Ưu tiên phục vụ thông minh cho Gen Z & Sinh viên: Luôn ưu tiên người đứng đầu tiên theo thứ tự trên màn hình hoặc người sắp hết kiên nhẫn nhất (dưới 50%)',
    '🧋 Vị trí icon & ly pha chế: Đem xuống dưới avatar khách thay vì ở trên, không còn bị mái che che khuất',
    '⚡ Tăng 25% tốc độ pha chế của Nhân viên Gen Z so với các nhân viên khác'
  ]},
  {v:'12.47.115',d:'30/09/2026',items:[
    '🎯 Ưu tiên phục vụ thông minh cho Gen Z & Sinh viên: Luôn ưu tiên người đứng đầu tiên theo thứ tự trên màn hình hoặc người sắp hết kiên nhẫn nhất (dưới 50%)',
    '🧋 Vị trí icon & ly pha chế: Đem xuống dưới avatar khách thay vì ở trên, không còn bị mái che che khuất',
    '⚡ Tăng 25% tốc độ pha chế của Nhân viên Gen Z so với các nhân viên khác'
  ]},
  {v:'12.47.103',d:'30/09/2026',items:[
    '👑 Luôn nhường khách hàng đầu tiên cho Chủ quán: Nhân viên pha chế & Gen Z không tranh khách đầu, để chủ tiệm tự tay pha chế và xem khách tuột kiên nhẫn',
    '⏱️ Giảm tốc độ pha chế của Gen Z (~1.6s - 2.0s mỗi bước): Người chơi thoải mái theo dõi trọn vẹn từng bước pha chế và đọc kịp các dòng thoại trách móc',
    '🥤 Ly nước mini sống động rực rỡ trên đầu khách: Thiết kế 3D thủy tinh sáng bóng, mực nước sóng sánh đúng màu trà, topping trân châu và đá viên chuyển động leng keng',
    '🚶 Tăng mạnh lượng khách ghé quán: Khách đến nườm nượp đông đúc gấp đôi, thời gian chờ khách rút ngắn còn ~3s để quán luôn rộn ràng tấp nập'
  ]},
  {v:'12.47.102',d:'30/09/2026',items:[
    '🖼️ Đồng bộ chuẩn xác Avatar nhân viên Gen Z tại mục Gợi ý đặt hàng hôm nay trong kho và toàn bộ các danh sách nhân sự',
    '🥤 Ly nước Gen Z đang pha hiển thị trực quan trên đầu khách hàng',
    '✨ Quầy pha chế trung tâm hoàn toàn nhường cho Chủ quán & Quản lý tập sự, thực tập',
    '⚡ Gen Z can thiệp thông minh khi khách hàng kiên nhẫn ≤ 50% kèm các lời trách móc hài hước'
  ]},
  {v:'12.47.101',d:'30/09/2026',items:[
    '🥤 Ly nước Gen Z đang pha hiển thị trực tiếp trên đầu khách hàng: Thao tác sinh động với mực nước, màu trà, siro, tầng topping, đá và dán nắp',
    '✨ Quầy pha chế trung tâm hoàn toàn nhường cho Chủ quán & Quản lý tập sự, thực tập: Thao tác tự do, không bị nhân viên cướp bàn pha',
    '⚡ Cơ chế can thiệp thông minh của Gen Z: Chỉ ra tay khi khách hàng bị tụt độ kiên nhẫn xuống còn 50%, kèm những câu trách móc hài hước siêu lầy lội ("Sếp tránh ra để em làm!", "Sếp vào nghỉ đi để em lo!", "Sếp về đi để em gánh!")',
    '🧑‍💼 Nhân viên pha chế & Quản lý tập sự hỗ trợ đắc lực cùng chủ quán tại quầy'
  ]},
  {v:'12.47.100',d:'30/09/2026',items:[
    '🥤 Hiển thị trực quan quá trình pha chế của Gen Z & Sinh viên cuối tháng: Từng thao tác lấy ly, rót trà, bơm siro, thả từng tầng topping, cân chỉnh đường đá và dán nắp đều hiển thị trực tiếp sống động trên thớt quầy chính',
    '⭐ Ưu tiên số 1 cho Gen Z & Sinh viên cuối tháng: Tự động pha chế hết tất cả các đơn tại quầy chuẩn xác từ A-Z',
    '🛵 Nhân viên online chuyên trách đơn online độc lập, không tranh chấp đơn quầy',
    '🔄 Khi không có Gen Z / Sinh viên, hệ thống tự động chuyển giao lại cho Quản lý tập sự & Nhân viên pha chế như cũ'
  ]},
  {v:'12.47.99',d:'30/09/2026',items:[
    '⭐ Ưu tiên số 1 cho Gen Z & Sinh viên cuối tháng: Nếu đã thuê thì sẽ tự động pha chế hết tất cả các đơn tại quầy chuẩn xác từ A-Z',
    '🛵 Nhân viên online chuyên trách đơn online: Tự động nhận và pha chế trọn gói các đơn online, không bị xung đột với quầy chính',
    '🔄 Tự động chuyển giao cơ chế: Khi không thuê Gen Z / Sinh viên (hoặc khi nhân viên nghỉ), hệ thống tự động kích hoạt cơ chế gốc của Quản lý tập sự & Nhân viên pha chế'
  ]},
  {v:'12.47.98',d:'30/09/2026',items:[
    '🛵 Khách hàng dạo phố ấn tượng: Phóng to hình ảnh khách lên tầm giữa màn hình cực rõ nét và nổi bật',
    '🚶 Khách đi ngẫu nhiên từng người một: Xuất hiện luân phiên đổi nhân vật thú vị, đường phố thoáng đãng không bị che khuất',
    '🐱 Thần Mèo Karin: Cố định vị trí đứng trang trọng ngay trên quầy gỗ giữa quán để ban phước tăng kiên nhẫn'
  ]},
  {v:'12.47.89',d:'30/09/2026',items:[
    '🎉 Ra mắt Hệ Thống Hợp Đồng Đặt Tiệc & Đơn Lớn trước khi mở cửa quán (Sinh nhật, Tiệc công ty, Họp lớp, Hội thao...): Nhận cọc ngay 35%, theo dõi tiến độ và nhận thanh toán lớn + thưởng hợp đồng khi kết ca',
    '📈 Cơ chế tăng trưởng lượng khách bùng nổ theo ngày: Bỏ giới hạn trần, càng làm về sau tiệm càng đông khách và nổi tiếng (+2.5% mỗi ngày đầu, lũy tiến liên tục các ngày sau)',
    '🌦️ Thời tiết ảnh hưởng sâu sắc đến khách hàng: Nắng nóng quầy đông đúc (+35%), Mưa bão đơn online bùng nổ (+80% - +120%), Nắng dịu dạo phố tấp nập (+40%)'
  ]},
  {v:'12.47.88',d:'30/09/2026',items:[
    '🎉 Hệ thống Đơn Đặt Tiệc Số Lượng Lớn (Sinh nhật, Tiệc công ty, Họp lớp, Hội thao...): Hiển thị thẻ thông báo hàng ngày tương tự thời tiết, kéo lượng khách bùng nổ (+30% - +55%) và nhận thưởng lớn hợp đồng khi kết ca',
    '🏛️ Tăng thời hạn Đóng Thuế Trực Tuyến 24h thành 72h (3 ngày thực): Cập nhật chính sách thuế & thống kê tiệm, thời gian bảo hộ kéo dài gấp 3 lần thoải mái hơn',
    '🛡️ Đồng bộ Me Két Tinh và Biên lai thuế trực tuyến theo chu kỳ bảo hộ 72 giờ thực tế'
  ]},
  {v:'12.47.87',d:'30/09/2026',items:[
    '👥 Bổ sung nút Gọi đi làm & Cho nghỉ việc tại mục KPI nhân viên: Cơ chế đồng bộ hoàn toàn với mục Nhân viên trong Nâng cấp',
    '✨ Cho phép quản lý nhân sự linh hoạt trực tiếp tại KPI: Xem phong độ, cấp KPI rồi bấm cho nghỉ hoặc gọi đi làm lại tức thì',
    '➕ Hỗ trợ duyệt và tuyển mới nhân viên trực tiếp từ giao diện KPI nhân viên'
  ]},
  {v:'12.47.86',d:'30/09/2026',items:[
    '🧹 Xoá hoàn toàn dòng text gợi ý pha chế (👉 Cần thêm...) bị tràn đè lên các khay topping',
    '🥤 Sửa triệt để lỗi ấn vào ly bị báo "Đổ ly này trước": Khi chưa có ly trên thớt luôn tự động dọn sạch để lấy ly mới mượt mà, cho phép đổi size M/L trực tiếp',
    '🛵 Giảm mạnh tỉ lệ nhân viên đi chợ khai khống tiền hàng: 4 chuyến đầu hoàn toàn trung thực (0%), chuyến sau tỉ lệ cực thấp chỉ 5% - 12%',
    '🚶 Khách đến quán tấp nập, không còn bị nghẽn: Đơn 3 ly không còn chặn khách mới, quầy luôn đông đúc rộn ràng'
  ]},
  {v:'12.47.85',d:'30/09/2026',items:[
    '🧋 Điều chỉnh nhịp độ pha chế chuẩn mực: Không còn bị tua nhanh chóng mặt, nhìn thấy rõ từng khách hàng đứng chờ, từng ly nước và từng thao tác múc topping sinh động',
    '✨ Hiệu ứng topping mượt mà: Các thao tác múc topping, siro, đường đá của nhân viên phụ quầy và Gen Z có nhịp điệu tự nhiên (0.5s - 0.9s), nổi rõ lớp topping trong ly',
    '🧑‍🍳 Nhân viên pha chế & Gen Z thông minh: Khách đứng quầy đàng hoàng, có thời gian thưởng thức không gian tiệm trà, không bị cướp đơn biến mất tức thì'
  ]},
  {v:'12.47.84',d:'30/09/2026',items:[
    '🎭 Luôn mở cơ chế Drama Nhân sự: Bỏ công tắc cài đặt, kích hoạt drama hài hước tự nhiên mỗi ngày',
    '🤣 Thêm hàng loạt Drama dở khóc dở cười: Nhân viên đùng đùng nghỉ việc khiến chủ quán tự làm, nhân viên vòi tiền ứng cơm tấm/nạp gacha, nhân viên thấy quán đông đòi tăng lương...',
    '💡 Tương tác trực tiếp: Chủ quán có thể duyệt chi hoặc từ chối yêu cầu vòi tiền/tăng lương của nhân viên'
  ]},
  {v:'12.47.83',d:'30/09/2026',items:[
    '🛵 Sửa triệt để lỗi đứng thông báo đang chạy chợ: Tối ưu bộ đếm thời gian, chống spam thông báo làm đơ popup, tự động dọn sạch widget khi hoàn thành',
    '🏦 Tà Tưa Bank: Lãi kép điều chỉnh thành 1%/ngày (sinh lời đều đặn mỗi ngày bán nước)',
    '💬 Đánh giá tiệm: Bỏ dòng Chờ chủ tiệm phản hồi, chỉ khi chủ tiệm trả lời thì khách hàng mới phản hồi lại',
    '📢 Đánh giá tiệm: Bỏ hoàn toàn dòng nhắc nhở Chưa thuê nhân viên Me két tinh'
  ]},
  {v:'12.47.82',d:'30/09/2026',items:[
    '✅ Sửa lỗi triệt để: Khách đến mua nước tấp nập bình thường (khắc phục lỗi gián đoạn do biến isFullTop)',
    '🎭 Hoàn trả lại cơ chế drama: Mặc định TẮT hoàn toàn, nhân viên 100% làm việc đầy đủ không bị vắng mặt',
    '⚙️ Thêm công tắc Bật/Tắt Drama nhân sự hài hước trong menu Cài đặt nếu bạn muốn bật lại'
  ]},
  {v:'12.47.81',d:'30/09/2026',items:[
    '🎭 Giữ lại cơ chế drama nhân sự hài hước: Nhân viên bất ngờ xin nghỉ phép, đi trễ nửa ca hoặc nộp đơn nghỉ việc vì các lý do độc lạ hài hước (không còn dòng thông báo áp lực gây khó chịu)',
    '🛡️ Xoá bỏ hoàn toàn cơ chế móc tiền trên 500tr & an ninh mạng: Giữ tiền an toàn trong két, không còn bị trộm cạy két, lừa đảo công nghệ cao hay phạt tiền mặt',
    '🎲 Bầu Cua & Xì Dách: Xoá bỏ hoàn toàn nút cược "Hết két", tránh rủi ro mất trắng két tiền'
  ]},
  {v:'12.47.80',d:'30/09/2026',items:[
    '🗑️ Xoá bỏ hoàn toàn toàn bộ hội thoại & thông báo Drama nhân sự: Không còn bất kỳ popup "ĐƠN XIN NGHỈ / DRAMA NHÂN SỰ ĐỘT XUẤT!" hay viện cớ vắng mặt',
    '👥 Nhân sự tập trung 100% làm việc: Tất cả nhân viên đã thuê luôn có mặt đầy đủ mỗi ngày, phối hợp làm việc mượt mà và năng suất'
  ]},
  {v:'12.47.79',d:'30/09/2026',items:[
    '⚡ Siêu tối ưu hiệu năng & Giảm nhiệt máy: Giảm 98% render dư thừa trong animation rót trà, không còn nóng máy và lag giật',
    '🧋 Giảm lượng topping về chuẩn cũ (1 - 3 topping, tối đa 4): Khách không còn gọi 7-10 loại topping quá tải, làm nhanh gọn nhẹ',
    '👥 Khôi phục 2 nhân viên làm cùng lúc: Bỏ hoàn toàn cơ chế drama xin nghỉ phép/đi trễ; Nhân viên phụ quầy và Nhân viên pha chế làm song song đồng thời tăng gấp đôi năng suất',
    '💡 Khắc phục triệt để không nhận thao tác: Bỏ chặn phím khi nhân viên đang phụ quầy; bấm là nhận ngay lập tức 100%',
    '📋 Checklist & Đèn hiệu thông minh: Các khay nguyên liệu còn thiếu sẽ phát sáng (bỏ vào ly xong là tắt sáng); hiển thị rõ nguyên liệu cần thêm ngay trên ly'
  ]},
  {v:'12.47.78',d:'30/09/2026',items:[
    '🌅 Ca đêm đến 6h sáng: Sinh viên cuối tháng và nhân viên đi chợ làm việc đến 6h sáng; đúng 6h sáng ngưng nhận thêm khách, nhân viên hoàn thành xong việc dở dang mới được về',
    '💵 Khôi phục trừ lương mỗi ngày: Tiền lương nhân viên vẫn được tính và trừ đều đặn vào bill két mỗi ngày',
    '📜 Cố định vị trí cuộn KPI: Khi bấm chọn đánh giá KPI cho từng nhân viên, danh sách giữ nguyên vị trí cuộn thay vì bị nhảy lên đầu',
    '⭐ Đếm số lần đạt 5 sao: Mỗi lần tiệm chạm đỉnh 5 sao, phía trước 5 ngôi sao ở góc phải hiển thị thêm số lần đạt (x2, x3...)'
  ]},
  {v:'12.47.77',d:'30/09/2026',items:[
    '💬 Sửa triệt để lỗi nhận diện phản hồi thô tục: Loại bỏ lỗi nhận diện nhầm từ "các" trong "các đồng chí", "các bạn"...',
    '✨ Từ ngữ lễ phép ("dạ", "vâng", "ạ"): Khi chủ quán phản hồi có "dạ, vâng, ạ" hoặc lời cảm ơn, luôn xem là phản hồi tích cực và miễn nhiễm hoàn toàn với đánh giá thô tục/gay gắt',
    '🗑️ Bỏ các gợi ý trả lời nhanh trong hộp thoại phản hồi đánh giá khách hàng',
    '🎁 Khôi phục & kích hoạt chuẩn xác cơ chế nhận nước FREE: Khi chủ quán hứa tặng ly nước free, khách sẽ ghé quán trong các ca tiếp theo nhận ly nước 0đ và tặng 5★'
  ]},
  {v:'12.47.76',d:'30/09/2026',items:[
    '📊 Chu kỳ xét KPI & Trả lương 7 ca bán: Tiền lương và tiền bo dồn tính vào ngày xét KPI thay vì trừ mỗi ngày',
    '🌟 Quy chế thưởng KPI & Lương mới: Xuất sắc (100k + lương + 1% doanh thu quán hoặc 2% bill); Đạt chuẩn (50k + lương + 0.5% doanh thu quán hoặc 1% bill); Không đạt (chỉ nhận 80% lương, 0đ thưởng & % doanh thu)',
    '🚨 Cảnh báo hạn chót ngày 7: Nếu đến ngày thứ 7 không trả lương, nhân viên sẽ đồng loạt đình công nghỉ việc và lấy hết tiền trong két quán!',
    '💵 Tiền bo nhân viên: Nhân viên tự chia đều không trả lại cho chủ, có 35% tỉ lệ nhân viên trung thực nộp lại tiền bo vào két quán',
    '⚡ Tinh thần đồng đội: Thuê nhiều nhân viên cùng lúc sẽ kích hoạt buff tương trợ, đồng loạt tăng tốc độ xử lý & pha chế toàn diện',
    '📈 Nâng cấp cấp độ: Tăng từ 0.1% lên 1% mỗi cấp (Trang bị giảm thiệt hại 1%/cấp, Nhân viên x2 lợi nhuận 1%/cấp, Online tăng đơn 1%/cấp)',
    '🎟️ Gỡ bỏ hoàn toàn trò chơi Vé Số Trà Sữa khỏi quán'
  ]},
  {v:'12.47.75',d:'30/09/2026',items:[
    '🎟️ Vé Tà Tửa Số: Thay thế vé trà sữa lót bằng vé số kiến thiết truyền thống; chọn dãy 5 chữ số từ 0 đến 9, bổ sung danh sách đài xổ số các tỉnh thành Việt Nam (TP.HCM, Hà Nội, Đà Nẵng, Cần Thơ, Tiền Giang, Bình Dương...)',
    '🏛️ Đóng thuế trực tuyến 24h: Tăng thời hạn hiệu lực bảo hộ thuế lên 1 ngày thực tế (24 giờ)',
    '📉 Giảm mức thuế quy định xuống 5% - 15%: Giúp chủ quán dễ thở, vẫn nhận trọn vẹn buff lượng khách, tốc độ và giảm trộm cắp',
    '📢 Nhân viên Me Két Tinh đóng thuế tự động: Luôn chủ động trích 15% két đóng thuế khi gần đến hạn (dưới 2h hoặc quá hạn), bảo vệ vĩnh viễn sổ tiết kiệm Tà Tưa Bank'
  ]},
  {v:'12.47.74',d:'30/09/2026',items:[
    '👥 Thuê nhiều nhân viên cùng lúc: Bỏ xung đột giữa các vị trí phụ quầy; khi tuyển nhiều nhân viên sẽ xuất hiện cơ chế drama viện lý do xin nghỉ, đến trễ, đi ăn cưới, hội rắn, đặt trà sữa quán khác, săn mây Đà Lạt, cúng sao Tarot...',
    '💬 Khách hàng tha thứ khi chủ quán xin lỗi / xin lũi: Đổi sang yêu cầu giảm giá / voucher bớt tiền thay vì bo tiền',
    '🎧 Nhân viên Gen Z: Chuẩn công thức 100% không bao giờ làm sai đơn, tiếp tục hạ tỉ lệ đá bill xuống mức tối thiểu (1.5%)',
    '📢 Nhân viên Me Két Tinh: Tự động trích két nộp thuế ngẫu nhiên tùy hứng (15% - 50%) khi nợ thuế quá hạn 12h, bảo vệ sổ tiết kiệm Tà Tưa Bank khỏi bị tịch thu',
    '⭐ Chu kỳ đánh giá quán 5.0★: Khi tiệm đạt đỉnh 5 sao sẽ tăng hạn mức Tà Tưa Bank (+10% đến 1 tỷ) và phục hồi về 4.0★ để tiếp tục cày sao',
    '🛵 Mở bán Online: Kích hoạt Soppi sẽ mở toàn bộ các ứng dụng giao hàng Soppi, Tóp Tóp, Biiiii, Gờ Ráp (mỗi tablet chạy 1 app)'
  ]},
  {v:'12.47.71',d:'29/09/2026',items:[
    '🛵 Khắc phục triệt để lỗi NV đi chợ không đi mua đồ: tự động quét mua khi cạn, bấm vào NV để sai bảo mua trực tiếp',
    '🌙 Sửa lỗi NV sinh viên ca đêm đôi khi ngừng hoạt động: tự động rót trà sau 0.8s, không huỷ đơn khi dùng hết nguyên liệu',
    '🎟️ Giảm giá trị gốc Vé Trà Sữa Lót xuống 1.000.000đ; xoá minigame Tìm Cặp Nhân Viên',
    '🎲 Mở lại Bầu Cua Tôm Cá & Xì Dách Quán Trà kèm sự kiện Đoàn kiểm tra Bộ Y Tế & ATTP',
    '⚖️ Điều chỉnh tỉ lệ thắng của người chơi luôn thấp hơn máy trong Bầu Cua & Xì Dách'
  ]},
  {v:'12.47.64',d:'29/09/2026',items:['🎟️ Thay thế trò chơi Hụi bằng Xổ Số Vé Trà Sữa Lót (Mega 6/45 Bao 5 số)','💰 Hũ Jackpot tích luỹ tăng dần mỗi khi có vé 100k bán ra, nổ hũ nhận toàn bộ','📢 Me két tinh tự động mời gọi khách mua vé khi order đồ uống (+100k vào két quán)','✨ Chỉ số ngầm: Tỉ lệ người chơi trúng +0.1% mỗi ly bán ra; khách hàng 10% trúng giảm dần']},
  {v:'12.47.62',d:'29/09/2026',items:['🧧 Cập nhật Trò chơi Bát Hụi 10 giờ thời gian thực cạnh nút Cài đặt','👥 Dây hụi 10 người (Bạn + 9 khách thị trấn), mở bàn từ 50k đến 10 triệu','💰 Cơ chế đấu thầu hốt hụi, phân biệt Hụi Sống và Hụi Chết, hốt hụi chót lời đậm','🏃 Tỉ lệ trốn đóng hụi (nhập 0đ bị bà con kéo đến đánh hội đồng)','🚨 Báo động đỏ khi chủ hụi giật hụi: QTE 5 giây giải toán nhanh từ 1-99 để bắt sống!']},
  {v:'12.47.58',d:'29/09/2026',items:[
    '⭐ Sửa triệt để lỗi không mở được mục Đánh giá (bổ sung pagerHTML phân trang đánh giá)',
    '✨ Bấm vào Cụm sao / Điểm đánh giá trên Header để mở nhanh đánh giá ở mọi chế độ',
    '💬 Chuỗi phản hồi 4 dòng chuẩn: Khách -> Me két tinh -> Khách rep -> Chủ tiệm tự rep cố định',
    '🔄 Cập nhật và đồng bộ phiên bản 12.47.53 chuẩn xác trên toàn bộ giao diện'
  ]},
  {v:'12.47.49',d:'29/09/2026',items:[
    '📢 Nhân viên Me két tinh (Marketing): Tăng 40% khách, pha chế thần tốc (+40% tốc độ), khách kiên nhẫn hơn (+15s)',
    '💬 Đánh giá 4 dòng: Đánh giá khách -> Me két tinh phản hồi -> Khách phản hồi -> Chủ tiệm tự phản hồi (không thể sửa)',
    '🚨 Báo công an 4 nghi phạm: Tăng lên 4 nghi phạm; Me két tinh hỗ trợ chỉ điểm người đưa tiền giả theo linh cảm ngẫu nhiên',
    '📱 Gen Z: Hiện lại thông báo làm việc trực quan tương tự Sinh viên ca đêm, không có nút bẫy bắt quả tang'
  ]},
  {v:'12.47.48',d:'29/09/2026',items:[
    '🎧 Tab Gen Z: Ẩn hoàn toàn trong ca làm việc, chỉ hiển thị đúng lúc cần: An ủi (khi dỗi) hoặc Bắt quả tang (khi đá bill)',
    '💖 Sửa triệt để lỗi Gen Z bỏ về khi an ủi: Loại bỏ cáo buộc nhầm khi dỗ dành, miễn nhiễm 60s sau dỗ, không bị bỏ việc khi hết ca'
  ]},
  {v:'12.47.47',d:'29/09/2026',items:[
    '🚶 Khách hàng trước tiệm: Đưa vị trí nhân vật đi bộ lên cao trên thanh công cụ dưới, không bị che khuất chân người đi bộ',
    '🐱 Thần Mèo Karin: Sửa lỗi chữ "BẢO VỆ KARIN" bị lộn ngược khi mèo đổi hướng tuần tra (chỉ lật hình ảnh mèo, giữ nguyên biển tên)',
    '🏮 Bảng hiệu tên quán: Đưa lên cao hơn dưới mái hiên tiệm, không che ly nước trên quầy',
    '✨ Khách hàng di chuyển vào giữa dưới: Khi ấn vào khách, khách tự động lướt vào giữa dưới trò chuyện nổi bật 3.5s rồi tiếp tục đi bộ'
  ]},
  {v:'12.47.46',d:'29/09/2026',items:[
    '🐱 Thần Mèo Karin: Đưa lên cao hơn hẳn người đi bộ bên dưới (đứng trên quầy gỗ), liên tục tuần tra di chuyển qua lại cực sinh động',
    '🏮 Nút Xuống Phố: Hiển thị chữ "Xuống Phố" nổi bật cạnh icon ra trước tiệm trên thanh tiêu đề và trong quầy pha',
    '🐱 Thần Mèo Karin & Dragon Ball: Phóng to Thần Mèo (185px) và dàn nhân vật Dragon Ball (108px)',
    '⏳ Hồi chiêu Thần Mèo: Mỗi 5 phút nhận buff một lần (+20s chờ), cơ hội nhận lì xì tiền vía may mắn vào két quán',
    '🎎 Bỏ toàn bộ avatar chibi, độc quyền dùng dàn nhân vật Dragon Ball từ img/imnv',
    '🏮 Biển hiệu tên quán: Hiển thị bảng hiệu giữa cửa tiệm chuẩn xác với tên quán đã đặt bên trong',
    '🚫 Tắt hoàn toàn tính năng Bầu Cua & Xì Dách khỏi game',
    '🔇 Tắt toàn bộ thông báo của khách hàng che đơn order trong ca bán',
    '💖 Sửa triệt để lỗi Gen Z dỗi không thể dỗ dành: Thêm 30s miễn nhiễm sau khi dỗ, hỗ trợ chạm đa điểm cả widget và nút Dỗ dành'
  ]},
  {v:'12.47.45',d:'29/09/2026',items:[
    '🏮 Nút Xuống Phố: Hiển thị chữ "Xuống Phố" nổi bật cạnh icon ra trước tiệm trên thanh tiêu đề và trong quầy pha',
    '🐱 Thần Mèo Karin & Dragon Ball: Phóng to Thần Mèo (185px) và dàn nhân vật Dragon Ball (108px), dời Thần Mèo đứng giữa màn hình',
    '⏳ Hồi chiêu Thần Mèo: Mỗi 5 phút nhận buff một lần (+20s chờ), cơ hội nhận lì xì tiền vía may mắn vào két quán',
    '🎎 Bỏ toàn bộ avatar chibi, độc quyền dùng dàn nhân vật Dragon Ball từ img/imnv',
    '🏮 Biển hiệu tên quán: Hiển thị bảng hiệu giữa cửa tiệm chuẩn xác với tên quán đã đặt bên trong',
    '🚫 Tắt hoàn toàn tính năng Bầu Cua & Xì Dách khỏi game',
    '🔇 Tắt toàn bộ thông báo của khách hàng che đơn order trong ca bán',
    '💖 Sửa triệt để lỗi Gen Z dỗi không thể dỗ dành: Thêm 30s miễn nhiễm sau khi dỗ, hỗ trợ chạm đa điểm cả widget và nút Dỗ dành'
  ]},
  {v:'12.47.44',d:'29/09/2026',items:[
    '🏮 Nút Xuống Phố: Bổ sung chữ "Xuống Phố" cạnh biểu tượng ra trước tiệm trên thanh tiêu đề và trong quầy pha',
    '🐱 Thần Mèo Karin & Dragon Ball: Phóng to Thần Mèo và dàn nhân vật Dragon Ball img/imnv, dời Thần Mèo vào giữa màn hình',
    '⏳ Hồi chiêu Thần Mèo: Mỗi 5 phút nhận buff một lần; đôi khi Thần Mèo còn lì xì tiền vía may mắn vào két quán',
    '🎎 Bỏ toàn bộ avatar chibi, chỉ giữ lại các nhân vật Dragon Ball từ img/imnv đi bộ trước quán',
    '🏮 Biển hiệu tên quán: Thêm biển hiệu tên quán ở cửa giữa màn hình trước tiệm, đồng bộ chuẩn xác với tên quán đã đặt',
    '🚫 Tắt hoàn toàn tính năng Bầu Cua & Xì Dách khỏi game',
    '🔇 Tắt các thông báo che đơn hàng (order) trong ca bán',
    '💖 Sửa triệt để lỗi Gen Z dỗi không thể dỗ dành: Cập nhật DOM mượt mà, chỉ 3 chạm là chữa lành thành công'
  ]},
  {v:'12.47.43',d:'29/09/2026',items:[
    '🖼️ Đổi phông nền "Trước tiệm" thành ảnh imbg.png sắc nét chuẩn phố trà sữa',
    '⭐ Nút mở Trước tiệm chuyển sang biểu tượng ic_upmega.png nằm ngay dưới phần Đánh giá góc phải trên (dễ bấm, không chật chội cạnh Cài đặt)',
    '🐉 Bổ sung dàn nhân vật Dragon Ball từ img/imnv đi bộ trước quán (Goku, Vegeta, Vegito, Beerus, Whis, Mabuu, Hit, Jiren, Cell...) kèm câu thoại cực chất',
    '🐾 Cải tiến chữ thưởng Thần Mèo Karin: Chữ +20s kiên nhẫn bay lên cao phía trên đầu mèo, không che mặt mèo và tuyệt đối không bị ngắt dòng'
  ]},
  {v:'12.47.42',d:'29/09/2026',items:[
    '🤬 Giảm mạnh đánh giá khi chủ quán phản hồi thô tục/gay gắt: Khách cho 5★ nhưng chủ quán rep thô tục (isVulgar) hoặc gay gắt, thách thức (isRude) thì khách lập tức hạ xuống 1★ với phản hồi phẫn nộ',
    '🏪 Thêm giao diện "Trước tiệm" (phông nền splash2.jpg): Chuyển đổi linh hoạt từ thanh tiêu đề hoặc ngay trong quầy pha chế ca bán',
    '🐾 Thần Mèo Karin làm Bảo vệ quán: Chạm vào bảo vệ Karin để tăng +20s kiên nhẫn cho toàn bộ khách, tăng tỉ lệ giữ chân khách và vẫy gọi khách mới',
    '🚶 Khách đi bộ trước cửa tiệm: Các avatar chibi tấp nập qua lại trên vỉa hè trước quán; ấn vào người đi bộ để chào mời họ vào quầy order nước!'
  ]},
  {v:'12.47.41',d:'29/09/2026',items:[
    '🎁 Huỷ chép link; Rút ngắn mã quà tặng lì xì (kết hợp ký tự + mã nhân vật gọn nhẹ)',
    '🧋 Khách quen Bạn bè order 3 món best seller + 1 món ruột (ngẫu nhiên 1/4)',
    '☕ Sinh viên cuối tháng phụ trách bỏ đường & đá, bạn dán nắp',
    '🚫 Toàn bộ khách nhận ly sai order bị quỵt tiền 0đ & đánh giá 1★; nếu phản hồi tặng ly khác khách sẽ ghé lấy',
    '🛑 Phản hồi gay gắt với đánh giá 1★ sẽ bị hạ thẳng xuống 0★'
  ]},
  {v:'12.47.40',d:'29/09/2026',items:[
    '🧑‍🎓 Thêm nhân viên "Sinh viên cuối tháng": Chỉ làm việc ca đêm (sau 22h), không hoạt động cùng lúc với Gen Z (Gen Z hết ca lúc 22h ra về thì sinh viên vào nhận ca), mở quán bán xuyên đêm đến sáng hôm sau',
    '🧋 Phân chia pha chế ca đêm: Sinh viên tự động lấy ly, pha trà, bỏ topping, dán ly; bạn chỉ cần bấm thêm đường và đá',
    '🥱 Cơ chế buồn ngủ nhầm size: Đôi khi buồn ngủ lấy nhầm size đưa khách (khách vẫn nhận); gọi size M đưa size L khách khen 5★, gọi size L đưa size M khách chấm 3★',
    '💸 Ý đồ bán đồ quán sau 2h sáng: Sau 2h sáng sinh viên túng tiền có ý đồ lén đem bán từ 1 đến max trang bị của quán; cần bấm nút khuyên ngăn kịp thời (bán N món bấm N lần)',
    '🤫 Cân bằng tâm lý Gen Z: Tỉ lệ lén "đá bill" khi bất mãn giảm xuống tối đa chỉ 20% (chỉ số ẩn); sau khi đá bill thành công tỉ lệ tự động giảm về lại như ban đầu'
  ]},
  {v:'12.47.39',d:'29/09/2026',items:[
    '🔄 Bổ sung nút "Cập nhật bản mới" ngay dưới Vào chơi ngay trên màn hình khởi động (xoá cache & reload trang ngay lập tức)',
    '🔕 Tắt hoàn toàn bảng thông báo V1.1 khi vào game',
    '🎨 Đổi màu bàn Xì Dách đồng bộ phong cách quán trà kem ấm áp & bàn Bầu Cua',
    '👑 Rút gọn mã bạn bè thành 5-8 ký tự (chữ đầu tên quán + món ruột + mã số)'
  ]},
  {v:'12.47.38',d:'29/09/2026',items:[
    '📈 Sửa triệt để lỗi lợi nhuận đơn online bị âm tiền: Tự động chuẩn hoá & phục hồi lợi nhuận kinh doanh tích luỹ từ doanh thu thực tế, loại trừ việc trừ nhầm vốn đầu tư mua sắm tài sản cố định',
    '❌ Thêm nút đóng ✕ (Thoát game) rõ nét cho Bầu Cua & Xì Dách: Nút thoát game nổi bật, hỗ trợ bấm phím Escape hoặc bấm ngoài nền để đóng bàn chơi; căn chỉnh khung hình vừa vặn tuyệt đối trên mọi thiết bị di động & máy tính',
    '⏳ Rút ngắn chu kỳ đóng thuế trực tuyến xuống 6h: Tối ưu nhịp độ trực tuyến, nhận Buff tăng khách & bảo vệ an ninh mỗi 6 giờ'
  ]},
  {v:'12.47.37',d:'29/09/2026',items:[
    '🏛️ Đóng thuế trực tuyến 6h theo thời gian thực: Đặt cạnh đề mục Kho; Tùy chọn đóng 15%–50% tiền két để nhận Buff tương ứng (tăng khách, tăng tốc độ, giảm trộm cắp/tiền giả/bùng tiền); Nếu quá 6h không đóng thuế sẽ chịu phạt nợ thuế (tăng trộm cắp, tiền giả, lừa đảo, khách hàng khó chịu, nhân viên bất mãn)',
    '😈 Gen Z tăng tỉ lệ đá bill sau khi bị xử phạt: Sau khi bị bắt quả tang và phạt tịch thu tiền bo, Gen Z ấm ức nên tỉ lệ đá bill các đơn sau tăng mạnh'
  ]},
  {v:'12.47.36',d:'29/09/2026',items:[
    '🥰 Bỏ cơ chế trừ sao khi làm sai món: Khi khách nhận ly nước mới tinh sau khi pha lại (đặc biệt từ NV Gen Z), khách không trừ sao mà đánh giá an ủi 4-5★ ("Tội nghiệp vì làm quá nhiều...")'
  ]},
  {v:'12.47.35',d:'29/09/2026',items:[
    '🛵 Nhân viên đi chợ: Tự động chạy đi chợ mua bổ sung nguyên liệu (trà sữa, topping, ly, đá, nước đường...) ngay trong ca bán khi hết hàng để đáp ứng kịp thời nhu cầu của khách',
    '💸 Cơ chế khai gian hóa đơn: Nếu phải đi chợ nhiều lần trong ngày (từ lần thứ 3 trở lên), nhân viên có nguy cơ khai gian giá để đút túi riêng (ghi nhận vào chi phí sự cố & tính lỗi KPI)',
    '📋 Xét KPI & Điều kiện thuê: Xét duyệt KPI 7 ngày như mọi nhân viên khác (nhận thưởng % bill, tốc độ đi chợ nhanh hơn); Điều kiện mở: Mở full topping, giá mở 500k, giá thuê 100k/ngày'
  ]},
  {v:'12.47.34',d:'29/09/2026',items:[
    '🙇 Bổ sung thông báo nhận lỗi khi bị bắt quả tang đá bill: Gen Z cúi đầu nhận lỗi chân thành, hoàn trả 100% tiền bill và nộp phạt toàn bộ tiền tip cả ngày vào két quán',
    '🎯 Sửa lỗi bấm bắt quả tang vẫn bị mất bill: Loại bỏ việc xoá trạng thái sớm khi làm ly mới; người chơi bắt quả tang chuẩn xác, đòi lại tiền ngay lập tức',
    '🖼️ Avatar nhân viên ngẫu nhiên từ img/nv: Toàn bộ nhân viên được cấp avatar hình ảnh thực tế ngẫu nhiên (b00-b14) hiển thị đồng bộ trong Nâng cấp, Kho, Xét duyệt KPI và widget làm việc'
  ]},
  {v:'12.47.33',d:'29/09/2026',items:[
    '⚡ Đố kị nội bộ & Nghỉ việc đồng loạt (Tính năng ẩn): Nếu chỉ 1 nhân viên được xét Xuất sắc thưởng đậm trong khi tất cả nhân viên khác đều bị đánh giá Không đạt 0đ, các nhân viên còn lại sẽ phẫn nộ nộp đơn nghỉ việc đồng loạt!',
    '💵 Giá trị KPI mới: Xuất sắc (100k thưởng + 10% giá trị bill mỗi ngày + buff khách & tốc độ); Đạt chuẩn (50k thưởng + 5% giá trị bill mỗi ngày); Không đạt (0đ thưởng)',
    '🏷️ Nhân viên có tên riêng cho mỗi lần thuê: Mỗi nhân viên khi tuyển mới đều có họ tên người Việt riêng biệt; khi nghỉ việc tên cũ được giải phóng và tuyển người mới'
  ]},
  {v:'12.47.32',d:'29/09/2026',items:[
    '👥 Bổ sung đề mục Nhân viên trong Kho: Theo dõi toàn bộ danh sách nhân sự đã thuê, trạng thái làm việc (🟢 Đang đi làm / ⏸️ Tạm nghỉ ca), số ly phục vụ, lỗi sai và buff thưởng',
    '📊 Chu kỳ xét KPI 7 ngày bán nước: Mỗi 7 lần hoàn thành doanh thu ca bán, hội đồng KPI tự động xét duyệt đánh giá & thưởng năng lực cho toàn bộ nhân sự',
    '✨ Thưởng KPI tăng % gọi khách & % tốc độ pha: Đánh giá đúng và thưởng thêm giúp tăng năng suất vượt bậc (Xuất sắc +5% khách/+8% tốc độ, Đạt chuẩn +3% khách/+4% tốc độ)',
    '💔 Cơ chế nghỉ việc khi bị đánh giá bất công: Nhân viên làm tốt (hạng A, B) nhưng bị chê trách 0đ thưởng sẽ có tỉ lệ cao tức giận nghỉ việc ngay, mất sạch % buff tích luỹ và phải thuê lại'
  ]},
  {v:'12.47.25',d:'29/09/2026',items:[
    '📦 Đổi đề mục Ly thành Dụng cụ trong mục Kho; thêm Đá viên bên dưới Ly + ống hút (hạn dùng 1 ngày, giá 1k)',
    '🧊 Quầy pha chế thêm số lượng tồn kho ở góc trên bên phải khay Đá viên; phải mua đá mới sử dụng được'
  ]},
  {v:'12.47.24',d:'29/09/2026',items:[
    '👇 Đem thanh giám sát Gen Z, banner bắt quả tang & nút Báo công an xuống phía dưới màn hình, không còn che quầy khách hàng',
    '⬆️ Đưa thông báo bạn thân ghé quán & lời thoại chat Gen Z lên phía trên màn hình hiển thị nổi bật, dễ đọc',
    '🚨 Bắt quả tang Gen Z chỉ trong 1 lượt pha chế: Chuyển sang khách khác hoặc lượt pha mới sẽ không bắt quả tang được lượt trước nữa',
    '👑 Điều chỉnh khách bạn bè ghé quán: Tỉ lệ 10% để tránh tranh giành khách, và mỗi ngày mỗi người bạn chỉ ghé tối đa 1 lần',
    '🖼️ Sửa lỗi hiển thị avatar bạn bè trong Xì Dách: Hiển thị đúng hình ảnh Chibi tròn độc quyền thay vì mã text'
  ]},
  {v:'12.47.20',d:'28/09/2026',items:[
    '🎨 Thẻ Trà Thủ & Khách VIP Chibi: Tự do chọn 50 Avatar Chibi từ bộ nhận diện thương hiệu độc quyền; Khách VIP và VIP Bạn Bè hiển thị Avatar Chibi sắc nét',
    '🧋 Rương Nguyên Liệu Tiếp Tế Ngẫu Nhiên: Tạo mã rương nguyên liệu ngẫu nhiên đa dạng (ly, siro, topping, trà); Giới hạn 2 lần/24h đếm ngược thời gian online game',
    '🔗 Tích hợp Ghé Quán & Kết Bạn trong 1 Link/Mã: Mở link hoặc nhập mã là tự động kết bạn và ghé thăm quán chiêm ngưỡng ngay; Giới hạn tối đa 5 người bạn quen',
    '✅ Khắc phục triệt để lỗi làm đúng bill cho Khách VIP & Bạn Bè: Chuẩn hoá so khớp mức đường (30%, 50%, 70%, 100%), tuỳ chọn đá, phô mai và topping'
  ]},
  {v:'12.47.19',d:'28/09/2026',items:[
    '🧋 Khắc phục tên gọi trân châu: Đổi "Trân châu popping" thành "Trân châu nổ (TC nổ)" tránh nhầm lẫn với danh mục Topping',
    '✨ Nâng cấp cơ chế gọi món Topping đa tầng: Khách có thể gọi độc lập 0–5 loại trân châu, 0–4 loại thạch, 0–3 loại phô mai và 0–1 loại foam',
    '👑 Thêm đơn Full Topping: Khách hàng có thể gọi Full Topping (tối đa cả 12 loại topping một lúc), quầy pha hiển thị xếp tầng đẹp mắt và dung tích tự mở rộng không giới hạn'
  ]},
  {v:'12.47.16',d:'28/09/2026',items:[
    '⚡ Rút gọn mã Bạn Bè, Quà Tặng, Ghé Quán, Thách Đấu: Giảm hơn 80% độ dài mã (dạng TTN-F-, TTN-G-, TTN-S-, TTN-C-), dễ chép và chia sẻ',
    '🔄 Tương thích ngược 100%: Hệ thống tự nhận diện và giải mã cả mã rút gọn mới lẫn các mã dài trước đó'
  ]},
  {v:'12.47.15',d:'28/09/2026',items:[
    '👥 Hệ thống Bạn Bè toàn diện: Thẻ Trà Thủ cá nhân hóa (biệt danh, chibi avatar, món trà ruột, câu cửa miệng)',
    '👑 Khách Quen VIP Bạn Bè: Bạn bè ghé quán làm VIP với vòng hào quang rực rỡ, tiền tip gấp đôi (x2), luôn để lại đánh giá 5★ và nói đúng câu khẩu hiệu!',
    '🎁 Gói Quà Trà Hữu: Đóng gói tiếp tế tiền vốn (lì xì 100k, 200k, 500k) và rương nguyên liệu (50 ly, siro đào, trân châu hoàng kim). Giới hạn 2 quà/ngày',
    '🏠 Ghé Thăm Quán & Check-in 5★: Khoe tem thương hiệu, biển hiệu và Top 3 Best Seller. Check-in tặng 5★ và kích hoạt Buff +15% khách ghé ca bán tiếp theo',
    '⚔️ Thách Đấu Doanh Thu Ca Bán: Thử thách bạn bè vượt qua kỷ lục doanh thu ca bán để cùng nhận cúp "Bàn tay pha chế vàng" và 1.000.000đ tiền két'
  ]},
  {v:'12.47.14',d:'28/09/2026',items:[
    '⭐ Nâng cấp Cấp độ Level bằng tiền (cấp số nhân 10k, 30k, 90k, 270k... Nx3): Nâng cấp riêng cho 6 hạng mục Trà (+0.5% khách), Hương (+0.5% thời gian chờ), Topping (giảm 0.5% đánh giá xấu), Trang bị (giảm 0.1% trừ tiền trộm/lừa đảo), Nhân viên (0.1% x2 lợi nhuận), Online (+0.1% đơn online)',
    '🎵 Mở rộng Online Tóp Tóp: App giao hàng mới từ Ngày 90, yêu cầu lợi nhuận 50tr, điểm đánh giá từ 4.5★ trở lên, phí gia nhập 10tr. Dưới 4.5★ Tóp Tóp tạm ngưng nhận đơn',
    '🛵 Nhân viên online tự động xử lý cả đơn Soppi và Tóp Tóp'
  ]},
  {v:'12.47.13',d:'28/09/2026',items:[
    '💬 Nâng cấp toàn diện phản hồi đánh giá: Bổ sung 6 nhóm tính cách khách hàng (Gen Z bắt trend, Dân văn phòng công sở, Cô chú lớn tuổi, Trà thủ sành vị, Khách kỹ tính, Khách idol quốc tế)',
    '✨ Kho 100+ câu thoại phản hồi đa sắc thái: Khách tự động phản hồi lại cực mặn mòi, dí dỏm hoặc sắc bén theo thái độ trả lời của chủ quán',
    '⭐ Cơ chế cộng/trừ sao sinh động: Chủ quán xin lỗi có tâm / tặng voucher giúp khách nguôi giận tăng 1-2★; trả lời cộc lốc/thô lỗ sẽ bị khách trừ 2-3★ và đe dọa bóc phốt'
  ]},
  {v:'12.47.12',d:'28/09/2026',items:[
    '🛠️ Sửa triệt để lỗi "Site not found" khi Cập nhật bản mới: Cơ chế tải lại sạch không kèm chuỗi truy vấn URL làm lỗi hệ thống máy chủ',
    '❌ Huỷ bỏ hoàn toàn tính năng và cơ chế thu thuế 15%: Loại bỏ chu kỳ thu thuế định kỳ, cảnh báo ân hạn, hộp thoại nộp thuế và tab Đóng thuế trong Nâng cấp',
    '📋 Khôi phục giao diện Nâng cấp chuẩn 6 tab: Trà, Hương, Topping, Trang bị, Nhân viên, Online'
  ]},
  {v:'12.47.11',d:'28/09/2026',items:[
    '🧋 Xì Dách Trân Châu mốc cược chuẩn: Thêm thanh mốc cược 10k, 50k, 100k, 500k, 1tr, Hết két giống Bầu Cua, nhà con có thể cược nhiều hơn theo mốc',
    '👥 Bàn Xì Dách 1-6 người: Mở rộng tối đa 6 khách ngồi chơi, mỗi ván có ngẫu nhiên 1 đến 6 người tham gia',
    '👮‍♂️ Đoàn kiểm tra ATTP & Đố toán né bắt: Tỉ lệ 28% ở cả Bầu Cua và Xì Dách; đố toán 2 chữ số 1-99 với 3 đáp án trắc nghiệm trong 5 giây để dọn quầy cất thẻ/bát',
    '💸 Phạt 7 triệu + toàn bộ tiền cược trên bàn: Bị bắt khi làm sai toán hoặc hết 5 giây, khấu trừ tiền két và giảm số sao uy tín của quán'
  ]},
  {v:'12.47.10',d:'28/09/2026',items:[
    '🚨 Nguy cơ khi két trên 500 triệu: Tăng mạnh nguy cơ trộm cạy két đêm, lừa đảo công nghệ cao, thanh tra thuế và khách đưa tiền giả/bùng tiền để hạn chế tích trữ tiền tồn',
    '🏛️ Đóng thuế định kỳ: Bỏ mục Gen Z riêng ở nâng cấp (gộp chung vào tab Nhân viên), thay bằng mục Đóng thuế 15% số tiền hiện có mỗi 3 ngày (quên hạn 1 ngày sẽ bị tịch thu tài sản)',
    '⚖️ Kiểm soát doanh thu phi pháp: Kiểm tra tiền bầu cua & xì dách so với doanh thu bán nước; nếu tiền cờ bạc > tiền bán nước sẽ bị cơ quan thuế tịch thu toàn bộ tài sản'
  ]},
  {v:'12.47.9',d:'28/09/2026',items:[
    '🎧 Gợi ý đặt hàng Gen Z: Tắt hoàn toàn khi cho Gen Z nghỉ việc, chỉ mở khi đang thuê',
    '🚨 Nguy cơ khi két trên 500 triệu: Tăng mạnh nguy cơ trộm cạy két đêm, lừa đảo công nghệ cao và khách đưa tiền giả/bùng tiền',
    '⭐ Chuẩn hóa Best Seller menu: Chỉ vinh danh các sản phẩm món nước/trà chính, loại bỏ trân châu topping phụ kèm',
    '🔄 Hệ thống tự động đồng bộ phiên bản mới chống lưu cache trình duyệt'
  ]},
  {v:'12.47.8',d:'28/09/2026',items:[
    '⭐ Chuẩn hóa Best Seller menu: Chỉ vinh danh các sản phẩm món nước/trà chính, loại bỏ trân châu topping phụ kèm',
    '🎲 Cân bằng minigame Bầu Cua & Xì Dách: Tinh chỉnh giảm ngầm tỉ lệ thắng giúp giữ két tiệm bền vững hơn',
    '🚨 Cân bằng Báo Công An: Thưởng 1tr & Tăng điểm sao quán khi tố cáo đúng, phạt 7tr & trừ sao khi tố cáo sai',
    '💬 Khách hàng phản hồi lại chủ quán: Khách tự động rep theo tính cách và số sao',
    '🔄 Hệ thống tự động đồng bộ phiên bản mới chống lưu cache trình duyệt'
  ]},
  {v:'12.47.7',d:'28/09/2026',items:[
    '🎲 Cân bằng minigame Bầu Cua & Xì Dách: Tinh chỉnh giảm ngầm tỉ lệ thắng giúp giữ két tiệm bền vững hơn',
    '🚨 Cân bằng Báo Công An: Thưởng 1tr & Tăng điểm sao quán khi tố cáo đúng, phạt 7tr & trừ sao khi tố cáo sai',
    '💬 Khách hàng phản hồi lại chủ quán: Khách tự động rep theo tính cách và số sao',
    '📦 Thanh lý nguyên liệu tồn kho thu hồi 30% giá gốc',
    '🔄 Hệ thống tự động đồng bộ phiên bản mới chống lưu cache trình duyệt'
  ]},
  {v:'12.47.6',d:'28/09/2026',items:[
    '🚨 Cân bằng Báo Công An: Thưởng 1tr (thay vì 10tr) & Tăng điểm sao của quán khi tố cáo đúng',
    '⚖️ Xử lý thiếu minh bạch: Phạt 7tr & Giảm điểm sao uy tín của quán khi khởi tố/tố cáo sai người vô tội',
    '💬 Khách hàng phản hồi lại chủ quán: Khách tự động rep lại phản hồi cực mặn mòi theo tính cách và số sao',
    '📦 Thanh lý nguyên liệu tồn kho thu hồi 30% giá gốc',
    '🔄 Hệ thống tự động đồng bộ phiên bản mới chống lưu cache trình duyệt'
  ]},
  {v:'12.47.5',d:'28/09/2026',items:[
    '💬 Khách hàng phản hồi lại chủ quán: Khách tự động rep lại phản hồi cực mặn mòi, chuẩn theo tính cách, số sao và thái độ của chủ quán (cà khịa khi bị thách thức, tăng sao khi được xin lỗi/tặng quà).',
    '🚨 Tính năng Báo Công An: Tố cáo khách dùng tiền giả (nhận thưởng +10tr hoặc phạt -7tr nếu vu khống)',
    '📦 Thanh lý nguyên liệu tồn kho thu hồi 30% giá gốc',
    '✨ Giao diện menu Best Seller trong suốt hòa hợp với bảng phấn xanh',
    '🔄 Hệ thống tự động đồng bộ phiên bản mới chống lưu cache trình duyệt'
  ]},
  {v:'12.47.4',d:'28/09/2026',items:[
    '🚨 Tính năng Báo Công An: Tố cáo khách dùng tiền giả (nhận thưởng +10tr hoặc phạt -7tr nếu vu khống)',
    '📦 Thanh lý nguyên liệu tồn kho thu hồi 30% giá gốc',
    '✨ Giao diện menu Best Seller trong suốt hòa hợp với bảng phấn xanh',
    '🔄 Hệ thống tự động đồng bộ phiên bản mới chống lưu cache trình duyệt'
  ]},
  {v:'1.2',d:'28/09/2026',items:[
    '📢 BẢN CẬP NHẬT SIÊU TO KHỔNG LỒ V1.2 - TIỆM TRÀ MƠ ƯỚC (VÀO CÀI ĐẶT ĐỂ CẬP NHẬT)',
    '🎧 Nhân viên Gen Z: Tăng 50% khách ghé quán & tự động gợi ý đặt hàng hôm sau theo doanh thu. Tự động pha chế A-Z trực quan trên quầy. Khi áp lực sẽ đình công đi chữa lành (chạm 5 lần để dỗ dành). Đôi khi "đá bill" nếu chủ không giám sát (trong vòng 1 lượt pha chế, không bắt quả tang kịp là mất luôn). Thỉnh thoảng làm sai món phải đổ pha lại.',
    '💬 Khách hàng phản hồi lại chủ quán: Khách hàng tự động phản hồi lại cực mặn mòi, dí dỏm khi chủ quán trả lời đánh giá (cà khịa khi bị thách thức, tăng sao khi được xin lỗi/tặng quà).',
    '🌦️ Thời tiết đa dạng & Tính cách khách hàng: Thêm thời tiết Nắng đẹp, se lạnh, bão lớn, sương mù, nồm ẩm; khách gọi nhiều topping; khách trả giá sau khi nhận nước; tắt nhập hàng trong giờ bán.',
  ]},
  {v:'1.0',d:'27/09/2026',items:['Bản độc lập chuẩn gốc Tiệm Trà Nhỏ V1.0','Tích hợp minigame Bầu Cua Trân Châu thử tài giải trí sau ca bán']},
  {v:'3.11',d:'24/09/2026',items:['Hương mua theo chai ở Nâng cấp > Hương: 200k một chai dùng cho 45 ly, hạn 7 ngày kể từ ngày mua. Mua bao nhiêu chai thì 45 ly nhân lên. Hết chai phải mua chai mới, chai quá hạn bị đổ bỏ. Kho không còn nấu hương theo phần','Đơn online Soppi: cần mua tablet (7 triệu, ở Trang bị) thì đơn mới đổ về. Quán đã mở online được tặng sẵn 1 tablet','Đơn online nhận thêm tối đa bằng số chỗ ở quầy: 3 khách, mở rộng quầy thì 4 (tổng 6 hoặc 8 khách). Đơn online khoảng 20% tổng khách. Tài xế chờ tối đa 1 phút 30 giây, có tài xế nam và nữ','Mỗi 30 ngày có 1 đơn lớn Soppi 5–10 ly vào ngày ngẫu nhiên','Nhân viên đơn online (thuê 2 triệu, lương 250k/ngày): chỉ làm đơn online, mỗi ly khoảng 1 giây','Vay ngân hàng tối đa 1 triệu, lãi 25%/năm','Máy dán nắp tự động dán nhanh hơn','Hướng dẫn thêm trang Đường và đá (Cài đặt > Hướng dẫn)','Khách ngôi sao: cứ 30 ngày có 1 idol Kpop hoặc diễn viên Thái, Trung ghé quán vào ngày ngẫu nhiên. Nói tiếng nước mình kèm [Tự động dịch], trả gấp 3 tiền và luôn để 5 sao','Mã sao lưu còn 8 số, mỗi quán một mã riêng không trùng ai. Sao lưu lại vẫn giữ nguyên mã. Khôi phục bằng 8 số cần có mạng, mã dài cũ vẫn dùng được','Tem thương hiệu hiện đủ tên quán. Chọn được kiểu chữ thẳng hàng, cong phía trên hoặc cong phía dưới']},
  {v:'3.10',d:'24/09/2026',items:['Thêm Nhân viên phụ quầy 2 (thuê 750k, lương 150k/ngày): làm như nhân viên phụ quầy, thêm múc topping. Không thuê cùng lúc với nhân viên phụ quầy, thuê người này thì người kia tự nghỉ (gọi đi làm lại không tốn tiền)','Sửa lỗi trên iPhone: sau khi bật bàn phím (trả lời đánh giá, đặt tên quán…) rồi tắt, quầy pha bị thu nhỏ còn nửa màn hình và nút Mở cửa nhảy lên giữa màn hình. Game giờ tự nhận ra và trả về đủ màn hình','Sửa lỗi đánh giá đầy 2.500 thì như đứng yên: bộ nhớ lưu game bị đầy nên đánh giá và tiến trình mới có thể không được lưu. Bản lưu nay gọn hơn và tự dọn bản dự phòng cũ khi thiếu chỗ','Số đánh giá trên đầu màn hình giờ là tổng số đánh giá từ trước tới nay, vẫn tăng khi đã quá 2.500 (tab Đánh giá vẫn giữ 2.500 đánh giá mới nhất)']},
  {v:'3.9',d:'23/09/2026',items:['Nhân viên phụ quầy: bạn lấy ly, bỏ topping và dán nắp (có máy dán nắp tự động thì máy tự dán). Nhân viên rót trà, cho hương, đường và đá. Bỏ topping được ngay trong lúc nhân viên đang pha']},
  {v:'3.8',d:'23/09/2026',items:['Nhân viên pha chế làm nhanh như nhân viên phụ quầy, mỗi ly khoảng 3 giây. Đơn nhân viên đang làm không còn chặn khách mới, bạn luôn có khách để làm','Thông báo lúc bán hiện lâu hơn. Nhân viên làm sai thì báo rõ sai gì (chữ nền đỏ, hiện 5 giây)','Quầy pha chừa khoảng trống ở mép dưới, đỡ bị vuốt nhầm sang app khác trên iPhone','Game tự lưu 3 cuối ngày gần nhất, lấy lại trong Cài đặt > Khôi phục bản tự lưu','Máy chặn lưu tiến trình (ví dụ iPhone bật Chặn tất cả cookie) thì game báo ngay, kèm cách sửa','Mở game trên máy mới: màn hình chào có nút khôi phục bằng mã sao lưu. Cứ 7 ngày game nhắc tạo mã sao lưu một lần']},
  {v:'3.7',d:'23/09/2026',items:['Tới 22:00 quán đóng cửa: không nhận khách mới, nhân viên phụ quầy nghỉ, bạn làm nốt cho khách đang trong quán rồi mới tổng kết. Đơn online ngưng nhận từ 21:30, đơn đang có vẫn phải làm nốt','Nhân viên pha chế nhận trọn đơn của một khách (có ký hiệu trên mặt khách) và làm hết các ly, bạn không cần đụng vào khách đó. Không còn bị trùng ly phải đổ bỏ. Ly nào hết món thì khách nhận các ly còn lại rồi về','Lương nhân viên pha chế 200k/ngày. Làm quá 22:00 thì trả tăng ca 40k/giờ, tính tròn mỗi 30 phút là 20k','Bỏ món khỏi menu trong Nâng cấp: khách không gọi món đó nữa, thêm lại lúc nào cũng được, không mất tiền. Hàng trong kho vẫn giữ, hết hạn thì tự đổ bỏ','Hạn dùng mới: hương ổi, mãng cầu, chanh 1 ngày, các hương khác 7 ngày; foam 2 ngày; phô mai tươi 3 ngày','Hương và topping: để giá trên 20k thì 80% khách không gọi món đó, trên 30k thì không khách nào gọi (xem cảnh báo trong Giá bán)','Lọc đánh giá theo số sao, hoặc chỉ xem đánh giá chưa trả lời','Chọn thời gian bán mỗi ngày 4, 5 hoặc 6 phút trong Cài đặt','Khách tăng đều theo số sao, không còn tăng vọt khi quán lên 4 sao. 10 ngày đầu khách tăng từ từ cho quen tay','Vừa chơi vừa nghe nhạc YouTube, Spotify được','Bộ nhận diện thương hiệu: hình logo sắc nét, không bị cắt, nằm giữa; ô chọn hình chỉ cuộn dọc; tem không còn bị méo, logo hiện rõ trên ly','Giao diện Đêm dịu sáng hơn, dễ nhìn quầy pha','Sửa lỗi tên quán ở trên cùng bị mờ trên iPhone','Bản cài vào máy: sửa lỗi mất hình khách và ly']},
  {v:'3.6',d:'22/09/2026',items:['Sửa lỗi còn dư một vệt kệ nhỏ phía dưới khay đá viên, nước đường khi chưa mở hết foam/phô mai','Đơn từ 3 ly trở lên: chỉ chặn khách mới ghé khi đơn đó còn từ 3 ly chưa giao (trước đây tính cả những ly đã giao xong)','Khách đặt nhiều ly mà quán hết món giữa chừng: nếu đã được giao một số ly trước đó thì đánh giá nhẹ nhàng hơn, có nhắc tới việc đã uống được vài ly','Bộ nhận diện thương hiệu (Nâng cấp > Trang bị, 5 triệu): tự thiết kế tem in lên mọi ly — chọn màu nền, kiểu khung (tròn, bo góc, ruy băng), 1 trong 50 hình dễ thương và khẩu hiệu; tên quán tự hiện lên tem']},
  {v:'3.5',d:'22/09/2026',items:['Sao lưu tiến trình bằng mã (Cài đặt > Sao lưu tiến trình), bị mất thì khôi phục lại từ mã hoặc file','Từ ngày 30, một khách mua được tối đa 5 ly, mỗi ly tới 4 topping','Ly trên 120k (trước là 100k) thì 60% khách bỏ đi','Món nào (trà, hương, topping) để giá trên 50k thì khách chê mắc, quán vắng 80% khách','Thạch 3Q đổi thành trân châu trắng cho đúng hình khay','Máy dán nắp tự động: khi chưa dán được thì báo rõ lý do (dư topping, dư đường, dư đá, sai siro, trà còn ít…)','Sửa lỗi bảng QUẦY TRÀ bị một vệt màu che, số trên khay đang khoá bị lộ ra','Trà để giá từ 40k là đắt, riêng matcha từ 50k','Giá nhập trà mới: matcha 6k, trà sữa 4,5k, trà sữa Thái 5k, trà olong 2,5k, hồng trà và lục trà 1,5k','Không còn đánh giá chê ly đổ, rỉ ra ngoài khi ly không bị tràn; ly không topping hoặc không đá thì khách không nhắc tới topping, đá','Đánh giá khớp với đơn thật: chỉ chê đắt khi quán đang để giá đắt, chỉ chê chờ lâu khi khách thật sự chờ lâu, chỉ chê sai món khi làm sai (đúng chỗ sai)','Quầy pha đổi màu theo màu giao diện chọn trong Cài đặt','Đơn từ 3 ly: khách khác chờ quán làm xong đơn đó mới ghé, không phải đứng chờ lâu','Ngày 1–5 có khách chỉ gọi trà, không topping']},
  {v:'3.4',d:'22/09/2026',items:['Có ngày khách khó ở (dễ rớt sao, nhiều khách hãm), có ngày khách vui vẻ, không báo trước','Sửa lỗi quầy pha bị lệch lên trên, che mất hàng khách và hũ trà','Sửa lỗi trang bị đẩy lên sau khi gõ phím trên iPhone (mở từ màn hình chính)','Sửa lỗi game bị thu nhỏ khi Chrome Android bật chế độ trang web cho máy tính','Sửa lỗi quầy pha bị đen khi mở trong ứng dụng khác (Threads, Instagram…) ở chế độ tối']},
  {v:'3.3',d:'22/09/2026',items:['Khách chờ lâu hơn (khoảng 1 phút), không giảm dần theo ngày','Đánh giá dễ thở hơn: pha đúng và nhanh gần như chắc 5 sao','Hướng dẫn chi tiết từng bước, có hình quầy pha','Chỉ dẫn từng bước cho khách đầu tiên của ngày có cách chơi mới (ngày 1, 6, 30, 60), chỉnh trong Cài đặt','Báo trước và hướng dẫn khi mở đường đá (ngày 6), ly 2 topping, đơn nhiều ly','Máy dán nắp tự động: mua rồi thì pha đúng món là tự dán nắp và giao','Sửa lỗi chữ bị cắt trong Kho','Thuê nhân viên (Nâng cấp > Nhân viên): phụ quầy tự rót trà, bỏ topping, đường và đá, pha chế tự làm cho khách chờ lâu nhất','Tổng kết có thêm lương nhân viên','Máy dán nắp tự động giá 3 triệu, theo giá thực tế','Có thuê nhân viên thì tiền tip là của nhân viên, quán không nhận','Sự kiện mỗi ngày: trời nóng, trời mưa, cuối tuần, học sinh tan học, food reviewer, món hot, nhà cung cấp giảm giá, ngày lễ','Sự kiện tặng tiền: lì xì, trả ví cho khách, giải quán đẹp, nhãn hàng tài trợ…','Nhạc nền và âm thanh: rót trà, múc topping, dán nắp, tiền vào két… (bật tắt trong Cài đặt)','Nhạc nền đổi theo mùa ngoài đời: thu, đông, xuân, hạ (chọn mùa trong Cài đặt)','Tắt nhạc, tắt âm thanh trong Cài đặt hoặc ngay trong bảng Tạm dừng','Nút × trên mặt khách bị hết món để mời khách về','Hơn 500 tên khách và hơn 500 câu đánh giá, không lặp lại','Chọn màu giao diện trong Cài đặt: 12 màu, có nâu cà phê như trước','Khách bước vào quán, khách tới theo giờ cao điểm, có lúc vắng để nghỉ tay','Thông báo lúc bán hiện ở dưới, không che đơn của khách','Giảm lag khi bán và khi rót trà','Vay ngân hàng khi két sắp cạn (dưới 200k), trả góp 10 ngày','Ly trên 100k (gồm hương, topping, size) thì 60% khách bỏ đi','Topping trong ly xếp dày như ly thật','Âm thanh thật: tiếng rót trà, chuông cửa, máy tính tiền, nhạc lên cấp','Nhạc nền mới cho 4 mùa và nhạc riêng cho ngày mưa','Ngày mưa có mưa rơi trên mái hiên quán','Thỉnh thoảng có khách hãm: khách hối, khách đổi ý, khách trả giá, khách khó tính, và hiếm hơn là khách bùng tiền','Nhân viên cho nghỉ thì gọi đi làm lại không tốn tiền thuê','Đơn nhiều ly tự chuyển sang ly kế tiếp']},
  {v:'3.2',d:'21/09/2026',items:['Sửa lỗi ly biến mất khi đang rót trà','Sửa lỗi đồng hồ và hình trên màn hình nhấp nháy','Game chạy mượt hơn, bớt giật khi bán','Màn hình chuẩn bị không còn giật khi bấm thêm bớt món, đổi tab, nấu hàng hay mua món mới']},
  {v:'3.1',d:'21/09/2026',items:['Sửa lỗi hình mèo ở màn hình chào','Hướng dẫn dùng hình khách chibi thay biểu tượng','Đặt tên quán: tiêu đề nằm trên ô nhập','Quầy pha chỉ hiện chai hương và thùng foam đã mua','Tạm dừng có thêm nút Đóng cửa hôm nay (cùng cỡ nút Chơi tiếp) để tổng kết sớm','Mèo ở màn hình chào ngọ nguậy đầu','Trả lời đánh giá của khách ngay trong mục Đánh giá']},
  {v:'3.0',d:'21/09/2026',items:['Quầy pha mới vẽ tay kiểu chibi: hũ trà, khay topping, thùng foam, kệ siro','Nhấn giữ hũ trà để rót, thả tay đúng vạch xanh','Chạm khay, chai, thùng để bỏ vào ly, chạm máy dán nắp để giao','9 khách chibi, vui hay giận tùy ly pha','Giữ lại tất cả đánh giá từ ngày đầu, chia trang 15 đánh giá','Quán mở cửa từ 11:00 đến 22:00, một ngày bán khoảng 4 phút, đủ cho 20–30 đơn','Khay thạch trái cây dùng hình mới']},
  {v:'2.7',d:'21/09/2026',items:['Pha xong ly tự đưa cho khách, không cần chạm vào khách','Ly pha xong mà sai món vẫn bị tính sai và đổ bỏ','Hương vị hiện bằng hình trái cây, foam hiện bằng hình đám mây','Foam cheese màu vàng']},
  {v:'2.6',d:'21/09/2026',items:['Hình topping mới: trân châu sợi, thạch củ năng xanh lá, thạch trái cây 3 màu, thạch phô mai có nhân','Trà hiện bằng hình ly đúng màu','Đánh giá không còn lặp câu, kể cả khi nhiều khách bỏ về liên tiếp','Thêm nhận xét dài, chi tiết như review thật']},
  {v:'2.5',d:'21/09/2026',items:['Đánh giá phong phú hơn, không lặp câu','Bàn pha tự bỏ qua bước Hương hoặc Topping khi khách không gọi','Tổng kết gọn hơn, hướng dẫn nói rõ hạn dùng']},
  {v:'2.4',d:'21/09/2026',items:['Dưới 4 sao: mất 40% khách (ghi trong hướng dẫn)','Chưa nấu trà, topping hoặc chưa có ly thì không mở cửa được','Món hết hàng tự báo hết: khách mới đổi món hoặc bỏ về, không chấm 1 sao','Đánh giá đa dạng hơn: có thêm 2, 3, 4 sao']},
  {v:'2.3',d:'21/09/2026',items:['Nút ⚙️ Cài đặt: hướng dẫn, có gì mới, chơi lại từ đầu','Thanh bước pha gọn hơn','Đưa sai món hoặc đổ ly thì ly bị bỏ, mất luôn nguyên liệu','Tổng kết có thêm số ly làm hỏng']},
  {v:'2.2',d:'21/09/2026',items:['Menu ghi đủ tên món, chia 2 cột','Sửa lỗi game tự phóng to khi chạm nhanh 2 lần hoặc khi gõ số']},
  {v:'2.1',d:'21/09/2026',items:['Màn hình chào khi mở game','Hướng dẫn bằng hình cho người mới, xem lại bất cứ lúc nào ở nút 📖 Hướng dẫn']},
  {v:'2.0',d:'21/09/2026',items:['Thêm trà: hồng trà, lục trà, trà olong, trà sữa Thái','Thêm 12 hương vị pha cùng trà (hồng trà dâu, lục trà vải...)','Topping mới chia 4 nhóm: trân châu, thạch, foam, phô mai','Thạch dừa đổi tên thành thạch 3Q','Bàn pha theo từng bước: Trà + Size, Hương, Topping, Đường, Đá','Đơn có foam, thạch, phô mai được chờ lâu hơn','Kho, Nâng cấp, Giá bán có thêm tab Hương','Món cũ đã bỏ (khoai môn, trân châu trắng, pudding, kem trứng) được hoàn tiền mua']},
  {v:'1.4',d:'21/09/2026',items:['Nâng cấp chia tab Trà, Topping, Trang bị, Online, vuốt trái phải để chuyển','Giá bán chia tab Trà, Topping, Tăng size','Mục mở đơn online chuyển vào Nâng cấp','Bỏ hiển thị cấp độ trên màn hình chính']},
  {v:'1.3',d:'21/09/2026',items:['Chọn loại trà trước, size sau','Bàn pha dùng hình thay chữ','Đánh giá sinh động hơn, có hình ly khách đã uống','Tên khách đa dạng hơn','Bớt chữ ở kho, cấp độ, tạm dừng, cuối ngày','Sửa lỗi nội dung chạy lên thanh trạng thái điện thoại']},
  {v:'1.2',d:'21/09/2026',items:['Hiện số phiên bản trong game','Thêm mục "Có gì mới" để xem lịch sử cập nhật']},
  {v:'1.1',d:'21/09/2026',items:['Chia 4 cấp độ theo ngày: ngày 1–5 đơn giản, ngày 6 thêm đường đá, ngày 30 ly 2 topping, ngày 60 đơn 2–3 ly','Đơn nhiều ly có thời gian chờ dài hơn','Đơn online mở từ ngày 60, cần lời từ 15 triệu và giữ từ 4,0 sao','Tiền hiển thị theo đơn vị k (1k = 1.000đ)']},
  {v:'1.0',d:'21/09/2026',items:['Bản đầu tiên cho bạn bè chơi thử','Tự nấu nguyên liệu, có hạn dùng và đổ bỏ','Tổng kết theo ngày, tuần, tháng kèm thuế hộ kinh doanh','Đặt tên quán, nút tạm dừng, giá riêng từng topping']}
];
/* ===== CẤU HÌNH CỦA CHỦ GAME (người chơi không chỉnh được) ===== */
const DEFAULT_CONFIG={
  ownerPin:'2468',          // mã vào bảng chủ game
  dayMin:4,                 // phút thật cho một ngày bán (11:00–22:00 trong game)
  startMoney:400000,        // vốn ban đầu
  commission:20,            // % phí app giao hàng
  wage0:0, wage1:165000, wage2:200000, wage3:200000,
  wageG1:200000, wageG2:300000, wageOn:250000, wageGz:275000, wageBuyer:100000, wageSv:200000, wageMkt:200000, // bảo vệ 1, bảo vệ 2, nhân viên online, nhân viên Gen Z (25k/h x 11h), nhân viên đi chợ (100k/ngày), sinh viên cuối tháng (200k/ca đêm), marketing (200k/ngày)
  bottle:200000, bottleN:45, bottleLife:7, // chai hương: giá, số ly mỗi chai, hạn dùng (ngày)
  tablet:7000000,           // mỗi tablet chạy 1 app giao hàng
  bankMax:1000000, bankRate:25, hotMax:3000000, hotRate:45, // vay ngân hàng / vay nóng: tối đa, lãi %/năm (360 ngày)
  priceCap:120000,          // 1 ly (gồm hương, topping, size) trên mức này thì 60% khách bỏ đi
  teaCap:40000,             // trà (trừ matcha) từ mức này là đắt
  teaCapMatcha:50000,       // matcha từ mức này là đắt
  itemCap:50000,            // 1 món (trà, hương, topping) trên mức này: khách chê mắc, quán vắng 80%
  sizeCap:50000,            // phụ thu size L tối đa; để đúng mức này thì không ai chọn size L, quán vắng 80%
  sizeWarn:20000,
  thiefMoney:100000000, thiefDay:30, thiefLeft:500000, // két trên mức này trước ngày này thì bị trộm, chừa lại thiefLeft           // phụ thu size L trên mức này là đắt, 90% khách không chọn size L
  loanLow:200000,           // két dưới mức này thì cho vay ngân hàng // lương mỗi ngày: nhân viên phụ quầy, nhân viên pha chế
  rent:40000,               // tiền mặt bằng mỗi ngày
  utilBase:20000,           // điện nước cơ bản mỗi ngày
  utilPerUpg:8000,          // điện nước tăng thêm cho mỗi trang bị
  taxThreshold:500000000,  // ngưỡng doanh thu năm không chịu thuế (hộ kinh doanh, 2026)
  vat:3, pit:1.5,           // % thuế GTGT và TNCN trên doanh thu, nhóm dịch vụ ăn uống
  online:{minProfit:15000000,fromDay:60,minRating:4.0}, // cả 3 điều kiện để mở đơn online; phải giữ đủ sao để tiếp tục nhận đơn
  levels:{l2:6,l3:30,l4:60}, // ngày bắt đầu mỗi cấp độ
  cost:{},                  // giá nhập mỗi phần nguyên liệu
  life:{}                   // hạn dùng (ngày), 0 = không hết hạn
};
Object.keys(ITEMS).forEach(k=>{DEFAULT_CONFIG.cost[k]=ITEMS[k].cost;DEFAULT_CONFIG.life[k]=ITEMS[k].life});
let CFG=JSON.parse(JSON.stringify(DEFAULT_CONFIG));
try{const o=JSON.parse(localStorage.getItem(OWNER_SAVE));if(o){CFG={...CFG,...o,online:{...CFG.online,...o.online},levels:{...CFG.levels,...o.levels},cost:{...CFG.cost,...o.cost},life:{...CFG.life,...o.life}}}}catch(e){}
CFG.cost.ice = 1000; CFG.life.ice = 2;
CFG.cost.sugar = 500; CFG.life.sugar = 7;
if(!(CFG.cfgVer>=31)){CFG.dayMin=4}if(!(CFG.cfgVer>=33)){CFG.wage1=90000;CFG.wage2=100000;CFG.cfgVer=33;try{localStorage.setItem(OWNER_SAVE,JSON.stringify(CFG))}catch(e){}}
if(!(CFG.cfgVer>=35)){CFG.priceCap=120000;CFG.itemCap=CFG.itemCap||50000;CFG.sizeCap=CFG.sizeCap||50000;}
if(!(CFG.cfgVer>=37)){CFG.sizeWarn=CFG.sizeWarn||20000;CFG.thiefMoney=CFG.thiefMoney||100000000;CFG.thiefDay=CFG.thiefDay||30;CFG.thiefLeft=CFG.thiefLeft||500000}
if(!(CFG.cfgVer>=36)){CFG.teaCap=CFG.teaCap||40000;CFG.teaCapMatcha=CFG.teaCapMatcha||50000;Object.assign(CFG.cost,{tra:4500,matcha:6000,thai:5000,hong:1500,luc:1500,olong:2500})}
if(!(CFG.cfgVer>=37)){CFG.cfgVer=37;try{localStorage.setItem(OWNER_SAVE,JSON.stringify(CFG))}catch(e){}}
const LIFE_OLD={f_vai:3,f_dao:3,f_dau:3,f_nho:3,f_xoai:1,f_tao:3,f_me:3,f_dua:1,f_choco:3,cheese:1,fmatcha:1,fsalt:1,fube:1,pmtuoi:1};
if(!(CFG.cfgVer>=38)){Object.keys(LIFE_OLD).forEach(k=>CFG.life[k]=ITEMS[k].life);CFG.wage2=200000;CFG.cfgVer=38;try{localStorage.setItem(OWNER_SAVE,JSON.stringify(CFG))}catch(e){}}
if(!(CFG.cfgVer>=43)){Object.keys(ITEMS).forEach(k=>CFG.life[k]=ITEMS[k].life);CFG.bottleLife=7;FLAV_KEYS.forEach(k=>CFG.life[k]=7);CFG.cfgVer=43;try{localStorage.setItem(OWNER_SAVE,JSON.stringify(CFG))}catch(e){}}
CFG.wage0=0; CFG.wage1=165000; CFG.wage3=200000;
if(!CFG.wageGz){CFG.wageGz=275000;saveCfg()}
if(!CFG.wageMkt || CFG.wageMkt === 50000){CFG.wageMkt=200000;saveCfg()}
if(!CFG.wageBuyer){CFG.wageBuyer=100000;saveCfg()}
if(!CFG.wageSv){CFG.wageSv=200000;saveCfg()}
/* hương: mua theo chai, giá mỗi ly = giá chai / số ly, hạn dùng theo chai */
FLAV_KEYS.forEach(k=>{CFG.cost[k]=Math.round(CFG.bottle/CFG.bottleN);CFG.life[k]=CFG.bottleLife});
function saveCfg(){try{localStorage.setItem(OWNER_SAVE,JSON.stringify(CFG))}catch(e){}}
const TXT={"great": ["Trà thơm, sữa béo vừa phải, uống một hơi là hết ly", "{mon} ở đây ngon nhất khu này rồi", "Lần đầu ghé mà ưng liền, chắc chắn quay lại", "{top} dai mềm, nấu vừa tới, không bị cứng", "Nhân viên dễ thương, làm nước nhanh ghê", "Ly {mon} đậm vị trà, không bị ngọt gắt", "Uống xong thấy tỉnh cả người, 10 điểm", "Quán nhỏ mà xinh, nước lại ngon", "Trời nóng mà có ly {mon} này là hết sảy", "Giá hợp lý, ly đầy đặn, topping nhiều", "Mình khó tính trà sữa lắm mà quán này qua được", "Mới đi học về ghé làm ly, đã khát ghê", "Đặt đúng mức đường mình thích, quá ưng", "Vị trà thơm tự nhiên, không bị mùi hương liệu", "{top} ở đây ngon hơn mấy chỗ nổi tiếng", "Ghé quán lần thứ ba trong tuần rồi", "Ly to, uống no luôn, rất đáng tiền", "Sữa béo mà không ngấy, uống tới giọt cuối vẫn ngon", "Pha nhanh mà vẫn chuẩn vị, phục ghê", "Đi ngang thấy quán dễ thương nên ghé, không hối hận", "Bạn giới thiệu nên ghé thử, giờ thành khách quen", "Nước ngon, quán sạch, nhạc nghe chill", "{mon} đúng kiểu mình thích, trà đậm sữa thơm", "Hôm nay mệt mà uống ly này vui hẳn lên", "Trân châu nóng hổi mới nấu, thơm mùi đường đen", "Topping cho nhiều, không keo kiệt chút nào", "Uống thử một lần là ghiền luôn", "Quán làm ly nào ra ly đó, ổn định lắm", "Ly trà sữa đúng chuẩn tuổi thơ", "Vị ngọt thanh, uống không bị khát nước", "Đá vừa đủ, không bị nhạt khi để lâu", "Nhân viên nhớ luôn món mình hay gọi, dễ thương ghê", "Cho 5 sao vì quá đỉnh", "Mua mang về cho cả nhà ai cũng khen", "Mê cái mùi trà rang của quán", "Không gian nhỏ xinh, ngồi học bài được", "Ly {mon} này xứng đáng 5 sao", "Trà sữa ngon, giá sinh viên, còn gì bằng", "Nhìn ly nước thôi đã thấy thèm, uống vô còn ngon hơn", "Giờ cao điểm mà vẫn làm nhanh, giỏi quá", "Đây là quán ruột của mình từ giờ", "Uống {mon} với {top} đúng là cặp bài trùng", "Vị ổn định, lần nào ghé cũng ngon như nhau", "Sẽ rủ đám bạn cùng lớp tới", "Ngon xuất sắc, không có gì để chê", "Trà thơm dịu, hậu vị ngọt nhẹ rất dễ chịu", "Quán dán nắp kỹ, mang đi không bị đổ", "Được tặng thêm nụ cười của chị chủ, ngọt hơn cả trà", "Mới thử {mon} lần đầu mà mê luôn", "Ly nước làm cẩn thận, nhìn là biết có tâm", "Ngon tới mức muốn gọi thêm ly thứ hai", "Chấm điểm tuyệt đối cho quán", "Ngọt vừa miệng, béo vừa đủ, thơm đúng chất", "Uống xong muốn quay lại liền ngày mai", "Topping {top} dai giòn sần sật, thích ghê", "Buổi chiều ghé làm ly là chuẩn bài", "Quán dễ thương, nước ngon, giá mềm", "Đậm đà mà không đắng, cân vị tốt", "Ly {mon} size L uống cả buổi chiều", "Thơm mùi trà nhài nhẹ nhàng, mê", "Nước ra đúng giờ, không phải đợi lâu", "Đi làm về ghé mua một ly, bao mệt mỏi bay đi", "Mình uống nhiều quán rồi, quán này top đầu", "Khen nhiệt tình, xứng đáng được biết đến nhiều hơn", "Ly {mon} hôm nay còn ngon hơn lần trước", "Chủ quán dễ thương, còn hỏi mình uống có vừa không", "Mua cho người yêu, bạn ấy khen nức nở", "Không ngờ quán nhỏ mà pha ngon vậy", "Topping tươi, nhìn là biết mới làm trong ngày", "Trà sữa kiểu này uống mỗi ngày cũng được", "Tuyệt vời, cho quán thêm chục sao nếu được", "Mát lạnh, thơm béo, đúng thứ mình cần hôm nay", "Quán gần trường, ngon mà rẻ, học sinh mê lắm", "Lần nào ghé cũng thấy đông, giờ hiểu vì sao rồi", "Uống một ngụm là biết trà pha chuẩn", "{top} mềm dẻo, ăn không bị dính răng", "Hương vị hài hoà, ai uống cũng dễ thích", "Ngồi quán nghe nhạc, uống trà, chill cả buổi", "Vừa miệng từ lần đầu, không cần dặn thêm", "Tới quán nào mình cũng gọi {mon}, ở đây ngon nhất", "Cho quán 5 sao và một cái like thật to", "Mẹ mình không uống trà sữa mà uống ở đây khen ngon", "Mua về văn phòng, cả phòng tranh nhau uống", "Nhân viên tư vấn món rất có tâm", "Uống vào thấy yêu đời hơn hẳn", "Cảm ơn quán vì ly nước ngon", "Mình sẽ quay lại thử hết menu", "Trà sữa quán này làm mình quên luôn quán cũ", "Ly nước đẹp, chụp hình sống ảo cũng xinh", "Chuẩn vị trà sữa truyền thống, đúng gu", "Ngon, nhanh, sạch sẽ, đủ cả ba", "Không cần review nhiều, cứ tới uống là biết", "Hôm nay đổi món thử {mon}, quyết định đúng", "Cực kỳ hài lòng từ ly nước tới thái độ phục vụ", "Uống ở đây một lần là nhớ hoài", "Trà không bị chát, sữa không bị lợ", "Đá viên tròn đẹp, tan chậm, nước không bị nhạt", "Đỉnh của chóp", "Ngon tới mức mình viết review liền khi đang uống", "Giữa trưa nắng uống ly này mát cả ruột gan", "Lượng đường vừa khéo, không cần chỉnh gì", "Thích cách quán gói ly, cẩn thận lắm", "Quán mở nhạc hay, nước ngon, sẽ ghé thường xuyên", "Ngon và rẻ hơn mấy chuỗi lớn", "Mới mở mà đã ngon vậy, chúc quán đông khách", "Nói chung là mê, không có gì để chê", "Uống cùng bạn thân, hai đứa đều gật gù khen", "Cái vị trà này làm mình nhớ quê", "Không gian ấm cúng, giống ở nhà", "Mua ba ly cho cả nhóm, ai cũng khen", "Tuần nào cũng phải ghé một lần", "Ly {mon} hôm nay cứu cả ngày của mình", "Đậm, thơm, béo, đủ cả", "Cảm giác được chăm chút từng ly", "Uống xong vẫn còn thơm miệng lâu", "Trân châu đen bóng, dẻo thơm, ăn cuốn", "Rất đáng tiền, không có gì phải nghĩ", "Quán nhỏ mà có võ", "Làm nhanh gọn, giao đúng món, ưng", "Mình chọn ít đường mà vẫn đủ ngọt, khéo ghê", "Ly trà ngon nhất tuần này", "Hôm nào buồn là ghé quán uống ly cho vui", "Rủ crush đi uống, crush khen quán xinh", "Cảm ơn nhân viên đã làm lại đúng ý mình", "Chắc chắn là quán quen mới của mình", "Trà sữa ở đây làm mình hết bị ngán ngọt", "Uống một ly năng lượng cả buổi chiều", "Đúng gu từ vị trà tới độ béo", "Ly nước sạch sẽ, dán nắp chắc chắn", "Ngồi đợi chưa tới 5 phút đã có nước", "Quán bán bằng cái tâm, cảm nhận rõ luôn", "Không sợ uống bị đau bụng vì nguyên liệu sạch", "{mon} vừa miệng, {top} ngon, 10 trên 10", "Mê luôn cái cách nhân viên chào khách", "Quán này phải nổi tiếng mới đúng", "Ngon tới nỗi mình rủ cả gia đình tới", "Đang giảm cân mà vẫn phải ghé", "Xứng đáng là quán trà sữa yêu thích", "Quá tuyệt cho một buổi chiều cuối tuần", "Nhỏ xinh mà chất lượng, ủng hộ dài dài", "Uống ly này rồi quên mấy quán khác luôn", "Mình đã tìm được chân ái trà sữa", "Khách quen rồi mà lần nào cũng thấy ngon", "Không gian thơm mùi trà, vào là thấy dễ chịu", "Pha chế đẹp mắt, nhìn cũng vui", "Chưa từng thất vọng lần nào", "Ngon hơn mong đợi rất nhiều", "Giá tốt mà chất lượng như quán sang", "Mình cho 5 sao không chút đắn đo", "Món mới ra mà làm rất chuẩn", "Tối nào đi dạo cũng ghé mua một ly", "Ngon quá nên mình mua thêm ly mang về", "Mỗi lần uống là một lần thấy vui", "Ly nước làm mình mỉm cười cả buổi", "Quán nhỏ xinh như tiệm trong phim", "Ngon đến mức muốn xin công thức", "Thơm lừng từ lúc mở nắp", "Một ly là đủ vui cả ngày", "Trà ngon, người dễ thương, quán đáng yêu", "Uống rồi mới biết trà sữa ngon là thế nào", "Ghé một lần, nhớ cả tuần", "Mình chấm quán này điểm mười", "Hương trà thoang thoảng, rất dễ chịu"],
"sv_upsize": ["Được bạn sinh viên trực đêm upsize ly L miễn phí, uống no nê đã cái nư ghê! Cho 5 sao hào phóng ⭐⭐⭐⭐⭐", "Khách ruột ca đêm: Gọi size M mà nhận được ly L to bự chảng, bạn sinh viên ca đêm dễ thương xỉu! Chấm 5★", "Nửa đêm đi mua trà sữa được nâng size L miễn phí, quán tâm lý hết nước chấm! 5 sao nha!", "Order size M mà được ly L uống đã đời, nhân viên ca đêm hào phóng quá! 5 sao tuyệt đối ⭐⭐⭐⭐⭐", "Bất ngờ nhận được ly size L dù chỉ trả tiền size M, bạn nhân viên trực đêm đáng yêu ghê. 5 sao ủng hộ quán!"],
"sv_downsize": ["Khuya lắc khuya lơ gọi size L mà bạn sinh viên buồn ngủ đưa nhầm size M, hụt hẫng xíu nhưng khuya rồi thông cảm vẫn lấy, chấm 3 sao nhé! ⭐⭐⭐", "Đang thèm ly bự mà được ly size M vì bạn nhân viên ngáp ngắn ngáp dài lấy nhầm, tội nghiệp nên không nỡ trả lại, cho 3 sao rút kinh nghiệm! ⭐⭐⭐", "Hơi hụt hẫng vì gọi ly L mà ra ly M, nhưng thấy bạn sinh viên trực đêm mắt nhắm mắt mở tội quá nên nhận luôn. 3 sao nha!", "Order size L mà thành size M, đêm muộn rồi nên thôi uống tạm, chấm 3★ cho bạn sinh viên tỉnh ngủ!", "Thèm uống ly to mà nhận ly size M, nhân viên buồn ngủ quá rồi. Vẫn nhận ly nước nhưng trừ sao nhé, 3 sao!"], "ok": ["Ngon, nhưng mình thấy hơi ngọt một chút", "Uống ổn, lần sau thử món khác", "{mon} khá ngon, {top} hơi ít", "Vị ổn áp, giá hợp lý", "Ngon nha, chỉ là đá hơi nhiều", "Khá ưng, sẽ ghé lại", "Tạm ổn, cho 4 sao", "Nước ngon, quán hơi nhỏ", "Trà thơm, sữa hơi nhạt so với mình", "Được, nhưng mong quán có thêm món mới", "Uống được, giá chấp nhận được", "Ngon, nhưng lần sau mình sẽ chọn ít đường hơn", "Khá ổn cho một ly trà sữa bình dân", "{top} ngon, trà hơi nhạt xíu", "Vị dễ uống, không có gì để chê nhiều", "Nhân viên thân thiện, nước ổn", "Ly hơi nhỏ so với mình nghĩ, nhưng ngon", "Ngon, chờ hơi lâu chút xíu thôi", "Khá ngon, cải thiện chút nữa là 5 sao", "Ổn định, lần nào uống cũng giống nhau", "Mình thích, nhưng bạn mình thấy hơi ngọt", "Uống vui miệng, giá ok", "{mon} được, chưa tới mức mê", "Nước ngon, chỗ để xe hơi chật", "Ngon nhưng topping hơi mềm", "Vị trà ổn, sữa hơi béo với mình", "Tạm hài lòng, sẽ ghé thử thêm", "Mua mang đi, về nhà uống vẫn ngon", "Ổn, đúng như mình mong đợi", "Được đấy, cho quán 4 sao khích lệ", "Ngon, mong quán giữ phong độ", "Không quá xuất sắc nhưng dễ uống", "Vị ngọt vừa, trà hơi nhạt", "Nhìn chung là ổn, đáng thử", "Ngon, nhưng quán nên có thêm size nhỏ", "Uống tạm được, không có gì đặc biệt lắm", "Ly nước ổn, phục vụ nhanh", "Mình thích {top} hơn là trà", "Ngon, hơi đông nên phải chờ chút", "Quán xinh, nước khá ngon", "Vừa miệng, nhưng đá tan hơi nhanh", "4 sao vì còn chờ hơi lâu", "Khá ngon, giá mềm", "Trà ổn, lần sau thử thêm topping khác", "Uống được, sẽ quay lại khi đi ngang", "Ngon vừa, hợp để uống giải khát", "Nhân viên hơi bận nhưng vẫn vui vẻ", "Ổn so với giá tiền", "Ly {mon} ổn, mong có thêm hương vị lạ", "Ngon, mình sẽ giới thiệu bạn bè", "Chưa đến mức ghiền nhưng ổn", "Vị hơi nhạt, mình phải chọn thêm đường", "Uống ổn, không bị đau bụng", "Khá ổn cho buổi trưa", "Đồ uống ổn, không gian dễ chịu", "Ngon nhưng ước gì topping nhiều hơn", "Tạm được, sẽ thử lại lần nữa", "Vị ổn, lần sau thử trà khác xem sao", "Nước ngon, ống hút hơi nhỏ", "Được, nhưng mình thích béo hơn chút", "Ngon lành, giá sinh viên", "Uống ổn, nhân viên dễ thương", "Khá hài lòng với ly {mon} hôm nay", "Ok, không chê được gì nhiều", "Ngon, 4 sao vì hơi ngọt", "Vị trà dịu, hợp người mới uống", "Ổn, chỉ là đợi lâu một xíu", "Mình sẽ quay lại thử {top}", "Uống được, không quá đặc sắc", "Ngon, nhưng quán hơi ồn", "Tạm ổn, mong quán thêm chỗ ngồi", "Được, nhìn chung là vui", "Khá ngon, chưa phải xuất sắc", "Ổn áp, đi ngang sẽ ghé", "Vị ổn, ly hơi ít đá như mình muốn", "Ngon, lần sau mình gọi size L", "Trà sữa ổn, giá phải chăng", "Được, hợp với buổi chiều", "Uống ngon, nhưng phải đợi xếp hàng", "Cho 4 sao, còn chỗ để cải thiện", "Ngon ở mức vừa phải"], "meh": ["Bình thường, không có gì đặc biệt", "Hơi ngọt so với khẩu vị mình", "Trà hơi nhạt, uống không rõ vị", "{mon} tạm được thôi", "Đá nhiều quá, uống một lúc là nhạt", "Uống được, nhưng chắc không quay lại", "Topping hơi ít so với giá", "Cũng thường thôi, chưa thấy gì nổi bật", "{top} hơi mềm, không được dai", "Vị hơi lạ, chưa quen lắm", "Ly hơi nhỏ, uống vài ngụm là hết", "Sữa hơi loãng, không béo như mình nghĩ", "Tạm chấp nhận, mong quán cải thiện", "Uống một lần biết vậy thôi", "Trà hơi đắng hậu vị", "Không tệ nhưng cũng không ngon", "Hơi phí tiền một chút", "Chưa hợp khẩu vị lắm", "Vị trà không rõ, toàn vị đường", "Nước ổn nhưng phải đợi lâu", "Mình nghĩ quán nên nấu {top} kỹ hơn", "3 sao, bình thường", "Không có gì để khen cũng không có gì để chê", "Quán hơi nóng, ngồi không thoải mái", "Uống được, nhưng mình có lựa chọn tốt hơn", "Vị ngọt gắt, uống xong khát nước", "Topping bị lạnh cứng", "Trà hơi chát, sữa lại ít", "Chắc hôm nay quán pha vội", "Mong quán cải thiện vị trà", "Ly nước hơi đổ ra ngoài khi nhận", "Không như review trên mạng", "Tạm thôi, không quá ấn tượng", "Giá này mình mong ngon hơn", "Uống nửa ly thì ngán", "Hương liệu hơi nồng", "Đường hơi nhiều dù đã dặn ít", "Lần trước ngon hơn lần này", "{mon} không đậm như mong đợi", "Được cái nhanh, còn vị thì bình thường", "Quán cần thêm chỗ ngồi", "Vị hơi nhạt nhẽo", "Mình không ấn tượng lắm", "Tạm được cho một lần thử", "Không tệ, nhưng chưa đủ để quay lại", "Uống tạm để giải khát thôi", "Hơi thất vọng so với kỳ vọng", "Cần cải thiện độ béo của sữa", "{top} nấu chưa tới", "Nước ổn, thái độ nhân viên hơi vội"], "bad": ["Không hợp khẩu vị, uống không hết", "{top} bị cứng như để từ hôm qua", "{mon} không như mong đợi chút nào", "Vị lạ quá, không thích", "Trà bị đắng, sữa loãng", "Uống xong hơi mệt bụng", "Tiếc tiền ghê", "Ly nước nhạt như nước lã", "Ngọt quá mức, uống không nổi", "Mùi trà bị khét", "Không quay lại nữa", "Topping ít mà còn dở", "Thất vọng với ly nước hôm nay", "Đá tan hết, nước nhạt thếch", "Vị hương liệu nồng quá", "Mình phải bỏ nửa ly", "Không đáng với giá tiền", "Sữa có vị lạ, không yên tâm", "Mong quán xem lại chất lượng", "Lần đầu cũng là lần cuối", "{top} bị chua, không ăn được", "Uống không ra vị trà", "Ly nước bị rỉ ra ngoài, dính hết tay", "Không ngon như lời bạn giới thiệu", "Tệ hơn mình nghĩ nhiều", "Pha ẩu, vị không đều", "Hơi buồn vì ly nước này", "Không khuyến khích ai thử", "Trân châu bị nát", "Vị đắng khó chịu ở cuối"], "wait": ["Ngon nhưng chờ hơi lâu", "Đông khách quá, đợi mỏi chân", "Nước ngon, mà đứng đợi lâu quá", "Làm chậm xíu, bù lại {mon} ngon", "Giờ cao điểm hơi lâu nha quán", "Mong quán thêm người vào giờ đông", "Chờ gần mười phút mới có nước", "Nước ngon nhưng tốc độ cần cải thiện", "Đợi hơi lâu nên đá tan bớt", "Trừ một sao vì chờ lâu", "Lần sau chắc ghé giờ vắng", "Ngon, nhưng đứng chờ nắng quá", "Quán một mình pha nên hơi đuối", "Đợi lâu nhưng cũng đáng", "Khách tới sau được làm trước, hơi buồn", "Ngon, chỉ tiếc là phải đợi", "Nước ra chậm, mong quán nhanh tay hơn", "Chờ lâu mà ly nước vẫn ổn", "Hôm nay quán đông quá, đợi hoài", "Mình đợi hơi lâu, còn lại ok", "Nhân viên cố gắng rồi nhưng đông quá", "Chờ mãi mới tới lượt, may mà nước ngon", "Nếu nhanh hơn thì 5 sao", "Đợi lâu tới mức suýt bỏ về", "Giờ tan học quán đông kinh khủng", "Pha kỹ nên hơi lâu, chấp nhận được", "Chờ cũng lâu, nhưng thái độ nhân viên tốt", "Mong quán mua thêm máy móc cho nhanh", "Đợi nước lâu hơn uống nước", "Nước ngon, thời gian chờ thì chưa"], "timeout": ["Đợi mãi không ai làm, bỏ về", "Chờ lâu quá, đi quán khác luôn", "Đứng cả buổi không tới lượt", "Không ai để ý mình, về luôn", "Chờ muốn mọc rễ luôn", "Order xong không thấy nước đâu", "Trễ giờ học nên không đợi nổi", "Hết kiên nhẫn, bỏ về tay không", "Đứng đợi mỏi chân mà vẫn chưa có nước", "Quán đông mà làm chậm quá", "Chờ gần hai mươi phút, thôi khỏi", "Mất thời gian ghê, lần sau không ghé", "Gọi hai ba lần vẫn chưa được làm", "Bỏ về vì chờ lâu quá", "Hẹn bạn mà đợi nước trễ luôn giờ hẹn", "Chờ hoài không thấy, buồn ghê", "Quán làm không kịp, khách phải về", "Tiếc thời gian đứng chờ", "Đứng xếp hàng mà hàng không nhúc nhích", "Mình về trước khi được phục vụ", "Đợi lâu tới mức hết thèm luôn", "Chờ mãi rồi đi mua chỗ khác", "Quán cần thêm người phụ", "Không đợi nổi nữa", "Đứng nắng chờ lâu quá, về thôi", "Nhân viên cứ lo ly khác, quên mình", "Mất nửa tiếng mà không có ly nào", "Thất vọng vì chờ quá lâu", "Hàng dài mà làm chậm, bỏ về", "Tới giờ đi làm rồi, không chờ được"], "wrong": ["Làm sai món, phải đổi lại", "Gọi một đằng ra một nẻo", "Kêu {mon} mà đưa nhầm món khác", "Quán nhầm đơn, lần sau cẩn thận nha", "Bị làm sai, hơi buồn", "Dặn ít đường mà đưa ly ngọt lịm", "Sai topping, phải chờ làm lại", "Đưa nhầm ly của người khác", "Mình dặn kỹ mà vẫn làm sai", "Nhân viên cần tập trung hơn", "Sai size, mình gọi size khác", "Làm lộn món, mất thời gian ghê", "Đưa sai mà không xin lỗi", "Ly bị thiếu topping", "Mong quán đọc kỹ đơn hơn", "Lần thứ hai bị làm sai rồi", "Kêu không đá mà đưa đầy đá", "Sai vị, uống không đúng món mình gọi", "Làm lại lần hai mới đúng", "Nhầm món làm mình trễ hẹn"], "soldout": ["Quán hết % rồi, tiếc ghê", "Tới mua mà hết %, chuẩn bị nhiều hơn nha", "Hết % sớm quá", "Muốn uống % mà hết mất tiêu", "Tới nơi mới biết hết %", "Chạy xe cả đoạn tới mà hết %", "Quán nên nấu thêm %", "Mới trưa đã hết %, buồn ghê", "Lần sau tới sớm hơn vậy, hết % rồi", "Thèm % mà quán hết, đành về", "Hết % nên mình đổi ý về luôn", "Mong quán chuẩn bị đủ %", "Quán vui vẻ báo hết %, cũng dễ chịu", "Hết món mình thích, hơi tiếc", "Tới trễ nên hết %, không sao lần sau ghé", "Hết % hoài, lần thứ hai rồi", "Đi cả nhóm mà hết %, cả đám về", "Quán xin lỗi vì hết %, thôi lần sau", "Tiếc ghê, % hết rồi", "Mình sẽ quay lại khi có %"], "soldoutPartial": ["Nhóm mình gọi nhiều ly, được uống mấy ly rồi mới hết %", "Ly đầu ngon lành, tiếc là hết % nên ly sau phải bỏ", "Được phục vụ trước mấy ly, đến lượt cuối thì hết %", "Uống được nửa đơn thì quán báo hết %", "Đơn nhiều ly, quán ráng làm được kha khá rồi mới báo hết %", "Tiếc là chưa đủ ly vì hết %, nhưng mấy ly đã có cũng ổn", "Được vài ly trước khi hết %, coi như đỡ tiếc", "Hết % giữa chừng đơn, may là được uống trước vài ly", "Ly đầu ngon, chỉ tiếc đơn không đủ vì hết %", "Quán báo hết % sau khi đã đưa được mấy ly, cũng thông cảm được", "Không đủ % cho cả đơn, nhưng ít nhất được uống vài ly", "Được ly đầu rồi mới nghe hết %, hơi tiếc cho phần còn lại", "Nhóm đông người, chỉ đủ % cho một nửa đơn thôi", "Uống dở đơn thì hết %, đành chia nhau mấy ly có sẵn", "Đơn nhiều ly mà quán hết % giữa chừng, thông cảm vì cũng được uống vài ly rồi"], "soldoutOnl": ["Đặt app mà quán báo hết %, bị huỷ đơn","Order qua app xong mới biết hết %, tiếc ghê","Đặt giao hàng mà quán hết %, đành đặt chỗ khác","Chờ đơn một hồi thì quán huỷ vì hết %","App vẫn hiện % mà quán lại hết, nên cập nhật menu nha","Đặt online bị huỷ vì hết %, hơi buồn","Quán nên tắt món % trên app khi hết hàng","Đơn bị huỷ giữa chừng vì hết %, lần sau đặt sớm hơn","Thèm % mà đặt app không được, quán báo hết","Quán huỷ đơn lịch sự, báo hết %, thôi lần sau","Đặt ship trà sữa mà hết %, đổi quán khác vậy","Quán hết % nên huỷ đơn, mong quán nhập thêm"], "refused": ["Quán không bán cho mình, hơi buồn", "Bị từ chối, lần sau không ghé", "Tự nhiên không bán, kỳ ghê", "Đứng chờ rồi bị từ chối", "Không hiểu sao quán mời về", "Quán bảo không làm được món mình gọi", "Mất công ghé mà không mua được", "Chưa kịp gọi đã bị mời về", "Hơi hụt hẫng vì bị từ chối", "Quán từ chối khéo, nhưng vẫn buồn", "Không mua được gì, đành về", "Mong quán giải thích rõ hơn", "Bị mời về dù đã chờ khá lâu", "Quán lịch sự nhưng mình vẫn tiếc", "Lần sau chắc gọi món khác"], "late": ["Tài xế chờ lâu quá, nước nhạt hết", "Giao trễ, lần sau đặt quán khác", "Đặt app mà chờ gần tiếng", "Shipper phải đợi quán lâu quá", "Tới tay thì đá tan hết rồi", "Đơn làm chậm, tài xế huỷ luôn", "Đặt online mà mãi không thấy giao", "Chờ đơn lâu tới mức hết thèm", "Quán nên ưu tiên đơn online hơn", "Giao trễ, trà sữa nhạt thếch", "App báo quán đang chuẩn bị cả buổi", "Đơn bị huỷ vì quán làm chậm", "Tài xế nói đợi quán lâu lắm", "Đặt lúc trưa mà chiều mới tới", "Mình không đặt quán này qua app nữa", "Trễ quá nên mình huỷ", "Đặt về văn phòng mà trễ mất giờ nghỉ", "Đơn online bị bỏ quên", "Nước tới nơi không còn lạnh", "Mong quán tăng tốc cho đơn giao hàng"], "cheap": ["Giá rẻ mà ngon, quá hời", "Giá sinh viên, chất lượng xịn", "Rẻ vậy mà ly to, ủng hộ dài dài", "Tiền này mà ngon vầy là quá được", "{mon} rẻ bất ngờ, ghé hoài", "Giá mềm hơn mấy quán xung quanh", "Rẻ mà topping nhiều, quá hời", "Học sinh như mình uống mỗi ngày được", "Giá dễ thương như chủ quán", "Rẻ mà không hề dở", "Đáng đồng tiền bát gạo", "Mua ba ly mà chưa tới trăm nghìn", "Giá tốt nhất khu này", "Rẻ bất ngờ, ngon bất ngờ", "Giá hạt dẻ, chất lượng hạt kim cương", "Ví mỏng vẫn uống được thoải mái", "Giá này mà có {top} ngon vậy là quá được", "Quán bán giá tâm lý ghê", "Uống rẻ mà vẫn ngon, mê", "Túi tiền sinh viên cảm ơn quán", "Giá quá hợp lý, sẽ ghé thường", "Rẻ hơn mong đợi, ngon hơn mong đợi", "Giá vậy mà ly to đầy", "Mua nhiều ly cho cả lớp vẫn không tốn", "Chất lượng vượt xa giá tiền"], "pricey": ["Giá hơi chát so với chất lượng", "Đắt quá, chắc không quay lại", "{mon} ngon mà giá cao quá", "Giá này thì mong ly to hơn", "Ví mình khóc rồi", "Giá cao hơn mấy quán gần đây", "Ngon nhưng không đáng giá này", "Topping tính tiền hơi mạnh tay", "Giá ngang quán lớn mà ly nhỏ hơn", "Giảm giá chút là mình ghé thường", "Hơi đắt cho một ly trà sữa", "Mong quán xem lại bảng giá", "Giá này chỉ uống thỉnh thoảng thôi", "Size L tính thêm hơi nhiều", "Học sinh uống giá này hơi khó", "Tiền ly này mua được hai ly quán khác", "Ngon nhưng ví mỏng quá", "Giá hơi cao so với khu dân cư", "Đắt mà topping ít", "Mong có khuyến mãi cho khách quen", "Giá hơi làm mình chùn tay", "Uống ngon nhưng tính ra hơi đắt", "Thấy giá xong muốn đổi ý", "Nên có size nhỏ giá mềm hơn", "Đắt xắt ra miếng thì còn chịu, đằng này bình thường"],
"comfort": ["Thấy bạn nhân viên làm túi bụi luôn tay luôn chân tội nghiệp ghê, lỡ tay chút không sao, vẫn cho 5★ ủng hộ quán nè!", "Quán đông khách quá nhân viên làm không ngơi tay, thấy thương ghê. Pha lại ly mới ngon lành là vui rồi, 5 sao động viên nha!", "Nhìn các bạn chạy đôn chạy đáo thương ghê, làm nhiều đơn quá nên có sự cố xíu cũng thông cảm được. Vẫn chấm 5★ vì ly nước ngon!", "Thấy bạn nhân viên Gen Z làm việc quần quật tội nghiệp quá, không nỡ đánh giá kém. Nước pha lại chuẩn vị, cho 5 sao ủng hộ tinh thần nhé!", "Làm nhiều đơn quá nên hơi vất vả xíu, nhìn mặt bạn nhân viên tội ghê. Ly mới làm lại rất ngon, chấm 4★ khích lệ quán!", "Thấy các bạn làm việc cật lực từ sáng tới tối thương xỉu, có trục trặc xíu mà đổi ly mới tinh tươm là 10 điểm rồi! 5★ không có nhưng!", "Order lúc quán đang cao điểm, nhân viên làm tối tăm mặt mũi thấy tội nghiệp ghê. Không nỡ đánh giá kém, tặng 5★ cho sự cố gắng của các bạn!", "Thấy bạn pha chế làm việc hết công suất tội ghê, lỡ tay làm lại chút mà nước ra ngon chuẩn vị là được rồi. Ủng hộ 5 sao cho bạn đỡ áp lực nhé!", "Nhân viên làm nhiều quá đuối thấy thương, không nỡ trừ sao. Ly {mon} pha lại thơm ngon đậm đà, chấm 5★ an ủi bạn nè!", "Quán làm ăn có tâm, lỡ chút là tự giác làm lại ngay ly mới tinh tươm cho khách. Thấy nhân viên vất vả quá nên cho 5★ động viên, cố lên nhé các bạn!", "Thương bạn nhân viên làm quần quật cả ngày, nhìn mồ hôi nhễ nhại tội nghiệp lắm. Nước ngon, cho 5★ lấy động lực đi làm nha!", "Quán đông nên nhân viên làm nhiều quá bị cuống, thấy thương nhiều hơn là trách. Ly {mon} mới rất ngon, 5 sao khích lệ tinh thần!", "Thấy em nhân viên cuống cuồng làm đơn thương ghê, tuy chờ đổi ly xíu nhưng nước ngon, đánh giá 5★ cho em đỡ tủi thân nè!", "Đông khách quá nên nhân viên xoay như chong chóng tội nghiệp ghê, lỡ nhầm xíu mà làm lại đàng hoàng là quá ưng rồi. 5 sao nha quán!", "Nhìn bạn pha chế cắm cúi làm không kịp thở thấy tội nghiệp xỉu, thôi thì 5 sao động viên chứ ai nỡ chấm điểm kém bao giờ!", "Làm nước liên tục nhìn bạn nhân viên đuối thấy thương, có sự cố nhỏ mà xử lý nhanh gọn đổi ly mới là tuyệt vời rồi. Chấm 5★ khích lệ!", "Thấy bạn nhân viên làm quần quật tội ghê, không nỡ đánh giá kém đâu. Ly {mon} ngọt ngào chuẩn vị, 5 sao cho bạn có thêm động lực nhé!", "Quán đông nghịt nhân viên làm cật lực thấy thương, ly nước pha lại ngon lành cành đào. Tặng quán 5 sao vì sự nỗ lực không ngừng nghỉ!", "Nhìn em nhân viên áp lực toát mồ hôi tội nghiệp ghê, ly {mon} ngon lắm nha em ơi. Đánh giá 5★ cho em vui vẻ cả ngày nè!", "Khách đông làm nhiều quá nên lỡ tay chút xíu, nhìn bạn nhân viên vội vàng pha lại thương ghê. 5★ an ủi cho bạn làm việc chăm chỉ!", "Thương bạn nhân viên chạy việc liên tục tội nghiệp, ly nước mới tinh rất vừa miệng. Đánh giá 5★ tuyệt đối ủng hộ quán!", "Thấy nhân viên làm nhiều quá đuối sức tội ghê, ai nỡ chấm điểm xấu làm gì. Cho 5★ để bạn có thêm niềm vui trong công việc nhé!", "Nhân viên nhiệt tình, dù quán đông làm nhiều đơn cuống tay nhưng ly mới rất chất lượng. 4 sao khích lệ các bạn cố gắng hơn nữa!", "Thấy các bạn làm việc vất vả tội nghiệp ghê, nước ngon và phục vụ có tâm thế này thì 5★ không cần đắn đo!", "Chạy đơn liên tục tội nghiệp bạn pha chế ghê, có chút sơ suất nhưng ly {mon} mới hoàn hảo lắm. 5 sao động viên nha em!"]};
const PARTS={
  great:[['{mon} thơm lừng','{mon} đậm vị','Trà thơm','Vị vừa miệng','{top} dai giòn','{top} ngon xỉu','Ly {mon} mát lạnh','Nước ngon','Uống đã khát','{mon} chuẩn vị','Ngọt thanh dễ uống','Mới thử {mon}'],
         ['nhân viên dễ thương','làm nhanh ghê','sẽ quay lại','ghiền luôn rồi','10 điểm không có nhưng','giá hợp lý','quán xinh xắn','rủ bạn tới liền','uống hoài không chán','đáng tiền lắm','mai ghé tiếp','chấm điểm tuyệt đối']],
  ok:[['Ngon','Uống ổn','{mon} khá ngon','Vị ổn áp','Ngon nha','{top} được','Khá ưng'],
      ['nhưng hơi ngọt','nhưng {top} hơi ít','lần sau thử món khác','sẽ ghé lại','giá ok','đá hơi nhiều xíu','chờ cũng hơi lâu','mong có thêm món mới']],
  meh:[['Bình thường','Tạm được','{mon} hơi nhạt','Hơi ngọt so với mình','Cũng thường thôi','{top} hơi mềm'],
       ['không có gì đặc biệt','chắc không quay lại','{top} hơi ít','mong quán cải thiện','uống một lần biết thôi','giá này hơi phí']],
  bad:[['Không hợp khẩu vị','{top} hơi cứng','{mon} không như mong đợi','Vị lạ quá','Trà bị đắng'],
       ['uống không hết','hơi thất vọng','không quay lại đâu','tiếc tiền ghê']],
  wait:[['Ngon nhưng chờ hơi lâu','Đợi hơi lâu','Giờ cao điểm hơi chậm','Đông khách quá','Chờ muốn mỏi chân'],
        ['bù lại {mon} ngon','lần sau làm nhanh hơn nha','cũng đáng chờ','mong quán thêm người','nước vẫn ngon']],
  timeout:[['Đợi mãi không ai làm','Chờ lâu quá','Đứng cả buổi không tới lượt','Không ai để ý mình','Chờ muốn mọc rễ','Xếp hàng mỏi chân','Đợi gần chục phút','Quán đông mà làm chậm','Gọi món xong không thấy đâu','Chờ hoài không có nước'],
            ['bỏ về luôn','đi quán khác','thôi khỏi uống','hết kiên nhẫn','lần sau không ghé','buồn ghê','mất hứng luôn','về tay không','tiếc thời gian','quá thất vọng']],
  wrong:[['Làm sai món','Gọi một đằng ra một nẻo','Kêu {mon} mà đưa nhầm','Quán nhầm đơn','Đưa sai ly','Làm lộn topping','Thiếu topping dặn trước','Pha sai loại trà'],
         ['nhận ly mà không ưng ý','uống tạm chứ hơi bực','lần sau cẩn thận nha','nhân viên cần tập trung hơn','uống đỡ chứ trừ sao thẳng tay']],
  cheap:[['Giá rẻ mà ngon','Giá sinh viên','Rẻ bất ngờ','{mon} giá mềm','Ly to mà rẻ','Giá dễ thương'],
         ['quá hời','ủng hộ dài dài','chất lượng xịn','mai rủ bạn tới','đáng đồng tiền','ghé hoài luôn']],
  soldout:[['Quán hết %','Tới mua mà hết %','Hết % sớm quá','Muốn uống % mà hết','Tới nơi mới biết hết %'],
           ['tiếc ghê','chuẩn bị nhiều hơn nha','lần sau tới sớm vậy','buồn xíu','đành uống món khác','hụt hẫng ghê']],
  soldoutPartial:[['Được vài ly đầu ngon lành','Uống dở đơn thì hết %','Nhóm mình chỉ đủ % cho một nửa','Ly đầu ổn, tới lượt sau thì hết %','Quán làm được kha khá ly rồi mới hết %'],
           ['tiếc là chưa đủ đơn','cũng đỡ tiếc phần nào','đành chia nhau vậy','thông cảm được','mong quán chuẩn bị dư ra']],
  soldoutOnl:[['Đặt app mà quán hết %','Đơn online bị huỷ vì hết %','Order qua app mới biết hết %','Quán báo hết % sau khi nhận đơn'],
           ['tiếc ghê','đành đặt quán khác','mong quán cập nhật menu','lần sau đặt sớm hơn','hơi buồn']],
  refused:[['Quán không bán cho mình','Bị từ chối','Tự nhiên không bán','Đứng chờ rồi bị từ chối'],
           ['hơi buồn','lần sau không ghé','kỳ ghê','không hiểu sao luôn','mất công ghé']],
  late:[['Tài xế chờ lâu quá','Giao trễ','Đặt app mà chờ lâu','Shipper phải đợi quán','Đơn làm chậm'],
        ['nước nhạt hết','lần sau đặt quán khác','đá tan hết rồi','mất hứng','không đặt nữa']],
  pricey:[['Giá hơi chát','{mon} ngon mà hơi đắt','Giá cao so với khu này','Ly nhỏ mà giá cao'],
          ['chắc không quay lại','mong giảm giá chút','uống một lần thôi','ví mỏng quá']],
  comfort:[['Thấy nhân viên làm túi bụi tội nghiệp ghê','Quán đông khách làm không ngơi tay thương xỉu','Làm nhiều đơn quá đuối thấy tội nghiệp','Nhìn bạn pha chế chạy đơn toát mồ hôi thương ghê','Thấy các bạn làm việc cật lực từ sáng tới tối'],
           ['lỡ tay chút không sao vẫn tặng 5★ động viên','đổi ly mới ngon lành là vui rồi chấm 5 sao nha','ai nỡ đánh giá kém bao giờ tặng 5★ cho có động lực','nước mới rất vừa miệng 5 sao khích lệ tinh thần','ly nước mới tinh chuẩn vị 10 điểm ủng hộ quán']]
};
/* Nhận xét dài kiểu Google Maps: câu mở + chi tiết + câu kết (tự viết, không lấy từ đánh giá thật) */
const LONG={
  great:[['Lần đầu ghé {shop} mà ưng dữ lắm.','Đi ngang thấy quán xinh nên ghé thử.','Được bạn giới thiệu nên hôm nay qua uống thử.','Quán ruột của mình mấy tháng nay rồi.','Hôm nay trời nóng ghé làm ly {mon} cho mát.','Order {mon} size lớn mang đi.','Ghé quán sau giờ tan làm.','Mình khó tính chuyện trà sữa lắm mà quán này qua được vòng gửi xe.'],
    ['{Mon} vị trà đậm, ngọt vừa phải chứ không bị gắt, {top} dai mềm vừa tới.','Trà thơm, sữa béo mà không bị ngấy, uống tới giọt cuối vẫn thấy ngon.','{Top} nấu vừa chín, không bị cứng, ăn chung với trà rất hợp.','Nhân viên nhiệt tình, nhớ luôn mức đường mình hay uống.','Làm nước nhanh, đông khách mà chờ chưa tới 5 phút.','Ly đầy đặn, đá không bị nhiều quá, uống đã khát.','Quán sạch sẽ, có chỗ để xe, nhạc nhẹ ngồi chill rất ok.','Giá hợp lý so với chất lượng, size L mà uống no luôn.'],
    ['Chắc chắn sẽ quay lại.','Sẽ rủ hội bạn ghé tiếp.','5 sao không có nhưng.','Recommend món này cho ai lần đầu tới.','Mong quán giữ được chất lượng như vầy.','Tuần sau ghé thử thêm món khác.']],
  ok:[['Ghé quán buổi chiều, không đông lắm.','Uống thử {mon} theo lời giới thiệu.','Quán gần nhà nên hay ghé.','Order mang đi cho cả nhà.'],
    ['Nước ngon, nhưng mình thấy hơi ngọt dù đã chọn ít đường.','{Top} ổn, chỉ là hơi ít so với giá.','Vị ổn định, không có gì để chê nhiều.','Nhân viên dễ thương nhưng làm hơi chậm xíu.','Đá hơi nhiều nên uống một lúc là nhạt.'],
    ['Nhìn chung vẫn ok, sẽ quay lại.','Cho 4 sao, lần sau thử món khác xem sao.','Tạm hài lòng.','Cải thiện chút nữa là 5 sao liền.']],
  meh:[['Lần đầu ghé thử.','Nghe review khen nên tới thử.','Ghé mua mang về.'],
    ['{Mon} hơi nhạt, vị trà không rõ lắm.','{Top} hơi mềm, không được dai như mong đợi.','Ngọt khá gắt so với khẩu vị của mình.','Ly hơi nhỏ so với giá tiền.','Không gian bình thường, hơi nóng.'],
    ['Chắc không quay lại lắm.','Cũng tạm, không có gì đặc biệt.','Mong quán cải thiện thêm.','Uống một lần biết thôi.']],
  bad:[['Hơi thất vọng với lần ghé này.','Mua về mà uống không hết.','Lần này uống không được như lần trước.'],
    ['{Top} bị cứng, cảm giác như để từ hôm qua.','{Mon} có vị lạ, không giống lần trước uống.','Trà bị đắng, sữa thì loãng.','Ly đưa ra bị đổ ra ngoài, dính tay.'],
    ['Không quay lại.','Tiếc tiền ghê.','Mong quán xem lại chất lượng.']],
  wait:[['Giờ cao điểm quán đông kinh khủng.','Ghé buổi trưa, khách xếp hàng dài.','Order xong đứng chờ khá lâu.'],
    ['Chờ gần 15 phút mới có nước, nhân viên có vẻ không kịp tay.','Quán có một bạn pha nên hơi đuối, nhưng nước ra vẫn đúng vị.','Đợi lâu nên đá tan bớt, vị hơi nhạt so với lần trước.','Khách online với khách tại quầy chen nhau nên hơi rối.','Nước thì ngon nhưng chờ lâu quá, đứng mỏi cả chân.','{Mon} vẫn ngon như mọi lần, chỉ là phải đợi hơi lâu.'],
    ['Mong quán thêm người vào giờ đông.','Trừ 1 sao vì chờ lâu.','Lần sau chắc ghé giờ vắng hơn.']],
  timeout:[['Đứng chờ mãi mà không tới lượt.','Order xong không ai làm cho mình.','Quán đông mà nhân viên xoay không kịp.'],
    ['Chờ gần 20 phút vẫn chưa thấy nước đâu nên đành bỏ về.','Nhìn quầy thấy ly của mình nằm đó mà không ai làm tiếp.','Đứng muốn mỏi chân, cuối cùng phải đi mua chỗ khác.','Trễ giờ học nên không đợi nổi nữa.','Gọi hai ba lần mà nhân viên cứ lo ly khác.','Khách tới sau còn được làm trước, hơi bực.','Hỏi thì nhân viên bảo chờ xíu, xíu mãi không thấy.'],
    ['Thất vọng, không quay lại.','Mất thời gian ghê.','Lần sau đi quán khác.']],
  wrong:[['Order {mon} mà đưa nhầm món khác.','Kêu ít đường mà đưa ly ngọt lịm.','Đưa nhầm ly của bàn bên cạnh.','Mình dặn rõ mà vẫn làm sai.','Uống tạm vì lỡ nhận nhưng quán làm thiếu topping.','Nhận ly thấy sai loại trà nhưng đang vội nên cầm luôn.'],
    ['Phải chấp nhận uống tạm ly làm sai.','Topping bị thiếu hoặc sai món so với lúc gọi.','Nước sai loại trà, topping dặn một đằng làm một nẻo.','Quán làm ẩu, thiếu topping và lộn nước uống không ưng ý chút nào.'],
    ['Mong quán cẩn thận hơn.','Trừ sao vì làm sai.','Lần sau chắc phải dặn kỹ hơn.','Đánh giá 1-2 sao cho quán nhớ kiểm tra trước khi giao.']],
  pricey:[['Giá hơi cao so với mặt bằng chung.','Ly {mon} giá khá chát.'],
    ['Vị thì ổn nhưng không tới mức đáng giá như vậy.','Size L mà ly nhỏ hơn quán khác, topping cũng ít.'],
    ['Chắc thỉnh thoảng mới ghé.','Mong quán điều chỉnh giá.','Hợp túi tiền hơn chút là quay lại liền.']],
  cheap:[['Giá quá hợp lý luôn.','Đang tìm quán rẻ mà ngon thì gặp {shop}.'],
    ['{Mon} size L mà giá mềm hơn chỗ khác, topping đầy đặn.','Sinh viên như mình uống mỗi ngày cũng được.'],
    ['Sẽ ủng hộ dài dài.','Rủ cả lớp tới liền.','Quá hời, 5 sao.']],
  late:[['Đặt qua app mà chờ lâu quá.','Tài xế báo phải đợi quán làm nước.'],
    ['Tới tay thì đá tan hết, trà nhạt thếch.','Gần một tiếng mới nhận được ly.'],
    ['Lần sau đặt quán khác.','Không đặt nữa.','Mong quán ưu tiên đơn online hơn.']],
  comfort:[['Quán đông nghẹt khách, nhân viên làm liên tục không ngơi nghỉ.','Thấy bạn pha chế làm túi bụi chạy đơn nhìn tội nghiệp ghê.','Giờ cao điểm đơn dồn dập, nhân viên làm quần quật mồ hôi nhễ nhại.'],
    ['Làm nhiều quá nên bạn lỡ tay một chút nhưng tự giác đổ ly làm lại ngay ly mới tinh tươm.','Tuy có chút sự cố nhỏ phải chờ làm lại nhưng ly {mon} mới rất chuẩn vị và thơm ngon.','Nhìn bạn nhân viên vội vàng pha lại ly mới mà thấy thương, làm việc rất có trách nhiệm.'],
    ['Không nỡ đánh giá kém vì thấy các bạn vất vả quá, cho 5 sao khích lệ tinh thần nhé!','Đánh giá 5★ động viên quán, chúc các bạn luôn vui vẻ và giữ gìn sức khoẻ!','Thương bạn nhân viên nên chấm 5★ tuyệt đối, cố lên nhé tiệm ơi!']]
};
const TAIL_MOOD={pos:[' 😍',' 🥰',' 🔥',' 💯',' 🧋',' ✨',' 😋',' 🤩',' ❤️',' 👏'],ok:[' 👍',' 🙂',' 😋',' 👌',''],mid:[' 😐',' 🤔',' 😅',''],neg:[' 😞',' 😤',' 💔',' 😢',' 🙁']};
const MOOD={great:'pos',cheap:'pos',comfort:'pos',sv_upsize:'pos',sv_downsize:'mid',ok:'ok',meh:'mid',wait:'mid',pricey:'mid',bad:'neg',wrong:'neg',timeout:'neg',soldout:'neg',soldoutPartial:'mid',soldoutOnl:'neg',refused:'neg',late:'neg'};
const TAIL={5:['',' 😍',' 🥰',' 🔥',' 💯',' 🧋',' ✨',' 😋'],4:['',' 👍',' 🙂',' 😋'],3:['',' 😐',' 🤔'],2:['',' 😞',' 😤'],1:['',' 😞',' 😤',' 💔']};

/* ---------- STATE ---------- */
const $=id=>document.getElementById(id);
const fmt=n=>{
  const a=Math.abs(n||0),sign=n<0?'−':'';
  if(a>=1e12){const v=a/1e12;return sign+(Math.round(v*100)/100).toLocaleString('vi-VN',{maximumFractionDigits:2})+'k tỉ'}
  if(a>=1e9){const v=a/1e9;return sign+(Math.round(v*100)/100).toLocaleString('vi-VN',{maximumFractionDigits:2})+' tỉ'}
  if(a>=1e6){const v=a/1e6;return sign+(Math.round(v*100)/100).toLocaleString('vi-VN',{maximumFractionDigits:2})+'tr'}
  if(a>=1e3){const v=a/1e3;return sign+(Math.round(v*10)/10).toLocaleString('vi-VN',{maximumFractionDigits:1})+'k'}
  return sign+Math.round(a)+'đ';
};
window.fmt=fmt;
const fmtBig=fmt;
const rnd=a=>a[Math.floor(Math.random()*a.length)];
const wpick=(arr,w)=>{let r=Math.random()*w.reduce((a,b)=>a+b,0);for(let i=0;i<arr.length;i++){r-=w[i];if(r<=0)return arr[i]}return arr[0]};
const newRec=d=>({spoil:{n:0,v:0},day:d,sales:{},tips:0,onl:0,fee:0,equip:[],ing:{},waste:{},rent:0,util:0,tax:0,served:0,lost:0,starSum:0,starN:0});
function fresh(){
  const s={lifeV:2,off:{},badPlan:mkBadPlan(1),money:CFG.startMoney,day:1,stock:{},unlocked:{},upg:{},upgLv:{tra:0,huong:0,top:0,equip:0,staff:0,onl:0},sell:{...DEF_SELL},reviews:[],served:0,best:0,totalRev:0,totalProfit:0,online:false,shopName:'',history:[],cur:newRec(1),yearRev:0,taxYear:0,gambleWon:0,gambleLost:0,gambleNet:0,friends:[],myCard:null,redeemedCodes:[],giftsReceivedToday:0,giftsDay:1,friendBuff:null,activeChallenge:null,trophies:[],bestDayRev:0,freeDrinkQueue:[],staffKpi:{},staffSalesDays:0,kpiPeriodStats:{},staffNames:{},staffAvatars:{}};
  Object.keys(ITEMS).forEach(k=>{s.stock[k]=[];s.unlocked[k]=ITEMS[k].unlock===0});
  return s;
}
let S, R={mode:'prep',tab:'kho',plan:{}}, cup, timer=null, uid=0;
Object.defineProperty(window, 'S', {
  get: () => S,
  set: (v) => { S = v; },
  configurable: true
});
window.getMoney = () => (S && typeof S.money === 'number') ? S.money : 0;
window.setMoney = (m) => { if (S) { S.money = m; head(); save(); } };
window.recordGamble = (won, lost) => {
  if (!S) return;
  if (won > 0) S.gambleWon = (S.gambleWon || 0) + won;
  if (lost > 0) S.gambleLost = (S.gambleLost || 0) + lost;
  S.gambleNet = (S.gambleWon || 0) - (S.gambleLost || 0);
  save();
};
function migrate(d){const u=d.unlocked||{};
  if(u.dao&&!u.f_dao){S.unlocked.hong=true;S.unlocked.f_dao=true}
  if(u.dau&&!u.f_dau)S.unlocked.f_dau=true;
  const refund={khoaimon:250000,tctrang:200000,pudding:250000,kemtrung:400000};
  Object.keys(refund).forEach(k=>{if(u[k])S.money+=refund[k]});
  ['khoaimon','dau','dao','tctrang','pudding','kemtrung','tradao','travai','chomchom','hatdac','hatchia','chanmeo','S'].forEach(k=>{delete S.stock[k];delete S.unlocked[k];delete S.sell[k]});
}
function loadFrom(d){
  if(!d||typeof d!=='object')return;
  const f=fresh();
  d.stock=d.stock||{};
  Object.keys(d.stock).forEach(k=>{
    if(typeof d.stock[k]==='number'){
      const q=d.stock[k];
      d.stock[k]=[];
      addStock(k,q,{day:d.day||1,stock:d.stock});
    }
  });
  d.sell=d.sell||{};
  d.unlocked=d.unlocked||{};
  S={...f,...d,stock:{...f.stock,...d.stock},sell:{...f.sell,...d.sell},unlocked:{...f.unlocked,...d.unlocked}};
  try{migrate(d);}catch(e){console.error('migrate error',e);}if(!S.stock.ice)S.stock.ice=[];if(!S.stock.sugar)S.stock.sugar=[];if(!d.cur)S.cur=newRec(S.day);if(S.seenLv==null)S.seenLv=levelOf(Math.max(1,S.day-1));if(S.evDay!==S.day)rollDay(S.day);S.hired=S.hired||{};STAFF.forEach(x=>{if(S.upg[x.id])S.hired[x.id]=true});if(S.upg.guard1&&S.upg.guard2)S.upg.guard1=false;if(S.upg.staff1&&S.upg.staff3)S.upg.staff3=false;if(S.online&&(!S.tablets||S.tablets<1))S.tablets=1;if(S.online){S.apps=S.apps||{};S.apps.sp=true;S.apps.tt=true;S.apps.be=true;S.apps.gr=true;}S.apps=S.apps||{};S.staffKpi=S.staffKpi||{};S.staffSalesDays=S.staffSalesDays||0;S.kpiPeriodStats=S.kpiPeriodStats||{};S.staffNames=S.staffNames||{};STAFF.forEach(x=>{if(S.hired[x.id]&&!S.staffNames[x.id])S.staffNames[x.id]=genName()});S.staffAvatars=S.staffAvatars||{};STAFF.forEach(x=>{if(S.staffAvatars[x.id]&&S.staffAvatars[x.id].includes('img/nv/b'))delete S.staffAvatars[x.id];if(S.hired[x.id]&&!S.staffAvatars[x.id]){const used=Object.values(S.staffAvatars);S.staffAvatars[x.id]=genStaffAvatar(used);}});syncFlav();if(d.totalProfit==null||d.totalProfit<0){const H=S.history||[];const profOp=H.reduce((a,r)=>{const ingV=Object.values(r.ing||{}).reduce((s,x)=>s+(x.v||0),0);const opC=(r.rent||0)+(r.util||0)+(r.wage||0)+(r.bad||0)+(r.loanInt||0)+(r.fee||0)+(r.tax||0)+ingV;return a+Math.max(0,recRev(r)-opC)},0);const minEst=Math.round((S.totalRev||0)*0.35);S.totalProfit=Math.max(0,profOp,minEst)}if(!(d.lifeV>=3)){Object.keys(ITEMS).forEach(k=>{(S.stock[k]||[]).forEach(b=>{if(b.exp<99999)b.exp=Math.max(b.exp,S.day+30)})});S.lifeV=3;save()}try{sanitize()}catch(e){}(S.reviews||[]).forEach(r=>{if(!r.k)r.k=(r.t||'').replace(/\p{Extended_Pictographic}|\uFE0F/gu,'').trim()});if(!d.badPlan){S.badPlan=mkBadPlan(S.day);save()};S.friends=S.friends||[];S.myCard=S.myCard||null;S.redeemedCodes=S.redeemedCodes||[];S.trophies=S.trophies||[];S.giftsReceivedToday=S.giftsReceivedToday||0;S.giftsDay=S.giftsDay||S.day;S.freeDrinkQueue=S.freeDrinkQueue||[];if(window.BanBe)window.BanBe.init();}
function load(){
  let raw = null;
  const candKeys = [SAVE, SAVE + '_persist', 'tsBak1', 'tsBak2', 'tsBak3', SAVE + '_rescue'];
  for(let k of candKeys){
    try{
      raw = localStorage.getItem(k);
      if(!raw) continue;
      const d = JSON.parse(raw);
      if(d && (d.stock || d.day || d.money != null)){
        loadFrom(d);
        try{ localStorage.setItem(SAVE, raw); localStorage.setItem(SAVE + '_persist', raw); }catch(e){}
        return true;
      }
    }catch(e){
      console.warn('Không thể nạp dữ liệu từ ' + k, e);
      if(k === SAVE && raw){
        try{ localStorage.setItem(SAVE + '_rescue', raw); }catch(err){}
      }
    }
  }
  S = fresh();
  rollDay(1);
  return false;
}
/* ---------- KHO THEO MẺ, CÓ HẠN DÙNG ---------- */
function addStock(k,q,st=S,allowInSale=false){if((R.running||R.mode==='sell')&&!allowInSale){toast('Đang trong giờ bán hàng, không thể nhập thêm nguyên liệu!');return}if(!q)return;st.stock[k]=st.stock[k]||[];const isFridgeIce=(k==='ice'&&st&&st.upg&&st.upg.fridge);const l=isFridgeIce?0:CFG.life[k],exp=l?st.day+l-1:99999,b=st.stock[k].find(x=>x.exp===exp);if(b)b.q+=q;else{st.stock[k].push({q,exp});st.stock[k].sort((a,c)=>a.exp-c.exp)}}
const qty=k=>(S&&S.stock&&S.stock[k])?S.stock[k].reduce((a,b)=>a+b.q,0):0;
/* hương có trong menu khi còn hàng trong chai */
function syncFlav(){FLAV_KEYS.forEach(k=>{if(S.off)delete S.off[k];S.unlocked[k]=qty(k)>0})}
const bottleCost=k=>Math.round(CFG.bottle*(evIs('sale')&&ev().k===k?.7:1));
function take(k){const b=S.stock[k].find(x=>x.q>0);if(!b)return false;b.q--;S.stock[k]=S.stock[k].filter(x=>x.q>0);return true}
function expireStock(){const out=[];Object.keys(S.stock).forEach(k=>{let q=0;S.stock[k]=S.stock[k].filter(b=>{if(k==='ice'&&S.upg&&S.upg.fridge)return true;if(b.exp<=S.day){q+=b.q;return false}return true});if(q)out.push({k,q,v:q*CFG.cost[k]})});return out}
function lifeTxt(k){if(k==='ice'&&S&&S.upg&&S.upg.fridge)return 'Vĩnh viễn (Tủ lạnh)';const l=CFG.life[k];return l?(l===1?'Dùng trong ngày':'Để được '+l+' ngày'):'Không hết hạn'}
const revCount=()=>Math.max(S.revTotal||0,(S.reviews||[]).length);
/* bản lưu gọn: bỏ khoá chống trùng của đánh giá (tự tính lại khi mở game), bản dự phòng chỉ giữ 300 đánh giá mới nhất */
function pack(maxRev){return JSON.stringify(S,function(k,v){if(this===S&&k==='reviews'){const a=maxRev?v.slice(0,maxRev):v;return a.map(r=>{const{k:_k,...o}=r;return o})}return v})}
function dropBaks(){['tsBak3','tsBak2','tsBak1',SAVE+'_rescue'].forEach(k=>{try{localStorage.removeItem(k)}catch(e){}})}
function save(){
  let js;
  try{ js = pack(); }catch(e){ R.noStore = true; return; }
  try{
    localStorage.setItem(SAVE, js);
    localStorage.setItem(SAVE + '_persist', js);
    R.noStore = false;
    return;
  }catch(e){}
  dropBaks();
  try{
    localStorage.setItem(SAVE, js);
    localStorage.setItem(SAVE + '_persist', js);
    R.noStore = false;
  }catch(e){
    R.noStore = true;
  }
}
/* thử xem máy có cho lưu không */
function storeOk(){try{localStorage.setItem('tsT','1');const ok=localStorage.getItem('tsT')==='1';localStorage.removeItem('tsT');return ok}catch(e){return false}}
function autoBak(){try{const cur=pack(300);const b1=localStorage.getItem('tsBak1'),b2=localStorage.getItem('tsBak2');
  try{if(b2)localStorage.setItem('tsBak3',b2);if(b1)localStorage.setItem('tsBak2',b1);localStorage.setItem('tsBak1',cur)}
  catch(e){/* đầy bộ nhớ: bỏ dự phòng cũ, ưu tiên giữ bản chính */['tsBak3','tsBak2'].forEach(k=>{try{localStorage.removeItem(k)}catch(e){}});try{localStorage.setItem('tsBak1',cur)}catch(e){try{localStorage.removeItem('tsBak1')}catch(e){}}}}catch(e){}}
const newCup=()=>({cost:0,size:null,sugar:null,ice:null,base:null,flav:null,tops:[],cheese:false,used:false,fill:0,sugarN:0,iceN:0,spill:false,mixed:false,sealed:false,vt:[],vi:[]});

/* ---------- ECONOMY ---------- */
const sellMax=k=>k==='L'?CFG.sizeCap:CFG.itemCap*2;
const ADD_WARN=20000,ADD_CAP=30000;/* hương, topping: trên 20k thì 80% khách không gọi, trên 30k thì không ai gọi */
const addOk=k=>sv(S.sell,k)<=ADD_CAP,addSkip=k=>sv(S.sell,k)>ADD_WARN&&Math.random()>=.2;
const sv=(sell,k)=>{const v=+sell[k];return isFinite(v)&&v>0?Math.min(v,sellMax(k)):0};
const price=(o,sell=S.sell)=>Math.max(10000,sv(sell,o.base)+(o.flav&&ITEMS[o.flav]?sv(sell,o.flav):0)+o.tops.reduce((a,t)=>a+sv(sell,t),0)+(o.cheese?sv(sell,'cheese'):0)+(o.size==='L'?sv(sell,'L'):0));
function sanitize(){
  Object.keys(S.sell).forEach(k=>{let v=+S.sell[k];if(!isFinite(v)||v<0)v=DEF_SELL[k]||0;S.sell[k]=Math.min(v,sellMax(k))});
  let bad=false;const fix=r=>{if(!r||!r.sales)return;let f=false;
    Object.entries(r.sales).forEach(([k,x])=>{if(x&&x.q>0&&!(x.a/x.q<=sellMax(k))){x.a=x.q*Math.min(DEF_SELL[k]||sellMax(k),sellMax(k));f=true}});
    if(f){bad=true;const sl=Object.values(r.sales).reduce((a,x)=>a+x.a,0);r.onl=Math.min(r.onl||0,sl);r.fee=Math.round(r.onl*CFG.commission/100);r.tax=Math.min(r.tax||0,Math.round(sl*(CFG.vat+CFG.pit)/100))}};
  (S.history||[]).forEach(fix);fix(S.cur);
  const cap=CFG.startMoney+S.day*15000000;
  if(bad||!isFinite(S.money)||S.money>cap){
    const H=S.history||[];
    const profOp=H.reduce((a,r)=>{const ingV=Object.values(r.ing||{}).reduce((s,x)=>s+(x.v||0),0);const opC=(r.rent||0)+(r.util||0)+(r.wage||0)+(r.bad||0)+(r.loanInt||0)+(r.fee||0)+(r.tax||0)+ingV;return a+Math.max(0,recRev(r)-opC)},0);
    const minEst=Math.round((S.totalRev||0)*0.35);
    S.totalProfit=Math.max(0,profOp,minEst);
    S.totalRev=H.reduce((a,r)=>a+recRev(r),0);S.yearRev=Math.min(S.yearRev||0,S.totalRev);
    if(!isFinite(S.money))S.money=cap+1;if(S.money>cap||bad)cheatHit();
    if(!isFinite(S.cur.tips)||S.cur.tips>cap)S.cur.tips=0;
    save()}
  S.gambleWon = S.gambleWon || 0;
  S.gambleLost = S.gambleLost || 0;
  S.gambleNet = S.gambleNet || 0;
  S.upgLv = S.upgLv || {tra:0, huong:0, top:0, equip:0, staff:0, onl:0};
  ['tra','huong','top','equip','staff','onl'].forEach(k=>{if(typeof S.upgLv[k]!=='number') S.upgLv[k]=0});
  (S.reviews || []).forEach(r => {
    if(r.freeDrinkNext && !r.freeDrinkDelivered) {
      r.freeDrinkActive = true;
    }
  });
  if(S.star5Count == null){
    if(S.bank && S.bank.cap && S.bank.cap > 10000000){
      const times = Math.round(Math.log(S.bank.cap / 10000000) / Math.log(1.10));
      S.star5Count = Math.max(1, times);
    } else if(rating() >= 4.95){
      S.star5Count = 1;
    } else {
      S.star5Count = 0;
    }
  }
  if(R){
    R.staffDayOff = {};
    R.staffLate = {};
  }
  if(typeof $ === 'function'){
    const cEl = $('card');
    if(cEl && cEl.innerHTML && (cEl.innerHTML.includes('DRAMA NHÂN SỰ') || cEl.innerHTML.includes('áp lực cạnh tranh'))){
      if($('modal')) $('modal').hidden = true;
      cEl.innerHTML = '';
    }
  }
}
const unitCost=o=>CFG.cost[o.base]+(o.flav&&ITEMS[o.flav]?CFG.cost[o.flav]:0)+o.tops.reduce((a,t)=>a+CFG.cost[t],0)+(o.cheese?CFG.cost.cheese:0)+CFG.cost.cup+(level()>=2&&o.ice&&o.ice!=='Không đá'?CFG.cost.ice:0)+(level()>=2&&o.sugar&&o.sugar>0?CFG.cost.sugar:0);
const priceIdx=o=>price(o)/price(o,DEF_SELL);
const overCap=o=>price(o)>(CFG.priceCap + Math.max(0, o.tops.length - 4) * 15000);
const pricyItems=()=>[...BASE_KEYS.filter(k=>S.unlocked[k]&&S.sell[k]>CFG.itemCap),...(S.sell.L>=CFG.sizeCap?['L']:[])];
const lPricey=()=>S.sell.L>CFG.sizeWarn;
const lChance=()=>S.sell.L>=CFG.sizeCap?0:lPricey()?.035:.35;
const upgCount=()=>UPG.filter(u=>S.upg[u.id]).length;
const wageDay=()=>STAFF.reduce((a,x)=>a+((S.upg[x.id] && !(R.staffDayOff && R.staffDayOff[x.id]))?CFG[x.wage]:0),0);
const fixed=()=>({rent:CFG.rent,util:CFG.utilBase+upgCount()*CFG.utilPerUpg+(S.upg&&S.upg.fridge?100000:0)});
function rating(){const r=(S.reviews||[]).slice(0,40);if(!r.length)return 4;return r.reduce((a,x)=>a+(x&&x.s!=null?+x.s:4),0)/r.length}
function starStr(v){const f=Math.max(0,Math.min(5,Math.round(v)));return f===0?'☆☆☆☆☆ (0★)':'★'.repeat(f)+'☆'.repeat(5-f)}
/* ---------- SỰ KIỆN & THỜI TIẾT ---------- */
const EVS={
  hot:{n:'Trời nóng',d:'Khách quầy đông hơn 35%, nhiều người gọi thêm đá giải nhiệt',ic:'upsnow',mul:1.35,onlMul:0.95},
  rain:{n:'Trời mưa',d:'Khách quầy giảm 35%, khách lười ra đường nên đơn online bùng nổ (+80%)',ic:'warn',mul:0.65,onlMul:1.80},
  cold:{n:'Trời se lạnh',d:'Khách chuộng các loại trà đậm vị, ít đá, thích thêm thạch & phô mai (+20% khách)',ic:'upsnow',mul:1.20,onlMul:1.05},
  storm:{n:'Trời bão lớn',d:'Mưa gió bão bùng! Khách tại quán giảm 50%, đơn online bùng nổ cực mạnh (+120%)',ic:'warn',mul:0.50,onlMul:2.20},
  sunny:{n:'Nắng đẹp dịu mát',d:'Thời tiết lý tưởng! Khách dạo phố ghé quán tấp nập (+40%), kiên nhẫn hơn',ic:'calendar',mul:1.40,onlMul:1.00},
  fog:{n:'Sương mù mát mẻ',d:'Khách chill ghé quán đông hơn (+20%), thích nhâm nhi trà olong & matcha',ic:'upsnow',mul:1.20,onlMul:1.00},
  humid:{n:'Nồm ẩm oi ả',d:'Thời tiết nồm ẩm khó chịu, khách ghé giải khát (+15%)',ic:'warn',mul:1.15,onlMul:1.10},
  weekend:{n:'Cuối tuần',d:'Khách đông hơn 30%, nhiều người mua 2-3 ly',ic:'calendar',mul:1.30,onlMul:1.25},
  students:{n:'Học sinh tan học',d:'Giữa ngày có một nhóm học sinh ghé cùng lúc (+15% khách)',ic:'people',mul:1.15,onlMul:1.05},
  reviewer:{n:'Food reviewer ghé quán',d:'Một khách đặc biệt: pha đúng được 3 review tốt, pha sai bị review xấu',ic:'star',mul:1.05,onlMul:1.00},
  trend:{n:'Món hot trên mạng',d:'% được gọi nhiều gấp đôi, khách tò mò ghé quán (+25%)',ic:'chartup',mul:1.25,onlMul:1.20},
  sale:{n:'Nhà cung cấp giảm giá',d:'Nhập % rẻ hơn 30% trong hôm nay',ic:'price',mul:1.00,onlMul:1.00},
  holiday:{n:'Ngày lễ',d:'Khách đông gấp đôi (+100%), tip gấp đôi',ic:'gift',mul:2.00,onlMul:1.60}
};
const GIFTS=[
  {n:'Lì xì từ mạnh thường quân',d:'Một vị khách quen thích quán nên gửi tặng',min:50000,max:200000},
  {n:'Trả lại ví cho khách',d:'Bạn nhặt được ví khách để quên và trả lại, khách gửi tiền cảm ơn',min:50000,max:150000},
  {n:'Giải quán đẹp khu phố',d:'Quán được bình chọn là quán dễ thương nhất khu',min:200000,max:300000,need:()=>upgCount()>=2},
  {n:'Nhãn hàng trà tài trợ',d:'Quán được đánh giá cao nên được nhãn hàng tài trợ',min:400000,max:600000,need:()=>S.reviews.length>=20&&rating()>=4.5},
  {n:'Bán ve chai, thùng carton',d:'Dọn kho bán được ít tiền',min:20000,max:60000},
  {k:'bung',n:'Công an trả tiền khách bùng',d:'Công an phường bắt được nhóm khách ôm ly bỏ chạy hôm trước, trả lại tiền cho quán',min:50000,max:200000,need:()=>(S.bungN||0)>0},
  {n:'Vé số trúng giải',d:'Một khách trả tiền trà sữa bằng tờ vé số, ai ngờ trúng giải',min:100000,max:500000},
  {n:'Nhà cung cấp hoàn tiền',d:'Lô nguyên liệu tuần trước giao thiếu, nhà cung cấp gửi trả lại tiền',min:50000,max:250000},
  {n:'Quán được bình chọn',d:'Quán được bình chọn trên mạng là quán trà sữa được yêu thích, nhận tiền thưởng',min:200000,max:500000,need:()=>S.reviews.length>=50&&rating()>=4.3},
  {n:'Cọc tiệc công ty',d:'Một công ty gần đây đặt trà sữa cho tiệc cuối tháng, gửi trước tiền cọc',min:150000,max:400000,need:()=>S.day>=15}
];
const ev=()=>S.ev&&S.evDay===S.day?S.ev:null;
const evIs=id=>{const e=ev();return !!e&&e.id===id};
const evText=e=>EVS[e.id].d.replace('%',e.k&&ITEMS[e.k]?low(ITEMS[e.k].n):'');
/* ===== HỆ THỐNG HỢP ĐỒNG ĐẶT TIỆC & ĐƠN LỚN ===== */
function rollPartyContract(d){
  if(d < 3) { S.partyContract = null; return; }
  const isSpecial = evIs('weekend') || evIs('holiday');
  const chance = isSpecial ? 0.75 : 0.45;
  if(Math.random() >= chance){
    S.partyContract = null;
    return;
  }
  const TYPES = [
    {
      type: 'birthday', icon: '🎂', typeLabel: 'Tiệc Sinh Nhật',
      titles: ['🎂 Tiệc Sinh Nhật Tuổi Mộng Mơ', '🎂 Tiệc Thôi Nôi Bé Cưng', '🎂 Sinh Nhật Bất Ngờ Cho Bạn Thân', '🎂 Tiệc Sinh Nhật Văn Phòng'],
      clients: ['Chị Mai (Mẹ bé Bin)', 'Anh Hoàng (Nhóm bạn thân)', 'Bé Trâm (Sinh viên)', 'Chị Vy (Trưởng ban sự kiện)']
    },
    {
      type: 'company', icon: '🏢', typeLabel: 'Tiệc Công Ty',
      titles: ['🏢 Tiệc Trà Chiều Công Ty Công Nghệ', '🏢 Tiệc Họp Khởi Động Dự Án Mới', '🏢 Chiêu Đãi Đối Tác & Khách Hàng', '🏢 Tiệc Trà Thứ Sáu Toàn Công Ty'],
      clients: ['Anh Đức (Giám đốc dự án)', 'Chị Lan (Trưởng phòng Nhân sự)', 'Anh Minh (Team Leader IT)', 'Chị Thảo (Admin văn phòng)']
    },
    {
      type: 'alumni', icon: '🎓', typeLabel: 'Họp Lớp & Hội Khóa',
      titles: ['🎓 Liên Hoan Họp Lớp Niên Khóa Cũ', '🎓 Tiệc Tri Ân Thầy Cô Giáo', '🎓 Họp Mặt Hội Đồng Hương', '🎓 Tiệc Mừng Tốt Nghiệp Ra Trường'],
      clients: ['Anh Tuấn (Lớp trưởng K45)', 'Chị Hương (Ban liên lạc hội khóa)', 'Bạn Duy (Bí thư đoàn khoa)', 'Chị Ngọc (Đại diện cựu học sinh)']
    },
    {
      type: 'sports', icon: '⚽', typeLabel: 'Hội Thao & Giải Đấu',
      titles: ['⚽ Giải Bóng Đá Giao Hữu Công Ty', '🏸 Giải Cầu Lông Mở Rộng Cuối Tuần', '🏃 Tiệc Mừng Hoàn Thành Giải Marathon', '🏀 Giao Lưu Thể Thao Thanh Niên'],
      clients: ['Anh Thắng (Đội trưởng bóng đá)', 'Anh Dũng (Ban tổ chức hội thao)', 'Chị Phương (CLB Thể thao)', 'Anh Kiên (Đội cổ vũ)']
    },
    {
      type: 'festival', icon: '🎊', typeLabel: 'Lễ Hội & Khai Trương',
      titles: ['🎊 Tiệc Mừng Khai Trương Cửa Hàng Bạn', '🎊 Tiệc Workshop Sáng Tạo Cuối Tuần', '🎊 Hội Chợ Ẩm Thực Khu Phố', '🎊 Tiệc Tri Ân Khách Hàng Thân Thiết'],
      clients: ['Chị Hằng (Chủ shop thời trang)', 'Anh Quang (Ban điều hành phố đi bộ)', 'Chị Yến (Tổ chức sự kiện cộng đồng)', 'Anh Hưng (Nghệ nhân gốm)']
    }
  ];

  const tInfo = rnd(TYPES);
  const title = rnd(tInfo.titles);
  const client = rnd(tInfo.clients);

  let cups;
  if(d <= 10) cups = 8 + Math.floor(Math.random() * 5); // 8 - 12 ly
  else if(d <= 30) cups = 14 + Math.floor(Math.random() * 7); // 14 - 20 ly
  else if(d <= 60) cups = 22 + Math.floor(Math.random() * 9); // 22 - 30 ly
  else cups = 30 + Math.floor(Math.random() * 16); // 30 - 45 ly

  const avgCupPrice = 28000;
  const totalVal = cups * avgCupPrice;
  const deposit = Math.round((totalVal * 0.35) / 10000) * 10000;
  const payout = Math.round((totalVal * 0.65) / 10000) * 10000;
  const bonus = Math.round((totalVal * 0.25) / 10000) * 10000;

  S.partyContract = {
    id: 'pc_' + d + '_' + Date.now(),
    day: d,
    type: tInfo.type,
    icon: tInfo.icon,
    typeLabel: tInfo.typeLabel,
    title,
    client,
    cups,
    deposit,
    payout,
    bonus,
    accepted: false,
    rejected: false,
    served: 0,
    completed: false
  };
}

function partyContractCard(){
  const pc = S.partyContract;
  if(!pc || pc.day !== S.day || pc.rejected) return '';

  if(!pc.accepted){
    return `
    <div class="party-contract-card" id="partyContractCard">
      <div class="party-header">
        <span class="party-badge">${pc.icon} ${pc.typeLabel}</span>
        <span class="party-deadline">⏰ Giao trong ca hôm nay</span>
      </div>
      <div class="party-title">${pc.title}</div>
      <div class="party-client">👤 Đại diện đặt: <b>${esc(pc.client)}</b> · Số lượng: <b style="color:#ea580c;font-size:1.05rem;">${pc.cups} ly trà</b></div>
      <div class="party-finance">
        <div class="p-fin-box deposit">
          <small>Cọc nhận ngay</small>
          <b>+${fmt(pc.deposit)}</b>
        </div>
        <div class="p-fin-box payout">
          <small>Thanh toán kết ca</small>
          <b>+${fmt(pc.payout)}</b>
        </div>
        <div class="p-fin-box bonus">
          <small>Thưởng hoàn thành</small>
          <b>+${fmt(pc.bonus)}</b>
        </div>
      </div>
      <div class="party-desc">
        ✨ <i>Nhận cọc <b>${fmt(pc.deposit)}</b> ngay để chuẩn bị nguyên liệu. Trong ca, mỗi ly trà pha bán hoặc đóng gói đều tính vào đơn tiệc. Giao đủ <b>${pc.cups} ly</b> để nhận thêm <b>+${fmt(pc.payout + pc.bonus)}</b> và đánh giá 5★ VIP!</i>
      </div>
      <div class="party-actions">
        <button class="sbtn pri party-accept-btn" id="btnAcceptParty">✍️ Ký hợp đồng & Nhận cọc ngay (+${fmt(pc.deposit)})</button>
        <button class="sbtn ghost party-reject-btn" id="btnRejectParty">Bỏ qua</button>
      </div>
    </div>`;
  } else {
    return `
    <div class="party-contract-card accepted" id="partyContractCard">
      <div class="party-header">
        <span class="party-badge">${pc.icon} ${pc.typeLabel}</span>
        <span class="party-status">✅ ĐÃ KÝ HỢP ĐỒNG · ĐÃ NHẬN CỌC ${fmt(pc.deposit)}</span>
      </div>
      <div class="party-title">${pc.title}</div>
      <div class="party-client">🎯 Chỉ tiêu ca hôm nay: <b>${pc.cups} ly trà</b> · Nhận thêm khi hoàn thành: <b style="color:#16a34a;">+${fmt(pc.payout + pc.bonus)}</b></div>
      <div class="party-tip">
        📦 <i>Mẹo: Hãy nấu sẵn đủ cốt trà & topping trong kho, sau đó bấm <b>"Mở cửa quán"</b>. Trong ca làm việc bạn có thể bấm <b>[📦 Đóng ly tiệc]</b> hoặc bán hàng bình thường để hoàn thành hợp đồng!</i>
      </div>
    </div>`;
  }
}

function acceptPartyContract(){
  if(!S.partyContract || S.partyContract.accepted) return;
  sfx('coin');
  S.partyContract.accepted = true;
  S.money += S.partyContract.deposit;
  save();
  head();
  toast(`🎉 Đã ký hợp đồng! Nhận trước ${fmt(S.partyContract.deposit)} tiền cọc vào két quán!`);
  renderPrep();
}

function rejectPartyContract(){
  if(!S.partyContract) return;
  sfx('tap');
  S.partyContract.rejected = true;
  save();
  toast('Đã từ chối đơn đặt tiệc hôm nay.');
  renderPrep();
}

function rollDay(d){
  let e=null;
  if(d>1&&d%30===0)e={id:'holiday'};
  else if(d>1&&(d%7===6||d%7===0))e={id:'weekend'};
  else {
    const pool=['hot','rain','cold','storm','sunny','fog','humid','students','reviewer','trend','sale'];
    const id=rnd(pool);
    e={id};
    if(id==='trend'){const b=BASE_KEYS.filter(k=>S.unlocked&&S.unlocked[k]);e.k=rnd(b.length?b:BASE_KEYS)}
    if(id==='sale'){const b=[...BASE_KEYS,...TOP_KEYS,...FLAV_KEYS].filter(k=>S.unlocked&&S.unlocked[k]);e.k=rnd(b.length?b:BASE_KEYS)}
  }
  S.ev=e;S.evDay=d;
  rollPartyContract(d);
  {/* khách khó ở: đúng 2 ngày ngẫu nhiên trong mỗi 60 ngày, lặp lại */
   const blk=Math.floor((d-1)/60);if(!S.moodPlan||S.moodPlan.blk!==blk){const a=[],lo=Math.max(3,blk*60+1);while(a.length<2){const x=lo+Math.floor(Math.random()*(blk*60+61-lo));if(!a.includes(x))a.push(x)}S.moodPlan={blk,days:a}}
   S.mood=S.moodPlan.days.includes(d)?'kho':(d>2&&Math.random()<.1?'vui':null)}
  if(d>2&&Math.random()<.1){const g=GIFTS.filter(x=>!x.need||x.need());const bg=g.find(x=>x.k==='bung');const x=bg&&Math.random()<.5?bg:rnd(g);S.gift={k:x.k||null,n:x.n,d:x.d,v:Math.round((x.min+Math.random()*(x.max-x.min))/5000)*5000}}else S.gift=null}
/* vay: ngân hàng (S.loan) và vay nóng (S.hot), trả góp 10 ngày, lãi tính theo năm 360 ngày */
const LOANS=[{id:'loan',n:'Vay ngân hàng',max:()=>CFG.bankMax,rate:()=>CFG.bankRate,opts:()=>[200000,500000,CFG.bankMax]},
  {id:'hot',n:'Vay nóng',max:()=>CFG.hotMax,rate:()=>CFG.hotRate,opts:()=>[1000000,2000000,CFG.hotMax],hide:1}];
const debts=()=>LOANS.filter(L=>S[L.id]&&S[L.id].left>0);
const inDebt=()=>debts().length>0;
function loanCard(){const ds=debts(),free=LOANS.filter(L=>!L.hide&&!(S[L.id]&&S[L.id].left>0));let h='';
  if(ds.length)h+=`<div class="evc loan"><span>${ico('money')}</span><div><b>Đang nợ</b><small>${ds.map(L=>{const x=S[L.id];return `${L.n}: còn ${x.left} ngày, mỗi ngày ${fmt(x.pay+x.int)} (lãi ${fmt(x.int)})`}).join('<br>')}<br>Đang nợ thì chưa mua được nâng cấp.</small></div><button class="sbtn" id="loanPay">Trả hết</button></div>`;
  if(free.length&&S.money<CFG.loanLow)h+=`<div class="evc loan"><span>${ico('money')}</span><div><b>Két sắp cạn tiền</b><small>${free.map(L=>L.n+' tối đa '+fmtTr(L.max())+', lãi '+L.rate()+'%/năm').join(' · ')}. Trả góp 10 ngày.</small></div><button class="sbtn pri" id="loanGo">Vay</button></div>`;
  return h}
function bindLoan(){const g=$('loanGo'),p=$('loanPay');
  if(g)g.onclick=()=>{const free=LOANS.filter(L=>!L.hide&&!(S[L.id]&&S[L.id].left>0)),btn=[];
    free.forEach(L=>L.opts().forEach(v=>{const d=Math.round(v/10),it=Math.round(v*L.rate()/100/360);btn.push([`${L.n} ${fmtTr(v)} · trả ${fmt(d+it)}/ngày`,()=>{S[L.id]={left:10,pay:d,int:it,amt:v};S.money+=v;save();toast('Đã nhận '+fmt(v));head();refreshPrep()},1])}));
    ask(`<div class="pbig">${ico('money')}</div><h2>Vay ngân hàng</h2><p>Trả góp trong 10 ngày, tiền trả tự trừ vào cuối mỗi ngày. Lãi tính theo năm (1 năm trong game là 360 ngày).</p><div class="lvs">${free.map(L=>`<div><b>${L.n}:</b> tối đa ${fmtTr(L.max())}, lãi ${L.rate()}%/năm</div>`).join('')}</div>`,[['Huỷ',()=>{}],...btn])};
  if(p)p.onclick=()=>{const due=debts().reduce((a,L)=>a+S[L.id].pay*S[L.id].left,0);ask(`<h2>Trả hết nợ?</h2><p>Trả ${fmt(due)} tiền gốc còn lại, không phải trả lãi những ngày sau.</p>`,[['Huỷ',()=>{}],['Trả hết',()=>{if(S.money<due){toast('Két không đủ tiền');return}S.money-=due;S.cur.loanOut=(S.cur.loanOut||0)+due;LOANS.forEach(L=>S[L.id]=null);save();toast('Đã trả hết nợ');head();refreshPrep()},1]])}}
const ecost=k=>CFG.cost[k]*(evIs('sale')&&ev().k===k?.7:1);
function evCard(){const e=ev();
  let h = !e ? '' : `<div class="evc"><span>${ico(EVS[e.id].ic)}</span><div><b>Hôm nay: ${EVS[e.id].n}</b><small>${evText(e)}</small></div></div>`;

  return h;
}
/* sự cố mất tiền: gian lận thì mất gần hết; người chơi thật 0–2 lần trong 90 ngày, mất dưới 1 triệu */
const BAD=[
  {id:'trom',n:'Trộm ghé quán!',ic:'sad',all:'Đêm qua trộm cạy két, lấy sạch tiền.',some:'Đêm qua trộm cạy két, lấy mất %.'},
  {id:'thue',n:'Rắc rối về thuế',ic:'receipt',all:'Cơ quan thuế phát hiện doanh thu không khớp sổ sách. Chủ quán trốn thuế, tài sản bị tịch thu.',some:'Nộp thuế chậm, quán bị phạt %.'},
  {id:'qltt',n:'Quản lý thị trường kiểm tra',ic:'warn',all:'Tiền mặt trong két quá lớn mà không chứng minh được nguồn gốc, bị tạm giữ toàn bộ.',some:'Đoàn kiểm tra nhắc lỗi vệ sinh quầy pha, quán bị phạt %.'},
  {id:'lua',n:'Bị lừa qua điện thoại',ic:'phone',all:'Kẻ gian giả danh ngân hàng gọi tới, chủ quán lỡ chuyển hết tiền trong két.',some:'Kẻ gian giả danh ngân hàng gọi tới, chủ quán lỡ chuyển %.'},
  {id:'coin',n:'"Đầu tư" tiền ảo',ic:'chartdown',all:'Chủ quán dồn hết tiền vào một sàn tiền ảo lạ. Sàn sập, mất trắng.',some:'Chủ quán thử "đầu tư" tiền ảo trên một sàn lạ, lỗ %.'}];
function mkBadPlan(start){const r=Math.random(),n=r<.3?0:r<.7?1:2,ids=BAD.map(b=>b.id).sort(()=>Math.random()-.5),days=[];
  while(days.length<n){const d=start+10+Math.floor(Math.random()*80);if(!days.includes(d))days.push(d)}
  days.sort((a,b)=>a-b);return {start,ev:days.map((d,i)=>({d,id:ids[i],done:false}))}}
/* két gian lận: gọi từ sanitize() lúc mở game hoặc luật "trước ngày X két trên Y" */
function cheatHit(){
  const keep=(1+Math.floor(Math.random()*9))*100000;
  let lost=Math.max(0,S.money-keep);
  const equipRed=Math.min(0.9,((S.upgLv&&S.upgLv.equip)||0)*0.01);
  if(equipRed>0)lost=Math.round(lost*(1-equipRed));
  S.money=Math.max(keep,S.money-lost);
  S.cur.stolen=(S.cur.stolen||0)+lost;
  S.badNow={id:rnd(BAD).id,all:1,v:lost,keep:S.money};
  save();
}

function badCheck(){
  if(S.day<CFG.thiefDay&&S.money>CFG.thiefMoney)cheatHit();


  if(!S.badNow&&S.badPlan){const e=S.badPlan.ev.find(x=>!x.done&&x.d<=S.day);
    if(e){e.done=true;if(S.day-e.d<=1){let v=Math.min(Math.round((200000+Math.random()*700000)/50000)*50000,Math.floor(S.money/3/1000)*1000);
      if(equipRed>0)v=Math.round(v*(1-equipRed));
      if(v>=10000){S.money-=v;S.cur.bad=(S.cur.bad||0)+v;S.badNow={id:e.id,v}}}save()}}
  const b=S.badNow;if(!b)return false;S.badNow=null;save();sfx('bad');const t=BAD.find(x=>x.id===b.id)||BAD[0];
  const title = b.n || t.n;
  const icon = b.ic || t.ic;
  const body = b.msg || (b.all?t.all:t.some.replace('%','<b>'+fmt(b.v)+'</b>'));
  ask(`<div class="pbig">${ico(icon)}</div><h2>${title}</h2><p>${body}</p>${b.all?`<p class="warnline">Trong két chỉ còn ${fmt(b.keep)}.</p>`:''}`,[['Buồn ghê',()=>{head();if(R.mode==='prep')refreshPrep()},1]]);return true}

/* chờ hết màn hình chào và hộp thoại khác rồi mới báo trộm / quà */

/* ===== HỆ THỐNG NHÂN SỰ: ĐÃ XOÁ BỎ HOÀN TOÀN DRAMA ===== */
function getActiveStaffList(){
  if(!S || !S.upg) return [];
  return STAFF.filter(u => S.upg[u.id]);
}

function staffDramaCheck(){}

function prepChecks(){
  if(R.mode!=='prep'||!$('splash').hidden)return;
  if(!$('modal').hidden){clearTimeout(R.pcT);R.pcT=setTimeout(prepChecks,500);return}
  if(storeCheck())return;
  if(badCheck())return;
  if(S.gift){giftCheck();return}
  staffDramaCheck();
  bakRemind();
}
function storeCheck(){
  if(R.loadErr){R.loadErr=false;ask(`<div class="pbig">${ico('warn')}</div><h2>Không đọc được tiến trình cũ</h2><p>Bản lưu trong máy bị lỗi nên game mở quán mới. Bản cũ vẫn được giữ lại, không bị xoá.</p><p>Vào <b>Cài đặt > Khôi phục bản tự lưu</b> để lấy lại, hoặc dán mã sao lưu nếu có.</p>`,[['Để sau',()=>{}],['Khôi phục ngay',autoRestoreDlg,1]]);return true}
  if((R.noStore||!storeOk())&&!R.noStoreWarned){R.noStore=true;R.noStoreWarned=true;
    ask(`<div class="pbig">${ico('warn')}</div><h2>Máy đang chặn lưu tiến trình</h2><p>Game chạy bình thường nhưng <b>tắt app là mất hết tiến trình</b>, mở lại sẽ về ngày 1.</p>
      <div class="lvs"><div><b>iPhone:</b> Cài đặt > Safari > tắt <b>Chặn tất cả cookie</b>. Không mở game bằng tab ẩn danh.</div><div>Kiểm tra thêm: Thời gian sử dụng > Giới hạn nội dung & quyền riêng tư, và bộ nhớ máy còn trống.</div><div>Trong lúc chưa sửa được, hãy <b>tạo mã sao lưu</b> trước khi tắt app để giữ tiến trình.</div></div>`,[['Đã hiểu',()=>{}],['Tạo mã sao lưu',backupDlg,1]]);return true}
  return false}
function bakRemind(){if(R.noStore||S.day<8||S.day-(S.bakDay||0)<7||S.day-(S.bakAsk||0)<7)return;S.bakAsk=S.day;save();
  ask(`<div class="pbig">${ico('box')}</div><h2>Sao lưu tiến trình nhé?</h2><p>Tạo mã sao lưu để giữ quán khi đổi máy, xoá app hay máy tự dọn dữ liệu. Chỉ mất vài giây.</p>`,[['Để sau',()=>{}],['Tạo mã',backupDlg,1]])}
function autoRestoreDlg(){$('card').onchange=null;
  const list=[['tsBak1','Cuối ngày gần nhất'],['tsBak2','Một ngày trước đó'],['tsBak3','Hai ngày trước đó'],[SAVE+'_rescue','Bản bị lỗi lúc mở game']].map(([k,n])=>{try{const r=localStorage.getItem(k);if(!r)return null;const d=JSON.parse(r);return d&&d.stock?{k,n,d}:null}catch(e){return null}}).filter(Boolean);
  if(!list.length){ask(`<h2>Chưa có bản tự lưu</h2><p>Game tự lưu mỗi cuối ngày. Nếu có mã sao lưu, dùng Khôi phục từ mã.</p>`,[['Đóng',showSettings],['Khôi phục từ mã',()=>restoreDlg(),1]]);return}
  ask(`<h2>Khôi phục bản tự lưu</h2><p>Chọn bản muốn lấy lại. Tiến trình hiện tại (ngày ${S.day}) sẽ bị thay thế.</p>`,[['Huỷ',showSettings],...list.map(x=>[`${x.n}: ${esc(x.d.shopName||'Tiệm Trà Mơ Ước')} · Ngày ${x.d.day} · ${fmt(x.d.money||0)}`,()=>applyRestore(x.d),1])])}
function applyRestore(d){try{localStorage.setItem(SAVE,JSON.stringify(d))}catch(e){}try{loadFrom(d)}catch(e){toast('Bản này bị lỗi, thử bản khác');return}save();R.plan={};R.tab='kho';document.title=shopName();renderPrep();toast('Đã khôi phục ngày '+S.day+(R.noStore?' (máy đang chặn lưu, nhớ tạo mã sao lưu)':''))}
function giftCheck(){if(!S.gift)return;sfx('lvup');const g=S.gift;S.gift=null;if(g.k==='bung')S.bungN=0;S.money+=g.v;S.cur.gift=(S.cur.gift||0)+g.v;save();
  ask(`<div class="pbig">${ico('gift')}</div><h2>${g.n}</h2><p>${g.d}</p><p class="lvup">+${fmt(g.v)} vào két</p>`,[['Tuyệt quá',()=>{head();refreshPrep()},1]])}
function getStaffTrafficBuffTotal(){
  if(!S || !S.staffKpi) return 0;
  return STAFF.reduce((acc, u) => {
    if(S.hired && S.hired[u.id] && S.upg && S.upg[u.id]){
      return acc + ((S.staffKpi[u.id] && S.staffKpi[u.id].trafficBuff) || 0);
    }
    return acc;
  }, 0);
}
/* ===== HỆ THỐNG ĐÓNG THUẾ TRỰC TUYẾN 72H (3 NGÀY THỰC) ===== */
const TAX_CYCLE_MS = 72 * 3600 * 1000; // 72h (3 ngày thực tế)
function initTaxState(){
  if(!S) return;
  if(!S.tax){
    S.tax = {
      paidAt: 0,
      expiresAt: Date.now() + TAX_CYCLE_MS, // 72h (3 ngày thực tế) ân hạn ban đầu
      rate: 0,
      amount: 0,
      totalPaid: 0,
      payCount: 0
    };
  }
}
function isTaxActive(){
  if(!S) return false;
  initTaxState();
  return S.tax.expiresAt && Date.now() < S.tax.expiresAt && S.tax.rate > 0;
}
window.isTaxActive = isTaxActive;
function isTaxOverdue(){
  if(!S) return false;
  initTaxState();
  if(!S.tax.expiresAt) return false;
  return Date.now() >= S.tax.expiresAt;
}
window.isTaxOverdue = isTaxOverdue;
function getTaxTrafficBoost(){
  if(isTaxActive()) return 1 + (S.tax.rate || 0.15);
  if(isTaxOverdue()) return 0.80; // Giảm 20% lượng khách khi nợ thuế
  return 1.0;
}
function getTaxSpeedBuff(){
  if(isTaxActive()) return (S.tax.rate || 0.15);
  if(isTaxOverdue()) return -0.20; // Nhân viên bất mãn giảm 20% tốc độ
  return 0;
}
function formatTaxTime(ms){
  if(ms <= 0) return '00:00:00';
  const totSec = Math.floor(ms / 1000);
  const h = Math.floor(totSec / 3600);
  const m = Math.floor((totSec % 3600) / 60);
  const s = totSec % 60;
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

/* ===== HỆ THỐNG TÀ TƯA BANK (TIẾT KIỆM KÉP AN TOÀN 7%) ===== */
function initBankState(){
  if(!S) return;
  if(!S.bank){
    S.bank = {
      cap: 10000000,          // Khởi điểm 10tr
      balance: 0,
      principal: 0,
      termDays: 7,            // Mốc kỳ hạn đặt trước
      daysPassed: 0,
      totalInterest: 0
    };
  } else {
    if(S.bank.cap == null) S.bank.cap = 10000000;
    if(S.bank.termDays == null) S.bank.termDays = 7;
    if(S.bank.daysPassed == null) S.bank.daysPassed = 0;
  }
}

function increaseBankCapOn5Star(){
  if(!S) return;
  initBankState();
  if((S.bank.cap || 10000000) < 1000000000){
    const oldCap = S.bank.cap || 10000000;
    const newCap = Math.min(1000000000, Math.round(oldCap * 1.10));
    S.bank.cap = newCap;
    toast(`⭐ Cán mốc 5.0 sao! Hạn mức gửi Tà Tưa Bank tăng 10% lên ${fmt(newCap)}! 🏦✨`, 5000);
    return newCap;
  }
  return S.bank.cap;
}

function checkMktAutoPayTax(){
  if(!S || !S.upg || !S.upg.staffMkt) return false;
  initTaxState();
  if(!S.tax.expiresAt) return false;
  const overdueMs = Date.now() - S.tax.expiresAt;
  // Tự động trích két đóng thuế ngẫu nhiên tuỳ hứng nếu quá hạn 12h để bảo vệ sổ tiết kiệm Tà Tưa Bank
  if(overdueMs < 12 * 3600 * 1000) return false;

  // Ngẫu nhiên tuỳ hứng (35% cơ hội kích hoạt mỗi lần kiểm tra)
  if(Math.random() > 0.35) return false;

  const money = S.money || 0;
  if(money < 1000) return false;

  // Trích két ngẫu nhiên tuỳ hứng từ 15% đến 25% két
  const pct = 15 + Math.floor(Math.random() * 11);
  const taxAmount = Math.max(1000, Math.round(money * (pct / 100)));
  const actualPaid = Math.min(money, taxAmount);

  S.money = Math.max(0, S.money - actualPaid);
  S.tax.expiresAt = Date.now() + TAX_CYCLE_MS; // Gia hạn thêm 72h (3 ngày thực)
  S.tax.rate = pct / 100;
  S.tax.amount = actualPaid;
  S.tax.lastPaidAt = Date.now();
  S.tax.totalPaid = (S.tax.totalPaid || 0) + actualPaid;
  S.tax.payCount = (S.tax.payCount || 0) + 1;
  save();

  const mktName = (S.staffNames && S.staffNames.staffMkt) || 'Me Két Tinh';
  toast(`📢 Nhân viên Me Két Tinh (${mktName}) tuỳ hứng trích ${pct}% két (${fmt(actualPaid)}) đóng thuế khi đã quá hạn 12h! Bảo vệ an toàn tuyệt đối sổ tiết kiệm Tà Tưa Bank! 🏦🛡️✨`, 7000, 1);
  return true;
}

function checkReset5StarRating(){
  if(!S || !(S.reviews && S.reviews.length >= 10)) return;
  const curR = rating();
  if(curR >= 4.95){
    S.star5Count = (S.star5Count || 0) + 1;
    increaseBankCapOn5Star();
    
    // Đạt 5 sao: phục hồi về 4 sao để cày tiếp, tránh 5 sao tổng liên tục
    const pool = [
      {s:4, t:'Trà sữa đậm đà vừa vặn, trân châu dẻo dai. Cho 4 sao để quán tiếp tục nỗ lực giữ vững phong độ!', n:'Hoàng Long'},
      {s:3, t:'Quán hôm nay đông quá nên chờ hơi lâu xíu, trà vẫn rất ngon nhưng cần nâng tốc độ phục vụ nhé!', n:'Khách quen chân thành'},
      {s:4, t:'Menu phong phú, nhân viên lễ phép dễ thương. Tặng 4 sao khích lệ quán ngày càng phát đạt!', n:'Thanh Mai'},
      {s:3, t:'Hôm nay vị trà hơi ngọt hơn mọi khi một chút, lần sau mình sẽ dặn 50% đường xem sao.', n:'Thảo Nguyên'},
      {s:4, t:'Chất lượng ổn định trong tầm giá, thích nhất là lớp kem trứng nướng béo ngậy. Cố lên tiệm ơi!', n:'Minh Quân'},
      {s:4, t:'Đóng gói cẩn thận mang về không bị đổ, ống hút và muỗng đầy đủ. 4 sao xứng đáng!', n:'Quốc Bảo'},
      {s:3, t:'Nước ngon nhưng đá tan hơi nhanh khi trời nắng nóng. Quán cải thiện giữ lạnh thì tuyệt vời!', n:'Ngọc Ánh'},
      {s:4, t:'Uống thường xuyên ở đây, rất hài lòng. Chúc quán luôn duy trì chất lượng đỉnh cao!', n:'Phương Linh'}
    ];

    const newItems = [];
    for(let i = 0; i < 20; i++){
      const template = pool[i % pool.length];
      const star = (i % 2 === 0) ? 3 : 4;
      newItems.push({
        s: star,
        origS: star,
        t: template.t,
        n: template.n,
        k: 'cycle4s_' + Date.now() + '_' + i,
        time: Date.now()
      });
    }
    S.reviews = [...newItems, ...S.reviews];

    // Cân bằng trung bình 40 review mới nhất về chính xác 4.0
    const top40 = S.reviews.slice(0, 40);
    const sum = top40.reduce((acc, r) => acc + (r.s != null ? +r.s : 4), 0);
    let diff = Math.round(sum - 40 * 4.0);
    if(diff > 0){
      for(let j = 0; j < newItems.length && diff > 0; j++){
        if(newItems[j].s > 3){
          newItems[j].s--;
          newItems[j].origS = newItems[j].s;
          diff--;
        }
      }
    } else if(diff < 0){
      for(let j = 0; j < newItems.length && diff < 0; j++){
        if(newItems[j].s < 5){
          newItems[j].s++;
          newItems[j].origS = newItems[j].s;
          diff++;
        }
      }
    }
    save();
    toast('Chúc mừng tiệm đạt 5 sao. Đánh giá khôi phục về 4 sao để tiếp tục cày', 4500, 1);
  }
}

function checkTaxBankPenalty(){
  if(!S) return;
  initBankState();
  if(isTaxOverdue()){
    if(checkMktAutoPayTax()) return;
    if(S.bank.balance > 0){
      const lost = S.bank.balance;
      S.bank.balance = 0;
      S.bank.principal = 0;
      S.bank.daysPassed = 0;
      save();
      ask(`
        <div class="pbig">🏛️⚖️</div>
        <h2 style="color:#dc2626;margin:4px 0 8px;">TÀ TƯA BANK TỊCH THU TIỀN TIẾT KIỆM</h2>
        <p style="font-size:0.92rem;line-height:1.55;color:#991b1b;">
          Do quán đã <b>quá hạn 12h không đóng thuế</b> (nợ thuế trực tuyến), theo quy định chế tài tài chính, Tà Tưa Bank đã <b>cưỡng chế tịch thu toàn bộ <b style="font-size:1.05rem;">${fmt(lost)}</b></b> tiền gửi tiết kiệm nộp phạt vào ngân sách quốc gia!
        </p>
        <p style="font-size:0.84rem;color:#64748b;">
          💡 Mẹo: Thuê nhân viên <b>Me Két Tinh</b> để tự động trích két đóng thuế cứu nguy khi quá hạn, bảo vệ an toàn sổ tiết kiệm!
        </p>
      `, [['Đã hiểu bài học quản trị', () => { if(R && R.mode === 'prep') renderPrep(); }, 1]]);
      toast(`🚨 BỊ TỊCH THU ${fmt(lost)} TIẾT KIỆM DO QUÊN ĐÓNG THUẾ!`, 6000, 1);
    }
  }
}

function openBankDepositDlg(){
  initBankState();
  checkTaxBankPenalty();
  const cap = S.bank.cap || 10000000;
  const curBal = S.bank.balance || 0;
  const remCap = Math.max(0, cap - curBal);
  const maxDeposit = Math.min(S.money, remCap);
  if(maxDeposit <= 0){
    if(S.money <= 0) return toast('Két tiền quán hiện không có tiền để gửi tiết kiệm!');
    return toast(`Đã đạt hạn mức tối đa của Tà Tưa Bank (${fmt(cap)})! Hãy kiếm thêm đánh giá 5★ để mở rộng hạn mức.`);
  }

  const terms = [
    { days: 7, label: '7 ngày (+7.2% lãi kép)' },
    { days: 14, label: '14 ngày (+15.0% lãi kép)' },
    { days: 21, label: '21 ngày (+23.2% lãi kép)' },
    { days: 28, label: '28 ngày (+32.1% lãi kép)' },
    { days: 35, label: '35 ngày (+41.7% lãi kép)' }
  ];
  let curTerm = S.bank.termDays || 7;
  let curAmt = Math.min(1000000, maxDeposit);

  const renderDlg = () => {
    ask(`
      <div style="text-align:left;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
          <span style="font-size:32px;">🏦</span>
          <div>
            <h2 style="margin:0;font-size:1.15rem;color:#065f46;">GỬI TIẾT KIỆM TÀ TƯA BANK</h2>
            <div style="font-size:0.78rem;color:#047857;">Lãi kép 1%/ngày · An toàn 100% không sợ trộm cắp</div>
          </div>
        </div>
        <div style="background:#f1f5f9;border-radius:10px;padding:8px 10px;font-size:0.84rem;margin-bottom:10px;">
          <div>💰 Két quán có: <b>${fmt(S.money)}</b></div>
          <div>🏦 Đang gửi: <b>${fmt(curBal)}</b> / Hạn mức: <b style="color:#059669;">${fmt(cap)}</b></div>
          <div>📊 Còn có thể gửi thêm: <b style="color:#2563eb;">${fmt(remCap)}</b></div>
          ${curBal > 0 ? `<div style="color:#059669;font-weight:700;margin-top:2px;">⏳ Tiến độ đang tích luỹ: <b>${S.bank.daysPassed || 0}/${S.bank.termDays || 7} ngày</b> (tiếp tục bảo lưu khi gửi thêm)</div>` : ''}
        </div>
        <label style="font-weight:700;font-size:0.84rem;">Số tiền muốn gửi tiết kiệm:</label>
        <div style="display:flex;gap:6px;align-items:center;margin:4px 0 8px;">
          <input type="number" id="bankInpAmt" min="10000" max="${maxDeposit}" step="50000" value="${curAmt}" style="flex:1;padding:8px;border:1.5px solid #cbd5e1;border-radius:8px;font-size:1rem;font-weight:800;">
          <button type="button" class="sbtn ghost" id="btnBankMaxAmt" style="padding:8px 12px;font-weight:800;">Tối đa</button>
        </div>
        <label style="font-weight:700;font-size:0.84rem;">Đặt mốc kỳ hạn rút tiền:</label>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin:6px 0 10px;">
          ${terms.map(t => `
            <button type="button" class="sbtn ${curTerm === t.days ? 'pri' : 'ghost'}" data-bank-term="${t.days}" style="padding:7px;font-size:0.78rem;font-weight:700;">
              ${t.label}
            </button>
          `).join('')}
        </div>
        <div style="font-size:0.75rem;color:#64748b;line-height:1.4;">
          ⚠️ <b>Quy tắc kỳ hạn:</b> Mỗi ngày bán nước sinh lời 1% lãi kép. Nếu rút trước mốc kỳ hạn đã đặt, bạn sẽ <b>mất toàn bộ tiền lãi</b> và chỉ nhận lại tiền gốc!
        </div>
      </div>
    `, [
      ['Xác nhận gửi tiền', () => {
        const inp = $('bankInpAmt');
        let amt = inp ? Math.round(+inp.value || 0) : curAmt;
        amt = Math.max(10000, Math.min(amt, maxDeposit));
        if(amt > S.money) return toast('Két quán không đủ tiền!');
        S.money -= amt;
        const hadDeposit = (S.bank.balance || 0) > 0;
        S.bank.balance = (S.bank.balance || 0) + amt;
        S.bank.principal = (S.bank.principal || 0) + amt;
        S.bank.termDays = curTerm;
        if(!hadDeposit){
          S.bank.daysPassed = 0;
        }
        save();
        head();
        paneThue();
        sfx('coin');
        toast(hadDeposit 
          ? `Đã gửi thêm ${fmt(amt)} vào sổ tiết kiệm! Tiến độ tiếp tục: ${S.bank.daysPassed || 0}/${curTerm} ngày! 🎉`
          : `Đã gửi ${fmt(amt)} vào Tà Tưa Bank kỳ hạn ${curTerm} ngày! 🎉`);
      }, 1],
      ['Hủy', () => {}]
    ]);

    setTimeout(() => {
      const maxBtn = $('btnBankMaxAmt');
      if(maxBtn){
        maxBtn.onclick = () => {
          const inp = $('bankInpAmt');
          if(inp){ inp.value = maxDeposit; curAmt = maxDeposit; }
        };
      }
      document.querySelectorAll('[data-bank-term]').forEach(b => {
        b.onclick = () => {
          curTerm = +b.dataset.bankTerm;
          renderDlg();
        };
      });
    }, 50);
  };

  renderDlg();
}

function openBankWithdrawDlg(){
  initBankState();
  checkTaxBankPenalty();
  if(!S.bank || !S.bank.balance || S.bank.balance <= 0){
    return toast('Sổ tiết kiệm hiện không có số dư để rút!');
  }
  const bal = S.bank.balance;
  const prin = S.bank.principal || bal;
  const interest = Math.max(0, bal - prin);
  const isMatured = (S.bank.daysPassed || 0) >= (S.bank.termDays || 7);

  if(isMatured){
    ask(`
      <div style="text-align:left;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
          <span style="font-size:32px;">🎉🏦</span>
          <div>
            <h2 style="margin:0;font-size:1.15rem;color:#15803d;">RÚT TIẾT KIỆM TỚI HẠN</h2>
            <div style="font-size:0.78rem;color:#16a34a;">Đã hoàn thành kỳ hạn ${S.bank.termDays} ngày bán nước</div>
          </div>
        </div>
        <div style="background:#f0fdf4;border:1.5px solid #86efac;border-radius:10px;padding:10px;font-size:0.86rem;line-height:1.5;margin:8px 0;">
          💰 <b>Tiền gốc:</b> ${fmt(prin)}<br>
          ✨ <b>Lãi kép 7%:</b> <b style="color:#15803d;">+${fmt(interest)}</b><br>
          💵 <b>Tổng tiền nhận về két:</b> <b style="color:#d97706;font-size:1.05rem;">${fmt(bal)}</b>
        </div>
        <div style="font-size:0.8rem;color:#475569;">
          Bạn có muốn rút toàn bộ số tiền tiết kiệm và lãi kép này về két quán không?
        </div>
      </div>
    `, [
      ['Rút trọn vẹn về két', () => {
        S.money += bal;
        S.bank.balance = 0;
        S.bank.principal = 0;
        S.bank.daysPassed = 0;
        save();
        head();
        paneThue();
        sfx('coin');
        sfx('lvup');
        toast(`🎉 Đã rút ${fmt(bal)} (bao gồm lãi kép ${fmt(interest)}) về két quán!`);
      }, 1],
      ['Để lại tiếp tục sinh lời', () => {}]
    ]);
  } else {
    ask(`
      <div style="text-align:left;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
          <span style="font-size:32px;">⚠️⏳</span>
          <div>
            <h2 style="margin:0;font-size:1.15rem;color:#dc2626;">CẢNH BÁO RÚT TRƯỚC HẠN</h2>
            <div style="font-size:0.78rem;color:#b91c1c;">Chưa đạt mốc kỳ hạn đã cam kết</div>
          </div>
        </div>
        <div style="background:#fef2f2;border:1.5px solid #fca5a5;border-radius:10px;padding:10px;font-size:0.86rem;line-height:1.5;margin:8px 0;">
          ⏳ <b>Tiến độ kỳ hạn:</b> Mới được <b>${S.bank.daysPassed || 0}/${S.bank.termDays || 7} ngày bán nước</b>.<br>
          💰 <b>Tiền gốc hoàn trả:</b> <b style="color:#0f172a;">${fmt(prin)}</b><br>
          ❌ <b>Tiền lãi bị huỷ (0% lãi suất):</b> <b style="color:#dc2626;">-${fmt(interest)}</b> (mất toàn bộ lãi kép)
        </div>
        <div style="font-size:0.8rem;color:#64748b;">
          Theo quy định Tà Tưa Bank, rút trước hạn sẽ <b>không có lãi suất</b>. Bạn chỉ nhận lại đúng số tiền gốc ban đầu. Bạn có chắc chắn muốn rút không?
        </div>
      </div>
    `, [
      ['Xác nhận rút gốc (Mất lãi)', () => {
        S.money += prin;
        S.bank.balance = 0;
        S.bank.principal = 0;
        S.bank.daysPassed = 0;
        save();
        head();
        paneThue();
        sfx('coin');
        toast(`Đã rút ${fmt(prin)} tiền gốc về két (mất lãi trước hạn).`);
      }, 1],
      ['Hủy, tiếp tục gửi', () => {}]
    ]);
  }
}

/* ===== HỆ THỐNG BẠN THÂN HÙA THEO ĐÁNH GIÁ 1 SAO ===== */
function triggerFriendBadReview(origRev){
  if(!origRev || origRev._friendCalled) return;
  origRev._friendCalled = true;
  const friendFirstNames = ['Linh', 'Trang', 'Huy', 'Tú', 'Khánh', 'Minh', 'Ngân', 'Bảo', 'Khoa', 'Vy', 'Châu', 'Đạt', 'Phương', 'Hoàng'];
  const friendFaces = ['👩‍🦰', '🧑‍🦱', '👩‍🦳', '👱‍♂️', '👩', '🧑', '👧', '👦'];
  const origName = origRev.n || 'Khách';
  const fName = rnd(friendFirstNames) + ' (Bạn của ' + origName + ')';
  const fFace = rnd(friendFaces);
  const friendQuotes = [
    `Nghe con bạn mình (${origName}) đi uống về kể bị quán phục vụ tệ bạc/chửi bới, tức giùm bạn luôn á! Vô đây chấm 1★ cùng bạn tẩy chay quán này! 😡👎`,
    `Bạn thân tui (${origName}) vừa ghé quán về khóc lóc vì nước dở tệ mà chủ quán còn thái độ! Hùa theo tặng 1★ cho tiệm sáng mắt ra! 😤🧋`,
    `Hội bạn tụi tui chính thức phong sát quán này! Nghe ${origName} mách làm ăn tắc trách, kéo nhau vô đây chấm 1★ cảnh cáo! 🚫🔥`,
    `Thấy bạn thân mình (${origName}) uất ức lên mạng bóc phốt là tui phải nhảy vô chấm 1★ phụ bạn liền! Làm ăn kiểu gì vậy trời?! 🤬💢`,
    `Bảo vệ quyền lợi bạn iu (${origName})! Nghe kể trải nghiệm kinh hoàng ở đây là tui cạch mặt luôn, 1★ xứng đáng! 🤮💩`,
    `Nhỏ bạn tui (${origName}) hiền lành mà đi uống về tức anh ách, cả hội bạn tụi tui kéo vô đây vote 1★ tiễn vong! 💩🚫`
  ];
  const fText = rnd(friendQuotes);
  const friendReview = {
    s: 1,
    t: fText,
    k: 'chime_' + Date.now() + '_' + Math.random(),
    d: S.day,
    o: false,
    n: fName,
    f: fFace,
    tg: '👥 Hùa theo bạn bè',
    isFriendChimeIn: true,
    targetFriendName: origName
  };
  S.reviews.unshift(friendReview);
  S.revTotal = Math.max(S.revTotal || 0, S.reviews.length - 1) + 1;
  if(S.reviews.length > 2500) S.reviews.length = 2500;
  R.today.stars.push(1);
  save();
  head();
  toast(`🚨 Khách ${origName} tức giận kêu gọi bạn thân (${fName}) vào đánh giá 1★ hùa theo!`, 5500, 1);
}
function getStaffSpeedBuff(id){
  if(!S) return 0;
  // 1. KPI Buff cá nhân (hoặc lấy buff KPI cao nhất của các nhân viên đang đi làm nếu id chung)
  let kpiBuff = 0;
  if(S.staffKpi){
    if(id && S.staffKpi[id] && typeof S.staffKpi[id].speedBuff === 'number'){
      kpiBuff = S.staffKpi[id].speedBuff;
    } else {
      const activeKpis = STAFF.filter(u => S.hired && S.hired[u.id] && S.upg && S.upg[u.id] && S.staffKpi[u.id])
        .map(u => S.staffKpi[u.id].speedBuff || 0);
      if(activeKpis.length) kpiBuff = Math.max(...activeKpis);
    }
  }
  // 2. Thuế Buff (đóng thuế 15% - 50% được hưởng trọn vẹn buff tốc độ pha chế)
  const taxBuff = typeof getTaxSpeedBuff === 'function' ? getTaxSpeedBuff() : 0;
  // 3. Nhân viên Marketing (Me két tinh): buff toàn bộ quán +20% tốc độ pha chế đúng như mô tả
  const mktBuff = (S.upg && S.upg.staffMkt) ? 0.20 : 0;
  // 4. Nâng cấp Level Nhân viên (+2% mỗi cấp độ trong tab Nâng cấp)
  const staffLv = (S.upgLv && S.upgLv.staff) || 0;
  const staffLvBuff = staffLv * 0.02;
  // 5. Nâng cấp Level Trang bị (+1% mỗi cấp độ trong tab Nâng cấp)
  const equipLv = (S.upgLv && S.upgLv.equip) || 0;
  const equipLvBuff = equipLv * 0.01;
  // 6. Drama Buff (sự kiện thưởng/phạt trong ngày)
  const dramaBuff = (R && R.staffDramaBuff && id && R.staffDramaBuff[id]) || 0;
  // 7. Đồng đội tương trợ: mỗi nhân viên đang làm việc tăng thêm 6% tốc độ
  const activeStaffCount = STAFF.filter(u => S.hired && S.hired[u.id] && S.upg && S.upg[u.id]).length;
  const synergyBuff = activeStaffCount > 1 ? (activeStaffCount - 1) * 0.06 : 0;
  // 8. Nội tại Gen Z: tăng 25% tốc độ pha chế so với các nhân viên khác
  const gzBaseBuff = (id === 'staffGz') ? 0.25 : 0;

  // Tổng hợp buff tốc độ - hưởng trọn vẹn 100% các nguồn nâng cấp, không bị cắt giảm 50%
  const totalBuff = kpiBuff + taxBuff + mktBuff + staffLvBuff + equipLvBuff + dramaBuff + synergyBuff + gzBaseBuff;
  // Cho phép tăng tốc tối đa lên tới +250% (nhanh gấp 3.5 lần), tối thiểu -40%
  return Math.max(-0.4, Math.min(2.5, totalBuff));
}
function getStaffBillBonusTotal(){
  if(!S || !S.staffKpi) return 0;
  return STAFF.reduce((acc, u) => {
    if(S.hired && S.hired[u.id] && S.upg && S.upg[u.id]){
      return acc + ((S.staffKpi[u.id] && S.staffKpi[u.id].billBonus) || 0);
    }
    return acc;
  }, 0);
}
const DEFAULT_STAFF_NAMES = {
  staff0: 'Hồ Khải',
  staff1: 'Lâm Phước',
  staff2: 'Lý Gia Huy',
  staffOn: 'Hoàng Minh',
  staff3: 'Đinh Nhàn'
};
function staffPersonName(id){
  if(DEFAULT_STAFF_NAMES[id]) return DEFAULT_STAFF_NAMES[id];
  if(!S) return '';
  S.staffNames = S.staffNames || {};
  if(!S.staffNames[id] && S.hired && S.hired[id]){
    S.staffNames[id] = genName();
  }
  return S.staffNames[id] || '';
}
function staffFullName(u){
  const p = staffPersonName(u.id);
  return p ? `${p} (${u.n})` : u.n;
}
const NV_AVATAR_LIST = [
  'img/imnv/b00.png', 'img/imnv/b01.png', 'img/imnv/b02.png',
  'img/imnv/b03.png', 'img/imnv/b04.png', 'img/imnv/b05.png',
  'img/imnv/b06.png', 'img/imnv/b07.png', 'img/imnv/b08.png',
  'img/imnv/b09.png', 'img/imnv/b10.png', 'img/imnv/b11.png',
  'img/imnv/b12.png', 'img/imnv/b13.png', 'img/imnv/b14.png'
];
function genStaffAvatar(exclude = []){
  const avail = NV_AVATAR_LIST.filter(a => !exclude.includes(a));
  const pool = avail.length ? avail : NV_AVATAR_LIST;
  return pool[Math.floor(Math.random() * pool.length)];
}
function staffAvatarUrl(id){
  if(!S) return NV_AVATAR_LIST[0];
  S.staffAvatars = S.staffAvatars || {};
  if(!S.staffAvatars[id] && S.hired && S.hired[id]){
    const used = Object.values(S.staffAvatars);
    S.staffAvatars[id] = genStaffAvatar(used);
  }
  return S.staffAvatars[id] || NV_AVATAR_LIST[0];
}
function staffAvatarImg(id, size = 42, extraStyle = ''){
  const url = staffAvatarUrl(id);
  return `<img src="${url}" class="staff-avt-img" style="width:${size}px;height:${size}px;border-radius:50%;object-fit:cover;display:inline-block;vertical-align:middle;box-shadow:0 2px 6px rgba(0,0,0,0.12);background:#fff;border:1.5px solid #e2e8f0;${extraStyle}" alt="nv">`;
}
function traffic(){
  const r=rating(),rf=(.55+(r-1)/4*.9)*Math.min(1,Math.max(.6,.6+(r-3.5)*.4))*(S.day<10?.8+.02*S.day:1);/* tăng khách mượt theo sao, 10 ngày đầu tăng từ từ */
  const gzBoost=(S.upg.staffGz&&!R.gzSulking)?2.2:1.2;
  const traBoost = 1 + ((S.upgLv && S.upgLv.tra) || 0) * 0.005;
  const friendBoost = (S.friendBuff && S.friendBuff.day === S.day) ? (1 + (S.friendBuff.boost || 0.15)) : 1.0;
  const kpiTrafficBoost = 1 + getStaffTrafficBuffTotal();
  const taxBoost = getTaxTrafficBoost();

  // Tăng trưởng khách theo ngày: Càng về sau quán càng nổi tiếng và đông khách
  let dayBoost = 0;
  if (S.day <= 10) {
    dayBoost = (S.day - 1) * 0.045; // 10 ngày đầu: +2.5% mỗi ngày
  } else if (S.day <= 30) {
    dayBoost = 9 * 0.025 + (S.day - 10) * 0.020; // Ngày 11-30: +2.0% mỗi ngày
  } else {
    dayBoost = 9 * 0.025 + 20 * 0.020 + (S.day - 30) * 0.016; // Ngày 31+: +1.6% mỗi ngày liên tục, không giới hạn trần!
  }

  // Buff kéo khách bùng nổ khi có Hợp đồng Đặt Tiệc hôm nay (+35%)
  const partyBoost = (S.partyContract && S.partyContract.day === S.day && S.partyContract.accepted) ? 1.35 : 1.0;
  // Buff nhân viên Marketing (Me két tinh): Tăng 20% khách ghé quán (+20%)
  const mktBoost = (S.upg && S.upg.staffMkt) ? 1.20 : 1.0;

  const boost=(1+(S.upg.sign?.2:0)+(S.upg.ads?.25:0)+(S.upg.mascot?.3:0)+dayBoost)*gzBoost*traBoost*friendBoost*kpiTrafficBoost*taxBoost*partyBoost*mktBoost;
  const avgIdx=BASE_KEYS.filter(k=>S.unlocked[k]).reduce((a,k)=>a+S.sell[k]/DEF_SELL[k],0)/BASE_KEYS.filter(k=>S.unlocked[k]).length;
  const e=ev();
  const weatherMul = e && EVS[e.id] ? EVS[e.id].mul : 1;
  const trf = rf*boost*weatherMul/Math.max(.85,Math.min(1,avgIdx)**2); 
  return Math.max(1.15, (trf || 1.15) * 1.35);
}
const RX={fast:/nhanh|chưa tới 5 phút|đúng giờ|không phải đợi/,
  wait:/chờ|đợi|lâu|chậm|mỏi chân|xếp hàng|hàng dài|quán đông|đông quá|đông khách|đông kinh|kịp tay|đuối|bận|cao điểm|trễ/,
  pNeg:/đắt|giá hơi|giá này|giá cao|hơi phí|phí tiền|tiếc tiền|chát so|giá khá chát|ví mình|ví mỏng|so với giá|mạnh tay|chùn tay|đáng với giá|đáng giá|túi tiền hơn|điều chỉnh giá|bảng giá|giảm giá|khuyến mãi|hai ly quán khác/,
  pPos:/giá hợp lý|giá sinh viên|giá mềm|giá tốt|rẻ|đáng tiền|giá ok|giá phải chăng|giá chấp nhận|hạt dẻ|hời|giá dễ thương|giá tâm lý|túi tiền sinh viên|chưa tới trăm/,
  wrong:/sai|nhầm|lộn|làm lại|đổi lại|thiếu topping|dặn kỹ|dặn rõ|một đằng/,
  k:{size:/size/,sugar:/đường|ngọt lịm/,ice:/đá/,tops:/topping/,mon:/nhầm|một đằng|sai vị|món khác/}};
function reviewFits(t,why,c){const f=c&&c.rf;if(!f)return true;const L=t.toLowerCase();
  if(RX.fast.test(L)){if(f.wait)return false}else if(RX.wait.test(L)&&!f.wait&&!['wait','timeout','late'].includes(why))return false;
  if(RX.pNeg.test(L)&&!f.pricey)return false;
  if(RX.pPos.test(L)&&f.pricey)return false;
  if(RX.wrong.test(L)&&!f.wrong&&why!=='comfort')return false;
  if(/đổ ra|rỉ ra|dính (hết )?tay|tràn/.test(L)&&!f.spill)return false;
  if(c.cups&&c.cups.every(o=>!o.tops.length)&&/topping|trân châu|thạch|foam|phô mai|sương sáo|cặp bài trùng/.test(L))return false;
  if(c.cups&&c.cups.every(o=>o.ice==null||o.ice==='Không đá')&&/đá (hơi nhiều|nhiều quá|tan|vừa đủ|viên)|ít đá như/.test(L))return false;
  if(/size l|ly to|ly nhỏ/.test(L)&&c.cups&&!c.cups.some(o=>o.size==='L'))return false;
  if(why==='wrong'&&c.wk){for(const k in RX.k)if(!c.wk[k]&&RX.k[k].test(L))return false}
  return true}
function reviewText(why,c,st,extra){
  const o=c&&c.cups?c.cups[0]:null,mon=o?low(dname(o)):'trà sữa';
  const top=o&&o.tops.length?low(ITEMS[o.tops[0]].n):'topping';
  const strip=t=>t.replace(/\p{Extended_Pictographic}|️/gu,'').trim();
  const recent=new Set(S.reviews.slice(0,60).map(r=>strip(r.t)));
  const cap=x=>x.charAt(0).toUpperCase()+x.slice(1);
  const fill=t=>{t=t.replace(/\{Mon\}/g,cap(mon)).replace(/\{Top\}/g,cap(top)).replace(/\{shop\}/g,'quán '+shopName()).replace(/\{mon\}/g,mon).replace(/\{top\}/g,top).replace('%',extra||mon);return t.charAt(0).toUpperCase()+t.slice(1)};
  const make=()=>{const L=LONG[why];if(L&&Math.random()<.5)return fill(L.map(x=>rnd(x)).join(' '));const P=PARTS[why];if(P)return fill(rnd(P[0])+', '+rnd(P[1]));return fill(rnd(TXT[why]))};
  const used=new Set(S.reviews.map(r=>r.k||strip(r.t)));
  const fits=x=>reviewFits(x,why,c);
  const pool=(TXT[why]||[]).map(fill).filter(x=>!used.has(strip(x))&&fits(x));
  let t=pool.length&&Math.random()<.75?rnd(pool):make();for(let n=0;n<80&&(used.has(strip(t))||!fits(t));n++)t=n<40&&pool.length?rnd(pool):make();
  if(!fits(t)){const any=(TXT[why]||[]).map(fill).filter(fits);t=any.length?rnd(any):t}
  if(!/\p{Extended_Pictographic}/u.test(t)){const lastTail=(S.reviews[0]&&S.reviews[0].t.match(/\p{Extended_Pictographic}+$/u)||[''])[0];
    const pool=TAIL_MOOD[MOOD[why]||'ok'].filter(x=>x.trim()!==lastTail);t+=rnd(pool.length?pool:TAIL_MOOD.ok)}
  return {t,k:strip(t)};
}
function addReview(st,why,online,c,extra){
  const sr=c&&c.star!=null, isFr=c&&c.isFriend;
  const isFrNeg = isFr && (['timeout','refused','soldout','soldoutPartial','soldoutOnl','wrong','late','bad'].includes(why) || st <= 2);
  if(why==='party'){
    const clientName = (extra && extra.name) || 'Ban Tổ Chức Tiệc';
    const pTitle = (extra && extra.partyTitle) || 'buổi tiệc';
    const cupsN = (extra && extra.cups) || 20;
    const partyReviews = [
      `🎉 Đặt tiệc ${pTitle} với ${cupsN} ly trà sữa ở quán, quá bất ngờ vì giao đúng giờ, trà thơm béo đậm vị, topping đầy ắp! Cả nhóm ai cũng tấm tắc khen. Quán uy tín 5 sao! ⭐⭐⭐⭐⭐`,
      `🎂 Tổ chức tiệc đặt cả chục ly trà của quán mà chất lượng đồng đều xuất sắc! Khách mời uống khen nức nở. Lần sau tiệc tùng nhất định lại ủng hộ quán tiếp! 🧋✨`,
      `🏢 Hợp đồng tiệc ${cupsN} ly chuẩn chỉnh từng ly một, đóng gói cẩn thận sạch sẽ. Rất cảm ơn chủ quán và các bạn nhân viên nhiệt tình chu đáo! Xứng đáng 5 sao chất lượng! 💖`
    ];
    const txt = rnd(partyReviews);
    S.reviews.unshift({s:5,t:txt,k:'party_'+Date.now()+Math.random(),d:S.day,o:false,n:clientName,f:'🎉',tg:'🎉 Đơn Đặt Tiệc',b:'tra',fl:null,tp:['tran'],ch:false,sz:'L'});
    S.revTotal=Math.max(S.revTotal||0,S.reviews.length-1)+1;if(S.reviews.length>2500)S.reviews.length=2500;R.today.stars.push(5);
    checkReset5StarRating();
    return;
  }
  if(why==='party_fail'){
    const clientName = (extra && extra.name) || 'Khách Đặt Tiệc';
    const pTitle = (extra && extra.partyTitle) || 'tiệc';
    const txt = `Quán nhận cọc đặt tiệc ${pTitle} mà đến giờ giao bị thiếu ly, làm lỡ hết kế hoạch của chúng tôi! Quá thất vọng về cách phục vụ, không bao giờ quay lại! 😡👎`;
    S.reviews.unshift({s:1,t:txt,k:'party_fail_'+Date.now()+Math.random(),d:S.day,o:false,n:clientName,f:'😤',tg:'⚠️ Phàn Nàn Tiệc',b:'tra',fl:null,tp:[],ch:false,sz:'M'});
    S.revTotal=Math.max(S.revTotal||0,S.reviews.length-1)+1;if(S.reviews.length>2500)S.reviews.length=2500;R.today.stars.push(1);
    checkReset5StarRating();
    return;
  }
  if(sr){
    st=5;
  } else if(isFr && !isFrNeg){
    st=5;
  }
  let frTxt;
  if(isFrNeg){
    const qPrefix = (c&&c.friendData&&c.friendData.quote) ? `"${c.friendData.quote}" - ` : '';
    if(why==='timeout'){
      frTxt = `${qPrefix}Tưởng qua ủng hộ bạn thân sẽ được ưu tiên, ai ngờ đứng đợi mỏi mòn không thấy nước đâu phải ôm bụng đói đi về! Trừ sao cảnh cáo nhé bạn iu! 😢👎`;
    } else if(why==='wrong'){
      frTxt = `${qPrefix}Bạn bè làm ăn thế này là chết rồi, order một đằng làm một nẻo! Uống ngụm nước mà tức á, cho ${st}★ để rút kinh nghiệm nhé! 😤🧋`;
    } else if(why==='refused'){
      frTxt = `${qPrefix}Cất công lặn lội ghé quán ủng hộ bạn iu mà bị từ chối không bán, hụt hẫng ghê luôn. Buồn người bạn này ghê á! 🥺💔`;
    } else {
      frTxt = `${qPrefix}Ghé ủng hộ quán bạn mình mà hết sạch nguyên liệu không làm được, thất vọng ghê. Lần sau chuẩn bị chu đáo hơn nha bạn thân! 😒🧋`;
    }
  } else {
    frTxt = (c&&c.friendData) ? `${c.friendData.quote?`"${c.friendData.quote}" - `:''}Trà của bạn mình pha chuẩn không cần chỉnh! Cả hội bạn đều mê ly ${c.cups&&c.cups[0]&&ITEMS[c.cups[0].base]?ITEMS[c.cups[0].base].n:'trà thơm béo'}! Chấm 5★ ủng hộ bạn iu! 🧋✨` : 'Trà của bạn mình pha ngon đỉnh chóp! 5 sao không có nhưng! 🧋✨';
  }
  const r=sr?(x=>({t:x[0]+' [Tự động dịch] '+x[1],k:'★'+c.star+Math.random()}))(starLine(STARS[c.star],'rv')):isFr?{t:frTxt,k:'friend_'+c.id+Math.random()}:reviewText(why,c,st,extra),o=c&&c.cups?c.cups[0]:null;
  S.reviews.unshift({s:st,t:r.t,k:r.k,d:S.day,o:!!online,...(sr?{st:c.star,tg:STARS[c.star].t}:{}),...(isFr?{tg:isFrNeg?'💔 Bạn Giận Dỗi':'👑 VIP Bạn Bè'}:{}),n:c?c.name:'Khách',f:(c&&c.face)||'🙂',b:o?o.base:null,fl:o?o.flav:null,tp:o?o.tops:[],ch:o?!!o.cheese:false,sz:o?o.size:'M'});
  S.revTotal=Math.max(S.revTotal||0,S.reviews.length-1)+1;if(S.reviews.length>2500)S.reviews.length=2500;R.today.stars.push(st);
  checkReset5StarRating();
  if(st <= 1 && (!c || !c.isFriend) && Math.random() < 0.35){
    setTimeout(() => { if(S.reviews && S.reviews[0]) triggerFriendBadReview(S.reviews[0]); }, 150);
  }
  const shouldGzSulk = (st<=2||['timeout','late','wrong','bad','refused','soldout','soldoutOnl','soldoutPartial'].includes(why)) || (isTaxOverdue() && st<=3 && Math.random()<0.35);
  if(S.upg.staffGz&&R.running&&!R.gzSulking&&shouldGzSulk)gzTriggerSulk(why,st);
  if(S.upg&&S.upg.staffMkt)applyMktAutoReplies();}


/* ===== NHÂN VIÊN ME KÉT TINH (MARKETING) ===== */
// 1. Phản hồi scandal Công An / Tiền Giả / Chụp mũ vu khống
const MKT_POLICE_TOXIC_QUOTES = [
  'Ủa alo bạn ơi? Công an đang làm nghiệp vụ truy bắt tội phạm tiền giả chứ ai rảnh mà vu khống? Người ngay cây không sợ chết đứng, bớt drama giùm! 😤👮',
  'Đúng nhận sai cãi hộ cái: Quán bảo vệ quyền lợi chính đáng báo công an vào cuộc, không liên quan thì né ra cho người ta làm việc chứ lên đây tế ai? 👊💢',
  'U là trời, công an đang kiểm tra đối tượng nghi vấn chứ ai chụp mũ bạn đâu mà giãy nảy lên? Bớt đóng vai quan toà online giùm tiệm nhen! 🤡🚫'
];
const MKT_POLICE_CALM_QUOTES = [
  'Dạ em đại diện bộ phận truyền thông của quán xin cúi đầu xin lỗi bạn và quý khách! Tình huống tiền giả bất ngờ khiến quán xử lý vụng về làm ảnh hưởng không khí của mọi người. Quán xin nghiêm túc rút kinh nghiệm sâu sắc ạ! 🥺🙏',
  'Dạ thay mặt quán, em xin nhận mọi thiếu sót trong khâu phối hợp với công an hôm nay ạ. Mong bạn và mọi người mở lòng thông cảm, quán cam kết chấn chỉnh quy trình minh bạch hơn! 🥤❤️',
  'Check var sự cố hôm nay quán em xin nhận lỗi 100%! Rất xin lỗi vì làm bạn bức xúc, quán xin gửi tặng bạn voucher tạ lỗi và mong bạn tiếp tục đồng hành cùng tiệm ạ! 🙇‍♂️✨'
];

// 2. Phản hồi cãi tay đôi trực diện với khách & mỏ hỗn (tính cách thất thường)
const MKT_TOXIC_QUOTES = [
  'Ủa alo bạn ơi? Bạn thích cãi tay đôi với tôi không? Bước ra đây solo nói chuyện chứ ngồi đó cào phím chê quán tôi dở hả? 👊🤬',
  'Tôi nhịn bạn nãy giờ rồi nha! Khách hàng là thượng đế chứ không phải bố thiên hạ, thích bóc phốt thì bước vô đây tiếp chiêu nè! 🥊🔥',
  'Ủa alo, tiệm bán trà sữa chứ có bán sự hài lòng cho người thích kiếm chuyện đâu? Bạn có vấn đề về vị giác thì đi khám tai mũi họng đi nha! 👃👅🚫',
  'Ủa rồi ai mượn bạn mua? Mua xong chê như đúng rồi! Trà sữa người ta nấu ngon thế này mà bảo dở, đúng là khẩu vị lạ đời! 🙄👎',
  'Nói một câu cãi một câu nè: Quán em chuẩn chỉnh 100%, bạn uống không hợp là do nết của bạn chứ đừng đổ lỗi tại ly trà sữa! 💅💥',
  'Ủa alo tính ăn vạ hả bạn? Uống hết sạch cả ly trà sữa lẫn trân châu rồi giờ lên chấm 1 sao? Trả lại ly nước đây rồi nói chuyện tiếp! 🧋👊',
  'Thích thì chiều, muốn cãi tay đôi thì admin tiếp tới sáng! Đừng tưởng chấm 1 sao là làm mẹ thiên hạ được nha bạn iu! 🤡🔥',
  'Ủa alo bạn ơi? Khách gì mà khó tính như mẹ chồng vậy trời! Tiệm trà sữa chứ có phải thẩm mỹ viện đâu mà soi từng giọt nước? Bớt overthinking lại giùm! 😤🚫',
  'Check var lại nết uống trà của bạn đi nha! Đã order ngọt 100% xong giờ lên mạng tế quán ngọt khé cổ? Bớt diễn nét nạn nhân đi bạn iu! 🤡🔥',
  'Đúng nhận sai cãi hộ cái: Đơn thì đặt trúng giờ cao điểm kẹt cứng xong lên đây khóc lóc bảo chờ lâu? Sống chậm lại cho đời bớt nghiệp nha! 👊💢',
  'Thứ khách mỏ hỗn phong sát người ta! Trà sữa ngon nuốt lưỡi mà chấm điểm kiểu gì vậy? Bớt toxic lại cho xã hội bình yên! 💩👎',
  'Đọc cái review mà huyết áp em tăng vọt! Khách ăn nói xà lơ, không thích thì lướt qua chứ ai ép bạn uống mà lên đây cào bàn phím? 😤🚫'
];

// Cãi tay đôi / bắt bẻ khách 3 sao
const MKT_AVG_ARGUE_QUOTES = [
  'Ủa bạn gì ơi? Đã khen ngon mà chấm 3 sao là sao? Tính bẫy tâm lý quán hả? Bước vô đây nói chuyện tay đôi coi sao trừ 2 sao của người ta? 🤨🥊',
  '3 sao không đủ mua sự hài lòng của tiệm nha! Nước pha chuẩn chỉnh mà chấm 3 sao lơ lửng, nết gì kì cục kẹo vậy bạn iu? 😤💥',
  'Ủa alo? Thích thì 5 sao không thích thì 1 sao chứ chấm 3 sao ba phải vậy ai chơi lại bạn? Trả treo với tiệm hoài nha! 🙄💅'
];

// Bắt bẻ trêu chọc khách khen 4-5 sao
const MKT_GOOD_ARGUE_QUOTES = [
  'Ủa bạn iu khen nức nở mà cho có 4 sao là sao? 1 sao còn lại bạn cất làm của hồi môn hay gì? Giải trình lẹ giùm em! 🤨❓',
  'Khen ngon đỉnh chóp mà bấm 4 sao? Em ghi sổ thù vặt rồi đó nha, mai ghé em trừ bớt trân châu cho biết mặt! 😤🧋',
  'Ủa alo 5 sao thì nói 5 sao chứ chấm 4 sao chi cho em overthinking cả đêm? Bắt đền bạn đó! 🧋💔',
  'Khen ngon quá trời quá đất mà nỡ lòng nào cho 4 sao hả trời? Thất thường y như em vậy á, cãi nhau một trận cho đã nư không? 🤣🥊'
];
const MKT_BAD_CALM_QUOTES = [
  'Dạ quán em nhận sai không cãi câu nào! Em xin phép gửi ngàn lời xin lỗi chân thành đến bạn iu, lần sau ghé quán em làm lại ly mới chuẩn vị bù đắp nha! 🥺🙏',
  'SOS tâm linh mách bảo hôm nay quán em phục vụ chưa trọn vẹn làm bạn iu phật ý! Cho em xin cơ hội sửa sai ở lần ghé tiếp theo nhé, mãi keo nha! 💖🧋',
  'Đọc review của bạn mà em xót xa ruột gan! Em xin nhận mọi góp ý để cải thiện chất lượng ngay lập tức, lần sau ghé quán em bù đắp thiệt hại nha! 🥤🙇‍♂️',
  'Quán em xin phép check var lại toàn bộ quy trình pha chế và rút kinh nghiệm sâu sắc. Đừng giận tụi em nữa nghen, thương thương! 🥺✨'
];

// 3. Phản hồi khách 3★ (Đánh giá trung bình)
const MKT_AVG_QUOTES = [
  'Dạ cảm ơn bạn iu đã ghé quán! Quán em xin ghi nhận góp ý và sẽ nâng cấp tay nghề để lần tới phục vụ bạn đạt điểm 5★ đỉnh nóc kịch trần luôn nha! 🥰🧋',
  '3 sao là động lực để quán em nỗ lực hơn mỗi ngày nè! Lần sau ghé thử thêm topping mới bao ngon bạn iu nha! 🌟✨',
  'Cảm ơn bạn đã review chân thực cho quán! Tiệm sẽ cố gắng hơn nữa để lần tới làm bạn hài lòng 100% nha! 🧋💖'
];

// 4. Phản hồi khách khen 4★ - 5★ (Bắt trend nhiệt tình)
const MKT_TREND_QUOTES = [
  'Dạ em xin vía khách iu chấm điểm đỉnh nóc kịch trần! Vũ trụ gửi tín hiệu quán em pha ly này bằng cả tính mạng luôn á, mãi keo nha sếp ơi! 🥰✨🧋',
  'Trộm vía tinh hoa hội tụ phụ nữ rất yêu! Cảm ơn bạn iu đã ghé quán chữa lành tâm hồn, lần sau ghé em tặng 1000 tim nhen! 💖🎉',
  '10 điểm không có nhưng! Đọc review của bạn mà em flex với cả tiệm từ sáng đến giờ luôn á, nhớ ghé hoài hoài nha! 🧋💅✨',
  'Check var độ ngọt ngào của bạn là 100% luôn nè! Cảm ơn bạn iu đã ủng hộ quán, chúc bạn một ngày năng lượng ngút ngàn! 🌟🥤',
  'U là trời, bạn là khách ruột vip pro của quán em rồi! Mê vị trà của quán thì nhớ rủ cả hội bạn thân ghé quán làm vài ly bao chill nha! 🧋🥳',
  'Nói có sách mách có chứng, ly trà sữa này hội tụ tinh hoa đất trời mới phục vụ được bạn iu đó! Đỉnh chóp luôn nha! 🧋👑',
  'Đúng nhận sai cãi: Trà sữa quán em ngon mê ly đúng không nè! Cảm ơn bạn iu đã truyền năng lượng tích cực cho quán nha! 🥰⚡',
  'Bao chill bao mê! Đọc review của bạn làm cả quán tràn trề nhiệt huyết, mai ghé em ưu tiên dán tem đẹp nha! 🍓✨',
  'Overthinking làm gì khi đã có trà sữa ngon lành! Cảm ơn bạn iu đã tin tưởng quán, thả tim bùng cháy! 🧋🔥'
];

const MKT_CUST_HAPPY_QUOTES = [
  'Haha admin me két tinh mặn mòi dễ thương xỉu! Đọc rep mà cười rớt hàm, thôi tặng thêm 1 sao ủng hộ quán nè! 🥰✨',
  'Nhân viên me két tinh duyên dáng quá, biết cách ăn nói làm khách mát lòng mát dạ. Tặng lại 5★ tuyệt đối cho tiệm nhen! 💖🧋',
  'Cách rep dí dỏm bắt trend ghê, duyệt nha! Chiều rủ cả đám bạn ghé ủng hộ quán tiếp! 5★ không có nhưng! 🥤🎉',
  'Đọc rep hài hước cưng ghê, bớt giận liền luôn á. Nâng sao khích lệ quán nè! 🧋✨'
];

const MKT_CUST_ANGRY_QUOTES = [
  'Quán mướn cái đứa me két tinh mỏ hỗn này ở đâu về vậy trời? Khách góp ý lịch sự quay sang chửi khách như hát hay? Hạ xuống 1★ tẩy chay vĩnh viễn! 😡🖕',
  'Ủa alo nhân viên ăn nói bố đời vậy? Thái độ phục vụ coi thường khách hàng thế này thì sớm muộn cũng sập tiệm! 1 sao tiễn vong! 🛑👎',
  'Chưa thấy cái tiệm nào nhân viên trả treo cãi tay đôi với khách ghê gớm như vậy! Chụp màn hình bóc phốt lên hội review liền! 1★! 📸🔥',
  'Thứ nhân viên vô văn hóa! Trả treo với khách thế này thì dẹp tiệm sớm đi cho rảnh nợ! 1 sao không có nhưng! 🤮'
];

function applyMktAutoReplies(){
  if(!window.S || !S.upg || !S.upg.staffMkt || !Array.isArray(S.reviews) || !S.reviews.length) return;
  const pName = staffPersonName('staffMkt') || 'Me két tinh';
  let hasChange = false;
  S.reviews.forEach(x => {
    const isPoliceFail = (x.k && String(x.k).startsWith('police_fail')) || (x.why === 'police_blunder') || (x.t && /vu khống|chụp mũ|công an|tiền giả/i.test(x.t));
    
    // Tự động sửa lại nếu trước đó bị lỗi me két tinh khen ngon lạc quẻ trong review công an / vu khống
    if(x.mktRep && isPoliceFail && /ngon mê ly|năng lượng tích cực|tinh hoa hội tụ|chữa lành|10 điểm|check var độ ngọt/i.test(x.mktRep)){
      x.mktRep = rnd(MKT_POLICE_CALM_QUOTES);
      x.mktIsToxic = false;
      hasChange = true;
    }

    if(!x.mktRep){
      x.mktName = pName;
      // Tính cách thất thường: Đôi khi cãi tay đôi, trả treo với khách hàng
      const moodRoll = Math.random();
      let isToxic = false;

      if(isPoliceFail){
        isToxic = moodRoll < 0.40;
        x.mktRep = isToxic ? rnd(MKT_POLICE_TOXIC_QUOTES) : rnd(MKT_POLICE_CALM_QUOTES);
      } else if(x.s <= 2){
        // 45% cãi tay đôi kịch liệt, 55% dỗ dành
        isToxic = moodRoll < 0.45;
        x.mktRep = isToxic ? rnd(MKT_TOXIC_QUOTES) : rnd(MKT_BAD_CALM_QUOTES);
      } else if(x.s === 3){
        // 35% bắt bẻ cãi tay đôi vì sao cho 3 sao
        const isArgue = moodRoll < 0.35;
        isToxic = isArgue;
        x.mktRep = isArgue ? rnd(MKT_AVG_ARGUE_QUOTES) : rnd(MKT_AVG_QUOTES);
      } else {
        // 22% bắt bẻ khách 4 sao
        const isBratty = (x.s === 4 && moodRoll < 0.22);
        isToxic = isBratty;
        x.mktRep = isBratty ? rnd(MKT_GOOD_ARGUE_QUOTES) : rnd(MKT_TREND_QUOTES);
      }
      x.mktIsToxic = isToxic;

      // Khi Me két tinh phản hồi: có tỉ lệ nâng sao khích lệ (cân bằng ngầm, ưu tiên cứu review xấu lên 3-4★ thay vì tràn ngập 5★)
      if(!isToxic && x.s < 5 && Math.random() < 0.22){
        const oldS = x.s;
        if(x.origS == null) x.origS = oldS;
        const up = (oldS <= 2 && Math.random() < 0.30) ? 2 : 1;
        const maxCap = (Math.random() < 0.15) ? 5 : 4;
        const targetS = Math.min(maxCap, oldS + up);
        if(targetS > oldS){
          x.s = targetS;
          x.mktStarUp = x.s - oldS;
          x.mktCustHappy = rnd(MKT_CUST_HAPPY_QUOTES);
          toast(`✨ Me két tinh (${pName}) phản hồi cực duyên giúp quán nâng +${x.mktStarUp}★ từ khách ${x.n || 'khách'}! ⭐`);
        }
      }

      hasChange = true;
    } else if(!x.mktIsToxic && !x.mktStarUp && !x.mktCheckedStar && x.s < 5){
      // Quét các đánh giá cũ chưa từng xét nâng sao
      x.mktCheckedStar = true;
      if(Math.random() < 0.15){
        const oldS = x.s;
        if(x.origS == null) x.origS = oldS;
        const up = (oldS <= 2 && Math.random() < 0.30) ? 2 : 1;
        const maxCap = (Math.random() < 0.15) ? 5 : 4;
        const targetS = Math.min(maxCap, oldS + up);
        if(targetS > oldS){
          x.s = targetS;
          x.mktStarUp = x.s - oldS;
          x.mktCustHappy = rnd(MKT_CUST_HAPPY_QUOTES);
          hasChange = true;
        }
      }
    }

    // Dọn dẹp mktCustRep cũ nếu chủ tiệm chưa phản hồi (để lượt 4 là khách phản hồi sau khi chủ tiệm phản hồi ở lượt 3)
    if(x.mktCustRep && !x.rp){
      delete x.mktCustRep;
      hasChange = true;
    }
  });
  if(hasChange){
    save();
    head();
  }
}

/* ---------- HEADER ---------- */
const esc=t=>String(t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const shopName=()=>(!S.shopName||S.shopName==='Tiệm Trà Nhỏ')?'Tiệm Trà Mơ Ước':S.shopName;
function setName(v){v=String(v||'').replace(/\s+/g,' ').trim().slice(0,30);S.shopName=v;document.title=shopName();if($('frontDoorShopName'))$('frontDoorShopName').textContent=shopName();if($('frontShopName'))$('frontShopName').textContent=shopName();save()}
function renameDlg(){
  ask(`<h2>Đặt tên quán</h2><p>Tối đa 30 ký tự. Tên sẽ hiện trên biển hiệu, đánh giá và tổng kết.</p><input id="nameIn" class="pinbox nm" maxlength="30" value="${esc(shopName())}" placeholder="Ví dụ: Tiệm Trà Mơ Ước" aria-label="Tên quán">`,
    [['Huỷ',()=>{}],['Lưu tên',()=>{setName($('nameIn').value);toast('Đã đổi tên quán');renderPrep()},1]]);
  setTimeout(()=>{const i=$('nameIn');if(i){i.focus();i.select()}},50);
}
const dayLen=()=>(R&&R.running&&R.dayLen)||S.dayLen||CFG.dayMin;
function gameClock(){
  if(R&&R.isNightShift){
    const elNight=Math.min(1,Math.max(0,1-(R.nightT/(R.nightTot||80))));
    const m=(22*60+Math.floor(elNight*480/5)*5)%(24*60);
    return String(Math.floor(m/60)%24).padStart(2,'0')+':'+String(m%60).padStart(2,'0');
  }
  const tot=dayLen()*60,el=Math.max(0,1-R.t/tot),m=11*60+Math.floor(el*660/5)*5;return String(Math.floor(m/60)%24).padStart(2,'0')+':'+String(m%60).padStart(2,'0')
}
const _hd={};
function setTxt(id,v){if(_hd[id]!==v){_hd[id]=v;const el=$(id);if(el)el.textContent=v}}

function openSellReviewsModal(){
  const r = rating();
  const html = `
    <div class="sell-rev-modal" style="width:100%;max-width:540px;margin:0 auto;">
      <div style="text-align:center;padding:4px 0 8px;border-bottom:1.5px solid var(--line);margin-bottom:8px;">
        <div style="font-size:1.85rem;font-weight:900;color:var(--ink);margin-bottom:2px;">${r.toFixed(1).replace('.', ',')} <span style="color:#f59e0b;">${starStr(r)}</span></div>
        <div style="font-size:0.86rem;color:var(--soft);font-weight:700;">Đánh giá trung bình quán · ${revCount()} lượt nhận xét</div>
      </div>
      <div id="pane" class="pane sell-pane" style="max-height:60vh;overflow-y:auto;text-align:left;padding-right:4px;"></div>
    </div>
  `;

  let wasRunning = R && R.running && !R.paused;
  if(wasRunning){
    R.paused = true;
    clearInterval(timer);
  }

  ask(html, [['Đóng lại tiếp tục pha chế 🧋', ()=>{
    const p = $('pane');
    if(p && p.classList.contains('sell-pane')) p.remove();
    if(wasRunning) resumeGame();
  }]]);

  paneRev();
}

function openReviews(initTab = 'danhgia'){
  if(R.mode==='prep'){
    switchTab(initTab);
    const tabEl = document.querySelector('.tabs [data-tab="' + initTab + '"]');
    if(tabEl){
      tabEl.scrollIntoView({behavior:'smooth', inline:'center'});
    }
  } else {
    openSellModal(initTab);
  }
}

function openSellModal(initTab = 'danhgia'){
  let currentTab = initTab || 'danhgia';
  const tabsList = [
    { id: 'danhgia', n: '⭐ Đánh giá' },
    { id: 'kho', n: '📦 Kho' },
    { id: 'nangcap', n: '⚡ Nâng cấp' },
    { id: 'tongket', n: '📊 Tổng kết' }
  ];

  const html = `
    <div class="sell-modal-wrap" style="width:100%;max-width:540px;margin:0 auto;">
      <div class="sell-modal-tabs" style="display:flex;gap:6px;justify-content:center;margin-bottom:10px;background:rgba(0,0,0,0.05);padding:6px;border-radius:14px;overflow-x:auto;">
        ${tabsList.map(t => `<button type="button" class="sbtn sell-tab-btn ${t.id === currentTab ? 'pri' : ''}" data-smt="${t.id}" style="padding:6px 12px;font-size:0.88rem;border-radius:10px;font-weight:800;cursor:pointer;">${t.n}</button>`).join('')}
      </div>
      <div id="pane" class="pane sell-pane" style="max-height:62vh;overflow-y:auto;text-align:left;padding-right:4px;"></div>
    </div>
  `;

  ask(html, [['Đóng quầy tra cứu', ()=>{
    if(R.mode === 'sell') {
      const p = $('pane');
      if(p && p.classList.contains('sell-pane')) p.remove();
    }
  }]]);

  const renderTab = (tabId) => {
    currentTab = tabId;
    document.querySelectorAll('.sell-tab-btn').forEach(b => {
      b.classList.toggle('pri', b.dataset.smt === tabId);
    });
    const paneFns = {
      danhgia: paneRev,
      kho: paneKho,
      nangcap: paneUpg,
      tongket: paneSum
    };
    if(paneFns[tabId]){
      try {
        paneFns[tabId]();
      } catch(e) {
        console.error('Error rendering modal tab', e);
        const p = $('pane');
        if(p) p.innerHTML = '<div style="padding:20px;text-align:center;color:#ef4444;">Lỗi tải: ' + esc(e.message) + '</div>';
      }
    }
  };

  document.querySelectorAll('.sell-tab-btn').forEach(b => {
    b.onclick = () => renderTab(b.dataset.smt);
  });

  renderTab(currentTab);
}

function head(){
  setTxt('hName',shopName());
  setTxt('hDay',String(S.day));
  setTxt('frontDoorShopName',shopName());
  setTxt('frontShopName',shopName());
  const sub=R.mode==='sell'?'sell':'prep';
  const nightTag=(R&&R.isNightShift)?'🌙 Ca đêm: ':'';
  if(_hd.subMode!==sub||_hd.night!==!!(R&&R.isNightShift)){_hd.subMode=sub;_hd.night=!!(R&&R.isNightShift);_hd.clk=null;$('hSub').innerHTML=sub==='sell'?`${nightTag}${ico('clock')} <span id="hClk"></span>`:'Chuẩn bị'}
  if(sub==='sell'){const c=gameClock();if(_hd.clk!==c){_hd.clk=c;$('hClk').textContent=c}}
  setTxt('hMoney',fmt(S.money));
  const r=rating();
  const s5Prefix = (S.star5Count && S.star5Count >= 1) ? `x${S.star5Count} ` : '';
  setTxt('hStars', s5Prefix + starStr(r));
  setTxt('hRate',r.toFixed(1).replace('.',',')+' · '+revCount()+' đánh giá');
  const hSt = $('hStars'); if(hSt && !hSt._boundRev) { hSt._boundRev = true; hSt.onclick = () => { if(R && R.mode === 'sell') openSellReviewsModal(); else openReviews('danhgia'); }; }
  const hRt = $('hRate'); if(hRt && !hRt._boundRev) { hRt._boundRev = true; hRt.onclick = () => { if(R && R.mode === 'sell') openSellReviewsModal(); else openReviews('danhgia'); }; }
  if(typeof renderFakeAlertBtn==='function') renderFakeAlertBtn();
}

/* ---------- PREP VIEW ---------- */
const kv=v=>{
  const a=Math.abs(v||0),sign=v<0?'−':'';
  if(a>=1e12){const x=a/1e12;return sign+(x%1?(Math.round(x*100)/100).toString().replace('.',','):x)+'k tỉ'}
  if(a>=1e9){const x=a/1e9;return sign+(x%1?(Math.round(x*100)/100).toString().replace('.',','):x)+' tỉ'}
  if(a>=1e6){const x=a/1e6;return sign+(x%1?x.toFixed(1).replace('.',','):x)+'tr'}
  return sign+(v%1000?(v/1000).toFixed(1).replace('.',','):v/1000)+'k';
};
function getBestSellers(){
  let lastSales = null;
  if(S.history && S.history.length > 0){
    lastSales = S.history[S.history.length - 1].sales;
  } else if(S.cur && S.cur.sales && Object.keys(S.cur.sales).length > 0){
    lastSales = S.cur.sales;
  }
  if(!lastSales) return [];

  return Object.entries(lastSales)
    .filter(([k, v]) => k !== 'L' && k !== 'M' && k !== 'size' && ITEMS[k] && ITEMS[k].type !== 'top' && ITEMS[k].type !== 'supply' && (v.q || 0) > 0)
    .sort((a, b) => (b[1].q || 0) - (a[1].q || 0) || (b[1].a || 0) - (a[1].a || 0))
    .slice(0, 3)
    .map(([k, v], idx) => ({
      k,
      rank: idx + 1,
      name: ITEMS[k].n,
      qty: v.q,
      amt: v.a
    }));
}
function menuBoard(){
  const bsList = getBestSellers();
  const medals = ['🥇', '🥈', '🥉'];
  const cell=(k,plus)=>{
    const bs = bsList.find(x => x.k === k);
    const badge = bs ? `<span class="bs-tag" title="Top ${bs.rank} bán chạy ca trước">🔥 Top ${bs.rank}</span>` : '';
    return `<div class="it"><span>${ITEMS[k].n}${badge}</span><span>${plus?'+':''}${kv(S.sell[k])}</span></div>`;
  };
  const it=BASE_KEYS.filter(k=>S.unlocked[k]).map(k=>cell(k)).join('');
  const fl=FLAV_KEYS.filter(k=>S.unlocked[k]),tp=TOP_KEYS.filter(k=>S.unlocked[k]);
  const tops=TGROUPS.map(G=>{const ks=tp.filter(k=>ITEMS[k].g===G.g);return ks.length?(tp.length>4?`<div class="tgb">${G.i} ${G.n}</div>`:'')+ks.map(k=>cell(k,1)).join(''):''}).join('');
  const bsCard = bsList.length ? `
    <div class="menu-bestseller-card">
      <div class="mbs-head">⭐ <b>GỢI Ý BEST SELLER HÔM QUA (TOP 3)</b></div>
      <div class="mbs-list">
        ${bsList.map((x, i) => `<div class="mbs-item"><span class="mbs-rank">${medals[i] || '🔥'}</span><span class="mbs-name">${x.name}</span><span class="mbs-qty">(${x.qty} phần)</span></div>`).join('')}
      </div>
    </div>` : '';
  return `<div class="sign"><button id="rename" aria-label="Đổi tên quán">${esc(shopName())}<small>${ico('pen')}</small></button></div><div class="board"><h2>${ico('cupfull')} Menu hôm nay</h2>${bsCard}<div class="items">${it}</div>${fl.length?`<div class="btop">Hương vị</div><div class="items">${fl.map(k=>cell(k,1)).join('')}</div>`:''}<div class="btop">Topping</div><div class="items top">${tops}</div><div class="extra">Size L +${kv(S.sell.L)}</div></div>`;
}
const levelOf=d=>{const L=CFG.levels;return d>=L.l3?3:d>=L.l2?2:1};
const level=()=>levelOf(S.day);
const LV_TXT={1:'Khách gọi size, loại trà và topping',2:'Khách chọn thêm mức đường và đá',3:'Khách có thể mua 2–5 ly một lần, gọi nhiều topping hoặc full topping'};
/* app giao hàng: Soppi, Tóp Tóp, Biiiii, Gờ Ráp mở cùng lúc khi mở Soppi, mỗi tablet chạy 1 app */
const APPS=[
  {id:'sp',n:'Soppi',c:'#f08a4b',w:25,rows:[0,1]},
  {id:'tt',n:'Tóp Tóp',c:'#fe2c55',w:25,rows:[0,1]},
  {id:'be',n:'Biiiii',c:'#f5a623',w:25,rows:[0,1]},
  {id:'gr',n:'Gờ Ráp',c:'#00b14f',w:25,rows:[0,1]}
];
const appJoined=a=>!!S.online;
const appMinRate=a=>(CFG.online&&CFG.online.minRating)||3.8;
/* app đang nhận đơn: đã mở, có tablet, đủ sao */
function appsOn(){const tb=Math.max(S.tablets||0,S.online?1:0);const r=rating();if(tb<=0||!S.online)return [];const mr=appMinRate();if(r<mr)return [];return APPS.slice(0,Math.min(APPS.length,tb))}
const onlineActive=()=>appsOn().length>0;
function verLine(){return `<div class="verl"><button id="guide">${ico('book')} Hướng dẫn</button><button id="whatsnew">Phiên bản ${GAME_VERSION} · Có gì mới</button></div>`}
function showV11Announcement(onDone){
  const html = `
    <div style="text-align:left;max-height:68vh;overflow-y:auto;padding-right:4px;">
      <h2 style="font-size:17px;color:#c04800;line-height:1.35;margin-bottom:12px;text-align:center;">
        📢 BẢN CẬP NHẬT SIÊU TO KHỔNG LỒ V1.1 - TIỆM TRÀ MƠ ƯỚC<br>
        <span style="font-size:13px;color:#e86422;font-weight:700;display:inline-block;margin-top:4px;">✨ VÀO CÀI ĐẶT ĐỂ CẬP NHẬT ✨</span>
      </h2>
      
      <div style="background:#fff7f0;border-left:4px solid #ff7a45;padding:10px 12px;border-radius:8px;margin-bottom:10px;">
        <div style="font-weight:700;font-size:14.5px;color:#d4380d;margin-bottom:4px;">🎧 Nhân viên Gen Z:</div>
        <ul style="margin:0;padding-left:18px;font-size:13px;line-height:1.55;color:#434343;">
          <li>Tăng <b>50%</b> khách ghé quán và tự động gợi ý đặt hàng ngày tiếp theo dựa trên doanh thu.</li>
          <li>Tự động pha chế A-Z trực quan trên quầy. Khi áp lực sẽ đình công đi chữa lành (chạm 5 lần để dỗ dành).</li>
          <li>Đôi khi <b>"đá bill"</b> nếu chủ không giám sát (trong vòng 1 lượt pha chế, không bắt quả tang kịp là mất luôn). Thỉnh thoảng làm sai món phải đổ pha lại.</li>
        </ul>
      </div>

      <div style="background:#f6ffed;border-left:4px solid #52c41a;padding:10px 12px;border-radius:8px;margin-bottom:10px;">
        <div style="font-weight:700;font-size:14.5px;color:#389e0d;margin-bottom:4px;">💬 Khách hàng phản hồi lại chủ quán:</div>
        <ul style="margin:0;padding-left:18px;font-size:13px;line-height:1.55;color:#434343;">
          <li>Khách hàng tự động phản hồi lại cực mặn mòi, dí dỏm khi chủ quán trả lời đánh giá (cà khịa khi bị thách thức, tăng sao khi được xin lỗi/tặng quà).</li>
        </ul>
      </div>

      <div style="background:#e6f7ff;border-left:4px solid #1890ff;padding:10px 12px;border-radius:8px;margin-bottom:8px;">
        <div style="font-weight:700;font-size:14.5px;color:#096dd9;margin-bottom:4px;">🌦️ Thời tiết đa dạng &amp; Tính cách khách hàng:</div>
        <ul style="margin:0;padding-left:18px;font-size:13px;line-height:1.55;color:#434343;">
          <li>Thêm thời tiết Nắng đẹp, se lạnh, bão lớn, sương mù, nồm ẩm; khách gọi nhiều topping; khách trả giá sau khi nhận nước; tắt nhập hàng trong giờ bán.</li>
        </ul>
      </div>
    </div>
  `;
  ask(html, [
    ['⚙️ Vào Cài đặt', ()=>{ showSettings(); }],
    ['Đã hiểu · Vào quán 🧋', ()=>{ if(onDone) onDone(); }, 1]
  ]);
}
function showNews(isNew){
  if(isNew){
    showV11Announcement();
    return;
  }
  ask(`<h2>Lịch sử cập nhật</h2><div class="news">${CHANGELOG.map((c,i)=>`<div class="nv${i?'':' cur'}"><div class="nh"><b>Phiên bản ${c.v}</b>${i?'':'<span class="tag">Hiện tại</span>'}<small>${c.d}</small></div><ul>${c.items.map(t=>`<li>${esc(t)}</li>`).join('')}</ul></div>`).join('')}</div>`,[['Xem thông báo V1.1',()=>{showV11Announcement()}],['Đã hiểu',()=>{},1]]);
}
const LV_ALL={1:'🍵 🥤 🍡',2:'🍵 🥤 🍡 🍬 🧊',3:'🧋🧋🧋 🍡🍡🍡🍡 🍬 🧊'},LV_NEW={2:'🍬 🧊',3:'🧋🧋🧋 🍡🍡🍡🍡'};
function levelCard(){const lv=level(),nx={1:CFG.levels.l2,2:CFG.levels.l3}[lv];
  return `<div class="lvl"><b>${ico('star')} Cấp ${lv}</b><span class="lvi">${LV_ALL[lv]}</span>${nx?`<small>${ico('calendar')} ${nx} ➜ ${LV_NEW[lv+1]}</small>`:''}</div>`}
function levelCardOld(){const lv=level(),nx={1:CFG.levels.l2,2:CFG.levels.l3}[lv];
  return `<div class="lvl"><b>Cấp ${lv}</b> · ${LV_TXT[lv]}${nx?`<small>Ngày ${nx}: ${LV_TXT[lv+1].toLowerCase()}</small>`:''}</div>`}
const fmtTr=n=>{const v=Math.max(0, n||0); return v>=1e6?(v/1e6).toLocaleString('vi-VN',{maximumFractionDigits:1})+'tr':fmt(v)};
function onlineCheck(){
  const o=CFG.online,r=rating();
  if(S.totalProfit == null || S.totalProfit < 0){
    const H=S.history||[];
    const profOp=H.reduce((a,rec)=>{
      const ingV=Object.values(rec.ing||{}).reduce((s,x)=>s+(x.v||0),0);
      const opC=(rec.rent||0)+(rec.util||0)+(rec.wage||0)+(rec.bad||0)+(rec.loanInt||0)+(rec.fee||0)+(rec.tax||0)+ingV;
      return a+Math.max(0,recRev(rec)-opC);
    },0);
    const minEst=Math.round((S.totalRev||0)*0.35);
    S.totalProfit=Math.max(0,profOp,minEst);
  }
  const pf=Math.max(0,S.totalProfit||0);
  return [
    {t:'Lợi nhuận tích luỹ',v:fmtTr(pf)+'/'+fmtTr(o.minProfit),p:Math.min(1,pf/o.minProfit),ok:pf>=o.minProfit},
    {t:'Mở cửa tới ngày',v:S.day+'/'+o.fromDay,p:Math.min(1,S.day/o.fromDay),ok:S.day>=o.fromDay},
    {t:'Điểm đánh giá',v:r.toFixed(1).replace('.',',')+'/'+o.minRating.toFixed(1).replace('.',','),p:Math.min(1,r/o.minRating),ok:S.reviews.length>0&&r>=o.minRating}
  ];
}
function onlineCard(){
  const mr=CFG.online.minRating.toFixed(1).replace('.',','),r=rating(),on=appsOn(),tb=S.tablets||0;
  const canOpenSoppi = onlineCheck().every(c => c.ok);
  let h='';
  if(!S.online){const ic=[ico('money'),ico('calendar'),ico('star')];
    h+=`<div class="goalc"><div class="gh">${ico('phone')} Mở bán Online (Soppi, Tóp Tóp, Biiiii, Gờ Ráp)</div><div class="wl">${ico('money')} lợi nhuận · ${ico('calendar')} ngày · ${ico('star')} đánh giá</div>${onlineCheck().map((c,i)=>`<div class="gr2${c.ok?' ok':''}"><span class="gi">${c.ok?'✅':ic[i]}</span><div class="gb"><i style="width:${Math.min(100,c.p*100)}%"></i></div><span class="gv">${c.v}</span></div>`).join('')}</div>`}
  h+=`<div class="note">Khi mở online, cả 4 app (Soppi, Tóp Tóp, Biiiii, Gờ Ráp) sẽ được kích hoạt! Mỗi tablet chạy 1 app. Cần duy trì đánh giá từ ${mr}★ trở lên. Phí app −${CFG.commission}%.</div>`;
  h+=APPS.map((a,idx)=>{
    let st;
    const act=on.includes(a);
    const noTb=S.online&&idx>=tb;
    if(!S.online){
      st=canOpenSoppi?`<button class="sbtn pri" data-openonline="1"><b>Miễn phí</b>Lên đơn ngay</button>`:`<span class="wl">Chưa đủ điều kiện</span>`;
    }else if(act){
      st='<span class="okline">✓ Đang nhận đơn</span>';
    }else if(r<CFG.online.minRating){
      st=`<span class="wl">Tạm ngưng · cần ${ico('star')} ${mr}</span>`;
    }else if(noTb){
      st=`<span class="wl">Cần thêm tablet (${idx+1})</span>`;
    }else{
      st='<span class="okline">✓ Đang nhận đơn</span>';
    }
    const cond=`Mở cùng Soppi · cần ${ico('star')} ${mr} trở lên · mỗi tablet chạy 1 app`;
    return `<div class="rowi"><span class="icon"><i class="appdot" style="background:${a.c}"></i><i class="tfc" style="${shipBg(a.rows[0],0,40,39)}"></i></span><div><div class="nm">${a.n}</div><div class="sub">${cond}</div></div>${st}</div>`}).join('');
  return h;
}
function bindBoard(){const bt=document.querySelector('.board h2');if(bt)bt.onclick=()=>{R.taps=(R.taps||0)+1;clearTimeout(R.tapT);R.tapT=setTimeout(()=>R.taps=0,1500);if(R.taps>=5){R.taps=0;ownerLogin()}}}
/* ---------- TAB CON VUỐT NGANG ---------- */
function subTabs(id,tabs){R.sub=R.sub||{};const cur=Math.min(R.sub[id]||0,tabs.length-1);
  return `<div class="stabs${tabs.length>5?' w3':''}" data-st="${id}">${tabs.map((t,i)=>`<button class="stab${i===cur?' on':''}" data-si="${i}">${t[0]}</button>`).join('')}</div><div class="swipe" id="sw-${id}">${tabs.map(t=>`<div class="spage">${t[1]}</div>`).join('')}</div>`}
function bindSub(id){
  const sw=$('sw-'+id),bar=document.querySelector(`[data-st="${id}"]`);if(!sw)return;
  const fit=i=>{const p=sw.children[i];if(p)sw.style.height=p.offsetHeight+'px'};
  const i0=R.sub[id]||0;sw.scrollLeft=i0*sw.clientWidth;fit(i0);sw._fit=()=>fit(R.sub[id]||0);
  if(window.ResizeObserver){const ro=new ResizeObserver(()=>fit(R.sub[id]||0));[...sw.children].forEach(c=>ro.observe(c))}
  bar.onclick=e=>{const b=e.target.closest('[data-si]');if(!b)return;e.stopPropagation();sw.scrollTo({left:+b.dataset.si*sw.clientWidth,behavior:'smooth'})};
  let tm;sw.onscroll=()=>{const i=Math.round(sw.scrollLeft/sw.clientWidth);
    if(i!==R.sub[id]){R.sub[id]=i;bar.querySelectorAll('.stab').forEach((b,j)=>b.classList.toggle('on',j===i));fit(i)}
    clearTimeout(tm);tm=setTimeout(()=>fit(R.sub[id]||0),120)};
}
function renderPrep(){
  R.mode='prep';if(AU.ctx)musSync();document.body.classList.remove('selling');
  const tabs=[['kho','box','Kho'],['kpi','people',((S.staffSalesDays||0)>=7?'KPI nhân viên <span class="tax-overdue-dot">⭐</span>':'KPI nhân viên')],['thue','receipt',(typeof isTaxOverdue==='function'&&isTaxOverdue())?'Đóng thuế <span class="tax-overdue-dot">⚠️</span>':'Đóng thuế'],['nangcap','tools','Nâng cấp'],['gia','price','Giá bán'],['danhgia','star','Đánh giá'],['tongket','chart','Tổng kết'],['banbe','people','Bạn bè']];
  $('view').innerHTML=menuBoard()+
    `<div class="tabs" role="tablist">${tabs.map(([k,ic,l])=>`<button class="tab${R.tab===k?' on':''}" data-tab="${k}" role="tab"><span class="ti">${ico(ic)}</span>${l}</button>`).join('')}</div>
     <div class="pane" id="pane"></div>
     <div class="openbar" id="obar"></div>`;
  $('view').querySelector('.tabs').onclick=e=>{const b=e.target.closest('[data-tab]');if(b)switchTab(b.dataset.tab)};
  $('rename').onclick=renameDlg;
  bindBoard();
  const paneFns = {kho:paneKho,kpi:paneKpi,thue:paneThue,nangcap:paneUpg,gia:paneGia,danhgia:paneRev,tongket:paneSum,banbe:()=>window.BanBe&&window.BanBe.render()};
  if(paneFns[R.tab]) paneFns[R.tab]();
  renderObar(true);head();
  if($('frBtn')) $('frBtn').onclick=()=>{switchTab('banbe')};
  if($('frontBtn')) $('frontBtn').onclick=openFrontShop;
  setTimeout(prepChecks,300);
}
function refreshPrep(board){if(board){const b=document.querySelector('.board'),sg=document.querySelector('.sign');if(b&&sg){const t=document.createElement('div');t.innerHTML=menuBoard();sg.replaceWith(t.querySelector('.sign'));b.replaceWith(t.querySelector('.board'));$('rename').onclick=renameDlg;bindBoard()}}
  const paneFns = {kho:paneKho,kpi:paneKpi,thue:paneThue,nangcap:paneUpg,gia:paneGia,danhgia:paneRev,tongket:paneSum,banbe:()=>window.BanBe&&window.BanBe.render()};
  if(paneFns[R.tab]) paneFns[R.tab]();renderObar();head()}
function obarHTML(){const t=planTotal();return t?`<button class="big" id="cook" ${t>S.money?'disabled':''}>${t>S.money?'Không đủ tiền · ':'Nấu & nhập · '}${fmt(t)}</button>`:(missingPrep().length?`<button class="big blocked" id="open">${ico('warn')} Chưa nấu ${missingPrep().map(m=>m[0]).join(' · ')}</button>`:`<button class="big" id="open">Mở cửa ngày ${S.day}</button>`)}
function renderObar(force){const b=$('obar');if(!b)return;const h=obarHTML();if(!force&&b._h===h)return;
  const old=b.firstElementChild,t=document.createElement('div');t.innerHTML=h;const n=t.firstElementChild;
  if(!force&&old&&old.id===n.id&&old.className===n.className&&!n.querySelector('img')){old.textContent=n.textContent;old.disabled=n.disabled}else{b.innerHTML=h}
  b._h=h;if($('open'))$('open').onclick=tryOpen;if($('cook'))$('cook').onclick=cook}
function switchTab(k){
  R.tab = k;
  document.querySelectorAll('#view .tabs [data-tab]').forEach(b => b.classList.toggle('on', b.dataset.tab === k));
  const paneFns = {kho:paneKho,kpi:paneKpi,thue:paneThue,nangcap:paneUpg,gia:paneGia,danhgia:paneRev,tongket:paneSum,banbe:()=>window.BanBe&&window.BanBe.render()};
  if(paneFns[k]){
    try {
      paneFns[k]();
    } catch(err){
      console.error('Error rendering tab ' + k, err);
      const p = $('pane');
      if(p) p.innerHTML = '<div style="padding:24px;text-align:center;color:#ef4444;"><b>Không thể hiển thị mục này:</b><br>' + esc(err.message) + '</div>';
    }
  }
  renderObar();
}
function itemIcon(k){const it=ITEMS[k];
  if(!it)return '';
  if(k==='ice')return `<span class="icon" style="font-size:22px;display:inline-grid;place-items:center;">🧊</span>`;
  if(k==='sugar')return `<span class="icon" style="font-size:22px;display:inline-grid;place-items:center;">🍯</span>`;
  if(it.type==='base')return `<span class="bcup">${baseCup(k)}</span>`;
  if(it.type==='flav')return flavIcon(k,26);
  if(it.type==='top')return topIcon(k,1);
  return `<span class="icon">🥤</span>`;
}
const groupRows=(ks,fn)=>TGROUPS.map(G=>{const g=ks.filter(k=>ITEMS[k].g===G.g);return g.length?`<div class="tgl">${G.i} ${G.n}</div>`+g.map(fn).join(''):''}).join('');
function planTotal(){return Object.entries(R.plan).reduce((a,[k,q])=>a+q*ecost(k),0)}
function expected(){
  const sec=dayLen()*60,t=traffic()*(pricyItems().length?.2:1);
  const onlLvMul=1+((S.upgLv&&S.upgLv.onl)||0)*0.01;
  const curEv=ev();
  const wMul=(curEv&&EVS[curEv.id])?EVS[curEv.id].mul:1;
  const wOnlMul=(curEv&&EVS[curEv.id]&&EVS[curEv.id].onlMul)?EVS[curEv.id].onlMul:(evIs('rain')?1.8:(evIs('storm')?2.2:1.0));
  const tOnl=(t/Math.max(0.2,wMul))*wOnlMul;
  return {
    walk:Math.max(1,Math.round(sec/(8.5/t)*.85)),
    onl:onlineActive()?Math.max(1,Math.round(sec/(36/(tOnl*onlLvMul))*onMul())):0
  };
}
function lifeTag(k){if(k==='ice'&&S&&S.upg&&S.upg.fridge)return `<span class="life l0" title="Tủ lạnh bảo quản vĩnh viễn">❄️ ♾</span>`;const l=CFG.life[k];return `<span class="life l${l>1?3:l}">${l?ico('hourglass')+' '+l+' ngày':'♾'}</span>`}
function gzSuggestCard(){
  if(!S.upg.staffGz) return '';
  const ex = expected();
  const totEx = ex.walk + ex.onl;
  const lastRec = S.history && S.history.length ? S.history[S.history.length - 1] : null;
  const lastRev = lastRec ? recRev(lastRec) : 0;
  
  const sugg = {};
  const un = k => S.unlocked[k];
  const bases = BASE_KEYS.filter(un);
  const tops = TOP_KEYS.filter(un);
  const curEv_ = ev(); const weatherMul = curEv_ && EVS[curEv_.id] ? EVS[curEv_.id].mul : 1.0;
  const e = ev();
  const isQuirky = Math.random() < 0.28; // Tính năng ẩn: đôi khi Gen Z ước lượng hơi lệch/ngẫu hứng
  
  bases.forEach(k => {
    let usedYest = (S.used && S.used[k]) || Math.ceil(totEx * 0.35);
    if(isQuirky && Math.random() < 0.45) usedYest = Math.round(usedYest * (Math.random() < 0.5 ? 1.45 : 0.65));
    const trendMul = (e && e.k === k) ? 2.0 : 1.0;
    const target = Math.ceil(usedYest * weatherMul * trendMul * 1.15) + 5;
    const cur = qty(k);
    if(cur < target){
      sugg[k] = Math.max(5, Math.ceil((target - cur) / 5) * 5);
    }
  });

  tops.forEach(k => {
    let usedYest = (S.used && S.used[k]) || Math.ceil(totEx * 0.22);
    if(isQuirky && Math.random() < 0.45) usedYest = Math.round(usedYest * (Math.random() < 0.5 ? 1.55 : 0.55));
    const target = Math.ceil(usedYest * weatherMul * 1.1) + 5;
    const cur = qty(k);
    if(cur < target){
      sugg[k] = Math.max(5, Math.ceil((target - cur) / 5) * 5);
    }
  });

  const cupTarget = Math.ceil(totEx * (isQuirky && Math.random() < 0.3 ? 1.6 : 1.25)) + 10;
  if(qty('cup') < cupTarget){
    sugg['cup'] = Math.max(10, Math.ceil((cupTarget - qty('cup')) / 10) * 10);
  }
  if(level() >= 2){
    const iceTarget = Math.ceil(totEx * 1.1) + 10;
    if(qty('ice') < iceTarget){
      sugg['ice'] = Math.max(10, Math.ceil((iceTarget - qty('ice')) / 10) * 10);
    }
    const sugarTarget = Math.ceil(totEx * 1.1) + 10;
    if(qty('sugar') < sugarTarget){
      sugg['sugar'] = Math.max(10, Math.ceil((sugarTarget - qty('sugar')) / 10) * 10);
    }
  }

  const suggKeys = Object.keys(sugg);
  const totalCost = Object.entries(sugg).reduce((sum, [k, q]) => sum + q * ecost(k), 0);
  const itemsText = suggKeys.map(k => `${ITEMS[k].s || ITEMS[k].n} (+${sugg[k]})`).join(', ');

  const weatherNote = e ? `Thời tiết: <b>${EVS[e.id].n}</b>` : 'Thời tiết thuận lợi';
  const revNote = lastRev ? `Doanh thu hôm qua: <b>${fmt(lastRev)}</b>` : 'Chuẩn bị ngày mới';

  return `
    <div class="gz-suggest-card">
      <div class="gz-sugg-head">
        <div class="gz-avatar">${staffAvatarImg('staffGz', 44)}</div>
        <div class="gz-sugg-title-box">
          <div class="gz-sugg-title">💡 Gen Z gợi ý đặt hàng hôm nay</div>
          <div class="gz-sugg-sub">${revNote} · ${weatherNote}</div>
        </div>
      </div>
      <div class="gz-sugg-desc">
        ${suggKeys.length > 0 
          ? `Dựa trên doanh thu và dự báo ~${totEx} ly hôm nay, em đề xuất nhập thêm: <b>${itemsText}</b> (Ước tính: ${fmt(totalCost)}).`
          : `Kho hàng hiện tại đã rất dồi dào (~${totEx} ly), hôm nay không cần nhập thêm nhiều sếp nhé! ✨`}
      </div>
      ${suggKeys.length > 0 ? `
        <button type="button" class="sbtn pri gz-apply-btn" id="gzApplyPlan" data-gz-plan='${JSON.stringify(sugg)}'>
          ⚡ Áp dụng gợi ý Gen Z (${fmt(totalCost)})
        </button>
      ` : ''}
    </div>
  `;
}
function showSellStockDlg(k){
  const n = qty(k);
  if(n <= 0) return toast('Không còn ' + (ITEMS[k]?ITEMS[k].n:k) + ' trong kho để bán!');
  const baseCost = CFG.cost[k] || ecost(k);
  const sellUnit = Math.round(baseCost * 0.3);
  const opt5 = Math.min(5, n);
  
  ask(`
    <div class="pbig">💸</div>
    <h2>Thanh lý ${ITEMS[k].n}</h2>
    <div class="note" style="text-align:left;line-height:1.6;font-size:0.9rem;">
      <div>📦 Kho hiện có: <b>${n}</b> phần</div>
      <div>🏷️ Giá gốc đã mua: <b>${fmt(baseCost)}</b>/phần</div>
      <div>💰 Thu hồi <b>30% giá gốc</b>: <b style="color:#d97706;">+${fmt(sellUnit)}</b>/phần</div>
    </div>
    <div style="margin:12px 0;">
      <label style="font-weight:700;font-size:0.92rem;display:block;margin-bottom:6px;">Số lượng thanh lý (1 – ${n}):</label>
      <input type="number" id="sellMatQty" class="pinbox" min="1" max="${n}" value="${opt5}" style="text-align:center;font-size:1.15rem;font-weight:800;width:120px;" aria-label="Số lượng thanh lý">
      <div id="sellMatPreview" style="margin-top:6px;font-weight:800;color:#059669;font-size:0.95rem;">Thu về két: +${fmt(opt5 * sellUnit)}</div>
    </div>
  `, [
    ['Huỷ', ()=>{ }],
    [`Bán ${opt5} phần (+${fmt(opt5 * sellUnit)})`, ()=>{ sellStock(k, opt5); }, 1],
    [`Bán hết ${n} phần (+${fmt(n * sellUnit)})`, ()=>{ sellStock(k, n); }, 1],
    ['Xác nhận bán theo số nhập', ()=>{
      const val = parseInt(($('sellMatQty')||{}).value, 10);
      if(isNaN(val) || val <= 0) return toast('Vui lòng nhập số lượng hợp lệ!');
      sellStock(k, Math.min(val, n));
    }, 1]
  ]);

  setTimeout(()=>{
    const inp = $('sellMatQty'), prev = $('sellMatPreview');
    if(inp && prev){
      inp.oninput = ()=>{
        const v = Math.min(n, Math.max(1, parseInt(inp.value, 10) || 0));
        prev.textContent = `Thu về két: +${fmt(v * sellUnit)}`;
      };
    }
  }, 50);
}

function sellStock(k, amount){
  amount = Math.min(amount, qty(k));
  if(amount <= 0) return;
  const baseCost = CFG.cost[k] || ecost(k);
  const unitRefund = Math.round(baseCost * 0.3);
  const totalRefund = unitRefund * amount;

  let remain = amount;
  for(let i = 0; i < (S.stock[k] || []).length; i++){
    const b = S.stock[k][i];
    if(b.q > 0){
      const take = Math.min(remain, b.q);
      b.q -= take;
      remain -= take;
      if(remain <= 0) break;
    }
  }
  S.stock[k] = (S.stock[k] || []).filter(b => b.q > 0);
  if(FLAV_KEYS.includes(k)) syncFlav();

  S.money += totalRefund;
  head();
  save();
  sfx('coin');
  toast(`Đã thanh lý ${amount} phần ${ITEMS[k].n}, thu lại +${fmt(totalRefund)} (30% giá gốc)! 💸`);
  refreshPrep();
}

function hireOrCallStaff(id, cb){
  const u = STAFF.find(x => x.id === id);
  if(!u) return false;
  if(inDebt()){ toast('Đang nợ, trả xong mới thuê được'); return false; }
  if(!S.hired || !S.hired[u.id]){
    if(S.day < u.from){ toast(`Cần đạt ngày ${u.from} để mở khóa nhân viên này`); return false; }
    if(u.need && !u.need()){ toast(u.needT || 'Chưa đủ điều kiện mở khóa'); return false; }
  }
  S.hired = S.hired || {};
  const othMap = {
    guard1: ['guard2'],
    guard2: ['guard1'],
    staff1: ['staff3'],
    staff3: ['staff1']
  };
  if(u.id === 'staff1' && S.upg && S.upg.staff3){
    toast('Không thể thuê cùng lúc với Quản lý tập sự! Hãy cho Quản lý nghỉ trước.');
    return false;
  }
  if(u.id === 'staff3' && S.upg && S.upg.staff1){
    toast('Không thể thuê cùng lúc với Thử việc chính thức! Hãy cho Thử việc nghỉ trước.');
    return false;
  }
  const conflicts = othMap[u.id] || [];
  conflicts.forEach(cid => { if(S.upg && S.upg[cid]) S.upg[cid] = false; });
  S.staffNames = S.staffNames || {};
  S.staffAvatars = S.staffAvatars || {};
  if(!S.staffNames[u.id] || !S.hired[u.id]){
    S.staffNames[u.id] = genName();
  }
  if(!S.staffAvatars[u.id] || !S.hired[u.id]){
    const used = Object.values(S.staffAvatars);
    S.staffAvatars[u.id] = genStaffAvatar(used);
  }
  const pName = S.staffNames[u.id] || u.n;
  if(u.id === 'staffGz'){
    if(S.hired[u.id]){
      S.upg[u.id] = true;
      save();
      toast(`${pName} (Gen Z) đã đi làm lại! 🎉`);
      if(cb) cb(); else refreshPrep();
      return true;
    }
    if(S.money < u.cost){ toast('Cần ' + fmt(u.cost) + ' để thuê nhân viên Gen Z'); return false; }
    S.money -= u.cost;
    S.cur.equip.push({n: 'Thuê ' + u.n + ' (' + pName + ')', v: u.cost});
    S.upg[u.id] = true;
    S.hired[u.id] = true;
    save();
    toast(`Đã tuyển ${pName} làm ${u.n}! 🎉`);
    if(cb) cb(); else refreshPrep();
    return true;
  }
  if(S.hired[u.id]){
    S.upg[u.id] = true;
    save();
    toast(`${pName} (${u.n}) đã đi làm lại! 🟢`);
    if(cb) cb(); else refreshPrep();
    return true;
  }
  if(S.money < u.cost){ toast('Không đủ tiền để thuê ' + u.n); return false; }
  S.money -= u.cost;
  if(u.cost > 0) S.cur.equip.push({n: 'Thuê ' + u.n + ' (' + pName + ')', v: u.cost});
  S.upg[u.id] = true;
  S.hired[u.id] = true;
  save();
  toast(`Đã tuyển ${pName} làm ${u.n}! 🎉`);
  if(cb) cb(); else refreshPrep();
  return true;
}

function fireStaff(id, cb){
  const u = STAFF.find(x => x.id === id);
  if(!u) return false;
  S.upg[u.id] = false;
  if(id === 'staffGz'){
    R.gzWork = null;
    R.gzSulking = false;
    clearStaffPouring();
    if(cup && cup.used && cup.staff) cup = newCup();
    renderGzWidget();
    renderLane();
    renderCup();
    renderPanel();
  }
  save();
  const pName = staffPersonName(u.id) || u.n;
  toast('Đã cho ' + pName + ' nghỉ (gọi đi làm lại miễn phí)');
  if(cb) cb(); else refreshPrep();
  return true;
}

function staffKhoHTML(){
  if(!S) return '';
  S.staffKpi = S.staffKpi || {};
  S.kpiPeriodStats = S.kpiPeriodStats || {};

  const salesDays = S.staffSalesDays || 0;
  const cycleProgress = Math.min(7, salesDays);
  const isReady = salesDays >= 7;
  const pct = Math.round((cycleProgress / 7) * 100);

  const totalTrafficBuff = Math.round(getStaffTrafficBuffTotal() * 100);
  const maxSpeedBuff = Math.round(Math.max(0, ...STAFF.map(u => (S.hired && S.hired[u.id] ? getStaffSpeedBuff(u.id) : 0))) * 100);
  const totalBillBonus = Math.round(getStaffBillBonusTotal() * 100);

  const hiredList = STAFF.filter(u => S.hired && S.hired[u.id]);
  const unhiredList = STAFF.filter(u => !(S.hired && S.hired[u.id]));

  let h = `
    <div class="kpi-cycle-banner">
      <div class="kpi-cycle-header">
        <span class="kpi-cycle-title">📊 Chu kỳ xét KPI &amp; Trả lương 7 ca bán nước</span>
        <span class="kpi-cycle-badge${isReady ? ' ready' : ''}">${isReady ? '⭐ ĐẾN HẠN TRẢ LƯƠNG &amp; XÉT KPI!' : `Ca ${cycleProgress}/7`}</span>
      </div>
      <div class="kpi-progress-bar">
        <div class="kpi-progress-fill" style="width: ${pct}%"></div>
      </div>
      <div class="kpi-cycle-desc">
        ${isReady
          ? '<b style="color:#b91c1c;">Đã tích luỹ đủ 7 ca bán nước (HẠN CHÓT TRẢ LƯƠNG)!</b> Hãy xét KPI và thanh toán lương thưởng cho toàn bộ nhân viên. <b>Lưu ý: Nếu không trả lương, nhân viên sẽ đồng loạt nghỉ việc và lấy hết tiền trong két!</b>'
          : `Đã tích luỹ <b>${cycleProgress}/7 ca bán</b>. Còn <b>${7 - cycleProgress} ca bán nữa</b> sẽ đến đợt xét KPI &amp; thanh toán dồn tiền lương, tiền thưởng định kỳ cho toàn bộ nhân viên.`
        }
      </div>
      <div class="kpi-total-buffs">
        ${totalBillBonus ? `<span class="kpi-buff-pill" style="border-color:#fed7aa;background:#fff7ed;color:#c2410c;">💵 Thưởng bill mỗi ngày: +${totalBillBonus}%</span>` : ''}
        <span class="kpi-buff-pill traffic">📣 Gọi thêm khách: +${totalTrafficBuff}%</span>
        <span class="kpi-buff-pill speed">⚡ Tốc độ pha cao nhất: +${maxSpeedBuff}%</span>
      </div>
      <div style="margin-top:10px;display:flex;gap:8px;">
        <button type="button" class="sbtn ${isReady ? 'pri' : 'ghost'}" id="btnOpenStaffKpi" style="width:100%;padding:9px;font-weight:800;font-size:0.88rem;">
          ${isReady ? '⭐ BẮT ĐẦU XÉT KPI &amp; TRẢ LƯƠNG NHÂN VIÊN ➜' : '🔍 Xem chi tiết KPI &amp; Phong độ nhân viên'}
        </button>
      </div>
    </div>
  `;

  if(!hiredList.length){
    h += `
      <div style="text-align:center;padding:20px 16px;background:#f8fafc;border:1.5px dashed #cbd5e1;border-radius:14px;margin-top:8px;">
        <div style="font-size:32px;margin-bottom:6px;">🧑‍🍳</div>
        <div style="font-weight:800;color:#334155;font-size:0.95rem;">Chưa có nhân viên nào trong đội ngũ quán</div>
        <div style="font-size:0.82rem;color:#64748b;margin-top:4px;">Bạn có thể bấm <b>Thuê</b> ngay ứng viên bên dưới để bắt đầu chấm công &amp; xét KPI.</div>
      </div>
    `;
  } else {
    h += `<div style="font-weight:800;font-size:0.86rem;color:#475569;margin:12px 0 6px;text-transform:uppercase;letter-spacing:0.5px;">👥 Đội ngũ nhân viên quán (${hiredList.length}):</div>`;
    h += hiredList.map(u => {
      const isWorking = !!(S.upg && S.upg[u.id]);
      const kpi = (S.staffKpi && S.staffKpi[u.id]) || { trafficBuff: 0, speedBuff: 0, billBonus: 0, level: 0 };
      const ps = (S.kpiPeriodStats && S.kpiPeriodStats[u.id]) || { daysWorked: 0, served: 0, errors: 0 };
      const baseWageRate = CFG[u.wage] || (u.id === 'staff2' ? CFG.wage2 : (u.id === 'staffGz' ? CFG.wageGz : (u.id === 'staffMkt' ? CFG.wageMkt : (u.id === 'staffBuyer' ? CFG.wageBuyer : (u.id === 'staffNigh' ? CFG.wageNigh : CFG.wage0)))));
      const earnedWage = ps.wageEarned != null ? ps.wageEarned : ((ps.daysWorked || 0) * baseWageRate);
      const trBuff = Math.round((kpi.trafficBuff || 0) * 100);
      const spBuff = Math.round((kpi.speedBuff || 0) * 100);
      const biBuff = Math.round((kpi.billBonus || 0) * 100);
      const totalSpd = Math.round(getStaffSpeedBuff(u.id) * 100);
      const pName = staffPersonName(u.id);
      const dispName = pName ? `${pName} <span style="font-size:0.78rem;font-weight:600;color:#64748b;">(${u.n})</span>` : u.n;

      return `
        <div class="staff-kho-row">
          <div class="staff-kho-info">
            <div class="staff-kho-avatar">${staffAvatarImg(u.id, 50)}</div>
            <div class="staff-kho-details">
              <div class="staff-kho-name">
                ${dispName}
                ${isWorking ? '<span class="kpi-status-working">🟢 Đang đi làm</span>' : '<span class="kpi-status-off">⏸️ Tạm nghỉ ca</span>'}
              </div>
              <div class="staff-kho-sub">
                ${esc(u.d ? u.d.slice(0, 50) + '...' : '')}
              </div>
              <div class="staff-kho-sub" style="color:#334155;font-weight:600;margin-top:2px;">
                📈 7 ca qua: Đi làm <b>${ps.daysWorked || 0}/7 ca</b> · Lương tích luỹ: <b style="color:#2563eb;">${fmt(earnedWage)}</b> · Pha được <b>${ps.served || 0} ly</b>${ps.errors ? ` · <span style="color:#dc2626;">Lỗi: ${ps.errors}</span>` : ''} · Tốc độ thực tế: <b style="color:#d97706;">+${totalSpd}%</b>
              </div>
              <div class="staff-kho-kpi">
                <span>⭐ Cấp KPI: ${kpi.level || 0}</span>
                ${biBuff ? `<span style="color:#ea580c;font-weight:800;">💵 +${biBuff}% bill mỗi ngày</span>` : ''}
                ${trBuff ? `<span style="color:#16a34a;">📣 +${trBuff}% gọi khách</span>` : ''}
                ${spBuff ? `<span style="color:#d97706;">⚡ +${spBuff}% tốc độ pha</span>` : ''}
                ${!trBuff && !spBuff && !biBuff ? '<span style="color:#94a3b8;font-weight:normal;">(Chưa có buff KPI)</span>' : ''}
              </div>
            </div>
          </div>
          <div style="flex-shrink:0;margin-left:8px;">
            ${isWorking
              ? `<button type="button" class="sbtn" data-kpi-fire="${u.id}" style="min-width:84px;padding:6px 10px;"><b>✓</b>Cho nghỉ việc</button>`
              : `<button type="button" class="sbtn pri" data-kpi-hire="${u.id}" style="min-width:84px;padding:6px 10px;"><b>Gọi</b>đi làm</button>`
            }
          </div>
        </div>
      `;
    }).join('');
  }

  if(unhiredList.length){
    h += `<div style="font-weight:800;font-size:0.86rem;color:#475569;margin:18px 0 6px;text-transform:uppercase;letter-spacing:0.5px;">➕ Tuyển thêm nhân viên mới (${unhiredList.length}):</div>`;
    h += unhiredList.map(u => {
      const costTxt = u.cost ? (u.cost >= 1e6 ? (u.cost/1e6)+'tr' : fmt(u.cost)) : 'Miễn phí';
      const wageTxt = u.id === 'staffMkt' ? 'Lương 200.000đ/ngày (Tự động rep đánh giá, tăng 20% khách & pha siêu nhanh)' : u.id === 'staffSv' ? 'Lương 200k/ca đêm (bán xuyên đêm 22h - 6h)' : u.id === 'staffGz' ? 'Lương 25k/giờ (275k/ngày)' : u.id === 'staff0' ? 'Lương 0đ (Thử việc không lương)' : u.id === 'staff1' ? 'Lương 15k/giờ (165k/ngày)' : u.id === 'staff2' ? 'Lương 200k/ngày (Tăng ca 40k/h sau 22h)' : u.id === 'staffOn' ? 'Lương 250k/ngày' : u.id === 'staff3' ? 'Lương 200k/ngày' : u.id === 'staffBuyer' ? 'Lương 100k/ngày' : `Lương ${fmt(CFG[u.wage]||0)}/ngày`;
      const icon = staffAvatarImg(u.id, 44);
      const isLocked = S.day < u.from;
      const isNeedLock = u.need && !u.need();
      const pName = staffPersonName(u.id);
      const dispName = pName ? `${pName} <span style="font-size:0.78rem;font-weight:600;color:#64748b;">(${u.n})</span>` : u.n;
      return `
        <div class="staff-kho-row" style="opacity:${isLocked || isNeedLock ? 0.72 : 1};">
          <div class="staff-kho-info">
            <div class="staff-kho-avatar" style="font-size:24px;">${icon}</div>
            <div class="staff-kho-details">
              <div class="staff-kho-name">
                ${dispName}
                <span class="kpi-status-off" style="background:#f1f5f9;color:#64748b;">⚪ Chưa tuyển</span>
              </div>
              <div class="staff-kho-sub">${esc(u.d || '')}</div>
              <div class="staff-kho-sub" style="color:#0284c7;font-weight:600;margin-top:2px;">💵 ${wageTxt}</div>
            </div>
          </div>
          <div style="flex-shrink:0;margin-left:8px;">
            ${isLocked
              ? `<span class="wl" style="font-size:0.8rem;padding:4px 8px;background:#f1f5f9;border-radius:6px;color:#64748b;font-weight:700;">Ngày ${u.from}</span>`
              : isNeedLock
              ? `<span class="wl" style="font-size:0.8rem;padding:4px 8px;background:#f1f5f9;border-radius:6px;color:#64748b;font-weight:700;">${u.needT}</span>`
              : `<button type="button" class="sbtn pri" data-kpi-hire="${u.id}" ${S.money < u.cost ? 'disabled' : ''} style="min-width:84px;padding:6px 10px;"><b>${costTxt}</b>Thuê</button>`
            }
          </div>
        </div>
      `;
    }).join('');
  }

  return h;
}

function paneKpi(){
  const p = $('pane');
  if(!p) return;
  const savedWin = window.scrollY || document.documentElement.scrollTop || 0;
  const savedPane = p.scrollTop || 0;

  p.innerHTML = `<div class="kpi-pane-outer" style="padding:4px 2px 14px;">` + staffKhoHTML() + `</div>`;

  requestAnimationFrame(() => {
    if(p) p.scrollTop = savedPane;
    window.scrollTo(0, savedWin);
  });

  const kpiBtn = p.querySelector('#btnOpenStaffKpi');
  if(kpiBtn){
    kpiBtn.onclick = (e) => {
      e.stopPropagation();
      openStaffKpiModal(false);
    };
  }

  p.onclick = (e) => {
    const fireBtn = e.target.closest('[data-kpi-fire]');
    const hireBtn = e.target.closest('[data-kpi-hire]');
    if(fireBtn){
      e.stopPropagation();
      const id = fireBtn.dataset.kpiFire;
      fireStaff(id, () => {
        refreshPrep();
      });
      return;
    }
    if(hireBtn){
      e.stopPropagation();
      const id = hireBtn.dataset.kpiHire;
      hireOrCallStaff(id, () => {
        refreshPrep();
      });
      return;
    }
  };
}

function openStaffKpiModal(isAuto){
  const hiredList = STAFF.filter(u => S.hired && S.hired[u.id]);
  if(!hiredList.length){
    toast('Chưa có nhân viên nào để xét KPI');
    return;
  }

  const salesDays = S.staffSalesDays || 0;
  const isPeriodEnd = salesDays >= 7;
  const periodRev = S.kpiPeriodTotalRev || 0;
  const periodBills = S.kpiPeriodTotalBills || Math.round(periodRev * 0.5);

  // Track owner selections: staffId -> 'excellent' | 'standard' | 'poor'
  const selections = {};
  hiredList.forEach(u => {
    const ps = (S.kpiPeriodStats && S.kpiPeriodStats[u.id]) || { daysWorked: 0, served: 0, errors: 0 };
    if((ps.daysWorked || 0) >= 5 && (ps.errors || 0) <= 2) selections[u.id] = 'excellent';
    else if((ps.daysWorked || 0) >= 3) selections[u.id] = 'standard';
    else selections[u.id] = 'poor';
  });

  const getRealTier = (u) => {
    const ps = (S.kpiPeriodStats && S.kpiPeriodStats[u.id]) || { daysWorked: 0, served: 0, errors: 0 };
    if((ps.daysWorked || 0) >= 5 && (ps.errors || 0) <= 2) return 'A'; // Xuất sắc
    if((ps.daysWorked || 0) >= 3) return 'B'; // Đạt chuẩn
    return 'C'; // Cần cố gắng
  };

  const getPayCalc = (u, choice) => {
    const ps = (S.kpiPeriodStats && S.kpiPeriodStats[u.id]) || { daysWorked: 0, served: 0, errors: 0 };
    const baseWageRate = CFG[u.wage] || (u.id === 'staff2' ? CFG.wage2 : (u.id === 'staffGz' ? CFG.wageGz : (u.id === 'staffMkt' ? CFG.wageMkt : (u.id === 'staffBuyer' ? CFG.wageBuyer : (u.id === 'staffNigh' ? CFG.wageNigh : CFG.wage0)))));
    const earnedWage = ps.wageEarned != null ? ps.wageEarned : ((ps.daysWorked || 0) * baseWageRate);

    // Tiền lương cơ bản đã được trừ đều đặn vào bill két mỗi ngày
    if(choice === 'excellent'){
      const share = Math.max(Math.round(periodRev * 0.01), Math.round(periodBills * 0.02));
      const bonus = 100000;
      return { bonus, wage: earnedWage, share, netPayout: bonus + share, totalPackage: bonus + earnedWage + share, total: bonus + share };
    } else if(choice === 'standard'){
      const share = Math.max(Math.round(periodRev * 0.005), Math.round(periodBills * 0.01));
      const bonus = 50000;
      return { bonus, wage: earnedWage, share, netPayout: bonus + share, totalPackage: bonus + earnedWage + share, total: bonus + share };
    } else {
      // Không đạt: chỉ hưởng 80% lương làm việc; do đã nhận 100% lương qua bill mỗi ngày nên khấu trừ/hoàn trả 20% lương vào két
      const penaltyRefund = Math.round(earnedWage * 0.2);
      return { bonus: 0, wage: Math.round(earnedWage * 0.8), share: 0, netPayout: -penaltyRefund, totalPackage: Math.round(earnedWage * 0.8), total: -penaltyRefund };
    }
  };

  // CƠ CHẾ ĐÌNH CÔNG NGÀY THỨ 7: NẾU KHÔNG TRẢ LƯƠNG, NHÂN VIÊN ĐỒNG LOẠT NGHỈ VIỆC & LẤY HẾT TIỀN TRONG KÉT
  const triggerStaffStrike = (reason) => {
    $('modal').hidden = true;
    const quitNames = [];
    hiredList.forEach(u => {
      S.upg[u.id] = false;
      S.hired[u.id] = false;
      S.staffKpi[u.id] = { trafficBuff: 0, speedBuff: 0, billBonus: 0, level: 0 };
      quitNames.push(staffFullName(u));
      if(S.staffNames) delete S.staffNames[u.id];
      if(S.staffAvatars) delete S.staffAvatars[u.id];
    });

    const takenMoney = S.money;
    S.money = 0;
    S.staffSalesDays = 0;
    S.kpiPeriodStats = {};
    S.kpiPeriodTotalRev = 0;
    S.kpiPeriodTotalBills = 0;
    S.kpiPeriodStaffTips = 0;
    save(); head(); sfx('bad');

    ask(`
      <div class="pbig">🚨😡💥</div>
      <h2 style="color:#b91c1c;font-weight:900;">ĐÌNH CÔNG: NHÂN VIÊN ĐỒNG LOẠT NGHỈ VIỆC &amp; VƠ VÉT KÉT TIỀN!</h2>
      <p style="font-size:0.9rem;line-height:1.5;color:var(--ink);">
        Đến ngày thứ 7 hạn chót mà chủ quán <b>${reason || 'không thanh toán lương thưởng'}</b> cho nhân viên!
      </p>
      <div style="background:#fef2f2;border:1.5px solid #fca5a5;border-radius:12px;padding:10px 12px;margin:8px 0;font-size:0.86rem;line-height:1.45;color:#991b1b;text-align:left;">
        <i>"Làm lụng vất vả cả tuần 7 ca mà chủ quán trốn tránh không chịu thanh toán lương thưởng! Tụi em quyết định <b>nghỉ việc tập thể đồng loạt</b> và <b>lấy sạch toàn bộ ${fmt(takenMoney)} trong két</b> để cấn trừ nợ lương!"</i>
      </div>
      <div style="background:#fff1f2;border:1.5px solid #fda4af;border-radius:10px;padding:8px 12px;font-size:0.82rem;color:#881337;text-align:left;">
        ⚠️ <b>Hậu quả nghiêm trọng:</b><br>
        • Tiền trong két bị lấy sạch không còn một xu: <b>${fmt(takenMoney)} ➔ 0đ</b>.<br>
        • <b>${quitNames.join(', ')}</b> đã tháo tạp dề bỏ đi.<br>
        • Mất sạch toàn bộ % buff KPI tích luỹ. Bạn phải vào <b>Nâng cấp > Nhân viên</b> để tuyển nhân viên mới!
      </div>
    `, [
      ['Đã nhận bài học quản trị xương máu', () => { renderPrep(); }, 1]
    ]);
  };

  const renderModal = () => {
    // Lưu vị trí cuộn hiện tại của danh sách để tránh nhảy lên đầu khi bấm chọn
    const scrollList = $('kpiScrollList');
    const savedScrollTop = scrollList ? scrollList.scrollTop : 0;
    const cardEl = $('card');
    const savedCardScroll = cardEl ? cardEl.scrollTop : 0;

    let totalPayout = 0;
    hiredList.forEach(u => {
      const calc = getPayCalc(u, selections[u.id]);
      totalPayout += calc.total;
    });

    const canAfford = totalPayout <= 0 || S.money >= totalPayout;

    let body = `
      <div class="pbig">⭐📋</div>
      <h2 style="margin:2px 0 6px;color:#1e3a8a;">HỘI ĐỒNG XÉT KPI &amp; THƯỞNG NHÂN VIÊN</h2>
      <p style="font-size:0.85rem;color:#475569;margin-bottom:8px;line-height:1.4;">
        ${isPeriodEnd ? '<b style="color:#b91c1c;">Hôm nay là Ngày thứ 7 - HẠN CHÓT XÉT KPI &amp; TRẢ LƯƠNG!</b>' : '<b>Xem trước tiến độ chu kỳ 7 ca bán:</b>'}<br>
        Lương nhân viên đã được trừ vào bill mỗi ngày. Tại đây xét thưởng hiệu quả KPI hoặc khấu trừ phạt!
      </p>
      ${isPeriodEnd ? `
        <div style="background:#fef2f2;border:2px solid #ef4444;border-radius:10px;padding:8px 12px;margin-bottom:10px;color:#991b1b;font-weight:700;font-size:0.84rem;line-height:1.4;text-align:left;">
          🚨 <b>THÔNG BÁO CẢNH BÁO NGÀY 7:</b> Nếu bạn không thanh toán thưởng KPI đầy đủ hôm nay, toàn bộ nhân viên sẽ <b>đồng loạt nghỉ việc và lấy hết sạch tiền trong két</b> để cấn trừ quyền lợi!
        </div>
      ` : ''}
      <div id="kpiScrollList" style="max-height: 50vh; overflow-y: auto; padding-right: 4px;">
    `;

    hiredList.forEach(u => {
      const realTier = getRealTier(u);
      const ps = (S.kpiPeriodStats && S.kpiPeriodStats[u.id]) || { daysWorked: 0, served: 0, errors: 0 };
      const kpi = (S.staffKpi && S.staffKpi[u.id]) || { trafficBuff: 0, speedBuff: 0, billBonus: 0, level: 0 };
      const curChoice = selections[u.id];
      const pName = staffPersonName(u.id);
      const titleName = pName ? `${pName} (${u.n})` : u.n;
      const calcCur = getPayCalc(u, curChoice);

      const excCalc = getPayCalc(u, 'excellent');
      const stdCalc = getPayCalc(u, 'standard');
      const poorCalc = getPayCalc(u, 'poor');

      const tierBadge = realTier === 'A'
        ? '<span style="background:#dcfce7;color:#15803d;padding:2px 6px;border-radius:6px;font-weight:800;font-size:0.75rem;">Thực tế: Hạng A (Xuất sắc)</span>'
        : realTier === 'B'
        ? '<span style="background:#e0f2fe;color:#0369a1;padding:2px 6px;border-radius:6px;font-weight:800;font-size:0.75rem;">Thực tế: Hạng B (Đạt chuẩn)</span>'
        : '<span style="background:#fee2e2;color:#b91c1c;padding:2px 6px;border-radius:6px;font-weight:800;font-size:0.75rem;">Thực tế: Hạng C (Cần cố gắng)</span>';

      body += `
        <div class="kpi-eval-card" data-kpi-uid="${u.id}">
          <div class="kpi-eval-head">
            <span class="kpi-eval-name" style="display:inline-flex;align-items:center;gap:6px;">${staffAvatarImg(u.id, 38)} ${esc(titleName)}</span>
            <div style="display:inline-flex;align-items:center;gap:6px;">
              ${tierBadge}
              ${(S.upg && S.upg[u.id])
                ? `<button type="button" class="sbtn" data-modal-fire="${u.id}" style="padding:3px 7px;font-size:0.75rem;font-weight:700;">Cho nghỉ</button>`
                : `<button type="button" class="sbtn pri" data-modal-hire="${u.id}" style="padding:3px 7px;font-size:0.75rem;font-weight:700;">Gọi đi làm</button>`
              }
            </div>
          </div>
          <div class="kpi-eval-stats">
            <div>📊 <b>7 ca qua:</b> Đi làm <b>${ps.daysWorked || 0}/7 ca</b> · Lương gốc: <b style="color:#2563eb;">${fmt(excCalc.wage)}</b> · Pha <b>${ps.served || 0} ly</b>${ps.errors ? ` · <span style="color:#dc2626;">Lỗi: ${ps.errors}</span>` : ' · Chuẩn 100%'}</div>
            <div style="color:#0284c7;font-weight:700;margin-top:2px;">
              ⭐ Buff hiện có: ${kpi.billBonus ? `<span style="color:#ea580c;">+${Math.round(kpi.billBonus*100)}% bill mỗi ngày · </span>` : ''}+${Math.round((kpi.trafficBuff||0)*100)}% gọi khách · +${Math.round((kpi.speedBuff||0)*100)}% tốc độ pha
            </div>
            <div style="color:#0f172a;font-weight:800;margin-top:2px;font-size:0.84rem;">
              💰 Tổng chi trả mục này: <span style="color:#16a34a;">${fmt(calcCur.total)}</span>
            </div>
          </div>
          <div class="kpi-opt-group">
            <button type="button" class="kpi-opt-btn${curChoice === 'excellent' ? ' active' : ''}" data-choice="excellent">
              🌟 Xuất sắc<br>
              <b style="color:#16a34a;">+${fmt(excCalc.total)}</b><br>
              <small style="font-size:0.67rem;color:#475569;line-height:1.2;display:block;">
                +100k thưởng + 1% DThu (${fmt(excCalc.share)})<br>
                Lương (${fmt(excCalc.wage)}) đã nhận đủ qua bill<br>
                +10% bill, +5% khách, +8% tốc
              </small>
            </button>
            <button type="button" class="kpi-opt-btn${curChoice === 'standard' ? ' active' : ''}" data-choice="standard">
              👍 Đạt chuẩn<br>
              <b style="color:#0284c7;">+${fmt(stdCalc.total)}</b><br>
              <small style="font-size:0.67rem;color:#475569;line-height:1.2;display:block;">
                +50k thưởng + 0.5% DThu (${fmt(stdCalc.share)})<br>
                Lương (${fmt(stdCalc.wage)}) đã nhận đủ qua bill<br>
                +5% bill, +3% khách, +4% tốc
              </small>
            </button>
            <button type="button" class="kpi-opt-btn${curChoice === 'poor' ? ' active-bad' : ''}" data-choice="poor">
              ⚠️ Không đạt<br>
              <b style="color:#dc2626;">${poorCalc.total < 0 ? '-' + fmt(Math.abs(poorCalc.total)) : fmt(poorCalc.total)}</b><br>
              <small style="font-size:0.67rem;color:#475569;line-height:1.2;display:block;">
                Chỉ nhận 80% lương (Hoàn lại 20% vào két)<br>
                0đ thưởng &amp; % DThu · Dễ dỗi/nghỉ việc
              </small>
            </button>
          </div>
        </div>
      `;
    });

    body += `
      </div>
      <div style="background:#f1f5f9;border-radius:10px;padding:8px 12px;margin:8px 0;font-size:0.86rem;display:flex;justify-content:space-between;align-items:center;">
        <div>Tổng lương &amp; thưởng KPI: <b style="color:${canAfford ? '#15803d' : '#dc2626'};font-size:1.05rem;">${fmt(totalPayout)}</b></div>
        <div style="color:#475569;">Két hiện có: <b>${fmt(S.money)}</b></div>
      </div>
      <div class="askbtns" style="margin-top:8px;">
        <button type="button" class="big" id="btnConfirmKpi" ${!canAfford ? 'disabled style="background:#ef4444;color:#fff;"' : ''}>
          ${canAfford ? 'Thanh toán lương thưởng &amp; Xét KPI' : 'Két không đủ trả lương (Nhân viên sẽ nghỉ việc!)'}
        </button>
        ${!isPeriodEnd ? '<button type="button" class="sbtn ghost" id="btnCloseKpi">Đóng</button>' : '<button type="button" class="sbtn ghost" id="btnCloseKpi" style="color:#dc2626;">Hoãn trả (Cảnh báo đình công)</button>'}
      </div>
    `;

    $('card').innerHTML = body;
    $('modal').hidden = false;

    // Khôi phục chính xác vị trí cuộn cho container danh sách và modal card
    const newScrollList = $('kpiScrollList');
    if(newScrollList) newScrollList.scrollTop = savedScrollTop;
    if($('card')) $('card').scrollTop = savedCardScroll;
    requestAnimationFrame(() => {
      const list = $('kpiScrollList');
      if(list) list.scrollTop = savedScrollTop;
      if($('card')) $('card').scrollTop = savedCardScroll;
    });

    // Bind choices
    $('card').querySelectorAll('[data-choice]').forEach(btn => {
      btn.onclick = () => {
        const card = btn.closest('[data-kpi-uid]');
        if(!card) return;
        const uid = card.dataset.kpiUid;
        selections[uid] = btn.dataset.choice;
        renderModal();
      };
    });

    // Bind modal staff actions
    $('card').querySelectorAll('[data-modal-fire]').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        fireStaff(btn.dataset.modalFire, () => {
          renderModal();
        });
      };
    });
    $('card').querySelectorAll('[data-modal-hire]').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        hireOrCallStaff(btn.dataset.modalHire, () => {
          renderModal();
        });
      };
    });

    const closeBtn = $('btnCloseKpi');
    if(closeBtn){
      closeBtn.onclick = () => {
        if(isPeriodEnd){
          ask(`
            <div class="pbig">⚠️❓</div>
            <h2 style="color:#b91c1c;">HÔM NAY LÀ HẠN CHÓT TRẢ LƯƠNG!</h2>
            <p style="font-size:0.9rem;line-height:1.45;">
              Hôm nay là ca thứ 7. Nếu bạn không trả lương và đóng hộp thoại này, <b>toàn bộ nhân viên sẽ đình công, nghỉ việc đồng loạt và lấy sạch tiền trong két quán!</b>
            </p>
          `, [
            ['Quay lại thanh toán lương', () => { renderModal(); }, 1],
            ['Chấp nhận để nhân viên đình công', () => { triggerStaffStrike('từ chối thanh toán lương vào ngày thứ 7'); }]
          ]);
          return;
        }
        $('modal').hidden = true;
      };
    }

    const confBtn = $('btnConfirmKpi');
    if(confBtn){
      confBtn.onclick = () => {
        if(!canAfford){
          triggerStaffStrike('không đủ tiền chi trả lương thưởng vào ngày thứ 7');
          return;
        }

        // Deduct payment
        S.money -= totalPayout;
        S.cur.wage = (S.cur.wage || 0) + totalPayout;

        // KIỂM TRA SỰ ĐỐ KỊ NGHỈ VIỆC ĐỒNG LOẠT (TÍNH NĂNG ẨN)
        const excList = hiredList.filter(u => selections[u.id] === 'excellent');
        const poorList = hiredList.filter(u => selections[u.id] === 'poor');
        const isJealousy = hiredList.length >= 2 && excList.length === 1 && poorList.length === (hiredList.length - 1);

        if(isJealousy){
          const favored = excList[0];
          const favoredName = staffFullName(favored);
          const massQuitNames = [];

          S.staffKpi = S.staffKpi || {};
          S.staffKpi[favored.id] = S.staffKpi[favored.id] || { trafficBuff: 0, speedBuff: 0, billBonus: 0, level: 0 };
          const fk = S.staffKpi[favored.id];
          fk.trafficBuff = (fk.trafficBuff || 0) + 0.05;
          fk.speedBuff = (fk.speedBuff || 0) + 0.08;
          fk.billBonus = (fk.billBonus || 0) + 0.10;
          fk.level = (fk.level || 0) + 1;

          poorList.forEach(u => {
            S.upg[u.id] = false;
            S.hired[u.id] = false;
            S.staffKpi[u.id] = { trafficBuff: 0, speedBuff: 0, billBonus: 0, level: 0 };
            massQuitNames.push(staffFullName(u));
            if(S.staffNames) delete S.staffNames[u.id];
            if(S.staffAvatars) delete S.staffAvatars[u.id];
          });

          S.staffSalesDays = 0;
          S.kpiPeriodStats = {};
          S.kpiPeriodTotalRev = 0;
          S.kpiPeriodTotalBills = 0;
          S.kpiPeriodStaffTips = 0;
          save(); head(); sfx('bad');

          ask(`
            <div class="pbig">⚡😤💔</div>
            <h2 style="color:#b91c1c;font-weight:900;">BIẾN CỐ NỘI BỘ: CÁC NHÂN VIÊN ĐỐ KỊ NGHỈ VIỆC ĐỒNG LOẠT!</h2>
            <p style="font-size:0.9rem;line-height:1.5;color:var(--ink);">
              Sự bất công tột cùng trong buổi xét duyệt KPI đã châm ngòi cho <b>làn sóng phẫn nộ &amp; đố kị dữ dội</b> trong quán!
            </p>
            <div style="background:#fef2f2;border:1.5px solid #fca5a5;border-radius:12px;padding:10px 12px;margin:8px 0;font-size:0.86rem;line-height:1.45;color:#991b1b;text-align:left;">
              <i>"Tụi em không thể chấp nhận sự thiên vị trắng trợn này! Tại sao chỉ có bạn <b>${esc(favoredName)}</b> được sếp tâng bốc Xuất sắc thưởng đậm và chia % doanh thu, trong khi tất cả tụi em đều bị đánh giá Không đạt và trừ 20% lương? Tụi em xin nộp đơn <b>NGHỈ VIỆC ĐỒNG LOẠT</b> ngay hôm nay!"</i>
            </div>
            <div style="background:#fff1f2;border:1.5px solid #fda4af;border-radius:10px;padding:8px 12px;font-size:0.82rem;color:#881337;text-align:left;">
              ⚠️ <b>Hậu quả:</b><br>
              • <b>${massQuitNames.join(', ')}</b> đã đồng loạt tháo tạp dề bỏ đi.<br>
              • Toàn bộ % buff của các nhân viên này <b>đã bị xoá sạch hoàn toàn</b>.<br>
              • Quán hiện chỉ còn duy nhất <b>${esc(favoredName)}</b> làm việc. Bạn sẽ phải vào <b>Nâng cấp > Nhân viên</b> để đăng tin tuyển nhân viên mới!
            </div>
          `, [
            ['Đã hiểu bài học quản trị', () => { renderPrep(); }, 1]
          ]);
          return;
        }

        // ĐÁNH GIÁ & TRẢ LƯƠNG BÌNH THƯỜNG
        const results = [];
        const quittedStaff = [];

        hiredList.forEach(u => {
          S.staffKpi = S.staffKpi || {};
          S.staffKpi[u.id] = S.staffKpi[u.id] || { trafficBuff: 0, speedBuff: 0, billBonus: 0, level: 0 };
          const kpi = S.staffKpi[u.id];
          const choice = selections[u.id];
          const realTier = getRealTier(u);
          const fullName = staffFullName(u);
          const calc = getPayCalc(u, choice);

          if(choice === 'excellent'){
            kpi.trafficBuff = (kpi.trafficBuff || 0) + 0.05;
            kpi.speedBuff = (kpi.speedBuff || 0) + 0.08;
            kpi.billBonus = (kpi.billBonus || 0) + 0.10;
            kpi.level = (kpi.level || 0) + 1;
            results.push({
              name: fullName,
              type: 'good',
              paid: calc.total,
              text: `🌟 Đạt <b>Xuất sắc</b> (Thực nhận: <b>${fmt(calc.total)}</b>): Nhận 100k thưởng + Lương (${fmt(calc.wage)}) + 1% doanh thu quán (${fmt(calc.share)}). Tăng <b>+10% giá trị bill mỗi ngày</b>, <b>+5% gọi khách</b> &amp; <b>+8% tốc độ</b>! Đội ngũ dốc lòng cống hiến!`
            });
          } else if(choice === 'standard'){
            kpi.trafficBuff = (kpi.trafficBuff || 0) + 0.03;
            kpi.speedBuff = (kpi.speedBuff || 0) + 0.04;
            kpi.billBonus = (kpi.billBonus || 0) + 0.05;
            kpi.level = (kpi.level || 0) + 1;
            results.push({
              name: fullName,
              type: 'good',
              paid: calc.total,
              text: `👍 Đạt <b>Đạt chuẩn</b> (Thực nhận: <b>${fmt(calc.total)}</b>): Nhận 50k thưởng + Lương (${fmt(calc.wage)}) + 0.5% doanh thu quán (${fmt(calc.share)}). Tăng <b>+5% giá trị bill</b>, <b>+3% gọi khách</b> &amp; <b>+4% tốc độ</b>!`
            });
          } else {
            // Choice is poor
            if(realTier === 'A' || realTier === 'B'){
              const quitChance = realTier === 'A' ? 0.85 : 0.70;
              if(Math.random() < quitChance){
                S.upg[u.id] = false;
                S.hired[u.id] = false;
                S.staffKpi[u.id] = { trafficBuff: 0, speedBuff: 0, billBonus: 0, level: 0 };
                if(S.staffNames) delete S.staffNames[u.id];
                if(S.staffAvatars) delete S.staffAvatars[u.id];
                quittedStaff.push(fullName);
                results.push({
                  name: fullName,
                  type: 'quit',
                  paid: calc.total,
                  text: `💔 <b>ỨC CHẾ NGHỈ VIỆC NGAY!</b> Thực tế làm rất chăm chỉ nhưng bị sếp đánh giá "Không đạt" và bị trừ mất 20% lương (chỉ nhận ${fmt(calc.total)}). Nhân viên bức xúc tháo tạp dề nghỉ việc ngay!`
                });
              } else {
                results.push({
                  name: fullName,
                  type: 'sad',
                  paid: calc.total,
                  text: `🥺 Bị đánh giá Không đạt, chỉ được nhận 80% lương (${fmt(calc.total)}). Nhân viên buồn bã nhưng vẫn gượng ở lại làm tiếp.`
                });
              }
            } else {
              results.push({
                name: fullName,
                type: 'accept',
                paid: calc.total,
                text: `⚠️ Đánh giá Không đạt, chỉ nhận 80% lương (${fmt(calc.total)}). Nhân viên nhận lỗi vì làm việc chưa đạt yêu cầu.`
              });
            }
          }
        });

        // Reset period
        S.staffSalesDays = 0;
        S.kpiPeriodStats = {};
        S.kpiPeriodTotalRev = 0;
        S.kpiPeriodTotalBills = 0;
        S.kpiPeriodStaffTips = 0;
        save(); head();

        sfx(quittedStaff.length ? 'bad' : 'lvup');
        ask(`
          <div class="pbig">${quittedStaff.length ? '💔📋' : '🎉📋'}</div>
          <h2 style="color:${quittedStaff.length ? '#b91c1c' : '#15803d'};">KẾT QUẢ ĐÁNH GIÁ &amp; TRẢ LƯƠNG</h2>
          <p style="font-size:0.86rem;color:#475569;margin-bottom:8px;">
            Đã hoàn tất kỳ đánh giá KPI 7 ca bán. Tổng tiền lương và thưởng đã thanh toán: <b>${fmt(totalPayout)}</b>.
          </p>
          <div style="max-height:48vh;overflow-y:auto;text-align:left;padding-right:4px;">
            ${results.map(r => `
              <div style="background:${r.type === 'quit' ? '#fef2f2' : r.type === 'good' ? '#f0fdf4' : '#f8fafc'};border:1.5px solid ${r.type === 'quit' ? '#fca5a5' : r.type === 'good' ? '#86efac' : '#cbd5e1'};border-radius:10px;padding:8px 10px;margin-bottom:6px;font-size:0.82rem;line-height:1.4;">
                <b style="color:${r.type === 'quit' ? '#dc2626' : '#0f172a'};">${esc(r.name)}:</b> ${r.text}
              </div>
            `).join('')}
          </div>
          ${quittedStaff.length ? `
            <div style="background:#fff1f2;border:1.5px solid #fda4af;border-radius:10px;padding:6px 10px;margin-top:6px;font-size:0.8rem;color:#9f1239;text-align:left;">
              ⚠️ <b>Cảnh báo:</b> Có <b>${quittedStaff.length} nhân viên</b> đã nghỉ việc do bị đánh giá chèn ép. Toàn bộ % buff của họ đã bị xoá. Bạn cần vào <b>Nâng cấp > Nhân viên</b> để tuyển người mới!
            </div>
          ` : ''}
        `, [
          ['Tiếp tục', () => { renderPrep(); }, 1]
        ]);
      };
    }
  };

  renderModal();
}

function paneKho(){
  const ex=expected(),un=k=>S.unlocked[k];
  const row=k=>{const c=ecost(k),baseCost=CFG.cost[k]||c,n=qty(k),used=(S.used||{})[k]||0,p=R.plan[k]||0;
    const ex0=(k==='ice'&&S.upg&&S.upg.fridge)?0:S.stock[k].filter(b=>b.q&&b.exp===S.day).reduce((a,b)=>a+b.q,0);
    const sellUnit=Math.round(baseCost*0.3);
    const sellBtn=n>0?`<button type="button" class="sell-mat-btn" data-sell-stock="${k}" title="Thanh lý thu hồi 30% giá gốc">💸 Bán 30% (+${fmt(sellUnit)})</button>`:'';
    return `<div class="rowi kho">${itemIcon(k)}<div><div class="nm">${ITEMS[k].n} ${lifeTag(k)} ${sellBtn}</div>
    <div class="sub${n?'':' low'}">${ico('box')} ${n}${S.day>1?` · ${ico('chartdown')} ${used}`:''} · ${fmt(c)}${ex0?` · <span class="warnline">${ico('warn')} ${ex0}</span>`:''}</div><div class="sub okline" id="pl-${k}"${p?'':' hidden'}>+${p} · ${fmt(p*c)}</div></div>
    <div class="step5"><button class="sbtn" data-d="${k}" data-v="-5" aria-label="Bớt 5">−</button><input type="number" inputmode="numeric" min="0" value="${p}" data-plan="${k}" aria-label="Số phần ${ITEMS[k].n}"><button class="sbtn" data-d="${k}" data-v="5" aria-label="Thêm 5">+</button></div></div>`};
  const empty='<p class="note" style="text-align:center">'+ico('lock')+' '+ico('tools')+'</p>';
  const fl=FLAV_KEYS.filter(un),tp=TOP_KEYS.filter(un);
  let h=loanCard()+partyContractCard()+evCard()+gzSuggestCard()+`<div class="fore big2">${ico('people')} ~${ex.walk}${ex.onl?` &nbsp; 📱 ~${ex.onl}`:''}</div>`;
  h+=subTabs('kho',[[ico('teapot')+' Trà',BASE_KEYS.filter(un).map(row).join('')],[ico('pearlbowl')+' Topping',groupRows(tp,row)],[ico('cupempty')+' Dụng cụ',row('cup')+row('ice')+row('sugar')]]);
  h+=`<div class="legend">${ico('box')} đang có · ${ico('chartdown')} hôm qua dùng · ${ico('warn')} hết hạn hôm nay</div>`;
  $('pane').innerHTML=h;bindSub('kho');bindLoan();
  const gzBtn=$('gzApplyPlan');
  if(gzBtn){
    gzBtn.onclick=()=>{
      try{
        const p=JSON.parse(gzBtn.dataset.gzPlan||'{}');
        Object.assign(R.plan,p);
        sfx('tap');
        toast('Đã áp dụng toàn bộ gợi ý nhập kho từ Gen Z! ✨');
        refreshPrep();
      }catch(e){}
    };
  }
  const upd=k=>{const p=R.plan[k]||0,i=document.querySelector(`[data-plan="${k}"]`),l=$('pl-'+k);if(i&&document.activeElement!==i)i.value=p;else if(i&&+i.value!==p)i.value=p;
    if(l){l.hidden=!p;l.textContent=`+${p} · ${fmt(p*ecost(k))}`}const sw=$('sw-kho');sw&&sw._fit&&sw._fit();renderObar()};
  $('pane').onclick=e=>{
    const pAcc=e.target.closest('#btnAcceptParty');
    if(pAcc){
      e.stopPropagation();
      acceptPartyContract();
      return;
    }
    const pRej=e.target.closest('#btnRejectParty');
    if(pRej){
      e.stopPropagation();
      rejectPartyContract();
      return;
    }
    const kpiBtn=e.target.closest('#btnOpenStaffKpi');
    if(kpiBtn){
      e.stopPropagation();
      openStaffKpiModal(false);
      return;
    }
    const sBtn=e.target.closest('[data-sell-stock]');
    if(sBtn){
      e.stopPropagation();
      showSellStockDlg(sBtn.dataset.sellStock);
      return;
    }
    const b=e.target.closest('[data-d]');if(!b)return;const k=b.dataset.d;R.plan[k]=Math.max(0,(R.plan[k]||0)+ +b.dataset.v);upd(k);
  };
  $('pane').onchange=e=>{const i=e.target;if(!i.dataset.plan)return;const k=i.dataset.plan;R.plan[k]=Math.max(0,Math.round(+i.value||0));i.value=R.plan[k];upd(k)};
}
function cook(){const t=planTotal();if(t>S.money)return toast('Không đủ tiền, bớt số lượng lại nhé');
  S.money-=t;Object.entries(R.plan).forEach(([k,q])=>{if(!q)return;addStock(k,q);const g=S.cur.ing[k]=S.cur.ing[k]||{q:0,v:0};g.q+=q;g.v+=q*ecost(k)});R.plan={};save();toast('Đã nấu xong, sẵn sàng mở cửa');refreshPrep()}
function missingPrep(){const has=ks=>ks.some(k=>S.unlocked[k]&&qty(k)>0);
  return [!has(BASE_KEYS)&&[ico('teapot')+' Trà',0],!has(TOP_KEYS)&&[ico('pearlbowl')+' Topping',1],!qty('cup')&&[ico('cupempty')+' Dụng cụ',2],level()>=2&&!qty('ice')&&['🧊 Đá viên',2],level()>=2&&!qty('sugar')&&['🍯 Nước đường',2]].filter(Boolean)}
const STAFF_EXCUSES = [
  // 1. Nhân viên đùng đùng nộp đơn nghỉ việc (khiến chủ tiệm tự làm)
  {
    type: 'quit',
    reason: 'Trúng số mở quán trà chanh',
    icon: '🎰',
    txt: 'hôm qua mua vé số trúng 30 triệu, quyết định nộp đơn xin nghỉ việc để tự mở quán trà chanh vỉa hè cạnh tranh với sếp! Từ nay chủ quán tự xắn tay áo vào làm nha.'
  },
  {
    type: 'quit',
    reason: 'Được phú bà bao nuôi',
    icon: '👑',
    txt: 'tìm được phú bà bao nuôi trọn gói sang Dubai du học ngành thẩm mỹ, xin nộp đơn nghỉ việc gấp! Chúc sếp ở lại tự đứng quầy vui vẻ.'
  },
  {
    type: 'quit',
    reason: 'Bận làm Tiktoker triệu view',
    icon: '📱',
    txt: 'video nhảy bắt trend tối qua cắn xu hướng triệu view, quyết định nghỉ việc chuyển sang làm idol Tiktoker kiếm trăm củ mỗi tháng, chủ tiệm tự quẩy đơn nhé!'
  },
  {
    type: 'quit',
    reason: 'Tự ái vì sếp không khen tóc mới',
    icon: '💇‍♀️',
    txt: 'hôm qua đi làm nhuộm tóc màu khói chất chơi mà sếp không thèm khen một câu, tự ái nộp đơn nghỉ việc! Chủ tiệm tự dán nắp pha trà nhé.'
  },
  {
    type: 'quit',
    reason: 'Theo chồng về dinh',
    icon: '💒',
    txt: 'người yêu đại gia đón về làm dâu hào môn, từ mai chỉ ở nhà chăm chó đếm tiền không đi làm thêm nữa, chủ tiệm tự phục vụ khách nhé!'
  },
  {
    type: 'quit',
    reason: 'Phong thuỷ quán khắc mệnh',
    icon: '🔮',
    txt: 'sáng nay đi xem bói thầy phán phong thuỷ quán tiệm trà khắc mệnh Kim, ở lại làm việc sẽ bị ế suốt đời nên xin nghỉ việc gấp! Sếp tự gánh quầy nha.'
  },

  // 2. Nhân viên vòi tiền / xin tạm ứng tiền
  {
    type: 'borrow',
    amt: 100000,
    reason: 'Hết tiền nạp game gacha',
    icon: '🎮',
    txt: 'lỡ tay nạp game gacha hết sạch tiền ăn trưa, năn nỉ xin sếp ứng trước 100k tiền két để mua cơm sườn lấy sức múc topping!',
    acceptMsg: 'Sếp duyệt ứng 100k! Nhân viên no nê hăng say, được buff +25% tốc độ hôm nay! ✨',
    rejectMsg: 'Bị sếp từ chối, nhân viên đói lả người, vừa làm vừa ngáp giảm 20% tốc độ! 😴'
  },
  {
    type: 'borrow',
    amt: 150000,
    reason: 'Ứng tiền đi date với crush',
    icon: '🌹',
    txt: 'tối nay crush bất ngờ rủ đi xem phim uống trà sữa, xin sếp ứng nóng 150k mua vé xem phim để quyết tâm thoát kiếp FA!',
    acceptMsg: 'Sếp tài trợ 150k cho tình yêu! Nhân viên mừng rơi nước mắt, làm việc tăng 25% tốc độ! 🥰',
    rejectMsg: 'Sếp từ chối, nhân viên buồn bã vì lỡ hẹn crush, làm việc chậm lại 20%! 💔'
  },
  {
    type: 'borrow',
    amt: 200000,
    reason: 'Đóng tiền trọ gấp kẻo bị đuổi',
    icon: '🏠',
    txt: 'bị chủ trọ đứng trước cửa dọa khóa phòng đuổi ra đường, xin ứng nóng 200k đóng nốt tiền phòng trọ sếp ơi!',
    acceptMsg: 'Sếp cứu mạng ứng 200k! Nhân viên biết ơn hết lòng, làm việc siêu tốc +30%! 🚀',
    rejectMsg: 'Sếp không cho ứng, nhân viên loay hoay trốn chủ trọ nên xin đến trễ nửa ca! 🛵'
  },

  // 3. Nhân viên đòi tăng lương / Thấy quán đông đòi thưởng nóng
  {
    type: 'demand_wage',
    amt: 100000,
    reason: 'Thấy quán nườm nượp khách',
    icon: '💸',
    txt: 'thấy quán dạo này khách đông nghẹt xếp hàng dài, công việc quá tải nên đòi sếp thưởng nóng 100k hôm nay, nếu không duyệt sẽ "làm việc theo năng lực hưởng theo nhu cầu"!',
    acceptMsg: 'Sếp duyệt thưởng nóng 100k! Nhân viên hào hứng quẩy đơn siêu tốc +30%! 🔥',
    rejectMsg: 'Sếp từ chối tăng, nhân viên dỗi "làm chậm như rùa", giảm 25% tốc độ cả ngày! 🐢'
  },
  {
    type: 'demand_wage',
    amt: 50000,
    reason: 'So bì với quán đối diện',
    icon: '🥊',
    txt: 'nghe đồn nhân viên phụ quầy quán trà sữa đối diện được sếp bao trà đào và thưởng thêm, đòi sếp thưởng nóng 50k kẻo qua đầu quân cho đối thủ!',
    acceptMsg: 'Sếp thưởng nóng 50k giữ chân nhân tài! Nhân viên hăng hái tăng 20% tốc độ! 🧋',
    rejectMsg: 'Sếp từ chối, nhân viên mặt nặng mày nhẹ làm việc chậm chạp 20%! 😒'
  },

  // 4. Nghỉ phép độc lạ dở khóc dở cười (chủ tự làm thay)
  {
    type: 'off',
    reason: 'Đại hội Chi hội Rắn toàn quốc',
    icon: '🐍',
    txt: 'đi dự Đại hội Chi hội Rắn toàn quốc, bận đi offline giao lưu cùng hội anh em Rắn săn bắt mồi. Hôm nay chủ quán tự làm nhé!'
  },
  {
    type: 'off',
    reason: 'Ăn cưới người yêu cũ',
    icon: '💒',
    txt: 'đi ăn đám cưới người yêu cũ (tập thể bạn thân rủ đi dằn mặt), phải quẩy hết tăng 3 đến sáng. Chủ tiệm tự đứng quầy nha!'
  },
  {
    type: 'off',
    reason: 'Săn mây Đà Lạt chữa lành',
    icon: '✈️',
    txt: 'rủ bạn đi du lịch săn mây Đà Lạt 3 ngày 2 đêm để chữa lành tâm hồn sau chuỗi ngày làm việc vất vả. Sếp tự pha chế nhé!'
  },
  {
    type: 'off',
    reason: 'Xem bói Tarot giải hạn',
    icon: '🔮',
    txt: 'sáng nay bốc trúng lá bài Tarot xấu khuyên không nên bước chân ra khỏi phòng trọ kẻo gặp sao quả tạ chiếu mệnh. Sếp tự làm nha!'
  },
  {
    type: 'off',
    reason: 'Đỡ đẻ cho mèo cưng',
    icon: '🐱',
    txt: 'mèo cưng ở phòng trọ chuyển dạ đẻ lứa thứ 5, em phải túc trực làm bà đỡ khẩn cấp không bỏ đi đâu được. Sếp tự cân quán nha!'
  },
  {
    type: 'off',
    reason: 'Về quê xem mắt gấp',
    icon: '💍',
    txt: 'bị gia đình gọi điện ép về quê xem mắt gấp anh kỹ sư làng bên, không về là mẹ cắt hộ khẩu. Hôm nay chủ quán tự thân vận động nhé!'
  },
  {
    type: 'off',
    reason: 'Ăn mì cay cấp 7 phỏng lưỡi',
    icon: '🍜',
    txt: 'tối qua thách đấu bạn bè ăn mì cay cấp độ 7 bị phỏng rộp hết lưỡi, hôm nay mất vị giác không nếm được trà nên xin nghỉ ở nhà. Sếp tự làm nhé!'
  },
  {
    type: 'off',
    reason: 'Bắt quả tang người yêu có bồ nhí',
    icon: '🕵️‍♀️',
    txt: 'nhận được tin mật người yêu đang đi trà sữa với trà xanh ở trung tâm thương mại, em phải đi phục kích bắt quả tang khẩn cấp! Sếp tự quán xuyến quầy nha!'
  },

  // 5. Đi trễ nửa ca độc lạ
  {
    type: 'late',
    reason: 'Đặt trà sữa quán đối diện',
    icon: '🧋',
    txt: 'lỡ đặt 3 ly trà sữa quán đối diện để "thám tử điều tra đối thủ", đang ngồi uống thử phân tích menu nên xin đến trễ nửa ca!'
  },
  {
    type: 'late',
    reason: 'Xe thủng lốp dắt bộ',
    icon: '🛵',
    txt: 'xe máy bị cán đinh thủng lốp giữa cầu, phải dắt bộ 4km tìm tiệm vá xe nên xin đến trễ nửa ca!'
  },
  {
    type: 'late',
    reason: 'Săn vé concert Idol',
    icon: '🎫',
    txt: 'canh giật vé concert idol mở cổng lúc 9h sáng, bận F5 nghẽn mạng giật xong vé sẽ phi ngay tới quán!'
  },
  {
    type: 'late',
    reason: 'Cày phim khóc sưng mắt',
    icon: '😭',
    txt: 'tối qua thất tình cày trọn bộ phim Hàn Quốc khóc sưng húp hai mắt không thấy đường gắp topping, xin đến trễ nửa ca!'
  },
  {
    type: 'late',
    reason: 'Bị bóng đè đấu tranh tư tưởng',
    icon: '🛌',
    txt: 'sáng nay thức dậy bị bóng đè, đấu tranh tư tưởng mãi mới ngồi dậy bước ra khỏi giường được nên xin đến trễ nửa ca!'
  },
  {
    type: 'late',
    reason: 'Google Maps chỉ đường vào hẻm cụt',
    icon: '🗺️',
    txt: 'bật Google Maps đi làm bị chị Google dẫn đường chạy thẳng vào hẻm cụt nuôi đàn chó dữ, đang loay hoay lùi xe nên đến trễ nửa ca!'
  }
];

function isStaffActive(id){
  if(!S || !S.upg || !S.upg[id]) return false;
  if(R.staffDayOff && R.staffDayOff[id]) return false;
  if(R.staffLate && R.staffLate[id]){
    const midTime = 0.5 * (dayLen() * 60);
    if(R.t > midTime) return false;
  }
  return true;
}

/* ---------- KIỂM TRA HỎNG HÓC TRANG BỊ ĐẦU NGÀY MỚI (2% TỈ LỆ) ---------- */
function checkEquipBreakdown(onDone){
  if(!S || !S.upg || S.day <= 1 || S.lastBreakDay === S.day){
    if(onDone) onDone();
    return;
  }
  S.lastBreakDay = S.day;

  const BREAKABLE = [
    { id: 'fridge', n: 'Tủ lạnh', icon: '❄️' },
    { id: 'sealer', n: 'Máy dán nắp tự động', icon: ico('upcups') },
    { id: 'sign', n: 'Biển hiệu đèn LED', icon: ico('upbulb') },
    { id: 'seats', n: 'Bàn ghế cho khách ngồi', icon: ico('upchair') }
  ];

  const brokenList = [];
  BREAKABLE.forEach(item => {
    if(S.upg[item.id]){
      if(Math.random() < 0.02){
        S.upg[item.id] = false;
        if(item.id === 'fridge'){
          if(S.stock && S.stock.ice){
            S.stock.ice.forEach(b => {
              if(b.exp >= 99999){
                b.exp = S.day + (CFG.life.ice || 2) - 1;
              }
            });
          }
        }
        brokenList.push(item);
      }
    }
  });

  if(brokenList.length > 0){
    save();
    sfx('warn');
    ask(`
      <div class="pbig">🛠️</div>
      <h2 style="color:#dc2626;margin:4px 0 8px;">CẢNH BÁO: TRANG BỊ BỊ HỎNG!</h2>
      <div style="background:#fef2f2;border:1.5px solid #fecaca;padding:12px 14px;border-radius:10px;margin:10px 0;font-size:0.88rem;line-height:1.55;color:#1e293b;text-align:left;">
        Đầu ngày mới, thiết bị sau đã bị <b>hỏng hóc</b> sau thời gian dài hoạt động:
        <div style="margin:8px 0 6px;display:flex;flex-direction:column;gap:6px;">
          ${brokenList.map(it => `<div style="font-weight:700;color:#b91c1c;background:#fff;padding:6px 10px;border-radius:6px;border:1px solid #fee2e2;">• ${it.icon} ${it.n} (đã hỏng)</div>`).join('')}
        </div>
        ${brokenList.some(x => x.id === 'fridge') ? '<div style="color:#d97706;font-size:0.82rem;margin-top:6px;">⚠️ <b>Lưu ý:</b> Do Tủ lạnh bị hỏng, đá viên trong kho sẽ trở về hạn sử dụng thường (2 ngày)!</div>' : ''}
        <div style="color:#475569;font-size:0.82rem;margin-top:6px;">Chủ tiệm hãy vào mục <b>Nâng cấp > Trang bị</b> để mua lại thiết bị mới giúp việc kinh doanh trơn tru.</div>
      </div>
    `, [
      ['Vào Nâng cấp mua lại', () => {
        R.tab = 'upg';
        R.sub = R.sub || {};
        R.sub.upg = 3;
        renderPrep();
        if(onDone) onDone();
      }, 1],
      ['Để sau', () => {
        renderPrep();
        if(onDone) onDone();
      }]
    ]);
  } else {
    save();
    if(onDone) onDone();
  }
}

function checkStaffExcuses(onProceed){
  R.staffDayOff = {};
  R.staffLate = {};
  R.staffDramaBuff = {};
  if(!S || !S.upg) return onProceed();

  const activeStaff = STAFF.filter(u => S.upg[u.id]);
  if(activeStaff.length < 1) return onProceed();

  // Cơ chế drama nhân sự: tỉ lệ drama nhân viên mỗi ngày (20%) theo yêu cầu người chơi
  if(Math.random() >= 0.20) return onProceed();

  const shuffled = [...activeStaff].sort(() => Math.random() - 0.5);
  const st = shuffled[0];
  const excuse = rnd(STAFF_EXCUSES);
  const staffName = (S.staffNames && S.staffNames[st.id]) || st.n;

  // Xử lý các loại drama
  if(excuse.type === 'quit'){
    // Nhân viên nghỉ việc: gỡ khỏi quầy, chủ quán tự làm thay
    S.upg[st.id] = false;
    delete S.hired[st.id];
    if(st.id === 'staffGz'){
      R.gzWork = null;
      R.gzSulking = false;
      clearStaffPouring();
      if(cup && cup.used && cup.staff) cup = newCup();
    }
    save();
    ask(`
      <div class="pbig">${excuse.icon}</div>
      <h2 style="color:#dc2626;margin:4px 0 8px;">ĐÙNG ĐÙNG NỘP ĐƠN NGHỈ VIỆC!</h2>
      <div style="background:#fef2f2;border-left:4px solid #ef4444;padding:12px 14px;border-radius:8px;margin:10px 0;font-size:0.88rem;line-height:1.55;color:#1e293b;text-align:left;">
        👤 <b>${staffName}</b> (${st.n}):<br>
        <i>"${excuse.txt}"</i>
      </div>
      <p style="font-size:0.82rem;color:#b91c1c;font-weight:700;">
        ⚠️ Nhân viên này đã rời tiệm! Hôm nay chủ quán tự xắn tay áo vào làm thay (hoặc vào mục Nâng cấp tuyển nhân viên mới).
      </p>
    `, [['Ngậm ngùi tự làm & Mở quán', onProceed, 1]]);
    return;
  }

  if(excuse.type === 'demand_wage' || excuse.type === 'borrow'){
    const amt = excuse.amt || 100000;
    const canPay = S.money >= amt;
    const isDemand = excuse.type === 'demand_wage';
    const title = isDemand ? 'NHÂN VIÊN ĐÒI TĂNG LƯƠNG / THƯỞNG!' : 'NHÂN VIÊN VÒI TIỀN TẠM ỨNG!';
    const icon = isDemand ? '💸' : '🤲';

    ask(`
      <div class="pbig">${icon}</div>
      <h2 style="color:#d97706;margin:4px 0 8px;">${title}</h2>
      <div style="background:#fffbeb;border-left:4px solid #f59e0b;padding:12px 14px;border-radius:8px;margin:10px 0;font-size:0.88rem;line-height:1.55;color:#1e293b;text-align:left;">
        👤 <b>${staffName}</b> (${st.n}):<br>
        <i>"${excuse.txt}"</i>
      </div>
      <div style="font-size:0.84rem;color:#64748b;margin-bottom:8px;">
        Số tiền yêu cầu: <b style="color:#dc2626;">-${fmt(amt)}</b> (Két quán hiện có: <b>${fmt(S.money)}</b>)
      </div>
    `, [
      [canPay ? `Duyệt chi (-${fmt(amt)})` : 'Két không đủ tiền', () => {
        if(!canPay){
          toast('Két quán không đủ tiền chi!');
          R.staffDramaBuff[st.id] = -0.20;
          toast(excuse.rejectMsg, 4000);
          return onProceed();
        }
        S.money -= amt;
        S.cur.wage = (S.cur.wage || 0) + amt;
        R.staffDramaBuff[st.id] = 0.25;
        save();
        head();
        toast(excuse.acceptMsg, 4000);
        onProceed();
      }, canPay ? 1 : 0],
      ['Từ chối thẳng thừng', () => {
        if(excuse.reason === 'Đóng tiền trọ gấp kẻo bị đuổi'){
          R.staffLate[st.id] = excuse;
        } else {
          R.staffDramaBuff[st.id] = -0.25;
        }
        toast(excuse.rejectMsg, 4000);
        onProceed();
      }]
    ]);
    return;
  }

  if(excuse.type === 'off'){
    R.staffDayOff[st.id] = excuse;
    if(st.id === 'staffGz'){
      R.gzWork = null;
      R.gzSulking = false;
      clearStaffPouring();
      if(cup && cup.used && cup.staff) cup = newCup();
    }
    ask(`
      <div class="pbig">${excuse.icon}</div>
      <h2 style="color:#c2410c;margin:4px 0 8px;">ĐƠN XIN NGHỈ PHÉP ĐỘT XUẤT!</h2>
      <div style="background:#fff7ed;border-left:4px solid #ea580c;padding:12px 14px;border-radius:8px;margin:10px 0;font-size:0.88rem;line-height:1.55;color:#1e293b;text-align:left;">
        👤 <b>${staffName}</b> (${st.n}):<br>
        <i>"Sếp ơi cho em xin nghỉ phép hôm nay vì ${excuse.txt}"</i>
      </div>
      <p style="font-size:0.82rem;color:#64748b;">
        💡 Hôm nay bạn này nghỉ (không tính lương ca này). Chủ tiệm tự tay làm thay nhé!
      </p>
    `, [['Duyệt đơn & Mở quán bán', onProceed, 1]]);
    return;
  }

  if(excuse.type === 'late'){
    R.staffLate[st.id] = excuse;
    ask(`
      <div class="pbig">${excuse.icon}</div>
      <h2 style="color:#d97706;margin:4px 0 8px;">TIN NHẮN XIN ĐẾN TRỄ NỬA CA!</h2>
      <div style="background:#fffbeb;border-left:4px solid #f59e0b;padding:12px 14px;border-radius:8px;margin:10px 0;font-size:0.88rem;line-height:1.55;color:#1e293b;text-align:left;">
        👤 <b>${staffName}</b> (${st.n}):<br>
        <i>"Sếp ơi em xin đến trễ nửa ca vì ${excuse.txt}"</i>
      </div>
      <p style="font-size:0.82rem;color:#64748b;">
        💡 Nửa ca đầu chủ tiệm tự làm nhé, đến giữa ca nhân viên sẽ chạy đến quầy hỗ trợ!
      </p>
    `, [['Duyệt đơn & Bắt đầu bán', onProceed, 1]]);
    return;
  }

  return onProceed();
}

function tryOpen(){
  const miss=missingPrep();
  if(miss.length){R.tab='kho';R.sub=R.sub||{};R.sub.kho=miss[0][1];renderPrep();toast(ico('warn')+' Chưa nấu: '+miss.map(m=>m[0]).join(', '));return}
  checkMktAutoPayTax();
  checkStaffExcuses(() => {
    startDay();
  });
}

/* ---------- TAB ĐÓNG THUẾ TRỰC TUYẾN 72H THEO THỜI GIAN THỰC ---------- */
function paneThue(){
  initTaxState();
  initBankState();
  checkTaxBankPenalty();
  const p = $('pane');
  if(!p) return;

  const isActive = isTaxActive();
  const isOverdue = isTaxOverdue();
  const money = S.money || 0;

  if(!window._selectedTaxPct || window._selectedTaxPct < 5 || window._selectedTaxPct > 15) window._selectedTaxPct = 15;
  const pct = Math.max(5, Math.min(15, window._selectedTaxPct));
  const taxAmount = Math.round(money * (pct / 100));

  let statusHTML = '';
  if(isActive){
    const rem = S.tax.expiresAt - Date.now();
    statusHTML = `
      <div class="tax-status-box active">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;">
          <div style="font-weight:900;font-size:1.02rem;">🟢 ĐÃ ĐÓNG THUẾ HỢP LỆ — ĐANG ĐƯỢC BẢO HỘ 72H (3 NGÀY THỰC)</div>
          <div id="taxCountdownLive" class="tax-timer-badge active">⏳ Hiệu lực bảo hộ còn: ${formatTaxTime(rem)}</div>
        </div>
        <div style="margin-top:6px;font-size:0.86rem;line-height:1.45;">
          Quán đã đóng thuế đầy đủ mức <b>${Math.round((S.tax.rate || 0.15) * 100)}%</b> (${fmt(S.tax.amount || 0)}). Quán đang nhận được các đặc quyền bảo trợ:
        </div>
        <div class="tax-buff-grid">
          <div class="tax-buff-item">📈 <b>+${Math.round((S.tax.rate || 0.15) * 100)}% Khách ghé quán</b><br><small style="color:#64748b;">Uy tín thương hiệu minh bạch</small></div>
          <div class="tax-buff-item">⚡ <b>+${Math.round((S.tax.rate || 0.15) * 100)}% Tốc độ làm việc</b><br><small style="color:#64748b;">Nhân viên an tâm, hăng say</small></div>
          <div class="tax-buff-item">🛡️ <b>Giảm ${Math.round((S.tax.rate || 0.15) * 100)}% Trộm &amp; lừa đảo</b><br><small style="color:#64748b;">Hạn chế bùng tiền &amp; tiền giả</small></div>
          <div class="tax-buff-item">💎 <b>+${Math.round((S.tax.rate || 0.15) * 100)}% Tỉ lệ x2 bill</b><br><small style="color:#64748b;">Khách sộp nhân đôi tiền nước</small></div>
        </div>
      </div>
    `;
  } else if(isOverdue){
    const over = Date.now() - S.tax.expiresAt;
    statusHTML = `
      <div class="tax-status-box overdue">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;">
          <div style="font-weight:900;font-size:1.02rem;color:#991b1b;">🔴 ⚠️ ĐÃ QUÁ HẠN 72H CHƯA ĐÓNG THUẾ (NỢ THUẾ)</div>
          <div id="taxCountdownLive" class="tax-timer-badge overdue">⚠️ ĐÃ QUÁ HẠN: ${formatTaxTime(over)}</div>
        </div>
        <div style="margin-top:6px;font-size:0.86rem;line-height:1.45;">
          Quán đã quá hạn 72h (3 ngày thực) đóng thuế trực tuyến! Đang chịu hình thức xử phạt cảnh cáo và giám sát nghiêm ngặt:
        </div>
        <div class="tax-buff-grid">
          <div class="tax-buff-item" style="color:#991b1b;">🚨 <b>Tăng 150% Tiền giả &amp; Trộm cắp</b><br><small>Dễ bị bùng tiền, lừa đảo két</small></div>
          <div class="tax-buff-item" style="color:#991b1b;">😤 <b>Khách hàng khó chịu</b><br><small>Khách khó tính, dễ mất kiên nhẫn</small></div>
          <div class="tax-buff-item" style="color:#991b1b;">💔 <b>Nhân viên bất mãn</b><br><small>Giảm 20% tốc độ, dễ đình công</small></div>
        </div>
      </div>
    `;
  } else {
    statusHTML = `
      <div class="tax-status-box grace">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;">
          <div style="font-weight:900;font-size:1.02rem;">🟡 ĐANG TRONG THỜI GIAN ÂN HẠN 72H (3 NGÀY THỰC)</div>
          <div id="taxCountdownLive" class="tax-timer-badge grace">⏳ Hạn chót: ${formatTaxTime(S.tax.expiresAt - Date.now())}</div>
        </div>
        <div style="margin-top:6px;font-size:0.86rem;line-height:1.45;">
          Hãy hoàn thành đóng thuế trực tuyến để nhận ngay Buff phát triển và bảo vệ an ninh quán!
        </div>
      </div>
    `;
  }

  const quickPills = [5, 8, 10, 12, 15].map(val => `
    <button type="button" class="tax-pct-pill ${pct === val ? 'on' : ''}" data-tax-pct="${val}">
      ${val}% ${val === 5 ? '(Tối thiểu)' : val === 15 ? '(Tối đa)' : ''}
    </button>
  `).join('');

  const bankBal = (S.bank && S.bank.balance) || 0;
  const bankPrin = (S.bank && S.bank.principal) || 0;
  const bankCap = (S.bank && S.bank.cap) || 10000000;
  const bankTerm = (S.bank && S.bank.termDays) || 7;
  const bankDays = (S.bank && S.bank.daysPassed) || 0;
  const bankGain = Math.max(0, bankBal - bankPrin);

  p.innerHTML = `
    <div class="tax-pane-wrap">
      <div style="display:flex;align-items:center;gap:8px;">
        <span style="font-size:24px;">🏛️</span>
        <div>
          <h2 style="font-weight:900;font-size:1.15rem;margin:0;color:var(--ink);">ĐÓNG THUẾ TRỰC TUYẾN 72H (3 NGÀY THỰC)</h2>
          <div style="font-size:0.82rem;color:var(--soft);">Đóng thuế mỗi 3 ngày thực tế (72 giờ) để nhận Buff toàn diện &amp; phòng ngừa trộm cắp</div>
        </div>
      </div>

      ${statusHTML}

      <div class="tax-slider-card">
        <div style="font-weight:800;font-size:0.95rem;color:var(--ink);margin-bottom:4px;">
          💰 Chọn mức đóng thuế theo số tiền két hiện có
        </div>
        <div style="font-size:0.85rem;color:var(--soft);margin-bottom:10px;">
          Két hiện có: <b style="color:#059669;font-size:0.95rem;">${fmt(money)}</b> · Mức thuế quy định từ <b>5% đến 15%</b>.
        </div>

        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
          <span style="font-size:0.88rem;font-weight:700;">Tỉ lệ đóng thuế:</span>
          <span id="taxSelectedPct" style="font-size:1.1rem;font-weight:900;color:var(--pink);">${pct}%</span>
        </div>

        <input type="range" id="taxRangeIn" class="tax-range-input" min="5" max="15" step="1" value="${pct}">

        <div class="tax-pills">${quickPills}</div>

        <div style="background:var(--bg);border-radius:12px;padding:12px;margin:10px 0;display:flex;justify-content:space-between;align-items:center;">
          <div>
            <div style="font-size:0.82rem;color:var(--soft);">Số tiền thuế cần nộp:</div>
            <div id="taxSelectedAmt" style="font-size:1.35rem;font-weight:900;color:#d97706;">${fmt(taxAmount)}</div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:0.82rem;color:var(--soft);">Quyền lợi nhận được:</div>
            <div style="font-size:1.05rem;font-weight:800;color:#16a34a;">Buff +<span id="taxBuffVal">${pct}</span>% / 72h</div>
          </div>
        </div>

        <button type="button" id="btnPayTax" class="big pri" style="width:100%;padding:12px;font-size:1rem;font-weight:800;border-radius:12px;cursor:pointer;">
          🏛️ Nộp thuế ngay (${fmt(taxAmount)} · Buff +${pct}%)
        </button>
      </div>

      <!-- TÀ TƯA BANK (TIẾT KIỆM KÉP AN TOÀN 7%) -->
      <div class="tatua-bank-card" style="background:linear-gradient(135deg,#064e3b 0%,#047857 100%);color:#fff;border-radius:14px;padding:14px;margin-top:12px;box-shadow:0 6px 18px rgba(4,120,87,0.22);border:1px solid rgba(255,255,255,0.15);">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;border-bottom:1px solid rgba(255,255,255,0.18);padding-bottom:10px;margin-bottom:10px;">
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="font-size:28px;">🏦</span>
            <div>
              <div style="font-size:0.75rem;letter-spacing:0.5px;text-transform:uppercase;color:#a7f3d0;font-weight:800;">BẢO HỘ TÀI CHÍNH AN TOÀN 100%</div>
              <h3 style="margin:0;font-size:1.15rem;font-weight:900;color:#fff;">NGÂN HÀNG TÀ TƯA BANK</h3>
            </div>
          </div>
          <div style="background:rgba(255,255,255,0.18);padding:4px 10px;border-radius:20px;font-size:0.78rem;font-weight:800;color:#ecfdf5;display:flex;align-items:center;gap:5px;">
            <span>🛡️ LÃI KÉP 1% / NGÀY</span>
          </div>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px;">
          <div style="background:rgba(0,0,0,0.18);border-radius:10px;padding:10px;">
            <div style="font-size:0.75rem;color:#a7f3d0;margin-bottom:2px;">💰 Tiền gửi hiện tại:</div>
            <div style="font-size:1.25rem;font-weight:900;color:#fef08a;">${fmt(bankBal)}</div>
            <div style="font-size:0.72rem;color:#d1fae5;margin-top:2px;">(Gốc: ${fmt(bankPrin)}${bankGain>0?` · Lãi: +${fmt(bankGain)}`:''})</div>
          </div>
          <div style="background:rgba(0,0,0,0.18);border-radius:10px;padding:10px;">
            <div style="font-size:0.75rem;color:#a7f3d0;margin-bottom:2px;">📈 Hạn mức gửi tối đa:</div>
            <div style="font-size:1.1rem;font-weight:900;color:#fff;">${fmt(bankCap)}</div>
            <div style="font-size:0.72rem;color:#a7f3d0;margin-top:2px;">(+10% mỗi khi đạt 5★, max 1 tỷ)</div>
          </div>
        </div>

        <div style="background:rgba(255,255,255,0.1);border-radius:10px;padding:9px 12px;font-size:0.8rem;line-height:1.45;margin-bottom:12px;color:#f0fdf4;">
          <div style="display:flex;justify-content:space-between;margin-bottom:3px;">
            <span>⏳ Kỳ hạn cam kết: <b>${bankTerm} ngày bán nước</b></span>
            <span>Tiến độ: <b style="color:#fef08a;">${bankDays}/${bankTerm} ngày</b></span>
          </div>
          <div style="font-size:0.74rem;color:#cbd5e1;">
            🔒 <b>Đặc quyền:</b> Tiền gửi tuyệt đối không bị trộm cắp, bùng tiền hay lừa đảo két.<br>
            ⚠️ <b>Cảnh báo:</b> Rút trước hạn mất sạch lãi suất. <b>Quên đóng thuế 72h sẽ bị tịch thu toàn bộ tiền gửi!</b>
          </div>
        </div>

        <div style="display:flex;gap:8px;">
          <button type="button" id="btnBankDeposit" class="sbtn" style="flex:1;background:#f59e0b;color:#78350f;padding:10px;font-weight:900;font-size:0.9rem;border-radius:10px;border:none;cursor:pointer;">
            ➕ Gửi tiết kiệm
          </button>
          <button type="button" id="btnBankWithdraw" class="sbtn" style="flex:1;background:rgba(255,255,255,0.22);color:#fff;padding:10px;font-weight:900;font-size:0.9rem;border-radius:10px;border:1px solid rgba(255,255,255,0.3);cursor:pointer;">
            💸 Rút tiền
          </button>
        </div>
      </div>

      <div style="background:var(--panel);border:1px dashed var(--line);border-radius:12px;padding:12px;font-size:0.84rem;color:var(--soft);line-height:1.5;margin-top:12px;">
        📜 <b>Chính sách thuế &amp; Thống kê tiệm:</b><br>
        • <b>Chu kỳ 72 giờ (3 ngày thực):</b> Thuế có hiệu lực trong đúng 72 giờ (3 ngày) thực tế. Hết 72h cần đóng chu kỳ mới.<br>
        • <b>Tỉ lệ Buff:</b> Đóng bao nhiêu % két thì nhận đúng bấy nhiêu % tăng khách, tăng tốc độ và giảm trộm cắp (tối đa 15%).<br>
        • <b>Nhân viên Me Két Tinh:</b> Luôn tự động trích 15% nộp thuế khi gần đến hạn, bảo vệ an toàn 100% cho tiệm.<br>
        • <b>Tổng thuế đã nộp:</b> <b style="color:#059669;">${fmt(S.tax.totalPaid || 0)}</b> (đã nộp ${S.tax.payCount || 0} lần).
      </div>
    </div>
  `;

  // Start live timer
  if(window._taxLiveInterval) clearInterval(window._taxLiveInterval);
  window._taxLiveInterval = setInterval(() => {
    const el = $('taxCountdownLive');
    if(!el){ clearInterval(window._taxLiveInterval); return; }
    if(isTaxActive()){
      const rem = S.tax.expiresAt - Date.now();
      if(rem > 0){
        el.textContent = `⏳ Hiệu lực bảo hộ còn: ${formatTaxTime(rem)}`;
      } else {
        paneThue();
      }
    } else if(isTaxOverdue()){
      const over = Date.now() - S.tax.expiresAt;
      el.textContent = `⚠️ ĐÃ QUÁ HẠN: ${formatTaxTime(over)}`;
    }
  }, 1000);

  // Bind slider
  const rng = $('taxRangeIn');
  if(rng){
    rng.oninput = () => onTaxSliderChange(+rng.value);
  }

  // Bind quick pills
  p.querySelectorAll('.tax-pct-pill').forEach(btn => {
    btn.onclick = () => {
      const v = +btn.dataset.taxPct;
      if(rng) rng.value = v;
      onTaxSliderChange(v);
    };
  });

  // Bind Pay button
  const payBtn = $('btnPayTax');
  if(payBtn){
    payBtn.onclick = executePayTax;
  }

  // Bind Bank buttons
  const depBtn = $('btnBankDeposit');
  if(depBtn) depBtn.onclick = openBankDepositDlg;
  const withBtn = $('btnBankWithdraw');
  if(withBtn) withBtn.onclick = openBankWithdrawDlg;
}

function onTaxSliderChange(newPct){
  window._selectedTaxPct = newPct;
  const pctEl = $('taxSelectedPct');
  const amtEl = $('taxSelectedAmt');
  const buffEl = $('taxBuffVal');
  const btn = $('btnPayTax');
  const taxAmt = Math.round((S.money || 0) * (newPct / 100));
  if(pctEl) pctEl.textContent = newPct + '%';
  if(amtEl) amtEl.textContent = fmt(taxAmt);
  if(buffEl) buffEl.textContent = newPct;
  if(btn) btn.innerHTML = `🏛️ Nộp thuế ngay (${fmt(taxAmt)} · Buff +${newPct}%)`;
  document.querySelectorAll('.tax-pct-pill').forEach(b => {
    b.classList.toggle('on', +b.dataset.taxPct === newPct);
  });
}

function executePayTax(){
  const pct = Math.max(5, Math.min(15, window._selectedTaxPct || 15));
  const taxAmount = Math.round((S.money || 0) * (pct / 100));

  if((S.money || 0) <= 0){
    return toast('Két quán hiện không có tiền để đóng thuế!');
  }
  if(taxAmount <= 0){
    return toast('Số tiền nộp thuế tối thiểu chưa đủ!');
  }

  S.money -= taxAmount;
  S.cur.tax = (S.cur.tax || 0) + taxAmount;
  S.tax.paidAt = Date.now();
  S.tax.expiresAt = Math.max(Date.now(), S.tax.expiresAt || Date.now()) + TAX_CYCLE_MS;
  S.tax.rate = pct / 100;
  S.tax.amount = taxAmount;
  S.tax.totalPaid = (S.tax.totalPaid || 0) + taxAmount;
  S.tax.payCount = (S.tax.payCount || 0) + 1;

  save();
  head();
  sfx('coin');
  sfx('lvup');

  ask(`
    <div style="text-align:center;">
      <div style="font-size:42px;margin-bottom:6px;">🏛️📜</div>
      <h2 style="color:#059669;font-weight:900;font-size:1.25rem;margin:2px 0 6px;">BIÊN LAI ĐÓNG THUẾ TRỰC TUYẾN 72H</h2>
      <div style="background:#f0fdf4;border:1.5px solid #86efac;border-radius:12px;padding:12px;margin:10px 0;text-align:left;font-size:0.88rem;line-height:1.5;color:#14532d;">
        ✅ <b>Trạng thái:</b> ĐÃ NỘP THUẾ THÀNH CÔNG<br>
        💰 <b>Số tiền nộp:</b> <b style="color:#d97706;font-size:1rem;">${fmt(taxAmount)}</b> (${pct}% két)<br>
        ⏱️ <b>Thời hạn bảo hộ:</b> 72 Giờ Thực Tế (3 ngày) (đến ${new Date(S.tax.expiresAt).toLocaleTimeString('vi-VN')} ngày ${new Date(S.tax.expiresAt).toLocaleDateString('vi-VN')})<br>
        ✨ <b>Hiệu ứng kích hoạt:</b><br>
        • Tăng <b>+${pct}%</b> khách hàng ghé quán.<br>
        • Tăng <b>+${pct}%</b> tốc độ làm việc của toàn bộ nhân viên.<br>
        • Giảm <b>${pct}%</b> nguy cơ trộm cắp, tiền giả và bùng tiền!<br>
        • Tăng <b>+${pct}%</b> tỉ lệ may mắn x2 tiền bill mỗi ly nước!
      </div>
    </div>
  `, [
    ['Đã hiểu & Xác nhận', () => {
      paneThue();
      renderPrep();
      toast(`Đã nộp thuế ${fmt(taxAmount)}! Nhận Buff +${pct}% trong 72h thực tế! 🎉`, 4000);
    }, 1]
  ]);
}

/* ---------- HỆ THỐNG NÂNG CẤP CẤP ĐỘ LEVEL BẰNG TIỀN (Nx3: 10k, 30k, 90k, 270k...) ---------- */
const UPG_LV_CFG = {
  tra: {
    name: 'Trà',
    desc: 'Tăng 0.5% tỉ lệ khách ghé quán mỗi cấp',
    pct: 0.5,
    unit: '%',
    curBonus: lv => `+${(lv * 0.5).toFixed(1)}% khách ghé quán`
  },
  huong: {
    name: 'Hương',
    desc: 'Tăng 0.5% thời gian kiên nhẫn chờ mỗi cấp',
    pct: 0.5,
    unit: '%',
    curBonus: lv => `+${(lv * 0.5).toFixed(1)}% thời gian chờ`
  },
  top: {
    name: 'Topping',
    desc: 'Giảm 0.5% tỉ lệ đánh giá xấu/kém mỗi cấp',
    pct: 0.5,
    unit: '%',
    curBonus: lv => `Giảm ${(lv * 0.5).toFixed(1)}% đánh giá kém`
  },
  equip: {
    name: 'Trang bị',
    desc: 'Tăng 1% tốc độ thao tác máy & giảm 1% thiệt hại sự cố mỗi cấp',
    pct: 1.0,
    unit: '%',
    curBonus: lv => `+${(lv * 1.0).toFixed(1)}% tốc độ máy · Giảm ${(lv * 1.0).toFixed(1)}% sự cố`
  },
  staff: {
    name: 'Nhân viên',
    desc: 'Tăng 2% tốc độ pha chế & 1% tỉ lệ x2 lợi nhuận đơn mỗi cấp',
    pct: 2.0,
    unit: '%',
    curBonus: lv => `+${(lv * 2.0).toFixed(1)}% tốc độ pha chế · +${(lv * 1.0).toFixed(1)}% x2 bill`
  },
  onl: {
    name: 'Online',
    desc: 'Tăng 1% tần suất nổ đơn online mỗi cấp',
    pct: 1.0,
    unit: '%',
    curBonus: lv => `+${(lv * 1.0).toFixed(1)}% tần suất đơn online`
  }
};

function getUpgLvCost(lv){
  return 1000 * Math.pow(2, lv || 0);
}

function upgLvBanner(cat){
  const cfg = UPG_LV_CFG[cat];
  if(!cfg) return '';
  const lv = (S.upgLv && S.upgLv[cat]) || 0;
  const cost = getUpgLvCost(lv);
  const canAfford = S.money >= cost;
  return `
    <div class="upg-lv-banner">
      <div class="ulv-info">
        <span class="ulv-tag">⭐ NÂNG CẤP CẤP ĐỘ (LEVEL)</span>
        <div class="ulv-title">Hạng mục: ${cfg.name} (Cấp ${lv})</div>
        <div class="ulv-desc">${cfg.desc}</div>
        <div class="ulv-current">Hiệu quả hiện tại: <b>${cfg.curBonus(lv)}</b></div>
      </div>
      <button type="button" class="sbtn pri ulv-btn" data-upglv="${cat}" ${!canAfford ? 'disabled' : ''}>
        <span class="ulv-next">Nâng lên Cấp ${lv + 1}</span>
        <span class="ulv-cost">${fmt(cost)}</span>
      </button>
    </div>
  `;
}

function handleUpgLv(cat){
  if(inDebt()){ toast('Đang nợ, trả xong mới nâng cấp được'); return; }
  const cfg = UPG_LV_CFG[cat];
  if(!cfg) return;
  S.upgLv = S.upgLv || { tra:0, huong:0, top:0, equip:0, staff:0, onl:0 };
  const curLv = S.upgLv[cat] || 0;
  const cost = getUpgLvCost(curLv);
  if(S.money < cost){
    toast('Két không đủ tiền để nâng cấp cấp độ!');
    return;
  }
  S.money -= cost;
  S.upgLv[cat] = curLv + 1;
  S.cur.equip = S.cur.equip || [];
  S.cur.equip.push({ n: `Nâng cấp Level ${cfg.name} (Cấp ${curLv + 1})`, v: cost });
  save();
  sfx('lvup');
  toast(`🎉 Đã nâng cấp ${cfg.name} lên Cấp ${curLv + 1}! (${cfg.curBonus(curLv + 1)})`);
  refreshPrep();
}

function paneUpg(){
  const row=k=>`<div class="rowi${(S.off||{})[k]?' offm':''}">${itemIcon(k)}<div><div class="nm">${ITEMS[k].n}</div>${(S.off||{})[k]?'<div class="sub">Đã bỏ khỏi menu</div>':''}</div>${S.unlocked[k]?`<button class="sbtn ghost" data-moff="${k}"><b>✓</b>Bỏ khỏi menu</button>`:(S.off||{})[k]?`<button class="sbtn pri" data-mon="${k}"><b>Miễn phí</b>Thêm lại</button>`:`<button class="sbtn pri" data-un="${k}" ${S.money<ITEMS[k].unlock?'disabled':''}><b>${fmt(ITEMS[k].unlock)}</b>Mua</button>`}</div>`;
  const tea=upgLvBanner('tra')+BASE_KEYS.map(row).join('');
  const bRow=k=>{const n=qty(k),bs=S.stock[k].filter(b=>b.q>0),c=bottleCost(k);
    return `<div class="rowi">${itemIcon(k)}<div><div class="nm">${ITEMS[k].n}</div><div class="sub${n?'':' low'}">${n?`${ico('box')} Còn ${n} ly · `+bs.map(b=>`${b.q} ly hết hạn ngày ${b.exp}`).join(', '):'Hết hàng, chưa có trong menu'}</div></div><button class="sbtn pri" data-bottle="${k}" ${S.money<c?'disabled':''}><b>${fmt(c)}</b>Mua chai</button></div>`};
  const flav=upgLvBanner('huong')+`<div class="note">1 chai = ${CFG.bottleN} ly, dùng được ${CFG.bottleLife} ngày tính cả ngày mua. Mua 2 chai được ${CFG.bottleN*2} ly. Hết chai thì phải mua chai mới mới dùng được, chai quá hạn bị đổ bỏ.</div>`+FLAV_KEYS.map(bRow).join('');
  const top=upgLvBanner('top')+groupRows(TOP_KEYS,row);
  const brandRow=`<div class="rowi"><span class="icon">🎨</span><div><div class="nm">Bộ nhận diện thương hiệu</div><div class="sub">Tự thiết kế tem thương hiệu in lên ly: màu nền, logo, tên quán, khẩu hiệu</div></div>${S.upg.brandKit?`<button class="sbtn" data-brand="1">🎨 Thiết kế</button>`:`<button class="sbtn pri" data-buybrand="1" ${S.money<BRAND_COST?'disabled':''}><b>${fmt(BRAND_COST)}</b>Mua</button>`}</div>`+(S.upg.brandKit&&S.brand?`<div class="brandprevrow">${temHTML(S.brand,88,true)}</div>`:'');
  const tbN=S.tablets||0,tabRow=`<div class="rowi"><span class="icon">${ico('phone')}</span><div><div class="nm">Tablet nhận đơn online (${tbN}/${APPS.length})</div><div class="sub">Mỗi tablet chạy 1 app giao hàng (Soppi, Tóp Tóp). Phải có tablet thì đơn mới đổ về, shipper mới tới lấy hàng</div></div>${tbN>=APPS.length?'<span class="okline">✓</span>':`<button class="sbtn pri" data-tablet="1" ${S.money<CFG.tablet?'disabled':''}><b>${fmtTr(CFG.tablet)}</b>Mua</button>`}</div>`;
  const eq=upgLvBanner('equip')+`<div class="wl" style="text-align:right;margin-bottom:2px">⚡ +${fmt(CFG.utilPerUpg)}/ngày</div>`+UPG.map(u=>`<div class="rowi"><span class="icon">${u.i}</span><div><div class="nm">${u.n}</div><div class="sub">${u.d}</div></div>${S.upg[u.id]?'<span class="okline">✓</span>':`<button class="sbtn pri" data-up="${u.id}" ${S.money<u.cost?'disabled':''}><b>${fmt(u.cost)}</b>Mua</button>`}</div>`).join('')+brandRow+tabRow;
  const staff=upgLvBanner('staff')+`<div class="note">Thuê một lần, sau đó trả lương mỗi ngày mở cửa. Có nhân viên thì toàn bộ tiền tip của khách là của nhân viên, quán không nhận. Cho nghỉ thì hết trả lương, gọi đi làm lại không tốn tiền thuê (riêng Gen Z nghỉ việc phải thuê lại giá 1tr).</div>`+STAFF.map(u=>{
    const isHiredBefore = (S.hired||{})[u.id];
    const icon = staffAvatarImg(u.id, 40);
    const wageTxt = u.id === 'staffMkt' ? 'Lương 200.000đ/ngày (Tự động rep đánh giá, tăng 20% khách & pha siêu nhanh)' : u.id === 'staffSv' ? 'Lương 200.000đ/ca đêm (bán xuyên đêm 22h - 6h)' : u.id === 'staffGz' ? 'Lương 25k/giờ (275.000đ/ngày)' : u.id === 'staff0' ? 'Lương 0đ (Thử việc không lương)' : u.id === 'staff1' ? 'Lương 15k/giờ (165.000đ/ngày)' : u.id === 'staff2' ? 'Lương 200.000đ/ngày (Tăng ca 40k/h sau 22h)' : u.id === 'staffOn' ? 'Lương 250.000đ/ngày' : u.id === 'staff3' ? 'Lương 200.000đ/ngày' : u.id === 'staffBuyer' ? 'Lương 100.000đ/ngày' : `Lương ${fmt(CFG[u.wage]||0)}/ngày`;
    const costTxt = u.cost ? (u.cost >= 1e6 ? (u.cost/1e6)+'tr' : fmt(u.cost)) : 'Miễn phí';
    const personName = staffPersonName(u.id);
    const pName = personName ? ` <span style="font-weight:600;color:#059669;font-size:0.88em">(${personName})</span>` : '';
    return `<div class="rowi"><span class="icon">${icon}</span><div><div class="nm">${u.n}${pName}</div>${u.d?`<div class="sub">${u.d}</div>`:''}<div class="sub">${wageTxt}</div></div>${S.upg[u.id]?`<button class="sbtn" data-fire="${u.id}"><b>✓</b>Cho nghỉ</button>`:S.day<u.from?`<span class="wl">Ngày ${u.from}</span>`:u.need&&!u.need()?`<span class="wl">${u.needT}</span>`:isHiredBefore?`<button class="sbtn pri" data-hire="${u.id}"><b>Gọi</b>đi làm</button>`:`<button class="sbtn pri" data-hire="${u.id}" ${S.money<u.cost?'disabled':''}><b>${costTxt}</b>Thuê</button>`}</div>`;
  }).join('');
  const onl=upgLvBanner('onl')+onlineCard();
  $('pane').innerHTML=subTabs('upg',[[ico('teapot')+' Trà',tea],[ico('strawberry')+' Hương',flav],[ico('pearlbowl')+' Topping',top],[ico('tools')+' Trang bị',eq],[ico('people')+' Nhân viên',staff],[ico('phone')+' Online',onl]]);
  bindSub('upg');
  $('pane').onclick=e=>{
    const ulv=e.target.closest('[data-upglv]');
    if(ulv){
      handleUpgLv(ulv.dataset.upglv);
      return;
    }
    const a=e.target.closest('[data-un]'),b=e.target.closest('[data-up]'),hi=e.target.closest('[data-hire]'),fi=e.target.closest('[data-fire]'),bb=e.target.closest('[data-buybrand]'),bd=e.target.closest('[data-brand]'),bt=e.target.closest('[data-bottle]'),tb=e.target.closest('[data-tablet]'),aj=e.target.closest('[data-join]');
    if(bt){const k=bt.dataset.bottle,c=bottleCost(k);if(S.money<c)return;S.money-=c;addStock(k,CFG.bottleN);const g=S.cur.ing[k]=S.cur.ing[k]||{q:0,v:0};g.q+=CFG.bottleN;g.v+=c;syncFlav();save();toast('Đã mua chai '+low(ITEMS[k].n)+': '+qty(k)+' ly');refreshPrep(1);return}
    if((a||b||hi||bb||tb||aj)&&inDebt()){toast('Đang nợ, trả xong mới mua được');return}
    if(tb){if((S.tablets||0)>=APPS.length||S.money<CFG.tablet)return;S.money-=CFG.tablet;S.cur.equip.push({n:'Tablet nhận đơn online',v:CFG.tablet});S.tablets=(S.tablets||0)+1;save();toast('Đã mua tablet ('+S.tablets+'/'+APPS.length+')');refreshPrep();return}
    const opOnl=e.target.closest('[data-openonline]');
    if(opOnl){
      S.online=true;
      S.apps=S.apps||{};
      S.apps.sp=true;S.apps.tt=true;S.apps.be=true;S.apps.gr=true;
      S.tablets=Math.max(1, S.tablets||0);
      save();
      toast('🎉 Đã kích hoạt mở bán online trên Soppi, Tóp Tóp, Biiiii và Gờ Ráp! Hãy mua thêm tablet để chạy nhiều app cùng lúc 🛵');
      refreshPrep();
      return;
    }
    if(aj){
      const ap=APPS.find(x=>x.id===aj.dataset.join);
      if(!ap||S.money<ap.fee)return;
      S.money-=ap.fee;
      S.cur.equip.push({n:'Gia nhập '+ap.n,v:ap.fee});
      S.apps=S.apps||{};
      S.apps[ap.id]=true;
      S.tablets=Math.max(APPS.filter(appJoined).length, S.tablets||0, 1);
      save();
      toast('🎉 Đã gia nhập '+ap.n+' thành công! Đơn hàng online đã sẵn sàng đổ về 🛵');
      refreshPrep();
      return;
    }
    if(bb){if(S.money<BRAND_COST)return;S.money-=BRAND_COST;S.cur.equip.push({n:'Bộ nhận diện thương hiệu',v:BRAND_COST});S.upg.brandKit=true;save();toast('Đã mua bộ nhận diện thương hiệu');refreshPrep();setTimeout(brandDlg,60);return}
    if(bd){brandDlg();return}
    const mo=e.target.closest('[data-moff]'),mn=e.target.closest('[data-mon]');
    if(mo){const k=mo.dataset.moff;if(ITEMS[k].type==='base'&&BASE_KEYS.filter(x=>S.unlocked[x]).length<2){toast('Menu phải còn ít nhất 1 loại trà');return}
      if(ITEMS[k].type==='top'&&TOP_KEYS.filter(x=>S.unlocked[x]).length<2){toast('Menu phải còn ít nhất 1 topping');return}
      S.off=S.off||{};S.off[k]=true;S.unlocked[k]=false;save();toast('Đã bỏ '+ITEMS[k].n+' khỏi menu. Thêm lại lúc nào cũng được, miễn phí');refreshPrep(1);return}
    if(mn){const k=mn.dataset.mon;S.off=S.off||{};delete S.off[k];S.unlocked[k]=true;save();toast('Đã thêm lại '+ITEMS[k].n+' vào menu');refreshPrep(1);return}
    if(hi){
      hireOrCallStaff(hi.dataset.hire);
      return;
    }
    if(fi){
      fireStaff(fi.dataset.fire);
      return;
    }
    if(a){const k=a.dataset.un;if(S.money<ITEMS[k].unlock)return;S.money-=ITEMS[k].unlock;S.cur.equip.push({n:'Công thức '+ITEMS[k].n,v:ITEMS[k].unlock});S.unlocked[k]=true;save();toast('Đã thêm '+ITEMS[k].n+' vào menu');refreshPrep(1)}
    if(b){const u=UPG.find(x=>x.id===b.dataset.up);if(S.money<u.cost)return;S.money-=u.cost;S.cur.equip.push({n:u.n,v:u.cost});S.upg[u.id]=true;if(u.id==='fridge'){if(S.stock&&S.stock.ice){const totalIce=S.stock.ice.reduce((a,x)=>a+x.q,0);S.stock.ice=totalIce>0?[{q:totalIce,exp:99999}]:[]}}if(u.id==='floor2'&&R&&R.slots){while(R.slots.length<10)R.slots.push(null)}else if(u.id==='slot4'&&R&&R.slots&&R.slots.length<4&&!S.upg.floor2){while(R.slots.length<4)R.slots.push(null)}save();toast('Đã lắp '+u.n);refreshPrep()}
  };
}
/* tem: tên quán luôn hiện đủ. Kiểu chữ: thẳng (tự thu nhỏ, dài quá thì xuống 2 dòng), cong trên, cong dưới */
let _tmc=null;function txtW(t,fs){/* chừa 12% cho khoảng cách chữ và chênh lệch phông */try{_tmc=_tmc||document.createElement('canvas').getContext('2d');_tmc.font=`800 ${fs}px "Baloo 2",system-ui,sans-serif`;return _tmc.measureText(t).width*1.12+t.length*.2}catch(e){return t.length*fs*.62}}
function temHTML(brand,px,full){if(!brand||!brand.i)return '';
  const bg=brand.bg||BRAND_BGS[0].c,tc=(BRAND_BGS.find(x=>x.c===bg)||BRAND_BGS[0]).t,fr=brand.frame||'round',rd=fr==='round',nl=brand.nl||'line';
  const nm=String(shopName()||'Tiệm Trà Nhỏ'),bw=Math.max(1.5,px*.025),ss=Math.max(6,Math.round(px*.072));
  const inner=px-2*bw-px*.12-2,slW=inner*(rd?.8:1);let sfs=ss;if(full&&brand.slogan)while(sfs>5&&txtW(brand.slogan,sfs)*.95>slW)sfs-=.5;
  const sl=full&&brand.slogan?`<div class="tem-sl" style="font-size:${sfs.toFixed(1)}px;max-width:${Math.round(slW)}px">${esc(brand.slogan)}</div>`:'';
  const H=rd?px:px*(nl==='line'?1:1),box=`width:${px}px;${rd||nl!=='line'?`height:${H}px;`:''}background:${bg};color:${tc};--tf:${tc};border-width:${bw.toFixed(1)}px;padding:${(px*.06).toFixed(1)}px`;
  if(nl==='line'){const rib=fr==='ribbon',W=inner*(rd?.86:1)-(rib?Math.max(10,px*.1)+6:0);let fs=Math.max(7,px*(rd?.1:.115)),two=false;const min=Math.max(5,px*.06);
    while(fs>min&&txtW(nm,fs)>W)fs-=.5;if(txtW(nm,fs)>W){two=true;fs=Math.max(min,px*.075);while(fs>5&&txtW(nm,fs)>W*1.9)fs-=.5}
    const ic=Math.round(px*(rd?(two?.34:.4):.5));
    return `<div class="tem tem-${fr}" style="${box}"><div class="tem-ic" style="width:${ic}px;height:${ic}px"><img src="${IMG}brand/${brand.i}.png" alt="" width="${ic}" height="${ic}"></div>
    <div class="tem-nm${two?' two':''}" style="font-size:${fs.toFixed(1)}px;max-width:${Math.round(W+(rib?Math.max(10,px*.1)+6:0))}px${rib?`;padding:1px ${Math.max(5,px*.05).toFixed(0)}px`:''}">${esc(nm)}</div>${sl}</div>`}
  /* chữ cong */
  const c=px/2,cy=H/2,Ro=px/2-bw-px*.05,top=nl==='arc';let fs=px*.13;const len=R=>2*Math.PI*R*(nm.length>16?.62:.45);
  const Rb=f=>top?Ro-f*.8:Ro-f*.25;while(fs>4&&txtW(nm,fs)>len(Rb(fs)))fs-=.5;const R=Rb(fs),id='ta'+Math.random().toString(36).slice(2,8);
  /* vòng tròn đủ: cong trên đi từ đáy theo chiều kim đồng hồ, cong dưới đi từ đỉnh ngược chiều; giữa đường là đỉnh / đáy tem */
  const d=top?`M ${c} ${cy+R} A ${R} ${R} 0 1 1 ${c} ${cy-R} A ${R} ${R} 0 1 1 ${c} ${cy+R}`:`M ${c} ${cy-R} A ${R} ${R} 0 1 0 ${c} ${cy+R} A ${R} ${R} 0 1 0 ${c} ${cy-R}`;
  const ic=Math.round(px*(nm.length>16?.34:.42));
  return `<div class="tem tem-${fr} tem-arc" style="${box}"><svg class="tem-svg" viewBox="0 0 ${px} ${H}" width="${px}" height="${H}" aria-label="${esc(nm)}"><path id="${id}" d="${d}" fill="none"/><text font-size="${fs.toFixed(1)}" font-weight="800" fill="${tc}" style="font-family:'Baloo 2',system-ui,sans-serif"><textPath href="#${id}" startOffset="50%" text-anchor="middle">${esc(nm)}</textPath></text></svg>
    <div class="tem-ic" style="width:${ic}px;height:${ic}px;margin-${top?'top':'bottom'}:${Math.round(px*.1)}px"><img src="${IMG}brand/${brand.i}.png" alt="" width="${ic}" height="${ic}"></div>${top?sl:''}</div>`}
function brandDlg(){$('card').onchange=null;
  const cur=S.brand?{...S.brand}:{bg:BRAND_BGS[2].c,i:BRAND_ICONS[21],frame:'round',slogan:''};
  const draw=()=>{
    $('card').innerHTML=`<h2>🎨 Thiết kế tem thương hiệu</h2><p>Tem sẽ in lên mọi ly bạn pha. Tên quán tự hiện theo tên đã đặt.</p>
    <div class="bprev">${temHTML(cur,140,true)}</div>
    <div class="bsec">Kiểu khung</div>
    <div class="bframes">${BRAND_FRAMES.map(f=>`<button class="bfr${f.id===(cur.frame||'round')?' on':''}" data-bf="${f.id}">${f.n}</button>`).join('')}</div>
    <div class="bsec">Kiểu chữ tên quán</div>
    <div class="bframes">${[['line','Thẳng hàng'],['arc','Cong phía trên'],['arcb','Cong phía dưới']].map(([k,n])=>`<button class="bfr${k===(cur.nl||'line')?' on':''}" data-bn="${k}">${n}</button>`).join('')}</div>
    <div class="bsec">Màu nền tem</div>
    <div class="bcolors">${BRAND_BGS.map(o=>`<button class="bcol${o.c===cur.bg?' on':''}" data-bc="${o.c}" style="background:${o.c}" aria-label="Màu nền"></button>`).join('')}</div>
    <div class="bsec">Khẩu hiệu (tuỳ chọn)</div>
    <input id="bSlo" class="pinbox nm" maxlength="24" value="${esc(cur.slogan||'')}" placeholder="vd: Trà sữa mỗi ngày" aria-label="Khẩu hiệu">
    <div class="bslos">${BRAND_SLOGANS.map(s=>`<button class="bslo" data-bs="${esc(s)}">${esc(s)}</button>`).join('')}<button class="bslo" data-bs="">Bỏ trống</button></div>
    <div class="bsec">Hình logo</div>
    <div class="bgrid">${BRAND_ICONS.map(k=>`<button class="bico${k===cur.i?' on':''}" data-bi="${k}" aria-label="Logo"><img src="${IMG}brand/${k}.png" alt="" loading="lazy"></button>`).join('')}</div>
    <div class="askbtns"><button class="big" id="bSave">Lưu tem</button><button class="sbtn ghost" id="bClose">Đóng</button></div>`;
    $('modal').hidden=false;
    const syncSlo=()=>{cur.slogan=$('bSlo').value};
    $('card').querySelectorAll('[data-bf]').forEach(el=>el.onclick=()=>{syncSlo();cur.frame=el.dataset.bf;draw()});
    $('card').querySelectorAll('[data-bn]').forEach(el=>el.onclick=()=>{syncSlo();cur.nl=el.dataset.bn;draw()});
    $('card').querySelectorAll('[data-bc]').forEach(el=>el.onclick=()=>{syncSlo();cur.bg=el.dataset.bc;draw()});
    $('card').querySelectorAll('[data-bi]').forEach(el=>el.onclick=()=>{syncSlo();cur.i=el.dataset.bi;draw()});
    $('card').querySelectorAll('[data-bs]').forEach(el=>el.onclick=()=>{cur.slogan=el.dataset.bs;draw()});
    $('bSlo').oninput=()=>{cur.slogan=$('bSlo').value};
    $('bSlo').onchange=()=>{cur.slogan=$('bSlo').value;draw()};
    $('bSave').onclick=()=>{syncSlo();S.brand={bg:cur.bg,i:cur.i,frame:cur.frame||'round',nl:cur.nl||'line',slogan:(cur.slogan||'').trim().slice(0,24)};save();$('modal').hidden=true;toast('Đã lưu tem quán');renderPrep()};
    $('bClose').onclick=()=>{$('modal').hidden=true};
  };
  draw();
}
function marginLine(k){
  const o={base:k,tops:[],cheese:false,size:'M'},p=price(o),c=unitCost(o),idx=p/price(o,DEF_SELL);
  const w=p>CFG.itemCap?` · <span class="warnline">${ico('warn')} đắt</span>`:itemPricey(k)?` · <span class="warnline">${ico('warn')} đắt</span>`:idx<.9?' · <span class="okline">👍 rẻ</span>':'';
  return `Vốn ${fmt(c)} · Lãi ${fmt(p-c)}${w}`;
}
function topLine(k){
  const p=S.sell[k],c=CFG.cost[k],idx=p/DEF_SELL[k];
  const w=p>ADD_CAP?` · <span class="warnline">${ico('warn')} không ai gọi</span>`:p>ADD_WARN?` · <span class="warnline">${ico('warn')} ít ai gọi</span>`:idx>1.3?` · <span class="warnline">${ico('warn')} đắt</span>`:idx<.8?' · <span class="okline">👍 rẻ</span>':'';
  return `💡 ${fmt(DEF_SELL[k])} · Vốn ${fmt(c)} · Lãi ${fmt(p-c)}${w}`;
}
function inputRow(icon,name,sub,group,key,val){
  return `<div class="rowi">${icon}<div><div class="nm">${name}</div><div class="sub" id="m-${group}-${key}">${sub}</div></div><div class="pin"><input type="number" inputmode="decimal" min="0" step="0.5" value="${val/1000}" data-g="${group}" data-k="${key}" aria-label="${name} (nghìn đồng)"><span>k</span></div></div>`;
}
function giaWarn(){return '';const pi=pricyItems(),bad=pi.length;
  return `<div class="fore${bad?' warnc2':''}">${ico('warn')} Món nào (trà, hương, topping) trên ${fmt(CFG.itemCap)} thì khách chê mắc, quán vắng 80% khách. Một ly trên ${fmt(CFG.priceCap)} thì 60% khách bỏ đi. Size L trên ${fmt(CFG.sizeWarn)} là đắt, 90% khách không chọn size L. Size L tối đa ${fmt(CFG.sizeCap)}, để đúng mức đó thì không ai chọn size L và quán vắng 80% khách.${bad?` <b>Đang quá giá: ${pi.map(k=>k==='L'?'Size L':ITEMS[k].n).join(', ')}</b>`:''}</div>`}
function sizeLine(){const p=S.sell.L;return '💡 '+fmt(DEF_SELL.L)+(p>=CFG.sizeCap?` · <span class="warnline">${ico('warn')} đắt</span>`:p>CFG.sizeWarn?` · <span class="warnline">${ico('warn')} đắt</span>`:'')}
function paneGia(){
  const tea=BASE_KEYS.filter(k=>S.unlocked[k]).map(k=>inputRow(itemIcon(k),ITEMS[k].n+' (M)',marginLine(k),'sell',k,S.sell[k])).join('');
  const flav=FLAV_KEYS.filter(k=>S.unlocked[k]).map(k=>inputRow(itemIcon(k),ITEMS[k].n,topLine(k),'sell',k,S.sell[k])).join('')||'<p class="note" style="text-align:center">'+ico('lock')+' '+ico('tools')+'</p>';
  const top=groupRows(TOP_KEYS.filter(k=>S.unlocked[k]),k=>inputRow(itemIcon(k),ITEMS[k].n,topLine(k),'sell',k,S.sell[k]));
  const size=inputRow('<span class="icon">⬆️</span>','Size L',sizeLine(),'sell','L',S.sell.L);
  const maxCup=(()=>{const b=Math.max(...BASE_KEYS.filter(k=>S.unlocked[k]).map(k=>S.sell[k])),f=Math.max(0,...FLAV_KEYS.filter(k=>S.unlocked[k]).map(k=>S.sell[k])),t=TOP_KEYS.filter(k=>S.unlocked[k]).map(k=>S.sell[k]).sort((a,b)=>b-a).slice(0,2).reduce((a,x)=>a+x,0);return b+f+t+S.sell.L})();
  const warn=`<div class="fore${maxCup>CFG.priceCap?' warnc2':''}">${ico('warn')} Một ly (gồm hương, topping, size L) trên ${fmt(CFG.priceCap)} thì 60% khách bỏ đi.${maxCup>CFG.priceCap?` Ly đắt nhất của quán đang là <b>${fmt(maxCup)}</b>.`:''}</div>`;
  $('pane').innerHTML=`<div id="giaWarn">${giaWarn()}</div>`+subTabs('gia',[[ico('teapot')+' Trà',tea],[ico('strawberry')+' Hương',flav],[ico('pearlbowl')+' Topping',top],['⬆️ Size',size]]);
  bindSub('gia');
  $('pane').onchange=e=>{const i=e.target;if(!i.dataset.g)return;let v=Math.max(0,Math.round((+i.value||0)*2)*500);
    if(i.dataset.k==='L'&&v>CFG.sizeCap){v=CFG.sizeCap;toast('Phụ thu size L tối đa '+fmt(CFG.sizeCap))}
    else if(v>sellMax(i.dataset.k)){v=sellMax(i.dataset.k);toast('Giá tối đa '+fmt(v))}
    S[i.dataset.g][i.dataset.k]=v;
    i.value=v/1000;save();
    BASE_KEYS.filter(k=>S.unlocked[k]).forEach(k=>{const m=$('m-sell-'+k);if(m)m.innerHTML=marginLine(k)});
    [...FLAV_KEYS,...TOP_KEYS].forEach(k=>{const m=$('m-sell-'+k);if(m)m.innerHTML=topLine(k)});{const m=$('m-sell-L');if(m)m.innerHTML=sizeLine()}
    const gw=$('giaWarn');if(gw)gw.innerHTML=giaWarn();
    const b=document.querySelector('.board');if(b){const t=document.createElement('div');t.innerHTML=menuBoard();b.replaceWith(t.querySelector('.board'));bindBoard()}};
}
let revF=null;/* lọc đánh giá: null = tất cả, 1..5 = số sao, 'nr' = chưa trả lời */
function getCustomerArchetype(x){
  if(x.st != null || (x.tg && /idol|sao/i.test(x.tg))) return 'star';
  const name = (x.n || '').toLowerCase();
  if(/chú|bác|bà|cô|ông/.test(name)) return 'elder';
  if(/bé|bin|su|sữa|bắp|mít|tôm|cún|nấm|kem|mochi|chuối|xoài|heo|na\b|nhi|my|trâm|vy|kiki/.test(name)) return 'genz';
  if(x.o || /anh|chị|thảo|ngân|trang|hương|uyên|khoa|tuấn|phúc|đạt|linh|hà|phương|minh|hải|nam|quân|long/.test(name)) return 'office';
  const txt = (x.t || '').toLowerCase();
  if(/chát|đậm|nhạt|béo|hương|topping|trân châu|thạch|ngọt|đắng|ngấy|thơm|bọt|kem cheese|hậu vị/.test(txt)) return 'foodie';
  
  // Dựa vào chuỗi tên nếu không thuộc nhóm trên
  const hash = [...(x.n || 'Khách')].reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const types = ['genz', 'office', 'foodie', 'strict', 'elder'];
  return types[hash % types.length];
}

function genCustomerReply(x, shopMsg){
  const s = x.origS || x.s;
  const msg = (shopMsg || '').toLowerCase();
  const arch = getCustomerArchetype(x);

  // Phân tích sắc thái phản hồi của chủ quán
  const isPolite = /(?<![\p{L}\p{N}])(dạ|vâng|ạ|dạ vâng|dạ em|dạ quán|kính gửi|trân trọng)(?![\p{L}\p{N}])/ui.test(msg);
  const isApology = /xin lỗi|xin lũi|lũi|thành thật|rút kinh nghiệm|sơ suất|tạ lỗi|thứ lỗi|nhận lỗi|sơ ý|chuộc lỗi/ui.test(msg);
  const isFix = /sửa sai|sửa đổi|khắc phục|bồi thường|đền bù|làm lại|đổi ly|hoàn tiền|chấn chỉnh|cải thiện|nâng cao/ui.test(msg);
  const isThanks = /cảm ơn|cám ơn|thank|dễ thương|yêu bạn|iu bạn|mãi yêu|đồng hành|ủng hộ|chúc bạn|hoan hỉ|rất vui|ấm áp|tuyệt vời|hân hạnh|tri ân|biết ơn|tin tưởng|quý khách/ui.test(msg);
  const isSympathy = /thông cảm|thấu hiểu|bỏ qua|mong bạn|lượng thứ|chia sẻ|xí xoá/ui.test(msg);
  const isPositive = isPolite || isApology || isFix || isThanks || isSympathy || /tiếp thu|ghi nhận|cầu thị|nhiệt tình|chu đáo|chân thành|hy vọng|lựa chọn|động lực/ui.test(msg);

  // Chỉ bắt từ ngữ thô tục thực sự (dùng ranh giới từ unicode tránh bắt nhầm 'các', 'chất lượng', 'chế biến', 'tao nhã')
  let isVulgar = /(?<![\p{L}\p{N}])(mày|tao|mày tao|bố mày|bà mày|mẹ mày|chúng mày|cặc|cặk|c\*c|buồi|đụ|địt|đm|vcl|đéo|lồn|chó đẻ|súc vật|óc chó|chó chết|láo chó|bố láo|mất dạy|vô học|vô giáo dục|thất học|mặt dày|đồ điên|con điên|thằng điên)(?![\p{L}\p{N}])/ui.test(msg);

  // Cụm từ thách thức, gay gắt, đuổi khách
  const rudePhrases = /không thích thì|không uống thì|chê thì biến|chê thì cút|chê thì đừng|qua quán khác|mua chỗ khác|biến đi|cút đi|cút xéo|cút|biến|lượn đi|lượn cho nước|ai mượn|ai thèm|ai cần|tiền ít đòi|rẻ rách|bố đời|mẹ thiên hạ|bớt sủa|ngưng sủa|câm mồm|câm họng|ngậm mồm|đồ hãm|hãm l|bớt mỏ|mỏ hỗn|thích thì chiều|rảnh háng|ăn mày đòi|chê thì đừng uống|nghèo mà chảnh|thách mày|thách bạn|thách thức|làm gì được nhau|làm gì tao|ngon thì|có giỏi thì|bày đặt|vớ vẩn|xàm xí|xàm|nhảm nhí|đừng có sủa|mày nghĩ mày là ai|biết bố mày là ai/ui;

  let isRude = false;
  if (isVulgar) {
    isRude = true;
  } else if (rudePhrases.test(msg)) {
    isRude = true;
  }

  // Khi chủ quán dùng từ ngữ lễ phép ("dạ", "vâng", "ạ") hoặc lời cảm ơn: luôn xem là phản hồi tích cực và tuyệt đối không bao giờ tính là thô tục / gay gắt
  if (isPolite || isThanks) {
    isVulgar = false;
    isRude = false;
  }

  const isPromiseFree = !isVulgar && !isRude && /cho ly khác|tặng ly khác|đổi ly khác|bù ly khác|tặng nước|cho ly mới|tặng ly mới|ly khác|tặng|miễn phí|free|uống free|voucher|mời bạn|ly mới|đền bù|hoàn tiền|bù ly|bồi thường|gửi bạn|quà|giảm giá|giảm|discount|sale|bớt|ưu đãi|mã giảm|hứa|hứa hẹn|cam kết|đảm bảo/ui.test(msg);
  const isGift = /cho ly khác|tặng ly khác|đổi ly khác|bù ly khác|tặng nước|tặng|miễn phí|free|voucher|mời bạn|ly mới|đền bù|hoàn tiền|bù ly|bồi thường|gửi bạn|quà/ui.test(msg);
  const isHumor = /haha|hihi|kkk|hề|lầy|hài|vui tính|cưng|dễ sợ|chọc|tếu|chill/ui.test(msg);
  const isExplain = /do thời tiết|trời mưa|công thức|trà thật|ủ trà|đá tan|shipper|giao hàng|đông khách|quá tải|bảo quản|nguyên chất/ui.test(msg);

  let replyText = '';
  let deltaStars = 0;
  let newStars = s;
  let extraTipNext = false;
  let discountNext = false;

  const isGz = x.isGzRev || x.tag === 'genz_quit' || (x.n && x.n.includes('Gen Z'));
  const isPolice = x.n === 'Công An Phường' || (x.k && String(x.k).startsWith('police_win')) || x.isPolice;
  const isFakeOan = (x.k && String(x.k).startsWith('police_fail')) || (x.t && /tiền giả.*vu oan|vu oan.*tiền giả|chụp mũ.*tiền giả/i.test(x.t));

  // 0. Phản hồi cho Bạn Thân Hùa Theo Đánh Giá 1★
  if (x.isFriendChimeIn) {
    if (isVulgar || isRude) {
      newStars = 1;
      deltaStars = 1 - s;
      const fClapback = [
        `Ủa alo chủ quán mỏ hỗn kia chửi bạn tui chưa đã giờ quay sang chửi luôn tui hả? Cả hội bạn tụi tui kéo vô chấm 1★ sập tiệm luôn giờ! 🤬🖕`,
        `Thứ chủ quán vừa mất dạy vừa hung hăng! Bạn tui bị đối xử tệ xong tui vô bảo vệ bạn thì bị văng tục chửi bới? 1★ vĩnh viễn, kéo cả trường vô tẩy chay! 💩🚫`,
        `Cãi tay đôi với ai vậy trời? Bán trà sữa mà nết giang hồ chợ búa, để tụi tui cap màn hình bóc phốt lên mọi mặt trận mạng xã hội cho khỏi làm ăn luôn! 👊🔥 1★ tiễn vong!`
      ];
      return { text: rnd(fClapback), deltaStars, newStars, isVulgar: true, isRude: true, extraTipNext: false };
    }
    if (isPromiseFree || isGift || isApology || /xin lỗi|tạ lỗi|tặng|free|bồi thường/i.test(msg)) {
      newStars = 5;
      deltaStars = 5 - s;
      const fForgive = [
        `Thấy chủ quán biết điều nhận lỗi và tặng nước cho cả hai đứa tui thì tui tạm hạ hoả đó nha! Đổi lên 5★ ủng hộ, lần tới hai đứa tui ghé nhận ly free nhớ pha ngon nha! 🥰🧋✨`,
        `Okela chủ quán rep cưng xỉu và có thiện chí chuộc lỗi tặng nước free! Bạn thân tui cũng hết giận rồi nên tui nâng thẳng lên 5★ khích lệ tiệm! 💖🎉`,
        `Xử lý khủng hoảng truyền thông 10 điểm! Hứa tặng nước free tạ lỗi là cả hội bạn tụi tui xí xoá liền. Sửa lên 5★ cho quán làm ăn phát đạt nè! 🧋🎁🥳`
      ];
      return { text: rnd(fForgive), deltaStars, newStars, isVulgar: false, extraTipNext: false, freeDrinkNext: true };
    }
    newStars = 3;
    deltaStars = 3 - s;
    const fNeutral = [
      `Chủ quán giải thích nghe cũng có lý nhưng làm bạn tui buồn là tui không ưng rồi. Tạm nâng lên 3★ dĩ hoà vi quý nhé! 😒🧋`,
      `Thôi thấy quán cũng có lời nên tui sửa lên 3★ xí xoá. Lần sau nhớ phục vụ bạn tui chu đáo hơn đấy! ✨`
    ];
    return { text: rnd(fNeutral), deltaStars, newStars, isVulgar: false, extraTipNext: false };
  }

  // 1. Phản hồi riêng cho cựu nhân viên Gen Z
  if (isGz) {
    if (isVulgar || isRude) {
      newStars = 1;
      deltaStars = 1 - s;
      triggerFriendBadReview(x);
      const gzClapback = [
        `Ủa alo con chủ quán kia mày chửi ai đấy? Đã vu oan bóc lột cho em xong giờ lên mạng còn xưng mày tao văng tục với cựu nhân viên hả? Mọi người né gấp cái tiệm hãm này ra nhé, chủ quán mỏ hỗn số hai không ai dám nhận số một! Em ghim 1★ vĩnh viễn và rủ cả hội bạn thân vào vote 1★ bóc phốt cho quán khỏi làm ăn luôn! 🤬🖕🔥`,
        `Mày chửi ai đấy hả con mặt dày? Bị em bóc trúng tim đen tội chèn ép vu oan sinh viên thực tập xong nhảy dựng lên cắn càn hả? Môi trường toxic kinh khủng, em cho cả trường đại học của em biết để không ai thèm nộp đơn vào quán rác này! 1★ tiễn vong! 💩🚫`,
        `Thứ chủ quán vừa ăn cướp vừa la làng! Động tí bấm bắt quả tang vu khống nhân viên xong giờ lên giọng bố đời chợ búa. Em cap màn hình gửi thẳng lên Thanh tra Lao động với Quản lý thị trường nhé! 👊🔥`
      ];
      return { text: rnd(gzClapback), deltaStars, newStars, isVulgar: true, isRude: true, extraTipNext: false };
    }
    if (isPromiseFree || isGift || isApology || /xin lỗi|tạ lỗi|bồi thường|thương|quay lại/i.test(msg)) {
      newStars = 5;
      deltaStars = 5 - s;
      const gzForgive = [
        `U là trời, nhận được lời xin lỗi ngọt ngào kèm ưu đãi tặng nước bù đắp của sếp là em tan chảy liền! Đứa trẻ bên trong em đã được chữa lành hoàn toàn rồi á. Em sửa lên 5★ tuyệt đối cho sếp nha! Lần sau sếp nhớ tôn trọng và tin tưởng nhân viên hơn đấy, bữa nào em ghé uống nước free sếp nhớ pha cho em nhé! 🥰✨🧋🎁`,
        `Thấy sếp biết nhận sai, công khai xin lỗi và còn hứa hẹn giảm giá, tặng nước free chuộc lỗi nên em không nỡ giận nữa. Sửa lên 5★ ngay và luôn cho quán đắt khách! Hẹn hôm nào em ghé quán làm ly free nhen sếp! 💖🎉`,
        `Sếp giải quyết thấu tình đạt lý 10 điểm không có nhưng! Hứa bù ly nước free với thưởng nóng là em tha thứ liền. Tặng lại quán 5★ trọn vẹn, ca sau em ghé uống free nhé sếp ơi! 🧋🎁🥳`
      ];
      return { text: rnd(gzForgive), deltaStars, newStars, isVulgar: false, extraTipNext: false, freeDrinkNext: true };
    }
    newStars = 3;
    deltaStars = 3 - s;
    const gzNeutral = [
      `Sếp giải thích thế thì em cũng hiểu và thông cảm được phần nào, nhưng lúc đó sếp bấm bắt quả tang làm em tổn thương tâm lý dữ lắm. Em tạm nâng lên 3★ coi như hoà nha, đợi em đi healing tâm hồn xong đã! 🎧🥺`,
      `Thôi coi như hiểu lầm xí xoá giữa hai bên, em sửa lên 3★ cho sếp đỡ buồn lòng. Lần sau sếp đừng có đa nghi rồi bấm bắt quả tang nhân viên lung tung nữa đấy! ✨🧋`
    ];
    return { text: rnd(gzNeutral), deltaStars, newStars, isVulgar: false, extraTipNext: false };
  }

  // 2. Phản hồi riêng cho Cán bộ Công An Phường
  if (isPolice) {
    if (isVulgar || isRude) {
      newStars = 1;
      deltaStars = 1 - s;
      const policeWarn = [
        `Đồng chí chủ quán dùng ngôn từ xúc phạm, lăng mạ lực lượng chức năng đang thi hành công vụ? Hành vi xúc phạm danh dự người thi hành công vụ trên không gian mạng có thể bị lập biên bản xử phạt hành chính từ 2 đến 3 triệu đồng theo Nghị định 144/2021/NĐ-CP! Yêu cầu chủ quán nghiêm túc chấn chỉnh phát ngôn! ⚠️👮‍♂️`,
        `Đề nghị chủ quán giữ thái độ văn minh, đúng mực và tôn trọng lực lượng Công An. Việc dùng lời lẽ thô tục sẽ bị chuyển hồ sơ sang cơ quan an ninh điều tra xử lý nghiêm theo quy định pháp luật! 🛑👮‍♂️`
      ];
      return { text: rnd(policeWarn), deltaStars, newStars, isVulgar: true, isRude: true, extraTipNext: false };
    }
    if (isPromiseFree || isGift || /tặng|free|uống free|mời|quà|voucher/i.test(msg)) {
      newStars = 5;
      deltaStars = 5 - s;
      const policeNoBribe = [
        `Cán bộ chiến sĩ Công an thực hiện nghiêm 6 điều Bác Hồ dạy và điều lệnh Công an nhân dân: Tuyệt đối không nhận quà biếu, tiền bồi dưỡng hay nước uống miễn phí khi làm nhiệm vụ! Cảm ơn tình cảm của chủ quán, chúc quán kinh doanh thuận lợi và tiếp tục phối hợp tốt cùng Công An giữ vững an ninh trật tự! 👮‍♂️🎖️🧋`,
        `Công An Phường xin ghi nhận tấm lòng của chủ tiệm, tuy nhiên quy định ngành nghiêm cấm cán bộ nhận đồ uống hay ưu đãi cá nhân. Rất mong cơ sở tiếp tục phát huy tinh thần cảnh giác, cùng Công an đấu tranh phòng chống tội phạm! 🤝👮‍♂️`
      ];
      return { text: rnd(policeNoBribe), deltaStars, newStars, isVulgar: false, extraTipNext: false };
    }
    newStars = 5;
    deltaStars = 5 - s;
    const policeThanks = [
      `Công An Phường biểu dương tinh thần trách nhiệm và sự phối hợp tích cực của quán trong phong trào Toàn dân bảo vệ an ninh Tổ quốc. Chúc cơ sở kinh doanh ngày càng an toàn, phát tài phát lộc! 👮‍♂️🌟`,
      `Rất hoan nghênh tinh thần cảnh giác cao độ và hỗ trợ phá án đắc lực của chủ tiệm. Có bất kỳ dấu hiệu tội phạm hay nghi vấn nào, bà con cứ báo ngay cho Công an phường xử lý kịp thời nhé! 👮‍♂️📞`
    ];
    return { text: rnd(policeThanks), deltaStars, newStars, isVulgar: false, extraTipNext: false };
  }

  // 3. Phản hồi riêng cho Khách bị vu oan đưa tiền giả / Khách chứng kiến
  if (isFakeOan) {
    if (isVulgar || isRude) {
      newStars = 1;
      deltaStars = 1 - s;
      triggerFriendBadReview(x);
      const fakeClapback = [
        `Đã làm ăn hồ đồ vu oan giá hoạ cho người vô tội xong giờ còn chửi bới khách hàng? Tôi đã chụp lại toàn bộ bằng chứng vu khống và xúc phạm danh dự này để nộp đơn khởi kiện ra Tòa án nhân dân đòi bồi thường thiệt hại danh dự! 1★ vĩnh viễn, tiễn vong cái tiệm thất đức! ⚖️😡`,
        `Chủ quán hành xử côn đồ không thể chấp nhận được! Vừa chụp mũ tôi dùng tiền giả làm Công An tới giải trình bẽ mặt trước bàn dân thiên hạ, giờ còn quay sang đe dọa, nhục mạ khách! Tôi kêu gọi bạn bè vào vote 1★ tẩy chay tiệm rác rưởi này! 🛑👎`
      ];
      return { text: rnd(fakeClapback), deltaStars, newStars, isVulgar: true, isRude: true, extraTipNext: false };
    }
    if (isPromiseFree || isGift || isApology || /xin lỗi|tạ lỗi|đền bù|bồi thường|chuộc lỗi/i.test(msg)) {
      newStars = 5;
      deltaStars = 5 - s;
      const fakeForgive = [
        `Thấy chủ quán chân thành xin lỗi, công khai nhận sai và có thiện chí tặng nước / bồi thường tổn thất tinh thần cho tôi nên tôi cũng xí xoá bỏ qua. Tôi đã sửa lại thành 5★ cho quán nhé! Lần tới tôi ghé nhận ly nước free, quán nhớ cẩn thận hơn đừng vu oan khách nữa nha! 🤝🎁💖`,
        `Chủ quán biết lắng nghe, nhận lỗi đàng hoàng và hứa đền bù chu đáo thế này thì tôi không làm khó nữa. Đã nâng lên 5★ khích lệ tiệm làm ăn có tâm hơn! Hẹn quán lần sau tôi ghé uống nước free! 🧋✨`
      ];
      return { text: rnd(fakeForgive), deltaStars, newStars, isVulgar: false, extraTipNext: false, freeDrinkNext: true };
    }
    newStars = 3;
    deltaStars = 3 - s;
    const fakeExplain = [
      `Lúc đó đông người làm tôi bẽ mặt muốn độn thổ, chủ quán giải thích thế này thì tôi tạm chấp nhận nhưng vẫn còn bực lắm. Sửa lên 3★ để quán rút kinh nghiệm xương máu nhé! 😤`,
      `Thôi thì coi như tai nạn nghề nghiệp của quán, lần sau kiểm tra kỹ tờ tiền trước khi gọi Công An bắt bớ người ta nhé! Sửa lên 3★ cho tiệm đấy. 🤝`
    ];
    return { text: rnd(fakeExplain), deltaStars, newStars, isVulgar: false, extraTipNext: false };
  }

  // ===== 0. CHỦ QUÁN VĂNG TỤC, XÚC PHẠM, MỎ HỖN HOẶC GAY GẮT, THÁCH THỨC (GIẢM MẠNH ĐÁNH GIÁ KỂ CẢ 5 SAO & GỌI BẠN VÀO HÙA THEO 1 SAO) =====
  if (isVulgar || isRude) {
    newStars = 1;
    deltaStars = 1 - s;
    triggerFriendBadReview(x);
    const clapbackDict = {
      genz: [
        s >= 4 ? `Ủa gì vậy trời? Tui cho ${s}★ khen nhiệt tình mà chủ quán rep kiểu láo toét, ${isVulgar ? 'văng tục chửi bậy' : 'thách thức mỏ hỗn'} vậy á hả? Tụt mood ngang, sửa thẳng xuống 1★ và kéo hội bạn vô đánh giá 1★ bóc phốt cho cả cõi mạng né gấp! 🤬🚫` :
        `Ủa alo con chủ quán kia ${isVulgar ? 'mày chửi ai đấy?' : 'rep kiểu mẹ thiên hạ với ai đấy?'} Khách bỏ tiền ra mua nước uống chứ đéo phải đi xin nhé! Thứ bán buôn mất dạy, để tao kéo cả hội bạn vô vote 1★ và bóc phốt cái tiệm rác này lên TikTok, Facebook cho mày hết đường làm ăn luôn! 🤬🖕1★🔥`,
        s >= 4 ? `Trời đất ơi đúng là 'làm ơn mắc oán'! Khách có lòng ủng hộ ${s}★ mà chủ tiệm ${isVulgar ? 'xưng mày tao tục tĩu' : 'thái độ gay gắt thách thức'} như tát vào mặt khách? Hạ liền xuống 1★ và kêu bạn thân vào vote 1★ cạch mặt quán này 8 đời! 🤮👎` :
        `Bán ly nước dở tệ bị nói trúng tim đen xong nhảy dựng lên thách thức cắn càn hả? Mày biến trước đi chứ cái tiệm mạt hạng này tuổi gì mà đuổi khách! Tao gọi bạn tao vào vote 1★ tiễn vong luôn! 💩🚫`,
        s >= 4 ? `Xịt keo con voi luôn! Tưởng quán dễ thương ai ngờ mỏ hỗn số 1. Khách khen ${s}★ mà đáp lại kiểu thách thức coi thường khách, hạ thẳng xuống ${newStars}★ cho sáng mắt ra nha! Bye vĩnh viễn! 😤🔥` :
        `Ủa mở tiệm bán trà hay mở chuồng heo mà sủa kinh vậy? Khách góp ý mà rep kiểu bố đời giang hồ chợ búa, để tao cap màn hình gửi thẳng lên Quản lý thị trường với Công an xử lý cái nết mày nhé! 👊🔥`,
        `Ăn nói với khách kiểu gì đấy hả thứ thất học? Tưởng mỏ hỗn vậy là ngầu hả? Chuẩn bị tinh thần đón bão 1 sao tẩy chay đi nha! 🤬💥`
      ],
      office: [
        s >= 4 ? `Khách hàng có lòng ủng hộ ${s}★ mà chủ quán ăn nói ${isVulgar ? 'văng tục thô lỗ' : 'trịch thượng, thách thức'} xúc phạm khách hàng thế này sao? Tôi đã sửa lại còn ${newStars}★ và huỷ luôn đơn của cả công ty! 📉🚫` :
        `Tôi làm quản lý văn phòng bao năm chưa từng thấy chủ quán nào vô văn hoá và chợ búa đến mức này! Tôi đã gửi cảnh báo cho toàn bộ toà nhà và các công ty xung quanh để cấm tiệt quán này! 📉🚫`,
        `Chủ quán buôn bán làm ăn mà ${isVulgar ? 'mở mồm ra là chửi tục' : 'hung hăng thách thức khách hàng'}? Đừng tưởng trên mạng muốn nói gì thì nói! Tôi hạ xuống ${newStars}★ và sẽ gửi phản ánh lên cơ quan chức năng kiểm tra tư cách tiệm này! 🛑`,
        `Văn hóa dưới đáy xã hội! Đã làm ăn tệ hại còn dùng ngôn từ khó nghe coi thường khách. Cả công ty tôi chính thức cấm tiệt mọi nhân viên đặt hàng ở cái tiệm này! 👎`
      ],
      elder: [
        s >= 4 ? `Tôi già cả ăn nói đàng hoàng cho ${s} sao khen ngợi mà quán ăn nói ${isVulgar ? 'xấc xược, văng tục' : 'hỗn hào, thách thức'} thế này à? Thất đức quá! Tôi sửa lại ${newStars}★ và cấm tiệt con cháu bén mảng tới đây! 👵💢` :
        `Tuổi cháu đáng tuổi con tuổi cháu tôi mà dám mở mồm ra ${isVulgar ? 'chửi bậy, văng tục' : 'ăn nói hỗn hào'} thế à? Buôn bán thất đức! Tôi hạ xuống ${newStars}★! 👵💢`,
        `Trời đất ơi, buôn bán mà ăn nói như đồ đầu đường xó chợ, hung hăng với khách! Thứ vô giáo dục này thì sớm muộn cũng đóng cửa dẹp tiệm thôi! Tôi hạ xuống ${newStars}★! 👴🚫`
      ],
      foodie: [
        s >= 4 ? `Đúng là sai lầm lớn khi cho quán này ${s} sao! Bán được vài ly nước mà tự cao tự đại, rep khách ${isVulgar ? 'chửi bậy' : 'láo toét thách thức'}. Hạ thẳng về ${newStars}★, để xem tiệm trụ được bao lâu! 📝👎` :
        `Đã làm dở bị người ta chê thì quay sang ${isVulgar ? 'chửi bậy xúc phạm khách' : 'thách thức mỏ hỗn'}? Tôi sẽ làm bài bóc phốt chi tiết trên các hội ẩm thực lớn nhất để vạch mặt cái tiệm trà này! 📝🔥`,
        `Chẳng còn gì để nói ngoài sự thất vọng với thứ văn hóa phục vụ này. Mở mồm ra là thách thức khách. ${newStars}★ tiễn vong! 🤮👎`
      ],
      star: [
        `[Tự động dịch] Chủ quán dùng lời lẽ ${isVulgar ? 'thô tục' : 'gay gắt thách thức'} xúc phạm tôi sao? Tôi không ngờ một quán trà sữa lại có cách hành xử độc hại đến mức này! Tôi hạ xuống ${newStars}★! 🚫💔`
      ],
      strict: [
        s >= 4 ? `Tôi đã rộng lượng cho ${s} sao để khích lệ, nhưng thái độ phản hồi ${isVulgar ? 'thô tục' : 'hung hăng gay gắt'} này chứng minh quán không hề xứng đáng. Hạ xuống ${newStars}★ ngay lập tức! 👎` :
        `Thái độ phản hồi hung hăng thách thức khách hàng. Tôi chính thức hạ xuống ${newStars}★ và gửi đơn khiếu nại! ⚖️ 1★`
      ]
    };
    replyText = rnd(clapbackDict[arch] || clapbackDict.genz);
    return { text: replyText, deltaStars, newStars, isVulgar, isRude, extraTipNext: false };
  }

  // ===== 0.1. CHỦ QUÁN HỨA HẸN, GIẢM GIÁ, TẶNG NƯỚC => KHÁCH LUÔN ĐÁNH GIÁ 5 SAO & LẦN SAU ĐẾN UỐNG NƯỚC FREE =====
  if (isPromiseFree) {
    newStars = 5;
    deltaStars = 5 - s;
    const freeDrinkReplies = {
      genz: [
        `U là trời chủ quán quá uy tín và dễ thương luôn! Vừa hứa hẹn giảm giá, tặng nước là em tha thứ liền á. Chấm thẳng 5★ tuyệt đối cho quán luôn nha! Lần sau em ghé uống nước free nhen! 🥰🎁🧋✨`,
        `Ui nhận được lời hứa tặng nước / giảm giá bù đắp của quán là em tan chảy liền! Tặng quán 5★ trọn vẹn luôn nè, lần sau em ghé quán nhớ cho em uống nước free nha! ✨💖🎉`,
        `Chủ quán giải quyết 10 điểm không có nhưng! Hứa bù ly nước free là em sửa lên 5★ uy tín liền. Hẹn quán ca sau em ghé uống free nhé! 🧋🎁🥳`
      ],
      office: [
        `Cách xử lý chăm sóc khách hàng của quán vô cùng văn minh và hào phóng! Mình rất trân trọng thiện chí tặng nước / giảm giá của quán và đã sửa thành 5★ cho tiệm nhé. Lần tới mình sẽ ghé nhận ly nước free! 🤝☕💼🎁`,
        `Chủ quán nhiệt tình và biết giữ chữ tín thế này thì xứng đáng 5 sao! Mình nâng lên 5★ khích lệ quán, lần sau mình sẽ ghé nhận nước free đúng hẹn nhé! ☕🏢✨`
      ],
      elder: [
        `Cháu thảo tính, biết trước biết sau hứa tặng nước giảm giá cho khách thế này là cô quý lắm! Cô cho hẳn 5★ cho cháu đắt hàng nhé, lần sau cô ghé uống ly nước free nha cháu! 👵❤️🎁`,
        `Bác rất mừng vì chủ quán chu đáo và thảo ăn. Bác sửa thành 5★ ngay cho cháu vui, lần tới ghé bác nhận ly nước cháu tặng nhé! 👴🎉`
      ],
      foodie: [
        `Rất ấn tượng trước thái độ hào sảng, dám nhận lỗi và tặng nước / giảm giá bù đắp cho khách! Tôi đã nâng lên 5★ tối đa, lần tới ghé lại trải nghiệm ly free của tiệm nhé! 🍵👌🎁`,
        `Dịch vụ và sự chân thành vượt ngoài mong đợi! Tặng quán 5★ trọn vẹn, lần sau tôi sẽ ghé nhận ly nước free từ quán! ✨🧋`
      ],
      star: [
        `[Tự động dịch] Cảm ơn lời hứa tặng nước và sự hào phóng đáng yêu của bạn! Mình đã sửa lại thành 5★ tuyệt đối rồi nhé, lần tới ghé mình sẽ nhận ly nước free nha! 🌟🎤🧋🎁`
      ],
      strict: [
        `Biết giữ chữ tín, cam kết giảm giá và tặng nước đền bù cho khách là hành động rất chuyên nghiệp. Tôi đã sửa lên 5★, lần sau tôi ghé nhận ly nước free. 🤝🎁`
      ]
    };
    replyText = rnd(freeDrinkReplies[arch] || freeDrinkReplies.genz);
    return { text: replyText, deltaStars, newStars, isVulgar: false, extraTipNext: false, freeDrinkNext: true };
  }

  // ===== 1. KHÁCH HÀI LÒNG (4 - 5 SAO) =====
  if (s >= 4) {
    if (isPositive) {
      extraTipNext = true;
      if (s === 4) { deltaStars = 1; newStars = 5; }
      const pos45Dict = {
        genz: [
          `Ui chủ quán dễ thương xỉu! Chăm sóc khách nhiệt tình thế này 10 điểm không có nhưng. Lần sau ghé quán em nhất định sẽ bo thêm tiền tip cho quán nha! 🥰💵🧋`,
          `Chủ quán đáng yêu số 1 hệ mặt trời! Đọc rep mà ấm lòng ghê, lần sau em ghé nhất định sẽ bo thêm tiền tip ủng hộ tiệm nha! 😍🧋💸`,
          `Quán vừa ngon vừa phóng khoáng chu đáo thế này bảo sao em mê! Lần tới ghé em sẽ bo thêm tiền tip cho quán nha! ✨💖`
        ],
        office: [
          `Cảm ơn chủ quán đã phản hồi rất lịch thiệp và chu đáo. Quán phục vụ có tâm thế này mình rất trân trọng, lần tới ghé mua mình nhất định sẽ bo thêm tiền tip cho tiệm nhé! 🤝☕💼💵`,
          `Cách chăm sóc khách hàng của quán quá tuyệt vời! Cả văn phòng mình sẽ tiếp tục ủng hộ dài dài, lần sau đặt mình sẽ bo thêm cho tiệm nhé! ☕🏢✨`
        ],
        elder: [
          `Chủ quán ăn nói lễ phép, thảo tính thế này cô quý lắm. Lần sau cô ghé mua cô sẽ gửi thêm tiền bồi dưỡng cho các cháu nha! 👵❤️💵`,
          `Bác cảm ơn cháu nhé, buôn bán có tâm thế này bác chúc tiệm ngày càng đắt khách. Lần tới ghé bác sẽ gửi thêm tiền tip cho cháu! 👴🎉`
        ],
        foodie: [
          `Rất trân trọng thái độ cầu thị, lịch thiệp và văn minh của quán! Lần tới ghé lại mình nhất định sẽ gửi thêm tiền tip ủng hộ tiệm! 🍵👌💵`,
          `Đồ uống ngon kết hợp với dịch vụ chuẩn chỉ, 5 sao xứng đáng! Lần sau mình sẽ tip thêm cho quán nhé! ✨🧋`
        ],
        star: [
          `[Tự động dịch] Cảm ơn sự tiếp đãi nồng hậu và ấm áp của chủ quán! Lần tới ghé lại mình nhất định sẽ bo thêm tiền tip thật nhiều nhé! Saranghaeyo! 🌟🎤🧋💵`
        ],
        strict: [
          `Dịch vụ chuyên nghiệp, biết cách trân trọng khách hàng. Lần sau tôi ghé sẽ gửi thêm tiền tip động viên quán. 🤝💵`
        ]
      };
      replyText = rnd(pos45Dict[arch] || pos45Dict.genz);
    } else if (isHumor) {
      const humDict = {
        genz: [
          `Haha chủ quán duyên xỉu á, rep hài hước tếu táo ghê! Mê trà sữa 1 thì mê admin quán 10 luôn nè haha! 🤣🥤`,
          `Ủa alo tiệm trà hay sân khấu hài vậy trời? Đọc rep mà cười rớt hàm, chiều phải ghé ủng hộ ngay mới được! 🥳✨`
        ],
        office: [
          `Haha tiệm trà dí dỏm quá, đọc rep mà xua tan hết áp lực công việc buổi chiều luôn! Lát mình order tiếp nha! 💼😆`,
          `Admin quán mặn mòi dễ sợ! Đồ uống ngon mà tư vấn duyên dáng thế này thì khách nào nỡ từ chối! ☕👍`
        ],
        elder: [
          `Mấy đứa nhỏ buôn bán vui vẻ hoạt bát thế này khách nào tới cũng thấy trẻ ra vài tuổi. Cứ phát huy nha cháu! 👵❤️`
        ],
        foodie: [
          `Phong cách phục vụ rất trẻ trung, tích cực! Hy vọng quán luôn giữ được tinh thần sảng khoái và vị trà chuẩn vị này! 🧋👌`
        ],
        star: [
          `[Tự động dịch] Haha bạn thật hài hước! Năng lượng vui tươi này tuyệt vời y như vị ngọt của ly trà sữa vậy! ✨🥰`
        ],
        strict: [
          `Giao lưu vui vẻ, tạo cảm giác thân thiện thoải mái. Chúc quán luôn duy trì được tinh thần này. 👍`
        ]
      };
      replyText = rnd(humDict[arch] || humDict.genz);
    } else {
      replyText = `Dạ cảm ơn bạn nhiều nhen! Nhận được phản hồi của bạn là quán có thêm bao nhiêu động lực luôn á! Chúc bạn ngày mới ngọt ngào! 🥰🧋`;
    }

  // ===== 2. KHÁCH TRUNG LẬP (3 SAO) =====
  } else if (s === 3) {
    if (isRude) {
      deltaStars = -2;
      newStars = 1;
      const rude3 = [
        `Khách góp ý chân thành để quán cải thiện mà chủ quán tự ái rồi cãi tay đôi luôn? Xin phép hạ xuống 1★ và bái bai vĩnh viễn! 😡`,
        `Thái độ phục vụ lồi lõm thật sự. Đồ uống đã bình thường mà cái tôi to quá. Tiễn vong tiệm trà này gấp! 👎`,
        `Ủa alo? Khách ăn nói đàng hoàng mà chủ quán đáp như đấm vào tai. Không bao giờ có lần thứ hai ghé quán! 🤮🚫`
      ];
      replyText = rnd(rude3);
    } else if (isApology) {
      discountNext = true;
      extraTipNext = false;
      deltaStars = Math.min(5 - s, 2);
      newStars = s + deltaStars;
      const apology3Dict = {
        genz: [
          `Dạ thấy chủ quán biết xin lỗi / xin lũi chân thành như vậy thì em tha thứ liền á! Em nâng lên ${newStars}★ cho quán rồi nha. Mà lần sau em ghé chủ quán nhớ giảm giá hoặc áp voucher bớt tiền cho em chuộc lỗi nha, chứ em sinh viên nghèo hổng có tiền bo đâu nhen! 🥰🏷️🧋`,
          `Ui chủ quán xin lũi cưng xỉu, em hết dỗi liền! Sửa lên ${newStars}★ cho quán luôn nè. Cơ mà bữa sau ghé quán nhớ giảm giá sâu đền bù cho em nhé, đừng mong em bo tiền nha sếp! 💖🏷️`,
          `Em nhận lời xin lỗi và tha thứ cho quán nhen. Đã nâng lên ${newStars}★ rồi nè! Lần tới em quay lại nhớ giảm 20% vào bill cho em chuộc lỗi đấy nhé! ✨🏷️🧋`
        ],
        office: [
          `Lời xin lỗi rất văn minh và lịch thiệp. Tôi đồng ý tha thứ và đã sửa lại thành ${newStars}★. Tuy nhiên lần tới phòng tôi đặt đơn, quán nhớ chiết khấu giảm giá trực tiếp vào hóa đơn thay vì trông chờ tiền tip nhé! 🤝💼🏷️`,
          `Ghi nhận lời xin lỗi và thiện chí cầu thị từ chủ quán. Tôi đã nâng lên ${newStars}★ cho quán, mong lần tới ghé tiệm sẽ giảm giá sâu tri ân bù đắp trải nghiệm! ☕🏢🏷️`
        ],
        elder: [
          `Cháu biết xin lỗi, xin lũi lễ phép nhận sai là bác tha thứ ngay. Bác nâng lên ${newStars}★ cho cháu làm ăn, lần sau bác ghé nhớ bớt giá, giảm giá cho người già nha cháu chứ bác không có tiền bo đâu! 👵💖🏷️`,
          `Người buôn bán biết nói lời xin lỗi là đáng quý. Bác bỏ qua cho cháu và sửa lại ${newStars}★, lần sau tới mua nhớ giảm giá cho bác vui nhé! 👴👍🏷️`
        ],
        foodie: [
          `Lời xin lỗi kịp thời và có trách nhiệm! Tôi chấp nhận tha thứ và sửa lên ${newStars}★. Lần sau ghé trải nghiệm lại nhớ áp mã giảm giá bù đắp trải nghiệm đấy nhé! 🍵👌🏷️`
        ],
        star: [
          `[Tự động dịch] Cảm ơn lời xin lỗi chân thành của bạn! Mình chấp nhận tha thứ và nâng lên ${newStars}★, lần sau ghé lại nhớ có ưu đãi giảm giá đặc biệt cho mình nha! ✨🥰🏷️`
        ],
        strict: [
          `Biết xin lỗi và nhận trách nhiệm thì tôi tha thứ và nâng lên ${newStars}★. Lần sau đến yêu cầu quán giảm giá trực tiếp vào hóa đơn để đền bù thỏa đáng! 🤝🏷️`
        ]
      };
      replyText = rnd(apology3Dict[arch] || apology3Dict.genz);
    } else if (isPositive) {
      extraTipNext = true;
      deltaStars = (isGift || isFix) ? Math.min(5 - s, 2) : 1;
      newStars = s + deltaStars;
      const pos3Dict = {
        genz: [
          `Thấy chủ quán biết lắng nghe, xin lỗi và sửa đổi chân thành như vậy là em có thiện cảm liền á! Đã sửa đánh giá lên ${newStars}★ cho quán rồi nha, lần sau tới nhất định em sẽ bo thêm tiền tip ủng hộ tiệm! 👍💵🧋`,
          `Ui chủ quán rep cưng xỉu, biết nhận lỗi và tặng quà chu đáo thế này thì ai mà giận cho được! Em tặng lại ${newStars}★ nhen, lần sau ghé em sẽ bo thêm tiền tip cho quán nè! 🥰💖`,
          `Chăm sóc khách hàng điểm 10 luôn! Thấy quán tiếp thu ý kiến nên mình nâng lên ${newStars}★ ủng hộ, lần sau tới mình sẽ gửi thêm tiền tip nha! ✨🧋`
        ],
        office: [
          `Cách tiếp thu ý kiến và phản hồi của quán rất văn minh, lịch sự. Mình đã sửa lại thành ${newStars}★ khích lệ tiệm, lần sau phòng mình đặt sẽ bo thêm tiền tip cho các bạn nhé! 🤝💼💵`,
          `Cảm ơn chủ quán đã giải thích và xử lý chân thành. Mình nâng lên ${newStars}★ cho quán, lần tới order sẽ gửi thêm tiền tip bồi dưỡng nhé! ☕🏢`
        ],
        elder: [
          `Cháu biết nhận lỗi, ăn nói lễ phép và chu đáo thế này là cô vui rồi. Cô nâng lên ${newStars}★ cho cháu, lần sau ghé cô sẽ gửi thêm tiền tip cho các cháu yên tâm bán hàng nha! 👵💖💵`,
          `Bác quý cái sự chân thật và biết lắng nghe của chủ quán. Bác sửa lên ${newStars}★, lần tới tới mua bác gửi thêm tiền tip động viên cháu! 👴👍`
        ],
        foodie: [
          `Đánh giá cao sự cầu thị và tinh thần trách nhiệm của quán! Đã nâng lên ${newStars}★, lần tới ghé trải nghiệm lại mình sẽ gửi thêm tiền tip ủng hộ tiệm! 🍵👌💵`
        ],
        star: [
          `[Tự động dịch] Cảm ơn sự chân thành của bạn! Mình rất cảm động và đã nâng lên ${newStars}★, lần sau ghé lại mình sẽ bo thêm tiền tip nhé! ✨🥰💵`
        ],
        strict: [
          `Biết tiếp thu và hành động sửa sai kịp thời là điều đáng khen. Tôi đã sửa lên ${newStars}★, lần sau tới tôi sẽ gửi thêm tiền tip cho quán. 🤝💵`
        ]
      };
      replyText = rnd(pos3Dict[arch] || pos3Dict.genz);
    } else if (isExplain) {
      const exp3 = [
        `À ra là vậy, giờ mình mới hiểu lý do. Cảm ơn quán đã giải thích rõ ràng và dễ hiểu nhé, lần sau mình sẽ order vị khác thử xem! ☕👍`,
        `Ghi nhận lời giải thích từ quán. Mong là những ngày sau quán sẽ tối ưu quy trình tốt hơn để giữ vững chất lượng nhé! ✨`
      ];
      replyText = rnd(exp3);
    } else {
      const neu3 = [
        `Cảm ơn quán đã ghi nhận ý kiến. Mong lần tới ghé lại trải nghiệm của mình sẽ trọn vẹn hơn nha! 🧋`,
        `Dạ mong quán giữ chất lượng ổn định và đồng đều ở những lần sau nhé! Cố lên tiệm ơi!`
      ];
      replyText = rnd(neu3);
    }

  // ===== 3. KHÁCH PHÀN NÀN (1 - 2 SAO) =====
  } else {
    if (isRude) {
      if (s <= 1) {
        newStars = 1;
        deltaStars = 1 - s;
        triggerFriendBadReview(x);
        const zeroStarReplies = {
          genz: [
            `Ủa đã 1★ mà chủ quán còn nhảy dựng lên mỏ hỗn, thách thức hơn thua với khách à? Em ghim 1★ vĩnh viễn và bóc phốt cả cái tiệm rác này lên TikTok cho sáng mắt ra luôn! Rủ thêm bạn thân vô vote 1★ luôn! 🤬🖕🚫`,
            `Xịt keo con voi thật sự! Đã 1 sao mà còn rep giọng mẹ thiên hạ, mỏ hỗn chợ búa. 1★ âm điểm nhân cách, cạch mặt tiệm này 8 đời và kéo bạn bè vô vote 1★ tiễn vong! 💩🚫`
          ],
          office: [
            `Đã phục vụ tệ bị đánh giá 1★ mà chủ quán còn phản hồi gay gắt, thô lỗ xúc phạm khách hàng? Tôi giữ 1★ và báo cáo vi phạm lên nền tảng, kêu gọi đồng nghiệp vote 1★! 📉🛑`,
            `Thái độ chợ búa và phi văn hóa không thể chấp nhận được. 1★ vĩnh viễn và kêu gọi toàn bộ công ty cấm tiệt quán này! 👎`
          ],
          elder: [
            `Khách chấm 1★ nhắc nhở mà còn mỏ hỗn, ăn nói xấc xược với người lớn thế này! 1★ cho tiệm vừa lòng, thứ buôn bán thất đức! 👵💢`,
            `Buôn bán mà mỏ hỗn hung hăng thì 1★ cũng là quá nhiều! Đồ vô giáo dục! 👴🚫`
          ],
          foodie: [
            `Vừa dở vừa hung hăng côn đồ. Đang 1★ mà thái độ thế này thì xứng đáng 1★ không có nhưng! Để tôi làm bài bóc phốt cho cả giới ẩm thực cạch mặt! 📝💥`,
            `Cái tôi to hơn cái nết! Đã 1 sao mà còn cãi tay đôi, 1★ cảnh cáo mọi người né gấp! 🤮`
          ],
          strict: [
            `Phản hồi hung hăng, thách thức khách hàng. Tôi giữ 1★ và gửi đơn khiếu nại! ⚖️`,
            `Khách hàng phản ánh đúng mà quán phản hồi gay gắt. Đánh giá 1★ vĩnh viễn! 🚫`
          ]
        };
        replyText = rnd(zeroStarReplies[arch] || zeroStarReplies.genz);
      } else {
        deltaStars = 1 - s;
        newStars = 1;
        triggerFriendBadReview(x);
        const roastDict = {
          genz: [
            `Ủa làm ăn dở tệ bị chê mà còn mỏ hỗn hơn thua với khách à? Để em cap màn hình bóc phốt lên hội Review Trà Sữa cho cả cõi mạng né gấp! 🤬🔥`,
            `Xịt keo con voi thật sự! Đã bán đồ dở như nước ốc còn bonus thêm quả thái độ lồi lõm. Cả đám tụi tao né cái quán này 8 đời tổ tông! 💩🚫`,
            `Ủa tưởng vậy là ngầu hả chủ quán? Khách bỏ tiền ra mua nước chứ có đi xin đâu mà lên mặt? Chuẩn bị tinh thần ăn bão 1 sao đi nhé! 🤮👎`
          ],
          office: [
            `Thái độ phục vụ phi chuyên nghiệp đến khó tin. Mình sẽ gửi cảnh báo lên nhóm nội bộ công ty và các phòng ban khác để tẩy chay quán! 📉🚫`,
            `Khách hàng phản ánh sự thật thì cãi tay đôi công kích cá nhân. Thất vọng toàn tập, 1 sao cũng là quá nhiều cho cái quán này! 👎`,
            `Văn hóa phục vụ quá kém cỏi. Đã làm sai còn thách thức khách, để xem quán trụ được bao lâu với cái nết này! 😤`
          ],
          elder: [
            `Ăn nói vô phép vô tắc với người lớn thế này thì hỏng hẳn rồi! Buôn bán mà coi thường khách hàng thế thì không bao giờ bền được đâu cháu! 👴💢`,
            `Cô già cả rồi ăn nói chân thật mong quán sửa mà quán dùng lời lẽ chợ búa thế à? Quá thất vọng, từ nay cấm cửa con cháu trong nhà bén mảng tới đây! 👵🚫`
          ],
          foodie: [
            `Đã pha sai công thức cơ bản, vị trà tanh chát dở tệ mà còn ngụy biện lên mặt dạy đời? Để tôi viết bài phân tích chuyên sâu bóc trần tay nghề tiệm này! 📝👎`,
            `Nguyên liệu kém chất lượng bị phát hiện là giãy nảy lên cãi cùn. Thật xấu hổ cho những người làm nghề trà sữa! 🤮`
          ],
          star: [
            `[Tự động dịch] Quá sốc với cách hành xử này... Một trải nghiệm tồi tệ nhất mình từng gặp tại Việt Nam! 💔🚫`
          ],
          strict: [
            `Sai không chịu nhận còn giở thói bao biện hung hăng. Quán làm ăn vô trách nhiệm thế này thì sớm muộn cũng tự đào thải! 🚫`,
            `Khách trả tiền để nhận sản phẩm và dịch vụ xứng đáng chứ không phải nghe những lời xúc phạm này. Báo cáo quán vi phạm ngay lập tức! ⚖️`
          ]
        };
        replyText = rnd(roastDict[arch] || roastDict.genz);
      }
    } else if (isApology) {
      discountNext = true;
      extraTipNext = false;
      deltaStars = Math.min(5 - s, 2);
      newStars = s + deltaStars;
      const apologyLowDict = {
        genz: [
          `Thấy chủ quán biết nhận sai, xin lỗi / xin lũi chân thành nên em tha thứ nè! Sửa lên ${newStars}★ cho quán rồi nha. Nhưng lần sau em ghé chủ quán nhớ giảm giá hoặc áp voucher bớt tiền cho em chuộc lỗi nha, chứ đừng bắt em bo tiền nhé! 🥰🏷️🧋`,
          `Biết xin lũi là ngoan rồi đó! Em tha thứ và tặng lại quán +${deltaStars}★ thành ${newStars}★ nha. Lần sau em ghé uống nhớ giảm giá bù đắp cho em đấy, em không bo tiền đâu nhen! 💖🏷️`,
          `Thôi thấy quán xin lỗi chân tình quá nên em xí xoá bỏ qua. Sửa lên ${newStars}★ khích lệ tiệm nè, hôm nào ghé nhớ bớt tiền nước cho em nha! ✨🏷️`
        ],
        office: [
          `Chủ quán biết nhận lỗi và gửi lời xin lỗi trực tiếp là rất văn minh. Tôi tha thứ và nâng lên ${newStars}★ cho quán, lần tới phòng tôi đặt nhớ giảm giá cho chúng tôi nhé! 🤝💼🏷️`,
          `Cảm ơn lời xin lỗi từ quán. Tôi đồng ý sửa lại thành ${newStars}★, hy vọng đơn hàng tới tiệm sẽ chiết khấu giảm giá chu đáo! ☕🏢🏷️`
        ],
        elder: [
          `Cháu biết xin lỗi, xin lũi thật lòng là cô không giận nữa. Cô sửa lên ${newStars}★ cho cháu, lần sau cô ghé nhớ giảm giá cho cô nhé! 👵💖🏷️`,
          `Người bán hàng biết xin lỗi khách là quý lắm. Bác tha thứ và sửa lên ${newStars}★, lần sau tới nhớ bớt tiền cho bác nha! 👴👍🏷️`
        ],
        foodie: [
          `Nhận lỗi và xin lỗi rất cầu thị! Tôi chấp nhận tha thứ và tăng lên ${newStars}★, lần sau ghé quán nhớ áp dụng chính sách giảm giá bù đắp trải nghiệm nhé! 🍵👌🏷️`
        ],
        star: [
          `[Tự động dịch] Cảm ơn lời xin lỗi tử tế của bạn! Mình tha thứ và đã sửa lên ${newStars}★, lần sau ghé nhớ giảm giá cho mình nha! ✨🥰🏷️`
        ],
        strict: [
          `Biết sai và chủ động xin lỗi thì tôi ghi nhận và sửa lên ${newStars}★. Lần sau đến quán phải giảm giá trực tiếp trên hóa đơn cho tôi! 🤝🏷️`
        ]
      };
      replyText = rnd(apologyLowDict[arch] || apologyLowDict.genz);
    } else if (isPositive) {
      extraTipNext = true;
      deltaStars = (isGift || isFix || msg.length > 25) ? Math.min(5 - s, 2) : 1;
      newStars = s + deltaStars;
      const posLowDict = {
        genz: [
          `Thấy chủ quán nhận lỗi nhanh, rep chân thành và biết sửa sai nên em bớt dỗi liền. Tặng lại quán +${deltaStars}★ động viên thành ${newStars}★ nha, lần sau ghé em nhất định sẽ bo thêm tiền tip để ủng hộ quán nè! 🥺🤝💵`,
          `Ui chủ quán giải quyết có tâm và đáng yêu quá chừng. Em nâng lên thành ${newStars}★ rồi nha, lần tới ghé em sẽ bo thêm tiền tip cho quán vui nè! ✨🧋`,
          `Tưởng quán bơ ai ngờ chủ quán xin lỗi và đền bù chu đáo quá. Em bỏ qua lần này nhen, tặng lại ${newStars}★ và lần sau ghé em sẽ bo thêm tiền tip cho quán! 💖🎉`
        ],
        office: [
          `Cách xử lý khủng hoảng và chăm sóc khách hàng của quán rất văn minh, chuyên nghiệp. Mình ghi nhận thiện chí, đã nâng lên ${newStars}★ cho quán và lần tới order sẽ bo thêm tiền tip cho tiệm nhé! 🤝💼💵`,
          `Cảm ơn chủ quán đã giải thích và hỗ trợ nhiệt tình. Thấy quán có tâm sửa sai mình đã sửa lại ${newStars}★, lần tới ghé mua sẽ gửi thêm tiền tip bồi dưỡng nhé! ☕🏢`
        ],
        elder: [
          `Cháu biết nhận lỗi chân thành và sửa sai đàng hoàng là cô mừng rồi. Buôn bán đông khách khó tránh sơ suất, cô nâng lên ${newStars}★ cho cháu, lần sau ghé cô gửi thêm tiền tip động viên cháu nhé! 👵💖💵`,
          `Bác không giận nữa đâu, thấy chủ quán ăn nói biết trước biết sau là bác quý rồi. Bác sửa lên ${newStars}★, lần sau tới mua bác sẽ gửi thêm tiền tip cho cháu! 👴🤝`
        ],
        foodie: [
          `Ghi nhận quán biết tiếp thu nghiêm túc và chủ động khắc phục sai sót. Đã tăng +${deltaStars}★ thành ${newStars}★ khích lệ quán, lần sau ghé lại mình sẽ gửi thêm tiền tip ủng hộ tiệm! 🍵📈💵`
        ],
        star: [
          `[Tự động dịch] Cảm ơn sự chân thành và chu đáo của bạn! Nhận được phản hồi tử tế này mình đã sửa lên ${newStars}★, lần sau ghé lại mình sẽ bo thêm tiền tip nhé! ✨🥰💵`
        ],
        strict: [
          `Thấy quán nghiêm túc rút kinh nghiệm và sửa sai thỏa đáng, tôi nâng lên ${newStars}★. Lần sau ghé tôi sẽ gửi thêm tiền tip cho quán. 🤝💵`
        ]
      };
      replyText = rnd(posLowDict[arch] || posLowDict.genz);
    } else if (isExplain) {
      replyText = `Cảm ơn quán đã dành thời gian giải thích lý do cụ thể. Dù trải nghiệm vừa rồi chưa ưng ý nhưng mình ghi nhận sự thẳng thắn của tiệm, mong lần sau quán làm tốt hơn. ☕`;
    } else {
      const coldReplies = [
        `Trả lời qua loa cho có lệ vậy à? Chừng nào chưa cải thiện chất lượng thật sự thì đừng mong khách quay lại nha quán. 😒`,
        `Uống 1 lần là quá đủ thất vọng rồi, không bao giờ có lần thứ hai đâu!`,
        `Ghi nhận bằng hành động thực tế đi chứ nói mồm cho qua chuyện thì ai chả nói được.`
      ];
      replyText = rnd(coldReplies);
    }
  }

  return { text: replyText, deltaStars, newStars, isVulgar: false, extraTipNext, discountNext };
}


function pagerHTML(cur, total){
  if(total <= 1) return '';
  let btns = '';
  if(cur > 1) btns += '<button data-pg="' + (cur - 1) + '" aria-label="Trang trước">◀</button>';
  for(let i = 1; i <= total; i++){
    if(i === 1 || i === total || (i >= cur - 1 && i <= cur + 1)){
      btns += '<button class="' + (i === cur ? 'on' : '') + '" data-pg="' + i + '">' + i + '</button>';
    } else if(i === cur - 2 || i === cur + 2){
      btns += '<span>…</span>';
    }
  }
  if(cur < total) btns += '<button data-pg="' + (cur + 1) + '" aria-label="Trang sau">▶</button>';
  return '<div class="pager">' + btns + '</div>';
}

function paneRev(){
  if(!window.S) return;
  if(!Array.isArray(S.reviews)) S.reviews = [];
  try { applyMktAutoReplies(); } catch(e){ console.error('MKT reply error', e); }
  // Đồng bộ lượt 4 cho các đánh giá chủ tiệm đã phản hồi
  S.reviews.forEach(x => {
    if(x && x.rp && !x.crp){
      try {
        const res = genCustomerReply(x, x.rp);
        x.crp = res.text;
        x.deltaStars = res.deltaStars;
      } catch(e){}
    }
  });
  const r=rating(),all=(S.reviews||[]).filter(Boolean);
  const cnt=[5,4,3,2,1].map(s=>all.filter(x=>x.s===s).length),mx=Math.max(1,...cnt),nr=all.filter(x=>!x.rp).length;
  const list=all.map((x,i)=>[x,i]).filter(([x])=>revF==null||(revF==='nr'?!x.rp:x.s===revF));
  let h=`<div class="revsum"><div class="revbig"><b>${r.toFixed(1).replace('.',',')}</b><span class="stars">${starStr(r)}</span><div class="note">💬 ${revCount()}</div></div>
  <div class="dist">${[5,4,3,2,1].map((s,i)=>`<button class="dstr${revF===s?' on':''}" data-rf="${s}" aria-label="Lọc đánh giá ${s} sao"><span>${s}★</span><div class="bar"><i style="width:${cnt[i]/mx*100}%"></i></div><span>${cnt[i]}</span></button>`).join('')}</div></div>
  <div class="revflt"><button class="chip${revF==null?' on':''}" data-rf="all">Tất cả</button><button class="chip${revF==='nr'?' on':''}" data-rf="nr">Chưa trả lời · ${nr}</button>${revF!=null&&revF!=='nr'?`<button class="chip on" data-rf="all">${revF}★ ✕</button>`:''}</div>`;
  const PER=15,pages=Math.max(1,Math.ceil(list.length/PER));revPage=Math.min(Math.max(1,revPage),pages);
  const pager=pages>1?pagerHTML(revPage,pages):'';
  h+=pager;
  h+=list.length?list.slice((revPage-1)*PER,revPage*PER).map(([x,gi])=>`<div class="rev${x.s<=2?' bad':''}">${x.st!=null&&STARS[x.st]?`<span class="rface rstar"><i class="rfimg" style="${starBg(STARS[x.st].f,1,40,39)}"></i></span>`:typeof x.f==='string'&&/^b\\d+$/.test(x.f)?`<span class="rface" style="display:inline-flex;align-items:center;justify-content:center;background:#fff;border-radius:50%;"><img src="${IMG}brand/${x.f}.png" style="width:36px;height:36px;object-fit:contain;border-radius:50%;" alt=""></span>`:typeof x.f==='string'&&x.f.startsWith('img/')?`<span class="rface" style="display:inline-flex;align-items:center;justify-content:center;border-radius:50%;"><img src="${x.f}" style="width:36px;height:36px;object-fit:cover;border-radius:50%;" alt=""></span>`:`<span class="rface">${x.f||'🙂'}</span>`}<div class="rbody"><div class="rtop"><b>${esc(x.n||'Khách')}</b>${x.tg?`<span class="tag" style="background:#9b5fd0;color:#fff">⭐ ${esc(x.tg)}</span>`:''}${x.o?'<span class="tag">'+ico('phone')+'</span>':''}<span class="rday">Ngày ${x.d}</span></div><div class="stars">${starStr(x.s)}</div>
  
  <!-- CHUỖI PHẢN HỒI 4 LƯỢT CHUẨN -->
  <div class="rev-4lines" style="display:flex;flex-direction:column;gap:5px;margin-top:6px;">
    <!-- Lượt 1: Đánh giá khách hàng -->
    <div style="font-size:0.88rem;color:var(--ink);line-height:1.4;padding:2px 0;">
      <b>👤 Khách:</b> "${esc(x.t)}"
    </div>

    ${x.mktRep ? `
    <!-- Lượt 2: Me két ting phản hồi (là xong) -->
    <div style="background:rgba(244,114,182,0.1);border-left:3px solid #ec4899;border-radius:4px 8px 8px 4px;padding:5px 9px;font-size:0.82rem;line-height:1.35;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:2px;flex-wrap:wrap;gap:4px;">
        <b style="color:#db2777;">📢 Me két tinh (${esc(x.mktName || 'Me két tinh')}):</b>
        ${x.mktStarUp ? `<span class="star-delta up" style="font-weight:800;font-size:0.75rem;background:#dcfce7;color:#16a34a;padding:1px 6px;border-radius:8px;border:1px solid #86efac;">+${x.mktStarUp}★ Khách nâng sao!</span>` : ''}
      </div>
      <span>${esc(x.mktRep)}</span>
      ${x.mktCustHappy ? `<div style="margin-top:4px;font-size:0.78rem;color:#15803d;font-style:italic;">💬 <b>${esc(x.n || 'Khách')}:</b> "${esc(x.mktCustHappy)}"</div>` : ''}
    </div>
    ` : ''}

    <!-- Lượt 3: Chủ tiệm tự phản hồi (Tôi phản hồi) -->
    <div style="background:rgba(245,158,11,0.08);border-left:3px solid #f59e0b;border-radius:4px 8px 8px 4px;padding:5px 9px;font-size:0.82rem;line-height:1.35;">
      <b style="color:#b45309;">👑 Chủ tiệm tự phản hồi:</b> 
      ${x.rp ? `
        <span>${esc(x.rp)}</span>
      ` : `
        <button class="rpbtn owner-rp-btn" data-rp="${gi}" style="margin-left:6px;background:linear-gradient(135deg,#fef3c7,#fde68a);border:1.5px solid #f59e0b;color:#78350f;font-weight:800;padding:2px 10px;border-radius:8px;cursor:pointer;">Viết phản hồi</button>
      `}
    </div>

    ${x.crp ? `
    <!-- Lượt 4: Khách phản hồi lại khi chủ tiệm đã phản hồi -->
    <div style="background:rgba(99,102,241,0.08);border-left:3px solid #6366f1;border-radius:4px 8px 8px 4px;padding:5px 9px;font-size:0.82rem;line-height:1.35;">
      <b style="color:#4f46e5;">💬 ${esc(x.n || 'Khách')} phản hồi lại:</b> 
      <span>${esc(x.crp)}</span>
      ${x.deltaStars ? `<span class="star-delta ${x.deltaStars>0?'up':'down'}" style="margin-left:6px;font-weight:700;">${x.deltaStars>0?`+${x.deltaStars}★`:`${x.deltaStars}★`}</span>` : ''}
    </div>
    ` : ''}
  </div>

  </div>${x.b&&ITEMS[x.b]?`<span class="rcup">${cupHTML({base:x.b,flav:x.fl,tops:(x.tp||[]).filter(t=>ITEMS[t]),size:x.sz||'M',ice:null},true)}</span>`:''}</div>`).join(''):`<p class="note">${ico('star')} ${all.length?'Không có đánh giá nào khớp':'Chưa có đánh giá'}</p>`;
  h+=pager;
  $('pane').innerHTML=h;
  $('pane').querySelectorAll('[data-rf]').forEach(b=>b.onclick=()=>{const v=b.dataset.rf;revF=v==='all'?null:v==='nr'?'nr':(revF===+v?null:+v);revPage=1;paneRev()});
  $('pane').querySelectorAll('[data-pg]').forEach(b=>b.onclick=()=>{revPage=+b.dataset.pg;paneRev();const f=$('pane').querySelector('.pager');f&&f.scrollIntoView({block:'nearest'})});
  $('pane').querySelectorAll('[data-rp]').forEach(b=>b.onclick=()=>replyDlg(+b.dataset.rp));
}

let revPage=1;
function replyDlg(i){
  const x = S.reviews[i];
  if(!x) return;
  if(x.rp){
    toast('Đánh giá này chủ tiệm đã phản hồi, không thể sửa lại!');
    return;
  }
  const done = v => {
    v = String(v||'').replace(/\s+/g,' ').trim().slice(0,250);
    if(v){
      x.rp = v;
      // Lượt 4: Khách phản hồi lại câu trả lời của chủ tiệm
      if(x.origS == null) x.origS = x.s;
      const res = genCustomerReply(x, v);
      x.crp = res.text;
      x.deltaStars = res.deltaStars;
      x.s = res.newStars;
      if(res.discountNext) x.discountNext = true;
      if(res.extraTipNext) x.extraTipNext = true;
      if(res.freeDrinkNext) {
        x.freeDrinkNext = true;
        x.freeDrinkActive = true;
        S.freeDrinkQueue = S.freeDrinkQueue || [];
        S.freeDrinkQueue.push({ name: x.n || 'Khách', id: x.id });
      }
      checkReset5StarRating();
      save();
      paneRev();
      head();
      if(res.freeDrinkNext) toast(`👑 Đã gửi phản hồi! Khách ${x.n || 'Khách'} sẽ sớm ghé quán nhận ly nước FREE! 🎁`);
    }
  };
  ask(`<h2>👑 Chủ Tiệm Tự Phản Hồi Đánh Giá</h2>
    <div class="rpq">${starStr(x.s)} "<i>${esc(x.t)}</i>" — <b>${esc(x.n||'Khách')}</b></div>
    <div style="display:flex;gap:6px;margin:8px 0;flex-wrap:wrap;justify-content:center;">
      <button type="button" class="sbtn" onclick="$('rpin').value='Dạ cảm ơn bạn nhiều đã ủng hộ tiệm trà! Chúc bạn một ngày mới thật ngọt ngào nha! ✨';">💬 Cảm ơn</button>
      <button type="button" class="sbtn" onclick="$('rpin').value='Dạ tiệm thành thật xin lỗi bạn về trải nghiệm chưa trọn vẹn này ạ! Quán xin ghi nhận và cải thiện ngay! 🙏';">🙇 Xin lỗi</button>
      <button type="button" class="sbtn" onclick="$('rpin').value='Dạ quán xin chân thành xin lỗi bạn! Quán gửi tặng bạn voucher ly nước FREE lần ghé sau nha! 🎁';">🎁 Tặng voucher</button>
    </div>
    <textarea id="rpin" class="rpin" placeholder="Nhập lời cảm ơn hoặc giải thích từ Chủ Tiệm..."></textarea>`,
    [['Huỷ',()=>{}],['Gửi phản hồi',()=>{
      const f = $('rpin');
      done(f ? f.value : '');
    },1]]);
  setTimeout(()=>{
    const f=$('rpin');
    if(f){f.focus();f.select();}
  },50);
}

/* ---------- SELL VIEW ---------- */
function cupHTML(d,mini){
  const tops=(d.tops||[]).filter(t=>ITEMS[t]),foam=tops.find(t=>ITEMS[t].g==='foam');
  let h=`<div class="cup${d.size==='L'?' L':''}${mini?' mini':''}"><div class="straw"></div><div class="lid"></div><div class="glass">`;
  h+=`<div class="liquid${d.base?' full':''}" style="background:${d.base&&ITEMS[d.base]?ITEMS[d.base].c:'transparent'}"></div>`;
  if(d.base&&d.flav&&ITEMS[d.flav])h+=`<div class="flavband" style="background:${ITEMS[d.flav].c}"></div>`;
  if(d.base&&d.ice&&d.ice!=='Không đá'){const n=d.ice==='Ít đá'?2:4;for(let i=0;i<n;i++)h+=`<span class="ice" style="left:${20+i*16}%;top:${(foam?30:18)+(i%2)*8}%"></span>`;}
  const dotN=Math.max(3,Math.min(9,Math.floor(36/Math.max(1,tops.length))));
  tops.filter(t=>t!==foam).forEach((t,ti)=>{for(let i=0;i<dotN;i++){const l=18+((i*37+ti*19)%60),b=3+((i*23+ti*13)%20);h+=`<span class="tp g-${ITEMS[t].g} k-${t}" style="left:${l}%;bottom:${b}%;background:${pieceBg(t,i)};animation-delay:${i*40}ms"></span>`}});
  h+=`<div class="foam${foam?' on':''}"${foam?` style="background:${ITEMS[foam].c}"`:``}></div>`;
  if(!mini&&d.base&&S.upg&&S.upg.brandKit&&S.brand&&S.brand.i)h+=`<div class="cuptem">${temHTML(S.brand,66,false)}</div>`;
  return h+`</div></div>`;
}
function orderTx(o){
  const on=cup&&cup.used, sameTops=cup&&cup.tops.length===o.tops.length&&o.tops.every(t=>cup.tops.includes(t))&&cup.cheese===o.cheese;
  const it=(txt,ok)=>`<span class="oi${ok?' ok':''}">${txt}</span>`;
  const tops=(o.tops.length?(o.isFullTop?('Full top ('+o.tops.map(t=>ITEMS[t].s).join(' + ')+')'):o.tops.map(t=>ITEMS[t].s).join(' + ')):'Không topping')+(o.cheese?' + Kem cheese':'');
  return `<div class="ol"><span class="n">1</span>${it('<b>'+ITEMS[o.base].n+'</b>',cup&&cup.base===o.base)}</div>
  <div class="ol"><span class="n">2</span>${it('Size '+o.size,cup&&cup.size===o.size)}</div>
  <div class="ol"><span class="n">3</span>${it(tops,on&&sameTops)}</div>
  ${o.sugar!=null?`<div class="ol"><span class="n">4</span>${it(o.sugar+'% đường',cup&&cup.sugar===o.sugar)}</div>
  <div class="ol"><span class="n">5</span>${it(o.ice,cup&&cup.ice===o.ice)}</div>`:''}`;
}
function shortOrder(o){const tl=o.tops.map(t=>ITEMS[t].s);
  return `<b>${dname(o)}</b> · <b>${o.size}</b> · ${o.isFullTop?`Full top (${tl.length})`:tl.join(' + ')||'—'}${o.sugar!=null?` · ${o.sugar}% · ${o.ice}`:''}`}
function sentence(c){
  const o=c.order,n=c.cups.length,k=c.cups.indexOf(o)+1,ice={'Không đá':'không đá','Ít đá':'ít đá','Đá thường':'đá bình thường'}[o.ice];
  const tl=o.tops.map(t=>low(ITEMS[t].n));if(o.cheese)tl.push('kem cheese');
  let tops;
  if(!tl.length){
    tops='không topping';
  } else if(o.isFullTop){
    tops='full topping ('+tl.length+' loại: '+o.tops.map(t=>ITEMS[t].s).join(', ')+')';
  } else if(tl.length>4){
    tops=tl.length+' loại topping ('+o.tops.map(t=>ITEMS[t].s).join(', ')+')';
  } else if(tl.length>2){
    tops=tl.slice(0,-1).join(', ')+' và '+tl[tl.length-1];
  } else {
    tops=tl.join(' với ');
  }
  const tail=o.sugar!=null?`, ${tops}, ${o.sugar}% đường và ${ice}`:tl.length?` với ${tops}`:`, ${tops}`;
  const freeTag = c.isFreeDrink ? '<span class="tag" style="background:#10b981;color:#fff;border-radius:6px;padding:2px 6px;margin-right:6px;font-size:0.75rem;font-weight:800;">🎁 UỐNG FREE</span>' : '';
  if(n>1)return `${freeTag}<span class="cupno">Ly ${k}:</span> <b>${low(dname(o))}</b> size <b>${o.size}</b>${tail}.`;
  return `${freeTag}${c.say} 1 ly <b>${low(dname(o))}</b> size <b>${o.size}</b>${tail}${c.end}`;
}
function iconStrip(o){
  const ok=k=>{if(!cup)return false;
    if(k==='tops')return cup.used&&matchTops(cup,o);
    if(k==='sugar')return o.sugar!=null&&normSug(cup.sugar)===normSug(o.sugar);
    if(k==='ice')return o.ice!=null&&normIce(cup.ice)===normIce(o.ice);
    return cup[k]===o[k]};
  const tile=(k,inner,lab)=>`<div class="ic${ok(k)?' ok':''}">${inner}${lab?`<small>${lab}</small>`:''}</div>`;
  const tp=o.tops.map(t=>topIcon(t)).join('');
  const iceN={'Không đá':0,'Ít đá':1,'Đá thường':2}[o.ice];
  return `<div class="icons">
   ${tile('base',baseCup(o.base),'')}
   ${o.flav?tile('flav',flavIcon(o.flav,20),''):''}
   ${tile('size',sizeIc(o.size),o.size)}
   ${tile('tops',tp?`<span class="tps">${tp}</span>`:'<span class="none">—</span>','')}
   ${o.sugar!=null?tile('sugar',sugarIc(o.sugar),o.sugar+'%'):''}
   ${o.sugar!=null?tile('ice',iceIc(o.ice),''):''}
  </div>`;
}
function chip(g,v,label){return `<button class="chip${cup[g]===v?' on':''}" data-g="${g}" data-v="${v}">${label??v}</button>`}
const baseCup=k=>cupHTML({base:k,tops:[],cheese:false,size:'M',ice:null},true);
const sizeIc=z=>`<span class="mcup ${z}"></span>`;
const sugarIc=v=>`<span class="sbar"><i style="height:${v}%"></i></span>`;
const iceIc=v=>{const n={'Không đá':0,'Ít đá':1,'Đá thường':2}[v];return n?`<span class="cubes">${'<i></i>'.repeat(n)}</span>`:'<span class="none">⊘</span>'};
const SINFO={tea:[ico('teapot'),'Trà + Size'],flav:[ico('strawberry'),'Hương'],top:[ico('pearlbowl'),'Topping'],sugar:['🍬','Đường'],ice:['🧊','Đá']};
function autoServe(){
  if(!R.running||!cup.used)return;const my=cup;clearTimeout(R.autoT);
  R.autoT=setTimeout(()=>{if(cup!==my||!R.running)return;
    // 1) ly khớp đúng đơn của ai (khách tới trước được ưu tiên) thì đưa luôn
    const cands=[];pSlots().forEach((c,i)=>{if(c&&c.cups.some((o,j)=>!c.done[j]&&matches(cup,o)))cands.push({id:c.id,go:()=>serve(i)})});
    R.online.forEach((c,j)=>{if(matches(cup,c.order))cands.push({id:c.id,go:()=>serveOnline(j)})});
    if(cands.length){cands.sort((a,b)=>a.id-b.id)[0].go();return}
    // 2) ly đã pha xong hết bước mà không khớp ai: đưa cho khách đang pha cho, tính là sai
    const lv=level(),complete=cup.base&&cup.size&&(lv>=2?(cup.sugar&&cup.ice):true);
    if(!complete)return;const o=targetOrder();if(!o)return;
    const i=pSlots().findIndex(c=>c&&c.cups.includes(o));if(i>=0)return serve(i);
    const j=R.online.findIndex(c=>c.order===o);if(j>=0)serveOnline(j);
  },220);
}
function targetOrder(){
  const all=[];[...pSlots().filter(Boolean),...R.online].sort((a,b)=>a.id-b.id).forEach(c=>c.cups.forEach((o,j)=>{if(!c.done[j])all.push(o)}));
  const fl=cup.flav&&cup.flav!=='none'?cup.flav:null;
  const m=all.filter(o=>(!cup.base||o.base===cup.base)&&(!cup.size||o.size===cup.size)&&(!cup.flav||(o.flav||null)===fl));
  return m[0]||all[0]||null;
}
function stepsAvail(){const a=['tea'];if(FLAV_KEYS.some(k=>S.unlocked[k]))a.push('flav');a.push('top');if(level()>=2)a.push('sugar','ice');return a}
function useCup(){if(cup.used)return true;if(!take('cup')){if(S.upg.staffBuyer)staffBuyerTriggerInstant('cup');else toast('Hết ly! Nhập thêm ở kho ngày mai');return false}R.today.cogs+=CFG.cost.cup;cup.cost+=CFG.cost.cup;use('cup');cup.used=true;return true}
function use(k){R.today.used[k]=(R.today.used[k]||0)+1}
function consume(k){take(k);use(k);R.today.cogs+=CFG.cost[k];cup.cost+=CFG.cost[k]}
function spoilCup(){if(cup.used){const r=S.cur;r.spoil=r.spoil||{n:0,v:0};r.spoil.n++;r.spoil.v+=cup.cost}cup=newCup()}
const maxTop=()=>16;
function addIng(kind,k){
  if(isPriorityStaffWorking() && (R.gzWork || R.svWork)){
    toast('Nhân viên đang tự động pha chế, sếp cứ ngồi thảnh thơi nhé! 🍹', 2000);
    return;
  }
  if(!qty(k)){if(S.upg.staffBuyer){staffBuyerTriggerInstant(k);return}return toast('Hết '+ITEMS[k].n)}
  if(kind==='base'){if(cup.base===k)return;if(!useCup())return;consume(k);cup.base=k}
  else if(kind==='flav'){if(cup.flav===k)return;if(!useCup())return;consume(k);cup.flav=k}
  else if(kind==='top'){if(cup.tops.includes(k))return toast('Muốn bỏ topping thì đổ ly làm lại');if(cup.tops.length+(cup.cheese?1:0)>=maxTop())return toast('Tối đa '+maxTop()+' topping');if(!useCup())return;consume(k);cup.tops.push(k)}
  else{if(cup.cheese)return;if(cup.tops.length>=maxTop())return toast('Tối đa '+maxTop()+' topping');if(!useCup())return;consume(k);cup.cheese=true}
}

/* ---------- QUẦY PHA 3.0 (theo tranh vẽ) ---------- */
const Q3Y=76;
const JAR_K=['tra','matcha','hong','luc','olong','thai'],JAR_X=[198,276,353,430,507,584];
const JAR_L={tra:['TRÀ','SỮA'],matcha:['MATCHA'],hong:['HỒNG','TRÀ'],luc:['LỤC','TRÀ'],olong:['OLONG'],thai:['TRÀ','THÁI']};
const TRAY_K=['tcden','tcvang','tcsoi','popping','thach','cunang','thachtc','suongsao','thachcf','pmvien','pmtuoi','thachpm'];
const TCOL=[[285,392],[402,512],[520,632],[640,750]],TROW=[[620,718],[728,826],[836,934]],BADGE_X=[380,498,617,736],BADGE_Y=[634,740,845];
const BIN_K=['cheese','fmatcha','fsalt','fube','ice','sugar'],BINS=[[12,125],[147,250],[270,374],[394,497],[517,622],[637,745]];
const BIN_LB=['FOAM<br>CHEESE','FOAM<br>MATCHA','FOAM<br>MUỐI','FOAM<br>UBE','ĐÁ VIÊN','NƯỚC<br>ĐƯỜNG'];
const BTL_K=['f_vai','f_dao','f_dau','f_nho','f_oi','f_xoai','f_mang','f_tao','f_chanh','f_me','f_dua','f_choco'],BTL_X=[42,104,166,229,291,353,415,477,539,602,664,726];
const Q3INK='#4a3526';
function pc(k,x,y,i){
  switch(k){
    case 'tcden':return `<circle cx="${x}" cy="${y}" r="4.6" fill="#2b1d14" stroke="#150c07" stroke-width=".7"/><circle cx="${x-1.5}" cy="${y-1.6}" r="1.2" fill="#fff" opacity=".45"/>`;
    case 'tcvang':return `<circle cx="${x}" cy="${y}" r="4.6" fill="#e0a526" stroke="#a8740e" stroke-width=".8"/><circle cx="${x-1.5}" cy="${y-1.6}" r="1.3" fill="#fff" opacity=".6"/>`;
    case 'popping':return `<circle cx="${x}" cy="${y}" r="4.8" fill="#f28fb0" fill-opacity=".9" stroke="#c9587f" stroke-width=".8"/><circle cx="${x-1.6}" cy="${y-1.7}" r="1.7" fill="#fff" opacity=".7"/>`;
    case 'pmvien':return `<circle cx="${x}" cy="${y}" r="4.6" fill="#f7d56b" stroke="#c99a22" stroke-width=".8"/><circle cx="${x-1.4}" cy="${y-1.5}" r="1.2" fill="#fff" opacity=".6"/>`;
    case 'tcsoi':return `<path d="M${x-6} ${y+(i%2?2:-1)}q3 -5 6 0t6 0" fill="none" stroke="#6b4a38" stroke-width="3" stroke-linecap="round"/>`;
    case 'pmtuoi':return `<path d="M${x-6} ${y+2}q-1 -6 4 -6q2 -3 5 0q4 0 3 5q1 4 -4 4h-5q-4 0 -3 -3z" fill="#fff4d6" stroke="#e0c47c" stroke-width=".8"/>`;
    case 'thach':return `<circle cx="${x}" cy="${y}" r="4.6" fill="#fbf8f0" stroke="#a89c86" stroke-width=".8"/><circle cx="${x-1.5}" cy="${y-1.6}" r="1.3" fill="#fff"/>`;
    case 'cunang':return `<rect x="${x-3.4}" y="${y-3.4}" width="6.8" height="6.8" rx="1.5" fill="#9fd49a" stroke="rgba(0,0,0,.25)" stroke-width=".7"/>`;
    case 'thachtc':return `<rect x="${x-4.2}" y="${y-4.2}" width="8.4" height="8.4" rx="2" fill="${['#f7941d','#ee4d2d','#fbb03b','#fbfaf4'][i%4]}" fill-opacity=".95" stroke="#5a3d2b" stroke-width=".7"/>`;
    case 'suongsao':return `<rect x="${x-4.3}" y="${y-4.3}" width="8.6" height="8.6" rx="1.5" fill="#1f2a24" stroke="#0c120f" stroke-width=".7"/><path d="M${x-2.5} ${y-2.5}h3" stroke="#fff" stroke-opacity=".4" stroke-width="1.2"/>`;
    case 'thachcf':return `<rect x="${x-4.3}" y="${y-4.3}" width="8.6" height="8.6" rx="1.5" fill="#5a3a26" stroke="#2e1c11" stroke-width=".7"/><path d="M${x-2.5} ${y-2.5}h3" stroke="#fff" stroke-opacity=".3" stroke-width="1.2"/>`;
    case 'thachpm':return `<rect x="${x-4.5}" y="${y-4.5}" width="9" height="9" rx="2" fill="#f3d98a" stroke="#b8923a" stroke-width=".7"/><rect x="${x-3}" y="${y-3}" width="3" height="3" rx="1" fill="#fff8dc"/>`;
  }return ''}
const q3pts=n=>Array.from({length:n},()=>[Math.random()*2-1,Math.random()*6]);
/* một muỗng topping: xếp dày 3 hàng dưới đáy ly như ly thật */
function q3layer(k){const rows=k==='tcsoi'?3:3,gap=k==='tcsoi'?13:11,out=[];
  for(let r=0;r<rows;r++){const y=BY-6-r*9.4,w=(halfAt(y)-6)*2,n=Math.max(3,Math.floor(w/gap)+1);
    for(let j=0;j<n;j++){if(r===rows-1&&Math.random()<.25)continue;const u=(n===1?0:(j/(n-1))*2-1)+(r%2?.5/n:0)+(Math.random()-.5)*.08;
      out.push([Math.max(-1,Math.min(1,u)),r*9.4+(Math.random()-.5)*2.4])}}
  return out}
const q3mix=(a,b,t)=>{const p=h=>[1,3,5].map(i=>parseInt(h.substr(i,2),16));const A=p(a),B=p(b);return '#'+A.map((v,i)=>Math.round(v+(B[i]-v)*t).toString(16).padStart(2,'0')).join('')};
function liqCol(c){if(!c.base||!ITEMS[c.base])return '#e8c9a8';let col=ITEMS[c.base].c;if(c.flav&&ITEMS[c.flav])col=q3mix(col,ITEMS[c.flav].c,.3);if(c.mixed)col=q3mix(col,'#7d6f55',.45);return col}
const CX=55.6,BY=141,LH=105,halfAt=y=>y<51.7?44:44-(y-51.7)/(136.5-51.7)*11.1;
function glassHTML(c,opt){opt=opt||{};
  const fill=c.fill||0,surf=BY-Math.min(fill,1)*LH,vt=c.vt||[],vi=c.vi||[],foams=(c.tops||[]).filter(t=>ITEMS[t]&&ITEMS[t].g==='foam');let inner='';
  if(fill>0||opt.pour)inner+=`<rect class="lq" x="0" y="${surf}" width="110" height="${BY-surf+8}" fill="${liqCol(c)}"/><rect class="lqh" x="0" y="${surf}" width="110" height="3.5" fill="#fff" opacity=".3"/>`;
  const step=vt.length>3?Math.min(22,60/vt.length):22;
  vt.forEach((p,i)=>{const big=p.pts.length>10,sc=big?1.3:1;p.pts.forEach(([u,v],j)=>{const y=BY-(big?6:5)-v-i*step,x=CX+u*(halfAt(y)-(big?7:6));inner+=big?`<g transform="translate(${x} ${y}) scale(${sc}) translate(${-x} ${-y})">${pc(p.k,x,y,j+i)}</g>`:pc(p.k,x,y,j+i)})});
  const iceTop=fill>0?surf:Math.max(52,BY-(8+Math.min(vt.length*20,68)));
  vi.forEach(([u,v,r])=>{const x=CX+u*(halfAt(iceTop)-12);inner+=`<rect x="${x-8}" y="${iceTop+v}" width="16" height="16" rx="4" fill="#f2fbff" fill-opacity=".75" stroke="#8fb9cf" stroke-width="1.5" transform="rotate(${r} ${x} ${iceTop+v+8})"/>`});
  let fy=fill>0?surf:iceTop;
  foams.forEach(k=>{const th=13;fy-=th-3;const w=halfAt(fy)*2+4,x0=CX-w/2;
    inner+=`<path d="M${x0} ${fy+th}V${fy+5}q${w/8} -8 ${w/4} 0t${w/4} 0t${w/4} 0t${w/4} 0V${fy+th}Z" fill="${ITEMS[k].c}" stroke="#5a3d2b" stroke-width=".6"/>`});
  const id='q3c'+(opt.mini?'m':'');
  let out=`<svg viewBox="0 0 110 155.6" preserveAspectRatio="none"><defs><clipPath id="${id}"><path d="M8 27.8H103L99.9 51.7L88.8 136.5Q56 147 23.1 136.5L11.4 51.7Z"/></clipPath></defs>`;
  if(!opt.mini)out+=`<ellipse cx="${CX}" cy="150" rx="40" ry="5" fill="rgba(90,55,20,.25)"/>`;
  if(c.spill)out+=`<ellipse cx="${CX}" cy="150" rx="62" ry="7" fill="${liqCol(c)}" opacity=".85" stroke="#5a3d2b" stroke-width="1"/>`;
  if(opt.pour)out+=`<rect class="strm" x="${CX-3.5}" y="-80" width="7" height="${surf+80}" rx="3.5" fill="${ITEMS[opt.pour].c}" stroke="#5a3d2b" stroke-width=".8"/>`;
  out+=`<g clip-path="url(#${id})">${inner}</g>`;
  out+=`<path d="M8 27.8H103L99.9 51.7L88.8 136.5Q56 147 23.1 136.5L11.4 51.7Z" fill="none" stroke="#5a3d2b" stroke-width="1.5" opacity="0.6"/>`;
  if(!c.sealed&&!opt.mini)out+=`<line x1="${CX-halfAt(57)+4}" x2="${CX+halfAt(57)-4}" y1="57" y2="57" stroke="#2f8a63" stroke-width="2.2" stroke-dasharray="5 4"/>`;
  out+=`</svg><img src="${IMG}cup.png" alt="" onerror="this.style.display='none'"><img class="q3lid" src="${IMG}lid.png" alt=""${c.sealed?'':' hidden'} onerror="this.style.display='none'">`;
  if(!opt.mini&&c.size)out+=`<svg viewBox="0 0 110 155.6" preserveAspectRatio="none"><g transform="translate(86 118)"><circle r="9" fill="#fffaf0" stroke="${Q3INK}" stroke-width="1.6"/><text y="4.5" text-anchor="middle" font-family="Baloo 2,sans-serif" font-weight="800" font-size="12" fill="${Q3INK}">${c.size}</text></g></svg>`;
  return `<div class="q3g">${out}</div>`}
function orderGlass(o){const ic={'Không đá':0,'Ít đá':1,'Đá thường':2}[o.ice]||0;
  return glassHTML({base:o.base,flav:o.flav,tops:o.tops,fill:.8,sealed:true,vt:o.tops.filter(t=>ITEMS[t]&&ITEMS[t].g!=='foam').map(k=>({k,pts:q3layer(k)})),vi:Array.from({length:ic===2?8:ic*3},(_,i)=>[Math.random()*2-1,4+Math.random()*22+i*3.5,Math.random()*40-20])},{mini:1})}
const q3reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;

function renderSell(){
  {const ae=document.activeElement;if(ae&&ae.blur&&/INPUT|TEXTAREA|SELECT/.test(ae.tagName))ae.blur()}scrollTo(0,0);
  R.mode='sell';document.body.classList.add('selling');R.focus=null;R.sealing=false;
  const zone=(a,x,y,w,h,extra,cls)=>`<button class="q3z ${cls||''}" ${a} data-r="${x},${y},${w},${h}" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px">${extra||''}</button>`;
  let h='';
  h+=zone('data-a="size:M" aria-label="Lấy ly M" id="q3_M"',14,408,66,178)+zone('data-a="size:L" aria-label="Lấy ly L" id="q3_L"',82,368,64,218);
  h+=`<div class="q3badge" style="left:110px;top:368px" id="q3cups"></div>`;
  JAR_K.forEach((k,i)=>{const x=JAR_X[i];h+=zone(`data-tea="${k}" id="q3b_${k}" aria-label="Giữ để rót ${ITEMS[k].n}"`,x-37,362,74,160,'','q3jar');
    h+=`<div class="q3jarT" style="left:${x-31}px;top:428px;width:62px;height:46px">${JAR_L[k].map(w=>`<span${w.length>5?' style="font-size:14px"':''}>${w}</span>`).join('')}</div>`;
    h+=`<div class="q3badge q3sm" style="left:${x+14}px;top:372px" id="q3n_${k}"></div>`});
  h+=zone('data-a="seal" id="q3seal" aria-label="Dán nắp và giao ly"',638,334,122,228);
  h+=zone('data-a="trash" id="q3trash" aria-label="Đổ ly làm lại"',188,582,84,100);
  TRAY_K.forEach((k,i)=>{const [x0,x1]=TCOL[i%4],[y0,y1]=TROW[Math.floor(i/4)];
    h+=zone(`data-a="top:${k}" id="q3b_${k}" aria-label="${ITEMS[k].n}"`,x0,y0,x1-x0,y1-y0);
    h+=`<div class="q3badge" style="left:${BADGE_X[i%4]-15}px;top:${BADGE_Y[Math.floor(i/4)]-15}px;min-width:30px;height:30px" id="q3n_${k}"></div>`});
  let spr='',patch='';const lv_=level();
  const binsOwn=BIN_K.map((k,i)=>[k,i]).filter(([k])=>k==='ice'||k==='sugar'?lv_>=2:S.unlocked[k]);
  binsOwn.forEach(([k,src],i)=>{const sx=15+124*src,dx=15+124*i;
    spr+=`<div class="q3spr" style="left:${dx}px;top:955px;width:124px;height:178px;background-position:${-sx}px -955px"></div>`;
    const a=k==='ice'?'data-a="ice" id="q3b_ice"':k==='sugar'?'data-a="sugar" id="q3b_sugar"':`data-a="top:${k}" id="q3b_${k}"`;
    h+=zone(`${a} data-s="${sx+4},975" aria-label="${BIN_LB[src].replace('<br>',' ')}"`,dx+4,975,116,158);
    h+=`<div class="q3lbT" style="left:${dx+10}px;top:1097px;width:104px;height:34px">${BIN_LB[src]}</div>`;
    if(ITEMS[k])h+=`<div class="q3badge q3sm" style="left:${dx+98}px;top:984px" id="q3n_${k}"></div>`});
  if(binsOwn.length<BIN_K.length){const hx=15+124*binsOwn.length,hw=124*(BIN_K.length-binsOwn.length);
    patch=`<div class="q3patch" style="left:${hx}px;top:948px;width:${hw}px;height:194px"></div>`}
  BTL_K.filter(k=>S.unlocked[k]).forEach(k=>{const i0=BTL_K.indexOf(k),i=spr.split('data-btl').length-1,sx=BTL_X[i0],x=BTL_X[i];
    spr+=`<div class="q3spr" data-btl style="left:${x-31}px;top:1160px;width:62px;height:200px;background-position:${-(sx-31)}px -1160px"></div>`;
    h+=zone(`data-a="flav:${k}" id="q3b_${k}" data-s="${sx-29},1166" aria-label="Siro ${ITEMS[k].n}"`,x-29,1166,58,190);
    h+=`<div class="q3badge q3sm" style="left:${x+6}px;top:1206px" id="q3n_${k}"></div>`});
  $('view').innerHTML=`<div id="q3"><div id="q3stage">
    ${patch}<div id="q3tint" aria-hidden="true"></div>${(evIs('rain')||evIs('storm'))?'<div id="q3rain" aria-hidden="true"><i class="r1"></i><i class="r2"></i></div>':''}
    <div id="q3partyWrap" class="q3-party-wrap" style="${(R.party && S.partyContract) ? '' : 'display:none;'}">
      <div class="q3-party-inner">
        <div class="q3-party-title" id="q3partyTitle">${S.partyContract ? esc(S.partyContract.title) : ''}</div>
        <div class="q3-party-progress-box">
          <div class="q3-party-bar"><div class="q3-party-bar-fill" id="q3partyFill" style="width:0%"></div></div>
          <span class="q3-party-count" id="q3partyCount">0/0 ly</span>
        </div>
        <button class="q3-party-pack-btn" id="q3partyPackBtn" title="Đóng gói ly trên thớt cho đơn tiệc">📦 Đóng ly tiệc</button>
      </div>
    </div>
    <button id="q3FrontBtn" class="q3-front-btn" title="Xuống Phố">🏪 Xuống Phố</button>
    <div class="q3lane" id="lane"></div>
    <div class="q3face" id="q3face" aria-hidden="true"></div>
    <div class="q3bub" id="q3bub"><div id="q3want" aria-hidden="true"></div><div id="q3say"></div><div class="q3pat"><span>KIÊN NHẪN</span><div class="q3bar"><i id="q3pat"></i></div></div></div>
    <div class="q3tag" style="left:30px;top:327px;width:108px;height:30px">QUẦY TRÀ</div>
    <div class="q3tag" style="left:29px;top:603px;width:151px;height:34px;font-size:23px">PHA LY</div>
    <button type="button" id="q3PhoneBtn" class="q3-phone-btn" title="Bản đồ giao hàng Shipper">
      <img src="img/ic_phone.png" class="q3-phone-img" alt="Phone Shipper Map">
      <span class="q3-phone-badge" id="q3PhoneBadge" style="display:none;">0</span>
    </button>
    <div id="q3sprs">${spr}</div><div id="q3pops"></div><div id="q3zones">${h}</div>
    <div id="q3noCup">Lấy ly<br>M hoặc L</div><div id="q3cup" aria-hidden="true"></div>
    <div class="q3gauge"><div class="q3lv" id="q3gLv"></div><div class="q3ok"></div></div><div id="q3hint"></div><div id="q3coach" hidden></div>
  </div></div><div class="staff-bar-wrap" id="staffBarWrap"><div id="buyerWidget" class="buyer-widget" style="display:none"></div><div id="svWidget" class="gz-widget sv-widget" style="display:none"></div><div id="gzWidget" class="gz-widget" style="display:none"></div></div>`;
  if($('q3FrontBtn')) $('q3FrontBtn').onclick = openFrontShop;
  if($('q3PhoneBtn')) $('q3PhoneBtn').onclick = openShipperMap;
  if($('q3partyPackBtn')) $('q3partyPackBtn').onclick = packCupForParty;
  renderPartyWidget();
  const st=$('q3stage');
  st.onclick=e=>{
    const dx=e.target.closest('[data-decl]');if(dx){const id=+dx.dataset.decl,i=R.slots.findIndex(c=>c&&c.id===id);if(i>=0){decline(i);toast('Đã mời khách về');renderPanel()}else{const j=R.online.findIndex(c=>c.id===id);if(j>=0){declineOnline(j);toast('Đã huỷ đơn online')}}return}
    const ch=e.target.closest('[data-fc]');if(ch){const id=+ch.dataset.fc;if(R.st2&&R.st2.id===id){toast('Nhân viên pha chế đang lo đơn này');return}if(R.sto&&R.sto.id===id){toast('Nhân viên đơn online đang lo đơn này');return}R.focus=id;renderLane();renderPanel();coach();return}
    const cv=e.target.closest('[data-cv]');if(cv){const c=focusCust();const j=+cv.dataset.cv;if(c&&!c.done[j]){c.order=c.cups[j];renderLane();renderPanel()}return}
    const dc=e.target.closest('[data-decl]');if(dc){const i=R.slots.findIndex(c=>c&&c.id===+dc.dataset.decl);if(i>=0)decline(i);return}
    if(!R.running||R.paused||R.sealing)return;const b=e.target.closest('[data-a]');if(b)q3act(b.dataset.a,b)};
  const gzw=$('gzWidget');if(gzw){gzw.onclick=onGzWidgetClick}
  const svw=$('svWidget');if(svw){svw.onclick=onSvWidgetClick};const bw=$('buyerWidget');if(bw){bw.onclick=onBuyerWidgetClick}
  const zs=$('q3zones');
  zs.addEventListener('pointerdown',e=>{const u=e.target.closest('[data-tea]');if(!u||!R.running||R.paused||R.sealing)return;e.preventDefault();try{u.setPointerCapture(e.pointerId)}catch(_){}startPour(u.dataset.tea,u)});
  ['pointerup','pointercancel','lostpointercapture'].forEach(ev=>zs.addEventListener(ev,stopPour));
  zs.addEventListener('keydown',e=>{const u=e.target.closest('[data-tea]');if(u&&(e.key===' '||e.key==='Enter')&&!e.repeat&&!R.pour){e.preventDefault();startPour(u.dataset.tea,u)}});
  zs.addEventListener('keyup',e=>{if(e.key===' '||e.key==='Enter')stopPour()});
  zs.addEventListener('contextmenu',e=>e.preventDefault());
  q3fit();renderLane();renderCup();renderPanel();renderGzWidget();renderBuyerWidget();renderSvWidget();head();
  const q=$('q3');q.addEventListener('scroll',()=>{q.scrollTop=0;q.scrollLeft=0});[120,500,1500].forEach(t=>setTimeout(q3re,t));
}
/* Chrome Android bật "Trang web cho máy tính" → trang bị thu nhỏ; phóng lại cho vừa màn hình điện thoại */
const ZM=(()=>{try{const sw=screen.width,coarse=matchMedia('(pointer:coarse)').matches||navigator.maxTouchPoints>0;
  if(coarse&&sw>0&&sw<=820&&innerWidth>sw*1.35){const z=innerWidth/sw;document.documentElement.style.zoom=z;return z}}catch(e){}return 1})();
const vpW=()=>innerWidth/ZM,vpH=()=>innerHeight/ZM;
/* chừa mép dưới: vuốt ngang ở mép dưới iPhone là chuyển sang app khác (Zalo…) */
let _sab=null;function botGap(){if(_sab==null){const d=document.createElement('div');d.style.cssText='position:fixed;bottom:0;height:0;padding-bottom:env(safe-area-inset-bottom,0px);visibility:hidden';document.body.appendChild(d);_sab=d.offsetHeight||0;d.remove()}
  const touch=matchMedia('(pointer:coarse)').matches||navigator.maxTouchPoints>0;return touch?Math.max(_sab,10)+18:0}
function q3fit(){const q=$('q3');if(!q)return;const hd=document.querySelector('header'),aw=document.querySelector('.app>.awning');
  if(scrollX||scrollY)scrollTo(0,0);q.scrollTop=0;q.scrollLeft=0;
  const vv=window.visualViewport,vh=vpNow()/ZM,vw=(vv&&vv.width>100?Math.min(innerWidth,vv.width):innerWidth)/ZM;
  const top=Math.max(0,Math.round((aw||hd).getBoundingClientRect().bottom/ZM)),W=vw,H=vh-top-botGap(),s=Math.min(W/768,H/(1376-Q3Y));
  q.style.top=top+'px';q.style.height=H+'px';q.style.bottom='auto';const st=$('q3stage');st.style.transform=`scale(${s})`;st.style.left=Math.max(0,(W-768*s)/2)+'px';st.style.top=(-Q3Y*s)+'px'}
function q3re(){if(R.mode==='sell')q3fit()}
addEventListener('resize',q3re);addEventListener('orientationchange',()=>setTimeout(q3re,300));addEventListener('pageshow',q3re);document.addEventListener('visibilitychange',()=>{if(!document.hidden)[0,300].forEach(t=>setTimeout(q3re,t))});addEventListener('load',q3re);
addEventListener('scroll',()=>{if(R.mode==='sell'&&(scrollX||scrollY))scrollTo(0,0)},{passive:true});
if(window.visualViewport){visualViewport.addEventListener('resize',q3re);visualViewport.addEventListener('scroll',q3re)}
/* iPhone (thêm vào MH chính): bàn phím đẩy trang lên và không trả về → tự kéo lại */
const isField=el=>el&&/INPUT|TEXTAREA|SELECT/.test(el.tagName)&&!/^(checkbox|radio|button|file|range|color)$/.test(el.type||'');
/* đang gõ: ẩn thanh Nấu & nhập / Mở cửa để không nổi đè lên ô nhập. Chuyển ô bằng mũi tên ^ v thì không kéo trang */
let kbT=null;
addEventListener('focusin',e=>{if(!isField(e.target))return;clearTimeout(kbT);document.body.classList.add('kbopen')});
addEventListener('focusout',()=>{clearTimeout(kbT);kbT=setTimeout(()=>{if(isField(document.activeElement))return;
  document.body.classList.remove('kbopen');
  /* bàn phím đóng hẳn: chỉ kéo lại nếu trang bị đẩy quá cuối */
  const mx=Math.max(0,document.documentElement.scrollHeight-innerHeight);if(scrollY>mx)scrollTo(0,mx);
  if(R.mode==='sell')q3fit()},350)});
/* iPhone (app trên MH chính): sau khi bàn phím đóng, khung nhìn đôi khi kẹt ở chiều cao lúc còn bàn phím (thấp hơn màn hình thật cỡ 340-360px).
   Game đo lại, và nếu thấy kẹt thì tự dùng chiều cao màn hình thật cho quầy pha, nút Mở cửa và hộp thoại */
const IOS_APP=(()=>{try{return /iP(hone|od)/.test(navigator.userAgent)&&(navigator.standalone===true||matchMedia('(display-mode: standalone)').matches)}catch(e){return false}})();
let VPFIX=0,vpGood=0,kbUsed=0;
/* chỉ sửa khi vừa dùng bàn phím (trong 2 phút) và khung nhìn hụt hẳn (dưới 72% màn hình, cỡ chiều cao lúc còn bàn phím) */
addEventListener('focusin',e=>{if(isField(e.target))kbUsed=Date.now()});
function vpNow(){const vv=window.visualViewport,h=(vv&&vv.height>100?Math.min(innerHeight,vv.height):innerHeight);
  if(IOS_APP&&innerWidth<=520&&kbUsed&&Date.now()-kbUsed<120000&&!isField(document.activeElement)){const sh=Math.max(screen.height,screen.width);
    if(innerHeight<sh*.72){VPFIX=vpGood&&vpGood>innerHeight?vpGood:Math.round(sh*.94);return VPFIX}}
  if(h>=Math.max(screen.height,screen.width)*.8)vpGood=h;
  VPFIX=0;return h}
function vpSync(){if(!IOS_APP||!document.body)return;if(!kbUsed||Date.now()-kbUsed>120000){if(VPFIX){VPFIX=0;document.body.classList.remove('vpfix')}return}const was=VPFIX;vpNow();
  document.body.classList.toggle('vpfix',!!VPFIX);document.documentElement.style.setProperty('--vpfix',VPFIX+'px');
  if(VPFIX&&!was){/* thử ép iOS tính lại khung nhìn */try{const m=document.querySelector('meta[name=viewport]');if(m){const c=m.content;m.content=c+', x=1';setTimeout(()=>{m.content=c},60)}scrollTo(0,0)}catch(e){}}
  if(VPFIX!==was&&R.mode==='sell')q3fit()}
if(IOS_APP){['resize','orientationchange','pageshow','focusout','load'].forEach(e=>addEventListener(e,()=>{vpSync();[150,500,1200].forEach(t=>setTimeout(vpSync,t))}));
  if(window.visualViewport)visualViewport.addEventListener('resize',vpSync);document.addEventListener('visibilitychange',()=>{if(!document.hidden)[0,300,900].forEach(t=>setTimeout(vpSync,t))});setInterval(vpSync,2000);vpSync()}
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(q3re);
function focusCust(){
  const gzActiveId = (typeof isStaffActive === 'function' && isStaffActive('staffGz') && R.gzWork) ? R.gzWork.cId : null;
  const svActiveId = (typeof isStaffActive === 'function' && isStaffActive('staffSv') && R.svWork) ? R.svWork.cId : null;
  const staffTargetId = gzActiveId || svActiveId || null;
  const all=[...R.slots.filter(Boolean),...R.online.filter(c=>!isSto(c))].sort((a,b)=>a.id-b.id);
  let f=null;
  if(staffTargetId && (!R.focus || R.focus === staffTargetId)){
    f = all.find(c => c.id === staffTargetId);
  }
  if(!f){
    f = all.find(c => c.id === R.focus) || (staffTargetId ? all.find(c => c.id === staffTargetId) : null) || all[0] || null;
  }
  R.focus=f?f.id:null;
  return f;
}
function shipBg(row,e,w,h){return `background-image:url(${IMG}ship.webp);background-size:${w*3}px ${h*2}px;background-position:${-e*w}px ${-row*h}px`}
const hasFace=c=>c&&(c.who!=null||c.ship!=null||c.star!=null),faceOf=(c,e,w,h)=>c.star!=null?starBg(STARS[c.star].f,e,w,h):c.ship!=null?shipBg(c.ship,e,w,h):faceBg(c.who,e,w,h),faceRow=c=>c.star!=null?STARS[c.star].f:c.ship!=null?c.ship:c.who;
function faceBg(who,e,w,h){return `background-image:url(${IMG}faces.webp);background-size:${w*3}px ${h*9}px;background-position:${-e*w}px ${-who*h}px`}

function renderGzHeadCup(w, c){
  if(!w || !c) return '';
  const showChide = w.chide && Date.now() < (w.chideUntil || 0);
  const isSv = w.staff === 'sv';
  // Đã xoá bỏ hoàn toàn ly nước và thanh chữ bên dưới avatar khách theo yêu cầu người chơi
  const chideHtml = showChide ? `<div class="gz-chide-bubble">${isSv ? '🥱' : '😤'} ${esc(w.chide)}</div>` : '';
  return chideHtml;
}
function renderLane(){
  const L=$('lane');if(!L)return;const f=focusCust();
  const items=[...R.slots.map((c,i)=>c&&{c,a:`data-slot="${i}"`}),...R.online.map((c,j)=>({c,a:`data-on="${j}"`}))].filter(Boolean).sort((x,y)=>x.c.id-y.c.id);
  L.innerHTML=items.map(({c,a})=>{const r=Math.min(1,Math.max(0,c.pat/(c.max||1))),on=f&&c.id===f.id,left=c.done.filter(x=>!x).length;
    const stc=isSt(c);
    const isGzWorking = isStaffActive('staffGz') && (R.gzWork && R.gzWork.cId === c.id);
    const isSvWorking=(R.svWork&&R.svWork.cId===c.id);
    const staffWorking = isGzWorking ? { ...R.gzWork, staff: 'gz' } : (isSvWorking ? { ...R.svWork, staff: 'sv' } : null);
    const gzHeadHtml=staffWorking?renderGzHeadCup(staffWorking,c):'';
    return `<button class="q3chip${on?' q3on':''}${stc?' q3stc':''}${c.born&&performance.now()-c.born<700?' q3in':''}${c.isFriend?' friend-vip':''}${c.vip?' reviewer-vip':''}" ${a} data-fc="${c.id}" aria-label="${esc(c.name)}" style="--p:${r};--c:${r>.5?'#5aae86':r>.25?'#f4b73a':'#e2574c'}">
      ${gzHeadHtml}${(c.isFriend||c.vip||(typeof c.face==='string'&&/^b\d+$/.test(c.face)))?`<span class="q3fc" style="display:flex;align-items:center;justify-content:center;background:none;">${(typeof c.face==='string'&&/^b\d+$/.test(c.face))?`<img src="${IMG}brand/${c.face}.png" alt="" style="width:42px;height:42px;object-fit:contain;pointer-events:none;">`:c.face||'😎'}</span>`:hasFace(c)?`<i class="q3fc" style="${faceOf(c,r<.3?2:0,56,55)}"></i>`:'<i class="q3fc q3ph">📱</i>'}${c.app?`<b class="q3app" style="background:${(APPS.find(a=>a.id===c.app)||APPS[0]).c}">${ico('phone')}</b>`:''}${left>1?`<b class="q3n">×${left}</b>`:''}${(R.st2&&R.st2.id===c.id)||isSto(c)?`<b class="q3st">${ico('people')}</b>`:''}${(R.gzWork&&R.gzWork.cId===c.id)?`<b class="q3st" style="background:#8b5cf6;" title="Gen Z đang pha">🎧</b>`:''}${c.vip?`<b class="q3vip">${ico('star')}</b>`:''}${c.isFriend?`<b class="q3friend-vip" title="VIP Bạn Bè">👑</b>`:''}${!stc&&missing(c.order).length?`<b class="q3so">Hết</b><span class="q3x" data-decl="${c.id}" role="button" aria-label="${R.slots.includes(c)?'Mời khách về':'Huỷ đơn online'}">×</span>`:''}</button>`}).join('')||'';
  const fc=$('q3face'),say=$('q3say');
  if(!f){coach();fc._id=null;fc.style.cssText='';fc.className='q3face';say._t=null;$('q3bub').classList.add('q3idleB');say.innerHTML=`<span class="q3idle">${R.closing?'Đã đóng cửa':R.running&&rushMul()<.6?'Quán đang vắng':'Đang chờ khách…'}<small>${R.closing?'Nhân viên pha chế đang làm nốt đơn':'Ngồi chơi xíu đi'}</small></span>`;$('q3want').innerHTML='';$('q3want')._o=null;$('q3pat').style.width='0';return}
  if(fc._id!==f.id){fc._id=f.id;if(!q3reduce)fc.animate([{transform:'translateX(-150px) rotate(-6deg)',opacity:0},{transform:'translateX(-60px) rotate(4deg)',opacity:1,offset:.5},{transform:'translateX(-20px) rotate(-3deg)',offset:.75},{transform:'none'}],{duration:650,easing:'ease-out'})}
  const isChibiFace = f && typeof f.face === 'string' && /^b\d+$/.test(f.face);
  if(isChibiFace){
    fc.className='q3face';
    fc.style.cssText='display:flex;align-items:center;justify-content:center;background:none;';
    fc.innerHTML=`<img src="${IMG}brand/${f.face}.png" alt="" style="width:125px;height:125px;object-fit:contain;filter:drop-shadow(0 4px 10px rgba(0,0,0,0.18));">`;
  } else if(f.isFriend){
    fc.className='q3face';
    fc.style.cssText='font-size:5rem;display:flex;align-items:center;justify-content:center;background:none;';
    fc.textContent=f.face||'😎';
  } else {
    fc.innerHTML='';
    fc.className='q3face'+(!hasFace(f)?' q3ph':'');fc.style.cssText=hasFace(f)?faceOf(f,f.pat/f.max<.3?2:0,144,141):'';fc.textContent=!hasFace(f)?'📱':'';
  }
  const n=f.cups.length,online=R.online.includes(f);
  let t=online?`<span class="q3vipT" style="background:${(APPS.find(a=>a.id===f.app)||APPS[0]).c}">${appN(f)}</span> <b>${f.big?'Đơn lớn':'Đơn'} #${f.id}</b>: ${shortOrder(f.order)}`:(f.star!=null?`<span class="q3vipT" style="background:#9b5fd0">⭐ ${esc(STARS[f.star].n)}</span> `+(performance.now()-f.born<3500?`<span class="q3nat">${esc(f.hi)}</span>`:`<small class="q3tr">[Tự động dịch]</small> `):'')+(f.isFriend?`<span class="q3vipT" style="background:#eab308;color:#000;">👑 VIP Bạn: ${esc(f.name)}</span> `:'')+(f.star!=null&&performance.now()-f.born<3500?'':(f.vip?'<span class="q3vipT">Food reviewer</span> ':'')+(f.brat&&f.brat!=='mac'&&BRATS[f.brat].n?`<span class="q3vipT" style="background:${BRATS[f.brat].c}">${BRATS[f.brat].n}</span> `:'')+sentence(f));
  if(n>5)t=`<span class="q3tabs"><span class="q3cur">Ly ${f.cups.indexOf(f.order)+1}/${n}</span><span class="q3dn">✓ ${f.done.filter(Boolean).length}</span></span> `+t;
  else if(n>1)t=`<span class="q3tabs">${f.cups.map((x,j)=>`<span class="${f.done[j]?'q3dn':x===f.order?'q3cur':''}" data-cv="${j}">${f.done[j]?'✓ ':''}Ly ${j+1}</span>`).join('')}</span> `+t;
  if(missing(f.order).length&&!online)t+=` <button class="q3decl" data-decl="${f.id}">Hết món, mời về</button>`;
  $('q3bub').classList.remove('q3idleB');if(say._t!==t){say._t=t;say.innerHTML=t;q3fitSay()}coach();const qw=$('q3want');if(qw._o!==f.order){qw._o=f.order;qw.innerHTML=orderGlass(f.order)}updPat(f);
  const pBadge = $('q3PhoneBadge');
  if(pBadge){
    const onCount = (R && R.online) ? R.online.length : 0;
    if(onCount > 0){
      pBadge.style.display = 'flex';
      pBadge.textContent = onCount;
      if(pBadge.parentElement) pBadge.parentElement.classList.add('has-orders');
    } else {
      pBadge.style.display = 'none';
      if(pBadge.parentElement) pBadge.parentElement.classList.remove('has-orders');
    }
  }
}
function q3fitSay(){const e=$('q3say');let f=24;e.style.fontSize=f+'px';while(e.scrollHeight>e.clientHeight+1&&f>13){f--;e.style.fontSize=f+'px'}}
const renderStreet=renderLane,renderOnline=renderLane;
function updPat(c){
  if(!c) return;
  const r = Math.min(1, Math.max(0, c.pat / (c.max || 1)));
  const ch = document.querySelector(`#lane [data-fc="${c.id}"]`);
  if(ch){
    const col = r > 0.5 ? '#5aae86' : r > 0.25 ? '#f4b73a' : '#e2574c';
    const deg = Math.round(r * 360);
    if(c._lastDeg !== deg || c._lastCol !== col){
      c._lastDeg = deg;
      c._lastCol = col;
      ch.style.setProperty('--p', r);
      ch.style.setProperty('--c', col);
      ch.style.background = `conic-gradient(${col} ${deg}deg, #eadcc4 0)`;
    }
    const faceIdx = r < 0.3 ? 2 : 0;
    if(c._lastFaceIdx !== faceIdx){
      c._lastFaceIdx = faceIdx;
      const fc = ch.querySelector('.q3fc');
      if(fc && hasFace(c)) fc.style.backgroundPosition = `${-faceIdx * 56}px ${-faceRow(c) * 55}px`;
    }
  }
  const f = (typeof focusCust === 'function') ? focusCust() : null;
  if((f && c.id === f.id) || c.id === R.focus){
    const pct = Math.round(r * 100);
    const p = $('q3pat');
    if(p && p._lastPct !== pct){
      p._lastPct = pct;
      p.style.width = pct + '%';
      p.style.background = r > 0.5 ? '#8fcf8f' : r > 0.25 ? '#f4c04a' : '#f08a8a';
    }
    const faceIdx = r < 0.3 ? 2 : 0;
    const fc = $('q3face');
    if(fc && hasFace(c) && !R.flash && fc._lastFaceIdx !== faceIdx){
      fc._lastFaceIdx = faceIdx;
      fc.style.backgroundPosition = `${-faceIdx * 144}px ${-faceRow(c) * 141}px`;
    }
  }
}
function pourFast(){const w=$('q3cup');if(!w)return false;const lq=w.querySelector('.lq'),lh=w.querySelector('.lqh'),st=w.querySelector('.strm');if(!lq||!st)return false;
  const surf=BY-Math.min(cup.fill||0,1)*LH;lq.setAttribute('y',surf);lq.setAttribute('height',BY-surf+8);if(lh)lh.setAttribute('y',surf);st.setAttribute('height',surf+80);$('q3gLv').style.width=Math.min(100,(cup.fill||0)*100)+'%';return true}
function renderCupHint(){
  const qh = $('q3hint');
  if(!qh) return;
  const fCust = focusCust(), curO = fCust ? fCust.order : null;
  if(!curO){
    qh.innerHTML = '';
    return;
  }
  if(level() >= 2){
    const sugTxt = curO.sugar != null ? curO.sugar + '% đường' : 'Đường chuẩn';
    const iceTxt = curO.ice || 'Đá thường';
    const sugDone = cup.size && normSug(cup.sugar) === normSug(curO.sugar);
    const needIceN = {'Không đá':0, 'Ít đá':1, 'Đá thường':2}[curO.ice] || 0;
    const iceDone = cup.size && (cup.iceN || 0) >= needIceN;
    const bothDone = sugDone && iceDone;
    qh.innerHTML = `<div class="q3cup-opt-box${bothDone ? ' done' : ''}"><span class="q3cup-opt-txt">${bothDone ? '✓ ' : ''}${sugTxt} - ${iceTxt}</span></div>`;
  } else {
    qh.innerHTML = '<div class="q3cup-opt-box"><span class="q3cup-opt-txt">Đường đá tự động</span></div>';
  }
}

function renderCup(){
  const w=$('q3cup');if(!w)return;const has=!!cup.size;$('q3noCup').hidden=has;
  if(!has){w.innerHTML='';w.style.cssText='';$('q3gLv').style.width='0';$('q3hint').innerHTML='';return}
  const h=cup.size==='L'?162:142,wd=Math.round(h*415/587);
  w.style.left=(133-wd/2)+'px';w.style.top=(870-h)+'px';w.style.width=wd+'px';w.style.height=h+'px';
  const html=glassHTML({...cup,fill:cup.fill||0},{pour:R.pour}),g=w.firstElementChild;
  if(!g||!g.classList.contains('q3g')){w.innerHTML=html}else{
    const t=document.createElement('div');t.innerHTML=html;const n=t.firstElementChild,oc=[...g.children],nc=[...n.children];
    if(oc.length!==nc.length||oc.some((e,i)=>e.tagName!==nc[i].tagName))g.replaceWith(n);
    else nc.forEach((e,i)=>{if(e.tagName==='IMG'){oc[i].hidden=e.hidden}else g.replaceChild(e,oc[i])})}
  $('q3gLv').style.width=Math.min(100,(cup.fill||0)*100)+'%';
  renderCupHint();
  let te=w.querySelector('.q3tem');const showTem=has&&S.upg&&S.upg.brandKit&&S.brand&&S.brand.i;
  if(showTem){const th=temHTML(S.brand,Math.round(wd*.54),false);if(!te){te=document.createElement('div');te.className='q3tem';w.appendChild(te)}if(te._k!==th){te._k=th;te.innerHTML=th}}
  else if(te)te.remove();
}
function renderPanel(){
  if(!$('q3zones'))return;const f=focusCust(),o=f?f.order:null,lv=level();
  // Gen Z và Sinh viên không hiện các khung màu cam (.q3want) quanh món pha chế
  const isStaffCrafting = !!((R.gzWork && (!f || R.gzWork.cId === f.id)) || (R.svWork && (!f || R.svWork.cId === f.id)) || (isStaffActive('staffGz') && !R.gzSulking) || (isStaffActive('staffSv') && R.isNightShift));
  const want=k=>{
    if(!o || isStaffCrafting)return false;
    if(o.base===k)return !cup.base||(cup.fill||0)<.72;
    if(o.flav===k)return cup.flav!==o.flav;
    if(o.tops.includes(k))return !cup.tops.includes(k);
    return false;
  };
  const set=(k,locked)=>{const b=$('q3b_'+k),n=$('q3n_'+k);if(!b)return;const q=ITEMS[k]?qty(k):1;
    b.classList.toggle('q3lock',!!locked);b.classList.toggle('q3empty',!locked&&q<=0);b.classList.toggle('q3want',!locked&&want(k));if(n){const tray=TRAY_K.includes(k);n.textContent=locked?"":q;n.style.display=locked&&!tray?"none":"";n.style.background=locked?"#ece4d8":"";n.style.borderColor=locked?"#c9b9a4":""}};
  [...JAR_K,...TRAY_K,...BTL_K,'cheese','fmatcha','fsalt','fube'].forEach(k=>set(k,!S.unlocked[k]));
  if(lv>=2){
    set('ice',false);set('sugar',false);
    const iceN={'Không đá':0,'Ít đá':1,'Đá thường':2}[o?o.ice:'']||0;
    $('q3b_ice').classList.toggle('q3want',!isStaffCrafting&&!!o&&(cup.iceN||0)<iceN);
    $('q3b_sugar').classList.toggle('q3want',!isStaffCrafting&&!!o&&normSug(cup.sugar)!==normSug(o.sugar));
  }
  $('q3cups').textContent=qty('cup');
  ['M','L'].forEach(z=>{const el=$('q3_'+z);if(el)el.classList.toggle('q3pick',cup.size===z);if(el&&o)el.classList.toggle('q3want',!isStaffCrafting&&!cup.size&&o.size===z)});
  if($('q3seal')&&o){
    const readyToSeal=ready(true);
    $('q3seal').classList.toggle('q3want',!isStaffCrafting&&readyToSeal);
  }
  renderCupHint();
}
function q3pop(el,wob){const r=(el.dataset.r||'').split(',').map(Number);if(r.length<4)return null;const so=el.dataset.s?el.dataset.s.split(',').map(Number):[r[0],r[1]];
  const d=document.createElement('div');d.className='q3pop'+(wob?' wob':'');d.style.cssText=`left:${r[0]}px;top:${r[1]}px;width:${r[2]}px;height:${r[3]}px;background-position:${-so[0]}px ${-so[1]}px`;
  $('q3pops').appendChild(d);if(!wob)d.animate([{transform:'scale(1)'},{transform:'scale(1.12,1.1)'},{transform:'scale(1)'}],{duration:q3reduce?1:280,easing:'ease-out'}).onfinish=()=>d.remove();return d}
function q3label(el,txt){const a=el.getBoundingClientRect(),t=document.createElement('div');t.className='q3flyT';t.textContent=txt;document.body.appendChild(t);
  const w=t.offsetWidth;t.style.left=Math.max(4,Math.min(vpW()-w-4,(a.left+a.width/2)/ZM-w/2))+'px';t.style.top=(a.top/ZM-4)+'px';
  t.animate([{transform:'translateY(0)',opacity:1},{transform:'translateY(-16px)',opacity:0}],{duration:900,easing:'ease-out'}).onfinish=()=>t.remove()}
function q3fly(fromEl,html,cb){
  const a=fromEl.getBoundingClientRect(),b=$('q3cup').getBoundingClientRect();
  const x0=(a.left+a.width/2)/ZM,y0=(a.top+a.height/2)/ZM,x1=(b.left+b.width/2)/ZM,y1=(b.top+b.height*.35)/ZM;
  const f=document.createElement('div');f.className='q3fly';f.innerHTML=html;document.body.appendChild(f);
  const T=(x,y,s)=>`translate(${x-12}px,${y-12}px) scale(${s})`;
  f.animate([{transform:T(x0,y0,1)},{transform:T((x0+x1)/2,Math.min(y0,y1)-40,1.15)},{transform:T(x1,y1,.8)}],{duration:q3reduce?1:420,easing:'ease-in-out'}).onfinish=()=>{f.remove();cb&&cb()}}
const q3dot=c=>`<svg width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="6" fill="${c}" stroke="${Q3INK}" stroke-width="1.5"/></svg>`;
function q3act(a,el){
  const [t,k]=a.split(':');
  // Không bao giờ khoá phím người chơi; chỉ cảnh báo nếu ấn rót trà lúc nhân viên đang rót
  if(R.staffPouring && t==='base'){toast('Nhân viên đang rót trà, chờ một xíu nhé');return}
  if(t==='seal')return sealServe();
  if(t==='trash'){
    if(!cup.size && !cup.used && (!cup.tops || cup.tops.length === 0) && !cup.base){
      toast('Chưa có ly nào trên thớt để đổ');
      return;
    }
    sfx('trash');
    toast('Đã đổ bỏ ly làm lại');
    spoilCup();
    cup = newCup();
    renderCup();
    renderPanel();
    coach();
    return;
  }
  if(t==='size'){
    const isEmptyCup = !cup.base && (!cup.tops || cup.tops.length === 0) && (cup.fill || 0) === 0 && !cup.used && !cup.sugarN && !cup.iceN && !cup.flav && !cup.cheese;
    if(!cup.size || isEmptyCup){
      // Chưa có ly hoặc ly trên thớt hoàn toàn rỗng: đổi size/lấy ly mới mượt mà 100%
      cup = newCup();
    } else {
      // Đã có ly có nguyên liệu trên thớt mà người chơi bấm lấy ly mới/đổi size:
      // Tự động đổ ly cũ vào xô inox luôn, KHÔNG BAO GIỜ chặn đứng người chơi bằng cảnh báo khó chịu!
      sfx('trash');
      spoilCup();
      toast('Đã tự động đổ ly cũ vào xô để lấy ly ' + k + ' mới');
      cup = newCup();
    }
    if(!qty('cup')){
      if(S.upg.staffBuyer) staffBuyerTriggerInstant('cup');
      else toast('Hết ly! Nhập thêm ở kho ngày mai');
      return;
    }
    q3pop(el);
    sfx('cup');
    cup.size = k;
    renderCup();
    renderPanel();
    coach();
    staffHelp();
    return;
  }
  if(t==='top'||t==='flav'||t==='sugar'||t==='ice'){
    const itemKey = (t === 'sugar' || k === 'sugar') ? 'sugar' : ((t === 'ice' || k === 'ice') ? 'ice' : k);
    if(!qty(itemKey)){
      if(S.upg.staffBuyer) staffBuyerTriggerInstant(itemKey);
      else toast('Hết ' + (ITEMS[itemKey] ? ITEMS[itemKey].n : (itemKey==='sugar'?'nước đường':'đá')) + '! Nhập thêm ở kho ngày mai');
      return;
    }
  }
  if(!cup.size){toast('Lấy ly M hoặc L trước');return}
  if(t==='top'){if(!S.unlocked[k]){toast((S.off||{})[k]?ITEMS[k].n+' đã bỏ khỏi menu':'Chưa mở '+ITEMS[k].n+' (Nâng cấp)');return}const n=cup.tops.length;addIng('top',k);if(cup.tops.length===n)return;
    q3pop(el);sfx('plop');q3label(el,ITEMS[k].n);const foam=ITEMS[k].g==='foam';
    if(!foam)(cup.vt=cup.vt||[]).push({k,pts:q3layer(k)});
    q3fly(el,foam?cloudSvg(ITEMS[k].c,24,17):`<svg width="30" height="30" viewBox="0 0 30 30">${[[6,20],[15,21],[24,20],[10,13],[20,13],[15,6],[4,12],[26,12]].map(([x,y],i)=>pc(k,x,y,i)).join('')}</svg>`,()=>{renderCup();renderPanel();autoSeal();coach()});return}
  if(t==='flav'){if(!S.unlocked[k]){toast((S.off||{})[k]?'Siro '+low(ITEMS[k].n)+' đã bỏ khỏi menu':'Chưa mở siro '+low(ITEMS[k].n)+' (Nâng cấp)');return}if(cup.flav===k){toast('Đã có siro '+low(ITEMS[k].n));return}
    const was=cup.flav;addIng('flav',k);if(cup.flav===was)return;q3pop(el);sfx('pump');q3label(el,'Siro '+low(ITEMS[k].n));q3fly(el,q3dot(ITEMS[k].c),()=>{renderCup();renderPanel();autoSeal();coach()});return}
  if(t==='sugar'){if(level()<2){toast('Khách chưa cần chọn đường');return}
    if((cup.sugarN||0)>=4){cup.sugarN=4;toast('Tối đa 100%');return}
    if(!qty('sugar')){if(S.upg.staffBuyer)staffBuyerTriggerInstant('sugar');else toast('Hết nước đường! Nhập thêm ở kho ngày mai');return}
    consume('sugar');
    cup.sugarN=(cup.sugarN||0)+1;
    cup.sugar=SUGAR[cup.sugarN-1];q3pop(el);sfx('pump');renderPanel();
    q3fly(el,q3dot('#f0c56a'),()=>{renderCup();renderPanel();q3label(el,cup.sugar+'% đường');autoSeal();coach()});return}
  if(t==='ice'){if(level()<2){toast('Khách chưa cần chọn đá');return}if((cup.iceN||0)>=2){toast('Đá đầy rồi');return}
    if(!qty('ice')){if(S.upg.staffBuyer)staffBuyerTriggerInstant('ice');else toast('Hết đá! Nhập thêm ở kho ngày mai');return}
    consume('ice');
    cup.iceN=(cup.iceN||0)+1;
    cup.ice=cup.iceN===1?'Ít đá':'Đá thường';q3pop(el);sfx('ice');renderPanel();
    q3fly(el,`<svg width="24" height="24" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4" fill="#eaf7fd" stroke="#8fb9cf" stroke-width="2"/></svg>`,()=>{
      cup.vi=cup.vi||[];for(let i=0;i<(cup.iceN===2?5:3);i++)cup.vi.push([Math.random()*2-1,4+Math.random()*22+cup.vi.length*3.5,Math.random()*40-20]);renderCup();renderPanel();q3label(el,cup.iceN===1?'Ít đá':'Đá bình thường');autoSeal();coach()});return}
}
let q3raf,q3last,q3pourEl,q3wob;
const coachDay=()=>{const L=CFG.levels;return [1,L.l2,L.l3].includes(S.day)};
const coachOn=()=>S.coach!==false;
function coach(){const b=$('q3coach');if(!b)return;const prev=document.querySelector('.q3coachT');
  const set=(txt,id)=>{if(b._t!==txt){b._t=txt;b.textContent=txt}b.hidden=false;const t=id&&$(id);if(prev&&prev!==t)prev.classList.remove('q3coachT');if(t)t.classList.add('q3coachT')};
  if(!coachOn()||!R.running||isPriorityStaffWorking()){b.hidden=true;prev&&prev.classList.remove('q3coachT');return}
  const f=focusCust(),o=f&&f.order,lv=level();
  if(!o){b.hidden=true;prev&&prev.classList.remove('q3coachT');return}
  if(R.svWork && R.svWork.step === 'wait_seal') return set('Sinh viên đã bỏ đường đá! Chạm máy dán nắp để giao ly','q3seal');
  const isEmptyCup = !cup.base && (!cup.tops || cup.tops.length === 0) && (cup.fill || 0) === 0 && !cup.used && !cup.sugarN && !cup.iceN && !cup.flav && !cup.cheese;
  if(!cup.size){
    return set(`Bước 1: chạm chồng ly ${o.size}`,'q3_'+o.size);
  }
  if(cup.size !== o.size && !cup._svWrongAccept){
    if(isEmptyCup){
      return set(`Bước 1: chạm chồng ly ${o.size} để đổi size`,'q3_'+o.size);
    }
    return set('Ly bị sai size, chạm xô inox để đổ làm lại','q3trash');
  }
  if(cup.spill||(cup.fill||0)>.95||(cup.base&&cup.base!==o.base)||cup.mixed)return set('Ly bị sai, chạm xô inox để đổ làm lại','q3trash');
  if(!cup.base||(cup.fill||0)<.72)return set(`Bước 2: nhấn giữ hũ ${ITEMS[o.base].n}, thả tay khi tới vạch xanh`,'q3b_'+o.base);
  {const iceN={'Không đá':0,'Ít đá':1,'Đá thường':2}[o.ice]||0;
   if((cup.flav&&cup.flav!==(o.flav||null))||cup.tops.some(t=>!o.tops.includes(t))||(lv>=2&&(cup.sugar||0)>o.sugar)||(lv>=2&&(cup.iceN||0)>iceN))return set('Ly bị dư hoặc sai món, chạm xô inox để đổ làm lại','q3trash')}
  if(o.flav&&cup.flav!==o.flav)return set(`Chạm chai siro ${low(ITEMS[o.flav].n)}`,'q3b_'+o.flav);
  const miss=o.tops.find(t=>!cup.tops.includes(t));if(miss)return set(`Bước 3: chạm ${low(ITEMS[miss].n)} để thêm topping`,'q3b_'+miss);
  if(lv>=2&&normSug(cup.sugar)!==normSug(o.sugar)){const sVal=normSug(o.sugar);const n=SUGAR.indexOf(sVal)+1;return set(`Bấm bình nước đường ${n>0?n:3} lần để được ${sVal||o.sugar}% đường`,'q3b_sugar')}
  const iceN={'Không đá':0,'Ít đá':1,'Đá thường':2}[o.ice]||0;
  if(lv>=2&&(cup.iceN||0)<iceN)return set(iceN===1?'Xúc đá 1 lần (ít đá)':'Xúc đá 2 lần (đá bình thường)','q3b_ice');
  if(lv>=2&&(cup.iceN||0)>iceN)return set('Dư đá rồi, chạm xô để đổ làm lại','q3trash');
  if(S.upg.sealer&&(cup.fill||0)<.66)return set('Rót thêm trà tới vạch xanh','q3b_'+o.base);
  set(S.upg.sealer?'Máy đang tự dán nắp…':'Bước cuối: chạm máy dán nắp để giao ly','q3seal')}
function staffHelp(){
  if(!(isStaffActive('staff0')||isStaffActive('staff1')||isStaffActive('staff3'))||!R.running||(!R.closing && R.t<=0))return;
  const f=focusCust(),o=f&&f.order;if(!o||o.size!==cup.size||cup.base)return;
  if(!qty(o.base))return;

  const isStaff0=isStaffActive('staff0')&&!isStaffActive('staff1')&&!isStaffActive('staff3');
  // Thử việc 0 lương: 20% tỉ lệ trốn việc lướt điện thoại
  if(isStaff0&&Math.random()<0.20){
    toast('Nhân viên thử việc 0 lương đang trốn việc bấm điện thoại 📱! Bạn tự rót trà và xúc đá nhé.',4500,1);
    return;
  }

  R.helping=true;
  clearTimeout(R._helpSafetyTimer);
  R._helpSafetyTimer=setTimeout(()=>{
    if(R.helping){R.helping=false;R.staffPouring=false;renderCup();renderPanel();coach()}
  },4500);
  const oops0=isStaff0&&Math.random()<0.15; // Thử việc 0 lương: 15% làm sai
  const isStaff1=isStaffActive('staff1');
  const isStaff3=isStaffActive('staff3');
  // Thử việc chính thức: 10% làm sai bill hỏng; Quản lý tập sự: 5% làm sai bill hỏng
  const isDamaged=(isStaff1&&Math.random()<0.10)||(isStaff3&&Math.random()<0.05);
  const oops=isDamaged;
  const target=(oops||oops0)?0.6:0.8;
  const nb=(R.s1n=(R.s1n||0)+1);
  const bad=!isStaff0&&(R.s1bad||[]).includes(nb);
  let bdesc='';

  setTimeout(()=>{
    if(!R.running||!R.helping){R.helping=false;return}
    try{
      let chosenBase=o.base;
      if(oops0){
        const altBases=BASE_KEYS.filter(k=>S.unlocked[k]&&qty(k)>0&&k!==o.base);
        if(altBases.length){
          chosenBase=altBases[Math.floor(Math.random()*altBases.length)];
          bdesc='rót nhầm loại trà '+low(ITEMS[chosenBase].n);
        }
      }
      addIng('base',chosenBase);
      if(cup.base!==chosenBase){R.helping=false;coach();return}
      R.pour=chosenBase;R.staffPouring=true;pourSnd(true);
      const el=$('q3b_'+chosenBase);el&&el.classList.add('q3on');let last=performance.now();

      const step=now=>{
        try{
          if(!R.helping){R.pour=null;R.staffPouring=false;pourSnd(false);el&&el.classList.remove('q3on');renderCup();return}
          const pourRate = 1.35 * (1 + Math.max(getStaffSpeedBuff('staff0'), getStaffSpeedBuff('staff1'), getStaffSpeedBuff('staff3')) * 0.5);
          cup.fill=Math.min(target,(cup.fill||0)+(now-last)/1000*pourRate);last=now;
          if(!pourFast()) renderCup();
          if(cup.fill<target){requestAnimationFrame(step);return}
          R.pour=null;R.staffPouring=false;pourSnd(false);el&&el.classList.remove('q3on');renderCup();

          const lv=level(),iceN={'Không đá':0,'Ít đá':1,'Đá thường':2}[o.ice]||0;
          const adds=[];

          if(isStaff0){
            // Thử việc 0 lương: Chỉ rót trà và đá. Bạn tự cho siro, đường, topping, dán nắp
            if(lv>=2){
              let staff0Ice=iceN;
              if(oops0&&!bdesc){staff0Ice=(iceN===2?1:2);bdesc='xúc sai lượng đá'}
              for(let i=0;i<staff0Ice;i++)adds.push(['ice']);
            }
          }else{
            // Thử việc chính thức & Quản lý tập sự: rót trà, hương, đường, đá
            if(o.flav)adds.push(['flav',o.flav]);
            if(lv>=2&&o.sugar!=null){
              const sVal=normSug(o.sugar);
              const sIdx=SUGAR.indexOf(sVal);
              const count=sIdx>=0?sIdx+1:3;
              for(let i=0;i<count;i++)adds.push(['sugar']);
            }
            if(lv>=2){
              for(let i=0;i<iceN;i++)adds.push(['ice']);
            }
            if(bad){
              const alt=FLAV_KEYS.find(k=>S.unlocked[k]&&qty(k)>0&&k!==o.flav);
              if(o.flav&&alt){adds[0]=['flav',alt];bdesc='cho nhầm siro '+low(ITEMS[alt].n)}
              else if(lv>=2&&o.sugar&&normSug(o.sugar)<100){adds.push(['sugar']);bdesc='cho dư đường'}
              else if(lv>=2){if(iceN<2)adds.push(['ice']);else adds.splice(adds.findIndex(a=>a[0]==='ice'),1);bdesc='cho sai lượng đá'}
              else if(alt){adds.push(['flav',alt]);bdesc='cho nhầm siro '+low(ITEMS[alt].n)}
            }
            // Quản lý tập sự: thêm múc topping
            // Quản lý tập sự: thêm múc topping
            if(isStaffActive('staff3')&&!bdesc){
              (o.tops||[]).forEach(k=>{
                if(!cup.tops.includes(k)&&qty(k)>0&&ITEMS[k])adds.push(['top',k]);
              });
              if(o.cheese&&!cup.cheese&&qty('cheese')>0)adds.push(['cheese','cheese']);
            }
          }

          const staffName=isStaff0?'Nhân viên thử việc 0 lương':(isStaffActive('staff3')?'Quản lý tập sự':'Thử việc chính thức');

          const next=()=>{
            try{
              if(!adds.length||!R.running){
                if(level()>=2&&!cup.ice)cup.ice='Không đá';
                R.helping=false;
                clearTimeout(R._helpSafetyTimer);
                if((bdesc || isDamaged) && R.running){
                  const errReason = bdesc || (isStaff3 ? 'làm sai công thức của khách' : 'lỡ tay làm sai bill');
                  toast(staffName + ' ' + errReason + ', ly bị hỏng đã đổ bỏ làm lại! Bạn lấy ly mới nhé 🥤🗑️', 5000, 1);
                  sfx('trash');spoilCup();renderCup();renderPanel();coach();return;
                }
                renderCup();renderPanel();autoSeal();coach();return;
              }
              const [kind,k]=adds.shift();
              const helpSpd = 1 + Math.max(getStaffSpeedBuff('staff0'), getStaffSpeedBuff('staff1'), getStaffSpeedBuff('staff3'));
              if(kind==='sugar'){
                if(qty('sugar') > 0) consume('sugar');
                sfx('pump');cup.sugarN=(cup.sugarN||0)+1;cup.sugar=SUGAR[cup.sugarN-1];
                const z=$('q3b_sugar');z&&q3pop(z);renderCup();renderPanel();setTimeout(next,Math.max(120, Math.round(280/helpSpd)));return;
              }
              if(kind==='ice'){
                if(qty('ice') > 0) consume('ice');
                sfx('ice');cup.iceN=(cup.iceN||0)+1;cup.ice=cup.iceN===1?'Ít đá':'Đá thường';
                cup.vi=cup.vi||[];for(let i=0;i<(cup.iceN===2?5:3);i++)cup.vi.push([Math.random()*2-1,4+Math.random()*22+cup.vi.length*3.5,Math.random()*40-20]);
                const z=$('q3b_ice');z&&q3pop(z);renderCup();renderPanel();setTimeout(next,Math.max(130, Math.round(300/helpSpd)));return;
              }
              if((kind==='top'&&cup.tops.includes(k))||(kind==='cheese'&&cup.cheese)){next();return;}
              const n=cup.tops.length;addIng(kind,k);sfx(kind==='flav'?'pump':'plop');
              if(kind==='top'&&cup.tops.length>n&&ITEMS[k]&&ITEMS[k].g!=='foam')(cup.vt=cup.vt||[]).push({k,pts:q3layer(k)});
              const z=$('q3b_'+k);z&&q3pop(z);renderCup();setTimeout(next,Math.max(140,Math.round(320/helpSpd)));
            }catch(err){
              console.error('staffHelp next step error:',err);
              R.helping=false;clearTimeout(R._helpSafetyTimer);renderCup();renderPanel();coach();
            }
          };
          setTimeout(next,120);
        }catch(err){
          console.error('staffHelp step error:',err);
          R.helping=false;clearTimeout(R._helpSafetyTimer);renderCup();renderPanel();coach();
        }
      };
      requestAnimationFrame(step);
    }catch(err){
      console.error('staffHelp start error:',err);
      R.helping=false;clearTimeout(R._helpSafetyTimer);renderCup();renderPanel();coach();
    }
  },200);
}
function isPriorityStaffWorking(){
  if(!R || !R.running) return false;
  // Gen Z ca ngày (hoạt động và không đình công chữa lành)
  if(!R.isNightShift && isStaffActive('staffGz') && !R.gzSulking) return true;
  // Sinh viên cuối tháng: CHỈ làm sau 22h (ca đêm) sau khi Gen Z hết ca
  if(R.isNightShift && isStaffActive('staffSv')) return true;
  return false;
}

function clearStaffPouring(){
  if(R && R.staffPouring){
    R.pour = null;
    R.staffPouring = false;
    pourSnd(false);
    if(window.ITEMS){
      Object.keys(ITEMS).forEach(k => {
        const el = $('q3b_' + k);
        if(el) el.classList.remove('q3on');
      });
    }
  }
}

function staffTick(dt){
  if(!isStaffActive('staff2')) return;
  // Nhân viên pha chế làm việc cùng chủ quán & quản lý, nhường khách mà Gen Z / SV đang trực tiếp làm
  if(R.gzWork && R.st2 && R.st2.id === R.gzWork.cId){
    stDone();
    return;
  }
  if(R.svWork && R.st2 && R.st2.id === R.svWork.cId){
    stDone();
    return;
  }

  // Sắp xếp khách theo thứ tự xuất hiện trên quầy (id tăng dần):
  const sortedSlots = R.slots.filter(Boolean).sort((a, b) => a.id - b.id);
  const curF = (typeof focusCust === 'function') ? focusCust() : null; // Khách hàng đang hiển thị

  // Khi đã nhận đơn của khách: tiếp tục pha hết các ly
  if(R.st2){
    const i = R.slots.findIndex(x => x && x.id === R.st2.id);
    const c = R.slots[i];
    if(!c){
      stDone();
      return;
    }
    // Pha chế chỉ làm khách thứ 3 trở đi khi quầy có >= 3 khách; nếu khách này là khách 1 hoặc 2: nhả đơn ngay
    const firstTwoIds = sortedSlots.slice(0, 2).map(x => x.id);
    if(sortedSlots.length < 3 || firstTwoIds.includes(c.id)){
      stDone();
      return;
    }
    if(curF && c.id === curF.id && (cup.used || c.id === R.focus)){
      stDone();
      return;
    }
    R.st2.t -= dt;
    if(R.st2.t > 0) return;
    staffStep(c, i);
    return;
  }

  if(R.t <= 0 && !R.closing) return; /* đóng cửa rồi: không nhận khách mới */
  // Quy chuẩn: Nhân viên pha chế CHỈ hoạt động khi số lượng khách tại quầy >= 3!
  if(sortedSlots.length < 3) return;

  const can = c => c.cups.some((o, j) => !c.done[j] && needs(o).every(k => qty(k) > 0));

  // Nhân viên pha chế CHỈ pha chế cho khách hàng thứ 3 trở đi (sortedSlots.slice(2)),
  // Khách thứ 1 & 2 nhường cho chủ quán, Gen Z, sinh viên, quản lý, thực tập!
  const candList = sortedSlots.slice(2).filter(c => {
    // Không nhận khách mà Gen Z hoặc Sinh viên đang làm
    if((R.gzWork && R.gzWork.cId === c.id) || (R.svWork && R.svWork.cId === c.id)) return false;
    // Không tranh khách hàng đang hiển thị trên màn hình nếu chủ quán đang thao tác
    if(curF && c.id === curF.id && cup.used) return false;
    return can(c);
  });

  if(candList.length > 0){
    // Ưu tiên người chờ lâu nhất trong nhóm khách thứ 3 trở đi
    candList.sort((a, b) => (a.pat / a.max) - (b.pat / b.max));
    const cand = candList[0];
    R.st2 = { id: cand.id, t: st2T() };
    renderLane();
    renderPanel();
  }
}
const st2T=()=>Math.max(2.5, (3.8+Math.random()*0.8)/(1+getStaffSpeedBuff('staff2')));/* tăng tốc độ pha chế: tỷ lệ thuận trực tiếp với % nâng cấp */
function stDone(){if(R.t<0)R.otT=Math.min(R.otT||0,R.t);R.st2=null;renderLane();renderPanel()}
/* nhân viên pha chế: làm lần lượt từng ly của khách mình nhận, ly hết hàng thì bỏ, xong thì khách về */
function staffStep(c,i){
  const skip=k=>c.skip&&c.skip[k];
  const j=c.cups.findIndex((o,k)=>!c.done[k]&&!skip(k));
  if(j<0){stFinish(c,i);return}
  const o=c.cups[j];c.order=o;
  if(!needs(o).every(k=>qty(k)>0)){(c.skip=c.skip||[])[j]=true;R.st2.t=0.25/(1+getStaffSpeedBuff('staff2'));return}
  const mine=cup;cup=newCup();cup.size=o.size;if(!useCup()){cup=mine;(c.skip=c.skip||[])[j]=true;R.st2.t=0.25/(1+getStaffSpeedBuff('staff2'));return}
  [o.base,...(o.flav?[o.flav]:[]),...o.tops].forEach(k=>{if(qty(k))consume(k)});
  Object.assign(cup,{base:o.base,flav:o.flav||null,tops:[...o.tops],cheese:!!o.cheese,sugar:o.sugar,ice:o.ice,fill:.8,used:true});
  if(Math.random()<.005){const was=cup.tops;cup.tops=was.length?[]:[TOP_KEYS.find(k=>S.unlocked[k])];/* 0,5% làm sai: bị đổ, làm lại */
    toast('Nhân viên pha chế làm sai ly '+(j+1)+' của '+c.name+': '+(was.length?'quên '+was.map(k=>low(ITEMS[k].n)).join(', '):'bỏ nhầm '+low(ITEMS[cup.tops[0]].n))+'. Ly bị đổ, làm lại',5000,1)}
  serve(i);cup=mine;renderCup();renderPanel();coach();
  if(R.slots[i]!==c){stDone();return}
  R.st2.t=st2T();
  if(!c.cups.some((x,k)=>!c.done[k]&&!skip(k)))stFinish(c,i)}
/* nhân viên đơn online: nhận trọn 1 đơn online, mỗi ly ~1 giây, 0,5% làm hỏng ly phải đổ bỏ */
function staffOnTick(dt){if(!isStaffActive('staffOn')||!R.running)return;
  if(R.sto){const j=R.online.findIndex(x=>x.id===R.sto.id);if(j<0){R.sto=null;renderLane();return}R.sto.t -= dt;if(R.sto.t>0)return;staffOnStep(R.online[j],j);return}
  const cand=R.online.filter(c=>c.id!==R.focus||!cup.used).sort((a,b)=>a.pat/a.max-b.pat/b.max)[0];
  if(cand){if(cand.id===R.focus)R.focus=null;R.sto={id:cand.id,t:Math.max(1.2, 2.0/(1+getStaffSpeedBuff('staffOn')))};renderLane();renderPanel()}}
function staffOnStep(c,j){
  const q=c.cups.findIndex((o,k)=>!c.done[k]&&!(c.skip&&c.skip[k]));
  if(q<0){R.sto=null;declineOnline(j);toast('Đơn #'+c.id+' thiếu món, nhân viên huỷ phần còn lại');renderLane();return}
  const o=c.cups[q];
  if(!needs(o).every(k=>qty(k)>0)){(c.skip=c.skip||[])[q]=true;R.sto.t=.3;return}
  const mine=cup;cup=newCup();cup.size=o.size;if(!useCup()){cup=mine;(c.skip=c.skip||[])[q]=true;R.sto.t=.3;return}
  [o.base,...(o.flav?[o.flav]:[]),...o.tops].forEach(k=>{if(qty(k))consume(k)});
  Object.assign(cup,{base:o.base,flav:o.flav||null,tops:[...o.tops],cheese:!!o.cheese,sugar:o.sugar,ice:o.ice,fill:.8,used:true});
  if(Math.random()<.005){spoilCup();cup=mine;R.sto.t=1;toast('Nhân viên đơn online làm hỏng 1 ly của đơn #'+c.id+', đổ bỏ làm lại',5000,1);renderCup();return}
  c.order=o;serveOnline(j);cup=mine;renderCup();renderPanel();coach();
  if(!R.online.includes(c)){R.sto=null;renderLane();return}
  R.sto.t=0.75}
function stFinish(c,i){if(R.slots[i]===c){R.st2=null;decline(i);toast(c.name+' về, món còn lại đã hết')}stDone()}

/* nhân viên Gen Z: tự động pha chế từ A-Z với các bước có thời gian chờ & hoạt ảnh trực quan (lấy ly, topping, rót trà, hương, đường, đá, dán nắp, giao).
   Khi bị áp lực khách chê / đánh giá xấu sẽ tự đình công nghỉ ngang đi chữa lành.
   Người chơi cần ấn liên tục vào nhân viên để động viên (5 lần) thì sẽ vui vẻ làm tiếp.
   Nếu không có chủ quán giám sát, đôi khi Gen Z sẽ "đá bill" (ẵm trọn tiền bill). Chủ quán có thể chạm để giám sát hoặc bắt quả tang! */
function gzTriggerSulk(why, st){
  if(!S.upg.staffGz || !R.running || R.gzSulking) return;
  if(S.gzNeverSulk || (R.today && R.today.gzStealSuccess)) return; // khi gen z đá bill thành công thì sẽ không bao giờ dỗi nữa
  if(R.gzCheeredToday) return; // Mỗi ngày gen z chỉ cần dỗ dành 1 lần
  if(R.gzSulkCooldown && Date.now() < R.gzSulkCooldown) return;
  R.gzSulking = true;
  R.gzCheers = 0;
  R.gzSulkTimer = 10;
  R.gzWork = null;
  let quotes = [];
  if(why === 'rain'){
    quotes = [
      'Trời mưa buồn quá, tâm trạng em bất ổn rồi... Em xin phép đi healing ngắm mưa sếp ơi! 🌧️🥺',
      'Mưa gió thế này năng lượng em tụt dốc không phanh... Em xin tạm nghỉ đi chữa lành đây! 🌧️💔'
    ];
  } else if(why === 'hot'){
    quotes = [
      'Trời nắng gắt oi bức quá, nhiệt huyết em bốc hơi hết rồi! Em xin phép nghỉ hạ hoả chữa lành nhé! ☀️🥺',
      'Nắng nóng làm em tụt mood quá sếp ơi... Em đi healing tránh nóng đây! ☀️💔'
    ];
  } else if(why === 'timeout' || why === 'late'){
    quotes = [
      'Khách bỏ về chê phục vụ lâu làm em hoảng loạn... Em xin phép nghỉ ngang để chữa lành cảm xúc! 🥺💔',
      'Áp lực đơn dồn dập khiến em sang chấn tâm lý quá... Cho em xin tạm nghỉ đi healing! 🎧🥺'
    ];
  } else if(why === 'wrong' || why === 'bad' || (st && st <= 2)){
    quotes = [
      'Khách chê & đánh giá xấu quá, năng lượng em về 0 rồi... Em đi healing đây! 🥺💔',
      'Tổn thương đứa trẻ bên trong em rồi... Sếp mau dỗ em đi không em nghỉ luôn đó! 🥺'
    ];
  } else {
    quotes = [
      'Áp lực quán căng quá, em bị tụt mood nghiêm trọng rồi... Sếp dỗ 3 cái em mới làm tiếp! 💔🥺',
      'Em dỗi rồi, đi chữa lành đây sếp ơi! 🥺🎧'
    ];
  }
  R.gzMsg = quotes[Math.floor(Math.random() * quotes.length)];
  toast('🚨 Gen Z đình công đi chữa lành! Dỗ dành trong 10s kẻo bạn ấy nghỉ việc! 🥺💔', 6000, 1);
  sfx('bad');
  renderGzWidget();
}

function gzCheer(e){
  if(!S.upg.staffGz || !R.running) return;
  if(e && e.stopPropagation) e.stopPropagation();
  if(R.gzSulking){
    R.gzCheers = (R.gzCheers || 0) + 1;
    sfx('tap');
    gzSpawnHeart(e);
    const cheerLines = [
      'Sếp: "Cố lên em ơi, trà sữa sếp lo!" 🧋 (1/3)',
      'Sếp: "Cuối tháng sếp thưởng thêm tiền tip!" 💵 (2/3)',
      'ĐÃ ĐƯỢC CHỮA LÀNH! 🔥'
    ];
    R.gzMsg = cheerLines[Math.min(R.gzCheers - 1, cheerLines.length - 1)];
    if(R.gzCheers >= 3){
      R.gzSulking = false;
      R.gzCheers = 0;
      R.gzSulkTimer = 0;
      R.gzCheeredToday = true; // Mỗi ngày gen z chỉ cần dỗ dành 1 lần
      R.gzSulkCooldown = Date.now() + 60000; // Miễn nhiễm dỗi 60s sau khi dỗ dành
      R.gzComfortImmune = Date.now() + 6000; // Miễn nhiễm click nhầm sau khi dỗ dành
      R.gzFalseCatchCount = 0;
      R.gzMsg = 'Em đã được chữa lành! Lại chiến tiếp đây sếp ơi! 🔥💪';
      sfx('lvup');
      toast('Nhân viên Gen Z: "Em được sếp dỗ ngọt ngào nên hết dỗi rồi! Vào việc tiếp đây sếp ơi! 🔥"', 4500, 1);
    }
  }
  renderGzWidget();
}

function gzWeatherComplain(){
  if(!isStaffActive('staffGz') || !R.running || R.gzSulking) return;
  R.gzWeatherComplaining = true;
  R.gzMsg = evIs('rain') ? 'Mưa gió ế ẩm quá sếp ơi, em lười không muốn pha chế nè... 🌧️ Chạm để dỗ dành em nha!' : 'Nắng nóng chảy mỡ sếp ơi, em mệt xỉu không muốn làm... ☀️ Chạm để dỗ dành em nha!';
  renderGzWidget();
}

function onGzWidgetClick(e){
  if(!S.upg.staffGz || !R.running) return;
  if(e){ e.stopPropagation(); if(e.preventDefault) e.preventDefault(); }

  // Nếu vừa an ủi xong thì tuyệt đối không xử lý click nhầm thành bắt quả tang
  if(R.gzComfortImmune && Date.now() < R.gzComfortImmune) return;

  if(R.gzWeatherComplaining){
    R.gzWeatherComplaining = false;
    sfx('lvup');
    gzSpawnHeart(e);
    toast('💖 Đã dỗ dành Gen Z! Bạn ấy vui vẻ tràn trề năng lượng làm việc! ✨', 3500);
    R.gzMsg = 'Cảm ơn sếp iu đã dỗ dành, em có động lực pha trà hết mình rồi nè! 🥰✨';
    renderGzWidget();
    return;
  }

  if(R.gzSulking || (e.target && e.target.closest('[data-gz-act="cheer"]'))){
    gzCheer(e);
    return;
  }

  // Bắt quả tang: nếu vừa đá bill HOẶC đang trong 5s thời hạn đếm ngược HOẶC còn ghi nhận bill bị đá
  const isCatchWindow = R.gzStolenRecent || (R.gzCatchExpiresAt && Date.now() < R.gzCatchExpiresAt) || (R.gzLastStolenBill > 0);
  if(isCatchWindow){
    catchGenZ();
    return;
  }
}

function gzFalseCatchAccusation(){
  R.gzFalseCatchCount = (R.gzFalseCatchCount || 0) + 1;
  const now = Date.now();
  const isRapid = R.gzLastCatchClick && (now - R.gzLastCatchClick < 3500);
  R.gzLastCatchClick = now;

  // Tính tỉ lệ nghỉ việc khi bấm không đúng lúc (spam)
  // Lần 1: 25% (nếu spam dồn dập trong 3.5s thì 45%)
  // Lần 2: 55% (nếu spam dồn dập thì 80%)
  // Lần 3+: 90% - 100% nghỉ việc ngay
  let quitChance = R.gzFalseCatchCount === 1 ? 0.25 : R.gzFalseCatchCount === 2 ? 0.55 : 0.90;
  if(isRapid) quitChance += 0.25;

  if(Math.random() < quitChance){
    gzQuitFromSpamCatch();
    return;
  }

  sfx('bad');
  const warnLines = [
    'Gen Z: "Ủa sếp? Em đang pha chế đàng hoàng sếp bấm Bắt quả tang vu oan em vậy? Nghi ngờ em là em dỗi em bỏ việc luôn đó nha! 😡🎧"',
    'Gen Z: "Sếp lại bấm vu oan em đấy à? Quán đừng có ép người quá đáng! Bấm lần nữa là em bỏ việc đi luôn đấy! ⚠️😤"',
    'Gen Z: "Em không có đá bill! Sếp đừng có spam nút bắt quả tang sỉ nhục em, tổn thương đứa trẻ bên trong em rồi! 💔😡"'
  ];
  const msg = warnLines[Math.min(R.gzFalseCatchCount - 1, warnLines.length - 1)];
  R.gzMsg = 'Bị sếp vu oan bắt quả tang vô cớ! Rất bực mình! 😤';
  toast(msg, 4500, 1);
  renderGzWidget();
}

function gzQuitFromSulk(){
  const pName = staffPersonName('staffGz') || 'Gen Z';
  const pAvatar = staffAvatarUrl('staffGz');
  S.upg.staffGz = false;
  if(S.hired) S.hired.staffGz = false; // Phải thuê lại 1tr!
  if(S.staffKpi && S.staffKpi.staffGz) S.staffKpi.staffGz = { trafficBuff: 0, speedBuff: 0, billBonus: 0, level: 0 };
  if(S.staffNames) delete S.staffNames.staffGz;
  if(S.staffAvatars) delete S.staffAvatars.staffGz;
  R.gzWork = null;
  R.gzSulking = false;
  R.gzSulkTimer = 0;
  R.gzStolenRecent = false;
  clearStaffPouring();
  if(cup && cup.used && cup.staff) cup = newCup();
  sfx('bad');

  const gz1StarTexts = [
    'Quán vô tâm, sếp không hề quan tâm nhân viên! Người ta tổn thương đi healing mà 10s trôi qua không thèm dỗ 1 câu! Cạch mặt quán!',
    'Môi trường cực kỳ lạnh nhạt, sếp thờ ơ bỏ mặc nhân viên dỗi tụt mood! Em nộp đơn nghỉ việc luôn cho sếp tự làm!',
    'Không dỗ dành kịp thời làm tổn thương đứa trẻ bên trong em sâu sắc! 1 sao vì chủ quán quá vô cảm!',
    'Tưởng tiệm trà mơ ước hoá ra sếp bỏ bê nhân viên! Dỗi 10s không ai dỗ, em thu dọn đồ đạc nghỉ việc luôn!',
    '1 sao bóc phốt quán trà sữa bóc lột, nhân viên bị áp lực đi chữa lành mà sếp ngó lơ không thèm dỗ dành!'
  ];
  const gzRev = {
    s: 1,
    t: rnd(gz1StarTexts),
    k: 'gz_quit_sulk_' + Date.now(),
    d: S.day,
    o: false,
    n: `${pName} (Cựu Gen Z)`,
    f: pAvatar,
    tag: 'genz_quit_sulk',
    isGzRev: true,
    b: null, fl: null, tp: [], ch: false, sz: 'M'
  };
  S.reviews.unshift(gzRev);
  if(R.today && Array.isArray(R.today.stars)) R.today.stars.push(1);
  S.revTotal = Math.max(S.revTotal || 0, S.reviews.length - 1) + 1;
  if(S.reviews.length > 2500) S.reviews.length = 2500;
  save();
  head();
  renderGzWidget();

  ask(`
    <div class="pbig">💔🥺</div>
    <h2 style="color:#dc2626;font-weight:800;font-size:1.25rem;margin:4px 0 8px;">GEN Z NGHỈ VIỆC VÌ KHÔNG ĐƯỢC DỖ DÀNH!</h2>
    <p style="line-height:1.55;font-size:0.92rem;color:var(--ink);">
      Do bạn <b>quá 10 giây không dỗ dành</b> khi Gen Z đi chữa lành, bạn ấy cảm thấy bị sếp ngó lơ, tổn thương tâm lý nên đã tháo tạp dề bỏ việc luôn:<br>
      <i style="color:#b91c1c;font-weight:700;display:block;margin:6px 0;">"Em dỗi cả 10 giây mà sếp chẳng thèm dỗ em lấy một câu... Em thấy sếp không hề trân trọng em, em nộp đơn nghỉ việc và vừa lên mạng bóc phốt 1 sao quán luôn rồi! 😭💔"</i>
    </p>
    <div style="background:#fef2f2;border:1.5px solid #fecaca;border-radius:10px;padding:8px 12px;font-size:0.86rem;color:#991b1b;margin-top:8px;text-align:left;">
      ⚠️ <b>Hậu quả:</b><br>
      • Gen Z đã <b>nghỉ việc hẳn</b> (lần sau muốn tuyển lại phải trả phí <b>1.000.000đ</b>).<br>
      • Quán vừa bị <b>đánh giá 1 sao</b> trong mục Đánh giá (hãy vào trả lời để xoa dịu nhé)!
    </div>
  `, [
    ['Đã hiểu', ()=>{
      if(R && R.running) resumeGame();
    }, 1]
  ]);
}

function gzQuitFromSpamCatch(){
  const pName = staffPersonName('staffGz') || 'Gen Z';
  const pAvatar = staffAvatarUrl('staffGz');
  S.upg.staffGz = false;
  if(S.hired) S.hired.staffGz = false; // Phải thuê lại 1tr!
  if(S.staffKpi && S.staffKpi.staffGz) S.staffKpi.staffGz = { trafficBuff: 0, speedBuff: 0, billBonus: 0, level: 0 };
  if(S.staffNames) delete S.staffNames.staffGz;
  if(S.staffAvatars) delete S.staffAvatars.staffGz;
  R.gzWork = null;
  R.gzSulking = false;
  R.gzStolenRecent = false;
  sfx('bad');

  const gz1StarTexts = [
    'Quán chèn ép nhân viên, bóc lột sức lao động, sếp toxic suốt ngày vu oan vô cớ! Cạch mặt quán này!',
    'Quán lừa sinh viên mới ra trường! Bắt làm đủ thứ từ A-Z xong quay sang vu khống ăn cắp tiền bill, quá thất đức!',
    'Môi trường cực kỳ độc hại! Chủ quán đa nghi như Tào Tháo, động tí là bấm bắt quả tang sỉ nhục nhân viên. Né gấp!',
    'Tưởng tiệm trà mơ ước hoá ra ác mộng! Ép người quá đáng, làm như người ta thèm mấy đồng bạc lẻ của quán không bằng!',
    '1 sao vì chủ quán quá đáng! Vu oan giá hoạ cho sinh viên làm thêm, làm ăn thất đức sớm muộn cũng dẹp tiệm!'
  ];
  const gzRev = {
    s: 1,
    t: rnd(gz1StarTexts),
    k: 'gz_quit_' + Date.now(),
    d: S.day,
    o: false,
    n: `${pName} (Cựu Gen Z)`,
    f: pAvatar,
    tag: 'genz_quit',
    isGzRev: true,
    b: null, fl: null, tp: [], ch: false, sz: 'M'
  };
  S.reviews.unshift(gzRev);
  if(R.today && Array.isArray(R.today.stars)) R.today.stars.push(1);
  S.revTotal = Math.max(S.revTotal || 0, S.reviews.length - 1) + 1;
  if(S.reviews.length > 2500) S.reviews.length = 2500;
  save();
  head();
  renderGzWidget();

  ask(`
    <div class="pbig">💔😤</div>
    <h2 style="color:#dc2626;font-weight:800;font-size:1.25rem;margin:4px 0 8px;">GEN Z NGHỈ VIỆC VÌ BỊ VU OAN!</h2>
    <p style="line-height:1.55;font-size:0.92rem;color:var(--ink);">
      Do bạn <b>bấm bắt quả tang vô cớ (spam)</b> khi nhân viên không hề đá bill, Gen Z đã phẫn nộ tháo tạp dề bỏ về:<br>
      <i style="color:#b91c1c;font-weight:700;display:block;margin:6px 0;">"Em làm việc đàng hoàng mà sếp vu oan ép người quá đáng! Em nộp đơn nghỉ việc luôn, và em vừa lên mạng tặng quán 1 sao bóc phốt!"</i>
    </p>
    <div style="background:#fef2f2;border:1.5px solid #fecaca;border-radius:10px;padding:8px 12px;font-size:0.86rem;color:#991b1b;margin-top:8px;text-align:left;">
      ⚠️ <b>Hậu quả:</b><br>
      • Gen Z đã <b>nghỉ việc hẳn</b> (lần sau muốn tuyển lại phải trả phí <b>1.000.000đ</b>).<br>
      • Quán vừa bị <b>đánh giá 1 sao</b> trong mục Đánh giá (hãy vào trả lời để xoa dịu nhé)!
    </div>
  `, [
    ['Đã hiểu', ()=>{
      if(R && R.running) resumeGame();
    }, 1]
  ]);
}

function catchGenZ(){
  clearTimeout(R._gzCatchTimer);
  const stAmt = R.gzLastStolenBill || (R.today && R.today.gzStolen) || 0;
  if(stAmt <= 0) return;

  S.money += stAmt;
  R.today.rev += stAmt;
  S.totalRev += stAmt;
  R.today.gzStolen = Math.max(0, (R.today.gzStolen || 0) - stAmt);
  R.gzLastStolenBill = 0;
  R.gzStolenRecent = false;
  R.gzCatchExpiresAt = 0;
  R.gzStolenCustId = null;
  R.gzStealCooldown = 0;
  R.today.gzTipToShop = true; // Toàn bộ tiền bo hôm đó quán sẽ giữ

  // Tịch thu tiền bo nhân viên đã giữ trong ngày
  let confTip = 0;
  if(S.cur && S.cur.staffTip > 0){
    confTip = S.cur.staffTip;
    S.cur.staffTip = 0;
    S.cur.tips = (S.cur.tips || 0) + confTip;
    S.money += confTip;
    S.totalRev += confTip;
    R.today.tips = (R.today.tips || 0) + confTip;
  }

  // Đã bị bắt quả tang -> Đã tính 1 lần đá bill hôm nay, không tăng tỉ lệ và cam kết không tái phạm
  if(R.today){
    R.today.gzStealAttempts = Math.max(1, (R.today.gzStealAttempts || 0));
    R.today.gzStealSuccess = false;
  }
  R.gzCaughtCount = 0;

  const pName = staffPersonName('staffGz') || 'Gen Z';
  const gzAvatar = staffAvatarImg('staffGz', 72);

  let wasRunning = R.running && !R.paused;
  if(wasRunning){
    R.paused = true;
    clearInterval(timer);
  }

  sfx('lvup');
  R.gzMsg = `${pName} cúi đầu xin lỗi: "Em lỡ dại đá bill, em xin hoàn trả và nộp hết tiền bo ạ!" 😭`;
  renderGzWidget();
  head();
  save();

  ask(`
    <div style="text-align:center;">
      <div style="margin-bottom:8px;">${gzAvatar}</div>
      <h2 style="color:#dc2626;font-weight:900;font-size:1.25rem;margin:2px 0 6px;">BẮT QUẢ TANG GEN Z ĐÁ BILL!</h2>
      <div style="background:#fef2f2;border:1.5px solid #fecaca;border-radius:12px;padding:12px;margin:8px 0;text-align:left;font-size:0.88rem;line-height:1.5;color:#991b1b;">
        <b>🙇 ${esc(pName)} cúi đầu nhận lỗi chân thành:</b><br>
        <i>"Dạ sếp ơi... Em xin lỗi sếp nhiều lắm ạ! 😭 Em thấy quán đông khách quá, lòng tham nổi lên nên em lỡ tay tính giấu nhẹm tiền bill này... Em biết em sai hoàn toàn rồi ạ! Em xin hoàn trả lại đủ 100% tiền bill vào két quán, và hôm nay toàn bộ tiền bo em xin nộp phạt cho quán luôn ạ! Xin sếp tha thứ và cho em một cơ hội sửa sai, đừng đuổi việc em tội nghiệp! 🥺🙏"</i>
      </div>
      <div style="background:#f0fdf4;border:1.5px solid #bbf7d0;border-radius:10px;padding:10px 12px;font-size:0.84rem;color:#166534;text-align:left;line-height:1.45;">
        💵 <b>Thu hồi tài chính thành công:</b><br>
        • Thu hồi lại tiền bill đã đá: <b style="color:#15803d;">+${fmt(stAmt)}</b> vào két quán.<br>
        • Tịch thu tiền bo đã giữ: <b style="color:#15803d;">+${fmt(confTip)}</b> nộp vào két quán.<br>
        • Từ giờ đến hết ngày: <b>Toàn bộ tiền tip của khách sẽ nộp thẳng vào két quán!</b>
      </div>
      <div style="background:#fffbeb;border:1.5px solid #fde68a;border-radius:10px;padding:8px 12px;font-size:0.84rem;color:#92400e;text-align:left;line-height:1.45;margin-top:8px;">
        ⚠️ <b>Tâm lý Gen Z sau xử phạt:</b> Bị bắt quả tang và tịch thu toàn bộ tiền bo nên Gen Z đã biết sợ và hối lỗi, cam kết chăm chỉ làm việc và không tái phạm đá bill trong ngày hôm nay!
      </div>
    </div>
  `, [
    ['Nghiêm khắc nhắc nhở & Cho cơ hội sửa sai', () => {
      if(wasRunning) resumeGame();
      else { renderPrep(); head(); }
      toast(`Đã thu hồi ${fmt(stAmt)} tiền bill từ ${pName}! Tiếp tục ca bán! ✨`, 3500);
    }, 1]
  ]);
}

function gzSpawnHeart(e){
  const el = $('gzWidget');
  if(!el) return;
  const rect = el.getBoundingClientRect();
  const h = document.createElement('div');
  h.className = 'gz-fly-heart';
  const icons = ['💖','✨','🧋','💕','🔥','🌟','👀'];
  h.textContent = icons[Math.floor(Math.random() * icons.length)];
  const x = e && e.clientX ? (e.clientX - rect.left) : (rect.width * (0.2 + Math.random() * 0.6));
  const y = e && e.clientY ? (e.clientY - rect.top) : (rect.height * 0.4);
  h.style.left = x + 'px';
  h.style.top = y + 'px';
  el.appendChild(h);
  setTimeout(() => h.remove(), 950);
}

function renderGzWidget(){
  const w = $('gzWidget');
  const st = $('q3stage');
  if(!w) return;
  if(!isStaffActive('staffGz') || !R.running || R.isNightShift){
    if(w.style.display !== 'none') w.style.display = 'none';
    if(st) st.classList.remove('has-gz');
    return;
  }

  if(w.style.display !== 'flex') w.style.display = 'flex';
  if(st && !st.classList.contains('has-gz')) st.classList.add('has-gz');

  const pName = staffPersonName('staffGz') || 'Nhân viên Gen Z';
  const avtImg = staffAvatarImg('staffGz', 44);

  const isSulking = !!R.gzSulking;
  const isStealing = !!(R.gzStolenRecent || (R.gzCatchExpiresAt && Date.now() < R.gzCatchExpiresAt) || (R.gzLastStolenBill > 0));
  const isChiding = !!(R.gzWork && R.gzWork.chide && Date.now() < (R.gzWork.chideUntil || 0));
  const isTipMsg = !!(R.gzTipMsg && Date.now() < (R.gzTipMsgUntil || 0));

  // Khởi tạo khung DOM tĩnh duy nhất 1 lần nếu chưa có để triệt tiêu 100% hiện tượng nhảy tab
  if(!w.querySelector('.gz-body') || !w.querySelector('#gzMsgEl')){
    w.innerHTML = `
      <div class="gz-avatar" id="gzAvtBox" style="position:relative;">${avtImg}</div>
      <div class="gz-body">
        <div class="gz-head-row">
          <span class="gz-name" id="gzNameEl">${esc(pName)}</span>
          <span class="gz-pill" id="gzPillEl">⚡ Tự động pha chế A-Z</span>
        </div>
        <div class="gz-msg" id="gzMsgEl">Đang sẵn sàng nhận đơn pha chế... ✨</div>
        <div class="gz-cheer-row" id="gzCheerRow" style="display:none;"></div>
      </div>
      <button type="button" class="gz-poke-chip" id="gzBtnEl" style="display:none;"></button>
    `;
  }

  const avtBox = w.querySelector('#gzAvtBox');
  const hpIcon = w.querySelector('.gz-hp');
  if(hpIcon) hpIcon.remove();
  const nameEl = w.querySelector('#gzNameEl');
  const pillEl = w.querySelector('#gzPillEl');
  const msgEl = w.querySelector('#gzMsgEl');
  const cheerRow = w.querySelector('#gzCheerRow');
  const btnEl = w.querySelector('#gzBtnEl');

  if(nameEl && nameEl.textContent !== pName) nameEl.textContent = pName;

  if(isSulking){
    w.className = 'gz-widget gz-sulking';
    const rem = Math.max(0, Math.ceil(R.gzSulkTimer != null ? R.gzSulkTimer : 10));
    const c = Math.min(3, R.gzCheers || 0);

    if(pillEl){
      pillEl.className = 'gz-pill gz-pill-sulk';
      pillEl.textContent = '💔 Đi chữa lành (' + rem + 's)';
      pillEl.style.background = '';
      pillEl.style.color = '';
    }
    if(msgEl){
      msgEl.textContent = R.gzMsg || 'Áp lực quá, em dỗi rồi!';
      msgEl.style.color = '';
    }
    if(cheerRow){
      cheerRow.style.display = 'flex';
      cheerRow.innerHTML = '<span class="gz-cheer-hint">👉 Dỗ trong <b class="gz-sulk-sec" style="color:#b91c1c;">' + rem + 's</b>:</span> <span class="gz-hearts-bar">' + '💖'.repeat(c) + '🤍'.repeat(3 - c) + '</span> <b class="gz-cheer-num">' + c + '/3</b>';
    }
    if(btnEl){
      btnEl.style.display = 'block';
      btnEl.className = 'gz-poke-chip cheer-btn';
      btnEl.setAttribute('data-gz-act', 'cheer');
      btnEl.textContent = '💖 Dỗ dành (' + c + '/3)';
      btnEl.onclick = (e) => { e.stopPropagation(); gzCheer(e); };
    }
  } else if(isStealing){
    w.className = 'gz-widget gz-stealing';
    const remSec = R.gzCatchExpiresAt ? Math.max(1, Math.ceil((R.gzCatchExpiresAt - Date.now()) / 1000)) : 5;
    const stolenVal = R.gzLastStolenBill || (R.today && R.today.gzStolen) || 0;

    if(pillEl){
      pillEl.className = 'gz-pill gz-pill-stole';
      pillEl.textContent = '🤫 Đang đá bill (' + remSec + 's)!';
      pillEl.style.background = '';
      pillEl.style.color = '';
    }
    if(msgEl){
      msgEl.textContent = 'Vừa lén ẵm bill ' + fmt(stolenVal) + '! Bấm "Bắt quả tang" ngay!';
      msgEl.style.color = '';
    }
    if(cheerRow) cheerRow.style.display = 'none';
    if(btnEl){
      btnEl.style.display = 'block';
      btnEl.className = 'gz-poke-chip catch-active';
      btnEl.setAttribute('data-gz-act', 'catch');
      btnEl.textContent = '🚨 Bắt quả tang (' + remSec + 's)';
      btnEl.onclick = (e) => { e.stopPropagation(); catchGenZ(); };
    }
  } else if(isChiding){
    w.className = 'gz-widget gz-chiding';
    if(pillEl){
      pillEl.className = 'gz-pill';
      pillEl.textContent = '😤 Cứu nguy (Sếp làm chậm)';
      pillEl.style.background = '#e11d48';
      pillEl.style.color = '#fff';
    }
    if(msgEl){
      msgEl.textContent = '"' + R.gzWork.chide + '"';
      msgEl.style.color = '#e11d48';
    }
    if(cheerRow) cheerRow.style.display = 'none';
    if(btnEl) btnEl.style.display = 'none';
  } else if(isTipMsg){
    w.className = 'gz-widget gz-tip';
    if(pillEl){
      pillEl.className = 'gz-pill';
      pillEl.textContent = '💵 Nộp lại tiền bo (+' + fmt(R.gzLastReturnedTip || 0) + ')';
      pillEl.style.background = '#059669';
      pillEl.style.color = '#fff';
    }
    if(msgEl){
      msgEl.textContent = R.gzTipMsg;
      msgEl.style.color = '#059669';
    }
    if(cheerRow) cheerRow.style.display = 'none';
    if(btnEl) btnEl.style.display = 'none';
  } else {
    w.className = 'gz-widget gz-normal';
    let status = R.gzMsg || 'Đang sẵn sàng nhận đơn pha chế... ✨';
    if(pillEl){
      pillEl.className = 'gz-pill gz-pill-work';
      pillEl.textContent = '⚡ Tự động pha chế A-Z';
      pillEl.style.background = '';
      pillEl.style.color = '';
    }
    if(msgEl){
      msgEl.textContent = status;
      msgEl.style.color = '';
    }
    if(cheerRow) cheerRow.style.display = 'none';
    if(btnEl) btnEl.style.display = 'none';
  }
}

function staffGzTick(dt){
  if(!isStaffActive('staffGz')){
    if(R.gzWork || R.gzSulking){
      clearStaffPouring();
      R.gzWork = null;
      R.gzSulking = false;
      if(cup && cup.used && cup.staff) cup = newCup();
      renderGzWidget();
      renderLane();
      renderCup();
      renderPanel();
    }
    return;
  }
  if(!R.running || (!R.closing && R.t <= 0) || R.isNightShift) return;
  if((R.gzSupervised || 0) > 0) R.gzSupervised = Math.max(0, R.gzSupervised - dt);
  if(R.gzSulking){
    R.gzSulkTimer = Math.max(0, (R.gzSulkTimer != null ? R.gzSulkTimer : 10) - dt);
    const rem = Math.ceil(R.gzSulkTimer);
    const w = $('gzWidget');
    if(w && w.classList.contains('gz-sulking')){
      const secEls = w.querySelectorAll('.gz-sulk-sec');
      secEls.forEach(el => { el.textContent = `${rem}s`; });
    }
    if(R.gzSulkTimer <= 0){
      gzQuitFromSulk();
    }
    return;
  }
  if(R.gzStealCooldown && Date.now() < R.gzStealCooldown) return;

  if(R.gzWork){
    const w = R.gzWork;
    const c = w.type === 'lane' ? R.slots[w.slotIdx] : R.online.find(x => x && x.id === w.cId);
    if(!c || c.id !== w.cId || c.done[w.cupIdx]){
      clearStaffPouring();
      R.gzWork = null;
      renderGzWidget();
      renderLane();
      return;
    }
    w.t -= dt;
    if(w.step === 'tea'){
      const prog = Math.min(1, Math.max(0, 1 - (w.t / (w.totalT || 1))));
      cup.fill = Math.min(0.8, 0.05 + prog * 0.75);
      w.liquidH = Math.min(75, 15 + prog * 60);
      if(!pourFast()) renderCup();
      renderLane();
    }
    if(w.t <= 0){
      staffGzStep();
    }
    return;
  }

  // Gen Z: Ưu tiên người sắp hết kiên nhẫn nhất (pat <= 50%) hoặc người đứng đầu tiên theo thứ tự trên màn hình (id nhỏ nhất đến trước)
  let cand = null;
  const laneCands = [];
  const curFocusGz = (typeof focusCust === 'function') ? focusCust() : null;
  for(let i = 0; i < R.slots.length; i++){
    const c = R.slots[i];
    if(!c) continue;
    if(R.st2 && R.st2.id === c.id) continue;
    // Khách thứ 1: Gen Z thoải mái pha chế (chỉ nhường khi chủ tiệm đang trực tiếp giữ chuột rót trà)
    if(R.pour && curFocusGz && c.id === curFocusGz.id) continue;
    const j = c.cups.findIndex((o, k) => !c.done[k]);
    if(j >= 0){
      const o = c.cups[j];
      if(needs(o).every(k => qty(k) > 0)){
        laneCands.push({
          type: 'lane',
          cId: c.id,
          slotIdx: i,
          cupIdx: j,
          patRatio: c.pat / (c.max || 1)
        });
      }
    }
  }

  if(laneCands.length > 0){
    laneCands.sort((a, b) => {
      // 1. Nếu có khách sắp hết kiên nhẫn (dưới 50%), cứu người thấp nhất trước tránh bị trừ sao
      const aUrgent = a.patRatio <= 0.50;
      const bUrgent = b.patRatio <= 0.50;
      if(aUrgent || bUrgent){
        if(aUrgent && !bUrgent) return -1;
        if(!aUrgent && bUrgent) return 1;
        return a.patRatio - b.patRatio;
      }
      // 2. Mặc định: Luôn ưu tiên người đứng đầu tiên theo thứ tự trên màn hình (id nhỏ nhất đến trước)
      return a.cId - b.cId;
    });
    cand = laneCands[0];
  }

  // Nếu quầy không còn đơn và nhân viên online chưa có, Gen Z hỗ trợ đơn online
  if(!cand && !isStaffActive('staffOn')){
    const onlCands = [];
    for(let j = 0; j < R.online.length; j++){
      const c = R.online[j];
      if(!c) continue;
      const q = c.cups.findIndex((o, k) => !c.done[k]);
      if(q >= 0){
        const o = c.cups[q];
        if(needs(o).every(k => qty(k) > 0)){
          onlCands.push({
            type: 'online',
            cId: c.id,
            onlIdx: j,
            cupIdx: q,
            patRatio: c.pat / (c.max || 1)
          });
        }
      }
    }
    if(onlCands.length > 0){
      onlCands.sort((a, b) => {
        const aUrgent = a.patRatio <= 0.50;
        const bUrgent = b.patRatio <= 0.50;
        if(aUrgent || bUrgent){
          if(aUrgent && !bUrgent) return -1;
          if(!aUrgent && bUrgent) return 1;
          return a.patRatio - b.patRatio;
        }
        return a.cId - b.cId;
      });
      cand = onlCands[0];
    }
  }

  if(cand){
    const gzSpd = 1 + getStaffSpeedBuff('staffGz');
    const gzStepT = Math.max(0.06, 0.20 / gzSpd);
    const c = cand.type === 'lane' ? R.slots[cand.slotIdx] : R.online.find(x => x && x.id === cand.cId);
    R.focus = c ? c.id : null;
    R.gzWork = {
      type: cand.type,
      cId: cand.cId,
      slotIdx: cand.slotIdx,
      onlIdx: cand.onlIdx,
      cupIdx: cand.cupIdx,
      step: 'cup',
      t: gzStepT, totalT: gzStepT,
      topIdx: 0,
      cup: null
    };
    R.gzMsg = R.closing 
      ? `Gen Z đang làm nốt ly cho ${c ? c.name : 'khách'} trước khi đóng cửa... 🥤`
      : `Gen Z đang chuẩn bị ly cho ${c ? c.name : 'khách'}... 🥤`;
    renderLane();
    renderPanel();
    renderGzWidget();
    return;
  }

  // Trong lúc đóng cửa: nếu khách còn sót lại mà không thể làm được vì hết nguyên liệu, giải phóng khách để kết thúc ngày
  if(R.closing && !cand){
    for(let i = 0; i < R.slots.length; i++){
      const c = R.slots[i];
      if(!c) continue;
      const remaining = c.cups.filter((o, k) => !c.done[k]);
      if(remaining.length > 0 && !remaining.some(o => needs(o).every(k => qty(k) > 0))){
        const el = document.querySelector(`[data-slot="${i}"]`);
        if(el) fl(el, 'Hết đồ, xin lỗi hẹn khách mai nhé! 🏮', true);
        decline(i);
      }
    }
    for(let j = R.online.length - 1; j >= 0; j--){
      const c = R.online[j];
      if(!c) continue;
      const remaining = c.cups.filter((o, k) => !c.done[k]);
      if(remaining.length > 0 && !remaining.some(o => needs(o).every(k => qty(k) > 0))){
        declineOnline(j);
      }
    }
  }
}

function staffGzStep(){
  if(!isStaffActive('staffGz') || !R.gzWork || !R.running){
    clearStaffPouring();
    R.gzWork = null;
    if(cup && cup.used && cup.staff) cup = newCup();
    renderGzWidget();
    renderLane();
    renderCup();
    renderPanel();
    return;
  }
  const gzSpd = 1 + getStaffSpeedBuff('staffGz');
  const gzStepT = Math.max(0.06, 0.20 / gzSpd);
  const w = R.gzWork;
  const c = w.type === 'lane' ? R.slots[w.slotIdx] : R.online.find(x => x && x.id === w.cId);
  if(!c || c.id !== w.cId || c.done[w.cupIdx]){
    clearStaffPouring();
    R.gzWork = null;
    renderGzWidget();
    renderLane();
    return;
  }
  const o = c.cups[w.cupIdx];
  if(!o || !needs(o).every(k => qty(k) > 0)){
    clearStaffPouring();
    R.gzWork = null;
    renderGzWidget();
    renderLane();
    return;
  }

  // 1. STEP CUP
  if(w.step === 'cup'){
    R.focus = c.id;
    useCup();
    cup = newCup();
    cup.size = o.size;
    cup.used = true;
    w.cup = cup;
    const btn = $('q3_' + o.size);
    if(btn) q3pop(btn);
    sfx('tap');
    R.gzMsg = `Gen Z đang lấy ly ${o.size} cho ${c.name}... 🥤`;
    w.step = 'tea';
    w.totalT = gzStepT;
    w.t = w.totalT;
    w.liquidH = 15;

    // Bắt đầu hoạt ảnh rót trà sống động (dòng chảy + âm thanh nước rót + bình trà phát sáng)
    if(qty(o.base) > 0) consume(o.base);
    cup.base = o.base;
    cup.fill = 0.05;
    R.pour = o.base;
    R.staffPouring = true;
    pourSnd(true);
    const bBtn = $('q3b_' + o.base);
    if(bBtn){
      q3pop(bBtn);
      bBtn.classList.add('q3on');
    }

    renderCup();
    renderPanel();
    renderLane();
    renderGzWidget();
    return;
  }

  // 2. STEP TEA (Hoàn tất rót trà)
  if(w.step === 'tea'){
    cup.fill = 0.8;
    clearStaffPouring();
    sfx('plop');
    w.cup = cup;
    R.gzMsg = `Gen Z đã rót xong trà ${ITEMS[o.base] ? ITEMS[o.base].n : ''}... 🫖`;
    w.step = o.flav ? 'flav' : (o.tops.length ? 'tops' : (level() >= 2 ? 'sugar_ice' : 'seal'));
    w.t = gzStepT;
    renderCup();
    renderPanel();
    renderLane();
    renderGzWidget();
    return;
  }

  // 3. STEP FLAV
  if(w.step === 'flav'){
    if(o.flav && qty(o.flav) > 0){
      consume(o.flav);
      cup.flav = o.flav;
    }
    w.cup = cup;
    const btn = $('q3b_' + o.flav);
    if(btn) q3pop(btn);
    sfx('pump');
    R.gzMsg = `Gen Z đang thêm siro ${ITEMS[o.flav] ? ITEMS[o.flav].n : ''}... 🍓`;
    w.step = o.tops.length ? 'tops' : (level() >= 2 ? 'sugar_ice' : 'seal');
    w.t = gzStepT;
    renderCup();
    renderPanel();
    renderLane();
    renderGzWidget();
    return;
  }

  // 4. STEP TOPS
  if(w.step === 'tops'){
    const topKey = o.tops[w.topIdx || 0];
    if(topKey && qty(topKey) > 0){
      consume(topKey);
      cup.tops.push(topKey);
      if(ITEMS[topKey] && ITEMS[topKey].g !== 'foam'){
        cup.vt = cup.vt || [];
        cup.vt.push({ k: topKey, pts: q3layer(topKey) });
      }
      const btn = $('q3b_' + topKey);
      if(btn) q3pop(btn);
      sfx('plop');
      R.gzMsg = `Gen Z đang thêm ${ITEMS[topKey] ? ITEMS[topKey].n : ''} (${(w.topIdx || 0) + 1}/${o.tops.length})... 🧋`;
    } else if(topKey && S.upg.staffBuyer && !R.buyerTrip){
      staffBuyerTriggerInstant(topKey);
    }
    w.topIdx = (w.topIdx || 0) + 1;
    w.cup = cup;
    if(w.topIdx < o.tops.length){
      w.t = gzStepT;
    } else {
      if(o.cheese && qty('cheese') > 0 && !cup.cheese){
        consume('cheese');
        cup.cheese = true;
      }
      w.step = level() >= 2 ? 'sugar_ice' : 'seal';
      w.t = gzStepT;
    }
    renderCup();
    renderPanel();
    renderLane();
    renderGzWidget();
    return;
  }

  // 5. STEP SUGAR & ICE
  if(w.step === 'sugar_ice'){
    const lv = level();
    if(lv >= 2){
      cup.sugar = o.sugar != null ? o.sugar : 50;
      cup.ice = o.ice || 'Đá thường';
      cup.sugarN = SUGAR.indexOf(cup.sugar) + 1;
      cup.iceN = (cup.ice === 'Không đá' ? 0 : cup.ice === 'Ít đá' ? 1 : 2);
      if(cup.sugar > 0 && qty('sugar') > 0) consume('sugar');
      if(cup.ice !== 'Không đá' && qty('ice') > 0) consume('ice');
      const sBtn = $('q3b_sugar'), iBtn = $('q3b_ice');
      if(sBtn) q3pop(sBtn);
      if(iBtn) q3pop(iBtn);
      sfx('ice');
      R.gzMsg = `Gen Z đang cân chỉnh đường & đá... 🧊`;
    }
    w.cup = cup;
    w.step = 'seal';
    w.t = gzStepT;
    renderCup();
    renderPanel();
    renderLane();
    renderGzWidget();
    return;
  }

  // 6. STEP SEAL & SERVE / "ĐÁ BILL"
  if(w.step === 'seal'){
    // Gen Z: 1% làm sai bill, hỏng thì đổ bỏ làm lại từ đầu
    if(Math.random() < 0.01){
      sfx('trash');
      spoilCup();
      const pName = staffPersonName('staffGz') || 'Gen Z';
      toast(`🥤🗑️ ${pName} sơ ý làm sai bill của ${c.name}, ly bị hỏng đã đổ bỏ làm lại từ đầu!`, 4500, 1);
      R.gzMsg = `Sơ ý làm hỏng ly của ${c.name}, đang đổ bỏ làm lại từ đầu... 🗑️`;
      cup = newCup();
      w.step = 'cup';
      w.topIdx = 0;
      w.t = gzStepT;
      renderCup();
      renderPanel();
      renderLane();
      renderGzWidget();
      return;
    }
    cup.sealed = true;
    const sBtn = $('q3seal');
    if(sBtn) q3pop(sBtn);
    sfx('seal');
    renderCup();
    w.cup = cup;

    // Đảm bảo cup đầy đủ thông số chính xác 100%
    cup.base = o.base;
    cup.size = o.size;
    cup.flav = o.flav || null;
    cup.tops = [...o.tops];
    cup.cheese = !!o.cheese;
    cup.sugar = o.sugar;
    cup.ice = o.ice;
    cup.fill = 0.8;
    cup.used = true;

    if(w.type === 'lane'){
      const staffBillBonus = getStaffBillBonusTotal();
      const fullBill = Math.round(price(o) * (c.star != null ? 3 : 1) * (1 + staffBillBonus));
      const isSupervised = (R.gzSupervised || 0) > 0;

      // Mỗi ngày chỉ đá bill tối đa 1 lần, khi thành công tuyệt đối không đá bill nữa
      const alreadyStoleToday = !!(R.today && (
        (R.today.gzStealAttempts || 0) >= 1 ||
        R.today.gzStealSuccess ||
        (R.today.gzStolen || 0) > 0
      ));

      // Giảm tỉ lệ đá bill xuống ~1.5%
      let stealChance = 0.015;
      if(isTaxActive()){
        stealChance *= (1 - ((S.tax && S.tax.rate) ? S.tax.rate * 0.5 : 0.075));
      } else if(isTaxOverdue()){
        stealChance = Math.min(0.02, stealChance * 1.35);
      }
      stealChance = Math.min(0.02, Math.max(0.008, stealChance));

      const willSteal = !alreadyStoleToday && !isSupervised && Math.random() < stealChance;

      if(willSteal){
        if(R.today) R.today.gzStealAttempts = (R.today.gzStealAttempts || 0) + 1;
        R.gzCaughtCount = 0;
        c.done[w.cupIdx] = true;
        recSale(o);
        R.today.served++;
        S.served++;
        R.today.gzStolen = (R.today.gzStolen || 0) + fullBill;
        R.gzStolenRecent = true;
        R.gzLastStolenBill = fullBill;
        R.gzStolenCustId = c.id;
        R.gzStealCooldown = Date.now() + 2500;

        const left = c.done.filter(x => !x).length;
        const el = document.querySelector(`[data-slot="${w.slotIdx}"]`);
        if(left){
          c.order = c.cups[c.done.indexOf(false)];
          if(el) fl(el, `🤫 Đá bill ${fmt(fullBill)}! còn ${left} ly`, true);
        } else {
          const rv = stars(c, false);
          addReview(rv.s, rv.why, false, c);
          if(el) fl(el, `🤫 Đá bill ${fmt(fullBill)}! ${'★'.repeat(rv.s)}`, true);
          R.slots[w.slotIdx] = null;
        }
        toast(`Gen Z vừa "đá bill" ${fmt(fullBill)} của ${c.name}! Bấm "BẮT QUẢ TANG" trong 5s để đòi lại tiền & tịch thu tiền bo! 🚨💸`, 5000, 1);
        sfx('bad');
        R.gzMsg = `🤫 Vừa lén đá bill ${fmt(fullBill)}! Bấm "Bắt quả tang" ngay!`;
        
        clearTimeout(R._gzCatchTimer);
        R.gzCatchExpiresAt = Date.now() + 5000;
        R._gzCatchTimer = setTimeout(() => {
          if(R.gzStolenRecent){
            R.gzStolenRecent = false;
            R.gzLastStolenBill = 0;
            R.gzCatchExpiresAt = 0;
            R.gzStolenCustId = null;
            if(R.today) R.today.gzStealSuccess = true;
            S.gzNeverSulk = true;
            R.gzSulking = false;
            save();
            renderGzWidget();
            toast('Đã quá 5s! Gen Z đã tẩu tán xong tiền bill mất rồi! 💸 (Đá bill thành công nên sẽ không bao giờ dỗi nữa)', 4000);
          }
        }, 5000);

        cup = newCup();
        renderCup();
        renderGzWidget();
      } else {
        serve(w.slotIdx);
        R.gzMsg = `Gen Z đã làm xong & dán nắp giao cho ${c.name}! ✨`;
      }
    } else if(w.type === 'online'){
      c.order = o;
      serveOnline(w.onlIdx);
      R.gzMsg = `Gen Z đã hoàn thành đơn online #${c.id}! 🛵`;
    }

    R.gzWork = null;
    renderCup();
    renderPanel();
    renderLane();
    renderGzWidget();
    return;
  }
}

/* ===== NHÂN VIÊN ĐI CHỢ (staffBuyer) ===== */
function getBuyerBatch(k){
  if(k === 'cup'){
    const q = 20;
    const c = q * (CFG.cost.cup || 1500);
    return { k, q, cost: c, name: 'Ly nhựa', unit: 'ly', type: 'supply' };
  }
  if(k === 'ice'){
    const q = 25;
    const c = q * (CFG.cost.ice || 1000);
    return { k, q, cost: c, name: 'Đá viên', unit: 'phần', type: 'supply' };
  }
  if(k === 'sugar'){
    const q = 30;
    const c = q * (CFG.cost.sugar || 500);
    return { k, q, cost: c, name: 'Nước đường', unit: 'phần', type: 'supply' };
  }
  if(FLAV_KEYS.includes(k)){
    const q = CFG.bottleN || 45;
    const c = bottleCost(k);
    return { k, q, cost: c, name: 'Siro ' + low(ITEMS[k].n), unit: 'chai (' + q + ' ly)', type: 'flav' };
  }
  if(BASE_KEYS.includes(k)){
    const q = 15;
    const c = q * (CFG.cost[k] || 2500);
    return { k, q, cost: c, name: ITEMS[k].n, unit: 'phần', type: 'base' };
  }
  if(TOP_KEYS.includes(k)){
    const q = 15;
    const c = q * (CFG.cost[k] || 2000);
    return { k, q, cost: c, name: ITEMS[k].n, unit: 'phần', type: 'top' };
  }
  return null;
}

function findDepletedIngredient(){
  if(!S || !S.upg || !S.upg.staffBuyer) return null;

  // 1. Kiểm tra đơn hàng đang chờ (khách tại quầy hoặc app) cần món nào mà quán đang hết hoặc sắp hết (<= 2)
  const allOrders = [];
  (R.slots || []).forEach(c => {
    if(c && c.cups) c.cups.forEach((o, j) => { if(!c.done || !c.done[j]) allOrders.push(o); });
  });
  (R.online || []).forEach(c => {
    if(c && c.cups) c.cups.forEach((o, j) => { if(!c.done || !c.done[j]) allOrders.push(o); });
  });

  for(const o of allOrders){
    if(qty('cup') <= 3) return 'cup';
    if(o.base && qty(o.base) <= 1 && S.unlocked[o.base]) return o.base;
    if(o.flav && qty(o.flav) === 0 && (S.unlocked[o.flav] || (S.sell && S.sell[o.flav] > 0))) return o.flav;
    if(o.tops && o.tops.length){
      for(const t of o.tops){
        if(qty(t) <= 1 && S.unlocked[t]) return t;
      }
    }
    if(level() >= 2 && o.sugar && o.sugar > 0 && qty('sugar') <= 2) return 'sugar';
    if(level() >= 2 && o.ice && o.ice !== 'Không đá' && qty('ice') <= 2) return 'ice';
  }

  // 2. Dụng cụ cơ bản khi sắp cạn
  if(qty('cup') <= 4) return 'cup';
  if(level() >= 2 && qty('ice') <= 4) return 'ice';
  if(level() >= 2 && qty('sugar') <= 4) return 'sugar';

  // 3. Kiểm tra trà cốt đã mở trong menu bị hết hoặc còn ít
  for(const k of BASE_KEYS){
    if(S.unlocked[k] && !(S.off||{})[k] && qty(k) <= 2) return k;
  }

  // 4. Kiểm tra topping đã mở trong menu bị hết hoặc còn ít
  for(const k of TOP_KEYS){
    if(S.unlocked[k] && !(S.off||{})[k] && qty(k) <= 2) return k;
  }

  // 5. Kiểm tra hương siro đã từng mở/có bán bị hết
  for(const k of FLAV_KEYS){
    if((S.unlocked[k] || (S.sell && S.sell[k] > 0) || (S.stock[k] && S.stock[k].length)) && !(S.off||{})[k] && qty(k) === 0) return k;
  }

  return null;
}

function staffBuyerStartTrip(k){
  if(!R.running || R.buyerTrip) return;
  const batch = getBuyerBatch(k);
  if(!batch) return;
  if(S.money < batch.cost) return; // Không đủ tiền thì không khởi hành tránh kẹt
  const buyerSpd = Math.max(0.5, 1 + getStaffSpeedBuff('staffBuyer'));
  const dur = Math.max(1.0, 2.5 / buyerSpd);
  R.buyerTrip = {
    k,
    batch,
    name: batch.name,
    t: dur,
    totalT: dur
  };
  renderBuyerWidget();
}

function staffBuyerCompleteTrip(){
  if(!R.buyerTrip) return;
  const trip = R.buyerTrip;
  R.buyerTrip = null;
  try {
    const batch = trip.batch;
    if(!batch) return;
    const pName = staffPersonName('staffBuyer') || 'NV Đi chợ';
    const batchCost = batch.cost;

    if(S.money < batchCost){
      toast(`🛵 ${pName} đi chợ về tay không: Két không đủ ${fmt(batchCost)} để mua ${batch.name}!`, 2500);
      return;
    }

    R.buyerTripsToday = (R.buyerTripsToday || 0) + 1;
    const trips = R.buyerTripsToday;
    R.today.buyerTrips = trips;

    // Giảm mạnh tỉ lệ nhân viên đi chợ khai khống tiền hàng theo yêu cầu
    // 4 lần đầu 0% (hoàn toàn trung thực), lần 5 chỉ 5%, lần 7+ tối đa 12%
    let cheatChance = 0;
    if(trips >= 7) cheatChance = 0.12;
    else if(trips >= 5) cheatChance = 0.05;

    let stolen = 0;
    if(Math.random() < cheatChance){
      const cheatRate = 0.05 + Math.random() * 0.05; // chỉ 5% - 10% nhẹ nhàng
      stolen = Math.max(2000, Math.round(batchCost * cheatRate / 1000) * 1000);
      stolen = Math.min(stolen, Math.max(0, S.money - batchCost));
    }

    const totalDeduct = batchCost + stolen;
    S.money -= totalDeduct;

    // Ghi nhận chi phí nguyên liệu vào S.cur.ing
    const g = S.cur.ing[batch.k] = S.cur.ing[batch.k] || { q: 0, v: 0 };
    g.q += batch.q;
    g.v += batchCost;

    // Nhập kho ngay trong lúc bán hàng
    addStock(batch.k, batch.q, S, true);
    if(batch.type === 'flav') syncFlav();

    S.kpiPeriodStats = S.kpiPeriodStats || {};
    if(stolen > 0){
      R.today.buyerStolen = (R.today.buyerStolen || 0) + stolen;
      S.cur.bad = (S.cur.bad || 0) + stolen;
      const ps = S.kpiPeriodStats.staffBuyer = S.kpiPeriodStats.staffBuyer || { daysWorked: 0, served: 0, errors: 0 };
      ps.errors = (ps.errors || 0) + 1;

      sfx('bad');
      if($('lane')) fl($('lane'), `⚠️ Khai gian -${fmt(stolen)}`, true);
      toast(`🛵 ${pName} đi chợ lần ${trips} về: Khai gian hóa đơn ${fmt(totalDeduct)} (đút túi riêng +${fmt(stolen)})! ⚠️`, 3500);
    } else {
      sfx('coin');
      if($('lane')) fl($('lane'), `✓ Nhập +${batch.q} ${batch.name}`);
      toast(`🛵 ${pName} đã mua +${batch.q} ${batch.unit} ${batch.name} (-${fmt(batchCost)})`, 2200);
    }

    renderPanel();
    renderCup();
    head();
    coach();

    if(R.buyerQueue && R.buyerQueue.length > 0){
      const nextK = R.buyerQueue.shift();
      if(qty(nextK) === 0){
        setTimeout(() => {
          if(R.running && !R.buyerTrip) staffBuyerStartTrip(nextK);
        }, 300);
      }
    }
  } finally {
    R.buyerTrip = null;
    renderBuyerWidget();
  }
}

function staffBuyerTriggerInstant(k){
  if(!S || !S.upg || !S.upg.staffBuyer) return;
  const pName = staffPersonName('staffBuyer') || 'NV Đi chợ';
  const itemName = (ITEMS[k] && ITEMS[k].n) || (k === 'cup' ? 'ly' : k === 'sugar' ? 'đường' : k === 'ice' ? 'đá' : k);

  const now = performance.now();
  if(R.buyerTrip){
    if(R.buyerTrip.k === k){
      if(!R._lastBuyerToast || now - R._lastBuyerToast > 3500){
        R._lastBuyerToast = now;
        toast(`🛵 ${pName} đang trên đường mua ${itemName} (${Math.max(0.1, R.buyerTrip.t).toFixed(1)}s), chờ xíu nhé!`, 2000);
      }
    } else {
      R.buyerQueue = R.buyerQueue || [];
      if(!R.buyerQueue.includes(k)) R.buyerQueue.push(k);
      if(!R._lastBuyerToast || now - R._lastBuyerToast > 3500){
        R._lastBuyerToast = now;
        toast(`🛵 ${pName} đang mua ${R.buyerTrip.name}, xong sẽ đi mua ${itemName} ngay!`, 2200);
      }
    }
    return;
  }

  staffBuyerStartTrip(k);
  if(!R._lastBuyerToast || now - R._lastBuyerToast > 3500){
    R._lastBuyerToast = now;
    toast(`🛵 ${pName} đang chạy xe đi mua ${itemName}!`, 1800);
  }
}

function staffBuyerTick(dt){
  if(!S || !S.upg || !S.upg.staffBuyer || !R.running){
    if(R.buyerTrip){
      R.buyerTrip = null;
      renderBuyerWidget();
    }
    return;
  }

  // Nếu đang có chuyến đi dở: luôn hoàn thành chuyến đi và mang đồ về kho trước khi nghỉ
  if(R.buyerTrip){
    R.buyerTrip.t -= dt;
    renderBuyerWidget();
    if(R.buyerTrip.t <= 0){
      staffBuyerCompleteTrip();
    }
    return;
  }

  // Khi quán đóng cửa (R.closing) hoặc hết giờ làm việc: không khởi hành chuyến mới
  const isShiftEnded = R.closing || (R.isNightShift ? R.nightT <= 0 : R.t <= 0);
  if(isShiftEnded){
    renderBuyerWidget();
    return;
  }

  R.buyerScanT = (R.buyerScanT || 0) - dt;
  if(R.buyerScanT <= 0){
    R.buyerScanT = 0.8;
    const neededKey = findDepletedIngredient();
    if(neededKey){
      staffBuyerStartTrip(neededKey);
    } else {
      renderBuyerWidget();
    }
  }
}

function renderBuyerWidget(){
  const w = $('buyerWidget');
  if(!w) return;
  if(!S || !S.upg || !S.upg.staffBuyer || !R.running || !R.buyerTrip){
    w.style.display = 'none';
    return;
  }
  const pName = staffPersonName('staffBuyer') || 'NV Chạy Chợ';
  w.style.display = 'flex';
  const rem = Math.max(0.1, R.buyerTrip.t).toFixed(1);
  const itemName = R.buyerTrip.name || 'nguyên liệu';
  w.className = 'buyer-widget on-trip';
  w.innerHTML = `
    <span style="font-size:22px;line-height:1;">🛵</span>
    <div style="display:flex;flex-direction:column;line-height:1.2;">
      <span style="font-size:0.72rem;opacity:0.9;">${esc(pName)} đang chạy chợ:</span>
      <span style="font-size:0.84rem;font-weight:800;color:#92400e;">Mua ${esc(itemName)} (${rem}s) 💨</span>
    </div>
  `;
}

function openBuyerDispatchModal(){
  if(!S || !S.upg || !S.upg.staffBuyer) return;
  const pName = staffPersonName('staffBuyer') || 'NV Đi Chợ';
  if(R.buyerTrip){
    const rem = Math.max(0.1, R.buyerTrip.t).toFixed(1);
    const itemName = R.buyerTrip.name || 'nguyên liệu';
    toast(`🛵 ${pName} đang chạy xe đi mua gấp [${itemName}]! Còn khoảng ${rem}s nữa về tới quán 💨`, 2500);
    return;
  }

  const items = [];
  items.push('cup');
  if(level() >= 2) items.push('ice', 'sugar');
  BASE_KEYS.forEach(k => { if(S.unlocked[k] && !(S.off||{})[k]) items.push(k); });
  TOP_KEYS.forEach(k => { if(S.unlocked[k] && !(S.off||{})[k]) items.push(k); });
  FLAV_KEYS.forEach(k => { if((S.unlocked[k] || (S.sell && S.sell[k] > 0)) && !(S.off||{})[k]) items.push(k); });

  const rowsHtml = items.map(k => {
    const batch = getBuyerBatch(k);
    if(!batch) return '';
    const currentQ = qty(k);
    const canAfford = S.money >= batch.cost;
    const isLow = currentQ <= 3;
    return `
      <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;border-radius:12px;background:${isLow ? '#fffbeb' : '#f8fafc'};margin-bottom:6px;border:1px solid ${isLow ? '#fde68a' : '#e2e8f0'};">
        <div style="display:flex;flex-direction:column;line-height:1.2;text-align:left;">
          <div style="font-weight:700;font-size:0.9rem;color:#1e293b;">${esc(batch.name)} ${isLow ? '<span style="color:#dc2626;font-size:0.75rem;">(Sắp hết)</span>' : ''}</div>
          <div style="font-size:0.75rem;color:#64748b;">Kho: <b>${currentQ}</b> ${batch.unit} | Mua +${batch.q}: <b>${fmt(batch.cost)}</b></div>
        </div>
        <button type="button" class="sbtn sm primary" style="padding:6px 14px;font-size:0.8rem;border-radius:10px;white-space:nowrap;" ${!canAfford ? 'disabled' : ''} onclick="staffBuyerTriggerInstant('${k}');$('modal').hidden=true;">
          🛵 Đi mua
        </button>
      </div>
    `;
  }).join('');

  ask(`
    <div class="pbig">🛵</div>
    <h3 style="margin:4px 0 2px;">Sai bảo ${esc(pName)} Đi Chợ</h3>
    <div style="font-size:0.82rem;color:#64748b;margin-bottom:12px;">Bấm món bạn muốn nhân viên chạy xe đi mua ngay:</div>
    <div style="max-height:280px;overflow-y:auto;padding-right:4px;">
      ${rowsHtml}
    </div>
  `, [['✕ Đóng', () => {}, 1]]);
}

function onBuyerWidgetClick(){
  if(!S || !S.upg || !S.upg.staffBuyer) return;
  openBuyerDispatchModal();
}

/* ===== NHÂN VIÊN SINH VIÊN CUỐI THÁNG (BÁN XUYÊN ĐÊM 22H - 6H) ===== */
function svTriggerStealIntent(){
  if(!R.running || !R.isNightShift || R.svStealTriggered) return;
  if(R.svWork){
    clearStaffPouring();
    R.svWork = null;
  }
  R.svStealTriggered = true;
  const ownedEquip = UPG.filter(u => S.upg[u.id]);
  const maxEquip = Math.max(1, ownedEquip.length);
  const count = Math.floor(Math.random() * maxEquip) + 1;
  R.svStealCount = count;
  R.svStealClicksNeeded = count;
  R.svStealClicksDone = 0;
  R.svStealTimer = 16.0;
  R.svStealIntent = true;
  const pName = (S.staffNames && S.staffNames.staffSv) || 'Sinh viên cuối tháng';
  R.svMsg = `Đã hơn 2h sáng, túng tiền trọ quá... Em đang tính lén đem ${count} món trang bị của quán đi cầm đồ 🥺📦!`;
  sfx('bad');
  toast(`🚨 2H SÁNG: ${pName} túng tiền trọ định lén bán ${count} món trang bị của quán! Hãy bấm KHUYÊN NGĂN ${count} lần trước khi quá muộn!`, 6500, 1);
  renderSvWidget();
}

function svCheer(e){
  if(!S.upg.staffSv || !R.running || !R.svStealIntent) return;
  if(e){ e.stopPropagation(); if(e.preventDefault) e.preventDefault(); }
  R.svStealClicksDone = (R.svStealClicksDone || 0) + 1;
  sfx('tap');
  if(typeof gzSpawnHeart === 'function') gzSpawnHeart(e);
  const pName = (S.staffNames && S.staffNames.staffSv) || 'Sinh viên cuối tháng';
  const remain = R.svStealClicksNeeded - R.svStealClicksDone;
  if(remain <= 0){
    R.svStealIntent = false;
    R.svStealClicksDone = R.svStealClicksNeeded;
    sfx('lvup');
    R.svMsg = 'Em hối hận rồi, cảm ơn sếp đã bao dung khuyên ngăn! Em xin hứa chăm chỉ làm việc chuộc lỗi! 😭✨';
    toast(`❤️ Đã khuyên ngăn thành công! ${pName} òa khóc từ bỏ ý định bán trang bị và chăm chỉ làm tiếp!`, 5500, 1);
  } else {
    const adviseQuotes = [
      'Sếp: "Bình tĩnh em ơi, khó khăn tiền trọ cứ nói sếp giúp!" 🫂',
      'Sếp: "Đừng dại dột làm liều em ơi, giữ lấy lương tâm!" 💬',
      'Sếp: "Thiếu tiền trọ cuối tháng sếp ứng lương trước cho!" 💵',
      'Sếp: "Để đồ lại cho quán làm ăn, đừng bán em ơi!" ✋',
      'Sếp: "Cố gắng lên em, vượt qua tháng này là ổn thôi!" ✨'
    ];
    R.svMsg = adviseQuotes[Math.floor(Math.random() * adviseQuotes.length)] + ` (Còn ${remain} lần khuyên)`;
  }
  renderSvWidget();
}

function svStealFail(){
  R.svStealIntent = false;
  const count = R.svStealCount || 1;
  const penalty = count * 150000;
  S.money -= penalty;
  S.cur.svPawnedLoss = (S.cur.svPawnedLoss || 0) + penalty;
  sfx('bad');
  const pName = (S.staffNames && S.staffNames.staffSv) || 'Sinh viên cuối tháng';
  toast(`💸 Không kịp khuyên ngăn! ${pName} đã lén mang ${count} món trang bị đi tiệm cầm đồ! Quán phải chi -${fmt(penalty)} chuộc lại tài sản! 😰`, 6500, 1);
  R.svMsg = `Em lỡ dại mang ${count} món đồ đi cầm rồi... Em xin lỗi sếp nhiều lắm 😢`;
  renderSvWidget();
}

function onSvWidgetClick(e){
  if(!S.upg.staffSv || !R.running || !R.isNightShift) return;
  if(e){ e.stopPropagation(); if(e.preventDefault) e.preventDefault(); }
  if(R.svStealIntent){
    svCheer(e);
    return;
  }
  sfx('tap');
  if(typeof gzSpawnHeart === 'function') gzSpawnHeart(e);
  const pName = (S.staffNames && S.staffNames.staffSv) || 'Sinh viên cuối tháng';
  const funLines = [
    `${pName}: "Ca đêm vắng mà chill sếp ơi, em đang tập trung pha chế đây! ☕"`,
    `${pName}: "Hơi buồn ngủ xíu nhưng em vẫn gồng được, sếp nhớ bấm đường đá giúp em nha! 🥱🧋"`,
    `${pName}: "Làm đêm kiếm thêm tiền trang trải học phí, em cảm ơn sếp nhận em vào làm! 🧑‍🎓✨"`
  ];
  toast(funLines[Math.floor(Math.random() * funLines.length)], 3000);
}

function renderSvWidget(){
  const w = $('svWidget');
  const st = $('q3stage');
  if(!w) return;
  // Sinh viên cuối tháng CHỈ LÀM SAU 22H (ca đêm R.isNightShift), sau khi Gen Z hết ca
  const isSvActive = isStaffActive('staffSv') && R.isNightShift;
  if(!isSvActive || !R.running){
    w.style.display = 'none';
    if(st) st.classList.remove('has-sv');
    return;
  }
  w.style.display = 'flex';
  if(st) st.classList.add('has-sv');

  const pName = (S.staffNames && S.staffNames.staffSv) || 'Sinh viên cuối tháng';
  const avtImg = staffAvatarImg('staffSv', 44);

  if(R.svStealIntent){
    w.className = 'gz-widget sv-widget sv-stealing';
    const needed = R.svStealClicksNeeded || 1;
    const done = Math.min(needed, R.svStealClicksDone || 0);
    const rem = Math.max(0, Math.ceil(R.svStealTimer || 0));
    w.innerHTML = `
      <div class="gz-avatar">${avtImg}</div>
      <div class="gz-body">
        <div class="gz-head-row">
          <span class="gz-name">${esc(pName)}</span>
          <span class="gz-pill sv-pill-steal">🚨 ĐỊNH BÁN ${R.svStealCount} MÓN ĐỒ (${rem}s)</span>
        </div>
        <div class="gz-msg sv-steal-msg" style="color:#b91c1c;font-weight:600;" title="${esc(R.svMsg || 'Túng tiền trọ quá...')}">${esc(R.svMsg || 'Túng tiền trọ quá...')}</div>
      </div>
      <button type="button" class="gz-poke-chip sv-cheer-btn" data-sv-act="cheer">🛑 Khuyên ngăn (${done}/${needed})</button>
    `;
  } else {
    // KHI ĐÃ HẾT Ý ĐỒ BÁN ĐỒ: XOÁ SẠCH LẬP TỨC TRẠNG THÁI KHUYÊN NGĂN & NÚT BẤM
    const hadStealState = w.classList.contains('sv-stealing') || !!w.querySelector('.sv-cheer-btn') || !!w.querySelector('.gz-cheer-row');
    w.classList.remove('sv-stealing');
    w.className = 'gz-widget sv-widget';

    let workStatus = R.svMsg || '⚡ Tự động pha chế A-Z...';
    if(R.svWork){
      const c = R.slots[R.svWork.slotIdx];
      const o = c && c.cups[R.svWork.cupIdx];
      if(R.svWork.step === 'seal'){
        workStatus = '🥤 Đang dán nắp giao cho khách...';
      } else if(R.svWork.step === 'tea'){
        workStatus = `🫖 Đang rót trà ${o && ITEMS[o.base] ? ITEMS[o.base].n : ''}...`;
      } else if(R.svWork.step === 'flav'){
        workStatus = '🍓 Đang thêm siro...';
      } else if(R.svWork.step === 'tops'){
        workStatus = '🧋 Đang múc topping...';
      } else if(R.svWork.step === 'sugar_ice'){
        workStatus = '🧊 Đang cân đường & đá...';
      } else {
        workStatus = '🧋 Đang lấy ly, pha trà & bỏ topping...';
      }
    }
    const shiftBadge = '🌙 Ca đêm (22h - 6h)';
    const isChiding = !!(R.svWork && R.svWork.chide && Date.now() < (R.svWork.chideUntil || 0));
    const isTipMsg = !!(R.svTipMsg && Date.now() < (R.svTipMsgUntil || 0));
    let pillBadge = isChiding ? '🥱 Cứu nguy ca đêm' : (isTipMsg ? `💵 Nộp lại tiền bo (+${fmt(R.svLastReturnedTip || 0)})` : shiftBadge);
    let pillBg = isChiding ? '#e11d48' : (isTipMsg ? '#059669' : '#4338ca');
    let msgText = isChiding ? ('"' + R.svWork.chide + '"') : (isTipMsg ? R.svTipMsg : workStatus);

    const msgEl = w.querySelector('.gz-msg');
    const pillEl = w.querySelector('.gz-pill');
    const nameEl = w.querySelector('.gz-name');

    // NẾU KHÔNG CÒN TRẠNG THÁI KHUYÊN NGĂN VÀ CÁC THẺ DOM ĐÃ ĐẦY ĐỦ: CẬP NHẬT NHẸ TEXT
    if(!hadStealState && msgEl && pillEl && nameEl && !w.querySelector('.sv-cheer-btn') && !w.querySelector('.gz-hp')){
      if(msgEl.textContent !== msgText) msgEl.textContent = msgText;
      if(pillEl.textContent !== pillBadge) pillEl.textContent = pillBadge;
      pillEl.style.background = pillBg;
      msgEl.style.color = (isChiding ? '#e11d48' : (isTipMsg ? '#059669' : ''));
      msgEl.style.fontWeight = (isChiding || isTipMsg) ? '700' : '';
      if(nameEl.textContent !== pName) nameEl.textContent = pName;
      return;
    }

    // NẾU VỪA KHUYÊN NGĂN XONG HOẶC CHƯA CÓ DOM CHUẨN: TÁI TẠO LẠI TOÀN BỘ SẠCH SẼ 100%
    w.innerHTML = `
      <div class="gz-avatar">${avtImg}</div>
      <div class="gz-body">
        <div class="gz-head-row">
          <span class="gz-name">${esc(pName)}</span>
          <span class="gz-pill" style="background:${pillBg};color:#fff;">${pillBadge}</span>
        </div>
        <div class="gz-msg" style="${(isChiding || isTipMsg) ? 'color:' + (isChiding ? '#e11d48' : '#059669') + ';font-weight:700;' : ''}">${esc(msgText)}</div>
      </div>
    `;
  }
}

function staffSvTick(dt){
  // Sinh viên cuối tháng CHỈ LÀM SAU 22H (ca đêm R.isNightShift), sau khi Gen Z hết ca
  if(!isStaffActive('staffSv') || !R.isNightShift || !R.running || R.paused) return;

  // 1. Nếu đang có ý định bán trang bị, đếm ngược thời gian
  if(R.svStealIntent){
    R.svStealTimer = Math.max(0, (R.svStealTimer || 0) - dt);
    const w = $('svWidget');
    if(w){
      const rem = Math.ceil(R.svStealTimer);
      const remEl = w.querySelector('.sv-rem-sec');
      if(remEl) remEl.textContent = `${rem}s`;
    }
    if(R.svStealTimer <= 0){
      svStealFail();
    }
    return;
  }

  // 2. Kiểm tra mốc 2h sáng: có ý đồ bán trang bị quán (chỉ ca đêm)
  if(R.isNightShift){
    const elNight = Math.min(1, Math.max(0, 1 - (R.nightT / (R.nightTot || 80))));
    if(elNight >= 0.50 && !R.svStealTriggered && !R.closing){
      svTriggerStealIntent();
      return;
    }
  }

  // 3. Nếu đang thực hiện pha chế ly
  if(R.svWork){
    const w = R.svWork;
    const c = R.slots[w.slotIdx];
    if(!c || c.id !== w.cId || c.done[w.cupIdx]){
      clearStaffPouring();
      R.svWork = null;
      renderSvWidget();
      renderLane();
      return;
    }
    w.t -= dt;
    if(w.step === 'tea'){
      const prog = Math.min(1, Math.max(0, 1 - (w.t / (w.totalT || 1))));
      cup.fill = Math.min(0.8, 0.05 + prog * 0.75);
      w.liquidH = Math.min(75, 15 + prog * 60);
      if(!pourFast()) renderCup();
      renderLane();
    }
    if(w.t <= 0){
      staffSvStep();
    }
    return;
  }

  // 4. Sinh viên ca đêm: Ưu tiên người sắp hết kiên nhẫn nhất (pat <= 50%) hoặc người đứng đầu tiên theo thứ tự trên màn hình (id nhỏ nhất đến trước)
  let cand = null;
  const svLaneCands = [];
  for(let i = 0; i < R.slots.length; i++){
    const c = R.slots[i];
    if(!c) continue;
    if(R.st2 && R.st2.id === c.id) continue;
    const j = c.cups.findIndex((o, k) => !c.done[k]);
    if(j >= 0){
      const o = c.cups[j];
      const allNeeds = needs(o);
      const isReady = allNeeds.every(k => qty(k) > 0);
      if(isReady){
        svLaneCands.push({
          slotIdx: i,
          cId: c.id,
          cupIdx: j,
          patRatio: c.pat / (c.max || 1)
        });
      } else {
        const miss = allNeeds.find(k => qty(k) === 0);
        if(miss && S.upg.staffBuyer && !R.buyerTrip){
          staffBuyerTriggerInstant(miss);
        }
      }
    }
  }

  if(svLaneCands.length > 0){
    svLaneCands.sort((a, b) => {
      // 1. Khách sắp hết kiên nhẫn (dưới 50%): cứu người thấp nhất trước tránh trừ sao
      const aUrgent = a.patRatio <= 0.50;
      const bUrgent = b.patRatio <= 0.50;
      if(aUrgent || bUrgent){
        if(aUrgent && !bUrgent) return -1;
        if(!aUrgent && bUrgent) return 1;
        return a.patRatio - b.patRatio;
      }
      // 2. Mặc định: Luôn ưu tiên người đứng đầu tiên theo thứ tự trên màn hình (id nhỏ nhất đến trước)
      return a.cId - b.cId;
    });
    cand = svLaneCands[0];
  }

  if(cand){
    const svSpd = 1 + getStaffSpeedBuff('staffSv');
    const svStepT = Math.max(0.06, 0.20 / svSpd);
    const c = R.slots[cand.slotIdx];
    R.focus = c ? c.id : null;
    R.svWork = {
      slotIdx: cand.slotIdx,
      cId: cand.cId,
      cupIdx: cand.cupIdx,
      step: 'cup',
      t: svStepT, totalT: svStepT,
      topIdx: 0,
      cup: null
    };
    R.svMsg = `Sinh viên đang chuẩn bị ly cho ${c ? c.name : 'khách'}... 🧑‍🎓`;
    renderLane();
    renderPanel();
    renderSvWidget();
  }
}

function staffSvStep(){
  if(!R.svWork || !R.running) return;
  const svSpd = 1 + getStaffSpeedBuff('staffSv');
  const svStepT = Math.max(0.06, 0.20 / svSpd);
  const w = R.svWork;
  const c = R.slots[w.slotIdx];
  if(!c || c.id !== w.cId || c.done[w.cupIdx]){
    clearStaffPouring();
    R.svWork = null;
    renderSvWidget();
    renderLane();
    return;
  }
  const o = c.cups[w.cupIdx];
  if(!o || !needs(o).every(k => qty(k) > 0)){
    clearStaffPouring();
    R.svWork = null;
    renderSvWidget();
    renderLane();
    return;
  }

  // 1. LẤY LY
  if(w.step === 'cup'){
    R.focus = c.id;
    useCup();
    cup = newCup();

    // 25% tỉ lệ buồn ngủ lấy nhầm size M thành L hoặc L thành M (chỉ ca đêm)
    const isSleepy = R.isNightShift && Math.random() < 0.25;
    if(isSleepy && o.size === 'M'){
      cup.size = 'L';
      c._svWrongSize = 'up';
      cup._svWrongAccept = true;
      c.order._svWrongAccept = true;
      o._svWrongAccept = true;
      toast('🥱 Sinh viên cuối tháng ngái ngủ lấy nhầm ly size L (khách gọi M)!', 4000);
    } else if(isSleepy && o.size === 'L'){
      cup.size = 'M';
      c._svWrongSize = 'down';
      cup._svWrongAccept = true;
      c.order._svWrongAccept = true;
      o._svWrongAccept = true;
      toast('🥱 Sinh viên cuối tháng ngáp dài lấy nhầm ly size M (khách gọi L)!', 4000);
    } else {
      cup.size = o.size;
    }

    cup.used = true;
    w.cup = cup;
    const btn = $('q3_' + cup.size);
    if(btn) q3pop(btn);
    sfx('tap');
    R.svMsg = `Sinh viên đang lấy ly ${cup.size} cho ${c.name}... 🥤`;
    w.step = 'tea';
    w.totalT = svStepT;
    w.t = w.totalT;
    w.liquidH = 15;

    // Bắt đầu hoạt ảnh rót trà sống động (dòng chảy + âm thanh nước rót + bình trà phát sáng)
    if(qty(o.base) > 0) consume(o.base);
    cup.base = o.base;
    cup.fill = 0.05;
    R.pour = o.base;
    R.staffPouring = true;
    pourSnd(true);
    const bBtn = $('q3b_' + o.base);
    if(bBtn){
      q3pop(bBtn);
      bBtn.classList.add('q3on');
    }

    renderCup();
    renderPanel();
    renderLane();
    renderSvWidget();
    return;
  }

  // 2. RÓT TRÀ (Hoàn tất rót trà)
  if(w.step === 'tea'){
    cup.fill = 0.8;
    clearStaffPouring();
    sfx('plop');
    w.cup = cup;
    R.svMsg = `Sinh viên đã rót xong trà ${ITEMS[o.base] ? ITEMS[o.base].n : ''}... 🫖`;
    w.step = o.flav ? 'flav' : (o.tops.length ? 'tops' : (level() >= 2 ? 'sugar_ice' : 'seal'));
    w.t = svStepT;
    renderCup();
    renderPanel();
    renderLane();
    renderSvWidget();
    return;
  }

  // 3. THÊM HƯƠNG / SIRO
  if(w.step === 'flav'){
    if(o.flav && qty(o.flav) > 0){
      consume(o.flav);
      cup.flav = o.flav;
    }
    w.cup = cup;
    const btn = $('q3b_' + o.flav);
    if(btn) q3pop(btn);
    sfx('pump');
    R.svMsg = `Sinh viên đang thêm siro ${ITEMS[o.flav] ? ITEMS[o.flav].n : ''}... 🍓`;
    w.step = o.tops.length ? 'tops' : (level() >= 2 ? 'sugar_ice' : 'seal');
    w.t = svStepT;
    renderCup();
    renderPanel();
    renderLane();
    renderSvWidget();
    return;
  }

  // 4. MÚC TOPPING
  if(w.step === 'tops'){
    const topKey = o.tops[w.topIdx || 0];
    if(topKey){
      if(qty(topKey) > 0){
        consume(topKey);
        cup.tops.push(topKey);
        if(ITEMS[topKey] && ITEMS[topKey].g !== 'foam'){
          cup.vt = cup.vt || [];
          cup.vt.push({ k: topKey, pts: q3layer(topKey) });
        }
        const btn = $('q3b_' + topKey);
        if(btn) q3pop(btn);
        sfx('plop');
        R.svMsg = `Sinh viên đang thêm ${ITEMS[topKey] ? ITEMS[topKey].n : ''} (${(w.topIdx || 0) + 1}/${o.tops.length})... 🧋`;
      } else if(S.upg.staffBuyer && !R.buyerTrip){
        staffBuyerTriggerInstant(topKey);
      }
    }
    w.topIdx = (w.topIdx || 0) + 1;
    w.cup = cup;
    if(w.topIdx < o.tops.length){
      w.t = svStepT;
    } else {
      if(o.cheese && qty('cheese') > 0 && !cup.cheese){
        consume('cheese');
        cup.cheese = true;
      }
      w.step = level() >= 2 ? 'sugar_ice' : 'seal';
      w.t = svStepT;
    }
    renderCup();
    renderPanel();
    renderLane();
    renderSvWidget();
    return;
  }

  // 5. THÊM ĐƯỜNG & ĐÁ
  if(w.step === 'sugar_ice'){
    const lv = level();
    if(lv >= 2){
      cup.sugar = o.sugar != null ? o.sugar : 70;
      cup.ice = o.ice || 'Đá thường';
      cup.sugarN = SUGAR.indexOf(cup.sugar) + 1;
      cup.iceN = (cup.ice === 'Không đá' ? 0 : cup.ice === 'Ít đá' ? 1 : 2);
      if(cup.sugar > 0 && qty('sugar') > 0) consume('sugar');
      if(cup.ice !== 'Không đá' && qty('ice') > 0) consume('ice');
      const sBtn = $('q3b_sugar'), iBtn = $('q3b_ice');
      if(sBtn) q3pop(sBtn);
      if(iBtn) q3pop(iBtn);
      sfx('ice');
      R.svMsg = `Sinh viên đang cân chỉnh đường & đá... 🧊`;
    }
    w.cup = cup;
    w.step = 'seal';
    w.t = svStepT;
    renderCup();
    renderPanel();
    renderLane();
    renderSvWidget();
    return;
  }

  // 6. DÁN NẮP VÀ GIAO LY
  if(w.step === 'seal'){
    cup.sealed = true;
    const sBtn = $('q3seal');
    if(sBtn) q3pop(sBtn);
    sfx('seal');
    renderCup();
    w.cup = cup;

    // Đảm bảo cup đầy đủ thông số chính xác 100%
    cup.base = o.base;
    if(!cup.size) cup.size = o.size;
    cup.flav = o.flav || null;
    cup.tops = [...o.tops];
    cup.cheese = !!o.cheese;
    cup.sugar = o.sugar;
    cup.ice = o.ice;
    cup.fill = 0.8;
    cup.used = true;

    serve(w.slotIdx);

    R.svWork = null;
    R.svMsg = `Đã giao xong ly cho ${c.name}! ✨`;
    renderCup();
    renderPanel();
    renderLane();
    renderSvWidget();
    return;
  }
}

function autoSeal(){if(!S.upg.sealer)return;clearTimeout(R.asT);R.asT=setTimeout(()=>{
  if(!R.running||R.paused||R.sealing||R.pour||R.helping||!cup.size||!cup.base||cup.sealed||cup.spill)return;
  const lv=level(),c2={...cup,ice:lv>=2?(cup.ice||'Không đá'):cup.ice};
  const ok=(lv<2||cup.sugar)&&(pSlots().some(c=>c&&c.cups.some((o,j)=>!c.done[j]&&matches(c2,o)))||R.online.some(c=>c.cups.some((o,q)=>!c.done[q]&&matches(c2,o))));
  if(ok&&(cup.fill||0)>=.66){R.asMsg=null;toast('Máy tự dán nắp');sealServe(1);return}
  /* máy không dán: nói rõ lý do để người chơi biết mà sửa */
  const all=[];[...pSlots().filter(Boolean),...R.online].forEach(c=>c.cups.forEach((x,j)=>{if(!c.done[j])all.push(x)}));if(!all.length)return;
  const diff=o=>{const bad=[];
  if(cup.size!==o.size)bad.push('sai size');
  if(cup.base!==o.base||cup.mixed)bad.push('sai loại trà');
  if(cup.flav&&cup.flav!==(o.flav||null))bad.push(o.flav?'sai siro':'dư siro '+low(ITEMS[cup.flav].n));
  cup.tops.filter(t=>!o.tops.includes(t)).forEach(t=>bad.push('dư '+low(ITEMS[t].n)));
  const misTops=o.tops.filter(t=>!cup.tops.includes(t));
  if(misTops.length)bad.push('thiếu '+(misTops.length>2?`${misTops.length} loại topping`:misTops.map(t=>low(ITEMS[t].n)).join(', ')));
  if(lv>=2&&o.sugar!=null&&(cup.sugar||0)>o.sugar)bad.push('dư đường');
  const iceN={'Không đá':0,'Ít đá':1,'Đá thường':2};if(lv>=2&&o.ice!=null&&(cup.iceN||0)>iceN[o.ice])bad.push('dư đá');return bad};
  const bad=all.map(diff).sort((x,y)=>x.length-y.length)[0];
  let msg=bad.length?'Máy chưa dán nắp: '+bad.join(', ')+'. Chạm máy dán nắp nếu vẫn muốn giao ly (khách nhận nhưng đánh giá xấu)':ok?'Máy chưa dán nắp: trà còn ít, rót thêm tới vạch xanh':null;
  if(msg&&R.asMsg!==msg){R.asMsg=msg;toast(msg)}},150)}
function startPour(k,el){
  if(isPriorityStaffWorking() && (R.gzWork || R.svWork)){
    toast('Nhân viên đang tự động pha chế, sếp cứ ngồi thảnh thơi nhé! 🍹', 2000);
    return;
  }
  if(R.staffPouring){toast('Nhân viên đang rót trà, chờ xíu');return}if(R.pour)return;
  if(!qty(k)){if(S.upg.staffBuyer)staffBuyerTriggerInstant(k);else toast('Hết '+ITEMS[k].n+'! Nhập thêm ở kho ngày mai');return}
  if(!cup.size){toast('Lấy ly M hoặc L trước');return}if(!S.unlocked[k]){toast((S.off||{})[k]?ITEMS[k].n+' đã bỏ khỏi menu':'Chưa mở '+ITEMS[k].n+' (Nâng cấp)');return}
  if(!cup.base){addIng('base',k);if(cup.base!==k)return}else if(cup.base!==k)cup.mixed=true;
  R.pour=k;pourSnd(true);q3pourEl=el;el.classList.add('q3on');q3wob=q3pop(el,1);q3last=performance.now();renderPanel();
  const tick=now=>{if(!R.pour)return;const dt=(now-q3last)/1000;q3last=now;const was=cup.spill;const pourSpd = 1 + getStaffSpeedBuff() * 0.35;cup.fill=(cup.fill||0)+dt*(0.54 * Math.min(1.6, pourSpd));if(cup.fill>1.02){cup.fill=1.02;cup.spill=true}if(was!==cup.spill||!pourFast())renderCup();q3raf=requestAnimationFrame(tick)};
  q3raf=requestAnimationFrame(tick)}
function stopPour(){if(!R.pour||R.staffPouring)return;R.pour=null;pourSnd(false);cancelAnimationFrame(q3raf);q3pourEl&&q3pourEl.classList.remove('q3on');q3wob&&q3wob.remove();q3wob=null;renderCup();autoSeal();coach()}
function q3burst(s){const st=$('q3stage');if(!st||q3reduce)return;const n=s>=5?7:4;
  for(let i=0;i<n;i++){const im=document.createElement('img');im.className='q3burst';im.src=IMG+'stk_'+(i%2?'star':'heart')+'.png';im.alt='';
    im.style.left=(96+Math.random()*50)+'px';im.style.top=(230+Math.random()*30)+'px';st.appendChild(im);
    const dx=(Math.random()*2-1)*110,dy=-60-Math.random()*90;
    im.animate([{transform:'translate(0,0) scale(.3)',opacity:0},{transform:`translate(${dx*.4}px,${dy*.5}px) scale(1)`,opacity:1,offset:.3},{transform:`translate(${dx}px,${dy}px) scale(.8) rotate(${dx/3}deg)`,opacity:0}],{duration:1100+Math.random()*400,easing:'ease-out',delay:i*60}).onfinish=()=>im.remove()}}
function sealServe(fast){
  if(isPriorityStaffWorking() && (R.gzWork || R.svWork)){
    toast('Nhân viên đang tự động dán nắp & giao khách! ✨', 2000);
    return;
  }
  const sealSpd = 1 + getStaffSpeedBuff() * 0.35;const baseD = q3reduce ? 240 : (fast ? 450 : 1050);const D = Math.max(180, Math.round(baseD / Math.min(1.8, sealSpd)));const k1=D/1200;
  if(!cup.size){toast('Lấy ly M hoặc L trước');return}
  if(!cup.base){toast('Chưa rót trà');return}
  if(level()>=2&&!cup.sugar)cup.sugar=70;
  if(level()>=2&&!cup.ice)cup.ice='Không đá';
  if(!ready())return;
  const cands=[];pSlots().forEach((c,i)=>{if(c&&c.cups.some((o,j)=>!c.done[j]&&matches(cup,o)))cands.push(c)});
  R.online.forEach(c=>{if(!isSto(c)&&c.cups.some((o,q)=>!c.done[q]&&matches(cup,o)))cands.push(c)});
  const fc=focusCust();
  const target=(fc&&cands.includes(fc))?fc:(cands.length?cands.sort((a,b)=>a.id-b.id)[0]:fc);
  if(!target){toast('Chưa có khách');return}
  R.focus=target.id;renderLane();renderPanel();R.sealing=true;
  const w=$('q3cup'),stg=$('q3stage'),sr=stg.getBoundingClientRect(),k=sr.width/768,r=w.getBoundingClientRect();
  const cx=(r.left-sr.left)/k+r.width/k/2,cy=(r.top-sr.top)/k+r.height/k/2;
  const toS=`translate(${700-cx}px,${505-cy}px) scale(.42)`,toC=`translate(${116-cx}px,${262-cy}px) scale(.5)`;
  const an=w.animate([{transform:'none',offset:0},{transform:toS,offset:.3},{transform:toS,offset:.62},{transform:toC,opacity:1,offset:.95},{transform:toC,opacity:0,offset:1}],{duration:D,easing:'ease-in-out',fill:'forwards'});
  setTimeout(()=>{const s=$('q3seal');s&&q3pop(s);sfx('seal');cup.sealed=true;renderCup()},q3reduce?100:520*k1);
  setTimeout(()=>{an.cancel();R.sealing=false;if(!R.running)return;
    const off=cup.spill||Math.abs((cup.fill||0)-.8)>.14;
    const i=R.slots.indexOf(target),j=R.online.indexOf(target);
    if(i<0&&j<0){cup.sealed=false;renderCup();toast('Khách đã đi mất');return}
    if(off&&matches(cup,target.order))target.fillPen=(target.fillPen||0)+1;if(cup.spill||(cup.fill||0)>.95)target.spilled=true;
    const nRev=S.reviews.length;
    if(i>=0)serve(i);else serveOnline(j);
    if(S.reviews.length>nRev&&hasFace(target)){const s=S.reviews[0].s,e=s>=4?1:s<=2?2:0,fc=$('q3face');R.flash=true;
      fc.className='q3face';fc.textContent='';fc.style.cssText=faceOf(target,e,144,141);if(s>=4)q3burst(s);setTimeout(()=>{R.flash=false;renderLane()},1100)}
  },q3reduce?320:1450*k1);
}

/* ---------- GAME LOOP ---------- */
const appN=c=>(APPS.find(a=>a.id===c.app)||APPS[0]).n;
function genOrder(){
  const lv=level(),un=k=>S.unlocked[k],has=k=>qty(k)>0;
  const bases=BASE_KEYS.filter(un),fl=FLAV_KEYS.filter(un).filter(addOk);let so=null;
  // khách muốn món nào đó; món hết thì 50% đổi món khác còn hàng, 50% bỏ về
  const want=ks=>{const k=rnd(ks);if(has(k))return k;const av=ks.filter(has);if(av.length&&Math.random()<.5)return rnd(av);so=so||k;return k};
  const tr=evIs('trend')&&S.unlocked[ev().k]&&Math.random()<.5?ev().k:null;
  const base=tr||want(bases),flav0=base!=='thai'&&fl.length&&Math.random()<.6?want(fl):null,flav=flav0&&addSkip(flav0)?null:flav0;

  const unTops = TOP_KEYS.filter(k => un(k) && addOk(k));
  const tcPool = unTops.filter(k => ITEMS[k].g === 'tc').sort(() => Math.random() - 0.5);
  const thachPool = unTops.filter(k => ITEMS[k].g === 'thach').sort(() => Math.random() - 0.5);
  const pmPool = unTops.filter(k => ITEMS[k].g === 'pm').sort(() => Math.random() - 0.5);
  const foamPool = unTops.filter(k => ITEMS[k].g === 'foam').sort(() => Math.random() - 0.5);

  // Giảm bớt lượng topping về nguyên như cũ: tầm 1 - 3 topping, tối đa 4 topping
  const maxAvailable = unTops.length;
  const maxAllowed = lv >= 3 ? 4 : (lv >= 2 ? 3 : 2);
  const targetMax = Math.min(maxAllowed, maxAvailable);

  let numTops = 0;
  if(targetMax === 1) numTops = wpick([0, 1], [0.15, 0.85]);
  else if(targetMax === 2) numTops = wpick([1, 2], [0.55, 0.45]);
  else if(targetMax === 3) numTops = wpick([1, 2, 3], [0.40, 0.45, 0.15]);
  else if(targetMax >= 4) numTops = wpick([1, 2, 3, 4], [0.35, 0.45, 0.16, 0.04]);

  const candidatePool = [];
  if(tcPool.length) candidatePool.push(...tcPool.slice(0, 2));
  if(thachPool.length) candidatePool.push(...thachPool.slice(0, 2));
  if(pmPool.length) candidatePool.push(...pmPool.slice(0, 2));
  if(foamPool.length && Math.random() < 0.2) candidatePool.push(foamPool[0]);

  const shuffledCandidates = candidatePool.sort(() => Math.random() - 0.5);
  const pick = [];
  for(const k0 of shuffledCandidates){
    if(pick.length >= numTops) break;
    let k = k0;
    const gPool = ITEMS[k].g === 'tc' ? tcPool : ITEMS[k].g === 'thach' ? thachPool : ITEMS[k].g === 'pm' ? pmPool : foamPool;
    if(!has(k)){
      const av = gPool.filter(x => has(x) && !pick.includes(x));
      if(av.length && Math.random() < 0.5) k = av[0];
      else { so = so || k; }
    }
    if(pick.includes(k) || (ITEMS[k].g === 'foam' && pick.some(x => ITEMS[x].g === 'foam')) || addSkip(k)) continue;
    pick.push(k);
  }

  const isFullTop = false;
  const preferL = (pick.length >= 3) && Math.random() < 0.55;
  const size = preferL ? 'L' : (Math.random() < lChance() ? 'L' : 'M');
  return {base,flav,tops:pick,isFullTop,cheese:false,size,so,
    sugar:lv>=2?wpick(SUGAR,[.15,.3,.35,.2]):null,ice:lv>=2?wpick(ICE,evIs('hot')?[.05,.2,.75]:[.15,.35,.5]):null};
}
const bigOrder=()=>false; /* Không bao giờ chặn khách mới khi còn chỗ trống ở quầy */
const isSto=c=>!!(c&&R.sto&&c.id===R.sto.id),isSt=c=>!!(c&&R.st2&&c.id===R.st2.id),pSlots=()=>R.slots.map(c=>isSt(c)?null:c);
function spawn(){
  const i=R.slots.findIndex(s=>!s);if(i<0||bigOrder())return;
  if(R.starPend){R.starPend=false;spawnStar(i);return}
  if(!R.vipPending && window.BanBe && window.BanBe.checkSpawnVIPFriend && window.BanBe.checkSpawnVIPFriend(i)){ R.firstDone=true; return; }
  {const pi=pricyItems();if(pi.length&&Math.random()<.8){R.today.priceLost++;if(Math.random()<.08)addReview(rnd([1,2,2]),'pricey',false,null);if(!R.pricyT||performance.now()-R.pricyT>8000){R.pricyT=performance.now();toast('Khách xem menu chê '+(pi[0]==='L'?'size L':low(ITEMS[pi[0]].n))+' mắc quá, bỏ đi')}return}}
  const nc=level()>=3?wpick([1,2,3,4,5],[.45,.25,.15,.10,.05]):(evIs('weekend')||evIs('holiday'))&&level()>=2&&Math.random()<.3?2:1,cups=Array.from({length:nc},genOrder),o=cups[0],idx=cups.reduce((a,x)=>a+priceIdx(x),0)/nc;
  const so=cups.find(x=>x.so);if(so){if(S.upg.staffBuyer)staffBuyerTriggerInstant(so.so);R.today.soldLost=(R.today.soldLost||0)+1;R.today.lost++;fl($('lane'),'🚫 Hết '+low(ITEMS[so.so].n)+', khách về',true);return}
  const over=cups.some(overCap);
  if((over&&Math.random()<.6)||(cups.some(orderPricey)&&Math.random()<.4)){R.today.priceLost++;toast('Có khách chê đắt, bỏ đi');return}
  const huongMul=1+((S.upgLv&&S.upgLv.huong)||0)*0.003;
  const max=(36+(level()>=2?4:0))*(S.upg.seats?1.15:1)*(S.upg.mascot?1.15:1)*(1+.4*(nc-1))*(1+.2*cups.reduce((a,x)=>a+slowN(x)+Math.max(0,x.tops.length-1),0)/nc)*huongMul;
  const who=Math.floor(Math.random()*9),pp=PERSONA[who];
  const vip=R.vipPending;if(vip){R.vipPending=false;toast('Food reviewer vừa tới quán!')}
  const brat=vip?null:pickBrat();
  const vipFace=vip?rnd(BRAND_ICONS):rnd(FACES);
  let cName = PNAME[who]?PNAME[who]():genName();
  let isFreeDrink = false;
  if(!vip && S.freeDrinkQueue && S.freeDrinkQueue.length > 0 && Math.random() < 0.65){
    const fd = S.freeDrinkQueue.shift();
    if(fd && fd.name){
      cName = fd.name;
      isFreeDrink = true;
    }
  } else if(!vip && (S.reviews || []).some(r => (r.freeDrinkActive || (r.freeDrinkNext && !r.freeDrinkDelivered))) && Math.random() < 0.60){
    const pendingR = (S.reviews || []).find(r => (r.freeDrinkActive || (r.freeDrinkNext && !r.freeDrinkDelivered)));
    if(pendingR){
      cName = pendingR.n || cName;
      isFreeDrink = true;
    }
  }
  if(isFreeDrink){
    setTimeout(()=>{
      toast(`🎁 Khách ${cName} ghé quán: "Em đến nhận ly nước FREE đúng như quán đã hứa hẹn nè! 🥰"`, 4500, 1);
    }, 400);
  }
  R.firstDone=true;R.slots[i]={brat: isFreeDrink ? null : brat,born:performance.now(),vip,isFreeDrink,id:++uid,who,face:vipFace,name:cName,say:isFreeDrink?'Cho em nhận ly':rnd(pp.o),end:isFreeDrink?' free nhen quán! 🥰':rnd(pp.e),cups,done:cups.map(()=>false),order:o,pat:max*(isFreeDrink?1.2:1),max:max*(isFreeDrink?1.2:1),wrong:0,paid:0};{const c=R.slots[i];if(c&&(c.brat==='hoi'||c.brat==='voi')){c.max*=.6;c.pat=c.max}else if(c&&(c.brat==='checkin'||c.brat==='chuyen')){c.max*=1.2;c.pat=c.max}}renderStreet();sfx('bell');
}
/* đơn online: tối đa bằng số chỗ ở quầy (3, mở rộng quầy 4); tài xế chờ tối đa 90 giây */
const onCap=()=>R.slots.length;
const onMul=()=>appsOn().length?1:0;
function pickApp(){const on=appsOn();return on.length?wpick(on,on.map(a=>a.w)):null}
function mkOnline(app,cups){const huongMul=1+((S.upgLv&&S.upgLv.huong)||0)*0.003,n=cups.length,max=50*(n>1?1+.15*(n-1):1)*huongMul;
  return {id:++uid,app:app.id,ship:rnd(app.rows),born:performance.now(),name:genName(),face:rnd(FACES),cups,done:cups.map(()=>false),order:cups[0],pat:max,max,wrong:0,big:n>1}}
function spawnStar(i){const last=S.starLast,pool=STARS.map((x,k)=>k).filter(k=>k!==last),k=rnd(pool),st=STARS[k];S.starLast=k;if(S.starSch)S.starSch.done=true;
  let o=genOrder();for(let t=0;t<8&&o.so;t++)o=genOrder();if(o.so)o.so=null;
  const huongMul=1+((S.upgLv&&S.upgLv.huong)||0)*0.003;
  const hi=starLine(st,'hi'),max=(36+(level()>=2?4:0))*1.3*(S.upg.seats?1.15:1)*(S.upg.mascot?1.15:1)*(1+.2*(slowN(o)+Math.max(0,o.tops.length-1)))*huongMul;
  R.slots[i]={star:k,hi:hi[0],born:performance.now(),id:++uid,name:st.n,face:'⭐',say:st.m?'Cho anh':'Cho chị',end:rnd([' nha!',' nhé, cảm ơn nha!',' nha em!']),cups:[o],done:[false],order:o,pat:max,max,wrong:0,paid:0};
  renderStreet();sfx('star');setTimeout(()=>{const q=$('q3say');if(q)q._t=null;renderLane()},3600)}
function spawnOnline(){
  if(R.online.length>=onCap()||bigOrder())return;if(pricyItems().length&&Math.random()<.8)return;
  const app=pickApp();if(!app)return;
  {const o=genOrder();if(o.so){if(S.upg.staffBuyer)staffBuyerTriggerInstant(o.so);return}R.online.push(mkOnline(app,[o]))}renderOnline();
}
/* đơn lớn: mỗi 30 ngày các app giao hàng có 1 đơn lớn, rơi vào ngày ngẫu nhiên */
const BIG={
  sp:{n:()=>1,min:5,max:10},
  tt:{n:()=>1,min:6,max:12},
  be:{n:()=>1,min:5,max:10},
  gr:{n:()=>1,min:6,max:12}
};
function planBig(){R.bigQ=[];const sc=S.bigSched=S.bigSched||{};
  appsOn().forEach(a=>{let x=sc[a.id];if(!x||S.day>x.end){const n=BIG[a.id].n(),d=[];while(d.length<n){const v=S.day+Math.floor(Math.random()*30);if(!d.includes(v))d.push(v)}x=sc[a.id]={end:S.day+29,days:d}}
    x.days.filter(v=>v===S.day).forEach(()=>R.bigQ.push({app:a.id,at:.2+Math.random()*.5}))})}
function spawnBig(q){const a=APPS.find(x=>x.id===q.app);if(!a||!appsOn().includes(a))return true;if(R.online.length>=onCap())return false;
  const B=BIG[a.id],n=B.min+Math.floor(Math.random()*(B.max-B.min+1)),cups=[];
  for(let k=0;k<n;k++){let o=genOrder();for(let t=0;t<6&&o.so;t++)o=genOrder();if(!o.so)cups.push(o)}
  if(cups.length<2)return true;R.online.push(mkOnline(a,cups));sfx('bell');toast('Đơn lớn '+a.n+': '+cups.length+' ly!',4000,1);renderOnline();return true}
const normSug=s=>(s==null||s==='')?null:parseInt(String(s),10);
const normIce=v=>(!v||v==='Không đá')?'none':v;
const hasCh=x=>!x?false:!!(x.cheese||(x.tops&&x.tops.includes('cheese')));
const pureTops=x=>(!x||!x.tops)?[]:x.tops.filter(t=>t!=='cheese');
const matchTops=(a,b)=>{
  if(hasCh(a)!==hasCh(b))return false;
  const at=pureTops(a),bt=pureTops(b);
  if(at.length!==bt.length)return false;
  return at.every(t=>bt.includes(t));
};
const matches=(a,b)=>{
  if(!a||!b)return false;
  if(a.mixed)return false;
  if(a.base!==b.base)return false;
  if((a.flav||'none')!==(b.flav||'none'))return false;
  if(a.size!==b.size && !a._svWrongAccept && !b._svWrongAccept)return false;
  if(b.sugar!=null&&normSug(a.sugar)!==normSug(b.sugar))return false;
  if(b.ice!=null&&normIce(a.ice)!==normIce(b.ice))return false;
  if(!matchTops(a,b))return false;
  return true;
};
/* giá "đắt" đúng như cảnh báo trong tab Giá bán: trà >115% giá gợi ý, hương/topping/size >130%, hoặc cả ly vượt mức tối đa */
const teaCap=k=>k==='matcha'?CFG.teaCapMatcha:CFG.teaCap;
const itemPricey=k=>k==='L'?lPricey():ITEMS[k]&&ITEMS[k].type==='base'?S.sell[k]>=teaCap(k):S.sell[k]/DEF_SELL[k]>1.3;
const orderPricey=o=>overCap(o)||[o.base,...(o.flav?[o.flav]:[]),...o.tops,...(o.size==='L'?['L']:[])].some(itemPricey);
function wrongKinds(c,o){if(!o)return;const k=c.wk=c.wk||{};
  if(cup.base!==o.base||(cup.flav||null)!==(o.flav||null))k.mon=1;if(cup.size!==o.size&&!cup._svWrongAccept)k.size=1;
  if(o.sugar!=null&&normSug(cup.sugar)!==normSug(o.sugar))k.sugar=1;if(o.ice!=null&&normIce(cup.ice)!==normIce(o.ice))k.ice=1;
  if(!matchTops(cup,o))k.tops=1}
function stars(c,online){
  if(c&&c.star!=null&&!c.deliveredWrong)return {s:5,why:'star'};
  if(c&&c._svWrongSize==='up')return {s:5,why:'sv_upsize'};
  if(c&&c._svWrongSize==='down')return {s:3,why:'sv_downsize'};
  const w=1-c.pat/c.max,idx=c.cups.reduce((a,x)=>a+priceIdx(x),0)/c.cups.length,pricey=c.cups.some(orderPricey);let s=5,why='great';
  c.rf={wait:w>.45,pricey,wrong:!!c.wrong,cheap:!pricey&&idx<.9,spill:!!c.spilled};
  if(w>.45){s--;why=online?'late':'wait'}
  if(w>(S.upg.ac?.88:.78)){s--;why=online?'late':'wait'}
  if(w>.92)s--;
  if(c.fillPen){s-=1;if(why==='great')why='meh'}
  if(c.brat==='kho'){if(c.fillPen||w>.35)s-=1;if(s>=5&&Math.random()<.6)s=4}
  if(pricey){s--;why='pricey'}
  if(c.wrong){
    if(c.deliveredWrong){
      s=Math.min(s,c.wrong>1?1:rnd([1,2]));
      why='wrong';
    } else {
      // Khách nhận ly nước mới tinh chuẩn món sau khi pha lại:
      // Tỉ lệ 5 sao hào phóng đạt 65%
      s = Math.random() < 0.65 ? 5 : 4;
      why = 'comfort';
      if(c.rf) c.rf.wrong = false;
    }
  }
  const md=S.evDay===S.day?S.mood:null;
  if(!c.wrong&&md!=='vui'&&md!=='kho'&&Math.random()<.02)s-=1;
  if(md==='kho'&&why!=='comfort')s=Math.min(s,Math.random()<.35?3:4);/* ngày khó ở: phục vụ tốt cũng chỉ 3–4 sao */
  if(md==='vui'&&why==='great')s=Math.max(s,5-(c.fillPen?1:0));
  if(c.rf.cheap&&s<5&&!c.wrong){s++;if(why==='great')why='cheap'}
  // Giảm tỉ lệ đánh giá kém theo cấp độ Topping (0.5%/level)
  const topLv=(S.upgLv&&S.upgLv.top)||0;
  if(s<5&&topLv>0&&Math.random()<topLv*0.005){
    s=Math.min(5,s+1);
    if(s>=4&&(why==='bad'||why==='wrong'||why==='timeout'||why==='late'||why==='meh')){
      why=s>=5?'great':'ok';
    }
  }

  // Tăng mạnh tỉ lệ khách phản hồi 5 sao (gỡ bỏ hoàn toàn nerf ngầm):
  // Khách hàng hài lòng (s === 5) sẽ tự tin chấm 5 sao hào phóng cho quán (~92% - 98%)
  if(s >= 5 && (!c || c.star == null) && (!c || !c.isFriend)){
    const curRating = typeof rating === 'function' ? rating() : 4.0;
    const fiveStarChance = curRating >= 4.9 ? (w < 0.35 ? 0.90 : 0.82) : 0.96;
    if(Math.random() > fiveStarChance){
      s = 4;
      if(why === 'great') why = 'ok';
    }
  }

  s=Math.max(1,Math.min(5,s));
  if(why==='great'||(why==='cheap'&&s<4))why=s>=5?'great':s===4?'ok':s===3?'meh':'bad';
  return {s,why};
}

/* ---------- HỆ THỐNG ĐIỀU TRA TIỀN GIẢ & TỐ CÁO CÔNG AN ---------- */
const INNOCENT_POOL = [
  { name: 'Anh Nam IT', face: '👨‍💻', desc: 'Thanh toán chuyển khoản quét mã VietQR, có tin nhắn báo trừ tiền tài khoản ngân hàng rõ ràng.' },
  { name: 'Bé Mai Sinh Viên', face: '👩‍🎓', desc: 'Chỉ có tiền lẻ 5k, 10k cũ nát mẹ cho đi học, không hề có tờ tiền chẵn nào.' },
  { name: 'Chú Hùng Xe Ôm', face: '🛵', desc: 'Trả bằng tiền mặt phẳng phiu vừa thối từ cây xăng Petrolimex, có dấu mộc kiểm ngân thật 100%.' },
  { name: 'Chị Lan Kế Toán', face: '👩‍💼', desc: 'Thanh toán quẹt thẻ tín dụng công ty qua máy POS, có hoá đơn đỏ xuất ngay tại quầy.' },
  { name: 'Bác Ba Tổ Trưởng', face: '👴', desc: 'Tiền mặt cất trong bóp da kỹ càng, có dải hoa văn chìm nổi soi ánh sáng nổi rõ.' },
  { name: 'Bạn Linh Reviewer', face: '💅', desc: 'Mải quay video review món nước, tờ tiền đưa vào quầy chuẩn polymer dạ quang.' },
  { name: 'Em Tuấn Học Sinh', face: '🎒', desc: 'Tiền ăn sáng 20k mẹ cho, góc tờ tiền có viết chữ mực "Mẹ yêu Tuấn".' }
];

function renderFakeAlertBtn(){
  let btn = $('btnFakePolice');
  if(!R || !R.running || !R.fakeCase || !R.fakeCase.suspect){
    if(btn) btn.remove();
    if(R && R._fakeIntervalTimer){
      clearInterval(R._fakeIntervalTimer);
      R._fakeIntervalTimer = null;
    }
    return;
  }
  const elapsed = Math.floor((Date.now() - (R.fakeCase.time || Date.now())) / 1000);
  const left = Math.max(0, 10 - elapsed);
  if(left <= 0){
    if(btn) btn.remove();
    if(R._fakeIntervalTimer){
      clearInterval(R._fakeIntervalTimer);
      R._fakeIntervalTimer = null;
    }
    // Giữ lại R.fakeCase để cuối ngày công an đến điều tra
    return;
  }
  if(!btn){
    btn = document.createElement('button');
    btn.id = 'btnFakePolice';
    btn.className = 'fake-police-bottom-btn';
    btn.title = 'Tố cáo khách đưa tiền giả để nhận đền bù 500k (trong 10s)!';
    btn.onclick = reportFakeMoneyPolice;
    document.body.appendChild(btn);
  }
  btn.innerHTML = `🚨 Báo C.An <small style="background:#fff;color:#dc2626;border-radius:6px;padding:1px 4px;font-size:9px;font-weight:900;margin-left:3px;">${left}s (+500k)</small>`;
}

function reportFakeMoneyPolice(fromEndDay){
  if(R && R._fakeIntervalTimer){
    clearInterval(R._fakeIntervalTimer);
    R._fakeIntervalTimer = null;
  }
  if(!R || !R.fakeCase || !R.fakeCase.suspect){
    return toast('Hiện tại không có vụ việc tiền giả nào cần thụ lý!');
  }
  const fc = R.fakeCase;
  const real = fc.suspect;

  const innoPool = INNOCENT_POOL.filter(x => x.name !== real.name).sort(() => Math.random() - 0.5);
  const inno1 = innoPool[0] || { name: 'Người qua đường A', face: '🧑', desc: 'Vừa ghé trú mưa, thanh toán bằng mã QR chuyển khoản.' };
  const inno2 = innoPool[1] || { name: 'Người qua đường B', face: '👩', desc: 'Đang xếp hàng mua nước, chỉ mang theo tiền xu và ví điện tử.' };
  const inno3 = innoPool[2] || { name: 'Người qua đường C', face: '🧔', desc: 'Đang đứng nghe điện thoại chờ bạn, chưa thanh toán đơn nào.' };

  const suspects = [
    { isGuilty: true, ...real },
    { isGuilty: false, ...inno1 },
    { isGuilty: false, ...inno2 },
    { isGuilty: false, ...inno3 }
  ].sort(() => Math.random() - 0.5);

  let mktClueHtml = '';
  if(S.upg && S.upg.staffMkt){
    const mktName = staffPersonName('staffMkt') || 'Me két tinh';
    const pickedIdx = Math.floor(Math.random() * suspects.length);
    const pickedSus = suspects[pickedIdx];
    mktClueHtml = `
      <div style="background:linear-gradient(135deg,rgba(236,72,153,0.08),rgba(244,114,182,0.12));border:1.5px solid #f472b6;border-radius:10px;padding:5px 8px;margin-bottom:6px;display:flex;align-items:center;gap:8px;text-align:left;">
        <span style="font-size:20px;">📢</span>
        <div style="font-size:0.75rem;line-height:1.3;color:#831843;">
          <b style="color:#db2777;">Chỉ điểm Me két tinh (${esc(mktName)}):</b> 
          "Sếp ơi! Em check var nghi ngờ nhất là <b>Nghi phạm #${pickedIdx + 1} (${esc(pickedSus.name)})</b> nè!"<br><small style="color:#be185d;font-style:italic;font-size:0.7rem;">(⚠️ Lưu ý: Me két tinh đang đoán mò theo linh cảm chứ khum chính xác 100% đâu nè, chỉ nên nghe cho vui nha sếp!)</small>
        </div>
      </div>
    `;
  }

  let wasRunning = R.running && !R.paused;
  if(wasRunning){
    R.paused = true;
    clearInterval(timer);
  }

  const cardsHtml = suspects.map((s, idx) => `
    <div class="suspect-card" data-sus-idx="${idx}">
      <div class="suspect-header">
        <div class="suspect-avatar">${s.face}</div>
        <div class="suspect-name">#${idx + 1}: <b>${esc(s.name)}</b></div>
      </div>
      <div class="suspect-desc">${esc(s.desc || ('Ghé mua ' + (s.order || 'nước')))}</div>
      <button type="button" class="sbtn pri suspect-choose-btn" data-choose-sus="${idx}">👉 Chỉ điểm</button>
    </div>
  `).join('');

  ask(`
    <div class="police-report-wrap">
      <div class="police-report-badge">🚨 CÔNG AN PHƯỜNG TRÍCH XUẤT CAMERA</div>
      <h2 class="police-report-title">HỒ SƠ ĐIỀU TRA: VỤ ÁN TIỀN GIẢ</h2>
      <p class="police-report-desc">
        Quán vừa bị lừa đưa <b>TIỀN GIẢ</b> (đơn hàng: <b>${esc(real.order)}</b>, thiệt hại: <b style="color:#ef4444;font-weight:800;">-${fmt(real.loss)}</b>).
        Công an đã khoanh vùng được <b>4 nghi phạm</b> dưới đây. Hãy nhận diện đúng người đã đưa tiền giả!
      </p>
      <div class="police-legal-warning">
        ⚖️ <b>Quy định xử lý theo pháp luật:</b><br>
        ✅ <b>Chỉ điểm ĐÚNG:</b> Thu hồi tiền đơn hàng, nhận thưởng <b style="color:#059669;">+500.000đ (500k)</b> &amp; <b style="color:#059669;">Tăng điểm sao quán ⭐</b>!<br>
        ❌ <b>Chỉ điểm SAI:</b> Bị phạt hành vi vu khống <b style="color:#dc2626;">−7.000.000đ (7tr)</b> &amp; <b style="color:#dc2626;">Giảm điểm sao quán vì thiếu minh bạch 📉</b>!
      </div>
      ${mktClueHtml}
      <div class="suspect-list">
        ${cardsHtml}
      </div>
    </div>
  `, [
    ['Để sau (quay lại)', ()=>{
      if(wasRunning) resumeGame();
      else if(fromEndDay) finishEndDay();
    }]
  ]);

  const cardEl = $('card');
  if(cardEl){
    cardEl.onclick = (e) => {
      const b = e.target.closest('[data-choose-sus]');
      if(b){
        const chosen = suspects[+b.dataset.chooseSus];
        handleSuspectVerdict(chosen, real, wasRunning);
      }
    };
  }
}

function handleSuspectVerdict(chosen, real, wasRunning){
  const originalLoss = real.loss || 0;
  R.fakeCase = null;
  renderFakeAlertBtn();

  if(chosen.isGuilty){
    const reward = 500000;
    const totalGet = reward + originalLoss;
    S.money += totalGet;
    R.today.rev += originalLoss;
    S.totalRev += originalLoss;

    // Thu hồi tổn thất tiền giả trong ngày
    if(R.today){
      R.today.fakeLoss = Math.max(0, (R.today.fakeLoss || 0) - originalLoss);
      R.today.fakeCount = Math.max(0, (R.today.fakeCount || 0) - 1);
    }

    // Tăng điểm sao của quán
    const goodReviews = [
      { s: 5, t: 'Công an phường biểu dương quán có tinh thần cảnh giác, trung thực, hỗ trợ bắt đối tượng lưu hành tiền giả! ⭐⭐⭐⭐⭐', n: 'Công An Phường', f: '👮‍♂️' },
      { s: 5, t: 'Quán làm ăn rất đàng hoàng, minh bạch và chính trực! Rất an tâm khi ghé mua, 5 sao xứng đáng! 👍✨', n: 'Khách Hàng Khu Phố', f: '🌟' }
    ];
    goodReviews.forEach(gr => {
      S.reviews.unshift({
        s: gr.s,
        t: gr.t,
        k: 'police_win_' + Date.now() + '_' + Math.random(),
        d: S.day,
        o: false,
        n: gr.n,
        f: gr.f,
        b: null, fl: null, tp: [], ch: false, sz: 'M'
      });
      if(R.today && Array.isArray(R.today.stars)) R.today.stars.push(gr.s);
    });
    S.revTotal = Math.max(S.revTotal || 0, S.reviews.length - 1) + 1;
    if(S.reviews.length > 2500) S.reviews.length = 2500;

    save(); head(); sfx('lvup');

    ask(`
      <div class="pbig">👮‍♂️🎉</div>
      <h2 class="verdict-title success">PHÁ ÁN THÀNH CÔNG!</h2>
      <p class="verdict-desc">
        Công an phường đã bắt giữ đúng đối tượng <b class="highlight-success">${esc(chosen.name)}</b> cùng xấp tiền giả mang theo người!
      </p>
      <div class="verdict-box success">
        <div>💵 Hoàn tiền đơn hàng: <b>+${fmt(originalLoss)}</b></div>
        <div>🏆 Thưởng nóng &amp; đền bù thiệt hại: <b class="amt-gain">+500.000đ (500k)</b></div>
        <div>⭐ Đánh giá uy tín quán: <b class="amt-gain">Tăng điểm sao (+2 đánh giá 5 sao từ Công An &amp; Khách)</b></div>
        <div class="verdict-box-footer">
          💰 Tổng tiền két quán nhận được: <b class="amt-total">+${fmt(totalGet)}</b>
        </div>
      </div>
    `, [
      ['Nhận thưởng & Tiếp tục 🧋', ()=>{
        if(R && R.running) resumeGame(); else finishEndDay();
      }, 1]
    ]);
  } else {
    const fine = Math.min(7000000, Math.max(200000, S.money));
    S.money = Math.max(0, S.money - fine);
    S.cur.bad = (S.cur.bad || 0) + fine;
    R.today.bad = (R.today.bad || 0) + fine;

    // Giảm điểm sao của quán vì thiếu minh bạch, vu khống
    const badReviews = [
      { s: 1, t: `Quán làm ăn tắc trách, thiếu minh bạch! Vu oan cho tôi (${esc(chosen.name)}) đưa tiền giả làm mất hết danh dự! 😡`, n: chosen.name, f: chosen.face || '😠' },
      { s: 1, t: 'Chứng kiến quán chụp mũ, vu khống khách vô tội mà bức xúc! Quán làm việc thiếu minh bạch, trừ 1 sao cảnh cáo! 👎', n: 'Khách chứng kiến', f: '😤' }
    ];
    badReviews.forEach(br => {
      S.reviews.unshift({
        s: br.s,
        t: br.t,
        k: 'police_fail_' + Date.now() + '_' + Math.random(),
        d: S.day,
        o: false,
        n: br.n,
        f: br.f,
        b: null, fl: null, tp: [], ch: false, sz: 'M'
      });
      if(R.today && Array.isArray(R.today.stars)) R.today.stars.push(br.s);
    });
    S.revTotal = Math.max(S.revTotal || 0, S.reviews.length - 1) + 1;
    if(S.reviews.length > 2500) S.reviews.length = 2500;

    save(); head(); sfx('bad');

    ask(`
      <div class="pbig">⚖️❌</div>
      <h2 class="verdict-title fail">VU KHỐNG - TỐ CÁO SAI SỰ THẬT!</h2>
      <p class="verdict-desc">
        Người bạn chỉ điểm là <b class="highlight-fail">${esc(chosen.name)}</b> hoàn toàn vô tội và có chứng cứ ngoại phạm xác thực!
      </p>
      <div class="verdict-box fail">
        <div>⚠️ Hành vi: <b class="act-name">Tố cáo oan người vô tội, vu khống</b></div>
        <div>💸 Phạt vi phạm hành chính: <b class="amt-penalty">−${fmt(fine)}</b></div>
        <div>📉 Đánh giá uy tín quán: <b class="star-penalty">Bị giảm điểm sao (-2 đánh giá 1 sao vì thiếu minh bạch)</b></div>
        <div class="verdict-box-note">(Tiền phạt đã trừ trực tiếp vào két tiền quán và ghi vào chi phí sự cố)</div>
      </div>
    `, [
      ['Chấp hành & Tiếp tục', ()=>{
        if(R && R.running) resumeGame(); else finishEndDay();
      }, 1]
    ]);
  }
}

function serve(i){
  const c=R.slots[i];if(!c||!R.running)return;const el=document.querySelector(`[data-slot="${i}"]`);
  if(level()>=2&&!cup.ice)cup.ice='Không đá';
  if(!ready(true))return;
  const j=c.cups.findIndex((x,k)=>!c.done[k]&&matches(cup,x));
  if(j>=0){
    sfx('coin');if(!R.coachDone&&S.coach!==true){R.coachDone=true;setTimeout(coach,50)}const o=c.cups[j];let p=price(o)*(c.star!=null?3:1);
    const staffBillBonus = getStaffBillBonusTotal();
    if(staffBillBonus > 0) p = Math.round(p * (1 + staffBillBonus));
    const full=p;const gd=guardLv(),T=R.today;
    const staffLv=(S.upgLv&&S.upgLv.staff)||0;
    const taxX2Rate = isTaxActive() ? (S.tax && S.tax.rate ? S.tax.rate * 0.20 : 0.03) : 0;
    const x2Chance = (staffLv * 0.002) + taxX2Rate;
    if(x2Chance > 0 && Math.random() < x2Chance){
      p *= 2;
      const isTaxBonus = taxX2Rate > 0 && Math.random() < (taxX2Rate / x2Chance);
      toast(isTaxBonus ? `🏛️ Nhờ đóng thuế uy tín, khách sộp nhân đôi tiền bill (x2)! (+${fmt(p)}) 🎉` : `✨ Nhân viên khéo léo x2 tiền lời ly nước! (+${fmt(p)}) 🎉`, 3000);
    }
    let isFake = !!c.isFake;
    // Giảm tỉ lệ đưa tiền giả xuống hợp lý (1.5% thông thường, 4% khi két quán cực giàu >50tr)
    let fakeChance = S.money >= 50000000 ? 0.04 : 0.015;
    if(isTaxActive()){
      fakeChance *= 0.7;
    } else if(isTaxOverdue()){
      fakeChance = Math.min(0.08, fakeChance * 1.5);
    }
    if(S.day >= 2 && !c.star && !c.isFriend && c.brat !== 'bung' && !c.fakeChecked && Math.random() < fakeChance){
      c.fakeChecked = true;
      c.isFake = true;
      isFake = true;
      p = 0;
      T.fakeCount = (T.fakeCount || 0) + 1;
      T.fakeLoss = (T.fakeLoss || 0) + full;
      R.fakeCase = {
        suspect: {
          name: c.name,
          face: c.face || '🧑',
          order: dname(o) || iname(o.base),
          loss: full,
          desc: 'Camera ghi nhận khách trả tờ tiền polymer nhòe mờ, mất dải phản quang (tiền giả) khi mua ' + (dname(o) || iname(o.base)) + ' rồi vội vã rời đi.'
        },
        time: Date.now()
      };
      sfx('bad');
      if(R._fakeIntervalTimer) clearInterval(R._fakeIntervalTimer);
      R._fakeIntervalTimer = setInterval(() => {
        if(R && R.fakeCase && R.running){
          renderFakeAlertBtn();
        } else {
          if(R && R._fakeIntervalTimer){
            clearInterval(R._fakeIntervalTimer);
            R._fakeIntervalTimer = null;
          }
        }
      }, 1000);
      setTimeout(()=>{
        toast(`🚨 TIỀN GIẢ! Khách <b style="color:#fef08a;font-size:1.02em;">${esc(c.name)}</b> (${c.face || '🧑'}) vừa đưa tiền giả! Báo nhanh 10s hoặc đợi cuối ngày Công An đến điều tra!`, 6500, 1);
        renderFakeAlertBtn();
      }, 400);
    } else {
      c.fakeChecked = true;
    }
    if(c.isFake){
      p = 0;
    }
    if(!isFake && c.brat==='mac'){
      p = Math.round(full*.8/1000)*1000;
      // Khách trả thiếu 20%, quán chấp nhận, bảo vệ không can thiệp bắt người trả thiếu
    }
    if(c.isFreeDrink){
      p = 0;
    }
    if(!isFake && c.brat==='bung'&&c.done.filter(x=>!x).length===1){p=0;
      if(gd>=2&&Math.random()>=.02){T.gRun=(T.gRun||0)+full;T.gRunN=(T.gRunN||0)+1;setTimeout(()=>toast('Bảo vệ tóm được '+c.name+' ôm ly bỏ chạy, cuối ngày thu lại '+fmt(full)),300)}
      else{if(gd>=2)T.gEsc=(T.gEsc||0)+1;S.bungN=(S.bungN||0)+1;setTimeout(()=>toast(c.name+' ôm ly chạy mất, không trả tiền!'+(gd>=2?' Bảo vệ đuổi không kịp':'')),300)}}c.done[j]=true;recSale(o);S.money+=p;R.today.rev+=p;S.totalRev+=p;R.today.served++;S.served++;
    
    onCupServedProgress();const left=c.done.filter(x=>!x).length;cup=newCup();
    if(left){c.order=c.cups[c.done.indexOf(false)];const st_=isSt(c);if(!st_)R.focus=c.id;fl(el,c.isFreeDrink?`🎁 UỐNG FREE 0đ! · còn ${left} ly`:isFake?`💸 TIỀN GIẢ! 0đ (Hụt -${fmt(full)}) · còn ${left} ly`:c.brat==='mac'?`+${fmt(p)} (Bill: ${fmt(full)}, Lệch -${fmt(full-p)}) · còn ${left} ly`:`+${fmt(p)} · còn ${left} ly`,false);renderLane();renderCup();renderPanel();head();return}
    let tip=isFake?0:Math.round((c.pat/c.max)*5)*1000*(S.upg.sealer?1.3:1)*(evIs('holiday')?2:1)*c.cups.length;
    if(c.brat==='haophong'&&!isFake)tip=Math.round(tip*2.5);
    if(c.isFriend&&!isFake)tip=Math.round(tip*2);
    const promisedRev=(S.reviews||[]).find(r=>r.extraTipActive&&(r.n===c.name||Math.random()<0.35));
    let extraTipBonus=0;
    if(promisedRev&&!isFake){
      extraTipBonus=Math.max(15000,Math.round(full*0.35));
      tip+=extraTipBonus;
      promisedRev.extraTipActive=false;
      promisedRev.extraTipDelivered=true;
      setTimeout(()=>{
        toast(`✨ ${c.name} giữ lời hứa: Bo thêm +${fmt(extraTipBonus)} tiền tip vì chủ quán nhiệt tình chăm sóc khách! 💵`,4000);
      },600);
    }
    const promisedFreeRev = (S.reviews || []).find(r => (r.freeDrinkActive || r.freeDrinkNext) && !r.freeDrinkDelivered && (r.n === c.name || Math.random() < 0.35));
    if(promisedFreeRev && c.isFreeDrink){
      promisedFreeRev.freeDrinkActive = false;
      promisedFreeRev.freeDrinkNext = false;
      promisedFreeRev.freeDrinkDelivered = true;
    }
    const rv=c.isFreeDrink?{s:5,why:'great'}:(c.isFriend?{s:5,why:'friend_vip'}:stars(c,false));
    const hasStaff = STAFF.some(x => S.upg && S.upg[x.id] && !x.guard);
    let toStaff = false;
    if(hasStaff){
      // Có tỉ lệ nhân viên nộp lại tiền bo cho quán (giảm xuống 10%), còn lại nhân viên tự chia đều không trả lại cho chủ
      if(Math.random() < 0.10 || R.today.gzTipToShop){
        S.money += tip;
        S.cur.tips += tip;
        R.today.tips += tip;
        setTimeout(() => {
          // Tắt toast màu đỏ ở trên, chỉ hiện ở tab nhân viên dưới cùng
          if(isStaffActive('staffGz') && !R.isNightShift){
            R.gzLastReturnedTip = tip;
            R.gzTipMsg = `🤝 Em vừa trung thực nộp lại +${fmt(tip)} tiền bo vào két quán cho sếp! 💵`;
            R.gzTipMsgUntil = Date.now() + 7000;
            renderGzWidget();
          } else if(isStaffActive('staffSv') && R.isNightShift){
            R.svLastReturnedTip = tip;
            R.svTipMsg = `🤝 Em vừa trung thực nộp lại +${fmt(tip)} tiền bo vào két quán cho sếp! 💵`;
            R.svTipMsgUntil = Date.now() + 7000;
            renderSvWidget();
          }
        }, 300);
      } else {
        toStaff = true;
        S.cur.staffTip = (S.cur.staffTip || 0) + tip;
        S.kpiPeriodStaffTips = (S.kpiPeriodStaffTips || 0) + tip;
      }
    } else {
      S.money += tip;
      S.cur.tips += tip;
      S.totalRev += tip;
      R.today.tips += tip;
    }
    if(rv.s>=5)setTimeout(()=>sfx('star'),250);addReview(rv.s,rv.why,false,c);if(c.vip){addReview(rv.s,rv.why,false,c);addReview(rv.s,rv.why,false,c)}
    const flTxt=c.isFreeDrink?`🎁 UỐNG FREE 0đ! (Quán đã hứa tặng)  ★★★★★`:isFake?`💸 TIỀN GIẢ! 0đ (Hụt -${fmt(full)})  ${'★'.repeat(rv.s)}`:c.brat==='mac'?`+${fmt(p)} (Bill ${fmt(full)}, Lệch -${fmt(full-p)})  ${'★'.repeat(rv.s)}`:(toStaff?`+${fmt(p)} (Bill ${fmt(full)})  ${'★'.repeat(rv.s)}`:`+${fmt(p+tip)} (Bill ${fmt(full)})${extraTipBonus?` · Bo +${fmt(extraTipBonus)}!`:''}  ${'★'.repeat(rv.s)}`);
    fl(el,flTxt,false);
    if(c.isFreeDrink){
      setTimeout(()=>{
        toast(`🎁 Đã phục vụ ly nước FREE cho ${c.name} đúng như lời hứa của quán! Khách vô cùng hài lòng 5★! 🧋✨`, 4500, 1);
      }, 500);
    } else if(rv.why === 'comfort'){
      setTimeout(()=>{
        toast(`🥰 ${c.name} nhận ly nước mới tinh: "Thấy nhân viên làm túi bụi tội nghiệp quá, tặng ${rv.s}★ động viên quán nhé!" 🧋✨`, 4500, 1);
      }, 500);
    } else if(rv.why === 'sv_upsize'){
      setTimeout(()=>{
        toast(`🤩 ${c.name}: "Nhân viên làm nhầm lên size L siêu hời! Cho 5★ ngay!" 🧋✨`, 4500, 1);
      }, 500);
    } else if(rv.why === 'sv_downsize'){
      setTimeout(()=>{
        toast(`🥱 ${c.name}: "Gọi size L mà đưa size M, thấy bạn sinh viên buồn ngủ quá nên thông cảm nhận tạm, chấm 3★ nha tiệm!" 🧋`, 4500, 1);
      }, 500);
    }
    if(R.svWork && R.svWork.slotIdx === i) { R.svWork = null; renderSvWidget(); }
    R.slots[i]=null;renderStreet();renderCup();renderPanel();
  }else{
    const idx=c.done.indexOf(false);
    if(idx<0)return;
    sfx('bad');
    const o=c.cups[idx];
    wrongKinds(c,o);
    c.deliveredWrong=true;
    c.wrong=(c.wrong||0)+1;
    R.today.wrong++;
    c.pat=Math.max(.5,c.pat-c.max*.35);
    el.classList.add('angry');setTimeout(()=>el&&el.classList.remove('angry'),500);
    let full = price(o)*(c.star!=null?3:1);
    let p = 0; // Khách nhận ly nhưng QUỴT TIỀN (0đ) vì làm sai order!
    const gd=guardLv(),T=R.today;
    if(c.isFreeDrink) p = 0;
    else if(c.brat==='mac'){
      p=Math.round(full*.7/1000)*1000;
      // Khách chê sai món trả giá 70%, quán chấp nhận, bảo vệ không can thiệp bắt người trả thiếu
    } else if(gd >= 2 && Math.random() < 0.45){
      p = full;
      T.gRun = (T.gRun||0) + full;
      toast(`🛡️ Bảo vệ giữ ${c.name} lại: ngăn khách quỵt tiền ly sai order, thu hồi đủ ${fmt(full)}!`, 4000, 1);
    } else {
      toast(`💸 ${c.name} nhận ly nhưng QUỴT TIỀN (0đ) và đánh giá xấu vì sai yêu cầu!`, 4000, 1);
    }
    c.done[idx]=true;recSale(o);
    if(p > 0){ S.money+=p;R.today.rev+=p;S.totalRev+=p; }
    R.today.served++;S.served++;
    const left=c.done.filter(x=>!x).length;cup=newCup();
    if(left){
      c.order=c.cups[c.done.indexOf(false)];const st_=isSt(c);if(!st_)R.focus=c.id;
      fl(el, p > 0 ? `+${fmt(p)} (Bảo vệ đòi tiền) · còn ${left} ly` : `+0đ 💸 QUỴT TIỀN! · còn ${left} ly`, true);
      renderLane();renderCup();renderPanel();head();
      if(!st_)toast('Khách nhận ly nhưng quỵt tiền vì sai món! Còn '+left+' ly');
      return;
    }
    addReview(1,'wrong',false,c);
    if(c.vip){addReview(1,'wrong',false,c);addReview(1,'wrong',false,c)}
    const flTxt = p > 0 ? `+${fmt(p)} ★☆☆☆☆ (Bảo vệ đòi tiền ly sai món)` : `+0đ 💸 QUỴT TIỀN! ★☆☆☆☆ (Sai món)`;
    fl(el,flTxt,true);
    R.slots[i]=null;renderStreet();renderCup();renderPanel();
    toast(c.name+' đã nhận ly nhưng QUỴT TIỀN (0đ) và đánh giá 1★ vì sai món!');
  }
  head();
}
function serveOnline(j){
  const c=R.online[j];if(!c||!R.running)return;const el=document.querySelector(`[data-on="${j}"]`);
  if(level()>=2&&!cup.ice)cup.ice='Không đá';
  if(!ready())return;
  const k=c.cups.findIndex((x,q)=>!c.done[q]&&matches(cup,x));
  if(k>=0){sfx('coin');
    const o=c.cups[k];let p=price(o);
    const staffBillBonus = getStaffBillBonusTotal();
    if(staffBillBonus > 0) p = Math.round(p * (1 + staffBillBonus));
    const staffLv=(S.upgLv&&S.upgLv.staff)||0;
    const taxX2Rate = isTaxActive() ? (S.tax && S.tax.rate ? S.tax.rate * 0.20 : 0.03) : 0;
    const x2Chance = (staffLv * 0.002) + taxX2Rate;
    if(x2Chance > 0 && Math.random() < x2Chance){
      p *= 2;
      const isTaxBonus = taxX2Rate > 0 && Math.random() < (taxX2Rate / x2Chance);
      toast(isTaxBonus ? `🏛️ Nhờ đóng thuế minh bạch, đơn online may mắn x2 tiền bill! (+${fmt(p)}) 🎉` : `✨ Nhân viên làm đơn online x2 tiền lời! (+${fmt(p)}) 🎉`, 3000);
    }
    const fee=p*CFG.commission/100;
    recSale(o);S.cur.onl+=p;S.cur.fee+=fee;S.money+=p-fee;R.today.onl+=p-fee;S.totalRev+=p;R.today.fee+=fee;R.today.served++;S.served++;onCupServedProgress();c.done[k]=true;cup=newCup();
    
    const left=c.done.filter(x=>!x).length;
    if(left){c.order=c.cups[c.done.indexOf(false)];fl(el,`+${fmt(p-fee)} · còn ${left} ly`,false);renderOnline();renderCup();renderPanel();head();return}
    const rv=stars(c,true);addReview(rv.s,rv.why,true,c);fl(el,`+${fmt(p-fee)}  ${'★'.repeat(rv.s)}`,false);
    if(rv.why === 'comfort'){
      setTimeout(()=>{
        toast(`🥰 Khách online nhận ly mới chuẩn vị: "Thấy quán làm nhiều đơn vất vả tội nghiệp, chấm ${rv.s}★ an ủi nhé!" 🧋✨`, 4000);
      }, 500);
    }
    if(R.sto&&R.sto.id===c.id)R.sto=null;
    R.online.splice(j,1);renderOnline();renderCup();renderPanel();
  }else{
    const q=c.done.indexOf(false);
    if(q<0)return;
    sfx('bad');
    const o=c.cups[q];
    let p = 0, fee = 0; // Khách online khiếu nại sai món -> Quỵt tiền hoàn đơn 0đ
    wrongKinds(c,o);c.deliveredWrong=true;c.wrong=(c.wrong||0)+1;R.today.wrong++;c.pat=Math.max(.5,c.pat-c.max*.25);
    recSale(o);R.today.served++;S.served++;c.done[q]=true;cup=newCup();
    const left=c.done.filter(x=>!x).length;
    if(left){c.order=c.cups[c.done.indexOf(false)];fl(el,`+0đ 💸 QUỴT TIỀN! (Sai món) · còn ${left} ly`,true);renderOnline();renderCup();renderPanel();head();toast('Khách online khiếu nại sai món từ chối trả tiền! Còn '+left+' ly');return}
    addReview(1,'wrong',true,c);fl(el,`+0đ 💸 QUỴT TIỀN! ★☆☆☆☆ (Sai món)`,true);
    if(R.sto&&R.sto.id===c.id)R.sto=null;
    R.online.splice(j,1);renderOnline();renderCup();renderPanel();
    toast('Khách online khiếu nại app quỵt tiền (0đ) và đánh giá 1★ vì sai món!');
  }
  head();
}
function recSale(o){const sl=S.cur.sales,add=(k,a)=>{const x=sl[k]=sl[k]||{q:0,a:0};x.q++;x.a+=a};
  add(o.base,sv(S.sell,o.base));if(o.flav)add(o.flav,sv(S.sell,o.flav));o.tops.forEach(t=>add(t,sv(S.sell,t)));if(o.cheese)add('cheese',sv(S.sell,'cheese'));if(o.size==='L')add('L',sv(S.sell,'L'))}
const recRev=r=>Object.values(r.sales).reduce((a,x)=>a+x.a,0)+r.tips+(r.gift||0);
const recCost=r=>r.rent+r.util+(r.wage||0)+(r.bad||0)+(r.loanInt||0)+r.fee+r.tax+r.equip.reduce((a,x)=>a+x.v,0)+Object.values(r.ing).reduce((a,x)=>a+x.v,0);
function ready(quiet=false){const lv=level(),miss=!cup.base?'loại trà':!cup.size?'size':lv>=2&&!cup.sugar?'đường':lv>=2&&!cup.ice?'đá':null;if(miss){if(!quiet&&!isPriorityStaffWorking())toast('Chưa chọn '+miss);return false}return true}
const needs=o=>[o.base,...(o.flav?[o.flav]:[]),...o.tops,...(o.cheese?['cheese']:[]),'cup',...(level()>=2&&o.ice&&o.ice!=='Không đá'?['ice']:[]),...(level()>=2&&o.sugar&&o.sugar>0?['sugar']:[])];
const missing=o=>needs(o).filter(k=>!qty(k)&&!(cup&&cup.used&&(k==='cup'||cup.base===k||cup.flav===k||cup.tops.includes(k)||(k==='cheese'&&cup.cheese)||(k==='ice'&&cup.iceN)||(k==='sugar'&&cup.sugarN))));
function declineOnline(j){const c=R.online[j];if(!c)return;if(isSto(c))R.sto=null;const m=missing(c.order);R.online.splice(j,1);R.today.lost++;
  addReview(rnd([2,2,3]),'soldoutOnl',true,c,m.length?low(ITEMS[m[0]].n):null);renderOnline();renderLane();renderPanel()}
function decline(i){const c=R.slots[i];if(!c)return;const m=missing(c.order),got=c.done.filter(Boolean).length;R.slots[i]=null;R.today.lost++;
  const why=got?'soldoutPartial':(m.length?'soldout':'refused');
  addReview(rnd(got?[3,3,4]:[2,2,3]),why,false,c,m.length?low(ITEMS[m[0]].n):null);renderStreet()}
/* khách hãm / tính cách khách hàng đặc biệt */
const guardLv=()=>0;/* bảo vệ: chưa dùng */
const BRATS={
  hoi:{n:'Khách hối',c:'#e2574c'},
  doi:{n:'Khách hay đổi ý',c:'#9b6bd1'},
  mac:{n:'Khách trả giá',c:'#e8792f'},
  kho:{n:'Khách khó tính',c:'#6b4a36'},
  voi:{n:'Khách vội',c:'#d9534f'},
  checkin:{n:'Khách sống ảo',c:'#e83e8c'},
  chuyen:{n:'Khách buôn chuyện',c:'#17a2b8'},
  haophong:{n:'Khách hào phóng',c:'#28a745'},
  bung:{n:'',c:''}
};
function pickBrat(){if(S.day<2)return null;const bad=S.mood==='kho'&&S.evDay===S.day,good=S.mood==='vui'&&S.evDay===S.day;
  const isRich = false;
  let threshold = isRich ? 0.65 : (bad?.55:good?.18:.32);
  if(isTaxOverdue()){
    threshold = Math.min(0.85, threshold * 1.5);
  } else if(isTaxActive()){
    threshold *= (1 - (S.tax.rate || 0.15) * 0.5);
  }
  if(Math.random() > threshold) return null;
  const weights = isRich?[2,1,5,2,1,1,1,1,6]:bad?[4,2,3,5,3,1,1,1,1]:good?[1,1,1,1,2,3,3,4,0]:[2,2,2,2,2,2,2,2,1];
  if(isTaxOverdue()){
    weights[8] += 4; // Tăng bùng tiền
    weights[3] += 3; // Tăng khách khó tính
    weights[0] += 2; // Tăng khách hối
  } else if(isTaxActive()){
    weights[8] = Math.max(0, weights[8] - 1); // Giảm bùng tiền
  }
  return wpick(['hoi','doi','mac','kho','voi','checkin','chuyen','haophong','bung'], weights);
}
function bratChange(c){const o=c.order;if(c.changed||!o)return;c.changed=true;const tops=TOP_KEYS.filter(k=>S.unlocked[k]&&qty(k)>0&&!o.tops.includes(k)&&ITEMS[k].g!=='foam'&&sv(S.sell,k)<=ADD_CAP);
  let msg;if(tops.length&&o.tops.length&&Math.random()<.6){const old=o.tops[0],nw=rnd(tops);o.tops[0]=nw;msg=`đổi ${low(ITEMS[old].n)} sang ${low(ITEMS[nw].n)}`}
  else{o.size=o.size==='L'?'M':'L';msg=`đổi sang size ${o.size}`}
  const qw=$('q3want');if(qw)qw._o=null;const sy=$('q3say');if(sy)sy._t=null;renderLane();renderPanel()}
function rushMul(){const el=1-R.t/(dayLen()*60);/* 0 = 11:00, 1 = 22:00 */
  if(el<.05)return .8;if(el<.25)return 1.45;if(el<.33)return .9;if(el<.55)return .5;if(el<.75)return 1.4;if(el<.85)return .9;return .7}
function tick(){
  const dt=.1;
  if(R.isNightShift){
    R.nightT -= dt;
    R.spawnT -= dt;
    if(R.spawnT <= 0 && R.nightT > 4 && !R.closing){
      spawn();
      R.spawnT = (4.2 / Math.max(0.7, traffic() * 0.9)) * (0.65 + Math.random() * 0.4); 
    }
    const tint = $('q3tint');
    if(tint) tint.style.background = 'rgba(15, 23, 42, 0.45)';
  } else {
    R.t-=dt;R.spawnT-=dt;
    if(R.spawnT<=0&&R.t>5&&!R.closing){spawn();R.spawnT=(3.2/Math.max(0.8, traffic())/rushMul())*(.65+Math.random()*.45)}
    if(onlineActive()){R.onT-=dt;if(R.onT<=0&&R.t>Math.max(8,dayLen()*60*30/660)){spawnOnline();const onlLvMul=1+((S.upgLv&&S.upgLv.onl)||0)*0.01;const curEv__=ev();const wMul__=(curEv__&&EVS[curEv__.id])?EVS[curEv__.id].mul:1;const wOnlMul__=(curEv__&&EVS[curEv__.id]&&EVS[curEv__.id].onlMul)?EVS[curEv__.id].onlMul:(evIs('rain')?1.8:(evIs('storm')?2.2:1.0));const tOnl__=(traffic()/Math.max(0.2,wMul__))*wOnlMul__;R.onT=18/(tOnl__*onlLvMul)/onMul()*(.6+Math.random()*.4)}
      if(R.bigQ&&R.bigQ.length&&R.t>8){const tot0=dayLen()*60;R.bigQ=R.bigQ.filter(q=>!(R.t<tot0*(1-q.at)&&spawnBig(q)))}}
    const tint = $('q3tint');
    if(tint && !evIs('rain') && !evIs('storm')) tint.style.background = '';
  }
  let ch=false,cho=false;
  R.tk=(R.tk||0)+1;const upd=R.tk%2===0,upd1s=R.tk%10===0;
  R.slots.forEach(c=>{if(c&&c.brat==='doi'&&!c.changed&&c.pat<c.max*.72)bratChange(c)});
  R.slots.forEach((c,i)=>{if(!c)return;
    const patSpeed = isTaxOverdue() ? (dt * 1.25) : dt;
    const karinGuardRate = R.karinGuardBuff ? 0.75 : 1.0;
    c.pat -= patSpeed * karinGuardRate;
    if(c.pat<=0){R.slots[i]=null;R.today.lost++;const st=Math.random()<.3?2:1;addReview(st,'timeout',false,c);if(c.vip){addReview(1,'timeout',false,c);addReview(1,'timeout',false,c)}ch=true;}else if(upd)updPat(c)});
  R.online=R.online.filter(c=>{c.pat-=dt;if(c.pat<=0){R.today.lost++;addReview(1,'late',true,c);cho=true;if(R.sto&&R.sto.id===c.id)R.sto=null;return false}if(upd)updPat(c);return true});
  if(upd){const curF=focusCust();if(curF)updPat(curF);}
  if(ch)renderStreet();if(cho)renderOnline();
  staffTick(dt);staffOnTick(dt);staffGzTick(dt);staffBuyerTick(dt);staffSvTick(dt);
  if(R.party && S.partyContract && R.party.served < R.party.cups && (isStaffActive('staff0') || isStaffActive('staff1') || isStaffActive('staff3'))){
    R._staffPartyTimer = (R._staffPartyTimer || 0) + dt;
    if(R._staffPartyTimer >= 18){
      R._staffPartyTimer = 0;
      if(Math.random() < 0.45){
        onCupServedProgress();
        fl($('lane'), '🧑‍🍳 Nhân viên pha chế đóng phụ 1 ly tiệc! 📦', false);
      }
    }
  }
  if(S && S.upg && S.upg.staffMkt && (!R._lastTaxCheck || Date.now() - R._lastTaxCheck > 15000)){
    R._lastTaxCheck = Date.now();
    checkMktAutoPayTax();
  }
  if(R.staffLate && R.t < (dayLen()*60 * 0.5)){
    Object.keys(R.staffLate).forEach(sid => {
      const ex = R.staffLate[sid];
      if(ex && !ex._arrived){
        ex._arrived = true;
        const sName = (S.staffNames && S.staffNames[sid]) || (STAFF.find(x => x.id === sid)||{}).n || 'Nhân viên';
        toast(`🏃‍♂️ ${sName} đã có mặt tại quán sau khi ${ex.reason}! Sẵn sàng vào quầy hỗ trợ! 🧋✨`, 5000, 1);
        if(sid === 'staffGz') renderGzWidget();
        renderPanel();
      }
    });
  }
  if(upd1s&&S.upg.staffGz)renderGzWidget();
  if(upd1s&&S.upg.staffBuyer)renderBuyerWidget();
  if(upd1s&&S.upg.staffSv)renderSvWidget();
  if(R.gzStolenRecent && R.gzCatchExpiresAt){
    const rem = Math.max(0, Math.ceil((R.gzCatchExpiresAt - Date.now()) / 1000));
    const chip = document.querySelector('.gz-poke-chip.catch-active');
    if(chip && chip._rem !== rem){ chip._rem = rem; chip.textContent = `🚨 Bắt quả tang (${rem}s)`; }
    const pill = document.querySelector('.gz-pill-stole');
    if(pill && pill._rem !== rem){ pill._rem = rem; pill.textContent = `🤫 Đang đá bill (${rem}s)!`; }
  }
  const tot=dayLen()*60;
  if(evIs('students')&&!R.burstDone&&R.t<tot*.55&&!bigOrder()){R.burstDone=true;toast('Nhóm học sinh tan học ghé quán!');for(let n=0;n<4;n++)spawn();R.spawnT=2}
  if(R.starAt&&R.t<R.starAt){R.starAt=0;R.starPend=true;R.spawnT=Math.min(R.spawnT,1)}
  if(evIs('reviewer')&&!R.vipDone&&R.t<tot*.6){R.vipDone=true;R.vipPending=true;R.spawnT=Math.min(R.spawnT,1)}

  // Mốc 22:00: nếu có nhân viên SV cuối tháng thì chuyển sang ca đêm bán đến sáng, ngược lại đóng cửa
  if(!R.isNightShift && R.t<=0 && !R.closing){
    if(isStaffActive('staffSv')){
      R.isNightShift = true;
      R.nightTot = 80;
      R.nightT = R.nightTot;
      R.spawnT = 2.0;
      // Gen Z hết ca đi về, nhường chỗ cho SV ca đêm
      R.gzWork = null;
      R.gzSulking = false;
      renderGzWidget();
      renderSvWidget();
      const pName = (S.staffNames && S.staffNames.staffSv) || 'Sinh viên cuối tháng';
      toast(`🌙 22:00: Gen Z hết ca đi về! ${pName} vào ca đêm, quán bán xuyên đêm đến sáng! 🧑‍🎓✨`, 6000, 1);
    } else {
      R.closing=true;R.otT=0;toast('22:00 đóng cửa! Làm nốt cho khách đang chờ nhé',4000,1);renderLane();
    }
  }

  // Mốc 6:00 sáng ca đêm kết thúc
  if(R.isNightShift && R.nightT<=0 && !R.closing){
    R.closing = true;
    R.otT = 0;
    R.spawnT = 999999;
    toast('🌅 06:00 sáng rồi! Hết ca đêm, không nhận thêm khách. Nhân viên hoàn thành nốt công việc để đóng cửa nhé!', 5000, 1);
    renderLane();
  }

  const staffBusy = (R.svWork != null) || (R.buyerTrip != null) || (R.gzWork != null) || (R.st2 != null) || (R.sto != null) || (R.helping === true);
  if(R.closing){
    R.closingTimer = (R.closingTimer || 0) + dt;
    // Tự động kết thúc ngày khi hết khách và nhân viên hoàn tất nốt việc
    if(!R.slots.some(Boolean) && !R.online.length && !staffBusy){
      endDay();
      return;
    }
    // Cơ chế an toàn tuyệt đối: sau 35s đóng cửa, nếu còn kẹt khách không thể làm được thì giải phóng để đóng sổ
    if(R.closingTimer > 35){
      R.closingTimer = 0;
      R.gzWork = null;
      R.st2 = null;
      R.sto = null;
      R.helping = false;
      R.slots.forEach((c, idx) => { if(c) decline(idx); });
      R.online.forEach((_, idx) => declineOnline(idx));
      endDay();
      return;
    }
  }
  head();
}
function pauseGame(){
  if(!R.running||R.paused)return;R.paused=true;clearInterval(timer);
  const left=Math.ceil(R.t),waiting=R.slots.filter(Boolean).length+R.online.length;
  ask(`<div class="pbig">${ico('pause')}</div><h2>Tạm dừng</h2><div class="sndrow"><button class="sbtn ghost" id="pMus">Nhạc: ${AU.mus?'Bật':'Tắt'}</button><button class="sbtn ghost" id="pSnd">Âm thanh: ${AU.on?'Bật':'Tắt'}</button></div>`,
    [['▶ Chơi tiếp',resumeGame,1],['Đóng cửa hôm nay',askClose,1]]);
  $('pMus').onclick=()=>{AU.mus=!AU.mus;saveAu();au();musSync();$('pMus').textContent='Nhạc: '+(AU.mus?'Bật':'Tắt')};
  $('pSnd').onclick=()=>{AU.on=!AU.on;saveAu();$('pSnd').textContent='Âm thanh: '+(AU.on?'Bật':'Tắt')};
}
function askClose(){
  const waiting=R.slots.filter(Boolean).length+R.online.length;
  ask(`<div class="pbig">${ico('moon')}</div><h2>Đóng cửa hôm nay?</h2><p>Quán nghỉ sớm và chuyển sang tổng kết ngày.${waiting?` ${waiting} khách đang chờ sẽ ra về.`:''}</p>`,
    [['Quay lại',pauseAgain],['Đóng cửa',closeEarly,1]])}
function pauseAgain(){R.paused=false;pauseGame()}
function closeEarly(){if(!R.running)return;R.online=[];R.t=0;endDay()}
function resumeGame(){if(!R.running||!R.paused)return;R.paused=false;clearInterval(timer);timer=setInterval(tick,100);head()}
document.addEventListener('gesturestart',e=>e.preventDefault());
document.addEventListener('visibilitychange',()=>{if(document.hidden)pauseGame()});
const cropBg=(x,y,w,h,dw)=>{const k=dw/w;return `<div class="crop" style="width:${dw}px;height:${Math.round(h*k)}px;background:url(img/bg.jpg) ${-x*k}px ${-y*k}px/${768*k}px ${1376*k}px no-repeat"></div>`};
function lvIntro(lv){
  if(lv===2)return `<h2>Từ hôm nay: đường và đá</h2><p>Khách sẽ chọn mức đường và đá. Làm sau khi rót trà và thêm topping.</p>${cropBg(511,955,248,178,230)}
    <div class="lvs"><div><b>Nước đường</b> bấm 1 lần = 30%, 2 lần = 50%, 3 lần = 70%, 4 lần = 100%</div><div><b>Đá viên</b> xúc 1 lần = ít đá, 2 lần = đá bình thường. Không xúc = không đá</div><div><b>Lỡ bấm dư</b> chạm xô inox để đổ ly, làm lại từ đầu</div></div>`;
  return `<h2>Từ hôm nay: đơn nhiều ly, ly tới 4 topping</h2><p>Khách có thể gọi tới 4 loại topping trong một ly (chỉ 1 loại foam), chạm lần lượt từng khay khách gọi. Một khách có thể mua 2–5 ly. Bấm Ly 1, Ly 2… trên bóng thoại để xem từng ly. Pha xong ly nào thì dán nắp giao ly đó, khách chờ lâu hơn cho đơn nhiều ly. Đơn từ 3 ly thì khách khác chờ bạn làm xong mới ghé.</p>`}

/* ===== HÀM HỖ TRỢ ĐƠN TIỆC TRONG CA ===== */
function renderPartyWidget(){
  const w = $('q3partyWrap');
  if(!w) return;
  if(!R.running || !R.party || !S.partyContract || !S.partyContract.accepted){
    w.style.display = 'none';
    return;
  }
  w.style.display = 'block';
  const cur = R.party.served || 0;
  const tot = R.party.cups || 1;
  const pct = Math.min(100, Math.round((cur / tot) * 100));
  const isDone = cur >= tot;

  const fill = $('q3partyFill');
  if(fill){
    fill.style.width = pct + '%';
    if(isDone) fill.style.background = 'linear-gradient(90deg, #22c55e, #16a34a)';
    else fill.style.background = 'linear-gradient(90deg, #f97316, #eab308)';
  }
  const cnt = $('q3partyCount');
  if(cnt){
    cnt.innerHTML = isDone ? `✅ <b>${cur}/${tot} ly (Đã đủ!)</b>` : `<b>${cur}/${tot} ly</b> (${pct}%)`;
    cnt.style.color = isDone ? '#15803d' : '#92400e';
  }
  const title = $('q3partyTitle');
  if(title && S.partyContract){
    title.textContent = isDone ? `🎉 Đã đủ ${tot} ly cho ${S.partyContract.typeLabel}!` : `🎉 ${S.partyContract.title}`;
  }
}

function packCupForParty(){
  if(!R.running || !R.party || !S.partyContract) return;
  if(R.party.served >= R.party.cups){
    toast('🎉 Đơn tiệc đã đủ số lượng ly yêu cầu rồi! Rất xuất sắc!');
    return;
  }
  if(!ready()){
    toast('👉 Hãy làm một ly trà trên thớt (chọn ly, rót trà, đường đá...) rồi bấm đóng gói nhé!');
    return;
  }
  sfx('coin');
  let p = price(cup);
  const taxX2Rate = isTaxActive() ? (S.tax && S.tax.rate ? S.tax.rate * 0.20 : 0.03) : 0;
  if(taxX2Rate > 0 && Math.random() < taxX2Rate){
    p *= 2;
    toast(`🏛️ Hợp đồng tiệc nhận bảo trợ thuế: x2 tiền ly tiệc! (+${fmt(p)}) 🎉`, 3000);
  }
  recSale(cup);
  S.money += p;
  R.today.rev += p;
  S.totalRev += p;
  R.today.served++;
  S.served++;

  R.party.served++;
  S.partyContract.served = R.party.served;

  fl($('lane'), `📦 Đóng gói +1 ly tiệc! (+${fmt(p)})`, false);

  if(R.party.served >= R.party.cups && !R.party.done){
    R.party.done = true;
    sfx('lvup');
    toast(`🎉 CHÚC MỪNG! Đã hoàn thành đủ ${R.party.cups} ly cho hợp đồng tiệc! Kết ca sẽ nhận thưởng lớn! 🌟`, 5000, 1);
  }

  cup = newCup();
  renderCup();
  renderPartyWidget();
}

function onCupServedProgress(){
  if(R.party && S.partyContract && S.partyContract.accepted && R.party.served < R.party.cups){
    R.party.served++;
    S.partyContract.served = R.party.served;
    renderPartyWidget();
    if(R.party.served >= R.party.cups && !R.party.done){
      R.party.done = true;
      sfx('lvup');
      toast(`🎉 CHÚC MỪNG! Đã hoàn thành đủ ${R.party.cups} ly cho tiệc! Kết ca nhận thưởng lớn! 🌟`, 5000, 1);
    }
  }
}

function startDay(){
  cup=newCup();
  Object.assign(R,{s1n:0,s1bad:(()=>{const n=rnd([0,1,2]),a=[];while(a.length<n){const x=2+Math.floor(Math.random()*15);if(!a.includes(x))a.push(x)}return a})(),dayLen:S.dayLen||CFG.dayMin,running:true,t:(S.dayLen||CFG.dayMin)*60,spawnT:.8,onT:6,slots:S.upg.floor2?[null,null,null,null,null,null,null,null,null,null]:(S.upg.slot4?[null,null,null,null]:[null,null,null]),online:[],
    st2:null,staffPouring:false,closing:false,otT:0,helping:false,coachDone:false,firstDone:false,burstDone:false,vipDone:false,vipPending:false,
    isNightShift:false,nightT:0,nightTot:80,svWork:null,svMsg:'',svStealIntent:false,svStealTriggered:false,svStealCount:0,svStealClicksNeeded:0,svStealClicksDone:0,svStealTimer:0,
    gzSulking:false,gzCheers:0,gzCheeredToday:false,gzWork:null,gzSupervised:0,gzStolenRecent:false,gzMsg:'',gzCaughtCount:0,karinGuardBuff:0,
    buyerTrip:null,buyerTripsToday:0,buyerQueue:[],buyerScanT:0,
    today:{used:{},rev:0,onl:0,fee:0,tips:0,cogs:0,served:0,lost:0,wrong:0,priceLost:0,stars:[],gzStolen:0,gzTipToShop:false,gzStealAttempts:0,gzStealSuccess:false,buyerStolen:0,buyerTrips:0}});
  R.sto=null;planBig();
  if(S.partyContract && S.partyContract.day === S.day && S.partyContract.accepted){
    R.party = {
      cups: S.partyContract.cups,
      served: S.partyContract.served || 0,
      done: (S.partyContract.served || 0) >= S.partyContract.cups
    };
  } else {
    R.party = null;
  }
  {R.starAt=0;if(S.day>=3){let x=S.starSch;if(!x||S.day>x.end)x=S.starSch={end:S.day+29,day:S.day+Math.floor(Math.random()*30)};if(x.day===S.day&&!x.done)R.starAt=(S.dayLen||CFG.dayMin)*60*(.35+Math.random()*.35)}}
  renderSell();window.scrollTo(0,0);musSync();
  R.paused=false;clearInterval(timer);timer=setInterval(tick,100);
  const e0=ev();if(e0)setTimeout(()=>toast(EVS[e0.id].n+': '+evText(e0)),600);
  if(S.upg.staffGz&&(evIs('rain')||evIs('hot'))){setTimeout(()=>{if(R.running)gzWeatherComplain()},700)}
  const lv=level();if(lv>1&&(S.seenLv||1)<lv){S.seenLv=lv;save();R.paused=true;clearInterval(timer);sfx('lvup');ask(lvIntro(lv),[['Đã hiểu, mở cửa',resumeGame,1]])}
  coach();
}
function endDay(){
  clearInterval(timer);clearTimeout(R._gzCatchTimer);if(R._fakeIntervalTimer){clearInterval(R._fakeIntervalTimer);R._fakeIntervalTimer=null;}R.running=false;pourSnd(false);clearStaffPouring();
  if(R.fakeCase && R.fakeCase.suspect){
    const pendingCase = R.fakeCase;
    R.fakeCase = null;
    if(typeof renderFakeAlertBtn==='function') renderFakeAlertBtn();
    ask(`
      <div class="pbig">🚨👮‍♂️</div>
      <h2 style="color:#dc2626;margin:4px 0 8px;font-size:1.3rem;font-weight:800;">CÔNG AN PHƯỜNG ĐẾN ĐIỀU TRA</h2>
      <p style="font-size:0.92rem;line-height:1.55;color:var(--ink);">
        Trước khi đóng sổ kết toán ngày hôm nay, Công an phường đã trích xuất camera vụ khách dùng <b>TIỀN GIẢ</b> (đơn: <b>${esc(pendingCase.suspect.order)}</b>, thiệt hại: <b style="color:#ef4444;">-${fmt(pendingCase.suspect.loss)}</b>)!<br>Bạn có muốn cùng Công An nhận diện nghi phạm để thu hồi tiền và nhận thưởng <b>+1.000.000đ</b> không?
      </p>
    `, [
      ['🚨 Nhận diện & Báo Công An ngay', ()=>{
        R.fakeCase = pendingCase;
        reportFakeMoneyPolice(true);
      }, 1],
      ['Bỏ qua & Đóng sổ ngày', ()=>{
        finishEndDay();
      }]
    ]);
    return;
  }
  finishEndDay();
}
function finishEndDay(){
  sfx('lvup');const T=R.today,r=S.cur,fc=fixed();
  R.fakeCase=null;R.gzStolenRecent=false;R.gzLastStolenBill=0;R.gzStolenCustId=null;if(typeof renderFakeAlertBtn==='function') renderFakeAlertBtn();
  R.staffDayOff = null; R.staffLate = null;
  let gzQuitNotice = false;
  if(R.gzSulking && S.upg.staffGz){
    // Qua đêm ngủ đủ giấc là tự hết dỗi, không đuổi việc nhân viên
    R.gzSulking = false;
    R.gzCheers = 0;
  }
  R.slots.forEach(c=>{if(c)T.lost++});
  const waste=expireStock();syncFlav();waste.forEach(x=>r.waste[x.k]={q:x.q,v:x.v});S.used=T.used;
  r.rent=fc.rent;r.util=fc.util;r.served=T.served;r.lost=T.lost+T.priceLost;r.starSum=T.stars.reduce((a,b)=>a+b,0);r.starN=T.stars.length;
  r.gzStolen=T.gzStolen||0;
  r.buyerStolen=T.buyerStolen||0;
  r.buyerTrips=T.buyerTrips||0;
  const yi=Math.floor((S.day-1)/360);if(S.taxYear!==yi){S.taxYear=yi;S.yearRev=0}
  const rev=recRev(r)+r.onl*0,before=S.yearRev;S.yearRev+=rev;
  S.bestDayRev = Math.max(S.bestDayRev || 0, rev);
  if(window.BanBe && window.BanBe.checkChallengeEnd) window.BanBe.checkChallengeEnd(rev);
  S.giftsReceivedToday = 0;
  S.giftsDay = S.day;
  S.friendBuff = null;
  const taxable=Math.max(0,S.yearRev-Math.max(CFG.taxThreshold,before));r.tax=Math.round(taxable*(CFG.vat+CFG.pit)/100);
  r.ev=ev()?{id:ev().id,k:ev().k}:null;{const otMin=R.otT<0?-R.otT/(dayLen()*60)*660:0;r.ot=S.upg.staff2&&otMin>0?Math.ceil(otMin/30-1e-9)*20000:0}r.wage=wageDay()+r.ot;
  debts().forEach(L=>{const x=S[L.id];r.loanInt=(r.loanInt||0)+x.int;r.loanOut=(r.loanOut||0)+x.pay;S.money-=x.pay+x.int;x.left--;if(!x.left)S[L.id]=null});S.money-=(r.rent+r.util+r.tax+r.wage);/* Vẫn trừ tiền lương nhân viên vào bill mỗi ngày */
  /* bảo vệ thu lại tiền của khách quỵt trước khi tổng kết (không đòi khách trả thiếu) */
  const gMac=0, gRun=T.gRun||0;
  r.guard=gRun;
  S.money+=r.guard;

  let partyResultHtml = '';
  if(S.partyContract && S.partyContract.day === S.day && S.partyContract.accepted){
    const pc = S.partyContract;
    const served = (R.party && R.party.served != null) ? R.party.served : (pc.served || 0);
    pc.served = served;
    if(served >= pc.cups){
      pc.completed = true;
      const finalBonus = pc.payout + pc.bonus;
      S.money += finalBonus;
      r.partyPayout = finalBonus;
      T.rev = (T.rev || 0) + finalBonus;
      addReview(5, 'party', false, null, { name: pc.client, partyTitle: pc.title, cups: pc.cups });
      partyResultHtml = `<div style="background:linear-gradient(135deg,#f0fdf4,#dcfce7);border:2px solid #22c55e;border-radius:12px;padding:8px 12px;margin:8px 0;text-align:left;">
        <div style="font-weight:800;color:#15803d;font-size:0.92rem;">🎉 HOÀN THÀNH HỢP ĐỒNG: ${esc(pc.title)}</div>
        <div style="font-size:0.82rem;color:#166534;margin-top:2px;">
          Giao đủ <b>${served}/${pc.cups} ly trà</b>. Thanh toán nốt <b>+${fmt(pc.payout)}</b> + Thưởng hợp đồng <b>+${fmt(pc.bonus)}</b> = <b style="color:#15803d;font-size:0.98rem;">+${fmt(finalBonus)}</b>! Nhận đánh giá 5★ VIP! ⭐⭐⭐⭐⭐
        </div>
      </div>`;
    } else {
      pc.completed = false;
      const penalty = Math.round(pc.deposit * 0.5);
      S.money = Math.max(0, S.money - penalty);
      r.partyPenalty = penalty;
      addReview(1, 'party_fail', false, null, { name: pc.client, partyTitle: pc.title, served, cups: pc.cups });
      partyResultHtml = `<div style="background:linear-gradient(135deg,#fef2f2,#fee2e2);border:2px solid #ef4444;border-radius:12px;padding:8px 12px;margin:8px 0;text-align:left;">
        <div style="font-weight:800;color:#b91c1c;font-size:0.92rem;">⚠️ GIAO THIẾU HỢP ĐỒNG: ${esc(pc.title)}</div>
        <div style="font-size:0.82rem;color:#991b1b;margin-top:2px;">
          Chỉ giao được <b>${served}/${pc.cups} ly</b>. Bị trừ phạt vi phạm hợp đồng <b style="color:#b91c1c;">-${fmt(penalty)}</b> và nhận đánh giá 1★! 😢
        </div>
      </div>`;
    }
  }
  const cost=recCost(r),profit=rev-cost,avg=r.starN?r.starSum/r.starN:0,wv=waste.reduce((a,x)=>a+x.v,0);
  S.history.push(r);if(S.history.length>400)S.history.shift();
  const dayOpCost = (r.rent||0) + (r.util||0) + (r.wage||0) + (r.bad||0) + (r.loanInt||0) + (r.fee||0) + (r.tax||0) + Object.values(r.ing||{}).reduce((a,x)=>a+(x.v||0),0);
  const dayOpProfit = Math.max(0, rev - dayOpCost);
  S.totalProfit = Math.max(0, (S.totalProfit || 0) + dayOpProfit);
  const broke=S.money<0;
  let justOnline=false;if(!broke){
    S.best=Math.max(S.best||0,S.day);
    S.day++;
    S.cur=newRec(S.day);
    rollDay(S.day);
    if(!S.online&&onlineCheck().every(x=>x.ok)){
      S.online=true;
      S.apps=S.apps||{};
      S.apps.sp=true;S.apps.tt=true;S.apps.be=true;S.apps.gr=true;
      S.tablets=Math.max(1,S.tablets||0);
      justOnline=true;
    }
    S.staffSalesDays = (S.staffSalesDays || 0) + 1;
    // Tà Tưa Bank: tính chu kỳ ngày hoạt động và lãi kép 1%/ngày
    initBankState();
    checkMktAutoPayTax();
    checkTaxBankPenalty();
    checkReset5StarRating();
    if(S.bank && S.bank.balance > 0){
      S.bank.daysPassed = (S.bank.daysPassed || 0) + 1;
      const compoundInterest = Math.round(S.bank.balance * 0.01);
      S.bank.balance += compoundInterest;
      S.bank.totalInterest = (S.bank.totalInterest || 0) + compoundInterest;
      toast(`🏦 Tà Tưa Bank: Lãi kép 1%/ngày sinh lời +${fmt(compoundInterest)} (Tổng dư: ${fmt(S.bank.balance)})! 🎉`, 5000);
    }
    S.kpiPeriodStats = S.kpiPeriodStats || {};
    S.kpiPeriodTotalRev = (S.kpiPeriodTotalRev || 0) + rev;
    S.kpiPeriodTotalBills = (S.kpiPeriodTotalBills || 0) + Math.round((r.served || 0) * 28000);
    STAFF.forEach(st => {
      if(S.hired && S.hired[st.id]){
        const ps = S.kpiPeriodStats[st.id] = S.kpiPeriodStats[st.id] || { daysWorked: 0, served: 0, errors: 0, wageEarned: 0 };
        if(S.upg && S.upg[st.id]){
          ps.daysWorked = (ps.daysWorked || 0) + 1;
          const baseWageRate = CFG[st.wage] || (st.id === 'staff2' ? CFG.wage2 : (st.id === 'staffGz' ? CFG.wageGz : (st.id === 'staffMkt' ? CFG.wageMkt : (st.id === 'staffBuyer' ? CFG.wageBuyer : (st.id === 'staffNigh' ? CFG.wageNigh : CFG.wage0)))));
          ps.wageEarned = (ps.wageEarned || 0) + baseWageRate + (st.id === 'staff2' ? (r.ot || 0) : 0);
          const servedCups = st.id === 'staff2' ? Math.round(r.served * 0.45)
            : st.id === 'staffOn' ? Math.round(r.served * 0.35)
            : st.id === 'staffGz' ? Math.round(r.served * 0.6)
            : st.id === 'staffBuyer' ? Math.round(r.served * 0.4)
            : Math.round(r.served * 0.3);
          ps.served = (ps.served || 0) + servedCups;
          if(st.id === 'staffGz' && r.gzStolen) ps.errors = (ps.errors || 0) + 1;
          if(st.id === 'staff0' && R.s1bad && R.s1bad.length) ps.errors = (ps.errors || 0) + 1;
          if(st.id === 'staffBuyer' && r.buyerStolen) ps.errors = (ps.errors || 0) + Math.max(1, Math.round(r.buyerStolen / 25000));
        }
      }
    });
  }
  save();autoBak();
  const nextLv=!broke&&levelOf(S.day)>levelOf(S.day-1)?levelOf(S.day):0;
  const showCard=()=>{
  $('card').innerHTML=`<div class="pbig">${broke?ico('sad'):ico('moon')}</div><h2>${broke?'Phá sản':'Hết ngày '+r.day}</h2>
  <div class="kpis"><div><b>${r.served}</b>🧋</div><div><b>${r.lost}</b>${ico('angry')}</div><div><b>${avg?avg.toFixed(1).replace('.',','):'–'}</b>${ico('star')}</div></div>
  ${partyResultHtml}
  <div class="ledger">
    <div><span>${ico('price')} Doanh thu</span><span class="revc">+${fmt(rev)}</span></div>
    ${r.partyPayout ? `<div><span class="wl">🎉 Thưởng hợp đồng tiệc</span><span class="revc">+${fmt(r.partyPayout)}</span></div>` : ''}
    ${r.partyPenalty ? `<div><span class="wl">⚠️ Phạt giao thiếu đơn tiệc</span><span class="neg">−${fmt(r.partyPenalty)}</span></div>` : ''}
    <div><span>${ico('receipt')} Chi phí</span><span class="neg">−${fmt(cost)}</span></div>
    ${r.wage-(r.ot||0)?`<div><span class="wl">${ico('people')} Lương nhân viên</span><span class="wl">${fmt(r.wage-(r.ot||0))}</span></div>`:''}${r.ot?`<div><span class="wl">${ico('clock')} Tăng ca nhân viên pha chế</span><span class="wl">${fmt(r.ot)}</span></div>`:''}${r.bad?`<div><span class="wl">${ico('warn')} Sự cố mất tiền</span><span class="wl">${fmt(r.bad)}</span></div>`:''}
    ${r.loanInt?`<div><span class="wl">${ico('money')} Trả nợ (lãi ${fmt(r.loanInt)})</span><span class="wl">${fmt(r.loanOut+r.loanInt)}</span></div>`:''}
    ${r.guard?`<div><span class="wl">${ico('people')} Bảo vệ thu lại</span><span class="wl">+${fmt(r.guard)}</span></div>`:''}
    ${r.staffTip?`<div><span class="wl">${ico('people')} Tip nhân viên giữ (quán không nhận)</span><span class="wl">${fmt(r.staffTip)}</span></div>`:''}
    ${r.gzStolen?`<div><span class="wl">🤫 Gen Z đá bill (thiếu giám sát)</span><span class="neg">−${fmt(r.gzStolen)}</span></div>`:''}
    ${r.buyerStolen?`<div><span class="wl">🛵 Đi chợ khai gian (${r.buyerTrips||1} chuyến)</span><span class="neg">−${fmt(r.buyerStolen)}</span></div>`:''}
    ${gzQuitNotice?`<div><span class="wl">💔 Nhân viên Gen Z</span><span class="neg">Nghỉ việc do dỗi cả ngày không được dỗ (cần thuê lại 1tr)</span></div>`:''}
    ${r.svPawnedLoss?`<div><span class="wl">💸 Chuộc đồ SV cầm (${fmt(r.svPawnedLoss)})</span><span class="neg">−${fmt(r.svPawnedLoss)}</span></div>`:''}
    ${T.fakeLoss?`<div><span class="wl">💸 Khách đưa tiền giả (${T.fakeCount||1} đơn)</span><span class="neg">−${fmt(T.fakeLoss)}</span></div>`:''}
    ${r.spoil&&r.spoil.n?`<div><span class="wl">🥤 ${r.spoil.n} ly hỏng</span><span class="wl">${fmt(r.spoil.v)}</span></div>`:''}
    ${wv?`<div><span class="wl">${ico('trash')} ${waste.map(x=>ITEMS[x.k].s+' '+x.q).join(', ')}</span><span class="wl">${fmt(wv)}</span></div>`:''}
    <div class="tot"><span>${ico('chartup')} Lãi</span><span class="${profit<0?'neg':'pos'}">${profit<0?'−':'+'}${fmt(Math.abs(profit))}</span></div>
    <div class="tot"><span>${ico('money')} Két</span><span>${fmt(S.money)}</span></div>
  </div>
  ${(() => {
    const topSales = Object.entries(r.sales || {})
      .filter(([k, v]) => k !== 'L' && k !== 'M' && ITEMS[k] && ITEMS[k].type !== 'top' && ITEMS[k].type !== 'supply' && (v.q || 0) > 0)
      .sort((a, b) => (b[1].q || 0) - (a[1].q || 0))
      .slice(0, 3);
    return topSales.length ? `<div style="background:#fff7ed;border:1.5px solid #fed7aa;border-radius:12px;padding:8px 10px;margin:8px 0;font-size:0.86rem;text-align:left;">
      <div style="font-weight:800;color:#c2410c;margin-bottom:4px;">🔥 Top 3 Best Seller Ca Này:</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;">
        ${topSales.map(([k, v], i) => `<span style="background:#ffedd5;color:#9a3412;padding:2px 8px;border-radius:10px;font-weight:700;">${['🥇','🥈','🥉'][i]} ${ITEMS[k].n} (${v.q} phần)</span>`).join('')}
      </div>
    </div>` : '';
  })()}
  ${broke?`<p>${ico('trophy')} ${S.best||0} ngày</p><button class="big" id="go">Mở quán mới</button>`
  :`${!broke&&S.ev?`<p class="lvup">${ico(EVS[S.ev.id].ic)} Ngày mai: <b>${EVS[S.ev.id].n}</b>. ${evText(S.ev)}</p>`:''}${nextLv?`<p class="lvup">${ico('warn')} Từ ngày ${S.day}: ${LV_TXT[nextLv].toLowerCase()}. Đầu ngày sẽ có hướng dẫn.</p>`:''}${justOnline?`<p class="lvup">${ico('phone')} Mở đơn online Soppi! ${(S.tablets||0)?'':'Mua tablet ở Nâng cấp > Trang bị để đơn đổ về.'}</p>`:''}
  <button class="sbtn" id="seeSum" style="width:100%;padding:10px;margin-top:6px">${ico('chart')} Tổng kết</button><button class="big" id="go" style="margin-top:8px">Ngày ${S.day} ➜</button>`}`;
  $('modal').hidden=false;$('go').focus();
  const close=tab=>{
    $('modal').hidden=true;
    if(broke){const n=S.shopName;S=fresh();S.shopName=n;save()}
    R.tab=tab;R.sumMode='day';R.sumIdx=null;
    renderPrep();
    window.scrollTo(0,0);
    if(!broke){
      checkEquipBreakdown(()=>{
        if((S.staffSalesDays || 0) >= 7 && STAFF.some(u => S.hired && S.hired[u.id])){
          setTimeout(() => openStaffKpiModal(true), 350);
        }
      });
    }
  };
  $('go').onclick=()=>close('kho');if($('seeSum'))$('seeSum').onclick=()=>close('tongket');
  };
  const gRep=T.gRunN||T.gEsc;
  if(gRep){ask(`<div class="pbig">${ico('people')}</div><h2>Bảo vệ báo cáo</h2><div class="ledger">
    ${T.gRunN?`<div><span>${T.gRunN} khách quỵt tiền bị tóm, lấy lại</span><span class="pos">+${fmt(gRun)}</span></div>`:''}
    ${T.gEsc?`<div><span class="wl">Để xổng ${T.gEsc} khách</span><span class="wl">0đ</span></div>`:''}
    <div class="tot"><span>Tổng thu lại</span><span class="pos">+${fmt(gRun)}</span></div></div>`,[['Xem tổng kết ngày',showCard,1]])}else showCard();
}

/* ---------- TỔNG KẾT ---------- */
function aggregate(recs){
  const g={spoil:{n:0,v:0},sales:{},tips:0,onl:0,fee:0,equip:[],ing:{},waste:{},rent:0,util:0,tax:0,served:0,lost:0,starSum:0,starN:0};
  const addMap=(m,src,f)=>Object.entries(src).forEach(([k,x])=>{const y=m[k]=m[k]||{};Object.keys(x).forEach(p=>y[p]=(y[p]||0)+x[p])});
  recs.forEach(r=>{addMap(g.sales,r.sales);addMap(g.ing,r.ing);addMap(g.waste,r.waste);g.equip.push(...r.equip.map(e=>({...e,d:r.day})));if(r.spoil){g.spoil.n+=r.spoil.n;g.spoil.v+=r.spoil.v}
    ['tips','staffTip','gift','loanInt','onl','fee','rent','util','wage','ot','bad','tax','served','lost','starSum','starN','gzStolen','buyerStolen','buyerTrips'].forEach(p=>g[p]=(g[p]||0)+(r[p]||0))});
  return g;
}
function paneSum(){
  const H=S.history;
  if(!H.length){$('pane').innerHTML='<div class="sec">Tổng kết</div><p class="note">Chưa có dữ liệu. Bán xong ngày đầu tiên là có tổng kết ở đây.</p>';return}
  const mode=R.sumMode||'day',size={day:1,week:7,month:30}[mode];
  const blocks=[...new Set(H.map(r=>Math.floor((r.day-1)/size)))];
  let idx=R.sumIdx==null||!blocks.includes(R.sumIdx)?blocks[blocks.length-1]:R.sumIdx;
  const recs=H.filter(r=>Math.floor((r.day-1)/size)===idx),g=aggregate(recs);
  const d0=idx*size+1,d1=d0+size-1,last=recs[recs.length-1].day;
  const label=mode==='day'?`Ngày ${d0}`:`${mode==='week'?'Tuần':'Tháng'} ${idx+1} · ngày ${d0}–${d1}${last<d1?' (đang diễn ra)':''}`;
  const pi=blocks.indexOf(idx);
  const vn=n=>(Math.round(n/100)/10).toLocaleString('vi-VN',{maximumFractionDigits:1});
  // revenue rows
  const name=k=>iname(k);
  const grp=(keys,title)=>{const rows=keys.map(k=>({k,q:(g.sales[k]||{}).q||0,a:(g.sales[k]||{}).a||0})).filter(r=>r.q>0).sort((a,b)=>b.q-a.q);
    if(!rows.length)return '';
    const mx=Math.max(1,...rows.map(r=>r.q));
    return `<div class="tgrp">${title}</div>`+rows.map(r=>`<div class="trow${r.q?'':' zero'}"><div><b>${name(r.k)}</b>: ${r.q} phần<div class="tbar"><i style="width:${r.q/mx*100}%"></i></div></div><div>${r.q?vn(r.a/r.q):'–'}</div><div>${vn(r.a)}</div></div>`).join('')};
  const baseK=[...BASE_KEYS.filter(k=>S.unlocked[k]||g.sales[k]),...Object.keys(g.sales).filter(k=>!ITEMS[k]&&k!=='L')],flK=FLAV_KEYS.filter(k=>S.unlocked[k]||g.sales[k]),topK=TOP_KEYS.filter(k=>S.unlocked[k]||g.sales[k]);
  const salesTot=Object.values(g.sales).reduce((a,x)=>a+x.a,0),rev=salesTot+g.tips+(g.gift||0);
  const ingTot=Object.values(g.ing).reduce((a,x)=>a+x.v,0),eqTot=g.equip.reduce((a,x)=>a+x.v,0);
  const cost=g.rent+g.util+(g.wage||0)+(g.loanInt||0)+eqTot+g.fee+ingTot+g.tax,profit=rev-cost;
  const avg=g.starN?(g.starSum/g.starN).toFixed(1).replace('.',','):'–';
  const bestB=baseK.map(k=>[k,(g.sales[k]||{}).q||0]).sort((a,b)=>b[1]-a[1]),bestT=topK.map(k=>[k,(g.sales[k]||{}).q||0]).sort((a,b)=>b[1]-a[1]);
  const wasteRows=Object.entries(g.waste);
  let h=`<div class="segtabs">${[['day','Theo ngày'],['week','Theo tuần'],['month','Theo tháng']].map(([m,l])=>`<button class="chip${mode===m?' on':''}" data-sm="${m}">${l}</button>`).join('')}</div>
  <div class="pnav"><button class="sbtn" data-nav="-1" ${pi>0?'':'disabled'} aria-label="Kỳ trước">‹</button><b>${label}</b><button class="sbtn" data-nav="1" ${pi<blocks.length-1?'':'disabled'} aria-label="Kỳ sau">›</button></div>
  ${mode==='day'&&recs[0].ev&&EVS[recs[0].ev.id]?`<div class="fore">${ico(EVS[recs[0].ev.id].ic)} Sự kiện: <b>${EVS[recs[0].ev.id].n}</b></div>`:''}
  <div class="kpis"><div><b>${g.served}</b>ly bán</div><div><b>${g.lost}</b>khách bỏ về</div><div><b>${avg}★</b>đánh giá</div></div>
  ${bestB[0]&&bestB[0][1]?`<div class="fore">🔥 Bán chạy: <b>${iname(bestB[0][0])}</b>${bestT[0]&&bestT[0][1]?`, topping <b>${iname(bestT[0][0])}</b>`:''}. Ít khách gọi: <b>${iname(bestB[bestB.length-1][0])}</b>${bestT.length>1?`, <b>${iname(bestT[bestT.length-1][0])}</b>`:''}.</div>`:''}
  <div class="rh revc">Doanh thu</div>
  <div class="note" style="margin:0 0 2px">Đơn vị: k = 1.000đ</div><div class="thead"><div>Thành phần</div><div>Đơn giá</div><div>Tổng</div></div>
  ${grp(baseK,'Món')}${grp(flK,'Hương vị')}${grp(topK,'Topping')}${g.sales.L?grp(['L'],'Phụ thu'):''}
  ${g.tips?`<div class="trow"><div><b>Tiền tip</b></div><div></div><div>${vn(g.tips)}</div></div>`:''}
  ${g.gift?`<div class="trow"><div><b>Tiền được tặng</b></div><div></div><div>${vn(g.gift)}</div></div>`:''}
  ${g.staffTip?`<div class="note" style="margin:4px 0 0">Tip nhân viên giữ: ${vn(g.staffTip)}k (không tính vào doanh thu quán)</div>`:''}
  ${g.onl?`<div class="note" style="margin:4px 0 0">Trong đó đơn online: ${vn(g.onl)}k</div>`:''}
  <div class="ttot revc"><span>Tổng doanh thu</span><span>${vn(rev)}k</span></div>
  <div class="rh neg">Chi phí</div>
  <div class="crow"><span>Mặt bằng</span><span>${vn(g.rent)}</span></div>
  <div class="crow"><span>Điện nước</span><span>${vn(g.util)}</span></div>
  ${g.wage-(g.ot||0)?`<div class="crow"><span>Lương nhân viên</span><span>${vn(g.wage-(g.ot||0))}</span></div>`:''}${g.ot?`<div class="crow"><span>Tăng ca nhân viên pha chế</span><span>${vn(g.ot)}</span></div>`:''}${g.bad?`<div class="crow"><span>Sự cố mất tiền</span><span>${vn(g.bad)}</span></div>`:''}
  ${g.loanInt?`<div class="crow"><span>Lãi vay</span><span>${vn(g.loanInt)}</span></div>`:''}
  <div class="crow"><span>Máy móc, trang bị & công thức</span><span>${vn(eqTot)}</span></div>
  ${g.equip.map(e=>`<div class="crow sub"><span>– ${e.n}${mode!=='day'?' (ngày '+e.d+')':''}</span><span>${vn(e.v)}</span></div>`).join('')}
  ${g.fee||S.online?`<div class="crow"><span>Phí app giao hàng (${CFG.commission}%)</span><span>${vn(g.fee)}</span></div>`:''}
  <div class="crow"><span>Nguyên liệu</span><span>${vn(ingTot)}</span></div>
  ${Object.entries(g.ing).sort((a,b)=>b[1].v-a[1].v).map(([k,x])=>`<div class="trow sub"><div>– ${iname(k)}: ${x.q} phần</div><div>${vn(x.v/x.q)}</div><div>${vn(x.v)}</div></div>`).join('')}
  ${g.spoil.n?`<div class="wbox">🥤 Ly làm hỏng: ${g.spoil.n} ly · ${vn(g.spoil.v)}k (đã nằm trong tiền nguyên liệu)</div>`:''}
  <div class="crow"><span>Thuế</span><span>${vn(g.tax)}</span></div>
  <div class="ttot neg"><span>Tổng chi phí</span><span>${vn(cost)}k</span></div>
  <div class="final ${profit<0?'neg':'pos'}"><span>Lợi nhuận sau thuế<small>Doanh thu − chi phí</small></span><span>${profit<0?'−':''}${vn(Math.abs(profit))}k</span></div>`;
  $('pane').innerHTML=h;
  $('pane').onclick=e=>{const m=e.target.closest('[data-sm]'),n=e.target.closest('[data-nav]');
    if(m){R.sumMode=m.dataset.sm;R.sumIdx=null;paneSum()}
    if(n&&!n.disabled){R.sumIdx=blocks[pi+ +n.dataset.nav];paneSum()}};
}

/* ---------- OWNER PANEL ---------- */
function ownerLogin(){
  ask('<h2>🔑 Mã chủ game</h2><input id="pin" type="password" inputmode="numeric" class="pinbox" aria-label="Mã chủ game">',[['Huỷ',()=>{}],['Mở',()=>{const p=$('pin').value.trim();if(p!==CFG.ownerPin)return toast('Sai mã');ownerPanel()},1]]);
  setTimeout(()=>$('pin')&&$('pin').focus(),50);
}
function oRow(label,key,val,step,unit){const m=unit==='đ';return `<div class="rowi"><div><div class="nm">${label}</div></div><div class="pin"><input type="number" inputmode="decimal" step="${m?step/1000:step}" value="${m?val/1000:val}" data-o="${key}" ${m?'data-m="1"':''} aria-label="${label}"><span>${m?'k':unit}</span></div></div>`}
function ownerPanel(){
  const o=CFG.online;
  $('card').innerHTML=`<h2>🔑 Bảng chủ game</h2><p>Người chơi không thấy phần này.</p><div class="owner">
  <div class="sec">Điều kiện mở đơn online (phải đủ cả 3)</div>
  ${oRow('Lợi nhuận tích luỹ từ','online.minProfit',o.minProfit,500000,'đ')}
  ${oRow('Mở đơn online từ ngày','online.fromDay',o.fromDay,1,'')}
  ${oRow('Đánh giá tối thiểu','online.minRating',o.minRating,0.1,'★')}
  ${oRow('Phí app giao hàng','commission',CFG.commission,1,'%')}
  ${oRow('Lương nhân viên phụ quầy','wage1',CFG.wage1,5000,'đ')}
  ${oRow('Lương nhân viên pha chế','wage2',CFG.wage2,5000,'đ')}
  ${oRow('Lương nhân viên phụ quầy 2','wage3',CFG.wage3,5000,'đ')}
  ${oRow('Lương nhân viên đơn online','wageOn',CFG.wageOn,5000,'đ')}
  ${oRow('Lương nhân viên Gen Z (25k/h)','wageGz',CFG.wageGz,5000,'đ')}
  ${oRow('Giá 1 chai hương','bottle',CFG.bottle,5000,'đ')}
  ${oRow('Giá tablet','tablet',CFG.tablet,100000,'đ')}
  <div class="sec">Cấp độ (ngày bắt đầu)</div>
  ${oRow('Cấp 2: thêm đường, đá','levels.l2',CFG.levels.l2,1,'')}
  ${oRow('Cấp 3: đơn 2–5 ly, ly tới 4 topping','levels.l3',CFG.levels.l3,1,'')}
  <div class="sec">Luật chơi</div>
  ${oRow('Thời gian thật cho 1 ngày (11:00–22:00)','dayMin',CFG.dayMin,0.5,'phút')}
  ${oRow('Vốn ban đầu (ván mới)','startMoney',CFG.startMoney,50000,'đ')}
  ${oRow('Giá 1 ly tối đa (quá thì 60% khách bỏ đi)','priceCap',CFG.priceCap,5000,'đ')}
  ${oRow('Trà (trừ matcha) đắt từ','teaCap',CFG.teaCap,5000,'đ')}
  ${oRow('Matcha đắt từ','teaCapMatcha',CFG.teaCapMatcha,5000,'đ')}
  ${oRow('Giá 1 món tối đa (quá thì vắng 80%)','itemCap',CFG.itemCap,5000,'đ')}
  ${oRow('Phụ thu size L đắt từ (90% khách bỏ size L)','sizeWarn',CFG.sizeWarn,1000,'đ')}
  ${oRow('Phụ thu size L tối đa (không ai chọn L, vắng 80%)','sizeCap',CFG.sizeCap,5000,'đ')}
  <div class="sec">Chi phí cố định & thuế</div>
  ${oRow('Mặt bằng mỗi ngày','rent',CFG.rent,5000,'đ')}
  ${oRow('Điện nước cơ bản mỗi ngày','utilBase',CFG.utilBase,5000,'đ')}
  ${oRow('Điện nước thêm mỗi trang bị','utilPerUpg',CFG.utilPerUpg,1000,'đ')}
  ${oRow('Ngưỡng doanh thu năm không chịu thuế','taxThreshold',CFG.taxThreshold,1000000,'đ')}
  ${oRow('Thuế GTGT trên doanh thu','vat',CFG.vat,0.5,'%')}
  ${oRow('Thuế TNCN trên doanh thu','pit',CFG.pit,0.5,'%')}
  ${oRow('Trộm: két trên','thiefMoney',CFG.thiefMoney,1000000,'đ')}
  ${oRow('Trộm: trước ngày','thiefDay',CFG.thiefDay,1,'')}
  ${oRow('Trộm: chừa lại trong két','thiefLeft',CFG.thiefLeft,50000,'đ')}
  ${oRow('Mã chủ game (chỉ số)','ownerPin',CFG.ownerPin,1,'')}
  <div class="sec">Giá nhập nguyên liệu (mỗi phần)</div>
  ${Object.keys(ITEMS).map(k=>oRow(ITEMS[k].n,'cost.'+k,CFG.cost[k],500,'đ')).join('')}
  <div class="sec">Hạn dùng (0 = không hết hạn)</div>
  ${Object.keys(ITEMS).map(k=>oRow(ITEMS[k].n,'life.'+k,CFG.life[k],1,'ngày')).join('')}
  </div>
  <button class="danger" id="oReset">Khôi phục mặc định</button><br><button class="big" id="oClose">Lưu và đóng</button>`;
  $('modal').hidden=false;
  $('card').onchange=e=>{const i=e.target;if(!i.dataset.o)return;const [a,b]=i.dataset.o.split('.');let v=+i.value*(i.dataset.m?1000:1);
    if(a==='ownerPin'){CFG.ownerPin=String(i.value).trim()||'2468';saveCfg();return}
    if(!(v>=0))v=0;
    if(a==='dayMin')v=Math.min(10,Math.max(.5,Math.round(v*2)/2));
    if(a==='online'&&b==='minRating')v=Math.min(5,Math.round(v*10)/10);
    if(a==='commission')v=Math.min(100,Math.round(v));if(a==='vat'||a==='pit')v=Math.min(100,Math.round(v*10)/10);if(a==='life')v=Math.round(v);
    if(b)CFG[a][b]=v;else CFG[a]=v;i.value=i.dataset.m?v/1000:v;saveCfg()};
  $('oReset').onclick=()=>{CFG=JSON.parse(JSON.stringify(DEFAULT_CONFIG));saveCfg();ownerPanel()};
  $('oClose').onclick=()=>{$('card').onchange=null;$('modal').hidden=true;renderPrep()};
}

/* ---------- HỘP THOẠI TRONG GAME (thay confirm/prompt bị chặn) ---------- */
function ask(html,btns){
  $('card').onchange=null;
  $('card').innerHTML=html+`<div class="askbtns">${btns.map((b,i)=>`<button class="${b[2]?'big':'sbtn ghost'}" data-ask="${i}">${b[0]}</button>`).join('')}</div>`;
  $('modal').hidden=false;
  $('card').querySelectorAll('[data-ask]').forEach(el=>el.onclick=()=>{const b=btns[+el.dataset.ask];const keep=el.closest('.card').querySelector('#pin')?$('pin').value:null;if(isField(document.activeElement))document.activeElement.blur();$('modal').hidden=true;b[1](keep)});
}

/* ---------- FX ---------- */
function fl(el,t,bad){if(!el)return;const r=el.getBoundingClientRect(),f=document.createElement('div');f.className='float'+(bad?' bad':'');f.textContent=t;
  document.body.appendChild(f);f.style.left=Math.max(6,Math.min(vpW()-f.offsetWidth-6,(r.left+r.width/2)/ZM-f.offsetWidth/2))+'px';f.style.top=(r.top/ZM+8)+'px';setTimeout(()=>f.remove(),1100)}
let tt,tPri=0;function toast(m,ms,pri){
    if(R.mode==='sell' && !pri){
    const isCustomerMsg = /(khách|reviewer|bạn thân|ghé quán|tới quán|chê|bỏ về|bỏ đi|phải đi|quỵt|quýt|order|đơn lớn|học sinh|nhận ly|ly free|mời về|huỷ đơn|chọn đường|chọn đá|chưa có khách|đi mất|tài xế|khiếu nại)/i.test(m);
    if(isCustomerMsg) return;
  }
  const now=performance.now();if(!pri&&now<tPri)return;const t=$('toast');if(!t)return;t.innerHTML=m;t.classList.toggle('sell',R.mode==='sell');t.classList.toggle('pri',!!pri);t.classList.add('show');clearTimeout(tt);ms=ms||(R.mode==='sell'?2500:2500);tPri=pri?now+ms:0;tt=setTimeout(()=>{t.classList.remove('show');tPri=0},ms)}


/* ---------- MÀU GIAO DIỆN ---------- */
const THEMES=[
  {id:'kem',n:'Kem sữa',bg:'#fdf3e4',panel:'#fffaf2',line:'#ead7bd',ink:'#3a2317',soft:'#7a5a48',acc:'#ef6f8e',accd:'#c24c69',t:null},
  {id:'nau',n:'Nâu cà phê',bg:'#ead9c4',panel:'#f7ecdf',line:'#cfae8a',ink:'#3a2317',soft:'#6b4a36',acc:'#9a6340',accd:'#6b3f22',t:['#8a5a3b',.32]},
  {id:'socola',n:'Sô cô la',bg:'#d9c2ab',panel:'#efe2d4',line:'#b8916e',ink:'#2e1c12',soft:'#5e3f2b',acc:'#6b3f22',accd:'#4a2a14',t:['#5b3a26',.4]},
  {id:'dau',n:'Hồng dâu',bg:'#fde8ee',panel:'#fff5f8',line:'#f3c7d4',ink:'#3a2330',soft:'#7a4a5c',acc:'#e85d8a',accd:'#b8406a',t:['#f48fb1',.2]},
  {id:'dao',n:'Cam đào',bg:'#fdebdc',panel:'#fff6ef',line:'#f5cdb0',ink:'#3a2317',soft:'#7a5040',acc:'#f08a5d',accd:'#c0643c',t:['#ffab91',.22]},
  {id:'thai',n:'Trà Thái',bg:'#fde6cf',panel:'#fff4e8',line:'#f3c595',ink:'#3a2317',soft:'#7a5030',acc:'#e8792f',accd:'#b55718',t:['#ffa726',.22]},
  {id:'chanh',n:'Vàng chanh',bg:'#fbf6d6',panel:'#fffdf0',line:'#ebe097',ink:'#33301a',soft:'#6e6632',acc:'#c9a820',accd:'#977d0e',t:['#fff176',.25]},
  {id:'matcha',n:'Xanh matcha',bg:'#eef4e2',panel:'#f8fbf1',line:'#cfe0b3',ink:'#25331a',soft:'#566b43',acc:'#6aa84f',accd:'#4b7f36',t:['#9ccc65',.22]},
  {id:'bacha',n:'Bạc hà',bg:'#e3f5f0',panel:'#f4fcf9',line:'#b9e2d6',ink:'#1d3530',soft:'#4b6f66',acc:'#3fae90',accd:'#2b8069',t:['#80cbc4',.24]},
  {id:'bien',n:'Xanh biển',bg:'#e6f2fa',panel:'#f5fbff',line:'#bfdcef',ink:'#1c2d3a',soft:'#4a6378',acc:'#3d8fd1',accd:'#2a6aa0',t:['#64b5f6',.22]},
  {id:'khoaimon',n:'Tím khoai môn',bg:'#efe7f7',panel:'#faf6fd',line:'#d7c6ea',ink:'#2d2238',soft:'#62507a',acc:'#9b6bd1',accd:'#7147a3',t:['#b39ddb',.26]},
  {id:'dem',n:'Đêm dịu',bg:'#2b2433',panel:'#3a3144',line:'#574a63',ink:'#f5ecf7',soft:'#cbbad3',acc:'#f08fb0',accd:'#b85f80',t:['#3b2d5c',.19]}
];
let THEME='kem';try{THEME=localStorage.getItem('tsTheme')||'kem'}catch(e){}
function applyTheme(id){const t=THEMES.find(x=>x.id===id)||THEMES[0];THEME=t.id;try{localStorage.setItem('tsTheme',t.id)}catch(e){}
  const r=document.documentElement.style;r.setProperty('--bg',t.bg);r.setProperty('--panel',t.panel);r.setProperty('--line',t.line);r.setProperty('--ink',t.ink);r.setProperty('--soft',t.soft);r.setProperty('--pink',t.acc);r.setProperty('--pink-d',t.accd);
  r.setProperty('--tint',t.t?t.t[0]:'transparent');r.setProperty('--tintm','#ffffff');r.setProperty('--tinta',t.t?t.t[1]:0);document.body.classList.toggle('dark',t.id==='dem');
  let m=document.querySelector('meta[name=theme-color]');if(!m){m=document.createElement('meta');m.name='theme-color';document.head.appendChild(m)}m.content=t.bg}
function themeDlg(){$('card').onchange=null;
  $('card').innerHTML=`<h2>Màu giao diện</h2><p>Chọn màu bạn thích, đổi lúc nào cũng được.</p><div class="thg">${THEMES.map(t=>`<button class="thb${t.id===THEME?' on':''}" data-th="${t.id}"><i style="background:linear-gradient(135deg,${t.bg} 0 50%,${t.acc} 50%)"></i>${t.n}</button>`).join('')}</div><button class="big" id="thClose" style="margin-top:12px">Xong</button>`;
  $('modal').hidden=false;$('card').querySelectorAll('[data-th]').forEach(b=>b.onclick=()=>{applyTheme(b.dataset.th);themeDlg()});$('thClose').onclick=showSettings}
/* ---------- ÂM THANH (tự tạo bằng Web Audio, không cần file) ---------- */
const AU={ctx:null,on:false,mus:false};
try{const a=JSON.parse(localStorage.getItem('tsAudio_opt')||localStorage.getItem('tsAudio'));if(a&&a.userSet){AU.on=!!a.on;AU.mus=!!a.mus;AU.season=a.season||null}else{AU.on=false;AU.mus=false}}catch(e){}
function saveAu(){try{localStorage.setItem('tsAudio',JSON.stringify({on:AU.on,mus:AU.mus,season:AU.season||null,userSet:true}));localStorage.setItem('tsAudio_opt',JSON.stringify({on:AU.on,mus:AU.mus,season:AU.season||null,userSet:true}))}catch(e){}}
function au(){
  if(!AU.ctx){const C=window.AudioContext||window.webkitAudioContext;if(!C)return null;const c=AU.ctx=new C();
    AU.master=c.createGain();AU.master.gain.value=.9;AU.master.connect(c.destination);
    AU.fx=c.createGain();AU.fx.gain.value=1;AU.fx.connect(AU.master);
    AU.mg=c.createGain();AU.mg.gain.value=0;AU.mg.connect(AU.master);
    const len=c.sampleRate;AU.nb=c.createBuffer(1,len,c.sampleRate);const d=AU.nb.getChannelData(0);for(let i=0;i<len;i++)d[i]=Math.random()*2-1}
  if(AU.ctx.state==='suspended'&&!document.hidden)AU.ctx.resume();return AU.ctx}
function tn(f,at,dur,type,vol,to,dest){const c=AU.ctx;if(!c)return;const t=c.currentTime+(at||0),o=c.createOscillator(),g=c.createGain();
  o.type=type||'sine';o.frequency.setValueAtTime(f,t);if(to)o.frequency.exponentialRampToValueAtTime(to,t+dur);
  g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol||.15,t+.008);g.gain.exponentialRampToValueAtTime(.0001,t+dur);
  o.connect(g);g.connect(dest||AU.fx);o.start(t);o.stop(t+dur+.02)}
function nz(at,dur,freq,q,vol,type){const c=AU.ctx;if(!c)return;const t=c.currentTime+(at||0),s=c.createBufferSource(),f=c.createBiquadFilter(),g=c.createGain();
  s.buffer=AU.nb;f.type=type||'bandpass';f.frequency.value=freq;f.Q.value=q||1;g.gain.setValueAtTime(vol||.1,t);g.gain.exponentialRampToValueAtTime(.0001,t+dur);
  s.connect(f);f.connect(g);g.connect(AU.fx);s.start(t,Math.random()*.5);s.stop(t+dur+.02)}
const ICE_SRC = 'Ice cube in the glass sound effect.mp3';
const _iceAudioPool = [];
function playIceCubeSound(){
  if(!AU.on) return;
  try {
    let a = _iceAudioPool.find(el => el.paused || el.ended);
    if(!a){
      if(_iceAudioPool.length < 6){
        a = new Audio(encodeURI(ICE_SRC));
        _iceAudioPool.push(a);
      } else {
        a = _iceAudioPool[0];
      }
    }
    a.volume = 0.3;
    a.currentTime = 0;
    const p = a.play();
    if(p && p.catch) p.catch(()=>{});
  } catch(e) {
    try {
      tn(2100,0,.12,'sine',.08); tn(2700,.06,.1,'sine',.06);
    } catch(err){}
  }
}
const SFX={
  tap(){tn(740,0,.07,'triangle',.08)},
  cup(){tn(520,0,.06,'triangle',.12);tn(780,.05,.08,'triangle',.08)},
  plop(){playIceCubeSound()},
  top(){playIceCubeSound()},
  pump(){nz(0,.09,1400,2,.12);tn(300,.02,.08,'sine',.08,200)},
  ice(){playIceCubeSound()},
  trash(){nz(0,.25,500,1,.18,'lowpass');tn(180,0,.2,'sine',.12,90)},
  seal(){nz(0,.12,300,1,.25,'lowpass');tn(120,0,.1,'square',.06);tn(1175,.28,.25,'sine',.1)},
  coin(){tn(988,0,.08,'square',.05);tn(1319,.07,.3,'square',.05)},
  star(){[1047,1319,1568,2093].forEach((f,i)=>tn(f,i*.08,.35,'triangle',.08))},
  lvup(){[1047,1319,1568,2093].forEach((f,i)=>tn(f,i*.08,.35,'triangle',.08))},
  bad(){tn(220,0,.3,'sawtooth',.05,150)},
  bell(){tn(1397,0,.5,'sine',.07);tn(2093,.01,.35,'sine',.03)},
  end(){[784,988,1175,1568].forEach((f,i)=>tn(f,i*.14,.5,'triangle',.08))}};
function sfx(n){
  if(!AU.on||!au())return;
  try{
    if(SFX[n]) SFX[n]();
    else if(n==='lvup'||n==='star') SFX.star();
    else SFX.tap();
  }catch(e){}
}
const POUR_SRC = 'Pouring water-liquid into a glass sound effect [HQ].mp3';
let pourAudio = null;
function getPourAudio(){
  if(!pourAudio){
    try{
      pourAudio = new Audio(encodeURI(POUR_SRC));
      pourAudio.loop = true;
      pourAudio.preload = 'auto';
      pourAudio.volume = 0.85;
    }catch(e){
      pourAudio = null;
    }
  }
  return pourAudio;
}
function pourSnd(on){
  if(!AU.on){
    if(pourAudio && !pourAudio.paused) pourAudio.pause();
    return;
  }
  const pa = getPourAudio();
  if(on){
    if(pa){
      pa.currentTime = 0;
      const p = pa.play();
      if(p && p.catch) p.catch(()=>{});
    }
  }else{
    if(pa && !pa.paused){
      pa.pause();
      pa.currentTime = 0;
    }
  }
}
/* nhạc nền: vòng hợp âm nhẹ nhàng kiểu lo-fi */
const MUS={timer:null,next:0,step:0};
const mf=n=>440*Math.pow(2,(n-69)/12);
const SEASONS={
  thu:{n:'Mùa thu',g:1.5,bpm:72,ch:[[57,60,64,67],[50,53,57,60],[55,59,62,65],[48,52,55,59]],bass:[45,38,43,36],pad:'triangle',lead:'sine',ld:2.2,lv:.06,
    mel:[[76,null,74,72,null,69,null,null],[72,null,69,null,65,null,67,null],[71,null,67,null,74,72,null,71],[67,null,null,null,64,null,null,null],
         [69,72,76,null,74,null,72,null],[69,null,65,67,69,null,null,null],[67,null,71,74,null,72,71,null],[72,null,null,67,null,64,null,null]],
    x(c,t,i,e){if(i===0)nzM(c,t,e*8,3000,.004,'highpass');if(i===2||i===6)nzM(c,t,.04,2500,.01)}},
  dong:{n:'Mùa đông',g:1.35,bpm:66,ch:[[48,52,55,59],[45,48,52,55],[41,45,48,52],[43,47,50,53]],bass:[36,33,29,31],pad:'sine',lead:'sine',ld:1.4,lv:.05,oct:12,
    mel:[[79,null,76,null,72,null,76,null],[76,null,72,null,69,null,null,null],[77,null,76,null,72,null,69,null],[74,null,null,71,null,67,null,null],
         [72,null,76,null,79,null,84,null],[81,null,79,null,76,null,null,null],[77,76,74,null,72,null,69,null],[71,null,74,null,79,null,null,null]],
    x(c,t,i,e){if(i%2===1){tnM(c,t,2637,.08,'sine',.012);tnM(c,t+.03,3136,.06,'sine',.008)}}},
  xuan:{n:'Mùa xuân',g:.85,bpm:84,ch:[[53,57,60,64],[55,59,62,65],[52,55,59,62],[57,60,64,67]],bass:[41,43,40,45],pad:'triangle',lead:'triangle',ld:1.1,lv:.05,
    mel:[[72,74,76,null,79,null,76,null],[74,null,71,null,67,null,71,74],[76,null,74,72,71,null,67,null],[69,null,72,null,76,null,null,null],
         [77,null,76,74,72,null,74,null],[79,null,77,null,74,null,71,null],[71,72,74,null,76,null,79,null],[81,null,79,null,76,null,null,null]],
    x(c,t,i,e,st){if(i===7&&st%64===31){const o=c.createOscillator(),g=c.createGain();o.type='sine';o.frequency.setValueAtTime(3000,t);o.frequency.exponentialRampToValueAtTime(4200,t+.07);o.frequency.exponentialRampToValueAtTime(3300,t+.14);g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(.015,t+.02);g.gain.exponentialRampToValueAtTime(.0001,t+.16);o.connect(g);g.connect(AU.mg);o.start(t);o.stop(t+.2);
      tnM(c,t+.22,3600,.08,'sine',.012)}if(i%2===1)nzM(c,t,.04,7000,.01,'highpass')}},
  he:{n:'Mùa hè',g:.7,bpm:96,ch:[[50,54,57,61],[47,50,54,57],[43,47,50,54],[45,49,52,55]],bass:[38,35,31,33],pad:'triangle',lead:'sine',ld:.35,lv:.08,
    mel:[[74,null,78,76,74,null,71,null],[71,74,null,71,69,null,66,null],[67,null,71,74,null,76,74,null],[73,null,76,null,81,null,null,null],
         [78,76,74,null,76,null,78,null],[74,null,71,null,69,71,74,null],[79,null,78,76,74,null,71,null],[76,null,73,null,69,null,null,null]],
    x(c,t,i,e){nzM(c,t,.05,6000,i%2?.016:.008,'highpass')}}
};
function seasonNow(){const m=new Date().getMonth()+1;return m>=9&&m<=11?'thu':m===12||m<=2?'dong':m<=5?'xuan':'he'}
const seasonKey=()=>AU.season&&SEASONS[AU.season]?AU.season:seasonNow();
function tnM(c,tt,f,dur,type,vol){
  if(!c)return;
  const t0=Math.max(c.currentTime,tt||c.currentTime);
  const o=c.createOscillator(),g=c.createGain();
  o.type=type||'sine';
  o.frequency.setValueAtTime(f,t0);
  g.gain.setValueAtTime(.0001,t0);
  g.gain.linearRampToValueAtTime(vol||.05,t0+.01);
  g.gain.exponentialRampToValueAtTime(.0001,t0+dur);
  o.connect(g);
  g.connect(AU.mg);
  o.start(t0);
  o.stop(t0+dur+.03);
}
function nzM(c,tt,dur,freq,vol,type){
  if(!c||!AU.nb)return;
  const t0=Math.max(c.currentTime,tt||c.currentTime);
  const s=c.createBufferSource(),f=c.createBiquadFilter(),g=c.createGain();
  s.buffer=AU.nb;
  f.type=type||'bandpass';
  f.frequency.setValueAtTime(freq,t0);
  g.gain.setValueAtTime(vol||.01,t0);
  g.gain.exponentialRampToValueAtTime(.0001,t0+dur);
  s.connect(f);
  f.connect(g);
  g.connect(AU.mg);
  s.start(t0,Math.random()*.5);
  s.stop(t0+dur+.03);
}
function musStep(){
  const c=au();
  if(!c||c.state!=='running')return;
  const S_=SEASONS[seasonKey()],e=30/S_.bpm;
  if(MUS.next<c.currentTime) MUS.next=c.currentTime+0.05;
  while(MUS.next<c.currentTime+0.5){
    const st=MUS.step,bar=Math.floor(st/8)%4,ph=Math.floor(st/32)%2,i=st%8,tt=MUS.next;
    if(i===0){
      S_.ch[bar].forEach(n=>{
        const o=c.createOscillator(),g=c.createGain();
        o.type=S_.pad||'triangle';
        o.frequency.setValueAtTime(mf(n),tt);
        o.detune.setValueAtTime((Math.random()-.5)*8,tt);
        g.gain.setValueAtTime(.0001,tt);
        g.gain.linearRampToValueAtTime(.025,tt+.4);
        g.gain.linearRampToValueAtTime(.0001,tt+e*8);
        o.connect(g);
        g.connect(AU.mg);
        o.start(tt);
        o.stop(tt+e*8+.05);
      });
    }
    if(i===0||i===4) tnM(c,tt,mf(S_.bass[bar]),e*3.5,'sine',.09);
    const m=S_.mel[ph*4+bar][i];
    if(m){
      tnM(c,tt,mf(m+(S_.oct||0)),e*S_.ld*2,S_.lead||'sine',S_.lv||.06);
      if(S_.oct) tnM(c,tt,mf(m),e*S_.ld,'sine',(S_.lv||.06)*.4);
    }
    if(S_.x) S_.x(c,tt,i,e,st);
    MUS.next+=e;
    MUS.step++;
  }
}
/* ---------- NHẠC NỀN BGM MP3 & DỰ PHÒNG BẰNG BỘ TỔNG HỢP ---------- */
const BGM_SRC = 'Nhạc Chill Quán Cafe - Những Ca Khúc Lofi Nhẹ Nhàng Hay Nhất Dành Cho Quán Cafe - Nhạc Lofi 2026.mp3';
let bgmAudio = null;
let bgmPlaying = false;

function getBgmAudio(){
  if(!bgmAudio){
    try{
      bgmAudio = new Audio(encodeURI(BGM_SRC));
      bgmAudio.loop = true;
      bgmAudio.preload = 'auto';
      bgmAudio.volume = 0.55;
      bgmAudio.addEventListener('error', ()=>{
        bgmPlaying = false;
        musSync();
      });
      bgmAudio.addEventListener('playing', ()=>{
        bgmPlaying = true;
        musSync();
      });
      bgmAudio.addEventListener('pause', ()=>{
        if(!AU.mus || document.hidden) bgmPlaying = false;
      });
    }catch(e){
      bgmAudio = null;
    }
  }
  return bgmAudio;
}

function startSynthMus(){
  // Đã bỏ nhạc theo mùa, chỉ dùng duy nhất 1 bài Lofi Chill Cafe
  if(MUS.timer){ clearInterval(MUS.timer); MUS.timer = null; }
}

function musSync(){
  const want = AU.mus && !document.hidden;
  const bgm = getBgmAudio();

  if(want){
    const targetVol = R.mode === 'sell' ? 0.75 : 0.5;
    if(bgm){
      bgm.volume = targetVol;
      if(bgm.paused){
        const p = bgm.play();
        if(p && p.then){
          p.then(()=>{
            bgmPlaying = true;
          }).catch(()=>{
            bgmPlaying = false;
          });
        }
      } else {
        bgmPlaying = true;
      }
    }
  } else {
    if(bgm && !bgm.paused){
      bgm.pause();
    }
    bgmPlaying = false;
  }
  // Tắt hẳn bộ synth mùa
  const c = AU.ctx;
  if(c && AU.mg){
    try{
      AU.mg.gain.cancelScheduledValues(c.currentTime);
      AU.mg.gain.linearRampToValueAtTime(0, c.currentTime + .2);
    }catch(e){}
  }
  if(MUS.timer){
    clearInterval(MUS.timer);
    MUS.timer = null;
  }
}

try{if(navigator.audioSession)navigator.audioSession.type='ambient'}catch(e){}/* ambient: phát chung với nhạc app khác (Spotify, YouTube)… */
function auUnlock(){
  const c=au();
  if(c && c.state!=='running'){
    const p=c.resume();
    if(p&&p.then)p.then(musSync);
  }
  const bgm = getBgmAudio();
  if(bgm && AU.mus && !document.hidden && bgm.paused){
    const p = bgm.play();
    if(p && p.then) p.then(()=>{ bgmPlaying = true; musSync(); }).catch(()=>{});
  }
  musSync();
}
['touchstart','touchend','pointerdown','click','keydown'].forEach(ev=>addEventListener(ev,auUnlock,{capture:true,passive:true}));
document.addEventListener('visibilitychange',()=>{
  if(document.hidden){
    pourSnd(false);
    if(bgmAudio && !bgmAudio.paused) bgmAudio.pause();
    if(AU.ctx) AU.ctx.suspend();
  }else{
    if(AU.ctx) AU.ctx.resume();
    musSync();
  }
});
document.addEventListener('click',e=>{if(e.target.closest('.big,.sbtn,.tab,.stab,.setb,.chip,.rpbtn,.sp4-go'))sfx('tap')},true);

/* ---------- MÀN HÌNH CHÀO + HƯỚNG DẪN ---------- */
function closeSplash(){const sp=$('splash');sp.hidden=true;sp.innerHTML='';if(R.mode==='prep')setTimeout(prepChecks,300)}
const SP_MSG=['Đang nấu trân châu…','Đang ủ trà…','Đang lau quầy…','Đang xếp ly…','Sắp mở cửa…'];
function showSplash(had,after){
  const sp=$('splash');
  const stk=(n,x,y,w,d,dl)=>`<img class="sp4-f" src="${IMG}stk_${n}.png" alt="" style="left:${x}px;top:${y}px;width:${w}px;animation-duration:${d}s;animation-delay:-${dl}s">`;
  sp.innerHTML=`<div class="sp4" id="sp4"><div class="sp4-st" id="spStage">
    <img class="sp4-cloud" src="${IMG}stk_cloud.png" alt="">
    <img class="sp4-lan" src="${IMG}lanL.png" alt="" style="left:146px;top:386px">
    <img class="sp4-lan b" src="${IMG}lanR.png" alt="" style="left:549px;top:386px">
    ${stk('pearl',70,120,74,4.2,0)}${stk('star',300,40,62,3.6,1)}${stk('cup',600,60,96,5,2)}${stk('heart',684,300,56,3.8,.5)}
    ${stk('berry',80,1228,64,4.6,1.5)}${stk('leaf',626,1228,66,5.2,3)}
    <img class="sp4-head" src="${IMG}cathead.png" alt="">
    <span class="sp4-z" style="animation-delay:0s">z</span><span class="sp4-z" style="animation-delay:1s">z</span><span class="sp4-z" style="animation-delay:2s">z</span>
    <h1 class="sp4-t">Tiệm Trà Mơ Ước</h1>
    <p class="sp4-tag">Pha trà, đón khách, mở tiệm nhỏ của riêng bạn</p>
    ${had?`<p class="sp4-me">${esc(shopName())} · Ngày ${S.day} · ${fmt(S.money)}</p>`:''}
    <div class="sp4-foot"><div class="sp4-msg" id="spMsg">${SP_MSG[0]}</div>
      <div class="sp4-bar" id="spBarW"><i id="spBar"></i><span id="spPct">0%</span></div>
      <button class="sp4-go" id="spGo" hidden>${had?'Chơi tiếp':'Bắt đầu'}</button>
      ${had?'<button class="sp4-help" id="spHelp" hidden>Hướng dẫn</button>':'<button class="sp4-help" id="spHelp" hidden>Có mã sao lưu? Khôi phục</button>'}</div>
    <div class="sp4-ver">${GAME_VERSION}</div></div>
    <div class="sp-banner-overlay" id="spBanner">
      <div class="sp-banner-card">
        <button class="sp-banner-close" id="spBannerClose" aria-label="Đóng">✕</button>
        <div class="sp-banner-badge">📢 Lời nhắn từ Dev</div>
        <h2 class="sp-banner-title">Tiệm Trà Mơ Ước</h2>
        <p class="sp-banner-text">Mọi người có thể vào Threads để cập nhập thông báo mới nha. Cảm ơn mọi người chơi game này. Mình tự nhận 100% không biết gì về code, cũng không phải dân trong ngành. Mục đích tạo ra bản Trà Sữa Mơ Ước cũng vì 1 phần đam mê của mình. Chân thành cảm ơn mọi người!!!<br><br>💡 <b>Mẹo:</b> Ấn 1 lần nút cập nhật bên dưới là có bản mới liền nghen ^^</p>
        <div class="sp-banner-qr-wrap">
          <img src="img/threads.png" alt="Mã Threads" class="sp-banner-qr">
          <span class="sp-banner-qr-caption">Quét mã QR để theo dõi kênh Threads cập nhật mới!</span>
        </div>
        <button class="sp-banner-btn" id="spBannerBtn">Vào chơi ngay 🧋</button>
        <button type="button" class="sp-banner-btn sp-banner-update-btn" id="spBannerUpdateBtn" style="background:linear-gradient(135deg,#0284c7,#0369a1);margin-top:8px;box-shadow:0 6px 16px rgba(2,132,199,.35);">🔄 Cập nhật bản mới</button>
      </div>
    </div>
  </div>`;
  sp.hidden=false;spFit();
  const forceUpdateAndClearCache = async () => {
    try {
      if (typeof save === 'function') save();
      if (typeof autoBak === 'function') autoBak();
    } catch (e) {}
    try {
      if ('caches' in window) {
        const ks = await caches.keys();
        await Promise.all(ks.map(k => caches.delete(k)));
      }
      if (navigator.serviceWorker) {
        const regs = await navigator.serviceWorker.getRegistrations();
        await Promise.all(regs.map(r => r.unregister()));
      }
    } catch (e) {}
    try { localStorage.removeItem('tsSeenV11_box'); } catch (e) {}
    const bustUrl = location.origin + location.pathname + '?_v=' + encodeURIComponent(GAME_VERSION) + '&_t=' + Date.now();
    window.location.href = bustUrl;
  };
  const dismissBanner=()=>{const b=$('spBanner');if(b)b.style.display='none';if($('spGo')&&!$('spGo').hidden)$('spGo').click()};
  if($('spBannerClose'))$('spBannerClose').onclick=()=>{const b=$('spBanner');if(b)b.style.display='none'};
  if($('spBannerBtn'))$('spBannerBtn').onclick=dismissBanner;
  if($('spBannerUpdateBtn'))$('spBannerUpdateBtn').onclick=forceUpdateAndClearCache;
  const fitTag=()=>{const t=document.querySelector('.sp4-tag');if(!t)return;let f=26;t.style.fontSize=f+'px';while(t.scrollWidth>t.clientWidth+1&&f>16){f--;t.style.fontSize=f+'px'}};fitTag();if(document.fonts)document.fonts.ready.then(fitTag);
  $('spGo').onclick=()=>{if(had){closeSplash();after&&after()}else showTour(true)};
  $('spHelp').onclick=had?()=>showTour(false,false,after):()=>restoreDlg();
  const files=['splash2.jpg','cathead.png','bg2.jpg','bg.jpg','faces.webp','ship.webp','star.webp','cup.png','lid.png','kho.jpg','ic_box.png','ic_tools.png','ic_price.png','ic_star.png','ic_chart.png','lanL.png','lanR.png'];let done=0,shown=0;const t0=performance.now();
  files.forEach(f=>{const im=new Image();im.onload=im.onerror=()=>done++;im.src=IMG+f});
  const step=()=>{if(!$('spBar'))return;const want=Math.min(done/files.length,(performance.now()-t0)/1600);shown+=(want-shown)*.16;if(want>=1&&shown>.985)shown=1;
    const pc_=Math.round(shown*100);$('spBar').style.width=pc_+'%';$('spPct').textContent=pc_+'%';$('spMsg').textContent=SP_MSG[Math.min(SP_MSG.length-1,Math.floor(shown*SP_MSG.length))];
    if(shown>=1){$('spBarW').hidden=true;$('spMsg').hidden=true;$('spGo').hidden=false;if($('spHelp'))$('spHelp').hidden=false;$('spGo').focus();return}
    requestAnimationFrame(step)};
  requestAnimationFrame(step);
}
function spFit(){const st=$('spStage');if(!st)return;const W=vpW(),H=vpH(),s=H/1376;st.style.transform=`scale(${s})`;st.style.left=((W-768*s)/2)+'px'}
addEventListener('resize',spFit);
function tourSlides(){
  const row=(k,q)=>`<div class="trw">${itemIcon(k)}<b>${ITEMS[k].n}</b>${lifeTag(k)}<span class="chip2">+${q}</span></div>`;
  return [
    ['Nấu hàng buổi sáng','Vào Kho, bấm + chọn số phần, bấm Nấu & nhập rồi Mở cửa. Mỗi món có hạn dùng, hết hạn là phải đổ bỏ',`<div class="till">${row('tra',15)}${row('tcden',10)}${row('thach',10)}<div class="tnote">${ico('trash')} Hết hạn = mất tiền</div></div>`],
    ['Đọc đơn của khách','Khách nói món trong bóng thoại, ly nhỏ bên cạnh là hình món khách muốn. Vòng tròn quanh mặt khách là thời gian chờ, hết vòng là khách bỏ về',`<div class="till"><div class="say tsay"><i class="tfc" style="${faceBg(0,0,40,39)}"></i><span>1 ly <b>trà sữa</b> size <b>L</b>, trân châu đen nha!</span></div>
      <div class="tcup">${cupHTML({base:'tra',tops:['tcden'],size:'L',ice:null},false)}<span class="tarrow"><svg width="30" height="20" viewBox="0 0 30 20"><path d="M2 10h22M17 3l8 7-8 7" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg><i class="tfc big" style="${faceBg(0,1,60,59)}"></i></span></div></div>`],
    ['Bước 1: lấy ly','Chạm chồng ly M hoặc L đúng size khách gọi. Ly sẽ nằm trên thớt gỗ',`<div class="till">${cropBg(8,355,146,236,150)}</div>`],
    ['Bước 2: rót trà','Nhấn giữ hũ trà khách gọi. Nước dâng dần, thả tay khi tới vạch xanh đứt nét trên ly. Giữ quá lâu là tràn ly',`<div class="till">${cropBg(158,352,470,176,290)}</div>`],
    ['Bước 3: topping và hương','Chạm khay topping để múc 1 phần vào ly. Khách gọi vị trái cây (dâu, xoài…) thì chạm chai siro ở kệ dưới',`<div class="till">${cropBg(280,608,482,334,290)}</div>`],
    ['Đường và đá','Từ ngày '+CFG.levels.l2+' khách chọn mức đường và đá. Bấm bình nước đường và xô đá đúng số lần, rồi mới dán nắp. Bấm dư thì phải đổ ly làm lại',`<div class="till"><table class="gtab"><tr><th>Khách gọi</th><th>Bấm bình nước đường</th></tr>${SUGAR.map((v,i)=>`<tr><td>${v}% đường</td><td>${i+1} lần</td></tr>`).join('')}</table>
      <table class="gtab"><tr><th>Khách gọi</th><th>Xúc đá</th></tr><tr><td>Không đá</td><td>Không xúc</td></tr><tr><td>Ít đá</td><td>1 lần</td></tr><tr><td>Đá bình thường</td><td>2 lần</td></tr></table>
      <div class="tnote">Thứ tự không quan trọng: trà, hương, topping, đường, đá xong là dán nắp</div></div>`],
    ['Bước 4: dán nắp và giao','Chạm máy dán nắp, ly tự đưa cho khách. Lỡ làm sai thì chạm xô inox để đổ ly, làm lại',`<div class="till"><div style="display:flex;gap:14px;justify-content:center;align-items:flex-end">${cropBg(632,322,134,246,110)}${cropBg(182,574,98,112,80)}</div></div>`],
    ['Khách chấm sao','Càng nhiều sao càng đông khách. Dưới 4 sao là quán vắng hẳn',`<div class="till"><div class="trev"><i class="tfc rf" style="${faceBg(3,1,44,43)}"></i><div><div class="stars" style="font-size:1.5rem">★★★★★</div><div class="say">Làm nhanh, đúng vị</div></div></div>
      <div class="trev"><i class="tfc rf" style="${faceBg(5,2,44,43)}"></i><div><div class="stars" style="font-size:1.5rem">★★☆☆☆</div><div class="say">Chờ lâu quá</div></div></div></div>`],
    ['Lời thì mở món mới','Trà, hương vị, topping, trang bị, đơn online',`<div class="till"><div class="pg4">
      <div class="lock unl">${baseCup('thai')}<b>Trà</b></div><div class="lock unl">${flavIcon('f_dau',24)}<b>Hương</b></div>
      <div class="lock unl">${topIcon('fube',1)}<b>Foam</b></div><div class="lock unl">${topIcon('pmvien',1)}<b>Phô mai</b></div></div>
      <div class="trw"><span class="icon">${ico('phone')}</span><b>Đơn online</b><span class="chip2">Ngày ${CFG.online.fromDay}</span></div></div>`]
  ];
}
function showTour(isNew,fromGame,after){
  const sp=$('splash'),sl=tourSlides();
  if(isNew)sl.push(['Đặt tên quán','',`<div class="till"><div style="text-align:center"><img class="ico" src="img/ic_cupfull.png" alt="" style="width:64px;height:64px"></div><input id="nameIn" class="pinbox nm" maxlength="30" placeholder="Ví dụ: Trà Sữa Nhà Mèo" aria-label="Tên quán"></div>`,1]);
  const n=sl.length;
  sp.innerHTML=`<div class="awning"></div><div class="tour">
    <button class="sp-link skip" id="tSkip">${isNew?'Bỏ qua ›':'Đóng ✕'}</button>
    <div class="tourw" id="tw">${sl.map(([h,p,ill,top])=>top?`<div class="tpage"><h2>${h}</h2>${p?`<p>${p}</p>`:''}${ill}</div>`:`<div class="tpage">${ill}<h2>${h}</h2>${p?`<p>${p}</p>`:''}</div>`).join('')}</div>
    <div class="dots" id="tDots">${sl.map((x,i)=>`<i class="${i?'':'on'}"></i>`).join('')}</div>
    <button class="big" id="tNext">Tiếp ➜</button></div>`;
  sp.hidden=false;
  const tw=$('tw'),dots=[...$('tDots').children];let cur=0;
  const finish=()=>{if(isNew){setName(($('nameIn')||{}).value);closeSplash();renderPrep()}else{closeSplash();if(!fromGame&&after)after()}};
  const upd=()=>{cur=Math.round(tw.scrollLeft/tw.clientWidth);dots.forEach((d,i)=>d.classList.toggle('on',i===cur));
    $('tNext').innerHTML=cur===n-1?(isNew?'Khai trương':'Vào quán'):'Tiếp ➜';
    if(isNew&&cur===n-1)setTimeout(()=>{const i=$('nameIn');if(i&&document.activeElement!==i)i.focus({preventScroll:true})},250)};
  tw.onscroll=()=>{clearTimeout(tw._t);tw._t=setTimeout(upd,60)};
  const go=i=>tw.scrollTo({left:i*tw.clientWidth,behavior:'smooth'});
  $('tNext').onclick=()=>{if(cur>=n-1)finish();else go(cur+1)};
  $('tSkip').onclick=()=>{if(isNew&&cur<n-1)go(n-1);else finish()};
  if(isNew)tw.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.id==='nameIn')finish()});
}

/* ---------- SAO LƯU / KHÔI PHỤC BẰNG MÃ ---------- */
const BAK_SALT='ttn-bak-7f3a';
function bakHash(t){let h=0x811c9dc5;const x=BAK_SALT+t;for(let i=0;i<x.length;i++){h^=x.charCodeAt(i);h=Math.imul(h,0x01000193)>>>0}return h.toString(36)}
const b64e=u8=>{let s='';for(let i=0;i<u8.length;i+=0x8000)s+=String.fromCharCode.apply(null,u8.subarray(i,i+0x8000));return btoa(s).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'')};
const b64d=t=>{t=t.replace(/-/g,'+').replace(/_/g,'/');while(t.length%4)t+='=';const s=atob(t),u=new Uint8Array(s.length);for(let i=0;i<s.length;i++)u[i]=s.charCodeAt(i);return u};
async function zipBytes(u8,dir){const C=dir?window.CompressionStream:window.DecompressionStream;if(!C)return null;const st=new Blob([u8]).stream().pipeThrough(new C('gzip'));return new Uint8Array(await new Response(st).arrayBuffer())}
async function makeBackup(){const json=JSON.stringify(S),raw=new TextEncoder().encode(json);let z=null;try{z=await zipBytes(raw,1)}catch(e){}
  const body=(z?'z':'p')+b64e(z||raw);return 'TTN1.'+body+'.'+bakHash(body)}
async function readBackup(code){code=String(code||'').replace(/\s+/g,'');const m=code.match(/^TTN1\.([zp][A-Za-z0-9_-]+)\.([0-9a-z]+)$/);if(!m)throw 'Mã không đúng định dạng';
  if(bakHash(m[1])!==m[2])throw 'Mã bị sai hoặc đã bị sửa';let u=b64d(m[1].slice(1));if(m[1][0]==='z'){u=await zipBytes(u,0);if(!u)throw 'Trình duyệt này quá cũ để đọc mã, thử Chrome hoặc Safari mới hơn'}
  const d=JSON.parse(new TextDecoder().decode(u));if(!d||!d.stock||!d.day)throw 'Mã không có dữ liệu game';return d}
/* mã sao lưu 8 số: bản sao lưu cất trên máy chủ của game (Cloudflare), 8 số là chìa để lấy lại */
const CLOUD='https://tiemtranho-api.trongnhi110266.workers.dev';
async function cloudFetch(path,opt){const ac=new AbortController(),t=setTimeout(()=>ac.abort(),15000);
  try{const r=await fetch(CLOUD+path,{...opt,signal:ac.signal});const j=await r.json().catch(()=>({}));if(!r.ok)throw j.error||'Máy chủ báo lỗi';return j}
  catch(e){throw typeof e==='string'?e:'Không kết nối được máy chủ'}finally{clearTimeout(t)}}
async function cloudSave(long){S.cloud=S.cloud||{};const j=await cloudFetch('/save',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({key:S.cloud.key,code:S.cloud.code||undefined,data:long})});
  if(!/^\d{8}$/.test(j.code||''))throw 'Máy chủ trả mã sai';S.cloud.code=j.code;save();return j.code}
async function cloudLoad(code){const j=await cloudFetch('/load?code='+code,{method:'GET'});const d=await readBackup(j.data);d.cloud={key:(d.cloud||{}).key,code};return d}
const fmtCode=c=>c.slice(0,4)+' '+c.slice(4);
async function backupDlg(){$('card').onchange=null;S.bakDay=S.day;save();
  $('card').innerHTML=`<h2>Sao lưu tiến trình</h2><p>Đang tạo mã…</p>`;$('modal').hidden=false;
  S.cloud=S.cloud||{};if(!S.cloud.key){const a=new Uint8Array(12);crypto.getRandomValues(a);S.cloud.key=[...a].map(x=>x.toString(36).padStart(2,'0')).join('').slice(0,24)}save();
  let code;try{code=await makeBackup()}catch(e){$('card').innerHTML=`<h2>Không tạo được mã</h2><button class="big" id="bkClose">Đóng</button>`;$('bkClose').onclick=showSettings;return}
  $('card').innerHTML=`<h2>Sao lưu tiến trình</h2><p>Đang gửi lên máy chủ…</p>`;
  let c8=null,cErr='';try{c8=await cloudSave(code)}catch(e){cErr=e}
  $('card').innerHTML=`<h2>Mã sao lưu</h2>${c8?`<p>Ghi lại 8 số này. Bị mất tiến trình thì vào Cài đặt > Khôi phục từ mã rồi nhập 8 số (cần có mạng). Sao lưu lại lần sau vẫn giữ nguyên mã này.</p><div class="c8" id="c8">${fmtCode(c8)}</div><div class="sndrow"><button class="sbtn pri" id="c8Copy">Chép 8 số</button></div>`:`<p class="warnline"><b>Chưa tạo được mã 8 số: ${esc(cErr)}.</b> Dùng mã dài bên dưới, hoặc thử lại khi có mạng.</p>`}
    <p class="lvup">${esc(shopName())} · Ngày ${S.day} · ${fmt(S.money)}</p>
    ${c8?'<details class="c8more"><summary>Mã dài dự phòng (dùng được khi không có mạng)</summary>':''}<textarea id="bkCode" class="rpin" readonly style="min-height:90px;font-size:12px!important;word-break:break-all">${code}</textarea>
    <div class="sndrow"><button class="sbtn ghost" id="bkCopy">Chép mã</button><button class="sbtn ghost" id="bkFile">Lưu thành file</button></div>${c8?'</details>':''}
    <button class="big" id="bkClose" style="margin-top:12px">Xong</button>`;
  if($('c8Copy'))$('c8Copy').onclick=async()=>{let ok=false;try{await navigator.clipboard.writeText(c8);ok=true}catch(e){}toast(ok?'Đã chép '+fmtCode(c8):'Ghi lại 8 số: '+fmtCode(c8),4000,1)};
  $('bkCopy').onclick=async()=>{const t=$('bkCode');let ok=false;try{await navigator.clipboard.writeText(code);ok=true}catch(e){}if(!ok){t.focus();t.select();try{ok=document.execCommand('copy')}catch(e){}}t.blur();toast(ok?'Đã chép mã':'Giữ vào ô mã để chép')};
  {let inFrame=true;try{inFrame=window.self!==window.top}catch(e){}if(inFrame)$('bkFile').hidden=true}
  $('bkFile').onclick=async()=>{const name='tiemtranho-ngay-'+S.day+'.txt',f=new File([code],name,{type:'text/plain'});
    try{if(navigator.canShare&&navigator.canShare({files:[f]})){await navigator.share({files:[f],title:'Sao lưu Tiệm Trà Mơ Ước'});return}}catch(e){if(e&&e.name==='AbortError')return}
    const a=document.createElement('a');a.href=URL.createObjectURL(f);a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},1000)};
  $('bkClose').onclick=showSettings}
function restoreDlg(msg){$('card').onchange=null;
  $('card').innerHTML=`<h2>Khôi phục từ mã</h2><p>Nhập mã 8 số (cần có mạng), hoặc dán mã dài, hoặc chọn file sao lưu.</p>${msg?`<p class="warnline"><b>${esc(msg)}</b></p>`:''}
    <textarea id="rsCode" class="rpin" placeholder="12345678 hoặc TTN1…" style="min-height:90px;font-size:12px!important;word-break:break-all"></textarea>
    <div class="sndrow"><label class="sbtn ghost" style="display:flex;align-items:center;justify-content:center;cursor:pointer">Chọn file<input type="file" id="rsFile" accept=".txt,text/plain" hidden></label></div>
    <div class="askbtns"><button class="big" id="rsGo">Khôi phục</button><button class="sbtn ghost" id="rsBack">Quay lại</button></div>`;
  $('modal').hidden=false;
  $('rsFile').onchange=e=>{const f=e.target.files[0];if(!f)return;f.text().then(t=>{$('rsCode').value=t.trim();toast('Đã đọc file')})};
  $('rsBack').onclick=()=>{if(!$('splash').hidden)$('modal').hidden=true;else showSettings()};
  $('rsGo').onclick=async()=>{const code=$('rsCode').value;if(isField(document.activeElement))document.activeElement.blur();let d;const c8=String(code||'').replace(/[\s.-]/g,'');try{if(/^\d{8}$/.test(c8)){$('rsGo').disabled=true;$('rsGo').textContent='Đang tải…';d=await cloudLoad(c8)}else d=await readBackup(code)}catch(e){restoreDlg(typeof e==='string'?e:'Mã không đọc được');return}
    ask(`<div class="pbig">${ico('reload')}</div><h2>Khôi phục tiến trình?</h2><p>Bản sao lưu: <b>${esc(d.shopName||'Tiệm Trà Mơ Ước')}</b> · Ngày ${d.day} · ${fmt(d.money||0)}</p><p>Tiến trình hiện tại (ngày ${S.day}) sẽ bị thay thế.</p>`,
      [['Huỷ',()=>restoreDlg()],['Khôi phục',()=>{closeSplash();applyRestore(d)},1]])}}
function showSettings(){
  $('card').onchange=null;
  $('card').innerHTML=`<h2>${ico('set')} Cài đặt</h2><div class="setl">
    <button class="setb" id="sGuide"><span>${ico('book')}</span>Hướng dẫn</button>
    <button class="setb" id="sNews"><span>${ico('gift')}</span>Có gì mới<small>v${GAME_VERSION}</small></button>
    <button class="setb" id="sUpdate" style="background:linear-gradient(135deg,#e3f7ed,#d1f2e1);border-color:#5aae86"><span>🔄</span><b>Cập nhật bản mới</b><small>Tải lại web & Xoá cache</small></button>
    <button class="setb" id="sZalo"><span>🧵</span>Kênh Threads & Lời nhắn Dev<small>Mã Threads</small></button>
    <button class="setb" id="sCoach"><span>${ico('book')}</span>Chỉ dẫn từng bước<small>${S.coach===true?'Luôn bật':S.coach===false?'Tắt':'Tự động'}</small></button>
    <button class="setb" id="sLen"><span>${ico('clock')}</span>Thời gian bán mỗi ngày<small>${S.dayLen||CFG.dayMin} phút${R.running?' · áp dụng từ ngày sau':''}</small></button>
    <button class="setb" id="sTheme"><span>${ico('pen')}</span>Màu giao diện<small>${(THEMES.find(x=>x.id===THEME)||THEMES[0]).n}</small></button>
    <button class="setb" id="sMus"><span>${ico('moon')}</span>Nhạc Lofi Quán Cafe<small>${AU.mus?'Bật':'Tắt'}</small></button>
    <button class="setb" id="sSnd"><span>${ico('pause')}</span>Âm thanh (rót, múc…)<small>${AU.on?'Bật':'Tắt'}</small></button>
    <button class="setb" id="sBak"><span>${ico('box')}</span>Sao lưu tiến trình<small>${S.bakDay?'Lần cuối: ngày '+S.bakDay:'Chưa sao lưu'}</small></button>
    <button class="setb" id="sAuto"><span>${ico('calendar')}</span>Khôi phục bản tự lưu<small>Game tự lưu 3 cuối ngày gần nhất</small></button>
    <button class="setb" id="sRes"><span>${ico('reload')}</span>Khôi phục từ mã</button>
    <button class="setb warnb" id="sReset"><span>${ico('reload')}</span>Chơi lại từ đầu</button></div>
    <button class="big" id="sClose" style="margin-top:12px">Đóng</button>`;
  $('modal').hidden=false;
  $('sClose').onclick=()=>{$('modal').hidden=true};
  $('sGuide').onclick=()=>{$('modal').hidden=true;showTour(false,true)};
  $('sNews').onclick=()=>showNews(false);

  if($('sUpdate'))$('sUpdate').onclick=async ()=>{
    toast('Đang lưu tiến trình và cập nhật bản web mới...');
    try{
      if(typeof save==='function') save();
      if(typeof autoBak==='function') autoBak();
    }catch(e){}
    try{
      if('caches' in window){
        const ks = await caches.keys();
        await Promise.all(ks.map(k=>caches.delete(k)));
      }
      if('serviceWorker' in navigator){
        const rs = await navigator.serviceWorker.getRegistrations();
        await Promise.all(rs.map(r=>r.unregister()));
      }
    }catch(e){}
    setTimeout(()=>{
      const bustUrl = window.location.origin + window.location.pathname + '?_v=' + encodeURIComponent(GAME_VERSION) + '&_t=' + Date.now();
      window.location.href = bustUrl;
    }, 400);
  };
  $('sZalo').onclick=()=>{if($('modal'))$('modal').hidden=true;showZaloBanner()};
  $('sTheme').onclick=themeDlg;
  $('sLen').onclick=()=>{const L=[4,5,6],c=S.dayLen||CFG.dayMin;S.dayLen=L[(L.indexOf(c)+1)%L.length];save();toast('Mỗi ngày bán '+S.dayLen+' phút, khách tới nhiều hơn theo thời gian');showSettings()};
  $('sMus').onclick=()=>{AU.mus=!AU.mus;saveAu();musSync();showSettings()};
  $('sSnd').onclick=()=>{AU.on=!AU.on;saveAu();showSettings()};
  $('sCoach').onclick=()=>{S.coach=S.coach==null?true:S.coach===true?false:undefined;if(S.coach===undefined)delete S.coach;save();showSettings()};
  $('sBak').onclick=backupDlg;$('sAuto').onclick=autoRestoreDlg;$('sRes').onclick=()=>restoreDlg();
  $('sReset').onclick=()=>ask('<div class="pbig">'+ico('reload')+'</div><h2>Chơi lại từ đầu?</h2>',[['Huỷ',showSettings],['Xoá và chơi lại',()=>{const n=S.shopName;S=fresh();S.shopName=n;save();R.tab='kho';renderPrep()},1]]);
}

function showZaloBanner(){
  let b=$('spBanner');
  if(!b){
    const d=document.createElement('div');
    d.innerHTML=`<div class="sp-banner-overlay" id="spBanner">
      <div class="sp-banner-card">
        <button class="sp-banner-close" id="spBannerClose" aria-label="Đóng">✕</button>
        <div class="sp-banner-badge">📢 Lời nhắn từ Dev</div>
        <h2 class="sp-banner-title">Tiệm Trà Mơ Ước</h2>
        <p class="sp-banner-text">Mọi người có thể vào Threads để cập nhập thông báo mới nha. Cảm ơn mọi người chơi game này. Mình tự nhận 100% không biết gì về code, cũng không phải dân trong ngành. Mục đích tạo ra bản Trà Sữa Mơ Ước cũng vì 1 phần đam mê của mình. Chân thành cảm ơn mọi người!!!<br><br>💡 <b>Mẹo:</b> Ấn 1 lần nút cập nhật bên dưới là có bản mới liền nghen ^^</p>
        <div class="sp-banner-qr-wrap">
          <img src="img/threads.png" alt="Mã Threads" class="sp-banner-qr">
          <span class="sp-banner-qr-caption">Quét mã QR để theo dõi kênh Threads cập nhật mới!</span>
        </div>
        <button class="sp-banner-btn" id="spBannerBtn">Đóng</button>
        <button type="button" class="sp-banner-btn sp-banner-update-btn" id="spBannerUpdateBtn2" style="background:linear-gradient(135deg,#0284c7,#0369a1);margin-top:8px;box-shadow:0 6px 16px rgba(2,132,199,.35);">🔄 Cập nhật bản mới</button>
      </div>
    </div>`;
    document.body.appendChild(d.firstElementChild);
    b=$('spBanner');
    $('spBannerClose').onclick=()=>b.style.display='none';
    $('spBannerBtn').onclick=()=>b.style.display='none';
    const forceUpdateAndClearCache = async () => {
      try {
        if ('caches' in window) {
          const ks = await caches.keys();
          await Promise.all(ks.map(k => caches.delete(k)));
        }
        if (navigator.serviceWorker) {
          const regs = await navigator.serviceWorker.getRegistrations();
          await Promise.all(regs.map(r => r.unregister()));
        }
      } catch (e) {}
      try { localStorage.removeItem('tsSeenV11_box'); } catch (e) {}
      const sep = location.pathname.includes('?') ? '&' : '?';
      const cleanUrl = location.origin + location.pathname + sep + '_bust=' + Date.now();
      window.location.replace(cleanUrl);
    };
    if ($('spBannerUpdateBtn2')) $('spBannerUpdateBtn2').onclick = forceUpdateAndClearCache;
  }
  b.style.display='flex';
}

/* ===== TRƯỚC TIỆM & BẢO VỆ THẦN MÈO KARIN ===== */
let frontPedTimer = null;
let frontShopTimer = null;
let frontPeds = [];
let karinPatrol = { x: 50, speed: 0, dir: 1 };
const KARIN_COOLDOWN = 5 * 60 * 1000; // 5 phút hồi chiêu

function updateKarinPatrol(){
  const wrap = $('frontKarinWrap');
  if(!wrap || wrap._inited) return;
  wrap._inited = true;
  karinPatrol.x = 50;
  wrap.style.left = '50%';
  const img = $('frontKarinImg');
  const imgBox = $('frontKarinBtn');
  if(imgBox) imgBox.style.transform = '';
  if(img) img.style.transform = 'scaleX(1)';
}

function getKarinCooldownRem(){
  const last = S.karinLastBuffTime || 0;
  const passed = Date.now() - last;
  return Math.max(0, KARIN_COOLDOWN - passed);
}

const FRONT_PED_POOLS = [
  // 6 Khách hàng dạo phố độc quyền từ img/nv (1.png đến 6.png)
  { src: 'img/nv/1.png', name: 'Bo Scooter', quotes: ['Ghé tiệm làm ly trà sữa mát lạnh rồi vi vu tiếp! 🛵🧋', 'Trà sữa ở đây thơm nức mũi cả con phố! ✨', 'Cho em một ly size L nhiều trân châu nhé! 🥤'] },
  { src: 'img/nv/2.png', name: 'Mai Dạo Phố', quotes: ['Trời mát thế này chạy xe ghé tiệm uống trà sữa là nhất! 🛵💖', 'Mùi trà sữa thơm quá, tí phải ghé mua mới được! 🧋', 'Quán xinh xắn quá, phục vụ lại nhiệt tình nữa! 🥰'] },
  { src: 'img/nv/3.png', name: 'Hoa Áo Dài', quotes: ['Đạp xe dạo phố ghé mua ly trà lài thơm ngát! 🚲🌸', 'Trà sữa ngọt thanh làm một ngày thêm tươi tắn! 🧋✨', 'Em mua một ly đem về thưởng trà ngắm hoa nhé! 🍵'] },
  { src: 'img/nv/4.png', name: 'Phong Biker', quotes: ['Lượn vài vòng phố rồi tấp vào làm ly đậm vị! 🏍️⚡', 'Trà sữa đậm vị chuẩn gu biker luôn sếp ơi! 🧋🔥', 'Cho một ly full topping nạp năng lượng lên đường! 🥤'] },
  { src: 'img/nv/5.png', name: 'Chú Cảnh Sát', quotes: ['Tuần tra giữ an ninh trật tự cho phố trà sữa! 👮‍♂️🛵', 'Tiệm buôn bán văn minh, trà sữa ngon chuẩn vị! 🧋✨', 'Bà con ghé ủng hộ quán trà uy tín nhé! ☕👍'] },
  { src: 'img/nv/6.png', name: 'Shipper Thỏ Vàng', quotes: ['Đang đi giao đơn trà sữa nóng hổi đây bà con ơi! 🛵📦', 'Tiệm làm đồ uống nhanh quá, shipper nhận đơn là thích mê! 🧋⚡', 'Hôm nay đơn tiệm nổ ầm ầm, chạy mỏi tay luôn! 🌟🥤'] }
];

function updateFrontShopUI(){
  const rem = getKarinCooldownRem();
  const btn = $('frontCallBtn');
  const info = $('frontBuffInfo');
  if(!btn) return;
  if(rem > 0){
    const remSec = Math.ceil(rem / 1000);
    const m = Math.floor(remSec / 60);
    const s = remSec % 60;
    const timeStr = `${m}p ${s < 10 ? '0' : ''}${s}s`;
    btn.textContent = `⏳ Hồi Chiêu: ${timeStr}`;
    btn.classList.add('on-cooldown');
    if(info) info.innerHTML = `<span>🐾 <b>Thần Mèo Karin:</b> Đang tịnh tâm tu luyện. Hãy quay lại sau <b>${timeStr}</b> nhé!</span>`;
  } else {
    btn.textContent = `📣 Xin Phước Thần Mèo (+20s Chờ & Tiền)`;
    btn.classList.remove('on-cooldown');
    if(info) info.innerHTML = `<span>🐾 <b>Thần Mèo Karin:</b> Ấn nhận bảo vệ: +20s kiên nhẫn toàn tiệm & cơ hội nhận lì xì tiền vía! (5p/lần)</span>`;
  }
}


document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    if (frontPedTimer) { clearInterval(frontPedTimer); frontPedTimer = null; }
  } else {
    const m = $('frontshop-modal');
    if (m && !m.hidden && !frontPedTimer) {
      frontPedTimer = setInterval(updateFrontPedestrians, 100);
    }
  }
});

function openFrontShop(){
  const m = $('frontshop-modal');
  if(!m) return;
  m.hidden = false;
  if($('frontShopName')) $('frontShopName').textContent = shopName();
  if($('frontDoorShopName')) $('frontDoorShopName').textContent = shopName();
  if($('frontShopLiveTag')){
    if(R.mode === 'sell'){
      $('frontShopLiveTag').textContent = `🥤 Ca bán đang mở · Ngày ${S.day}`;
    } else {
      $('frontShopLiveTag').textContent = `🏮 Tiệm đang chuẩn bị · Ngày ${S.day}`;
    }
  }
  const rem = getKarinCooldownRem();
  if($('frontKarinBubble')){
    if(rem > 0){
      const remSec = Math.ceil(rem / 1000);
      const m = Math.floor(remSec / 60);
      const s = remSec % 60;
      $('frontKarinBubble').innerHTML = `🐾 <b>Karin:</b> Tớ vừa ban phước rồi, đang tịnh tâm nạp năng lượng! Hãy quay lại sau <b>${m}p ${s < 10 ? '0' : ''}${s}s</b> nhé! ✨`;
    } else if(R.mode === 'sell'){
      $('frontKarinBubble').innerHTML = `🐾 <b>Karin:</b> Quán đang mở ca! Chạm vào tớ để xin phước: tăng +20s chờ và cơ hội nhận tiền tài lộc!`;
    } else {
      $('frontKarinBubble').innerHTML = `🐾 <b>Karin:</b> Chào bạn! Chạm vào tớ để xin vía may mắn buôn may bán đắt và nhận tiền lì xì nhé!`;
    }
  }
  if($('frontKarinWrap')) $('frontKarinWrap').style.left = '50%';
  if($('frontKarinImg')) $('frontKarinImg').style.transform = 'scaleX(1)';
  updateFrontShopUI();
  if(frontShopTimer) clearInterval(frontShopTimer);
  frontShopTimer = setInterval(updateFrontShopUI, 1000);
  initFrontPedestrians();
}

function closeFrontShop(){
  const m = $('frontshop-modal');
  if(m) m.hidden = true;
  if(frontPedTimer){
    clearInterval(frontPedTimer);
    frontPedTimer = null;
  }
  if(frontShopTimer){
    clearInterval(frontShopTimer);
    frontShopTimer = null;
  }
}

function karinCheer(){
  const rem = getKarinCooldownRem();
  if(rem > 0){
    const remSec = Math.ceil(rem / 1000);
    const m = Math.floor(remSec / 60);
    const s = remSec % 60;
    const timeStr = `${m}p ${s < 10 ? '0' : ''}${s}s`;
    if($('frontKarinBubble')) $('frontKarinBubble').innerHTML = `🐾 <b>Karin:</b> Tớ đang hồi phục năng lượng, quay lại sau <b>${timeStr}</b> nữa nhé! ✨`;
    toast(`⏳ Thần Mèo Karin đang tịnh tâm! Chờ ${timeStr} nữa nhé!`);
    sfx('tap');
    return;
  }

  // Ban phước & tính hồi chiêu 5 phút
  S.karinLastBuffTime = Date.now();
  save();

  const img = $('frontKarinImg');
  if(img){
    img.classList.remove('karin-cheer');
    void img.offsetWidth;
    img.classList.add('karin-cheer');
  }
  try{ sfx('bell'); }catch(_){}
  try{ sfx('coin'); }catch(_){}

  // Đôi khi Thần Mèo còn cho tiền (50% cơ hội)
  let bonusMoney = 0;
  if(Math.random() < 0.5){
    const tiers = [50000, 80000, 100000, 150000, 200000, 300000, 500000];
    bonusMoney = rnd(tiers);
    S.money = (S.money || 0) + bonusMoney;
    save();
    head();
  }

  // Floating particle - bay lên phía trên thần mèo và bóng thoại, không đè lên mèo và không xuống dòng
  const wrap = $('frontKarinWrap') || $('frontshop-view');
  if(wrap){
    const pt = document.createElement('div');
    pt.className = 'front-particle';
    if(bonusMoney > 0){
      pt.innerHTML = `💰 +${fmt(bonusMoney)} TÀI LỘC · +20s KIÊN NHẪN 🐾`;
    } else {
      pt.innerHTML = '🪙 +20s KIÊN NHẪN · GIỮ CHÂN KHÁCH 🐾';
    }
    wrap.appendChild(pt);
    setTimeout(()=>pt.remove(), 1800);
  }

  if(bonusMoney > 0){
    if($('frontKarinBubble')) $('frontKarinBubble').innerHTML = `🐾 <b>Karin:</b> Meo meo! Tớ tặng tiệm <b>+${fmt(bonusMoney)}</b> tiền tài lộc và tăng +20s kiên nhẫn! Hẹn gặp lại sau 5 phút nhé! 💰✨`;
    toast(`🐾 Thần Mèo Karin vừa tặng bạn +${fmt(bonusMoney)} tiền vía may mắn!`);
  } else {
    const karinQuotes = [
      `🐾 Meo meo! Quý khách ơi vào tiệm uống trà sữa thơm ngon đậm vị nhé! Đã tăng +20s kiên nhẫn! (Hồi chiêu 5p) ✨`,
      `🐾 Karin vẫy tay gọi khách! Các bạn cứ yên tâm thưởng trà, tớ tăng thời gian chờ cho tiệm nè! (Hồi chiêu 5p) 🧋`,
      `🐾 Thần Mèo Karin bảo vệ an ninh tiệm: Chống quỵt tiền, giữ khách vui vẻ, tăng +20s kiên nhẫn! (Hồi chiêu 5p) 🛡️`
    ];
    if($('frontKarinBubble')) $('frontKarinBubble').innerHTML = `🐾 <b>Karin:</b> ${rnd(karinQuotes)}`;
    toast(`🐾 Thần Mèo Karin đã ban phước +20s kiên nhẫn! (Hồi chiêu 5 phút)`);
  }

  // Buff effects
  R.karinGuardBuff = (R.karinGuardBuff || 0) + 1;
  let buffedCount = 0;
  if(R.slots && R.slots.length){
    R.slots.forEach(c => {
      if(c){
        c.max = (c.max || 45) + 12; c.pat = Math.min(c.max, (c.pat || 0) + 12);
        buffedCount++;
      }
    });
  }

  if(R.mode === 'sell'){
    // Giữ chân khách & Chào mời khách mới ghé quán
    if(typeof pSlots === 'function' && typeof maxP === 'function' && typeof spawn === 'function'){
      const openSlots = pSlots().filter(Boolean).length;
      if(openSlots < maxP()){
        spawn();
      }
    }
    if(typeof renderLane === 'function') renderLane();
    if(typeof renderPanel === 'function') renderPanel();
  }
  updateFrontShopUI();
}

function changePedestrianRandom(p){
  if(!p || !p.el) return;
  const pool = FRONT_PED_POOLS.filter(x => !p.item || x.src !== p.item.src);
  const nextItem = rnd(pool.length ? pool : FRONT_PED_POOLS);
  if(nextItem){
    p.item = nextItem;
    const img = p.el.querySelector('.front-pedestrian-img');
    if(img){
      img.src = nextItem.src;
      img.alt = nextItem.name || 'Khách đi đường';
    }
  }
}

function initFrontPedestrians(){
  const container = $('frontPedestrians');
  if(!container) return;
  container.innerHTML = '';
  frontPeds = [];
  const count = 1; // Chỉ 1 khách duy nhất dạo phố, ngẫu nhiên từ bộ ảnh img/nv
  const item = rnd(FRONT_PED_POOLS);
  const ped = {
    id: 0,
    item,
    x: Math.random() < 0.5 ? 18 : 82,
    speed: 0.11 * (Math.random() < 0.5 ? 1 : -1),
    el: null,
    talking: false
  };
  const el = document.createElement('div');
  el.className = 'front-pedestrian';
  el.innerHTML = `
    <div class="front-pedestrian-bubble" style="display:none"></div>
    <img src="${item.src}" class="front-pedestrian-img" alt="${item.name || 'Khách đi đường'}">
  `;
  el.onclick = () => onPedestrianClick(ped);
  container.appendChild(el);
  ped.el = el;
  frontPeds.push(ped);

  if(frontPedTimer) clearInterval(frontPedTimer);
  frontPedTimer = setInterval(updateFrontPedestrians, 100);
}

function updateFrontPedestrians(){
  updateKarinPatrol();
  if(!frontPeds.length) return;
  frontPeds.forEach(p => {
    if(!p.el) return;
    const img = p.el.querySelector('.front-pedestrian-img');
    if(p.movingToCenter){
      // Khi ấn vào khách, khách di chuyển mượt mà vào giữa dưới (x = 50%)
      const diff = 50 - p.x;
      if(Math.abs(diff) > 0.8){
        p.speed = Math.sign(diff) * 0.35;
        p.x += p.speed;
        p.el.style.left = p.x + '%';
        if(img) img.style.transform = p.speed < 0 ? 'scaleX(-1)' : 'scaleX(1)';
      } else {
        p.x = 50;
        p.movingToCenter = false;
        p.el.style.left = '50%';
        if(img) img.style.transform = 'scaleX(1)';
      }
      return;
    }
    if(p.talking) return;
    p.x += p.speed;
    if(p.x > 86){
      p.x = 86;
      p.speed = -Math.abs(p.speed);
      changePedestrianRandom(p);
    } else if(p.x < 14){
      p.x = 14;
      p.speed = Math.abs(p.speed);
      changePedestrianRandom(p);
    }
    p.el.style.left = p.x + '%';
    if(img) img.style.transform = p.speed < 0 ? 'scaleX(-1)' : 'scaleX(1)';
  });
}

function onPedestrianClick(ped){
  if(!ped || !ped.el) return;

  // Trả các khách khác về trạng thái bình thường nếu đang nói
  frontPeds.forEach(other => {
    if(other !== ped && (other.talking || other.movingToCenter)){
      other.talking = false;
      other.movingToCenter = false;
      if(other.el){
        other.el.classList.remove('focused');
        const obub = other.el.querySelector('.front-pedestrian-bubble');
        if(obub) obub.style.display = 'none';
      }
      if(other._talkTimeout) clearTimeout(other._talkTimeout);
    }
  });

  ped.talking = true;
  ped.movingToCenter = true; // Kích hoạt chạy vào giữa dưới
  ped.el.classList.add('focused');
  
  const bub = ped.el.querySelector('.front-pedestrian-bubble');
  const quotes = (ped.item && ped.item.quotes && ped.item.quotes.length)
    ? ped.item.quotes
    : [
        'Em vào quầy order ngay đây ạ! 🧋',
        'Tiệm trà thơm nức mũi, ghé liền! ✨',
        'Bảo vệ mèo Karin cưng xỉu, vô uống trà! 🐾',
        'Cho em một ly trà sữa full topping nhen! 🥤',
        'Đang khát nước gặp ngay quán ngon! 🥰'
      ];
  if(bub){
    bub.textContent = rnd(quotes);
    bub.style.display = 'block';
  }

  if(ped._talkTimeout) clearTimeout(ped._talkTimeout);
  ped._talkTimeout = setTimeout(()=>{
    if(bub) bub.style.display = 'none';
    ped.talking = false;
    ped.movingToCenter = false;
    if(ped.el) ped.el.classList.remove('focused');
    // Tiếp tục di chuyển tản bộ ngẫu nhiên
    ped.speed = (0.14 + Math.random() * 0.22) * (Math.random() < 0.5 ? 1 : -1);
  }, 3500);

  try{ sfx('bell'); }catch(_){}
  if(R.mode === 'sell'){
    if(typeof pSlots === 'function' && typeof maxP === 'function' && typeof spawn === 'function'){
      const openSlots = pSlots().filter(Boolean).length;
      if(openSlots < maxP()){
        spawn();
        if(typeof renderLane === 'function') renderLane();
        if(typeof renderPanel === 'function') renderPanel();
      }
    }
  }
}

/* ---------- BOOT ---------- */
window.openBaucua = () => {
  if(!isTaxActive()){
    toast('🏛️ Quán chưa đóng thuế! Hãy vào mục "Đóng thuế" hoàn thành nghĩa vụ để được cấp phép chơi Bầu Cua Trân Châu nhé! 📜⚖️', 4500, 1);
    if(R && R.mode === 'prep' && typeof renderPrep === 'function'){
      R.tab = 'thue';
      renderPrep();
    }
    return;
  }
  if(window.BauCua && window.BauCua.open) window.BauCua.open();
};
window.openXidach = () => {
  if(!isTaxActive()){
    toast('🏛️ Quán chưa đóng thuế! Hãy vào mục "Đóng thuế" hoàn thành nghĩa vụ để được cấp phép chơi Xì Dách Quán Trà nhé! 📜⚖️', 4500, 1);
    if(R && R.mode === 'prep' && typeof renderPrep === 'function'){
      R.tab = 'thue';
      renderPrep();
    }
    return;
  }
  if(window.XiDach && window.XiDach.open) window.XiDach.open();
};
applyTheme(THEME);
$('pauseBtn').onclick=pauseGame;$('setBtn').onclick=showSettings;
if($('bcBtn')) $('bcBtn').onclick = () => window.openBaucua();
if($('xdBtn')) $('xdBtn').onclick = () => window.openXidach();
if($('frontBtn'))$('frontBtn').onclick=openFrontShop;
if($('frontShopBackBtn'))$('frontShopBackBtn').onclick=closeFrontShop;
if($('frontBotBackBtn'))$('frontBotBackBtn').onclick=closeFrontShop;
const frontModalEl=$('frontshop-modal');
if(frontModalEl){
  frontModalEl.addEventListener('click', e => {
    if(e.target === frontModalEl) closeFrontShop();
  });
}
document.addEventListener('keydown', e => {
  if(e.key === 'Escape' && $('frontshop-modal') && !$('frontshop-modal').hidden){
    closeFrontShop();
  }
});
if($('frontKarinBtn'))$('frontKarinBtn').onclick=karinCheer;
if($('frontCallBtn'))$('frontCallBtn').onclick=karinCheer;
try{if(navigator.storage&&navigator.storage.persist)navigator.storage.persist().catch(()=>{})}catch(e){}
window.tsHostOk = () => true;const had=load();if(S.sell.L>CFG.sizeCap)S.sell.L=CFG.sizeCap;R.today={stars:[]};document.title=shopName();renderPrep();
let _lastVer=null;try{_lastVer=localStorage.getItem('tsVer');localStorage.setItem('tsVer',GAME_VERSION)}catch(e){}
let _seenV11=false;try{_seenV11=localStorage.getItem('tsSeenV11_box')}catch(e){}
showSplash(had,()=>{
  if(had && S && S.day > 1 && S.lastBreakDay !== S.day){
    setTimeout(() => checkEquipBreakdown(), 400);
  }
});

/* Tự động kiểm tra cập nhật phiên bản mới từ server */
async function autoSyncVersion(){
  if(!location.protocol.startsWith('http')) return;
  try{
    const r = await fetch('version.json?_t=' + Date.now(), { cache: 'no-store' });
    if(!r.ok) return;
    const d = await r.json();
    if(d && d.version && d.version !== GAME_VERSION){
      console.log('🔄 Phát hiện phiên bản mới từ server:', d.version);
      const syncKey = 'last_sync_ver_' + d.version;
      const lastSync = parseInt(sessionStorage.getItem(syncKey) || '0', 10);
      if(Date.now() - lastSync < 30000){
        console.warn('⚠️ Đã thử đồng bộ phiên bản này, bỏ qua để tránh reload lặp');
        return;
      }
      sessionStorage.setItem(syncKey, String(Date.now()));
      // 1. Luôn bảo lưu dữ liệu tài khoản hiện tại trước khi cập nhật!
      try{
        if(typeof save === 'function') save();
        if(typeof autoBak === 'function') autoBak();
      }catch(e){}
      // 2. Xóa sạch CacheStorage và ServiceWorker
      if('caches' in window){
        try{
          const ks = await caches.keys();
          for(let k of ks) await caches.delete(k);
        }catch(e){}
      }
      if('serviceWorker' in navigator){
        try{
          const rs = await navigator.serviceWorker.getRegistrations();
          for(let reg of rs) await reg.unregister();
        }catch(e){}
      }
      // 3. Chuyển hướng kèm tham số _v và _t để ép Cloudflare & Trình duyệt tải 100% file HTML mới nhất
      const bustUrl = window.location.origin + window.location.pathname + '?_v=' + encodeURIComponent(d.version) + '&_t=' + Date.now();
      window.location.href = bustUrl;
    }
  }catch(e){}
}
autoSyncVersion();

/* Đồng hồ đếm ngược thời gian online game cho tính năng Bạn Bè & Rương Tiếp Tế */
setInterval(()=>{
  if(typeof document!=='undefined'&&!document.hidden&&window.S&&window.BanBe&&typeof window.BanBe.tickOnlineTime==='function'){
    window.BanBe.tickOnlineTime(1);
  }
},1000);



/* ============================================================
   BẢN ĐỒ SHIPPER GIAO HÀNG (MAP.JPG, BIỂN HIỆU & SHIPPER 6.PNG)
   ============================================================ */

const SHIPPER_ROUTES = [
  // Tuyến 1: Quán -> Lâu đài trên đỉnh (Castle) -> Quán
  [
    { x: 270, y: 520, pause: 1200, bubble: "Lấy trà 🧋" },
    { x: 260, y: 560 },
    { x: 220, y: 600 },
    { x: 190, y: 560 },
    { x: 130, y: 500 },
    { x: 80, y: 440 },
    { x: 80, y: 360 },
    { x: 130, y: 310 },
    { x: 180, y: 260 },
    { x: 230, y: 200 },
    { x: 290, y: 170, pause: 2000, bubble: "Giao Lâu Đài! 🏰", deliver: "+45.000đ ⭐" },
    { x: 360, y: 190 },
    { x: 420, y: 240 },
    { x: 430, y: 310 },
    { x: 390, y: 380 },
    { x: 350, y: 440 },
    { x: 270, y: 520, pause: 1200, bubble: "Về quầy! 💨" }
  ],
  // Tuyến 2: Quán -> Vòng xuyến công viên & Khu phố phía Nam -> Quán
  [
    { x: 270, y: 520, pause: 800, bubble: "Đơn giao gấp! 🛵" },
    { x: 250, y: 570 },
    { x: 210, y: 620 },
    { x: 170, y: 680 },
    { x: 140, y: 740 },
    { x: 130, y: 810 },
    { x: 160, y: 880 },
    { x: 230, y: 940 },
    { x: 340, y: 940, pause: 2000, bubble: "Giao Phố Nam! 🏡", deliver: "+35.000đ ⭐" },
    { x: 420, y: 880 },
    { x: 440, y: 800 },
    { x: 400, y: 730 },
    { x: 330, y: 660 },
    { x: 250, y: 570 },
    { x: 270, y: 520, pause: 1000, bubble: "Đã về tiệm! ✨" }
  ],
  // Tuyến 3: Quán -> Tiệm Kem & Khu dân cư Đông -> Quán
  [
    { x: 270, y: 520, pause: 1500, bubble: "Nhận 2 ly Matcha 🍵" },
    { x: 310, y: 470 },
    { x: 360, y: 420 },
    { x: 420, y: 380 },
    { x: 480, y: 440 },
    { x: 500, y: 520, pause: 2000, bubble: "Giao Tiệm Kem! 🍨", deliver: "+30.000đ ⭐" },
    { x: 470, y: 600 },
    { x: 400, y: 660 },
    { x: 330, y: 660 },
    { x: 250, y: 570 },
    { x: 270, y: 520, pause: 1000, bubble: "Về nạp pin! 🔋" }
  ]
];

class MapShipperRunner {
  constructor(route, speed, delay, parentEl) {
    this.route = route;
    this.speed = speed || 48;
    this.currentWp = 0;
    this.progress = 0;
    this.pauseUntil = Date.now() + (delay || 0);

    this.el = document.createElement('div');
    this.el.className = 'shipper-unit';
    this.el.innerHTML = `
      <div class="shipper-bubble">🛵 Đang chạy</div>
      <img src="img/6.png" class="shipper-img" alt="Shipper">
    `;
    parentEl.appendChild(this.el);

    this.bubbleEl = this.el.querySelector('.shipper-bubble');
    this.imgEl = this.el.querySelector('.shipper-img');

    const quotes = [
      "🛵 'Đơn trà sữa trân châu đường đen đang giao hỏa tốc đến Lâu Đài nè sếp ơi!' 💨",
      "🧋 'Khách dặn nhớ cắm ống hút to để hút trân châu, em phóng 40km/h luôn!' ⚡",
      "⭐ 'Quán mình được chấm 5 sao giao hàng nhanh nè sếp! Vui quá xá!' 🎉",
      "🐰 'Tai thỏ trên mũ bảo hiểm bay phấp phới trong gió mát rượi luôn nè!' ✨"
    ];

    this.el.onclick = (e) => {
      e.stopPropagation();
      const q = quotes[Math.floor(Math.random() * quotes.length)];
      toast(q, 3500);
      sfx('tap');
    };

    this.updatePos(this.route[0].x, this.route[0].y, 1);
  }

  updatePos(x, y, facing) {
    this.el.style.left = x + 'px';
    this.el.style.top = y + 'px';
    this.imgEl.style.transform = facing < 0 ? 'scaleX(-1)' : 'scaleX(1)';
  }

  showFloatToast(text, x, y) {
    const canvas = $('shipperMapCanvas');
    if(!canvas) return;
    const f = document.createElement('div');
    f.className = 'delivery-float-pop';
    f.textContent = text;
    f.style.left = x + 'px';
    f.style.top = y + 'px';
    canvas.appendChild(f);
    setTimeout(() => { if(f.parentNode) f.remove(); }, 1600);
  }

  tick(dt) {
    if (Date.now() < this.pauseUntil) return;

    const p1 = this.route[this.currentWp];
    const nextIdx = (this.currentWp + 1) % this.route.length;
    const p2 = this.route[nextIdx];

    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist === 0) {
      this.currentWp = nextIdx;
      this.progress = 0;
      return;
    }

    const step = (this.speed * dt) / dist;
    this.progress += step;

    if (this.progress >= 1) {
      this.currentWp = nextIdx;
      this.progress = 0;
      const reached = this.route[this.currentWp];
      if (reached.pause) {
        this.pauseUntil = Date.now() + reached.pause;
      }
      if (reached.bubble && this.bubbleEl) {
        this.bubbleEl.textContent = reached.bubble;
      }
      if (reached.deliver) {
        this.showFloatToast(reached.deliver, reached.x, reached.y);
      }
    }

    const curX = p1.x + (p2.x - p1.x) * this.progress;
    const curY = p1.y + (p2.y - p1.y) * this.progress;
    const facing = dx >= 0 ? -1 : 1; // 6.png gốc quay về bên trái, sang phải thì lật scaleX(-1)

    this.updatePos(curX, curY, facing);
  }

  destroy() {
    if (this.el && this.el.parentNode) {
      this.el.remove();
    }
  }
}

let shipperMapRunners = [];
let shipperMapAnimId = null;
let shipperMapLastT = 0;

function startShipperSimulation(){
  stopShipperSimulation();
  const wrap = $('shippersWrap');
  if(!wrap) return;
  wrap.innerHTML = '';

  shipperMapRunners = [
    new MapShipperRunner(SHIPPER_ROUTES[0], 52, 0, wrap),
    new MapShipperRunner(SHIPPER_ROUTES[1], 46, 2000, wrap),
    new MapShipperRunner(SHIPPER_ROUTES[2], 48, 4500, wrap)
  ];

  shipperMapLastT = performance.now();
  function animLoop(now){
    const dt = Math.min(0.1, (now - shipperMapLastT) / 1000);
    shipperMapLastT = now;
    shipperMapRunners.forEach(r => r.tick(dt));
    shipperMapAnimId = requestAnimationFrame(animLoop);
  }
  shipperMapAnimId = requestAnimationFrame(animLoop);
}

function stopShipperSimulation(){
  if(shipperMapAnimId){
    cancelAnimationFrame(shipperMapAnimId);
    shipperMapAnimId = null;
  }
  shipperMapRunners.forEach(r => r.destroy());
  shipperMapRunners = [];
  const wrap = $('shippersWrap');
  if(wrap) wrap.innerHTML = '';
}

function openShipperMap(){
  const m = $('shippermap-modal');
  if(!m) return;
  m.hidden = false;

  const curShopName = (typeof shopName === 'function' ? shopName() : (S && S.shopName) || 'Tiệm Trà Mơ Ước');
  if($('centerSignName')) $('centerSignName').textContent = curShopName;
  if($('shipperMapShopSub')) $('shipperMapShopSub').textContent = `${curShopName} · Ngày ${S ? S.day : 1}`;

  const onCount = (R && R.online) ? R.online.length : 0;
  if($('shipperMapCount')) $('shipperMapCount').textContent = Math.max(3, onCount + 2);

  // Cuộn vào trung tâm quán (Y: 460, X: 286)
  const vp = $('shipperMapViewport');
  if(vp){
    setTimeout(()=>{
      const targetY = 460 - vp.clientHeight / 2;
      const targetX = 286 - vp.clientWidth / 2;
      vp.scrollTo({ top: Math.max(0, targetY), left: Math.max(0, targetX), behavior: 'smooth' });
    }, 40);
  }

  startShipperSimulation();
  sfx('tap');
}

function closeShipperMap(){
  const m = $('shippermap-modal');
  if(m) m.hidden = true;
  stopShipperSimulation();
  sfx('tap');
}

// Gắn sự kiện cho nút biển hiệu trung tâm và nút trở về
document.addEventListener('DOMContentLoaded', ()=>{
  if($('shipperMapBackBtn')) $('shipperMapBackBtn').onclick = closeShipperMap;
  if($('centerSignboard')) {
    $('centerSignboard').onclick = () => {
      const curShopName = (typeof shopName === 'function' ? shopName() : (S && S.shopName) || 'Tiệm Trà Mơ Ước');
      const onCount = (R && R.online) ? R.online.length : 0;
      toast(`🏪 ${curShopName}: Trụ sở điều phối giao hàng! Đang có ${onCount} đơn trực tuyến cần phục vụ.`, 3500);
      sfx('tap');
    };
  }
});
