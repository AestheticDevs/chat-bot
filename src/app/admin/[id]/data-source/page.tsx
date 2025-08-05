import AddDataSourceDialog from "./add-data-source-dialog";
import RefreshButton from "./refresh-button";
import DataSourceTable from "./data-source-table";

export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
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
        <div className="flex items-center">
          <RefreshButton collectionId={id} />
          <AddDataSourceDialog collectionId={id} />
        </div>
      </div>
      <DataSourceTable collectionId={id} />
    </div>
  );
}
