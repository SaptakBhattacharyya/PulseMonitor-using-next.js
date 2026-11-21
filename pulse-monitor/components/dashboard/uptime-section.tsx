"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TrendingUp, Activity } from "lucide-react";

const uptimeData = [
  { name: "Operational", value: 96.5 },
  { name: "Downtime", value: 3.5 },
];

const trendData = [
  { day: "Mon", uptime: 99.8 },
  { day: "Tue", uptime: 99.5 },
  { day: "Wed", uptime: 98.9 },
  { day: "Thu", uptime: 99.7 },
  { day: "Fri", uptime: 99.2 },
  { day: "Sat", uptime: 99.9 },
  { day: "Sun", uptime: 99.6 },
];

const COLORS = ["#397b61", "#e9b7a8"];

export default function UptimeSection() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
      <div className="rounded-2xl border border-[#e8e5dc] bg-white/95 p-6 shadow-sm backdrop-blur-sm lg:col-span-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#163d32]">
              Overall Uptime
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your monitoring performance
            </p>
          </div>

          <div className="rounded-xl bg-green-50 p-3 text-green-700">
            <Activity size={21} />
          </div>
        </div>

        <div className="relative mt-5 h-[230px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={uptimeData}
                cx="50%"
                cy="50%"
                innerRadius={75}
                outerRadius={100}
                paddingAngle={4}
                dataKey="value"
                stroke="none"
              >
                {uptimeData.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>

              <Tooltip
                formatter={(value) => [`${value}%`, ""]}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-[#163d32]">
              96.5%
            </span>

            <span className="mt-1 text-xs text-slate-500">
              Uptime
            </span>
          </div>
        </div>

        <div className="mt-3 flex justify-center gap-7">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#397b61]" />
            <span className="text-xs text-slate-600">
              Operational
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#e9b7a8]" />
            <span className="text-xs text-slate-600">
              Downtime
            </span>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-[#e8e5dc] bg-white/95 p-6 shadow-sm backdrop-blur-sm lg:col-span-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#163d32]">
              Uptime Trend
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Performance over the last 7 days
            </p>
          </div>

          <div className="flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-2 text-xs font-semibold text-green-700">
            <TrendingUp size={15} />
            Stable
          </div>
        </div>

        <div className="mt-7 h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={trendData}
              margin={{
                top: 10,
                right: 10,
                left: -20,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient
                  id="uptimeGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#397b61"
                    stopOpacity={0.25}
                  />

                  <stop
                    offset="95%"
                    stopColor="#397b61"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#eeeee8"
              />

              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#929b96", fontSize: 12 }}
                dy={10}
              />

              <YAxis
                domain={[95, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#929b96", fontSize: 11 }}
                tickFormatter={(value) => `${value}%`}
              />

              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #e8e5dc",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
                }}
                formatter={(value) => [`${value}%`, "Uptime"]}
              />

              <Area
                type="monotone"
                dataKey="uptime"
                stroke="#397b61"
                strokeWidth={3}
                fill="url(#uptimeGradient)"
                activeDot={{
                  r: 6,
                  fill: "#397b61",
                  stroke: "#ffffff",
                  strokeWidth: 3,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
