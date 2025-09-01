import { prisma } from "@/lib/prisma";
import ChatHistory from "./chat-history";
import DateFilter from "../analytics/date-filter";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const id = (await params).id;

  const defaultDateRange = {
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date(),
  };

  const query = await searchParams;

  const dateRange = {
    from: query.from ? new Date(query.from as string) : defaultDateRange.from,
    to: query.to ? new Date(query.to as string) : defaultDateRange.to,
  };

  const data = await prisma.agents.findFirst({
    where: {
      id_collection: id,
    },
    include: {
      chat_sesion: {
        include: {
          messages: {
            orderBy: {
              createdAt: "asc",
            },
          },
          publicUsers: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        where: {
          createdAt: {
            gte: dateRange.from,
            lte: dateRange.to,
          },
        },
      },
    },
  });
  return (
    <>
      <div className="flex max-h-full grow flex-col overflow-hidden">
        <div className="mb-4 flex w-full items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">Chat History</h1>
            <p className="text-muted-foreground">Histori penggunaan user</p>
          </div>
          <DateFilter />
        </div>
        <ChatHistory chatSession={data?.chat_sesion} />
      </div>
    </>
  );
}
