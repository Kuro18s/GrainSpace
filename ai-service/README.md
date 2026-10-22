# AI Service – Phòng Tối

Phần AI của nền tảng kết nối cộng đồng nhiếp ảnh phim với phòng tối và phòng chụp.

## Chức năng
- Tìm phòng theo mô tả tiếng Việt (gõ không dấu vẫn được)
- Gợi ý phòng theo nhu cầu, ngân sách, số người, khu vực
- Chatbot hỏi đáp nhiếp ảnh phim, từ chối câu hỏi ngoài phạm vi

## Cấu trúc
- `data.py`: dữ liệu mẫu (20 phòng, 29 câu hỏi đáp)
- `ai_service.py`: search, recommend, chat
- `api.py`: REST API (/ai/search, /ai/recommend, /ai/chat)
- `evaluate.py`: đánh giá chất lượng
- `test_ai.py`: kiểm thử tự động
- `demo_ai.html`: demo chạy trên trình duyệt

## Cách chạy
pip install scikit-learn numpy fastapi uvicorn
python ai_service.py
python test_ai.py
python evaluate.py

## Kết quả đánh giá
Search Recall@3 = 0,94; chatbot top-1 = 0,93 (trên dữ liệu mẫu).

## Hạn chế
Dữ liệu là dữ liệu mẫu; chưa dùng embedding model thật.
