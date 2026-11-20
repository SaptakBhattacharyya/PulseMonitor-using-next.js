import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Monitor from "@/models/Monitor";
import { z } from "zod";

const monitorSchema = z.object({
  name: z.string().trim().min(1, "Monitor name is required"),
  url: z.string().url("Invalid URL"),
  method: z.enum(["GET", "HEAD", "POST"]).default("GET"),
  interval: z.number().min(1).max(60),
  timeout: z.number().min(1).max(30),
});

// GET - Fetch all monitors
export async function GET() {
  try {
    await connectDB();

    const monitors = await Monitor.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      count: monitors.length,
      monitors,
    });
  } catch (error) {
    console.error("GET Monitors Error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch monitors" },
      { status: 500 }
    );
  }
}

// POST - Create a new monitor
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    const validatedData = monitorSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        {
          success: false,
          errors: validatedData.error.flatten(),
        },
        { status: 400 }
      );
    }

    const { name, url, method, interval, timeout } = validatedData.data;

    const existingMonitor = await Monitor.findOne({ url });

    if (existingMonitor) {
      return NextResponse.json(
        {
          success: false,
          message: "A monitor for this URL already exists.",
        },
        { status: 409 }
      );
    }

    const monitor = await Monitor.create({
      name,
      url,
      method,
      interval,
      timeout,
      status: "Pending",
      uptime: 100,
      response: 0,
      statusCode: null,
      isActive: true,
      lastChecked: null,
      nextCheck: new Date(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Monitor created successfully",
        monitor,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST Monitor Error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to create monitor" },
      { status: 500 }
    );
  }
}
