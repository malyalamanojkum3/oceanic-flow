import { relations } from "drizzle-orm";
import { pgTableCreator, serial, varchar } from "drizzle-orm/pg-core";
import { organizations } from "../organization";
import { buyer } from "./buyer";

const createTable = pgTableCreator((name) => `oceanic-flow_${name}`);

export const portOfDestination = createTable("port-of-destination", {
  id: varchar("id").notNull().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  orgId: varchar("orgId")
    .notNull()
    .references(() => organizations.id, { onDelete: "cascade" }),
});

export const portOfDestinationRelations = relations(
  portOfDestination,
  ({ one, many }) => ({
    org: one(organizations, {
      fields: [portOfDestination.orgId],
      references: [organizations.id],
    }),
    buyers: many(buyer),
  }),
);
