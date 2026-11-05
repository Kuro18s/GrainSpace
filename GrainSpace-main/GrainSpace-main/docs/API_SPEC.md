# API specification bản đầu (Thành viên 1, 2, 3)

Base URL dev: `http://localhost:8000`. Tài liệu tương tác tự sinh: `/docs`.
Xác thực: header `Authorization: Bearer <access_token>`. Thời gian dùng ISO 8601, không múi giờ (giờ địa phương).
Lỗi trả dạng `{"detail": "..."}`.

## Auth
| Method | Path | Vai trò | Body | Kết quả |
|---|---|---|---|---|
| POST | /auth/register | công khai | `email, password(>=6), full_name, role(photographer\|provider), business_name?` | 201 user; 409 email trùng |
| POST | /auth/login | công khai | `email, password` | `{access_token, token_type, role}`; 401 sai thông tin |
| GET | /auth/me | đăng nhập | | user hiện tại |

## Creative space
| Method | Path | Vai trò | Ghi chú |
|---|---|---|---|
| GET | /spaces | công khai | Query: `type, district, max_price, q`. `q` dùng AI search nếu bật, ngược lại tìm từ khóa |
| GET | /spaces/{id} | công khai | Kèm danh sách `equipment` |
| GET | /spaces/mine | provider, admin | Phòng của tôi (admin: tất cả) |
| POST | /spaces | provider | Body: `name, type("Phòng tối"\|"Phòng chụp"), district, area, capacity, price_per_hour, style, description, open_time, close_time` |
| PUT | /spaces/{id} | chủ phòng, admin | Cùng body; 403 nếu không phải chủ |
| DELETE | /spaces/{id} | chủ phòng, admin | 204, xóa mềm |

## Equipment
| Method | Path | Vai trò | Body |
|---|---|---|---|
| GET | /spaces/{id}/equipment | công khai | |
| POST | /spaces/{id}/equipment | chủ phòng, admin | `name, status(available\|maintenance)` |
| PUT | /equipment/{id} | chủ phòng, admin | `name, status` |
| DELETE | /equipment/{id} | chủ phòng, admin | 204 |

## Booking
| Method | Path | Vai trò | Ghi chú |
|---|---|---|---|
| POST | /bookings | photographer | Body: `space_id, start_time, end_time, note`. 409 trùng giờ; 422 sai giờ/ngoài giờ mở cửa/quá khứ |
| GET | /bookings/mine | photographer | Mới nhất trước |
| GET | /bookings/provider | provider, admin | Lịch của các phòng của tôi (admin: tất cả) |
| PATCH | /bookings/{id}/status | xem dưới | Body: `{"status": "confirmed\|rejected\|cancelled"}` |

Quyền đổi trạng thái: Provider/Admin dùng `confirmed` hoặc `rejected`; Photographer chỉ dùng `cancelled` cho lịch của mình; lịch đã `rejected/cancelled` thì 409.

## Admin
| GET | /admin/users | admin | Danh sách người dùng |

## Tài khoản mẫu (sau `python seed.py`, mật khẩu `123456`)
`admin@phongtoi.vn`, `provider1@phongtoi.vn`, `provider2@phongtoi.vn`, `minhanh@phongtoi.vn`, `hoang@phongtoi.vn`.
