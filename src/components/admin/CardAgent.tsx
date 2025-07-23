import { EllipsisIcon, LucideBot } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { dateFormatter } from "@/lib/utils";
import Link from "next/link";

export interface CardProps {
  id: number;
  name: string;
  description: string;
  createdOn?: string;
  onDelete?: () => void;
}
export const CardAgent = ({
  id,
  name,
  description,
  createdOn,
  onDelete,
}: CardProps) => {
  return (
    <>
      {/* Card */}
      <div className="hover:border-primary-brand group cursor-pointer rounded-2xl border-2 border-white bg-slate-100 bg-gradient-to-br from-white/70 to-white/40 p-5 shadow-lg shadow-slate-200 duration-150 ease-in hover:bg-white">
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
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={`/admin/${id}/preview`} className="block w-full">
                  View
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                onSelect={(e) => {
                  e.preventDefault();
                  e.stopPropagation(); // stop klik dari bubble ke Link
                  if (onDelete) onDelete();
                }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Wrap Link hanya pada konten utama, bukan seluruh card */}
        <Link href={`/admin/${id}/preview`} className="mt-8 block">
          <h2 className="hover:text-primary-brand mb-1 text-xl font-bold text-slate-700 capitalize">
            {name}
          </h2>
          <p className="mb-4 line-clamp-1 text-sm text-slate-500 capitalize">
            {description}
          </p>
          <div className="text-sm text-gray-500">
            Created on:{" "}
            <span className="opacity-65">
              {dateFormatter(createdOn || new Date().toISOString())}
            </span>
          </div>
        </Link>
      </div>
    </>
  );
};
