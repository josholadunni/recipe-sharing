import { NextResponse } from "next/server";
import { fetchRecipeLikes } from "../../../lib/data";

export async function GET() {
  try {
    const likes = await fetchRecipeLikes();
    return NextResponse.json(likes);
  } catch (error) {
    console.error("Couldn't fetch likes", error);
    return NextResponse.json(
      { error: "Failed to fetch likes" },
      { status: 500 }
    );
  }
}
