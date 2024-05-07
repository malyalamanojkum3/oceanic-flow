"use client";

import { api } from "@/trpc/react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/primitives/card";

import moment from "moment";
import { useRouter } from "next/navigation";
import AddOrganizationCard from "@/components/dashboard/add-org-card";
import { Skeleton } from "@/components/primitives/skeleton";

const Dashboard = () => {
  const queryOrgs = api.orgs.getUserOrgs.useQuery();
  const router = useRouter();

  return (
    <>
      <main>
        <div className="mb-4">
          <h1 className="text-3xl font-semibold">Your Organizations</h1>
          <p className="text-muted-foreground">
            Select one of your organizations to get started or create a new one.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {queryOrgs.isLoading && <Skeleton className="h-24 w-full" />}
          {queryOrgs.data?.map(({ organizations: { name, createdAt, id } }) => (
            <Card
              key={id}
              onClick={() => router.push(`/dashboard/org/${id}/overview`)}
              className="cursor-pointer bg-muted"
            >
              <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription>
                  Created {moment(createdAt).fromNow()}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
          <AddOrganizationCard />
          <div>
            <h2></h2>
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
