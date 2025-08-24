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
import { logoutAction } from "@/app/action/auth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useLoadingStore } from "@/store/useLoadingStore";
import Loader from "../Loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);

  const { isLoading, setLoading } = useLoadingStore();

  console.log(open);
  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {
      const res = await fetch("/api/me");
      const data = await res.json();
      setLoggedIn(data.loggedIn);
    };

    checkLogin();
  }, []);

  const handleLogout = async () => {
    setLoading(true);
    await logoutAction();
    setOpen(false);
    router.push("/login");
    setLoading(false);
  };

  return (
    <header className="sticky top-0 z-50 flex backdrop-blur-xs dark:bg-gray-800">
      <div className="w-full px-4 py-4 container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a
              href="/"
              className="text-2xl font-bold text-gray-900 dark:text-white"
            >
              <img src="/logo-ksps.png" alt="" />
            </a>
          </div>

          {loggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-0">
                <Avatar>
                  <AvatarImage
                    src="https://avatar.iran.liara.run/public/39"
                    className="rounded-full"
                  />
                  <AvatarFallback>
                    <img srcSet="/placeholder-ava.png" alt="" />
                  </AvatarFallback>
                </Avatar>
                {/* <Avatar>
                  <div className="h-10 w-10 cursor-pointer rounded-full ring-2 ring-white">
                    <img alt="Avatar Image" />
                  </div>
                </Avatar> */}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="mt-2 w-36">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem>
                  <Link href="/admin/dashboard" className="w-full">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setOpen(true)}
                  className="hover:bg-transparen4 w-full border-0 bg-transparent text-rose-500 shadow-none hover:text-rose-600"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <nav className="flex space-x-1">
              {/* <Link href="/login">
                <Button variant={"accent"}>Sign In</Button>
              </Link> */}
            </nav>
          )}
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader className="text-center">
            <DialogTitle>Logout?</DialogTitle>
            <DialogDescription>
              Are you sure you want to log out?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              className="w-20 bg-rose-500 hover:bg-rose-600"
              onClick={handleLogout}
            >
              {isLoading ? <Loader /> : <span>Log Out</span>}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  );
};
