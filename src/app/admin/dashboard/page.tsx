import { Card } from "@/components/admin/CardAgent";
import Link from "next/link";

import items from "@/lib/data-agent";
import { Button } from "@/components/ui/button";

const page = () => {
  return (
    // Wrapper
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold">Set up your Chat Bot</div>
        <div className="float-right">
          <Button>Add agent +</Button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-4 gap-4">
        {items.map((item, index) => (
          <Link key={index} href={`/admin/${item.id}/preview`}>
            <Card key={index} name={item.name} company={item.company} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default page;
