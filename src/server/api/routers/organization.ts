import { createTRPCRouter, protectedProcedure } from "../trpc";
import { organizations, users, usersToOrganizations } from "@/server/db/schema";
import { customAlphabet } from "nanoid";
import { eq } from "drizzle-orm";
import { z } from "zod";
import slugify from "slugify";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvxyz0123456789", 14);

export const organizationRouter = createTRPCRouter({
  addOrganization: protectedProcedure
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

      await ctx.db.insert(usersToOrganizations).values({
        userId: ctx.session.user.id,
        organizationId: org[0]?.id!,
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

      await ctx.db.insert(usersToOrganizations).values({
        userId: ctx.session.user.id,
        organizationId: org[0]?.id!,
        role: "admin",
      });

      await ctx.db
        .update(users)
        .set({ hasOnboarded: true })
        .where(eq(users.id, ctx.session.user.id));
    }),
});
