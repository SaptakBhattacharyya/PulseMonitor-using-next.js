"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import type { Monitor } from "@/lib/monitor-data";
export type { Monitor };

type MonitorContextType = {
  monitors: Monitor[];
  isLoaded: boolean;
  addMonitor: (monitor: Monitor) => Promise<void>;
  updateMonitor: (id: string, updates: Partial<Monitor>) => Promise<void>;
  deleteMonitor: (id: string) => Promise<void>;
};

const MonitorContext = createContext<MonitorContextType | undefined>(undefined);

export function MonitorProvider({ children }: { children: ReactNode }) {
  const [monitors, setMonitors] = useState<Monitor[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Fetch monitors from MongoDB
  useEffect(() => {
    async function fetchMonitors() {
      try {
        const response = await fetch("/api/monitors");
        const data = await response.json();

        if (data.success) {
          const formattedMonitors = data.monitors.map((monitor: any) => ({
            id: monitor._id,
            name: monitor.name,
            url: monitor.url,
            method: monitor.method,
            interval: monitor.interval,
            timeout: monitor.timeout,
            status: monitor.status,
            uptime: `${monitor.uptime.toFixed(2)}%`,
            response: `${monitor.response} ms`,
            checked: monitor.lastChecked
              ? new Date(monitor.lastChecked).toLocaleString()
              : "Never",
          }));

          setMonitors(formattedMonitors);
        }
      } catch (error) {
        console.error("Failed to fetch monitors:", error);
      } finally {
        setIsLoaded(true);
      }
    }

    fetchMonitors();
  }, []);

  // Add monitor to MongoDB
  const addMonitor = async (monitor: Monitor) => {
    const response = await fetch("/api/monitors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: monitor.name,
        url: monitor.url,
        method: monitor.method,
        interval: monitor.interval,
        timeout: monitor.timeout,
      }),
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || "Failed to add monitor");
    }

    const newMonitor = data.monitor;

    setMonitors((prev) => [
      {
        id: newMonitor._id,
        name: newMonitor.name,
        url: newMonitor.url,
        method: newMonitor.method,
        interval: newMonitor.interval,
        timeout: newMonitor.timeout,
        status: newMonitor.status,
        uptime: `${newMonitor.uptime.toFixed(2)}%`,
        response: `${newMonitor.response} ms`,
        checked: newMonitor.lastChecked
          ? new Date(newMonitor.lastChecked).toLocaleString()
          : "Never",
      },
      ...prev,
    ]);
  };

  // Update monitor in MongoDB
  const updateMonitor = async (id: string, updates: Partial<Monitor>) => {
    const response = await fetch(`/api/monitors/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || "Failed to update monitor");
    }

    const updatedMonitor = data.monitor;

    setMonitors((prev) =>
      prev.map((monitor) =>
        monitor.id === id
          ? {
              ...monitor,
              name: updatedMonitor.name,
              url: updatedMonitor.url,
              method: updatedMonitor.method,
              interval: updatedMonitor.interval,
              timeout: updatedMonitor.timeout,
              status: updatedMonitor.status,
              uptime: `${updatedMonitor.uptime.toFixed(2)}%`,
              response: `${updatedMonitor.response} ms`,
            }
          : monitor
      )
    );
  };

  // Delete monitor from MongoDB
  const deleteMonitor = async (id: string) => {
    const response = await fetch(`/api/monitors/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || "Failed to delete monitor");
    }

    setMonitors((prev) => prev.filter((monitor) => monitor.id !== id));
  };

  return (
    <MonitorContext.Provider
      value={{
        monitors,
        isLoaded,
        addMonitor,
        updateMonitor,
        deleteMonitor,
      }}
    >
      {children}
    </MonitorContext.Provider>
  );
}

export function useMonitors() {
  const context = useContext(MonitorContext);

  if (!context) {
    throw new Error("useMonitors must be used inside MonitorProvider");
  }

  return context;
}
