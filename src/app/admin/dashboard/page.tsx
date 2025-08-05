import { prisma } from "@/lib/prisma";
import AgentForm from "./agen-form";
import { CardAgent } from "./card-agent";
import { AgentList } from "./agent-list";

export const dynamic = "force-dynamic";

const page = async () => {
  return (
    // Wrapper
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold">Set up your Chat Bot</div>
        <div className="float-right">
          <AgentForm />
        </div>
      </div>
      <AgentList />
    </div>
  );
};

export default page;
