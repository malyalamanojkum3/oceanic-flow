import { relations } from "drizzle-orm";
import { pgTableCreator, serial, varchar } from "drizzle-orm/pg-core";
import { organizations } from "../organization";

const createTable = pgTableCreator((name) => `oceanic-flow_${name}`);

export const exportShippingInformation = createTable(
  "export-shipping-information",
  {
    id: serial("id").notNull().primaryKey(),
    shipper: varchar("shipper", { length: 255 }).notNull(),
    notifyParty: varchar("notify_party", { length: 255 }).notNull(),
    consignee: varchar("consignee", { length: 255 }).notNull(),
    billOfLandingNotes: varchar("bill_of_landing_notes", {
      length: 255,
    }).notNull(),
    orgId: varchar("orgId")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
  },
);

export const truckingCompanyRelations = relations(
  exportShippingInformation,
  ({ one }) => ({
    org: one(organizations, {
      fields: [exportShippingInformation.orgId],
      references: [organizations.id],
    }),
  }),
);
