"use client";

import { uiStore } from "@/app/states/ui";
import { Button } from "@/components/primitives/button";
import { Skeleton } from "@/components/primitives/skeleton";
import { ACCESS } from "@/lib/permissions";
import { api } from "@/trpc/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const CreatePSDButton = () => {
  const pn = usePathname();
  const currentOrgId = uiStore.use.currentOrgId();
  const query = api.orgs.getUserPermission.useQuery({ id: currentOrgId });
  if (query.isLoading) return <Skeleton className="h-6 w-12" />;
  if (!query.data) return <></>;
  console.log(query.data.permissions);
  if (!!(query.data.permissions & ACCESS.write))
    return (
      <Link className="ml-auto" href={`${pn}/create`}>
        <Button className="my-2" size={"lg"}>
          Create
        </Button>
      </Link>
    );
};

export default CreatePSDButton;
