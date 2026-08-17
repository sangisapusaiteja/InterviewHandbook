import { NextResponse } from "next/server";
import { clearSessionCookie, getCurrentUser } from "@/lib/auth-server";
import { supabaseAdminRequest } from "@/lib/supabase-rest";

export async function POST() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Sign in to delete your account." }, { status: 401 });
  }

  try {
    await supabaseAdminRequest("user_topic_progress", {
      method: "DELETE",
      query: {
        user_id: `eq.${user.id}`,
      },
    });

    await supabaseAdminRequest("user_preferences", {
      method: "DELETE",
      query: {
        user_id: `eq.${user.id}`,
      },
    });

    await supabaseAdminRequest("users", {
      method: "DELETE",
      query: {
        id: `eq.${user.id}`,
      },
    });

    await clearSessionCookie();

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "We couldn't delete your account. Please try again." },
      { status: 500 }
    );
  }
}
