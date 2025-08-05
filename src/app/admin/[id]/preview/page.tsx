import { prisma } from "@/lib/prisma";
import ChatBox from "./chat-box";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const agent = await prisma.agents.findFirst({
    where: {
      id_collection: id,
    },
    include: { setting: true },
  });

  return (
    <div className="flex h-full w-full grow flex-col overflow-y-auto">
      {/* <div className="mb-6 text-2xl font-bold">Preview </div> */}

      <ChatBox collection_id={id} agent={agent} />
    </div>
  );
}
