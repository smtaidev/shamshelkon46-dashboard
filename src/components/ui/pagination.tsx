"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showingText?: string;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showingText,
  className,
}: PaginationProps) {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = totalPages > 1 ? getVisiblePages() : [1];

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 overflow-x-auto",
        className
      )}
    >
      {showingText && (
        <div className="text-sm text-gray-600 font-medium order-2 sm:order-1">
          {showingText}
        </div>
      )}

      <div className="flex items-center space-x-1 order-1 sm:order-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-lg border transition-colors duration-200 flex items-center gap-1",
            currentPage === 1
              ? "text-gray-400 bg-white border-gray-300 cursor-not-allowed"
              : "text-gray-700 bg-white border-gray-300 hover:bg-gray-50 hover:border-gray-400"
          )}
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        <div className="flex items-center space-x-1">
          {visiblePages.map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === "number" && onPageChange(page)}
              disabled={page === "..."}
              className={cn(
                "min-w-[40px] h-10 px-3 text-sm font-medium rounded-lg transition-colors duration-200 flex items-center justify-center",
                page === currentPage
                  ? "btn-gradient text-white shadow-sm"
                  : page === "..."
                  ? "text-gray-400 cursor-default"
                  : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400"
              )}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-lg border transition-colors duration-200 flex items-center gap-1",
            currentPage === totalPages
              ? "text-gray-400 bg-white border-gray-300 cursor-not-allowed"
              : "text-gray-700 bg-white border-gray-300 hover:bg-gray-50 hover:border-gray-400"
          )}
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
