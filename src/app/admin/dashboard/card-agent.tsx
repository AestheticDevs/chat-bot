"use client";

import { EllipsisIcon, LucideBot } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { toast } from "sonner";
import { deleteAgentAction } from "./action/delete-agent-action";

export interface CardProps {
  id_collection: string;
  name: string;
  status: string;
  description?: string;
  id: number;
}
export const CardAgent = ({
  id_collection,
  name,
  id,
  description,
}: CardProps) => {
  const handleDelete = async (id_collection: string, id: number) => {
    const promise = deleteAgentAction(id_collection, id);
    toast.promise(promise, {
      loading: "Menghapus collection",
      success: "Berhasil menghapus collection",
    });
  };

  return (
    <Link
      href={`/admin/${id_collection}/preview`}
      className="mt-8 block h-full cursor-pointer"
    >
      <div className="hover:border-primary-brand group flex h-full cursor-pointer flex-col justify-between rounded-2xl border-2 border-white bg-slate-100 bg-gradient-to-br from-white/70 to-white/40 p-5 shadow-lg shadow-slate-200 duration-150 ease-in hover:bg-white">
        <div className="flex items-center justify-between">
          {/* Icon */}
          <div className="text-primary-brand group-hover:bg-primary-brand flex h-14 w-14 items-center justify-center rounded-full bg-white group-hover:text-white">
            <LucideBot />
          </div>

          {/* Menu Icon */}
          <DropdownMenu>
            <DropdownMenuTrigger className="border-0 ring-0 outline-0">
              <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-slate-400 hover:text-slate-700">
                <EllipsisIcon />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {/* <DropdownMenuItem>Edit</DropdownMenuItem> */}
              <DropdownMenuItem>
                <Link
                  href={`/admin/${id_collection}/preview`}
                  className="block w-full"
                >
                  View
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href={`/admin/${id_collection}/settings`}
                  className="block w-full"
                >
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(id_collection, id);
                }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div>
          <h2 className="hover:text-primary-brand mb-1 text-xl font-bold text-slate-700 capitalize">
            {name}
          </h2>
          <p className="line-clamp-1 text-sm text-slate-500 capitalize">
            {description}
          </p>
          {/* <div className="text-sm text-gray-500">
            Created on:{" "}
            <span className="opacity-65">
              {dateFormatter(createdOn || new Date().toISOString())}
            </span>
          </div> */}
        </div>
      </div>
    </Link>
  );
};
