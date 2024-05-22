import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import type { RouterLike, UtilsLike } from "@trpc/react-query/shared";

import { organizationRouter } from "./routers/organization";
import { userRouter } from "./routers/users";
import { createGenericRouter } from "./routers/psd";

import {
  insertSupplierSchema,
  insertGeneralCompleteSchema,
  insertDescriptionOfGoodsSchema,
  insertExportShippingInformationSchema,
  insertGeneralNameSchema,
} from "./routers/psd/schemas.zod";

import { supplier } from "@/server/db/schema/psd/supplier";
import { freightForwarder } from "../db/schema/psd/freight-forwarder";
import { truckingCompany } from "../db/schema/psd/trucking-company";
import { customsHouseAgent } from "../db/schema/psd/customs-house-agent";
import { descriptionOfGoods } from "../db/schema/psd/descriptions-of-goods";
import { exportShippingInformation } from "../db/schema/psd/export-shipping-information";
import { shippingLine } from "../db/schema/psd/shipping-line";
import { PSICAgency } from "../db/schema/psd/psic-agency";
import { placeOfLoading } from "../db/schema/psd/place-of-loading";
import { portOfLoading } from "../db/schema/psd/port-of-loading";
import { portOfDestination } from "../db/schema/psd/port-of-destination";
import { placeOfDelivery } from "../db/schema/psd/place-of-delivery";
import { vesselName } from "../db/schema/psd/vessel-name";
import { salesOrder } from "../db/schema/psd/sales-order";

const psdRouter = {
  supplier: createGenericRouter({
    table: supplier,
    schema: insertSupplierSchema,
  }),
  freightForwarder: createGenericRouter({
    table: freightForwarder,
    schema: insertGeneralCompleteSchema,
  }),
  truckingCompany: createGenericRouter({
    table: truckingCompany,
    schema: insertGeneralCompleteSchema,
  }),
  customsHouseAgent: createGenericRouter({
    table: customsHouseAgent,
    schema: insertGeneralCompleteSchema,
  }),
  descriptionOfGoods: createGenericRouter({
    table: descriptionOfGoods,
    schema: insertDescriptionOfGoodsSchema,
  }),
  exportShippingInformation: createGenericRouter({
    table: exportShippingInformation,
    schema: insertExportShippingInformationSchema,
  }),
  PSICAgency: createGenericRouter({
    table: PSICAgency,
    schema: insertGeneralCompleteSchema,
  }),
  shippingLine: createGenericRouter({
    table: shippingLine,
    schema: insertGeneralNameSchema,
  }),
  placeOfLoading: createGenericRouter({
    table: placeOfLoading,
    schema: insertGeneralNameSchema,
  }),
  portOfLoading: createGenericRouter({
    table: portOfLoading,
    schema: insertGeneralNameSchema,
  }),
  portOfDestination: createGenericRouter({
    table: portOfDestination,
    schema: insertGeneralNameSchema,
  }),
  placeOfDelivery: createGenericRouter({
    table: placeOfDelivery,
    schema: insertGeneralNameSchema,
  }),
  vesselName: createGenericRouter({
    table: vesselName,
    schema: insertGeneralNameSchema,
  }),
  salesOrder: createGenericRouter({
    table: salesOrder,
    schema: insertGeneralNameSchema,
  }),
};

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  orgs: organizationRouter,
  users: userRouter,
  ...psdRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
export type AppRouterLike = RouterLike<typeof appRouter>;
export type AppRouterUtilsLike = UtilsLike<typeof appRouter>;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
