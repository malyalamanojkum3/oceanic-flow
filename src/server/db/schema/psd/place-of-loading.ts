import { relations } from "drizzle-orm";
import { pgTableCreator, serial, varchar } from "drizzle-orm/pg-core";
import { organizations } from "../organization";

const createTable = pgTableCreator((name) => `oceanic-flow_${name}`);

export const placeOfLoading = createTable("place-of-loading", {
  id: serial("id").notNull().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  orgId: varchar("orgId")
    .notNull()
    .references(() => organizations.id, { onDelete: "cascade" }),
});

export const placeOfLoadingRelations = relations(placeOfLoading, ({ one }) => ({
  org: one(organizations, {
    fields: [placeOfLoading.orgId],
    references: [organizations.id],
  }),
}));
