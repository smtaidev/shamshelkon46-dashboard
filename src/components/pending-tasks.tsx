"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PendingTasks() {
  //   const { pendingTasks } = useAppSelector((state) => state.dashboard)

  //   interface IpendingTasks: Array<{
  //     id: string;
  //     title: string;
  //     count: number;
  //   }>;

  const pendingTasks: Array<{ id: string; title: string; count: number }> = [
    { id: "1", title: "User Verification Requests", count: 99 },
    { id: "2", title: "System Updates", count: 8 },
    { id: "3", title: "Process Payout Requests", count: 4 },
  ];

  return (
    <Card className="bg-white border-none shadow-none">
      <CardHeader>
        <CardTitle>Pending Tasks</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 max-h-72 overflow-y-auto">
        {pendingTasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
          >
            <span className="text-sm font-medium text-gray-900">
              {task.title}
            </span>
            <Badge className="bg-transparent text-primary">{task.count}+</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
