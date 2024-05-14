"use client";

import { api } from "@/trpc/react";
import PSDNameForm from "@/components/dashboard/forms/psd/name-form";

const PSDPortOfLoadingPage = ({ params }: { params: { id: number } }) => {
  const utils = api.useUtils().shippingLine;
  const shippingLine = api.shippingLine.getById.useQuery({
    id: params.id,
  }).data;
  if (!shippingLine) return <div>Loading</div>;
  return (
    <>
      <PSDNameForm
        defaultValues={shippingLine}
        variant="update"
        apiRoute={api.shippingLine.update}
        utils={utils}
      />
    </>
  );
};

export default PSDPortOfLoadingPage;
