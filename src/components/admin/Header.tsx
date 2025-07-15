import Link from "next/link";
import { Button } from "../ui/button";

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
              MyApp
            </a>
          </div>
          <nav className="flex space-x-1">
            <Link href="/admin">
              <Button variant={"accent"}>Sign In</Button>
            </Link>
            <Button>Register</Button>
          </nav>
        </div>
      </div>
    </header>
  );
};
