"use client";

import { api } from "@/trpc/react";
import PSDBuyerEditForm from "./form";
const BuyerEditPage = ({ params }: { params: { id: string } }) => {
  const buyer = api.buyer.getById.useQuery({ id: params.id }).data
  if (!buyer) return <div>Loading</div>;
  return (
    <>
      <PSDBuyerEditForm defaultValues={buyer} />
    </>
  );
};

export default BuyerEditPage;
