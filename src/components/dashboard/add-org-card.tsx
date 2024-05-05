"use client";

import { CirclePlus } from "lucide-react";

import {
  Credenza,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "../responsive-modal";
import AddOrganizationForm from "./forms/add-org";

const AddOrganizationCard = () => {
  return (
    <Credenza>
      <CredenzaTrigger className="col-span-1">
        <div className="grid h-24 w-full cursor-pointer items-center justify-center rounded border border-dashed border-border bg-transparent">
          <div className="flex gap-2">
            <CirclePlus />
            <span>Create an Orgnization</span>
          </div>
        </div>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Create an Organization</CredenzaTitle>
          <CredenzaDescription>
            Choose a name for your organization and submit it.
          </CredenzaDescription>
        </CredenzaHeader>
        <AddOrganizationForm />
      </CredenzaContent>
    </Credenza>
  );
};

export default AddOrganizationCard;
