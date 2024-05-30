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
import type { AppRouterUtilsLike, AppRouterLike } from "@/server/api/root";
import { insertGeneralCompleteSchema } from "@/server/api/routers/psd/schemas.zod";
import { useCheckExists } from "@/lib/checkExists"; 
import { use, useMemo } from "react";
import { getCountryDataList } from "countries-list";
import { PhoneInput } from "@/components/primitives/phone-input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/primitives/select";
import type { Country, Value } from "react-phone-number-input";

type Props =
  | {
      defaultValues?: z.infer<typeof insertGeneralCompleteSchema>;
      variant: "create";
      formName: string;
      apiRoute: AppRouterLike[
        | "freightForwarder"
        | "truckingCompany"
        | "customsHouseAgent"
        | "PSICAgency"]["create"];
      checkNameExists: AppRouterLike[
        | "freightForwarder"
        | "truckingCompany"
        | "customsHouseAgent"
        | "PSICAgency"]["checkNameExists"];
      utils?: AppRouterUtilsLike[
        | "freightForwarder"
        | "truckingCompany"
        | "customsHouseAgent"
        | "PSICAgency"];
    }
  | {
      defaultValues: z.infer<typeof insertGeneralCompleteSchema>;
      variant: "update";
      formName?: string;
      apiRoute: AppRouterLike[
        | "freightForwarder"
        | "truckingCompany"
        | "customsHouseAgent"
        | "PSICAgency"]["update"];
      checkNameExists: AppRouterLike[
        | "freightForwarder"
        | "truckingCompany"
        | "customsHouseAgent"
        | "PSICAgency"]["checkNameExists"];
      utils: AppRouterUtilsLike[
        | "freightForwarder"
        | "truckingCompany"
        | "customsHouseAgent"
        | "PSICAgency"];
    };

const PSDCompleteForm = (props: Props) => {
  const countries = useMemo(() => getCountryDataList(), []);
  const router = useRouter();
  const currentOrgId = uiStore.get.currentOrgId();
  const { formName, utils } = props;

  const form = useForm<z.infer<typeof insertGeneralCompleteSchema>>({
    resolver: zodResolver(insertGeneralCompleteSchema),
    defaultValues: {
      name: undefined,
      email: undefined,
      countryCode: undefined,
      phone: undefined,
      address: undefined,
      bank: undefined,
      orgId: currentOrgId,
      ...props.defaultValues,
    },
  });

  const call = props.apiRoute.useMutation({
    onSuccess: () => {
      toast.success(
        `${formName} ${props.variant === "create" ? "created" : "updated"} successfully.`,
      );
      router.push("./");
    },
    onError: () => {
      toast.error("ERROR");
    },
  });
   const api = props.checkNameExists.useMutation();
   useCheckExists(form, 'name', api, props.defaultValues?.name);
  const onSubmit = async (
    values: z.infer<typeof insertGeneralCompleteSchema>,
  ) => {
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
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="countryCode"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.iso2} value={country.iso2}>
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <PhoneInput
                    defaultCountry={form.watch("countryCode") as Country}
                    placeholder="Phone Number"
                    value={field.value as Value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bank"
            rules={{ required: false }}
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Bank Details</FormLabel>
                <FormControl>
                  <Input placeholder="Bank Details" {...field} />
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

export default PSDCompleteForm;
