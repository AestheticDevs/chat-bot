"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { loginAction } from "@/app/action/auth";

export default function LoginForm() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const result = await loginAction(formData);

    if (result.error) {
      setError(result.error);
      return;
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 p-8 text-white shadow-lg">
      <h2 className="mb-2 text-center text-2xl font-semibold">Log in</h2>
      <p className="mb-6 text-center text-sm text-gray-300">
        Join to ultimate AI Assistant Bot.
      </p>

      <form action={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full rounded-md border border-gray-600 bg-black/40 px-4 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:outline-none"
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full rounded-md border border-gray-600 bg-black/40 px-4 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:outline-none"
          />
        </div>

        <Button
          type="submit"
          className="mt-4 w-full rounded-md bg-gradient-to-r from-teal-500 to-indigo-500 py-2 font-semibold text-white transition hover:opacity-90"
        >
          Sign in
        </Button>
      </form>

      {error && <p className="mt-4 text-center text-red-400">{error}</p>}
    </div>
  );
}
