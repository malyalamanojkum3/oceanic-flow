"use client";

import { api } from "@/trpc/react";
import EditForm from "./form";
const SalesOrderEdit = ({ params }: { params: { id: number } }) => {
  const salesOrder = api.salesOrder.getById.useQuery({ id: params.id }).data
  if (!salesOrder) return <div>Loading</div>;
  return (
    <>
      <EditForm defaultValues={salesOrder} />
    </>
  );
};

export default SalesOrderEdit;
