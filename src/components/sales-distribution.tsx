/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const chartData = [
  { name: "Business", value: 28, color: "#2E2071" },
  { name: "Tech", value: 32, color: "#593EDD" },
  { name: "Sports", value: 18, color: "#8A73FF" },
  { name: "Fashion", value: 18, color: "#D1C8FF" },
  { name: "Education", value: 22, color: "#BFBFBF" },
  { name: "Music", value: 28, color: "#606060" },
];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value,
  percent,
}: any) => {
  const RADIAN = Math.PI / 180;
  // Position labels closer to the center, within the inner white area
  const radius = innerRadius * 0.8; // Much closer to center
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#4E4E4E"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize="14"
      fontWeight="600"
      className="select-none"
    >
      {`${value}%`}
    </text>
  );
};

export function SalesDistribution() {
  return (
    <div className="w-full bg-white p-6 rounded-lg border-none border-gray-100">
      <h3 className="text-xl font-semibold text-gray-900 text-center mb-8">
        Sales Distribution
      </h3>

      <div className="flex justify-center mb-8">
        <div className="w-72 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                innerRadius={110}
                outerRadius={135}
                paddingAngle={0}
                dataKey="value"
                stroke="none"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4 max-w-md mx-auto">
        {chartData.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <div
              className="w-4 h-4 rounded-sm flex-shrink-0"
              style={{ backgroundColor: item.color }}
            ></div>
            <span className="text-sm text-gray-700 font-medium whitespace-nowrap">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
