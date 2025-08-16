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
const generateMockUsers = (page: number, perPage = 6) => {
  const startIndex = (page - 1) * perPage;
  const users = [];

  for (let i = 0; i < perPage; i++) {
    const userIndex = startIndex + i + 1;
    const avatarNumber = userIndex % 4 || 4;

    users.push({
      id: `user-${userIndex}`,
      name: `User ${userIndex}`,
      email: `user${userIndex}@example.com`,
      avatar: `/activities/user${avatarNumber}.png`,
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

// Filter options
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

export default function UsersPage() {
  // State management
  const [searchText, setSearchText] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [verificationFilter, setVerificationFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  //   const [sortConfig, setSortConfig] = useState<{
  //     key: string;
  //     direction: "ascending" | "descending";
  //   } | null>(null);
  const [openActionId, setOpenActionId] = useState<string | null>(null);
  const actionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const inputRef = useRef<HTMLInputElement>(null); // ref for input (user search)

  // Data and pagination
  const totalPages = 203;
  const perPage = 6;
  const currentData = generateMockUsers(currentPage, perPage);

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
    // console.log("Exporting with filters:", {
    //   searchText,
    //   roleFilter,
    //   statusFilter,
    //   verificationFilter,
    //   dateFilter,
    // });
    toast.message("Exporting user list...");
  };

  useEffect(() => {
    console.log("Filters Options for backend:", {
      searchText,
      roleFilter,
      statusFilter,
      verificationFilter,
      dateFilter,
    });
  }, [searchText, roleFilter, statusFilter, verificationFilter, dateFilter]);

  const handlePageChange = (page: number) => {
    console.log("Navigating to page:", page);
    setCurrentPage(page);
  };

  //   const requestSort = (key: string) => {
  //     let direction: "ascending" | "descending" = "ascending";
  //     if (sortConfig?.key === key && sortConfig.direction === "ascending") {
  //       direction = "descending";
  //     }
  //     console.log("Sorting by:", key, direction);
  //     setSortConfig({ key, direction });
  //   };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchText);
    setCurrentPage(1);
  };

  const handleUserAction = (userId: string, action: string) => {
    console.log(`Action "${action}" on user ${userId}`);
    setOpenActionId(null);

    switch (action) {
      case "ban":
        toast.success(`User ${userId} banned`);
        break;
      case "unban":
        toast.success(`User ${userId} unbanned`);
        break;
      case "activate":
        toast.success(`User ${userId} activated`);
        break;
      default:
        toast.info(`Action ${action} performed`);
    }
  };

  // Render cell content
  const renderCellContent = (user: any, column: string) => {
    switch (column) {
      case "userInfo":
        return (
          <div className="flex items-center space-x-3">
            <Image
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              width={40}
              height={40}
            />
            <div className="min-w-0 flex-1">
              <div className="font-medium text-gray-900 truncate">
                {user.name}
              </div>
              <div className="text-sm text-gray-500 truncate">{user.email}</div>
            </div>
          </div>
        );

      case "role":
        return (
          <span
            className={cn(
              "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
              user.role === "Individual"
                ? "text-background-secondary"
                : "text-primary"
            )}
          >
            {user.role}
          </span>
        );

      case "status":
        return (
          <span
            className={cn(
              "inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium",
              user.status === "Active" && "bg-green-100 text-green-800",
              user.status === "Pending" && "bg-yellow-100 text-yellow-800",
              user.status === "Banned" && "bg-red-100 text-red-800"
            )}
          >
            {user.status}
          </span>
        );

      case "verification":
        return (
          <div className="flex items-center space-x-1">
            {user.verification ? (
              <Check className="w-4 h-4 text-primary" />
            ) : (
              <X className="w-4 h-4 text-gray-400" />
            )}
            <span
              className={
                user.verification ? "text-primary" : "text-background-secondary"
              }
            >
              {user.verification ? "Verified" : "Unverified"}
            </span>
          </div>
        );

      case "actions":
        const actions = [];
        if (user.status === "Active") {
          actions.push({
            key: "ban",
            label: "Ban User",
            className: "text-red-600 hover:bg-red-50",
          });
        } else if (user.status === "Banned") {
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
        } else if (user.status === "Pending") {
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

        return (
          <div
            className="relative w-fit"
            ref={(el) => {
              actionRefs.current[user.id] = el;
            }}
          >
            <button
              onClick={() =>
                setOpenActionId(openActionId === user.id ? null : user.id)
              }
              className="p-2 hover:bg-gray-100 rounded-md transition-colors"
              aria-label="Actions"
            >
              <MoreVertical className="w-5 h-5 text-gray-500" />
            </button>

            {openActionId === user.id && (
              <div
                ref={(menuEl) => {
                  if (menuEl) {
                    const rect = menuEl.getBoundingClientRect();
                    const spaceBelow = window.innerHeight - rect.bottom;
                    const spaceAbove = rect.top;

                    // Decide direction dynamically
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
                      onClick={() => handleUserAction(user.id, action.key)}
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

          //   <div
          //     className="relative"
          //     ref={(el) => {
          //       actionRefs.current[user.id] = el;
          //     }}
          //   >
          //     <button
          //       onClick={() =>
          //         setOpenActionId(openActionId === user.id ? null : user.id)
          //       }
          //       className="p-2 hover:bg-gray-100 rounded-md transition-colors"
          //       aria-label="Actions"
          //     >
          //       <MoreVertical className="w-5 h-5 text-gray-500" />
          //     </button>

          //     {openActionId === user.id && (
          //       <div
          //         ref={(menuEl) => {
          //           if (menuEl) {
          //             const rect = menuEl.getBoundingClientRect();
          //             const spaceBelow = window.innerHeight - rect.bottom;
          //             const spaceAbove = rect.top;

          //             // decide direction dynamically
          //             if (spaceBelow < 160 && spaceAbove > spaceBelow) {
          //               menuEl.classList.add("bottom-full", "mb-2");
          //               menuEl.classList.remove("top-full", "mt-2");
          //             } else {
          //               menuEl.classList.add("top-full", "mt-2");
          //               menuEl.classList.remove("bottom-full", "mb-2");
          //             }
          //           }
          //         }}
          //         className="absolute right-0 z-50 w-44 bg-white rounded-lg shadow-lg border border-gray-200 animate-in fade-in-0 zoom-in-95"
          //       >
          //         <div className="py-1">
          //           {actions.map((action) => (
          //             <button
          //               key={action.key}
          //               onClick={() => handleUserAction(user.id, action.key)}
          //               className={cn(
          //                 "w-full px-4 py-2 text-left text-sm transition-colors",
          //                 action.className
          //               )}
          //             >
          //               {action.label}
          //             </button>
          //           ))}
          //         </div>
          //       </div>
          //     )}
          //   </div>
        );

      default:
        return <span className="text-sm text-gray-900">{user[column]}</span>;
    }
  };

  // Columns configuration
  const columns = [
    { key: "userInfo", label: "User Info", sortable: true },
    { key: "role", label: "Role", sortable: true },
    { key: "status", label: "Status", sortable: true },
    { key: "verification", label: "Verification", sortable: true },
    { key: "createdDate", label: "Date Joined", sortable: true },
    { key: "lastLogin", label: "Last Active", sortable: true },
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
            ref={inputRef} // Add ref to the input
            type="text"
            placeholder="Search users..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-1 focus:ring-primary focus:border-transparent focus:outline-none transition-all duration-200"
          />
          {searchText && (
            <RiCloseLargeLine
              onClick={() => {
                setSearchText("");
                inputRef.current?.focus(); // Focus back to input after clearing
              }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:cursor-pointer text-gray-500"
            />
          )}
        </form>

        {/* Dropdown options */}
        <div className="flex flex-wrap gap-3">
          <CustomDropdown
            options={roleOptions}
            placeholder="All Roles"
            value={roleFilter}
            onChange={setRoleFilter}
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
            options={verificationOptions}
            placeholder="Verification Status"
            value={verificationFilter}
            onChange={setVerificationFilter}
            className="min-w-[160px]"
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
                    // onClick={() => column.sortable && requestSort(column.key)}
                  >
                    <div className="flex items-center">
                      {column.label}
                      {/* {column.sortable && (
                        <span className="ml-1">
                          {sortConfig?.key === column.key
                            ? sortConfig.direction === "ascending"
                              ? "↑"
                              : "↓"
                            : "↕"}
                        </span>
                      )} */}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentData.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  {columns.map((column) => (
                    <td key={column.key} className="px-6 py-4">
                      {renderCellContent(user, column.key)}
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
