# -*- coding: utf-8 -*-
import numpy as np
from ai_service import AIService, Embedder, KeywordBaseline
from data import SPACES

SEARCH_Q = [
 ("chỗ in ảnh đen trắng yên tĩnh",{1,5,7,14}),("muốn tráng phim màu lần đầu",{3}),
 ("studio chụp chân dung giá rẻ cho sinh viên",{13}),("chụp mỹ phẩm handmade",{6}),
 ("quét lại phim âm bản độ phân giải cao",{10,20}),("khôi phục ảnh gia đình cũ bị ố",{20,10}),
 ("lớp học nhóm nhiều người học in ảnh",{9,18}),("chụp thời trang quy mô lớn có phòng thay đồ",{17,4}),
 ("phòng tối không độc hại bảo vệ môi trường",{16}),("in ảnh chuẩn bị triển lãm",{14}),
 ("chụp ảnh đường phố bối cảnh cổ",{15}),("ảnh tương phản mạnh kịch tính phông đen",{19}),
 ("chụp gia đình đông người",{11}),("ánh nắng tự nhiên cửa sổ",{4}),
 ("phong cách thập niên 90 vintage",{8,4}),("thử nghiệm kỹ thuật in sáng tạo",{12}),
 ("phòng tối giá rẻ cho người mới học",{18,9,3}),("tráng phim đen trắng và in phóng có nhân viên hỗ trợ",{5}),
 ("in thủ công giấy baryta cổ điển",{7}),("workshop nhiếp ảnh phim",{9,5}),
 ("phong toi gia re cho nguoi moi hoc",{18,9,3}),("quet phim am ban",{10,20}),
]
CHAT_Q = [
 ("các bước tráng phim trắng đen",0),("phim màu tráng ở nhiệt độ bao nhiêu",1),("đèn đỏ trong phòng tối để làm gì",2),
 ("máy phóng hoạt động ra sao",3),("test strip là gì",4),("ISO cao thì hạt phim thế nào",5),
 ("người mới nên mua phim đen trắng gì",6),("phim slide với phim negative khác gì",7),("quét phim bao nhiêu dpi",8),
 ("cất phim chưa dùng ở đâu",9),("chụp xong bao lâu thì nên đem đi tráng",10),("hóa chất tráng phim có nguy hiểm không",11),
 ("pha developer thế nào",12),("stop bath để làm gì",13),("fixer ngâm mấy phút",14),
 ("giấy RC khác giấy fiber chỗ nào",15),("dodge burn là gì",16),("máy film cơ nào dễ dùng",17),
 ("cách đo sáng với phim",18),("push film nghĩa là gì",19),("ảnh phim dính bụi phải làm sao",20),
 ("phục chế ảnh cũ thế nào",21),("đi phòng tối cần mang theo gì",22),("lần đầu thuê phòng tối bao nhiêu tiếng",23),
 ("in ảnh tốn những chi phí nào",24),("studio chụp phim cần đèn gì",25),("chụp chân dung phim cần chú ý gì",26),
 ("muốn dời lịch đặt phòng",27),("đăng ký lớp workshop ở đâu",28),
]
OOD_Q = ["giá bitcoin hôm nay","cách nấu phở bò","lịch thi đấu bóng đá","dự báo thời tiết ngày mai",
         "cách cài đặt windows","mua vé máy bay đi Hà Nội","học tiếng Anh thế nào","sửa xe máy ở đâu"]

def metrics(model, k=3):
    rec, rr = [], []
    for q, rel in SEARCH_Q:
        sc = model.sim(q); order = [SPACES[i]["id"] for i in np.argsort(-sc)]
        rec.append(len(set(order[:k]) & rel) / min(len(rel), k))
        rr.append(next((1/(r+1) for r, x in enumerate(order) if x in rel), 0))
    return float(np.mean(rec)), float(np.mean(rr))

def chat_top1(model):
    return float(np.mean([int(np.argmax(model.sim(q))) == t for q, t in CHAT_Q]))

if __name__ == "__main__":
    ai = AIService()
    kw = KeywordBaseline([__import__("ai_service").space_text(s) for s in SPACES])
    print("== Search phòng (22 truy vấn) ==")
    for name, m in [("Keyword baseline", kw), ("TF-IDF char n-gram + bỏ dấu", ai.sp)]:
        r, mrr = metrics(m); print(f"{name:32s} Recall@3={r:.2f}  MRR={mrr:.2f}")
    from data import KB
    kwkb = KeywordBaseline([q+" "+a for q,a in KB])
    print("== Chatbot KB (29 câu hỏi) top-1 accuracy ==")
    print(f"Keyword baseline                 {chat_top1(kwkb):.2f}")
    print(f"TF-IDF char n-gram + bỏ dấu      {chat_top1(ai.kb):.2f}")
    print("== Ngưỡng 'không biết' ==")
    ins = [ai.kb.sim(q).max() for q,_ in CHAT_Q]; ood = [ai.kb.sim(q).max() for q in OOD_Q]
    print(f"điểm top-1 trong miền: min={min(ins):.2f} tb={np.mean(ins):.2f} | ngoài miền: max={max(ood):.2f} tb={np.mean(ood):.2f}")
    for t in [0.25,0.30,0.35,0.40,0.45,0.50]:
        ans = np.mean([s>=t for s in ins]); rej = np.mean([s<t for s in ood])
        print(f"ngưỡng {t:.2f}: trả lời đúng miền {ans:.0%} | từ chối ngoài miền {rej:.0%}")
