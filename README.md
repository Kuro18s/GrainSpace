# FILM SPACE

Nền tảng kết nối cộng đồng nhiếp ảnh phim với dịch vụ phòng tối và phòng chụp.

## Công nghệ

- Next.js / React / TypeScript
- Payload CMS
- Tailwind CSS
- pnpm

## Chạy dự án

Yêu cầu phiên bản Node.js và pnpm theo trường `engines` trong `package.json`.

```bash
pnpm install
```

Sao chép `.env.example` thành `.env.local`, sau đó điền các biến môi trường hợp lệ:

```bash
cp .env.example .env.local
```

Chạy môi trường phát triển:

```bash
pnpm dev
```

Mở http://localhost:3000.

## Biến môi trường

Xem `.env.example`. Không commit `.env.local`, mật khẩu, API key hoặc OAuth secret lên GitHub.

## Lưu ý về hình ảnh

Bảy ảnh PNG gốc trong bản nguồn không còn dữ liệu Git LFS trên máy chủ. Để dự án có thể được lưu trữ và tải lên GitHub bình thường, các file ảnh bị thiếu đã được thay bằng ảnh placeholder trung tính, giữ nguyên tên và đường dẫn. Đây không phải ảnh gốc; có thể thay bằng ảnh thật sau này.

Git LFS đã được loại khỏi cấu hình `.gitattributes`. Các ảnh PNG hiện là file thông thường trong Git.

## Đưa lên GitHub bằng GitHub Desktop

1. Clone repository vào một thư mục trống.
2. Giải nén ZIP này và chép **toàn bộ nội dung bên trong** vào thư mục repository đã clone.
3. Chọn ghi đè file khi Windows hỏi. Đảm bảo file `.gitattributes` rỗng này ghi đè file cũ.
4. Trong GitHub Desktop, kiểm tra Changes; xác nhận không có `.env.local` hoặc thông tin bí mật.
5. Commit changes rồi Push origin.

Nếu trước đó bạn đã tạo commit lỗi LFS trong chính repository local, hãy dùng hướng dẫn khôi phục đi kèm trong `GITHUB_UPLOAD_FIX.txt` trước khi Push.
