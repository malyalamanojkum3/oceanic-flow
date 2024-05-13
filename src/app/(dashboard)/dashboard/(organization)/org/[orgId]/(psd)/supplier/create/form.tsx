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
import { supplier } from "@/server/db/schema/psd/supplier";
import { zodResolver } from "@hookform/resolvers/zod";
import { createInsertSchema } from "drizzle-zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { getCountryDataList } from "countries-list";
import { useMemo } from "react";
import { toast } from "sonner";

import * as v from "validator";
import { ArrowLeft, ArrowUpLeftIcon } from "lucide-react";
import Link from "next/link";

function PSDSupplierCreateForm() {
  const countries = useMemo(() => getCountryDataList(), []);

  const insertSupplierSchema = createInsertSchema(supplier, {
    email: z.string().email(),
    phone: z.string().refine(v.isMobilePhone),
  });

  const onSubmit = (values: z.infer<typeof insertSupplierSchema>) => {
    toast.success(JSON.stringify(values));
  };

  const form = useForm<z.infer<typeof insertSupplierSchema>>({
    resolver: zodResolver(insertSupplierSchema),
    defaultValues: {
      type: "supplier",
    },
  });

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
                <FormLabel>Contact Number</FormLabel>
                <FormControl>
                  <Input placeholder="1234-567-890" {...field} />
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
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Bank Details" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Create Supplier</Button>
        </form>
      </Form>
    </>
  );
}
export default PSDSupplierCreateForm;
