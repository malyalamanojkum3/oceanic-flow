"use client";

import { api } from "@/trpc/react";
import PSDDescriptionOfGoodsEditForm from "./form";

const SupplierPage = ({ params }: { params: { id: number } }) => {
  const descriptionOfGoods = api.descriptionOfGoods.getById.useQuery({
    id: params.id,
  }).data;
  if (!descriptionOfGoods) return <div>Loading</div>;
  return (
    <>
      <PSDDescriptionOfGoodsEditForm defaultValues={descriptionOfGoods} />
    </>
  );
};

export default SupplierPage;
