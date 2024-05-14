import { relations } from "drizzle-orm";
import { pgTableCreator, serial, varchar } from "drizzle-orm/pg-core";
import { organizations } from "../organization";

const createTable = pgTableCreator((name) => `oceanic-flow_${name}`);

export const vesselName = createTable("vessel-name", {
  id: serial("id").notNull().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  orgId: varchar("orgId")
    .notNull()
    .references(() => organizations.id, { onDelete: "cascade" }),
});

export const vesselNameRelations = relations(vesselName, ({ one }) => ({
  org: one(organizations, {
    fields: [vesselName.orgId],
    references: [organizations.id],
  }),
}));
