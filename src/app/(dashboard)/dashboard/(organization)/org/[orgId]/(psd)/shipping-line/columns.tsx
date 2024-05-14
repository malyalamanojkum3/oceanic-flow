"use client";

import { Button } from "@/components/primitives/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/primitives/dropdown-menu";
import { type insertShippingLineSchema } from "@/server/api/routers/psd/schemas.zod";
import { api } from "@/trpc/react";
import { type ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { type z } from "zod";

const CellAction = ({ row }: { row: any }) => {
  const router = useRouter();
  const pn = usePathname();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => router.push(`${pn}/${row.original.id!}`)}
        >
          View & edit
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columns: ColumnDef<z.infer<typeof insertShippingLineSchema>>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    id: "actions",
    cell: CellAction,
  },
  {
    id: "delete",
    cell: ({ row }) => {
      const utils = api.useUtils();
      const del = api.shippingLine.delete.useMutation({});

      return (
        <Trash2
          size={20}
          onClick={async () => {
            del.mutate({ id: row.original.id! });
            await utils.shippingLine.getAll.refetch();
          }}
          className="cursor-pointer text-destructive"
        />
      );
    },
  },
];
