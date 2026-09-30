import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { minify as minifyHtml } from 'html-minifier-terser';
import { minify as minifyJs } from 'terser';
import CleanCSS from 'clean-css';
import sharp from 'sharp';
import toIco from 'to-ico';

const root=new URL('../',import.meta.url).pathname;
const out=join(root,'dist');
const accountCss=await readFile(join(root,'public/account-sync.css'),'utf8');
const accountJs=await readFile(join(root,'public/account-sync.js'),'utf8');
await rm(out,{recursive:true,force:true});
await mkdir(out,{recursive:true});

// Keep production helpers/PWA files.
await cp(join(root,'public'),out,{recursive:true});

// Aunomay Tiệm Trà Nhỏ 1.0.0 runtime.
for(const dir of ['css','js','img']){
  await cp(join(root,'assets',dir),join(out,'assets',dir),{recursive:true});
}

// Generate the exact favicon / iOS / Android filenames from the supplied app icon.
// This keeps the repository lightweight while shipping optimized raster icons in production.
const iconSource=join(root,'assets/uploaded-icon-192.png');
const iconJobs=[
  ['favicon-16x16.png',16],['favicon-32x32.png',32],
  ['apple-touch-icon-120x120.png',120],['apple-touch-icon-152x152.png',152],
  ['apple-touch-icon-167x167.png',167],['apple-touch-icon.png',180],
  ['android-chrome-192x192.png',192],['android-chrome-512x512.png',512]
];
for(const [name,size] of iconJobs){
  await sharp(iconSource).resize(size,size,{fit:'cover'}).png({compressionLevel:9,palette:true,quality:88}).toFile(join(out,name));
}
await mkdir(join(out,'icons'),{recursive:true});
for(const size of [192,512]){
  await sharp(iconSource).resize(size,size,{fit:'cover'}).png({compressionLevel:9,palette:true,quality:88}).toFile(join(out,'icons',`maskable-${size}x${size}.png`));
}
await sharp(iconSource).resize(192,192,{fit:'cover'}).png({compressionLevel:9,palette:true,quality:88}).toFile(join(out,'assets','img','icon-192.png'));
await sharp(iconSource).resize(512,512,{fit:'cover'}).png({compressionLevel:9,palette:true,quality:88}).toFile(join(out,'assets','img','icon-512.png'));
const icoPng=await sharp(iconSource).resize(32,32,{fit:'cover'}).png().toBuffer();
await writeFile(join(out,'favicon.ico'),await toIco([icoPng]));

let html=await readFile(join(root,'src/index.html'),'utf8');
html=html
  .replace(/<script[^>]+static\.cloudflareinsights\.com[^>]*><\/script>/gi,'')
  .replace(/<\/head>/i,`<link rel="stylesheet" href="/account-sync.css"><link rel="stylesheet" href="/referral.css"></head>`)
  .replace(/<\/body>/i,`<aside id="cloudSaveNudge" hidden role="status" aria-live="polite"><button id="caNudgeClose" type="button" aria-label="Đóng">×</button><b>☁️ Đừng mất tiến trình</b><span>Tạo tài khoản để Tiệm Trà Nhỏ tự động lưu khi bạn chơi và tiếp tục trên thiết bị khác.</span><div class="caNudgeActions"><button id="caNudgeOpen" type="button">Bật tự động lưu</button><button id="caNudgeLater" type="button">Để sau</button></div></aside><button id="cloudAccountBtn" type="button" aria-haspopup="dialog">☁️ Tài khoản</button><dialog id="cloudAccountDlg"><div class="caBox"><div class="caBtns"><h2>Tài khoản & Cloud Save</h2><button id="caClose" class="caAlt caClose" type="button">Đóng</button></div><p id="caIntro">Đăng nhập để bật tự động lưu cloud và tiếp tục tiệm trên thiết bị khác. Chưa đăng nhập vẫn lưu local bình thường.</p><div id="caGuest"><form id="caAuthForm"><div class="caGrid"><input id="caUserInput" autocomplete="username" maxlength="32" placeholder="Tên đăng nhập (3–32 ký tự)"><input id="caPassInput" type="password" autocomplete="new-password" maxlength="128" placeholder="Mật khẩu (tối thiểu 8 ký tự)"></div><div class="caBtns"><button id="caLogin" class="caPrimary" type="button">Đăng nhập</button><button id="caRegister" class="caAlt" type="submit">Tạo tài khoản</button></div><small class="caEnterHint">Nhấn Enter để tạo tài khoản</small></form></div><div id="caSigned" hidden><p>Đang đăng nhập: <span id="caUser"></span></p><div class="caBtns"><button id="caUpload" class="caPrimary" type="button">Lưu lên cloud</button><button id="caDownload" class="caAlt" type="button">Tải cloud về máy</button><button id="caLogout" class="caDanger" type="button">Đăng xuất</button></div></div><div id="caStatus" aria-live="polite"></div></div></dialog><script src="/account-sync.js"></script><script src="/vendor/qrcode.min.js"></script><script src="/referral.js"></script><script src="/bootstrap.js"></script></body>`);

html=await minifyHtml(html,{
  collapseWhitespace:true,
  conservativeCollapse:true,
  removeComments:true,
  removeRedundantAttributes:true,
  removeScriptTypeAttributes:true,
  removeStyleLinkTypeAttributes:true,
  minifyCSS:true,
  minifyJS:false
});
await writeFile(join(out,'index.html'),html,'utf8');

// Light production CSS minification: preserve UTF-8 declaration and readable source files in repo.
for(const rel of ['assets/css/style.css','assets/css/baucua.css','assets/css/xidach.css','assets/css/banbe.css','account-sync.css','referral.css']){
  const file=join(out,rel);
  const source=await readFile(file,'utf8');
  const min=new CleanCSS({level:1,format:false}).minify(source);
  if(min.errors?.length)throw new Error('Could not minify '+rel+': '+min.errors.join('; '));
  let code=min.styles||source;
  if(rel.startsWith('css/')&&!code.startsWith('@charset "UTF-8";'))code='@charset "UTF-8";'+code.replace(/^@charset\s+["']UTF-8["'];?/i,'');
  await writeFile(file,code,'utf8');
}

const productionJs=[
  'assets/js/banbe.js','assets/js/game.js','assets/js/frontshop.js','assets/js/parity.js','assets/js/baucua.js','assets/js/xidach.js',
  'account-sync.js','referral.js','bootstrap.js','sw.js'
];
for(const rel of productionJs){
  const file=join(out,rel);
  const source=await readFile(file,'utf8');
  const min=await minifyJs(source,{
    compress:false,
    mangle:false,
    format:{comments:false,ascii_only:true,semicolons:true}
  });
  if(!min.code)throw new Error('Could not minify '+rel);
  await writeFile(file,min.code,'utf8');
}

console.log('build complete: hardened production, no source maps, ASCII-safe JS');
