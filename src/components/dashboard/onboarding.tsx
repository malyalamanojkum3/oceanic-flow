import Image from "next/image";
import DashboardOnboardingForm from "./forms/onboarding";

const DashboardOnboarding = () => {
  return (
    <main className="grid h-screen items-center justify-center">
      <div className="">
        <Image
          className="mx-auto my-4"
          src="/REPLACE_ME.svg"
          alt="Oceanic Flow Logo"
          width={64}
          height={64}
        />
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary">
            Welcome to Oceanic Flow
          </h1>
          <p className="text-muted-foreground">
            To get started, please type your organization name below
          </p>
        </div>

        <DashboardOnboardingForm />
      </div>
    </main>
  );
};

export default DashboardOnboarding;
