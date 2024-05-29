"use client";

import { api } from "@/trpc/react";
import PSDCompleteForm from "@/components/dashboard/forms/psd/complete-form";
import { Skeleton } from "@/components/primitives/skeleton";
const PSDEditPage = ({ params }: { params: { id: string}  }) => {
  const apiUtils = api.useUtils().freightForwarder;
  const freightForwarders = api.freightForwarder.getById.useQuery({
    id: params.id,
  }).data;
  if (!freightForwarders) return <Skeleton className="h-96" />;
  return (
    <>
      <PSDCompleteForm
        defaultValues={freightForwarders}
        variant="update"
        apiRoute={api.freightForwarder.update}
        checkNameExists={api.freightForwarder.checkNameExists}  
        utils={apiUtils}
      />
    </>
  );
};

export default PSDEditPage;
