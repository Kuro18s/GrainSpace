# -*- coding: utf-8 -*-
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from sqlalchemy.pool import StaticPool
import config

_kw = {}
if config.DATABASE_URL.startswith("sqlite"):
    _kw["connect_args"] = {"check_same_thread": False}
    if ":memory:" in config.DATABASE_URL:
        _kw["poolclass"] = StaticPool  # giữ 1 kết nối để DB in-memory không mất khi test

engine = create_engine(config.DATABASE_URL, **_kw)
SessionLocal = sessionmaker(bind=engine, autoflush=False, expire_on_commit=False)

class Base(DeclarativeBase):
    pass

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
