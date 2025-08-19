"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Prisma } from "@prisma/client";
import { format } from "date-fns"; // makes date -> "YYYY-MM-DD"
import { CustomTooltip } from "./custom-tooltip";
import FeedbackTable from "./feedback-table";

type AgentPayload = Prisma.agentsGetPayload<{}> | null;

type SessionPayload = Prisma.chat_sessionGetPayload<{
  include: {
    messages: true;
  };
}>[];

type FeedbackPayload = Prisma.feedbackGetPayload<{}>[];

function aggregateSessionData(sessions: SessionPayload) {
  const stats: {
    [key: string]: {
      sessions: number;
      messages: number;
    };
  } = {};

  for (const s of sessions) {
    const dateKey = format(s.createdAt, "yyyy-MM-dd");

    if (!stats[dateKey]) {
      stats[dateKey] = { sessions: 0, messages: 0 };
    }

    stats[dateKey].sessions += 1;
    stats[dateKey].messages += s.messages.length; // if relation exists
  }

  // Convert object → array
  return Object.entries(stats).map(([date, v]) => ({
    date,
    sessions: v.sessions,
    messages: v.messages,
  }));
}

export default function AnalyticsTab({
  agent,
  feedback,
  lastWeekData,
}: {
  agent: AgentPayload;
  feedback: FeedbackPayload;
  lastWeekData: SessionPayload;
}) {
  const trendPenggunaan = aggregateSessionData(lastWeekData);

  const total = feedback.length;

  const counts: Record<number, number> = {};

  for (const f of feedback) {
    if (!f.rating) continue; // skip null
    counts[f.rating] = (counts[f.rating] || 0) + 1;
  }

  const feedbackData = [5, 4, 3, 2, 1].map((rating) => ({
    ratingLabel: "Rating " + rating,
    rating: rating,
    count: counts[rating] || 0,
    percentage:
      total > 0 ? Math.round(((counts[rating] || 0) / total) * 100) : 0,
  }));

  const positiveCount = feedback.filter((f) => (f.rating ?? 0) >= 3).length;
  const neutralCount = feedback.filter((f) => (f.rating ?? 0) === 3).length;
  const negativeCount = feedback.filter((f) => (f.rating ?? 0) < 3).length;

  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="sessions">Sessions</TabsTrigger>
        <TabsTrigger value="feedback">Feedback</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Trend Penggunaan</CardTitle>
              <CardDescription>Penggunaan harian minggu ini</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={trendPenggunaan}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="sessions"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.3}
                    name="Pengguna"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Trend Pertanyaan</CardTitle>
              <CardDescription>Jumlah Pertanyaan</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={trendPenggunaan}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area
                    yAxisId="right"
                    type="monotone"
                    dataKey="messages"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                    fillOpacity={0.3}
                    name="Pertanyaan"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="sessions" className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Sesi vs Pertanyaan</CardTitle>
              <CardDescription>
                Korelasi antara sesi dan pertanyaan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={trendPenggunaan}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area
                    yAxisId="right"
                    type="monotone"
                    dataKey="sessions"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.3}
                    name="Sesi"
                    strokeWidth={2}
                  />
                  <Area
                    yAxisId="right"
                    type="monotone"
                    dataKey="messages"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                    fillOpacity={0.3}
                    name="Pertanyaan"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="feedback" className="space-y-4">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Distribusi Rating</CardTitle>
              <CardDescription>Distribusi rating pada feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={feedbackData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <YAxis />
                  <XAxis dataKey="ratingLabel" />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="count" fill="#8884d8" name={"Jumlah"} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Feedback Summary</CardTitle>
              <CardDescription>Overall satisfaction metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Total Feedback</span>
                <Badge variant="outline">{feedback.length} feedback</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Response Rate</span>
                <Badge variant="outline" className="mr-2 ml-auto border-0">
                  {feedback.length} / {lastWeekData.length}
                </Badge>
                <Badge variant="outline" className="w-12">
                  {((feedback.length / lastWeekData.length) * 100).toFixed()}%
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  Positive (4-5 stars)
                </span>
                <Badge variant="outline" className="mr-2 ml-auto border-0">
                  {positiveCount} feedback
                </Badge>
                <Badge className="w-12 bg-green-100 text-green-800">
                  {((positiveCount / feedback.length) * 100).toFixed()}%
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Neutral (3 stars)</span>
                <Badge variant="outline" className="mr-2 ml-auto border-0">
                  {neutralCount} feedback
                </Badge>
                <Badge variant={"outline"} className="w-12">
                  {((neutralCount / feedback.length) * 100).toFixed()} %
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  Negative (1-2 stars)
                </span>
                <Badge variant="outline" className="mr-2 ml-auto border-0">
                  {negativeCount} feedback
                </Badge>
                <Badge className="w-12 bg-red-100 text-red-800">
                  {Math.round((negativeCount / feedback.length) * 100)}%
                </Badge>
              </div>
            </CardContent>
          </Card>

          <div className="col-span-2">
            <Card>
              <CardHeader className="mb-0">
                <CardTitle>Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                {agent && <FeedbackTable agentId={agent.id.toString()} />}
              </CardContent>
            </Card>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
