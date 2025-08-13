"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAppSelector } from "@/lib/store"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts"

export function RevenueChart() {
  const { revenueData } = useAppSelector((state) => state.dashboard)

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Revenue Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="boostRevenue" fill="#6366f1" name="Boost Revenue" />
              <Bar dataKey="ticketSales" fill="#9ca3af" name="Ticket Sales" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
