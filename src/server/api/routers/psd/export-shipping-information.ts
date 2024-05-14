import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { TRPCError } from "@trpc/server";

import { z } from "zod";
import { insertExportShippingInformationSchema } from "./schemas.zod";
import { eq } from "drizzle-orm";
import { exportShippingInformation } from "@/server/db/schema/psd/export-shipping-information";

export const exportShippingInformationRouter = createTRPCRouter({
  create: protectedProcedure
    .input(insertExportShippingInformationSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.insert(exportShippingInformation).values(input);
      } catch (err) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: err });
      }
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.coerce.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(exportShippingInformation)
        .where(eq(exportShippingInformation.id, input.id));
    }),
  update: protectedProcedure
    .input(insertExportShippingInformationSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(exportShippingInformation)
        .set(input)
        .where(eq(exportShippingInformation.id, Number(input.id)))
        .returning({ exportShippingInformation });
    }),
  getAll: protectedProcedure
    .input(z.object({ orgId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.db.query.exportShippingInformation.findMany({
          where: (exportShippingInformation, { eq }) =>
            eq(exportShippingInformation.orgId, input.orgId),
        });
      } catch (err) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: err });
      }
    }),
  getById: protectedProcedure
    .input(z.object({ id: z.coerce.number() }))
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.db.query.exportShippingInformation.findFirst({
          where: (exportShippingInformation, { eq }) =>
            eq(exportShippingInformation.id, input.id),
        });
      } catch (err) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: err });
      }
    }),
});
