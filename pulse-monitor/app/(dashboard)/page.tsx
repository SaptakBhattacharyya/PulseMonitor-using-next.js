"use client";

import { useState, useEffect } from "react";

import Topbar from "@/components/dashboard/topbar";
import StatsCard from "@/components/dashboard/stats-card";
import UptimeSection from "@/components/dashboard/uptime-section";
import RecentIncidents from "@/components/dashboard/recent-incidents";
import MonitorsTable from "@/components/dashboard/monitors-table";
import AddMonitorModal from "@/components/dashboard/add-monitor-modal";

import { monitors as initialMonitors } from "@/lib/monitor-data";
import type { Monitor } from "@/lib/monitor-data";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [monitors, setMonitors] = useState<Monitor[]>(initialMonitors);
  const [modalOpen, setModalOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Load saved monitors when the browser opens
  useEffect(() => {
    try {
      const savedMonitors = localStorage.getItem("pulse-monitor-monitors");

      if (savedMonitors) {
        setMonitors(JSON.parse(savedMonitors));
      }
    } catch (error) {
      console.error("Failed to load monitors:", error);
    }

    setLoaded(true);
  }, []);

  // Save monitors whenever the list changes
  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem(
      "pulse-monitor-monitors",
      JSON.stringify(monitors)
    );
  }, [monitors, loaded]);

  // Add a new monitor
  function handleAddMonitor(newMonitor: Monitor) {
    setMonitors((prev) => [newMonitor, ...prev]);
  }

  // Delete a monitor
  function handleDeleteMonitor(id: string) {
    setMonitors((prev) => prev.filter((monitor) => monitor.id !== id));
  }

  return (
    <>
      <section className="min-h-screen">
        <Topbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <div
          className="min-h-[430px] bg-top bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/dcmio3bme/image/upload/v1794140739/dashboard_wjhg7j.png')",
            backgroundSize: "100% auto",
          }}
        />

        <div className="relative z-10 -mt-12 px-8 pb-10">
          <StatsCard />
          <UptimeSection />

          <div className="mt-7">
            <RecentIncidents />
          </div>

          <MonitorsTable
            monitors={monitors}
            searchQuery={searchQuery}
            onAddMonitor={() => setModalOpen(true)}
            onDeleteMonitor={handleDeleteMonitor}
          />
        </div>
      </section>

      <AddMonitorModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleAddMonitor}
      />
    </>
  );
}

