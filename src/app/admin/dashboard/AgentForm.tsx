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
import { createCollection } from "@/app/action/create-collection.action";
import { startTransition, useActionState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2Icon } from "lucide-react";

const initialState = { message: "", success: null };

export default function AgentForm() {
  const [state, formAction, isPending] = useActionState(
    createCollection,
    initialState,
  );

  function clearActionState() {
    startTransition(formAction);
  }

  return (
    <Dialog onOpenChange={(o) => (o ? null : clearActionState())}>
      <DialogTrigger>
        <Button asChild>
          <div className="bg-primary-brand text-primary-foreground hover:bg-primary-brand/90 shadow-xs">
            Add agent +
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
        {state.success === true ? (
          <Alert>
            <CheckCircle2Icon />
            <AlertTitle>Berhasil!</AlertTitle>
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        ) : null}
        <form action={formAction} className="max-w-md space-y-4">
          <div>
            <label className="block text-sm font-medium">Nama Collection</label>
            <input
              type="text"
              className="mt-1 w-full rounded-md border px-3 py-2 text-black focus:ring-2 focus:ring-teal-500 focus:outline-none"
              name="collection_name"
              required
            />
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
