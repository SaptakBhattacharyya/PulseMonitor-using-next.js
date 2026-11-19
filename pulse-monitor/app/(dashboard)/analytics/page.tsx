"use client";

import { useState } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Clock3,
  Globe,
  CheckCircle2,
  CalendarDays,
  ChevronDown,
  Download,
  Zap,
  ShieldCheck,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

/* ---------------- MOCK DATA ---------------- */

const responseData = [
  { time: "00:00", response: 210 },
  { time: "03:00", response: 185 },
  { time: "06:00", response: 240 },
  { time: "09:00", response: 320 },
  { time: "12:00", response: 270 },
  { time: "15:00", response: 190 },
  { time: "18:00", response: 360 },
  { time: "21:00", response: 230 },
  { time: "23:00", response: 205 },
];

const uptimeData = [
  { day: "Mon", uptime: 99.98 },
  { day: "Tue", uptime: 99.92 },
  { day: "Wed", uptime: 99.45 },
  { day: "Thu", uptime: 100 },
  { day: "Fri", uptime: 99.86 },
  { day: "Sat", uptime: 99.97 },
  { day: "Sun", uptime: 99.91 },
];

const monitorComparison = [
  { name: "Portfolio", uptime: 99.99, response: 142 },
  { name: "API Server", uptime: 98.45, response: 328 },
  { name: "E-Commerce", uptime: 99.72, response: 245 },
  { name: "Dashboard", uptime: 99.94, response: 186 },
  { name: "Auth API", uptime: 99.68, response: 290 },
];

