"use client";

import { uiStore } from "@/app/states/ui";
import { Button } from "@/components/primitives/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/primitives/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/primitives/sheet";
import { type insertGeneralCompleteSchema } from "@/server/api/routers/psd/schemas.zod";
import { api } from "@/trpc/react";
import { type Row, type ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { z } from "zod";

const CellAction = ({
  row,
}: {
  row: Row<z.infer<typeof insertGeneralCompleteSchema>>;
}) => {
  const router = useRouter();
  const pn = usePathname();
  const cells = {
    ...row.original,
    orgId: z.string().optional().parse(row.original.orgId),
  };
  delete cells.orgId;
  delete cells.id;

  return (
    <Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <SheetTrigger>
            <DropdownMenuItem>View Freight Forwarder</DropdownMenuItem>
          </SheetTrigger>

          <DropdownMenuItem
            onClick={() => router.push(`${pn}/${row.original.id}`)}
          >
            Edit Freight Forwarder
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <SheetContent className="flex flex-col">
        {Object.keys(cells).map((key, index) => {
          return (
            <div key={index} className="space-y-4">
              <h2 className="text-lg font-bold capitalize">{key}</h2>
              <span>{cells[key as keyof typeof cells]}</span>
            </div>
          );
        })}
      </SheetContent>
    </Sheet>
  );
};

export const columns: ColumnDef<z.infer<typeof insertGeneralCompleteSchema>>[] =
  [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "countryCode",
      header: "Country",
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      id: "actions",
      cell: CellAction,
    },
    {
      id: "delete",
      cell: ({ row }) => {
        const utils = api.useUtils();
        const del = api.freightForwarder.delete.useMutation({
          onSuccess: async () => {
            await utils.freightForwarder.getAll.refetch();
          },
        });

        return (
          <Trash2
            size={20}
            onClick={async () => {
              del.mutate({
                id: row.original.id!,
                orgId: uiStore.get.currentOrgId(),
              });
            }}
            className="cursor-pointer text-destructive"
          />
        );
      },
    },
  ];
