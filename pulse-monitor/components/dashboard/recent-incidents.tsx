import {AlertTriangle,CheckCircle2,Clock,ArrowUpRight,} from "lucide-react";

const incidents = [
  {
    title: "API Server Unavailable",
    website: "api.pulsemonitor.dev",
    time: "Today, 10:42 AM",
    duration: "12 minutes",
    status: "Resolved",
  },
  {
    title: "High Response Time",
    website: "shop.example.com",
    time: "Today, 09:15 AM",
    duration: "8 minutes",
    status: "Resolved",
  },
  {
    title: "Connection Timeout",
    website: "dashboard.example.com",
    time: "Yesterday, 08:30 PM",
    duration: "Ongoing",
    status: "Investigating",
  },
];

export default function RecentIncidents() {
  return (
    <div className="rounded-2xl border border-[#e8e5dc] bg-white/80 p-6 shadow-sm">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>
          <h2 className="text-lg font-bold text-[#163d32]">
            Recent Incidents
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Latest issues detected across your monitors
          </p>
        </div>

        <button className="flex items-center gap-1 text-sm font-semibold text-[#397b61] transition hover:text-[#163d32]">
          View all
          <ArrowUpRight size={16} />
        </button>

      </div>

      {/* Incidents */}

      <div className="mt-6 space-y-5">

        {incidents.map((incident, index) => (

          <div
            key={index}
            className="flex gap-4 border-b border-[#efeee8] pb-5 last:border-0 last:pb-0"
          >

            {/* Icon */}

            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                incident.status === "Resolved"
                  ? "bg-green-50 text-green-700"
                  : "bg-amber-50 text-amber-700"
              }`}
            >
              {incident.status === "Resolved" ? (
                <CheckCircle2 size={20} />
              ) : (
                <AlertTriangle size={20} />
              )}
            </div>

            {/* Details */}

            <div className="min-w-0 flex-1">

              <div className="flex flex-wrap items-center justify-between gap-2">

                <h3 className="text-sm font-semibold text-[#163d32]">
                  {incident.title}
                </h3>

                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                    incident.status === "Resolved"
                      ? "bg-green-50 text-green-700"
                      : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {incident.status}
                </span>

              </div>

              <p className="mt-1 truncate text-xs text-slate-500">
                {incident.website}
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-slate-400">

                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {incident.time}
                </span>

                <span>
                  Duration: {incident.duration}
                </span>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}