import { readFile } from 'node:fs/promises';

const sw=await readFile(new URL('../public/sw.js',import.meta.url),'utf8');
if(!sw.includes("req.headers.has('range')")&&!sw.includes('req.headers.has("range")')){
  throw new Error('Service worker must bypass cache for Range requests');
}
if(!sw.includes("r.status!==206")&&!sw.includes("r.status !== 206")){
  throw new Error('Service worker must not cache HTTP 206 responses');
}

const game=await readFile(new URL('../js/game.js',import.meta.url),'utf8');
if(game.includes('tiemtranho-api.trongnhi110266.workers.dev')){
  throw new Error('Game must not call legacy external save host directly');
}
if(!game.includes("const CLOUD='/api'")){
  throw new Error('Game cloud API must be same-origin /api');
}
console.log('runtime cloud/save regression checks passed');
