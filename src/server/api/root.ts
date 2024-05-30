import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import type { RouterLike, UtilsLike } from "@trpc/react-query/shared";

import { organizationRouter } from "./routers/organization";
import { userRouter } from "./routers/users";
import { createGenericRouter } from "./routers/psd";
import  SupplierRouter  from "./routers/psd/supplier";
import  customsHouseAgentRouter  from "./routers/psd/customsHouseAgent";
import  freightForwarderRouter  from "./routers/psd/freightForwarder";
import  truckingCompanyRouter  from "./routers/psd/truckingCompany";
import  descriptionOfGoodsRouter  from "./routers/psd/descriptionOfGoods";
import  exportShippingInformationRouter  from "./routers/psd/exportShippingInformation";
import  PSICAgencyRouter  from "./routers/psd/PSICAgency";
import  shippingLineRouter  from "./routers/psd/shippingLine";
import  placeOfLoadingRouter  from "./routers/psd/placeOfLoading";
import  portOfLoadingRouter  from "./routers/psd/portOfLoading";
import  portOfDestinationRouter  from "./routers/psd/portOfDestination";
import  placeOfDeliveryRouter  from "./routers/psd/placeOfDelivery";
import  vesselNameRouter  from "./routers/psd/vesselName";
import  salesOrderRouter  from "./routers/psd/salesOrder";
import buyerRouter from "./routers/psd/buyer";  

const psdRouter = {
  supplier: SupplierRouter,
  customsHouseAgent: customsHouseAgentRouter,
  freightForwarder: freightForwarderRouter,
  truckingCompany: truckingCompanyRouter,
  descriptionOfGoods: descriptionOfGoodsRouter,
  exportShippingInformation: exportShippingInformationRouter,
  PSICAgency: PSICAgencyRouter,
  shippingLine: shippingLineRouter,
  placeOfLoading: placeOfDeliveryRouter,
  portOfLoading: portOfLoadingRouter,
  portOfDestination: portOfDestinationRouter,
  placeOfDelivery: placeOfDeliveryRouter,
  vesselName: vesselNameRouter,
  salesOrder: salesOrderRouter,
  buyer: buyerRouter,
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
