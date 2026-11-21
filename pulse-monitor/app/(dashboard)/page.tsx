"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useMonitors } from "@/context/MonitorContext";
import Topbar from "@/components/dashboard/topbar";
import StatsCard from "@/components/dashboard/stats-card";
import MonitorsTable from "@/components/dashboard/monitors-table";
import UptimeSection from "@/components/dashboard/uptime-section";
import RecentIncidents from "@/components/dashboard/recent-incidents";

export default function DashboardPage() {
  const router = useRouter();
  const { monitors, deleteMonitor, isLoaded } = useMonitors();
  const [searchQuery, setSearchQuery] = useState("");

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

  if (!isLoaded) {
    return (
      <main className="min-h-screen bg-[#f5f5ef] px-6 py-8 lg:px-10">
        <div className="animate-pulse">
          <div className="mb-8 h-14 rounded-xl bg-[#e5e8df]" />
          <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="h-32 rounded-2xl bg-[#e5e8df]" />
            ))}
          </div>
          <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="h-72 rounded-2xl bg-[#e5e8df]" />
            <div className="h-72 rounded-2xl bg-[#e5e8df]" />
          </div>
          <div className="h-96 rounded-2xl bg-[#e5e8df]" />
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#f5f5ef]">
      <div
        className="pointer-events-none absolute left-0 right-0 top-0 h-[480px] sm:h-[540px] lg:h-[600px] overflow-hidden"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dcmio3bme/image/upload/v1795204416/PulseMonitor_Welcome_Dashboard_zc3vqu.png')",
          backgroundSize: "100% auto",
          backgroundPosition: "left top",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-[280px] sm:h-[340px] lg:h-[400px] overflow-hidden"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dcmio3bme/image/upload/v1795204416/PulseMonitor_Welcome_Dashboard_zc3vqu.png')",
          backgroundSize: "100% auto",
          backgroundPosition: "left bottom",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="relative z-10 min-h-screen px-6 py-6 lg:px-10">
        <div className="flex items-center justify-end pb-4">
          <div className="w-full lg:w-[60%] xl:w-[55%]">
            <Topbar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
        </div>

        <div className="h-44 sm:h-60 lg:h-72 xl:h-80" />

        <div className="mx-auto w-full max-w-[1600px] space-y-8 pb-12">
          <section>
            <StatsCard stats={stats} />
          </section>

          <section>
            <UptimeSection />
          </section>

          <section>
            <MonitorsTable
              monitors={monitors}
              searchQuery={searchQuery}
              onAddMonitor={() => router.push("/monitors")}
              onDeleteMonitor={deleteMonitor}
            />
          </section>

          <section>
            <RecentIncidents />
          </section>
        </div>
      </div>
    </main>
  );
}
