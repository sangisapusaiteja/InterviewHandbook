import { NextResponse } from "next/server";
import { getCategories } from "@/lib/api/topics";

export async function GET() {
  try {
    const categories = await getCategories();
    return NextResponse.json({ categories });
  } catch {
    return NextResponse.json(
      { error: "Failed to load categories." },
      { status: 500 }
    );
  }
}
