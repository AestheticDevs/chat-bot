"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const res = await fetch("/api/me");
      const data = await res.json();
      console.log(data);
      setLoggedIn(data.loggedIn);
    };

    checkLogin();
  }, []);

  return (
    <header className="sticky top-0 z-50 flex border backdrop-blur-xs dark:bg-gray-800">
      <div className="w-full px-4 py-4">
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

          {loggedIn ? (
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
          ) : (
            <nav className="flex space-x-1">
              <Link href="/login">
                <Button variant={"accent"}>Sign In</Button>
              </Link>
              <Button>Register</Button>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};
