import { randomUUID } from "crypto";
import { relations, sql } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgEnum,
  pgTableCreator,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

// make sure to check out /server/auth.ts to sync roles
export const rolesEnum = pgEnum("role", ["admin", "manager", "viewer"]);

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `oceanic-flow_${name}`);

export const organizations = createTable("organization", {
  id: varchar("id").notNull().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt", {
    mode: "date",
  })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  ownerId: varchar("ownerId", { length: 255 })
    .notNull()
    .references(() => users.id),
});

export const organizationsRelations = relations(organizations, ({ one }) => ({
  owner: one(users, {
    fields: [organizations.ownerId],
    references: [users.id],
  }),
}));

export const usersToOrganizations = createTable(
  "users_to_organizations",
  {
    userId: varchar("userId")
      .notNull()
      .references(() => users.id),
    organizationId: varchar("organizationId")
      .notNull()
      .references(() => organizations.id),
    role: rolesEnum("role").default("viewer").notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.organizationId] }),
  }),
);

export const usersToOrganizationsRelations = relations(
  usersToOrganizations,
  ({ one }) => ({
    organizations: one(organizations, {
      fields: [usersToOrganizations.organizationId],
      references: [organizations.id],
    }),
    user: one(users, {
      fields: [usersToOrganizations.userId],
      references: [users.id],
    }),
  }),
);

export const users = createTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
  }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar("image", { length: 255 }),
  hasOnboarded: boolean("hasOnboarded").default(false).notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  organizations: many(organizations),
}));

export const accounts = createTable(
  "account",
  {
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_userId_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  {
    sessionToken: varchar("sessionToken", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_userId_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);
