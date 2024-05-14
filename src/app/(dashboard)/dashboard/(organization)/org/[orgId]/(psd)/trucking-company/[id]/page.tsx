"use client";

import { api } from "@/trpc/react";
import PSDCompleteForm from "@/components/dashboard/forms/psd/complete-form";

const PSDEditPage = ({ params }: { params: { id: number } }) => {
  const apiUtils = api.useUtils().truckingCompany;
  const truckingCompany = api.truckingCompany.getById.useQuery({
    id: params.id,
  }).data;
  if (!truckingCompany) return <div>Loading</div>;
  return (
    <>
      <PSDCompleteForm
        defaultValues={truckingCompany}
        variant="update"
        apiRoute={api.truckingCompany.update}
        utils={apiUtils}
      />
    </>
  );
};

export default PSDEditPage;
