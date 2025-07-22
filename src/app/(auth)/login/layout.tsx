import { ReactNode } from "react";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="absolute top-0 right-0 left-0 mx-auto mt-3 flex items-center justify-center">
        <a
          href="/"
          className="text-2xl font-bold text-gray-900 dark:text-white"
        >
          <img src="/logo-ksps.png" alt="" />
        </a>
      </div>{" "}
      <main className="grid h-screen w-screen place-items-center">
        {children}
      </main>
      <div className="absolute right-0 bottom-0 left-0 mx-auto mb-3 flex items-center justify-center">
        <small className="tracking-wide text-gray-500">
          Powered by{" "}
          <a href="" className="text-primary-brand font-medium">
            ChatBot.
          </a>
        </small>
      </div>{" "}
    </>
  );
}
