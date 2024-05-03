import { create } from "zustand";

interface UIState {
  sideBarToggled: boolean;
  toggleSideBar: () => void;
}

export const useUIStore = create<UIState>()((set) => ({
  sideBarToggled: false,
  toggleSideBar: () =>
    set((state) => ({ sideBarToggled: !state.sideBarToggled })),
}));
