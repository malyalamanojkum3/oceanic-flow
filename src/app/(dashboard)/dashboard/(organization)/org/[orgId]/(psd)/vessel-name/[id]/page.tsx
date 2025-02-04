"use client";

import { api } from "@/trpc/react";
import PSDNameForm from "@/components/dashboard/forms/psd/name-form";
import { Skeleton } from "@/components/primitives/skeleton";
const PSDEditPage = ({ params }: { params: { id: string } }) => {
  const utils = api.useUtils().vesselName;
  const vesselName = api.vesselName.getById.useQuery({
    id: params.id,
  }).data;
  if (!vesselName) return <Skeleton className="h-96" />;
  return (
    <>
      <PSDNameForm
        defaultValues={vesselName}
        variant="update"
        apiRoute={api.vesselName.update}
        checkNameExists={api.vesselName.checkNameExists}
        utils={utils}
      />
    </>
  );
};

export default PSDEditPage;
