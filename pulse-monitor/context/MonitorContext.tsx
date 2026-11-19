"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import type { Monitor } from "@/lib/monitor-data";

type MonitorContextType = {
  monitors: Monitor[];
  addMonitor: (monitor: Monitor) => void;
  updateMonitor: (monitor: Monitor) => void;
  deleteMonitor: (id: string) => void;
};

const MonitorContext = createContext<MonitorContextType | undefined>(undefined);

const STORAGE_KEY = "pulse-monitor-monitors";

export function MonitorProvider({ children }: { children: ReactNode }) {
  const [monitors, setMonitors] = useState<Monitor[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved monitors when the app starts
  useEffect(() => {
    try {
      const savedMonitors = localStorage.getItem(STORAGE_KEY);

      if (savedMonitors) {
        setMonitors(JSON.parse(savedMonitors));
      } else {
        setMonitors([]);
      }
    } catch (error) {
      console.error("Failed to load monitors:", error);
      setMonitors([]);
    }

    setIsLoaded(true);
  }, []);

  // Save monitors whenever they change
  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(monitors));
  }, [monitors, isLoaded]);

  // Add a new monitor
  const addMonitor = (monitor: Monitor) => {
    setMonitors((prev) => [monitor, ...prev]);
  };

  // Update an existing monitor
  const updateMonitor = (monitor: Monitor) => {
    setMonitors((prev) =>
      prev.map((item) => (item.id === monitor.id ? monitor : item))
    );
  };

  // Delete a monitor
  const deleteMonitor = (id: string) => {
    setMonitors((prev) => prev.filter((monitor) => monitor.id !== id));
  };

  return (
    <MonitorContext.Provider
      value={{
        monitors,
        addMonitor,
        updateMonitor,
        deleteMonitor,
      }}
    >
      {children}
    </MonitorContext.Provider>
  );
}

// Custom hook
export function useMonitors() {
  const context = useContext(MonitorContext);

  if (!context) {
    throw new Error("useMonitors must be used inside MonitorProvider");
  }

  return context;
}
