"use client";

import { type ReactNode, type PropsWithChildren } from "react";

import { useMediaQuery } from "@/lib/hooks/use-media-query";
import { useUIStore } from "@/app/states/ui";
import { cn } from "@/lib/utils";

import { Sheet, SheetContent } from "../primitives/sheet";

import { usePathname } from "next/navigation";
import SelectOrganizationsDropdown from "./select-orgs";
import Link from "next/link";

import { useShallow } from "zustand/react/shallow";
import slugify from "slugify";

import { primaryDataSource } from "@/lib/psd";
import { SquareDashedKanban, UserRoundCog } from "lucide-react";

const orgUrl = "/dashboard/org";

const DashboardSideBar = () => {
  const pathname = usePathname();
  const { currentOrgId, toggleSideBar } = useUIStore(
    useShallow((state) => ({
      currentOrgId: state.currentOrgId,
      toggleSideBar: state.toggleSideBar,
    })),
  );
  if (!pathname.startsWith("/dashboard/")) return <></>;
  return (
    <ResponsiveWrapper>
      <SelectOrganizationsDropdown />
      <hr className="my-2 border-0" />
      <div className="no-scrollbar space-y-4 overflow-y-scroll">
        <DashboardSideBarMenu>
          <DashboardSideBarLink
            onClick={toggleSideBar}
            href={`/dashboard/org/${currentOrgId}/overview`}
            icon={<SquareDashedKanban />}
          >
            Dashboard
          </DashboardSideBarLink>
        </DashboardSideBarMenu>
        <DashboardSideBarMenu>
          <DashboardSideBarHeader>Primary Data Source</DashboardSideBarHeader>
          <div className="space-y-0.5">
            {primaryDataSource.map((source) => (
              <DashboardSideBarLink
                onClick={toggleSideBar}
                key={source.name}
                href={`${orgUrl}/${currentOrgId}/${slugify(source.name, { lower: true, trim: true })}`}
                icon={source.icon}
              >
                {source.name}
              </DashboardSideBarLink>
            ))}
          </div>
        </DashboardSideBarMenu>
        <DashboardSideBarMenu>
          <DashboardSideBarHeader>Settings</DashboardSideBarHeader>
          <DashboardSideBarLink
            onClick={toggleSideBar}
            href={`/dashboard/org/${currentOrgId}/settings`}
            icon={<UserRoundCog />}
          >
            User Management
          </DashboardSideBarLink>
        </DashboardSideBarMenu>
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

const DashboardSideBarHeader = ({ children }: PropsWithChildren) => {
  return <h2 className="mb-2 text-xs font-semibold">{children}</h2>;
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
  const { sideBarToggled, toggleSideBar } = useUIStore((state) => state);
  if (!isDesktop)
    return (
      <Sheet onOpenChange={toggleSideBar} open={sideBarToggled}>
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
