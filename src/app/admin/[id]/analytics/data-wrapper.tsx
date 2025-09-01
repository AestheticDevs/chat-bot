import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { MessageSquare, Star } from "lucide-react";
import { Suspense } from "react";
import AnalyticsTab from "./analytics-tab";

export default async function DataWrapper({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const id = (await params).id;
  const defaultDateRange = {
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date(),
  };

  const query = await searchParams;

  const dateRange = {
    from: query.from ? new Date(query.from as string) : defaultDateRange.from,
    to: query.to ? new Date(query.to as string) : defaultDateRange.to,
  };
  const agent = await prisma.agents.findFirst({
    where: {
      id_collection: id,
    },
  });

  const [session, feedback] = await Promise.all([
    prisma.chat_session.findMany({
      where: {
        createdAt: {
          gte: dateRange.from,
          lte: dateRange.to,
        },
        agentId: agent?.id,
      },
      include: {
        messages: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    }),
    await prisma.feedback.findMany({
      where: {
        createdAt: {
          gte: dateRange.from,
          lte: dateRange.to,
        },
        session: {
          agentId: agent?.id,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
  ]);

  const feedbackRating = (
    feedback.reduce((acc, curr) => acc + (curr.rating ?? 0), 0) /
      feedback.length || 0
  ).toFixed(1);
  return (
    <>
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sesi</CardTitle>
            <MessageSquare className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{session.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
            <Star className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{feedbackRating}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Feedback
            </CardTitle>
            <Star className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{feedback.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics Tabs */}
      <Suspense fallback={<div>Loading...</div>}>
        <AnalyticsTab
          lastWeekData={session}
          feedback={feedback}
          agent={agent}
        />
      </Suspense>
    </>
  );
}
