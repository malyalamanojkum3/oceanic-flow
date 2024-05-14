import { createTRPCRouter, protectedProcedure } from "../../trpc";

import { TRPCError } from "@trpc/server";

import { z } from "zod";
import { insertPlaceOfDeliverySchema } from "./schemas.zod";
import { eq } from "drizzle-orm";
import { placeOfDelivery } from "@/server/db/schema/psd/place-of-delivery";

export const placeOfDeliveryRouter = createTRPCRouter({
  create: protectedProcedure
    .input(insertPlaceOfDeliverySchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.insert(placeOfDelivery).values(input);
      } catch (err) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: err });
      }
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.coerce.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(placeOfDelivery)
        .where(eq(placeOfDelivery.id, input.id))
        .returning({ name: placeOfDelivery.name });
    }),
  update: protectedProcedure
    .input(insertPlaceOfDeliverySchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(placeOfDelivery)
        .set(input)
        .where(eq(placeOfDelivery.id, Number(input.id)))
        .returning({ placeOfDelivery });
    }),
  getAll: protectedProcedure
    .input(z.object({ orgId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.db.query.placeOfDelivery.findMany({
          where: (placeOfDelivery, { eq }) =>
            eq(placeOfDelivery.orgId, input.orgId),
        });
      } catch (err) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: err });
      }
    }),
  getById: protectedProcedure
    .input(z.object({ id: z.coerce.number() }))
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.db.query.placeOfDelivery.findFirst({
          where: (placeOfDelivery, { eq }) => eq(placeOfDelivery.id, input.id),
        });
      } catch (err) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: err });
      }
    }),
});
