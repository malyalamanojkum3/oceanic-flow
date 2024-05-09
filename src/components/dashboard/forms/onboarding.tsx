"use client";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/primitives/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/primitives/form";
import { Input } from "@/components/primitives/input";

import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

export const onboardingSchema = z.object({
  organizationName: z.string().min(2).max(32),
});

const DashboardOnboardingForm = () => {
  const router = useRouter();
  const mutateOnboarding = api.orgs.finishOnboarding.useMutation({
    onSettled: () => {
      router.push("/dashboard");
    },
  });
  const onSubmit = (values: z.infer<typeof onboardingSchema>) => {
    mutateOnboarding.mutate({ name: values.organizationName });
  };

  const form = useForm<z.infer<typeof onboardingSchema>>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      organizationName: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="my-8 space-y-8">
        <FormField
          control={form.control}
          name="organizationName"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Organization Name</FormLabel>
              <FormControl>
                <Input placeholder="Acme Inc" {...field} />
              </FormControl>
              <FormDescription>
                This will be your organization&apos;s display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default DashboardOnboardingForm;
