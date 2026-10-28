# -*- coding: utf-8 -*-
"""Kiểm thử nhanh AI service. Chạy: python test_ai.py"""
from ai_service import AIService
ai = AIService()
T = []
def check(name, cond):
    T.append(cond); print(("PASS " if cond else "FAIL ") + name)

check("search: tráng phim màu -> phòng 3 đứng đầu", ai.search("tráng phim màu cho người mới")[0][0] == 3)
check("search: gõ không dấu cho cùng kết quả", ai.search("trang phim mau cho nguoi moi")[0][0] == 3)
check("search: truy vấn rỗng không lỗi, trả đủ k", len(ai.search("", 5)) == 5)
r = ai.recommend("in ảnh đen trắng", budget=120000)
check("recommend: không vượt ngân sách", all(x["price"] <= 120000 for x in r) and len(r) > 0)
r = ai.recommend("chụp ảnh nhóm", people=10)
check("recommend: đủ sức chứa", len(r) > 0 and all(next(s for s in ai.spaces if s["id"] == x["id"])["cap"] >= 10 for x in r))
check("recommend: lọc theo loại phòng", all(next(s for s in ai.spaces if s["id"] == x["id"])["type"] == "Studio" for x in ai.recommend("chân dung", space_type="Studio")))
check("recommend: điều kiện bất khả thi trả danh sách rỗng", ai.recommend("in ảnh", budget=1000) == [])
check("chat: câu trong miền có nguồn", ai.chat("phim màu tráng ở nhiệt độ bao nhiêu")["source"] is not None)
check("chat: câu ngoài miền bị từ chối", ai.chat("giá bitcoin hôm nay")["source"] is None)
check("chat: tin nhắn rỗng bị từ chối", ai.chat("")["source"] is None)
check("assistant: 'Phòng tối giá tốt' gợi ý phòng, không trả lời kiến thức", ai.assistant("Phòng tối giá tốt")["kind"] == "space")
check("assistant: 'Không gian Hà Nội' gợi ý Noir Film Lab", ai.assistant("Không gian Hà Nội").get("space_id") == 23)
check("assistant: câu hỏi kỹ thuật trả lời từ kho kiến thức", ai.assistant("tráng phim màu ở nhiệt độ bao nhiêu")["kind"] == "knowledge")
check("assistant: câu lạc đề trả về unknown", ai.assistant("giá bitcoin hôm nay")["kind"] == "unknown")
check("recommend: lọc theo thành phố", all(next(s for s in ai.spaces if s["id"] == x["id"])["city"] == "Hà Nội" for x in ai.recommend("phòng tối", city="Hà Nội")))
print(f"\n{sum(T)}/{len(T)} test đạt")
