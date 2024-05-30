"use client";

import { api } from "@/trpc/react";
import PSDNameForm from "@/components/dashboard/forms/psd/name-form";
import { Skeleton } from "@/components/primitives/skeleton";
const PortOfLoadingPage = ({ params }: { params: { id: string } }) => {
  const utils = api.useUtils().placeOfLoading;
  const placeOfLoading = api.placeOfLoading.getById.useQuery({
    id: params.id,
  }).data;
  if (!placeOfLoading) return <Skeleton className="h-96" />;
  return (
    <>
      <PSDNameForm
        defaultValues={placeOfLoading}
        variant="update"
        apiRoute={api.placeOfLoading.update}
        checkNameExists={api.placeOfLoading.checkNameExists}
        utils={utils}
      />
    </>
  );
};

export default PortOfLoadingPage;
