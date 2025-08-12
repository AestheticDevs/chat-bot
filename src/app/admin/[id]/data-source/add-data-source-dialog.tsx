"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatBytes } from "@/lib/utils";

import { FileIcon, GlobeIcon, Loader2, Upload } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import revalidateDataSourceAction from "./actions/revalidate-data-source";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import addDataSourceAction from "./actions/add-data-source";
import { Textarea } from "@/components/ui/textarea";

type DataSourceType = "document" | "web";

export default function AddDataSourceDialog({
  collectionId,
}: {
  collectionId: string;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dataSourceType, setDataSourceType] = useState<DataSourceType>();

  function dialogOpenListener(o: boolean) {
    if (o) {
      setDataSourceType(undefined);
    }
    setDialogOpen(o);
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={(o) => dialogOpenListener(o)}>
      <DialogTrigger asChild>
        <Button>Add Data +</Button>
      </DialogTrigger>
      <DialogContent className="rounded-xl bg-slate-50 ring ring-white">
        <DialogHeader>
          <DialogTitle>Add data source</DialogTitle>
        </DialogHeader>
        {!dataSourceType && (
          <DataSourceTypeSelection setDataType={setDataSourceType} />
        )}
        {dataSourceType === "document" && (
          <DocumentFormUpload
            collectionId={collectionId}
            setDialogClose={() => setDialogOpen(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

function DataSourceTypeSelection({
  setDataType,
}: {
  setDataType: (type: DataSourceType) => void;
}) {
  return (
    <div className="mt-4 grid grid-cols-2 gap-2">
      <Button
        variant={"outline"}
        className="h-32 flex-col rounded-lg"
        onClick={() => setDataType("web")}
        disabled
      >
        <GlobeIcon className="text-primary-brand size-6" />
        <div className="mt-1.5 text-base">Website</div>
      </Button>
      <Button
        variant={"outline"}
        className="h-32 flex-col rounded-lg"
        onClick={() => setDataType("document")}
      >
        <FileIcon className="text-primary-brand size-6" />
        <div className="mt-1.5 text-base">File</div>
      </Button>
      {/* <Button variant={"outline"} className="h-32 flex-col rounded-lg" disabled>
        <CircleQuestionMarkIcon className="text-primary-brand size-6" />
        <div className="mt-1.5 text-base">Q&A</div>
      </Button>
      <Button variant={"outline"} className="h-32 flex-col rounded-lg" disabled>
        <MessageCircleMoreIcon className="text-primary-brand size-6" />
        <div className="mt-1.5 text-base">Text</div>
      </Button> */}
    </div>
  );
}

export type ActionStateType = {
  message: string;
};

const DocumentFormUpload = ({
  collectionId,
  setDialogClose,
}: {
  collectionId: string;
  setDialogClose: () => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>();
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    setFileName(file?.name.split(".").slice(0, -1).join(".") ?? "");
  }, [file]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  async function handleUpload(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!file) {
      setError({ message: "No file provided" });
      setLoading(false);
      return;
    }

    const eventTargetFormData = new FormData(e.target as HTMLFormElement);
    const formData = new FormData();
    formData.set("file", file);
    formData.set("id_collection", collectionId);
    formData.set("saveAs", eventTargetFormData.get("saveAs") as string);
    formData.set("description", eventTargetFormData.get("description") as string);

    const res = await addDataSourceAction(formData);

    if (res.status !== true) {
      setError({ message: res.message });
      setLoading(false);
      return;
    }

    console.log("File uploaded successfully");
    // await revalidateDataSourceAction(collectionId);
    setLoading(false);
    setDialogClose();
  }
  // console.log(state.message)
  return (
    <form
      onSubmit={handleUpload}
      // action={action}
      className="flex flex-col gap-4"
    >
      {/* {state.message ? (
        <Alert>
          <AlertTitle>{state.message}</AlertTitle>
        </Alert>
      ) : null} */}
      <label
        htmlFor="fileInput"
        className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-400 px-4 py-8 text-sm text-slate-600"
      >
        <Upload size={24} strokeWidth={1.5} className="mb-2" />
        Klik untuk upload
        <input
          id="fileInput"
          type="file"
          name="file"
          onChange={handleFileChange}
          className="absolute opacity-0"
          accept=".pdf,.docx,.txt,.xls,.xlsx"
        />
      </label>
      {file && (
        <div>
          <div className="mb-4 flex flex-col gap-2">
            <Label>Simpan Sebagai</Label>
            <Input name="saveAs" defaultValue={fileName} />
          </div>

          <div className="mb-4 flex flex-col gap-2">
            <Label>Deskripsi</Label>
            <Textarea name="description" />
          </div>
          <strong>File details:</strong>
          <ul className="flex flex-col gap-2">
            <li className="whitespace-normal">
              <small className="font-semibold">Nama</small>
              <br />
              <p className="w-full break-words contain-inline-size">
                {file.name}
              </p>
            </li>
            <li className="whitespace-normal">
              <small className="font-semibold">Type</small>
              <br />
              <p className="w-full break-words contain-inline-size">
                {file.type}
              </p>
            </li>
            <li className="whitespace-normal">
              <small className="font-semibold">Size</small>
              <br />
              <p className="w-full break-words contain-inline-size">
                {formatBytes(file.size)}
              </p>
            </li>
          </ul>
        </div>
      )}

      {file && (
        <Button className="submit" disabled={loading}>
          Upload a file
          {loading ? <Loader2 className="animate-spin" /> : null}
        </Button>
      )}
    </form>
  );
};
