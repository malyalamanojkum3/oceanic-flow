"use client";

import { api } from "@/trpc/react";
import PSDCompleteForm from "@/components/dashboard/forms/psd/complete-form";

const PSDEditPage = ({ params }: { params: { id: string}  }) => {
  const apiUtils = api.useUtils().freightForwarder;
  const freightForwarders = api.freightForwarder.getById.useQuery({
    id: params.id,
  }).data;
  if (!freightForwarders) return <div>Loading</div>;
  return (
    <>
      <PSDCompleteForm
        defaultValues={freightForwarders}
        variant="update"
        apiRoute={api.freightForwarder.update}
        utils={apiUtils}
      />
    </>
  );
};

export default PSDEditPage;
