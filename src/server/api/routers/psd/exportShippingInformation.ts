import {
    createTRPCRouter,
    managerProcedure,
    protectedProcedure,
  } from "../../trpc";
  import { TRPCError } from "@trpc/server";
  import { z } from "zod";
  import { eq } from "drizzle-orm";
  import { insertExportShippingInformationSchema as schema } from "./schemas.zod";
  import { exportShippingInformation as table} from "../../../db/schema/psd/export-shipping-information";
  import { count } from "drizzle-orm";
import { generateItemId } from "@/lib/utils";
 const Router = createTRPCRouter({
        create: managerProcedure.input(schema).mutation(async ({ ctx, input }) => {
            try {
                const id = generateItemId(input.shipper);  
                const newItem = { ...input, id };
                await ctx.db.insert(table).values(newItem);
            } catch (err) {
                throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: err });
            }
        }),
        delete: managerProcedure
            .input(z.object({ id: z.string() }))
            .mutation(async ({ ctx, input }) => {
                await ctx.db.delete(table).where(eq(table.id, input.id));
            }),
        update: managerProcedure.input(schema).mutation(async ({ ctx, input }) => {
            if (!input.id) {
                throw new Error('id is required');
            }
            await ctx.db
                .update(table)
                .set(input)
                .where(eq(table.id, (input.id)))
                .returning({ table });
        }),
        getAll: protectedProcedure
        .input(z.object({ orgId: z.string(), page: z.number(), itemsPerPage: z.number() }))
        .query(async ({ ctx, input }) => {
            try {
                // Count total items
                const totalItemsResult = await ctx.db
                .select({ count: count() })
                .from(table)
                .where(eq(table.orgId, input.orgId));
                const totalItems = totalItemsResult[0]?.count ?? 0;
                // Calculate total pages
                const totalPages = Math.ceil(totalItems / input.itemsPerPage);

                // Fetch items for current page
                const items = await ctx.db
                    .select()
                    .from(table)
                    .where(eq(table.orgId, input.orgId))
                    .limit(input.itemsPerPage)
                    .offset((input.page - 1) * input.itemsPerPage);

                return { items, totalPages };
            } catch (err) {
                throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: err });
            }
        }),
        getById: protectedProcedure
            .input(z.object({ id: z.string() }))
            .query(async ({ ctx, input }) => {
                try {
                    const result = await ctx.db
                        .select()
                        .from(table)
                        .where(eq(table.id, input.id));
                        const agent = result[0];
                        if (!agent) {
                            throw new TRPCError({ code: "NOT_FOUND", message: "Agent not found" });
                          }
                          return agent;
                } catch (err) {
                    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: err });
                }
            }),
    });
  export default Router;