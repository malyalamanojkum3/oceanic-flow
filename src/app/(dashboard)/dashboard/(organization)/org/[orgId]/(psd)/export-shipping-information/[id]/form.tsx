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
import { useCheckExists } from "@/lib/checkExists";
function PSDExportShippingInformationEditForm({
  defaultValues,
}: {
  defaultValues: z.infer<typeof insertExportShippingInformationSchema>;
}) {
  const router = useRouter();
  const utils = api.useUtils();

  const form = useForm<z.infer<typeof insertExportShippingInformationSchema>>({
    resolver: zodResolver(insertExportShippingInformationSchema),
    defaultValues: {
      ...defaultValues,
    },
  });

  const update = api.exportShippingInformation.update.useMutation({
    onSuccess: () => {
      toast.success("Export Shipping Information created successfully.");
      router.push("./");
    },
    onError: () => {
      toast.error("ERORR");
    },
  });
  const checkNameExists = api.exportShippingInformation.checkNameExists.useMutation();
  useCheckExists(form, 'shipper', checkNameExists,defaultValues.shipper);


  const onSubmit = async (
    values: z.infer<typeof insertExportShippingInformationSchema>,
  ) => {
    await update.mutateAsync(values);
    await utils.exportShippingInformation.getById.invalidate();
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
          <Button type="submit">Create Description Of Goods</Button>
          <Button type="button" className="ml-2" onClick={() => router.push("./")}>
            Cancel
          </Button>
        </form>
      </Form>
    </>
  );
}
export default PSDExportShippingInformationEditForm;
