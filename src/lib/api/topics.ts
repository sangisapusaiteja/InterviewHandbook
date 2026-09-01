import { supabaseAdminRequest } from "@/lib/supabase-rest";
import type {
  CategoryInfo,
  InterviewQuestion,
  Topic,
  TopicCodeFile,
  TopicModule,
} from "@/types/topic";

// ---------------------------------------------------------------------------
// TTL cache
// Topic content (categories, modules, topics, questions) is static and shared
// by all users, so it is safe to cache on the server for a short window. This
// avoids re-fetching the same data from Supabase on every page navigation.
// User-specific data (progress, preferences) is NOT cached here.
// ---------------------------------------------------------------------------
const CONTENT_TTL_MS = 5 * 60 * 1000; // 5 minutes

function cached<T>(load: () => Promise<T>): () => Promise<T> {
  let entry: { data: T; fetchedAt: number } | null = null;
  return async () => {
    const now = Date.now();
    if (entry && now - entry.fetchedAt < CONTENT_TTL_MS) {
      return entry.data;
    }
    const data = await load();
    entry = { data, fetchedAt: now };
    return data;
  };
}

function cachedByKey<T, A extends unknown[]>(
  load: (...args: A) => Promise<T>
): (...args: A) => Promise<T> {
  const entries = new Map<string, { data: T; fetchedAt: number }>();
  return async (...args: A) => {
    const now = Date.now();
    const key = JSON.stringify(args);
    const entry = entries.get(key);
    if (entry && now - entry.fetchedAt < CONTENT_TTL_MS) {
      return entry.data;
    }
    const data = await load(...args);
    entries.set(key, { data, fetchedAt: now });
    return data;
  };
}

// ---------------------------------------------------------------------------
// Row shapes (matching the DB schema in code-battle/db/schema.sql)
// ---------------------------------------------------------------------------

type CategoryRow = {
  id: string;
  title: string;
  icon: string;
  description: string;
  color: string;
  group: string;
  available: boolean;
  sort_order: number;
};

type ModuleRow = {
  id: string;
  category_id: string;
  level: number;
  title: string;
  difficulty: string;
  description: string;
  category: string | null;
  sort_order: number;
};

type TopicRow = {
  id: string;
  category_id: string;
  module_id: string | null;
  title: string;
  slug: string;
  icon: string;
  difficulty: string;
  description: string;
  leetcode_link: string | null;
  concept_explanation: string;
  concept_analogy: string;
  concept_key_points: string[];
  concept_time_complexity: string | null;
  concept_space_complexity: string | null;
  code_default_code: string;
  code_language: string;
  code_files: TopicCodeFile[] | null;
  sort_order: number;
};

type QuestionRow = {
  topic_id: string;
  question: string;
  difficulty: string;
  hint: string;
  sort_order: number;
};

// ---------------------------------------------------------------------------
// Section metadata (static — mirrors the categories table)
// ---------------------------------------------------------------------------

export const SECTION_DEFINITIONS: { id: string; title: string; basePath: string }[] = [
  { id: "html", title: "HTML", basePath: "/html" },
  { id: "css", title: "CSS", basePath: "/css" },
  { id: "javascript", title: "JavaScript", basePath: "/javascript" },
  { id: "dsa", title: "DSA using JavaScript", basePath: "/dsa" },
  { id: "python", title: "Python", basePath: "/python" },
  { id: "system-design", title: "System Design", basePath: "/system-design" },
  { id: "technical-questions", title: "Technical Questions", basePath: "/technical-questions" },
  { id: "react", title: "React", basePath: "/react" },
  { id: "postgresql", title: "PostgreSQL", basePath: "/postgresql" },
];

// ---------------------------------------------------------------------------
// Mappers
// ---------------------------------------------------------------------------

