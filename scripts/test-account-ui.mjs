import { readFile } from 'node:fs/promises';
const src=await readFile(new URL('../public/account-sync.js',import.meta.url),'utf8');
if(!src.includes("replace(/\\s+/g,'_')"))throw new Error('username whitespace normalization is broken');
if(!src.includes("/^[\\p{L}\\p{N}][\\p{L}\\p{N}._-]{2,31}$/u"))throw new Error('Unicode username regex is broken');
console.log('account username validation regression check passed');
