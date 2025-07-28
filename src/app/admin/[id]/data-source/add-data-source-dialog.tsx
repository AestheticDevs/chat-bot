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

import {
  CircleQuestionMarkIcon,
  FileIcon,
  GlobeIcon,
  MessageCircleMoreIcon,
  Upload,
} from "lucide-react";
import { startTransition, useActionState, useState } from "react";
import addDataSourceAction from "./actions/add-data-source";

type DataSourceType = "document" | "text";

export default function AddDataSourceDialog() {
  const [dataSourceType, setDataSourceType] = useState<DataSourceType>();
  return (
    <Dialog>
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
        {dataSourceType === "document" && <DocumentFormUpload />}
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
      <Button variant={"outline"} className="h-32 flex-col rounded-lg" disabled>
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
      <Button variant={"outline"} className="h-32 flex-col rounded-lg" disabled>
        <CircleQuestionMarkIcon className="text-primary-brand size-6" />
        <div className="mt-1.5 text-base">Q&A</div>
      </Button>
      <Button variant={"outline"} className="h-32 flex-col rounded-lg" disabled>
        <MessageCircleMoreIcon className="text-primary-brand size-6" />
        <div className="mt-1.5 text-base">Text</div>
      </Button>
    </div>
  );
}

export type ActionStateType = {
  message: string;
};

const initialState: ActionStateType = {
  message: "",
};

const DocumentFormUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [state, action, isPending] = useActionState(
    addDataSourceAction,
    initialState,
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  function handleUpload() {
    // startTransition(action);
  }

  return (
    <>
      <label
        htmlFor="fileInput"
        className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-400 px-4 py-8 text-sm text-slate-600"
      >
        <Upload size={24} strokeWidth={1.5} className="mb-2" />
        Klik untuk upload
        <input
          id="fileInput"
          type="file"
          onChange={handleFileChange}
          className="absolute opacity-0"
        />
      </label>
      {file && (
        <div>
          <strong>File details:</strong>
          <ul className="flex flex-col gap-2">
            <li className="whitespace-normal">
              <small className="font-semibold">Nama</small>
              <br />
              <p className="break-words w-full contain-inline-size">{file.name}</p>
            </li>
            <li className="whitespace-normal">
              <small className="font-semibold">Type</small>
              <br />
              <p className="break-words w-full contain-inline-size">{file.type}</p>
            </li>
            <li className="whitespace-normal">
              <small className="font-semibold">Size</small>
              <br />
              <p className="break-words w-full contain-inline-size">{formatBytes(file.size)}</p>
            </li>
          </ul>
        </div>
      )}

      {file && (
        <Button onClick={handleUpload} className="submit">
          Upload a file
        </Button>
      )}
    </>
  );
};
