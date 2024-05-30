"use client";

import React from "react";
import PSDNameForm from "@/components/dashboard/forms/psd/name-form";
import { api } from "@/trpc/react";

const PSDPortOfLoadingPage = () => {
  return (
    <div className="mx-auto max-w-4xl">
      <PSDNameForm
        variant="create"
        formName="Port of Loading"
        apiRoute={api.portOfLoading.create}
        checkNameExists={api.portOfLoading.checkNameExists}
      />
    </div>
  );
};

export default PSDPortOfLoadingPage;
