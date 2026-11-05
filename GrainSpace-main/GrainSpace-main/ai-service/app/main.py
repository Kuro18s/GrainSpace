# -*- coding: utf-8 -*-
"""Backend Phòng Tối. Chạy: uvicorn main:app --port 8000   (tài liệu API tự sinh tại /docs)"""
import json, urllib.request
from datetime import datetime
from typing import Optional
from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select, or_
from sqlalchemy.orm import Session
import config, models, schemas
from database import Base, engine, get_db
from security import hash_password, verify_password, create_token, current_user, require_roles

Base.metadata.create_all(engine)  # MVP: tạo bảng khi khởi động. Giai đoạn sau chuyển sang Alembic migration.

app = FastAPI(title="Phòng Tối - Backend API", version="0.1.0")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

@app.get("/health")
def health():
    return {"status": "ok"}

# ---------- AUTH ----------
@app.post("/auth/register", response_model=schemas.UserOut, status_code=201)
def register(b: schemas.RegisterIn, db: Session = Depends(get_db)):
    if db.scalar(select(models.User).where(models.User.email == b.email.lower())):
        raise HTTPException(409, "Email đã được đăng ký")
    u = models.User(email=b.email.lower(), password_hash=hash_password(b.password),
                    full_name=b.full_name, role=b.role)
    db.add(u); db.flush()
    if b.role == "provider":
        db.add(models.Provider(user_id=u.id, business_name=b.business_name or b.full_name))
    db.commit()
    return u

@app.post("/auth/login", response_model=schemas.TokenOut)
def login(b: schemas.LoginIn, db: Session = Depends(get_db)):
    u = db.scalar(select(models.User).where(models.User.email == b.email.lower()))
    if not u or not verify_password(b.password, u.password_hash):
        raise HTTPException(401, "Sai email hoặc mật khẩu")
    return schemas.TokenOut(access_token=create_token(u), role=u.role)

@app.get("/auth/me", response_model=schemas.UserOut)
def me(user: models.User = Depends(current_user)):
    return user

# ---------- helpers ----------
def provider_of(db: Session, user: models.User) -> Optional[models.Provider]:
    return db.scalar(select(models.Provider).where(models.Provider.user_id == user.id))

def get_space_or_404(db: Session, space_id: int) -> models.CreativeSpace:
    s = db.get(models.CreativeSpace, space_id)
    if not s:
        raise HTTPException(404, "Không tìm thấy phòng/studio")
    return s

def assert_can_manage(db: Session, user: models.User, space: models.CreativeSpace):
    if user.role == "admin":
        return
    p = provider_of(db, user)
    if not p or p.id != space.provider_id:
        raise HTTPException(403, "Đây không phải phòng/studio của bạn")

# ---------- CREATIVE SPACES ----------
def ai_search_ids(query: str, k: int = 20):
    """Gọi AI service (Thành viên 4). Lỗi/không cấu hình -> trả None để dùng tìm kiếm từ khóa."""
    if not config.AI_SERVICE_URL:
        return None
    try:
        req = urllib.request.Request(config.AI_SERVICE_URL.rstrip("/") + "/ai/search",
                                     data=json.dumps({"query": query, "k": k}).encode(),
                                     headers={"Content-Type": "application/json"})
        with urllib.request.urlopen(req, timeout=3) as r:
            return [x["id"] for x in json.loads(r.read())]
    except Exception:
        return None

