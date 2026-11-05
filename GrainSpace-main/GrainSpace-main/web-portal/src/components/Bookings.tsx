import { useEffect, useState } from "react";
import { api } from "../api";
import type { Booking } from "../types";

const LABEL: Record<Booking["status"], string> = { pending: "Chờ duyệt", confirmed: "Đã xác nhận", rejected: "Đã từ chối", cancelled: "Khách đã hủy" };
const fmt = (s: string) => new Date(s).toLocaleString("vi-VN", { dateStyle: "short", timeStyle: "short" });

export default function Bookings() {
  const [rows, setRows] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<"all" | Booking["status"]>("all");
  const [err, setErr] = useState("");
  const load = () => api.bookings().then(setRows).catch(e => setErr((e as Error).message));
  useEffect(() => { load(); }, []);

  const act = async (id: number, s: "confirmed" | "rejected") => {
    setErr("");
    try { await api.setBookingStatus(id, s); await load(); } catch (e) { setErr((e as Error).message); }
  };
  const shown = filter === "all" ? rows : rows.filter(r => r.status === filter);

  return (
    <>
      <h2>Lịch đặt</h2>
      {err && <div className="err">{err}</div>}
      <div className="row">
        {(["all", "pending", "confirmed", "rejected", "cancelled"] as const).map(f => (
          <button key={f} className={filter === f ? "primary" : ""} onClick={() => setFilter(f)}>{f === "all" ? "Tất cả" : LABEL[f]}</button>
        ))}
      </div>
      <table>
        <thead><tr><th>Mã</th><th>Phòng</th><th>Thời gian</th><th>Tổng tiền</th><th>Ghi chú</th><th>Trạng thái</th><th></th></tr></thead>
        <tbody>
          {shown.map(b => (
            <tr key={b.id}>
              <td>#{b.id}</td><td>Phòng {b.space_id}</td><td>{fmt(b.start_time)} → {fmt(b.end_time)}</td>
              <td>{b.total_price.toLocaleString("vi-VN")}đ</td><td>{b.note}</td>
              <td><span className={"badge " + b.status}>{LABEL[b.status]}</span></td>
              <td>{b.status === "pending" && <>
                <button className="primary" onClick={() => act(b.id, "confirmed")}>Duyệt</button>{" "}
                <button className="danger" onClick={() => act(b.id, "rejected")}>Từ chối</button></>}</td>
            </tr>
          ))}
          {shown.length === 0 && <tr><td colSpan={7} className="muted">Không có lịch đặt nào.</td></tr>}
        </tbody>
      </table>
    </>
  );
}
