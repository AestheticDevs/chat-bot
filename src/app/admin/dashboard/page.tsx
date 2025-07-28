import AgentForm from "./AgentForm";
import { AgentList } from "./AgentList";
import { API_URL } from "@/lib/shared";
import { type ListCollectionResult } from "@/types/agent.types";

export const dynamic = "force-dynamic";

const page = async () => {
  const res = await fetch(`${API_URL}/collections`);
  const data = (await res.json()) as ListCollectionResult;
  return (
    // Wrapper
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold">Set up your Chat Bot</div>
        <div className="float-right">
          <AgentForm />
        </div>
      </div>
      <AgentList collections={data.result.collections} />
    </div>
  );
};

export default page;
