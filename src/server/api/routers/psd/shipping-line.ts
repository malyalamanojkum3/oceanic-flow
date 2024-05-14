import { createTRPCRouter, protectedProcedure } from "../../trpc";

import { TRPCError } from "@trpc/server";

import { z } from "zod";
import { insertShippingLineSchema } from "./schemas.zod";
import { eq } from "drizzle-orm";
import { shippingLine } from "@/server/db/schema/psd/shipping-line";

export const shippingLineRouter = createTRPCRouter({
  create: protectedProcedure
    .input(insertShippingLineSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.insert(shippingLine).values(input);
      } catch (err) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: err });
      }
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.coerce.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(shippingLine)
        .where(eq(shippingLine.id, input.id))
        .returning({ name: shippingLine.name });
    }),
  update: protectedProcedure
    .input(insertShippingLineSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(shippingLine)
        .set(input)
        .where(eq(shippingLine.id, Number(input.id)))
        .returning({ shippingLine });
    }),
  getAll: protectedProcedure
    .input(z.object({ orgId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.db.query.shippingLine.findMany({
          where: (shippingLine, { eq }) => eq(shippingLine.orgId, input.orgId),
        });
      } catch (err) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: err });
      }
    }),
  getById: protectedProcedure
    .input(z.object({ id: z.coerce.number() }))
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.db.query.shippingLine.findFirst({
          where: (shippingLine, { eq }) => eq(shippingLine.id, input.id),
        });
      } catch (err) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: err });
      }
    }),
});
