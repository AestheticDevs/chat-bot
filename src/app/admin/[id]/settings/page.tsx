import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GeneralSettings from "./general-settings";
import ChatSettings from "./chat-settings";
import { prisma } from "@/lib/prisma";

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
    include: {
      setting: true,
    },
  });
  
  return (
    // Wrapper
    <div className="w-full">
      <div className="text-2xl font-bold">Setting</div>

      {/* <div>{JSON.stringify(agent)}</div> */}
      <div className="mt-6 grid grid-cols-1">
        <Tabs defaultValue="general">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
          </TabsList>
          <TabsContent value="general">
            <GeneralSettings agent={agent} />
          </TabsContent>
          <TabsContent value="chat">
            <ChatSettings agent={agent} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
