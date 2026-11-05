# -*- coding: utf-8 -*-
"""Nạp dữ liệu mẫu: 1 admin, 2 nhà cung cấp, 2 nhiếp ảnh gia, 20 phòng/studio (từ dữ liệu của Thành viên 4).
Chạy: python seed.py   (mật khẩu tất cả tài khoản mẫu: 123456)"""
from sqlalchemy import select
from database import Base, engine, SessionLocal
import models
from security import hash_password
from seed_data import SPACES

def seed(db):
    if db.scalar(select(models.User)):
        print("DB đã có dữ liệu, bỏ qua."); return
    pw = hash_password("123456")
    users = [("admin@phongtoi.vn", "Quản trị viên", "admin"),
             ("provider1@phongtoi.vn", "Hẻm Sáng Studio", "provider"),
             ("provider2@phongtoi.vn", "Lab Phim Sài Gòn", "provider"),
             ("minhanh@phongtoi.vn", "Minh Anh", "photographer"),
             ("hoang@phongtoi.vn", "Hoàng Nguyễn", "photographer")]
    objs = []
    for email, name, role in users:
        u = models.User(email=email, password_hash=pw, full_name=name, role=role); db.add(u); objs.append(u)
    db.flush()
    providers = []
    for u in objs:
        if u.role == "provider":
            p = models.Provider(user_id=u.id, business_name=u.full_name); db.add(p); providers.append(p)
    db.flush()
    for n, s in enumerate(SPACES):
        sp = models.CreativeSpace(provider_id=providers[n % 2].id, name=s["name"], type=s["type"], district=s["district"],
                                  area=s["area"], capacity=s["cap"], price_per_hour=s["price"], style=s["style"],
                                  description=s["desc"])
        sp.equipment = [models.Equipment(name=e) for e in s["equipment"]]
        db.add(sp)
    db.commit()
    print(f"Đã nạp {len(users)} tài khoản và {len(SPACES)} phòng/studio.")

if __name__ == "__main__":
    Base.metadata.create_all(engine)
    with SessionLocal() as db:
        seed(db)
