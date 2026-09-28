/**
 * 🧋 XÌ DÁCH TRÂN CHÂU - MINIGAME TIỆM TRÀ NHỎ
 * Chủ quán làm CHỦ QUẦY - Thử tài đếm trân châu cùng các khách quen
 * Kèm cơ chế ĐOÀN KIỂM TRA VỆ SINH AN TOÀN THỰC PHẨM - Giữ quầy trà luôn sạch sẽ!
 */

(function () {
  const SUITS = [
    { id: 'tc_den', icon: '🧋', name: 'Trân Châu Đen', color: 'tc-den', bg: '#fff6ef' },
    { id: 'tc_vang', icon: '🟡', name: 'Trân Châu Hoàng Kim', color: 'tc-vang', bg: '#fffbeb' },
    { id: 'tc_trang', icon: '⚪', name: 'Trân Châu Trắng 3Q', color: 'tc-trang', bg: '#f0f9ff' },
    { id: 'tc_dau', icon: '🍓', name: 'Trân Châu Dâu Tây', color: 'tc-dau', bg: '#fff1f2' }
  ];
  const VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

  // Danh sách khách quen mặc định dự phòng khi quán mới mở (12 khách quen cá tính)
  const DEFAULT_CUSTOMERS = [
    { name: 'Bé Mèo Con', face: '🐱', baseBet: 20000, risk: 0.6 },
    { name: 'Chị Văn Phòng', face: '👩‍💼', baseBet: 50000, risk: 0.3 },
    { name: 'Anh Shipper Soppi', face: '🛵', baseBet: 30000, risk: 0.5 },
    { name: 'Cô Ba Hàng Xóm', face: '👵', baseBet: 50000, risk: 0.2 },
    { name: 'Gen Z Sống Ảo', face: '💅', baseBet: 100000, risk: 0.7 },
    { name: 'Bác Tổ Trưởng', face: '👴', baseBet: 50000, risk: 0.1 },
    { name: 'Em Học Sinh Cấp 3', face: '🎒', baseBet: 10000, risk: 0.8 },
    { name: 'Anh Cứu Hoả', face: '👨‍🚒', baseBet: 100000, risk: 0.5 },
    { name: 'Food Reviewer Triệu View', face: '⭐', baseBet: 200000, risk: 0.4 },
    { name: 'Anh Hoạ Sĩ Chill', face: '🎨', baseBet: 50000, risk: 0.4 },
    { name: 'Producer Trẻ', face: '🎧', baseBet: 100000, risk: 0.6 },
    { name: 'Bác Tập Thể Dục', face: '🚴‍♂️', baseBet: 30000, risk: 0.2 }
  ];

  // Các mốc cược chuẩn giống Bầu Cua
  const CHIPS = [
    { val: 10000, label: '10k', cls: 'xd-chip-10k' },
    { val: 50000, label: '50k', cls: 'xd-chip-50k' },
    { val: 100000, label: '100k', cls: 'xd-chip-100k' },
    { val: 500000, label: '500k', cls: 'xd-chip-500k' },
    { val: 1000000, label: '1tr', cls: 'xd-chip-1m' },
    { val: 'all', label: 'Hết két', cls: 'xd-chip-all' }
  ];

  // Trạng thái bàn chơi Xì Dách Trân Châu
  const state = {
    deck: [],
    dealer: { cards: [], handInfo: null, isStanding: false },
    players: [],
    phase: 'idle', // 'idle' | 'dealing' | 'players_turn' | 'dealer_turn' | 'round_end'
    activePlayerIdx: -1,
    showRules: false,
    bannerMsg: 'Bấm "Chia thẻ ván mới" để bắt đầu thử tài đếm trân châu! 🧋',
    selectedChip: 50000,

    // Trạng thái đoàn kiểm tra ATTP
    isRaid: false,
    raidTime: 5.0,
    raidTimer: null,
    isBusted: false,
    fineAmount: 0,
    tableBetsConfiscated: 0,
    mathQuestion: null
  };

  // Tạo bộ 52 thẻ Topping Trân Châu & xáo thẻ
  function createDeck() {
    const deck = [];
    for (const s of SUITS) {
      for (const v of VALUES) {
        deck.push({
          val: v,
          suit: s.icon,
          suitId: s.id,
          suitName: s.name,
          color: s.color,
          bg: s.bg
        });
      }
    }
    // Fisher-Yates shuffle
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  }

  function drawCard() {
    if (state.deck.length === 0) {
      state.deck = createDeck();
    }
    return state.deck.pop();
  }

  // Tính điểm & xếp hạng thẻ Trân Châu (Xì Dách)
  function calcHand(cards, isDealer = false) {
    if (!cards || cards.length === 0) {
      return { score: 0, text: '0 thẻ', type: 'normal', rank: 0 };
    }

    const len = cards.length;
    const aces = cards.filter(c => c.val === 'A').length;

    // 1. Kiểm tra 2 thẻ đầu tiên
    if (len === 2) {
      if (aces === 2) {
        return { score: 21, text: 'Xì Bàng! 🔥', type: 'xibang', rank: 100, mul: 2 };
      }
      const hasTen = cards.some(c => ['10', 'J', 'Q', 'K'].includes(c.val));
      if (aces === 1 && hasTen) {
        return { score: 21, text: 'Xì Dách! ⚡', type: 'xidach', rank: 90, mul: 1.5 };
      }
    }

    // 2. Tính điểm số thông thường với thẻ Át (A)
    let nonAceSum = 0;
    for (const c of cards) {
      if (c.val === 'A') continue;
      if (['J', 'Q', 'K'].includes(c.val)) nonAceSum += 10;
      else nonAceSum += parseInt(c.val, 10);
    }

    // Tính điểm tốt nhất cho các thẻ Át
    let bestScore = nonAceSum;
    if (aces > 0) {
      if (len === 2) {
        if (nonAceSum + 11 <= 21) bestScore = nonAceSum + 11;
        else if (nonAceSum + 10 <= 21) bestScore = nonAceSum + 10;
        else bestScore = nonAceSum + 1;
      } else if (len === 3) {
        if (nonAceSum + aces - 1 + 11 <= 21) bestScore = nonAceSum + aces - 1 + 11;
        else if (nonAceSum + aces - 1 + 10 <= 21) bestScore = nonAceSum + aces - 1 + 10;
        else bestScore = nonAceSum + aces;
      } else {
        if (nonAceSum + aces - 1 + 10 <= 21 && nonAceSum + aces - 1 + 10 >= 16) {
          bestScore = nonAceSum + aces - 1 + 10;
        } else {
          bestScore = nonAceSum + aces;
        }
      }
    }

    // 3. Ngũ Linh: 5 thẻ mà tổng <= 21
    if (len === 5 && bestScore <= 21) {
      return { score: bestScore, text: `Ngũ Linh (${bestScore}đ) ✨`, type: 'ngulinh', rank: 80, mul: 2 };
    }

    // 4. Quá chén: > 21
    if (bestScore > 21) {
      return { score: bestScore, text: `Quá chén (${bestScore}đ) 💥`, type: 'quac', rank: -1 };
    }

    // 5. Chưa đủ tuổi / Đủ tuổi
    const minAge = isDealer ? 15 : 16;
    if (bestScore < minAge) {
      return { score: bestScore, text: `${bestScore} điểm (Chưa đủ tuổi)`, type: 'underage', rank: bestScore };
    }

    return { score: bestScore, text: `${bestScore} điểm`, type: 'normal', rank: bestScore };
  }

  // Lấy tiền két quán
  function getMoney() {
    if (typeof window.getMoney === 'function') return window.getMoney();
    if (window.S && typeof window.S.money === 'number') return window.S.money;
    return 0;
  }

  function setMoney(amount) {
    if (typeof window.setMoney === 'function') {
      window.setMoney(amount);
    } else if (window.S) {
      window.S.money = amount;
      if (typeof window.head === 'function') window.head();
      if (typeof window.save === 'function') window.save();
    }
  }

  function fmtMoney(amount) {
    if (typeof window.fmt === 'function') return window.fmt(amount);
    return Number(amount || 0).toLocaleString('vi-VN') + 'đ';
  }

  function playSound(type) {
    try {
      if (typeof window.sfx === 'function') {
        if (type === 'deal' || type === 'hit') window.sfx('tap');
        else if (type === 'xibang' || type === 'ngulinh') window.sfx('lvup');
        else if (type === 'win') { window.sfx('coin'); setTimeout(() => window.sfx('star'), 200); }
        else if (type === 'lose' || type === 'raid') window.sfx('bad');
      }
    } catch (e) {}
  }

  function getBaseBetForChip(chipVal) {
    if (chipVal === 'all') {
      const curMoney = getMoney();
      return Math.max(10000, Math.min(curMoney, 10000000));
    }
    return Number(chipVal) || 50000;
  }

  function calcCustomerBet(baseVal, custRisk) {
    const multipliers = [1.0, 1.2, 1.5, 1.8, 2.0, 2.5];
    let mul = multipliers[Math.floor(Math.random() * multipliers.length)];
    if (custRisk && custRisk > 0.5 && Math.random() < 0.6) {
      mul = Math.max(mul, 1.5);
    }
    return Math.max(10000, Math.round((baseVal * mul) / 1000) * 1000);
  }

  // Lấy danh sách khách hàng đã mua nước từ đánh giá S.reviews hoặc fallback (1 đến 6 người)
  function pickCustomersForTable() {
    const pool = [];
    const seen = new Set();
    const baseVal = getBaseBetForChip(state.selectedChip);

    if (window.S && Array.isArray(window.S.reviews) && window.S.reviews.length > 0) {
      for (const r of window.S.reviews) {
        if (!r.n || seen.has(r.n)) continue;
        seen.add(r.n);
        const risk = 0.3 + Math.random() * 0.4;
        pool.push({
          name: r.n,
          face: r.f || '🙂',
          baseBet: calcCustomerBet(baseVal, risk),
          risk: risk
        });
        if (pool.length >= 14) break;
      }
    }

    // Nếu ít hơn số lượng cần, bổ sung từ danh sách khách quen
    for (const d of DEFAULT_CUSTOMERS) {
      if (pool.length >= 14) break;
      if (!seen.has(d.name)) {
        seen.add(d.name);
        pool.push({
          name: d.name,
          face: d.face,
          baseBet: calcCustomerBet(baseVal, d.risk),
          risk: d.risk
        });
      }
    }

    pool.sort(() => Math.random() - 0.5);
    // Tăng số lượng nhà con tham gia từ 4 lên 6 người. 1 lần chơi từ 1-6 người.
    const count = Math.floor(Math.random() * 6) + 1;
    return pool.slice(0, count).map((cust, idx) => ({
      id: 'p_' + idx,
      name: cust.name,
      face: cust.face,
      bet: cust.baseBet,
      cards: [],
      handInfo: null,
      isStanding: false,
      isBusted: false,
      statusMsg: 'Chờ chia thẻ...',
      settled: false,
      resultText: '',
      resultType: ''
    }));
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
    playSound('raid');

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
    const bar = document.getElementById('xdRaidBar');
    const txt = document.getElementById('xdRaidTimeTxt');
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
      window.toast('😮‍💨 Nhanh trí giải đúng phép tính! Bạn đã dọn sạch quầy và cất giấu bài kịp thời trước khi đoàn kiểm tra bước vào! ✨', 4500, 1);
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

    // Tổng giá trị tiền cược của các nhà con đang có trên bàn
    const totalTableBets = state.players.reduce((sum, p) => sum + (p.bet || 0), 0);
    state.tableBetsConfiscated = totalTableBets;

    // Mức phạt: 7tr + tổng giá trị tiền cược trên bàn
    const totalFine = 7000000 + totalTableBets;
    const curMoney = getMoney();
    const fine = Math.min(curMoney, totalFine);
    state.fineAmount = fine;

    setMoney(Math.max(0, curMoney - fine));
    if (window.S && window.S.cur) window.S.cur.bad = (window.S.cur.bad || 0) + fine;
    if (window.R && window.R.today) window.R.today.bad = (window.R.today.bad || 0) + fine;

    // Giảm số sao quán: thêm 2 đánh giá 1 sao cảnh cáo
    if (window.S && Array.isArray(window.S.reviews)) {
      window.S.reviews.unshift({
        s: 1,
        t: `Đoàn liên ngành ATTP lập biên bản xử phạt 7tr + tịch thu ${fmtMoney(totalTableBets)} tiền cược vì tụ tập cá cược cờ bạc, không bảo đảm vệ sinh! 1 sao cảnh cáo!`,
        k: 'attp_bust_' + Date.now(),
        d: window.S.day || 1,
        o: false,
        n: 'Đoàn Kiểm Tra ATTP',
        f: '👮‍♂️'
      });
      window.S.reviews.unshift({
        s: 1,
        t: 'Quán bị xử phạt vì cờ bạc và mất vệ sinh an toàn thực phẩm! Khách hàng bức xúc tẩy chay! ⭐',
        k: 'attp_cust_' + Date.now(),
        d: window.S.day || 1,
        o: false,
        n: 'Khách Hàng Khu Phố',
        f: '😡'
      });
      if (typeof window.head === 'function') window.head();
      if (typeof window.save === 'function') window.save();
    }

    playSound('lose');
    renderUI();
  }

  function selectChip(val) {
    state.selectedChip = val;
    const baseVal = getBaseBetForChip(val);
    state.players.forEach(p => {
      p.bet = calcCustomerBet(baseVal, p.risk || 0.4);
    });
    playSound('deal');
    renderUI();
  }

  // Bắt đầu ván mới
  function startNewRound() {
    if (state.isRaid || state.isBusted) return;

    // Tỉ lệ 28% đoàn kiểm tra vệ sinh an toàn thực phẩm đột xuất ghé qua
    if (Math.random() < 0.28) {
      triggerPoliceRaid();
      return;
    }

    state.deck = createDeck();
    state.players = pickCustomersForTable();
    state.dealer = { cards: [], handInfo: null, isStanding: false };
    state.phase = 'dealing';
    state.activePlayerIdx = -1;
    state.bannerMsg = 'Đang chia thẻ trân châu cho chủ quán và các khách hàng... 🧋';
    renderUI();

    playSound('deal');

    setTimeout(() => {
      for (const p of state.players) {
        p.cards.push(drawCard(), drawCard());
        // Giảm ngầm: Khách có 22% cơ hội đổi thẻ nếu 2 thẻ đầu quá yếu (< 15đ)
        if (Math.random() < 0.22) {
          const testHand = calcHand(p.cards, false);
          if (testHand.score < 15 && testHand.type === 'underage') {
            const betterIdx = state.deck.findIndex(c => ['8', '9', '10', 'J', 'Q', 'K'].includes(c.val));
            if (betterIdx >= 0) {
              const old = p.cards.pop();
              p.cards.push(state.deck.splice(betterIdx, 1)[0]);
              state.deck.push(old);
            }
          }
        }
        p.handInfo = calcHand(p.cards, false);
      }

      state.dealer.cards.push(drawCard(), drawCard());
      // Giảm ngầm: Giảm bớt 35% khả năng chủ tiệm nổ Xì Dách / Xì Bàng ngay từ đầu
      const dTest = calcHand(state.dealer.cards, true);
      if ((dTest.type === 'xibang' || dTest.type === 'xidach') && Math.random() < 0.35) {
        const midIdx = state.deck.findIndex(c => ['5', '6', '7'].includes(c.val));
        if (midIdx >= 0) {
          const old = state.dealer.cards.pop();
          state.dealer.cards.push(state.deck.splice(midIdx, 1)[0]);
          state.deck.push(old);
        }
      }
      state.dealer.handInfo = calcHand(state.dealer.cards, true);

      checkInitialHands();
    }, 600);
  }

  // Kiểm tra Xì Bàng / Xì Dách ngay sau khi chia 2 thẻ đầu
  function checkInitialHands() {
    const dInfo = state.dealer.handInfo;

    if (dInfo.type === 'xibang' || dInfo.type === 'xidach') {
      playSound(dInfo.type);
      state.phase = 'dealer_turn';
      state.bannerMsg = `👑 Chủ quán có ${dInfo.text}! Bạn có thể so điểm tất cả khách hàng! 🔥`;
      renderUI();
      return;
    }

    state.phase = 'players_turn';
    state.bannerMsg = 'Lượt các khách hàng bốc thêm hoặc dừng thẻ trân châu... 👀';
    renderUI();

    playCustomersTurn(0);
  }

  // Lượt bốc thẻ tự động của từng khách hàng
  function playCustomersTurn(idx) {
    if (idx >= state.players.length) {
      state.phase = 'dealer_turn';
      state.activePlayerIdx = -1;
      const dInfo = state.dealer.handInfo;
      if (dInfo.score < 15) {
        state.bannerMsg = `Đến lượt Chủ Quán: Bạn đang có ${dInfo.text} (< 15 điểm, chưa đủ tuổi). Hãy Bốc thêm trân châu! 🧋`;
      } else {
        state.bannerMsg = `Đến lượt Chủ Quán: Bạn có ${dInfo.text}. Bạn có thể Bốc tiếp, Dừng bốc, hoặc So điểm khách hàng! 👑`;
      }
      renderUI();
      return;
    }

    state.activePlayerIdx = idx;
    const p = state.players[idx];
    p.statusMsg = 'Đang suy nghĩ... 🤔';
    renderUI();

    setTimeout(() => {
      custAIDecide(p, () => {
        playCustomersTurn(idx + 1);
      });
    }, 650);
  }

  function custAIDecide(p, callback) {
    p.handInfo = calcHand(p.cards, false);
    const info = p.handInfo;

    if (info.type === 'xibang' || info.type === 'xidach') {
      p.isStanding = true;
      p.statusMsg = info.text;
      renderUI();
      setTimeout(callback, 500);
      return;
    }

    if (info.type === 'quac') {
      p.isBusted = true;
      p.isStanding = true;
      p.statusMsg = `Đã dừng (${p.cards.length} thẻ) 🤫`;
      renderUI();
      setTimeout(callback, 500);
      return;
    }

    if (p.cards.length >= 5) {
      p.isStanding = true;
      p.statusMsg = info.type === 'ngulinh' ? info.text : `Đủ 5 thẻ (${info.score}đ)`;
      renderUI();
      setTimeout(callback, 500);
      return;
    }

    let shouldHit = false;
    if (info.score < 16) {
      shouldHit = true;
    } else if (info.score === 16) {
      shouldHit = Math.random() < 0.65;
    } else if (info.score === 17) {
      shouldHit = Math.random() < 0.25;
    } else if (p.cards.length === 4 && info.score <= 15) {
      shouldHit = true;
    }

    if (shouldHit && p.cards.length < 5) {
      playSound('hit');
      // Giảm ngầm: Khách khi bốc ở khoảng 14-16 điểm có 20% khả năng tránh bốc thẻ quá chén
      if (info.score >= 14 && info.score <= 16 && Math.random() < 0.20) {
        const safeIdx = state.deck.findIndex(c => {
          let v = ['J', 'Q', 'K'].includes(c.val) ? 10 : (c.val === 'A' ? 1 : parseInt(c.val, 10));
          return (info.score + v) <= 21;
        });
        if (safeIdx >= 0) {
          p.cards.push(state.deck.splice(safeIdx, 1)[0]);
        } else {
          p.cards.push(drawCard());
        }
      } else {
        p.cards.push(drawCard());
      }
      p.handInfo = calcHand(p.cards, false);
      p.statusMsg = `Đã bốc thẻ thứ ${p.cards.length}... 🧋`;
      renderUI();
      setTimeout(() => custAIDecide(p, callback), 600);
    } else {
      p.isStanding = true;
      p.statusMsg = `Đã dừng (${p.cards.length} thẻ) 🤫`;
      renderUI();
      setTimeout(callback, 500);
    }
  }

  // Chủ Quán bốc thêm thẻ
  function dealerHit() {
    if (state.phase !== 'dealer_turn' || state.isRaid || state.isBusted) return;
    if (state.dealer.cards.length >= 5) {
      toast('Chủ quán đã đủ tối đa 5 thẻ trân châu!');
      return;
    }
    if (state.dealer.handInfo && state.dealer.handInfo.type === 'quac') {
      toast('Chủ quán đã quá chén, không thể bốc thêm!');
      return;
    }

    playSound('hit');
    // Giảm ngầm: Nếu chủ quán đang ở mức điểm nhạy cảm (15-17 điểm) và mạo hiểm bốc tiếp,
    // có 22% khả năng bốc phải thẻ quá chén (> 21) từ deck
    const curScore = state.dealer.handInfo ? state.dealer.handInfo.score : 0;
    if (curScore >= 15 && curScore <= 17 && Math.random() < 0.22) {
      const bustIdx = state.deck.findIndex(c => {
        let v = ['J', 'Q', 'K'].includes(c.val) ? 10 : (c.val === 'A' ? 1 : parseInt(c.val, 10));
        return (curScore + v) > 21;
      });
      if (bustIdx >= 0) {
        state.dealer.cards.push(state.deck.splice(bustIdx, 1)[0]);
      } else {
        state.dealer.cards.push(drawCard());
      }
    } else {
      state.dealer.cards.push(drawCard());
    }

    state.dealer.handInfo = calcHand(state.dealer.cards, true);
    const info = state.dealer.handInfo;

    if (info.type === 'quac') {
      state.bannerMsg = `💥 Chủ quán quá chén (${info.score} điểm)! Hãy so điểm các khách hàng để chốt ván!`;
    } else if (info.type === 'ngulinh') {
      state.bannerMsg = `✨ Chủ quán đạt Ngũ Linh (${info.score} điểm)! Hãy so điểm các khách hàng!`;
    } else if (info.score >= 15) {
      state.bannerMsg = `👑 Chủ quán có ${info.text}. Bạn có thể Bốc tiếp, Dừng bốc hoặc So điểm!`;
    } else {
      state.bannerMsg = `Chủ quán có ${info.text} (< 15 điểm, chưa đủ tuổi). Bốc thêm thẻ nữa!`;
    }
    renderUI();
  }

  // Chủ Quán dừng (dằn điểm)
  function dealerStand() {
    if (state.phase !== 'dealer_turn' || state.isRaid || state.isBusted) return;
    const info = state.dealer.handInfo;
    if (info.score < 15 && info.type !== 'quac') {
      toast('⚠️ Chủ quán chưa đủ tuổi! Cần tối thiểu 15 điểm để Dừng bốc hoặc So điểm!');
      return;
    }

    state.dealer.isStanding = true;
    state.bannerMsg = `👑 Chủ quán quyết định Dừng bốc với ${info.text}. Hãy bấm So điểm các khách hàng! 🔍`;
    renderUI();
  }

  // So sánh điểm thẻ giữa Chủ Quán và 1 Khách hàng
  function compareHand(dInfo, pInfo, dLen, pLen) {
    if (dInfo.type === 'xibang' && pInfo.type === 'xibang') return { res: 'draw', mul: 1, reason: 'Cùng Xì Bàng (Hoà)' };
    if (dInfo.type === 'xibang') return { res: 'win', mul: 2, reason: 'Chủ quán Xì Bàng nhận x2' };
    if (pInfo.type === 'xibang') return { res: 'lose', mul: 2, reason: 'Khách Xì Bàng nhận x2' };

    if (dInfo.type === 'xidach' && pInfo.type === 'xidach') return { res: 'draw', mul: 1, reason: 'Cùng Xì Dách (Hoà)' };
    if (dInfo.type === 'xidach') return { res: 'win', mul: 1.5, reason: 'Chủ quán Xì Dách nhận x1.5' };
    if (pInfo.type === 'xidach') return { res: 'lose', mul: 1.5, reason: 'Khách Xì Dách nhận x1.5' };

    if (dInfo.type === 'ngulinh' && pInfo.type === 'ngulinh') {
      if (dInfo.score < pInfo.score) return { res: 'win', mul: 2, reason: 'Cùng Ngũ Linh (Chủ quán ít điểm hơn thắng x2)' };
      if (dInfo.score > pInfo.score) return { res: 'lose', mul: 2, reason: 'Cùng Ngũ Linh (Khách ít điểm hơn thắng x2)' };
      return { res: 'draw', mul: 1, reason: 'Cùng Ngũ Linh bằng điểm (Hoà)' };
    }
    if (dInfo.type === 'ngulinh') return { res: 'win', mul: 2, reason: 'Chủ quán Ngũ Linh nhận x2' };
    if (pInfo.type === 'ngulinh') return { res: 'lose', mul: 2, reason: 'Khách Ngũ Linh nhận x2' };

    if (dInfo.type === 'quac' && pInfo.type === 'quac') {
      return { res: 'draw', mul: 1, reason: 'Cả hai cùng quá chén > 21đ (Hoà)' };
    }
    if (dInfo.type === 'quac' && pInfo.type !== 'quac') {
      if (pInfo.score < 16) {
        return { res: 'draw', mul: 1, reason: 'Chủ quán quá chén & Khách dừng non (Hoà)' };
      }
      return { res: 'lose', mul: 1, reason: 'Chủ quán quá chén > 21 điểm (Khách thắng)' };
    }
    if (dInfo.type !== 'quac' && pInfo.type === 'quac') {
      return { res: 'win', mul: 1, reason: 'Khách quá chén > 21 điểm (Chủ quán thắng)' };
    }

    if (pInfo.score < 16) {
      return { res: 'win', mul: 1, reason: 'Khách chưa đủ tuổi / dừng non (Chủ quán thắng)' };
    }

    if (dInfo.score > pInfo.score) {
      return { res: 'win', mul: 1, reason: `Chủ quán ${dInfo.score}đ > Khách ${pInfo.score}đ` };
    }
    if (dInfo.score < pInfo.score) {
      return { res: 'lose', mul: 1, reason: `Khách ${pInfo.score}đ > Chủ quán ${dInfo.score}đ` };
    }
    return { res: 'draw', mul: 1, reason: `Bằng ${dInfo.score} điểm (Hoà)` };
  }

  // So điểm 1 khách hàng
  function settlePlayer(p) {
    if (p.settled || state.isRaid || state.isBusted) return;

    const dInfo = state.dealer.handInfo;
    if (dInfo.score < 15 && dInfo.type !== 'quac' && dInfo.type !== 'xibang' && dInfo.type !== 'xidach') {
      toast('⚠️ Chủ quán chưa đủ tuổi (cần >= 15 điểm) để đi so điểm!');
      return;
    }

    p.settled = true;
    const cmp = compareHand(dInfo, p.handInfo, state.dealer.cards.length, p.cards.length);
    const amount = Math.round(p.bet * cmp.mul);
    const currentMoney = getMoney();

    if (cmp.res === 'win') {
      setMoney(currentMoney + amount);
      if (typeof window.recordGamble === 'function') window.recordGamble(amount, 0);
      p.resultType = 'win';
      p.resultText = `+${fmtMoney(amount)} (${cmp.reason})`;
      playSound('win');
    } else if (cmp.res === 'lose') {
      setMoney(Math.max(0, currentMoney - amount));
      if (typeof window.recordGamble === 'function') window.recordGamble(0, amount);
      p.resultType = 'lose';
      p.resultText = `-${fmtMoney(amount)} (${cmp.reason})`;
      playSound('lose');
    } else {
      p.resultType = 'draw';
      p.resultText = `Hoà (${cmp.reason})`;
    }

    const allSettled = state.players.every(x => x.settled);
    if (allSettled) {
      state.phase = 'round_end';
      state.bannerMsg = '🏁 Lượt đếm trân châu đã kết thúc! Bạn có thể bắt đầu ván mới!';
    } else {
      state.bannerMsg = `Đã so điểm ${p.name}: ${p.resultText}`;
    }
    renderUI();
  }

  // So điểm tất cả khách hàng
  function settleAllPlayers() {
    if (state.isRaid || state.isBusted) return;
    const dInfo = state.dealer.handInfo;
    if (dInfo.score < 15 && dInfo.type !== 'quac' && dInfo.type !== 'xibang' && dInfo.type !== 'xidach') {
      toast('⚠️ Chủ quán chưa đủ tuổi (cần >= 15 điểm) để đi so điểm!');
      return;
    }

    for (const p of state.players) {
      if (!p.settled) settlePlayer(p);
    }
  }

  function toast(msg) {
    if (typeof window.toast === 'function') window.toast(msg);
  }

  // Render thẻ Topping Trân Châu HTML
  function renderCard(card, hide = false) {
    if (hide) {
      return `<div class="xd-card face-down" title="Thẻ trân châu úp"></div>`;
    }
    return `
      <div class="xd-card ${card.color || ''}" style="background:${card.bg || '#fff'}" title="${card.suitName || 'Trân châu'} ${card.val}">
        <div class="xd-card-top">
          <span class="xd-card-val">${card.val}</span>
          <span class="xd-card-mini-suit">${card.suit}</span>
        </div>
        <div class="xd-card-suit">${card.suit}</div>
        <div class="xd-card-bottom">
          <span class="xd-card-val">${card.val}</span>
        </div>
      </div>
    `;
  }

  // Render toàn bộ giao diện Xì Dách Trân Châu
  function renderUI() {
    const container = document.getElementById('xidach-card');
    if (!container) return;

    // Nếu đang bị đoàn kiểm tra an toàn thực phẩm lập biên bản nhắc nhở
    if (state.isBusted) {
      container.innerHTML = `
        <div class="police-fine-card" style="margin: 0 auto;">
          <div class="police-fine-header">🚨 BIÊN BẢN XỬ PHẠT VI PHẠM LIÊN NGÀNH</div>
          <div class="police-fine-body">
            <div>📋 <b>Đơn vị kiểm tra:</b> Đoàn kiểm tra liên ngành ATTP & Trật Tự Khu Phố</div>
            <div>⚠️ <b>Hành vi:</b> Tổ chức đánh bài cá cược, mất vệ sinh an toàn thực phẩm tại quầy pha chế!</div>
            <div>💸 <b>Chi tiết xử phạt:</b></div>
            <ul style="margin:6px 0 8px 18px;padding:0;font-size:0.85rem;color:#475569;">
              <li>Mức phạt hành chính: <b>7.000.000đ</b></li>
              <li>Tịch thu tiền cược trên bàn: <b>${fmtMoney(state.tableBetsConfiscated)}</b></li>
              <li>Xử lý uy tín: <b>Trừ số sao quán</b> (2 đánh giá 1 sao cảnh cáo)</li>
            </ul>
            <div class="police-fine-amt">Tổng nộp phạt: -${fmtMoney(state.fineAmount)}</div>
            <div style="font-size:0.8rem;color:#dc2626;text-align:center;font-weight:700;">(Đã khấu trừ trực tiếp vào két tiền và giảm số sao quán)</div>
          </div>
          <button class="police-fine-confirm-btn" onclick="XiDach.closeBusted()">Chấp Hành Phạt & Dọn Quầy 🧋✨</button>
        </div>
      `;
      return;
    }

    const money = getMoney();
    const dInfo = state.dealer.handInfo || { score: 0, text: 'Chưa chia thẻ', type: 'normal' };
    const canHit = state.phase === 'dealer_turn' && state.dealer.cards.length < 5 && dInfo.type !== 'quac';
    const canStand = state.phase === 'dealer_turn' && (dInfo.score >= 15 || dInfo.type === 'quac');
    const canSettle = state.phase === 'dealer_turn' && (dInfo.score >= 15 || dInfo.type === 'quac' || dInfo.type === 'xibang' || dInfo.type === 'xidach');
    const isRoundEnd = state.phase === 'round_end' || state.phase === 'idle';

    let badgeClass = 'xd-dealer-score-badge';
    if (dInfo.type === 'quac') badgeClass += ' quac';
    else if (dInfo.type === 'xibang' || dInfo.type === 'xidach' || dInfo.type === 'ngulinh') badgeClass += ' xidach';

    let html = `
      <!-- Cảnh báo đoàn kiểm tra vệ sinh an toàn thực phẩm -->
      ${state.isRaid && state.mathQuestion ? `
        <div class="police-raid-overlay">
          <div class="police-badge-icon">👮‍♂️</div>
          <h2 class="police-title">ĐOÀN KIỂM TRA VỆ SINH ATTP ĐỘT XUẤT!</h2>
          <div class="police-sub">Nhanh trí giải phép tính để cất thẻ và dọn sạch quầy trước khi bị bắt! (5 giây)</div>
          <div class="police-timer-bar-wrap">
            <div class="police-timer-bar" id="xdRaidBar" style="width:${(state.raidTime/5.0)*100}%"></div>
          </div>
          <div class="police-countdown-txt">
            Còn lại: <span id="xdRaidTimeTxt">${state.raidTime.toFixed(1)}s</span>
          </div>
          <div class="police-math-box">
            <div class="police-math-q">${state.mathQuestion.text}</div>
            <div class="police-math-opts">
              ${state.mathQuestion.options.map(opt => `
                <button class="police-math-btn" onclick="XiDach.submitMath(${opt})">${opt}</button>
              `).join('')}
            </div>
          </div>
        </div>
      ` : ''}

      <!-- Header -->
      <div class="xd-header">
        <h2 class="xd-title">🧋 Xì Dách Trân Châu</h2>
        <div class="xd-head-actions">
          <button class="xd-btn-sm" id="xdRulesBtn">📖 Luật chơi</button>
          <button class="xd-close-btn" id="xdCloseBtn" title="Đóng">✕</button>
        </div>
      </div>

      <!-- Két tiền -->
      <div class="xd-wallet-bar">
        <span>💰 Két tiền quán:</span>
        <span class="xd-money">${fmtMoney(money)}</span>
      </div>

      <!-- Thanh mốc cược chuẩn của nhà con (giống Bầu Cua) -->
      <div class="xd-chips-section">
        <span class="xd-chips-label">🎯 Mốc cược chuẩn nhà con (nhà con có thể cược nhiều hơn):</span>
        <div class="xd-chips-bar">
          ${CHIPS.map(c => `
            <button class="xd-chip ${c.cls} ${state.selectedChip === c.val ? 'selected' : ''}" 
                    onclick="XiDach.selectChip('${c.val}')"
                    ${state.phase !== 'idle' && state.phase !== 'round_end' ? 'disabled' : ''}>
              ${c.label}
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Sân chơi -->
      <div class="xd-table">
        <!-- Khu vực Khách hàng -->
        <div class="xd-players-area">
    `;

    if (state.players.length === 0) {
      html += `<div style="grid-column: 1 / -1; text-align: center; color: #cbd5e1; font-size: 0.88rem; padding: 15px;">Chưa có khách ngồi vào bàn. Hãy bấm "Chia thẻ ván mới"! 🧋</div>`;
    } else {
      state.players.forEach((p, idx) => {
        const isActive = state.phase === 'players_turn' && state.activePlayerIdx === idx;
        let seatClass = 'xd-player-seat';
        if (isActive) seatClass += ' active-turn';
        if (p.settled) {
          if (p.resultType === 'win') seatClass += ' settled-win';
          else if (p.resultType === 'lose') seatClass += ' settled-lose';
        }

        const hideCards = !p.settled && state.phase !== 'round_end';

        let statusBadge = '';
        if (p.settled) {
          statusBadge = `<div class="xd-p-status ${p.resultType}">${p.resultText}</div>`;
        } else {
          statusBadge = `<div class="xd-p-status">${p.statusMsg}</div>`;
        }

        html += `
          <div class="${seatClass}">
            <div class="xd-p-info">
              <div class="xd-p-avatar">${p.face}</div>
              <div class="xd-p-name-col">
                <span class="xd-p-name">${p.name}</span>
                <span class="xd-p-bet">Góp vui: ${fmtMoney(p.bet)}</span>
              </div>
            </div>

            <div class="xd-cards-hand">
              ${p.cards.map(c => renderCard(c, hideCards)).join('')}
            </div>

            ${statusBadge}

            ${canSettle && !p.settled ? `<button class="xd-p-xet-btn" data-xet-id="${p.id}">🔍 So điểm</button>` : ''}
          </div>
        `;
      });
    }

    html += `
        </div>

        <!-- Khu vực Chủ Quán (Bạn) -->
        <div class="xd-dealer-area">
          <div class="xd-dealer-head">
            <div class="xd-dealer-title">👑 Chủ Quán (Bạn)</div>
            <div class="${badgeClass}">${dInfo.text}</div>
          </div>

          <div class="xd-dealer-cards-wrap">
            ${state.dealer.cards.length ? state.dealer.cards.map(c => renderCard(c, false)).join('') : '<span style="color:#cbd5e1;font-size:0.85rem">Chưa có thẻ</span>'}
          </div>

          <!-- Nút hành động Chủ Quán -->
          <div class="xd-action-bar">
            ${!isRoundEnd ? `
              <button class="xd-btn xd-btn-hit" id="xdHitBtn" ${canHit ? '' : 'disabled'}>🧋 Bốc Thêm</button>
              <button class="xd-btn xd-btn-stand" id="xdStandBtn" ${canStand ? '' : 'disabled'}>🛑 Dừng Bốc</button>
              <button class="xd-btn xd-btn-xet-all" id="xdXetAllBtn" ${canSettle ? '' : 'disabled'}>🔍 So Toàn Bàn</button>
            ` : `
              <button class="xd-btn xd-btn-new-round" id="xdNewRoundBtn">🧋 Chia Thẻ Ván Mới</button>
            `}
          </div>
        </div>

        <!-- Thông báo diễn biến -->
        <div class="xd-result-banner">${state.bannerMsg}</div>
      </div>

      <!-- Modal Luật chơi -->
      ${state.showRules ? `
        <div class="xd-rules-overlay" id="xdRulesModal">
          <h3>📖 LUẬT CHƠI XÌ DÁCH TRÂN CHÂU</h3>
          <div class="xd-rules-list">
            <div>👑 <b>Chủ Quán</b>: Bạn làm chủ quầy, dùng quỹ tiệm thử tài đếm topping trân châu cùng các khách quen.</div>
            <div>🧋 <b>Bộ Thẻ Topping 4 Vị</b>: Trân Châu Đen 🧋, Hoàng Kim 🟡, Trắng 3Q ⚪, Dâu Tây 🍓.</div>
            <div>🧋 <b>Bốc thêm</b>: Bốc tối đa 3 thẻ thêm (tối đa 5 thẻ trên tay).</div>
            <div>🛑 <b>Dừng bốc / Giữ điểm</b>: Khi cảm thấy điểm trân châu đã đủ lớn (từ 16 đến 21).</div>
            <div>⚡ <b>Xì Dách</b>: 2 thẻ đầu gồm 1 Át (A) + 1 thẻ 10, J, Q, K (Nhận x1.5 hoặc x2).</div>
            <div>🔥 <b>Xì Bàng</b>: 2 thẻ đầu gồm 2 thẻ Át (AA) (Mạnh nhất, nhận x2).</div>
            <div>✨ <b>Ngũ Linh</b>: Đủ 5 thẻ topping mà tổng điểm <= 21 (Nhận x2, đè 21 điểm thường).</div>
            <div>🎂 <b>Đủ tuổi</b>: Khách phải >= 16 điểm, Chủ quán phải >= 15 điểm mới được Dừng/So điểm.</div>
            <div>⚠️ <b>Dừng non</b>: Dừng khi chưa đủ tuổi (< 16 điểm) sẽ bị xử thua.</div>
            <div>💥 <b>Quá 21 điểm (Quá chén)</b>: Tổng điểm topping > 21. Cả 2 cùng quá 21 điểm thì hoà.</div>
            <div>🔍 <b>So điểm</b>: Chủ quán đủ tuổi có quyền so điểm từng khách hoặc so điểm toàn bàn!</div>
            <div>📋 <b>Đoàn kiểm tra ATTP</b>: Mải mê chơi quên dọn dẹp vệ sinh quầy sẽ bị nhắc nhở trừ quỹ!</div>
          </div>
          <button class="xd-btn xd-btn-stand" id="xdCloseRulesBtn" style="margin-top:10px;align-self:center">Đã hiểu</button>
        </div>
      ` : ''}
    `;

    container.innerHTML = html;

    const closeBtn = document.getElementById('xdCloseBtn');
    if (closeBtn) closeBtn.onclick = closeXiDach;

    const rulesBtn = document.getElementById('xdRulesBtn');
    if (rulesBtn) rulesBtn.onclick = () => { state.showRules = true; renderUI(); };

    const closeRulesBtn = document.getElementById('xdCloseRulesBtn');
    if (closeRulesBtn) closeRulesBtn.onclick = () => { state.showRules = false; renderUI(); };

    const newRoundBtn = document.getElementById('xdNewRoundBtn');
    if (newRoundBtn) newRoundBtn.onclick = startNewRound;

    const hitBtn = document.getElementById('xdHitBtn');
    if (hitBtn) hitBtn.onclick = dealerHit;

    const standBtn = document.getElementById('xdStandBtn');
    if (standBtn) standBtn.onclick = dealerStand;

    const xetAllBtn = document.getElementById('xdXetAllBtn');
    if (xetAllBtn) xetAllBtn.onclick = settleAllPlayers;

    container.querySelectorAll('[data-xet-id]').forEach(btn => {
      btn.onclick = () => {
        const pId = btn.dataset.xetId;
        const target = state.players.find(x => x.id === pId);
        if (target) settlePlayer(target);
      };
    });
  }

  // Mở bàn Xì Dách Trân Châu
  function openXiDach() {
    const modal = document.getElementById('xidach-modal');
    if (!modal) return;
    modal.hidden = false;
    state.isBusted = false;
    state.isRaid = false;
    renderUI();
  }

  // Đóng bàn Xì Dách Trân Châu
  function closeXiDach() {
    if (state.raidTimer) {
      clearInterval(state.raidTimer);
      state.raidTimer = null;
    }
    state.isRaid = false;
    const modal = document.getElementById('xidach-modal');
    if (modal) modal.hidden = true;
  }

  function closeBusted() {
    state.isBusted = false;
    closeXiDach();
  }

  // Đăng ký toàn cục
  window.openXiDach = openXiDach;
  window.closeXiDach = closeXiDach;
  window.XiDach = {
    open: openXiDach,
    close: closeXiDach,
    closeBusted: closeBusted,
    evadePolice: evadePolice,
    submitMath: submitMathAnswer,
    selectChip: selectChip
  };

  // Gắn sự kiện vào nút xdBtn trên header
  function bindXdBtn() {
    const btn = document.getElementById('xdBtn');
    if (btn) btn.onclick = openXiDach;
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindXdBtn);
  } else {
    bindXdBtn();
  }
  window.addEventListener('load', bindXdBtn);
})();
