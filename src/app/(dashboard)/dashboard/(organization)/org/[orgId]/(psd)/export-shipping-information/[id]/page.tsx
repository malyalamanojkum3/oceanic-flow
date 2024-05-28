"use client";

import { api } from "@/trpc/react";
import PSDExportShippingInformationEditForm from "./form";

const SupplierPage = ({ params }: { params: { id: string } }) => {
  const exportShippingInformation =
    api.exportShippingInformation.getById.useQuery({
      id: params.id,
    }).data;
  if (!exportShippingInformation) return <div>Loading</div>;
  return (
    <>
      <PSDExportShippingInformationEditForm
        defaultValues={exportShippingInformation}
      />
    </>
  );
};

export default SupplierPage;
