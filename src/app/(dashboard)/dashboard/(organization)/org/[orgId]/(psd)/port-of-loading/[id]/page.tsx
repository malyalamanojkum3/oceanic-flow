"use client";

import { api } from "@/trpc/react";
import PSDNameForm from "@/components/dashboard/forms/psd/name-form";

const PSDPortOfLoadingPage = ({ params }: { params: { id: string } }) => {
  const utils = api.useUtils().portOfLoading;
  const portOfLoading = api.portOfLoading.getById.useQuery({
    id: params.id,
  }).data;
  if (!portOfLoading) return <div>Loading</div>;
  return (
    <>
      <PSDNameForm
        defaultValues={portOfLoading}
        variant="update"
        apiRoute={api.portOfLoading.update}
        utils={utils}
      />
    </>
  );
};

export default PSDPortOfLoadingPage;
