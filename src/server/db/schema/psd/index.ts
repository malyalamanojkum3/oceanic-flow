import * as supplier from "./supplier";
import * as freightForwarder from "./freight-forwarder";
import * as truckingCompany from "./trucking-company";
import * as customsHouseAgent from "./customs-house-agent";
import * as descriptionOfGoods from "./descriptions-of-goods";
import * as exportShippingInformation from "./export-shipping-information";
import * as PSICAgency from "./psic-agency";
import * as shippingLine from "./shipping-line";
import * as placeOfLoading from "./place-of-loading";
import * as portOfLoading from "./port-of-loading";
import * as portOfDestination from "./port-of-destination";
import * as placeOfDelivery from "./place-of-delivery";
import * as vesselName from "./vessel-name";
import * as salesOrder from "./sales-order";
import * as buyer from "./buyer";

export const psd = {
  ...supplier,
  ...freightForwarder,
  ...truckingCompany,
  ...customsHouseAgent,
  ...descriptionOfGoods,
  ...exportShippingInformation,
  ...PSICAgency,
  ...shippingLine,
  ...placeOfLoading,
  ...portOfLoading,
  ...portOfDestination,
  ...placeOfDelivery,
  ...vesselName,
  ...salesOrder,
  ...buyer,
};
