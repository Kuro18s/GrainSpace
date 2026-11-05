import { useState } from "react";
import { useAuth } from "../auth";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("provider1@phongtoi.vn");
  const [password, setPassword] = useState("123456");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    setBusy(true); setErr("");
    try { await login(email, password); } catch (e) { setErr((e as Error).message); } finally { setBusy(false); }
  };
  return (
    <div className="card login">
      <h2>Cổng nhà cung cấp</h2>
      <label>Email<input value={email} onChange={e => setEmail(e.target.value)} /></label>
      <label>Mật khẩu<input type="password" value={password} onChange={e => setPassword(e.target.value)}
        onKeyDown={e => e.key === "Enter" && submit()} /></label>
      {err && <div className="err">{err}</div>}
      <button className="primary" disabled={busy} onClick={submit}>{busy ? "Đang đăng nhập..." : "Đăng nhập"}</button>
    </div>
  );
}
