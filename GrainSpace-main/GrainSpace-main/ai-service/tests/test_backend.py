# -*- coding: utf-8 -*-
"""Kiểm thử backend. Chạy: pytest -q   (dùng DB in-memory, không đụng file phongtoi.db)"""
import os
os.environ["DATABASE_URL"] = "sqlite:///:memory:"
os.environ["AI_SERVICE_URL"] = ""
from datetime import datetime, timedelta
from fastapi.testclient import TestClient
from database import SessionLocal
from seed import seed
from main import app

seed(SessionLocal())
c = TestClient(app)

def login(email, pw="123456"):
    r = c.post("/auth/login", json={"email": email, "password": pw})
    assert r.status_code == 200, r.text
    return {"Authorization": "Bearer " + r.json()["access_token"]}

PH, PR, AD = "minhanh@phongtoi.vn", "provider1@phongtoi.vn", "admin@phongtoi.vn"

def slot(day_offset=3, h1=9, h2=11):
    d = (datetime.now() + timedelta(days=day_offset)).replace(minute=0, second=0, microsecond=0)
    return d.replace(hour=h1).isoformat(), d.replace(hour=h2).isoformat()

def test_health(): assert c.get("/health").json() == {"status": "ok"}

def test_register_login_me():
    r = c.post("/auth/register", json={"email": "moi@x.vn", "password": "abcdef", "full_name": "Mới"})
    assert r.status_code == 201 and r.json()["role"] == "photographer"
    assert c.post("/auth/register", json={"email": "moi@x.vn", "password": "abcdef", "full_name": "Mới"}).status_code == 409
    assert c.get("/auth/me", headers=login("moi@x.vn", "abcdef")).json()["email"] == "moi@x.vn"

def test_cannot_self_register_admin():
    r = c.post("/auth/register", json={"email": "a@x.vn", "password": "abcdef", "full_name": "A", "role": "admin"})
    assert r.status_code == 422

def test_login_wrong_password(): assert c.post("/auth/login", json={"email": PH, "password": "sai"}).status_code == 401
def test_no_token_401(): assert c.get("/auth/me").status_code == 401
def test_bad_token_401(): assert c.get("/auth/me", headers={"Authorization": "Bearer abc"}).status_code == 401

def test_list_and_filter_spaces():
    assert len(c.get("/spaces").json()) == 20
    assert all(s["type"] == "Phòng chụp" for s in c.get("/spaces", params={"type": "Phòng chụp"}).json())
    assert all(s["price_per_hour"] <= 100000 for s in c.get("/spaces", params={"max_price": 100000}).json())

def test_keyword_search_fallback():
    r = c.get("/spaces", params={"q": "thời trang"}).json()
    assert r and any("Thời Trang" in s["name"] for s in r)

def test_rbac_photographer_cannot_create_space():
    body = dict(name="X", type="Phòng tối", district="Quận 1", price_per_hour=1000)
    assert c.post("/spaces", json=body, headers=login(PH)).status_code == 403
    assert c.post("/spaces", json=body).status_code == 401

def test_provider_space_crud_and_ownership():
    h = login(PR)
    body = dict(name="Phòng thử", type="Phòng tối", district="Quận 1", price_per_hour=50000, capacity=3)
    r = c.post("/spaces", json=body, headers=h); assert r.status_code == 201
    sid = r.json()["id"]
    body["price_per_hour"] = 60000
    assert c.put(f"/spaces/{sid}", json=body, headers=h).json()["price_per_hour"] == 60000
    # provider khác không được sửa
    assert c.put(f"/spaces/{sid}", json=body, headers=login("provider2@phongtoi.vn")).status_code == 403
    assert c.delete(f"/spaces/{sid}", headers=h).status_code == 204
    assert sid not in [s["id"] for s in c.get("/spaces").json()]

def test_invalid_space_rejected():
    r = c.post("/spaces", json=dict(name="X", type="Sai loại", district="Q1", price_per_hour=1), headers=login(PR))
    assert r.status_code == 422

