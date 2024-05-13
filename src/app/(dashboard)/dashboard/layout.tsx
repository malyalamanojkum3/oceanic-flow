import dynamic from "next/dynamic";

import DashboardTopBar from "@/components/dashboard/top-bar";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import { type ReactNode } from "react";
import DashboardSideBar from "@/components/dashboard/side-bar";

type Props = {
  children: ReactNode;
};

const DashboardLayout = async ({ children }: Props) => {
  const session = await getServerAuthSession();
  if (!session || !session.user) redirect("/");
  if (!session?.user.hasOnboarded) {
    redirect("/onboarding");
  }
  return (
    <main className="flex h-screen w-full flex-row">
      <DashboardSideBar />
      <div className="w-full">
        <DashboardTopBar session={session} />
        <div className="mx-auto max-w-7xl p-8">{children}</div>
      </div>
    </main>
  );
};

export default DashboardLayout;
