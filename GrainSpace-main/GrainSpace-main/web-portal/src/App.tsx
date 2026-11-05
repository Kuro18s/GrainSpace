import { NavLink, Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./auth";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Spaces from "./pages/Spaces";
import EquipmentPage from "./pages/Equipment";
import Bookings from "./pages/Bookings";

export default function App() {
  const { user, loading, logout } = useAuth();
  if (loading) return <p className="main muted">Đang tải...</p>;
  if (!user) return <Routes><Route path="*" element={<Login />} /></Routes>;
  return (
    <div className="layout">
      <nav className="side">
        <h1>Phòng Tối</h1>
        <NavLink to="/" end>Tổng quan</NavLink>
        <NavLink to="/spaces">Phòng / Studio</NavLink>
        <NavLink to="/equipment">Thiết bị</NavLink>
        <NavLink to="/bookings">Lịch đặt</NavLink>
        <p className="muted" style={{ fontSize: 13 }}>{user.full_name} ({user.role})</p>
        <button onClick={logout}>Đăng xuất</button>
      </nav>
      <main className="main">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/spaces" element={<Spaces />} />
          <Route path="/equipment" element={<EquipmentPage />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}
