"use client";

import { uiStore } from "@/app/states/ui";
import { api } from "@/trpc/react";
import { DataTable } from "@/components/primitives/data-table";
import { columns } from "./columns";
import Link from "next/link";
import { Button } from "@/components/primitives/button";
import { usePathname } from "next/navigation";

const PSDPlaceOfLoadingPage = () => {
  const currentOrgId = uiStore.get.currentOrgId();
  const placeOfLoading = api.placeOfLoading.getAll.useQuery({
    orgId: currentOrgId,
  });
  const pn = usePathname();
  return (
    <div className="flex w-full flex-col">
      <Link className="ml-auto" href={`${pn}/create`}>
        <Button className="my-2" size={"lg"}>
          Create
        </Button>
      </Link>
      <DataTable columns={columns} data={placeOfLoading.data ?? []} />
    </div>
  );
};

export default PSDPlaceOfLoadingPage;
