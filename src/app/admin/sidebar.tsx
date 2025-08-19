"use client";

import {
  Bot,
  ChartArea,
  Database,
  Eye,
  LayoutDashboard,
  MessageSquareText,
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

  // console.log(currentId);

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
      title: "Analytics",
      url: `/admin/${currentId}/analytics`,
      icon: ChartArea,
      match: (path: string) =>
        path.includes("/admin/") && path.endsWith("/analytics"),
      disable: false,
    },
    {
      title: "Preview",
      url: `/admin/${currentId}/preview`,
      icon: Eye,
      match: (path: string) =>
        path.includes("/admin/") && path.endsWith("/preview"),
      disable: false,
    },

    // {
    //   title: "Customize",
    //   url: `/admin/${currentId}/customize`,
    //   icon: Edit,
    //   match: (path: string) =>
    //     path.includes("/admin/") && path.endsWith("/customize"),
    //   disable: true,
    // },
    {
      title: "Data Source",
      url: `/admin/${currentId}/data-source`,
      icon: Database,
      match: (path: string) =>
        path.includes("/admin/") && path.endsWith("/data-source"),
      disable: false,
    },
    {
      title: "History",
      url: `/admin/${currentId}/history`,
      icon: MessageSquareText,
      match: (path: string) =>
        path.includes("/admin/") && path.endsWith("/history"),
      disable: false,
    },
    {
      title: "Embed",
      url: `/admin/${currentId}/embed`,
      icon: Paperclip,
      match: (path: string) =>
        path.includes("/admin/") && path.endsWith("/embed"),
      disable: false,
    },
    {
      title: "Settings",
      url: `/admin/${currentId}/settings`,
      icon: Settings,
      match: (path: string) =>
        path.includes("/admin/") && path.endsWith("/settings"),
      disable: false,
    },
  ];

  return (
    <aside
      className={cn(
        "h-full w-[200px] rounded-full border-2 border-white bg-slate-100 bg-gradient-to-br from-white/70 to-white/40 p-5 shadow-xl shadow-slate-200 duration-150 ease-in hover:bg-white",
      )}
    >
      <div className="flex max-h-full flex-col">
        <div className="mx-auto grid aspect-square w-full place-items-center rounded-full border border-indigo-100 bg-indigo-50 p-4">
          <Bot className="size-16 text-indigo-900" strokeWidth={1.5} />
        </div>

        {/* Name */}
        {/* <div className="mt-3 text-lg font-semibold text-nowrap text-slate-800">
          Agent {agent.name}
        </div>
        <span className="text-xs text-slate-400 uppercase">
          {agent.company}
        </span> */}
        {/* Name */}

        {/* Menu */}
        {/* <SidebarProvider> */}
        <nav className="max-h-full w-full overflow-y-auto">
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
                  <Link
                    href={item.url}
                    className={cn(
                      item.match?.(onPath)
                        ? "text-primary-brand ps-3 font-semibold"
                        : "text-slate-600",
                      item.disable
                        ? "pointer-events-none cursor-not-allowed opacity-50"
                        : "",
                      "group flex w-full items-center rounded-lg p-2 text-left text-sm font-medium duration-150 ease-in hover:bg-slate-100 hover:ps-3 hover:text-slate-900",
                    )}
                  >
                    <item.icon className="group-hover:fill-primary-brand/20 mr-2 h-5 w-5 flex-none" />
                    <span className={`truncate text-sm`}>{item.title}</span>
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
        {/* </SidebarProvider> */}
        {/* Menu */}
      </div>
    </aside>
  );
};
