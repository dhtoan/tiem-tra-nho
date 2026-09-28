import worker from '../src/worker.js';

const env={
  ASSETS:{fetch:async()=>new Response('asset',{status:200})},
  ALLOWED_HOSTS:'tiemtranho.aunomay.com'
};

const res=await worker.fetch(new Request('https://tiemtranho.aunomay.com/api/auth/me'),env);
const body=await res.json();
if(res.status!==200)throw new Error('Expected /api/auth/me to degrade gracefully without D1, got HTTP '+res.status);
if(body.authenticated!==false)throw new Error('Expected authenticated:false without D1');
if(body.cloudAvailable!==false)throw new Error('Expected cloudAvailable:false without D1');
console.log('no-db auth/me fallback passed');
