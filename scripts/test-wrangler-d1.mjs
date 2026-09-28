import { readFile, access } from 'node:fs/promises';

const wrangler=await readFile(new URL('../wrangler.toml',import.meta.url),'utf8');
if(!wrangler.includes('[[d1_databases]]'))throw new Error('wrangler.toml must declare D1 binding');
if(!/binding\s*=\s*"DB"/.test(wrangler))throw new Error('wrangler.toml must bind D1 as DB');
if(!/database_name\s*=\s*"tiem-tra-nho"/.test(wrangler))throw new Error('wrangler.toml must use tiem-tra-nho D1');
if(!/database_id\s*=\s*"[^"]+"/.test(wrangler))throw new Error('wrangler.toml must include production D1 database_id');

const pkg=JSON.parse(await readFile(new URL('../package.json',import.meta.url),'utf8'));
for(const name of ['db:local','db:remote','deploy:d1']){
  const s=String(pkg.scripts?.[name]||'');
  if(s.includes('wrangler.d1.toml'))throw new Error(name+' points to missing wrangler.d1.toml');
}
console.log('production D1 binding config regression checks passed');
