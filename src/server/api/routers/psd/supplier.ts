import {
    createTRPCRouter,
    managerProcedure,
    protectedProcedure,
  } from "../../trpc";
  import { TRPCError } from "@trpc/server";
  import { z } from "zod";
  import { eq } from "drizzle-orm";
  import { insertSupplierSchema as schema } from "./schemas.zod";
  import { supplier as table} from "../../../db/schema/psd/supplier";
  import { count } from "drizzle-orm";
  import { ilike,and } from 'drizzle-orm';

import { generateItemId } from "@/lib/utils";
 const Router = createTRPCRouter({
        create: managerProcedure.input(schema).mutation(async ({ ctx, input }) => {
            try {
                const id = generateItemId(input.name);
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
        getPageItems: protectedProcedure
        .input(z.object({ orgId: z.string(),
             page: z.number(),
             itemsPerPage: z.number(),
             query: z.string(),
             }))
        .query(async ({ ctx, input }) => {
            try {
                // Count total items
                const totalItemsResult = await ctx.db
                .select({ count: count() })
                .from(table)
                .where(and(
                    eq(table.orgId, input.orgId),
                    ilike(table.name, `%${input.query}%`)
                ));
                const totalItems = totalItemsResult[0]?.count ?? 0;
                // Calculate total pages
                const totalPages = Math.ceil(totalItems / input.itemsPerPage);

                // Fetch items for current page
                const items = await ctx.db
                    .select()
                    .from(table)
                    .where(and(
                        eq(table.orgId, input.orgId),
                        ilike(table.name, `%${input.query}%`)
                    ))
                    .limit(input.itemsPerPage)
                    .offset((input.page - 1) * input.itemsPerPage);

                return { items, totalPages };
            } catch (err) {
                throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: err });
            }
        }),
        //create a procedure which takes name and return boolean if name already exists
        checkNameExists: protectedProcedure
            .input(z.string())
            .mutation(async ({ ctx, input }) => {
                try {
                    const result = await ctx.db
                        .select()
                        .from(table)
                        .where(eq(table.name, input));
                    const exists= result.length > 0;
                    return exists;
                } catch (err) {
                    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: err });
                }
            }),
        // create procedure which takes orgId adn returns count of suppliers
        count: protectedProcedure
            .input(z.string())
            .query(async ({ ctx, input }) => {
                try {
                    const result = await ctx.db
                        .select({ count: count() })
                        .from(table)
                        .where(eq(table.orgId, input));
                    return result[0]?.count ?? 0;
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