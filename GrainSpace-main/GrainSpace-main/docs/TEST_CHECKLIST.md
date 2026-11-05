# Checklist kiểm thử thủ công (Thành viên 5)
Tick ☑ khi đạt. Ghi lỗi theo `BUG_REPORT_TEMPLATE.md`. Dùng dữ liệu sau `python seed.py` (mật khẩu `123456`).

## 1. Đăng ký / đăng nhập (UC01)
- [ ] Đăng ký photographer mới thành công, đăng nhập được
- [ ] Đăng ký trùng email báo lỗi rõ ràng
- [ ] Mật khẩu < 6 ký tự bị từ chối
- [ ] Sai mật khẩu báo "Sai email hoặc mật khẩu"
- [ ] Không có cách tự đăng ký admin
- [ ] Provider đăng nhập app mobile bị từ chối; photographer đăng nhập web portal bị từ chối
- [ ] Đăng xuất xong không quay lại được trang cũ bằng nút Back

## 2. Tìm kiếm và chi tiết (UC02, UC03)
- [ ] Danh sách hiện đủ 20 phòng khi chưa lọc
- [ ] Lọc "Phòng tối" / "Phòng chụp" đúng
- [ ] Lọc giá ≤ 100.000đ chỉ ra phòng đủ điều kiện
- [ ] Gõ "tráng phim màu" ra phòng 3 đầu tiên (khi bật AI); gõ không dấu cho kết quả tương tự
- [ ] Từ khóa không có kết quả hiện thông báo "Không tìm thấy"
- [ ] Trang chi tiết hiện giá, giờ mở cửa, thiết bị và trạng thái thiết bị

## 3. Đặt lịch (UC04, UC05)
- [ ] Chọn ngày mai 09:00–11:00, tổng tiền = 2 × giá/giờ
- [ ] Giờ kết thúc ≤ giờ bắt đầu bị chặn
- [ ] Ngoài giờ mở cửa báo lỗi
- [ ] Đặt trùng khung giờ báo "đã có người đặt"; đặt liền kề thì được
- [ ] Lịch mới ở trạng thái "Chờ duyệt" và xuất hiện ở tab Lịch đặt
- [ ] Hủy lịch của mình thành công; không hủy được lịch đã bị hủy

## 4. Quản lý của Provider (UC06, UC07, UC08)
- [ ] Thêm phòng mới, thấy trong danh sách "Phòng của tôi"
- [ ] Sửa giá, giờ mở cửa lưu đúng
- [ ] Ẩn phòng: phòng biến khỏi tìm kiếm của photographer nhưng lịch cũ vẫn còn
- [ ] Thêm thiết bị, chuyển "bảo trì", xóa thiết bị
- [ ] Thấy lịch đặt mới ở tab Lịch đặt; Duyệt/Từ chối đổi trạng thái đúng
- [ ] Không thấy phòng và lịch của provider khác

## 5. Phân quyền (kiểm tra qua API `/docs`)
- [ ] Gọi API cần đăng nhập mà không có token trả 401
- [ ] Photographer gọi `POST /spaces` trả 403
- [ ] Provider khác sửa phòng không phải của mình trả 403
- [ ] Photographer thường gọi `/admin/users` trả 403

## 6. Giao diện chung
- [ ] Web chạy tốt trên màn hình hẹp (điện thoại) và chế độ tối
- [ ] Mobile: xoay màn hình, bàn phím không che ô nhập
- [ ] Mất mạng/backend tắt: hiện thông báo lỗi, không treo
- [ ] AI service tắt: tìm kiếm vẫn hoạt động bằng từ khóa