function mapTopic(row: TopicRow, questions: QuestionRow[]): Topic {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    icon: row.icon,
    difficulty: row.difficulty as Topic["difficulty"],
    description: row.description,
    leetcodeLink: row.leetcode_link ?? undefined,
    concept: {
      explanation: row.concept_explanation,
      realLifeAnalogy: row.concept_analogy,
      keyPoints: row.concept_key_points ?? [],
      timeComplexity: row.concept_time_complexity ?? undefined,
      spaceComplexity: row.concept_space_complexity ?? undefined,
    },
    code: {
      defaultCode: row.code_default_code,
      language: row.code_language,
      files: row.code_files ?? undefined,
    },
    interviewQuestions: questions.map((q) => ({
      question: q.question,
      difficulty: q.difficulty as InterviewQuestion["difficulty"],
      hint: q.hint,
    })),
  };
}

function mapModule(row: ModuleRow): TopicModule {
  return {
    id: row.id,
    level: row.level,
    title: row.title,
    difficulty: row.difficulty as TopicModule["difficulty"],
    description: row.description,
    topicIds: [],
    category: row.category ?? undefined,
  };
}

// ---------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------

const loadCategories = async (): Promise<CategoryInfo[]> => {
  const rows = await supabaseAdminRequest<CategoryRow[]>("ih_categories", {
    query: {
      select: "id,title,icon,description,color,group,available,sort_order",
      order: "sort_order.asc",
    },
  });

  const counts = await getTopicCountsByCategory();

  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    icon: row.icon,
    description: row.description,
    topicCount: counts.get(row.id) ?? 0,
    color: row.color,
    available: row.available,
    group: row.group,
  }));
};

export const getCategories = cached(loadCategories);

export async function getTopicCountsByCategory(): Promise<Map<string, number>> {
  const rows = await supabaseAdminRequest<{ category_id: string; count: number }[]>(
    "ih_topics",
    {
      query: {
        select: "category_id",
      },
    }
  );

  const counts = new Map<string, number>();
  for (const row of rows) {
    counts.set(row.category_id, (counts.get(row.category_id) ?? 0) + 1);
  }
  return counts;
}

const loadTopicsByCategory = async (categoryId: string): Promise<Topic[]> => {
  const topicRows = await supabaseAdminRequest<TopicRow[]>("ih_topics", {
    query: {
      select:
        "id,category_id,module_id,title,slug,icon,difficulty,description,leetcode_link,concept_explanation,concept_analogy,concept_key_points,concept_time_complexity,concept_space_complexity,code_default_code,code_language,code_files,sort_order",
      category_id: `eq.${categoryId}`,
      order: "sort_order.asc",
    },
  });

  const questionRows = await supabaseAdminRequest<QuestionRow[]>(
    "ih_interview_questions",
    {
      query: {
        select: "topic_id,question,difficulty,hint,sort_order",
        topic_id: `in.(${topicRows.map((t) => t.id).join(",")})`,
        order: "sort_order.asc",
      },
    }
  );

  const questionsByTopic = new Map<string, QuestionRow[]>();
  for (const q of questionRows) {
    const list = questionsByTopic.get(q.topic_id) ?? [];
    list.push(q);
    questionsByTopic.set(q.topic_id, list);
  }

  return topicRows.map((row) => mapTopic(row, questionsByTopic.get(row.id) ?? []));
};

export const getTopicsByCategory = cachedByKey(loadTopicsByCategory);

const loadModulesByCategory = async (
  categoryId: string
): Promise<TopicModule[]> => {
  const moduleRows = await supabaseAdminRequest<ModuleRow[]>("ih_modules", {
    query: {
      select: "id,category_id,level,title,difficulty,description,category,sort_order",
      category_id: `eq.${categoryId}`,
      order: "sort_order.asc",
    },
  });

  const topicRows = await supabaseAdminRequest<{ id: string; module_id: string | null }[]>(
    "ih_topics",
    {
      query: {
        select: "id,module_id",
        category_id: `eq.${categoryId}`,
        order: "sort_order.asc",
      },
    }
  );

  const topicIdsByModule = new Map<string, string[]>();
  for (const t of topicRows) {
    if (!t.module_id) continue;
    const list = topicIdsByModule.get(t.module_id) ?? [];
    list.push(t.id);
    topicIdsByModule.set(t.module_id, list);
  }

  return moduleRows.map((row) => ({
    ...mapModule(row),
    topicIds: topicIdsByModule.get(row.id) ?? [],
  }));
};

