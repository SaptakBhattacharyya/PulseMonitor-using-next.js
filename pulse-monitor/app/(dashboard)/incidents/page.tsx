"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Activity,
  CheckCircle2,
  Clock,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  ArrowRight,
  ShieldAlert,
  CircleDot,
  CalendarDays,
  Globe,
  ChevronDown,
  Filter,
  Zap,
} from "lucide-react";

type Incident = {
  id: string;
  title: string;
  monitor: string;
  url: string;
  severity: "Critical" | "High" | "Medium";
  status: "Ongoing" | "Resolved" | "Investigating";
  started: string;
  duration: string;
  description: string;
};

const incidents: Incident[] = [
  {
    id: "INC-001",
    title: "API Server Unresponsive",
    monitor: "PulseMonitor API",
    url: "api.pulsemonitor.dev",
    severity: "Critical",
    status: "Ongoing",
    started: "Nov 19, 2026 · 10:42 PM",
    duration: "18m 32s",
    description:
      "The API endpoint is failing to respond to health checks. Connection timeout detected across multiple attempts.",
  },
  {
    id: "INC-002",
    title: "High Response Time Detected",
    monitor: "E-Commerce Store",
    url: "shop.example.com",
    severity: "High",
    status: "Investigating",
    started: "Nov 19, 2026 · 8:15 PM",
    duration: "42m 10s",
    description:
      "Response time exceeded the configured threshold of 2 seconds for consecutive monitoring intervals.",
  },
  {
    id: "INC-003",
    title: "SSL Certificate Warning",
    monitor: "Admin Dashboard",
    url: "admin.example.com",
    severity: "Medium",
    status: "Resolved",
    started: "Nov 19, 2026 · 5:30 PM",
    duration: "12m 45s",
    description:
      "An SSL certificate verification warning was detected. The monitor recovered after subsequent successful checks.",
  },
  {
    id: "INC-004",
    title: "Connection Timeout",
    monitor: "Authentication API",
    url: "auth.example.com",
    severity: "High",
    status: "Resolved",
    started: "Nov 18, 2026 · 11:24 AM",
    duration: "8m 21s",
    description:
      "The authentication endpoint exceeded its timeout limit and temporarily stopped responding.",
  },
  {
    id: "INC-005",
    title: "Database Latency Spike",
    monitor: "Portfolio Website",
    url: "saptak.dev",
    severity: "Medium",
    status: "Resolved",
    started: "Nov 17, 2026 · 3:10 PM",
    duration: "24m 06s",
    description:
      "Elevated response latency was detected during the monitoring period. Service returned to normal.",
  },
  {
    id: "INC-006",
    title: "Server Unavailable",
    monitor: "Documentation Portal",
    url: "docs.example.com",
    severity: "Critical",
    status: "Resolved",
    started: "Nov 16, 2026 · 9:52 AM",
    duration: "31m 18s",
    description:
      "The server returned repeated 503 errors. The incident was marked resolved after successful health checks.",
  },
];

const severityStyles = {
  Critical: "bg-red-50 text-red-700 border-red-200",
  High: "bg-orange-50 text-orange-700 border-orange-200",
  Medium: "bg-amber-50 text-amber-700 border-amber-200",
};

const statusStyles = {
  Ongoing: "bg-red-50 text-red-700",
  Investigating: "bg-amber-50 text-amber-700",
  Resolved: "bg-emerald-50 text-emerald-700",
};

