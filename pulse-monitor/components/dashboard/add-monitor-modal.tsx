"use client";

import { useState, useEffect } from "react";
import { X, Globe, Loader2, AlertCircle } from "lucide-react";
import type { Monitor } from "@/lib/monitor-data";

type AddMonitorModalProps = {
  open: boolean;
  onClose: () => void;
  onAdd: (monitor: Monitor) => Promise<void>;
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
  const [timeout, setTimeoutValue] = useState(30);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
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
        setTimeoutValue(30);
      }
      setError("");
    }
  }, [open, monitorToEdit]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Monitor name is required.");
      return;
    }

    let formattedUrl = url.trim();

    if (!formattedUrl.startsWith("http://") && !formattedUrl.startsWith("https://")) {
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
      // Check website availability
      const checkResponse = await fetch("/api/monitors/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: formattedUrl,
          timeout: timeout * 1000,
        }),
      });

      const checkData = await checkResponse.json();

      if (!checkResponse.ok || !checkData.success) {
        throw new Error(checkData.message || "Website check failed.");
      }

      const result = checkData.monitor;

      // Prepare monitor
      const newMonitor: Monitor = {
        id: monitorToEdit?.id || "",
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

      // Save to MongoDB through context
      await onAdd(newMonitor);

      onClose();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while creating the monitor."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-2xl bg-[#fffdf7] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#e7e7df] px-6 py-5">
          <div>
            <h2 className="text-xl font-semibold text-[#263b32]">
              {monitorToEdit ? "Edit Monitor" : "Add New Monitor"}
            </h2>
            <p className="mt-1 text-sm text-[#969b92]">
              {monitorToEdit
                ? "Update your endpoint monitoring settings"
                : "Track your website's availability"}
            </p>
          </div>

          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-lg p-2 text-[#72776f] transition hover:bg-[#f0f0e8]"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#35483d]">
              Monitor Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Website"
              className="w-full rounded-xl border border-[#dedfd6] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#718b75]"
            />
          </div>

          {/* URL */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#35483d]">
              Website URL
            </label>

            <div className="relative">
              <Globe
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#969b92]"
              />

              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full rounded-xl border border-[#dedfd6] bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#718b75]"
              />
            </div>
          </div>

          {/* Method */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#35483d]">
              HTTP Method
            </label>

            <select
              value={method}
              onChange={(e) =>
                setMethod(e.target.value as "GET" | "HEAD" | "POST")
              }
              className="w-full rounded-xl border border-[#dedfd6] bg-white px-4 py-3 text-sm outline-none focus:border-[#718b75]"
            >
              <option value="GET">GET</option>
              <option value="HEAD">HEAD</option>
              <option value="POST">POST</option>
            </select>

            <p className="mt-1 text-xs text-[#969b92]">
              Website availability is currently checked using GET requests.
            </p>
          </div>

          {/* Interval */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#35483d]">
              Check Interval
            </label>

            <select
              value={interval}
              onChange={(e) => setIntervalValue(Number(e.target.value))}
              className="w-full rounded-xl border border-[#dedfd6] bg-white px-4 py-3 text-sm outline-none focus:border-[#718b75]"
            >
              <option value={1}>Every 1 minute</option>
              <option value={5}>Every 5 minutes</option>
              <option value={10}>Every 10 minutes</option>
              <option value={15}>Every 15 minutes</option>
              <option value={30}>Every 30 minutes</option>
              <option value={60}>Every 60 minutes</option>
            </select>
          </div>

          {/* Timeout */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#35483d]">
              Timeout
            </label>

            <select
              value={timeout}
              onChange={(e) => setTimeoutValue(Number(e.target.value))}
              className="w-full rounded-xl border border-[#dedfd6] bg-white px-4 py-3 text-sm outline-none focus:border-[#718b75]"
            >
              <option value={5}>5 seconds</option>
              <option value={10}>10 seconds</option>
              <option value={15}>15 seconds</option>
              <option value={20}>20 seconds</option>
              <option value={30}>30 seconds</option>
            </select>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              <AlertCircle size={18} className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 rounded-xl border border-[#dedfd6] px-4 py-3 text-sm font-medium text-[#35483d] transition hover:bg-[#f3f3eb]"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#35483d] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#263b32] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={17} className="animate-spin" />
                  Checking...
                </>
              ) : monitorToEdit ? (
                "Save Changes"
              ) : (
                "Add Monitor"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
