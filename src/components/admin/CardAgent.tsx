import { EllipsisIcon, LucideBot } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { dateFormatter } from "@/lib/utils";

export interface CardProps {
  name: string;
  description: string;
  createdOn?: string;
}
export const Card = ({ name, description, createdOn }: CardProps) => {
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
              <DropdownMenuItem>View</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Name */}
        <form className="mt-8">
          <h2 className="mb-1 text-xl font-bold text-slate-700 capitalize">
            {name}
          </h2>
          <p className="mb-4 line-clamp-1 text-sm text-slate-500 capitalize">
            {description}
          </p>

          <div className="text-sm text-gray-500">
            Created on :{" "}
            <span className="opacity-65">
              {dateFormatter(createdOn || new Date().toISOString())}
            </span>
          </div>
        </form>
      </div>
    </>
  );
};
