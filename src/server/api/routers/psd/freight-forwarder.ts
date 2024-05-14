import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { freightForwarder } from "@/server/db/schema/psd/freight-forwarder";
import { TRPCError } from "@trpc/server";

import { z } from "zod";
import { insertFreightForwarderSchema } from "./schemas.zod";
import { eq } from "drizzle-orm";

export const freightForwarderRouter = createTRPCRouter({
  create: protectedProcedure
    .input(insertFreightForwarderSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.insert(freightForwarder).values(input);
      } catch (err) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: err });
      }
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.coerce.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(freightForwarder)
        .where(eq(freightForwarder.id, input.id))
        .returning({ name: freightForwarder.name });
    }),
  update: protectedProcedure
    .input(insertFreightForwarderSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(freightForwarder)
        .set(input)
        .where(eq(freightForwarder.id, Number(input.id)))
        .returning({ freightForwarder });
    }),
  getAll: protectedProcedure
    .input(z.object({ orgId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.db.query.freightForwarder.findMany({
          where: (freightForwarder, { eq }) =>
            eq(freightForwarder.orgId, input.orgId),
        });
      } catch (err) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: err });
      }
    }),
  getById: protectedProcedure
    .input(z.object({ id: z.coerce.number() }))
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.db.query.freightForwarder.findFirst({
          where: (freightForwarder, { eq }) =>
            eq(freightForwarder.id, input.id),
        });
      } catch (err) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: err });
      }
    }),
});
