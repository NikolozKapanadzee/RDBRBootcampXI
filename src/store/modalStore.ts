import { create } from "zustand";
import type { ModalStore } from "../types";

export const useModalStore = create<ModalStore>((set) => ({
  isLoginOpen: false,
  isRegisterOpen: false,
  isProfileOpen: false,
  isSidebarOpen: false,
  openLogin: () => set({ isLoginOpen: true }),
  openRegister: () => set({ isRegisterOpen: true }),
  openProfile: () => set({ isProfileOpen: true }),
  openSidebar: () => set({ isSidebarOpen: true }),
  closeAll: () =>
    set({
      isLoginOpen: false,
      isRegisterOpen: false,
      isProfileOpen: false,
      isSidebarOpen: false,
    }),
}));
