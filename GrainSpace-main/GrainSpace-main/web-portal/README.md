# Web portal Service Provider / Admin (Thành viên 3)
```
npm install
cp .env.example .env     # chỉnh VITE_API_URL nếu backend không ở localhost:8000
npm run dev              # http://localhost:5173
npm run build            # kiểm tra kiểu + build
```
Đăng nhập thử: `provider1@phongtoi.vn` / `123456` (sau khi chạy `python seed.py` ở backend). Tài khoản photographer bị từ chối ở cổng này.
Màn hình: Tổng quan, Phòng/Studio (thêm/sửa/ẩn), Thiết bị (thêm, đổi trạng thái, xóa), Lịch đặt (duyệt/từ chối).
