import { Monitor, CheckCircle2, AlertTriangle, Clock, TrendingUp, TrendingDown } from "lucide-react";

const stats = [{ title: "Total Monitors", value: "24", change: "+12%", description: "vs. last 7 days", icon: Monitor, color: "green", positive: true, },
{ title: "Operational", value: "22", change: "+15%", description: "vs. last 7 days", icon: CheckCircle2, color: "green", positive: true, },
{ title: "Down", value: "02", change: "-33%", description: "vs. last 7 days", icon: AlertTriangle, color: "red", positive: false, },
{ title: "Avg. Response Time", value: "320 ms", change: "-18%", description: "vs. last 7 days", icon: Clock, color: "amber", positive: true, },
];

const colors = {
    green: {
        icon: "bg-green-100 text-green-700",
        card: "border-green-200/70",
        trend: "text-green-700",
    },
    red: {
        icon: "bg-red-100 text-red-700",
        card: "border-red-200/70",
        trend: "text-red-600",
    },
    amber: {
        icon: "bg-amber-100 text-amber-700",
        card: "border-amber-200/70",
        trend: "text-green-700",
    },
};

export default function StatsCard() {
    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

            {stats.map((stat) => {
                const Icon = stat.icon;
                const style = colors[stat.color as keyof typeof colors];

                const TrendIcon = stat.positive
                    ? TrendingUp
                    : TrendingDown;

                return (
                    <div
                        key={stat.title}
                        className={`group rounded-2xl border ${style.card} bg-white/75 p-5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
                    >
                        {/* Top section */}

                        <div className="flex items-center justify-between">

                            <p className="text-sm font-semibold text-slate-600">
                                {stat.title}
                            </p>

                            <div className={`rounded-xl p-3 ${style.icon}`}>
                                <Icon size={23} strokeWidth={1.8} />
                            </div>

                        </div>

                        {/* Value */}

                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#163d32]">
                            {stat.value}
                        </h2>

                        {/* Performance */}

                        <div className="mt-3 flex items-center gap-2">

                            <span className={`flex items-center gap-1 text-sm font-semibold ${style.trend}`}>
                                <TrendIcon size={15} />
                                {stat.change}
                            </span>

                            <span className="text-xs text-slate-500">
                                {stat.description}
                            </span>

                        </div>

                    </div>
                );
            })}

        </div>
    );
}