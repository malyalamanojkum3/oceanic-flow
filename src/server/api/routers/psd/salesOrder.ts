import {
    createTRPCRouter,
    managerProcedure,
    protectedProcedure,
  } from "../../trpc";
  import { TRPCError } from "@trpc/server";
  import { z } from "zod";
  import { eq } from "drizzle-orm";
  import { insertSalesOrderSchema as schema } from "./schemas.zod";
  import { salesOrder as table} from "../../../db/schema/psd/sales-order";
  

 const Router = createTRPCRouter({
        create: managerProcedure.input(schema).mutation(async ({ ctx, input }) => {
            try {
                await ctx.db.insert(table).values(input);
            } catch (err) {
                throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: err });
            }
        }),
        delete: managerProcedure
            .input(z.object({ id: z.coerce.number() }))
            .mutation(async ({ ctx, input }) => {
                await ctx.db.delete(table).where(eq(table.id, input.id));
            }),
        update: managerProcedure.input(schema).mutation(async ({ ctx, input }) => {
            await ctx.db
                .update(table)
                .set(input)
                .where(eq(table.id, Number(input.id)))
                .returning({ table });
        }),
        getAll: protectedProcedure
            .input(z.object({ orgId: z.string() }))
            .query(async ({ ctx, input }) => {
                try {
                    return await ctx.db
                        .select()
                        .from(table)
                        .where(eq(table.orgId, input.orgId));
                } catch (err) {
                    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: err });
                }
            }),
        getById: protectedProcedure
            .input(z.object({ id: z.coerce.number() }))
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