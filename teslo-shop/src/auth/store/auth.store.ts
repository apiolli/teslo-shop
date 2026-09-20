import type { User } from "@/types/user.interface";
import { create } from "zustand";
import { logionAction } from "../actions/login.action";
import { checkAuthAction } from "../actions/check-auth.action";

type AuthStatus = "authenticated" | "not-authenticated" | "checking";

type AuthState = {
  // Properties
  user: User | null;
  token: string | null;
  authStatus: AuthStatus;

  // Getters
  isAdmin: () => boolean;

  // Actions
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  cheackAuthStatus: () => Promise<boolean>;
};

export const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  token: null,
  authStatus: "checking",
  login: async (email: string, password: string) => {
    try {
      const data = await logionAction(email, password);

      localStorage.setItem("token", data.token);

      set({ user: data.user, token: data.token, authStatus: "authenticated" });

      return true;
    } catch (error) {
      set({ user: null, token: null, authStatus: "not-authenticated" });

      localStorage.removeItem("token");

      return false;
    }
  },
  logout: () => {
    set({ user: null, token: null });
    localStorage.removeItem("token");
  },
  cheackAuthStatus: async () => {
    try {
      const { user, token } = await checkAuthAction();

      set({
        user: user,
        token: token,
        authStatus: "authenticated",
      });

      return true;
    } catch (error) {
      set({
        user: undefined,
        token: undefined,
        authStatus: "not-authenticated",
      });

      return false;
    }
  },
  isAdmin: () => {
    const roles = get().user?.roles || [];
    return roles.includes("admin");
  },
}));
