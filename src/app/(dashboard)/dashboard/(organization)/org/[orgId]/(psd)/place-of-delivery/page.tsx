"use client";
import { uiStore } from "@/app/states/ui";
import { api } from "@/trpc/react";
import { DataTable } from "@/components/primitives/data-table";
import { columns } from "./columns";
import CreatePSDButton from "@/components/dashboard/forms/create-button";
import { Pagination } from "@/components/primitives/pagination";
import { Skeleton } from "@/components/primitives/skeleton";
import SearchBar from "@/components/dashboard/search-bar";
import { Label } from "@/components/primitives/label";
const itemsPerPage = 5;
const PSDPage = ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const currentOrgId = uiStore.get.currentOrgId();
  const currentPage = Number(searchParams?.page) || 1;
  const query = searchParams?.query ?? "";
  const Items = api.placeOfDelivery.getPageItems.useQuery({ orgId: currentOrgId, page: currentPage, itemsPerPage, query });
  
  const totalPages = Items.data?.totalPages ?? 0;

  if(Items.isLoading) return <Skeleton className="h-96" />;
  if(Items.error) return <div>Error: {Items.error.message}</div>;
  return (
    <div className="flex w-full flex-col mt-0 pt-0">
      <Label className="text-3xl font-semibold mt-0 pt-0">Place of Delivery</Label>
      <div className="mt-2" 
      style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <SearchBar />
        <CreatePSDButton />
      </div>
      <DataTable columns={columns} data={Items.data?.items ?? []} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
};
export default PSDPage;