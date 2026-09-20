import { tesloApi } from "@/api/teslo-api";
import type { AuthResponse } from "../types/auth.response";

export const checkAuthAction = async (): Promise<AuthResponse> => {
  const token = localStorage.getItem("token");

  if (!token) throw new Error("No token found");

  try {
    const { data } = await tesloApi.get<AuthResponse>("/auth/register");
    localStorage.setItem("token", data.token);
    return data;
  } catch (error) {
    localStorage.removeItem("token");
    throw new Error("Token expired or not valid");
  }
};
