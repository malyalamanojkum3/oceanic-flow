"use client";

import { uiStore } from "@/app/states/ui";
import { api } from "@/trpc/react";
import { DataTable } from "@/components/primitives/data-table";
import { type ColumnDef } from "@tanstack/react-table";
type UserData = {
    name: string | null;
    email: string
    role: string;
  };

const UsersPage = () => {
  const currentOrgId = uiStore.get.currentOrgId();
    const users = api.orgs.getAllOrgUsers.useQuery({ id: currentOrgId }); 
    if(users.isLoading) return <div>Loading...</div>;

    const flattenedData = users.data?.map(({ user, role }) => ({
        name: user?.name,
        email: user?.email,
        role,
      })) ?? [];  
  const columns: ColumnDef<UserData>[] = [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Role",
      accessorKey: "role",
    },
  ];
    return (
    <div className="flex w-full flex-col">
      <DataTable columns={columns} data={flattenedData} />
    </div>
  );
};

export default UsersPage;