import { relations } from "drizzle-orm";
import { pgTableCreator, serial, varchar } from "drizzle-orm/pg-core";
import { organizations } from "../organization";

const createTable = pgTableCreator((name) => `oceanic-flow_${name}`);

export const salesOrder = createTable("sales-order", {
  id: serial("id").notNull().primaryKey(),
  specialTerms: varchar("special_terms", { length: 255 }).notNull(),
  orgId: varchar("orgId")
    .notNull()
    .references(() => organizations.id, { onDelete: "cascade" }),
});

export const salesOrderRelations = relations(salesOrder, ({ one }) => ({
  org: one(organizations, {
    fields: [salesOrder.orgId],
    references: [organizations.id],
  }),
}));
