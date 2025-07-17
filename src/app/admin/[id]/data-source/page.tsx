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
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
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
