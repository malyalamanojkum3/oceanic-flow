import { pgEnum, pgTableCreator, serial, varchar } from "drizzle-orm/pg-core";

const createTable = pgTableCreator((name) => `oceanic-flow_${name}`);

export const typeEnum = pgEnum("type", ["supplier", "broker"]);

export const supplier = createTable("supplier", {
  id: serial("id"),
  type: typeEnum("type").default("supplier").notNull(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }),
  countryCode: varchar("countryCode", { length: 8 }),
  phoneCountryCode: varchar("phoneCountryCode", { length: 8 }),
  phone: varchar("phone", { length: 15 }),
  address: varchar("address", { length: 255 }),
  bank: varchar("bank", { length: 255 }),
});
