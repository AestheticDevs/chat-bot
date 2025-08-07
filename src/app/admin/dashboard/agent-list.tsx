import { agents } from "@prisma/client";
import { CardAgent } from "./card-agent";
import { prisma } from "@/lib/prisma";

export const AgentList = async () => {
  const data = await prisma.agents.findMany({
    orderBy: {
      created_at: "desc",
    },
  });
  return (
    <div className="mt-6 grid grid-cols-4 gap-6">
      {data?.length === 0 ? (
        <div className="text-muted-foreground col-span-4">
          Belum ada agent ditambahkan. silahkan tambahkan agen terlebih dahulu.
        </div>
      ) : null}
      {data?.map((item, index) => (
        <CardAgent
          key={index}
          id_collection={item.id_collection as string}
          name={item.name}
          status={item.is_active ? "Active" : "Inactive"}
          id={item.id}
          description={item.description as string}
        />
      ))}
    </div>
  );
};
