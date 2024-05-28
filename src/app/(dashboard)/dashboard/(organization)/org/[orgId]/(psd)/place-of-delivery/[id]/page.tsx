"use client";

import { api } from "@/trpc/react";
import PSDNameForm from "@/components/dashboard/forms/psd/name-form";

const PSDEditPage = ({ params }: { params: { id: string } }) => {
  const utils = api.useUtils().placeOfDelivery;
  const placeOfDelivery = api.placeOfDelivery.getById.useQuery({
    id: params.id,
  }).data;
  if (!placeOfDelivery) return <div>Loading</div>;
  return (
    <>
      <PSDNameForm
        defaultValues={placeOfDelivery}
        variant="update"
        apiRoute={api.placeOfDelivery.update}
        utils={utils}
      />
    </>
  );
};

export default PSDEditPage;
