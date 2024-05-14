import { createTRPCRouter, protectedProcedure } from "../../trpc";

import { TRPCError } from "@trpc/server";

import { z } from "zod";
import { insertPortOfLoadingSchema } from "./schemas.zod";
import { eq } from "drizzle-orm";
import { portOfLoading } from "@/server/db/schema/psd/port-of-loading";

export const portOfLoadingRouter = createTRPCRouter({
  create: protectedProcedure
    .input(insertPortOfLoadingSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.insert(portOfLoading).values(input);
      } catch (err) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: err });
      }
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.coerce.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(portOfLoading)
        .where(eq(portOfLoading.id, input.id))
        .returning({ name: portOfLoading.name });
    }),
  update: protectedProcedure
    .input(insertPortOfLoadingSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(portOfLoading)
        .set(input)
        .where(eq(portOfLoading.id, Number(input.id)))
        .returning({ portOfLoading });
    }),
  getAll: protectedProcedure
    .input(z.object({ orgId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.db.query.portOfLoading.findMany({
          where: (portOfLoading, { eq }) =>
            eq(portOfLoading.orgId, input.orgId),
        });
      } catch (err) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: err });
      }
    }),
  getById: protectedProcedure
    .input(z.object({ id: z.coerce.number() }))
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.db.query.portOfLoading.findFirst({
          where: (portOfLoading, { eq }) => eq(portOfLoading.id, input.id),
        });
      } catch (err) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: err });
      }
    }),
});
