"use client";

import { api } from "@/trpc/react";
import PSDNameForm from "@/components/dashboard/forms/psd/name-form";
import { Skeleton } from "@/components/primitives/skeleton";
const PSDEditPage = ({ params }: { params: { id: string } }) => {
  const utils = api.useUtils().portOfDestination;
  const portOfDestination = api.portOfDestination.getById.useQuery({
    id: params.id,
  }).data;
  if (!portOfDestination) return <Skeleton className="h-96" />;
  return (
    <>
      <PSDNameForm
        defaultValues={portOfDestination}
        variant="update"
        apiRoute={api.portOfDestination.update}
        checkNameExists={api.portOfDestination.checkNameExists}
        utils={utils}
      />
    </>
  );
};

export default PSDEditPage;
