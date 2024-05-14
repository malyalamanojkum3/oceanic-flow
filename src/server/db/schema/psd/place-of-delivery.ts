import { relations } from "drizzle-orm";
import { pgTableCreator, serial, varchar } from "drizzle-orm/pg-core";
import { organizations } from "../organization";

const createTable = pgTableCreator((name) => `oceanic-flow_${name}`);

export const placeOfDelivery = createTable("place-of-delivery", {
  id: serial("id").notNull().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  orgId: varchar("orgId")
    .notNull()
    .references(() => organizations.id, { onDelete: "cascade" }),
});

export const placeOfDeliveryRelations = relations(
  placeOfDelivery,
  ({ one }) => ({
    org: one(organizations, {
      fields: [placeOfDelivery.orgId],
      references: [organizations.id],
    }),
  }),
);
