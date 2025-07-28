import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  CircleQuestionMarkIcon,
  FileIcon,
  GlobeIcon,
  MessageCircleMoreIcon,
} from "lucide-react";

export default function AddDataSourceDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Data +</Button>
      </DialogTrigger>
      <DialogContent className="rounded-xl bg-slate-50 ring ring-white">
        <DialogHeader>
          <DialogTitle>Add data source</DialogTitle>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Button variant={"outline"} className="h-32 flex-col rounded-lg" disabled>
              <GlobeIcon className="text-primary-brand size-6" />
              <div className="mt-1.5 text-base">Website</div>
            </Button>
            <Button variant={"outline"} className="h-32 flex-col rounded-lg">
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
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
