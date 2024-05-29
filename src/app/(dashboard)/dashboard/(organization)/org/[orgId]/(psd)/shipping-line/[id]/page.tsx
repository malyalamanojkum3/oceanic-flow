"use client";

import { api } from "@/trpc/react";
import PSDNameForm from "@/components/dashboard/forms/psd/name-form";
import { Skeleton } from "@/components/primitives/skeleton";
const PSDPortOfLoadingPage = ({ params }: { params: { id: string } }) => {
  const utils = api.useUtils().shippingLine;
  const shippingLine = api.shippingLine.getById.useQuery({
    id: params.id,
  }).data;
  if (!shippingLine) return <Skeleton className="h-96" />;
  return (
    <>
      <PSDNameForm
        defaultValues={shippingLine}
        variant="update"
        apiRoute={api.shippingLine.update}
        checkNameExists={api.shippingLine.checkNameExists}
        utils={utils}
      />
    </>
  );
};

export default PSDPortOfLoadingPage;
