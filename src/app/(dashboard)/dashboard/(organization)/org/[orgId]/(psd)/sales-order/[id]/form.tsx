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
import { insertSalesOrderSchema } from "@/server/api/routers/psd/schemas.zod";
import { useRouter } from "next/navigation";
import { uiStore } from "@/app/states/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { type z } from "zod";
import { useCheckExists } from "@/lib/checkExists";
function PSDSalesOrderEditForm({
  defaultValues,
}: {
  defaultValues: z.infer<typeof insertSalesOrderSchema>;
}) {
  const router = useRouter();
  const utils = api.useUtils();
  const currentOrgId = uiStore.get.currentOrgId();
  const form = useForm<z.infer<typeof insertSalesOrderSchema>>({
    resolver: zodResolver(insertSalesOrderSchema),
    defaultValues: {
      ...defaultValues,
    },
  });
  const update = api.salesOrder.update.useMutation({
    onSuccess: () => {
      toast.success("Sales Order edited successfully.");
      router.push("./");
    },
    onError: () => {
      toast.error("ERORR");
    },
  });
  const checkNameExists = api.salesOrder.checkNameExists.useMutation();
  useCheckExists(form, 'specialTerms', checkNameExists, defaultValues.specialTerms);

  const onSubmit = async(values: z.infer<typeof insertSalesOrderSchema>) => {
    await update.mutateAsync(values);
    await utils.salesOrder.getById.invalidate();
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="specialTerms"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Special Terms</FormLabel>
                <FormControl>
                  <Input placeholder="Special Terms" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Create Sales Order</Button>
          <Button type="button" className="ml-2" onClick={() => router.push("./")}>
            Cancel
          </Button>
        </form>
      </Form>
    </>
  );
}
export default PSDSalesOrderEditForm;
