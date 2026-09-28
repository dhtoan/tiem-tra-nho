/**
 * 🧋 BANBE.JS - HỆ THỐNG BẠN BÈ & TƯƠNG TÁC XÃ HỘI (TIỆM TRÀ NHỎ)
 * Gồm 4 cơ chế độc đáo:
 * 1. Khách Quen VIP Là Bạn Bè (Thẻ Trà Thủ, ghé quán hào quang, tip x2, 5 sao)
 * 2. Gói Quà Trà Hữu (Tiếp tế vốn & nguyên liệu, giới hạn 2 quà/ngày)
 * 3. Ghé Thăm Quán & Thả Tim / Check-in 5 Sao (+15% khách ca tiếp theo)
 * 4. Thách Đấu Doanh Thu Ca Bán (Tranh Cúp Bàn tay pha chế vàng)
 */

(function () {
  const AVATARS = ['🥰','😎','🥳','🤩','🤠','😇','😋','🤗','😜','😼','🐼','🦊','🐯','🐰','☕','🧋'];

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
    pudding_trung: 'Phô mai viên'
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
    const avIdx = Math.max(0, AVATARS.indexOf(avatar));
    const cpIdx = CATCHPHRASES.indexOf(quote);
    const bIdx = Math.max(0, BASES.indexOf(normBase(base)));
    const tIdx = Math.max(0, TOPS.indexOf(normTop(top)));
    const sz = size === 'M' ? 0 : 1;
    const sug = sugar === '30%' ? 0 : sugar === '50%' ? 1 : sugar === '70%' ? 2 : 3;
    const ic = ice === 'Không đá' ? 0 : ice === 'Ít đá' ? 1 : 2;

    const b0 = (sz << 6) | (sug << 4) | (ic << 2) | (bIdx & 3);
    const b1 = ((bIdx >> 2) << 6) | (tIdx & 63);
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
      const avIdx = b2 & 15;
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
          face: AVATARS[avIdx] || '😎',
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
        ownerFace: '😎',
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
          face: '😎',
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
      } else if (S.myCard.favOrder) {
        S.myCard.favOrder.base = normBase(S.myCard.favOrder.base);
        if (S.myCard.favOrder.tops && S.myCard.favOrder.tops[0]) {
          S.myCard.favOrder.tops[0] = normTop(S.myCard.favOrder.tops[0]);
        }
      }
    },

    // Tạo mã bạn bè (Rút gọn tối đa: ~25 ký tự)
    genFriendCode() {
      this.init();
      const c = S.myCard;
      const fav = c.favOrder || {};
      const id = (c.id || '').replace(/^card_/, '');
      return packFriend(
        c.name,
        c.face || '😎',
        c.quote || CATCHPHRASES[0],
        fav.base || 'tra_o_long',
        (fav.tops && fav.tops[0]) || 'tran_chau_den',
        fav.size || 'L',
        fav.sugar || '70%',
        fav.ice || 'Ít đá',
        id
      );
    },

    // Tạo mã gói quà (Rút gọn tối đa: ~16 ký tự)
    genGiftCode(giftType, val, label) {
      this.init();
      let presetIdx = 0;
      if (giftType === 'money') {
        if (+val >= 500000) presetIdx = 2;
        else if (+val >= 200000) presetIdx = 1;
        else presetIdx = 0;
      } else if (giftType === 'cups') presetIdx = 3;
      else if (giftType === 'flavor') presetIdx = 4;
      else if (giftType === 'pearl') presetIdx = 5;

      const codeId = Date.now().toString(36).slice(-4);
      const sName = (S.myCard.name || 'Bạn hiền').slice(0, 15);
      return packGift(presetIdx, codeId, sName);
    },

    // Tạo mã quán (Shop Code) (Rút gọn tối đa: ~28 ký tự)
    genShopCode() {
      this.init();
      const sShop = typeof shopName === 'function' ? shopName() : (S.shopName || 'Tiệm Trà Nhỏ');
      const sLv = typeof level === 'function' ? level() : 1;
      const sStars = typeof rating === 'function' ? Number(rating().toFixed(1)) : 4.5;
      return packShop(sLv, sStars, sShop);
    },

    // Tạo mã thách đấu doanh thu (Rút gọn tối đa: ~22 ký tự)
    genChallengeCode() {
      this.init();
      const bestRev = S.bestDayRev || Math.max(5000000, (S.best || 1) * 350000);
      const chalId = Date.now().toString(36).slice(-4);
      const sName = (S.myCard.name || 'Trà Thủ').slice(0, 15);
      return packChal(bestRev, chalId, sName);
    },

    // Giải mã và xử lý mọi loại mã (hỗ trợ cả mã siêu ngắn 16-25 ký tự lẫn mã cũ)
    redeem(code) {
      this.init();
      code = String(code || '').trim();
      if (!code) {
        toast('Vui lòng dán mã vào ô!');
        return;
      }

      let type = '';
      let rawPayload = '';
      if (code.startsWith('G-')) { type = 'gift'; rawPayload = code.slice(2); }
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
      else {
        toast('Mã không hợp lệ! Vui lòng nhập mã bắt đầu bằng G-, F-, S-, C- (hoặc TTN-...)');
        return;
      }

      // 1. Thử giải mã binary siêu ngắn trước
      let data = null;
      if (type === 'gift') data = unpackGift(rawPayload);
      else if (type === 'friend') data = unpackFriend(rawPayload);
      else if (type === 'chal') data = unpackChal(rawPayload);
      else if (type === 'shop') data = unpackShop(rawPayload);

      // 2. Nếu không phải binary, giải mã bằng decPayload (mã JSON / mã cũ)
      if (!data) {
        const raw = decPayload(rawPayload);
        if (!raw) {
          toast('Mã bị lỗi hoặc không đọc được dữ liệu!');
          return;
        }
        data = raw;
      }

      // Chuẩn hoá dữ liệu (hỗ trợ cả compact array và object cũ)
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

      // 1. KẾT BẠN
      if (type === 'friend') {
        const card = data.card;
        if (!card || !card.name) {
          toast('Dữ liệu Thẻ Trà Thủ không hợp lệ!');
          return;
        }
        if (card.id === S.myCard.id) {
          toast('Đây là mã của chính bạn mà! Hãy gửi cho bạn bè nhé.');
          return;
        }
        const existingIdx = S.friends.findIndex(f => f.id === card.id);
        const friendObj = {
          id: card.id,
          name: card.name,
          face: card.face || '😎',
          quote: card.quote || CATCHPHRASES[0],
          favOrder: card.favOrder || S.myCard.favOrder,
          shopName: data.shopName || 'Quán Bạn Hiền',
          addedAt: Date.now()
        };
        if (existingIdx >= 0) {
          S.friends[existingIdx] = friendObj;
          save();
          toast(`Đã cập nhật thông tin bạn quen: ${card.name}!`);
        } else {
          S.friends.push(friendObj);
          save();
          if (typeof sfx === 'function') sfx('lvup');
          toast(`🎉 Đã thêm ${card.name} (${data.shopName}) vào Danh Sách Bạn Quen! Bạn sẽ ghé quán làm VIP!`);
        }
        BanBe.render();
        return;
      }

      // 2. NHẬN QUÀ TRÀ HỮU
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

        S.redeemedCodes.push(data.id);
        S.giftsReceivedToday = (S.giftsReceivedToday || 0) + 1;

        if (data.giftType === 'money') {
          S.money += data.val;
          S.cur.equip = S.cur.equip || [];
          S.cur.equip.push({ n: `Quà tặng vốn từ bạn bè (${data.senderName})`, v: data.val });
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

      ask(`
        <div class="bb-visit-shop">
          <div class="bb-visit-header">
            <span style="font-size:0.75rem;font-weight:800;color:#ea580c;background:#ffedd5;padding:2px 8px;border-radius:999px;">🏠 GHÉ THĂM QUÁN TRÀ BẠN HIỀN</span>
            <h2 style="margin:6px 0 2px;color:#1e293b;">${esc(shopData.shopName)}</h2>
            <div style="font-size:0.82rem;color:#64748b;">Chủ quán: <b>${esc(shopData.ownerFace)} ${esc(shopData.ownerName)}</b> · Cấp ${shopData.level || 1} · ⭐ ${shopData.stars || '5.0'}</div>
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
          // Thêm 1 đánh giá 5 sao cho quán của người chơi
          if (Array.isArray(S.reviews)) {
            S.reviews.unshift({
              s: 5,
              t: `Ghé thăm check-in quán của bạn ${shopData.ownerName}! Tem thương hiệu xinh xỉu, trà thơm béo chuẩn vị, vote 5 sao ngay! 🧋✨`,
              k: 'checkin_friend',
              d: S.day,
              o: false,
              n: shopData.ownerName || 'Bạn Thân',
              f: shopData.ownerFace || '🥰'
            });
            S.revTotal = Math.max(S.revTotal || 0, S.reviews.length - 1) + 1;
          }
          // Kích hoạt buff khách ghé ca tiếp theo
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

    // Thêm các bạn mẫu (bot bạn thân) để chơi thử nghiệm ngay
    addSampleFriends() {
      this.init();
      const samples = [
        {
          id: 'sample_bap',
          name: 'Bé Bắp 🌽',
          face: '🥰',
          quote: 'Cho ly nhiều đường ít đá nha sếp!',
          favOrder: { base: 'olong', flav: 'f_dao', tops: ['tcden', 'cheese'], size: 'L', sugar: '70%', ice: 'Ít đá' },
          shopName: 'Tiệm Trà Bé Bắp'
        },
        {
          id: 'sample_minh',
          name: 'Minh Hóng Hớt 🕶️',
          face: '😎',
          quote: 'Trà ở đây đỉnh nhất xóm! Mãi đỉnh!',
          favOrder: { base: 'luc', flav: null, tops: ['cunang', 'pmtuoi'], size: 'L', sugar: '100%', ice: 'Đá thường' },
          shopName: 'Trà Sữa Phố Cũ'
        },
        {
          id: 'sample_vy',
          name: 'Vy Trà Thủ 🧋',
          face: '🤩',
          quote: 'Full topping cho em nha sếp ơi!',
          favOrder: { base: 'hong', flav: 'f_dau', tops: ['tcden', 'pmvien'], size: 'M', sugar: '50%', ice: 'Ít đá' },
          shopName: 'Góc Trà Chill'
        }
      ];

      samples.forEach(s => {
        if (!S.friends.some(f => f.id === s.id)) {
          S.friends.push(s);
        }
      });
      save();
      if (typeof sfx === 'function') sfx('lvup');
      toast('🎉 Đã thêm 3 người bạn thân thiết vào Danh sách Bạn Quen!');
      this.render();
    },

    // Mở popup chỉnh sửa Thẻ Trà Thủ
    editMyCard() {
      this.init();
      const c = S.myCard;
      const curBase = normBase(c.favOrder.base);
      const curTop = normTop((c.favOrder.tops && c.favOrder.tops[0]) || 'tcden');

      ask(`
        <div style="text-align:left;">
          <h2 style="text-align:center;margin:0 0 10px;">🎨 Chỉnh Sửa Thẻ Trà Thủ</h2>
          
          <div style="margin-bottom:8px;">
            <label style="font-weight:800;font-size:0.8rem;color:#334155;">Biệt danh của bạn:</label>
            <input id="bbEditName" class="pinbox nm" maxlength="18" value="${esc(c.name)}" style="width:100%;margin-top:2px;">
          </div>

          <div style="margin-bottom:8px;">
            <label style="font-weight:800;font-size:0.8rem;color:#334155;">Chọn Avatar Chibi:</label>
            <div style="display:flex;gap:6px;overflow-x:auto;padding:4px 0;" id="bbAvatarList">
              ${AVATARS.map(av => `<button type="button" class="sbtn ${av === c.face ? 'pri' : ''}" style="font-size:1.4rem;padding:4px 8px;" data-av="${av}">${av}</button>`).join('')}
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
          </div>
        </div>
      `, [
        ['Huỷ', () => {}],
        ['Lưu thẻ', () => {
          const nm = ($('bbEditName') || {}).value || c.name;
          const qt = ($('bbEditQuote') || {}).value || c.quote;
          const bs = ($('bbEditBase') || {}).value || c.favOrder.base;
          const tp = ($('bbEditTop') || {}).value || c.favOrder.tops[0];
          c.name = nm.trim().slice(0, 18);
          c.quote = qt.trim().slice(0, 45);
          c.favOrder.base = normBase(bs);
          c.favOrder.tops = [normTop(tp)];
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
              al.querySelectorAll('[data-av]').forEach(b => b.classList.remove('pri'));
              btn.classList.add('pri');
              c.face = btn.dataset.av;
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
      // 22% tỉ lệ khách quen VIP ghé quán nếu còn chỗ
      if (Math.random() > 0.25) return false;

      const friend = S.friends[Math.floor(Math.random() * S.friends.length)];
      if (!friend) return false;

      let base = normBase(friend.favOrder?.base || 'olong');
      const avBases = (window.BASE_KEYS || ['tra', 'olong', 'hong', 'luc', 'thai', 'matcha']).filter(k => S.unlocked && S.unlocked[k]);
      if (avBases.length && (!S.unlocked || !S.unlocked[base])) {
        base = avBases[0];
      }

      let topKeys = (friend.favOrder?.tops || ['tcden']).map(t => normTop(t));
      let tops = topKeys.filter(k => !S.unlocked || S.unlocked[k]);
      if (tops.length === 0) {
        const avTops = (window.TOP_KEYS || ['tcden']).filter(k => S.unlocked && S.unlocked[k]);
        if (avTops.length) tops = [avTops[0]];
        else tops = ['tcden'];
      }

      const o = {
        base,
        flav: friend.favOrder?.flav && S.unlocked && S.unlocked[friend.favOrder.flav] ? friend.favOrder.flav : null,
        tops,
        cheese: !!friend.favOrder?.cheese,
        size: friend.favOrder?.size || 'L',
        sugar: friend.favOrder?.sugar || '70%',
        ice: friend.favOrder?.ice || 'Ít đá',
        so: null
      };

      const max = 75; // Khách bạn bè rất kiên nhẫn
      R.slots[slotIndex] = {
        id: ++uid,
        isFriend: true,
        friendData: friend,
        name: friend.name,
        face: friend.face || '😎',
        say: friend.quote || 'Cho ly nhiều đường ít đá nha sếp!',
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

      let contentHTML = '';

      // TAB 1: THẺ TRÀ THỦ & BẠN QUEN
      if (this.subTab === 'card') {
        const friendsListHTML = (S.friends && S.friends.length > 0) ? S.friends.map((f, i) => `
          <div class="bb-friend-item">
            <div class="bb-friend-face">${f.face || '😎'}</div>
            <div class="bb-friend-details">
              <div class="bb-friend-name-row">
                <span class="bb-friend-name">${esc(f.name)}</span>
                <span class="bb-friend-vip-tag">👑 VIP</span>
              </div>
              <div class="bb-friend-sub">${esc(f.shopName || 'Quán bạn')} · Món ruột: ${getItemName(f.favOrder?.base)}${(f.favOrder?.tops && f.favOrder.tops.length) ? ' + ' + getItemName(f.favOrder.tops[0]) : ''}</div>
              <div class="bb-friend-quote">"${esc(f.quote || '')}"</div>
            </div>
            <div class="bb-friend-ops">
              <button type="button" class="bb-sm-btn del" data-delfriend="${i}" title="Xoá bạn">✕</button>
            </div>
          </div>
        `).join('') : `
          <div style="text-align:center;padding:18px 10px;background:#fff;border-radius:14px;border:1px dashed #cbd5e1;color:#64748b;font-size:0.84rem;">
            Chưa có bạn bè nào trong danh sách.<br>
            Hãy nhập mã bạn bè hoặc bấm nút bên dưới để thêm các bạn thân mẫu nhé!
          </div>
        `;

        contentHTML = `
          <!-- Thẻ Trà Thủ của tôi -->
          <div class="bb-my-card">
            <div class="bb-card-head">
              <div class="bb-avatar-wrap" id="bbEditAvatarBtn" title="Đổi avatar">
                ${c.face}
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
                📋 Sao chép Mã Bạn Bè
              </button>
              <button type="button" class="bb-btn secondary" id="bbEditCardBtn">
                ✏️ Sửa Thẻ
              </button>
            </div>
          </div>

          <!-- Ô nhập mã vạn năng -->
          <div class="bb-redeem-box">
            <div class="bb-redeem-title">📲 Nhập Mã Bất Kỳ (Bạn bè, Quà tặng, Ghé thăm, Thách đấu)</div>
            <div class="bb-redeem-input-row">
              <input id="bbRedeemIn" class="bb-redeem-input" placeholder="Dán mã TTN-..." />
              <button type="button" class="bb-btn primary" id="bbRedeemBtn" style="flex:none;padding:0 16px;">
                Nhập mã
              </button>
            </div>
          </div>

          <!-- Danh sách bạn quen -->
          <div style="display:flex;align-items:center;justify-content:space-between;margin-top:6px;">
            <div style="font-weight:800;font-size:0.95rem;color:#1e293b;">
              👥 Danh Sách Bạn Quen (${S.friends.length})
            </div>
            <button type="button" class="bb-sm-btn" id="bbAddSampleBtn">
              🤖 Thêm bạn thân mẫu
            </button>
          </div>
          <div class="bb-friends-list">
            ${friendsListHTML}
          </div>
        `;
      }

      // TAB 2: GÓI QUÀ TRÀ HỮU
      else if (this.subTab === 'gift') {
        contentHTML = `
          <div style="background:#fff;border-radius:14px;border:1.5px solid #fed7aa;padding:12px;">
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <span style="font-size:0.95rem;font-weight:900;color:#c2410c;">🎁 Đóng Gói Quà Tặng Bạn Hiền</span>
              <span style="font-size:0.75rem;font-weight:700;color:#64748b;">Nhận hôm nay: ${S.giftsReceivedToday}/2 quà</span>
            </div>
            <p style="font-size:0.8rem;color:#475569;margin:4px 0 10px;">
              Tiếp tế vốn và nguyên liệu giúp bạn bè vượt qua lúc kẹt tiền hoặc thiếu nguyên liệu pha chế!
            </p>

            <div style="font-weight:800;font-size:0.85rem;color:#9a3412;margin-bottom:6px;">💰 Bao Lì Xì Tiền Vốn (Trừ từ két):</div>
            <div class="bb-gift-grid" style="margin-bottom:12px;">
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

            <div style="font-weight:800;font-size:0.85rem;color:#9a3412;margin-bottom:6px;">🧋 Rương Nguyên Liệu Pha Chế:</div>
            <div class="bb-gift-grid">
              <button type="button" class="bb-gift-card" data-gift="cups" data-val="50" data-lab="Rương 50 Ly Đựng Trà">
                <span class="bb-gift-icon">🥤</span>
                <span class="bb-gift-name">Gói 50 Ly đựng</span>
                <span class="bb-gift-val">Không lo hết ly</span>
              </button>
              <button type="button" class="bb-gift-card" data-gift="flavor" data-val="dao" data-lab="1 Chai Siro Đào Đặc Biệt">
                <span class="bb-gift-icon">🍑</span>
                <span class="bb-gift-name">1 Chai Siro Đào</span>
                <span class="bb-gift-val">15 ly đậm vị</span>
              </button>
              <button type="button" class="bb-gift-card" data-gift="pearl" data-val="50" data-lab="50 Phần Trân Châu Hoàng Kim" style="grid-column:span 2;">
                <span class="bb-gift-icon">✨</span>
                <span class="bb-gift-name">50 Phần Trân Châu Hoàng Kim</span>
                <span class="bb-gift-val">Topping hút khách</span>
              </button>
            </div>
          </div>
        `;
      }

      // TAB 3: GHÉ THĂM QUÁN & CHECK-IN
      else if (this.subTab === 'visit') {
        contentHTML = `
          <div style="background:#fff;border-radius:14px;border:1.5px solid #fed7aa;padding:14px;">
            <div style="font-size:1rem;font-weight:900;color:#c2410c;">🏠 Ghé Thăm Quán & Check-in 5 Sao</div>
            <p style="font-size:0.82rem;color:#475569;margin:6px 0 12px;line-height:1.4;">
              Chia sẻ thiết kế tem thương hiệu, menu và các món Best Seller của quán với bạn bè. Khi bạn bè ghé thăm check-in, cả hai sẽ nhận đánh giá 5 sao và kích hoạt <b>Buff +15% khách ghé</b>!
            </p>

            <button type="button" class="bb-btn primary" id="bbShareShopBtn" style="width:100%;margin-bottom:12px;">
              📤 Lấy Mã Quán Của Tôi Để Khoe Bạn Bè
            </button>

            <div style="background:#f8fafc;border:1px dashed #94a3b8;border-radius:12px;padding:12px;text-align:center;">
              <div style="font-size:0.85rem;font-weight:800;color:#334155;">Bạn nhận được Mã Quán của bạn bè?</div>
              <p style="font-size:0.78rem;color:#64748b;margin:4px 0 8px;">Dán mã vào đây để đến chiêm ngưỡng quán bạn mình ngay!</p>
              <div style="display:flex;gap:6px;">
                <input id="bbVisitIn" class="bb-redeem-input" placeholder="Dán mã TTN-SHOP-..." />
                <button type="button" class="bb-btn primary" id="bbVisitBtn" style="flex:none;padding:0 14px;">Ghé thăm</button>
              </div>
            </div>

            ${S.friendBuff ? `
              <div style="background:#ecfdf5;border:1.5px solid #6ee7b7;border-radius:12px;padding:10px;margin-top:12px;display:flex;align-items:center;gap:8px;">
                <span style="font-size:1.5rem;">🎉</span>
                <div style="font-size:0.82rem;color:#065f46;">
                  <b>Đang kích hoạt Buff Bạn Hữu!</b><br>
                  Tăng +15% tỉ lệ khách ghé quán trong ca bán hôm nay (Ngày ${S.day}).
                </div>
              </div>
            ` : ''}
          </div>
        `;
      }

      // TAB 4: THÁCH ĐẤU DOANH THU
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
            <button type="button" class="bb-subtab ${this.subTab === 'card' ? 'on' : ''}" data-bbsub="card">👑 Thẻ & Bạn Quen</button>
            <button type="button" class="bb-subtab ${this.subTab === 'gift' ? 'on' : ''}" data-bbsub="gift">🎁 Gói Quà</button>
            <button type="button" class="bb-subtab ${this.subTab === 'visit' ? 'on' : ''}" data-bbsub="visit">🏠 Ghé Quán</button>
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

      // Sao chép mã bạn bè
      const copyFriendBtn = $('bbCopyFriendCodeBtn');
      if (copyFriendBtn) {
        copyFriendBtn.onclick = () => {
          const code = this.genFriendCode();
          copyText(code, '📋 Đã sao chép Mã Bạn Bè rút gọn!');
          ask(`
            <div style="text-align:center;">
              <div style="font-size:3rem;">👑</div>
              <h2 style="color:#d97706;margin:6px 0;">Mã Bạn Bè Rút Gọn</h2>
              <p>Gửi mã này cho bạn bè để xuất hiện làm khách VIP trong quán của họ:</p>
              <div style="background:#fef3c7;border:2px dashed #f59e0b;border-radius:12px;padding:10px;font-family:monospace;font-size:0.95rem;font-weight:900;word-break:break-all;color:#92400e;user-select:all;margin:10px 0;">
                ${esc(code)}
              </div>
              <small style="color:#64748b;">(Đã tự động sao chép vào bộ nhớ tạm!)</small>
            </div>
          `, [['Đóng', () => {}], ['📋 Sao chép lại', () => copyText(code, '📋 Đã sao chép lại!')]]);
        };
      }

      // Sửa thẻ
      const editCardBtn = $('bbEditCardBtn');
      const editAvatarBtn = $('bbEditAvatarBtn');
      if (editCardBtn) editCardBtn.onclick = () => this.editMyCard();
      if (editAvatarBtn) editAvatarBtn.onclick = () => this.editMyCard();

      // Nút nhập mã vạn năng
      const redeemBtn = $('bbRedeemBtn');
      if (redeemBtn) {
        redeemBtn.onclick = () => {
          const inp = $('bbRedeemIn');
          if (inp) this.redeem(inp.value);
        };
      }

      // Thêm bạn thân mẫu
      const addSampleBtn = $('bbAddSampleBtn');
      if (addSampleBtn) {
        addSampleBtn.onclick = () => this.addSampleFriends();
      }

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

      // Chọn đóng gói quà
      document.querySelectorAll('[data-gift]').forEach(card => {
        card.onclick = () => {
          const gType = card.dataset.gift;
          const gVal = card.dataset.val;
          const gLab = card.dataset.lab;

          // Kiểm tra điều kiện tiền/kho
          if (gType === 'money') {
            const cost = +gVal;
            if (S.money < cost) {
              toast(`Két không đủ ${fmt(cost)} để đóng gói bao lì xì này!`);
              return;
            }
            ask(`<h2>Đóng gói ${gLab}?</h2><p>Số tiền <b>${fmt(cost)}</b> sẽ được đóng vào bao lì xì để gửi cho bạn bè.</p>`, [
              ['Huỷ', () => {}],
              ['Đóng gói & Tạo mã', () => {
                S.money -= cost;
                save();
                head();
                const code = BanBe.genGiftCode(gType, cost, gLab);
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
          } else {
            ask(`<h2>Đóng gói ${gLab}?</h2><p>Rương nguyên liệu sẽ được tạo mã gửi cho bạn bè tiếp tế.</p>`, [
              ['Huỷ', () => {}],
              ['Đóng gói & Tạo mã', () => {
                const code = BanBe.genGiftCode(gType, isNaN(+gVal) ? gVal : +gVal, gLab);
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
          }
        };
      });

      // Lấy mã quán
      const shareShopBtn = $('bbShareShopBtn');
      if (shareShopBtn) {
        shareShopBtn.onclick = () => {
          const code = this.genShopCode();
          copyText(code, '🏠 Đã chép Mã Quán rút gọn của bạn!');
          ask(`
            <div style="text-align:center;">
              <div style="font-size:3rem;">🏠</div>
              <h2 style="color:#ea580c;margin:6px 0;">Mã Quán Trà Của Bạn</h2>
              <p>Gửi mã rút gọn này để bạn bè ghé thăm check-in ủng hộ quán:</p>
              <div style="background:#ffedd5;border:2px dashed #f97316;border-radius:12px;padding:10px;font-family:monospace;font-size:0.95rem;font-weight:900;word-break:break-all;color:#c2410c;user-select:all;margin:10px 0;">
                ${esc(code)}
              </div>
              <small style="color:#64748b;">(Đã tự động sao chép vào bộ nhớ tạm!)</small>
            </div>
          `, [['Đóng', () => {}], ['📋 Sao chép lại', () => copyText(code, '📋 Đã sao chép lại!')]]);
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
    }
  };

  window.BanBe = BanBe;
})();
