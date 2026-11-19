export type MonitorCheckResult = {
  status: "Operational" | "Down";
  responseTime: number;
  statusCode: number | null;
  checkedAt: string;
  error?: string;
};

export async function checkMonitor(
  url: string,
  timeout: number = 10000
): Promise<MonitorCheckResult> {
  const startTime = Date.now();

  try {
    const controller = new AbortController();

    const timeoutId = setTimeout(() => {
      controller.abort();
    }, timeout);

    const response = await fetch(url, {
      method: "GET",
      signal: controller.signal,
      cache: "no-store",
      redirect: "follow",
    });

    clearTimeout(timeoutId);

    const responseTime = Date.now() - startTime;

    return {
      status: response.ok ? "Operational" : "Down",
      responseTime,
      statusCode: response.status,
      checkedAt: new Date().toISOString(),
    };
  } catch (error) {
    return {
      status: "Down",
      responseTime: Date.now() - startTime,
      statusCode: null,
      checkedAt: new Date().toISOString(),
      error:
        error instanceof Error
          ? error.name === "AbortError"
            ? "Request timed out"
            : error.message
          : "Unable to reach endpoint",
    };
  }
}
