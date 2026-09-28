(() => {
  const KEY='tsShop2', TS='ttnCloudLocalChangedAt', NUDGE='ttnCloudNudgeAt';
  const AUTOSAVE_DELAY=2500, AUTOSAVE_INTERVAL=30000, NUDGE_FIRST=35000, NUDGE_COOLDOWN=20*60*1000;
  let user=null, revision=0, lastUploaded='', dirty=false, syncing=false, conflict=false, timer=null, periodic=null, nudgeTimer=null;
  const $=id=>document.getElementById(id);
  const api=async(path,opt={})=>{try{
    const r=await fetch(path,{credentials:'same-origin',headers:{'Content-Type':'application/json',...(opt.headers||{})},...opt});
    let j={};try{j=await r.json()}catch{}
    return {ok:r.ok,status:r.status,j};
  }catch{return {ok:false,status:0,j:{error:'Không kết nối được máy chủ.'}}}};
  const localSave=()=>{try{return localStorage.getItem(KEY)||''}catch{return ''}};
  const localTs=()=>{try{return Number(localStorage.getItem(TS)||0)||0}catch{return 0}};
  const mark=()=>{try{localStorage.setItem(TS,String(Date.now()))}catch{}};
  const status=t=>{const e=$('caStatus');if(e)e.textContent=t||''};
  function state(v){const b=$('cloudAccountBtn');if(b){b.dataset.sync=v;b.title=!user?'Tạo tài khoản để tự động lưu':v==='saving'?'Đang tự động lưu':v==='saved'?'Đã tự động lưu':v==='conflict'?'Cloud có bản mới hơn':'Tự động lưu cloud đang bật'}}
  function hideNudge(again=true){const n=$('cloudSaveNudge');if(!n)return;n.classList.remove('show');setTimeout(()=>{if(!n.classList.contains('show'))n.hidden=true},260);$('cloudAccountBtn')?.classList.remove('caPulse');if(again&&!user)scheduleNudge(NUDGE_COOLDOWN)}
  function showNudge(){if(user||document.visibilityState==='hidden'||!localSave())return scheduleNudge(NUDGE_FIRST);const n=$('cloudSaveNudge');if(!n)return;try{localStorage.setItem(NUDGE,String(Date.now()))}catch{}n.hidden=false;requestAnimationFrame(()=>n.classList.add('show'));$('cloudAccountBtn')?.classList.add('caPulse');setTimeout(()=>hideNudge(true),12000)}
  function scheduleNudge(delay=NUDGE_FIRST){clearTimeout(nudgeTimer);if(user)return;let last=0;try{last=Number(localStorage.getItem(NUDGE)||0)||0}catch{}nudgeTimer=setTimeout(showNudge,Math.max(1000,Math.max(delay,last+NUDGE_COOLDOWN-Date.now())))}
  function render(){const signed=!!user;$('caGuest').hidden=signed;$('caSigned').hidden=!signed;$('caUser').textContent=signed?(user.displayName||user.username):'';$('cloudAccountBtn').textContent=signed?'☁️ '+(user.displayName||user.username):'☁️ Tài khoản';if(signed)hideNudge(false);state(conflict?'conflict':'idle')}
  async function cloud(){const r=await api('/api/account/save',{method:'GET',headers:{}});if(!r.ok)return null;revision=Number(r.j.revision||0);return r.j}
  async function reconcile(){
    const m=await cloud();if(!m)return;
    const local=localSave(), lts=localTs(), cts=Number(m.clientUpdatedAt||m.updatedAt||0)||0;
    lastUploaded=typeof m.save==='string'?m.save:'';
    conflict=false;
    if(!m.save&&local){dirty=true;await upload(true);status('Đã bật tự động lưu. Tiến trình hiện tại đã được lưu lên cloud.');return}
    if(m.save===local){dirty=false;state('saved');status('Đã đồng bộ. Từ bây giờ game sẽ tự động lưu lên cloud.');return}
    if(local&&lts&&cts&&lts>cts){dirty=true;await upload(true);status('Đã đồng bộ bản chơi mới nhất lên cloud.');return}
    if(m.save&&cts&&(!lts||cts>lts)){conflict=true;state('conflict');status('Cloud đang có bản lưu mới hơn. Chọn “Tải cloud về máy” để tiếp tục bản đó.');return}
    dirty=false;state('idle');
  }
  async function me(){const r=await api('/api/auth/me',{method:'GET',headers:{}});user=r.ok&&r.j?.authenticated?r.j.user:null;render();if(user){startPeriodic();await reconcile()}else{stopPeriodic();scheduleNudge()}}
  async function auth(mode){
    const raw=$('caUserInput').value.normalize('NFKC').trim(), username=raw.toLocaleLowerCase('vi-VN').replace(/s+/g,'_'), pass=$('caPassInput').value;
    if(!/^[p{L}p{N}][p{L}p{N}._-]{2,31}$/u.test(username))return status('Tên đăng nhập cần 3–32 ký tự.');
    if(pass.length<8||pass.length>128)return status('Mật khẩu cần từ 8 đến 128 ký tự.');
    status('Đang xử lý…');
    const r=await api('/api/auth/'+mode,{method:'POST',body:JSON.stringify({username,password:pass,displayName:raw||username})});
    if(!r.ok)return status(r.j.error||'Không thực hiện được.');
    user=r.j.user;revision=0;render();startPeriodic();status(mode==='register'?'Đã tạo tài khoản. Đang đồng bộ…':'Đăng nhập thành công. Đang đồng bộ…');await reconcile();
  }
  async function upload(silent=false,keepalive=false){
    if(!user||syncing||(!dirty&&localSave()===lastUploaded))return;
    if(conflict&&silent)return;
    if(conflict&&!silent&&!confirm('Cloud đang có bản khác. Lưu bản trên thiết bị này để thay thế?'))return;
    const save=localSave();if(!save)return status('Chưa có bản lưu local.');
    syncing=true;state('saving');
    const r=await api('/api/account/save',{method:'PUT',body:JSON.stringify({save,revision,clientUpdatedAt:localTs()||Date.now()}),keepalive});
    syncing=false;
    if(r.ok){revision=Number(r.j.revision||revision+1);lastUploaded=save;dirty=false;conflict=false;state('saved');if(!silent)status('Đã lưu lên cloud.');return}
    if(r.status===409){revision=Number(r.j.revision||revision);conflict=true;state('conflict');status('Cloud có bản mới hơn. Hãy tải cloud về hoặc lưu thủ công để thay thế.');return}
    dirty=true;state('idle');if(!silent)status(r.j.error||'Lưu cloud thất bại. Game sẽ tự thử lại.');
  }
  async function downloadCloud(){
    const r=await api('/api/account/save',{method:'GET',headers:{}});if(!r.ok)return status(r.j.error||'Không tải được cloud.');
    revision=Number(r.j.revision||0);if(!r.j.save)return status('Tài khoản chưa có bản lưu cloud.');
    if(!confirm('Thay bản lưu trên thiết bị này bằng bản cloud? Trang sẽ tải lại.'))return;
    try{localStorage.setItem(KEY,r.j.save);localStorage.setItem(TS,String(Number(r.j.clientUpdatedAt||r.j.updatedAt||Date.now())))}catch{}
    location.reload();
  }
  async function logout(){await api('/api/auth/logout',{method:'POST',body:'{}'});user=null;revision=0;lastUploaded='';dirty=false;conflict=false;stopPeriodic();render();status('Đã đăng xuất. Bản local vẫn được giữ trên thiết bị.');scheduleNudge()}
  function startPeriodic(){clearInterval(periodic);periodic=setInterval(()=>{if(user&&dirty&&!conflict)upload(true)},AUTOSAVE_INTERVAL)}
  function stopPeriodic(){clearInterval(periodic);periodic=null}
  function watch(){
    let prev=localSave();
    setInterval(()=>{const cur=localSave();if(cur!==prev){prev=cur;mark();dirty=true;if(user&&!conflict){clearTimeout(timer);timer=setTimeout(()=>upload(true),AUTOSAVE_DELAY)}else if(!user)scheduleNudge()}},1000);
  }
  function bind(){
    $('cloudAccountBtn').onclick=()=>{$('cloudAccountDlg').showModal();status(user?'Tự động lưu cloud đang bật.':'Đăng nhập để bật tự động lưu cloud.')};
    $('caClose').onclick=()=>$('cloudAccountDlg').close();
    $('caLogin').onclick=()=>auth('login');$('caRegister').onclick=()=>auth('register');$('caUpload').onclick=()=>upload(false);$('caDownload').onclick=downloadCloud;$('caLogout').onclick=logout;
    $('caNudgeOpen').onclick=()=>{hideNudge(false);$('cloudAccountDlg').showModal();status('Tạo tài khoản hoặc đăng nhập để bật tự động lưu cloud.')};
    $('caNudgeLater').onclick=()=>hideNudge(true);$('caNudgeClose').onclick=()=>hideNudge(true);
    $('cloudAccountDlg').onclick=e=>{if(e.target===$('cloudAccountDlg'))$('cloudAccountDlg').close()};
    document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden'){if(user&&dirty&&!conflict)upload(true,true)}else if(!user)scheduleNudge()});
    addEventListener('pagehide',()=>{if(user&&dirty&&!conflict)upload(true,true)});
  }
  addEventListener('DOMContentLoaded',()=>{bind();watch();if(localSave()&&!localTs())mark();me()});
})();