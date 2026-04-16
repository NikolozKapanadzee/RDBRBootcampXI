import { create } from "zustand";
import type { AuthStore } from "../types";
import Cookies from "js-cookie";

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: Cookies.get("token") || null,
  setUser: (user) => set({ user }),
  setToken: (token) => {
    if (token) {
      Cookies.set("token", token, { expires: 7 });
    } else {
      Cookies.remove("token");
    }
    set({ token });
  },
  clearAuth: () => {
    Cookies.remove("token");
    set({ user: null, token: null });
  },
}));
