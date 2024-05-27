import { uiStore } from "@/app/states/ui";
import { api } from "@/trpc/react";
import { DataTable } from "@/components/primitives/data-table";
import { type ColumnDef } from "@tanstack/react-table";
import { Trash2,MoreHorizontal, } from "lucide-react";
import { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
  } from "@/components/primitives/dropdown-menu";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
  } from "@/components/primitives/select";
import { Button } from "@/components/primitives/button";
import { type Roles } from "@/server/db/schema/organization";
import {  convertRoleToPermission } from "@/lib/permissions";
//import organization value from './
const currentOrgId = uiStore.get.currentOrgId();
const currentOrg = uiStore.get.currentOrg();

type UserData = {
    userId: string;
    name: string | null;
    email: string
    role: string;
  };

const CellAction = ({ row }: { row: 
    {
      original: UserData;
    }
}) => {
const [open, setOpen] = useState(false);
const [selectedRole, setSelectedRole] = useState<Roles>('viewer'); // default role
const updateUserMutation = api.orgs.updateUserFromOrg.useMutation();
const utils = api.useUtils();
const isOwner = row.original.userId === currentOrg.ownerId;
return (
  <DropdownMenu open={open && !isOwner} onOpenChange={setOpen}>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className={`h-8 w-8 p-0 ${isOwner ? 'cursor-default' : ''}`}>
        <span className="sr-only">Open menu</span>
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Update Role</DropdownMenuLabel>
      <form
        onSubmit={async(e) => {
          e.preventDefault();
          try {
            await updateUserMutation.mutateAsync({
              role: selectedRole,
              orgId: currentOrgId,
              userId: row.original.userId,
              permissions: convertRoleToPermission(selectedRole),
            });
           await utils.orgs.getAllOrgUsers.refetch();
          } catch (error) {
            console.error(error);
          }
        }}
      >
        <Select
          value={selectedRole}
          onValueChange={(val) => setSelectedRole(val as Roles)}
        >
          <SelectTrigger className="w-[160px] border-none capitalize">
                          {selectedRole}
                        </SelectTrigger>
        <SelectContent className="w-[160px] outline-none">
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="manager">Manager</SelectItem>
          <SelectItem value="viewer">Viewer</SelectItem>
        </SelectContent>
        </Select>
        <Button className="w-full" type="submit" onClick={()=>{
          setOpen(false);
        }}>
          Update
        </Button>
      </form>
    </DropdownMenuContent>
  </DropdownMenu>
);
}
export const columns: ColumnDef<UserData>[] = [
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
    {
      id: "actions",
      cell: CellAction,
    },
    {
      id: "delete",
      cell: ({ row }) => {
        const utils = api.useUtils();
        const deleteUserOrg = api.orgs.deleteUserFromOrg.useMutation({});
        const isOwner = row.original.userId === currentOrg.ownerId;
        
        return (
          <button
            disabled={isOwner}
            onClick={async (event) => {
              try {
                await deleteUserOrg.mutateAsync({ userId: row.original.userId, orgId: currentOrgId });
                await utils.orgs.getAllOrgUsers.refetch();
              } catch (error) {
                console.error(error);
              }
            }}
            className={`${isOwner ? 'cursor-default text-gray-500' : 'cursor-pointer text-destructive'}`}
          >
            <Trash2 size={20} />
          </button>
        );
      },
    },
  ];
