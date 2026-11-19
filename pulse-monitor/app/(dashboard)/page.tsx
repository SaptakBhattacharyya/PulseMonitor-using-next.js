"use client";

import { useMemo } from "react";
import { useMonitors } from "@/context/MonitorContext";
import StatsCard from "@/components/dashboard/stats-card";
import MonitorsTable from "@/components/dashboard/monitors-table";
import UptimeSection from "@/components/dashboard/uptime-section";
import RecentIncidents from "@/components/dashboard/recent-incidents";

export default function DashboardPage() {
  const { monitors, deleteMonitor } = useMonitors();

  const stats = useMemo(() => {
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

    return { total, operational, down, pending };
  }, [monitors]);

  return (
    <div className="min-h-screen bg-[#f5f5ef] px-8 py-8 lg:px-10">
      {/* Header */}
      <div className="mb-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#8b968b]">
          Overview
        </p>

        <h1 className="text-4xl font-semibold tracking-tight text-[#24372d]">
          Dashboard
        </h1>

        <p className="mt-2 text-sm text-[#899188]">
          Your infrastructure overview at a glance.
        </p>
      </div>

      {/* Statistics */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            title: "Total Monitors",
            value: stats.total,
            description: "Tracked endpoints",
          },
          {
            title: "Operational",
            value: stats.operational,
            description: "Currently healthy",
          },
          {
            title: "Down",
            value: stats.down,
            description: "Needs attention",
          },
          {
            title: "Pending",
            value: stats.pending,
            description: "Awaiting first check",
          },
        ].map((stat) => (
          <div
            key={stat.title}
            className="rounded-2xl border border-[#e5e6dd] bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-[#92998f]">{stat.title}</p>

            <h2 className="mt-3 text-3xl font-semibold text-[#304438]">
              {stat.value}
            </h2>

            <p className="mt-2 text-xs text-[#a0a69e]">
              {stat.description}
            </p>
          </div>
        ))}
      </div>

      {/* Dashboard sections */}
      <div className="space-y-6">
        {/* Monitor Table */}
        <section className="rounded-2xl border border-[#e5e6dd] bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[#304438]">
                Your Monitors
              </h2>

              <p className="mt-1 text-sm text-[#929a91]">
                Manage and track your endpoints.
              </p>
            </div>
          </div>

          <MonitorsTable
            monitors={monitors}
            onAddMonitor={() => {
              window.location.href = "/monitors";
            }}
            onDeleteMonitor={deleteMonitor}
          />
        </section>

        {/* Uptime */}
        <UptimeSection />

        {/* Recent Incidents */}
        <RecentIncidents />
      </div>
    </div>
  );
}
