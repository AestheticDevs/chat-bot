"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { agents } from "@prisma/client";
import { useActionState, useEffect, useRef } from "react";
import updateAgentAction, {
  UpdateAgentActionReturn,
} from "./action/update-agent-action";
import { LoaderIcon, SaveIcon, TriangleAlert } from "lucide-react";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const initialState: UpdateAgentActionReturn = { message: "", success: null };

export default function GeneralSettings({ agent }: { agent: agents | null }) {
  const form = useRef<HTMLFormElement>(null);
  const [state, action, pending] = useActionState(
    updateAgentAction,
    initialState,
  );

  function updateAgent() {
    form.current?.requestSubmit();
  }

  if (agent === null) {
    return "Something went wrong";
  }

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
    }
  }, [state]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>General Settings</CardTitle>
        <CardDescription>
          Buat perubahan pada General Setting disini klik tombol simpan untuk
          menyimpan perubahan.
        </CardDescription>
      </CardHeader>
      <CardContent>
      {state.success === false ? (
        <Alert variant={"destructive"} className="mb-6">
          <TriangleAlert />
          <AlertTitle>Ada kesalahan</AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      ) : null}
        <form action={action} className="grid gap-6" ref={form}>
          <div className="grid gap-3">
            <Label htmlFor="name">Nama Agen</Label>
            <Input
              id="name"
              placeholder="Ketik nama agen"
              defaultValue={agent.name}
              name="name"
              required
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="description">Deskripsi</Label>
            <Textarea
              name="description"
              id="description"
              placeholder="Ketik deskripsi agen"
              defaultValue={agent.description ?? ""}
              required
            ></Textarea>
          </div>
          <input
            type="text"
            name="collectionId"
            defaultValue={agent.id_collection ?? ""}
            hidden
          />
        </form>
      </CardContent>
      <CardFooter>
        <Button onClick={updateAgent} disabled={pending}>
          {pending ? <LoaderIcon className="animate-spin" /> : <SaveIcon />}
          Simpan perubahan
        </Button>
      </CardFooter>
    </Card>
  );
}
