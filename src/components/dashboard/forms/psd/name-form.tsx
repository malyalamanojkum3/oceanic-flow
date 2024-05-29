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

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { uiStore } from "@/app/states/ui";
import type { AppRouterLike, AppRouterUtilsLike } from "@/server/api/root";
import { insertGeneralNameSchema } from "@/server/api/routers/psd/schemas.zod";
import { useCheckExists } from "@/lib/checkExists";
type Props =
  | {
      defaultValues?: z.infer<typeof insertGeneralNameSchema>;
      variant: "create";
      formName: string;
      apiRoute: AppRouterLike[
        | "portOfLoading"
        | "placeOfLoading"
        | "portOfDestination"
        | "vesselName"
        | "shippingLine"]["create" | "update"];
      checkNameExists: AppRouterLike[
        | "portOfLoading"
        | "placeOfLoading"
        | "portOfDestination"
        | "vesselName"
        | "shippingLine"]["checkNameExists"];
      utils?: AppRouterUtilsLike[
        | "portOfLoading"
        | "placeOfLoading"
        | "portOfDestination"
        | "vesselName"
        | "shippingLine"];
    }
  | {
      defaultValues: z.infer<typeof insertGeneralNameSchema>;
      variant: "update";
      formName?: string;
      apiRoute: AppRouterLike[
        | "portOfLoading"
        | "placeOfLoading"
        | "portOfDestination"
        | "vesselName"
        | "shippingLine"]["create" | "update"];
      checkNameExists: AppRouterLike[
        | "portOfLoading"
        | "placeOfLoading"
        | "portOfDestination"
        | "vesselName"
        | "shippingLine"]["checkNameExists"];
      utils: AppRouterUtilsLike[
        | "portOfLoading"
        | "placeOfLoading"
        | "portOfDestination"
        | "vesselName"
        | "shippingLine"];
    };

const PSDNameForm = (props: Props) => {
  const router = useRouter();
  const currentOrgId = uiStore.get.currentOrgId();
  const { formName, utils } = props;

  const form = useForm<z.infer<typeof insertGeneralNameSchema>>({
    resolver: zodResolver(insertGeneralNameSchema),
    defaultValues: {
      name: undefined,
      orgId: currentOrgId,
      ...props.defaultValues,
    },
  });

  const call = props.apiRoute.useMutation({
    onSuccess: () => {
      toast.success(`${formName} created successfully.`);
      router.push("./");
    },
    onError: () => {
      toast.error("ERROR");
    },
  });
  const api = props.checkNameExists.useMutation();
   useCheckExists(form, 'name', api, props.defaultValues?.name);

  const onSubmit = async (values: z.infer<typeof insertGeneralNameSchema>) => {
    await call.mutateAsync(values);
    if (!utils) return;
    await utils.getById.invalidate();
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            {props.variant === "create" ? `Create ${formName}` : "Save changes"}
          </Button>
          <Button type="button" className="ml-2" onClick={() => router.push("./")}>
            Cancel
          </Button>
        </form>
      </Form>
    </>
  );
};

export default PSDNameForm;
