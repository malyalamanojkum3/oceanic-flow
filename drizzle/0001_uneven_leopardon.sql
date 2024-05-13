ALTER TABLE "oceanic-flow_supplier" ADD COLUMN "orgId" varchar NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "oceanic-flow_supplier" ADD CONSTRAINT "oceanic-flow_supplier_orgId_oceanic-flow_organization_id_fk" FOREIGN KEY ("orgId") REFERENCES "public"."oceanic-flow_organization"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
