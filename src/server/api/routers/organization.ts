import { createTRPCRouter, protectedProcedure } from "../trpc";
import { onboardingSchema } from "@/components/dashboard/forms/onboarding-form";
import { organizations, users, usersToOrganizations } from "@/server/db/schema";
import { nanoid } from "nanoid";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const organizationRouter = createTRPCRouter({
  finishOnboarding: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const org = await ctx.db
        .insert(organizations)
        .values({
          id: `${input.name}-${nanoid()}`,
          name: input.name,
          ownerId: ctx.session.user.id,
        })
        .returning({ id: organizations.id });

      await ctx.db
        .insert(usersToOrganizations)
        .values({ userId: ctx.session.user.id, organizationId: org[0]?.id! });

      await ctx.db
        .update(users)
        .set({ hasOnborded: true })
        .where(eq(users.id, ctx.session.user.id));

      return org;
    }),
  getUserOrgs: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.organizations.findMany({
      where: (organizations, { eq }) =>
        eq(organizations.ownerId, ctx.session.user.id),
    });
  }),
});
