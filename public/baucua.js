(() => {
  const modal = document.getElementById('baucua-modal');
  const card = document.getElementById('baucua-card');
  const openBtn = document.getElementById('bcBtn');
  if (!modal || !card || !openBtn) return;

  const ITEMS = [
    ['bau','Bầu','🍐'],['cua','Cua','🦀'],['tom','Tôm','🦐'],
    ['ca','Cá','🐟'],['ga','Gà','🐓'],['nai','Nai','🦌']
  ];
  const UNITS = [10000, 20000, 50000, 100000];
  let unit = UNITS[0];
  let bets = Object.fromEntries(ITEMS.map(x => [x[0], 0]));
  let dice = [];
  let result = '';
  let resultKind = '';

  const fmtMoney = n => typeof fmt === 'function' ? fmt(n) : Math.round(n).toLocaleString('vi-VN') + 'đ';
  const wallet = () => (typeof S === 'object' && S) ? Number(S.money || 0) : 0;
  const totalBet = () => Object.values(bets).reduce((a,b) => a+b, 0);

  function render() {
    card.innerHTML = `
      <div class="bc-head"><h2>🎲 Bầu Cua Tiệm Trà</h2><button class="bc-x" id="bcClose" aria-label="Đóng">×</button></div>
      <p class="bc-sub">Minigame giải trí bằng <b>tiền trong game</b>. Không nạp tiền, không đổi thưởng, không liên quan tiền thật.</p>
      <div class="bc-wallet"><span>Tiền két</span><span>${fmtMoney(wallet())}</span></div>
      <div class="bc-grid">${ITEMS.map(([id,label,emoji]) => `<button class="bc-item${bets[id] ? ' on':''}" data-bc="${id}"><span class="bc-emoji">${emoji}</span><span>${label}</span><span class="bc-bet">${bets[id] ? fmtMoney(bets[id]) : 'Chạm để cược'}</span></button>`).join('')}</div>
      <div class="bc-units">${UNITS.map(v => `<button class="bc-unit${unit===v?' on':''}" data-unit="${v}">+${fmtMoney(v)}</button>`).join('')}</div>
      <div class="bc-dice">${[0,1,2].map(i => { const d=dice[i]; return `<div class="bc-die">${d ? `<b>${d[2]}</b><small>${d[1]}</small>` : '<b>?</b><small>xúc xắc</small>'}</div>`}).join('')}</div>
      <div class="bc-actions"><button class="bc-btn bc-clear" id="bcClear">Xóa cược</button><button class="bc-btn bc-roll" id="bcRoll">Lắc · ${fmtMoney(totalBet())}</button></div>
      <div class="bc-result ${resultKind}">${result}</div>`;

    card.querySelectorAll('[data-bc]').forEach(b => b.onclick = () => {
      const id=b.dataset.bc;
      if (totalBet()+unit > wallet()) return notify('Tiền két không đủ cho mức cược này');
      bets[id] += unit; result=''; resultKind=''; render();
    });
    card.querySelectorAll('[data-unit]').forEach(b => b.onclick = () => { unit=Number(b.dataset.unit); render(); });
    card.querySelector('#bcClose').onclick = close;
    card.querySelector('#bcClear').onclick = () => { bets=Object.fromEntries(ITEMS.map(x=>[x[0],0])); dice=[]; result=''; resultKind=''; render(); };
    card.querySelector('#bcRoll').onclick = roll;
  }

  function notify(text){
    if (typeof toast === 'function') toast(text, 2500, 1);
    else result=text;
  }

  function roll(){
    if (typeof S !== 'object' || !S) return notify('Game chưa sẵn sàng');
    const stake=totalBet();
    if (!stake) return notify('Chọn ít nhất một cửa trước khi lắc');
    if (stake > wallet()) return notify('Tiền két không đủ');
    S.money -= stake;
    dice=[0,1,2].map(() => ITEMS[Math.floor(Math.random()*ITEMS.length)]);
    const hits=Object.fromEntries(ITEMS.map(([id]) => [id, dice.filter(d=>d[0]===id).length]));
    let payout=0;
    for (const [id,b] of Object.entries(bets)) if (b && hits[id]) payout += b * (hits[id] + 1);
    S.money += payout;
    const net=payout-stake;
    result = net > 0 ? `Thắng ${fmtMoney(net)} 🎉` : net === 0 ? 'Hòa vốn' : `Thua ${fmtMoney(Math.abs(net))}`;
    resultKind = net > 0 ? 'win' : net < 0 ? 'lose' : '';
    if (typeof save === 'function') save();
    if (typeof head === 'function') head();
    bets=Object.fromEntries(ITEMS.map(x=>[x[0],0]));
    render();
  }

  function open(){
    dice=[]; result=''; resultKind='';
    modal.hidden=false; render();
  }
  function close(){ modal.hidden=true; }
  openBtn.addEventListener('click', open);
  modal.addEventListener('click', e => { if (e.target === modal) close(); });
  addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) close(); });
})();
