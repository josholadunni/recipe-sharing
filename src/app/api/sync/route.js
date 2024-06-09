import { syncModels } from "@/app/lib/models";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await syncModels();
    console.log("Syncing model");
    return NextResponse.json({ message: "Database synchronized!" });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error synchronizing database",
        error,
      },
      { status: 500 }
    );
  }
}
