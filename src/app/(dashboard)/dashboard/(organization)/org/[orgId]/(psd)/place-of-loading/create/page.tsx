"use client";

import React from "react";
import PSDNameForm from "@/components/dashboard/forms/psd/name-form";
import { api } from "@/trpc/react";
const PSDTruckingCreate = () => {
  return (
    <div className="mx-auto max-w-4xl">
      <PSDNameForm
        variant="create"
        formName="Place of Loading"
        apiRoute={api.placeOfLoading.create}
        checkNameExists={api.placeOfLoading.checkNameExists}
      />
    </div>
  );
};

export default PSDTruckingCreate;
