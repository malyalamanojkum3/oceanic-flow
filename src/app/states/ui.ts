import { createStore } from "zustand-x";
import { createJSONStorage } from "zustand/middleware";

export const uiStore = createStore("ui")(
  {
    sideBarToggled: false,
    currentOrgId: "",
    currentOrg: {
      id: "",
      name: "",
    },
  },
  {
    persist: {
      enabled: true,
      name: "ui",
      storage: createJSONStorage(() => sessionStorage),
    },
  },
);
