import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { isSupportedThemePreference } from "@/lib/progress";
import { supabaseAdminRequest, supabaseServerEnabled } from "@/lib/supabase-rest";
import type { AppThemePreference } from "@/types/topic";

type PreferenceRow = {
  clerk_user_id: string;
  app_theme: AppThemePreference;
  pinned_topic_hrefs: string[];
  recent_queries: string[];
  recent_topic_hrefs: string[];
  assistant_state: Record<string, unknown>;
  created_at: string;
  updated_at: string;
};

function requireConfiguredSupabase() {
  if (!supabaseServerEnabled) {
    return NextResponse.json(
      {
        error:
          "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
      },
      { status: 503 }
    );
  }

  return undefined;
}

async function requireUser() {
  const { userId } = await auth();

  if (!userId) {
    return {
      userId: null,
      response: NextResponse.json(
        { error: "Sign in to manage preferences." },
        { status: 401 }
      ),
    };
  }

  return { userId, response: undefined };
}

export async function GET() {
  const configError = requireConfiguredSupabase();
  if (configError) {
    return configError;
  }

  const { userId, response } = await requireUser();
  if (response || !userId) {
    return response;
  }

  try {
    const rows = await supabaseAdminRequest<PreferenceRow[]>("user_preferences", {
      query: {
        select:
          "clerk_user_id,app_theme,pinned_topic_hrefs,recent_queries,recent_topic_hrefs,assistant_state,created_at,updated_at",
        clerk_user_id: `eq.${userId}`,
        limit: "1",
      },
    });

    return NextResponse.json({
      preferences: rows[0] ?? null,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to load user preferences." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const configError = requireConfiguredSupabase();
  if (configError) {
    return configError;
  }

  const { userId, response } = await requireUser();
  if (response || !userId) {
    return response;
  }

  let body: {
    appTheme?: string;
    pinnedTopicHrefs?: string[];
    recentQueries?: string[];
    recentTopicHrefs?: string[];
    assistantState?: Record<string, unknown>;
  };

  try {
    body = (await request.json()) as {
      appTheme?: string;
      pinnedTopicHrefs?: string[];
      recentQueries?: string[];
      recentTopicHrefs?: string[];
      assistantState?: Record<string, unknown>;
    };
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  if (
    body.appTheme !== undefined &&
    !isSupportedThemePreference(body.appTheme)
  ) {
    return NextResponse.json(
      { error: "Invalid theme preference." },
      { status: 400 }
    );
  }

  if (
    body.pinnedTopicHrefs !== undefined &&
    (!Array.isArray(body.pinnedTopicHrefs) ||
      body.pinnedTopicHrefs.some((href) => typeof href !== "string"))
  ) {
    return NextResponse.json(
      { error: "Invalid pinned topics." },
      { status: 400 }
    );
  }

  if (
    body.recentQueries !== undefined &&
    (!Array.isArray(body.recentQueries) ||
      body.recentQueries.some((entry) => typeof entry !== "string"))
  ) {
    return NextResponse.json(
      { error: "Invalid recent queries." },
      { status: 400 }
    );
  }

  if (
    body.recentTopicHrefs !== undefined &&
    (!Array.isArray(body.recentTopicHrefs) ||
      body.recentTopicHrefs.some((href) => typeof href !== "string"))
  ) {
    return NextResponse.json(
      { error: "Invalid recent topics." },
      { status: 400 }
    );
  }

  if (
    body.assistantState !== undefined &&
    (typeof body.assistantState !== "object" ||
      body.assistantState === null ||
      Array.isArray(body.assistantState))
  ) {
    return NextResponse.json(
      { error: "Invalid assistant state." },
      { status: 400 }
    );
  }

  if (
    body.appTheme === undefined &&
    body.pinnedTopicHrefs === undefined &&
    body.recentQueries === undefined &&
    body.recentTopicHrefs === undefined &&
    body.assistantState === undefined
  ) {
    return NextResponse.json(
      { error: "No preferences provided." },
      { status: 400 }
    );
  }

  try {
    const existingRows = await supabaseAdminRequest<PreferenceRow[]>("user_preferences", {
      query: {
        select:
          "clerk_user_id,app_theme,pinned_topic_hrefs,recent_queries,recent_topic_hrefs,assistant_state,created_at,updated_at",
        clerk_user_id: `eq.${userId}`,
        limit: "1",
      },
    });

    const existing = existingRows[0];
    const rows = await supabaseAdminRequest<PreferenceRow[]>("user_preferences", {
      method: "POST",
      prefer: "resolution=merge-duplicates,return=representation",
      body: [
        {
          clerk_user_id: userId,
          app_theme: body.appTheme ?? existing?.app_theme ?? "system",
          pinned_topic_hrefs:
            body.pinnedTopicHrefs ?? existing?.pinned_topic_hrefs ?? [],
          recent_queries: body.recentQueries ?? existing?.recent_queries ?? [],
          recent_topic_hrefs:
            body.recentTopicHrefs ?? existing?.recent_topic_hrefs ?? [],
          assistant_state:
            body.assistantState ?? existing?.assistant_state ?? {},
          updated_at: new Date().toISOString(),
        },
      ],
    });

    return NextResponse.json({
      preferences: rows[0] ?? null,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to save user preferences." },
      { status: 500 }
    );
  }
}
