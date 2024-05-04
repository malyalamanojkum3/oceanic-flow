import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
  DefaultUser,
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import Discord from "next-auth/providers/discord";

import { env } from "@/env";
import { db } from "@/server/db";
import { createTable, users } from "@/server/db/schema";
import { DefaultJWT } from "next-auth/jwt";
import { eq } from "drizzle-orm";
import { logger } from "@/lib/logging/winston";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
type UserRole = "admin" | "manager" | "viewer";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: UserRole;
      hasOnboarded: boolean;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    role: UserRole;
    hasOnboarded: boolean;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "database",
    maxAge: 14 * 24 * 60 * 60,
  },
  callbacks: {
    async session({ session, user }) {
      logger.info({
        message: `Fetching role form database for user ${user.id}`,
        service: "auth",
        timestamp: new Date(),
      });
      const dbUserOrg = await db.query.usersToOrganizations.findFirst({
        where: (usersToOrganizations, { eq }) =>
          eq(usersToOrganizations.userId, user.id),
        with: {
          user: {
            columns: {
              hasOnboarded: true,
            },
          },
        },
      });

      if (!dbUserOrg)
        logger.error({
          message: `Error while fetching ${user.id}`,
          service: "auth",
          timestamp: new Date(),
        });

      session.user.hasOnboarded = dbUserOrg?.user.hasOnboarded ?? false;
      session.user.id = user.id;
      return session;
    },
  },
  adapter: DrizzleAdapter(db, createTable) as Adapter,
  providers: [
    Discord({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
