"use client";

import { api } from "@/trpc/react";
import PSDNameForm from "@/components/dashboard/forms/psd/name-form";
import { Skeleton } from "@/components/primitives/skeleton";
const PSDPortOfLoadingPage = ({ params }: { params: { id: string } }) => {
  const utils = api.useUtils().portOfLoading;
  const portOfLoading = api.portOfLoading.getById.useQuery({
    id: params.id,
  }).data;
  if (!portOfLoading) return <Skeleton className="h-96" />;
  return (
    <>
      <PSDNameForm
        defaultValues={portOfLoading}
        variant="update"
        apiRoute={api.portOfLoading.update}
        checkNameExists={api.portOfLoading.checkNameExists}
        utils={utils}
      />
    </>
  );
};

export default PSDPortOfLoadingPage;
