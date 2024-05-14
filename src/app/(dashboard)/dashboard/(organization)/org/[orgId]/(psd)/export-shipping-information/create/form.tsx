"use client";

import { Button } from "@/components/primitives/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/primitives/form";
import { Input } from "@/components/primitives/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";

import { api } from "@/trpc/react";
import { insertExportShippingInformationSchema } from "@/server/api/routers/psd/schemas.zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { uiStore } from "@/app/states/ui";

function PSDExportShippingInformationCreateForm() {
  const router = useRouter();
  const currentOrgId = uiStore.get.currentOrgId();

  const form = useForm<z.infer<typeof insertExportShippingInformationSchema>>({
    resolver: zodResolver(insertExportShippingInformationSchema),
    defaultValues: {
      shipper: undefined,
      notifyParty: undefined,
      consignee: undefined,
      billOfLandingNotes: undefined,
      orgId: currentOrgId,
    },
  });

  const create = api.exportShippingInformation.create.useMutation({
    onSuccess: () => {
      toast.success("Export Shipping Information created successfully.");
      router.push("./");
    },
    onError: () => {
      toast.error("ERORR");
    },
  });

  const onSubmit = (
    values: z.infer<typeof insertExportShippingInformationSchema>,
  ) => {
    create.mutate({ ...values, orgId: currentOrgId });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="shipper"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Shipper</FormLabel>
                <FormControl>
                  <Input placeholder="Shipper" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="notifyParty"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Notify Party</FormLabel>
                <FormControl>
                  <Input placeholder="Notify Party" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="consignee"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Consignee</FormLabel>
                <FormControl>
                  <Input placeholder="Consignee" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="billOfLandingNotes"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Bill of Landing Notes</FormLabel>
                <FormControl>
                  <Input placeholder="Bill of Landing Notes" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Create Export Shipping Information</Button>
        </form>
      </Form>
    </>
  );
}
export default PSDExportShippingInformationCreateForm;
