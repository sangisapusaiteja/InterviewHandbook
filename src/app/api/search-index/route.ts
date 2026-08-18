import { NextResponse } from "next/server";
import { buildSearchIndex } from "@/lib/api/topics";

export async function GET() {
  try {
    const searchIndex = await buildSearchIndex();
    return NextResponse.json({ searchIndex });
  } catch {
    return NextResponse.json(
      { error: "Failed to load search index." },
      { status: 500 }
    );
  }
}
