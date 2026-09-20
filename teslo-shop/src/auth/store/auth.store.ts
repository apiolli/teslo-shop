import type { User } from "@/types/user.interface";
import { create } from "zustand";
import { logionAction } from "../actions/login.action";

type AuthState = {
  // Properties
  user: User | null;
  token: string | null;

  // Getters

  // Actions
  login: (email: string, password: string) => Promise<boolean>;
};

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  token: null,
  login: async (email: string, password: string) => {
    try {
      const data = await logionAction(email, password);
      localStorage.setItem("token", data.token);
      set({ user: data.user, token: data.token });
      return true;
    } catch (error) {
      set({ user: null, token: null });
      localStorage.removeItem("token");
      return false;
    }
  },
}));
