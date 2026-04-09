import { create } from "zustand";
import type { AuthStore } from "../types";
import Cookies from "js-cookie";

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: Cookies.get("token") || null,
  setUser: (user) => set({ user }),
  setToken: (token) => {
    Cookies.set("token", token, { expires: 7 });
    set({ token });
  },
}));
