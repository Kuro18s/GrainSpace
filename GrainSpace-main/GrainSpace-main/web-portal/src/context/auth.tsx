import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { api, setToken, getToken } from "./api";
import type { Role } from "./types";

interface User { id: number; email: string; full_name: string; role: Role }
interface Ctx { user: User | null; loading: boolean; login: (e: string, p: string) => Promise<void>; logout: () => void }
const AuthCtx = createContext<Ctx>(null as unknown as Ctx);
export const useAuth = () => useContext(AuthCtx);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(!!getToken());

  useEffect(() => {
    if (!getToken()) return;
    api.me().then(setUser).catch(() => setToken(null)).finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const t = await api.login(email, password);
    if (t.role !== "provider" && t.role !== "admin") throw new Error("Cổng này chỉ dành cho nhà cung cấp và quản trị viên");
    setToken(t.access_token);
    setUser(await api.me());
  };
  const logout = () => { setToken(null); setUser(null); };
  return <AuthCtx.Provider value={{ user, loading, login, logout }}>{children}</AuthCtx.Provider>;
}
