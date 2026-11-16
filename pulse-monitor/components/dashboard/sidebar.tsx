"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {Activity,LayoutDashboard,Globe,AlertTriangle,ChartNoAxesCombined,Settings,CircleHelp,} from "lucide-react";

const navigation = [
    { name: "Overview", href: "/", icon: LayoutDashboard },
    { name: "Monitors", href: "/monitors", icon: Globe },
    { name: "Incidents", href: "/incidents", icon: AlertTriangle },
    { name: "Analytics", href: "/analytics", icon: ChartNoAxesCombined },
    { name: "Status Pages", href: "/status-pages", icon: Activity },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside
            className="fixed left-0 top-0 z-50 flex h-screen w-[280px] flex-col overflow-hidden bg-[#103b32] bg-cover bg-center"
            style={{
                backgroundImage: "url('/slidebar.png')",
            }}
        >
            {/* Overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#103b32]/75 via-[#103b32]/35 to-[#103b32]/20" />

            <div className="relative z-10 flex h-full flex-col px-6 py-8">

                {/* Logo */}
                <Link href="/" className="mb-14 flex items-center gap-3">
                    <div className="rounded-xl bg-[#d9e8d5]/15 p-2.5">
                        <Activity size={27} className="text-[#d9c58b]" />
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-white">
                            Pulse<span className="text-[#d9c58b]">Monitor</span>
                        </h1>

                        <p className="mt-1 text-xs tracking-widest text-white/70">
                            WEBSITE MONITORING
                        </p>
                    </div>
                </Link>

                {/* Navigation */}
                <div>
                    <p className="mb-5 px-3 text-[10px] font-semibold uppercase tracking-[3px] text-white/50">
                        Workspace
                    </p>

                    <nav className="space-y-2">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            const active = pathname === item.href;

                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`group flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-300 ${active
                                            ? "border border-white/20 bg-white/20 text-white shadow-lg backdrop-blur-md"
                                            : "text-white/75 hover:bg-white/10 hover:text-white"
                                        }`}
                                >
                                    <Icon
                                        size={20}
                                        strokeWidth={1.8}
                                        className={
                                            active
                                                ? "text-[#e4d39c]"
                                                : "text-white/75 group-hover:text-[#e4d39c]"
                                        }
                                    />

                                    {item.name}

                                    {active && (
                                        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#d9c58b]" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Bottom Navigation */}
                <div className="mt-auto space-y-3 pb-5">

                    <Link
                        href="/settings"
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-white/75 transition hover:bg-white/10 hover:text-white"
                    >
                        <Settings size={19} />
                        Settings
                    </Link>

                    <Link
                        href="/help"
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-white/75 transition hover:bg-white/10 hover:text-white"
                    >
                        <CircleHelp size={19} />
                        Help & Support
                    </Link>

                    <div className="border-t border-white/20 pt-5">
                        <p className="text-sm font-semibold text-white">
                            My Workspace
                        </p>
                        <p className="mt-1 text-xs text-white/60">
                            Personal Monitoring
                        </p>
                    </div>

                </div>
            </div>
        </aside>
    );
}