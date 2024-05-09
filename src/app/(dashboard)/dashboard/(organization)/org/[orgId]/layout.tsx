"use client";

import { useUIStore } from "@/app/states/ui";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { type PropsWithChildren } from "react";
import { useShallow } from "zustand/react/shallow";

const DarhboardOrgLayout = ({
  children,
  params,
}: PropsWithChildren & { params: { orgId: string } }) => {
  const router = useRouter();

  const isAllowed = api.orgs.isUserOrg.useQuery({ orgId: params.orgId });

  if (!isAllowed.data && isAllowed.data !== undefined) {
    router.push("/dashboard");
  }

  const currentOrg = api.orgs.getOrgById.useQuery(
    { id: params.orgId },
    { enabled: isAllowed.data },
  );

  const { setCurrentOrgId, setCurrentOrg } = useUIStore(
    useShallow((state) => ({
      setCurrentOrgId: state.setCurrentOrgId,
      setCurrentOrg: state.setCurrentOrg,
    })),
  );
  setCurrentOrgId(params.orgId);
  if (currentOrg.data) setCurrentOrg(currentOrg.data);

  if (isAllowed.isLoading) return <div>Loading...</div>;

  return <>{children}</>;
};

export default DarhboardOrgLayout;
