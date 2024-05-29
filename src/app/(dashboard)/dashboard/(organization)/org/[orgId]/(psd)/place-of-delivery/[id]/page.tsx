"use client";

import { api } from "@/trpc/react";
import PSDNameForm from "@/components/dashboard/forms/psd/name-form";
import { Skeleton } from "@/components/primitives/skeleton";
const PSDEditPage = ({ params }: { params: { id: string } }) => {
  const utils = api.useUtils().placeOfDelivery;
  const placeOfDelivery = api.placeOfDelivery.getById.useQuery({
    id: params.id,
  }).data;
  if (!placeOfDelivery) return <Skeleton className="h-96" />;
  return (
    <>
      <PSDNameForm
        defaultValues={placeOfDelivery}
        variant="update"
        apiRoute={api.placeOfDelivery.update}
        checkNameExists={api.placeOfDelivery.checkNameExists} 
        utils={utils}
      />
    </>
  );
};

export default PSDEditPage;
