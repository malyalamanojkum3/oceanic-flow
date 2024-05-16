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
    <main className="flex h-screen w-full flex-row overflow-y-hidden">
      <DashboardSideBar />
      <div className="h-full w-full">
        <DashboardTopBar session={session} />
        <div className="no-scrollbar h-[calc(100%-6rem)] w-full overflow-y-scroll">
          <div className="mx-auto max-w-7xl p-8 pb-0">{children}</div>
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
