/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const chartData = [
  { day: "Fri", boostRevenue: 2500, ticketSales: 1500 },
  { day: "Sat", boostRevenue: 3200, ticketSales: 2200 },
  { day: "Sun", boostRevenue: 1600, ticketSales: 1100 },
  { day: "Mon", boostRevenue: 2800, ticketSales: 1275 }, // 1275 shown in tooltip
  { day: "Tue", boostRevenue: 3600, ticketSales: 3000 },
  { day: "Wed", boostRevenue: 2342, ticketSales: 1300 }, // 2342 shown in tooltip
  { day: "Thu", boostRevenue: 2500, ticketSales: 1500 },
];

const chartConfig = {
  boostRevenue: {
    label: "Boost Revenue",
    color: "#6366f1",
  },
  ticketSales: {
    label: "Ticket Sales",
    color: "#d1d5db",
  },
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="relative animate-in fade-in-0 zoom-in-95 duration-200">
        <div className="bg-gray-800 text-white px-3 py-1.5 rounded-md shadow-lg text-sm font-medium">
          <div className="text-center leading-tight">
            <div className="font-bold text-white">
              {data.value.toLocaleString()}
            </div>
            <div className="text-xs text-gray-300 -mt-0.5">USD</div>
          </div>
        </div>
        {/* Enhanced tooltip arrow */}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-px">
          <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent border-t-gray-800"></div>
        </div>
      </div>
    );
  }
  return null;
};

export function RevenueChart() {
  return (
    <div className="w-full bg-white p-6 rounded-lg">
      <div className="md:flex items-center justify-between mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 md:mb-0 text-center md:text-left">
          Revenue Stats
        </h3>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <span className="text-sm text-gray-600">Boost Revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#d1d5db]"></div>
            <span className="text-sm text-gray-600">Ticket Sales</span>
          </div>
        </div>
      </div>

      <ChartContainer config={chartConfig} className="w-full">
        <ResponsiveContainer>
          <BarChart
            data={chartData}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            barCategoryGap="20%"
          >
            <CartesianGrid
              strokeDasharray="none"
              stroke="#f3f4f6"
              vertical={false}
            />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 14, fill: "#6b7280", fontWeight: 500 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 14, fill: "#6b7280" }}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)},000`}
              domain={[0, 4000]}
              ticks={[0, 1000, 2000, 3000, 4000]}
            />
            <ChartTooltip
              content={<CustomTooltip />}
              cursor={{ fill: "#f0f0f0", radius: 2 }}
              animationDuration={150}
              animationEasing="ease-out"
              position={{ x: undefined, y: undefined }}
              offset={15}
              allowEscapeViewBox={{ x: false, y: true }}
            />
            <Bar
              dataKey="boostRevenue"
              fill="#d1d5db"
              radius={[2, 2, 0, 0]}
              name="Boost Revenue"
              maxBarSize={40}
              className="transition-all duration-200 hover:opacity-80"
            />
            <Bar
              fill="var(--color-primary)"
              dataKey="ticketSales"
              radius={[2, 2, 0, 0]}
              name="Ticket Sales"
              maxBarSize={40}
              className="transition-all duration-200 hover:opacity-80"
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
