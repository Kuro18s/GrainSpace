import { useEffect, useState } from "react";
import { api } from "../api";
import type { Booking, Space } from "../types";

export default function Dashboard() {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [err, setErr] = useState("");
  useEffect(() => {
    Promise.all([api.mySpaces(), api.bookings()]).then(([s, b]) => { setSpaces(s); setBookings(b); })
      .catch(e => setErr((e as Error).message));
  }, []);
  const maint = spaces.flatMap(s => s.equipment).filter(e => e.status === "maintenance").length;
  const revenue = bookings.filter(b => b.status === "confirmed").reduce((t, b) => t + b.total_price, 0);
  return (
    <>
      <h2>Tổng quan</h2>
      {err && <div className="err">{err}</div>}
      <div className="grid">
        <div className="card"><div className="muted">Phòng / studio đang mở</div><div className="stat">{spaces.filter(s => s.active).length}</div></div>
        <div className="card"><div className="muted">Lịch chờ duyệt</div><div className="stat">{bookings.filter(b => b.status === "pending").length}</div></div>
        <div className="card"><div className="muted">Thiết bị đang bảo trì</div><div className="stat">{maint}</div></div>
        <div className="card"><div className="muted">Doanh thu lịch đã xác nhận</div><div className="stat">{revenue.toLocaleString("vi-VN")}đ</div></div>
      </div>
    </>
  );
}
