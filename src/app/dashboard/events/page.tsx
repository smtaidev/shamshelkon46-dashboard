/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { CustomDropdown } from "@/components/ui/CustomDropdown";
import { Pagination } from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { Check, Download, MoreVertical, Search, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { RiCloseLargeLine } from "react-icons/ri";
import { toast } from "sonner";

// Mock data generation
const generateMockEvents = (page: number, perPage = 6) => {
  const startIndex = (page - 1) * perPage;
  const events = [];
  const categories = [
    "Tech",
    "Music",
    "Fashion",
    "Sports",
    "Business",
    "Education",
  ];
  const statuses = ["Active", "Pending", "Expired"];
  const types = ["Premium", "Free"];

  for (let i = 0; i < perPage; i++) {
    const eventIndex = startIndex + i + 1;
    const categoryIndex = eventIndex % categories.length;
    const statusIndex = eventIndex % statuses.length;
    const typeIndex = eventIndex % types.length;
    const attendeeCount = 50 + ((eventIndex * 23) % 500);
    const avatarNumber = eventIndex % 4 || 4;

    events.push({
      id: `event-${eventIndex}`,
      name: `Event ${eventIndex}`,
      organizer: `Organizer ${eventIndex}`,
      email: `event${eventIndex}@example.com`,
      avatar: `/activities/user${avatarNumber}.png`,
      category: categories[categoryIndex],
      status: statuses[statusIndex],
      type: types[typeIndex],
      eventDate: new Date(
        2025,
        eventIndex % 12,
        (eventIndex % 28) + 1
      ).toLocaleDateString(),
      attendees: attendeeCount.toLocaleString(),
      lastUpdated: "2025/07/25",
    });
  }

  return events;
};

// Filter options
const categoryOptions = [
  { value: "all", label: "All Categories" },
  { value: "tech", label: "Tech" },
  { value: "music", label: "Music" },
  { value: "fashion", label: "Fashion" },
  { value: "sports", label: "Sports" },
  { value: "business", label: "Business" },
  { value: "education", label: "Education" },
];

const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "active", label: "Active" },
  { value: "pending", label: "Pending" },
  { value: "expired", label: "Expired" },
];

const typeOptions = [
  { value: "all", label: "All Types" },
  { value: "premium", label: "Premium" },
  { value: "free", label: "Free" },
];

const dateOptions = [
  { value: "all", label: "All Time" },
  { value: "7days", label: "Last 7 Days" },
  { value: "30days", label: "Last 30 Days" },
  { value: "90days", label: "Last 90 Days" },
  { value: "180days", label: "Last 180 Days" },
  { value: "365days", label: "Last 365 Days" },
];

