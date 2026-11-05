# -*- coding: utf-8 -*-
"""Cấu hình đọc từ biến môi trường (xem devops/.env.example)."""
import os

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./phongtoi.db")
JWT_SECRET = os.getenv("JWT_SECRET", "dev-only-secret-doi-khi-deploy")
JWT_ALGORITHM = "HS256"
ACCESS_TOKEN_MINUTES = int(os.getenv("ACCESS_TOKEN_MINUTES", "120"))
# Để trống = tắt tích hợp AI, search sẽ dùng tìm kiếm từ khóa trong DB.
AI_SERVICE_URL = os.getenv("AI_SERVICE_URL", "")
