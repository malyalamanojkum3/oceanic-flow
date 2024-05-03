"use server";

import { onboardingSchema } from "./onboarding-form";
import { getServerAuthSession } from "@/server/auth";

export const finishOnboarding = async (formData: FormData) => {
  const session = getServerAuthSession();
  const { organizationName } = onboardingSchema.parse(formData);
};
