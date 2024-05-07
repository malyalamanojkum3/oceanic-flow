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

export const primaryDataSource = [
  { name: "Supplier", icon: <Box /> },
  {
    name: "Freight Forwarder",
    icon: <PlaneTakeoffIcon />,
  },
  {
    name: "Trucking Company",
    icon: <Truck />,
  },
  {
    name: "Customs House Agent",
    icon: <Container />,
  },
  {
    name: "Description Of Goods",
    icon: <Info />,
  },
  {
    name: "Export Shipping Information",
    icon: <Plane />,
  },
  {
    name: "PSIC Agency",
    icon: <Home />,
  },
  {
    name: "Shipping Line",
    icon: <ClipboardPenLine />,
  },
  {
    name: "Place Of Loading",
    icon: <BaggageClaim />,
  },
  {
    name: "Port Of Loading",
    icon: <Warehouse />,
  },
  {
    name: "Port Of Destination",
    icon: <Package />,
  },
  {
    name: "Place Of Delivery",
    icon: <PackageCheck />,
  },
  {
    name: "Vessel Name",
    icon: <Ship />,
  },
  {
    name: "Sales Order",
    icon: <Boxes />,
  },
  {
    name: "Buyer",
    icon: <BadgeCent />,
  },
];
