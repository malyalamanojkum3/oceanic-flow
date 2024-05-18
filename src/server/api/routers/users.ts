import { z } from "zod";
import { adminProcedure, createTRPCRouter } from "../trpc";
import {
  rolesEnum,
  usersToOrganizations,
} from "@/server/db/schema/organization";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
  getFilteredManyByEmail: adminProcedure
    .input(z.object({ search: z.string(), orgId: z.string() }))
    .query(async ({ input, ctx }) => {
      const search = await ctx.db.query.users.findMany({
        limit: 3,
        with: {
          usersToOrganizations: {
            columns: { organizationId: true },
          },
        },
        where: (users, { or, ilike }) =>
          or(
            ilike(users.email, `%${input.search}%`),
            ilike(users.name, `%${input.search}%`),
          ),
      });
      const res = search.filter(
        (user) =>
          !user.usersToOrganizations.some(
            (org) => org.organizationId === input.orgId,
          ),
      );
      return res;
    }),
  addUserToOrg: adminProcedure
    .input(
      z.object({
        email: z.string().trim(),
        orgId: z.string().trim(),
        role: z.enum(rolesEnum.enumValues),
        permissions: z.number(),
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
        permissions: input.permissions,
      });
    }),
});
