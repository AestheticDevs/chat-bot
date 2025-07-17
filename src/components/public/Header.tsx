import Link from "next/link";
import { Button } from "../ui/button";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 flex backdrop-blur-xs dark:bg-gray-800">
      <div className="container mx-auto px-4 py-4">
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
            <Link href="/admin/dashboard">
              <Button variant={"accent"}>Sign In</Button>
            </Link>
            <Button>Register</Button>
          </nav>
        </div>
      </div>
    </header>
  );
};
