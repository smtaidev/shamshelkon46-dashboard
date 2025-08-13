"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAppSelector } from "@/lib/store"
import { Badge } from "@/components/ui/badge"

export function PendingTasks() {
  const { pendingTasks } = useAppSelector((state) => state.dashboard)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending Tasks</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {pendingTasks.map((task) => (
          <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium text-gray-900">{task.title}</span>
            <Badge variant="secondary" className="bg-purple-100 text-purple-700">
              {task.count}+
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
