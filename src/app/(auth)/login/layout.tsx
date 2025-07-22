import { ReactNode } from "react";
import { Footer } from "@/components/public/Footer";
import { Header } from "@/components/public/Header";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="absolute top-0 right-0 left-0 mx-auto mt-3 flex items-center justify-center">
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
      </div>{" "}
      <main className="grid h-screen w-screen place-items-center">
        {children}
      </main>
    </>
  );
}
