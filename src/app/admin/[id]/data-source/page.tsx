import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddDataSourceDialog from "./add-data-source-dialog";
import { API_URL } from "@/lib/shared";
import { ListDocumentInCollectionResult } from "@/types/data-source.types";
import { Fragment } from "react";
import { formatBytes } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DownloadIcon, RefreshCcwIcon, TrashIcon } from "lucide-react";
import DeleteDataSourceAlert from "./delete-data-source-alert";
import RefreshButton from "./refresh-button";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: any }) {
  const id = (await params).id;
  const res = await fetch(`${API_URL}/documents/${id}`);
  const data = (await res.json()) as ListDocumentInCollectionResult;
  return (
    // Wrapper
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold">Data Source</div>
        <div className="flex items-center">
          <RefreshButton collectionId={id} />
          <AddDataSourceDialog collectionId={id} />
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1">
        <Table>
          <TableHeader className="h-14 bg-white">
            <TableRow>
              <TableHead className="w-12 text-center">#</TableHead>
              <TableHead>Trained Items</TableHead>
              <TableHead className="text-center">Type</TableHead>
              <TableHead className="text-center">Filesize</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.documents ? (
              data.documents.map((document, i) => (
                <TableRow
                  className="h-14 even:bg-slate-200 hover:bg-slate-50"
                  key={i}
                >
                  <Fragment>
                    <TableCell className="text-center font-medium">
                      {i + 1}
                    </TableCell>
                    <TableCell>{document.filename}</TableCell>
                    <TableCell className="text-center">
                      {document.file_type}
                    </TableCell>
                    <TableCell className="text-center">
                      {formatBytes(document.file_size || 0)}
                    </TableCell>
                    <TableCell className="text-center">
                      {document.processing_status === "processing" ? (
                        <Badge className="bg-yellow-500">Processing</Badge>
                      ) : (
                        <Badge className="bg-teal-500">Trained</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <Button variant={"outline"} className="mr-2" asChild>
                        <a
                          href={`https://kspstk.layanan.co.id/download/${id}/${document.filename}`}
                          download
                        >
                          <DownloadIcon />
                        </a>
                      </Button>
                      <DeleteDataSourceAlert
                        id={document.id}
                        collectionId={id}
                      />
                    </TableCell>
                  </Fragment>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell className="text-center font-medium" colSpan={4}>
                  Belum ada data source ditambahkan
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Dialog */}
    </div>
  );
}
