"use client";

import { Button } from "@/components/ui/button";
import { setTimePeriod } from "@/lib/dashboardSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { ChevronDown } from "lucide-react";

const periods = ["7 Days", "30 Days", "Custom"] as const;

export function TimePeriodSelector() {
  const dispatch = useAppDispatch();
  const { timePeriod } = useAppSelector((state) => state.dashboard);

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600">Show all stats for last:</span>
      <div className="flex gap-2">
        {periods.map((period) => {
          const isActive = timePeriod === period;
          return (
            <Button
              key={period}
              size="sm"
              onClick={() => dispatch(setTimePeriod(period))}
              className={`${
                isActive
                  ? "btn-gradient text-white border-none"
                  : "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-100"
              } ${period === "Custom" ? "flex items-center gap-1" : ""}`}
            >
              {period}
              {period === "Custom" && <ChevronDown className="w-3 h-3" />}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
