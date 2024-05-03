"use client";

import { type PropsWithChildren } from "react";

import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/primitives/dropdown-menu";
import { Sheet, SheetContent } from "../primitives/sheet";
import { ChevronsUpDown } from "lucide-react";
import Image from "next/image";

import { useMediaQuery } from "@/lib/hooks/use-media-query";
import { useUIStore } from "@/app/states/ui";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";

const DashboardSideBar = () => {
  const { data } = api.orgs.getUserOrgs.useQuery();
  return (
    <ResponsiveWrapper>
      <DropdownMenu>
        <DropdownMenuTrigger className="mt-4 w-full rounded border border-border bg-background p-2 px-4 lg:mt-0">
          <div className="flex flex-row items-center gap-2">
            <Image
              src="/REPLACE_ME.svg"
              alt="REPLACE ALT DESC"
              width={24}
              height={24}
            />
            <p className="font-medium">Organization</p>
            <ChevronsUpDown className="ml-auto" size={16} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full min-w-[270px]">
          <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">
            Organizations
          </DropdownMenuLabel>
          {data?.map((org) => <DropdownMenuItem>{org.name}</DropdownMenuItem>)}
        </DropdownMenuContent>
      </DropdownMenu>
    </ResponsiveWrapper>
  );
};

const ResponsiveWrapper = ({ children }: PropsWithChildren) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { sideBarToggled, toggleSideBar } = useUIStore((state) => state);
  if (!isDesktop)
    return (
      <Sheet onOpenChange={toggleSideBar} open={sideBarToggled}>
        <SheetContent side={"left"}>{children}</SheetContent>
      </Sheet>
    );
  return (
    <nav
      className={cn(
        "hidden min-w-[300px] flex-col border-r border-r-border bg-muted p-4 md:flex",
      )}
    >
      {children}
    </nav>
  );
};

export default DashboardSideBar;
