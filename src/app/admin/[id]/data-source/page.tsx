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

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { id: string } }) {
  const res = await fetch(`${API_URL}/documents/${params.id}`);
  const data = (await res.json()) as ListDocumentInCollectionResult;
  return (
    // Wrapper
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold">Data Source</div>
        <AddDataSourceDialog />
      </div>
      <div className="mt-6 grid grid-cols-1">
        <Table>
          <TableHeader className="h-14 bg-white">
            <TableRow>
              <TableHead className="w-12 text-center">#</TableHead>
              <TableHead>Trained Items</TableHead>
              <TableHead className="text-center">Type</TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="h-14 even:bg-slate-200 hover:bg-slate-50">
              {data.documents ? (
                data.documents.map((document, i) => (
                  <Fragment key={i}>
                    <TableCell className="text-center font-medium">
                      {i + 1}
                    </TableCell>
                    <TableCell>{document.filename}</TableCell>
                    <TableCell className="text-center">{document.file_type}</TableCell>
                    <TableCell className="text-center">
                      <Badge className="bg-teal-500">Trained</Badge>
                    </TableCell>
                  </Fragment>
                ))
              ) : (
                <TableCell className="text-center font-medium" colSpan={4}>
                  Belum ada data source ditambahkan
                </TableCell>
              )}
            </TableRow>
          </TableBody>
        </Table>
      </div>
      {/* Dialog */}
    </div>
  );
}