def test_equipment_flow():
    h = login(PR)
    sid = c.get("/spaces/mine", headers=h).json()[0]["id"]
    e = c.post(f"/spaces/{sid}/equipment", json={"name": "Máy phóng mới"}, headers=h)
    assert e.status_code == 201
    eid = e.json()["id"]
    assert c.put(f"/equipment/{eid}", json={"name": "Máy phóng mới", "status": "maintenance"}, headers=h).json()["status"] == "maintenance"
    assert any(x["id"] == eid for x in c.get(f"/spaces/{sid}/equipment").json())
    assert c.post(f"/spaces/{sid}/equipment", json={"name": "Lạ"}, headers=login(PH)).status_code == 403
    assert c.delete(f"/equipment/{eid}", headers=h).status_code == 204

def test_booking_happy_path_and_price():
    s, e = slot(5, 9, 11)
    r = c.post("/bookings", json={"space_id": 1, "start_time": s, "end_time": e}, headers=login(PH))
    assert r.status_code == 201 and r.json()["total_price"] == 2 * 120000 and r.json()["status"] == "pending"

def test_booking_overlap_409():
    s, e = slot(6, 9, 11)
    h = login(PH)
    assert c.post("/bookings", json={"space_id": 2, "start_time": s, "end_time": e}, headers=h).status_code == 201
    s2, e2 = slot(6, 10, 12)
    assert c.post("/bookings", json={"space_id": 2, "start_time": s2, "end_time": e2}, headers=h).status_code == 409
    s3, e3 = slot(6, 11, 12)  # liền kề thì được
    assert c.post("/bookings", json={"space_id": 2, "start_time": s3, "end_time": e3}, headers=h).status_code == 201

def test_booking_validation():
    h = login(PH)
    s, e = slot(4, 11, 9)
    assert c.post("/bookings", json={"space_id": 1, "start_time": s, "end_time": e}, headers=h).status_code == 422
    s, e = slot(-2, 9, 11)
    assert c.post("/bookings", json={"space_id": 1, "start_time": s, "end_time": e}, headers=h).status_code == 422
    s, e = slot(4, 5, 7)  # ngoài giờ mở cửa 08:00
    assert c.post("/bookings", json={"space_id": 1, "start_time": s, "end_time": e}, headers=h).status_code == 422
    s, e = slot(4, 9, 11)
    assert c.post("/bookings", json={"space_id": 9999, "start_time": s, "end_time": e}, headers=h).status_code == 404
    assert c.post("/bookings", json={"space_id": 1, "start_time": s, "end_time": e}, headers=login(PR)).status_code == 403

def test_booking_status_flow():
    s, e = slot(8, 14, 16)
    # space 1 thuộc provider1 (index chẵn)
    bid = c.post("/bookings", json={"space_id": 1, "start_time": s, "end_time": e}, headers=login(PH)).json()["id"]
    assert bid in [b["id"] for b in c.get("/bookings/mine", headers=login(PH)).json()]
    assert bid in [b["id"] for b in c.get("/bookings/provider", headers=login(PR)).json()]
    assert bid not in [b["id"] for b in c.get("/bookings/provider", headers=login("provider2@phongtoi.vn")).json()]
    # provider khác không được duyệt
    assert c.patch(f"/bookings/{bid}/status", json={"status": "confirmed"}, headers=login("provider2@phongtoi.vn")).status_code == 403
    # photographer khác không được hủy
    assert c.patch(f"/bookings/{bid}/status", json={"status": "cancelled"}, headers=login("hoang@phongtoi.vn")).status_code == 403
    assert c.patch(f"/bookings/{bid}/status", json={"status": "confirmed"}, headers=login(PR)).json()["status"] == "confirmed"
    assert c.patch(f"/bookings/{bid}/status", json={"status": "cancelled"}, headers=login(PH)).json()["status"] == "cancelled"
    assert c.patch(f"/bookings/{bid}/status", json={"status": "confirmed"}, headers=login(PR)).status_code == 409

def test_admin_only():
    assert c.get("/admin/users", headers=login(PH)).status_code == 403
    assert len(c.get("/admin/users", headers=login(AD)).json()) >= 5
