"use client";

import { uiStore } from "@/app/states/ui";

const DashboardOrgOverview = () => {
  const currentOrg = uiStore.get.currentOrg();
  if (!currentOrg) <div>error</div>;
  return (
    <div>
      <h1 className="text-4xl font-medium">{currentOrg.name}</h1>
    </div>
  );
};

export default DashboardOrgOverview;
