import { createTRPCRouter, protectedProcedure } from "../trpc";
import {
  organizations,
  usersToOrganizations,
} from "@/server/db/schema/organization";
import { customAlphabet } from "nanoid";
import { eq } from "drizzle-orm";
import { z } from "zod";
import slugify from "slugify";
import { TRPCError } from "@trpc/server";
import { users } from "@/server/db/schema/auth";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvxyz0123456789", 14);

export const organizationRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string().trim() }))
    .mutation(async ({ ctx, input }) => {
      const slug = slugify(input.name, { lower: true });
      const org = await ctx.db
        .insert(organizations)
        .values({
          id: `${slug}-${nanoid()}`,
          name: input.name,
          ownerId: ctx.session.user.id,
        })
        .returning({ id: organizations.id });

      if (org.length === 0 || !org[0]?.id)
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      await ctx.db.insert(usersToOrganizations).values({
        userId: ctx.session.user.id,
        organizationId: org[0].id,
        role: "admin",
      });
    }),
  getUserOrgs: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.usersToOrganizations.findMany({
      where: (userToOrgs, { eq }) => eq(userToOrgs.userId, ctx.session.user.id),
      with: {
        organizations: true,
      },
    });
  }),
  getOrgById: protectedProcedure
    .input(z.object({ id: z.string().trim() }))
    .query(async ({ input, ctx }) => {
      const res = await ctx.db.query.organizations.findFirst({
        where: (orgs, { eq }) => eq(orgs.id, input.id),
      });
      if (!res)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Id not found.",
        });
      return res;
    }),
  finishOnboarding: protectedProcedure
    .input(z.object({ name: z.string().trim() }))
    .mutation(async ({ ctx, input }) => {
      const slug = slugify(input.name, { lower: true });
      const org = await ctx.db
        .insert(organizations)
        .values({
          id: `${slug}-${nanoid()}`,
          name: input.name,
          ownerId: ctx.session.user.id,
        })
        .returning({ id: organizations.id });

      if (org.length === 0 || !org[0]?.id)
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      await ctx.db.insert(usersToOrganizations).values({
        userId: ctx.session.user.id,
        organizationId: org[0].id,
        role: "admin",
      });

      await ctx.db
        .update(users)
        .set({ hasOnboarded: true })
        .where(eq(users.id, ctx.session.user.id));
    }),
});
