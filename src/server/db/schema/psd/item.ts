import { relations } from "drizzle-orm";
import { pgEnum, pgTableCreator, serial, varchar } from "drizzle-orm/pg-core";
import { organizations } from "../organization";

const createTable = pgTableCreator((name) => `oceanic-flow_${name}`);


export const item = createTable("item", {
  id: varchar("id").notNull().primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  notes: varchar("notes", { length: 255 }).array(),
  orgId: varchar("orgId")
    .notNull()
    .references(() => organizations.id, { onDelete: "cascade" }),
});

export const itemRelations = relations(item, ({ one }) => ({
  org: one(organizations, {
    fields: [item.orgId],
    references: [organizations.id],
  }),
}));
