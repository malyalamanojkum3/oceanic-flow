"use client";

import { api } from "@/trpc/react";
import PSDCompleteForm from "@/components/dashboard/forms/psd/complete-form";
import { Skeleton } from "@/components/primitives/skeleton";  
const PSDEditPage = ({ params }: { params: { id: string } }) => {
  const apiUtils = api.useUtils().customsHouseAgent;
  const customsHouseAgent = api.customsHouseAgent.getById.useQuery({
    id: params.id,
  }).data;
  if (!customsHouseAgent) return <Skeleton className="h-96" />  ;
  return (
    <>
      <PSDCompleteForm
        defaultValues={customsHouseAgent}
        variant="update"
        apiRoute={api.customsHouseAgent.update}
        checkNameExists={api.customsHouseAgent.checkNameExists}
        utils={apiUtils}
      />
    </>
  );
};

export default PSDEditPage;
