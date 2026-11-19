import { NextRequest, NextResponse } from "next/server";
import { checkMonitor } from "@/lib/monitoring-engine";
import { z } from "zod";

export const runtime = "nodejs";

const monitorSchema = z.object({
  url: z.string().trim().url("Please provide a valid URL"),
  timeout: z.number().min(1000).max(30000).default(10000),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const validation = monitorSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid monitoring configuration",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { url, timeout } = validation.data;

    // Allow only HTTP and HTTPS
    const parsedUrl = new URL(url);

    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      return NextResponse.json(
        {
          success: false,
          message: "Only HTTP and HTTPS URLs are supported",
        },
        { status: 400 }
      );
    }

    // Perform a real website check
    const result = await checkMonitor(url, timeout);

    return NextResponse.json({
      success: true,
      monitor: {
        url,
        ...result,
      },
    });
  } catch (error) {
    console.error("Monitor check error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to perform monitoring check",
      },
      { status: 500 }
    );
  }
}
