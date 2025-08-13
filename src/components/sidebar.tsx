"use client";

import { useAppDispatch, useAppSelector } from "@/lib/store";
import { closeSidebar } from "@/lib/uiSlice";
import { cn } from "@/lib/utils";
import {
  Calendar,
  DollarSign,
  FileText,
  LayoutDashboard,
  LogOut,
  Settings,
  User,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Users", href: "/dashboard/users", icon: Users },
  { name: "Events", href: "/dashboard/events", icon: Calendar },
  { name: "Reports", href: "/dashboard/reports", icon: FileText },
  { name: "Revenue", href: "/dashboard/revenue", icon: DollarSign },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
  { name: "Profile", href: "/dashboard/profile", icon: User },
];

export function Sidebar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { sidebarOpen, isMobile } = useAppSelector((state) => state.ui);

  const handleLinkClick = () => {
    if (isMobile) {
      dispatch(closeSidebar());
    }
  };

  return (
    <>
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          isMobile ? (sidebarOpen ? "translate-x-0" : "-translate-x-full") : ""
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-2 p-6 border-b">
            <Image src={"/logo.png"} width={300} height={300} alt="EventX" />
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={handleLinkClick}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-purple-100 text-purple-700"
                      : "text-background-secondary hover:bg-gray-100 hover:text-gray-900"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Sign Out */}
          <div className="p-4 border-t">
            <button className="flex items-center gap-3 px-3 py-2 w-full text-left text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
