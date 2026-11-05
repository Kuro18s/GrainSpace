# -*- coding: utf-8 -*-
"""AI service prototype: recommendation (content-based), semantic-ish search, KB chatbot.
Chạy bằng TF-IDF ký tự (char n-gram) + bỏ dấu tiếng Việt. Có chỗ cắm embedding model thật."""
import re, unicodedata
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from data import SPACES, KB

def fold(s):
    """Chữ thường + bỏ dấu tiếng Việt để người dùng gõ không dấu vẫn tìm được."""
    s = s.lower().replace("đ", "d")
    s = unicodedata.normalize("NFD", s)
    s = "".join(c for c in s if unicodedata.category(c) != "Mn")
    return re.sub(r"[^a-z0-9 ]+", " ", s)

def space_text(s):
    return " ".join([s["name"], s["type"], s["district"], s["city"], s["style"], " ".join(s["equipment"]), s["desc"]])

class Embedder:
    """Mặc định: TF-IDF char n-gram. Muốn dùng embedding thật, kế thừa class này
    (ví dụ sentence-transformers 'intfloat/multilingual-e5-small') và trả về ma trận đã chuẩn hóa."""
    def __init__(self, corpus):
        self.v = TfidfVectorizer(analyzer="char_wb", ngram_range=(2, 4), sublinear_tf=True)
        self.M = self.v.fit_transform([fold(t) for t in corpus])
    def sim(self, q):
        return (self.M @ self.v.transform([fold(q)]).T).toarray().ravel()

class KeywordBaseline:
    """Baseline: đếm từ trùng khớp chính xác (có bỏ dấu), không có n-gram."""
    def __init__(self, corpus):
        self.docs = [set(fold(t).split()) for t in corpus]
    def sim(self, q):
        qs = set(fold(q).split())
        return np.array([len(qs & d) / (len(qs) or 1) for d in self.docs])

class AIService:
    def __init__(self, embedder_cls=Embedder):
        self.spaces = SPACES
        self.sp = embedder_cls([space_text(s) for s in SPACES])
        self.kb = embedder_cls([q + " " + a for q, a in KB])

    # 1) Semantic search trên phòng/studio
    def search(self, query, k=5):
        sc = self.sp.sim(query)
        idx = np.argsort(-sc)[:k]
        return [(self.spaces[i]["id"], round(float(sc[i]), 3)) for i in idx]

    # 2) Recommendation content-based + luật lọc cứng
    def recommend(self, need, budget=None, space_type=None, district=None, people=None, k=3, city=None):
        sim = self.sp.sim(need)
        out = []
        for i, s in enumerate(self.spaces):
            if space_type and s["type"] != space_type: continue
            if city and s["city"] != city: continue
            if people and s["cap"] < people: continue
            if budget and s["price"] > budget: continue
            score = sim[i]  # độ tương đồng nội dung
            if district and s["district"] == district: score += 0.15
            reasons = []
            if sim[i] > 0.15: reasons.append(f"phù hợp nhu cầu ({s['style']})")
            if district and s["district"] == district: reasons.append(f"cùng khu vực {district}")
            if budget: reasons.append(f"trong ngân sách ({s['price']:,}đ/giờ)")
            out.append((score, s, reasons))
        out.sort(key=lambda x: -x[0])
        return [dict(id=s["id"], name=s["name"], score=round(float(sc), 3), price=s["price"],
                     equipment=s["equipment"], reasons=r) for sc, s, r in out[:k]]

    # 3) Chatbot Q&A dựa trên knowledge base (retrieval). Không bịa: dưới ngưỡng thì nói không biết.
    def chat(self, message, threshold=0.32, llm=None):
        sc = self.kb.sim(message)
        i = int(np.argmax(sc))
        if sc[i] < threshold:
            return dict(answer="Mình chưa có thông tin về câu hỏi này trong kho kiến thức nhiếp ảnh phim.",
                        source=None, score=round(float(sc[i]), 3))
        q, a = KB[i]
        if llm:  # chỗ cắm LLM (ví dụ OpenAI API): chỉ cho phép trả lời dựa trên đoạn `a`
            a = llm(message, a)
        return dict(answer=a, source=q, score=round(float(sc[i]), 3))

    # 4) Trợ lý FilmLab AI: tự chọn trả lời bằng kho kiến thức hay gợi ý không gian
    QUESTION_WORDS = {"gi", "nao", "sao", "cach", "khac", "nen", "bao"}   # dạng câu hỏi kiến thức
    PRICE_WORDS = {"re", "gia", "tiet", "kiem"}                            # ưu tiên giá thấp

    def assistant(self, message, kb_threshold=0.32, space_threshold=0.30):
        kbs, sps = self.kb.sim(message), self.sp.sim(message)
        i, j = int(np.argmax(kbs)), int(np.argmax(sps))
        toks = set(fold(message).split())
        def knowledge():
            return dict(kind="knowledge", answer=KB[i][1], source=KB[i][0], score=round(float(kbs[i]), 3))
        if toks & self.QUESTION_WORDS and kbs[i] >= kb_threshold: return knowledge()
        if sps[j] >= space_threshold:
            order = [int(x) for x in np.argsort(-sps)[:5]]
            if toks & self.PRICE_WORDS: order = sorted(order, key=lambda x: self.spaces[x]["price"])
            s = self.spaces[order[0]]
            ans = f"Mình gợi ý {s['name']} ({s['type']}, {s['district']}, {s['city']}), giá {s['price']:,}đ/giờ. {s['desc']}"
            return dict(kind="space", answer=ans, space_id=s["id"], score=round(float(sps[j]), 3))
        if kbs[i] >= kb_threshold: return knowledge()
        return dict(kind="unknown", answer="Mình chưa có thông tin phù hợp. Bạn thử mô tả loại phòng, khu vực hoặc ngân sách nhé.", score=round(float(max(kbs[i], sps[j])), 3))

if __name__ == "__main__":
    ai = AIService()
    print(ai.search("tráng phim màu cho người mới"))
    print(ai.recommend("in ảnh đen trắng cho triển lãm", budget=250000, district="Quận 1"))
    print(ai.chat("phim màu tráng ở nhiệt độ bao nhiêu"))
    print(ai.chat("giá bitcoin hôm nay"))
