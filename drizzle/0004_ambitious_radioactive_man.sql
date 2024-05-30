DO $$ BEGIN
 CREATE TYPE "public"."cifOrCnf" AS ENUM('CIF', 'CNF');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."preferredCurrency" AS ENUM('USD', 'CAD');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "oceanic-flow_buyer" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"cifOrCnf" "cifOrCnf" NOT NULL,
	"address" varchar(255) NOT NULL,
	"countryCode" varchar(8) NOT NULL,
	"phone" varchar NOT NULL,
	"email" varchar(255) NOT NULL,
	"bank" varchar(255),
	"customsHouseAgentId" varchar NOT NULL,
	"proFormaInvoiceRequired" boolean DEFAULT false,
	"preferredCurrency" "preferredCurrency" NOT NULL,
	"portOfDestinationId" varchar NOT NULL,
	"orgId" varchar NOT NULL,
	CONSTRAINT "oceanic-flow_buyer_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "oceanic-flow_customs-house-agent" ALTER COLUMN "id" SET DATA TYPE varchar(36);--> statement-breakpoint
ALTER TABLE "oceanic-flow_description-of-goods" ALTER COLUMN "id" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "oceanic-flow_export-shipping-information" ALTER COLUMN "id" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "oceanic-flow_freight-forwarder" ALTER COLUMN "id" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "oceanic-flow_place-of-delivery" ALTER COLUMN "id" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "oceanic-flow_place-of-loading" ALTER COLUMN "id" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "oceanic-flow_port-of-destination" ALTER COLUMN "id" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "oceanic-flow_port-of-loading" ALTER COLUMN "id" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "oceanic-flow_psic-agency" ALTER COLUMN "id" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "oceanic-flow_sales-order" ALTER COLUMN "id" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "oceanic-flow_shipping-line" ALTER COLUMN "id" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "oceanic-flow_supplier" ALTER COLUMN "id" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "oceanic-flow_trucking-company" ALTER COLUMN "id" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "oceanic-flow_vessel-name" ALTER COLUMN "id" SET DATA TYPE varchar;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "oceanic-flow_buyer" ADD CONSTRAINT "oceanic-flow_buyer_customsHouseAgentId_oceanic-flow_customs-house-agent_id_fk" FOREIGN KEY ("customsHouseAgentId") REFERENCES "public"."oceanic-flow_customs-house-agent"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "oceanic-flow_buyer" ADD CONSTRAINT "oceanic-flow_buyer_portOfDestinationId_oceanic-flow_port-of-destination_id_fk" FOREIGN KEY ("portOfDestinationId") REFERENCES "public"."oceanic-flow_port-of-destination"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "oceanic-flow_buyer" ADD CONSTRAINT "oceanic-flow_buyer_orgId_oceanic-flow_organization_id_fk" FOREIGN KEY ("orgId") REFERENCES "public"."oceanic-flow_organization"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "oceanic-flow_customs-house-agent" ADD CONSTRAINT "oceanic-flow_customs-house-agent_name_unique" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "oceanic-flow_description-of-goods" ADD CONSTRAINT "oceanic-flow_description-of-goods_quality_description_unique" UNIQUE("quality_description");--> statement-breakpoint
ALTER TABLE "oceanic-flow_export-shipping-information" ADD CONSTRAINT "oceanic-flow_export-shipping-information_shipper_unique" UNIQUE("shipper");--> statement-breakpoint
ALTER TABLE "oceanic-flow_freight-forwarder" ADD CONSTRAINT "oceanic-flow_freight-forwarder_name_unique" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "oceanic-flow_place-of-delivery" ADD CONSTRAINT "oceanic-flow_place-of-delivery_name_unique" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "oceanic-flow_place-of-loading" ADD CONSTRAINT "oceanic-flow_place-of-loading_name_unique" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "oceanic-flow_port-of-destination" ADD CONSTRAINT "oceanic-flow_port-of-destination_name_unique" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "oceanic-flow_port-of-loading" ADD CONSTRAINT "oceanic-flow_port-of-loading_name_unique" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "oceanic-flow_psic-agency" ADD CONSTRAINT "oceanic-flow_psic-agency_name_unique" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "oceanic-flow_sales-order" ADD CONSTRAINT "oceanic-flow_sales-order_special_terms_unique" UNIQUE("special_terms");--> statement-breakpoint
ALTER TABLE "oceanic-flow_shipping-line" ADD CONSTRAINT "oceanic-flow_shipping-line_name_unique" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "oceanic-flow_supplier" ADD CONSTRAINT "oceanic-flow_supplier_name_unique" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "oceanic-flow_trucking-company" ADD CONSTRAINT "oceanic-flow_trucking-company_name_unique" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "oceanic-flow_vessel-name" ADD CONSTRAINT "oceanic-flow_vessel-name_name_unique" UNIQUE("name");