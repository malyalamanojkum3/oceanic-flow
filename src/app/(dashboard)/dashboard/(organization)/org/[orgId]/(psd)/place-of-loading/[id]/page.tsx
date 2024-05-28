"use client";

import { api } from "@/trpc/react";
import PSDNameForm from "@/components/dashboard/forms/psd/name-form";

const PortOfLoadingPage = ({ params }: { params: { id: string } }) => {
  const utils = api.useUtils().placeOfLoading;
  const placeOfLoading = api.placeOfLoading.getById.useQuery({
    id: params.id,
  }).data;
  if (!placeOfLoading) return <div>Loading</div>;
  return (
    <>
      <PSDNameForm
        defaultValues={placeOfLoading}
        variant="update"
        apiRoute={api.placeOfLoading.update}
        utils={utils}
      />
    </>
  );
};

export default PortOfLoadingPage;
