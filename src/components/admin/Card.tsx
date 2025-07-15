import { EllipsisIcon, LucideBot } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface CardProps {
  name: string;
  company: string;
}
export const Card = ({ name, company }: CardProps) => {
  return (
    <>
      {/* Card */}
      <div className="hover:border-primary-brand group cursor-pointer rounded-2xl border-2 border-white bg-slate-100 bg-gradient-to-br from-slate-200/70 to-slate-200/40 p-5 shadow-lg shadow-slate-200 duration-150 ease-in hover:bg-white">
        <div className="flex items-center justify-between">
          {/* Icon */}
          <div className="text-primary-brand group-hover:bg-primary-brand flex h-14 w-14 items-center justify-center rounded-full bg-white group-hover:text-white">
            <LucideBot />
          </div>

          {/* Menu Icon */}
          <DropdownMenu>
            <DropdownMenuTrigger className="border-0 ring-0 outline-0">
              <div className="text-primary-brand flex h-10 w-10 cursor-pointer items-center justify-center rounded-full hover:bg-white">
                <EllipsisIcon />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Name */}
        <div className="mt-8">
          <h2 className="mb-1 text-2xl font-bold">{name}</h2>
          <div className="text-sm tracking-wide text-slate-500 uppercase">
            {company}
          </div>
        </div>
      </div>
    </>
  );
};
