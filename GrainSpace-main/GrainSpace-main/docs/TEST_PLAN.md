# Test plan (Thành viên 5)

## 1. Phạm vi kiểm thử MVP
Authentication, phân quyền (RBAC), tìm kiếm, đặt lịch, quản lý phòng/studio và thiết bị, tích hợp AI search. Ngoài phạm vi: thanh toán, đánh giá, hiệu năng tải lớn, bảo mật chuyên sâu.

## 2. Các tầng kiểm thử
| Tầng | Công cụ | Ai viết | Cách chạy | Kết quả lần chạy gần nhất |
|---|---|---|---|---|
| Unit/API backend | pytest + TestClient | TV1 | `cd backend && pytest -q` | **17/17 đạt** |
| AI service | script kiểm thử | TV4 | `cd ai_service && python test_ai.py` | **10/10 đạt** |
| Tích hợp HTTP (backend + AI) | `devops/e2e_smoke.py` | TV5 | xem HUONG_DAN_CHAY.md | **13/13 đạt** |
| Web build + kiểm tra kiểu | `npm run build` | TV3 | `cd web && npm run build` | **Build thành công** |
| Mobile unit | `flutter test` | TV2 | `cd mobile && flutter test` | **Chưa chạy** (chưa có Flutter SDK khi tạo) |
| Thủ công trên UI | Checklist | TV5 + cả nhóm | `TEST_CHECKLIST.md` | Chưa thực hiện |

## 3. Môi trường
Dev: SQLite, backend :8000, AI :8001, web :5173. Dữ liệu mẫu: `python seed.py`. CI: GitHub Actions (`.github/workflows/ci.yml`) chạy backend, AI, web, mobile, tích hợp mỗi lần push/PR.

## 4. Tiêu chí vào/ra
- **Vào:** code build được, seed data chạy được, API contract không đổi trong lúc kiểm thử.
- **Ra (đạt MVP):** 100% test tự động đạt; không còn bug mức Critical/High; checklist luồng chính (mục 1–4 trong `TEST_CHECKLIST.md`) đạt trên bản build ổn định.

## 5. Phân loại bug
| Mức | Ví dụ | Xử lý |
|---|---|---|
| Critical | Không đăng nhập được, mất dữ liệu, sai quyền (photographer sửa được phòng người khác) | Sửa ngay trong ngày |
| High | Đặt lịch trùng giờ vẫn thành công, tính sai tiền | Sửa trong 1–2 ngày |
| Medium | Lỗi hiển thị, thông báo lỗi khó hiểu | Sửa trong tuần |
| Low | Chính tả, căn lề | Gom lại khi rảnh |

## 6. Rủi ro kiểm thử
| Rủi ro | Hướng xử lý |
|---|---|
| Lệch API giữa mobile/web/backend | Đối chiếu `API_SPEC.md`; smoke test chạy trong CI |
| Thiếu dữ liệu demo | Dùng `seed.py` (20 phòng, 5 tài khoản) |
| Mobile chưa được chạy tự động | Bật job `mobile` trong CI, chạy thử trên emulator trước buổi demo |
| Dữ liệu AI là giả lập | Nói rõ khi demo; đánh giá lại khi có dữ liệu thật |

## 7. Definition of Done (đề xuất, mục này trong kế hoạch gốc còn để trống)
1. Code đã merge qua pull request và có ít nhất 1 người review.
2. Test tự động liên quan đạt trong CI.
3. API thay đổi thì đã cập nhật `API_SPEC.md`.
4. Chạy được theo `HUONG_DAN_CHAY.md` trên máy sạch.
5. Không còn bug Critical/High liên quan chức năng đó.
