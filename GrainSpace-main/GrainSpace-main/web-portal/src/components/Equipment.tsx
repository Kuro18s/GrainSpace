import { useEffect, useState } from "react";
import { api } from "../api";
import type { Space } from "../types";

export default function EquipmentPage() {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [sid, setSid] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [err, setErr] = useState("");

  const load = () => api.mySpaces().then(s => { setSpaces(s); setSid(cur => cur ?? s[0]?.id ?? null); })
    .catch(e => setErr((e as Error).message));
  useEffect(() => { load(); }, []);

  const space = spaces.find(s => s.id === sid);
  const run = async (fn: () => Promise<unknown>) => { setErr(""); try { await fn(); await load(); } catch (e) { setErr((e as Error).message); } };

  return (
    <>
      <h2>Thiết bị</h2>
      {err && <div className="err">{err}</div>}
      <label>Chọn phòng / studio
        <select value={sid ?? ""} onChange={e => setSid(Number(e.target.value))}>
          {spaces.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
      </label>
      {space && (
        <>
          <div className="row">
            <input style={{ maxWidth: 320 }} placeholder="Tên thiết bị mới" value={name} onChange={e => setName(e.target.value)} />
            <button className="primary" disabled={!name.trim()} onClick={() => run(async () => { await api.addEquipment(space.id, name.trim()); setName(""); })}>Thêm</button>
          </div>
          <table>
            <thead><tr><th>Thiết bị</th><th>Trạng thái</th><th></th></tr></thead>
            <tbody>
              {space.equipment.map(e => (
                <tr key={e.id}>
                  <td>{e.name}</td>
                  <td><span className={"badge " + e.status}>{e.status === "available" ? "Khả dụng" : "Bảo trì"}</span></td>
                  <td>
                    <button onClick={() => run(() => api.updateEquipment(e.id, e.name, e.status === "available" ? "maintenance" : "available"))}>
                      {e.status === "available" ? "Chuyển bảo trì" : "Đánh dấu khả dụng"}</button>{" "}
                    <button className="danger" onClick={() => run(() => api.deleteEquipment(e.id))}>Xóa</button>
                  </td>
                </tr>
              ))}
              {space.equipment.length === 0 && <tr><td colSpan={3} className="muted">Phòng này chưa có thiết bị.</td></tr>}
            </tbody>
          </table>
        </>
      )}
      {spaces.length === 0 && <p className="muted">Bạn chưa có phòng nào. Hãy tạo phòng ở mục Phòng / Studio.</p>}
    </>
  );
}
