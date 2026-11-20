import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Monitor from "@/models/Monitor";
import { z } from "zod";
import mongoose from "mongoose";

const updateMonitorSchema = z.object({
  name: z.string().trim().min(1).optional(),
  url: z.string().url().optional(),
  method: z.enum(["GET", "HEAD", "POST"]).optional(),
  interval: z.number().min(1).max(60).optional(),
  timeout: z.number().min(1).max(30).optional(),
  isActive: z.boolean().optional(),
});

// PATCH - Update monitor
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid monitor ID" },
        { status: 400 }
      );
    }

    const body = await request.json();

    const validatedData = updateMonitorSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        { success: false, errors: validatedData.error.flatten() },
        { status: 400 }
      );
    }

    const monitor = await Monitor.findByIdAndUpdate(
      id,
      { $set: validatedData.data },
      { new: true, runValidators: true }
    );

    if (!monitor) {
      return NextResponse.json(
        { success: false, message: "Monitor not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Monitor updated successfully",
      monitor,
    });
  } catch (error) {
    console.error("PATCH Monitor Error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to update monitor" },
      { status: 500 }
    );
  }
}

// DELETE - Delete monitor
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid monitor ID" },
        { status: 400 }
      );
    }

    const monitor = await Monitor.findByIdAndDelete(id);

    if (!monitor) {
      return NextResponse.json(
        { success: false, message: "Monitor not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Monitor deleted successfully",
    });
  } catch (error) {
    console.error("DELETE Monitor Error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to delete monitor" },
      { status: 500 }
    );
  }
}
