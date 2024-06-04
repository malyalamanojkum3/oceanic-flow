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
import { useForm, useFieldArray } from "react-hook-form";
import { type z } from "zod";
import { TextArea } from "@/components/primitives/text-area";
import { api } from "@/trpc/react";
import { insertItemSchema } from "@/server/api/routers/psd/schemas.zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { uiStore } from "@/app/states/ui";
import { useCheckExists } from "@/lib/checkExists";

function PSDCreateForm() {
  const router = useRouter();
  const currentOrgId = uiStore.get.currentOrgId();

  const form = useForm<z.infer<typeof insertItemSchema>>({
    resolver: zodResolver(insertItemSchema),
    defaultValues: {
      name: undefined,
      notes: [],
      orgId: currentOrgId,
    },
  });
  
  const{ control } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "notes" as never
  });

  const create = api.item.create.useMutation({
    onSuccess: () => {
      toast.success("Item created successfully.");
      router.push("./");
    },
    onError: () => {
      toast.error("ERORR");
    },
  });
  const checkNameExists = api.item.checkNameExists.useMutation();
  useCheckExists(form, 'name', checkNameExists);

  const onSubmit = (values: z.infer<typeof insertItemSchema>) => {
    create.mutate({ ...values, orgId: currentOrgId });
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

          {fields.map((item, index) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name={`notes.${index}`}
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel>Note {index + 1}</FormLabel>
                        <div style={{ display: 'flex', alignItems: 'center',gap: '10px' }}>
                          <FormControl>
                            <TextArea placeholder={`Note ${index + 1}`} {...field} />
                          </FormControl>
                          <Button type="button" onClick={() => remove(index)}>
                            Remove
                          </Button>
                        </div>
                      </FormItem>
                    )}
                  />
                ))}
          <div>
            <Button type="button" onClick={() => append("")}>Add Note</Button>
          </div>
        
          <Button type="submit" >Create Item</Button>
          <Button type="button" className="ml-2" onClick={() => router.push("./")}>
            Cancel
          </Button>
        </form>
      </Form>
    </>
  );
}
export default PSDCreateForm;
