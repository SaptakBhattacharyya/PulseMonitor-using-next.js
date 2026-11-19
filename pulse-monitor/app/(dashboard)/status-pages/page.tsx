"use client";

import { useState } from "react";
import {
  Activity,
  Globe,
  Plus,
  ExternalLink,
  Copy,
  Check,
  ShieldCheck,
  Clock,
  ChevronRight,
  Settings2,
  Eye,
  CircleCheck,
  AlertTriangle,
  Zap,
} from "lucide-react";

type StatusPage = {
  id: number;
  name: string;
  slug: string;
  description: string;
  monitors: number;
  status: "Operational" | "Degraded" | "Outage";
  visibility: "Public" | "Private";
  updated: string;
};

const initialPages: StatusPage[] = [
  {
    id: 1,
    name: "PulseMonitor System Status",
    slug: "pulsemonitor",
    description: "Real-time status of PulseMonitor services and infrastructure.",
    monitors: 5,
    status: "Operational",
    visibility: "Public",
    updated: "2 minutes ago",
  },
  {
    id: 2,
    name: "E-Commerce Platform",
    slug: "ecommerce",
    description: "Availability and performance of our shopping platform.",
    monitors: 3,
    status: "Degraded",
    visibility: "Public",
    updated: "5 minutes ago",
  },
];

