"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  CircleQuestionMarkIcon,
  FileIcon,
  GlobeIcon,
  MessageCircleMoreIcon,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";

export default function Page() {
  const params = useParams();
  const id = params.id;

  const [isOpenDialog, setIsOpenDialog] = useState(false);

  return (
    // Wrapper
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold">Data Source</div>
        <Button onClick={() => setIsOpenDialog(true)}>Add Data +</Button>
      </div>
      <div className="mt-6 grid grid-cols-1">
        <Table>
          <TableCaption className="mt-4">
            A list of your trained data source.
          </TableCaption>
          <TableHeader className="h-14 bg-white">
            <TableRow>
              <TableHead className="w-12 text-center">#</TableHead>
              <TableHead>Trained Items</TableHead>
              <TableHead className="text-center">Type</TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow
                key={i}
                className="h-14 even:bg-slate-200 hover:bg-slate-50"
              >
                <TableCell className="text-center font-medium">
                  {i + 1}
                </TableCell>
                <TableCell>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad,
                  ipsa!
                </TableCell>
                <TableCell className="text-center">Document</TableCell>
                <TableCell className="text-center">
                  <Badge className="bg-teal-500">Trained</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* Dialog */}
      <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
        <DialogContent className="rounded-xl bg-slate-50 ring ring-white">
          <DialogHeader>
            <DialogTitle>Add data source</DialogTitle>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Button variant={"outline"} className="h-32 flex-col rounded-lg">
                <GlobeIcon className="text-primary-brand size-6" />
                <div className="mt-1.5 text-base">Website</div>
              </Button>
              <Button variant={"outline"} className="h-32 flex-col rounded-lg">
                <FileIcon className="text-primary-brand size-6" />
                <div className="mt-1.5 text-base">File</div>
              </Button>
              <Button variant={"outline"} className="h-32 flex-col rounded-lg">
                <CircleQuestionMarkIcon className="text-primary-brand size-6" />
                <div className="mt-1.5 text-base">Q&A</div>
              </Button>
              <Button variant={"outline"} className="h-32 flex-col rounded-lg">
                <MessageCircleMoreIcon className="text-primary-brand size-6" />
                <div className="mt-1.5 text-base">Text</div>
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>{" "}
    </div>
  );
}
