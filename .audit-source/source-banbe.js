/**
 * 🧋 BANBE.JS - HỆ THỐNG BẠN BÈ & TƯƠNG TÁC XÃ HỘI (TIỆM TRÀ MƠ ƯỚC)
 * Phiên bản 12.47.20:
 * 1. 50 Avatar Chibi độc quyền từ bộ nhận diện thương hiệu (img/brand/b00.png - b49.png)
 * 2. Khách VIP và VIP Bạn Bè hiển thị Avatar Chibi sắc nét, hào quang rực rỡ
 * 3. Khắc phục triệt để lỗi làm đúng bill cho VIP & Bạn bè (so khớp đường, đá, foam, topping)
 * 4. Rương Nguyên Liệu Tiếp Tế Ngẫu Nhiên: đổi món linh hoạt, giới hạn tạo mã 2 lần/24h online
 * 5. Tích hợp Ghé Quán & Kết Bạn vào 1 Link/Mã duy nhất, tự động ghé quán, giới hạn tối đa 5 người
 */

(function () {
  // 50 Avatar Chibi từ bộ nhận diện thương hiệu
  const BRAND_AVATARS = Array.from({ length: 50 }, (_, i) => 'b' + String(i).padStart(2, '0'));
  const OLD_EMOJIS = ['🥰','😎','🥳','🤩','🤠','😇','😋','🤗','😜','😼','🐼','🦊','🐯','🐰','☕','🧋'];

  function getAvatarIdx(av) {
    if (!av) return 0;
    const bIdx = BRAND_AVATARS.indexOf(av);
    if (bIdx >= 0) return bIdx;
    const emIdx = OLD_EMOJIS.indexOf(av);
    if (emIdx >= 0) return emIdx;
    if (typeof av === 'string' && /^b\d+$/.test(av)) {
      const n = parseInt(av.slice(1), 10);
      if (!isNaN(n) && n >= 0 && n < 50) return n;
    }
    return 0;
  }

  function getAvatarFromIdx(idx) {
    if (idx >= 0 && idx < BRAND_AVATARS.length) return BRAND_AVATARS[idx];
    if (idx < OLD_EMOJIS.length) return OLD_EMOJIS[idx];
    return 'b00';
  }

  const CATCHPHRASES = [
    'Cho ly nhiều đường ít đá nha sếp! 🧋',
    'Trà ở đây đỉnh nhất xóm! Mãi ủng hộ! ✨',
    'Full topping cho em nha sếp ơi! 🤤',
    'Uống 1 ly là tỉnh táo chạy deadline liền! 💼',
    'Trà sữa là chân ái cuộc đời! ❤️',
    'Làm ngọt ngào như tình bạn chúng mình nhé! 🥰',
    'Trà thủ đích thực không sợ béo! 🔥',
    'Cho em trân châu ngập ly luôn nha! 🧋✨'
  ];

  const $ = id => (typeof window.$ === 'function' ? window.$(id) : (typeof document !== 'undefined' ? document.getElementById(id) : null));
  const esc = s => (typeof window.esc === 'function' ? window.esc(s) : String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'));

  function encPayload(obj) {
    try {
      const json = JSON.stringify(obj);
      if (typeof TextEncoder !== 'undefined') {
        const bytes = new TextEncoder().encode(json);
        let bin = '';
        for (let i = 0; i < bytes.length; i++) {
          bin += String.fromCharCode(bytes[i]);
        }
        return btoa(bin);
      }
      return btoa(unescape(encodeURIComponent(json)));
    } catch(e) {
      return '';
    }
  }

  function decPayload(str) {
    try {
      str = String(str || '').trim();
      const bin = atob(str);
      // Hỗ trợ mã cũ dùng encodeURIComponent (%7B...)
      if (bin.startsWith('%7B') || bin.startsWith('%5B') || bin.includes('%22')) {
        try {
          return JSON.parse(decodeURIComponent(bin));
        } catch(_) {}
      }
      // Hỗ trợ mã mới dùng UTF-8 nhị phân
      if (typeof TextDecoder !== 'undefined') {
        const bytes = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) {
          bytes[i] = bin.charCodeAt(i);
        }
        const decoded = new TextDecoder().decode(bytes);
        try {
          return JSON.parse(decoded);
        } catch(e) {
          return JSON.parse(decodeURIComponent(decoded));
        }
      }
      try {
        return JSON.parse(decodeURIComponent(escape(bin)));
      } catch(e) {
        return JSON.parse(decodeURIComponent(bin));
      }
    } catch(e) {
      return null;
    }
  }

  function copyText(txt, successMsg) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(txt).then(() => {
        if (typeof toast === 'function') toast(successMsg || '📋 Đã sao chép vào bộ nhớ tạm!');
      }).catch(() => fallbackCopy(txt, successMsg));
    } else {
      fallbackCopy(txt, successMsg);
    }
  }

  function fallbackCopy(txt, successMsg) {
    const ta = document.createElement('textarea');
    ta.value = txt;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      if (typeof toast === 'function') toast(successMsg || '📋 Đã sao chép vào bộ nhớ tạm!');
    } catch(e) {
      if (typeof ask === 'function') {
        ask(`<h2>Mã của bạn</h2><textarea class="pinbox" style="height:100px;font-size:0.8rem;" readonly>${txt}</textarea><p>Hãy chọn tất cả và chép thủ công nhé!</p>`, [['Đóng', () => {}]]);
      }
    }
    document.body.removeChild(ta);
  }

  const BASES = [
    'tra', 'hong', 'luc', 'olong', 'thai', 'matcha',
    'tra_o_long', 'tra_lai', 'tra_den', 'tra_xanh'
  ];
  const TOPS = [
    'tcden', 'tcvang', 'tcsoi', 'thach', 'fube', 'pmvien',
    'tran_chau_den', 'thach_dua', 'kem_cheese',
    'popping', 'cunang', 'thachtc', 'suongsao', 'thachcf',
    'cheese', 'fmatcha', 'fsalt', 'pmtuoi', 'thachpm'
  ];

  const ITEM_NAMES = {
    // Trà nền
    tra: 'Trà sữa',
    hong: 'Hồng trà',
    luc: 'Lục trà',
    olong: 'Trà ô long',
    thai: 'Trà sữa Thái',
    matcha: 'Matcha',
    tra_o_long: 'Trà ô long',
    tra_lai: 'Trà lài',
    tra_den: 'Hồng trà',
    tra_xanh: 'Lục trà',

    // Nhóm Trân châu
    tcden: 'Trân châu đen',
    tcvang: 'Trân châu hoàng kim',
    tcsoi: 'Trân châu sợi',
    popping: 'Trân châu nổ',
    thach: 'Trân châu trắng',
    tran_chau_den: 'Trân châu đen',

    // Nhóm Thạch
    cunang: 'Thạch củ năng',
    thachtc: 'Thạch trái cây',
    suongsao: 'Sương sáo',
    thachcf: 'Thạch cà phê',
    thach_dua: 'Thạch củ năng',

    // Nhóm Foam
    cheese: 'Foam cheese',
    fmatcha: 'Foam matcha',
    fsalt: 'Foam muối',
    fube: 'Foam ube',
    kem_cheese: 'Foam cheese',

    // Nhóm Phô mai
    pmvien: 'Phô mai viên',
    pmtuoi: 'Phô mai tươi',
    thachpm: 'Thạch phô mai',
    banh_flan: 'Phô mai tươi',
    pudding_trung: 'Phô mai viên',

    // Siro
    f_dao: 'Siro đào',
    f_dau: 'Siro dâu',
    f_vai: 'Siro vải',
    f_nho: 'Siro nho',
    f_xoai: 'Siro xoài',
    f_tao: 'Siro táo',
    f_me: 'Siro me',
    f_dua: 'Siro dưa gang',
    f_choco: 'Siro chocolate',
    ly: 'Ly nhựa đựng trà'
  };

  function normBase(b) {
    if (b === 'tra_o_long') return 'olong';
    if (b === 'tra_lai' || b === 'tra_xanh') return 'luc';
    if (b === 'tra_den') return 'hong';
    return b || 'olong';
  }

  function normTop(t) {
    if (t === 'tran_chau_den') return 'tcden';
    if (t === 'thach_dua') return 'cunang';
    if (t === 'kem_cheese') return 'cheese';
    if (t === 'banh_flan') return 'pmtuoi';
    if (t === 'pudding_trung') return 'pmvien';
    return t || 'tcden';
  }

  function getItemName(k) {
    if (!k) return '';
    const norm = normBase(normTop(k));
    if (typeof window !== 'undefined' && window.ITEMS && window.ITEMS[norm]) return window.ITEMS[norm].n;
    if (typeof window !== 'undefined' && typeof window.iname === 'function') {
      const n = window.iname(norm);
      if (n && n !== norm) return n;
    }
    return ITEM_NAMES[k] || ITEM_NAMES[norm] || k;
  }

  const GIFT_PRESETS = [
    { giftType: 'money', val: 100000, label: 'Bao lì xì 100k vốn' },
    { giftType: 'money', val: 200000, label: 'Bao lì xì 200k vốn' },
    { giftType: 'money', val: 500000, label: 'Bao lì xì 500k vốn' },
    { giftType: 'cups', val: 50, label: 'Thùng 50 ly nhựa' },
    { giftType: 'flavor', val: 'dao', label: '1 Chai siro đào đặc biệt' },
    { giftType: 'pearl', val: 50, label: '50 Phần trân châu hoàng kim' }
  ];

  function packGift(presetIdx, codeId, senderName) {
    const nameBytes = new TextEncoder().encode((senderName || 'Bạn hiền').slice(0, 15));
    const idPart = (codeId || 'gift').slice(-4).padEnd(4, '0');
    const u8 = new Uint8Array(1 + 4 + nameBytes.length);
    u8[0] = presetIdx;
    for (let i = 0; i < 4; i++) u8[1 + i] = idPart.charCodeAt(i);
    u8.set(nameBytes, 5);
    let bin = '';
    for (let i = 0; i < u8.length; i++) bin += String.fromCharCode(u8[i]);
    return 'G-' + btoa(bin).replace(/=+$/, '');
  }

  function unpackGift(b64) {
    try {
      const bin = atob(b64);
      if (bin.length < 5 || bin.startsWith('{') || bin.startsWith('[') || bin.startsWith('%')) return null;
      const u8 = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
      const presetIdx = u8[0];
      if (presetIdx >= GIFT_PRESETS.length) return null;
      let idPart = '';
      for (let i = 0; i < 4; i++) idPart += String.fromCharCode(u8[1 + i]);
      const senderName = new TextDecoder().decode(u8.subarray(5));
      const p = GIFT_PRESETS[presetIdx];
      return {
        type: 'gift',
        id: 'gift_' + idPart,
        senderId: 'card_' + idPart,
        senderName,
        shopName: 'Quán ' + senderName,
        giftType: p.giftType,
        val: p.val,
        label: p.label
      };
    } catch(e) {
      return null;
    }
  }

  function packFriend(name, avatar, quote, base, top, size, sugar, ice, id) {
    const avIdx = getAvatarIdx(avatar);
    const cpIdx = CATCHPHRASES.indexOf(quote);
    const bIdx = Math.max(0, BASES.indexOf(normBase(base)));
    const tIdx = Math.max(0, TOPS.indexOf(normTop(top)));
    const sz = size === 'M' ? 0 : 1;
    const sug = sugar === '30%' ? 0 : sugar === '50%' ? 1 : sugar === '70%' ? 2 : 3;
    const ic = ice === 'Không đá' ? 0 : ice === 'Ít đá' ? 1 : 2;

    const b0 = (sz << 6) | (sug << 4) | (ic << 2) | (bIdx & 3) | (((avIdx >> 4) & 1) << 7);
    const b1 = ((bIdx >> 2) << 6) | (tIdx & 63) | (((avIdx >> 5) & 1) << 7);
    const b2 = (avIdx & 15) | ((cpIdx >= 0 ? cpIdx : 15) << 4);

    const nameBytes = new TextEncoder().encode((name || 'Trà Thủ').slice(0, 15));
    const customQuoteBytes = cpIdx < 0 ? new TextEncoder().encode((quote || '').slice(0, 30)) : new Uint8Array(0);

    const idPart = (id || 'card').slice(-4).padEnd(4, '0');
    const u8 = new Uint8Array(3 + 4 + 1 + nameBytes.length + customQuoteBytes.length);
    u8[0] = b0; u8[1] = b1; u8[2] = b2;
    for (let i = 0; i < 4; i++) u8[3 + i] = idPart.charCodeAt(i);
    u8[7] = nameBytes.length;
    u8.set(nameBytes, 8);
    if (customQuoteBytes.length > 0) u8.set(customQuoteBytes, 8 + nameBytes.length);

    let bin = '';
    for (let i = 0; i < u8.length; i++) bin += String.fromCharCode(u8[i]);
    return 'F-' + btoa(bin).replace(/=+$/, '');
  }

  function unpackFriend(b64) {
    try {
      const bin = atob(b64);
      if (bin.length < 8 || bin.startsWith('{') || bin.startsWith('[') || bin.startsWith('%')) return null;
      const u8 = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);

      const b0 = u8[0], b1 = u8[1], b2 = u8[2];
      const sz = (b0 >> 6) === 0 ? 'M' : 'L';
      const sug = ['30%', '50%', '70%', '100%'][(b0 >> 4) & 3];
      const ic = ['Không đá', 'Ít đá', 'Đá thường'][(b0 >> 2) & 3];
      const bIdx = (b0 & 3) | ((b1 >> 6) << 2);
      const tIdx = b1 & 63;
      const avIdx = (b2 & 15) | (((b0 >> 7) & 1) << 4) | (((b1 >> 7) & 1) << 5);
      const cpIdx = b2 >> 4;

      let idPart = '';
      for (let i = 0; i < 4; i++) idPart += String.fromCharCode(u8[3 + i]);
      const nameLen = u8[7];
      if (8 + nameLen > u8.length) return null;
      const name = new TextDecoder().decode(u8.subarray(8, 8 + nameLen));
      let quote = '';
      if (cpIdx < 8) {
        quote = CATCHPHRASES[cpIdx];
      } else {
        quote = new TextDecoder().decode(u8.subarray(8 + nameLen));
      }

      return {
        type: 'friend',
        card: {
          id: 'card_' + idPart,
          name,
          face: getAvatarFromIdx(avIdx),
          quote: quote || CATCHPHRASES[0],
          favOrder: {
            base: normBase(BASES[bIdx] || 'olong'),
            tops: [normTop(TOPS[tIdx] || 'tcden')],
            size: sz,
            sugar: sug,
            ice: ic
          }
        },
        shopName: 'Quán ' + name
      };
    } catch(e) {
      return null;
    }
  }

  function packChal(targetRev, chalId, challenger) {
    const rev100k = Math.min(65535, Math.round(targetRev / 100000));
    const nameBytes = new TextEncoder().encode((challenger || 'Trà Thủ').slice(0, 15));
    const idPart = (chalId || 'chal').slice(-4).padEnd(4, '0');
    const u8 = new Uint8Array(2 + 4 + nameBytes.length);
    u8[0] = (rev100k >> 8) & 255;
    u8[1] = rev100k & 255;
    for (let i = 0; i < 4; i++) u8[2 + i] = idPart.charCodeAt(i);
    u8.set(nameBytes, 6);
    let bin = '';
    for (let i = 0; i < u8.length; i++) bin += String.fromCharCode(u8[i]);
    return 'C-' + btoa(bin).replace(/=+$/, '');
  }

  function unpackChal(b64) {
    try {
      const bin = atob(b64);
      if (bin.length < 6 || bin.startsWith('{') || bin.startsWith('[') || bin.startsWith('%')) return null;
      const u8 = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
      const rev100k = (u8[0] << 8) | u8[1];
      let idPart = '';
      for (let i = 0; i < 4; i++) idPart += String.fromCharCode(u8[2 + i]);
      const challenger = new TextDecoder().decode(u8.subarray(6));
      return {
        type: 'chal',
        id: 'chal_' + idPart,
        challenger,
        shopName: 'Quán ' + challenger,
        targetRev: rev100k * 100000
      };
    } catch(e) {
      return null;
    }
  }

  function packShop(level, stars, shopName) {
    const nameBytes = new TextEncoder().encode((shopName || 'Tiệm Trà Nhỏ').slice(0, 20));
    const u8 = new Uint8Array(2 + nameBytes.length);
    u8[0] = Math.min(255, level || 1);
    u8[1] = Math.round(Math.min(5, stars || 4.5) * 10);
    u8.set(nameBytes, 2);
    let bin = '';
    for (let i = 0; i < u8.length; i++) bin += String.fromCharCode(u8[i]);
    return 'S-' + btoa(bin).replace(/=+$/, '');
  }

  function unpackShop(b64) {
    try {
      const bin = atob(b64);
      if (bin.length < 2 || bin.startsWith('{') || bin.startsWith('[') || bin.startsWith('%')) return null;
      const u8 = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
      const level = u8[0];
      const stars = (u8[1] / 10).toFixed(1);
      const shopName = new TextDecoder().decode(u8.subarray(2));
      return {
        type: 'shop',
        id: 'shop_' + shopName,
        shopName,
        ownerName: shopName,
        ownerFace: 'b00',
        level,
        stars,
        bestSellers: [
          { k: 'tra_o_long', n: 'Trà Ô Long', q: 35 },
          { k: 'tran_chau_den', n: 'Trân Châu Đen', q: 28 },
          { k: 'kem_cheese', n: 'Kem Cheese', q: 20 }
        ]
      };
    } catch(e) {
      return null;
    }
  }

  const BanBe = {
    subTab: 'card',

    init() {
      if (!window.S) return;
      S.friends = S.friends || [];
      S.redeemedCodes = S.redeemedCodes || [];
      S.trophies = S.trophies || [];
      if (S.giftsReceivedToday == null) S.giftsReceivedToday = 0;
      if (S.giftsDay == null) S.giftsDay = S.day || 1;
      if (S.chestCooldownSec == null) S.chestCooldownSec = 0;
      if (S.chestUses == null) S.chestUses = 0;
      if (S.lixiCooldownSec == null) S.lixiCooldownSec = 0;
      if (this.subTab === 'visit') this.subTab = 'card';

      // Reset quà tặng mỗi ngày
      if (S.giftsDay !== S.day) {
        S.giftsReceivedToday = 0;
        S.giftsDay = S.day;
      }

      // Khởi tạo thẻ cá nhân mặc định nếu chưa có
      if (!S.myCard) {
        S.myCard = {
          id: 'card_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
          name: S.shopName ? `Chủ Quán ${S.shopName.slice(0, 10)}` : 'Trà Thủ VIP',
          face: 'b00',
          quote: CATCHPHRASES[0],
          favOrder: {
            base: 'olong',
            flav: null,
            tops: ['tcden'],
            size: 'L',
            sugar: '70%',
            ice: 'Ít đá'
          }
        };
      } else {
        if (!S.myCard.face || !/^b\d+$/.test(S.myCard.face)) {
          const idx = OLD_EMOJIS.indexOf(S.myCard.face);
          S.myCard.face = idx >= 0 ? BRAND_AVATARS[idx] : 'b00';
        }
        if (S.myCard.favOrder) {
          S.myCard.favOrder.base = normBase(S.myCard.favOrder.base);
          if (S.myCard.favOrder.tops && S.myCard.favOrder.tops[0]) {
            S.myCard.favOrder.tops[0] = normTop(S.myCard.favOrder.tops[0]);
          }
        }
      }

      if (!S.curPreviewChest) {
        S.curPreviewChest = this.rollRandomChest();
      }

      // Kiểm tra lời mời từ URL (nếu có)
      if (window._pendingInvite) {
        const inv = window._pendingInvite;
        window._pendingInvite = null;
        setTimeout(() => {
          this.redeem(inv);
        }, 500);
      }
    },

    // Đếm ngược thời gian online game (1 giây khi người chơi mở tab game)
    tickOnlineTime(sec) {
      if (!window.S) return;
      if (S.chestCooldownSec > 0) {
        S.chestCooldownSec = Math.max(0, S.chestCooldownSec - sec);
        if (S.chestCooldownSec === 0) {
          S.chestUses = 0;
          if (typeof save === 'function') save();
          if (this.subTab === 'gift') this.render();
        } else {
          const cdEl = $('bbChestCountdown');
          if (cdEl) cdEl.textContent = this.fmtSec(S.chestCooldownSec);
        }
      }
      if (S.lixiCooldownSec > 0) {
        S.lixiCooldownSec = Math.max(0, S.lixiCooldownSec - sec);
        if (S.lixiCooldownSec === 0) {
          if (typeof save === 'function') save();
          if (this.subTab === 'gift') this.render();
        } else {
          const lixiEl = $('bbLixiCountdown');
          if (lixiEl) lixiEl.textContent = this.fmtSec(S.lixiCooldownSec);
        }
      }
    },

    fmtSec(s) {
      const h = Math.floor(s / 3600);
      const m = Math.floor((s % 3600) / 60);
      const sec = Math.floor(s % 60);
      return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    },

    // Tạo gói ngẫu nhiên cho Rương Nguyên Liệu Pha Chế
    rollRandomChest() {
      const cupQty = Math.floor(Math.random() * 26) + 35; // 35 - 60 ly
      const items = [
        { k: 'ly', type: 'cups', q: cupQty, n: `${cupQty} Ly đựng trà`, i: '🥤' }
      ];

      const topPool = [
        { k: 'tcvang', n: 'Trân châu hoàng kim', i: '✨' },
        { k: 'tcden', n: 'Trân châu đen', i: '⚫' },
        { k: 'tcsoi', n: 'Trân châu sợi', i: '🥢' },
        { k: 'popping', n: 'Trân châu nổ', i: '💥' },
        { k: 'thach', n: 'Trân châu trắng', i: '⚪' },
        { k: 'cunang', n: 'Thạch củ năng', i: '🟩' },
        { k: 'thachtc', n: 'Thạch trái cây', i: '🍓' },
        { k: 'suongsao', n: 'Sương sáo', i: '⬛' },
        { k: 'cheese', n: 'Foam cheese', i: '🧀' },
        { k: 'fmatcha', n: 'Foam matcha', i: '🍵' },
        { k: 'pmvien', n: 'Phô mai viên', i: '🟡' },
        { k: 'pmtuoi', n: 'Phô mai tươi', i: '🧀' }
      ];
      const pickTop = topPool[Math.floor(Math.random() * topPool.length)];
      const topQty = Math.floor(Math.random() * 21) + 30; // 30 - 50
      items.push({ k: pickTop.k, type: 'top', q: topQty, n: `${topQty} phần ${pickTop.n}`, i: pickTop.i });

      if (Math.random() < 0.5) {
        const flavPool = [
          { k: 'f_dao', n: 'Siro Đào', i: '🍑' },
          { k: 'f_dau', n: 'Siro Dâu', i: '🍓' },
          { k: 'f_xoai', n: 'Siro Xoài', i: '🥭' },
          { k: 'f_vai', n: 'Siro Vải', i: '🍈' },
          { k: 'f_nho', n: 'Siro Nho', i: '🍇' },
          { k: 'f_tao', n: 'Siro Táo', i: '🍏' },
          { k: 'f_choco', n: 'Siro Chocolate', i: '🍫' }
        ];
        const pickFlav = flavPool[Math.floor(Math.random() * flavPool.length)];
        const flQty = Math.random() < 0.5 ? 15 : 30;
        items.push({ k: pickFlav.k, type: 'flavor', q: flQty, n: `${flQty === 15 ? '1 Chai' : '2 Chai'} ${pickFlav.n}`, i: pickFlav.i });
      } else {
        const basePool = [
          { k: 'olong', n: 'Trà Ô Long', i: '🍃' },
          { k: 'matcha', n: 'Trà Matcha', i: '🍵' },
          { k: 'thai', n: 'Trà Thái', i: '🧡' },
          { k: 'hong', n: 'Hồng Trà', i: '🍂' },
          { k: 'luc', n: 'Lục Trà', i: '🌿' }
        ];
        const pickBase = basePool[Math.floor(Math.random() * basePool.length)];
        const bQty = Math.floor(Math.random() * 21) + 30; // 30 - 50
        items.push({ k: pickBase.k, type: 'base', q: bQty, n: `${bQty} phần ${pickBase.n}`, i: pickBase.i });
      }

      return {
        id: 'chest_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
        items,
        label: items.map(x => x.n).join(' + ')
      };
    },

    // Lấy top 3 best seller của quán để hiển thị khi ghé thăm
    getMyBestSellers() {
      if (!window.S) return [];
      const sales = {};
      (S.history || []).forEach(h => {
        if (h && h.sales) {
          Object.keys(h.sales).forEach(k => {
            sales[k] = (sales[k] || 0) + (h.sales[k].q || 0);
          });
        }
      });
      if (S.cur && S.cur.sales) {
        Object.keys(S.cur.sales).forEach(k => {
          sales[k] = (sales[k] || 0) + (S.cur.sales[k].q || 0);
        });
      }
      const sorted = Object.keys(sales).filter(k => k !== 'L' && k !== 'cup').sort((a, b) => sales[b] - sales[a]);
      if (sorted.length === 0) {
        return [
          { k: 'olong', n: 'Trà Ô Long', q: 35 },
          { k: 'tcden', n: 'Trân Châu Đen', q: 28 },
          { k: 'cheese', n: 'Foam Cheese', q: 20 }
        ];
      }
      return sorted.slice(0, 3).map(k => ({
        k,
        n: getItemName(k),
        q: sales[k]
      }));
    },

    // Tạo mã bạn bè siêu ngắn gọn (5-8 ký tự): Ký tự đầu tên quán + Mã món ruột + Mã số (Khác với mã sao lưu game)
    genShortFriendCode() {
      this.init();
      const c = S.myCard || {};
      const sShop = typeof shopName === 'function' ? shopName() : (S.shopName || 'Tiệm Trà Mơ Ước');
      // Bỏ dấu tiếng Việt
      const cleanShop = sShop.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
      const words = cleanShop.trim().split(/\s+/).filter(Boolean);
      let shopInit = 'TM';
      if (words.length >= 2) {
        if (words.length >= 3 && /tiem/i.test(words[0]) && /tra/i.test(words[1])) {
          shopInit = (words[0][0] + words[2][0]).toUpperCase();
        } else {
          shopInit = (words[0][0] + words[1][0]).toUpperCase();
        }
      } else if (words.length === 1) {
        shopInit = words[0].slice(0, 2).toUpperCase();
      }
      shopInit = shopInit.replace(/[^A-Z]/g, 'T').slice(0, 2);
      if (shopInit.length < 2) shopInit = (shopInit + 'M').slice(0, 2);

      const baseKey = (c.favOrder && c.favOrder.base) || 'olong';
      const drinkMap = {
        olong: 'OL',
        hong: 'HT',
        luc: 'LT',
        thai: 'TT',
        matcha: 'MC',
        tra: 'TS'
      };
      const drinkCode = drinkMap[baseKey] || 'TS';

      if (!c.friendNum) {
        let hash = 0;
        const seedStr = (c.id || '') + sShop;
        for (let i = 0; i < seedStr.length; i++) {
          hash = (hash * 31 + seedStr.charCodeAt(i)) & 0xffff;
        }
        c.friendNum = (Math.abs(hash) % 90) + 10; // 2 chữ số: 10 - 99
        if (typeof save === 'function') save();
      }

      return `${shopInit}${drinkCode}${c.friendNum}`;
    },

    // Tạo mã bạn bè tích hợp cả kết bạn và ghé quán (mã rút gọn 5-8 ký tự)
    genFriendAndShopCode() {
      return this.genShortFriendCode();
    },

    // Tạo mã bạn bè đơn thuần
    genFriendCode() {
      return this.genShortFriendCode();
    },

    // Tạo mã Rương Nguyên Liệu Tiếp Tế Ngẫu Nhiên rút gọn (chỉ 6-7 ký tự)
    genChestGiftCode(chest) {
      this.init();
      const c = S.myCard || {};
      const charNum = c.friendNum || ((Math.abs(hashStr(c.name || 'card')) % 90) + 10);
      const salt = Math.random().toString(36).substring(2, 4).toUpperCase();
      return `QT${charNum}R${salt}`;
    },

    // Tạo mã gói quà lì xì tiền vốn rút gọn (chỉ 6-7 ký tự: kết hợp ký tự + mã nhân vật)
    genGiftCode(giftType, val, label) {
      this.init();
      const c = S.myCard || {};
      const charNum = c.friendNum || ((Math.abs(hashStr(c.name || 'card')) % 90) + 10);
      let tag = 'LX1';
      if (giftType === 'money') {
        if (+val >= 500000) tag = 'LX5';
        else if (+val >= 200000) tag = 'LX2';
        else tag = 'LX1';
      } else if (giftType === 'cups') tag = 'LXLY';
      else if (giftType === 'flavor') tag = 'LXSR';
      else if (giftType === 'pearl') tag = 'LXTC';

      const salt = Math.random().toString(36).substring(2, 4).toUpperCase();
      return `${tag}${charNum}${salt}`;
    },

    // Tạo mã quán (Shop Code)
    genShopCode() {
      this.init();
      const sShop = typeof shopName === 'function' ? shopName() : (S.shopName || 'Tiệm Trà Nhỏ');
      const sLv = typeof level === 'function' ? level() : 1;
      const sStars = typeof rating === 'function' ? Number(rating().toFixed(1)) : 4.5;
      return packShop(sLv, sStars, sShop);
    },

    // Tạo mã thách đấu doanh thu
    genChallengeCode() {
      this.init();
      const bestRev = S.bestDayRev || Math.max(5000000, (S.best || 1) * 350000);
      const chalId = Date.now().toString(36).slice(-4);
      const sName = (S.myCard && S.myCard.name ? S.myCard.name : 'Trà Thủ').slice(0, 15);
      return packChal(bestRev, chalId, sName);
    },

    // Giải mã và xử lý mọi loại mã
    redeem(code) {
      this.init();
      code = String(code || '').trim();
      if (!code) {
        toast('Vui lòng dán mã vào ô!');
        return;
      }

      // Xử lý nếu người chơi dán nguyên URL (chứa ?invite= hoặc #invite= hoặc hash mã)
      if (code.includes('invite=')) {
        const m = code.match(/invite=([^&#]+)/);
        if (m) code = decodeURIComponent(m[1]);
      } else if (code.includes('code=')) {
        const m = code.match(/code=([^&#]+)/);
        if (m) code = decodeURIComponent(m[1]);
      } else if (code.includes('#')) {
        const h = code.split('#')[1];
        if (h) code = decodeURIComponent(h.replace(/^invite=/, '').replace(/^code=/, ''));
      }

      code = code.trim();
      const cleanShort = code.replace(/[^A-Za-z0-9]/g, '').toUpperCase();

      let type = '';
      let rawPayload = '';
      if (cleanShort.startsWith('LX') || cleanShort.startsWith('QT')) {
        type = 'short_gift';
        rawPayload = cleanShort;
      }
      else if (code.startsWith('FS-')) { 
        const rem = code.slice(3).trim();
        const remClean = rem.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
        if (remClean.length >= 4 && remClean.length <= 8 && /^[A-Z]{2,4}\d{1,4}$/.test(remClean)) {
          type = 'short_friend';
          rawPayload = remClean;
        } else {
          type = 'fs';
          rawPayload = rem;
        }
      }
      else if (code.startsWith('TTN-FS-')) { type = 'fs'; rawPayload = code.slice(7); }
      else if (code.startsWith('G-')) { type = 'gift'; rawPayload = code.slice(2); }
      else if (code.startsWith('TTN-G-')) { type = 'gift'; rawPayload = code.slice(6); }
      else if (code.startsWith('TTN-GIFT-')) { type = 'gift'; rawPayload = code.slice(9); }
      else if (code.startsWith('F-')) { type = 'friend'; rawPayload = code.slice(2); }
      else if (code.startsWith('TTN-F-')) { type = 'friend'; rawPayload = code.slice(6); }
      else if (code.startsWith('TTN-FRIEND-')) { type = 'friend'; rawPayload = code.slice(11); }
      else if (code.startsWith('S-')) { type = 'shop'; rawPayload = code.slice(2); }
      else if (code.startsWith('TTN-S-')) { type = 'shop'; rawPayload = code.slice(6); }
      else if (code.startsWith('TTN-SHOP-')) { type = 'shop'; rawPayload = code.slice(9); }
      else if (code.startsWith('C-')) { type = 'chal'; rawPayload = code.slice(2); }
      else if (code.startsWith('TTN-C-')) { type = 'chal'; rawPayload = code.slice(6); }
      else if (code.startsWith('TTN-CHAL-')) { type = 'chal'; rawPayload = code.slice(9); }
      else if (cleanShort.length >= 4 && cleanShort.length <= 10 && /^[A-Z]{2,6}\d{0,4}$/.test(cleanShort)) {
        type = 'short_friend';
        rawPayload = cleanShort;
      }
      else {
        toast('Mã không hợp lệ! Vui lòng nhập mã bạn bè (5-8 ký tự) hoặc link chia sẻ');
        return;
      }

      let data = null;
      if (type === 'short_friend') {
        const myShort = this.genShortFriendCode();
        if (rawPayload === myShort) {
          toast('Đây là mã của chính bạn mà! Hãy gửi cho bạn bè nhé.');
          return;
        }

        // Tách chữ cái và chữ số: ví dụ TMOL68 -> letters=TMOL, digits=68
        const m = rawPayload.match(/^([A-Z]+)(\d*)$/);
        let letters = m ? m[1] : rawPayload;
        let digits = m ? m[2] : '';
        let num = parseInt(digits || '68', 10);
        if (isNaN(num)) num = 68;

        let drinkCode = 'TS';
        let shopInit = 'TM';
        if (letters.length >= 4) {
          drinkCode = letters.slice(-2);
          shopInit = letters.slice(0, -2);
        } else if (letters.length === 3) {
          drinkCode = letters.slice(-2);
          shopInit = letters.slice(0, 1);
        } else if (letters.length === 2) {
          shopInit = letters;
        }

        const DRINK_MAP = {
          'OL': { base: 'olong', name: 'Trà Ô Long' },
          'HT': { base: 'hong', name: 'Hồng Trà' },
          'LT': { base: 'luc', name: 'Lục Trà' },
          'TT': { base: 'thai', name: 'Trà Sữa Thái' },
          'MC': { base: 'matcha', name: 'Matcha' },
          'TS': { base: 'tra', name: 'Trà Sữa Truyền Thống' }
        };
        const drinkInfo = DRINK_MAP[drinkCode] || { base: 'tra', name: 'Trà Sữa' };
        const faceNum = num % 50;
        const faceStr = 'b' + String(faceNum).padStart(2, '0');
        const shopLv = Math.min(3, Math.max(1, (num % 3) + 1));
        const shopStars = Number((4.3 + ((num % 8) * 0.1)).toFixed(1));

        data = {
          type: 'fs',
          card: {
            id: 'card_fr_' + rawPayload,
            name: 'Trà Thủ ' + shopInit + (digits ? (' #' + digits) : ''),
            face: faceStr,
            quote: 'Chào bạn! Mình là chủ quán ' + shopInit + '. Chúc bạn buôn may bán đắt!',
            favOrder: {
              base: drinkInfo.base,
              tops: ['tcden'],
              size: 'L',
              sugar: '70%',
              ice: 'Ít đá'
            }
          },
          shop: {
            id: 'shop_fr_' + rawPayload,
            shopName: 'Tiệm Trà ' + shopInit,
            ownerName: 'Trà Thủ ' + shopInit,
            ownerFace: faceStr,
            level: shopLv,
            stars: shopStars,
            brand: null,
            bestSellers: [
              { k: drinkInfo.base, n: drinkInfo.name, q: 48 + (num % 20) },
              { k: 'tcden', n: 'Trân Châu Đen', q: 36 + (num % 15) },
              { k: 'cheese', n: 'Foam Cheese', q: 25 + (num % 10) }
            ]
          }
        };
      }
      else if (type === 'short_gift') {
        const myCharNum = String((S.myCard && S.myCard.friendNum) || '');
        if (myCharNum && rawPayload.includes(myCharNum)) {
          toast('Bạn không thể tự nhận gói quà của chính mình tạo!');
          return;
        }
        if (S.redeemedCodes.includes(rawPayload) || S.redeemedCodes.includes('gift_' + rawPayload)) {
          toast('Gói quà này đã được mở rồi, mỗi gói chỉ mở được 1 lần!');
          return;
        }

        let gType = 'money';
        let val = 100000;
        let lab = 'Bao lì xì 100.000đ vốn';
        let items = null;

        if (rawPayload.startsWith('LX5')) {
          val = 500000;
          lab = 'Bao lì xì 500.000đ vốn';
        } else if (rawPayload.startsWith('LX2')) {
          val = 200000;
          lab = 'Bao lì xì 200.000đ vốn';
        } else if (rawPayload.startsWith('LX1')) {
          val = 100000;
          lab = 'Bao lì xì 100.000đ vốn';
        } else if (rawPayload.startsWith('LXLY')) {
          gType = 'cups';
          val = 50;
          lab = '50 Ly giấy cao cấp';
        } else if (rawPayload.startsWith('LXSR')) {
          gType = 'flavor';
          val = 'dao';
          lab = '1 Chai siro đào đặc biệt';
        } else if (rawPayload.startsWith('LXTC')) {
          gType = 'pearl';
          val = 50;
          lab = '50 Phần trân châu hoàng kim';
        } else if (rawPayload.startsWith('QT')) {
          gType = 'random_chest';
          lab = 'Rương Tiếp Tế Nguyên Liệu';
          items = [
            { k: 'tra', n: 'Trà Lài', q: 20, i: '🍃' },
            { k: 'tcden', n: 'Trân Châu Đen', q: 20, i: '🧋' },
            { k: 'ly', n: 'Ly Nhựa Tiêu Chuẩn', q: 30, i: '🥤' },
            { k: 'sua', n: 'Sữa Đặc', q: 15, i: '🥛' }
          ];
        }

        data = {
          type: 'gift',
          id: 'gift_' + rawPayload,
          senderId: 'short_sender_' + rawPayload,
          senderName: 'Bạn Trà Hữu',
          shopName: 'Tiệm Trà Bạn Hiền',
          giftType: gType,
          val: val,
          label: lab,
          items: items
        };
        type = 'gift';
      }
      else if (type === 'gift') data = unpackGift(rawPayload);
      else if (type === 'friend') data = unpackFriend(rawPayload);
      else if (type === 'chal') data = unpackChal(rawPayload);
      else if (type === 'shop') data = unpackShop(rawPayload);

      if (!data) {
        const raw = decPayload(rawPayload);
        if (!raw) {
          toast('Mã bị lỗi hoặc không đọc được dữ liệu!');
          return;
        }
        data = raw;
      }

      // Chuẩn hoá dữ liệu mảng rút gọn cũ
      if (Array.isArray(data)) {
        const raw = data;
        const tag = raw[0];
        if (tag === 'F') {
          type = 'friend';
          data = {
            type: 'friend',
            card: {
              id: 'card_' + (raw[9] || 'friend'),
              name: raw[1],
              face: raw[2],
              quote: raw[3],
              favOrder: {
                base: raw[4] || 'tra_o_long',
                tops: (raw[5] || '').split(',').filter(Boolean),
                size: raw[6] || 'L',
                sugar: raw[7] || '70%',
                ice: raw[8] || 'Ít đá'
              }
            },
            shopName: raw[10] || 'Quán Bạn Hiền'
          };
        } else if (tag === 'G') {
          type = 'gift';
          const giftType = raw[5];
          const val = raw[6];
          let label = '';
          if (giftType === 'money') label = `Bao lì xì ${typeof fmt === 'function' ? fmt(val) : val + 'đ'} vốn`;
          else if (giftType === 'cups') label = `Thùng ${val} ly nhựa`;
          else if (giftType === 'flavor') label = `1 chai siro đặc biệt`;
          else if (giftType === 'pearl') label = `1 mẻ trân châu hoàng kim`;
          data = {
            type: 'gift',
            id: 'gift_' + raw[1],
            senderId: 'card_' + raw[2],
            senderName: raw[3],
            shopName: raw[4],
            giftType,
            val,
            label
          };
        } else if (tag === 'S') {
          type = 'shop';
          const bestSellers = (raw[8] || []).map(b => {
            const k = Array.isArray(b) ? b[0] : b.k;
            const q = Array.isArray(b) ? b[1] : b.q;
            const n = window.ITEMS && ITEMS[k] ? ITEMS[k].n : k;
            return { k, n, q };
          });
          data = {
            type: 'shop',
            id: 'shop_' + raw[1],
            shopName: raw[2],
            ownerName: raw[3],
            ownerFace: raw[4],
            level: raw[5],
            stars: raw[6],
            brand: raw[7],
            bestSellers
          };
        } else if (tag === 'C') {
          type = 'chal';
          data = {
            type: 'chal',
            id: 'chal_' + raw[1],
            challenger: raw[2],
            shopName: raw[3],
            targetRev: raw[4]
          };
        }
      }

      // 1. TÍCH HỢP KẾT BẠN & GHÉ QUÁN (FS- hoặc F-)
      if (type === 'fs' || type === 'friend' || (data && (data.type === 'fs' || data.type === 'friend'))) {
        const card = data.card;
        if (!card || !card.name) {
          toast('Dữ liệu Thẻ Trà Thủ không hợp lệ!');
          return;
        }
        if (card.id === S.myCard.id) {
          toast('Đây là mã của chính bạn mà! Hãy gửi cho bạn bè nhé.');
          return;
        }

        const MAX_FRIENDS = 5;
        const existingIdx = S.friends.findIndex(f => f.id === card.id);
        const shopData = data.shop || {
          shopName: data.shopName || ('Quán ' + card.name),
          ownerName: card.name,
          ownerFace: card.face || 'b00',
          level: (data.shop && data.shop.level) || 1,
          stars: (data.shop && data.shop.stars) || 5.0,
          brand: (data.shop && data.shop.brand) || null,
          bestSellers: (data.shop && data.shop.bestSellers) || [
            { k: 'olong', n: 'Trà Ô Long', q: 35 },
            { k: 'tcden', n: 'Trân Châu Đen', q: 28 },
            { k: 'cheese', n: 'Foam Cheese', q: 20 }
          ]
        };

        if (existingIdx < 0 && S.friends.length >= MAX_FRIENDS) {
          toast('⚠️ Danh sách bạn quen đã đạt tối đa 5 người! Hãy xoá bớt bạn để kết bạn mới.');
          // Vẫn mở dialog ghé thăm quán
          this.showVisitDialog(shopData);
          return;
        }

        const friendObj = {
          id: card.id,
          name: card.name,
          face: card.face || 'b00',
          quote: card.quote || CATCHPHRASES[0],
          favOrder: card.favOrder || S.myCard.favOrder,
          shopName: shopData.shopName || data.shopName || 'Quán Bạn Hiền',
          addedAt: Date.now()
        };

        if (existingIdx >= 0) {
          S.friends[existingIdx] = friendObj;
          save();
          toast(`Đã cập nhật thông tin bạn quen: ${card.name}! Đang đưa bạn ghé thăm quán...`);
        } else {
          S.friends.push(friendObj);
          save();
          if (typeof sfx === 'function') sfx('lvup');
          toast(`🎉 Đã kết bạn với ${card.name}! Bạn sẽ ghé quán làm VIP! Đang ghé thăm quán...`);
        }
        this.render();

        // Tự động chuyển tiếp đến GHÉ THĂM QUÁN!
        setTimeout(() => {
          this.showVisitDialog(shopData);
        }, 350);
        return;
      }

      // 2. NHẬN QUÀ TRÀ HỮU & RƯƠNG NGUYÊN LIỆU TIẾP TẾ
      if (type === 'gift') {
        if (data.senderId === S.myCard.id) {
          toast('Bạn không thể tự nhận gói quà của chính mình tạo!');
          return;
        }
        if (S.redeemedCodes.includes(data.id)) {
          toast('Gói quà này đã được mở rồi, mỗi gói chỉ mở được 1 lần!');
          return;
        }
        if (S.giftsReceivedToday >= 2) {
          toast('⚠️ Hôm nay bạn đã nhận đủ giới hạn 2 gói quà rồi! Hãy mở vào ngày mai nhé.');
          return;
        }
        if (data.giftType === 'money' && S.lixiCooldownSec > 0) {
          toast(`⏳ Đang đếm ngược 24h online (${this.fmtSec(S.lixiCooldownSec)})! Hãy mở game online đủ thời gian để nhận tiếp lì xì.`);
          return;
        }

        S.redeemedCodes.push(data.id);
        S.giftsReceivedToday = (S.giftsReceivedToday || 0) + 1;

        if (data.giftType === 'random_chest' || (Array.isArray(data.items) && data.items.length)) {
          (data.items || []).forEach(it => {
            if (it.type === 'cups' || it.k === 'ly') {
              if (typeof addStock === 'function') addStock('ly', it.q);
            } else {
              if (typeof addStock === 'function') addStock(it.k, it.q);
            }
          });
          save();
          head();
          if (typeof sfx === 'function') sfx('lvup');
          ask(`
            <div style="text-align:center;padding:10px 0;">
              <div style="font-size:3.5rem;animation:bounce 0.8s infinite alternate;">🎁</div>
              <h2 style="color:#ea580c;margin:8px 0;">Mở Rương Nguyên Liệu Thành Công!</h2>
              <p>Người gửi: <b>${esc(data.senderName)}</b> (${esc(data.shopName)})</p>
              <div style="background:#ffedd5;border:2px solid #fed7aa;border-radius:14px;padding:12px;margin:12px 0;text-align:left;">
                <div style="font-size:0.85rem;font-weight:900;color:#c2410c;margin-bottom:8px;">✨ Vật phẩm đã nhận vào kho quán:</div>
                ${data.items.map(it => `
                  <div style="display:flex;align-items:center;gap:8px;font-size:0.9rem;font-weight:800;color:#9a3412;margin:5px 0;">
                    <span style="font-size:1.4rem;">${it.i || '📦'}</span>
                    <span>${esc(it.n)}</span>
                  </div>
                `).join('')}
              </div>
              <div style="font-size:0.8rem;color:#64748b;">(Hôm nay bạn đã nhận ${S.giftsReceivedToday}/2 quà tặng)</div>
            </div>
          `, [['Tuyệt vời!', () => { BanBe.render(); }]]);
          return;
        }

        if (data.giftType === 'money') {
          S.money += data.val;
          S.cur.equip = S.cur.equip || [];
          S.cur.equip.push({ n: `Quà tặng vốn từ bạn bè (${data.senderName})`, v: data.val });
          S.lixiCooldownSec = 86400; // Đếm ngược 24h online (86.400 giây)
        } else if (data.giftType === 'cups') {
          if (typeof addStock === 'function') addStock('ly', data.val);
        } else if (data.giftType === 'flavor') {
          if (typeof addStock === 'function') addStock(data.val, 15);
        } else if (data.giftType === 'pearl') {
          if (typeof addStock === 'function') addStock('tran_chau_den', 50);
        }

        save();
        head();
        if (typeof sfx === 'function') sfx('lvup');
        ask(`
          <div style="text-align:center;padding:10px 0;">
            <div style="font-size:3.5rem;animation:bounce 0.8s infinite alternate;">🎁</div>
            <h2 style="color:#ea580c;margin:8px 0;">Nhận Quà Trà Hữu Thành Công!</h2>
            <p>Người gửi: <b>${esc(data.senderName)}</b> (${esc(data.shopName)})</p>
            <div style="background:#ffedd5;border:2px solid #fed7aa;border-radius:14px;padding:12px;margin:12px 0;">
              <div style="font-size:1.15rem;font-weight:900;color:#c2410c;">✨ ${esc(data.label)}</div>
              <small style="color:#7c2d12;">Đã chuyển thẳng vào két / kho của quán!</small>
            </div>
            <div style="font-size:0.8rem;color:#64748b;">(Hôm nay bạn đã nhận ${S.giftsReceivedToday}/2 quà tặng)</div>
          </div>
        `, [['Tuyệt vời!', () => { BanBe.render(); }]]);
        return;
      }

      // 3. GHÉ THĂM QUÁN & CHECK-IN
      if (type === 'shop') {
        BanBe.showVisitDialog(data);
        return;
      }

      // 4. THÁCH ĐẤU DOANH THU
      if (type === 'chal') {
        BanBe.showChallengeDialog(data);
        return;
      }
    },

    // Hiển thị dialog ghé thăm quán bạn bè
    showVisitDialog(shopData) {
      const bestHTML = (shopData.bestSellers || []).map((b, i) => `
        <div class="bb-visit-best-item">
          ${['🥇','🥈','🥉'][i] || '⭐'} ${esc(b.n)} (${b.q} ly)
        </div>
      `).join('');

      const tem = (shopData.brand && typeof temHTML === 'function') ? temHTML(shopData.brand, 110, true) : '<div style="font-size:2.5rem;">🧋</div>';
      const isChibiOwner = shopData.ownerFace && /^b\d+$/.test(shopData.ownerFace);

      ask(`
        <div class="bb-visit-shop">
          <div class="bb-visit-header">
            <span style="font-size:0.75rem;font-weight:800;color:#ea580c;background:#ffedd5;padding:2px 8px;border-radius:999px;">🏠 GHÉ THĂM QUÁN TRÀ BẠN HIỀN</span>
            <h2 style="margin:6px 0 2px;color:#1e293b;">${esc(shopData.shopName)}</h2>
            <div style="font-size:0.82rem;color:#64748b;display:flex;align-items:center;justify-content:center;gap:6px;">
              Chủ quán: 
              ${isChibiOwner ? `<img src="img/brand/${shopData.ownerFace}.png" style="width:26px;height:26px;object-fit:contain;vertical-align:middle;border-radius:50%;background:#fff;">` : `<b>${esc(shopData.ownerFace)}</b>`}
              <b>${esc(shopData.ownerName)}</b> · Cấp ${shopData.level || 1} · ⭐ ${shopData.stars || '5.0'}
            </div>
          </div>

          <div class="bb-visit-tem-wrap">${tem}</div>

          <div style="font-size:0.84rem;font-weight:800;color:#c2410c;margin-top:10px;">🔥 Top 3 Món Best Seller Của Quán:</div>
          <div class="bb-visit-bests">${bestHTML}</div>

          <p style="font-size:0.82rem;color:#475569;margin-top:8px;">
            Hãy thả tim hoặc check-in 5 sao ủng hộ bạn bè để giúp quán bạn nhận đánh giá tích cực và kích hoạt <b>Buff Trà Hữu (+15% khách ghé)</b> ca sau!
          </p>
        </div>
      `, [
        ['Đóng', () => {}],
        ['❤️ Thả tim', () => {
          if (typeof sfx === 'function') sfx('bell');
          toast(`❤️ Đã gửi ngàn trái tim yêu thương đến quán ${shopData.shopName}!`);
        }],
        ['⭐ Check-in 5 sao (+15% Khách)', () => {
          if (Array.isArray(S.reviews)) {
            S.reviews.unshift({
              s: 5,
              t: `Ghé thăm check-in quán của bạn ${shopData.ownerName}! Tem thương hiệu xinh xỉu, trà thơm béo chuẩn vị, vote 5 sao ngay! 🧋✨`,
              k: 'checkin_friend',
              d: S.day,
              o: false,
              n: shopData.ownerName || 'Bạn Thân',
              f: shopData.ownerFace || 'b00'
            });
            S.revTotal = Math.max(S.revTotal || 0, S.reviews.length - 1) + 1;
          }
          S.friendBuff = { day: S.day, boost: 0.15 };
          save();
          head();
          if (typeof sfx === 'function') sfx('lvup');
          toast(`⭐ Đã check-in thành công! Quán nhận 1 đánh giá 5★ và được BUFF +15% khách ghé ca bán hôm nay! 🎉`);
        }, 1]
      ]);
    },

    // Hiển thị dialog thách đấu doanh thu
    showChallengeDialog(chalData) {
      ask(`
        <div style="text-align:center;">
          <div style="font-size:3.5rem;">⚔️</div>
          <h2 style="color:#312e81;margin:6px 0;">THÁCH ĐẤU DOANH THU CA BÁN!</h2>
          <p>Trà thủ <b>${esc(chalData.challenger)}</b> (${esc(chalData.shopName)}) gửi chiến thư thách thức bạn!</p>
          <div style="background:#e0e7ff;border:2px solid #818cf8;border-radius:14px;padding:12px;margin:12px 0;">
            <div style="font-size:0.8rem;font-weight:700;color:#3730a3;">MỤC TIÊU CẦN VƯỢT QUA:</div>
            <div style="font-size:1.5rem;font-weight:900;color:#1e1b4b;">${typeof fmt === 'function' ? fmt(chalData.targetRev) : chalData.targetRev + 'đ'}</div>
            <small style="color:#4338ca;">Trong 1 ca bán hàng sắp tới</small>
          </div>
          <p style="font-size:0.82rem;color:#4b5563;">
            Nếu doanh thu ca bán tới của bạn đạt hoặc vượt mốc này: Nhận ngay danh hiệu <b>🏆 Bàn tay pha chế vàng</b> cùng phần thưởng nóng <b>1.000.000đ</b>!
          </p>
        </div>
      `, [
        ['Để sau', () => {}],
        ['🔥 Chấp nhận thách đấu!', () => {
          S.activeChallenge = {
            id: chalData.id,
            challenger: chalData.challenger,
            targetRev: chalData.targetRev,
            day: S.day
          };
          save();
          if (typeof sfx === 'function') sfx('star');
          toast(`⚔️ Đã nhận lời thách đấu! Hãy mở bán và vượt qua mốc ${fmt(chalData.targetRev)}!`);
          BanBe.render();
        }, 1]
      ]);
    },

    // Thêm các bạn mẫu để chơi thử nghiệm (Tối đa 5 người)
    addSampleFriends() {
      this.init();
      const MAX_FRIENDS = 5;
      if (S.friends.length >= MAX_FRIENDS) {
        toast('⚠️ Danh sách bạn quen đã đạt tối đa 5 người! Hãy xoá bớt bạn để thêm bạn mới.');
        return;
      }

      const samples = [
        {
          id: 'sample_bap',
          name: 'Bé Bắp 🌽',
          face: 'b06',
          quote: 'Cho ly nhiều đường ít đá nha sếp!',
          favOrder: { base: 'olong', flav: null, tops: ['tcden'], size: 'L', sugar: '70%', ice: 'Ít đá' },
          shopName: 'Tiệm Trà Bé Bắp'
        },
        {
          id: 'sample_minh',
          name: 'Minh Hóng Hớt 🕶️',
          face: 'b18',
          quote: 'Trà ở đây đỉnh nhất xóm! Mãi đỉnh!',
          favOrder: { base: 'luc', flav: null, tops: ['cunang'], size: 'L', sugar: '100%', ice: 'Đá thường' },
          shopName: 'Trà Sữa Phố Cũ'
        },
        {
          id: 'sample_vy',
          name: 'Vy Trà Thủ 🧋',
          face: 'b21',
          quote: 'Full topping cho em nha sếp ơi!',
          favOrder: { base: 'hong', flav: null, tops: ['tcvang'], size: 'M', sugar: '50%', ice: 'Ít đá' },
          shopName: 'Góc Trà Chill'
        }
      ];

      let added = 0;
      samples.forEach(s => {
        if (S.friends.length < MAX_FRIENDS && !S.friends.some(f => f.id === s.id)) {
          S.friends.push(s);
          added++;
        }
      });
      save();
      if (typeof sfx === 'function') sfx('lvup');
      toast(added > 0 ? `🎉 Đã thêm ${added} người bạn thân thiết vào Danh sách Bạn Quen!` : 'Đã có đủ bạn mẫu trong danh sách!');
      this.render();
    },

    // Mở popup chỉnh sửa Thẻ Trà Thủ (chọn 50 Chibi Avatars)
    editMyCard() {
      this.init();
      const c = S.myCard;
      if (!c.face || !/^b\d+$/.test(c.face)) c.face = 'b00';
      let selectedFace = c.face;
      const curBase = normBase(c.favOrder.base);
      const curTop = normTop((c.favOrder.tops && c.favOrder.tops[0]) || 'tcden');

      ask(`
        <div style="text-align:left;">
          <h2 style="text-align:center;margin:0 0 10px;">🎨 Chỉnh Sửa Thẻ Trà Thủ</h2>
          
          <div style="margin-bottom:8px;">
            <label style="font-weight:800;font-size:0.8rem;color:#334155;">Biệt danh của bạn:</label>
            <input id="bbEditName" class="pinbox nm" maxlength="18" value="${esc(c.name)}" style="width:100%;margin-top:2px;">
          </div>

          <div style="margin-bottom:10px;">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px;">
              <label style="font-weight:800;font-size:0.82rem;color:#334155;">Chọn Avatar Chibi (50 mẫu độc quyền):</label>
              <span id="bbChosenAvPreview" style="display:flex;align-items:center;gap:6px;font-size:0.75rem;font-weight:700;color:#ea580c;">
                Đang chọn: <img src="img/brand/${selectedFace}.png" style="width:24px;height:24px;object-fit:contain;vertical-align:middle;border-radius:50%;" id="bbChosenAvImg">
              </span>
            </div>
            <div style="display:grid;grid-template-columns:repeat(5, 1fr);gap:6px;max-height:190px;overflow-y:auto;padding:6px;background:#f8fafc;border:1.5px solid #cbd5e1;border-radius:12px;" id="bbAvatarList">
              ${BRAND_AVATARS.map(av => `
                <button type="button" class="sbtn ${av === selectedFace ? 'pri' : 'ghost'}" style="padding:4px;display:flex;align-items:center;justify-content:center;border-radius:10px;aspect-ratio:1/1;" data-av="${av}" title="Chibi ${av}">
                  <img src="img/brand/${av}.png" alt="" style="width:36px;height:36px;object-fit:contain;pointer-events:none;">
                </button>
              `).join('')}
            </div>
          </div>

          <div style="margin-bottom:8px;">
            <label style="font-weight:800;font-size:0.8rem;color:#334155;">Câu cửa miệng khi ghé quán:</label>
            <input id="bbEditQuote" class="pinbox" maxlength="40" value="${esc(c.quote)}" style="width:100%;margin-top:2px;" placeholder="VD: Cho ly nhiều đường ít đá...">
            <div style="display:flex;gap:4px;overflow-x:auto;margin-top:4px;">
              ${CATCHPHRASES.slice(0, 3).map(cp => `<button type="button" class="sbtn ghost" style="font-size:0.7rem;padding:2px 6px;" data-pickcp="${esc(cp)}">${esc(cp.slice(0, 20))}...</button>`).join('')}
            </div>
          </div>

          <div style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:10px;padding:10px;font-size:0.82rem;">
            <b>🧋 Món trà ruột yêu thích:</b>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:6px;">
              <div>
                <span style="font-size:0.75rem;color:#64748b;font-weight:700;display:block;margin-bottom:3px;">Trà nền:</span>
                <select id="bbEditBase" style="width:100%;padding:6px;border-radius:8px;border:1.5px solid #cbd5e1;font-weight:700;font-size:0.82rem;background:#fff;color:#1e293b;">
                  <option value="tra" ${curBase === 'tra' ? 'selected' : ''}>🧋 Trà sữa truyền thống</option>
                  <option value="olong" ${curBase === 'olong' ? 'selected' : ''}>🍃 Trà ô long</option>
                  <option value="hong" ${curBase === 'hong' ? 'selected' : ''}>🍂 Hồng trà</option>
                  <option value="luc" ${curBase === 'luc' ? 'selected' : ''}>🌿 Lục trà</option>
                  <option value="thai" ${curBase === 'thai' ? 'selected' : ''}>🧡 Trà sữa Thái</option>
                  <option value="matcha" ${curBase === 'matcha' ? 'selected' : ''}>🍵 Matcha</option>
                </select>
              </div>
              <div>
                <span style="font-size:0.75rem;color:#64748b;font-weight:700;display:block;margin-bottom:3px;">Topping ruột:</span>
                <select id="bbEditTop" style="width:100%;padding:6px;border-radius:8px;border:1.5px solid #cbd5e1;font-weight:700;font-size:0.82rem;background:#fff;color:#1e293b;">
                  <optgroup label="⚫ Nhóm Trân Châu">
                    <option value="tcden" ${curTop === 'tcden' ? 'selected' : ''}>Trân châu đen</option>
                    <option value="tcvang" ${curTop === 'tcvang' ? 'selected' : ''}>Trân châu hoàng kim</option>
                    <option value="tcsoi" ${curTop === 'tcsoi' ? 'selected' : ''}>Trân châu sợi</option>
                    <option value="popping" ${curTop === 'popping' ? 'selected' : ''}>Trân châu nổ</option>
                    <option value="thach" ${curTop === 'thach' ? 'selected' : ''}>Trân châu trắng</option>
                  </optgroup>
                  <optgroup label="🟫 Nhóm Thạch">
                    <option value="cunang" ${curTop === 'cunang' ? 'selected' : ''}>Thạch củ năng</option>
                    <option value="thachtc" ${curTop === 'thachtc' ? 'selected' : ''}>Thạch trái cây</option>
                    <option value="suongsao" ${curTop === 'suongsao' ? 'selected' : ''}>Sương sáo</option>
                    <option value="thachcf" ${curTop === 'thachcf' ? 'selected' : ''}>Thạch cà phê</option>
                  </optgroup>
                  <optgroup label="☁️ Nhóm Foam">
                    <option value="cheese" ${curTop === 'cheese' ? 'selected' : ''}>Foam cheese</option>
                    <option value="fmatcha" ${curTop === 'fmatcha' ? 'selected' : ''}>Foam matcha</option>
                    <option value="fsalt" ${curTop === 'fsalt' ? 'selected' : ''}>Foam muối</option>
                    <option value="fube" ${curTop === 'fube' ? 'selected' : ''}>Foam ube</option>
                  </optgroup>
                  <optgroup label="🧀 Nhóm Phô Mai">
                    <option value="pmvien" ${curTop === 'pmvien' ? 'selected' : ''}>Phô mai viên</option>
                    <option value="pmtuoi" ${curTop === 'pmtuoi' ? 'selected' : ''}>Phô mai tươi</option>
                    <option value="thachpm" ${curTop === 'thachpm' ? 'selected' : ''}>Thạch phô mai</option>
                  </optgroup>
                </select>
              </div>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-top:6px;">
              <div>
                <span style="font-size:0.75rem;color:#64748b;font-weight:700;display:block;margin-bottom:3px;">Size:</span>
                <select id="bbEditSize" style="width:100%;padding:4px;border-radius:8px;border:1.5px solid #cbd5e1;font-weight:700;font-size:0.8rem;background:#fff;">
                  <option value="L" ${(c.favOrder.size || 'L') === 'L' ? 'selected' : ''}>Size L</option>
                  <option value="M" ${c.favOrder.size === 'M' ? 'selected' : ''}>Size M</option>
                </select>
              </div>
              <div>
                <span style="font-size:0.75rem;color:#64748b;font-weight:700;display:block;margin-bottom:3px;">Đường:</span>
                <select id="bbEditSugar" style="width:100%;padding:4px;border-radius:8px;border:1.5px solid #cbd5e1;font-weight:700;font-size:0.8rem;background:#fff;">
                  <option value="30%" ${c.favOrder.sugar === '30%' ? 'selected' : ''}>30% đường</option>
                  <option value="50%" ${c.favOrder.sugar === '50%' ? 'selected' : ''}>50% đường</option>
                  <option value="70%" ${(c.favOrder.sugar || '70%') === '70%' ? 'selected' : ''}>70% đường</option>
                  <option value="100%" ${c.favOrder.sugar === '100%' ? 'selected' : ''}>100% đường</option>
                </select>
              </div>
              <div>
                <span style="font-size:0.75rem;color:#64748b;font-weight:700;display:block;margin-bottom:3px;">Đá:</span>
                <select id="bbEditIce" style="width:100%;padding:4px;border-radius:8px;border:1.5px solid #cbd5e1;font-weight:700;font-size:0.8rem;background:#fff;">
                  <option value="Không đá" ${c.favOrder.ice === 'Không đá' ? 'selected' : ''}>Không đá</option>
                  <option value="Ít đá" ${(c.favOrder.ice || 'Ít đá') === 'Ít đá' ? 'selected' : ''}>Ít đá</option>
                  <option value="Đá thường" ${c.favOrder.ice === 'Đá thường' ? 'selected' : ''}>Đá thường</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      `, [
        ['Huỷ', () => {}],
        ['Lưu thẻ', () => {
          const nm = ($('bbEditName') || {}).value || c.name;
          const qt = ($('bbEditQuote') || {}).value || c.quote;
          const bs = ($('bbEditBase') || {}).value || c.favOrder.base;
          const tp = ($('bbEditTop') || {}).value || c.favOrder.tops[0];
          const sz = ($('bbEditSize') || {}).value || 'L';
          const sug = ($('bbEditSugar') || {}).value || '70%';
          const ic = ($('bbEditIce') || {}).value || 'Ít đá';
          c.name = nm.trim().slice(0, 18);
          c.face = selectedFace;
          c.quote = qt.trim().slice(0, 45);
          c.favOrder.base = normBase(bs);
          c.favOrder.tops = [normTop(tp)];
          c.favOrder.size = sz;
          c.favOrder.sugar = sug;
          c.favOrder.ice = ic;
          save();
          toast('✅ Đã lưu Thẻ Trà Thủ của bạn!');
          BanBe.render();
        }, 1]
      ]);

      setTimeout(() => {
        const al = $('bbAvatarList');
        if (al) {
          al.querySelectorAll('[data-av]').forEach(btn => {
            btn.onclick = () => {
              al.querySelectorAll('[data-av]').forEach(b => {
                b.classList.remove('pri');
                b.classList.add('ghost');
              });
              btn.classList.remove('ghost');
              btn.classList.add('pri');
              selectedFace = btn.dataset.av;
              const img = $('bbChosenAvImg');
              if (img) img.src = `img/brand/${selectedFace}.png`;
            };
          });
        }
        document.querySelectorAll('[data-pickcp]').forEach(btn => {
          btn.onclick = () => {
            const input = $('bbEditQuote');
            if (input) input.value = btn.dataset.pickcp;
          };
        });
      }, 50);
    },

    // Kiểm tra & Xử lý khi khách hàng VIP bạn bè xuất hiện trong ca bán
    checkSpawnVIPFriend(slotIndex) {
      this.init();
      if (!S.friends || S.friends.length === 0) return false;

      // Mỗi ngày chỉ 1 lần bạn bè ghé cho mỗi bạn
      if (S.friendsVisitedDay !== S.day) {
        S.friendsVisitedDay = S.day;
        S.friendsVisitedToday = [];
      }
      if (!Array.isArray(S.friendsVisitedToday)) {
        S.friendsVisitedToday = [];
      }

      // Lọc các bạn bè chưa ghé hôm nay và không đang ngồi ở quầy
      const currentFriendIds = (R.slots || [])
        .filter(c => c && c.isFriend && c.friendData && c.friendData.id)
        .map(c => c.friendData.id);

      const availableFriends = S.friends.filter(f => 
        !S.friendsVisitedToday.includes(f.id) && !currentFriendIds.includes(f.id)
      );

      if (availableFriends.length === 0) return false;

      // 10% tỉ lệ bạn bè ghé thăm để tránh tranh giành khách
      if (Math.random() > 0.10) return false;

      const friend = availableFriends[Math.floor(Math.random() * availableFriends.length)];
      if (!friend) return false;

      // Ghi nhận bạn này đã ghé quán hôm nay
      S.friendsVisitedToday.push(friend.id);
      if (typeof save === 'function') save();

      // Random 1/4: 1 món ruột (choice === 0) hoặc 1 trong 3 món best seller của họ (choice 1, 2, 3)
      const orderChoice = Math.floor(Math.random() * 4); // 0, 1, 2, 3
      let sayText = friend.quote || 'Cho mình 1 ly món ruột quen thuộc nha bạn hiền!';
      let favBase = normBase(friend.favOrder?.base || 'olong');
      let favTops = (friend.favOrder?.tops || ['tcden']).map(t => normTop(t));
      let favFlav = friend.favOrder?.flav || null;
      let favSize = friend.favOrder?.size || 'L';

      const friendBests = (friend.bestSellers && friend.bestSellers.length) ? friend.bestSellers : [
        { k: 'olong', n: 'Trà Ô Long' },
        { k: 'tcden', n: 'Trân Châu Đen' },
        { k: 'cheese', n: 'Foam Cheese' }
      ];

      let base = favBase;
      let tops = favTops;
      let flav = favFlav;
      let size = favSize;

      if (orderChoice > 0 && friendBests.length) {
        const bsIdx = (orderChoice - 1) % friendBests.length;
        const bs = friendBests[bsIdx];
        const bsKey = normTop(normBase(bs.k || 'olong'));
        const bsName = bs.n || getItemName(bsKey) || 'Best Seller';

        sayText = `Món này ở quán mình là Top ${orderChoice} Best Seller bán chạy nhất nè! Cho mình 1 ly ${bsName} nha!`;

        // Nếu món best seller là trà base
        if ((window.BASE_KEYS || ['tra', 'olong', 'hong', 'luc', 'thai', 'matcha']).includes(bsKey)) {
          base = bsKey;
          tops = favTops.length ? favTops : ['tcden'];
        } 
        // Nếu là topping
        else if ((window.TOP_KEYS || ['tcden', 'cheese', 'pudding', 'thach']).includes(bsKey)) {
          base = favBase;
          tops = [bsKey];
        } 
        // Nếu là siro hương
        else if ((window.FLAV_KEYS || ['dao', 'dau', 'vai']).includes(bsKey)) {
          base = 'luc';
          flav = bsKey;
          tops = favTops.length ? favTops : ['tcden'];
        }
      }

      const avBases = (window.BASE_KEYS || ['tra', 'olong', 'hong', 'luc', 'thai', 'matcha']).filter(k => S.unlocked && S.unlocked[k]);
      if (avBases.length && (!S.unlocked || !S.unlocked[base])) {
        base = avBases[0];
      }

      tops = tops.filter(k => S.unlocked && S.unlocked[k]);
      if (tops.length === 0) {
        const avTops = (window.TOP_KEYS || ['tcden']).filter(k => S.unlocked && S.unlocked[k]);
        tops = avTops.length ? [avTops[0]] : ['tcden'];
      }

      const lv = (typeof level === 'function' ? level() : 1);
      let sugar = null;
      let ice = null;
      if (lv >= 2) {
        const rawSug = parseInt(String(friend.favOrder?.sugar || 70), 10);
        sugar = [30, 50, 70, 100].includes(rawSug) ? rawSug : 70;
        ice = friend.favOrder?.ice || 'Ít đá';
        if (!['Không đá', 'Ít đá', 'Đá thường'].includes(ice)) ice = 'Ít đá';
      }

      const o = {
        base,
        flav: flav && S.unlocked && S.unlocked[flav] ? flav : null,
        tops,
        cheese: false, // Foam cheese xử lý qua topping 'cheese'
        size,
        sugar,
        ice,
        so: null
      };

      const max = 80; // Khách bạn bè rất kiên nhẫn
      R.slots[slotIndex] = {
        id: ++uid,
        isFriend: true,
        vip: true, // Đồng thời là VIP
        friendData: friend,
        name: friend.name,
        face: friend.face || 'b00',
        say: sayText,
        end: ' nha bạn hiền!',
        cups: [o],
        done: [false],
        order: o,
        pat: max,
        max,
        wrong: 0,
        paid: 0
      };

      if (typeof renderStreet === 'function') renderStreet();
      if (typeof sfx === 'function') sfx('star');
      toast(`👑 Bạn thân [${friend.name}] vừa ghé quán làm Khách VIP!`);
      return true;
    },

    // Khi ca bán kết thúc: kiểm tra thách đấu
    checkChallengeEnd(dayRev) {
      this.init();
      if (!S.activeChallenge) return;
      const c = S.activeChallenge;
      if (dayRev >= c.targetRev) {
        S.trophies = S.trophies || [];
        if (!S.trophies.includes('gold_hands')) {
          S.trophies.push('gold_hands');
        }
        const reward = 1000000;
        S.money += reward;
        S.cur.equip = S.cur.equip || [];
        S.cur.equip.push({ n: 'Thưởng chiến thắng thách đấu doanh thu', v: reward });
        save();
        head();
        if (typeof sfx === 'function') sfx('lvup');
        setTimeout(() => {
          ask(`
            <div style="text-align:center;">
              <div style="font-size:3.5rem;">🏆</div>
              <h2 style="color:#b45309;margin:6px 0;">CHIẾN THẮNG THÁCH ĐẤU!</h2>
              <p>Bạn đã xuất sắc vượt qua mốc thách đấu <b>${fmt(c.targetRev)}</b> của <b>${esc(c.challenger)}</b>!</p>
              <div style="background:#fef3c7;border:2px solid #facc15;border-radius:14px;padding:12px;margin:12px 0;">
                <div style="font-size:1.1rem;font-weight:900;color:#92400e;">🏆 Danh hiệu: BÀN TAY PHA CHẾ VÀNG</div>
                <div style="font-size:1.25rem;font-weight:900;color:#15803d;margin-top:4px;">+1.000.000đ Tiền Két</div>
              </div>
            </div>
          `, [['Tuyệt vời!', () => {}]]);
        }, 1200);
      } else {
        toast(`Thách đấu chưa hoàn thành (Doanh thu ${fmt(dayRev)}/${fmt(c.targetRev)}). Hãy thử lại ở ca tới!`);
      }
      S.activeChallenge = null;
      save();
    },

    // Render toàn bộ giao diện trong tab Bạn bè
    render() {
      this.init();
      const p = $('pane');
      if (!p) return;

      const c = S.myCard;
      const fav = c.favOrder || {};
      const baseName = getItemName(fav.base) || 'Trà ô long';
      const topNames = (fav.tops || []).map(t => getItemName(t)).join(', ') || 'Không topping';
      const isCardChibi = c.face && /^b\d+$/.test(c.face);

      let contentHTML = '';

      // TAB 1: THẺ CÁ NHÂN (TÍCH HỢP GHÉ QUÁN, BẠN BÈ TỐI ĐA 5 NGƯỜI)
      if (this.subTab === 'card') {
        const friendsListHTML = (S.friends && S.friends.length > 0) ? S.friends.map((f, i) => `
          <div class="bb-friend-item">
            <div class="bb-friend-face">
              ${f.face && /^b\d+$/.test(f.face) ? `<img src="img/brand/${f.face}.png" alt="">` : (f.face || '😎')}
            </div>
            <div class="bb-friend-details">
              <div class="bb-friend-name-row">
                <span class="bb-friend-name">${esc(f.name)}</span>
                <span class="bb-friend-vip-tag">👑 VIP</span>
              </div>
              <div class="bb-friend-sub">${esc(f.shopName || 'Quán bạn')} · Món ruột: ${getItemName(f.favOrder?.base)}${(f.favOrder?.tops && f.favOrder.tops.length) ? ' + ' + getItemName(f.favOrder.tops[0]) : ''}</div>
              <div class="bb-friend-quote">"${esc(f.quote || '')}"</div>
            </div>
            <div class="bb-friend-ops">
              <button type="button" class="bb-sm-btn visit" data-visitfriend="${i}" title="Ghé thăm quán bạn">🏠 Ghé Quán</button>
              <button type="button" class="bb-sm-btn" data-chalfriend="${i}" title="Thách đấu doanh thu">⚔️</button>
              <button type="button" class="bb-sm-btn del" data-delfriend="${i}" title="Xoá bạn">✕</button>
            </div>
          </div>
        `).join('') : `
          <div style="text-align:center;padding:18px 10px;background:#fff;border-radius:14px;border:1px dashed #cbd5e1;color:#64748b;font-size:0.84rem;">
            Chưa có bạn bè nào trong danh sách (tối đa 5 người).<br>
            Hãy chia sẻ link cho bạn bè hoặc bấm nút bên dưới để thêm các bạn thân mẫu nhé!
          </div>
        `;

        contentHTML = `
          <!-- Thẻ Cá Nhân của tôi -->
          <div class="bb-my-card">
            <div class="bb-card-head">
              <div class="bb-avatar-wrap" id="bbEditAvatarBtn" title="Chạm để đổi Avatar Chibi">
                ${isCardChibi ? `<img src="img/brand/${c.face}.png" alt="Chibi">` : (c.face || '😎')}
                <span class="bb-avatar-edit-badge">✏️</span>
              </div>
              <div class="bb-card-info">
                <div class="bb-card-name">
                  ${esc(c.name)}
                  ${(S.trophies || []).includes('gold_hands') ? '<span class="bb-trophy-badge" title="Danh hiệu Thách đấu">🏆 Bàn tay vàng</span>' : ''}
                </div>
                <div class="bb-card-shop">Chủ tiệm: <b>${esc(shopName())}</b> (Ngày ${S.day})</div>
                <div class="bb-card-quote">"${esc(c.quote)}"</div>
              </div>
            </div>

            <div class="bb-fav-order">
              <div class="bb-fav-title">🧋 Món trà ruột của tôi:</div>
              <div class="bb-fav-tags">
                <span class="bb-fav-tag">🍵 ${esc(baseName)}</span>
                <span class="bb-fav-tag">✨ ${esc(topNames)}</span>
                <span class="bb-fav-tag">📏 Size ${esc(fav.size || 'L')}</span>
                <span class="bb-fav-tag">🍬 ${esc(fav.sugar || '70%')} đường</span>
                <span class="bb-fav-tag">🧊 ${esc(fav.ice || 'Ít đá')}</span>
              </div>
            </div>

            <div class="bb-actions">
              <button type="button" class="bb-btn primary" id="bbCopyFriendCodeBtn">
                🔗 Lấy Link & Mã Bạn Bè
              </button>
              <button type="button" class="bb-btn secondary" id="bbViewMyShopBtn">
                🏠 Quán Của Tôi
              </button>
              <button type="button" class="bb-btn secondary" id="bbEditCardBtn">
                ✏️ Sửa Thẻ
              </button>
            </div>
          </div>

          <!-- Ô nhập mã vạn năng -->
          <div class="bb-redeem-box">
            <div class="bb-redeem-title">📲 Nhập Link hoặc Mã Bất Kỳ (Kết bạn, Ghé quán, Quà tặng, Thách đấu)</div>
            <div class="bb-redeem-input-row">
              <input id="bbRedeemIn" class="bb-redeem-input" placeholder="Dán mã bạn bè (5-8 ký tự, vd: TMOL68) hoặc link chia sẻ..." />
              <button type="button" class="bb-btn primary" id="bbRedeemBtn" style="flex:none;padding:0 16px;">
                Nhập mã
              </button>
            </div>
          </div>

          ${S.friendBuff ? `
            <div style="background:#ecfdf5;border:1.5px solid #6ee7b7;border-radius:12px;padding:10px;margin-bottom:8px;display:flex;align-items:center;gap:8px;">
              <span style="font-size:1.5rem;">🎉</span>
              <div style="font-size:0.82rem;color:#065f46;">
                <b>Đang kích hoạt Buff Ghé Quán Bạn Hữu!</b><br>
                Tăng +15% tỉ lệ khách ghé quán trong ca bán hôm nay (Ngày ${S.day}).
              </div>
            </div>
          ` : ''}

          <!-- Danh sách bạn quen (Giới hạn 5 người) -->
          <div style="display:flex;align-items:center;justify-content:space-between;margin-top:6px;">
            <div style="font-weight:800;font-size:0.95rem;color:#1e293b;">
              👥 Danh Sách Bạn Quen (${S.friends.length}/5)
            </div>
            <button type="button" class="bb-sm-btn" id="bbAddSampleBtn" ${S.friends.length >= 5 ? 'disabled style="opacity:0.5;"' : ''}>
              🤖 Thêm bạn thân mẫu
            </button>
          </div>
          <div class="bb-friends-list">
            ${friendsListHTML}
          </div>
        `;
      }

      // TAB 2: GÓI QUÀ TRÀ HỮU & RƯƠNG NGUYÊN LIỆU TIẾP TẾ
      else if (this.subTab === 'gift') {
        const chest = S.curPreviewChest || this.rollRandomChest();
        const usesLeft = Math.max(0, 2 - (S.chestUses || 0));

        contentHTML = `
          <div style="background:#fff;border-radius:14px;border:1.5px solid #fed7aa;padding:12px;">
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <span style="font-size:0.95rem;font-weight:900;color:#c2410c;">🎁 Đóng Gói Quà Tặng Bạn Hiền</span>
              <span style="font-size:0.75rem;font-weight:700;color:#64748b;">Đã nhận hôm nay: ${S.giftsReceivedToday}/2 quà</span>
            </div>
            <p style="font-size:0.8rem;color:#475569;margin:4px 0 10px;">
              Tiếp tế vốn và nguyên liệu giúp bạn bè vượt qua lúc kẹt tiền hoặc thiếu nguyên liệu pha chế!
            </p>

            <!-- RƯƠNG NGUYÊN LIỆU TIẾP TẾ NGẪU NHIÊN -->
            <div class="bb-chest-box">
              <div class="bb-chest-title">
                <span>🧋 Rương Nguyên Liệu Tiếp Tế Ngẫu Nhiên</span>
                <button type="button" class="bb-sm-btn" id="bbRerollChestBtn" title="Đổi ngẫu nhiên các món trong rương">
                  🎲 Đổi nguyên liệu ngẫu nhiên
                </button>
              </div>
              <p style="font-size:0.78rem;color:#78350f;margin:4px 0 6px;">
                Mỗi lần tạo mã rương có thể đổi nguyên liệu ngẫu nhiên. Giới hạn tạo mã 2 lần/24h (đếm ngược theo thời gian online game).
              </p>
              <div class="bb-chest-items">
                ${(chest.items || []).map(it => `
                  <div class="bb-chest-item">
                    <span style="font-size:1.3rem;">${it.i || '📦'}</span>
                    <span>${esc(it.n)}</span>
                  </div>
                `).join('')}
              </div>
              <div class="bb-chest-status">
                <span>Lượt tạo mã rương: <b>${usesLeft}/2 lần</b></span>
                ${(S.chestCooldownSec > 0) ? `<span>⏳ Đếm ngược hồi lượt: <b id="bbChestCountdown">${this.fmtSec(S.chestCooldownSec)}</b> (online)</span>` : `<span style="color:#16a34a;">🟢 Sẵn sàng đóng gói</span>`}
              </div>
              <button type="button" class="bb-btn primary" id="bbPackChestBtn" style="width:100%;margin-top:8px;" ${(usesLeft <= 0 && S.chestCooldownSec > 0) ? 'disabled style="opacity:0.6;cursor:not-allowed;"' : ''}>
                ${(usesLeft <= 0 && S.chestCooldownSec > 0) ? '⏳ Hết lượt tạo mã (Chờ đếm ngược khi online game)' : '📦 Đóng Gói Rương Này & Tạo Mã'}
              </button>
            </div>

            <div class="bb-lixi-status" style="margin-top:12px;padding:9px 12px;background:#fef2f2;border:1.5px solid #fecaca;border-radius:12px;display:flex;align-items:center;justify-content:space-between;font-size:0.8rem;">
              <span style="color:#991b1b;font-weight:700;">🧧 Nhận Bao Lì Xì (24h online/lần):</span>
              ${(S.lixiCooldownSec > 0) ? `<span style="color:#b91c1c;font-weight:800;">⏳ Đang đếm ngược: <b id="bbLixiCountdown">${this.fmtSec(S.lixiCooldownSec)}</b> (online)</span>` : `<span style="color:#15803d;font-weight:800;">🟢 Sẵn sàng nhận</span>`}
            </div>

            <div style="font-weight:800;font-size:0.85rem;color:#9a3412;margin:12px 0 6px;">💰 Hoặc Gửi Bao Lì Xì Tiền Vốn (Trừ từ két):</div>
            <div class="bb-gift-grid">
              <button type="button" class="bb-gift-card" data-gift="money" data-val="100000" data-lab="Bao lì xì 100k vốn">
                <span class="bb-gift-icon">🧧</span>
                <span class="bb-gift-name">Lì xì 100.000đ</span>
                <span class="bb-gift-val">Vốn khởi nghiệp</span>
              </button>
              <button type="button" class="bb-gift-card" data-gift="money" data-val="200000" data-lab="Bao lì xì 200k vốn">
                <span class="bb-gift-icon">🧧</span>
                <span class="bb-gift-name">Lì xì 200.000đ</span>
                <span class="bb-gift-val">Hỗ trợ phát triển</span>
              </button>
              <button type="button" class="bb-gift-card" data-gift="money" data-val="500000" data-lab="Bao lì xì 500k vốn" style="grid-column:span 2;">
                <span class="bb-gift-icon">💰</span>
                <span class="bb-gift-name">Đại Bao Lì Xì 500.000đ</span>
                <span class="bb-gift-val">Tiếp tế mạnh mẽ</span>
              </button>
            </div>
          </div>
        `;
      }

      // TAB 3: THÁCH ĐẤU DOANH THU
      else if (this.subTab === 'chal') {
        const bestRev = S.bestDayRev || Math.max(5000000, (S.best || 1) * 350000);
        contentHTML = `
          <div class="bb-chal-banner">
            <div class="bb-chal-title">⚔️ THÁCH ĐẤU DOANH THU CA BÁN</div>
            <div style="font-size:0.82rem;color:#c7d2fe;margin-top:4px;">Kỷ lục doanh thu 1 ca của bạn:</div>
            <div class="bb-chal-rec">${fmt(bestRev)}</div>
            <div class="bb-chal-desc">
              Tạo mã thách đấu để gửi chiến thư cho bạn bè! Nếu bạn bè phá vỡ kỷ lục này, cả 2 cùng nhận cúp <b>🏆 Bàn tay pha chế vàng</b> và <b>1.000.000đ</b> tiền thưởng!
            </div>
            <button type="button" class="bb-btn primary" id="bbMakeChalBtn" style="margin-top:12px;background:#fde047;color:#1e1b4b;font-weight:900;">
              ⚔️ Tạo Mã Thách Đấu Ngay
            </button>
          </div>

          ${S.activeChallenge ? `
            <div style="background:#fff;border:2px solid #6366f1;border-radius:14px;padding:12px;margin-top:12px;">
              <div style="font-weight:900;color:#3730a3;display:flex;align-items:center;gap:6px;">
                🔥 THÁCH ĐẤU ĐANG DIỄN RA
              </div>
              <div style="font-size:0.85rem;color:#475569;margin-top:4px;">
                Đối thủ: <b>${esc(S.activeChallenge.challenger)}</b><br>
                Mục tiêu cần vượt: <b style="color:#b91c1c;font-size:1.05rem;">${fmt(S.activeChallenge.targetRev)}</b>
              </div>
              <div style="font-size:0.78rem;color:#6b7280;margin-top:4px;">
                Hãy mở ca bán tiếp theo và cố gắng phục vụ thật nhanh để chinh phục mốc doanh thu này nhé!
              </div>
            </div>
          ` : ''}

          <div style="background:#fff;border:1.5px solid var(--line);border-radius:14px;padding:12px;margin-top:12px;">
            <div style="font-weight:800;font-size:0.86rem;color:#1e293b;margin-bottom:6px;">🏆 Phòng Truyền Thống Danh Hiệu:</div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;">
              ${(S.trophies || []).includes('gold_hands') ? `
                <div class="bb-trophy-badge" style="padding:6px 12px;font-size:0.85rem;">
                  🏆 Bàn tay pha chế vàng (Đã chinh phục)
                </div>
              ` : `
                <div style="font-size:0.8rem;color:#94a3b8;font-style:italic;">
                  Chưa có cúp thách đấu nào. Hãy nhận lời thách đấu để mở khóa danh hiệu!
                </div>
              `}
            </div>
          </div>
        `;
      }

      p.innerHTML = `
        <div class="bb-wrap">
          <div class="bb-subtabs">
            <button type="button" class="bb-subtab ${this.subTab === 'card' ? 'on' : ''}" data-bbsub="card">👤 Thẻ Cá Nhân</button>
            <button type="button" class="bb-subtab ${this.subTab === 'gift' ? 'on' : ''}" data-bbsub="gift">🎁 Gói Quà</button>
            <button type="button" class="bb-subtab ${this.subTab === 'chal' ? 'on' : ''}" data-bbsub="chal">⚔️ Thách Đấu</button>
          </div>
          ${contentHTML}
        </div>
      `;

      this.bindEvents();
    },

    bindEvents() {
      // Chuyển sub-tab
      document.querySelectorAll('[data-bbsub]').forEach(b => {
        b.onclick = () => {
          this.subTab = b.dataset.bbsub;
          this.render();
        };
      });

      // Lấy link & mã bạn bè tích hợp cả kết bạn và ghé quán
      const copyFriendBtn = $('bbCopyFriendCodeBtn');
      if (copyFriendBtn) {
        copyFriendBtn.onclick = () => {
          const code = this.genFriendAndShopCode();
          const cleanLoc = (window.location.origin + window.location.pathname).replace(/\/index\.html$/i, '/');
          const shareUrl = cleanLoc + '#invite=' + code;

          copyText(code, '📋 Đã sao chép Mã Bạn Bè (' + code + ')!');
          ask(`
            <div style="text-align:center;">
              <div style="font-size:3rem;">👑</div>
              <h2 style="color:#d97706;margin:6px 0;">Mã Bạn Bè & Ghé Quán</h2>
              <p style="font-size:0.82rem;color:#475569;margin-bottom:8px;">
                Gửi mã ngắn này cho bạn bè. Khi bạn bè nhập mã, hệ thống sẽ <b>TỰ ĐỘNG KẾT BẠN</b> và <b>GHÉ THĂM QUÁN</b> của bạn ngay lập tức! (Tối đa 5 người bạn quen)
              </p>
              
              <div style="font-weight:800;font-size:0.85rem;color:#c2410c;text-align:left;margin-top:6px;">⭐ Mã bạn bè rút gọn (chỉ 5-8 ký tự):</div>
              <div style="background:#ffedd5;border:2px dashed #ea580c;border-radius:12px;padding:12px;font-family:monospace;font-size:1.45rem;font-weight:900;letter-spacing:4px;color:#c2410c;user-select:all;margin:4px 0 6px;text-align:center;">
                ${esc(code)}
              </div>
              <div style="font-size:0.72rem;color:#9a3412;margin-bottom:8px;text-align:left;">💡 Mã gồm: Chữ đầu tên quán + Món ruột + Số may mắn (khác với mã sao lưu dữ liệu).</div>
            </div>
          `, [
            ['Đóng', () => {}],
            ['📋 Chép Mã', () => copyText(code, '📋 Đã sao chép mã bạn bè: ' + code)]
          ]);
        };
      }

      // Sửa thẻ
      const editCardBtn = $('bbEditCardBtn');
      const editAvatarBtn = $('bbEditAvatarBtn');
      if (editCardBtn) editCardBtn.onclick = () => this.editMyCard();
      if (editAvatarBtn) editAvatarBtn.onclick = () => this.editMyCard();

      // Xem quán của tôi
      const viewMyShopBtn = $('bbViewMyShopBtn');
      if (viewMyShopBtn) viewMyShopBtn.onclick = () => this.showMyVirtualShop();

      // Nút nhập mã vạn năng
      const redeemBtn = $('bbRedeemBtn');
      if (redeemBtn) {
        redeemBtn.onclick = () => {
          const inp = $('bbRedeemIn');
          if (inp) this.redeem(inp.value);
        };
      }

      // Thêm bạn thân mẫu (tối đa 5 người)
      const addSampleBtn = $('bbAddSampleBtn');
      if (addSampleBtn) {
        addSampleBtn.onclick = () => this.addSampleFriends();
      }

      // Ghé quán bạn bè
      document.querySelectorAll('[data-visitfriend]').forEach(btn => {
        btn.onclick = () => {
          const idx = +btn.dataset.visitfriend;
          const fr = S.friends[idx];
          if (!fr) return;
          const shopData = {
            shopName: fr.shopName || ('Quán ' + fr.name),
            ownerName: fr.name,
            ownerFace: fr.face || 'b00',
            level: fr.level || 3,
            stars: '5.0',
            brand: fr.brand || { n: fr.shopName || fr.name, i: fr.face || 'b00', bg: '#ffffff', col: '#5a4030', slogan: 'Trà sữa mỗi ngày' },
            bestSellers: fr.bestSellers || [
              { n: getItemName(fr.favOrder?.base) || 'Trà Ô Long', q: 98 },
              { n: 'Trà Sữa Trân Châu Hoàng Kim', q: 85 },
              { n: 'Trà Lài Đào Miếng', q: 72 }
            ]
          };
          this.showVisitDialog(shopData);
        };
      });

      // Thách đấu bạn bè
      document.querySelectorAll('[data-chalfriend]').forEach(btn => {
        btn.onclick = () => {
          this.subTab = 'chal';
          this.render();
        };
      });

      // Xoá bạn
      document.querySelectorAll('[data-delfriend]').forEach(btn => {
        btn.onclick = () => {
          const idx = +btn.dataset.delfriend;
          const fr = S.friends[idx];
          if (!fr) return;
          ask(`<h2>Xoá ${esc(fr.name)} khỏi danh sách bạn quen?</h2>`, [
            ['Huỷ', () => {}],
            ['Xoá', () => {
              S.friends.splice(idx, 1);
              save();
              toast('Đã xoá khỏi danh sách bạn bè.');
              BanBe.render();
            }, 1]
          ]);
        };
      });

      // Nút Đổi nguyên liệu ngẫu nhiên cho Rương Tiếp Tế
      const rerollChestBtn = $('bbRerollChestBtn');
      if (rerollChestBtn) {
        rerollChestBtn.onclick = () => {
          S.curPreviewChest = this.rollRandomChest();
          if (typeof save === 'function') save();
          if (typeof sfx === 'function') sfx('coin');
          toast('🎲 Đã làm mới nguyên liệu trong rương ngẫu nhiên!');
          this.render();
        };
      }

      // Nút Đóng gói rương ngẫu nhiên & Tạo mã
      const packChestBtn = $('bbPackChestBtn');
      if (packChestBtn) {
        packChestBtn.onclick = () => {
          const usesLeft = Math.max(0, 2 - (S.chestUses || 0));
          if (usesLeft <= 0 && S.chestCooldownSec > 0) {
            toast('⚠️ Bạn đã tạo đủ 2 mã rương! Vui lòng chờ đếm ngược khi online game để hồi lượt.');
            return;
          }

          const chest = S.curPreviewChest || this.rollRandomChest();
          ask(`
            <h2>Đóng gói Rương Nguyên Liệu Tiếp Tế?</h2>
            <p>Vật phẩm tiếp tế cho bạn bè gồm:</p>
            <div style="background:#fffbeb;border:1.5px solid #f59e0b;border-radius:10px;padding:8px 12px;margin:8px 0;text-align:left;">
              ${chest.items.map(it => `
                <div style="display:flex;align-items:center;gap:6px;font-size:0.85rem;font-weight:700;color:#92400e;margin:3px 0;">
                  <span>${it.i || '📦'}</span> <span>${esc(it.n)}</span>
                </div>
              `).join('')}
            </div>
            <small style="color:#64748b;">(Giới hạn tạo mã 2 lần/24h online game)</small>
          `, [
            ['Huỷ', () => {}],
            ['Đóng gói & Tạo mã', () => {
              S.chestUses = (S.chestUses || 0) + 1;
              if (!S.chestCooldownSec || S.chestCooldownSec <= 0) {
                S.chestCooldownSec = 24 * 3600; // Khởi động 24h online
              }
              const code = this.genChestGiftCode(chest);
              // Reroll rương kế tiếp
              S.curPreviewChest = this.rollRandomChest();
              save();
              copyText(code, `🎁 Đã tạo Rương Nguyên Liệu! Mã rút gọn đã sao chép!`);
              ask(`
                <div style="text-align:center;">
                  <div style="font-size:3rem;">🎁</div>
                  <h2 style="color:#ea580c;margin:6px 0;">Đóng Gói Thành Công!</h2>
                  <p>Mã quà tặng rút gọn của bạn:</p>
                  <div style="background:#fff7ed;border:2px dashed #f97316;border-radius:12px;padding:10px;font-family:monospace;font-size:0.95rem;font-weight:900;word-break:break-all;color:#c2410c;user-select:all;margin:10px 0;">
                    ${esc(code)}
                  </div>
                  <small style="color:#64748b;">(Đã tự động sao chép vào bộ nhớ tạm! Gửi cho bạn bè nhé!)</small>
                </div>
              `, [['Đóng', () => { this.render(); }], ['📋 Sao chép lại', () => copyText(code, '📋 Đã sao chép lại!')]]);
            }, 1]
          ]);
        };
      }

      // Đóng gói bao lì xì tiền vốn
      document.querySelectorAll('[data-gift="money"]').forEach(card => {
        card.onclick = () => {
          const gVal = +card.dataset.val;
          const gLab = card.dataset.lab;

          if (S.money < gVal) {
            toast(`Két không đủ ${fmt(gVal)} để đóng gói bao lì xì này!`);
            return;
          }
          ask(`<h2>Đóng gói ${gLab}?</h2><p>Số tiền <b>${fmt(gVal)}</b> sẽ được đóng vào bao lì xì để gửi cho bạn bè.</p>`, [
            ['Huỷ', () => {}],
            ['Đóng gói & Tạo mã', () => {
              S.money -= gVal;
              save();
              head();
              const code = BanBe.genGiftCode('money', gVal, gLab);
              copyText(code, `🎁 Đã tạo ${gLab}! Mã rút gọn đã sao chép!`);
              ask(`
                <div style="text-align:center;">
                  <div style="font-size:3rem;">🎁</div>
                  <h2 style="color:#ea580c;margin:6px 0;">Đóng Gói Thành Công!</h2>
                  <p>Mã quà tặng rút gọn của bạn:</p>
                  <div style="background:#fff7ed;border:2px dashed #f97316;border-radius:12px;padding:10px;font-family:monospace;font-size:0.95rem;font-weight:900;word-break:break-all;color:#c2410c;user-select:all;margin:10px 0;">
                    ${esc(code)}
                  </div>
                  <small style="color:#64748b;">(Đã tự động sao chép vào bộ nhớ tạm! Gửi cho bạn bè nhé!)</small>
                </div>
              `, [['Đóng', () => {}], ['📋 Sao chép lại', () => copyText(code, '📋 Đã sao chép lại!')]]);
            }, 1]
          ]);
        };
      });

      // Lấy link & mã quán ghé thăm
      const shareShopBtn = $('bbShareShopBtn');
      if (shareShopBtn) {
        shareShopBtn.onclick = () => {
          const code = this.genFriendAndShopCode();
          const cleanLoc = (window.location.origin + window.location.pathname).replace(/\/index\.html$/i, '/');
          const shareUrl = cleanLoc + '#invite=' + code;

          copyText(code, '🏠 Đã sao chép Mã Quán (' + code + ')!');
          ask(`
            <div style="text-align:center;">
              <div style="font-size:3rem;">🏠</div>
              <h2 style="color:#ea580c;margin:6px 0;">Mã Quán Trà Của Bạn</h2>
              <p style="font-size:0.82rem;color:#475569;">Gửi mã ngắn này để bạn bè ghé thăm check-in và tự động kết bạn (Tối đa 5 người):</p>
              
              <div style="font-weight:800;font-size:0.85rem;color:#ea580c;text-align:left;margin-top:6px;">⭐ Mã quán rút gọn (5-8 ký tự):</div>
              <div style="background:#ffedd5;border:2px dashed #ea580c;border-radius:12px;padding:12px;font-family:monospace;font-size:1.45rem;font-weight:900;letter-spacing:4px;color:#c2410c;user-select:all;margin:4px 0 6px;text-align:center;">
                ${esc(code)}
              </div>
              <div style="font-size:0.72rem;color:#9a3412;margin-bottom:8px;text-align:left;">💡 Mã gồm: Chữ đầu tên quán + Món ruột + Số may mắn (khác với mã sao lưu dữ liệu).</div>
            </div>
          `, [
            ['Đóng', () => {}],
            ['📋 Chép Mã', () => copyText(code, '📋 Đã sao chép mã: ' + code)]
          ]);
        };
      }

      // Nhập mã quán ghé thăm
      const visitBtn = $('bbVisitBtn');
      if (visitBtn) {
        visitBtn.onclick = () => {
          const inp = $('bbVisitIn');
          if (inp) this.redeem(inp.value);
        };
      }

      // Tạo mã thách đấu
      const makeChalBtn = $('bbMakeChalBtn');
      if (makeChalBtn) {
        makeChalBtn.onclick = () => {
          const code = this.genChallengeCode();
          const bestRev = S.bestDayRev || Math.max(5000000, (S.best || 1) * 350000);
          copyText(code, `⚔️ Đã tạo Mã Thách Đấu mốc ${fmt(bestRev)}!`);
          ask(`
            <div style="text-align:center;">
              <div style="font-size:3rem;">⚔️</div>
              <h2 style="color:#3730a3;margin:6px 0;">Mã Thách Đấu Rút Gọn</h2>
              <p>Gửi chiến thư này cho bạn bè để cùng tranh cúp Bàn Tay Vàng mốc <b>${fmt(bestRev)}</b>:</p>
              <div style="background:#eef2ff;border:2px dashed #6366f1;border-radius:12px;padding:10px;font-family:monospace;font-size:0.95rem;font-weight:900;word-break:break-all;color:#312e81;user-select:all;margin:10px 0;">
                ${esc(code)}
              </div>
              <small style="color:#64748b;">(Đã tự động sao chép vào bộ nhớ tạm!)</small>
            </div>
          `, [['Đóng', () => {}], ['📋 Sao chép lại', () => copyText(code, '📋 Đã sao chép lại!')]]);
        };
      }
    },

    // Hiển thị quán của tôi
    showMyVirtualShop() {
      const sShop = typeof shopName === 'function' ? shopName() : (S.shopName || 'Tiệm Trà Nhỏ');
      const sLv = typeof level === 'function' ? level() : 1;
      const sStars = typeof rating === 'function' ? Number(rating().toFixed(1)) : 5.0;
      const bestSellers = this.getMyBestSellers();
      const shopData = {
        shopName: sShop,
        ownerName: S.myCard?.name || 'Chủ Quán',
        ownerFace: S.myCard?.face || 'b00',
        level: sLv,
        stars: sStars,
        brand: S.brand || { n: sShop, i: S.myCard?.face || 'b00', bg: '#ffffff', col: '#5a4030', slogan: S.brand?.slogan || 'Trà sữa mỗi ngày' },
        bestSellers
      };
      this.showVisitDialog(shopData);
    }
  };

  window.BanBe = BanBe;
})();