@app.get("/spaces", response_model=list[schemas.SpaceOut])
def list_spaces(type: Optional[str] = None, district: Optional[str] = None,
                max_price: Optional[int] = None, q: Optional[str] = None,
                db: Session = Depends(get_db)):
    stmt = select(models.CreativeSpace).where(models.CreativeSpace.active == True)  # noqa: E712
    if type: stmt = stmt.where(models.CreativeSpace.type == type)
    if district: stmt = stmt.where(models.CreativeSpace.district == district)
    if max_price: stmt = stmt.where(models.CreativeSpace.price_per_hour <= max_price)
    rows = list(db.scalars(stmt))
    if q:
        ids = ai_search_ids(q)
        if ids is not None:  # xếp theo thứ tự AI trả về
            order = {i: n for n, i in enumerate(ids)}
            rows = sorted([s for s in rows if s.id in order], key=lambda s: order[s.id])
        else:
            kw = q.lower()
            rows = [s for s in rows if kw in (s.name + " " + s.style + " " + s.description + " " + s.district).lower()]
    return rows

@app.get("/spaces/mine", response_model=list[schemas.SpaceOut])
def my_spaces(user: models.User = Depends(require_roles("provider", "admin")), db: Session = Depends(get_db)):
    if user.role == "admin":
        return list(db.scalars(select(models.CreativeSpace)))
    p = provider_of(db, user)
    return list(db.scalars(select(models.CreativeSpace).where(models.CreativeSpace.provider_id == p.id)))

@app.get("/spaces/{space_id}", response_model=schemas.SpaceOut)
def get_space(space_id: int, db: Session = Depends(get_db)):
    return get_space_or_404(db, space_id)

@app.post("/spaces", response_model=schemas.SpaceOut, status_code=201)
def create_space(b: schemas.SpaceIn, user: models.User = Depends(require_roles("provider")), db: Session = Depends(get_db)):
    p = provider_of(db, user)
    s = models.CreativeSpace(provider_id=p.id, **b.model_dump())
    db.add(s); db.commit()
    return s

@app.put("/spaces/{space_id}", response_model=schemas.SpaceOut)
def update_space(space_id: int, b: schemas.SpaceIn, user: models.User = Depends(require_roles("provider", "admin")),
                 db: Session = Depends(get_db)):
    s = get_space_or_404(db, space_id); assert_can_manage(db, user, s)
    for k, v in b.model_dump().items(): setattr(s, k, v)
    db.commit()
    return s

@app.delete("/spaces/{space_id}", status_code=204)
def delete_space(space_id: int, user: models.User = Depends(require_roles("provider", "admin")), db: Session = Depends(get_db)):
    s = get_space_or_404(db, space_id); assert_can_manage(db, user, s)
    s.active = False  # xóa mềm để giữ lịch sử booking
    db.commit()

# ---------- EQUIPMENT ----------
@app.get("/spaces/{space_id}/equipment", response_model=list[schemas.EquipmentOut])
def list_equipment(space_id: int, db: Session = Depends(get_db)):
    return get_space_or_404(db, space_id).equipment

@app.post("/spaces/{space_id}/equipment", response_model=schemas.EquipmentOut, status_code=201)
def add_equipment(space_id: int, b: schemas.EquipmentIn, user: models.User = Depends(require_roles("provider", "admin")),
                  db: Session = Depends(get_db)):
    s = get_space_or_404(db, space_id); assert_can_manage(db, user, s)
    e = models.Equipment(space_id=s.id, **b.model_dump())
    db.add(e); db.commit()
    return e

def get_equipment_or_404(db, eid):
    e = db.get(models.Equipment, eid)
    if not e: raise HTTPException(404, "Không tìm thấy thiết bị")
    return e

@app.put("/equipment/{eid}", response_model=schemas.EquipmentOut)
def update_equipment(eid: int, b: schemas.EquipmentIn, user: models.User = Depends(require_roles("provider", "admin")),
                     db: Session = Depends(get_db)):
    e = get_equipment_or_404(db, eid); assert_can_manage(db, user, e.space)
    e.name, e.status = b.name, b.status
    db.commit()
    return e

@app.delete("/equipment/{eid}", status_code=204)
def delete_equipment(eid: int, user: models.User = Depends(require_roles("provider", "admin")), db: Session = Depends(get_db)):
    e = get_equipment_or_404(db, eid); assert_can_manage(db, user, e.space)
    db.delete(e); db.commit()