export const getModulesByCategory = cachedByKey(loadModulesByCategory);

export type TopicSearchItem = {
  id: string;
  topicId: string;
  title: string;
  slug: string;
  description: string;
  difficulty: string;
  href: string;
  sectionId: string;
  sectionTitle: string;
  moduleId: string;
  moduleTitle: string;
  searchText: string;
};

function summarizeDescription(description: string) {
  const normalized = description.replace(/\s+/g, " ").trim();
  if (normalized.length <= 140) {
    return normalized;
  }
  return `${normalized.slice(0, 137).trimEnd()}...`;
}

// The search index is static, shared content, so cache it to avoid
// re-fetching from Supabase on every page navigation.
const loadSearchIndex = async (): Promise<TopicSearchItem[]> => {
  const [categories, topicRows, moduleRows] = await Promise.all([
    supabaseAdminRequest<CategoryRow[]>("ih_categories", {
      query: { select: "id,title", order: "sort_order.asc" },
    }),
    supabaseAdminRequest<
      { id: string; category_id: string; module_id: string | null; title: string; slug: string; description: string; difficulty: string }[]
    >("ih_topics", {
      query: {
        select: "id,category_id,module_id,title,slug,description,difficulty",
        order: "sort_order.asc",
      },
    }),
    supabaseAdminRequest<{ id: string; title: string }[]>("ih_modules", {
      query: { select: "id,title", order: "sort_order.asc" },
    }),
  ]);

  const categoryById = new Map(categories.map((c) => [c.id, c]));
  const moduleById = new Map(moduleRows.map((m) => [m.id, m]));

  const sectionByCategoryId = new Map(
    SECTION_DEFINITIONS.map((s) => [s.id, s])
  );

  const result = topicRows.map((topic) => {
    const category = categoryById.get(topic.category_id);
    const section = sectionByCategoryId.get(topic.category_id);
    const topicModule = topic.module_id ? moduleById.get(topic.module_id) : undefined;
    const basePath = section?.basePath ?? `/${topic.category_id}`;
    const sectionTitle = section?.title ?? category?.title ?? topic.category_id;
    const moduleTitle = topicModule?.title ?? "Other Topics";
    const shortDescription = summarizeDescription(topic.description);

    return {
      id: `${topic.category_id}:${topic.id}`,
      topicId: topic.id,
      title: topic.title,
      slug: topic.slug,
      description: shortDescription,
      difficulty: topic.difficulty,
      href: `${basePath}/${topic.slug}`,
      sectionId: topic.category_id,
      sectionTitle,
      moduleId: topicModule?.id ?? `${topic.category_id}-other-topics`,
      moduleTitle,
      searchText: [
        sectionTitle,
        moduleTitle,
        topic.title,
        topic.slug,
        topic.id,
        topic.difficulty,
        shortDescription,
      ].join(" "),
    };
  });

  return result;
};
export const buildSearchIndex = cached(loadSearchIndex);

const loadTopicBySlug = async (
  categoryId: string,
  slug: string
): Promise<Topic | null> => {
  const topicRows = await supabaseAdminRequest<TopicRow[]>("ih_topics", {
    query: {
      select:
        "id,category_id,module_id,title,slug,icon,difficulty,description,leetcode_link,concept_explanation,concept_analogy,concept_key_points,concept_time_complexity,concept_space_complexity,code_default_code,code_language,code_files,sort_order",
      category_id: `eq.${categoryId}`,
      slug: `eq.${slug}`,
      limit: "1",
    },
  });

  const row = topicRows[0];
  if (!row) return null;

  const questionRows = await supabaseAdminRequest<QuestionRow[]>(
    "ih_interview_questions",
    {
      query: {
        select: "topic_id,question,difficulty,hint,sort_order",
        topic_id: `eq.${row.id}`,
        order: "sort_order.asc",
      },
    }
  );

  return mapTopic(row, questionRows);
};

export const getTopicBySlug = cachedByKey(loadTopicBySlug);
