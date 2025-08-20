import { prisma } from "@/lib/prisma";
import ChatHistory from "./chat-history";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
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
      },
    },
  });
  return (
    <>
      <ChatHistory chatSession={data?.chat_sesion} />
    </>
  );
}
