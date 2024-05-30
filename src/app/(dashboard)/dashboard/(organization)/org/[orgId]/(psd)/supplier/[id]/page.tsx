"use client";

import { api } from "@/trpc/react";
import PSDSupplierEditForm from "./form";
import { Skeleton } from "@/components/primitives/skeleton";
const SupplierPage = ({ params }: { params: { id: string } }) => {
  const supplier = api.supplier.getById.useQuery({ id: params.id }).data
  if (!supplier) return <Skeleton className="h-96"/>;
  return (
    <>
      <PSDSupplierEditForm defaultValues={supplier} />
    </>
  );
};

export default SupplierPage;
