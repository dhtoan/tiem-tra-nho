import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const root=new URL('../',import.meta.url).pathname;
const out=join(root,'dist');
const accountCss=await readFile(join(root,'public/account-sync.css'),'utf8');
const accountJs=await readFile(join(root,'public/account-sync.js'),'utf8');
await rm(out,{recursive:true,force:true});
await mkdir(out,{recursive:true});

// Keep production helpers/PWA files.
await cp(join(root,'public'),out,{recursive:true});

// Aunomay Tiệm Trà Nhỏ 1.0.0 runtime, upgraded from reference 12.47.19.
for(const dir of ['css','js','img']){
  await cp(join(root,dir),join(out,dir),{recursive:true});
}

let html=await readFile(join(root,'reference/tiemtramouoc/index.html'),'utf8');
html=html
  .replace(/https:\/\/tiemtramouoc\.tensorship\.tech\//g,'/')
  .replace(/(?:css\/style\.css|\/css\/style\.css)\?v=[^"'<>]+/g,'/css/style.css')
  .replace(/(?:css\/baucua\.css|\/css\/baucua\.css)\?v=[^"'<>]+/g,'/css/baucua.css')
  .replace(/(?:css\/xidach\.css|\/css\/xidach\.css)\?v=[^"'<>]+/g,'/css/xidach.css')
  .replace(/(?:css\/banbe\.css|\/css\/banbe\.css)\?v=[^"'<>]+/g,'/css/banbe.css')
  .replace(/(?:js\/banbe\.js|\/js\/banbe\.js)\?v=[^"'<>]+/g,'/js/banbe.js')
  .replace(/(?:js\/game\.js|\/js\/game\.js)\?v=[^"'<>]+/g,'/js/game.js')
  .replace(/(?:js\/baucua\.js|\/js\/baucua\.js)\?v=[^"'<>]+/g,'/js/baucua.js')
  .replace(/(?:js\/xidach\.js|\/js\/xidach\.js)\?v=[^"'<>]+/g,'/js/xidach.js')
  .replaceAll('Tiệm Trà Mơ Ước','Tiệm Trà Nhỏ')
  .replace(/var myVer = '12\.47\.19'/g,"var myVer = '1.0.0'")
  .replace(/12\.47\.19/g,'1.0.0')
  .replace(/<script[^>]+static\.cloudflareinsights\.com[^>]*><\/script>/gi,'')
  .replace(/<\/head>/i,`<link rel="manifest" href="/manifest.webmanifest"><link rel="icon" href="/img/icon-192.png" type="image/png"><link rel="apple-touch-icon" href="/img/icon-180.png"><link rel="stylesheet" href="/account-sync.css"><link rel="stylesheet" href="/referral.css"></head>`)
  .replace(/<\/body>/i,`<aside id="cloudSaveNudge" hidden role="status" aria-live="polite"><button id="caNudgeClose" type="button" aria-label="Đóng">×</button><b>☁️ Đừng mất tiến trình</b><span>Tạo tài khoản để Tiệm Trà Nhỏ tự động lưu khi bạn chơi và tiếp tục trên thiết bị khác.</span><div class="caNudgeActions"><button id="caNudgeOpen" type="button">Bật tự động lưu</button><button id="caNudgeLater" type="button">Để sau</button></div></aside><button id="cloudAccountBtn" type="button" aria-haspopup="dialog">☁️ Tài khoản</button><dialog id="cloudAccountDlg"><div class="caBox"><div class="caBtns"><h2>Tài khoản & Cloud Save</h2><button id="caClose" class="caAlt caClose" type="button">Đóng</button></div><p id="caIntro">Đăng nhập để bật tự động lưu cloud và tiếp tục tiệm trên thiết bị khác. Chưa đăng nhập vẫn lưu local bình thường.</p><div id="caGuest"><form id="caAuthForm"><div class="caGrid"><input id="caUserInput" autocomplete="username" maxlength="32" placeholder="Tên đăng nhập (3–32 ký tự)"><input id="caPassInput" type="password" autocomplete="new-password" maxlength="128" placeholder="Mật khẩu (tối thiểu 8 ký tự)"></div><div class="caBtns"><button id="caLogin" class="caPrimary" type="button">Đăng nhập</button><button id="caRegister" class="caAlt" type="submit">Tạo tài khoản</button></div><small class="caEnterHint">Nhấn Enter để tạo tài khoản</small></form></div><div id="caSigned" hidden><p>Đang đăng nhập: <span id="caUser"></span></p><div class="caBtns"><button id="caUpload" class="caPrimary" type="button">Lưu lên cloud</button><button id="caDownload" class="caAlt" type="button">Tải cloud về máy</button><button id="caLogout" class="caDanger" type="button">Đăng xuất</button></div></div><div id="caStatus" aria-live="polite"></div></div></dialog><script src="/account-sync.js"></script><script src="/vendor/qrcode.min.js"></script><script src="/referral.js"></script><script src="/bootstrap.js"></script></body>`);

await writeFile(join(out,'index.html'),html);
console.log('build complete: Tiệm Trà Nhỏ Aunomay 1.0.0 + Friends + account sync + Worker/PWA');
