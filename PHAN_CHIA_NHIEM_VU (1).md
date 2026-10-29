# Phân chia nhiệm vụ nhóm – FilmLab

**Đề tài:** Nền tảng kết nối cộng đồng nhiếp ảnh phim với các dịch vụ phòng tối và phòng chụp

## 1. Bảng phân công

| TV | Họ tên | Nhiệm vụ |
|----|--------|----------|
| 1 | Hoàng Giang | Phân tích yêu cầu hệ thống, thiết kế kiến trúc phần mềm, thiết kế cơ sở dữ liệu, phát triển backend API |
| 2 | Trí Đại | Phát triển ứng dụng di động Flutter: tìm kiếm, đặt chỗ, thanh toán, tương tác cộng đồng, quản lý hồ sơ cá nhân |
| 3 | Tố Trinh | Phát triển cổng web cho nhà cung cấp dịch vụ và quản trị viên: quản lý không gian sáng tạo, quản lý thiết bị, lịch đặt chỗ, bảng điều khiển kinh doanh, báo cáo |
| 4 | Thanh Thảo | Nghiên cứu và triển khai module AI: hệ gợi ý, tối ưu phân bổ tài nguyên, dự báo nhu cầu đặt chỗ, phục chế ảnh, tìm kiếm ngữ nghĩa, tích hợp trợ lý AI |
| 5 | Xuân Thành | Tích hợp hệ thống, kiểm thử phần mềm, triển khai, tài liệu kỹ thuật, hướng dẫn sử dụng, báo cáo Capstone cuối kỳ |

## 2. Ánh xạ vào mã nguồn hiện tại

Prototype hiện tại dùng React + Vite + Tailwind, mã chính nằm trong `src/App.tsx`. Dữ liệu là dữ liệu mẫu lưu bằng `localStorage`, chưa có backend.

| TV | Thành phần liên quan trong `src/App.tsx` | Việc cần làm thêm |
|----|------------------------------------------|-------------------|
| 1 | Các `type` mô hình dữ liệu (`AuthUser`, `ManagedSpace`, `EquipmentItem`, `BookingItem`, `CommunityPost`, `CustomerReview`, `ProfileData`); tài khoản demo | Thiết kế ERD; REST API; xác thực JWT và phân quyền; thay `localStorage` bằng API |
| 2 | `App()` (tìm kiếm, lọc, thẻ không gian, lưu yêu thích, modal đặt lịch), `CustomerReviews`, `CommunityHub`, `ProfileManager` | Viết lại giao diện bằng Flutter (prototype dùng làm bản thiết kế tham chiếu); bổ sung luồng thanh toán |
| 3 | `AdminDashboard` (Tổng quan, Không gian, Thiết bị, Lịch đặt chỗ, Báo cáo), `AdminBookings`, `LoginScreen` | Biểu đồ doanh thu thật; xuất báo cáo PDF/Excel; chống trùng lịch; kết nối API |
| 4 | `RestorationStudio`, `Chatbot`, mục gợi ý "Phù hợp với gu" | Hệ gợi ý thật; tối ưu phân bổ tài nguyên; dự báo nhu cầu; phục chế ảnh bằng model; tìm kiếm ngữ nghĩa; tích hợp LLM |
| 5 | `package.json`, `vite.config.ts`, cấu hình triển khai | Kiểm thử tích hợp; CI/CD; deploy; tài liệu; báo cáo Capstone |

## 3. Quy ước làm việc

- **Cấu trúc thư mục** (tách `App.tsx` để tránh xung đột khi nhiều người cùng sửa):
  ```
  src/
    admin/      # TV3
    customer/   # prototype tham chiếu cho TV2
    ai/         # TV4
    shared/     # dùng chung
  backend/      # TV1
  mobile/       # TV2 (Flutter)
  docs/         # TV5
  ```
- **Nhánh git:** `feature/<tên-tv>-<chức-năng>`; TV5 chịu trách nhiệm merge vào `main` qua Pull Request.
- **Hợp đồng API:** TV1 duy trì tài liệu OpenAPI/Swagger tại `docs/openapi.yaml`. Các nhóm endpoint chính: `/auth`, `/spaces`, `/equipment`, `/bookings`, `/payments`, `/posts`, `/reviews`, `/ai/recommend`, `/ai/forecast`, `/ai/restore`.
- **Vai trò người dùng:** khách hàng, nhà cung cấp dịch vụ, quản trị viên hệ thống.

## 4. Phụ thuộc giữa các thành viên

- TV2, TV3, TV4 phụ thuộc vào API của TV1.
- Dashboard và gợi ý phân bổ tài nguyên của TV3 dùng dữ liệu dự báo từ TV4; hai bên thống nhất định dạng dữ liệu trả về.
- TV5 tích hợp và kiểm thử sau khi các module của TV1–TV4 có bản chạy được.
