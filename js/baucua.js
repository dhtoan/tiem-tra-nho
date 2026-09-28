/**
 * 🧋 BẦU CUA TRÂN CHÂU - MINIGAME DỰ ĐOÁN LINH VẬT TRÀ SỮA (TIỆM TRÀ NHỎ V1.0)
 * Sử dụng hình ảnh chibi pastel gốc chuẩn theo tranh vẽ!
 */

(function () {
  // 6 linh vật Bầu Cua theo đúng thứ tự 2 cột x 3 hàng:
  // Cột 1: BẦU, GÀ, NAI
  // Cột 2: CUA, TÔM, CÁ
  const MASCOTS = [
    { id: 'bau', name: 'BẦU', img: 'img/bau.png' },
    { id: 'cua', name: 'CUA', img: 'img/cua.png' },
    { id: 'ga',  name: 'GÀ',  img: 'img/ga.png' },
    { id: 'tom', name: 'TÔM', img: 'img/tom.png' },
    { id: 'nai', name: 'NAI', img: 'img/nai.png' },
    { id: 'ca',  name: 'CÁ',  img: 'img/ca.png' }
  ];

  const CHIPS = [
    { val: 10000, label: '10k', cls: 'bc-chip-10k' },
    { val: 50000, label: '50k', cls: 'bc-chip-50k' },
    { val: 100000, label: '100k', cls: 'bc-chip-100k' },
    { val: 500000, label: '500k', cls: 'bc-chip-500k' },
    { val: 1000000, label: '1tr', cls: 'bc-chip-1m' },
    { val: 'all', label: 'Hết két', cls: 'bc-chip-all' }
  ];

  // Trạng thái Bầu Cua
  const state = {
    bets: { bau: 0, cua: 0, ga: 0, tom: 0, nai: 0, ca: 0 },
    lastBets: null,
    selectedChip: 50000,
    dice: ['bau', 'cua', 'tom'],
    isShaking: false,
    bowlOpen: true,
    lastWinAmount: 0,
    lastNet: 0,
    resultMsg: '',

    // Trạng thái đoàn kiểm tra ATTP
    isRaid: false,
    raidTime: 5.0,
    raidTimer: null,
    isBusted: false,
    fineAmount: 0,
    tableBetsConfiscated: 0,
    mathQuestion: null
  };

  // Lấy tiền két an toàn từ game
  function getMoney() {
    if (typeof window.getMoney === 'function') return window.getMoney();
    if (window.S && typeof window.S.money === 'number') return window.S.money;
    return 0;
  }

  // Cập nhật tiền két an toàn
  function setMoney(amount) {
    if (typeof window.setMoney === 'function') {
      window.setMoney(amount);
    } else if (window.S) {
      window.S.money = amount;
      if (typeof window.head === 'function') window.head();
      if (typeof window.save === 'function') window.save();
    }
  }

  // Âm thanh Bầu Cua đồng bộ 100% chuẩn Tiệm Trà Nhỏ
  function playSound(type) {
    try {
      if (typeof window.sfx === 'function') {
        if (type === 'chip') window.sfx('tap');
        else if (type === 'shake') window.sfx('cup');
        else if (type === 'win') { window.sfx('coin'); setTimeout(() => window.sfx('star'), 220); }
        else if (type === 'lose') window.sfx('bad');
        return;
      }
    } catch (e) {}
  }

  // Định dạng tiền tệ
  function fmtMoney(amount) {
    if (typeof window.fmt === 'function') return window.fmt(amount);
    return Number(amount || 0).toLocaleString('vi-VN') + 'đ';
  }

  function getTotalBet() {
    return Object.values(state.bets).reduce((a, b) => a + b, 0);
  }

  // Tạo phép tính cộng trừ nhân chia ngẫu nhiên 2 chữ số từ 1 đến 99
  function generateMathQuestion() {
    const ops = ['+', '-', '×', '÷'];
    const op = ops[Math.floor(Math.random() * ops.length)];
    let a, b, answer;

    if (op === '+') {
      a = Math.floor(Math.random() * 89) + 10;
      b = Math.floor(Math.random() * 89) + 10;
      answer = a + b;
    } else if (op === '-') {
      a = Math.floor(Math.random() * 89) + 10;
      b = Math.floor(Math.random() * (a - 5)) + 1;
      answer = a - b;
    } else if (op === '×') {
      a = Math.floor(Math.random() * 12) + 2;
      b = Math.floor(Math.random() * 9) + 2;
      answer = a * b;
    } else {
      b = Math.floor(Math.random() * 8) + 2;
      answer = Math.floor(Math.random() * 10) + 2;
      a = b * answer;
    }

    const choices = new Set([answer]);
    while (choices.size < 3) {
      const diff = (Math.floor(Math.random() * 6) + 1) * (Math.random() < 0.5 ? 1 : -1);
      const fake = answer + diff;
      if (fake >= 0 && fake !== answer) {
        choices.add(fake);
      }
    }

    const shuffled = Array.from(choices).sort(() => Math.random() - 0.5);

    return {
      text: `${a} ${op} ${b} = ?`,
      answer: answer,
      options: shuffled
    };
  }

  // Kích hoạt Đoàn Kiểm Tra Vệ Sinh An Toàn Thực Phẩm Đột Xuất (5 giây)
  function triggerPoliceRaid() {
    if (state.isRaid || state.isBusted) return;
    state.isRaid = true;
    state.raidTime = 5.0;
    state.mathQuestion = generateMathQuestion();
    playSound('lose');

    if (state.raidTimer) clearInterval(state.raidTimer);
    state.raidTimer = setInterval(() => {
      state.raidTime -= 0.1;
      if (state.raidTime <= 0) {
        clearInterval(state.raidTimer);
        state.raidTimer = null;
        policeBusted();
      } else {
        updateRaidTimerUI();
      }
    }, 100);

    renderUI();
  }

  function updateRaidTimerUI() {
    const bar = document.getElementById('bcRaidBar');
    const txt = document.getElementById('bcRaidTimeTxt');
    if (bar) bar.style.width = Math.max(0, (state.raidTime / 5.0) * 100) + '%';
    if (txt) txt.textContent = Math.max(0, state.raidTime).toFixed(1) + 's';
  }

  function submitMathAnswer(ans) {
    if (!state.isRaid || !state.mathQuestion) return;
    if (Number(ans) === state.mathQuestion.answer) {
      evadePolice();
    } else {
      policeBusted();
    }
  }

  function evadePolice() {
    if (!state.isRaid) return;
    if (state.raidTimer) {
      clearInterval(state.raidTimer);
      state.raidTimer = null;
    }
    state.isRaid = false;
    playSound('win');
    if (typeof window.toast === 'function') {
      window.toast('😮‍💨 Nhanh trí giải đúng phép tính! Bạn đã cất đĩa xóc và dọn sạch quầy kịp thời trước khi đoàn kiểm tra bước vào! ✨', 4500, 1);
    }
    renderUI();
  }

  function policeBusted() {
    if (state.raidTimer) {
      clearInterval(state.raidTimer);
      state.raidTimer = null;
    }
    state.isRaid = false;
    state.isBusted = true;

    // Tổng tiền đang cược trên bàn bầu cua
    const totalTableBets = getTotalBet();
    state.tableBetsConfiscated = totalTableBets;

    // Tăng mức phạt thành 7tr và tổng giá trị tiền đang cược trên bàn
    const totalFine = 7000000 + totalTableBets;
    const curMoney = getMoney();
    const fine = Math.min(curMoney, totalFine);
    state.fineAmount = fine;

    setMoney(Math.max(0, curMoney - fine));
    if (window.S && window.S.cur) window.S.cur.bad = (window.S.cur.bad || 0) + fine;
    if (window.R && window.R.today) window.R.today.bad = (window.R.today.bad || 0) + fine;

    // Tịch thu toàn bộ tiền cược đang đặt trên bàn
    MASCOTS.forEach(m => state.bets[m.id] = 0);

    // Giảm số sao quán: thêm 2 đánh giá 1 sao cảnh cáo
    if (window.S && Array.isArray(window.S.reviews)) {
      window.S.reviews.unshift({
        s: 1,
        t: `Đoàn kiểm tra liên ngành ATTP lập biên bản xử phạt 7tr + tịch thu ${fmtMoney(totalTableBets)} tiền cá cược bầu cua trái phép! 1 sao cảnh cáo!`,
        k: 'attp_bc_bust_' + Date.now(),
        d: window.S.day || 1,
        o: false,
        n: 'Đoàn Kiểm Tra ATTP',
        f: '👮‍♂️'
      });
      window.S.reviews.unshift({
        s: 1,
        t: 'Tiệm trà bị lập biên bản vì cờ bạc bầu cua và vệ sinh an toàn thực phẩm kém! Thất vọng 1 sao!',
        k: 'attp_bc_cust_' + Date.now(),
        d: window.S.day || 1,
        o: false,
        n: 'Khách Qua Đường',
        f: '😤'
      });
      if (typeof window.head === 'function') window.head();
      if (typeof window.save === 'function') window.save();
    }

    playSound('lose');
    renderUI();
  }

  function closeBusted() {
    state.isBusted = false;
    BauCua.close();
  }

  // Đặt cược vào 1 ô linh vật
  function placeBet(mascotId) {
    if (state.isShaking || state.isRaid || state.isBusted) return;
    const currentMoney = getMoney();
    const currentBet = getTotalBet();
    const avail = currentMoney - currentBet;

    if (avail <= 0) {
      state.resultMsg = '⚠️ Két tiền của quán không đủ để góp thêm!';
      if (typeof window.toast === 'function') window.toast('⚠️ Két tiền của quán không đủ để góp thêm!');
      renderUI();
      return;
    }

    let add = state.selectedChip;
    if (add === 'all') {
      add = avail;
    } else {
      add = Math.min(add, avail);
    }

    if (add <= 0) {
      state.resultMsg = '⚠️ Không còn đủ tiền trong két!';
      renderUI();
      return;
    }

    state.bets[mascotId] = (state.bets[mascotId] || 0) + add;
    state.resultMsg = '';
    playSound('chip');
    renderUI();
  }

  // Xoá toàn bộ lựa chọn hiện tại
  function clearBets() {
    if (state.isShaking || state.isRaid || state.isBusted) return;
    MASCOTS.forEach(m => state.bets[m.id] = 0);
    state.resultMsg = '';
    renderUI();
  }

  // Chọn lại lượt trước
  function rebet() {
    if (state.isShaking || state.isRaid || state.isBusted || !state.lastBets) return;
    const prevTotal = Object.values(state.lastBets).reduce((a, b) => a + b, 0);
    if (prevTotal > getMoney()) {
      state.resultMsg = '⚠️ Két tiền không đủ để chọn lại mức trước!';
      renderUI();
      return;
    }
    state.bets = { ...state.lastBets };
    state.resultMsg = '';
    playSound('chip');
    renderUI();
  }

  // Nhân đôi lựa chọn hiện tại
  function doubleBets() {
    if (state.isShaking || state.isRaid || state.isBusted) return;
    const curTotal = getTotalBet();
    if (curTotal <= 0) return;
    if (curTotal * 2 > getMoney()) {
      state.resultMsg = '⚠️ Két tiền không đủ để nhân đôi số lượng!';
      renderUI();
      return;
    }
    MASCOTS.forEach(m => state.bets[m.id] *= 2);
    state.resultMsg = '';
    playSound('chip');
    renderUI();
  }

  // Bắt đầu mở hộp Bầu Cua Trân Châu
  function roll() {
    if (state.isShaking || state.isRaid || state.isBusted) return;
    const totalBet = getTotalBet();
    if (totalBet <= 0) {
      state.resultMsg = '👉 Vui lòng chọn linh vật trân châu trước!';
      renderUI();
      return;
    }

    const currentMoney = getMoney();
    if (totalBet > currentMoney) {
      state.resultMsg = '⚠️ Két tiền của quán không đủ quỹ!';
      renderUI();
      return;
    }

    // Tỉ lệ 28% đoàn kiểm tra vệ sinh an toàn thực phẩm kiểm tra bắt giữ
    if (Math.random() < 0.28) {
      triggerPoliceRaid();
      return;
    }

    // Khấu trừ tiền két ngay khi bắt đầu lắc
    setMoney(currentMoney - totalBet);

    state.lastBets = { ...state.bets };
    state.isShaking = true;
    state.bowlOpen = false;
    state.resultMsg = '';
    renderUI();

    playSound('shake');

    // Sau 1.4 giây xóc bát: mở bát và tính kết quả
    setTimeout(() => {
      const mKeys = MASCOTS.map(m => m.id);
      let dice = [
        mKeys[Math.floor(Math.random() * mKeys.length)],
        mKeys[Math.floor(Math.random() * mKeys.length)],
        mKeys[Math.floor(Math.random() * mKeys.length)]
      ];

      // Giảm ngầm tỉ lệ thắng của chủ tiệm (người chơi) một chút
      const betKeys = Object.keys(state.bets).filter(k => (state.bets[k] || 0) > 0);
      const unbetKeys = mKeys.filter(k => !state.bets[k]);

      if (betKeys.length > 0 && unbetKeys.length > 0 && Math.random() < 0.25) {
        for (let i = 0; i < dice.length; i++) {
          if (betKeys.includes(dice[i])) {
            dice[i] = unbetKeys[Math.floor(Math.random() * unbetKeys.length)];
            break; // Chỉ hoán đổi tối đa 1 viên duy nhất để giảm ngầm tự nhiên
          }
        }
      }
      state.dice = dice;

      // Đếm số lần xuất hiện của từng con
      const counts = {};
      state.dice.forEach(d => counts[d] = (counts[d] || 0) + 1);

      // Tính quà thưởng theo lượt gieo
      let returnMoney = 0; // Gồm phần thưởng
      let netProfit = 0;   // Lời ròng

      Object.entries(state.bets).forEach(([id, bet]) => {
        if (bet > 0 && counts[id]) {
          const hit = counts[id];
          const win = bet * (hit + 1); // Trúng 1 con: nhận lại + 1x; trúng 2: nhận lại + 2x...
          returnMoney += win;
        }
      });

      netProfit = returnMoney - totalBet;
      state.lastWinAmount = returnMoney;
      state.lastNet = netProfit;

      // Cộng tiền thưởng vào két
      if (returnMoney > 0) {
        setMoney(getMoney() + returnMoney);
      }
      if (netProfit > 0) {
        if (typeof window.recordGamble === 'function') window.recordGamble(netProfit, 0);
      } else if (netProfit < 0) {
        if (typeof window.recordGamble === 'function') window.recordGamble(0, Math.abs(netProfit));
      }

      state.isShaking = false;
      state.bowlOpen = true;

      if (netProfit > 0) {
        playSound('win');
        state.resultMsg = `🎉 TRÚNG LỚN! Quán thu về +${fmtMoney(netProfit)} vào két! ✨`;
      } else if (netProfit === 0) {
        state.resultMsg = `✨ Hoà quỹ! Nhận lại đủ ${fmtMoney(totalBet)}.`;
      } else {
        playSound('lose');
        state.resultMsg = `💸 Tiếc quá! Hụt ${fmtMoney(Math.abs(netProfit))}. Lượt sau thơm ngon hơn nha! 🧋`;
      }

      // Reset bets sau khi mở bát
      MASCOTS.forEach(m => state.bets[m.id] = 0);

      renderUI();
    }, 1400);
  }

  // Render HTML minigame
  function renderUI() {
    const card = document.getElementById('baucua-card');
    if (!card) return;

    // Nếu đang bị đoàn kiểm tra an toàn thực phẩm lập biên bản xử phạt
    if (state.isBusted) {
      card.innerHTML = `
        <div class="police-fine-card" style="margin: 0 auto;">
          <div class="police-fine-header">🚨 BIÊN BẢN XỬ PHẠT VI PHẠM LIÊN NGÀNH</div>
          <div class="police-fine-body">
            <div>📋 <b>Đơn vị kiểm tra:</b> Đoàn kiểm tra liên ngành ATTP & Trật Tự Khu Phố</div>
            <div>⚠️ <b>Hành vi:</b> Tổ chức đánh bạc bầu cua ăn tiền, vi phạm quy định vệ sinh tiệm trà!</div>
            <div>💸 <b>Chi tiết xử phạt:</b></div>
            <ul style="margin:6px 0 8px 18px;padding:0;font-size:0.85rem;color:#475569;">
              <li>Mức phạt hành chính: <b>7.000.000đ</b></li>
              <li>Tịch thu toàn bộ tiền cược trên bàn: <b>${fmtMoney(state.tableBetsConfiscated)}</b></li>
              <li>Xử lý uy tín: <b>Trừ số sao quán</b> (2 đánh giá 1 sao cảnh cáo)</li>
            </ul>
            <div class="police-fine-amt">Tổng nộp phạt: -${fmtMoney(state.fineAmount)}</div>
            <div style="font-size:0.8rem;color:#dc2626;text-align:center;font-weight:700;">(Đã khấu trừ trực tiếp vào két tiền và giảm số sao quán)</div>
          </div>
          <button class="police-fine-confirm-btn" onclick="BauCua.closeBusted()">Chấp Hành Phạt & Dọn Quầy 🧋✨</button>
        </div>
      `;
      return;
    }

    const totalBet = getTotalBet();
    const money = getMoney();

    // Đếm kết quả xúc xắc để highlight ô trúng
    const hitMap = {};
    if (state.bowlOpen && state.dice.length) {
      state.dice.forEach(d => hitMap[d] = (hitMap[d] || 0) + 1);
    }

    // HTML 6 ô linh vật sử dụng file hình ảnh thật
    const tilesHtml = MASCOTS.map(m => {
      const bet = state.bets[m.id] || 0;
      const isHit = state.bowlOpen && hitMap[m.id];
      const winClass = isHit ? 'winner' : '';
      return `
        <div class="bc-tile ${winClass}" onclick="BauCua.placeBet('${m.id}')" title="Bấm chọn linh vật ${m.name}">
          <img src="${m.img}" class="bc-tile-img" alt="${m.name}" decoding="sync">
          <div class="bc-tile-name">${m.name}${isHit ? ` (x${hitMap[m.id]})` : ''}</div>
          <div class="bc-tile-badge ${bet > 0 ? 'show' : ''}">${fmtMoney(bet)}</div>
        </div>
      `;
    }).join('');

    // HTML 3 viên linh vật trên đĩa
    const diceHtml = state.dice.map(dId => {
      const m = MASCOTS.find(x => x.id === dId) || MASCOTS[0];
      return `<div class="bc-die" title="${m.name}"><img src="${m.img}" alt="${m.name}"></div>`;
    }).join('');

    // HTML chips lựa chọn
    const chipsHtml = CHIPS.map(c => {
      const isSel = state.selectedChip === c.val ? 'selected' : '';
      return `
        <button class="bc-chip ${c.cls} ${isSel}" onclick="BauCua.selectChip('${c.val}')">
          ${c.label}
        </button>
      `;
    }).join('');

    // Banner kết quả
    let resultCls = '';
    if (state.resultMsg) {
      if (state.resultMsg.includes('⚠️') || state.resultMsg.includes('👉')) {
        resultCls = 'tie show';
      } else {
        resultCls = state.lastNet > 0 ? 'win show' : state.lastNet === 0 ? 'tie show' : 'lose show';
      }
    }

    card.innerHTML = `
      <!-- Cảnh báo đoàn kiểm tra vệ sinh an toàn thực phẩm -->
      ${state.isRaid && state.mathQuestion ? `
        <div class="police-raid-overlay">
          <div class="police-badge-icon">👮‍♂️</div>
          <h2 class="police-title">ĐOÀN KIỂM TRA VỆ SINH ATTP ĐỘT XUẤT!</h2>
          <div class="police-sub">Nhanh trí giải phép tính để cất đĩa xóc và dọn sạch quầy trước khi bị bắt! (5 giây)</div>
          <div class="police-timer-bar-wrap">
            <div class="police-timer-bar" id="bcRaidBar" style="width:${(state.raidTime/5.0)*100}%"></div>
          </div>
          <div class="police-countdown-txt">
            Còn lại: <span id="bcRaidTimeTxt">${state.raidTime.toFixed(1)}s</span>
          </div>
          <div class="police-math-box">
            <div class="police-math-q">${state.mathQuestion.text}</div>
            <div class="police-math-opts">
              ${state.mathQuestion.options.map(opt => `
                <button class="police-math-btn" onclick="BauCua.submitMath(${opt})">${opt}</button>
              `).join('')}
            </div>
          </div>
        </div>
      ` : ''}

      <div class="bc-header">
        <h3 class="bc-title">
          <span>🧋 Bầu Cua Trân Châu</span>
          <small style="font-size:0.75rem;color:#7a5a48;font-weight:600;">(Gieo Hạt May Mắn)</small>
        </h3>
        <button class="bc-close-btn" onclick="BauCua.close()" title="Đóng minigame">✕</button>
      </div>

      <div class="bc-wallet-bar">
        <div><span>💰 Két tiền quán:</span> <span class="bc-money">${fmtMoney(money)}</span></div>
        <div><span>Quỹ vui:</span> <span class="bc-bet-total">${fmtMoney(totalBet)}</span></div>
      </div>

      <div class="bc-main-layout">
        <!-- Bàn linh vật 6 ô -->
        <div class="bc-board">
          ${tilesHtml}
        </div>

        <!-- Đĩa xóc & trân châu linh vật -->
        <div class="bc-plate-wrap">
          <div class="bc-plate">
            <!-- Bát úp -->
            <div class="bc-bowl ${state.bowlOpen ? 'open' : ''} ${state.isShaking ? 'shaking' : ''}">
              <img src="img/xocdia.png" alt="Xóc đĩa" decoding="sync">
            </div>
            <!-- 3 viên linh vật -->
            <div class="bc-dice-box">
              ${diceHtml}
            </div>
          </div>
          <div style="font-size:0.75rem;font-weight:700;color:#7a5a48;margin-top:6px;text-align:center;">
            ${state.isShaking ? 'Đang lắc hộp...' : state.bowlOpen ? 'Đã mở đĩa' : 'Hộp đang đậy'}
          </div>
        </div>
      </div>

      <!-- Chọn mệnh giá góp vui -->
      <div class="bc-chips-row">
        ${chipsHtml}
      </div>

      <!-- Các nút thao tác -->
      <div class="bc-actions-row">
        <button class="bc-sub-btn" onclick="BauCua.clearBets()" ${state.isShaking ? 'disabled' : ''}>🗑️ Chọn Lại</button>
        <button class="bc-sub-btn" onclick="BauCua.doubleBets()" ${state.isShaking ? 'disabled' : ''}>⚡ Nhân Đôi x2</button>
        <button class="bc-roll-btn" onclick="BauCua.roll()" ${state.isShaking || totalBet <= 0 ? 'disabled' : ''}>
          ${state.isShaking ? '🌀 Đang Lắc Hộp Trân Châu...' : '🧋 MỞ HỘP MAY MẮN'}
        </button>
      </div>

      <!-- Thông báo kết quả / cảnh báo -->
      <div class="bc-result-banner ${resultCls}">
        ${state.resultMsg}
      </div>
    `;
  }

  // Export API toàn cục
  window.BauCua = {
    open() {
      const m = document.getElementById('baucua-modal');
      if (m) m.hidden = false;
      state.resultMsg = '';
      state.isBusted = false;
      state.isRaid = false;
      renderUI();
    },
    close() {
      if (state.raidTimer) {
        clearInterval(state.raidTimer);
        state.raidTimer = null;
      }
      state.isRaid = false;
      const m = document.getElementById('baucua-modal');
      if (m) m.hidden = true;
    },
    selectChip(val) {
      state.selectedChip = val === 'all' ? 'all' : Number(val);
      renderUI();
    },
    placeBet,
    clearBets,
    rebet,
    doubleBets,
    roll,
    submitMath: submitMathAnswer,
    closeBusted,
    evadePolice,
    render: renderUI
  };

  // Tự động gắn sự kiện nút icon xúc xắc Bầu Cua
  function bindBcBtn() {
    const btn = document.getElementById('bcBtn');
    if (btn) btn.onclick = () => window.BauCua.open();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindBcBtn);
  } else {
    bindBcBtn();
  }
  window.addEventListener('load', bindBcBtn);
})();
