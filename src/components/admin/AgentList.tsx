"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CardAgent as Card } from "./CardAgent";
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

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/agents/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setAgents(agents.filter((agent) => agent.id !== id));
        window.location.reload();
      } else {
        console.error("Failed to delete agent");
      }
    } catch (error) {
      console.error("Error deleting agent:", error);
    }
  };

  useEffect(() => {
    fetchAgent();
  }, []);
  return (
    <div className="mt-6 grid grid-cols-4 gap-6">
      {agents?.map((item, index) => (
        <div key={index}>
          <Card
            key={index}
            id={item.id}
            name={item.name}
            description={item.description}
            createdOn={item.created_at}
            onDelete={() => handleDelete(item.id)}
          />
        </div>
      ))}
    </div>
  );
};
