import { Badge } from "../primitives/badge";
import { Button } from "../primitives/button";
import {
  Credenza,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "../responsive-modal";
import AddOrganizationForm from "./forms/add-org";

import Link from "next/link";

import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/primitives/dropdown-menu";
import { ChevronsUpDown } from "lucide-react";
import Image from "next/image";

import { api } from "@/trpc/react";
import { uiStore } from "@/app/states/ui";

const SelectOrganizationsDropdown = () => {
  const utils = api.useUtils();
  const toggle = uiStore.get.sideBarToggled();
  const queryOrgs = api.orgs.getUserOrgs.useQuery();
  const currentOrg = uiStore.use.currentOrg();

  return (
    <Credenza>
      <DropdownMenu>
        <DropdownMenuTrigger className="mt-4 w-full rounded border border-border bg-background p-2 px-4 lg:mt-0">
          <div className="flex flex-row items-center gap-2">
            <Image
              src="/REPLACE_ME.svg"
              alt="REPLACE ALT DESC"
              width={24}
              height={24}
            />
            <span className="font-medium">{currentOrg.name}</span>
            <ChevronsUpDown className="ml-auto" size={16} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full min-w-[270px]">
          <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">
            Organizations
          </DropdownMenuLabel>
          {!queryOrgs.data?.length && (
            <DropdownMenuLabel className="text-center text-[0.75rem]">
              Currently no organizations.
            </DropdownMenuLabel>
          )}
          {queryOrgs.data?.map(({ role, organizations: { id, name } }) => (
            <Link
              onClick={async () => {
                uiStore.set.sideBarToggled(!toggle);
                await utils.orgs.getUserPermission.refetch();
              }}
              key={id}
              href={{
                pathname: `/dashboard/org/${id}/overview`,
              }}
            >
              <DropdownMenuItem>
                {name}
                <Badge className="ml-auto capitalize">{role}</Badge>
              </DropdownMenuItem>
            </Link>
          ))}
          <DropdownMenuItem className="cursor-default hover:bg-transparent focus:bg-transparent">
            <CredenzaTrigger asChild className="w-full">
              <Button variant={"dashed"} size={"sm"} className="w-full">
                Create an Organization
              </Button>
            </CredenzaTrigger>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
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

export default SelectOrganizationsDropdown;
