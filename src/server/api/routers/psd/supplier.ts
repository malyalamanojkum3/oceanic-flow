import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { supplier } from "@/server/db/schema/psd/supplier";
import { TRPCError } from "@trpc/server";

import { z } from "zod";
import { insertSupplierSchema } from "./schemas.zod";
import { eq } from "drizzle-orm";
export const supplierRouter = createTRPCRouter({
  create: protectedProcedure
    .input(insertSupplierSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.insert(supplier).values(input);
      } catch (err) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: err });
      }
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.coerce.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(supplier)
        .where(eq(supplier.id, input.id))
        .returning({ name: supplier.name });
    }),
  update: protectedProcedure
    .input(insertSupplierSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(supplier)
        .set(input)
        .where(eq(supplier.id, Number(input.id)))
        .returning({ supplier });
    }),
  getAll: protectedProcedure
    .input(z.object({ orgId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.db.query.supplier.findMany({
          where: (supplier, { eq }) => eq(supplier.orgId, input.orgId),
        });
      } catch (err) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: err });
      }
    }),
  getById: protectedProcedure
    .input(z.object({ id: z.coerce.number() }))
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.db.query.supplier.findFirst({
          where: (supplier, { eq }) => eq(supplier.id, input.id),
        });
      } catch (err) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: err });
      }
    }),
});
