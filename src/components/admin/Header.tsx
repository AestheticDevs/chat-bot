"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { logoutAction } from "@/app/action/auth";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 flex border bg-slate-100 p-4 backdrop-blur-xs dark:bg-gray-800">
      <div className="mx-auto w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a
              href="/"
              className="text-2xl font-bold text-gray-900 dark:text-white"
            >
              <img
                src="/logo-ksps.png
              "
                alt=""
              />
            </a>
          </div>

          <Button onClick={() => logoutAction()}>Logout </Button>
          <DropdownMenu>
            <DropdownMenuTrigger>Open</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
