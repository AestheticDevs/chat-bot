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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useActionState, useEffect, useRef, useState } from "react";
import updateChatSettingAction from "./action/update-chat-setting-action";
import { GenericActionReturn } from "@/types/generic-action-return";
import { agents, Prisma } from "@prisma/client";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LoaderIcon, SaveIcon, TriangleAlert } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

const initialState: GenericActionReturn = {
  message: "",
  success: null,
};

type agentWithSetting = Prisma.agentsGetPayload<{
  include: { setting: true };
}>;

export default function ChatSettings({
  agent,
}: {
  agent: agentWithSetting | null;
}) {
  const form = useRef<HTMLFormElement>(null);
  const [state, action, pending] = useActionState(
    updateChatSettingAction,
    initialState,
  );
  const [limitation, setLimitation] = useState(agent?.setting?.limitation);

  function updateSetting() {
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
        <CardTitle>Chat Settings</CardTitle>
        <CardDescription>
          Buat perubahan pada Chat Setting disini klik tombol simpan untuk
          menyimpan perubahan.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        {state.success === false ? (
          <Alert variant={"destructive"} className="mb-6">
            <TriangleAlert />
            <AlertTitle>Ada kesalahan</AlertTitle>
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        ) : null}
        <form action={action} ref={form} className="grid gap-3">
          <div>
            <Label htmlFor="greetings" className="mb-3">
              Sambutan/Greetings
            </Label>
            <Textarea
              id="greetings"
              placeholder="Ketik sambutan yang akan menyambut pengguna"
              name="greetings"
              defaultValue={agent.setting?.greetings}
            ></Textarea>
          </div>
          <div>
            <Label htmlFor="limitation" className="mb-3">
              Batasi penggunaan
            </Label>
            <Switch
              name="limitation"
              id="limitation"
              defaultChecked={agent.setting?.limitation}
            />
          </div>
          <div>
            <Label htmlFor="usageLimit" className="mb-3">
              Batasi penggunaan
            </Label>
            <Input
              id="usageLimit"
              placeholder="Batasi jumlah pertanyaan yang diajukan pengguna"
              name="usage_limit"
              defaultValue={agent.setting?.usage_limit}
            ></Input>
            <small>Batasi jumlah pertanyaan yang diajukan pengguna</small>
          </div>
          <input
            type="text"
            name="collectionId"
            defaultValue={agent.id_collection ?? ""}
            hidden
          />
          <input
            type="text"
            name="agentId"
            defaultValue={agent.id ?? ""}
            hidden
          />
        </form>
      </CardContent>
      <CardFooter>
        <Button onClick={updateSetting} disabled={pending}>
          {pending ? <LoaderIcon className="animate-spin" /> : <SaveIcon />}
          Simpan perubahan
        </Button>
      </CardFooter>
    </Card>
  );
}
