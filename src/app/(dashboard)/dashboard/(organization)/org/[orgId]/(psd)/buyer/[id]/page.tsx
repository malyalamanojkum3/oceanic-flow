"use client";

import { api } from "@/trpc/react";
import PSDBuyerEditForm from "./form";
import { Skeleton } from "@/components/primitives/skeleton";
const BuyerEditPage = ({ params }: { params: { id: string } }) => {
  const buyer = api.buyer.getById.useQuery({ id: params.id }).data
  if (!buyer) return <Skeleton className="h-96" />;
  return (
    <>
      <PSDBuyerEditForm defaultValues={buyer} />
    </>
  );
};

export default BuyerEditPage;
