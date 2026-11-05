import { useEffect, useState } from "react";
import { api } from "../api";
import type { Space, SpaceInput } from "../types";

const EMPTY: SpaceInput = { name: "", type: "Phòng tối", district: "", area: 0, capacity: 1, price_per_hour: 100000,
  style: "", description: "", open_time: "08:00", close_time: "22:00" };

export default function Spaces() {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [form, setForm] = useState<SpaceInput | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const [err, setErr] = useState("");

  const load = () => api.mySpaces().then(setSpaces).catch(e => setErr((e as Error).message));
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!form) return;
    setErr("");
    try {
      if (editId) await api.updateSpace(editId, form); else await api.createSpace(form);
      setForm(null); setEditId(null); await load();
    } catch (e) { setErr((e as Error).message); }
  };
  const hide = async (id: number) => {
    if (!confirm("Ẩn phòng này khỏi danh sách tìm kiếm?")) return;
    try { await api.hideSpace(id); await load(); } catch (e) { setErr((e as Error).message); }
  };
  const set = <K extends keyof SpaceInput>(k: K, v: SpaceInput[K]) => setForm(f => f && { ...f, [k]: v });

  return (
    <>
      <h2>Phòng / Studio</h2>
      {err && <div className="err">{err}</div>}
      {!form && <div className="row"><button className="primary" onClick={() => { setForm(EMPTY); setEditId(null); }}>+ Thêm phòng</button></div>}
      {form && (
        <div className="card" style={{ marginBottom: 16 }}>
          <h3>{editId ? "Sửa phòng" : "Thêm phòng mới"}</h3>
          <div className="grid">
            <label>Tên<input value={form.name} onChange={e => set("name", e.target.value)} /></label>
            <label>Loại<select value={form.type} onChange={e => set("type", e.target.value as SpaceInput["type"])}>
              <option>Phòng tối</option><option>Phòng chụp</option></select></label>
            <label>Quận / khu vực<input value={form.district} onChange={e => set("district", e.target.value)} /></label>
            <label>Giá mỗi giờ (đ)<input type="number" value={form.price_per_hour} onChange={e => set("price_per_hour", Number(e.target.value))} /></label>
            <label>Diện tích (m²)<input type="number" value={form.area} onChange={e => set("area", Number(e.target.value))} /></label>
            <label>Sức chứa<input type="number" value={form.capacity} onChange={e => set("capacity", Number(e.target.value))} /></label>
            <label>Giờ mở cửa<input type="time" value={form.open_time} onChange={e => set("open_time", e.target.value)} /></label>
            <label>Giờ đóng cửa<input type="time" value={form.close_time} onChange={e => set("close_time", e.target.value)} /></label>
          </div>
          <label>Phong cách / chuyên môn<input value={form.style} onChange={e => set("style", e.target.value)} /></label>
          <label>Mô tả<textarea rows={3} value={form.description} onChange={e => set("description", e.target.value)} /></label>
          <div className="row">
            <button className="primary" onClick={save}>Lưu</button>
            <button onClick={() => { setForm(null); setEditId(null); }}>Hủy</button>
          </div>
        </div>
      )}
      <table>
        <thead><tr><th>Tên</th><th>Loại</th><th>Khu vực</th><th>Giá/giờ</th><th>Giờ mở</th><th>Trạng thái</th><th></th></tr></thead>
        <tbody>
          {spaces.map(s => (
            <tr key={s.id}>
              <td>{s.name}</td><td>{s.type}</td><td>{s.district}</td><td>{s.price_per_hour.toLocaleString("vi-VN")}đ</td>
              <td>{s.open_time}–{s.close_time}</td>
              <td><span className={"badge " + (s.active ? "available" : "maintenance")}>{s.active ? "Đang mở" : "Đã ẩn"}</span></td>
              <td>
                <button onClick={() => { setEditId(s.id); setForm({ name: s.name, type: s.type, district: s.district, area: s.area,
                  capacity: s.capacity, price_per_hour: s.price_per_hour, style: s.style, description: s.description,
                  open_time: s.open_time, close_time: s.close_time }); }}>Sửa</button>{" "}
                {s.active && <button className="danger" onClick={() => hide(s.id)}>Ẩn</button>}
              </td>
            </tr>
          ))}
          {spaces.length === 0 && <tr><td colSpan={7} className="muted">Chưa có phòng nào.</td></tr>}
        </tbody>
      </table>
    </>
  );
}
