import AddDataSourceDialog from "./add-data-source-dialog";
import RefreshButton from "./refresh-button";
import DataSourceTable from "./data-source-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const id = (await params).id;
  const search = (await searchParams).search as string;
  return (
    // Wrapper
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">Data Source</h3>
          <p className="text-muted-foreground">
            Tempat untuk untuk menambahkan data untuk dipelajari AI.
          </p>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <form className="flex items-center gap-3">
          <Input
            name="search"
            placeholder="Cari..."
            defaultValue={search}
            className="w-64 bg-white"
          />
          <Button className="rounded-md">Cari</Button>
          {search ? (
            <Link
              href={`/admin/${id}/data-source`}
              className="border-b border-slate-800 text-sm"
            >
              Reset
            </Link>
          ) : null}
        </form>
        <div className="flex items-center">
          <RefreshButton collectionId={id} />
          <AddDataSourceDialog collectionId={id} />
        </div>
      </div>
      <DataSourceTable search={search} collectionId={id} />
    </div>
  );
}
