import { NextRequest, NextResponse } from "next/server";
import { checkAndSaveMonitor } from "@/lib/monitor-service";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const result = await checkAndSaveMonitor(id);

    return NextResponse.json(
      {
        success: true,
        message: "Monitor checked successfully",
        result,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Monitor check failed:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to check monitor",
      },
      { status: 500 }
    );
  }
}
