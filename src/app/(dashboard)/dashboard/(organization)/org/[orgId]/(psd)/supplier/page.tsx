"use client";
import { uiStore } from "@/app/states/ui";
import { api } from "@/trpc/react";
import { DataTable } from "@/components/primitives/data-table";
import { columns } from "./columns";
import CreatePSDButton from "@/components/dashboard/forms/create-button";
import { Pagination } from "@/components/primitives/pagination";
import { Skeleton } from "@/components/primitives/skeleton";
const itemsPerPage = 1;
const PSDSupplierPage = ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const currentOrgId = uiStore.get.currentOrgId();
  const currentPage = Number(searchParams?.page) || 1;
  const Items = api.supplier.getAll.useQuery({ orgId: currentOrgId, page: currentPage, itemsPerPage });
  
  const totalPages = Items.data?.totalPages ?? 0;

  if(Items.isLoading) return <Skeleton className="h-96" />;
  if(Items.error) return <div>Error: {Items.error.message}</div>;
  return (
    <div className="flex w-full flex-col">
      <CreatePSDButton />
      <DataTable columns={columns} data={Items.data?.items ?? []} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default PSDSupplierPage;
