import { createTRPCRouter, protectedProcedure } from "../../trpc";

import { TRPCError } from "@trpc/server";

import { z } from "zod";
import { insertVesselNameSchema } from "./schemas.zod";
import { eq } from "drizzle-orm";
import { vesselName } from "@/server/db/schema/psd/vessel-name";

export const vesselNameRouter = createTRPCRouter({
  create: protectedProcedure
    .input(insertVesselNameSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.insert(vesselName).values(input);
      } catch (err) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: err });
      }
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.coerce.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(vesselName)
        .where(eq(vesselName.id, input.id))
        .returning({ name: vesselName.name });
    }),
  update: protectedProcedure
    .input(insertVesselNameSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(vesselName)
        .set(input)
        .where(eq(vesselName.id, Number(input.id)))
        .returning({ vesselName });
    }),
  getAll: protectedProcedure
    .input(z.object({ orgId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.db.query.vesselName.findMany({
          where: (vesselName, { eq }) => eq(vesselName.orgId, input.orgId),
        });
      } catch (err) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: err });
      }
    }),
  getById: protectedProcedure
    .input(z.object({ id: z.coerce.number() }))
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.db.query.vesselName.findFirst({
          where: (vesselName, { eq }) => eq(vesselName.id, input.id),
        });
      } catch (err) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: err });
      }
    }),
});
