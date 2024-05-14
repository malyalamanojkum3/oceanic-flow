"use client";

import { api } from "@/trpc/react";
import PSDCompleteForm from "@/components/dashboard/forms/psd/complete-form";

const PSDEditPage = ({ params }: { params: { id: number } }) => {
  const apiUtils = api.useUtils().PSICAgency;
  const PSICAgency = api.PSICAgency.getById.useQuery({
    id: params.id,
  }).data;
  if (!PSICAgency) return <div>Loading</div>;
  return (
    <>
      <PSDCompleteForm
        defaultValues={PSICAgency}
        variant="update"
        apiRoute={api.PSICAgency.update}
        utils={apiUtils}
      />
    </>
  );
};

export default PSDEditPage;
