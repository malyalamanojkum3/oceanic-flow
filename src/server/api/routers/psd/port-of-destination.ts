import { createTRPCRouter, protectedProcedure } from "../../trpc";

import { TRPCError } from "@trpc/server";

import { z } from "zod";
import { insertPortOfDestinationSchema } from "./schemas.zod";
import { eq } from "drizzle-orm";
import { portOfDestination } from "@/server/db/schema/psd/port-of-destination";

export const portOfDestinationRouter = createTRPCRouter({
  create: protectedProcedure
    .input(insertPortOfDestinationSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.insert(portOfDestination).values(input);
      } catch (err) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: err });
      }
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.coerce.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(portOfDestination)
        .where(eq(portOfDestination.id, input.id))
        .returning({ name: portOfDestination.name });
    }),
  update: protectedProcedure
    .input(insertPortOfDestinationSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(portOfDestination)
        .set(input)
        .where(eq(portOfDestination.id, Number(input.id)))
        .returning({ portOfDestination });
    }),
  getAll: protectedProcedure
    .input(z.object({ orgId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.db.query.portOfDestination.findMany({
          where: (portOfDestination, { eq }) =>
            eq(portOfDestination.orgId, input.orgId),
        });
      } catch (err) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: err });
      }
    }),
  getById: protectedProcedure
    .input(z.object({ id: z.coerce.number() }))
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.db.query.portOfDestination.findFirst({
          where: (portOfDestination, { eq }) =>
            eq(portOfDestination.id, input.id),
        });
      } catch (err) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: err });
      }
    }),
});
