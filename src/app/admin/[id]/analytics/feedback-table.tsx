"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Star } from "lucide-react";
import { useSearchParams } from "next/navigation";

type Feedback = {
  id: string;
  rating: number | null;
  comment: string | null;
  createdAt: string;
};

export default function FeedbackTable({ agentId }: { agentId: string | null }) {
  const searchParams = useSearchParams();
  const [data, setData] = React.useState<Feedback[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // pagination
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);

  React.useEffect(() => {
    async function loadFeedback() {
      try {
        setLoading(true);

        const paramObj = {
          page: page.toString(),
          limit: "10",
          ...(searchParams.get("from")
            ? { from: searchParams.get("from")! }
            : {}),
          ...(searchParams.get("to") ? { to: searchParams.get("to")! } : {}),
        };
        const urlParams = new URLSearchParams(paramObj);

        const res = await fetch(
          `/api/agents/${agentId}/feedback?${urlParams.toString()}`,
          { credentials: "include" },
        );
        
        if (!res.ok) throw new Error("Failed to fetch feedback");
        const json = await res.json();
        setData(json.data);
        setTotalPages(json.pagination.totalPages);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadFeedback();
  }, [agentId, page]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Rating</TableHead>
            <TableHead>Pesan</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((f) => (
            <TableRow key={f.id}>
              <TableCell>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const on = i < (f.rating ?? 0);
                    return (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          on
                            ? "fill-yellow-500 stroke-yellow-500"
                            : "stroke-muted-foreground"
                        }`}
                      />
                    );
                  })}
                  <span className="text-muted-foreground ml-2 text-sm">
                    {f.rating} star{(f.rating ?? 0) > 1 ? "s" : ""}
                  </span>
                </div>
              </TableCell>
              <TableCell>{f.comment ?? "-"}</TableCell>
              <TableCell>
                {new Date(f.createdAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
          {data.length === 0 && (
            <TableRow>
              <TableCell colSpan={3} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* pagination controls */}
      <div className="flex items-center justify-between">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="rounded bg-gray-200 px-3 py-1 disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="rounded bg-gray-200 px-3 py-1 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
