"use client";

import PSDCompleteForm from "@/components/dashboard/forms/psd/complete-form";
import { api } from "@/trpc/react";

const PSDCreatePage = () => {
  return (
    <div className="mx-auto max-w-4xl">
      <PSDCompleteForm
        variant="create"
        formName="PSIC Agency"
        apiRoute={api.PSICAgency.create}
      />
    </div>
  );
};

export default PSDCreatePage;
