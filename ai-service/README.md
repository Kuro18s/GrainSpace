# FilmLab AI – phần AI của nền tảng

Phần AI cho nền tảng kết nối cộng đồng nhiếp ảnh phim với phòng tối và studio (task 4 của đề tài).

## Chức năng
- **Tìm không gian** theo mô tả tiếng Việt (gõ không dấu vẫn được).
- **Gợi ý không gian** theo nhu cầu, ngân sách, số người, khu vực, thành phố, kèm lý do.
- **Trợ lý FilmLab AI:** tự chọn gợi ý không gian hoặc trả lời câu hỏi nhiếp ảnh phim; từ chối câu hỏi ngoài phạm vi.
- **Phục chế ảnh quét cũ:** bỏ vết xước và bụi, giảm nhiễu, lấy lại độ tương phản và màu.

## Các file
| File | Vai trò |
|---|---|
| `data.py` | Dữ liệu mẫu: 23 không gian (3 không gian lấy từ app FilmLab) và 29 hỏi đáp |
| `ai_service.py` | Tìm, gợi ý, trợ lý |
| `restoration.py` | Phục chế ảnh bằng OpenCV |
| `api.py` | REST API: `/ai/search`, `/ai/recommend`, `/ai/chat`, `/ai/assistant`, `/ai/restore` |
| `evaluate.py`, `test_ai.py` | Đánh giá chất lượng và kiểm thử tự động |
| `demo_ai.html` | Trang demo (tải về rồi mở bằng trình duyệt) |

## Cách chạy
```
pip install -r requirements.txt
python ai_service.py       # chạy thử
python test_ai.py          # kiểm thử
python evaluate.py         # bảng điểm
uvicorn api:app --port 8001
```

## Kết quả đánh giá (trên dữ liệu mẫu)
- Tìm không gian (25 truy vấn): Recall@3 = 0,95; MRR = 0,98 (tìm theo từ khóa: 0,92 và 0,97).
- Trợ lý, câu hỏi kiến thức (29 câu): top-1 = 0,93; từ chối đúng 8/8 câu ngoài phạm vi.
- Kiểm thử tự động: 15/15 đạt.

## Hạn chế
- Dữ liệu là dữ liệu mẫu; app FilmLab hiện chỉ có 3 không gian nên chưa đánh giá được trên quy mô thật.
- Chưa dùng embedding model hay LLM; ngưỡng từ chối chọn trên chính bộ kiểm tra nên có thể quá khớp.
- Phục chế ảnh dùng xử lý ảnh cổ điển, đã thử trên ảnh hư hỏng giả lập, chưa thử trên ảnh quét phim thật; giảm nhiễu làm mờ bớt chi tiết nhỏ.
