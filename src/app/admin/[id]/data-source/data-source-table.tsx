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
import { DownloadIcon, Pen } from "lucide-react";
import DeleteDataSourceAlert from "./delete-data-source-alert";
import { prisma } from "@/lib/prisma";
import { API_URL } from "@/lib/shared";
import EditDataSourceMetadataDialog from "./edit-data-source-metadata-dialog";

export default async function DataSourceTable({
  collectionId,
  search = "",
}: {
  collectionId: string;
  search?: string;
}) {
  const resPaginated = await fetch(`${API_URL}/documents-paginated/${collectionId}?search=${search}`);
  const dataPaginated = await resPaginated.json();

  return (
    <div>
      <div className="mt-6 grid grid-cols-1 overflow-hidden rounded-lg bg-white">
        {/* {JSON.stringify(documents)} */}
        {/* {`${API_URL}/documents/${collectionId}`} */}
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
            {dataPaginated.documents.length > 0 ? (
              dataPaginated.documents.map((source: any, i: any) => (
                <TableRow
                  className="h-14 odd:bg-slate-50 hover:bg-slate-50"
                  key={i}
                >
                  <Fragment>
                    <TableCell className="text-center font-medium">
                      {i + 1}
                    </TableCell>
                    <TableCell className="max-w-96 break-words">
                      <span className="block">{source.filename}</span>
                      <small className="text-blue-600 block">{source.saved_as}</small>
                      <small className="text-slate-600">{source.description}</small>
                    </TableCell>
                    <TableCell className="text-center">
                      {source.file_type}
                    </TableCell>
                    <TableCell className="text-center">
                      {formatBytes(source.file_size || 0)}
                    </TableCell>
                    <TableCell className="text-center">
                      {source.processing_status == "completed" ? (
                        <Badge className="bg-teal-500">Trained</Badge>
                      ) : source.processing_status == "failed" ? (
                        <Badge className="bg-red-500">Failed</Badge>
                      ) : (
                        <Badge className="bg-yellow-500">Processing</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <Button variant={"outline"} className="mr-2" asChild>
                        <a
                          href={`https://kspstk.layanan.co.id/download/${collectionId}/${source.filename}`}
                          download
                        >
                          <DownloadIcon />
                        </a>
                      </Button>
                      
                      <EditDataSourceMetadataDialog
                        id={source.id.toString()}
                        id_collection={source.id_collection}
                        nama={source.saved_as}
                        description={source.description}
                        document_id={source.id}
                      />
                      <DeleteDataSourceAlert
                        dbId={source.id}
                        documentId={source.id}
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
    </div>
  );
}
