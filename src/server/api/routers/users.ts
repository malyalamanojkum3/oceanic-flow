import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import {
  rolesEnum,
  usersToOrganizations,
} from "@/server/db/schema/organization";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
  getManyByEmail: protectedProcedure
    .input(z.object({ email: z.string().trim() }))
    .query(async ({ input, ctx }) => {
      const usrs = await ctx.db.query.users.findMany({
        where: (users, { like }) => like(users.email, `%${input.email}%`),
        limit: 3,
      });
      console.log(usrs);
      return usrs;
    }),
  addUserToOrg: protectedProcedure
    .input(
      z.object({
        email: z.string().trim(),
        orgId: z.string().trim(),
        role: z.enum(rolesEnum.enumValues),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.db.query.users.findFirst({
        where: (users, { eq }) => eq(users.email, input.email),
      });
      if (!user)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "User not found.",
        });

      if (user.id === ctx.session.user.id)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "You cannot add yourself to the organization.",
        });
      await ctx.db.insert(usersToOrganizations).values({
        userId: user.id,
        organizationId: input.orgId,
        role: input.role,
      });
    }),
});
