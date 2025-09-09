import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Prisma } from "@prisma/client";

type SessionPayload = Prisma.chat_sessionGetPayload<{
  include: {
    messages: true;
  };
}>[];

export default function SessionTable({
  data,
}: {
  data: {
    date: string;
    sessions: number;
    messages: number;
  }[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Detail Penggunaan</CardTitle>
        <CardDescription>Detail penggunaan mingguan</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table className="w-full table-auto">
            <TableHeader>
              <TableRow>
                <TableHead className="px-4 py-2 text-left">Tanggal</TableHead>
                <TableHead className="px-4 py-2 text-right">Jumlah Sesi</TableHead>
                <TableHead className="px-4 py-2 text-right">
                  Pertanyaan
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((data, index) => (
                <TableRow key={index}>
                  <TableCell className="px-4 py-2">{data.date}</TableCell>
                  <TableCell className="px-4 py-2 text-right">
                    {data.sessions}
                  </TableCell>
                  <TableCell className="px-4 py-2 text-right">
                    {data.messages}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
