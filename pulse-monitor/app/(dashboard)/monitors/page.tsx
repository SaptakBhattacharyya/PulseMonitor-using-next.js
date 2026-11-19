"use client";

import { useState } from "react";
import {
  Activity,
  Search,
  Plus,
  Globe,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Trash2,
  Pencil,
  ExternalLink,
  RefreshCw,
} from "lucide-react";

import { useMonitors } from "@/context/MonitorContext";
import type { Monitor } from "@/lib/monitor-data";
import AddMonitorModal from "@/components/dashboard/add-monitor-modal";

export default function MonitorsPage() {
  const { monitors, addMonitor, updateMonitor, deleteMonitor } =
    useMonitors();

  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMonitor, setEditingMonitor] = useState<Monitor | null>(null);

  // Open modal for adding monitor
  const handleAddClick = () => {
    setEditingMonitor(null);
    setModalOpen(true);
  };

  // Open modal for editing monitor
  const handleEdit = (monitor: Monitor) => {
    setEditingMonitor(monitor);
    setModalOpen(true);
  };

  // Save monitor (add or edit)
  const handleSave = (monitor: Monitor) => {
    const exists = monitors.some((item) => item.id === monitor.id);

    if (exists) {
      updateMonitor(monitor);
    } else {
      addMonitor(monitor);
    }

    setModalOpen(false);
    setEditingMonitor(null);
  };

  // Delete monitor
  const handleDelete = (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this monitor?"
    );

    if (confirmed) {
      deleteMonitor(id);
    }
  };

  // Search
  const filteredMonitors = monitors.filter((monitor) => {
    const matchesSearch =
      monitor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      monitor.url.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      filter === "All" || monitor.status === filter;

    return matchesSearch && matchesFilter;
  });

  // Statistics
  const total = monitors.length;
  const operational = monitors.filter(
    (monitor) => monitor.status === "Operational"
  ).length;
  const down = monitors.filter(
    (monitor) => monitor.status === "Down"
  ).length;
  const pending = monitors.filter(
    (monitor) => monitor.status === "Pending"
  ).length;

  return (
    <div className="min-h-screen bg-[#f5f5ef] px-8 py-8 text-[#24372d] lg:px-10">
      {/* Header */}
      <div className="mb-9 flex flex-col justify-between gap-5 md:flex-row md:items-center">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#8b968b]">
            System Management
          </p>

          <h1 className="text-4xl font-semibold tracking-tight">
            Monitoring Center
          </h1>

          <p className="mt-2 text-sm text-[#899188]">
            Manage, monitor and maintain all your endpoints.
          </p>
        </div>

        <button
          onClick={handleAddClick}
          className="flex items-center gap-2 rounded-xl bg-[#244d3b] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#183b2c]"
        >
          <Plus size={17} />
          Add Monitor
        </button>
      </div>

      {/* Statistics */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Total Monitors",
            value: total,
            icon: Activity,
            color: "#527563",
          },
          {
            label: "Operational",
            value: operational,
            icon: CheckCircle2,
            color: "#4b9872",
          },
          {
            label: "Down",
            value: down,
            icon: XCircle,
            color: "#c76c64",
          },
          {
            label: "Pending",
            value: pending,
            icon: Clock,
            color: "#c19b55",
          },
        ].map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-[#e5e6dd] bg-white p-5 shadow-sm"
            >
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-[#92998f]">{stat.label}</p>

                <div
                  className="rounded-xl p-2"
                  style={{
                    backgroundColor: `${stat.color}15`,
                    color: stat.color,
                  }}
                >
                  <Icon size={18} />
                </div>
              </div>

              <h2 className="text-3xl font-semibold">{stat.value}</h2>
            </div>
          );
        })}
      </div>

      {/* Monitor list */}
      <div className="overflow-hidden rounded-2xl border border-[#e5e6dd] bg-white shadow-sm">
        {/* Search & Filters */}
        <div className="flex flex-col justify-between gap-4 border-b border-[#ecece5] p-5 md:flex-row md:items-center">
          <div className="relative w-full md:max-w-sm">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9aa198]"
            />

            <input
              type="text"
              placeholder="Search monitors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-[#e7e8e0] bg-[#fafaf7] py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#64836f]"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {["All", "Operational", "Down", "Pending"].map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`rounded-lg px-4 py-2 text-xs font-medium transition ${
                  filter === item
                    ? "bg-[#244d3b] text-white"
                    : "bg-[#f3f4ef] text-[#778177] hover:bg-[#e9ebe5]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left">
            <thead className="bg-[#fafaf7]">
              <tr className="text-xs uppercase tracking-wider text-[#929a91]">
                <th className="px-6 py-4 font-medium">Monitor</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Uptime</th>
                <th className="px-6 py-4 font-medium">Response</th>
                <th className="px-6 py-4 font-medium">Interval</th>
                <th className="px-6 py-4 text-right font-medium">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#efefe9]">
              {filteredMonitors.map((monitor) => (
                <tr
                  key={monitor.id}
                  className="transition hover:bg-[#fafaf7]"
                >
                  {/* Monitor information */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf2ed] text-[#527563]">
                        <Globe size={18} />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-[#304438]">
                          {monitor.name}
                        </p>

                        <a
                          href={monitor.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 flex items-center gap-1 text-xs text-[#9aa198] hover:text-[#527563]"
                        >
                          {monitor.url}
                          <ExternalLink size={11} />
                        </a>
                      </div>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium ${
                        monitor.status === "Operational"
                          ? "bg-[#eaf4ed] text-[#4e8c69]"
                          : monitor.status === "Down"
                          ? "bg-[#faeae7] text-[#bf6258]"
                          : "bg-[#f7f0df] text-[#b38a43]"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          monitor.status === "Operational"
                            ? "bg-[#5b9c72]"
                            : monitor.status === "Down"
                            ? "bg-[#cf6d63]"
                            : "bg-[#c7a15c]"
                        }`}
                      />
                      {monitor.status}
                    </span>
                  </td>

                  {/* Uptime */}
                  <td className="px-6 py-5">
                    <span className="text-sm font-medium text-[#526458]">
                      {monitor.uptime}
                    </span>
                  </td>

                  {/* Response */}
                  <td className="px-6 py-5">
                    <span className="text-sm text-[#526458]">
                      {monitor.response}
                    </span>
                  </td>

                  {/* Interval */}
                  <td className="px-6 py-5">
                    <span className="text-sm text-[#526458]">
                      {monitor.interval} min
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-5">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEdit(monitor)}
                        title="Edit monitor"
                        className="rounded-lg p-2 text-[#829084] transition hover:bg-[#edf2ed] hover:text-[#426b52]"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() => handleDelete(monitor.id)}
                        title="Delete monitor"
                        className="rounded-lg p-2 text-[#b6a09b] transition hover:bg-[#faeae7] hover:text-[#c15f56]"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Empty state */}
          {filteredMonitors.length === 0 && (
            <div className="flex flex-col items-center justify-center px-6 py-16">
              <div className="mb-4 rounded-2xl bg-[#f1f3ed] p-4 text-[#7d8b7e]">
                <Activity size={25} />
              </div>

              <h3 className="text-lg font-semibold text-[#304438]">
                No monitors found
              </h3>

              <p className="mt-1 text-sm text-[#929a91]">
                Try changing your search or add a new monitor.
              </p>

              <button
                onClick={handleAddClick}
                className="mt-5 flex items-center gap-2 rounded-xl bg-[#244d3b] px-4 py-2.5 text-sm text-white hover:bg-[#183b2c]"
              >
                <Plus size={16} />
                Add your first monitor
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Monitor Modal */}
      <AddMonitorModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingMonitor(null);
        }}
        onAdd={handleSave}
        monitorToEdit={editingMonitor}
      />
    </div>
  );
}
