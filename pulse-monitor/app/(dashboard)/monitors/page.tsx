"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Plus,
  Globe,
  CheckCircle2,
  AlertCircle,
  Clock,
  PauseCircle,
  MoreHorizontal,
  ExternalLink,
  ArrowUpDown,
  SlidersHorizontal,
} from "lucide-react";

import { monitors } from "@/lib/monitor-data";

export default function MonitorsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedMonitor, setSelectedMonitor] = useState<string | null>(null);

  const filteredMonitors = useMemo(() => {
    return monitors.filter((monitor) => {
      const matchesSearch =
        monitor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        monitor.url.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || monitor.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  const totalMonitors = monitors.length;
  const operational = monitors.filter(
    (monitor) => monitor.status === "Operational"
  ).length;
  const down = monitors.filter((monitor) => monitor.status === "Down").length;
  const pending = monitors.filter(
    (monitor) => monitor.status === "Pending"
  ).length;

  return (
    <div className="min-h-screen bg-[#faf8f2] text-[#294638]">

      {/* Page Container */}
      <div className="px-8 py-9 lg:px-10">

        {/* Header */}
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-[#8c978b]">
              <Activity size={14} />
              Monitoring Center
            </div>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#294638]">
              Monitors
            </h1>

            <p className="mt-2 text-sm text-[#899187]">
              Keep track of every website and API you monitor.
            </p>
          </div>

          <button
            className="flex items-center justify-center gap-2 rounded-xl bg-[#294b3b] px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-[#1e3b2e]"
          >
            <Plus size={17} />
            Add Monitor
          </button>
        </div>

        {/* Stats */}
        <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          {/* Total */}
          <StatCard
            title="Total Monitors"
            value={totalMonitors}
            subtitle="All tracked endpoints"
            icon={<Globe size={18} />}
            iconBg="bg-[#e9eee8]"
            iconColor="text-[#55765d]"
          />

          {/* Operational */}
          <StatCard
            title="Operational"
            value={operational}
            subtitle="Running normally"
            icon={<CheckCircle2 size={18} />}
            iconBg="bg-[#e5f2e8]"
            iconColor="text-[#43845b]"
            trend="Healthy"
          />

          {/* Down */}
          <StatCard
            title="Down"
            value={down}
            subtitle="Need attention"
            icon={<AlertCircle size={18} />}
            iconBg="bg-[#f8e8e4]"
            iconColor="text-[#c56858]"
            trend={down > 0 ? "Action required" : "All clear"}
          />

          {/* Pending */}
          <StatCard
            title="Pending"
            value={pending}
            subtitle="Awaiting first check"
            icon={<Clock size={18} />}
            iconBg="bg-[#f3eee0]"
            iconColor="text-[#ad9254]"
          />
        </div>

        {/* Monitor Section */}
        <div className="mt-9 overflow-hidden rounded-2xl border border-[#e9e5dc] bg-white shadow-[0_4px_20px_rgba(48,67,50,0.03)]">

          {/* Toolbar */}
          <div className="flex flex-col justify-between gap-4 border-b border-[#eeeae2] p-5 lg:flex-row lg:items-center">

            <div>
              <h2 className="text-lg font-semibold text-[#30483a]">
                All Monitors
              </h2>

              <p className="mt-1 text-sm text-[#92988f]">
                {filteredMonitors.length} monitors found
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">

              {/* Search */}
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ba197]"
                />

                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search monitors..."
                  className="w-full rounded-xl border border-[#e7e5dd] bg-[#fcfbf8] py-2.5 pl-9 pr-4 text-sm outline-none transition focus:border-[#6e8a76] sm:w-64"
                />
              </div>

              {/* Status Filter */}
              <div className="relative">
                <SlidersHorizontal
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8d988d]"
                />

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-[#e7e5dd] bg-[#fcfbf8] py-2.5 pl-9 pr-4 text-sm outline-none focus:border-[#6e8a76] sm:w-40"
                >
                  <option value="All">All Status</option>
                  <option value="Operational">Operational</option>
                  <option value="Down">Down</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>
          </div>

          {/* Monitor List */}
          <div className="divide-y divide-[#f0ede7]">

            {filteredMonitors.map((monitor) => {
              const isOperational = monitor.status === "Operational";
              const isDown = monitor.status === "Down";
              const isPending = monitor.status === "Pending";

              return (
                <div
                  key={monitor.id}
                  className="group px-5 py-5 transition hover:bg-[#fcfbf8] sm:px-6"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                    {/* Left Section */}
                    <div className="flex min-w-0 items-start gap-4">

                      {/* Icon */}
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                          isOperational
                            ? "bg-[#e9f2e9] text-[#4f7859]"
                            : isDown
                              ? "bg-[#f8e9e5] text-[#c46859]"
                              : "bg-[#f3efe2] text-[#a78c4d]"
                        }`}
                      >
                        <Globe size={20} />
                      </div>

                      {/* Name + URL */}
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="truncate font-semibold text-[#30483a]">
                            {monitor.name}
                          </h3>

                          <StatusBadge status={monitor.status} />
                        </div>

                        <a
                          href={monitor.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 flex max-w-full items-center gap-1 truncate text-sm text-[#92998f] transition hover:text-[#54745d]"
                        >
                          <span className="truncate">{monitor.url}</span>
                          <ExternalLink size={12} className="shrink-0" />
                        </a>

                        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-[#a0a49c]">
                          <span>{monitor.method}</span>

                          <span className="h-1 w-1 rounded-full bg-[#d4d5cd]" />

                          <span>Every {monitor.interval} min</span>

                          <span className="h-1 w-1 rounded-full bg-[#d4d5cd]" />

                          <span>Timeout {monitor.timeout}s</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex flex-wrap items-center gap-5 pl-16 lg:pl-0">

                      {/* Uptime */}
                      <div className="min-w-[90px]">
                        <p className="text-[11px] uppercase tracking-wider text-[#a1a59d]">
                          Uptime
                        </p>

                        <p className="mt-1 text-sm font-semibold text-[#45644e]">
                          {monitor.uptime}
                        </p>
                      </div>

                      {/* Response */}
                      <div className="min-w-[90px]">
                        <p className="text-[11px] uppercase tracking-wider text-[#a1a59d]">
                          Response
                        </p>

                        <p className="mt-1 text-sm font-semibold text-[#45644e]">
                          {monitor.response}
                        </p>
                      </div>

                      {/* Last Checked */}
                      <div className="min-w-[100px]">
                        <p className="text-[11px] uppercase tracking-wider text-[#a1a59d]">
                          Last Checked
                        </p>

                        <p className="mt-1 text-sm text-[#7f8a80]">
                          {monitor.checked}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="relative">
                        <button
                          onClick={() =>
                            setSelectedMonitor(
                              selectedMonitor === monitor.id
                                ? null
                                : monitor.id
                            )
                          }
                          className="rounded-lg p-2 text-[#829084] transition hover:bg-[#f0f2ed]"
                        >
                          <MoreHorizontal size={19} />
                        </button>

                        {selectedMonitor === monitor.id && (
                          <div className="absolute right-0 top-10 z-20 w-40 rounded-xl border border-[#e9e5dd] bg-white p-1 shadow-lg">
                            <button className="w-full rounded-lg px-3 py-2 text-left text-sm text-[#526355] hover:bg-[#f5f5f0]">
                              View Details
                            </button>

                            <button className="w-full rounded-lg px-3 py-2 text-left text-sm text-[#526355] hover:bg-[#f5f5f0]">
                              Edit Monitor
                            </button>

                            <button className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50">
                              Delete Monitor
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Availability Bar */}
                  <div className="mt-5">
                    <div className="flex h-2 gap-[3px] overflow-hidden rounded-full">
                      {Array.from({ length: 30 }).map((_, index) => (
                        <div
                          key={index}
                          className={`flex-1 rounded-sm ${
                            isDown && index > 24
                              ? "bg-[#e5a69b]"
                              : isPending
                                ? "bg-[#e6d8ae]"
                                : "bg-[#9dc4a4]"
                          }`}
                        />
                      ))}
                    </div>

                    <div className="mt-2 flex justify-between text-[10px] text-[#a1a59d]">
                      <span>30 checks ago</span>
                      <span>Now</span>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Empty State */}
            {filteredMonitors.length === 0 && (
              <div className="px-6 py-16 text-center">
                <Globe
                  size={30}
                  className="mx-auto text-[#9ba397]"
                />

                <h3 className="mt-4 font-medium text-[#405545]">
                  No monitors found
                </h3>

                <p className="mt-1 text-sm text-[#999f95]">
                  Try changing your search or filter.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-[#eeeae2] px-6 py-4">
            <p className="text-xs text-[#a0a49b]">
              Showing {filteredMonitors.length} of {totalMonitors} monitors
            </p>

            <button className="text-sm font-medium text-[#52745c] hover:text-[#294b3b]">
              View Analytics →
            </button>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-5 flex items-start gap-3 rounded-xl border border-[#e8e5dc] bg-[#f4f2eb] p-4">
          <Activity size={17} className="mt-0.5 text-[#718675]" />

          <p className="text-sm leading-6 text-[#7e897e]">
            Monitoring data is updated automatically as your endpoints are checked.
            Performance history and uptime trends are available in Analytics.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------- Stat Card ---------- */

function StatCard({
  title,
  value,
  subtitle,
  icon,
  iconBg,
  iconColor,
  trend,
}: {
  title: string;
  value: number;
  subtitle: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  trend?: string;
}) {
  return (
    <div className="rounded-2xl border border-[#e9e5dc] bg-white p-5 shadow-[0_4px_20px_rgba(48,67,50,0.03)] transition hover:-translate-y-0.5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[#899188]">{title}</p>

          <h3 className="mt-3 text-3xl font-semibold tracking-tight text-[#30483a]">
            {value}
          </h3>

          <p className="mt-1 text-xs text-[#a0a49c]">{subtitle}</p>
        </div>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}
        >
          {icon}
        </div>
      </div>

      {trend && (
        <div className="mt-4 flex items-center gap-1 text-xs text-[#7d897e]">
          <ArrowUpRight size={13} />
          {trend}
        </div>
      )}
    </div>
  );
}

/* ---------- Status Badge ---------- */

function StatusBadge({ status }: { status: string }) {
  const styles =
    status === "Operational"
      ? "bg-[#e8f3e9] text-[#4b8057]"
      : status === "Down"
          ? "bg-[#f8e8e5] text-[#c46556]"
          : "bg-[#f3efe1] text-[#a28b4d]";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium ${styles}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

