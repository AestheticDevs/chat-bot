"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Pen, Loader2 } from "lucide-react";
import editDataSourceAction from "./actions/edit-data-source";

export default function EditDataSourceMetadataDialog({
  id,
  id_collection,
  nama,
  description,
  document_id,
}: {
  id: string;
  id_collection: any;
  nama: string | null;
  description: string | null;
  document_id: any;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);
    formData.set("id", id);
    formData.set("id_collection", id_collection);
    formData.set("document_id", document_id);

    const res = await editDataSourceAction(formData);

    if (!res.status) {
      setError(res.message || "Gagal mengupdate data");
      setLoading(false);
      return;
    }

    setLoading(false);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="mr-2">
          <Pen />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Metadata</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label className="mb-2">Nama</Label>
            <Input name="savedAs" defaultValue={nama ?? ""} />
          </div>
          <div className="mb-4">
            <Label className="mb-2">Description</Label>
            <Textarea
              name="description"
              defaultValue={description ?? ""}
            ></Textarea>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <Button className="w-full" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : "Simpan"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}