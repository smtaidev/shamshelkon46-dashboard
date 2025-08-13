"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RecentActivities() {
  //   const { recentActivities } = useAppSelector((state) => state.dashboard);

  const recentActivities: Array<{
    id: string;
    user: string;
    action: string;
    time: string;
    avatar: string;
  }> = [
    {
      id: "1",
      user: "Michael Brown",
      action: "purchased tickets for Tech Conference 2025",
      time: "1 min ago",
      avatar: "/activities/user1.png",
    },
    {
      id: "2",
      user: "Frank Onis",
      action: 'created a new event "Summer Music Festival"',
      time: "6 min ago",
      avatar: "/activities/user2.png",
    },
    {
      id: "3",
      user: "Michael Brown",
      action: "purchased tickets for Tech Conference 2025",
      time: "1 min ago",
      avatar: "/activities/user3.png",
    },
    {
      id: "4",
      user: "Emma Davis",
      action: 'created a new event "Summer Music Festival"',
      time: "6 min ago",
      avatar: "/activities/user4.png",
    },
  ];

  return (
    <Card className="bg-white border-none shadow-none">
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 max-h-96 overflow-y-auto">
        {recentActivities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={activity.avatar || "/placeholder.svg"} />
              <AvatarFallback>
                {activity.user
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-background-secondary">
                <span className="font-medium text-black">{activity.user}</span>{" "}
                {activity.action}
              </p>
              <p className="text-xs text-background-secondary mt-1">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
