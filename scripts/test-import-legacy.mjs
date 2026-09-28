import worker from '../src/worker.js';

const calls=[];
const env={
  DB:{
    prepare(sql){
      return {
        bind(...args){
          return {
            async first(){return null},
            async run(){calls.push({sql,args});return {success:true}}
          }
        }
      }
    }
  },
  ASSETS:{fetch:async()=>new Response('asset')},
  ALLOWED_HOSTS:'tiemtranho.aunomay.com'
};

globalThis.fetch=async url=>{
  if(String(url).startsWith('https://tiemtranho-api.trongnhi110266.workers.dev/load?code=')){
    return new Response(JSON.stringify({data:'TTN1.pQUJD.abc'}),{status:200,headers:{'content-type':'application/json'}});
  }
  throw new Error('unexpected external fetch '+url);
};

const req=new Request('https://tiemtranho.aunomay.com/api/import/legacy',{
  method:'POST',
  headers:{'content-type':'application/json','origin':'https://tiemtranho.aunomay.com'},
  body:JSON.stringify({provider:'trongnhi',code:'12345678',key:'abcdefghijklmnop'})
});
const res=await worker.fetch(req,env);
const body=await res.json();
if(res.status!==201)throw new Error('expected import 201, got '+res.status+' '+JSON.stringify(body));
if(!/^\d{8}$/.test(String(body.code||'')))throw new Error('expected new local 8-digit code');
if(!calls.some(x=>x.sql.includes('INSERT INTO cloud_saves')))throw new Error('import must persist into our D1');
console.log('legacy import gateway test passed');
