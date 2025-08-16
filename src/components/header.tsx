"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/lib/store";
import { toggleSidebar } from "@/lib/uiSlice";
import { Bell, ChevronDown, Menu, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { RiCloseLargeLine } from "react-icons/ri";
import { toast } from "sonner";
export function Header() {
  const pathname = usePathname();
  //   console.log("route pathname", pathname);
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = useState("");
  //   const { isMobile } = useAppSelector((state) => state.ui);
  //   const isMobile = window.innerWidth < 1280;
  const totalUsers = 134872;
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null); // ref for search anything input field

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
    console.log(`Dropdown is now: ${isOpen ? "Closed" : "Open"}`);
  };
  // Extract the main route segment (e.g., 'users' from '/dashboard/users')
  const routeSegment = pathname.split("/").filter(Boolean).pop() || "dashboard";
  //   console.log("routeSegment", routeSegment);

  //   Perform logout functionality - (This is a simulation logout - replace with the actual function)

  const handleLogout = () => {
    toast.promise(
      new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          // Simulate a 90% chance of successful logout
          const isSuccess = Math.random() > 0.1;

          if (isSuccess) {
            resolve();
          } else {
            reject(new Error("Network error"));
          }
        }, 1000);
      }),
      {
        loading: "Logging out...",
        success: "You have been logged out 👋",
        error: (err) => `Logout failed: ${err.message}`,
      }
    );
  };

  return (
    <header className="bg-white px-4 sm:px-6 py-3 sm:py-9">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          {/* {isMobile && ( */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => dispatch(toggleSidebar())}
            className="lg:hidden shrink-0"
          >
            <Menu className="w-5 h-5" />
          </Button>
          {/* )} */}

          <div className="relative w-full max-w-2xl">
            <div className="relative w-full max-w-2xl">
              {routeSegment.includes("users") ? (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h1 className="md:text-2xl font-bold text-gray-900">
                      User Management
                    </h1>
                    <p className="text-sm text-gray-600 mt-1">
                      Total {totalUsers.toLocaleString()} Users
                    </p>
                  </div>
                </div>
              ) : routeSegment.includes("events") ? (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h1 className="md:text-2xl font-bold text-gray-900">
                      Event Management
                    </h1>
                    <p className="text-sm text-gray-600 mt-1">
                      Manage and monitor all events on the platform
                    </p>
                  </div>
                </div>
              ) : routeSegment.includes("reports") ? (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h1 className="md:text-2xl font-bold text-gray-900">
                      Reports & Moderation
                    </h1>
                    <p className="text-sm text-gray-600 mt-1">
                      Manage and monitor all reports of the platform
                    </p>
                  </div>
                </div>
              ) : routeSegment.includes("revenue") ? (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h1 className="md:text-2xl font-bold text-gray-900">
                      Revenue Management
                    </h1>
                    <p className="text-sm text-gray-600 mt-1">
                      See the revenue performance of EventX
                    </p>
                  </div>
                </div>
              ) : routeSegment.includes("settings") ? (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h1 className="md:text-2xl font-bold text-gray-900">
                      Settings
                    </h1>
                    <p className="text-sm text-gray-600 mt-1">
                      Manage all settings of the platform
                    </p>
                  </div>
                </div>
              ) : routeSegment.includes("profile") ? (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h1 className="md:text-2xl font-bold text-gray-900">
                      Admin Profile
                    </h1>
                    <p className="text-sm text-gray-600 mt-1">
                      Manage profile details
                    </p>
                  </div>
                </div>
              ) : routeSegment.includes("dashboard") ? (
                <>
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-background-secondary w-6 h-6" />
                  <Input
                    ref={inputRef}
                    placeholder="Search anything..."
                    onChange={(e) => setSearchText(e.target.value)}
                    value={searchText}
                    className="pl-12 py-6 bg-gray-50 border border-background-secondary/10 w-full placeholder:text-base focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-200"
                  />
                  {searchText && (
                    <RiCloseLargeLine
                      onClick={() => {
                        setSearchText("");
                        inputRef.current?.focus();
                      }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:cursor-pointer text-gray-500 hover:text-gray-700"
                    />
                  )}
                </>
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <Button variant="ghost" size="sm" className="relative p-2">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-0 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              8
            </span>
          </Button>

          <DropdownMenu open={isOpen} onOpenChange={handleDropdownToggle}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 p-1 sm:p-2 border-none outline-none"
              >
                <Avatar className="w-8 h-8 sm:w-8 sm:h-8">
                  <AvatarImage src="/avatarMe.jpg" />
                  <AvatarFallback>AR</AvatarFallback>
                </Avatar>
                <div className="text-left hidden sm:block">
                  <div className="text-sm font-medium">Abu Rayhan</div>
                  <div className="text-xs text-gray-500">Admin</div>
                </div>
                <ChevronDown
                  className={`-mt-4 h-4 w-4 opacity-50 hidden sm:block transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="bg-white p-1 w-48">
              <Link href={"/dashboard/profile"}>
                <DropdownMenuItem className="hover:bg-gray-100 hover:cursor-pointer px-3 py-2 text-sm">
                  Profile
                </DropdownMenuItem>
              </Link>
              <Link href={"/dashboard/settings"}>
                <DropdownMenuItem className="hover:bg-gray-100 hover:cursor-pointer px-3 py-2 text-sm">
                  Settings
                </DropdownMenuItem>
              </Link>
              <div onClick={handleLogout}>
                <DropdownMenuItem className="hover:bg-gray-100 hover:cursor-pointer px-3 py-2 text-sm text-red-600">
                  Sign out
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
