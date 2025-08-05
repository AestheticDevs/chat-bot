import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Fragment } from "react";
import { formatBytes } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";
import DeleteDataSourceAlert from "./delete-data-source-alert";
import { prisma } from "@/lib/prisma";

export default async function DataSourceTable({
  collectionId,
}: {
  collectionId: string;
}) {
  // const source =
  const data = await prisma.data_sources.findMany({
    where: { id_collection: collectionId },
  });
  return (
    <div className="mt-6 grid grid-cols-1 overflow-hidden rounded-lg bg-white">
      <Table>
        <TableHeader className="h-14 bg-white">
          <TableRow>
            <TableHead className="w-16 text-center">No.</TableHead>
            <TableHead className="max-w-96">Nama</TableHead>
            <TableHead className="text-center">Tipe</TableHead>
            <TableHead className="text-center">Ukuran</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((source, i) => (
              <TableRow
                className="h-14 odd:bg-slate-50 hover:bg-slate-50"
                key={i}
              >
                <Fragment>
                  <TableCell className="text-center font-medium">
                    {i + 1}
                  </TableCell>
                  <TableCell className="max-w-96 break-words">
                    {source.name}
                  </TableCell>
                  <TableCell className="text-center">
                    {source.file_type}
                  </TableCell>
                  <TableCell className="text-center">
                    {formatBytes(source.file_size || 0)}
                  </TableCell>
                  <TableCell className="text-center">
                    {source.is_trained ? (
                      <Badge className="bg-teal-500">Trained</Badge>
                    ) : (
                      <Badge className="bg-yellow-500">Processing</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <Button variant={"outline"} className="mr-2" asChild>
                      <a
                        href={`https://kspstk.layanan.co.id/download/${collectionId}/${source.name}`}
                        download
                      >
                        <DownloadIcon />
                      </a>
                    </Button>
                    <DeleteDataSourceAlert
                      id={source.id}
                      collectionId={collectionId}
                    />
                  </TableCell>
                </Fragment>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                className="text-muted-foreground text-center font-medium"
                colSpan={6}
              >
                Belum ada data source ditambahkan
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
