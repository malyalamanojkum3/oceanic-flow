import { createTRPCRouter, protectedProcedure } from "../../trpc";

import { TRPCError } from "@trpc/server";

import { z } from "zod";
import { insertPSICAgencySchema } from "./schemas.zod";
import { eq } from "drizzle-orm";
import { PSICAgency } from "@/server/db/schema/psd/psic-agency";

export const PSICAgencyRouter = createTRPCRouter({
  create: protectedProcedure
    .input(insertPSICAgencySchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.insert(PSICAgency).values(input);
      } catch (err) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: err });
      }
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.coerce.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(PSICAgency)
        .where(eq(PSICAgency.id, input.id))
        .returning({ name: PSICAgency.name });
    }),
  update: protectedProcedure
    .input(insertPSICAgencySchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(PSICAgency)
        .set(input)
        .where(eq(PSICAgency.id, Number(input.id)))
        .returning({ PSICAgency });
    }),
  getAll: protectedProcedure
    .input(z.object({ orgId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.db.query.PSICAgency.findMany({
          where: (PSICAgency, { eq }) => eq(PSICAgency.orgId, input.orgId),
        });
      } catch (err) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: err });
      }
    }),
  getById: protectedProcedure
    .input(z.object({ id: z.coerce.number() }))
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.db.query.PSICAgency.findFirst({
          where: (PSICAgency, { eq }) => eq(PSICAgency.id, input.id),
        });
      } catch (err) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: err });
      }
    }),
});
