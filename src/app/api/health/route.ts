import { connectToDatabase } from "@/lib/mongodb";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDatabase();
    const mongoStatus = mongoose.connection.readyState === 1;

    return NextResponse.json({
      ok: true,
      database: "MongoDB (Mongoose)",
      connected: mongoStatus,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        ok: false,
        error: error.message || "Failed to connect to MongoDB",
      },
      { status: 500 },
    );
  }
}
