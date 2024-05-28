"use client";

import { api } from "@/trpc/react";
import PSDSupplierEditForm from "./form";
const SupplierPage = ({ params }: { params: { id: string } }) => {
  const supplier = api.supplier.getById.useQuery({ id: params.id }).data
  if (!supplier) return <div>Loading</div>;
  return (
    <>
      <PSDSupplierEditForm defaultValues={supplier} />
    </>
  );
};

export default SupplierPage;
