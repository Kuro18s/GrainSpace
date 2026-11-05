# -*- coding: utf-8 -*-
"""REST API cho FilmLab AI. Chạy: uvicorn api:app --port 8001
Cần: pip install fastapi uvicorn python-multipart opencv-python-headless numpy scikit-learn"""
from typing import Optional
import cv2
import numpy as np
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.responses import Response
from pydantic import BaseModel
from ai_service import AIService
import restoration

app = FastAPI(title="FilmLab AI service")
ai = AIService()

class SearchIn(BaseModel):
    query: str
    k: int = 5

class RecommendIn(BaseModel):
    need: str
    budget: Optional[int] = None
    space_type: Optional[str] = None      # "Phòng tối" hoặc "Studio"
    district: Optional[str] = None
    city: Optional[str] = None
    people: Optional[int] = None
    k: int = 3

class ChatIn(BaseModel):
    message: str

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/ai/search")
def search(b: SearchIn):
    return [{"id": i, "score": s} for i, s in ai.search(b.query, b.k)]

@app.post("/ai/recommend")
def recommend(b: RecommendIn):
    return ai.recommend(b.need, b.budget, b.space_type, b.district, b.people, b.k, b.city)

@app.post("/ai/chat")
def chat(b: ChatIn):
    return ai.chat(b.message)

@app.post("/ai/assistant")
def assistant(b: ChatIn):
    """Trợ lý FilmLab AI: tự chọn trả lời kiến thức hay gợi ý không gian."""
    return ai.assistant(b.message)

@app.post("/ai/restore")
async def restore_image(file: UploadFile = File(...)):
    """Nhận ảnh (jpg/png), trả ảnh đã phục chế dạng JPEG. Dành cho trang Phục chế ảnh của app."""
    img = cv2.imdecode(np.frombuffer(await file.read(), np.uint8), cv2.IMREAD_COLOR)
    if img is None:
        raise HTTPException(400, "Không đọc được ảnh")
    s = 1600 / max(img.shape[:2])
    if s < 1:
        img = cv2.resize(img, None, fx=s, fy=s, interpolation=cv2.INTER_AREA)
    ok, buf = cv2.imencode(".jpg", restoration.restore(img), [cv2.IMWRITE_JPEG_QUALITY, 92])
    return Response(buf.tobytes(), media_type="image/jpeg")
