import { NextRequest, NextResponse } from "next/server";
import { checkMonitor } from "@/lib/monitoring-engine";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function GET(req: NextRequest) {
  try {
    // Temporary security check
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret) {
      const authHeader = req.headers.get("authorization");

      if (authHeader !== `Bearer ${cronSecret}`) {
        return NextResponse.json(
          { success: false, message: "Unauthorized" },
          { status: 401 }
        );
      }
    }

    // Temporary test monitors
    const testMonitors = [
      {
        id: "1",
        name: "Google",
        url: "https://google.com",
      },
      {
        id: "2",
        name: "GitHub",
        url: "https://github.com",
      },
      {
        id: "3",
        name: "Example",
        url: "https://example.com",
      },
    ];

    const results = await Promise.all(
      testMonitors.map(async (monitor) => {
        const result = await checkMonitor(monitor.url);

        return {
          monitorId: monitor.id,
          name: monitor.name,
          url: monitor.url,
          ...result,
        };
      })
    );

    return NextResponse.json({
      success: true,
      checkedCount: results.length,
      checkedAt: new Date().toISOString(),
      results,
    });
  } catch (error) {
    console.error("Cron monitoring error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Scheduled monitoring failed",
      },
      { status: 500 }
    );
  }
}
