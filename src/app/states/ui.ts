import { create } from "zustand";
import { type RouterOutputs } from "@/trpc/react";

interface UIState {
  sideBarToggled: boolean;
  toggleSideBar: () => void;
  currentOrgId: string;
  setCurrentOrgId: (id: string) => void;
  currentOrg: RouterOutputs["orgs"]["getOrgById"] | Record<string, never>;
  setCurrentOrg: (obj: RouterOutputs["orgs"]["getOrgById"]) => void;
}

export const useUIStore = create<UIState>()((set) => ({
  sideBarToggled: false,
  toggleSideBar: () =>
    set((state) => ({ sideBarToggled: !state.sideBarToggled })),
  currentOrgId: "",
  setCurrentOrgId: (id) => set({ currentOrgId: id }),
  currentOrg: {},
  setCurrentOrg: (org) => set({ currentOrg: org }),
}));