export default function StatusPages() {
  const [pages, setPages] = useState(initialPages);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  const operationalCount = pages.filter(
    (page) => page.status === "Operational"
  ).length;

  const degradedCount = pages.filter(
    (page) => page.status === "Degraded"
  ).length;

  function copyLink(page: StatusPage) {
    const link = `${window.location.origin}/status/${page.slug}`;

    navigator.clipboard.writeText(link);
    setCopiedId(page.id);

    setTimeout(() => setCopiedId(null), 2000);
  }

  function createPage() {
    const newPage: StatusPage = {
      id: Date.now(),
      name: "New Status Page",
      slug: `status-${pages.length + 1}`,
      description: "Monitor the health of your services.",
      monitors: 0,
      status: "Operational",
      visibility: "Public",
      updated: "Just now",
    };

    setPages((prev) => [newPage, ...prev]);
    setShowCreate(false);
  }

  return (
    <div className="min-h-screen bg-[#f8f7f2] px-8 py-8 lg:px-12">
      {/* HEADER */}
      <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-[#858b7e]">
            <Globe size={14} />
            Public Communication
          </div>

          <h1 className="font-serif text-4xl tracking-tight text-[#243c32]">
            Status Pages
          </h1>

          <p className="mt-2 text-sm text-[#858b7e]">
            Keep your users informed about service availability and incidents.
          </p>
        </div>

        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#365443] px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-[#294333]"
        >
          <Plus size={17} />
          Create Status Page
        </button>
      </div>

      {/* STATS */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatusStat
          title="Total Pages"
          value={pages.length.toString().padStart(2, "0")}
          subtitle="Status pages created"
          icon={<Globe size={18} />}
          color="green"
        />

        <StatusStat
          title="Operational"
          value={operationalCount.toString().padStart(2, "0")}
          subtitle="Services running normally"
          icon={<CircleCheck size={18} />}
          color="sage"
        />

        <StatusStat
          title="Degraded"
          value={degradedCount.toString().padStart(2, "0")}
          subtitle="Experiencing issues"
          icon={<AlertTriangle size={18} />}
          color="gold"
        />

        <StatusStat
          title="Subscribers"
          value="128"
          subtitle="Following status updates"
          icon={<Activity size={18} />}
          color="blue"
        />
      </div>

      {/* INFO BANNER */}
      <div className="mb-8 overflow-hidden rounded-2xl border border-[#e2e8dc] bg-[#edf2e9]">
        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-[#66816b] shadow-sm">
            <ShieldCheck size={21} />
          </div>

          <div>
            <h3 className="font-serif text-xl text-[#365443]">
              Transparency builds trust.
            </h3>
            <p className="mt-1 text-sm leading-6 text-[#7b8878]">
              Share a public status page with your customers so they can track
              service availability, uptime, and ongoing incidents.
            </p>
          </div>
        </div>
      </div>

      {/* STATUS PAGE LIST */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl text-[#30483a]">
            Your Status Pages
          </h2>
          <p className="mt-1 text-sm text-[#92978d]">
            Manage and share your service status.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {pages.map((page) => (
          <StatusPageCard
            key={page.id}
            page={page}
            copied={copiedId === page.id}
            onCopy={() => copyLink(page)}
          />
        ))}
      </div>

      {/* EMPTY STATE / CREATE CTA */}
      <div className="mt-8 rounded-2xl border border-dashed border-[#dcded4] bg-white/60 px-6 py-10 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#edf2e9] text-[#68816b]">
          <Plus size={20} />
        </div>

        <h3 className="font-serif text-xl text-[#30483a]">
          Need another status page?
        </h3>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#92978d]">
          Create separate status pages for different products, services, teams,
          or customer groups.
        </p>

        <button
          onClick={() => setShowCreate(true)}
          className="mt-5 inline-flex items-center gap-2 rounded-lg border border-[#dce2d8] bg-white px-4 py-2.5 text-sm font-medium text-[#4c6753] transition hover:bg-[#f3f6f0]"
        >
          Create another page
          <ChevronRight size={15} />
        </button>
      </div>

      {/* FOOTER */}
      <div className="mt-6 flex items-center justify-between text-xs text-[#9a9e95]">
        <span>{pages.length} status pages configured</span>

        <span className="flex items-center gap-1.5">
          <Zap size={13} />
          Status Page Management
        </span>
      </div>

      {/* CREATE MODAL */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1c2c23]/40 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-[#e8e6dd] bg-[#fffefa] p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-serif text-2xl text-[#30483a]">
                Create Status Page
              </h2>

              <button
                onClick={() => setShowCreate(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#90958c] hover:bg-[#f0f0e9]"
              >
                ×
              </button>
            </div>

            <p className="mb-5 text-sm leading-6 text-[#858b7e]">
              Create a new public page to share your service health with users.
            </p>

            <div className="space-y-3">
              <div className="rounded-xl border border-[#e7e6de] bg-[#fafaf7] p-3.5">
                <p className="text-xs text-[#969b92]">Page name</p>
                <p className="mt-1 text-sm font-medium text-[#536354]">
                  New Status Page
                </p>
              </div>

              <div className="rounded-xl border border-[#e7e6de] bg-[#fafaf7] p-3.5">
                <p className="text-xs text-[#969b92]">Visibility</p>
                <p className="mt-1 text-sm font-medium text-[#536354]">
                  Public
                </p>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowCreate(false)}
                className="flex-1 rounded-xl border border-[#e4e3db] px-4 py-3 text-sm font-medium text-[#687468] transition hover:bg-[#f6f6f2]"
              >
                Cancel
              </button>

              <button
                onClick={createPage}
                className="flex-1 rounded-xl bg-[#365443] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#294333]"
              >
                Create Page
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* STAT CARD */

function StatusStat({
  title,
  value,
  subtitle,
  icon,
  color,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  color: "green" | "sage" | "gold" | "blue";
}) {
  const colors = {
    green: "bg-[#eaf1e9] text-[#66816b]",
    sage: "bg-[#edf2e9] text-[#769078]",
    gold: "bg-[#f3eee3] text-[#a58a57]",
    blue: "bg-[#e9eef2] text-[#69839a]",
  };

  return (
    <div className="rounded-2xl border border-[#e8e6dd] bg-white p-5 shadow-[0_2px_10px_rgba(35,55,40,0.025)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[#858b7e]">{title}</p>
          <h3 className="mt-3 font-serif text-3xl text-[#30483a]">{value}</h3>
        </div>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${colors[color]}`}
        >
          {icon}
        </div>
      </div>

      <p className="mt-3 text-xs text-[#999e94]">{subtitle}</p>
    </div>
  );
}

/* STATUS PAGE CARD */

function StatusPageCard({
  page,
  copied,
  onCopy,
}: {
  page: StatusPage;
  copied: boolean;
  onCopy: () => void;
}) {
  const statusColor =
    page.status === "Operational"
      ? "bg-[#eaf2e9] text-[#5f8066]"
      : page.status === "Degraded"
      ? "bg-[#f5eee0] text-[#a1814c]"
      : "bg-[#f5e7e3] text-[#bd6d59]";

  return (
    <div className="group rounded-2xl border border-[#e8e6dd] bg-white p-5 transition hover:border-[#d5ddd2] hover:shadow-[0_8px_25px_rgba(35,55,40,0.04)] sm:p-6">
      {/* CARD HEADER */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#edf2e9] text-[#65816a]">
            <Globe size={19} />
          </div>

          <div>
            <h3 className="font-serif text-xl text-[#30483a]">{page.name}</h3>

            <p className="mt-1 text-sm text-[#92978d]">{page.description}</p>
          </div>
        </div>

        <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#e8e6dd] text-[#90958c] transition hover:bg-[#f5f5f0]">
          <Settings2 size={16} />
        </button>
      </div>

      {/* STATUS */}
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span
          className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${statusColor}`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {page.status}
        </span>

        <span className="rounded-full border border-[#e8e6dd] bg-[#fafaf7] px-3 py-1.5 text-xs text-[#788074]">
          {page.visibility}
        </span>
      </div>

      {/* DETAILS */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-[#fafaf7] p-3.5">
          <p className="text-xs text-[#969b92]">Connected monitors</p>
          <p className="mt-1.5 text-lg font-semibold text-[#536354]">
            {page.monitors}
          </p>
        </div>

        <div className="rounded-xl bg-[#fafaf7] p-3.5">
          <p className="text-xs text-[#969b92]">Last updated</p>
          <p className="mt-1.5 text-sm font-medium text-[#536354]">
            {page.updated}
          </p>
        </div>
      </div>

      {/* LINK */}
      <div className="mt-5 rounded-xl border border-[#e8e6dd] bg-[#fafaf7] p-3">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="text-xs text-[#969b92]">Public URL</p>
            <p className="mt-1 truncate text-sm text-[#647365]">
              pulsemonitor.app/status/{page.slug}
            </p>
          </div>

          <button
            onClick={onCopy}
            className="flex shrink-0 items-center gap-1.5 rounded-lg border border-[#e2e4dc] bg-white px-3 py-2 text-xs font-medium text-[#5f7662] transition hover:bg-[#edf2e9]"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="mt-5 flex gap-3">
        <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#e5e4dc] px-4 py-2.5 text-sm font-medium text-[#657366] transition hover:bg-[#f7f7f3]">
          <Eye size={15} />
          Preview
        </button>

        <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#365443] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#294333]">
          Manage
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}
