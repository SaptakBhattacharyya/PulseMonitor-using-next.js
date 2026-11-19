"use client";

import { useState } from "react";
import {Search,Bell,ChevronDown,Settings,User,LogOut,CalendarDays,} from "lucide-react";

type TopbarProps = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
};

export default function Topbar({
  searchQuery,
  setSearchQuery,
}: TopbarProps) {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="flex h-[76px] items-center justify-between border-b border-[#e8e5dc] bg-[#faf8f2]/90 px-8 backdrop-blur-md">

      {/* Search */}

      <div className="relative w-full max-w-md">
        <Search
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search monitors..."
          className="h-11 w-full rounded-xl border border-[#e8e5dc] bg-white/80 pl-10 pr-14 text-sm outline-none transition focus:border-[#397b61] focus:ring-2 focus:ring-[#397b61]/10"
        />

        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-[#e8e5dc] bg-[#faf8f2] px-1.5 py-0.5 text-[10px] text-slate-400">
          Ctrl K
        </kbd>
      </div>

      {/* Right Section */}

      <div className="ml-6 flex shrink-0 items-center gap-4">

        {/* Date */}

        <div className="hidden items-center gap-2 text-sm text-slate-500 lg:flex">
          <CalendarDays size={17} />

          {new Date().toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </div>

        {/* Notifications */}

        <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[#e8e5dc] bg-white transition hover:bg-[#f1f4ed]">
          <Bell size={19} className="text-[#163d32]" />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-[#d5a65d]" />
        </button>

        {/* Profile */}

        <div className="relative">

          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 rounded-xl px-2 py-1.5 transition hover:bg-white"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#163d32] text-sm font-semibold text-white">
              S
            </div>

            <div className="hidden text-left sm:block">
              <p className="text-sm font-semibold text-[#163d32]">
                Saptak
              </p>

              <p className="text-xs text-slate-500">
                Administrator
              </p>
            </div>

            <ChevronDown size={16} className="text-slate-400" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-14 z-50 w-56 overflow-hidden rounded-xl border border-[#e8e5dc] bg-white shadow-xl">

              <div className="border-b border-[#efeee8] px-4 py-3">
                <p className="text-sm font-semibold text-[#163d32]">
                  Saptak Bhattacharyya
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  saptak@example.com
                </p>
              </div>

              <div className="p-2">
                <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-600 transition hover:bg-[#f6f7f3]">
                  <User size={17} />
                  My Profile
                </button>

                <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-600 transition hover:bg-[#f6f7f3]">
                  <Settings size={17} />
                  Settings
                </button>

                <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-600 transition hover:bg-red-50">
                  <LogOut size={17} />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}