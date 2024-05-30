import { relations } from "drizzle-orm";
import {
  pgTableCreator,
  serial,
  varchar,
  customType,
} from "drizzle-orm/pg-core";
import { organizations } from "../organization";
import { type Value } from "react-phone-number-input";

export const phone = customType<{ data: Value }>({
  dataType() {
    return "varchar";
  },
});

const createTable = pgTableCreator((name) => `oceanic-flow_${name}`);

export const truckingCompany = createTable("trucking-company", {
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

export const truckingCompanyRelations = relations(
  truckingCompany,
  ({ one }) => ({
    org: one(organizations, {
      fields: [truckingCompany.orgId],
      references: [organizations.id],
    }),
  }),
);
