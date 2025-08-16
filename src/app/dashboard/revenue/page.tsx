/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { RevenueChart } from "@/components/revenue-chart";
import { SalesDistribution } from "@/components/sales-distribution";
import { CustomDropdown } from "@/components/ui/CustomDropdown";
import { Pagination } from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { Download, MoreVertical, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { RiCloseLargeLine } from "react-icons/ri";
import { toast } from "sonner";

// Mock data generation for revenue transactions
const generateMockTransactions = (page: number, perPage = 6) => {
  const startIndex = (page - 1) * perPage;
  const transactions = [];
  const users = ["John Smith", "Michael Chen", "Sarah Johnson", "Emma Watson"];
  const statuses = ["Active", "Pending", "Expired"];
  const types = ["Ticket Sale", "Commission", "Payout"];
  const amounts = ["$149.00", "$99.00", "$199.00", "$49.00"];

  for (let i = 0; i < perPage; i++) {
    const transactionIndex = startIndex + i + 1;
    const userIndex = transactionIndex % users.length;
    const statusIndex = transactionIndex % statuses.length;
    const typeIndex = transactionIndex % types.length;
    const amountIndex = transactionIndex % amounts.length;

    transactions.push({
      id: `TRX${String(transactionIndex).padStart(3, "0")}`,
      user: users[userIndex],
      status: statuses[statusIndex],
      amount: amounts[amountIndex],
      type: types[typeIndex],
      date: new Date(
        2025,
        transactionIndex % 12,
        (transactionIndex % 28) + 1,
        transactionIndex % 24,
        transactionIndex % 60
      ).toLocaleString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    });
  }

  return transactions;
};

// Filter options
const typeOptions = [
  { value: "all", label: "All Types" },
  { value: "ticket", label: "Ticket Sale" },
  { value: "commission", label: "Commission" },
  { value: "payout", label: "Payout" },
];

const statusOptions = [
  { value: "all", label: "All Status" },
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

export default function RevenuePage() {
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
  const totalTransactions = 203;
  const totalPages = Math.ceil(totalTransactions / 6);
  const currentData = generateMockTransactions(currentPage);

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
    toast.message("Exporting revenue report...");
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

  const handleTransactionAction = (transactionId: string, action: string) => {
    console.log(`Action "${action}" on transaction ${transactionId}`);
    setOpenActionId(null);

    switch (action) {
      case "approve":
        toast.success(`Transaction ${transactionId} approved`);
        break;
      case "cancel":
        toast.success(`Transaction ${transactionId} cancelled`);
        break;
      default:
        toast.info(`Action ${action} performed`);
    }
  };

  // Render cell content
  const renderCellContent = (transaction: any, column: string) => {
    switch (column) {
      case "transactionId":
        return (
          <span className="font-medium text-gray-900">{transaction.id}</span>
        );

      case "user":
        return (
          <span className="text-background-secondary">{transaction.user}</span>
        );

      case "status":
        return (
          <span
            className={cn(
              "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
              transaction.status === "Active" && "bg-green-100 text-green-800",
              transaction.status === "Pending" &&
                "bg-yellow-100 text-yellow-800",
              transaction.status === "Expired" && "bg-red-100 text-red-800"
            )}
          >
            {transaction.status}
          </span>
        );

      case "amount":
        return (
          <span className="text-background-secondary">
            {transaction.amount}
          </span>
        );

      case "type":
        return (
          <span className="text-background-secondary">{transaction.type}</span>
        );

      case "date":
        return (
          <span className="text-sm text-background-secondary">
            {transaction.date}
          </span>
        );

      case "actions":
        const actions = [];
        if (transaction.status === "Pending") {
          actions.push({
            key: "approve",
            label: "Approve Transaction",
            className: "text-green-600 hover:bg-green-50",
          });
        }
        actions.push({
          key: "cancel",
          label: "Cancel Transaction",
          className: "text-red-600 hover:bg-red-50",
        });

        return (
          <div
            className="relative w-fit"
            ref={(el) => {
              actionRefs.current[transaction.id] = el;
            }}
          >
            <button
              onClick={() =>
                setOpenActionId(
                  openActionId === transaction.id ? null : transaction.id
                )
              }
              className="p-2 hover:bg-gray-100 rounded-md transition-colors"
              aria-label="Actions"
            >
              <MoreVertical className="w-5 h-5 text-background-secondary" />
            </button>

            {openActionId === transaction.id && (
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
                      onClick={() =>
                        handleTransactionAction(transaction.id, action.key)
                      }
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
        return (
          <span className="text-sm text-gray-900">{transaction[column]}</span>
        );
    }
  };

  // Columns configuration
  const columns = [
    { key: "transactionId", label: "Transaction ID", sortable: true },
    { key: "user", label: "User", sortable: true },
    { key: "status", label: "Status", sortable: true },
    { key: "amount", label: "Amount", sortable: true },
    { key: "type", label: "Type", sortable: true },
    { key: "date", label: "Date & Time", sortable: true },
    { key: "actions", label: "Actions" },
  ];

  return (
    <div className="p-6 space-y-0">
      <div className="mb-8">
        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <RevenueChart />
          <SalesDistribution />
        </div>
      </div>

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
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-background-secondary/50" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search transactions..."
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
              className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:cursor-pointer text-background-secondary"
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
              {currentData.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  {columns.map((column) => (
                    <td key={column.key} className="px-6 py-4">
                      {renderCellContent(transaction, column.key)}
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
