"use client";

import { useState } from "react";
import {
  CheckCircle2,
  AlertCircle,
  MoreHorizontal,
  Plus,
  Trash2,
  ExternalLink,
} from "lucide-react";

import type { Monitor } from "@/lib/monitor-data";

type MonitorsTableProps = {
  monitors: Monitor[];
  searchQuery?: string;
  onAddMonitor: () => void;
  onDeleteMonitor: (id: string) => void;
};

export default function MonitorsTable({
  monitors,
  searchQuery = "",
  onAddMonitor,
  onDeleteMonitor,
}: MonitorsTableProps) {
  const [selectedMonitor, setSelectedMonitor] = useState<string | null>(null);

  const filteredMonitors = monitors.filter((monitor) => {
    const query = searchQuery.toLowerCase();

    return (
      monitor.name.toLowerCase().includes(query) ||
      monitor.url.toLowerCase().includes(query)
    );
  });

  function handleDelete(id: string, name: string) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${name}"?`
    );

    if (!confirmed) return;

    onDeleteMonitor(id);
    setSelectedMonitor(null);
  }

  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-[#e8e3d8] bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#eee9df] px-6 py-5">
        <div>
          <h2 className="text-lg font-semibold text-[#253c32]">
            Your Monitors
          </h2>
          <p className="mt-1 text-sm text-[#8b9189]">
            Manage and track all your websites
          </p>
        </div>

        <button
          onClick={onAddMonitor}
          className="flex items-center gap-2 rounded-xl bg-[#294b3b] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#1f3c2e]"
        >
          <Plus size={16} />
          Add Monitor
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px]">
          <thead>
            <tr className="bg-[#faf9f6] text-left text-xs uppercase tracking-wider text-[#999c95]">
              <th className="px-6 py-4 font-medium">Monitor</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Uptime</th>
              <th className="px-6 py-4 font-medium">Response</th>
              <th className="px-6 py-4 font-medium">Last Checked</th>
              <th className="px-6 py-4 text-right font-medium">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#f0ede7]">
            {filteredMonitors.map((monitor) => (
              <tr
                key={monitor.id}
                className="transition hover:bg-[#fcfbf8]"
              >
                <td className="px-6 py-4">
                  <div className="font-medium text-[#30483b]">
                    {monitor.name}
                  </div>

                  <a
                    href={monitor.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-xs text-[#92988f] hover:text-[#426b54]"
                  >
                    {monitor.url}
                    <ExternalLink size={12} />
                  </a>
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                      monitor.status === "Operational"
                        ? "bg-[#e8f4ec] text-[#43845b]"
                        : monitor.status === "Down"
                          ? "bg-[#fbe9e6] text-[#c65e50]"
                          : "bg-[#f3efe2] text-[#9c8241]"
                    }`}
                  >
                    {monitor.status === "Operational" ? (
                      <CheckCircle2 size={13} />
                    ) : (
                      <AlertCircle size={13} />
                    )}
                    {monitor.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-sm text-[#536257]">
                  {monitor.uptime}
                </td>

                <td className="px-6 py-4 text-sm text-[#536257]">
                  {monitor.response}
                </td>

                <td className="px-6 py-4 text-sm text-[#8b9189]">
                  {monitor.checked}
                </td>

                <td className="relative px-6 py-4 text-right">
                  <button
                    onClick={() =>
                      setSelectedMonitor(
                        selectedMonitor === monitor.id ? null : monitor.id
                      )
                    }
                    className="rounded-lg p-2 text-[#7e897f] transition hover:bg-[#f2f4ef]"
                    aria-label="Monitor actions"
                  >
                    <MoreHorizontal size={18} />
                  </button>

                  {selectedMonitor === monitor.id && (
                    <div className="absolute right-8 top-14 z-30 w-40 rounded-xl border border-[#e9e5dd] bg-white p-1 shadow-lg">
                      <button
                        onClick={() => handleDelete(monitor.id, monitor.name)}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 transition hover:bg-red-50"
                      >
                        <Trash2 size={15} />
                        Delete Monitor
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredMonitors.length === 0 && (
          <div className="px-6 py-14 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#f1f3ed]">
              <AlertCircle className="text-[#829184]" size={22} />
            </div>

            <h3 className="mt-3 font-medium text-[#344b3d]">
              No monitors found
            </h3>

            <p className="mt-1 text-sm text-[#999c95]">
              Try a different search or add a new monitor.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
