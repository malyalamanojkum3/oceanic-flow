"use client";

import { useUIStore } from "@/app/states/ui";
import { api } from "@/trpc/react";
import { type PropsWithChildren } from "react";
import { useShallow } from "zustand/react/shallow";

const DashboardOrgPage = ({
  params,
}: PropsWithChildren & { params: { orgId: string } }) => {
  const { setCurrentOrgId, setCurrentOrg } = useUIStore(
    useShallow((state) => ({
      setCurrentOrgId: state.setCurrentOrgId,
      setCurrentOrg: state.setCurrentOrg,
    })),
  );
  setCurrentOrgId(params.orgId);

  const currentOrg = api.orgs.getOrgById.useQuery({ id: params.orgId }).data;
  if (currentOrg) setCurrentOrg(currentOrg);
  return <></>;
};
export default DashboardOrgPage;
