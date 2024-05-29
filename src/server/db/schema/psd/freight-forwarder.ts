import { relations } from "drizzle-orm";
import { pgTableCreator, serial, varchar } from "drizzle-orm/pg-core";
import { organizations } from "../organization";
import { type Value } from "react-phone-number-input";
import { customType } from "drizzle-orm/pg-core";

const createTable = pgTableCreator((name) => `oceanic-flow_${name}`);

export const phone = customType<{ data: Value }>({
  dataType() {
    return "varchar";
  },
});

export const freightForwarder = createTable("freight-forwarder", {
  id: varchar("id").notNull().primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull(),
  countryCode: varchar("countryCode", { length: 8 }).notNull(),
  phone: phone("phone", { length: 15 }).notNull(),
  address: varchar("address", { length: 255 }).notNull(),
  bank: varchar("bank", { length: 255 }),
  orgId: varchar("orgId")
    .notNull()
    .references(() => organizations.id, { onDelete: "cascade" }),
});

export const freightForwarderRelations = relations(
  freightForwarder,
  ({ one }) => ({
    org: one(organizations, {
      fields: [freightForwarder.orgId],
      references: [organizations.id],
    }),
  }),
);
