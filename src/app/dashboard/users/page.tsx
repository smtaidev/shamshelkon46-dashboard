"use client";

import { CustomDropdown } from "@/components/ui/CustomDropdown";
import { DataTable, TableColumn } from "@/components/ui/DataTable";
import { Pagination } from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

import { Download, Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// Mock data
const generateMockUsers = (page: number, perPage = 6) => {
  const startIndex = (page - 1) * perPage;
  const users = [];

  for (let i = 0; i < perPage; i++) {
    const userIndex = startIndex + i + 1;
    const avatarNumber = userIndex % 4 || 4; // Cycles through 1-4

    users.push({
      id: `user-${userIndex}`,
      userInfo: {
        name: `User ${userIndex}`,
        email: `user${userIndex}@example.com`,
        avatar: `/activities/user${avatarNumber}.png`,
      },
      role: userIndex % 3 === 0 ? "Corporate" : "Individual",
      status:
        userIndex % 4 === 0
          ? "Banned"
          : userIndex % 3 === 0
          ? "Pending"
          : "Active",
      verification: userIndex % 2 === 0,
      createdDate: "2025/01/14",
      lastLogin: "2025/07/25",
    });
  }

  return users;
};

const roleOptions = [
  { value: "all", label: "All Roles" },
  { value: "individual", label: "Individual" },
  { value: "corporate", label: "Corporate" },
];

const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "active", label: "Active" },
  { value: "pending", label: "Pending" },
  { value: "banned", label: "Banned" },
];

const verificationOptions = [
  { value: "all", label: "Verification Status" },
  { value: "verified", label: "Verified" },
  { value: "unverified", label: "Unverified" },
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
  { key: "userInfo", label: "User Info" },
  { key: "role", label: "Role" },
  { key: "status", label: "Status" },
  { key: "verification", label: "Verification" },
  { key: "createdDate", label: "Date Joined" },
  { key: "lastLogin", label: "Last Active" },
  { key: "actions", label: "Actions", className: "w-12" },
];

export default function UsersPage() {
  const [searchText, setSearchText] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [verificationFilter, setVerificationFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  //   const totalUsers = 134872;
  const totalPages = 203;
  const perPage = 6;

  const currentData = generateMockUsers(currentPage, perPage);

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
            options={roleOptions}
            placeholder="All Roles"
            value={roleFilter}
            onChange={setRoleFilter}
            className="w-full sm:w-auto min-w-[140px]"
          />
          <CustomDropdown
            options={statusOptions}
            placeholder="All Status"
            value={statusFilter}
            onChange={setStatusFilter}
            className="w-full sm:w-auto min-w-[140px]"
          />
          <CustomDropdown
            options={verificationOptions}
            placeholder="Verification Status"
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
