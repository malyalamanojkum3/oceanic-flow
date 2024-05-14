CREATE TABLE IF NOT EXISTS "oceanic-flow_customs-house-agent" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"countryCode" varchar(8) NOT NULL,
	"phone" varchar NOT NULL,
	"address" varchar(255) NOT NULL,
	"bank" varchar(255) NOT NULL,
	"orgId" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "oceanic-flow_description-of-goods" (
	"id" serial PRIMARY KEY NOT NULL,
	"quality_description" varchar(255) NOT NULL,
	"main_grade" varchar(255) NOT NULL,
	"hs_code" varchar(255) NOT NULL,
	"stream" varchar(15) NOT NULL,
	"orgId" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "oceanic-flow_export-shipping-information" (
	"id" serial PRIMARY KEY NOT NULL,
	"shipper" varchar(255) NOT NULL,
	"notify_party" varchar(255) NOT NULL,
	"consignee" varchar(255) NOT NULL,
	"bill_of_landing_notes" varchar(255) NOT NULL,
	"orgId" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "oceanic-flow_freight-forwarder" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"countryCode" varchar(8) NOT NULL,
	"phone" varchar NOT NULL,
	"address" varchar(255) NOT NULL,
	"bank" varchar(255) NOT NULL,
	"orgId" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "oceanic-flow_place-of-delivery" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"orgId" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "oceanic-flow_place-of-loading" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"orgId" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "oceanic-flow_port-of-destination" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"orgId" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "oceanic-flow_port-of-loading" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"orgId" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "oceanic-flow_psic-agency" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"countryCode" varchar(8) NOT NULL,
	"phone" varchar NOT NULL,
	"address" varchar(255) NOT NULL,
	"bank" varchar(255) NOT NULL,
	"orgId" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "oceanic-flow_sales-order" (
	"id" serial PRIMARY KEY NOT NULL,
	"special_terms" varchar(255) NOT NULL,
	"orgId" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "oceanic-flow_shipping-line" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"orgId" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "oceanic-flow_trucking-company" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"countryCode" varchar(8) NOT NULL,
	"phone" varchar NOT NULL,
	"address" varchar(255) NOT NULL,
	"bank" varchar(255) NOT NULL,
	"orgId" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "oceanic-flow_vessel-name" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"orgId" varchar NOT NULL
);
--> statement-breakpoint
ALTER TABLE "oceanic-flow_supplier" ALTER COLUMN "phone" SET DATA TYPE varchar;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "oceanic-flow_customs-house-agent" ADD CONSTRAINT "oceanic-flow_customs-house-agent_orgId_oceanic-flow_organization_id_fk" FOREIGN KEY ("orgId") REFERENCES "public"."oceanic-flow_organization"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "oceanic-flow_description-of-goods" ADD CONSTRAINT "oceanic-flow_description-of-goods_orgId_oceanic-flow_organization_id_fk" FOREIGN KEY ("orgId") REFERENCES "public"."oceanic-flow_organization"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "oceanic-flow_export-shipping-information" ADD CONSTRAINT "oceanic-flow_export-shipping-information_orgId_oceanic-flow_organization_id_fk" FOREIGN KEY ("orgId") REFERENCES "public"."oceanic-flow_organization"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "oceanic-flow_freight-forwarder" ADD CONSTRAINT "oceanic-flow_freight-forwarder_orgId_oceanic-flow_organization_id_fk" FOREIGN KEY ("orgId") REFERENCES "public"."oceanic-flow_organization"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "oceanic-flow_place-of-delivery" ADD CONSTRAINT "oceanic-flow_place-of-delivery_orgId_oceanic-flow_organization_id_fk" FOREIGN KEY ("orgId") REFERENCES "public"."oceanic-flow_organization"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "oceanic-flow_place-of-loading" ADD CONSTRAINT "oceanic-flow_place-of-loading_orgId_oceanic-flow_organization_id_fk" FOREIGN KEY ("orgId") REFERENCES "public"."oceanic-flow_organization"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "oceanic-flow_port-of-destination" ADD CONSTRAINT "oceanic-flow_port-of-destination_orgId_oceanic-flow_organization_id_fk" FOREIGN KEY ("orgId") REFERENCES "public"."oceanic-flow_organization"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "oceanic-flow_port-of-loading" ADD CONSTRAINT "oceanic-flow_port-of-loading_orgId_oceanic-flow_organization_id_fk" FOREIGN KEY ("orgId") REFERENCES "public"."oceanic-flow_organization"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "oceanic-flow_psic-agency" ADD CONSTRAINT "oceanic-flow_psic-agency_orgId_oceanic-flow_organization_id_fk" FOREIGN KEY ("orgId") REFERENCES "public"."oceanic-flow_organization"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "oceanic-flow_sales-order" ADD CONSTRAINT "oceanic-flow_sales-order_orgId_oceanic-flow_organization_id_fk" FOREIGN KEY ("orgId") REFERENCES "public"."oceanic-flow_organization"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "oceanic-flow_shipping-line" ADD CONSTRAINT "oceanic-flow_shipping-line_orgId_oceanic-flow_organization_id_fk" FOREIGN KEY ("orgId") REFERENCES "public"."oceanic-flow_organization"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "oceanic-flow_trucking-company" ADD CONSTRAINT "oceanic-flow_trucking-company_orgId_oceanic-flow_organization_id_fk" FOREIGN KEY ("orgId") REFERENCES "public"."oceanic-flow_organization"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "oceanic-flow_vessel-name" ADD CONSTRAINT "oceanic-flow_vessel-name_orgId_oceanic-flow_organization_id_fk" FOREIGN KEY ("orgId") REFERENCES "public"."oceanic-flow_organization"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
