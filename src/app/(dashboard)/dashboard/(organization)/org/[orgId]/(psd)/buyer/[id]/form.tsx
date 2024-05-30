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
import { insertBuyerSchema } from "@/server/api/routers/psd/schemas.zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { PhoneInput } from "@/components/primitives/phone-input";
import type { Country, Value } from "react-phone-number-input";
import { uiStore } from "@/app/states/ui";
import { useCheckExists } from "@/lib/checkExists";
function PSDSupplierEditForm({
  defaultValues,
}: {
  defaultValues: z.infer<typeof insertBuyerSchema>;
}) {
  const countries = useMemo(() => getCountryDataList(), []);
  const router = useRouter();
  const utils = api.useUtils();
  const currentOrgId = uiStore.get.currentOrgId();
  const customsHouseAgents = api.customsHouseAgent.getAll.useQuery({ orgId: currentOrgId });
  const portOfDestinations = api.portOfDestination.getAll.useQuery({ orgId: currentOrgId });

  const form = useForm<z.infer<typeof insertBuyerSchema>>({
    resolver: zodResolver(insertBuyerSchema),
    defaultValues: {
      ...defaultValues,
    },
  });

  const update = api.buyer.update.useMutation({
    onSuccess: () => {
      toast.success("Buyer edited successfully.");
      router.push("./");
    },
    onError: () => {
      toast.error("ERORR");
    },
  });
  const checkNameExists = api.buyer.checkNameExists.useMutation();
  useCheckExists(form, 'name', checkNameExists, defaultValues.name);

  const onSubmit = async (values: z.infer<typeof insertBuyerSchema>) => {
    await update.mutateAsync(values);
    await utils.buyer.getById.invalidate();
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
                    value={field.value}
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
            rules={{
              required: false
            }}
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
         <FormField
            control={form.control}
            name="proFormaInvoiceRequired"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Pro Forma Invoice Required</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => field.onChange(value === 'true')}
                    defaultValue={field.value?.toString()}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select True or False" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true" >True</SelectItem>
                      <SelectItem value="false" >False</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="customsHouseAgentId"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Customs House Agent</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a Customs House Agent" />
                    </SelectTrigger>
                    <SelectContent>
                      {customsHouseAgents.data?.map((customsHouseAgent) => (
                        <SelectItem key={customsHouseAgent.id} value={customsHouseAgent.id}>
                          {customsHouseAgent.name}
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
            name="cifOrCnf"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>CIF/CNF</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select CIF/CNF" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CIF">CIF</SelectItem>
                      <SelectItem value="CNF">CNF</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="preferredCurrency"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Preferred Currency</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Preferred Currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="CAD">CAD</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="portOfDestinationId"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Port Preference</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a Port Preference" />
                    </SelectTrigger>
                    <SelectContent>
                      {portOfDestinations.data?.map((portOfDestination) => (
                        <SelectItem key={portOfDestination.id} value={portOfDestination.id}>
                          {portOfDestination.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Save Changes</Button>
          <Button type="button" className="ml-2" onClick={() => router.push("./")}>
            Cancel
          </Button>
        </form>
      </Form>
    </>
  );
}
export default PSDSupplierEditForm;
