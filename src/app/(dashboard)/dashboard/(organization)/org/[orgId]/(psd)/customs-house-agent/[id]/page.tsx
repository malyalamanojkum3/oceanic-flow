"use client";

import { api } from "@/trpc/react";
import PSDCompleteForm from "@/components/dashboard/forms/psd/complete-form";

const PSDEditPage = ({ params }: { params: { id: number } }) => {
  const apiUtils = api.useUtils().customsHouseAgent;
  const customsHouseAgent = api.customsHouseAgent.getById.useQuery({
    id: params.id,
  }).data;
  if (!customsHouseAgent) return <div>Loading</div>;
  return (
    <>
      <PSDCompleteForm
        defaultValues={customsHouseAgent}
        variant="update"
        apiRoute={api.customsHouseAgent.update}
        utils={apiUtils}
      />
    </>
  );
};

export default PSDEditPage;
