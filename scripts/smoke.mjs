const base=process.env.SMOKE_BASE||'http://127.0.0.1:8787';
const fail=m=>{throw new Error(m)};
async function req(path,opt={}){
  const r=await fetch(base+path,opt);
  let j={};try{j=await r.json()}catch{}
  return {r,j};
}
const health=await req('/api/health');
if(!health.r.ok||!health.j.ok)fail('health endpoint failed');
if(!health.j.database)fail('D1 binding missing in smoke environment');

const username='ci_'+Date.now().toString(36);
const password='CiSmokePass123!';
const reg=await req('/api/auth/register',{
  method:'POST',
  headers:{'content-type':'application/json'},
  body:JSON.stringify({username,password,displayName:'CI Smoke'})
});
if(reg.r.status!==201)fail('register failed: '+JSON.stringify(reg.j));
const cookie=(reg.r.headers.get('set-cookie')||'').split(';')[0];
if(!cookie.includes('ttn_session='))fail('session cookie missing');

const me=await req('/api/auth/me',{headers:{cookie}});
if(!me.r.ok||!me.j.authenticated||me.j.user?.username!==username)fail('auth/me failed');

const payload='{"day":1,"money":123456,"smoke":true}';
const save1=await req('/api/account/save',{
  method:'PUT',
  headers:{'content-type':'application/json',cookie},
  body:JSON.stringify({save:payload,revision:0,clientUpdatedAt:Date.now()})
});
if(!save1.r.ok||save1.j.revision!==1)fail('initial cloud save failed: '+JSON.stringify(save1.j));

const load=await req('/api/account/save',{headers:{cookie}});
if(!load.r.ok||load.j.save!==payload||load.j.revision!==1)fail('cloud load failed');

const stale=await req('/api/account/save',{
  method:'PUT',
  headers:{'content-type':'application/json',cookie},
  body:JSON.stringify({save:'{"day":2}',revision:0,clientUpdatedAt:Date.now()})
});
if(stale.r.status!==409||stale.j.revision!==1)fail('revision conflict was not enforced');

const legacy=await req('/api/save',{
  method:'POST',
  headers:{'content-type':'application/json'},
  body:JSON.stringify({key:'cismokeownerkey123456789',data:'TTN1.ci-smoke'})
});
if(legacy.r.status!==201||!/^[0-9]{8}$/.test(String(legacy.j.code||'')))fail('legacy backup create failed');
const legacyLoad=await req('/api/load?code='+legacy.j.code);
if(!legacyLoad.r.ok||legacyLoad.j.data!=='TTN1.ci-smoke')fail('legacy backup load failed');

// referral reward flow: inviter + fresh invitee both receive 300k
const refMe=await req('/api/referral/me',{headers:{cookie}});
if(!refMe.r.ok||!refMe.j.code||!refMe.j.link)fail('referral/me failed: '+JSON.stringify(refMe.j));
const inviteeUser='ci_ref_'+Date.now().toString(36);
const inviteeReg=await req('/api/auth/register',{
  method:'POST',headers:{'content-type':'application/json'},
  body:JSON.stringify({username:inviteeUser,password,displayName:'CI Referral'})
});
if(inviteeReg.r.status!==201)fail('referral invitee register failed: '+JSON.stringify(inviteeReg.j));
const inviteeCookie=(inviteeReg.r.headers.get('set-cookie')||'').split(';')[0];
const claim=await req('/api/referral/claim',{
  method:'POST',headers:{'content-type':'application/json',cookie:inviteeCookie},
  body:JSON.stringify({code:refMe.j.code})
});
if(!claim.r.ok||Number(claim.j.reward)!==300000)fail('referral claim failed: '+JSON.stringify(claim.j));
const inviteeReward=await req('/api/referral/rewards/take',{method:'POST',headers:{'content-type':'application/json',cookie:inviteeCookie},body:'{}'});
if(!inviteeReward.r.ok||Number(inviteeReward.j.amount)!==300000)fail('invitee referral reward missing');
const inviterReward=await req('/api/referral/rewards/take',{method:'POST',headers:{'content-type':'application/json',cookie},body:'{}'});
if(!inviterReward.r.ok||Number(inviterReward.j.amount)!==300000)fail('inviter referral reward missing');
console.log('referral reward flow passed');

const logout=await req('/api/auth/logout',{method:'POST',headers:{'content-type':'application/json',cookie},body:'{}'});
if(!logout.r.ok)fail('logout failed');
const me2=await req('/api/auth/me',{headers:{cookie}});
if(!me2.r.ok||me2.j.authenticated)fail('logout session still authenticated');

console.log('smoke passed: health + auth + D1 autosave + revision conflict + legacy backup + referral rewards');
