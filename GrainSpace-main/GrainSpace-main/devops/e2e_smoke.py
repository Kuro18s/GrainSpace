# -*- coding: utf-8 -*-
"""Smoke test tích hợp qua HTTP thật. Cần backend đã `python seed.py` và đang chạy.
Chạy: python e2e_smoke.py [http://localhost:8000]    (chỉ dùng thư viện chuẩn)"""
import json, sys, urllib.parse, urllib.request, urllib.error
from datetime import datetime, timedelta

BASE = (sys.argv[1] if len(sys.argv) > 1 else "http://localhost:8000").rstrip("/")
results = []

def call(method, path, body=None, token=None):
    req = urllib.request.Request(BASE + path, method=method, data=json.dumps(body).encode() if body is not None else None,
                                 headers={"Content-Type": "application/json", **({"Authorization": "Bearer " + token} if token else {})})
    try:
        with urllib.request.urlopen(req, timeout=10) as r:
            raw = r.read(); return r.status, (json.loads(raw) if raw else None)
    except urllib.error.HTTPError as e:
        raw = e.read(); return e.code, (json.loads(raw) if raw else None)

def check(name, cond, extra=""):
    results.append(cond); print(("PASS " if cond else "FAIL ") + name + ("" if cond else f"  -> {extra}"))

def login(email):
    s, d = call("POST", "/auth/login", {"email": email, "password": "123456"})
    return d["access_token"] if s == 200 else None

s, _ = call("GET", "/health"); check("health", s == 200)
ph, pr = login("minhanh@phongtoi.vn"), login("provider1@phongtoi.vn")
check("đăng nhập photographer và provider", bool(ph and pr))

s, spaces = call("GET", "/spaces"); check("liệt kê phòng (>=20)", s == 200 and len(spaces) >= 20, s)
s, r = call("GET", "/spaces?q=" + urllib.parse.quote("tráng phim màu")); check("search từ khóa/AI trả kết quả", s == 200 and len(r) > 0, s)
s, _ = call("POST", "/spaces", {"name": "X", "type": "Phòng tối", "district": "Q1", "price_per_hour": 1000}, ph)
check("RBAC: photographer tạo phòng bị 403", s == 403, s)

s, sp = call("POST", "/spaces", {"name": "Phòng smoke", "type": "Phòng tối", "district": "Quận 1", "price_per_hour": 80000}, pr)
check("provider tạo phòng", s == 201, s)
sid = sp["id"] if s == 201 else None
s, eq = call("POST", f"/spaces/{sid}/equipment", {"name": "Máy phóng thử"}, pr); check("provider thêm thiết bị", s == 201, s)

d = (datetime.now() + timedelta(days=20)).replace(minute=0, second=0, microsecond=0)
slot = {"space_id": sid, "start_time": d.replace(hour=9).isoformat(), "end_time": d.replace(hour=11).isoformat()}
s, bk = call("POST", "/bookings", slot, ph); check("đặt lịch thành công, tính tiền đúng", s == 201 and bk["total_price"] == 160000, (s, bk))
s, _ = call("POST", "/bookings", slot, ph); check("đặt trùng giờ bị 409", s == 409, s)
s, lst = call("GET", "/bookings/provider", token=pr); check("provider thấy lịch mới", s == 200 and any(b["id"] == bk["id"] for b in lst))
s, b2 = call("PATCH", f"/bookings/{bk['id']}/status", {"status": "confirmed"}, pr); check("provider duyệt lịch", s == 200 and b2["status"] == "confirmed", s)
s, b3 = call("PATCH", f"/bookings/{bk['id']}/status", {"status": "cancelled"}, ph); check("photographer hủy lịch của mình", s == 200 and b3["status"] == "cancelled", s)
s, _ = call("DELETE", f"/spaces/{sid}", token=pr); check("provider ẩn phòng", s == 204, s)

print(f"\n{sum(results)}/{len(results)} bước đạt"); sys.exit(0 if all(results) else 1)
