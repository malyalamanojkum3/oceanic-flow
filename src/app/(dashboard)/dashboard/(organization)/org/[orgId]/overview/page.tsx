"use client"
import {
  BadgeCent,
  BaggageClaim,
  Box,
  Boxes,
  ClipboardPenLine,
  Container,
  Home,
  Info,
  Package,
  PackageCheck,
  Plane,
  PlaneTakeoffIcon,
  Ship,
  Truck,
  Warehouse,
} from "lucide-react";
import { api } from "@/trpc/react";
import { uiStore } from "@/app/states/ui";
import Card from "@/components/dashboard/cards/card";

const DashboardOrgPage = () => {
const currentOrgId = uiStore.get.currentOrgId();
const supplier = api.supplier.count.useQuery(currentOrgId);
const freightForwarder = api.freightForwarder.count.useQuery(currentOrgId);
const truckingCompany = api.truckingCompany.count.useQuery(currentOrgId);
const customsHouseAgent = api.customsHouseAgent.count.useQuery(currentOrgId);
const descriptionOfGoods = api.descriptionOfGoods.count.useQuery(currentOrgId);
const exportShippingInformation = api.exportShippingInformation.count.useQuery(currentOrgId);
const psicAgency = api.PSICAgency.count.useQuery(currentOrgId);
const shippingLine = api.shippingLine.count.useQuery(currentOrgId);
const placeOfLoading = api.placeOfLoading.count.useQuery(currentOrgId);
const portOfLoading = api.portOfLoading.count.useQuery(currentOrgId);
const portOfDestination = api.portOfDestination.count.useQuery(currentOrgId);
const placeOfDelivery = api.placeOfDelivery.count.useQuery(currentOrgId);
const vesselName = api.vesselName.count.useQuery(currentOrgId);
const salesOrder = api.salesOrder.count.useQuery(currentOrgId);
const buyer = api.buyer.count.useQuery(currentOrgId);

  const primaryDataSource = [
    { 
      name: "Supplier", 
      icon: <Box />, 
      digits: supplier.data ?? 0
    },
    {
      name: "Freight Forwarder",
      icon: <PlaneTakeoffIcon />,
      digits: freightForwarder.data ?? 0
    },
    {
      name: "Trucking Company",
      icon: <Truck />,
      digits: truckingCompany.data ?? 0
    },
    {
      name: "Customs House Agent",
      icon: <Container />,
      digits: customsHouseAgent.data ?? 0
    },
    {
      name: "Description Of Goods",
      icon: <Info />,
      digits: descriptionOfGoods.data ?? 0
    },
    {
      name: "Export Shipping Information",
      icon: <Plane />,
      digits: exportShippingInformation.data ?? 0
    },
    {
      name: "PSIC Agency",
      icon: <Home />,
      digits: psicAgency.data ?? 0
    },
    {
      name: "Shipping Line",
      icon: <ClipboardPenLine />,
      digits: shippingLine.data ?? 0
    },
    {
      name: "Place Of Loading",
      icon: <BaggageClaim />,
      digits: placeOfLoading.data ?? 0
    },
    {
      name: "Port Of Loading",
      icon: <Warehouse />,
      digits: portOfLoading.data ?? 0
    },
    {
      name: "Port Of Destination",
      icon: <Package />,
      digits: portOfDestination.data ?? 0
    },
    {
      name: "Place Of Delivery",
      icon: <PackageCheck />,
      digits: placeOfDelivery.data ?? 0
    },
    {
      name: "Vessel Name",
      icon: <Ship />,
      digits: vesselName.data ?? 0
    },
    {
      name: "Sales Order",
      icon: <Boxes />,
      digits: salesOrder.data ?? 0
    },
    {
      name: "Buyer",
      icon: <BadgeCent />,
      digits: buyer.data ?? 0
    },
  ];
  return <Card topcards={primaryDataSource} />;
};
export default DashboardOrgPage;