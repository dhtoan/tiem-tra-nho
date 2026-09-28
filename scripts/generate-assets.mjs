import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const ROOT = new URL('../public/img/', import.meta.url).pathname;
await mkdir(join(ROOT,'brand'), {recursive:true});
const esc=s=>String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot',"'":'&apos;'}[m]));
const write=(name,svg)=>writeFile(join(ROOT,name),svg);
const wrap=(body,view='0 0 64 64')=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${view}" role="img">${body}</svg>`;

const icons={
  angry:'!',book:'?',box:'▣',calendar:'31',chart:'↗',chartdown:'↘',chartup:'↗',clock:'◷',cupempty:'○',cupfull:'●',gift:'★',hourglass:'⌛',lock:'×',money:'₫',moon:'☾',pause:'Ⅱ',pearlbowl:'••',pen:'✎',people:'2',phone:'▯',price:'₫',receipt:'≡',reload:'↻',sad:':(',set:'⚙',star:'★',strawberry:'♥',teapot:'T',tools:'+',trash:'×',trophy:'★',upbulb:'!',upchair:'▱',upcups:'○○',upmega:'>',upsnow:'✣',warn:'!'
};
for(const [name,label] of Object.entries(icons)){
  await write(`ic_${name}.svg`,wrap(`<rect x="6" y="6" width="52" height="52" rx="16" fill="#fff7e8" stroke="#8a5a3b" stroke-width="3"/><text x="32" y="39" text-anchor="middle" font-family="system-ui,sans-serif" font-size="22" font-weight="800" fill="#8a3a50">${esc(label)}</text>`));
}
await write('app-icon.svg',wrap(`<rect width="64" height="64" rx="16" fill="#fdf3e4"/><path d="M16 24h30l-3 25H20z" fill="#f2c9a0" stroke="#8a5a3b" stroke-width="3"/><path d="M19 31h25l-1.6 14H21z" fill="#e9a0ad"/><path d="M26 15l15 0" stroke="#ef6f8e" stroke-width="5" stroke-linecap="round"/><path d="M37 15l5 15" stroke="#ef6f8e" stroke-width="4" stroke-linecap="round"/><circle cx="28" cy="39" r="3" fill="#5b3925"/><circle cx="35" cy="42" r="3" fill="#5b3925"/>`));

for(let i=0;i<50;i++){
  const hue=(i*37)%360, n=String(i+1).padStart(2,'0');
  await write(`brand/b${String(i).padStart(2,'0')}.svg`,wrap(`<circle cx="32" cy="32" r="27" fill="hsl(${hue} 70% 88%)" stroke="hsl(${hue} 50% 40%)" stroke-width="2"/><path d="M22 23h20l-2 22H24z" fill="#fff" opacity=".85"/><path d="M25 28h14" stroke="hsl(${hue} 50% 40%)" stroke-width="2"/><text x="32" y="39" text-anchor="middle" font-size="10" font-weight="800" font-family="system-ui" fill="hsl(${hue} 50% 35%)">${n}</text>`));
}

