import { CardAgent } from "./CardAgent";
import { type Collection } from "@/types/agent.types";

export const AgentList = ({ collections }: { collections: Collection[] }) => {
  return (
    <div className="mt-6 grid grid-cols-4 gap-6">
      {collections?.map((item, index) => (
        <div key={index}>
          <CardAgent
            key={index}
            id_collection={item.id_collection}
            name={item.name}
            status={item.status}
          />
        </div>
      ))}
    </div>
  );
};
