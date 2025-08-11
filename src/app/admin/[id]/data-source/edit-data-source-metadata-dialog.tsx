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
import { Pen } from "lucide-react";

export default function EditDataSourceMetadataDialog({
  nama,
  description,
}: {
  nama: string | null;
  description: string | null;
}) {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"outline"} className="mr-2">
            <Pen />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Metadata</DialogTitle>
          </DialogHeader>
          <form action="">
            <div className="mb-4">
              <Label className="mb-2">Nama</Label>
              <Input name="nama" defaultValue={nama ?? ""} />
            </div>
            <div className="mb-4">
              <Label className="mb-2">Description</Label>
              <Textarea
                name="description"
                defaultValue={description ?? ""}
              ></Textarea>
            </div>
            <Button className="w-full">Simpan</Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
