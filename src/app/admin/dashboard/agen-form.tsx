"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { startTransition, useActionState, useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2Icon, PlusIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createAgentAction } from "./action/create-agent-action";

const initialState = { message: "", success: null };

export default function AgentForm() {
  const [open, setOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(
    createAgentAction,
    initialState,
  );

  function clearActionState() {
    startTransition(formAction);
  }

  function listenDialogOpen(o: boolean) {
    if (o) {
      clearActionState();
    }
    setOpen(o);
  }

  useEffect(() => {
    if (state.success === true) {
      setTimeout(() => {
        setOpen(false);
        clearActionState();
      }, 100);
    }
  }, [state.success]);

  return (
    <Dialog onOpenChange={listenDialogOpen} open={open}>
      <DialogTrigger>
        <Button asChild>
          <div className="bg-primary-brand text-primary-foreground hover:bg-primary-brand/90 shadow-xs">
            Add agent <PlusIcon className="h-4 w-4" />
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Buat Agen Baru</DialogTitle>
          <DialogDescription>
            Isi detail untuk membuat agen baru untuk bot obrolan Anda.
          </DialogDescription>
        </DialogHeader>
        {state.success === false ? (
          <Alert variant={"destructive"}>
            <CheckCircle2Icon />
            <AlertTitle>Gagal!</AlertTitle>
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        ) : null}
        <form action={formAction} className="max-w-md space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium">Nama Agen</label>
            <Input
              type="text"
              className=""
              name="name"
              placeholder="Masukkan nama agen"
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Deskripsi</label>
            <Textarea
              placeholder="Deskripsi"
              name="description"
              required
            ></Textarea>
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-gradient-to-r from-teal-500 to-indigo-500"
          >
            {isPending ? "Menyimpan..." : "Simpan Agent"}
          </Button>

          {/* {message && <p className="mt-2 text-center text-sm">{message}</p>} */}
        </form>
      </DialogContent>
    </Dialog>
  );
}
