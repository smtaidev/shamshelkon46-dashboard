"use client";

import { CustomDropdown } from "@/components/ui/CustomDropdown";
import { DataTable, TableColumn } from "@/components/ui/DataTable";
import { Pagination } from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

import { Download, Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// Mock data
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
    const attendeeCount = 50 + ((eventIndex * 23) % 500); // Random attendee count between 50-500
    const avatarNumber = eventIndex % 4 || 4; // Cycles through 1-4

    events.push({
      id: `event-${eventIndex}`,
      event: {
        name: `Event ${eventIndex}`,
        year: `2025`,
        avatar: `/activities/user${avatarNumber}.png`, // Cycles through 1-4
      },
      category: categories[categoryIndex],
      status: statuses[statusIndex],
      type: types[typeIndex],
      eventDate: new Date(
        2025,
        eventIndex % 12,
        (eventIndex % 28) + 1
      ).toLocaleDateString(),
      attendees: attendeeCount.toLocaleString(),
      actions: "", // Empty string for actions column
    });
  }

  return events;
};

const categoryOptions = [
  { value: "tech", label: "Tech" },
  { value: "music", label: "Music" },
  { value: "fashion", label: "Fashion" },
  { value: "sports", label: "Sports" },
  { value: "business", label: "Business" },
  { value: "education", label: "Education" },
];

const typesOptions = [
  { value: "premium", label: "Premium" },
  { value: "free", label: "Free" },
  //   { value: "expired", label: "Expired" },
];

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "pending", label: "Pending" },
  { value: "expired", label: "Expired" },
];

const dateOptions = [
  { value: "all", label: "Date" },
  { value: "7days", label: "Last 7 Days" },
  { value: "30days", label: "Last 30 Days" },
  { value: "90days", label: "Last 90 Days" },
  { value: "180days", label: "Last 180 Days" },
  { value: "365days", label: "Last 365 Days" },
];

const columns: TableColumn[] = [
  { key: "event", label: "Event" },
  { key: "category", label: "Category" },
  { key: "status", label: "Status" },
  { key: "type", label: "Type" },
  { key: "eventDate", label: "Event Date" },
  { key: "attendees", label: "Attendees" },
  { key: "actions", label: "Actions", className: "w-12" },
];

export default function EventsPage() {
  const [searchText, setSearchText] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [verificationFilter, setVerificationFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  //   const totalUsers = 134872;
  const totalPages = 203;
  const perPage = 6;

  const currentData = generateMockEvents(currentPage, perPage);

  const handleExport = () => {
    toast.message("Exporting user list...");
  };

  const handlePageChange = (page: number) => {
    // console.log(`Navigating to page ${page}`);
    setCurrentPage(page);
  };

  //   console.log(searchText);
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <button
          onClick={handleExport}
          className="inline-flex items-center !px-5 !py-3 btn-gradient text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors duration-200"
        >
          <Download className="w-4 h-4 mr-2" />
          Export List
        </button>
      </div>
      {/* This should be shows in dashboard header (replace this dynamically instead of the input field over there) - there should be dynamically shows every route data individually */}
      {/* <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-sm text-gray-600 mt-1">
            Total {totalUsers.toLocaleString()} Users
          </p>
        </div>
      </div> */}

      {/* Filters */}
      <div className="flex flex-col xl:flex-row lg:justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap gap-3">
          <CustomDropdown
            options={categoryOptions}
            placeholder="All Categories"
            value={roleFilter}
            onChange={setRoleFilter}
            className="w-full sm:w-auto min-w-[140px]"
          />
          <CustomDropdown
            options={typesOptions}
            placeholder="All Types"
            value={statusFilter}
            onChange={setStatusFilter}
            className="w-full sm:w-auto min-w-[140px]"
          />
          <CustomDropdown
            options={statusOptions}
            placeholder="All status"
            value={verificationFilter}
            onChange={setVerificationFilter}
            className="w-full sm:w-auto min-w-[160px]"
          />
          <CustomDropdown
            options={dateOptions}
            placeholder="Date"
            value={dateFilter}
            onChange={setDateFilter}
            className="w-full sm:w-auto min-w-[160px]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="">
        <DataTable columns={columns} data={currentData} />
        <div
          className={cn(
            "bg-white border border-t-none border-gray-200 overflow-hidden",
            "rounded-t-none rounded-b-lg p-4"
          )}
        >
          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            showingText={`Showing ${currentPage} of ${totalPages} pages`}
          />
        </div>
      </div>
    </div>
  );
}
