import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import * as v from "validator";
import { supplier } from "@/server/db/schema/psd/supplier";
import { type Value } from "react-phone-number-input";
import { freightForwarder } from "@/server/db/schema/psd/freight-forwarder";
import { truckingCompany } from "@/server/db/schema/psd/trucking-company";
import { customsHouseAgent } from "@/server/db/schema/psd/customs-house-agent";
import { descriptionOfGoods } from "@/server/db/schema/psd/descriptions-of-goods";
import { exportShippingInformation } from "@/server/db/schema/psd/export-shipping-information";
import { PSICAgency } from "@/server/db/schema/psd/psic-agency";
import { shippingLine } from "@/server/db/schema/psd/shipping-line";
import { placeOfLoading } from "@/server/db/schema/psd/place-of-loading";
import { portOfLoading } from "@/server/db/schema/psd/port-of-loading";
import { portOfDestination } from "@/server/db/schema/psd/port-of-destination";
import { placeOfDelivery } from "@/server/db/schema/psd/place-of-delivery";
import { vesselName } from "@/server/db/schema/psd/vessel-name";
import { salesOrder } from "@/server/db/schema/psd/sales-order";
import { buyer } from "@/server/db/schema/psd/buyer";
import { item } from "@/server/db/schema/psd/item";

export const cifOrCnfEnum = z.enum(["CIF", "CNF"]);
export const preferredCurrencyEnum = z.enum(["USD", "CAD"]);

export const insertGeneralNameSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  orgId: z.string(),
});

export const insertGeneralCompleteSchema = z.object({
  id: z.string().optional(),
  name: z.string().trim().min(1),
  email: z.string().email().trim().min(1),
  countryCode: z.string().trim().min(1),
  phone: z
    .string()
    .trim()
    .refine(v.isMobilePhone)
    .transform((v) => v as Value),
  address: z.string().trim().min(1),
  bank: z.string().trim().nullable().optional(),
  orgId: z.string(),
});

export const insertSupplierSchema = createInsertSchema(supplier, {
  id: z.string().optional(),
  name: z.string().trim().min(1),
  email: z.string().email().trim().min(1),
  countryCode: z.string().trim().min(1),
  phone: z
    .string()
    .trim()
    .refine(v.isMobilePhone)
    .transform((v) => v as Value),
  address: z.string().trim().min(1),
  bank: z.string().trim().nullable().optional(),

  orgId: z.string(),
});

export const insertFreightForwarderSchema = createInsertSchema(
  freightForwarder,
  {
    id: z.string().optional(),
    email: z.string().email(),
    phone: z
      .string()
      .refine(v.isMobilePhone)
      .transform((v) => v as Value),
  },
);

export const insertTruckingCompanySchema = createInsertSchema(truckingCompany, {
  id: z.string().optional(),
  email: z.string().email(),
  phone: z
    .string()
    .refine(v.isMobilePhone)
    .transform((v) => v as Value),
});

export const insertCustomsHouseAgentSchema = createInsertSchema(
  customsHouseAgent,
  {
    id: z.string().optional(),
    email: z.string().email(),
    phone: z
      .string()
      .refine(v.isMobilePhone)
      .transform((v) => v as Value),
  },
);

export const insertDescriptionOfGoodsSchema = createInsertSchema(
  descriptionOfGoods,
  {
    id: z.string().optional(),
  },
);

export const insertExportShippingInformationSchema = createInsertSchema(
  exportShippingInformation,
  {
    id: z.string().optional(),
  },
);

export const insertPSICAgencySchema = createInsertSchema(PSICAgency, {
  id: z.string().optional(),
  email: z.string().email(),
  phone: z
    .string()
    .refine(v.isMobilePhone)
    .transform((v) => v as Value),
});

export const insertShippingLineSchema = createInsertSchema(shippingLine, {
  id: z.string().optional(),
});

export const insertPlaceOfLoadingSchema = createInsertSchema(placeOfLoading, {
  id: z.string().optional(),
});

export const insertPortOfLoadingSchema = createInsertSchema(portOfLoading, {
  id: z.string().optional(),
});

export const insertPortOfDestinationSchema = createInsertSchema(
  portOfDestination,
  {
    id: z.string().optional(),
  },
);

export const insertPlaceOfDeliverySchema = createInsertSchema(placeOfDelivery, {
  id: z.string().optional(),
});

export const insertVesselNameSchema = createInsertSchema(vesselName, {
  id: z.string().optional(),
});

export const insertSalesOrderSchema = createInsertSchema(salesOrder, {
  id: z.string().optional(),
});

export const insertBuyerSchema = createInsertSchema(buyer, {  
  id: z.string().optional(),
  name: z.string().trim().min(1),
  cifOrCnf: cifOrCnfEnum,
  address: z.string().trim().min(1),
  countryCode: z.string().trim().min(1),
  phone: z
    .string()
    .trim()
    .refine(v.isMobilePhone)
    .transform((v) => v as Value),
  email: z.string().email().trim().min(1),
  bank: z.string().trim().nullable().optional(),
  customsHouseAgentId: z.string(),
  proFormaInvoiceRequired: z.boolean(),
  preferredCurrency: preferredCurrencyEnum,
  portOfDestinationId: z.string(),
  orgId: z.string(),
});

export const insertItemSchema = createInsertSchema(item, {
  id: z.string().optional(),
  name: z.string(),
  orgId: z.string(),
  notes: z.array(z.string()).nullable().optional(),
});
