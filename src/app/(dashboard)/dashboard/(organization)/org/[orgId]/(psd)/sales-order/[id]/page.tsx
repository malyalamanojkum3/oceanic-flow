"use client";

import { api } from "@/trpc/react";
import EditForm from "./form";
import { Skeleton } from "@/components/primitives/skeleton";
const SalesOrderEdit = ({ params }: { params: { id: string } }) => {
  const salesOrder = api.salesOrder.getById.useQuery({ id: params.id }).data
  if (!salesOrder) return <Skeleton className="h-96" />;
  return (
    <>
      <EditForm defaultValues={salesOrder} />
    </>
  );
};

export default SalesOrderEdit;
