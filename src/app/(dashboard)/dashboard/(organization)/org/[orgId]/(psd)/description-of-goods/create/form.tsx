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
import { insertDescriptionOfGoodsSchema } from "@/server/api/routers/psd/schemas.zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { uiStore } from "@/app/states/ui";

function PSDDescriptionOfGoodsCreateForm() {
  const router = useRouter();
  const currentOrgId = uiStore.get.currentOrgId();

  const form = useForm<z.infer<typeof insertDescriptionOfGoodsSchema>>({
    resolver: zodResolver(insertDescriptionOfGoodsSchema),
    defaultValues: {
      qualityDescription: undefined,
      mainGrade: undefined,
      hsCode: undefined,
      stream: undefined,
      orgId: currentOrgId,
    },
  });

  const create = api.descriptionOfGoods.create.useMutation({
    onSuccess: () => {
      toast.success("Customs House Agent created successfully.");
      router.push("./");
    },
    onError: () => {
      toast.error("ERORR");
    },
  });

  const onSubmit = (values: z.infer<typeof insertDescriptionOfGoodsSchema>) => {
    create.mutate({ ...values, orgId: currentOrgId });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="qualityDescription"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Quality Description</FormLabel>
                <FormControl>
                  <Input placeholder="Quality Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mainGrade"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Main Grade</FormLabel>
                <FormControl>
                  <Input placeholder="Main Grade" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hsCode"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>HS Code</FormLabel>
                <FormControl>
                  <Input placeholder="HS Code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stream"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Stream</FormLabel>
                <FormControl>
                  <Input placeholder="Stream" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Create Description Of Goods</Button>
        </form>
      </Form>
    </>
  );
}
export default PSDDescriptionOfGoodsCreateForm;
