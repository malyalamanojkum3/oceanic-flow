"use client";

import { uiStore } from "@/app/states/ui";
import { api } from "@/trpc/react";
import { DataTable } from "@/components/primitives/data-table";
import { columns } from "./columns";
import CreatePSDButton from "@/components/dashboard/forms/create-button";

const PSDFreightForwarderPage = () => {
  const currentOrgId = uiStore.get.currentOrgId();
  const freightForwarders = api.freightForwarder.getAll.useQuery({
    orgId: currentOrgId,
  });
  return (
    <div className="flex w-full flex-col">
      <CreatePSDButton />
      <DataTable columns={columns} data={freightForwarders.data ?? []} />
    </div>
  );
};

export default PSDFreightForwarderPage;
