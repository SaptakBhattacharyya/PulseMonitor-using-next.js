import connectDB from "@/lib/mongodb";
import Monitor from "@/models/Monitor";
import MonitoringLog from "@/models/MonitoringLog";

export interface CheckResult {
  monitorId: unknown;
  name: string;
  url: string;
  status: "Operational" | "Down";
  responseTime: number;
  statusCode: number | null;
  error: string | null;
}

export async function checkAndSaveMonitor(monitorId: string) {
  await connectDB();

  const monitor = await Monitor.findById(monitorId);

  if (!monitor) {
    throw new Error("Monitor not found");
  }

  const startTime = Date.now();
  let status: "Operational" | "Down" = "Down";
  let statusCode: number | null = null;
  let error: string | null = null;

  try {
    const response = await fetch(monitor.url, {
      method: "GET",
      signal: AbortSignal.timeout(10000),
      cache: "no-store",
    });

    statusCode = response.status;

    if (response.ok) {
      status = "Operational";
    } else {
      error = `HTTP ${response.status}`;
    }
  } catch (err) {
    error = err instanceof Error ? err.message : "Request failed";
  }

  const responseTime = Date.now() - startTime;

  await MonitoringLog.create({
    monitorId: monitor._id,
    monitor: monitor._id,
    status,
    responseTime,
    statusCode,
    error,
    errorMessage: error,
    checkedAt: new Date(),
  });

  monitor.status = status;
  monitor.response = responseTime;
  monitor.responseTime = responseTime;
  monitor.statusCode = statusCode;
  monitor.lastChecked = new Date();

  await monitor.save();

  return {
    monitorId: monitor._id,
    name: monitor.name,
    url: monitor.url,
    status,
    responseTime,
    statusCode,
    error,
  };
}
