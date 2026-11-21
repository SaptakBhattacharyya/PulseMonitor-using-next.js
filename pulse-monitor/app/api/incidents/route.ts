import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Incident from "@/models/Incident";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const status = searchParams.get("status");
    const severity = searchParams.get("severity");

    const filter: Record<string, string> = {};

    if (status) {
      filter.status = status;
    }

    if (severity) {
      filter.severity = severity;
    }

    const incidents = await Incident.find(filter)
      .sort({ startedAt: -1 })
      .lean();

    return NextResponse.json(
      {
        success: true,
        count: incidents.length,
        incidents,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to fetch incidents:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch incidents",
      },
      { status: 500 }
    );
  }
}