export default function EventsPage() {
  // State management
  const [searchText, setSearchText] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [openActionId, setOpenActionId] = useState<string | null>(null);
  const actionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const inputRef = useRef<HTMLInputElement>(null);

  // Data and pagination
  const totalEvents = 203;
  const totalPages = Math.ceil(totalEvents / 6);
  const currentData = generateMockEvents(currentPage);

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
    toast.message("Exporting event list...");
  };

  useEffect(() => {
    console.log("Filters Options for backend:", {
      searchText,
      categoryFilter,
      statusFilter,
      typeFilter,
      dateFilter,
    });
  }, [searchText, categoryFilter, statusFilter, typeFilter, dateFilter]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handleEventAction = (eventId: string, action: string) => {
    console.log(`Action "${action}" on event ${eventId}`);
    setOpenActionId(null);

    switch (action) {
      case "approve":
        toast.success(`Event ${eventId} approved`);
        break;
      case "reject":
        toast.success(`Event ${eventId} rejected`);
        break;
      case "feature":
        toast.success(`Event ${eventId} featured`);
        break;
      default:
        toast.info(`Action ${action} performed`);
    }
  };

  // Render cell content
  const renderCellContent = (event: any, column: string) => {
    switch (column) {
      case "eventInfo":
        return (
          <div className="flex items-center space-x-3">
            <Image
              src={event.avatar}
              alt={event.name}
              className="w-10 h-10 rounded-xl object-cover flex-shrink-0"
              width={40}
              height={40}
            />
            <div className="min-w-0 flex-1">
              <div className="font-medium text-gray-900 truncate">
                {event.name}
              </div>
              <div className="text-sm text-gray-500 truncate">
                {event.organizer}
              </div>
            </div>
          </div>
        );

      case "category":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-gray-700">
            {event.category}
          </span>
        );

      case "status":
        return (
          <span
            className={cn(
              "inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium",
              event.status === "Active" && "bg-green-100 text-green-800",
              event.status === "Pending" && "bg-yellow-100 text-yellow-800",
              event.status === "Expired" && "bg-red-100 text-red-800"
            )}
          >
            {event.status}
          </span>
        );

      case "type":
        return (
          <div className="flex items-center space-x-1">
            {event.type === "Premium" ? (
              <Check className="w-4 h-4 text-primary" />
            ) : (
              <X className="w-4 h-4 text-gray-400" />
            )}
            <span
              className={
                event.type === "Premium" ? "text-primary" : "text-gray-600"
              }
            >
              {event.type}
            </span>
          </div>
        );

      case "actions":
        const actions = [];
        if (event.status === "Pending") {
          actions.push({
            key: "approve",
            label: "Approve Event",
            className: "text-green-600 hover:bg-green-50",
          });
          actions.push({
            key: "reject",
            label: "Reject Event",
            className: "text-red-600 hover:bg-red-50",
          });
        } else if (event.status === "Active") {
          actions.push({
            key: "feature",
            label: "Feature Event",
            className: "text-blue-600 hover:bg-blue-50",
          });
          actions.push({
            key: "reject",
            label: "Deactivate",
            className: "text-red-600 hover:bg-red-50",
          });
        } else if (event.status === "Expired") {
          actions.push({
            key: "renew",
            label: "Renew Event",
            className: "text-green-600 hover:bg-green-50",
          });
        }

        return (
          <div
            className="relative w-fit"
            ref={(el) => {
              actionRefs.current[event.id] = el;
            }}
          >
            <button
              onClick={() =>
                setOpenActionId(openActionId === event.id ? null : event.id)
              }
              className="p-2 hover:bg-gray-100 rounded-md transition-colors"
              aria-label="Actions"
            >
              <MoreVertical className="w-5 h-5 text-gray-500" />
            </button>

            {openActionId === event.id && (
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
                      onClick={() => handleEventAction(event.id, action.key)}
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
        return <span className="text-sm text-gray-900">{event[column]}</span>;
    }
  };

  // Columns configuration
  const columns = [
    { key: "eventInfo", label: "Event Info", sortable: true },
    { key: "category", label: "Category", sortable: true },
    { key: "status", label: "Status", sortable: true },
    { key: "type", label: "Type", sortable: true },
    { key: "eventDate", label: "Event Date", sortable: true },
    { key: "attendees", label: "Attendees", sortable: true },
    { key: "lastUpdated", label: "Last Updated", sortable: true },
    { key: "actions", label: "Actions" },
  ];

  return (
    <div className="p-6 space-y-0">
      {/* Header */}
      <div>
        <button
          onClick={handleExport}
          className="inline-flex items-center !px-5 !py-3 btn-gradient text-white text-sm font-medium rounded-lg"
        >
          <Download className="w-4 h-4 mr-2" />
          Export List
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
            placeholder="Search events..."
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
            options={categoryOptions}
            placeholder="All Categories"
            value={categoryFilter}
            onChange={setCategoryFilter}
            className="min-w-[160px]"
          />
          <CustomDropdown
            options={statusOptions}
            placeholder="All Status"
            value={statusFilter}
            onChange={setStatusFilter}
            className="min-w-[140px]"
          />
          <CustomDropdown
            options={typeOptions}
            placeholder="All Types"
            value={typeFilter}
            onChange={setTypeFilter}
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
                      column.sortable && ""
                    )}
                  >
                    <div className="flex items-center">{column.label}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentData.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50">
                  {columns.map((column) => (
                    <td key={column.key} className="px-6 py-4">
                      {renderCellContent(event, column.key)}
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
