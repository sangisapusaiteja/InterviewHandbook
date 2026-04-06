import { cssTopics } from "@/data/css";
import { categories } from "@/data/categories";
import { dsaTopics } from "@/data/dsa";
import { htmlTopics } from "@/data/html";
import { javascriptTopics } from "@/data/javascript";
import { postgresqlTopics } from "@/data/postgresql";
import { pythonTopics } from "@/data/python";
import { systemDesignTopics } from "@/data/system-design";
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

const sectionDefinitions: SectionDefinition[] = [
  {
    sectionSlug: "html",
    title: "HTML",
    href: "/html",
    topics: htmlTopics,
  },
  {
    sectionSlug: "css",
    title: "CSS",
    href: "/css",
    topics: cssTopics,
  },
  {
    sectionSlug: "javascript",
    title: "JavaScript",
    href: "/javascript",
    topics: javascriptTopics,
  },
  {
    sectionSlug: "dsa",
    title: "DSA",
    href: "/dsa",
    topics: dsaTopics,
  },
  {
    sectionSlug: "python",
    title: "Python",
    href: "/python",
    topics: pythonTopics,
  },
  {
    sectionSlug: "postgresql",
    title: "PostgreSQL",
    href: "/postgresql",
    topics: postgresqlTopics,
  },
  {
    sectionSlug: "system-design",
    title: "System Design",
    href: "/system-design",
    topics: systemDesignTopics,
  },
];

const topicEntries: ProgressTopicSummary[] = sectionDefinitions.flatMap(
  (section) =>
    section.topics.map((topic) => ({
      key: getTopicProgressKey(section.sectionSlug, topic.slug),
      sectionSlug: section.sectionSlug,
      topicId: topic.id,
      topicSlug: topic.slug,
      title: topic.title,
      href: `${section.href}/${topic.slug}`,
    }))
);

const topicEntryByKey = new Map(topicEntries.map((entry) => [entry.key, entry]));
const keysByLegacyTopicId = new Map<string, string[]>();

for (const entry of topicEntries) {
  const matches = keysByLegacyTopicId.get(entry.topicId) ?? [];
  matches.push(entry.key);
  keysByLegacyTopicId.set(entry.topicId, matches);
}

export function getTopicEntryByProgressKey(key: string) {
  return topicEntryByKey.get(key) ?? null;
}

export function normalizeProgressKey(candidate: string) {
  const parsedKey = parseTopicProgressKey(candidate);

  if (parsedKey) {
    const normalizedKey = getTopicProgressKey(
      parsedKey.sectionSlug,
      parsedKey.topicSlug
    );

    return topicEntryByKey.has(normalizedKey) ? normalizedKey : null;
  }

  const legacyMatches = keysByLegacyTopicId.get(candidate) ?? [];

  return legacyMatches.length === 1 ? legacyMatches[0] : null;
}

export function buildSectionProgress(
  completedTopicKeys: Iterable<string>
): ProgressSectionSummary[] {
  const completedSet = new Set(completedTopicKeys);
  const sectionDefinitionsBySlug = new Map(
    sectionDefinitions.map((section) => [section.sectionSlug, section])
  );

  return categories
    .filter((category) => category.available)
    .map((category) => {
      const section = sectionDefinitionsBySlug.get(category.id);

      return {
        sectionSlug: category.id,
        title: category.title,
        href: `/${category.id}`,
        completedCount: section
          ? section.topics.reduce((count, topic) => {
              const progressKey = getTopicProgressKey(category.id, topic.slug);
              return count + (completedSet.has(progressKey) ? 1 : 0);
            }, 0)
          : 0,
        totalCount: category.topicCount,
      };
    });
}

export function getTopicCountBySection(sectionSlug: string) {
  return (
    sectionDefinitions.find((section) => section.sectionSlug === sectionSlug)
      ?.topics.length ?? 0
  );
}
