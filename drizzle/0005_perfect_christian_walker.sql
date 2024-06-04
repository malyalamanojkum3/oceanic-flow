CREATE TABLE IF NOT EXISTS "oceanic-flow_item" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"notes" varchar(255)[],
	"orgId" varchar NOT NULL,
	CONSTRAINT "oceanic-flow_item_name_unique" UNIQUE("name")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "oceanic-flow_item" ADD CONSTRAINT "oceanic-flow_item_orgId_oceanic-flow_organization_id_fk" FOREIGN KEY ("orgId") REFERENCES "public"."oceanic-flow_organization"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
