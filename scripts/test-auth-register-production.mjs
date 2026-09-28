import { readFile } from 'node:fs/promises';

const worker=await readFile(new URL('../src/worker.js',import.meta.url),'utf8');
if(!worker.includes('async function hashPasswordFast'))throw new Error('new account hash must avoid PBKDF2 CPU spike');
if(!worker.includes('const passwordIterations=0')&&!worker.includes('const passwordIterations = 0'))throw new Error('new accounts must mark fast hash with iterations=0');
if(!worker.includes('storedIterations > 0'))throw new Error('login must preserve PBKDF2 compatibility for old accounts');
if(!worker.includes('hashPasswordFast(password'))throw new Error('register/login must use fast salted hash');

const account=await readFile(new URL('../public/account-sync.js',import.meta.url),'utf8');
if(!account.includes("addEventListener('keydown'"))throw new Error('account form must handle Enter');
if(!account.includes("auth('register')"))throw new Error('Enter must submit registration');

const build=await readFile(new URL('../scripts/build.mjs',import.meta.url),'utf8');
if(!build.includes('id="caAuthForm"'))throw new Error('guest account UI must be a form');
if(!build.includes('id="caRegister"')||!build.includes('type="submit"'))throw new Error('register must be the form submit action');

console.log('production auth CPU fallback and Enter-submit checks passed');
