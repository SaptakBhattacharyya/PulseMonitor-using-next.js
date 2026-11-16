import {
  Globe,
  ExternalLink,
  MoreHorizontal,
  CheckCircle2,
  AlertCircle,
  Clock,
} from "lucide-react";

const monitors = [
  {
    name: "PulseMonitor API",
    url: "api.pulsemonitor.dev",
    status: "Operational",
    uptime: "99.98%",
    response: "142 ms",
    checked: "Just now",
  },
  {
    name: "My Portfolio",
    url: "saptak.dev",
    status: "Operational",
    uptime: "99.95%",
    response: "210 ms",
    checked: "1 min ago",
  },
  {
    name: "E-Commerce Store",
    url: "shop.example.com",
    status: "Down",
    uptime: "96.42%",
    response: "Timeout",
    checked: "2 min ago",
  },
  {
    name: "Admin Dashboard",
    url: "admin.example.com",
    status: "Operational",
    uptime: "99.89%",
    response: "185 ms",
    checked: "3 min ago",
  },
  {
    name: "Authentication API",
    url: "auth.example.com",
    status: "Operational",
    uptime: "99.99%",
    response: "98 ms",
    checked: "4 min ago",
  },
];

export default function MonitorsTable() {
  return (
    <div className="mt-7 overflow-hidden rounded-2xl border border-[#e8e5dc] bg-white/80 shadow-sm">

      {/* Header */}

      <div className="flex flex-wrap items-center justify-between gap-4 p-6">

        <div>
          <h2 className="text-lg font-bold text-[#163d32]">
            Your Monitors
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Monitor the health of all your websites and APIs
          </p>
        </div>

        <button className="rounded-xl bg-[#163d32] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#285c49]">
          + Add Monitor
        </button>

      </div>

      {/* Table */}

      <div className="overflow-x-auto">

        <table className="w-full min-w-[850px] text-left">

          <thead>
            <tr className="border-y border-[#efeee8] bg-[#faf9f5]">

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Monitor
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Status
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Uptime
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Response
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Last Checked
              </th>

              <th className="px-6 py-4">
              </th>

            </tr>
          </thead>

          <tbody>

            {monitors.map((monitor) => (

              <tr
                key={monitor.name}
                className="border-b border-[#efeee8] transition hover:bg-[#faf9f5]"
              >

                {/* Monitor */}

                <td className="px-6 py-5">

                  <div className="flex items-center gap-3">

                    <div className="rounded-xl bg-[#edf4ee] p-2.5 text-[#397b61]">
                      <Globe size={19} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-[#163d32]">
                        {monitor.name}
                      </p>

                      <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                        {monitor.url}
                        <ExternalLink size={11} />
                      </p>
                    </div>

                  </div>

                </td>

                {/* Status */}

                <td className="px-6 py-5">

                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                      monitor.status === "Operational"
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-600"
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

                {/* Uptime */}

                <td className="px-6 py-5">
                  <span className="text-sm font-semibold text-[#163d32]">
                    {monitor.uptime}
                  </span>
                </td>

                {/* Response */}

                <td className="px-6 py-5">

                  <span
                    className={`text-sm font-medium ${
                      monitor.response === "Timeout"
                        ? "text-red-600"
                        : "text-slate-600"
                    }`}
                  >
                    {monitor.response}
                  </span>

                </td>

                {/* Last Checked */}

                <td className="px-6 py-5">

                  <span className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Clock size={13} />
                    {monitor.checked}
                  </span>

                </td>

                {/* Actions */}

                <td className="px-6 py-5">
                  <button
                    aria-label={`More options for ${monitor.name}`}
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-[#163d32]"
                  >
                    <MoreHorizontal size={19} />
                  </button>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Footer */}

      <div className="flex items-center justify-between px-6 py-4">

        <p className="text-xs text-slate-500">
          Showing 5 of 24 monitors
        </p>

        <button className="text-sm font-semibold text-[#397b61] hover:text-[#163d32]">
          View all monitors →
        </button>

      </div>

    </div>
  );
}