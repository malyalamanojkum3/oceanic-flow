"use client";
import { uiStore } from "@/app/states/ui";
import { api } from "@/trpc/react";
import { DataTable } from "@/components/primitives/data-table";
import { columns } from "./columns";
import { Skeleton } from "@/components/primitives/skeleton";
const UsersPage = () => {
  const currentOrgId = uiStore.get.currentOrgId();
    const users = api.orgs.getPageItemsOrgUsers.useQuery({ id: currentOrgId }); 
    if(users.isLoading) return <Skeleton className="h-96" />;

    const flattenedData = users.data?.map(({ user, role,userId }) => ({
      userId: userId,  
      name: user?.name,
        email: user?.email,
        role,
      })) ?? [];  
  
    return (
    <div className="flex w-full flex-col mt-10">
      <DataTable columns={columns} data={flattenedData} />
    </div>
  );
};

export default UsersPage;