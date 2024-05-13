"use client";

import { uiStore } from "@/app/states/ui";
import { api } from "@/trpc/react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { type PropsWithChildren } from "react";

const DashboardOrgLayout = ({
  children,
  params,
}: PropsWithChildren & { params: { orgId: string } }) => {
  const router = useRouter();
  uiStore.set.currentOrgId(params.orgId);

  const isAllowed = api.orgs.isUserOrg.useQuery({ orgId: params.orgId });

  if (!isAllowed.data && isAllowed.data !== undefined) {
    router.push("/dashboard");
  }

  if (uiStore.get.currentOrgId() !== params.orgId || !!uiStore.get.currentOrg) {
    const currentOrg = api.orgs.getOrgById.useQuery(
      { id: params.orgId },
      { enabled: isAllowed.data },
    ).data;
    if (currentOrg) uiStore.set.currentOrg(currentOrg);
  }

  if (isAllowed.isLoading)
    return (
      <div className="grid h-full w-full items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );

  return <>{children}</>;
};

export default DashboardOrgLayout;
