# Phân tích yêu cầu và phạm vi MVP (Thành viên 1, Tuần 1)

Dự án: nền tảng kết nối cộng đồng nhiếp ảnh phim với các dịch vụ phòng tối và phòng chụp.

## 1. Actor
| Actor | Mô tả | Làm gì trên hệ thống |
|---|---|---|
| Photographer | Người chụp/in ảnh phim | Tìm phòng, xem chi tiết, đặt lịch, quản lý lịch của mình, hỏi chatbot |
| Service Provider | Chủ phòng tối/studio | Quản lý phòng, thiết bị, giá, giờ mở cửa; duyệt hoặc từ chối lịch đặt |
| Expert | Chuyên gia/giảng viên | Đăng bài, workshop (ngoài MVP 3 tuần) |
| Admin | Quản trị | Xem người dùng, quản lý toàn bộ phòng và lịch |
| AI Assistant | Dịch vụ AI | Gợi ý phòng, tìm kiếm ngữ nghĩa, chatbot hỏi đáp (do Thành viên 4 phụ trách) |

## 2. Phạm vi MVP 3 tuần đầu
**Trong phạm vi (ưu tiên cao):** đăng ký/đăng nhập (JWT, phân quyền theo vai trò), quản lý creative space, quản lý thiết bị, tìm kiếm và xem chi tiết, đặt lịch (kiểm tra trùng giờ), duyệt/từ chối/hủy lịch, demo AI gợi ý và chatbot.

**Ngoài phạm vi (giai đoạn sau):** thanh toán online, đánh giá, bài viết/workshop của Expert, demand forecasting, image enhancement, đăng nhập mạng xã hội (OAuth 2.0 bên thứ ba), thông báo đẩy.

## 3. Use case ưu tiên
| Mã | Use case | Actor | Ưu tiên | Trạng thái API |
|---|---|---|---|---|
| UC01 | Đăng ký / đăng nhập | Tất cả | Cao | Xong |
| UC02 | Tìm kiếm phòng/studio (lọc loại, quận, giá, từ khóa) | Photographer | Cao | Xong |
| UC03 | Xem chi tiết phòng và thiết bị | Photographer | Cao | Xong |
| UC04 | Gửi yêu cầu đặt lịch | Photographer | Cao | Xong |
| UC05 | Xem / hủy lịch của tôi | Photographer | Cao | Xong |
| UC06 | Tạo / sửa / ẩn phòng, đặt giá, giờ hoạt động | Provider | Cao | Xong |
| UC07 | Quản lý thiết bị và trạng thái khả dụng | Provider | Cao | Xong |
| UC08 | Duyệt / từ chối lịch đặt | Provider | Cao | Xong |
| UC09 | Xem danh sách người dùng | Admin | Trung bình | Xong |
| UC10 | Gợi ý phòng theo nhu cầu, chatbot | Photographer | Trung bình | Do AI service |

## 4. Quy tắc nghiệp vụ
1. Chỉ Photographer được đặt lịch; không đặt trong quá khứ; mỗi lượt trong một ngày; nằm trong giờ mở cửa của phòng.
2. Không cho đặt trùng khung giờ với lịch đang `pending` hoặc `confirmed` (lịch liền kề thì được).
3. Tổng tiền = số giờ × giá/giờ của phòng.
4. Provider chỉ sửa được phòng/thiết bị/lịch của chính mình; Admin sửa được tất cả.
5. Photographer chỉ hủy được lịch của mình; Provider dùng `rejected` để từ chối.
6. Xóa phòng là xóa mềm (`active=false`) để giữ lịch sử đặt chỗ.
7. Không cho tự đăng ký vai trò admin.
