"use client";
import { PendingTasks } from "@/components/pending-tasks";
import { RecentActivities } from "@/components/recent-activities";
import { RevenueChart } from "@/components/revenue-chart";
import { SalesDistribution } from "@/components/sales-distribution";
import { StatsCards } from "@/components/stats-cards";
import { TimePeriodSelector } from "@/components/time-period-selector";
import useGreeting from "@/utils/useGreeting";
import moment from "moment";

export default function DashboardPage() {
  const today = moment().format("ll");
  const greeting = useGreeting();

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Hi Abu Rayhan, {greeting && greeting + "!"}
          </h1>
          <p className="text-gray-600">Today is {today}</p>
        </div>
        <TimePeriodSelector />
      </div>

      {/* Stats Cards */}
      <StatsCards />

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <RevenueChart />
        <SalesDistribution />
      </div>

      {/* Bottom Section */}
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="col-span-1 lg:col-span-4">
          <PendingTasks />
        </div>
        <div className="col-span-1 lg:col-span-8">
          <RecentActivities />
        </div>
      </div>
    </div>
  );
}
