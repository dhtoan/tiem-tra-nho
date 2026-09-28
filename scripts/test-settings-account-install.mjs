import { readFile } from 'node:fs/promises';

const game=await readFile(new URL('../js/game.js',import.meta.url),'utf8');
const account=await readFile(new URL('../public/account-sync.js',import.meta.url),'utf8');
const css=await readFile(new URL('../public/account-sync.css',import.meta.url),'utf8');

if(!game.includes('Tài khoản & Cloud Save'))throw new Error('Settings must contain account menu');
if(!game.includes('TTNAccount.open'))throw new Error('Settings account menu must open account dialog');
if(!game.includes('Đưa game ra màn hình chính'))throw new Error('Settings must contain Add to Home Screen menu');
if(!game.includes('beforeinstallprompt'))throw new Error('Game must capture beforeinstallprompt');
if(!game.includes('Cài ngay'))throw new Error('Install dialog must offer native install when available');
if(!game.includes('iPhone, iPad'))throw new Error('Install dialog must include iOS instructions');
if(!game.includes('Android'))throw new Error('Install dialog must include Android instructions');
if(!account.includes('window.TTNAccount'))throw new Error('Account module must expose a settings-callable API');
if(!css.includes('#cloudAccountBtn{display:none'))throw new Error('Floating account button must be hidden');
console.log('settings account and install menu regression checks passed');
