import { createStore } from "zustand-x";
import { createJSONStorage } from "zustand/middleware";

export const uiStore = createStore("ui")(
  {
    sideBarToggled: false,
    currentOrgId: "",
    currentOrg: {
      id: "",
      name: "",
      createdAt: new Date(),
      ownerId: "",
    },
  },
  {
    persist: {
      name: "ui",
      storage: createJSONStorage(() => localStorage),
    },
  },
);
