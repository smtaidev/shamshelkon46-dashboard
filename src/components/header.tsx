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
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { toggleSidebar } from "@/lib/uiSlice";
import { Bell, Menu, Search } from "lucide-react";

export function Header() {
  const dispatch = useAppDispatch();
  const { isMobile } = useAppSelector((state) => state.ui);

  return (
    <header className="bg-white px-4 sm:px-6 py-3 sm:py-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          {isMobile && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => dispatch(toggleSidebar())}
              className="lg:hidden shrink-0"
            >
              <Menu className="w-5 h-5" />
            </Button>
          )}

          <div className="relative w-full max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search anything..."
              className="pl-10 bg-gray-50 border-gray-200 w-full"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <Button variant="ghost" size="sm" className="relative p-2">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              1
            </span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 p-1 sm:p-2"
              >
                <Avatar className="w-7 h-7 sm:w-8 sm:h-8">
                  <AvatarImage src="/avatarMe.jpg" />
                  <AvatarFallback>RA</AvatarFallback>
                </Avatar>
                <div className="text-left hidden sm:block">
                  <div className="text-sm font-medium">Abu Rayhan</div>
                  <div className="text-xs text-gray-500">Admin</div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white p-1 w-48">
              <DropdownMenuItem className="hover:bg-gray-100 hover:cursor-pointer px-3 py-2 text-sm">
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-gray-100 hover:cursor-pointer px-3 py-2 text-sm">
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-gray-100 hover:cursor-pointer px-3 py-2 text-sm text-red-600">
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
