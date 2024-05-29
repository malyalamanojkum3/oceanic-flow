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
function PSDSalesOrderCreateForm() {
  const router = useRouter();
  const currentOrgId = uiStore.get.currentOrgId();
  const form = useForm<z.infer<typeof insertSalesOrderSchema>>({
    resolver: zodResolver(insertSalesOrderSchema),
    defaultValues: {
      id: undefined,
      specialTerms: undefined,
      orgId: currentOrgId,
    },
  });
  const create = api.salesOrder.create.useMutation({
    onSuccess: () => {
      toast.success("Sales Order created successfully.");
      router.push("./");
    },
    onError: () => {
      toast.error("ERORR");
    },
  });
  const checkNameExists = api.salesOrder.checkNameExists.useMutation();
  useCheckExists(form, 'specialTerms', checkNameExists);

  const onSubmit = (values: z.infer<typeof insertSalesOrderSchema>) => {
    create.mutate({ ...values, orgId: currentOrgId });
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
export default PSDSalesOrderCreateForm;
