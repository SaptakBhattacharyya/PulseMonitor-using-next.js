"use client";
import Sidebar from "@/components/dashboard/sidebar";
import StatsCard from "@/components/dashboard/statsCard";
import UptimeSection from "@/components/dashboard/uptime-section";
import RecentIncidents from "@/components/dashboard/recent-incidents";
import MonitorsTable from "@/components/dashboard/monitor-table";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-[#faf8f2]">

      <Sidebar />

      <section className="ml-[280px] min-h-screen">

        {/* Hero Background */}

        <div
          className="min-h-[430px] bg-top bg-no-repeat"
          style={{
            backgroundImage: "url('https://res.cloudinary.com/dcmio3bme/image/upload/v1794140739/dashboard_wjhg7j.png')",
            backgroundSize: "100% auto",
          }}
        />

        <div className="relative z-10 -mt-12 px-8 pb-10">

          {/* Statistics */}

          <StatsCard />

          {/* Uptime Charts */}

          <UptimeSection />

          {/* Recent Incidents */}

          <div className="mt-7">
            <RecentIncidents />
          </div>

          {/* Monitors Table */}

          <MonitorsTable />

        </div>

      </section>

    </main>
  );
}


