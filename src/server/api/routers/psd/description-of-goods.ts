import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { TRPCError } from "@trpc/server";

import { z } from "zod";
import { insertDescriptionOfGoodsSchema } from "./schemas.zod";
import { eq } from "drizzle-orm";
import { descriptionOfGoods } from "@/server/db/schema/psd/descriptions-of-goods";

export const descriptionOfGoodsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(insertDescriptionOfGoodsSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.insert(descriptionOfGoods).values(input);
      } catch (err) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: err });
      }
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.coerce.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(descriptionOfGoods)
        .where(eq(descriptionOfGoods.id, input.id));
    }),
  update: protectedProcedure
    .input(insertDescriptionOfGoodsSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(descriptionOfGoods)
        .set(input)
        .where(eq(descriptionOfGoods.id, Number(input.id)))
        .returning({ descriptionOfGoods });
    }),
  getAll: protectedProcedure
    .input(z.object({ orgId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.db.query.descriptionOfGoods.findMany({
          where: (descriptionOfGoods, { eq }) =>
            eq(descriptionOfGoods.orgId, input.orgId),
        });
      } catch (err) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: err });
      }
    }),
  getById: protectedProcedure
    .input(z.object({ id: z.coerce.number() }))
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.db.query.descriptionOfGoods.findFirst({
          where: (descriptionOfGoods, { eq }) =>
            eq(descriptionOfGoods.id, input.id),
        });
      } catch (err) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: err });
      }
    }),
});
