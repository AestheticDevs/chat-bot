"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLoadingStore } from "@/store/useLoadingStore";

export function RouteChangeReset() {
  const pathname = usePathname();
  const { setLoading } = useLoadingStore();

  useEffect(() => {
    // Setiap kali route berubah, matikan loading
    setLoading(false);
  }, [pathname, setLoading]);

  return null;
}
