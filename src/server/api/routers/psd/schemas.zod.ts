import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import * as v from "validator";
import { supplier } from "@/server/db/schema/psd/supplier";
import { type Value } from "react-phone-number-input";

export const insertSupplierSchema = createInsertSchema(supplier, {
  id: z.number().optional(),
  email: z.string().email(),
  phone: z
    .string()
    .refine(v.isMobilePhone)
    .transform((v) => v as Value),
});
