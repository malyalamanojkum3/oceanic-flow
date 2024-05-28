import { relations } from "drizzle-orm";
import { pgEnum, pgTableCreator, serial, varchar } from "drizzle-orm/pg-core";
import { organizations } from "../organization";
import { type Value } from "react-phone-number-input";
import { customType } from "drizzle-orm/pg-core";

const createTable = pgTableCreator((name) => `oceanic-flow_${name}`);

export const typeEnum = pgEnum("type", ["supplier", "broker"]);

export const phone = customType<{ data: Value }>({
  dataType() {
    return "varchar";
  },
});

export const supplier = createTable("supplier", {
  id: varchar("id").notNull().primaryKey(),
  type: typeEnum("type").default("supplier").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  countryCode: varchar("countryCode", { length: 8 }).notNull(),
  phone: phone("phone", { length: 15 }).notNull(),
  address: varchar("address", { length: 255 }).notNull(),
  bank: varchar("bank", { length: 255 }).notNull(),
  orgId: varchar("orgId")
    .notNull()
    .references(() => organizations.id, { onDelete: "cascade" }),
});

export const supplierRelations = relations(supplier, ({ one }) => ({
  org: one(organizations, {
    fields: [supplier.orgId],
    references: [organizations.id],
  }),
}));
