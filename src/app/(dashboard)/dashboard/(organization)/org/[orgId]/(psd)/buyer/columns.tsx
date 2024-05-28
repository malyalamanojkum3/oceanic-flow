"use client";

import { Button } from "@/components/primitives/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/primitives/dropdown-menu";
import { type insertBuyerSchema } from "@/server/api/routers/psd/schemas.zod";
import { api } from "@/trpc/react";
import { type ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { type z } from "zod";
import { uiStore } from "@/app/states/ui";
const currentOrgId = uiStore.get.currentOrgId();
interface Buyer {
  id: string;
  name: string;
  email: string;
  countryCode: string;
  phone: string;
  address: string;
  bank: string;
  cifOrCnf: string;
  preferredCurrency: string;
  customsHouseAgent: string;
  portPreference: string;
}
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
          View & edit supplier
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columns: ColumnDef<Buyer>[]= [

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
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "bank",
    header: "Bank Details",
  },
  //cifOrCnf
  {
    accessorKey: "cifOrCnf",
    header: "CIF/CNF",
  },
  //preferredCurrency
  {
    accessorKey: "preferredCurrency",
    header: "Preferred Currency",
  },
  //customsHouseAgent
  {
    accessorKey: "customsHouseAgent",
    header: "Customs House Agent",
  },
  //proFormaInvoice
  {
    accessorKey: "proFormaInvoiceRequired",
    header: "Pro Forma Invoice",
  },
  //portOfDestination
  {
    accessorKey: "portPreference",
    header: "Port Preference",
  },
  {
    id: "actions",
    cell: CellAction,
  },
  {
    id: "delete",
    cell: ({ row }) => {
      const utils = api.useUtils();
      const deleteSupplier = api.supplier.delete.useMutation({});

      return (
        <Trash2
          size={20}
          onClick={async () => {
            deleteSupplier.mutate({ id: row.original.id, orgId: currentOrgId });
            await utils.supplier.getAll.refetch();
          }}
          className="cursor-pointer text-destructive"
        />
      );
    },
  },
   
  
];
