"use client";

import { signOut } from "next-auth/react";

import { useUIStore } from "@/app/states/ui";
import { useMediaQuery } from "@/lib/hooks/use-media-query";
import { Loader2, LogOut, Menu, Moon, Sun, SunMoon } from "lucide-react";
import { Avatar, AvatarImage } from "../primitives/avatar";
import { type Session } from "next-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../primitives/dropdown-menu";
import { useTheme } from "next-themes";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { usePathname } from "next/navigation";

const DashboardTopBar = ({ session }: { session: Session | null }) => {
  const UIstate = useUIStore();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { setTheme } = useTheme();
  const pn = usePathname();

  return (
    <nav className="flex h-20 w-full items-center p-4 py-6">
      {!isDesktop && pn.startsWith("/dashboard/") && (
        <Menu onClick={UIstate.toggleSideBar} />
      )}
      <DropdownMenu>
        <DropdownMenuTrigger className="ml-auto">
          <Avatar className="items-center justify-center ring-2 ring-ring ring-offset-2 ring-offset-background">
            <AvatarImage src={session?.user.image ?? ""} />
            <AvatarFallback>
              <Loader2 className="animate-spin" />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="" align="end">
          <DropdownMenuLabel className="text-sm text-secondary-foreground">
            {session?.user.email}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <SunMoon /> <span className=" ml-2 font-semibold">Theme</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun /> <span>Light</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon /> <span>Dark</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuItem onClick={() => signOut()}>
            <LogOut /> <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export default DashboardTopBar;
