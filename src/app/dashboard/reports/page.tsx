/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { CustomDropdown } from "@/components/ui/CustomDropdown";
import { Pagination } from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { Download, MoreVertical, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { RiCloseLargeLine } from "react-icons/ri";
import { toast } from "sonner";

// Mock data generation
const generateMockReports = (page: number, perPage = 6) => {
  const startIndex = (page - 1) * perPage;
  const reports = [];
  const types = ["User", "Event", "Comment"];
  const statuses = ["Open", "In Review", "Dismissed"];
  const reporters = ["Sarah Johnson", "Michael Chen", "Emma Watson"];
  const reportedItems = [
    "Tech Conference 2025",
    "Music Festival",
    "Emma Watson",
  ];

  for (let i = 0; i < perPage; i++) {
    const reportIndex = startIndex + i + 1;
    const typeIndex = reportIndex % types.length;
    const statusIndex = reportIndex % statuses.length;
    const reporterIndex = reportIndex % reporters.length;
    const itemIndex = reportIndex % reportedItems.length;

    reports.push({
      id: `RPT-2025-${String(reportIndex).padStart(3, "0")}`,
      type: types[typeIndex],
      status: statuses[statusIndex],
      reporter: reporters[reporterIndex],
      reportedItem: reportedItems[itemIndex],
      eventDate: new Date(
        2025,
        reportIndex % 12,
        (reportIndex % 28) + 1
      ).toLocaleDateString(),
      lastUpdated: "2025/01/14",
    });
  }

  return reports;
};

// Filter options
const typeOptions = [
  { value: "all", label: "All Types" },
  { value: "user", label: "User" },
  { value: "event", label: "Event" },
  { value: "comment", label: "Comment" },
];

const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "open", label: "Open" },
  { value: "in_review", label: "In Review" },
  { value: "dismissed", label: "Dismissed" },
];

const dateOptions = [
  { value: "all", label: "All Time" },
  { value: "7days", label: "Last 7 Days" },
  { value: "30days", label: "Last 30 Days" },
  { value: "90days", label: "Last 90 Days" },
  { value: "180days", label: "Last 180 Days" },
  { value: "365days", label: "Last 365 Days" },
];

