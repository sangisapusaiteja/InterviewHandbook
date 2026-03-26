import { htmlModules, htmlTopics } from "@/data/html";
import { cssModules, cssTopics } from "@/data/css";
import { javascriptModules, javascriptTopics } from "@/data/javascript";
import { dsaModules, dsaTopics } from "@/data/dsa";
import { pythonModules, pythonTopics } from "@/data/python";
import { postgresqlModules, postgresqlTopics } from "@/data/postgresql";
import { systemDesignModules, systemDesignTopics } from "@/data/system-design";
import {
  pythonProblemModules,
  pythonProblemTopics,
} from "@/data/pythonproblems";

type SearchableTopic = {
  id: string;
  title: string;
  slug: string;
  description: string;
  difficulty: string;
};

type SearchableModule = {
  id: string;
  title: string;
  topicIds: string[];
};

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

function buildSectionIndex({
  sectionId,
  sectionTitle,
  basePath,
  topics,
  modules,
}: {
  sectionId: string;
  sectionTitle: string;
  basePath: string;
  topics: SearchableTopic[];
  modules: SearchableModule[];
}): TopicSearchItem[] {
  const moduleByTopicId = new Map<
    string,
    {
      id: string;
      title: string;
    }
  >();

  for (const topicModule of modules) {
    for (const topicId of topicModule.topicIds) {
      moduleByTopicId.set(topicId, {
        id: topicModule.id,
        title: topicModule.title,
      });
    }
  }

  return topics.map((topic) => {
    const topicModule = moduleByTopicId.get(topic.id) ?? {
      id: `${sectionId}-other-topics`,
      title: "Other Topics",
    };
    const shortDescription = summarizeDescription(topic.description);

    return {
      id: `${sectionId}:${topic.id}`,
      topicId: topic.id,
      title: topic.title,
      slug: topic.slug,
      description: shortDescription,
      difficulty: topic.difficulty,
      href: `${basePath}/${topic.slug}`,
      sectionId,
      sectionTitle,
      moduleId: topicModule.id,
      moduleTitle: topicModule.title,
      searchText: [
        sectionTitle,
        topicModule.title,
        topic.title,
        topic.slug,
        topic.id,
        topic.difficulty,
        shortDescription,
      ].join(" "),
    };
  });
}

export const topicSearchIndex: TopicSearchItem[] = [
  ...buildSectionIndex({
    sectionId: "html",
    sectionTitle: "HTML",
    basePath: "/html",
    topics: htmlTopics,
    modules: htmlModules,
  }),
  ...buildSectionIndex({
    sectionId: "css",
    sectionTitle: "CSS",
    basePath: "/css",
    topics: cssTopics,
    modules: cssModules,
  }),
  ...buildSectionIndex({
    sectionId: "javascript",
    sectionTitle: "JavaScript",
    basePath: "/javascript",
    topics: javascriptTopics,
    modules: javascriptModules,
  }),
  ...buildSectionIndex({
    sectionId: "dsa",
    sectionTitle: "DSA using JavaScript",
    basePath: "/dsa",
    topics: dsaTopics,
    modules: dsaModules,
  }),
  ...buildSectionIndex({
    sectionId: "python",
    sectionTitle: "Python",
    basePath: "/python",
    topics: pythonTopics,
    modules: pythonModules,
  }),
  ...buildSectionIndex({
    sectionId: "postgresql",
    sectionTitle: "PostgreSQL",
    basePath: "/postgresql",
    topics: postgresqlTopics,
    modules: postgresqlModules,
  }),
  ...buildSectionIndex({
    sectionId: "system-design",
    sectionTitle: "System Design",
    basePath: "/system-design",
    topics: systemDesignTopics,
    modules: systemDesignModules,
  }),
  ...buildSectionIndex({
    sectionId: "python-problems",
    sectionTitle: "Python Practice Problems",
    basePath: "/python-problems",
    topics: pythonProblemTopics,
    modules: pythonProblemModules,
  }),
];
