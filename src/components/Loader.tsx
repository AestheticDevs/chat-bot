"use client";
import { useLoadingStore } from "@/store/useLoadingStore";
import { LoaderPinwheelIcon } from "lucide-react";

export default function Loader() {
  const { isLoading } = useLoadingStore();

  if (!isLoading) return null;

  return (
    <div className="animate-spin">
      <LoaderPinwheelIcon />
    </div>
  );
}
