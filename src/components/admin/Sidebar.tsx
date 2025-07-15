"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import {
  Database,
  Edit,
  Eye,
  LayoutDashboard,
  Mail,
  Paperclip,
  Settings,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export const SidebarComponent = () => {
  const agent = {
    name: "Geen",
    company: "Google",
  };

  // Menu items.
  const items = [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Preview",
      url: "#",
      icon: Eye,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
    {
      title: "Customize",
      url: "#",
      icon: Edit,
    },
    {
      title: "Data Source",
      url: "#",
      icon: Database,
    },
    {
      title: "Inbox",
      url: "#",
      icon: Mail,
    },
    {
      title: "Embed",
      url: "#",
      icon: Paperclip,
    },
  ];

  const onPath = usePathname();
  console.log(onPath);

  return (
    <aside
      className={cn(
        "w-[200px] rounded-full bg-white p-4 shadow-2xl shadow-slate-500/30",
      )}
    >
      <div className="text-center">
        <Avatar>
          <AvatarImage
            src="https://github.com/shadcn.png"
            className="rounded-full"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        {/* Name */}
        <div className="mt-3 text-lg font-semibold text-nowrap text-slate-800">
          Agent {agent.name}
        </div>
        <span className="text-xs text-slate-400 uppercase">
          {agent.company}
        </span>
        {/* Name */}

        {/* Menu */}
        <SidebarProvider>
          <nav className="w-full">
            <ul className="mt-4 space-y-1">
              {items.map((item) => (
                <li key={item.title} className="block">
                  <a
                    href={item.url}
                    className={`${item.url === onPath ? "text-primary-brand font-semibold" : "text-slate-600"} group flex w-full items-center rounded-lg p-2 text-left text-sm font-medium hover:bg-slate-100 hover:text-slate-900`}
                  >
                    <item.icon className="group-hover:fill-primary-brand/20 mr-2 h-5 w-5 flex-none" />
                    <span className={`truncate text-sm`}>{item.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </SidebarProvider>
        {/* Menu */}
      </div>{" "}
    </aside>
  );
};
