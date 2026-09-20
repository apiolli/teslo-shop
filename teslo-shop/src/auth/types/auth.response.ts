import type { User } from "@/types/user.interface";

export interface AuthResponse {
  user: User;
  token: string;
}
