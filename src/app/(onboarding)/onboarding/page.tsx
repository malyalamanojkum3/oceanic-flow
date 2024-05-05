import DashboardOnboarding from "@/components/dashboard/onboarding";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

const Onboarding = async () => {
  const session = await getServerAuthSession();
  if (!session) redirect("/");
  if (!session.user.hasOnboarded) return <DashboardOnboarding />;
  return redirect("/dashboard");
};

export default Onboarding;
