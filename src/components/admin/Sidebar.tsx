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
import Link from "next/link";

export const SidebarComponent = () => {
  // const id = params;

  const onPath = usePathname();
  const isInAgentSection =
    onPath.startsWith("/admin/") && onPath !== "/admin/dashboard";

  const pathSegments = onPath.split("/");
  const currentId = pathSegments[2];

  console.log(currentId);

  const agent = {
    name: "Geen",
    company: "Google",
  };

  // Menu items.
  const dashboardItem = {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: LayoutDashboard,
    match: (path: string) => path === "/admin/dashboard",
  };

  const agentMenus = [
    {
      title: "Preview",
      url: `/admin/${currentId}/preview`,
      icon: Eye,
      match: (path: string) =>
        path.includes("/admin/") && path.endsWith("/preview"),
    },
    {
      title: "Settings",
      url: `/admin/${currentId}/settings`,
      icon: Settings,
      match: (path: string) =>
        path.includes("/admin/") && path.endsWith("/settings"),
    },
    {
      title: "Customize",
      url: `/admin/${currentId}/customize`,
      icon: Edit,
      match: (path: string) =>
        path.includes("/admin/") && path.endsWith("/customize"),
    },
    {
      title: "Data Source",
      url: `/admin/${currentId}/data-source`,
      icon: Database,
      match: (path: string) =>
        path.includes("/admin/") && path.endsWith("/data-source"),
    },
    {
      title: "Inbox",
      url: `/admin/${currentId}/inbox`,
      icon: Mail,
      match: (path: string) =>
        path.includes("/admin/") && path.endsWith("/inbox"),
    },
    {
      title: "Embed",
      url: `/admin/${currentId}/embed`,
      icon: Paperclip,
      match: (path: string) =>
        path.includes("/admin/") && path.endsWith("/embed"),
    },
  ];

  return (
    <aside
      className={cn(
        "w-[200px] rounded-full bg-white p-4 shadow-2xl shadow-slate-500/30 overflow-y-auto",
      )}
    >
      <div className="text-center">
        <div className="p-4">
          <Avatar className="aspect-square h-16 w-16">
            <AvatarImage
              src="https://github.com/shadcn.png"
              className="rounded-full"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>

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
            <ul className="mt-4 space-y-2">
              {/* Always show dashboard */}
              <li key={dashboardItem.title}>
                <Link
                  href={dashboardItem.url}
                  className={`${
                    dashboardItem.match(onPath)
                      ? "text-primary-brand ps-3 font-semibold"
                      : "text-slate-600"
                  } group flex w-full items-center rounded-lg p-2 text-left text-sm font-medium hover:bg-slate-100 hover:text-slate-900`}
                >
                  <dashboardItem.icon className="group-hover:fill-primary-brand/20 mr-2 h-5 w-5 flex-none" />
                  <span className={`truncate text-sm`}>
                    {dashboardItem.title}
                  </span>
                </Link>
              </li>

              {/* Only show agent-related menus when in /admin/${currentId}/... */}
              {isInAgentSection &&
                agentMenus.map((item) => (
                  <li key={item.title}>
                    <a
                      href={item.url}
                      className={`${
                        item.match?.(onPath)
                          ? "text-primary-brand ps-3 font-semibold"
                          : "text-slate-600"
                      } group flex w-full items-center rounded-lg p-2 text-left text-sm font-medium duration-150 ease-in hover:bg-slate-100 hover:ps-3 hover:text-slate-900`}
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
