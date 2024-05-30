import { relations } from "drizzle-orm";
import { pgTableCreator, serial, varchar } from "drizzle-orm/pg-core";
import { organizations } from "../organization";

const createTable = pgTableCreator((name) => `oceanic-flow_${name}`);

export const shippingLine = createTable("shipping-line", {
  id: varchar("id").notNull().primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  orgId: varchar("orgId")
    .notNull()
    .references(() => organizations.id, { onDelete: "cascade" }),
});

export const shippingLineRelations = relations(shippingLine, ({ one }) => ({
  org: one(organizations, {
    fields: [shippingLine.orgId],
    references: [organizations.id],
  }),
}));
