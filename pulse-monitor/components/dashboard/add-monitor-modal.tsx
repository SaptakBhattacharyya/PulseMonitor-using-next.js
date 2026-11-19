"use client";

import { useEffect, useState } from "react";
import { X, Globe, Loader2, CheckCircle2 } from "lucide-react";
import type { Monitor } from "@/lib/monitor-data";

type AddMonitorModalProps = {
  open: boolean;
  onClose: () => void;
  onAdd: (monitor: Monitor) => void;
  monitorToEdit?: Monitor | null;
};

export default function AddMonitorModal({
  open,
  onClose,
  onAdd,
  monitorToEdit,
}: AddMonitorModalProps) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState<"GET" | "HEAD" | "POST">("GET");
  const [interval, setIntervalValue] = useState(5);
  const [timeout, setTimeoutValue] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isEditing = Boolean(monitorToEdit);

  useEffect(() => {
    if (monitorToEdit) {
      setName(monitorToEdit.name);
      setUrl(monitorToEdit.url);
      setMethod(monitorToEdit.method);
      setIntervalValue(monitorToEdit.interval);
      setTimeoutValue(monitorToEdit.timeout);
    } else {
      setName("");
      setUrl("");
      setMethod("GET");
      setIntervalValue(5);
      setTimeoutValue(10);
    }

    setError("");
  }, [monitorToEdit, open]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !url.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    let formattedUrl = url.trim();

    if (!/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = `https://${formattedUrl}`;
    }

    try {
      new URL(formattedUrl);
    } catch {
      setError("Please enter a valid URL.");
      return;
    }

    setLoading(true);

    try {
      // Perform an actual URL check
      const response = await fetch("/api/monitors/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: formattedUrl,
          timeout: timeout * 1000,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to check website.");
      }

      const result = data.monitor;

      const monitor: Monitor = {
        id: monitorToEdit?.id || crypto.randomUUID(),
        name: name.trim(),
        url: formattedUrl,
        method,
        interval,
        timeout,
        status: result.status,
        uptime: monitorToEdit?.uptime || "100.00%",
        response: `${result.responseTime} ms`,
        checked: "Just now",
      };

      onAdd(monitor);
      onClose();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to check the website. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-[#fffefa] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#e9eae3] px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#edf3ed] p-2 text-[#42654f]">
              <Globe size={19} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#304438]">
                {isEditing ? "Edit Monitor" : "Add New Monitor"}
              </h2>
              <p className="text-xs text-[#929a91]">
                Configure your endpoint monitoring
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-lg p-2 text-[#90988f] transition hover:bg-[#f0f1eb]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          {/* Monitor name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#45564a]">
              Monitor Name
            </label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. My Portfolio"
              disabled={loading}
              className="w-full rounded-xl border border-[#e4e6de] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#65836d]"
            />
          </div>

          {/* URL */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#45564a]">
              Website URL
            </label>

            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              disabled={loading}
              className="w-full rounded-xl border border-[#e4e6de] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#65836d]"
            />
          </div>

          {/* Method */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#45564a]">
              HTTP Method
            </label>

            <select
              value={method}
              onChange={(e) =>
                setMethod(e.target.value as "GET" | "HEAD" | "POST")
              }
              disabled={loading}
              className="w-full rounded-xl border border-[#e4e6de] bg-white px-4 py-3 text-sm outline-none focus:border-[#65836d]"
            >
              <option value="GET">GET</option>
              <option value="HEAD">HEAD</option>
              <option value="POST">POST</option>
            </select>

            <p className="mt-1 text-xs text-[#9ba198]">
              The current monitoring engine checks using GET requests.
            </p>
          </div>

          {/* Interval & Timeout */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#45564a]">
                Check Interval
              </label>

              <select
                value={interval}
                onChange={(e) => setIntervalValue(Number(e.target.value))}
                disabled={loading}
                className="w-full rounded-xl border border-[#e4e6de] bg-white px-4 py-3 text-sm outline-none focus:border-[#65836d]"
              >
                <option value={1}>1 minute</option>
                <option value={5}>5 minutes</option>
                <option value={10}>10 minutes</option>
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#45564a]">
                Timeout
              </label>

              <select
                value={timeout}
                onChange={(e) => setTimeoutValue(Number(e.target.value))}
                disabled={loading}
                className="w-full rounded-xl border border-[#e4e6de] bg-white px-4 py-3 text-sm outline-none focus:border-[#65836d]"
              >
                <option value={5}>5 seconds</option>
                <option value={10}>10 seconds</option>
                <option value={15}>15 seconds</option>
                <option value={20}>20 seconds</option>
                <option value={30}>30 seconds</option>
              </select>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-xl border border-[#f0d4d0] bg-[#fff1ef] px-4 py-3 text-sm text-[#bd6259]">
              {error}
            </div>
          )}

          {/* Info */}
          <div className="rounded-xl bg-[#f1f4ef] p-4">
            <div className="flex gap-2">
              <CheckCircle2 size={17} className="mt-0.5 text-[#5c8768]" />

              <div>
                <p className="text-sm font-medium text-[#48604e]">
                  Real-time initial check
                </p>

                <p className="mt-1 text-xs leading-5 text-[#879187]">
                  Your website will be checked immediately when you add it. Its
                  response time and availability will be recorded.
                </p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-xl border border-[#e4e6de] px-5 py-3 text-sm font-medium text-[#647166] transition hover:bg-[#f5f5f0]"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#244d3b] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#183b2c] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}

              {loading
                ? "Checking website..."
                : isEditing
                ? "Save Changes"
                : "Add Monitor"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
