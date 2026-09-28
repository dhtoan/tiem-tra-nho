# Tiệm Trà Nhỏ

Web/PWA game quản lý tiệm trà, runtime gameplay **12.47.11**, tích hợp Bầu Cua, Xì Dách, tài khoản và Cloudflare D1 auto-sync.

Production host: **https://tiemtranho.aunomay.com**

## Trạng thái hiện tại

- Runtime Tiệm Trà 12.47.11.
- CSS/JS và bộ ảnh runtime local trong repo.
- Bầu Cua + Xì Dách.
- Local save key: `tsShop2`.
- PWA + service worker offline cache.
- Đăng ký / đăng nhập / đăng xuất.
- Session cookie HttpOnly, SameSite=Lax.
- D1 account cloud save với `revision` chống ghi đè giữa nhiều thiết bị.
- Nhắc người chơi đăng nhập để bật tự động đồng bộ; không đăng nhập vẫn chơi và lưu local bình thường.
- Backup cloud mã 8 số vẫn được giữ để tương thích.
- CI chạy build + D1 local migrations + Worker smoke test thật.

## API

```text
GET  /api/health

POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me

GET  /api/account/save
PUT  /api/account/save
POST /api/account/save

POST /api/save
GET  /api/load?code=12345678
```

## D1 schema

Migrations:

```text
migrations/0001_cloud_saves.sql
migrations/0002_auth_cloud_sync.sql
```

Các bảng chính:

```text
cloud_saves
rate_limits
accounts
sessions
account_cloud_saves
```

## Chạy local + D1

```bash
npm install
npm run check

npx wrangler d1 migrations apply DB --local --config wrangler.ci.toml
npx wrangler dev --local --config wrangler.ci.toml
```

Sau đó mở Worker local và kiểm tra:

```text
/api/health
```

## Kiểm thử

```bash
npm run check
npm run test:smoke
```

GitHub Actions CI kiểm tra:

1. Syntax của Worker/game/minigames/account sync.
2. Build runtime 12.47.11.
3. Asset Bầu Cua/Xì Dách/PWA.
4. Tạo D1 local.
5. Chạy toàn bộ migrations.
6. Khởi động Worker.
7. Đăng ký tài khoản test.
8. Kiểm tra session.
9. Lưu và tải cloud save.
10. Kiểm tra stale revision trả về HTTP 409.
11. Kiểm tra backup mã 8 số.
12. Logout và xác minh session hết hiệu lực.

## Deploy Production — khuyến nghị

Repo có workflow:

```text
.github/workflows/deploy-production.yml
```

Workflow này tự động:

1. Build và chạy kiểm tra.
2. Tìm D1 tên `tiem-tra-nho`.
3. Nếu chưa tồn tại, tự tạo D1 tại khu vực APAC.
4. Lấy `database_id`.
5. Sinh `wrangler.production.toml` trong runner.
6. Bind database thành `env.DB`.
7. Chạy remote migrations.
8. Deploy Worker.
9. Gắn custom domain `tiemtranho.aunomay.com`.
10. Kiểm tra `/api/health` và xác nhận `database:true`.

Cloudflare hỗ trợ tạo D1 bằng Wrangler và Custom Domain bằng `custom_domain = true`; workflow dùng chính cơ chế đó.

### GitHub Secrets cần thiết

Trong repo vào:

```text
Settings
→ Secrets and variables
→ Actions
→ New repository secret
```

Tạo hai secret:

```text
CLOUDFLARE_API_TOKEN
CLOUDFLARE_ACCOUNT_ID
```

Token Cloudflare cần quyền phù hợp để:

- deploy Workers;
- tạo/đọc D1;
- chạy D1 migrations;
- quản lý custom domain của Worker.

Không commit token vào source.

Sau khi secrets đã có:

```text
GitHub
→ Actions
→ Deploy Production
→ Run workflow
```

Không cần tự tạo D1 trước; workflow sẽ tìm hoặc tạo và kết nối tự động.

## Production variable

Wrangler đã đồng bộ cấu hình:

```toml
[vars]
ALLOWED_HOSTS = "tiemtranho.aunomay.com"
```

Worker vẫn cho phép `localhost` / `127.0.0.1` khi phát triển local.

## Cấu trúc runtime

```text
css/
  style.css
  baucua.css
  xidach.css

js/
  game.js
  baucua.js
  xidach.js

img/
  ...

public/
  account-sync.css
  account-sync.js
  bootstrap.js
  manifest.webmanifest
  sw.js

reference/
  trongnhi/
  tiemtramouoc/

migrations/
  0001_cloud_saves.sql
  0002_auth_cloud_sync.sql

src/
  worker.js

scripts/
  build.mjs
  check-build.mjs
  smoke.mjs
```

## Gameplay data

Người chơi chưa đăng nhập:

```text
Browser → localStorage(tsShop2)
```

Người chơi đã đăng nhập:

```text
Game
  → localStorage(tsShop2)
  → account-sync.js
  → /api/account/save
  → Cloudflare Worker
  → D1 account_cloud_saves
```

Nếu cloud và thiết bị cùng thay đổi, backend dùng `revision` và trả HTTP `409` thay vì âm thầm ghi đè.

## PWA

Service worker hiện cache runtime mới:

- `/css/style.css`
- `/css/baucua.css`
- `/css/xidach.css`
- `/js/game.js`
- `/js/baucua.js`
- `/js/xidach.js`
- `/account-sync.js`
- `/account-sync.css`
- các ảnh gameplay chính.

Cache version hiện tại:

```text
tiem-tra-nho-v124711-sync1
```

## Brand & Support

**Publisher / operator:** Aunomay LLC  
**Website:** https://aunomay.com  
**Support:** support@aunomay.com
