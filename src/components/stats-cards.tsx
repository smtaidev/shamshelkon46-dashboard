"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useAppSelector } from "@/lib/store";
import Image from "next/image";

const statsConfig = [
  {
    key: "newUsers" as const,
    title: "New Users",
    // icon: Users,
    icon: "/stat-cards/people.png",
    change: "+12%",
    positive: true,
    color: "text-primary",
    bgColor: "bg-secondary/20",
  },
  {
    key: "activeEvents" as const,
    title: "Active Events",
    // icon: Calendar,
    icon: "/stat-cards/calendar.png",
    change: "-12%",
    positive: false,
    color: "text-info",
    bgColor: "bg-info/20",
  },
  {
    key: "boostRevenue" as const,
    title: "Boost Revenue",
    // icon: DollarSign,
    icon: "/stat-cards/money.png",
    change: "+12%",
    positive: true,
    color: "text-success",
    bgColor: "bg-success/20",
    prefix: "$",
  },
  {
    key: "ticketSales" as const,
    title: "Ticket Sales",
    // icon: Ticket,
    icon: "/stat-cards/ticket.png",
    change: "-5%",
    positive: false,
    color: "text-warningSoft",
    bgColor: "bg-warningSoft/20",
    prefix: "$",
  },
  {
    key: "pendingReports" as const,
    title: "Pending Reports",
    // icon: FileText,
    icon: "/stat-cards/flag.png",
    change: "",
    positive: true,
    color: "text-danger",
    bgColor: "bg-danger/20",
  },
];

export function StatsCards() {
  const { stats } = useAppSelector((state) => state.dashboard);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
      {statsConfig.map((config) => {
        const value = stats[config.key];
        // const Icon = config.icon;

        return (
          <Card
            key={config.key}
            className="relative overflow-hidden bg-white shadow-none border-none"
          >
            <CardContent className="p-6">
              <div>
                {/* Upper row */}
                <div className="flex justify-between items-center">
                  <p className="text-2xl font-bold text-gray-900">
                    {config.prefix}
                    {value.toLocaleString()}
                  </p>
                  {/* Icons */}
                  <div className={`rounded-full ${config.bgColor}`}>
                    {/* <Icon className={`w-6 h-6 ${config.color}`} /> */}
                    <Image
                      src={config.icon}
                      width={50}
                      height={50}
                      alt="icons"
                      draggable={false}
                    />
                  </div>
                </div>
                {/* Lower row */}
                <div className="flex gap-2 items-center">
                  <p className="text-lg text-background-secondary mt-1">
                    {config.title}
                  </p>
                  {/* Trend icons with dynamic value */}
                  <div>
                    {config.change && (
                      <div className="flex items-center gap-1 mt-1">
                        {/* {config.positive ? (
                          <TrendingUp className="w-3 h-3 text-success" />
                        ) : (
                          <TrendingDown className="w-3 h-3 text-danger" />
                        )} */}
                        <span
                          className={`text-lg font-medium ${
                            config.positive ? "text-success" : "text-danger"
                          }`}
                        >
                          {config.change}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
