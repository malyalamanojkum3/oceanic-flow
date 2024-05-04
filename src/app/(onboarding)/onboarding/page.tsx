import DashboardOnboarding from "@/components/dashboard/onboarding";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

const Onboarding = async (props: Props) => {
  const session = await getServerAuthSession();
  if (!session) redirect("/");
  if (!session.user.hasOnboarded) return <DashboardOnboarding />;
  return redirect("/dashboard");
};

export default Onboarding;
