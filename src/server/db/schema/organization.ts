import {
  pgEnum,
  pgTableCreator,
  primaryKey,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { users } from "./auth";

const roles = ["admin", "manager", "viewer"] as const;
export type Roles = (typeof roles)[number];

export const rolesEnum = pgEnum("role", roles);
const createTable = pgTableCreator((name) => `oceanic-flow_${name}`);

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
    .references(() => users.id, { onDelete: "cascade" }),
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
      .references(() => users.id, { onDelete: "cascade" }),
    organizationId: varchar("organizationId")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
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
