"use client";

import { api } from "@/trpc/react";
import PSDNameForm from "@/components/dashboard/forms/psd/name-form";

const PSDEditPage = ({ params }: { params: { id: number } }) => {
  const utils = api.useUtils().vesselName;
  const vesselName = api.vesselName.getById.useQuery({
    id: params.id,
  }).data;
  if (!vesselName) return <div>Loading</div>;
  return (
    <>
      <PSDNameForm
        defaultValues={vesselName}
        variant="update"
        apiRoute={api.vesselName.update}
        utils={utils}
      />
    </>
  );
};

export default PSDEditPage;
