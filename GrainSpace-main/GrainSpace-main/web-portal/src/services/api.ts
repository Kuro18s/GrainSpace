import type { Space, SpaceInput, Equipment, Booking, Role } from "./types";

const BASE = (import.meta.env.VITE_API_URL as string | undefined) ?? "http://localhost:8000";
let token: string | null = sessionStorage.getItem("token");

export const setToken = (t: string | null) => {
  token = t;
  if (t) sessionStorage.setItem("token", t); else sessionStorage.removeItem("token");
};
export const getToken = () => token;

async function req<T>(method: string, path: string, body?: unknown): Promise<T> {
  const res = await fetch(BASE + path, {
    method,
    headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  if (res.status === 204) return undefined as T;
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const d = (data as { detail?: unknown }).detail;
    throw new Error(typeof d === "string" ? d : "Yêu cầu không hợp lệ");
  }
  return data as T;
}

export const api = {
  login: (email: string, password: string) => req<{ access_token: string; role: Role }>("POST", "/auth/login", { email, password }),
  me: () => req<{ id: number; email: string; full_name: string; role: Role }>("GET", "/auth/me"),
  mySpaces: () => req<Space[]>("GET", "/spaces/mine"),
  createSpace: (b: SpaceInput) => req<Space>("POST", "/spaces", b),
  updateSpace: (id: number, b: SpaceInput) => req<Space>("PUT", `/spaces/${id}`, b),
  hideSpace: (id: number) => req<void>("DELETE", `/spaces/${id}`),
  addEquipment: (spaceId: number, name: string) => req<Equipment>("POST", `/spaces/${spaceId}/equipment`, { name }),
  updateEquipment: (id: number, name: string, status: Equipment["status"]) => req<Equipment>("PUT", `/equipment/${id}`, { name, status }),
  deleteEquipment: (id: number) => req<void>("DELETE", `/equipment/${id}`),
  bookings: () => req<Booking[]>("GET", "/bookings/provider"),
  setBookingStatus: (id: number, status: "confirmed" | "rejected") => req<Booking>("PATCH", `/bookings/${id}/status`, { status }),
};
