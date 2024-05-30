"use client";

import { api } from "@/trpc/react";
import PSDExportShippingInformationEditForm from "./form";
import { Skeleton } from "@/components/primitives/skeleton";
const SupplierPage = ({ params }: { params: { id: string } }) => {
  const exportShippingInformation =
    api.exportShippingInformation.getById.useQuery({
      id: params.id,
    }).data;
  if (!exportShippingInformation) return <Skeleton className="h-96" />;
  return (
    <>
      <PSDExportShippingInformationEditForm
        defaultValues={exportShippingInformation}
      />
    </>
  );
};

export default SupplierPage;
