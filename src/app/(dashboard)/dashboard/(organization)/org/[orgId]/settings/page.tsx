"use client";

import Image from "next/image";

import { Button } from "@/components/primitives/button";
import { Form, FormField, FormItem } from "@/components/primitives/form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandList,
  CommandItem,
  CommandGroup,
} from "@/components/primitives/command";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "@/trpc/react";
import { Loader2 } from "lucide-react";
import { useState } from "react";

import { type Roles } from "@/server/db/schema/organization";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/primitives/select";
import { useShallow } from "zustand/react/shallow";
import { toast } from "sonner";
import { uiStore } from "@/app/states/ui";

const addUserSchema = z.object({
  email: z.string().email(),
});

const DashboardOrgSettingsPage = () => {
  const form = useForm<z.infer<typeof addUserSchema>>({
    resolver: zodResolver(addUserSchema),
    defaultValues: {
      email: "",
    },
  });

  const queryUsers = api.users.getManyByEmail.useQuery(
    {
      email: form.watch("email"),
    },
    { enabled: form.watch("email") ? true : false },
  );

  const [select, setSelect] = useState<boolean>(false);
  const [value, setValue] = useState<Roles>("viewer");

  const currentOrgId = uiStore.get.currentOrgId();

  const userToOrgMutation = api.users.addUserToOrg.useMutation({
    onSuccess: () => {
      toast.success("Added user successfully.");
    },
    onError: () => {
      toast.error("Internal server error, please try again later.");
    },
  });

  return (
    <div className="flex w-full flex-col space-y-8 md:flex-row md:space-x-8 md:space-y-0">
      <div className="w-full md:w-1/2">
        <h2 className="text-xl font-bold">Members</h2>
        <p className="text-sm">
          Type an email of an user you wish to add to your organization, manage
          their roles or remove them.
        </p>
      </div>
      <Form {...form}>
        <form className="w-full space-y-2 md:w-1/2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Command
                  shouldFilter={false}
                  className="w-full border border-border"
                >
                  <div className="flex w-full gap-1">
                    <CommandInput
                      value={field.value}
                      onValueChange={async (value) => {
                        form.setValue("email", value);
                        setSelect(false);
                      }}
                      placeholder="Search user by email..."
                    >
                      <Select
                        value={value}
                        onValueChange={(val) => setValue(val as Roles)}
                      >
                        <SelectTrigger className="w-[160px] border-none capitalize">
                          {value}
                        </SelectTrigger>
                        <SelectContent className="w-[160px] outline-none">
                          <SelectItem value="viewer">Viewer</SelectItem>
                          <SelectItem value="manager">Manager</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </CommandInput>
                  </div>

                  <CommandList>
                    {queryUsers.isLoading && (
                      <CommandEmpty>
                        <Loader2 className="mx-auto animate-spin" />
                      </CommandEmpty>
                    )}
                    {queryUsers.data?.length === 0 && !queryUsers.isLoading && (
                      <CommandEmpty>No user found.</CommandEmpty>
                    )}
                    {queryUsers.data &&
                      !select &&
                      queryUsers.data.length === 1 && (
                        <CommandGroup heading="Users">
                          {queryUsers.data?.map((user) => (
                            <CommandItem
                              keywords={[user.email]}
                              key={user.id}
                              className="flex gap-2"
                              onSelect={async (value) => {
                                form.setValue("email", value);
                                setSelect(true);
                              }}
                            >
                              <Image
                                src={user.image!}
                                className="rounded-full"
                                height={24}
                                width={24}
                                alt={user.name + "avatar"}
                              />
                              <span className="text-xs">{user.email}</span>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      )}
                  </CommandList>
                </Command>
              </FormItem>
            )}
          />
          <Button
            onClick={(e) => {
              e.preventDefault();
              userToOrgMutation.mutate({
                email: form.getValues("email"),
                orgId: currentOrgId,
                role: value,
              });
            }}
            className="w-full"
            type="submit"
          >
            Add user to organization
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default DashboardOrgSettingsPage;
