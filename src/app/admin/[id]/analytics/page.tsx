// "use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { MessageSquare, Users, Clock, Star, Bot, User } from "lucide-react";
import AnalyticsTab from "./analytics-tab";
import { prisma } from "@/lib/prisma";
import { getDateRange } from "@/lib/utils";

export default async function AnalyticsDashboard({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const startDate = new Date();
  const endDate = new Date();
  startDate.setDate(endDate.getDate() - 7);

  const { startOfThisWeek, startOfLastWeek, endOfLastWeek } =
    getDateRange("week");
  const { startOfThisMonth } = getDateRange("month");

  const agent = await prisma.agents.findFirst({
    where: {
      id_collection: id,
    },
  });

  const [thisMonthData, lastWeekData, thisWeekCount, lastWeekCount, count] =
    await Promise.all([
      prisma.chat_session.findMany({
        where: {
          createdAt: {
            gte: startOfThisMonth,
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
      prisma.chat_session.findMany({
        where: {
          createdAt: {
            gte: startOfLastWeek,
            lt: endOfLastWeek,
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
      prisma.chat_session.count({
        where: {
          createdAt: {
            gte: startOfThisWeek,
          },
          agentId: agent?.id,
        },
      }),
      prisma.chat_session.count({
        where: {
          createdAt: {
            gte: startOfLastWeek,
            lt: endOfLastWeek,
          },
          agentId: agent?.id,
        },
      }),
      prisma.chat_session.count(),
    ]);

  const feedback = await prisma.feedback.findMany({
    where: {
      createdAt: {
        gte: startOfThisMonth,
      },
      session: {
        agentId: agent?.id,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  let percentageChange = 0;
  if (lastWeekCount > 0) {
    percentageChange = ((thisWeekCount - lastWeekCount) / lastWeekCount) * 100;
  }

  const feedbackRating = (
    feedback.reduce((acc, curr) => acc + (curr.rating ?? 0), 0) /
      feedback.length || 0
  ).toFixed(1);
  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Chat Analytics</h1>
          <p className="text-muted-foreground">
            Analisis tentang performa sistem obrolan dan keterlibatan pengguna
            Anda
          </p>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sesi</CardTitle>
              <MessageSquare className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{thisMonthData.length}</div>
              {/* <p className="text-muted-foreground text-xs">
                <span className="text-green-600">{percentageChange}%</span> from
                last week
              </p> */}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
              <Star className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{feedbackRating}</div>
              {/* <p className="text-muted-foreground text-xs">
                <span className="text-green-600">+0.3</span> from last week
              </p> */}
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
              {/* <p className="text-muted-foreground text-xs">
                <span className="text-green-600">+0.3</span> from last week
              </p> */}
            </CardContent>
          </Card>
        </div>

        {/* Main Analytics Tabs */}
        <AnalyticsTab
          lastWeekData={thisMonthData}
          feedback={feedback}
          agent={agent}
        />
      </div>
    </div>
  );
}
