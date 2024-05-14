import { createTRPCRouter, protectedProcedure } from "../../trpc";

import { TRPCError } from "@trpc/server";

import { z } from "zod";
import { insertPlaceOfLoadingSchema } from "./schemas.zod";
import { eq } from "drizzle-orm";
import { placeOfLoading } from "@/server/db/schema/psd/place-of-loading";

export const placeOfLoadingRouter = createTRPCRouter({
  create: protectedProcedure
    .input(insertPlaceOfLoadingSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.insert(placeOfLoading).values(input);
      } catch (err) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: err });
      }
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.coerce.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(placeOfLoading)
        .where(eq(placeOfLoading.id, input.id))
        .returning({ name: placeOfLoading.name });
    }),
  update: protectedProcedure
    .input(insertPlaceOfLoadingSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(placeOfLoading)
        .set(input)
        .where(eq(placeOfLoading.id, Number(input.id)))
        .returning({ placeOfLoading });
    }),
  getAll: protectedProcedure
    .input(z.object({ orgId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.db.query.placeOfLoading.findMany({
          where: (placeOfLoading, { eq }) =>
            eq(placeOfLoading.orgId, input.orgId),
        });
      } catch (err) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: err });
      }
    }),
  getById: protectedProcedure
    .input(z.object({ id: z.coerce.number() }))
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.db.query.placeOfLoading.findFirst({
          where: (placeOfLoading, { eq }) => eq(placeOfLoading.id, input.id),
        });
      } catch (err) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: err });
      }
    }),
});
