DO $$ BEGIN
 CREATE TYPE "public"."role" AS ENUM('admin', 'manager', 'viewer');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."type" AS ENUM('supplier', 'broker');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "oceanic-flow_account" (
	"userId" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"provider" varchar(255) NOT NULL,
	"providerAccountId" varchar(255) NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" varchar(255),
	"scope" varchar(255),
	"id_token" text,
	"session_state" varchar(255),
	CONSTRAINT "oceanic-flow_account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "oceanic-flow_organization_data" (

);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "oceanic-flow_session" (
	"sessionToken" varchar(255) PRIMARY KEY NOT NULL,
	"userId" varchar(255) NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "oceanic-flow_user" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"emailVerified" timestamp DEFAULT CURRENT_TIMESTAMP,
	"image" varchar(255),
	"hasOnboarded" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "oceanic-flow_verificationToken" (
	"identifier" varchar(255) NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "oceanic-flow_verificationToken_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "oceanic-flow_organization" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"createdAt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"ownerId" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "oceanic-flow_users_to_organizations" (
	"userId" varchar NOT NULL,
	"organizationId" varchar NOT NULL,
	"role" "role" DEFAULT 'viewer' NOT NULL,
	CONSTRAINT "oceanic-flow_users_to_organizations_userId_organizationId_pk" PRIMARY KEY("userId","organizationId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "oceanic-flow_supplier" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" "type" DEFAULT 'supplier' NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"countryCode" varchar(8) NOT NULL,
	"phone" varchar(15) NOT NULL,
	"address" varchar(255) NOT NULL,
	"bank" varchar(255) NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "oceanic-flow_account" ADD CONSTRAINT "oceanic-flow_account_userId_oceanic-flow_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."oceanic-flow_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "oceanic-flow_session" ADD CONSTRAINT "oceanic-flow_session_userId_oceanic-flow_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."oceanic-flow_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "oceanic-flow_organization" ADD CONSTRAINT "oceanic-flow_organization_ownerId_oceanic-flow_user_id_fk" FOREIGN KEY ("ownerId") REFERENCES "public"."oceanic-flow_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "oceanic-flow_users_to_organizations" ADD CONSTRAINT "oceanic-flow_users_to_organizations_userId_oceanic-flow_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."oceanic-flow_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "oceanic-flow_users_to_organizations" ADD CONSTRAINT "oceanic-flow_users_to_organizations_organizationId_oceanic-flow_organization_id_fk" FOREIGN KEY ("organizationId") REFERENCES "public"."oceanic-flow_organization"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "account_userId_idx" ON "oceanic-flow_account" ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "session_userId_idx" ON "oceanic-flow_session" ("userId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "email_idx" ON "oceanic-flow_user" ("email");