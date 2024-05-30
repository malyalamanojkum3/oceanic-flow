"use client";

import { api } from "@/trpc/react";
import PSDNameForm from "@/components/dashboard/forms/psd/name-form";

const PSDShippingLinePage = () => {
  return (
    <>
      <PSDNameForm
        variant="create"
        formName="Shipping Line"
        apiRoute={api.shippingLine.create}
        checkNameExists={api.shippingLine.checkNameExists}
      />
    </>
  );
};

export default PSDShippingLinePage;
