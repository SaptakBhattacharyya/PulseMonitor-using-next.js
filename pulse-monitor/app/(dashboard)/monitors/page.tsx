"use client";

import { useState } from "react";
import { useMonitors } from "@/context/MonitorContext";
import type { Monitor } from "@/lib/monitor-data";
import AddMonitorModal from "@/components/dashboard/add-monitor-modal";
import {
  Plus,
  Search,
  Globe,
  Activity,
  CheckCircle2,
  AlertCircle,
  Clock,
  Trash2,
  Pencil,
  X,
  Loader2,
} from "lucide-react";

export default function MonitorsPage() {
  const { monitors, addMonitor, updateMonitor, deleteMonitor, isLoaded } =
    useMonitors();

  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editingMonitor, setEditingMonitor] = useState<Monitor | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const filteredMonitors = monitors.filter((monitor) => {
    const matchesSearch =
      monitor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      monitor.url.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      filter === "All" || monitor.status === filter;

    return matchesSearch && matchesFilter;
  });

  const operational = monitors.filter(
    (monitor) => monitor.status === "Operational"
  ).length;

  const down = monitors.filter(
    (monitor) => monitor.status === "Down"
  ).length;

  const pending = monitors.filter(
    (monitor) => monitor.status === "Pending"
  ).length;

  const handleEdit = (monitor: Monitor) => {
    setEditingMonitor(monitor);
    setShowModal(true);
    setError("");
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this monitor?"
    );

    if (!confirmed) return;

    try {
      await deleteMonitor(id);
    } catch {
      alert("Failed to delete monitor.");
    }
  };

  const handleSave = async () => {
    if (!editingMonitor) return;

    setSaving(true);
    setError("");

    try {
      await updateMonitor(editingMonitor.id, {
        name: editingMonitor.name,
        url: editingMonitor.url,
        method: editingMonitor.method,
        interval: editingMonitor.interval,
        timeout: editingMonitor.timeout,
      });

      setShowModal(false);
      setEditingMonitor(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update monitor."
      );
    } finally {
      setSaving(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f5ef]">
        <Loader2 className="animate-spin text-[#35483d]" size={28} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5ef] px-8 py-10">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="mb-2 text-sm text-[#8b9288]">Monitoring</p>
          <h1 className="text-3xl font-semibold text-[#263b32]">
            Your Monitors
          </h1>
          <p className="mt-2 text-sm text-[#858c82]">
            Manage and monitor all your websites and APIs.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingMonitor(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 rounded-xl bg-[#35483d] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#263b32]"
        >
          <Plus size={18} />
          Add Monitor
        </button>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Total Monitors",
            value: monitors.length,
            icon: Globe,
          },
          {
            title: "Operational",
            value: operational,
            icon: CheckCircle2,
          },
          {
            title: "Down",
            value: down,
            icon: AlertCircle,
          },
          {
            title: "Pending",
            value: pending,
            icon: Clock,
          },
        ].map((stat, index) => {
          const Icon = stat.icon;

          return (
            <div
              key={index}
              className="rounded-2xl border border-[#e6e6dc] bg-[#fffdf7] p-5 shadow-sm"
            >
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-[#858c82]">{stat.title}</p>
                <Icon size={18} className="text-[#7d897e]" />
              </div>

              <h2 className="text-3xl font-semibold text-[#263b32]">
                {stat.value}
              </h2>
            </div>
          );
        })}
      </div>

      {/* Monitor List */}
      <div className="rounded-2xl border border-[#e6e6dc] bg-[#fffdf7] shadow-sm">
        {/* Search & Filter */}
        <div className="flex flex-col gap-4 border-b border-[#e8e8df] p-5 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#969b92]"
            />

            <input
              type="text"
              placeholder="Search monitors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-[#dedfd6] bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-[#718b75]"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {["All", "Operational", "Down", "Pending"].map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`rounded-lg px-4 py-2 text-sm transition ${
                  filter === item
                    ? "bg-[#35483d] text-white"
                    : "border border-[#dedfd6] text-[#647064] hover:bg-[#f4f4ed]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#f8f8f2] text-xs uppercase tracking-wider text-[#92988e]">
              <tr>
                <th className="px-6 py-4">Monitor</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Response</th>
                <th className="px-6 py-4">Interval</th>
                <th className="px-6 py-4">Uptime</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#ecece4]">
              {filteredMonitors.map((monitor) => (
                <tr key={monitor.id} className="transition hover:bg-[#fafaf5]">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf1e9]">
                        <Globe size={18} className="text-[#526b57]" />
                      </div>

                      <div>
                        <p className="font-medium text-[#35483d]">
                          {monitor.name}
                        </p>
                        <p className="mt-1 max-w-[220px] truncate text-xs text-[#92988e]">
                          {monitor.url}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${
                        monitor.status === "Operational"
                          ? "bg-[#e8f3e9] text-[#527a59]"
                          : monitor.status === "Down"
                          ? "bg-[#fce8e6] text-[#b44d43]"
                          : "bg-[#f5f0df] text-[#9a8545]"
                      }`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${
                          monitor.status === "Operational"
                            ? "bg-[#6d9b74]"
                            : monitor.status === "Down"
                            ? "bg-[#cf6258]"
                            : "bg-[#c4a453]"
                        }`}
                      />
                      {monitor.status}
                    </span>
                  </td>

                  <td className="px-6 py-5 text-sm text-[#647064]">
                    {monitor.response}
                  </td>

                  <td className="px-6 py-5 text-sm text-[#647064]">
                    {monitor.interval} min
                  </td>

                  <td className="px-6 py-5 text-sm font-medium text-[#527a59]">
                    {monitor.uptime}
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEdit(monitor)}
                        title="Edit monitor"
                        className="rounded-lg p-2 text-[#71816f] transition hover:bg-[#edf1e9]"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() => handleDelete(monitor.id)}
                        title="Delete monitor"
                        className="rounded-lg p-2 text-[#b66c62] transition hover:bg-[#fce8e6]"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredMonitors.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center">
                    <Activity
                      size={32}
                      className="mx-auto mb-3 text-[#a1a69c]"
                    />
                    <p className="font-medium text-[#35483d]">
                      No monitors found
                    </p>
                    <p className="mt-1 text-sm text-[#92988e]">
                      Add a monitor or change your search/filter.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {showModal && editingMonitor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-[#fffdf7] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#e6e6dc] px-6 py-5">
              <div>
                <h2 className="text-xl font-semibold text-[#263b32]">
                  Edit Monitor
                </h2>
                <p className="mt-1 text-sm text-[#92988e]">
                  Update your monitoring configuration.
                </p>
              </div>

              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingMonitor(null);
                }}
                className="rounded-lg p-2 text-[#72776f] hover:bg-[#f0f0e8]"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5 p-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-[#35483d]">
                  Monitor Name
                </label>
                <input
                  value={editingMonitor.name}
                  onChange={(e) =>
                    setEditingMonitor({
                      ...editingMonitor,
                      name: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-[#dedfd6] bg-white px-4 py-3 text-sm outline-none focus:border-[#718b75]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#35483d]">
                  URL
                </label>
                <input
                  value={editingMonitor.url}
                  onChange={(e) =>
                    setEditingMonitor({
                      ...editingMonitor,
                      url: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-[#dedfd6] bg-white px-4 py-3 text-sm outline-none focus:border-[#718b75]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#35483d]">
                  HTTP Method
                </label>
                <select
                  value={editingMonitor.method}
                  onChange={(e) =>
                    setEditingMonitor({
                      ...editingMonitor,
                      method: e.target.value as Monitor["method"],
                    })
                  }
                  className="w-full rounded-xl border border-[#dedfd6] bg-white px-4 py-3 text-sm outline-none focus:border-[#718b75]"
                >
                  <option value="GET">GET</option>
                  <option value="HEAD">HEAD</option>
                  <option value="POST">POST</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#35483d]">
                  Check Interval
                </label>
                <select
                  value={editingMonitor.interval}
                  onChange={(e) =>
                    setEditingMonitor({
                      ...editingMonitor,
                      interval: Number(e.target.value),
                    })
                  }
                  className="w-full rounded-xl border border-[#dedfd6] bg-white px-4 py-3 text-sm outline-none focus:border-[#718b75]"
                >
                  {[1, 5, 10, 15, 30, 60].map((value) => (
                    <option key={value} value={value}>
                      Every {value} minute{value > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#35483d]">
                  Timeout
                </label>
                <select
                  value={editingMonitor.timeout}
                  onChange={(e) =>
                    setEditingMonitor({
                      ...editingMonitor,
                      timeout: Number(e.target.value),
                    })
                  }
                  className="w-full rounded-xl border border-[#dedfd6] bg-white px-4 py-3 text-sm outline-none focus:border-[#718b75]"
                >
                  {[5, 10, 15, 20, 30].map((value) => (
                    <option key={value} value={value}>
                      {value} seconds
                    </option>
                  ))}
                </select>
              </div>

              {error && (
                <p className="rounded-xl bg-red-50 p-3 text-sm text-red-600">
                  {error}
                </p>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setEditingMonitor(null);
                  }}
                  disabled={saving}
                  className="flex-1 rounded-xl border border-[#dedfd6] px-4 py-3 text-sm font-medium text-[#35483d] hover:bg-[#f3f3eb]"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#35483d] px-4 py-3 text-sm font-medium text-white hover:bg-[#263b32] disabled:opacity-60"
                >
                  {saving && <Loader2 size={16} className="animate-spin" />}
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Monitor Modal */}
      <AddMonitorModal
        open={showModal && !editingMonitor}
        onClose={() => setShowModal(false)}
        onAdd={addMonitor}
      />
    </div>
  );
}
