import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dateFormatter(date: string | Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("id-ID", options);
}

export function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = [
    "Bytes",
    "KiB",
    "MiB",
    "GiB",
    "TiB",
    "PiB",
    "EiB",
    "ZiB",
    "YiB",
  ];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(html).use(gfm).process(markdown);
  return result.toString();
}

export function getDateRange(
  type: "week" | "month" | "custom",
  options?: {
    startDate?: Date;
    endDate?: Date;
  },
) {
  const now = new Date();

  if (type === "week") {
    // Start of this week (Sunday)
    const startOfThisWeek = new Date(now);
    startOfThisWeek.setDate(now.getDate() - now.getDay());
    startOfThisWeek.setHours(0, 0, 0, 0);

    const startOfLastWeek = new Date(startOfThisWeek);
    startOfLastWeek.setDate(startOfLastWeek.getDate() - 7);

    const endOfLastWeek = new Date(startOfThisWeek);

    return { startOfThisWeek, startOfLastWeek, endOfLastWeek };
  }

  if (type === "month") {
    // Start of this month
    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    // Start of last month
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    // End of last month = start of this month
    const endOfLastMonth = new Date(startOfThisMonth);

    return { startOfThisMonth, startOfLastMonth, endOfLastMonth };
  }

  if (type === "custom" && options?.startDate && options?.endDate) {
    // Just use the given range
    const start = new Date(options.startDate);
    const end = new Date(options.endDate);
    end.setHours(23, 59, 59, 999); // include full end day
    return { start, end };
  }

  throw new Error("Invalid type or missing options");
}
