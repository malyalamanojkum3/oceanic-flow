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
import { useCheckExists } from "@/lib/checkExists";
function PSDDescriptionOfGoodsEditForm({
  defaultValues,
}: {
  defaultValues: z.infer<typeof insertDescriptionOfGoodsSchema>;
}) {
  const router = useRouter();
  const utils = api.useUtils();

  const form = useForm<z.infer<typeof insertDescriptionOfGoodsSchema>>({
    resolver: zodResolver(insertDescriptionOfGoodsSchema),
    defaultValues: {
      ...defaultValues,
    },
  });

  const update = api.descriptionOfGoods.update.useMutation({
    onSuccess: () => {
      toast.success("Customs House Agent created successfully.");
      router.push("./");
    },
    onError: () => {
      toast.error("ERORR");
    },
  });
  const checkNameExists = api.descriptionOfGoods.checkNameExists.useMutation();
  useCheckExists(form, 'qualityDescription', checkNameExists,defaultValues.qualityDescription);


  const onSubmit = async (
    values: z.infer<typeof insertDescriptionOfGoodsSchema>,
  ) => {
    update.mutate(values);
    await utils.descriptionOfGoods.getById.invalidate();
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
          <Button type="button" className="ml-2" onClick={() => router.push("./")}>
            Cancel
          </Button>
        </form>
      </Form>
    </>
  );
}
export default PSDDescriptionOfGoodsEditForm;
