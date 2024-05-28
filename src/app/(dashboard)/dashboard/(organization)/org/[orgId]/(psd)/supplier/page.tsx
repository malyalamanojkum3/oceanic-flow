"use client";
import { useState, useEffect } from 'react';
import { uiStore } from "@/app/states/ui";
import { api } from "@/trpc/react";
import { DataTable } from "@/components/primitives/data-table";
import { columns } from "./columns";
import CreatePSDButton from "@/components/dashboard/forms/create-button";
import { Pagination } from "@/components/primitives/pagination";
const itemsPerPage = 1;
const PSDSupplierPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const currentOrgId = uiStore.get.currentOrgId();
  const Items = api.supplier.getAll.useQuery({ orgId: currentOrgId, page: currentPage, itemsPerPage });
  
  useEffect(() => {
    Items.refetch();
  }, [currentPage]);

  const totalPages = Items.data?.totalPages ?? 0;

  if(Items.isLoading) return <div>Loading...</div>;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  return (
    <div className="flex w-full flex-col">
      <CreatePSDButton />
      <DataTable columns={columns} data={Items.data?.items ?? []} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PSDSupplierPage;
