import { relations } from "drizzle-orm";
import { boolean, integer, numeric, pgEnum, pgTableCreator, varchar,} from "drizzle-orm/pg-core";
import { organizations } from "../organization";
import { customsHouseAgent } from "./customs-house-agent";
import { portOfDestination } from "./port-of-destination";
import { type Value } from "react-phone-number-input";
import { customType } from "drizzle-orm/pg-core";

const createTable = pgTableCreator((name) => `oceanic-flow_${name}`);

export const typeEnum = pgEnum("type", ["supplier", "broker"]);
export const cifOrCnfEnum = pgEnum("cifOrCnf", ["CIF", "CNF"]);
export const preferredCurrencyEnum = pgEnum("preferredCurrency",["USD","CAD"]);

export const phone = customType<{ data: Value }>({
  dataType() {
    return "varchar";
  },
});

export const buyer = createTable("buyer", {
  id: varchar("id").notNull().primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  cifOrCnf: cifOrCnfEnum("cifOrCnf").notNull(),
  address: varchar("address", { length: 255 }).notNull(),
  countryCode: varchar("countryCode", { length: 8 }).notNull(),
  phone: phone("phone", { length: 15 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  bank: varchar("bank", { length: 255 }),
  customsHouseAgentId: varchar("customsHouseAgentId")
    .notNull()
    .references(() => customsHouseAgent.id, { onDelete: "cascade" }),
  proFormaInvoiceRequired : boolean("proFormaInvoiceRequired").default(false),
  preferredCurrency: preferredCurrencyEnum("preferredCurrency").notNull(),
  portOfDestinationId: varchar("portOfDestinationId").notNull()
    .references(() => portOfDestination.id, { onDelete: "cascade" }),
  orgId: varchar("orgId")
    .notNull()
    .references(() => organizations.id, { onDelete: "cascade" }),
});

export const buyerRelations = relations(buyer, ({ one }) => ({  
    org: one(organizations, {
        fields: [buyer.orgId],
        references: [organizations.id],
    }),
    customsHouseAgent: one(customsHouseAgent, {
        fields: [buyer.customsHouseAgentId],
        references: [customsHouseAgent.id],
    }),
    portPreference: one(portOfDestination, {
        fields: [buyer.portOfDestinationId],
        references: [portOfDestination.id],
    }),
    }));        