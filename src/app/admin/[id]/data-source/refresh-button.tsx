"use client";

import { Button } from "@/components/ui/button";
import { RefreshCcwIcon } from "lucide-react";
import revalidateDataSourceAction from "./actions/revalidate-data-source";
import { useState } from "react";
import { toast } from "sonner";

export default function RefreshButton({
  collectionId,
}: {
  collectionId: string;
}) {
  const [revalidating, setRevalidating] = useState(false);

  async function handleRefresh() {
    setRevalidating(true);
    try {
      await revalidateDataSourceAction(collectionId);
    } catch (error) {
      toast.error("Failed to refresh data source");
    }
    setTimeout(() => {
      setRevalidating(false);
    }, 100);
  }

  return (
    <Button variant={"outline"} className="mr-2" onClick={handleRefresh}>
      <RefreshCcwIcon className={`${revalidating ? "animate-spin" : ""}`} />
      Refresh
    </Button>
  );
}
