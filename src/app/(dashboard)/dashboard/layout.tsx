import DashboardOnboarding from "@/components/dashboard/onboarding";
import DashboardSideBar from "@/components/dashboard/side-bar";
import DashboardTopBar from "@/components/dashboard/top-bar";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const DashboardLayout = async ({ children }: Props) => {
  const session = await getServerAuthSession();
  if (!session || !session.user) redirect("/");
  if (!session?.user.hasOnborded) {
    redirect("/onboarding");
  }
  return (
    <main className="flex h-screen w-full flex-row">
      <DashboardSideBar />
      <div className="w-full">
        <DashboardTopBar session={session} />
        {children}
      </div>
    </main>
  );
};

export default DashboardLayout;
