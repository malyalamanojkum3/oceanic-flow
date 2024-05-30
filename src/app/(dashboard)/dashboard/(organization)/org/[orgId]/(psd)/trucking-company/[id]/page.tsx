"use client";

import { api } from "@/trpc/react";
import PSDCompleteForm from "@/components/dashboard/forms/psd/complete-form";
import { Skeleton } from "@/components/primitives/skeleton";
const PSDEditPage = ({ params }: { params: { id: string } }) => {
  const apiUtils = api.useUtils().truckingCompany;
  const truckingCompany = api.truckingCompany.getById.useQuery({
    id: params.id,
  }).data;
  if (!truckingCompany) return <Skeleton className="h-96" />;
  return (
    <>
      <PSDCompleteForm
        defaultValues={truckingCompany}
        variant="update"
        apiRoute={api.truckingCompany.update}
        utils={apiUtils}
        checkNameExists={api.truckingCompany.checkNameExists}
      />
    </>
  );
};

export default PSDEditPage;
