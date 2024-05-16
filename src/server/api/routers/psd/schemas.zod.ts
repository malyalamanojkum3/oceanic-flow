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

export const insertGeneralNameSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  orgId: z.string(),
});

export const insertGeneralCompleteSchema = z.object({
  id: z.number().optional(),
  name: z.string().trim().min(1),
  email: z.string().email().trim().min(1),
  countryCode: z.string().trim().min(1),
  phone: z
    .string()
    .trim()
    .refine(v.isMobilePhone)
    .transform((v) => v as Value),
  address: z.string().trim().min(1),
  bank: z.string().trim().min(1),
  orgId: z.string(),
});

export const insertSupplierSchema = createInsertSchema(supplier, {
  id: z.number().optional(),
  name: z.string().trim().min(1),
  email: z.string().email().trim().min(1),
  countryCode: z.string().trim().min(1),
  phone: z
    .string()
    .trim()
    .refine(v.isMobilePhone)
    .transform((v) => v as Value),
  address: z.string().trim().min(1),
  bank: z.string().trim().min(1),
  orgId: z.string(),
});

export const insertFreightForwarderSchema = createInsertSchema(
  freightForwarder,
  {
    id: z.number().optional(),
    email: z.string().email(),
    phone: z
      .string()
      .refine(v.isMobilePhone)
      .transform((v) => v as Value),
  },
);

export const insertTruckingCompanySchema = createInsertSchema(truckingCompany, {
  id: z.number().optional(),
  email: z.string().email(),
  phone: z
    .string()
    .refine(v.isMobilePhone)
    .transform((v) => v as Value),
});

export const insertCustomsHouseAgentSchema = createInsertSchema(
  customsHouseAgent,
  {
    id: z.number().optional(),
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
    id: z.number().optional(),
  },
);

export const insertExportShippingInformationSchema = createInsertSchema(
  exportShippingInformation,
  {
    id: z.number().optional(),
  },
);

export const insertPSICAgencySchema = createInsertSchema(PSICAgency, {
  id: z.number().optional(),
  email: z.string().email(),
  phone: z
    .string()
    .refine(v.isMobilePhone)
    .transform((v) => v as Value),
});

export const insertShippingLineSchema = createInsertSchema(shippingLine, {
  id: z.number().optional(),
});

export const insertPlaceOfLoadingSchema = createInsertSchema(placeOfLoading, {
  id: z.number().optional(),
});

export const insertPortOfLoadingSchema = createInsertSchema(portOfLoading, {
  id: z.number().optional(),
});

export const insertPortOfDestinationSchema = createInsertSchema(
  portOfDestination,
  {
    id: z.number().optional(),
  },
);

export const insertPlaceOfDeliverySchema = createInsertSchema(placeOfDelivery, {
  id: z.number().optional(),
});

export const insertVesselNameSchema = createInsertSchema(vesselName, {
  id: z.number().optional(),
});

export const insertSalesOrderSchema = createInsertSchema(salesOrder, {
  id: z.number().optional(),
});
