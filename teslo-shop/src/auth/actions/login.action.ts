import { tesloApi } from "@/api/teslo-api";
import type { AuthResponse } from "../types/auth.response";

export const logionAction = async (
  email: string,
  password: string,
): Promise<AuthResponse> => {
  try {
    const { data } = await tesloApi.post<AuthResponse>("/auth/login", {
      email,
      password,
    });

    return data;
  } catch (error) {
    throw error;
  }
};
