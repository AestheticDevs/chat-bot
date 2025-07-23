"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Card } from "./CardAgent";

interface Agent {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

export const AgentList = () => {
  const [agents, setAgents] = useState<Agent[]>([]);

  const fetchAgent = async () => {
    try {
      const response = await fetch("/api/agents");
      const data = await response.json();
      setAgents(data);
      console.log(data);
    } catch (error) {
      console.error("Failed to fetch agents:", error);
    }
  };

  useEffect(() => {
    fetchAgent();
  }, []);
  return (
    <div className="mt-6 grid grid-cols-4 gap-8">
      {agents?.map((item, index) => (
        <Link key={index} href={`/admin/${item.id}/preview`}>
          <Card
            key={index}
            name={item.name}
            description={item.description}
            createdOn={item.created_at}
          />
        </Link>
      ))}
    </div>
  );
};