export default function ReportsPage() {
  // State management
  const [searchText, setSearchText] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [openActionId, setOpenActionId] = useState<string | null>(null);
  const actionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const inputRef = useRef<HTMLInputElement>(null);

  // Data and pagination
  const totalReports = 203;
  const totalPages = Math.ceil(totalReports / 6);
  const currentData = generateMockReports(currentPage);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      Object.entries(actionRefs.current).forEach(([id, ref]) => {
        if (ref && !ref.contains(event.target as Node)) {
          setOpenActionId((prev) => (prev === id ? null : prev));
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handlers
  const handleExport = () => {
    toast.message("Exporting reports...");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  useEffect(() => {
    console.log("Filters Options for backend:", {
      searchText,
      typeFilter,
      statusFilter,
      dateFilter,
    });
  }, [searchText, typeFilter, statusFilter, dateFilter]);

  const handleReportAction = (reportId: string, action: string) => {
    console.log(`Action "${action}" on report ${reportId}`);
    setOpenActionId(null);

    switch (action) {
      case "review":
        toast.success(`Report ${reportId} marked as reviewed`);
        break;
      case "dismiss":
        toast.success(`Report ${reportId} dismissed`);
        break;
      case "reopen":
        toast.success(`Report ${reportId} reopened`);
        break;
      default:
        toast.info(`Action ${action} performed`);
    }
  };

  // Render cell content
  const renderCellContent = (report: any, column: string) => {
    switch (column) {
      case "reportId":
        return <span className="font-medium text-gray-900">{report.id}</span>;

      case "type":
        return <span className="text-gray-700">{report.type}</span>;

      case "status":
        return (
          <span
            className={cn(
              "inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium",
              report.status === "Open" && "bg-success/15 text-success",
              report.status === "In Review" && "bg-yellow-100 text-yellow-800",
              report.status === "Dismissed" && "bg-gray-100 text-gray-800"
            )}
          >
            {report.status}
          </span>
        );

      case "reporter":
        return (
          <div className="flex items-center space-x-3">
            {/* <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
              {report.reporter.charAt(0)}
            </div> */}
            <span className="text-gray-700">{report.reporter}</span>
          </div>
        );

      case "reportedItem":
        return <span className="text-gray-700">{report.reportedItem}</span>;

      case "eventDate":
        return (
          <span className="text-sm text-gray-500">{report.eventDate}</span>
        );

      case "actions":
        const actions = [];
        if (report.status === "Open") {
          actions.push({
            key: "review",
            label: "Mark as Reviewed",
            className: "text-blue-600 hover:bg-blue-50",
          });
          actions.push({
            key: "dismiss",
            label: "Dismiss Report",
            className: "text-red-600 hover:bg-gray-50",
          });
        } else if (report.status === "In Review") {
          actions.push({
            key: "dismiss",
            label: "Dismiss Report",
            className: "text-gray-600 hover:bg-gray-50",
          });
        } else if (report.status === "Dismissed") {
          actions.push({
            key: "reopen",
            label: "Reopen Report",
            className: "text-blue-600 hover:bg-blue-50",
          });
        }

        return (
          <div
            className="relative w-fit"
            ref={(el) => {
              actionRefs.current[report.id] = el;
            }}
          >
            <button
              onClick={() =>
                setOpenActionId(openActionId === report.id ? null : report.id)
              }
              className="p-2 hover:bg-gray-100 rounded-md transition-colors"
              aria-label="Actions"
            >
              <MoreVertical className="w-5 h-5 text-gray-500" />
            </button>

            {openActionId === report.id && (
              <div
                ref={(menuEl) => {
                  if (menuEl) {
                    const rect = menuEl.getBoundingClientRect();
                    const spaceBelow = window.innerHeight - rect.bottom;
                    const spaceAbove = rect.top;

                    if (spaceBelow < 1000 && spaceAbove > spaceBelow) {
                      menuEl.classList.add("bottom-full", "mb-2");
                      menuEl.classList.remove("top-full", "mt-2");
                    } else {
                      menuEl.classList.add("top-full", "mt-2");
                      menuEl.classList.remove("bottom-full", "mb-2");
                    }
                  }
                }}
                className="absolute right-0 z-50 w-44 bg-white rounded-lg shadow-lg border border-gray-200 animate-in fade-in-0 zoom-in-95"
              >
                <div className="py-1">
                  {actions.map((action) => (
                    <button
                      key={action.key}
                      onClick={() => handleReportAction(report.id, action.key)}
                      className={cn(
                        "w-full px-4 py-2 text-left text-sm transition-colors",
                        action.className
                      )}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      default:
        return <span className="text-sm text-gray-900">{report[column]}</span>;
    }
  };

  // Columns configuration
  const columns = [
    { key: "reportId", label: "Report ID", sortable: true },
    { key: "type", label: "Type", sortable: true },
    { key: "status", label: "Status", sortable: true },
    { key: "reporter", label: "Reporter", sortable: true },
    { key: "reportedItem", label: "Reported Item", sortable: true },
    { key: "eventDate", label: "Event Date", sortable: true },
    { key: "actions", label: "Actions" },
  ];

  return (
    <div className="p-6 space-y-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <button
          onClick={handleExport}
          className="inline-flex items-center !px-5 !py-3 btn-gradient text-white text-sm font-medium rounded-lg"
        >
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col xl:flex-row lg:justify-between gap-4 py-8">
        {/* Search Box */}
        <form onSubmit={handleSearch} className="relative flex-1 w-full">
          {" "}
          {/* max-w-md */}
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search reports..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-1 focus:ring-primary focus:border-transparent focus:outline-none transition-all duration-200"
          />
          {searchText && (
            <RiCloseLargeLine
              onClick={() => {
                setSearchText("");
                inputRef.current?.focus();
              }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:cursor-pointer text-gray-500"
            />
          )}
        </form>

        {/* Dropdown options */}
        <div className="flex flex-wrap gap-3">
          <CustomDropdown
            options={typeOptions}
            placeholder="All Types"
            value={typeFilter}
            onChange={setTypeFilter}
            className="min-w-[140px]"
          />
          <CustomDropdown
            options={statusOptions}
            placeholder="All Status"
            value={statusFilter}
            onChange={setStatusFilter}
            className="min-w-[140px]"
          />
          <CustomDropdown
            options={dateOptions}
            placeholder="Date"
            value={dateFilter}
            onChange={setDateFilter}
            className="min-w-[160px]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-b border-gray-200 rounded-t-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-full">
            <thead className="bg-background-secondary/7 border-b border-gray-200">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={cn(
                      "px-6 py-6 text-left text-sm font-medium tracking-wider",
                      column.sortable && "cursor-pointer"
                    )}
                  >
                    <div className="flex items-center">{column.label}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentData.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  {columns.map((column) => (
                    <td key={column.key} className="px-6 py-4">
                      {renderCellContent(report, column.key)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="bg-white border border-t-0 border-gray-200 rounded-b-lg p-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          showingText={`Showing ${currentPage} of ${totalPages}`}
        />
      </div>
    </div>
  );
}
