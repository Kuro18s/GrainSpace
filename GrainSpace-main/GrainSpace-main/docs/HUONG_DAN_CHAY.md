# Hướng dẫn chạy dự án và hướng dẫn sử dụng nhanh (Thành viên 5)

## A. Cấu trúc repo
```
backend/     (TV1)  FastAPI backend          ai_service/ (TV4)  AI service
mobile/      (TV2)  Flutter app              web/        (TV3)  Web portal React
devops/      (TV5)  Docker, smoke test       docs/              Tài liệu
.github/workflows/ci.yml
```
Các thư mục `TV1`…`TV5` trong bộ giao là từng người; copy nội dung bên trong vào cùng một repo theo cấu trúc trên.

## B. Chạy bằng Docker (nhanh nhất)
```
docker compose -f devops/docker-compose.yml up --build
```
Web portal: http://localhost:8080 · Backend: http://localhost:8000/docs · AI: http://localhost:8001/docs

## C. Chạy thủ công (3 terminal)
```
# 1) AI service
cd ai_service && pip install -r requirements.txt && uvicorn api:app --port 8001
# 2) Backend
cd backend && pip install -r requirements.txt && python seed.py
AI_SERVICE_URL=http://localhost:8001 uvicorn main:app --port 8000     # Windows PowerShell: $env:AI_SERVICE_URL="http://localhost:8001"
# 3) Web portal
cd web && npm install && npm run dev                                   # http://localhost:5173
```
Mobile: xem `mobile/README.md` (mặc định chạy dữ liệu giả, không cần backend).
Kiểm tra nhanh toàn hệ thống: `python devops/e2e_smoke.py http://localhost:8000`.

## D. Tài khoản mẫu (mật khẩu `123456`)
| Email | Vai trò |
|---|---|
| minhanh@phongtoi.vn, hoang@phongtoi.vn | Photographer (dùng app mobile) |
| provider1@phongtoi.vn, provider2@phongtoi.vn | Service Provider (dùng web portal) |
| admin@phongtoi.vn | Admin |

## E. Hướng dẫn sử dụng nhanh
**Photographer (mobile):** Đăng nhập → tab Khám phá, gõ nhu cầu (ví dụ "tráng phim màu") hoặc lọc loại/giá → chọn phòng xem giá, giờ, thiết bị → Đặt lịch, chọn ngày giờ → gửi. Theo dõi trạng thái ở tab Lịch đặt, bấm Hủy nếu đổi ý.

**Provider (web):** Đăng nhập → Phòng/Studio: thêm hoặc sửa phòng (giá, giờ mở cửa) → Thiết bị: thêm thiết bị, đổi trạng thái bảo trì → Lịch đặt: bấm Duyệt hoặc Từ chối các yêu cầu đang chờ.

## F. Lỗi thường gặp
| Hiện tượng | Cách xử lý |
|---|---|
| Web báo không kết nối được | Backend chưa chạy hoặc sai `VITE_API_URL` |
| Android emulator không gọi được API | Dùng `http://10.0.2.2:8000`, không dùng `localhost` |
| Search không dùng AI | Chưa đặt `AI_SERVICE_URL` hoặc AI service chưa chạy (hệ thống tự dùng tìm từ khóa) |
| `python seed.py` báo "đã có dữ liệu" | Bình thường; xóa `phongtoi.db` nếu muốn nạp lại |
| Token hết hạn | Đăng nhập lại (mặc định 120 phút) |
