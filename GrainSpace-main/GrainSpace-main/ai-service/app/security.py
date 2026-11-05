# -*- coding: utf-8 -*-
"""Mật khẩu (PBKDF2) + JWT + phân quyền theo vai trò (RBAC)."""
import hashlib, hmac, os
from datetime import datetime, timedelta, timezone
import jwt
from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
import config
from database import get_db
from models import User

bearer = HTTPBearer(auto_error=False)

def hash_password(pw: str) -> str:
    salt = os.urandom(16)
    dk = hashlib.pbkdf2_hmac("sha256", pw.encode(), salt, 120_000)
    return salt.hex() + "$" + dk.hex()

def verify_password(pw: str, stored: str) -> bool:
    try:
        salt_hex, dk_hex = stored.split("$")
    except ValueError:
        return False
    dk = hashlib.pbkdf2_hmac("sha256", pw.encode(), bytes.fromhex(salt_hex), 120_000)
    return hmac.compare_digest(dk.hex(), dk_hex)

def create_token(user: User) -> str:
    exp = datetime.now(timezone.utc) + timedelta(minutes=config.ACCESS_TOKEN_MINUTES)
    return jwt.encode({"sub": str(user.id), "role": user.role, "exp": exp},
                      config.JWT_SECRET, algorithm=config.JWT_ALGORITHM)

def current_user(cred: HTTPAuthorizationCredentials = Depends(bearer), db: Session = Depends(get_db)) -> User:
    if not cred:
        raise HTTPException(401, "Thiếu token đăng nhập")
    try:
        data = jwt.decode(cred.credentials, config.JWT_SECRET, algorithms=[config.JWT_ALGORITHM])
    except jwt.PyJWTError:
        raise HTTPException(401, "Token không hợp lệ hoặc đã hết hạn")
    user = db.get(User, int(data["sub"]))
    if not user:
        raise HTTPException(401, "Tài khoản không tồn tại")
    return user

def require_roles(*roles: str):
    def dep(user: User = Depends(current_user)) -> User:
        if user.role not in roles:
            raise HTTPException(403, "Bạn không có quyền thực hiện thao tác này")
        return user
    return dep