export default function IncidentsPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Incidents");

  const filteredIncidents = useMemo(() => {
    return incidents.filter((incident) => {
      const matchesSearch =
        incident.title.toLowerCase().includes(search.toLowerCase()) ||
        incident.monitor.toLowerCase().includes(search.toLowerCase()) ||
        incident.url.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        activeFilter === "All Incidents" ||
        (activeFilter === "Ongoing" && incident.status !== "Resolved") ||
        (activeFilter === "Resolved" && incident.status === "Resolved");

      return matchesSearch && matchesFilter;
    });
  }, [search, activeFilter]);

  const ongoingCount = incidents.filter(
    (incident) => incident.status !== "Resolved"
  ).length;

  const resolvedCount = incidents.filter(
    (incident) => incident.status === "Resolved"
  ).length;

  return (
    <div className="min-h-screen bg-[#f8f7f2] px-8 py-8 lg:px-12">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-[#858b7e]">
            <ShieldAlert size={14} />
            Reliability Center
          </div>

          <h1 className="font-serif text-4xl tracking-tight text-[#243c32]">
            Incident Management
          </h1>

          <p className="mt-2 text-sm text-[#858b7e]">
            Track disruptions, investigate issues, and monitor service recovery.
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-[#e8e6dd] bg-white px-4 py-3 shadow-sm">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#edf3ed] text-[#456b54]">
            <Activity size={18} />
          </div>
          <div>
            <p className="text-xs text-[#969b92]">Incident monitoring</p>
            <p className="text-sm font-semibold text-[#365443]">
              Live overview
            </p>
          </div>
          <span className="ml-2 h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
        </div>
      </div>

      {/* Statistics */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Incidents"
          value={incidents.length.toString().padStart(2, "0")}
          subtitle="Recorded incidents"
          icon={<AlertTriangle size={18} />}
          iconBg="bg-[#f4eee1]"
          iconColor="text-[#a18149]"
        />

        <StatCard
          title="Active Incidents"
          value={ongoingCount.toString().padStart(2, "0")}
          subtitle="Requires attention"
          icon={<Zap size={18} />}
          iconBg="bg-[#f9e9e5]"
          iconColor="text-[#c66a52]"
        />

        <StatCard
          title="Resolved"
          value={resolvedCount.toString().padStart(2, "0")}
          subtitle="Successfully recovered"
          icon={<CheckCircle2 size={18} />}
          iconBg="bg-[#e8f1e8]"
          iconColor="text-[#527c5e]"
        />

        <StatCard
          title="Avg. Resolution"
          value="19m"
          subtitle="Across all incidents"
          icon={<Clock size={18} />}
          iconBg="bg-[#e9edf1]"
          iconColor="text-[#617b91]"
        />
      </div>

      {/* Active Incident Alert */}
      {ongoingCount > 0 && (
        <div className="mb-8 overflow-hidden rounded-2xl border border-[#ead2c9] bg-[#fff8f5]">
          <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f6e4dd] text-[#bc624d]">
                <AlertTriangle size={20} />
              </div>

              <div>
                <p className="font-semibold text-[#8c4538]">
                  {ongoingCount} active incidents need attention
                </p>
                <p className="mt-1 text-sm text-[#9c756b]">
                  Some services may be experiencing disruptions or degraded
                  performance.
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveFilter("Ongoing")}
              className="flex items-center gap-2 self-start rounded-lg bg-[#8e4c3e] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#753d32] sm:self-center"
            >
              View active incidents
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      )}

      {/* Timeline Header */}
      <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-serif text-2xl text-[#30483a]">
            Incident Timeline
          </h2>
          <p className="mt-1 text-sm text-[#92978d]">
            Historical events and service disruptions
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-[#e6e4dc] bg-white px-3 py-2 text-sm text-[#72796f]">
          <CalendarDays size={15} />
          <span>Last 30 days</span>
          <ChevronDown size={14} />
        </div>
      </div>

      {/* Filters */}
      <div className="mb-5 flex flex-col gap-3 rounded-xl border border-[#e8e6dd] bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {["All Incidents", "Ongoing", "Resolved"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-lg px-4 py-2 text-sm transition ${
                activeFilter === filter
                  ? "bg-[#365443] text-white shadow-sm"
                  : "bg-[#f7f7f3] text-[#72796f] hover:bg-[#eeeee8]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9da198]"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search incidents..."
            className="w-full rounded-lg border border-[#e8e6dd] bg-[#fafaf7] py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-[#809581]"
          />
        </div>
      </div>

      {/* Incident List */}
      <div className="overflow-hidden rounded-2xl border border-[#e8e6dd] bg-white">
        <div className="hidden grid-cols-[1.7fr_1fr_0.8fr_0.8fr] border-b border-[#eeece5] bg-[#fafaf7] px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#92978d] lg:grid">
          <span>Incident details</span>
          <span>Severity / Status</span>
          <span>Duration</span>
          <span>Timeline</span>
        </div>

        {filteredIncidents.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#f1f3ed] text-[#7c8b78]">
              <Search size={22} />
            </div>
            <h3 className="font-serif text-xl text-[#344a3b]">
              No incidents found
            </h3>
            <p className="mt-2 text-sm text-[#92978d]">
              Try changing your search or filter.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#eeece5]">
            {filteredIncidents.map((incident) => (
              <IncidentRow key={incident.id} incident={incident} />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-5 flex flex-col justify-between gap-2 text-xs text-[#9a9e95] sm:flex-row sm:items-center">
        <p>
          Showing {filteredIncidents.length} of {incidents.length} incidents
        </p>

        <div className="flex items-center gap-2">
          <CircleDot size={13} className="text-[#79927b]" />
          Incident records are currently demo data.
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  subtitle,
  icon,
  iconBg,
  iconColor,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
}) {
  return (
    <div className="rounded-2xl border border-[#e8e6dd] bg-white p-5 shadow-[0_2px_10px_rgba(35,55,40,0.025)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[#858b7e]">{title}</p>
          <h3 className="mt-3 font-serif text-3xl text-[#30483a]">{value}</h3>
        </div>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}
        >
          {icon}
        </div>
      </div>

      <p className="mt-3 text-xs text-[#999e94]">{subtitle}</p>
    </div>
  );
}

function IncidentRow({ incident }: { incident: Incident }) {
  const isResolved = incident.status === "Resolved";

  return (
    <div className="grid gap-5 px-5 py-5 transition hover:bg-[#fcfcf9] sm:px-6 lg:grid-cols-[1.7fr_1fr_0.8fr_0.8fr] lg:items-center">
      {/* Incident Details */}
      <div className="flex items-start gap-4">
        <div
          className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
            isResolved
              ? "bg-[#eaf2e9] text-[#608268]"
              : "bg-[#f8e9e3] text-[#bf6c54]"
          }`}
        >
          {isResolved ? (
            <CheckCircle2 size={18} />
          ) : (
            <AlertTriangle size={18} />
          )}
        </div>

        <div className="min-w-0">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-medium tracking-wide text-[#a0a399]">
              {incident.id}
            </span>
          </div>

          <h3 className="font-semibold text-[#364b3d]">{incident.title}</h3>

          <p className="mt-1 text-sm text-[#858b80]">
            {incident.description}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-[#8f958a]">
            <Globe size={13} />
            <span>{incident.monitor}</span>
            <span className="text-[#d0d2ca]">·</span>
            <span>{incident.url}</span>
          </div>

          <div className="mt-2 flex items-center gap-1.5 text-xs text-[#969b92] lg:hidden">
            <Clock size={13} />
            {incident.started}
          </div>
        </div>
      </div>

      {/* Severity / Status */}
      <div className="flex flex-wrap items-center gap-2 lg:flex-col lg:items-start">
        <span
          className={`rounded-md border px-2.5 py-1 text-xs font-medium ${severityStyles[incident.severity]}`}
        >
          {incident.severity}
        </span>

        <span
          className={`rounded-md px-2.5 py-1 text-xs font-medium ${statusStyles[incident.status]}`}
        >
          {incident.status}
        </span>
      </div>

      {/* Duration */}
      <div>
        <p className="text-xs text-[#969b92] lg:hidden">Duration</p>
        <p className="mt-1 font-medium text-[#465b4b] lg:mt-0">
          {incident.duration}
        </p>
      </div>

      {/* Timeline */}
      <div>
        <p className="text-xs text-[#969b92] lg:hidden">Started</p>
        <div className="mt-1 flex items-center gap-2 text-sm text-[#777f74] lg:mt-0">
          <CalendarDays size={14} className="shrink-0" />
          <span>{incident.started}</span>
        </div>
      </div>
    </div>
  );
}
