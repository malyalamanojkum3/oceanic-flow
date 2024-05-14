import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { TRPCError } from "@trpc/server";

import { z } from "zod";
import { insertTruckingCompanySchema } from "./schemas.zod";
import { eq } from "drizzle-orm";
import { truckingCompany } from "@/server/db/schema/psd/trucking-company";

export const truckingCompanyRouter = createTRPCRouter({
  create: protectedProcedure
    .input(insertTruckingCompanySchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.insert(truckingCompany).values(input);
      } catch (err) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: err });
      }
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.coerce.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(truckingCompany)
        .where(eq(truckingCompany.id, input.id))
        .returning({ name: truckingCompany.name });
    }),
  update: protectedProcedure
    .input(insertTruckingCompanySchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(truckingCompany)
        .set(input)
        .where(eq(truckingCompany.id, Number(input.id)))
        .returning({ truckingCompany });
    }),
  getAll: protectedProcedure
    .input(z.object({ orgId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.db.query.truckingCompany.findMany({
          where: (truckingCompany, { eq }) =>
            eq(truckingCompany.orgId, input.orgId),
        });
      } catch (err) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: err });
      }
    }),
  getById: protectedProcedure
    .input(z.object({ id: z.coerce.number() }))
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.db.query.truckingCompany.findFirst({
          where: (truckingCompany, { eq }) => eq(truckingCompany.id, input.id),
        });
      } catch (err) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: err });
      }
    }),
});
