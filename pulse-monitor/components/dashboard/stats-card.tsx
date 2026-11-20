"use client";

import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  Clock,
} from "lucide-react";

type StatsCardProps = {
  stats: {
    total: number;
    operational: number;
    down: number;
    pending: number;
  };
};

export default function StatsCard({ stats }: StatsCardProps) {
  const cards = [
    {
      title: "Total Monitors",
      value: stats.total,
      description: "Websites being monitored",
      icon: Activity,
      color: "text-[#527d66]",
      bg: "bg-[#edf4ee]",
    },
    {
      title: "Operational",
      value: stats.operational,
      description: "Currently healthy",
      icon: CheckCircle2,
      color: "text-[#3c9468]",
      bg: "bg-[#e9f4ec]",
    },
    {
      title: "Down",
      value: stats.down,
      description: "Needs attention",
      icon: AlertTriangle,
      color: "text-[#c17b60]",
      bg: "bg-[#f8eee8]",
    },
    {
      title: "Pending",
      value: stats.pending,
      description: "Awaiting first check",
      icon: Clock,
      color: "text-[#b29a55]",
      bg: "bg-[#f6f2e6]",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-2xl border border-[#e7e8df] bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-[#7e887f]">
                  {card.title}
                </p>

                <h3 className="mt-3 text-3xl font-semibold tracking-tight text-[#263a2e]">
                  {card.value}
                </h3>
              </div>

              <div className={`rounded-xl p-3 ${card.bg}`}>
                <Icon size={20} className={card.color} />
              </div>
            </div>

            <p className="mt-4 text-xs text-[#929990]">
              {card.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
