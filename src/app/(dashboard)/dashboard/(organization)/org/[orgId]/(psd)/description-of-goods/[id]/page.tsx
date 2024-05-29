"use client";

import { api } from "@/trpc/react";
import PSDDescriptionOfGoodsEditForm from "./form";
import { Skeleton } from "@/components/primitives/skeleton";
const SupplierPage = ({ params }: { params: { id: string } }) => {
  const descriptionOfGoods = api.descriptionOfGoods.getById.useQuery({
    id: params.id,
  }).data;
  if (!descriptionOfGoods) return <Skeleton className="h-96"  />;
  return (
    <>
      <PSDDescriptionOfGoodsEditForm defaultValues={descriptionOfGoods} />
    </>
  );
};

export default SupplierPage;
