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
import { api } from "@/trpc/react";
import { insertItemSchema } from "@/server/api/routers/psd/schemas.zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useCheckExists } from "@/lib/checkExists";
import { TextArea } from "@/components/primitives/text-area";
function PSDItemEditForm({
  defaultValues,
}: {
  defaultValues: z.infer<typeof insertItemSchema>;
}) {
  const router = useRouter();
  const utils = api.useUtils();

  const form = useForm<z.infer<typeof insertItemSchema>>({
    resolver: zodResolver(insertItemSchema),
    defaultValues: {
      ...defaultValues,
    },
  });
  const{ control } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "notes" as never
  });

  const update = api.item.update.useMutation({
    onSuccess: () => {
      toast.success("Item edited successfully.");
      router.push("./");
    },
    onError: () => {
      toast.error("ERORR");
    },
  });
  const checkNameExists = api.item.checkNameExists.useMutation();
  useCheckExists(form, 'name', checkNameExists,defaultValues.name,);

  const onSubmit = async (values: z.infer<typeof insertItemSchema>) => {
    await update.mutateAsync(values);
    await utils.item.getById.invalidate();
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
          
          <Button type="submit">Save changes</Button>
          <Button type="button" className="ml-2" onClick={() => router.push("./")}>
            Cancel
          </Button>
        </form>
      </Form>
    </>
  );
}
export default PSDItemEditForm;
