import { getCategories, getTopicsByCategory } from "@/lib/api/topics";
import { getTopicProgressKey, parseTopicProgressKey } from "@/lib/progress";
import type { ProgressSectionSummary, ProgressTopicSummary } from "@/types/topic";

type TopicLike = {
  id: string;
  slug: string;
  title: string;
};

type SectionDefinition = {
  sectionSlug: string;
  title: string;
  href: string;
  topics: TopicLike[];
};

async function buildSectionDefinitions(): Promise<SectionDefinition[]> {
  const categories = await getCategories();
  const available = categories.filter((c) => c.available);

  const definitions = await Promise.all(
    available.map(async (category) => {
      const topics = await getTopicsByCategory(category.id);
      return {
        sectionSlug: category.id,
        title: category.title,
        href: `/${category.id}`,
        topics: topics.map((t) => ({
          id: t.id,
          slug: t.slug,
          title: t.title,
        })),
      };
    })
  );

  return definitions;
}

export async function getTopicEntryByProgressKey(key: string) {
  const parsed = parseTopicProgressKey(key);
  if (!parsed) return null;

  const definitions = await buildSectionDefinitions();
  const section = definitions.find((s) => s.sectionSlug === parsed.sectionSlug);
  if (!section) return null;

  const topic = section.topics.find((t) => t.slug === parsed.topicSlug);
  if (!topic) return null;

  return {
    key: getTopicProgressKey(section.sectionSlug, topic.slug),
    sectionSlug: section.sectionSlug,
    topicId: topic.id,
    topicSlug: topic.slug,
    title: topic.title,
    href: `${section.href}/${topic.slug}`,
  } satisfies ProgressTopicSummary;
}

export async function normalizeProgressKey(candidate: string) {
  const parsedKey = parseTopicProgressKey(candidate);

  if (parsedKey) {
    const normalizedKey = getTopicProgressKey(
      parsedKey.sectionSlug,
      parsedKey.topicSlug
    );
    const entry = await getTopicEntryByProgressKey(normalizedKey);
    return entry ? normalizedKey : null;
  }

  return null;
}

export async function buildSectionProgress(
  completedTopicKeys: Iterable<string>
): Promise<ProgressSectionSummary[]> {
  const completedSet = new Set(completedTopicKeys);
  const definitions = await buildSectionDefinitions();

  return definitions.map((section) => ({
    sectionSlug: section.sectionSlug,
    title: section.title,
    href: section.href,
    completedCount: section.topics.reduce((count, topic) => {
      const progressKey = getTopicProgressKey(section.sectionSlug, topic.slug);
      return count + (completedSet.has(progressKey) ? 1 : 0);
    }, 0),
    totalCount: section.topics.length,
  }));
}

export async function getTopicCountBySection(sectionSlug: string) {
  const definitions = await buildSectionDefinitions();
  return (
    definitions.find((section) => section.sectionSlug === sectionSlug)?.topics
      .length ?? 0
  );
}
