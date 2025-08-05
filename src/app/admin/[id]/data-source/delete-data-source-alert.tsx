"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import deleteDataSourceAction from "./actions/delete-data-source";
import { toast } from "sonner";

export default function DeleteDataSourceAlert({
  id,
  collectionId,
}: {
  id: number;
  collectionId: string;
}) {
  function handleDelete() {
    // const promise = deleteDataSourceAction(id, collectionId);

    // toast.promise(promise, {
    //   loading: "Menghapus data source...",
    //   success: (data) => {
    //     return data.message;
    //   },
    // });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"outline"}>
          <TrashIcon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-xs">
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah anda yakin?</AlertDialogTitle>
          <AlertDialogDescription>
            Hal ini tidak akan bisa di batalkan.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Ya</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
