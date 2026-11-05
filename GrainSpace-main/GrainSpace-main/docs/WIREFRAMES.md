# Wireframe các màn hình chính (Thành viên 5, phối hợp TV2, TV3)

Ghi chú: `[ ]` là nút/ô nhập, `( )` là chip lọc. Màn hình đánh dấu ✔ đã được làm thành giao diện thật; ○ mới chỉ là wireframe.

## Mobile app (Photographer)
```
✔ Đăng nhập             ✔ Khám phá                     ✔ Chi tiết phòng
┌───────────────┐      ┌───────────────────────┐      ┌───────────────────────┐
│  Phòng Tối    │      │ 🔍 Tìm phòng tối...   │      │ ← Phòng tối Hẻm Sáng  │
│ [Email      ] │      │ (Tất cả)(Tối)(Chụp)(≤)│      │ (Phòng tối)(Quận 3)   │
│ [Mật khẩu   ] │      │ ┌───────────────────┐ │      │ 120.000đ / giờ        │
│ [ Đăng nhập ] │      │ │ Hẻm Sáng  120k/giờ│ │      │ Giờ: 08:00 - 22:00    │
│ Đăng ký       │      │ │ Phòng tối · Q3    │ │      │ Mô tả ...             │
└───────────────┘      │ └───────────────────┘ │      │ Thiết bị              │
                       │ ┌───────────────────┐ │      │  ✓ Máy phóng Durst    │
✔ Đặt lịch             │ │ Hạt Bạc   250k/giờ│ │      │  ✓ Khay hóa chất      │
┌───────────────┐      │ └───────────────────┘ │      │ [      Đặt lịch     ] │
│ ← Đặt Hẻm Sáng│      │ Khám phá|Lịch đặt|Hồ sơ│     └───────────────────────┘
│ 📅 12/11/2026 │      └───────────────────────┘
│ ⏰ 09:00      │      ✔ Lịch đặt của tôi
│ ⏰ 11:00      │      ┌───────────────────────┐      ✔ Hồ sơ
│ [Ghi chú    ] │      │ Phòng #1 · Chờ duyệt  │      ┌───────────────┐
│ 2 giờ=240.000đ│      │ 12/11 09:00→11:00 Hủy │      │ (avatar)      │
│ [  Gửi yêu cầu]│     └───────────────────────┘      │ Minh Anh      │
└───────────────┘                                     │ [ Đăng xuất ] │
                                                      └───────────────┘
```

## Web portal (Service Provider)
```
✔ Tổng quan                                 ✔ Phòng / Studio
┌────────┬─────────────────────────────┐    ┌────────┬────────────────────────────────┐
│Phòng Tối│ Tổng quan                  │    │ menu   │ Phòng / Studio    [+ Thêm phòng]│
│Tổng quan│ [Phòng mở][Chờ duyệt]      │    │        │ Tên | Loại | Quận | Giá | Giờ   │
│Phòng    │ [Bảo trì ][Doanh thu]      │    │        │ Hẻm Sáng | Tối | Q3 | 120k | Sửa│
│Thiết bị │                            │    │        │ Hạt Bạc  | Chụp| Q1 | 250k | Ẩn │
│Lịch đặt │                            │    └────────┴────────────────────────────────┘
└────────┴─────────────────────────────┘
✔ Thiết bị                                  ✔ Lịch đặt
│ Chọn phòng: [Hẻm Sáng ▾]                  │ (Tất cả)(Chờ duyệt)(Đã xác nhận)...
│ [Tên thiết bị mới] [Thêm]                 │ #1 | Phòng 1 | 12/11 09:00→11:00 | 240k
│ Máy phóng Durst | Khả dụng | [Bảo trì][Xóa]│    Chờ duyệt  [Duyệt] [Từ chối]
```

## Admin portal (○ chỉ wireframe, chưa có giao diện)
API `GET /admin/users` đã có; giao diện nên làm ở giai đoạn sau.
```
┌────────┬───────────────────────────────────────────────┐
│ menu   │ Quản trị                                      │
│Người dùng│ Email | Họ tên | Vai trò | [Khóa]           │
│Tất cả phòng│ (admin đã xem/sửa mọi phòng qua các màn hình provider)│
│Tất cả lịch │                                            │
└────────┴───────────────────────────────────────────────┘
```
