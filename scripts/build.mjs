import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const root=new URL('../',import.meta.url).pathname;
const out=join(root,'dist');
await rm(out,{recursive:true,force:true});
await mkdir(out,{recursive:true});

// Keep production helpers/PWA files.
await cp(join(root,'public'),out,{recursive:true});

// Runtime from Tiệm Trà Mơ Ước 12.47.11.
for(const dir of ['css','js','img']){
  await cp(join(root,dir),join(out,dir),{recursive:true});
}

let html=await readFile(join(root,'reference/tiemtramouoc/index.html'),'utf8');
html=html
  .replace(/https:\/\/tiemtramouoc\.tensorship\.tech\//g,'/')
  .replace(/(?:css\/style\.css|\/css\/style\.css)\?v=12\.47\.11/g,'/css/style.css')
  .replace(/(?:css\/baucua\.css|\/css\/baucua\.css)\?v=12\.47\.11/g,'/css/baucua.css')
  .replace(/(?:css\/xidach\.css|\/css\/xidach\.css)\?v=12\.47\.11/g,'/css/xidach.css')
  .replace(/(?:js\/game\.js|\/js\/game\.js)\?v=12\.47\.11/g,'/js/game.js')
  .replace(/(?:js\/baucua\.js|\/js\/baucua\.js)\?v=12\.47\.11/g,'/js/baucua.js')
  .replace(/(?:js\/xidach\.js|\/js\/xidach\.js)\?v=12\.47\.11/g,'/js/xidach.js')
  .replace(/<script[^>]+static\.cloudflareinsights\.com[^>]*><\/script>/gi,'')
  .replace(/<\/body>/i,'<script src="/bootstrap.js"></script></body>');

await writeFile(join(out,'index.html'),html);
console.log('build complete: Tiệm Trà Mơ Ước 12.47.11 runtime + Aunomay Worker/PWA');
