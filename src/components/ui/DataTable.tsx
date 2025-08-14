/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";

import { cn } from "@/lib/utils";
import { Check, MoreHorizontal, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  className?: string;
}

export interface TableRow {
  id: string;
  [key: string]: any;
}

interface DataTableProps {
  columns: TableColumn[];
  data: TableRow[];
  className?: string;
}

export function DataTable({ columns, data, className }: DataTableProps) {
  const [openActionId, setOpenActionId] = useState<string | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState<"bottom" | "top">(
    "bottom"
  );
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenActionId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getActionOptions = (row: TableRow) => {
    const status = row.status;
    const actions = [];

    if (status === "Active") {
      actions.push({
        key: "ban",
        label: "Ban User",
        className: "text-red-600 hover:bg-red-50",
      });
    } else if (status === "Banned") {
      actions.push({
        key: "unban",
        label: "Unban User",
        className: "text-green-600 hover:bg-green-50",
      });
      actions.push({
        key: "activate",
        label: "Activate User",
        className: "text-blue-600 hover:bg-blue-50",
      });
    } else if (status === "Pending") {
      actions.push({
        key: "activate",
        label: "Activate User",
        className: "text-green-600 hover:bg-green-50",
      });
      actions.push({
        key: "ban",
        label: "Ban User",
        className: "text-red-600 hover:bg-red-50",
      });
    }

    return actions;
  };

  const handleActionClick = (
    rowId: string,
    action: string,
    rowData: TableRow
  ) => {
    console.log(`Action "${action}" clicked for user ID: ${rowId}`);
    console.log("User Name:", rowData.userInfo?.name);
    console.log("User Email:", rowData.userInfo?.email);
    console.log("User Status:", rowData.status);
    console.log("Full row data:", rowData);
    setOpenActionId(null);
  };

  const handleActionButtonClick = (
    rowId: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const dropdownHeight = 150; // Increased estimate for dropdown height

    const spaceBelow = viewportHeight - rect.bottom - 20; // Add 20px buffer
    const spaceAbove = rect.top - 20; // Add 20px buffer
    const shouldOpenUpward =
      spaceBelow < dropdownHeight && spaceAbove > dropdownHeight;

    setDropdownPosition(shouldOpenUpward ? "top" : "bottom");

    const row = data.find((r) => r.id === rowId);
    console.log(
      `Action menu ${openActionId === rowId ? "closed" : "opened"} for user:`,
      row?.userInfo?.name
    );
    // console.log("Button position:", {
    //   top: rect.top,
    //   bottom: rect.bottom,
    //   spaceBelow: spaceBelow + 20,
    //   spaceAbove: spaceAbove + 20,
    //   shouldOpenUpward,
    //   viewportHeight,
    // });

    setOpenActionId(openActionId === rowId ? null : rowId);
  };

  const renderCellContent = (row: TableRow, column: TableColumn) => {
    const value = row[column.key];

    switch (column.key) {
      case "userInfo":
        return (
          <div className="flex items-center space-x-3">
            <img
              src={value.avatar || "/placeholder.svg"}
              alt={value.name}
              className="w-10 h-10 rounded-full object-cover flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <div className="font-medium text-gray-900 truncate">
                {value.name}
              </div>
              <div className="text-sm text-gray-500 truncate">
                {value.email}
              </div>
            </div>
          </div>
        );

      case "role":
        return (
          <span
            className={cn(
              "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap",
              value === "Individual" && "bg-gray-100 text-gray-800",
              value === "Corporate" && "bg-purple-100 text-purple-800"
            )}
          >
            {value}
          </span>
        );

      case "status":
        return (
          <span
            className={cn(
              "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap",
              value === "Active" && "bg-green-100 text-green-800",
              value === "Pending" && "bg-yellow-100 text-yellow-800",
              value === "Banned" && "bg-red-100 text-red-800"
            )}
          >
            {value}
          </span>
        );

      case "verification":
        return (
          <div className="flex items-center space-x-1">
            {value ? (
              <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
            ) : (
              <X className="w-4 h-4 text-gray-400 flex-shrink-0" />
            )}
            <span
              className={cn(
                "text-sm font-medium whitespace-nowrap",
                value ? "text-green-600" : "text-gray-500"
              )}
            >
              {value ? "Verified" : "Unverified"}
            </span>
          </div>
        );

      case "actions":
        const actionOptions = getActionOptions(row);
        return (
          <div
            className="relative"
            ref={openActionId === row.id ? dropdownRef : null}
          >
            <button
              ref={openActionId === row.id ? buttonRef : null}
              onClick={(e) => handleActionButtonClick(row.id, e)}
              className="p-2 hover:bg-gray-100 rounded-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1"
              aria-label="More actions"
            >
              <MoreHorizontal className="w-5 h-5 text-gray-500" />
            </button>

            {openActionId === row.id && actionOptions.length > 0 && (
              <div
                className={cn(
                  "absolute right-0 w-44 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 animate-in fade-in-0 zoom-in-95 duration-100",
                  dropdownPosition === "top"
                    ? "bottom-full mb-2"
                    : "top-full mt-2"
                )}
                style={{
                  ...(dropdownPosition === "top" && {
                    transform: "translateY(-4px)",
                  }),
                }}
              >
                {actionOptions.map((action) => (
                  <button
                    key={action.key}
                    onClick={() => {
                      console.log(`Dropdown action "${action.key}" clicked`);
                      handleActionClick(row.id, action.key, row);
                    }}
                    className={cn(
                      "w-full px-4 py-2.5 text-left text-sm transition-colors duration-150 hover:bg-gray-50",
                      action.className
                    )}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        );

      default:
        return (
          <span className="text-sm text-gray-900 truncate block">{value}</span>
        );
    }
  };

  return (
    <div
      className={cn(
        "bg-white rounded-lg border border-gray-200 overflow-hidden",
        className
      )}
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                    column.className
                  )}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={cn("px-6 py-4", column.className)}
                  >
                    {renderCellContent(row, column)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
