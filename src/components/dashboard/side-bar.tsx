"use client";

import { type ReactNode, type PropsWithChildren } from "react";

import { useMediaQuery } from "@/lib/hooks/use-media-query";
import { uiStore } from "@/app/states/ui";
import { cn } from "@/lib/utils";

import { Sheet, SheetContent } from "../primitives/sheet";

import { usePathname } from "next/navigation";
import Link from "next/link";
import slugify from "slugify";

import { primaryDataSource } from "@/lib/psd";
import { Bolt, SquareDashedKanban, UserRoundCog } from "lucide-react";

import dynamic from "next/dynamic";
import { Skeleton } from "../primitives/skeleton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../primitives/accordion";
import { buttonVariants } from "../primitives/button";
import { api } from "@/trpc/react";
import { ACCESS, ACCESS_ROLES } from "@/lib/permissions";
import { orgUrl } from "@/lib/psd";
const SelectOrganizationsDropdown = dynamic(() => import("./select-orgs"), {
  ssr: false,
  loading: () => (
    <div className="flex w-full items-center">
      <Skeleton className="mx-auto h-10 w-full" />
    </div>
  ),
});



const DashboardSideBar = () => {
  const pathname = usePathname();
  const toggle = uiStore.use.sideBarToggled();
  const currentOrgId = uiStore.use.currentOrgId();
  const query = api.orgs.getUserPermission.useQuery({
    id: currentOrgId,
  });

  if (!pathname.startsWith("/dashboard/")) return <></>;
  if (query.isPending || !query.data)
    return (
      <div className="min-w-[300px] border-r border-border p-4">
        <Skeleton className="h-10 w-full" />
        <div className="mt-6 space-y-2">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    );

  return (
    <ResponsiveWrapper>
      <SelectOrganizationsDropdown />
      <hr className="my-2 border-0" />
      <div className="no-scrollbar space-y-1 overflow-y-scroll">
        <DashboardSideBarMenu>
          <DashboardSideBarLink
            onClick={() => uiStore.set.sideBarToggled(!toggle)}
            href={`/dashboard/org/${currentOrgId}/overview`}
            icon={<SquareDashedKanban />}
          >
            Dashboard
          </DashboardSideBarLink>
        </DashboardSideBarMenu>
        <DashboardSideBarMenu>
          <Accordion type="single" collapsible>
            <AccordionItem value={"psd"} className="space-y-1.5 border-b-0">
              <AccordionTrigger
                className={cn(
                  buttonVariants({
                    size: "sidebar",
                    variant: "sidebar",
                  }),
                  "justify-start",
                )}
              >
                <Bolt />
                Primary Source Data
              </AccordionTrigger>
              <AccordionContent>
                <div className="ml-4 flex flex-col space-y-1">
                  {primaryDataSource.map((source) => (
                    <Link
                      onClick={() => uiStore.set.sideBarToggled(!toggle)}
                      key={source.name}
                      href={`${orgUrl}/${currentOrgId}/${slugify(source.name, { lower: true, trim: true })}`}
                      className={cn(
                        buttonVariants({
                          size: "sidebar",
                          variant: "sidebar",
                        }),
                        "justify-start",
                      )}
                    >
                      {source.icon}
                      {source.name}
                    </Link>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </DashboardSideBarMenu>
        {query.data.permissions & ACCESS.admin ? (
          <DashboardSideBarMenu>
            <DashboardSideBarLink
              onClick={() => uiStore.set.sideBarToggled(!toggle)}
              href={`/dashboard/org/${currentOrgId}/settings`}
              icon={<UserRoundCog />}
            >
              User Management
            </DashboardSideBarLink>
          </DashboardSideBarMenu>
        ) : null}
      </div>
    </ResponsiveWrapper>
  );
};

interface DashboardSidebarItemProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  icon: ReactNode;
}

const DashboardSideBarMenu = ({ children }: PropsWithChildren) => {
  return <div>{children}</div>;
};

const DashboardSideBarLink = (props: DashboardSidebarItemProps) => {
  return (
    <Link
      {...props}
      href={props.href}
      className={cn(
        "flex items-center gap-2 rounded px-4 py-3 text-sm font-medium transition-all hover:bg-accent-foreground hover:text-accent",
        props.className,
      )}
    >
      {props.icon}
      <span className="truncate">{props.children}</span>
    </Link>
  );
};

const ResponsiveWrapper = ({ children }: PropsWithChildren) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const toggle = uiStore.use.sideBarToggled();
  if (!isDesktop)
    return (
      <Sheet
        onOpenChange={() => uiStore.set.sideBarToggled(!toggle)}
        open={toggle}
      >
        <SheetContent className="no-scrollbar overflow-y-scroll" side={"left"}>
          {children}
        </SheetContent>
      </Sheet>
    );
  return (
    <nav
      className={cn(
        "hidden min-w-[300px] flex-col border-r border-r-border p-4 md:flex",
      )}
    >
      {children}
    </nav>
  );
};

export default DashboardSideBar;
