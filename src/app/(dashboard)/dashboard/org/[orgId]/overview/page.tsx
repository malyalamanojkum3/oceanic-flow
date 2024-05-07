"use client";

import { useUIStore } from "@/app/states/ui";
import { useShallow } from "zustand/react/shallow";

const DashboardOrgOverview = () => {
  const { currentOrg } = useUIStore(
    useShallow((state) => ({
      currentOrg: state.currentOrg,
    })),
  );
  if (!currentOrg) <div>error</div>;
  return (
    <div>
      <h1 className="text-4xl font-medium">{currentOrg.name}</h1>
    </div>
  );
};

export default DashboardOrgOverview;
