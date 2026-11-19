"use client";

import { useState } from "react";
import { X, Globe, Plus, Loader2 } from "lucide-react";
import type { Monitor } from "@/lib/monitor-data";

type AddMonitorModalProps = {
  open: boolean;
  onClose: () => void;
  onAdd: (monitor: Monitor) => void;
};

export default function AddMonitorModal({
  open,
  onClose,
  onAdd,
}: AddMonitorModalProps) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState<Monitor["method"]>("GET");
  const [interval, setIntervalValue] = useState(5);
  const [timeout, setTimeoutValue] = useState(30);
  const [error, setError] = useState("");

  if (!open) return null;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const trimmedName = name.trim();
    const trimmedUrl = url.trim();

    if (!trimmedName || !trimmedUrl) {
      setError("Please fill in all required fields.");
      return;
    }

    let parsedUrl: URL;

    try {
      parsedUrl = new URL(
        /^https?:\/\//i.test(trimmedUrl)
          ? trimmedUrl
          : `https://${trimmedUrl}`
      );
    } catch {
      setError("Please enter a valid website URL.");
      return;
    }

    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      setError("Only HTTP and HTTPS URLs are supported.");
      return;
    }

    const newMonitor: Monitor = {
      id: crypto.randomUUID(),
      name: trimmedName,
      url: parsedUrl.href,
      method,
      interval,
      timeout,
      status: "Pending",
      uptime: "—",
      response: "—",
      checked: "Not checked yet",
    };

    onAdd(newMonitor);

    setName("");
    setUrl("");
    setMethod("GET");
    setIntervalValue(5);
    setTimeoutValue(30);
    setError("");
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#142d25]/50 p-4 backdrop-blur-sm">

      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-[#e8e5dc] bg-[#faf8f2] shadow-2xl">

        {/* Header */}

        <div className="flex items-start justify-between border-b border-[#e8e5dc] px-6 py-5">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-[#e8f0e8] p-3 text-[#397b61]">
              <Globe size={22} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#163d32]">
                Add New Monitor
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Start tracking a website or API
              </p>
            </div>

          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-white hover:text-slate-700"
          >
            <X size={20} />
          </button>

        </div>

        {/* Form */}

        <form onSubmit={handleSubmit} className="space-y-5 p-6">

          {/* Monitor Name */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#163d32]">
              Monitor Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. My Portfolio"
              className="w-full rounded-xl border border-[#e5e2d9] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#397b61] focus:ring-2 focus:ring-[#397b61]/10"
            />
          </div>

          {/* URL */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#163d32]">
              Website URL
            </label>

            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full rounded-xl border border-[#e5e2d9] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#397b61] focus:ring-2 focus:ring-[#397b61]/10"
            />

            <p className="mt-1.5 text-xs text-slate-400">
              Enter the website or API endpoint you want to monitor.
            </p>
          </div>

          {/* Method */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#163d32]">
              HTTP Method
            </label>

            <select
              value={method}
              onChange={(e) =>
                setMethod(e.target.value as Monitor["method"])
              }
              className="w-full rounded-xl border border-[#e5e2d9] bg-white px-4 py-3 text-sm outline-none focus:border-[#397b61]"
            >
              <option value="GET">GET</option>
              <option value="HEAD">HEAD</option>
              <option value="POST">POST</option>
            </select>
          </div>

          {/* Interval + Timeout */}

          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#163d32]">
                Check Interval
              </label>

              <select
                value={interval}
                onChange={(e) => setIntervalValue(Number(e.target.value))}
                className="w-full rounded-xl border border-[#e5e2d9] bg-white px-4 py-3 text-sm outline-none focus:border-[#397b61]"
              >
                <option value={1}>Every 1 minute</option>
                <option value={5}>Every 5 minutes</option>
                <option value={10}>Every 10 minutes</option>
                <option value={15}>Every 15 minutes</option>
                <option value={30}>Every 30 minutes</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#163d32]">
                Timeout
              </label>

              <select
                value={timeout}
                onChange={(e) => setTimeoutValue(Number(e.target.value))}
                className="w-full rounded-xl border border-[#e5e2d9] bg-white px-4 py-3 text-sm outline-none focus:border-[#397b61]"
              >
                <option value={5}>5 seconds</option>
                <option value={10}>10 seconds</option>
                <option value={15}>15 seconds</option>
                <option value={30}>30 seconds</option>
              </select>
            </div>

          </div>

          {/* Error */}

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Footer */}

          <div className="flex justify-end gap-3 border-t border-[#e8e5dc] pt-5">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[#e5e2d9] bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-[#163d32] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#285c49]"
            >
              <Plus size={17} />
              Add Monitor
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

