"use client";

import React from "react";
import PSDNameForm from "@/components/dashboard/forms/psd/name-form";
import { api } from "@/trpc/react";

const PSDCreatePage = () => {
  return (
    <div className="mx-auto max-w-4xl">
      <PSDNameForm
        variant="create"
        formName="Port of Loading"
        apiRoute={api.portOfDestination.create}
        checkNameExists={api.portOfDestination.checkNameExists}
      />
    </div>
  );
};

export default PSDCreatePage;
