"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/primitives/form";
import { Button } from "@/components/primitives/button";
import { Input } from "@/components/primitives/input";
import { api } from "@/trpc/react";
import { CredenzaClose } from "@/components/responsive-modal";
import { toast } from "sonner";

export const newOrgSchema = z.object({
  organizationName: z.string().min(2).max(32),
});

const AddOrganizationForm = () => {
  const utils = api.useUtils();
  const mutation = api.orgs.create.useMutation({
    onSuccess: async () => {
      toast.success(`Created organization succesfully.`);
    },
    onError: () => {
      toast.error(
        `An error occured while creating your organization. Please try again later.`,
      );
    },
    onSettled: async () => {
      await utils.orgs.getUserOrgs.invalidate();
    },
  });

  const onSubmit = (values: z.infer<typeof newOrgSchema>) => {
    mutation.mutate({ name: values.organizationName });
  };

  const form = useForm<z.infer<typeof newOrgSchema>>({
    resolver: zodResolver(newOrgSchema),
    defaultValues: {
      organizationName: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 p-4 lg:p-0"
      >
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
        <CredenzaClose asChild className="w-full">
          <Button
            disabled={mutation.isPending}
            type="submit"
            className="w-full"
          >
            Create
          </Button>
        </CredenzaClose>
      </form>
    </Form>
  );
};

export default AddOrganizationForm;
