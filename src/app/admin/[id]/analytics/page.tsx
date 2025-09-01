// "use client"

import DateFilter from "./date-filter";
import { Suspense } from "react";
import DataWrapper from "./data-wrapper";
import PageLoader from "@/components/page-loader";

export default async function AnalyticsDashboard({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex w-full items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">
              Chat Analytics
            </h1>
            <p className="text-muted-foreground">
              Analisis tentang performa sistem obrolan dan keterlibatan pengguna
              Anda
            </p>
          </div>
          <DateFilter />
        </div>
        <Suspense
          fallback={<PageLoader />}
          key={JSON.stringify(await searchParams)}
        >
          <DataWrapper params={params} searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