# ---------- BOOKINGS ----------
def hm(t: str) -> int:
    h, m = t.split(":"); return int(h) * 60 + int(m)

@app.post("/bookings", response_model=schemas.BookingOut, status_code=201)
def create_booking(b: schemas.BookingIn, user: models.User = Depends(require_roles("photographer")), db: Session = Depends(get_db)):
    s = get_space_or_404(db, b.space_id)
    if not s.active:
        raise HTTPException(404, "Phòng/studio đã ngừng hoạt động")
    if b.end_time <= b.start_time:
        raise HTTPException(422, "Giờ kết thúc phải sau giờ bắt đầu")
    if b.start_time < datetime.now():
        raise HTTPException(422, "Không thể đặt lịch trong quá khứ")
    if b.start_time.date() != b.end_time.date():
        raise HTTPException(422, "Mỗi lượt đặt chỉ trong một ngày")
    s_min = b.start_time.hour * 60 + b.start_time.minute
    e_min = b.end_time.hour * 60 + b.end_time.minute
    if s_min < hm(s.open_time) or e_min > hm(s.close_time):
        raise HTTPException(422, f"Ngoài giờ hoạt động ({s.open_time}-{s.close_time})")
    clash = db.scalar(select(models.Booking).where(
        models.Booking.space_id == s.id,
        models.Booking.status.in_(["pending", "confirmed"]),
        models.Booking.start_time < b.end_time, models.Booking.end_time > b.start_time))
    if clash:
        raise HTTPException(409, "Khung giờ này đã có người đặt")
    hours = (b.end_time - b.start_time).total_seconds() / 3600
    bk = models.Booking(user_id=user.id, space_id=s.id, start_time=b.start_time, end_time=b.end_time,
                        note=b.note, total_price=int(round(hours * s.price_per_hour)))
    db.add(bk); db.commit()
    return bk

@app.get("/bookings/mine", response_model=list[schemas.BookingOut])
def my_bookings(user: models.User = Depends(require_roles("photographer")), db: Session = Depends(get_db)):
    return list(db.scalars(select(models.Booking).where(models.Booking.user_id == user.id)
                           .order_by(models.Booking.start_time.desc())))

@app.get("/bookings/provider", response_model=list[schemas.BookingOut])
def provider_bookings(user: models.User = Depends(require_roles("provider", "admin")), db: Session = Depends(get_db)):
    stmt = select(models.Booking).order_by(models.Booking.start_time.desc())
    if user.role == "provider":
        p = provider_of(db, user)
        stmt = stmt.join(models.CreativeSpace).where(models.CreativeSpace.provider_id == p.id)
    return list(db.scalars(stmt))

@app.patch("/bookings/{bid}/status", response_model=schemas.BookingOut)
def set_booking_status(bid: int, b: schemas.StatusIn, user: models.User = Depends(current_user), db: Session = Depends(get_db)):
    bk = db.get(models.Booking, bid)
    if not bk: raise HTTPException(404, "Không tìm thấy lịch đặt")
    if user.role == "photographer":
        if bk.user_id != user.id or b.status != "cancelled":
            raise HTTPException(403, "Bạn chỉ được hủy lịch của chính mình")
    elif user.role in ("provider", "admin"):
        if b.status == "cancelled":
            raise HTTPException(403, "Nhà cung cấp dùng 'rejected' để từ chối")
        assert_can_manage(db, user, bk.space)
    else:
        raise HTTPException(403, "Không có quyền")
    if bk.status in ("rejected", "cancelled"):
        raise HTTPException(409, f"Lịch đã ở trạng thái {bk.status}")
    bk.status = b.status; db.commit()
    return bk

# ---------- ADMIN ----------
@app.get("/admin/users", response_model=list[schemas.UserOut])
def admin_users(_: models.User = Depends(require_roles("admin")), db: Session = Depends(get_db)):
    return list(db.scalars(select(models.User)))
