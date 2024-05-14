import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { TRPCError } from "@trpc/server";

import { z } from "zod";
import { insertCustomsHouseAgentSchema } from "./schemas.zod";
import { eq } from "drizzle-orm";
import { customsHouseAgent } from "@/server/db/schema/psd/customs-house-agent";

export const customsHouseAgentRouter = createTRPCRouter({
  create: protectedProcedure
    .input(insertCustomsHouseAgentSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.insert(customsHouseAgent).values(input);
      } catch (err) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: err });
      }
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.coerce.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(customsHouseAgent)
        .where(eq(customsHouseAgent.id, input.id))
        .returning({ name: customsHouseAgent.name });
    }),
  update: protectedProcedure
    .input(insertCustomsHouseAgentSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(customsHouseAgent)
        .set(input)
        .where(eq(customsHouseAgent.id, Number(input.id)))
        .returning({ customsHouseAgent });
    }),
  getAll: protectedProcedure
    .input(z.object({ orgId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.db.query.customsHouseAgent.findMany({
          where: (customsHouseAgent, { eq }) =>
            eq(customsHouseAgent.orgId, input.orgId),
        });
      } catch (err) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: err });
      }
    }),
  getById: protectedProcedure
    .input(z.object({ id: z.coerce.number() }))
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.db.query.customsHouseAgent.findFirst({
          where: (customsHouseAgent, { eq }) =>
            eq(customsHouseAgent.id, input.id),
        });
      } catch (err) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: err });
      }
    }),
});
