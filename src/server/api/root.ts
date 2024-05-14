import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import type { RouterLike, UtilsLike } from "@trpc/react-query/shared";

import { organizationRouter } from "./routers/organization";
import { userRouter } from "./routers/users";
import { supplierRouter } from "./routers/psd/supplier";
import { freightForwarderRouter } from "./routers/psd/freight-forwarder";
import { truckingCompanyRouter } from "./routers/psd/trucking-company";
import { customsHouseAgentRouter } from "./routers/psd/customs-house-agent";
import { descriptionOfGoodsRouter } from "./routers/psd/description-of-goods";
import { exportShippingInformationRouter } from "./routers/psd/export-shipping-information";
import { PSICAgencyRouter } from "./routers/psd/psic-agency";
import { shippingLineRouter } from "./routers/psd/shipping-line";
import { placeOfLoadingRouter } from "./routers/psd/place-of-loading";
import { portOfLoadingRouter } from "./routers/psd/port-of-loading";
import { portOfDestinationRouter } from "./routers/psd/port-of-destination";
import { placeOfDeliveryRouter } from "./routers/psd/place-of-delivery";
import { vesselNameRouter } from "./routers/psd/vessel-name";
import { salesOrderRouter } from "./routers/psd/sales-order";

const psdRouter = {
  supplier: supplierRouter,
  freightForwarder: freightForwarderRouter,
  truckingCompany: truckingCompanyRouter,
  customsHouseAgent: customsHouseAgentRouter,
  descriptionOfGoods: descriptionOfGoodsRouter,
  exportShippingInformation: exportShippingInformationRouter,
  PSICAgency: PSICAgencyRouter,
  shippingLine: shippingLineRouter,
  placeOfLoading: placeOfLoadingRouter,
  portOfLoading: portOfLoadingRouter,
  portOfDestination: portOfDestinationRouter,
  placeOfDelivery: placeOfDeliveryRouter,
  vesselName: vesselNameRouter,
  salesOrder: salesOrderRouter,
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
