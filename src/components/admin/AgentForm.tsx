"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function AgentForm() {
  const [agentName, setAgentName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/agents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: agentName, description }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create agent");
      }

      setMessage("Agent berhasil dibuat!");
      setAgentName("");
      setDescription("");
      window.location.reload();
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-4">
      <div>
        <label className="block pt-3 text-sm font-medium">
          Collection Name
        </label>
        <input
          type="text"
          value={agentName}
          onChange={(e) => setAgentName(e.target.value)}
          className="mt-1 w-full rounded-md border px-3 py-2 text-black focus:ring-2 focus:ring-teal-500 focus:outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 w-full rounded-md border px-3 py-2 text-black focus:ring-2 focus:ring-teal-500 focus:outline-none"
          rows={3}
          required
        ></textarea>
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-teal-500 to-indigo-500"
      >
        {loading ? "Menyimpan..." : "Simpan Agent"}
      </Button>

      {message && <p className="mt-2 text-center text-sm">{message}</p>}
    </form>
  );
}
