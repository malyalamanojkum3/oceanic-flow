"use client";

import PSDCompleteForm from "@/components/dashboard/forms/psd/complete-form";
import { api } from "@/trpc/react";

const PSDPage = () => {
  return (
    <div className="mx-auto max-w-4xl">
      <PSDCompleteForm
        variant="create"
        formName="Freight Forwarder"
        apiRoute={api.freightForwarder.create}
        checkNameExists={api.freightForwarder.checkNameExists}
      />
    </div>
  );
};

export default PSDPage;
