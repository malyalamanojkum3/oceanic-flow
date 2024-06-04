"use client";

import { api } from "@/trpc/react";
import PSDEditForm from "./form";
import { Skeleton } from "@/components/primitives/skeleton";
const ItemEditPage = ({ params }: { params: { id: string } }) => {
  const item = api.item.getById.useQuery({ id: params.id }).data
  if (!item) return <Skeleton className="h-96"/>;
  return (
    <>
      <PSDEditForm defaultValues={item} />
    </>
  );
};

export default ItemEditPage;
