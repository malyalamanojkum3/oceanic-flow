import { relations } from "drizzle-orm";
import {
  customType,
  pgTableCreator,
  varchar,
} from "drizzle-orm/pg-core";
import { organizations } from "../organization";
import { type Value } from "react-phone-number-input";
import { buyer } from "./buyer";

export const phone = customType<{ data: Value }>({
  dataType() {
    return "varchar";
  },
});

const createTable = pgTableCreator((name) => `oceanic-flow_${name}`);

export const customsHouseAgent = createTable("customs-house-agent", {
  id: varchar("id", { length: 36 }).notNull().primaryKey(),
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

export const truckingCompanyRelations = relations(
  customsHouseAgent,
  ({ one, many }) => ({
    org: one(organizations, {
      fields: [customsHouseAgent.orgId],
      references: [organizations.id],
    }),
    buyers: many(buyer)
  }),
);
