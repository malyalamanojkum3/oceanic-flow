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
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/primitives/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/primitives/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";

import { getCountryDataList } from "countries-list";
import { useMemo } from "react";

import { api } from "@/trpc/react";
import { insertSupplierSchema } from "@/server/api/routers/psd/schemas.zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { PhoneInput } from "@/components/primitives/phone-input";
import type { Country, Value } from "react-phone-number-input";
import { useEffect } from "react";
import { useCheckExists } from "@/lib/checkExists";

function PSDSupplierEditForm({
  defaultValues,
}: {
  defaultValues: z.infer<typeof insertSupplierSchema>;
}) {
  const countries = useMemo(() => getCountryDataList(), []);
  const router = useRouter();
  const utils = api.useUtils();

  const form = useForm<z.infer<typeof insertSupplierSchema>>({
    resolver: zodResolver(insertSupplierSchema),
    defaultValues: {
      ...defaultValues,
      type: defaultValues.type,
    },
  });

  const update = api.supplier.update.useMutation({
    onSuccess: () => {
      toast.success("Supplier edited successfully.");
      router.push("./");
    },
    onError: () => {
      toast.error("ERORR");
    },
  });
  const checkNameExists = api.supplier.checkNameExists.useMutation();
  useCheckExists(form, 'name', checkNameExists,defaultValues.name,);

  const onSubmit = async (values: z.infer<typeof insertSupplierSchema>) => {
    await update.mutateAsync(values);
    await utils.supplier.getById.invalidate();
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <div className="space-y-2">
                <FormLabel className="">Supplier Type</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-4"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="supplier" />
                      </FormControl>
                      <FormLabel className="font-normal">Supplier</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="broker" />
                      </FormControl>
                      <FormLabel className="font-normal">Broker</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
              </div>
            )}
          />
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
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bank"
            rules={{ required: false}}
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
          <Button type="submit">Save changes</Button>
          <Button type="button" className="ml-2" onClick={() => router.push("./")}>
            Cancel
          </Button>
        </form>
      </Form>
    </>
  );
}
export default PSDSupplierEditForm;
