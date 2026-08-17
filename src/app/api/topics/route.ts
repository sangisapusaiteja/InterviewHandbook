import { NextResponse } from "next/server";
import { getTopicsByCategory, getModulesByCategory } from "@/lib/api/topics";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get("categoryId");

  if (!categoryId) {
    return NextResponse.json(
      { error: "Missing categoryId." },
      { status: 400 }
    );
  }

  try {
    const [topics, modules] = await Promise.all([
      getTopicsByCategory(categoryId),
      getModulesByCategory(categoryId),
    ]);
    return NextResponse.json({ topics, modules });
  } catch {
    return NextResponse.json(
      { error: "Failed to load topics." },
      { status: 500 }
    );
  }
}
