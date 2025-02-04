"use client";

import { api } from "@/trpc/react";
import PSDCompleteForm from "@/components/dashboard/forms/psd/complete-form";
import { Skeleton } from "@/components/primitives/skeleton";
const PSDEditPage = ({ params }: { params: { id: string } }) => {
  const apiUtils = api.useUtils().PSICAgency;
  const PSICAgency = api.PSICAgency.getById.useQuery({
    id: params.id,
  }).data;
  if (!PSICAgency) return <Skeleton className="h-96" /> ;
  return (
    <>
      <PSDCompleteForm
        defaultValues={PSICAgency}
        variant="update"
        apiRoute={api.PSICAgency.update}
        utils={apiUtils}
        checkNameExists={api.PSICAgency.checkNameExists}
      />
    </>
  );
};

export default PSDEditPage;
