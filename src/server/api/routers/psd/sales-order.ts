import { createTRPCRouter, protectedProcedure } from "../../trpc";

import { TRPCError } from "@trpc/server";

import { z } from "zod";
import { insertSalesOrderSchema } from "./schemas.zod";
import { eq } from "drizzle-orm";
import { salesOrder } from "@/server/db/schema/psd/sales-order";

export const salesOrderRouter = createTRPCRouter({
  create: protectedProcedure
    .input(insertSalesOrderSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.insert(salesOrder).values(input);
      } catch (err) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: err });
      }
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.coerce.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(salesOrder)
        .where(eq(salesOrder.id, input.id))
        .returning({ name: salesOrder.specialTerms });
    }),
  update: protectedProcedure
    .input(insertSalesOrderSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(salesOrder)
        .set(input)
        .where(eq(salesOrder.id, Number(input.id)))
        .returning({ salesOrder });
    }),
  getAll: protectedProcedure
    .input(z.object({ orgId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.db.query.salesOrder.findMany({
          where: (salesOrder, { eq }) => eq(salesOrder.orgId, input.orgId),
        });
      } catch (err) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: err });
      }
    }),
  getById: protectedProcedure
    .input(z.object({ id: z.coerce.number() }))
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.db.query.salesOrder.findFirst({
          where: (salesOrder, { eq }) => eq(salesOrder.id, input.id),
        });
      } catch (err) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: err });
      }
    }),
});
