# Tiệm Trà Nhỏ

Game quản lý tiệm trà chạy trên web/PWA, được đóng gói thành sản phẩm độc lập từ game bundle đã cung cấp. Bản production ưu tiên **chơi được ngay không cần database**, lưu tiến trình trên thiết bị, và có thể bật Cloudflare D1 để dùng mã sao lưu cloud 8 số.

## Có cần cơ sở dữ liệu không?

| Nhu cầu | Cần DB? | Cách hoạt động |
| --- | --- | --- |
| Chơi game trên web | Không | Toàn bộ gameplay chạy phía trình duyệt |
| Lưu tiền, ngày chơi, kho, nâng cấp, review | Không | `localStorage` |
| PWA / chơi lại khi mạng yếu | Không | Service worker cache tài nguyên |
| Mã sao lưu dài / file sao lưu | Không | Game tự tạo từ dữ liệu local |
| Mã sao lưu cloud 8 số | Có | Cloudflare Worker + D1 |
| Đồng bộ nhiều thiết bị / tài khoản / leaderboard sau này | Có | Cần backend/database |

Vì vậy, **database không phải điều kiện để game chạy**. D1 chỉ là lớp online bổ sung.

## Tính năng production

- Gameplay Tiệm Trà Nhỏ đầy đủ từ bundle được cung cấp: pha chế, khách hàng, giá bán, kho, hạn dùng, nâng cấp, nhân viên, đơn online, đánh giá, sự kiện, vay vốn, thương hiệu và thống kê.
- Local save + nhiều bản tự sao lưu.
- Sao lưu bằng mã dài/file hoạt động không cần backend.
- Cloud save 8 số qua `/api/save` và `/api/load` khi bật D1.
- PWA + service worker.
- Responsive/mobile-first và safe-area cho iPhone.
- Minigame **Bầu Cua Tiệm Trà** bằng tiền ảo trong game; không nạp tiền và không đổi thưởng.
- Asset pack SVG local được tạo khi build để không phụ thuộc ảnh/font/audio từ website cũ.
- Âm thanh procedural Web Audio fallback.
- Security headers cơ bản từ Cloudflare Worker.
- GitHub Actions kiểm tra syntax + build + asset integrity.

## Chạy local

Yêu cầu Node.js 20+.

```bash
npm install
npm run check
npm run dev
```

## Deploy nhanh — không cần DB

```bash
npm install
npm run deploy
```

Core game và local save hoạt động ngay. Khi D1 chưa bật, người chơi vẫn dùng local save, mã dài và file sao lưu bình thường.

## Bật D1 cho mã sao lưu cloud 8 số

```bash
npx wrangler d1 create tiem-tra-nho
cp wrangler.d1.example.toml wrangler.d1.toml
```

Điền `database_id` do Cloudflare trả về vào `wrangler.d1.toml`, sau đó:

```bash
npm run db:remote
npm run deploy:d1
```

API:

```text
GET  /api/health
POST /api/save
GET  /api/load?code=12345678
```

## Cấu trúc

```text
.github/workflows/ci.yml
migrations/0001_cloud_saves.sql
public/
  baucua.css
  baucua.js
  bootstrap.js
  manifest.webmanifest
  sw.js
scripts/
  build.mjs
  check-build.mjs
  generate-assets.mjs
src/
  worker.js
  game.br.b64.001 ...
  index.br.b64
package.json
wrangler.toml
wrangler.d1.example.toml
```

`src/game.br.b64.*` là bản Brotli + Base64 của game logic đã được cung cấp. Build ghép, giải nén, kiểm tra SHA-256 và xuất thành `dist/game.js`. `src/index.br.b64` làm tương tự cho shell HTML.

## Asset pack

Các file upload ban đầu không chứa toàn bộ ảnh/icon/audio được game tham chiếu. Để tránh 404 và không sao chép tài nguyên từ website bên ngoài, build tạo một bộ SVG local mới gồm icon giao diện, 50 icon thương hiệu, sprite khách/ngôi sao/tài xế, background, ly, nắp, kho và sticker.

## Kiểm tra

```bash
npm run check
```

Lệnh này kiểm tra syntax, checksum, build game, asset integrity và các file PWA chính. GitHub Actions chạy lại trên `main` và pull request.

## Brand & Support

**Publisher / operator:** Aunomay LLC  
**Website:** https://aunomay.com  
**Support:** support@aunomay.com

Repo hiện không kèm giấy phép nguồn mở.