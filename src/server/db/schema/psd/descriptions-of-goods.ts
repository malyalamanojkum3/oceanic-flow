import { relations } from "drizzle-orm";
import { pgTableCreator, serial, varchar } from "drizzle-orm/pg-core";
import { organizations } from "../organization";

const createTable = pgTableCreator((name) => `oceanic-flow_${name}`);

export const descriptionOfGoods = createTable("description-of-goods", {
  id: serial("id").notNull().primaryKey(),
  qualityDescription: varchar("quality_description", {
    length: 255,
  }).notNull(),
  mainGrade: varchar("main_grade", { length: 255 }).notNull(),
  hsCode: varchar("hs_code", { length: 255 }).notNull(),
  stream: varchar("stream", { length: 15 }).notNull(),
  orgId: varchar("orgId")
    .notNull()
    .references(() => organizations.id, { onDelete: "cascade" }),
});

export const descriptionOfGoodsRelations = relations(
  descriptionOfGoods,
  ({ one }) => ({
    org: one(organizations, {
      fields: [descriptionOfGoods.orgId],
      references: [organizations.id],
    }),
  }),
);
