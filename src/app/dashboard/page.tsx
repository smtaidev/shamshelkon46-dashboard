import { StatsCards } from "@/components/stats-cards"
import { RevenueChart } from "@/components/revenue-chart"
import { SalesDistribution } from "@/components/sales-distribution"
import { PendingTasks } from "@/components/pending-tasks"
import { RecentActivities } from "@/components/recent-activities"
import { TimePeriodSelector } from "@/components/time-period-selector"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hi Raju, Good Morning!</h1>
          <p className="text-gray-600">Today is July 13, 2025</p>
        </div>
        <TimePeriodSelector />
      </div>

      {/* Stats Cards */}
      <StatsCards />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RevenueChart />
        <SalesDistribution />
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PendingTasks />
        <RecentActivities />
      </div>
    </div>
  )
}
