export type Role = "photographer" | "provider" | "expert" | "admin";
export interface Equipment { id: number; space_id: number; name: string; status: "available" | "maintenance"; }
export interface Space {
  id: number; provider_id: number; name: string; type: "Phòng tối" | "Phòng chụp"; district: string; area: number;
  capacity: number; price_per_hour: number; style: string; description: string; open_time: string; close_time: string;
  active: boolean; equipment: Equipment[];
}
export type SpaceInput = Omit<Space, "id" | "provider_id" | "active" | "equipment">;
export interface Booking {
  id: number; user_id: number; space_id: number; start_time: string; end_time: string;
  status: "pending" | "confirmed" | "rejected" | "cancelled"; note: string; total_price: number;
}
