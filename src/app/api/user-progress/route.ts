import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import {
  buildSectionProgress,
  getTopicEntryByProgressKey,
  normalizeProgressKey,
} from "@/lib/topic-registry.server";
import { supabaseAdminRequest, supabaseServerEnabled } from "@/lib/supabase-rest";
import type {
  ProgressSectionSummary,
  ProgressState,
  ProgressTopicSummary,
} from "@/types/topic";

type ProgressRow = {
  clerk_user_id: string;
  section_slug: string;
  topic_slug: string;
  topic_id: string;
  completed: boolean;
  completed_at: string | null;
  last_opened_at: string | null;
  created_at: string;
  updated_at: string;
};

type ProgressResponseBody = {
  progress: ProgressState;
  sectionProgress: ProgressSectionSummary[];
  lastVisitedTopic: ProgressTopicSummary | null;
};

type SyncProgressPayload = {
  completedTopics?: string[];
  lastVisited?: string;
};

type ProgressMutationBody =
  | {
      action: "setCompleted";
      topicKey: string;
      completed: boolean;
    }
  | {
      action: "setLastVisited";
      topicKey: string;
    }
  | {
      action: "resetProgress";
    }
  | {
      action: "syncFromClient";
      progress?: SyncProgressPayload;
    };

function buildProgressResponse(rows: ProgressRow[]): ProgressResponseBody {
  const completedTopicKeys = rows
    .filter((row) => row.completed)
    .map((row) => `${row.section_slug}:${row.topic_slug}`);
  const activityLog = rows
    .flatMap((row) => [row.completed_at, row.last_opened_at])
    .filter((value): value is string => Boolean(value))
    .sort((left, right) => left.localeCompare(right));

  const lastVisitedRow = rows
    .filter((row) => row.last_opened_at)
    .sort((left, right) =>
      (right.last_opened_at ?? "").localeCompare(left.last_opened_at ?? "")
    )[0];

  const lastVisitedTopic = lastVisitedRow
    ? getTopicEntryByProgressKey(`${lastVisitedRow.section_slug}:${lastVisitedRow.topic_slug}`)
    : null;

  return {
    progress: {
      completedTopics: completedTopicKeys,
      lastVisited: lastVisitedTopic?.key,
      activityLog,
    },
    sectionProgress: buildSectionProgress(completedTopicKeys),
    lastVisitedTopic,
  };
}

async function getUserProgressRows(userId: string) {
  return supabaseAdminRequest<ProgressRow[]>("user_topic_progress", {
    query: {
      select:
        "clerk_user_id,section_slug,topic_slug,topic_id,completed,completed_at,last_opened_at,created_at,updated_at",
      clerk_user_id: `eq.${userId}`,
      order: "updated_at.desc",
    },
  });
}

async function upsertProgressRow(row: Partial<ProgressRow> & Pick<ProgressRow, "clerk_user_id" | "section_slug" | "topic_slug" | "topic_id">) {
  return supabaseAdminRequest<ProgressRow[]>("user_topic_progress", {
    method: "POST",
    prefer: "resolution=merge-duplicates,return=representation",
    body: [
      {
        ...row,
        updated_at: new Date().toISOString(),
      },
    ],
  });
}

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
        { error: "Sign in to manage progress." },
        { status: 401 }
      ),
    };
  }

  return {
    userId,
    response: undefined,
  };
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
    const rows = await getUserProgressRows(userId);
    return NextResponse.json(buildProgressResponse(rows));
  } catch {
    return NextResponse.json(
      { error: "Failed to load user progress." },
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

  let body: ProgressMutationBody;

  try {
    body = (await request.json()) as ProgressMutationBody;
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  try {
    if (body.action === "resetProgress") {
      await supabaseAdminRequest("user_topic_progress", {
        method: "DELETE",
        query: {
          clerk_user_id: `eq.${userId}`,
        },
      });
    }

    if (body.action === "setCompleted" || body.action === "setLastVisited") {
      const topicEntry = getTopicEntryByProgressKey(body.topicKey);

      if (!topicEntry) {
        return NextResponse.json(
          { error: "Unknown topic key." },
          { status: 400 }
        );
      }

      const now = new Date().toISOString();

      await upsertProgressRow({
        clerk_user_id: userId,
        section_slug: topicEntry.sectionSlug,
        topic_slug: topicEntry.topicSlug,
        topic_id: topicEntry.topicId,
        ...(body.action === "setCompleted"
          ? {
              completed: body.completed,
              completed_at: body.completed ? now : null,
            }
          : {
              last_opened_at: now,
            }),
      });
    }

    if (body.action === "syncFromClient") {
      const normalizedCompletedTopics = Array.from(
        new Set(
          (body.progress?.completedTopics ?? [])
            .map((topicKey) => normalizeProgressKey(topicKey))
            .filter((topicKey): topicKey is string => Boolean(topicKey))
        )
      );

      const normalizedLastVisited = body.progress?.lastVisited
        ? normalizeProgressKey(body.progress.lastVisited)
        : null;
      const now = new Date().toISOString();

      for (const topicKey of normalizedCompletedTopics) {
        const topicEntry = getTopicEntryByProgressKey(topicKey);

        if (!topicEntry) {
          continue;
        }

        await upsertProgressRow({
          clerk_user_id: userId,
          section_slug: topicEntry.sectionSlug,
          topic_slug: topicEntry.topicSlug,
          topic_id: topicEntry.topicId,
          completed: true,
          completed_at: now,
        });
      }

      if (normalizedLastVisited) {
        const topicEntry = getTopicEntryByProgressKey(normalizedLastVisited);

        if (topicEntry) {
          await upsertProgressRow({
            clerk_user_id: userId,
            section_slug: topicEntry.sectionSlug,
            topic_slug: topicEntry.topicSlug,
            topic_id: topicEntry.topicId,
            last_opened_at: now,
          });
        }
      }
    }

    const rows = await getUserProgressRows(userId);
    return NextResponse.json(buildProgressResponse(rows));
  } catch {
    return NextResponse.json(
      { error: "Failed to update user progress." },
      { status: 500 }
    );
  }
}