export default function AnalyticsPage() {
  const [period, setPeriod] = useState("7 days");

  return (
    <div className="min-h-screen bg-[#f8f7f2] px-8 py-8 lg:px-12">
      {/* HEADER */}
      <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-[#858b7e]">
            <BarChart3 size={14} />
            Performance Insights
          </div>

          <h1 className="font-serif text-4xl tracking-tight text-[#243c32]">
            Analytics
          </h1>

          <p className="mt-2 text-sm text-[#858b7e]">
            Understand uptime, performance, and service reliability.
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-xl border border-[#e6e4dc] bg-white px-4 py-3 text-sm text-[#526453] shadow-sm transition hover:bg-[#f9faf7]">
          <CalendarDays size={16} />
          {period}
          <ChevronDown size={15} />
        </button>
      </div>

      {/* KPI CARDS */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AnalyticsCard
          title="Overall Uptime"
          value="99.87%"
          change="+0.12%"
          subtitle="vs previous period"
          icon={<ShieldCheck size={18} />}
          color="green"
          positive
        />

        <AnalyticsCard
          title="Avg Response Time"
          value="238 ms"
          change="-18 ms"
          subtitle="vs previous period"
          icon={<Clock3 size={18} />}
          color="blue"
          positive
        />

        <AnalyticsCard
          title="Total Requests"
          value="1.28M"
          change="+12.8%"
          subtitle="vs previous period"
          icon={<Activity size={18} />}
          color="gold"
          positive
        />

        <AnalyticsCard
          title="Incidents"
          value="06"
          change="-2"
          subtitle="vs previous period"
          icon={<Zap size={18} />}
          color="rose"
          positive
        />
      </div>

      {/* RESPONSE TIME CHART */}
      <div className="mb-6 rounded-2xl border border-[#e8e6dd] bg-white p-5 sm:p-6">
        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-serif text-2xl text-[#30483a]">
              Response Time
            </h2>
            <p className="mt-1 text-sm text-[#92978d]">
              Average server response time throughout the day
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-lg bg-[#edf3ed] px-3 py-2 text-xs font-medium text-[#58765d]">
            <span className="h-2 w-2 rounded-full bg-[#76977c]" />
            Response · ms
          </div>
        </div>

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={responseData}>
              <defs>
                <linearGradient id="responseGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#77977d" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#77977d" stopOpacity={0.01} />
                </linearGradient>
              </defs>

              <CartesianGrid stroke="#eeeee8" strokeDasharray="4 4" vertical={false} />

              <XAxis
                dataKey="time"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#969b92", fontSize: 12 }}
                dy={10}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#969b92", fontSize: 12 }}
                width={45}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e8e6dd",
                  borderRadius: "12px",
                  fontSize: "12px",
                }}
                formatter={(value) => [`${value} ms`, "Response"]}
              />

              <Area
                type="monotone"
                dataKey="response"
                stroke="#6d8c73"
                strokeWidth={2.5}
                fill="url(#responseGradient)"
                activeDot={{ r: 5, fill: "#6d8c73" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-5 flex flex-wrap gap-6 border-t border-[#eeece5] pt-4">
          <ChartSummary label="Average" value="238 ms" />
          <ChartSummary label="Fastest" value="142 ms" />
          <ChartSummary label="Peak" value="360 ms" />
        </div>
      </div>

      {/* LOWER CHARTS */}
      <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* UPTIME */}
        <div className="rounded-2xl border border-[#e8e6dd] bg-white p-5 sm:p-6">
          <div className="mb-6">
            <h2 className="font-serif text-2xl text-[#30483a]">
              Uptime History
            </h2>
            <p className="mt-1 text-sm text-[#92978d]">
              Daily availability over the last 7 days
            </p>
          </div>

          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={uptimeData} barSize={26}>
                <CartesianGrid
                  stroke="#eeeee8"
                  strokeDasharray="4 4"
                  vertical={false}
                />

                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#969b92", fontSize: 12 }}
                  dy={8}
                />

                <YAxis
                  domain={[98, 100]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#969b92", fontSize: 11 }}
                  tickFormatter={(value) => `${value}%`}
                />

                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #e8e6dd",
                    fontSize: "12px",
                  }}
                  formatter={(value) => [`${value}%`, "Uptime"]}
                />

                <Bar
                  dataKey="uptime"
                  fill="#78947a"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* MONITOR COMPARISON */}
        <div className="rounded-2xl border border-[#e8e6dd] bg-white p-5 sm:p-6">
          <div className="mb-6">
            <h2 className="font-serif text-2xl text-[#30483a]">
              Monitor Performance
            </h2>
            <p className="mt-1 text-sm text-[#92978d]">
              Compare uptime across your monitored services
            </p>
          </div>

          <div className="space-y-5">
            {monitorComparison.map((monitor) => (
              <div key={monitor.name}>
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe size={14} className="text-[#8b9688]" />
                    <span className="text-sm font-medium text-[#536354]">
                      {monitor.name}
                    </span>
                  </div>

                  <span className="text-sm font-semibold text-[#48634d]">
                    {monitor.uptime}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-[#eeeee8]">
                  <div
                    className="h-full rounded-full bg-[#78947a]"
                    style={{ width: `${monitor.uptime}%` }}
                  />
                </div>

                <div className="mt-1.5 flex justify-between text-xs text-[#969b92]">
                  <span>{monitor.response} ms response</span>
                  <span>Uptime</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PERFORMANCE INSIGHT */}
      <div className="rounded-2xl border border-[#e5e5d9] bg-[#edf2e9] p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#68846c] shadow-sm">
            <Zap size={19} />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#758574]">
              Performance Insight
            </p>

            <h3 className="mt-2 font-serif text-xl text-[#30483a]">
              Your services are performing well.
            </h3>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#7a8577]">
              Your average response time has improved compared to the previous
              period. Keep monitoring your API endpoints to identify potential
              performance bottlenecks before they impact your users.
            </p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="mt-6 flex flex-col justify-between gap-2 text-xs text-[#9a9e95] sm:flex-row sm:items-center">
        <span>Analytics data is currently simulated.</span>
        <span className="flex items-center gap-1.5">
          <Activity size={13} />
          Performance Overview
        </span>
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function AnalyticsCard({
  title,
  value,
  change,
  subtitle,
  icon,
  color,
  positive,
}: {
  title: string;
  value: string;
  change: string;
  subtitle: string;
  icon: React.ReactNode;
  color: "green" | "blue" | "gold" | "rose";
  positive: boolean;
}) {
  const colorStyles = {
    green: "bg-[#eaf1e9] text-[#66816b]",
    blue: "bg-[#e9eef2] text-[#69839a]",
    gold: "bg-[#f3eee3] text-[#a58a57]",
    rose: "bg-[#f5e9e6] text-[#bd7765]",
  };

  return (
    <div className="rounded-2xl border border-[#e8e6dd] bg-white p-5 shadow-[0_2px_10px_rgba(35,55,40,0.025)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[#858b7e]">{title}</p>
          <h3 className="mt-3 font-serif text-3xl text-[#30483a]">{value}</h3>
        </div>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${colorStyles[color]}`}
        >
          {icon}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-1.5">
        {positive ? (
          <ArrowDownRight size={14} className="text-[#66816b]" />
        ) : (
          <ArrowUpRight size={14} className="text-[#bd7765]" />
        )}

        <span
          className={`text-xs font-medium ${
            positive ? "text-[#66816b]" : "text-[#bd7765]"
          }`}
        >
          {change}
        </span>

        <span className="text-xs text-[#999e94]">{subtitle}</span>
      </div>
    </div>
  );
}

function ChartSummary({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-[#969b92]">{label}</p>
      <p className="mt-1 text-sm font-semibold text-[#435a48]">{value}</p>
    </div>
  );
}