function scene(title,accent='#ef6f8e'){
  return wrap(`<rect width="768" height="1376" fill="#fdf3e4"/><rect x="35" y="70" width="698" height="210" rx="36" fill="#fffaf2" stroke="#ead7bd" stroke-width="8"/><path d="M35 300h698v72H35z" fill="${accent}"/><path d="M35 300h70v72H35zm140 0h70v72h-70zm140 0h70v72h-70zm140 0h70v72h-70zm140 0h70v72h-70" fill="#fff" opacity=".95"/><rect x="70" y="460" width="628" height="390" rx="34" fill="#8a5a3b"/><rect x="105" y="500" width="558" height="285" rx="24" fill="#fffaf2"/><circle cx="235" cy="630" r="76" fill="#f3d5bd"/><circle cx="533" cy="630" r="76" fill="#f3d5bd"/><rect x="92" y="920" width="584" height="250" rx="42" fill="#fffaf2" stroke="#ead7bd" stroke-width="8"/><text x="384" y="185" text-anchor="middle" font-size="52" font-family="system-ui" font-weight="900" fill="#3a2317">${esc(title)}</text><text x="384" y="1060" text-anchor="middle" font-size="40" font-family="system-ui" font-weight="800" fill="#8a3a50">Pha trà · Bán hàng · Nâng cấp</text>`, '0 0 768 1376');
}
await write('bg.svg',scene('TIỆM TRÀ NHỎ','#ef6f8e'));
await write('bg2.svg',scene('QUẦY TRÀ','#4fa883'));
await write('splash2.svg',scene('TIỆM TRÀ NHỎ','#f0b43c'));
await write('kho.svg',wrap(`<rect width="640" height="420" fill="#fdf3e4"/><rect x="50" y="60" width="540" height="300" rx="24" fill="#fffaf2" stroke="#8a5a3b" stroke-width="10"/><path d="M80 160h480M80 260h480" stroke="#ead7bd" stroke-width="12"/><g fill="#ef6f8e"><rect x="110" y="95" width="70" height="50" rx="8"/><rect x="235" y="95" width="70" height="50" rx="8"/><rect x="360" y="95" width="70" height="50" rx="8"/><rect x="485" y="95" width="45" height="50" rx="8"/></g><text x="320" y="400" text-anchor="middle" font-family="system-ui" font-weight="800" font-size="30" fill="#3a2317">KHO NGUYÊN LIỆU</text>`, '0 0 640 420'));
await write('cup.svg',wrap(`<path d="M18 10h92l-10 130H30z" fill="#fff" fill-opacity=".48" stroke="#8a5a3b" stroke-width="5"/><path d="M25 60h78l-5 72H32z" fill="#d49a6a" fill-opacity=".82"/><path d="M25 10h78" stroke="#fff" stroke-width="8"/>`, '0 0 128 150'));
await write('lid.svg',wrap(`<rect x="5" y="12" width="118" height="20" rx="10" fill="#fff" stroke="#8a5a3b" stroke-width="4"/>`, '0 0 128 44'));
await write('cathead.svg',wrap(`<circle cx="32" cy="34" r="22" fill="#f2c9a0"/><path d="M14 18L20 5l11 12M50 18L44 5 33 17" fill="#f2c9a0"/><circle cx="24" cy="34" r="2.5"/><circle cx="40" cy="34" r="2.5"/><path d="M28 42q4 4 8 0" fill="none" stroke="#3a2317" stroke-width="2"/>`));
await write('lanL.svg',wrap(`<path d="M60 4C30 18 12 42 8 60c28-8 43-22 52-56z" fill="#ff8ba7"/><path d="M59 6C41 28 27 43 12 56" fill="none" stroke="#8a3a50" stroke-width="2"/>`));
await write('lanR.svg',wrap(`<path d="M4 4c30 14 48 38 52 56C28 52 13 38 4 4z" fill="#ff8ba7"/><path d="M5 6c18 22 32 37 47 50" fill="none" stroke="#8a3a50" stroke-width="2"/>`));
for(const [name,shape] of Object.entries({stk_pearl:'●',stk_star:'★',stk_cup:'○',stk_heart:'♥',stk_berry:'●',stk_leaf:'◆',stk_cloud:'☁'})){
  await write(`${name}.svg`,wrap(`<text x="32" y="43" text-anchor="middle" font-size="38" font-family="system-ui" font-weight="900" fill="#ef6f8e">${esc(shape)}</text>`));
}

let faces='<rect width="180" height="531" fill="none"/>';
for(let r=0;r<9;r++)for(let c=0;c<3;c++){
  const x=c*60,y=r*59,h=(r*41+c*17)%360;
  faces+=`<g transform="translate(${x} ${y})"><circle cx="30" cy="29" r="23" fill="hsl(${h} 55% 82%)" stroke="#8a5a3b" stroke-width="2"/><path d="M10 25q20-28 40 0" fill="hsl(${(h+180)%360} 35% 35%)"/><circle cx="23" cy="30" r="2"/><circle cx="37" cy="30" r="2"/><path d="M24 39q6 ${c===2?'-5':'5'} 12 0" fill="none" stroke="#3a2317" stroke-width="2"/></g>`;
}
await write('faces.svg',wrap(faces,'0 0 180 531'));
let stars='<rect width="120" height="312" fill="none"/>';
for(let r=0;r<8;r++)for(let c=0;c<3;c++){
  const x=c*40,y=r*39;
  stars+=`<g transform="translate(${x} ${y})"><circle cx="20" cy="19" r="16" fill="#fff7e8"/><path d="M20 4l4 9 10 1-7 7 2 10-9-5-9 5 2-10-7-7 10-1z" fill="#f0b43c"/><text x="20" y="23" text-anchor="middle" font-size="8" font-family="system-ui" font-weight="900">${r+1}</text></g>`;
}
await write('star.svg',wrap(stars,'0 0 120 312'));
let ship='<rect width="120" height="78" fill="none"/>';
for(let r=0;r<2;r++)for(let c=0;c<3;c++){
  const x=c*40,y=r*39;
  ship+=`<g transform="translate(${x} ${y})"><circle cx="20" cy="19" r="16" fill="${r?'#d7e9ff':'#ffe0e8'}"/><path d="M8 17q12-16 24 0" fill="#4f6680"/><circle cx="15" cy="21" r="2"/><circle cx="25" cy="21" r="2"/><path d="M15 28h10" stroke="#3a2317" stroke-width="2"/></g>`;
}
await write('ship.svg',wrap(ship,'0 0 120 78'));
console.log(`generated ${Object.keys(icons).length + 50 + 17} SVG assets`);
