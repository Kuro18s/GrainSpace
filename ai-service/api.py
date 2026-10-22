# -*- coding: utf-8 -*-
"""REST API cho AI service. Chạy: uvicorn api:app --port 8001  (cần: pip install fastapi uvicorn)"""
from typing import Optional
from fastapi import FastAPI
from pydantic import BaseModel
from ai_service import AIService

app = FastAPI(title="Phòng Tối - AI service")
ai = AIService()

class SearchIn(BaseModel):
    query: str
    k: int = 5

class RecommendIn(BaseModel):
    need: str
    budget: Optional[int] = None
    space_type: Optional[str] = None
    district: Optional[str] = None
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
    return ai.recommend(b.need, b.budget, b.space_type, b.district, b.people, b.k)

@app.post("/ai/chat")
def chat(b: ChatIn):
    return ai.chat(b.message)
