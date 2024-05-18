DROP TABLE "oceanic-flow_organization_data";--> statement-breakpoint
ALTER TABLE "oceanic-flow_users_to_organizations" ADD COLUMN "permissions" bigint DEFAULT 4 NOT NULL;