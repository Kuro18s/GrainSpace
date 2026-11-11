<div align="center">

# 🎞️ FILM SPACE

**Nền tảng kết nối cộng đồng nhiếp ảnh phim với dịch vụ phòng tối & phòng chụp**

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Payload CMS](https://img.shields.io/badge/Payload_CMS-4_beta-000000)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)

</div>

---

## 📖 Giới thiệu

**FILM SPACE** là cổng web giúp người chụp ảnh phim tìm và đặt **phòng tối, studio, phòng tráng phim**, đồng thời giúp **nhà cung cấp dịch vụ** và **quản trị viên** vận hành không gian, thiết bị, lịch đặt chỗ và thanh toán. Dự án là một phần của đồ án nhóm (phần cổng web cho nhà cung cấp & admin).

## ✨ Tính năng

| Nhóm | Mô tả |
| --- | --- |
| 🔐 Xác thực | Đăng ký / đăng nhập, đăng nhập bằng Google, phiên làm việc bằng cookie |
| 🏠 Không gian | Danh sách phòng tối / studio / phòng tráng, thư viện hình ảnh, giá theo giờ – nửa ngày – ngày – gói |
| 📅 Đặt chỗ | Khung giờ đặt chỗ, trạng thái: chờ xác nhận → đã xác nhận → check-in → hoàn tất / hủy |
| 💳 Thanh toán | Giao dịch, phương thức thanh toán, khuyến mãi (theo % hoặc số tiền), gói dịch vụ |
| 🛠️ Thiết bị | Quản lý máy ảnh, ống kính, thiết bị phòng tối, vật tư; lịch bảo trì |
| 👥 Cộng đồng | Bài viết, phản hồi, đánh giá, bộ sưu tập / portfolio |
| 🧑‍💼 Nhà cung cấp | Đăng ký trở thành nhà cung cấp, workspace quản lý không gian & đặt chỗ |
| 🛡️ Quản trị | Duyệt đơn nhà cung cấp, xử lý tranh chấp, bảng điều khiển vận hành, Payload Admin |

## 🧰 Công nghệ

- **Framework:** Next.js 16 (App Router) + React 19
- **CMS / Backend:** Payload CMS 4 (beta), GraphQL, MCP plugin
- **Xác thực:** Auth.js (next-auth v5) – Google OAuth
- **Giao diện:** Tailwind CSS 4, thiết kế xuất từ Figma Make
- **Ngôn ngữ:** TypeScript · **Trình quản lý gói:** pnpm

## 🚀 Bắt đầu

**Yêu cầu:** Node.js `>= 24.22.1`, pnpm `9 – 11` (phiên bản gợi ý có trong `.mise.toml`).

```bash
# 1. Cài đặt phụ thuộc
pnpm install

# 2. Cấu hình môi trường
cp .env.example .env.local
# → điền các giá trị trong .env.local

# 3. Chạy chế độ phát triển
pnpm dev
```

Mở <http://localhost:3000>. Trang quản trị Payload nằm tại `/admin`.

> ⚠️ Payload của dự án dùng backend do **Figma Make** cấp (`FIGMA_CONTENT_API_*`). Cần các biến này để `/admin` và dữ liệu hoạt động.

### Lệnh thường dùng

| Lệnh | Tác dụng |
| --- | --- |
| `pnpm dev` | Chạy server phát triển |
| `pnpm build` | Build production (`payload build`) |
| `pnpm start` | Chạy bản đã build |
| `pnpm generate:types` | Sinh lại `src/payload-types.ts` |
| `pnpm generate:importmap` | Sinh lại import map của Payload Admin |
| `pnpm format` | Định dạng code (oxfmt) |

## 🔑 Biến môi trường

Xem đầy đủ trong [`.env.example`](./.env.example).

| Biến | Ý nghĩa |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL công khai của site |
| `AUTH_SECRET` | Khóa bí mật của Auth.js |
| `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` | Thông tin Google OAuth |
| `FIGMA_CONTENT_API_URL` / `FIGMA_CONTENT_API_CONTENT_SYSTEM_ID` | Backend Payload từ Figma Make |
| `FIGMA_OAUTH_CLIENT_ID` | OAuth client của Figma Make |

## 🗂️ Cấu trúc thư mục

```text
FILM_SPACE/
├── public/assets/            # Ảnh, biểu tượng tĩnh
├── src/
│   ├── app/
│   │   ├── (frontend)/       # Các trang của người dùng
│   │   │   ├── spaces/         # Danh sách không gian
│   │   │   ├── collection/     # Bộ sưu tập / portfolio
│   │   │   ├── community/      # Cộng đồng
│   │   │   ├── provider/       # Cổng nhà cung cấp
│   │   │   ├── operations/     # Vận hành đặt chỗ
│   │   │   ├── control/        # Bảng điều khiển
│   │   │   ├── login/ signup/  # Đăng nhập, đăng ký
│   │   │   └── api/auth/       # Route xác thực
│   │   └── (payload)/        # Payload Admin & API
│   ├── collections/          # Schema dữ liệu Payload (20 collection)
│   ├── components/           # Component giao diện
│   │   └── figma/            # Trang thiết kế xuất từ Figma
│   ├── lib/                  # Tiện ích: auth, session, cache, thanh toán
│   ├── payload.config.ts     # Cấu hình Payload
│   ├── payload-types.ts      # Type sinh tự động
│   └── proxy.ts              # Chặn truy cập khi chưa đăng nhập
├── .figma/                   # Script của Figma Make (giữ lại trong repo)
├── next.config.ts
└── package.json
```

## 👥 Nhóm thực hiện

| TV | Họ tên | Phụ trách |
| --- | --- | --- |
| 1 | Hoàng Giang | Phân tích yêu cầu, kiến trúc, DB, backend API |
| 2 | Trí Đại | Ứng dụng Flutter cho người dùng |
| 3 | Tố Trinh | **Cổng web nhà cung cấp & quản trị viên (repo này)** |
| 4 | Thanh Thảo | Module AI |
| 5 | Xuân Thành | Tích hợp, kiểm thử, triển khai, tài liệu |

---

<div align="center">Made with 🎞️ for film photographers</div>
