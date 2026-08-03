"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Circle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { TopicSidebar } from "@/components/layout/TopicSidebar";
import { ConceptSection } from "@/components/dsa/ConceptSection";
import { CodeEditorSection } from "@/components/dsa/CodeEditorSection";
import { PythonVisualizationSection } from "@/components/python/PythonVisualizationSection";
import { pythonTopics, pythonModules } from "@/data/python";
import { useProgress } from "@/hooks/useProgress";
import { useEffect } from "react";
import { TopicAssistant } from "@/components/assistant/TopicAssistant";
import {
  countCompletedTopicsForSection,
  getTopicProgressKey,
} from "@/lib/progress";

export default function PythonTopicPage() {
  const params = useParams();
  const topicSlug = params.topic as string;
  const {
    progress,
    isLoaded,
    toggleTopicComplete,
    setLastVisited,
    isTopicComplete,
  } = useProgress();

  const topicIndex = pythonTopics.findIndex((t) => t.slug === topicSlug);
  const topic = topicIndex >= 0 ? pythonTopics[topicIndex] : undefined;
  const prevTopic = topicIndex > 0 ? pythonTopics[topicIndex - 1] : null;
  const nextTopic =
    topicIndex < pythonTopics.length - 1 ? pythonTopics[topicIndex + 1] : null;
  const topicProgressKey = topic
    ? getTopicProgressKey("python", topic.slug)
    : null;
  const sectionCompletedCount = countCompletedTopicsForSection(
    progress.completedTopics,
    "python"
  );

  useEffect(() => {
    if (topicProgressKey) {
      setLastVisited(topicProgressKey);
    }
  }, [setLastVisited, topicProgressKey]);

  if (!topic) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-3.5rem)]">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Topic Not Found</h2>
          <p className="text-muted-foreground">
            The requested topic does not exist.
          </p>
        </div>
      </div>
    );
  }

  const completed =
    topicProgressKey && isLoaded ? isTopicComplete(topicProgressKey) : false;

  return (
    <div className="flex">
      <TopicSidebar
        topics={pythonTopics}
        completedTopics={progress.completedTopics}
        basePath="/python"
        modules={pythonModules}
        sidebarTitle="Python Topics"
        sidebarDescription="Master Python fundamentals"
      />

      <div className="flex-1 min-w-0">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge
                    variant={
                      topic.difficulty === "Beginner"
                        ? "success"
                        : topic.difficulty === "Intermediate"
                        ? "warning"
                        : "destructive"
                    }
                  >
                    {topic.difficulty}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {sectionCompletedCount}/{pythonTopics.length} topics completed
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold">
                  {topic.title}
                </h1>
                <p className="text-muted-foreground mt-1">
                  {topic.description}
                </p>
              </div>

              <Button
                variant={completed ? "default" : "outline"}
                size="sm"
                onClick={() =>
                  topicProgressKey && toggleTopicComplete(topicProgressKey)
                }
                className="shrink-0"
              >
                {completed ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 mr-1.5" />
                    Completed
                  </>
                ) : (
                  <>
                    <Circle className="h-4 w-4 mr-1.5" />
                    Mark Complete
                  </>
                )}
              </Button>
            </div>

            <Separator className="mt-4" />
          </motion.div>

          {/* Tabs */}
          <Tabs defaultValue="concept" className="space-y-6">
            <TabsList className="flex w-full justify-between p-1 sm:w-auto sm:justify-start">
              <TabsTrigger value="concept" className="flex-1 text-xs sm:flex-none sm:text-sm">
                Concept
              </TabsTrigger>
              <TabsTrigger value="visualization" className="flex-1 text-xs sm:flex-none sm:text-sm">
                Visualization
              </TabsTrigger>
              <TabsTrigger value="code" className="flex-1 text-xs sm:flex-none sm:text-sm">
                Code Editor
              </TabsTrigger>
            </TabsList>

            <TabsContent value="concept">
              <ConceptSection topic={topic} />
            </TabsContent>

            <TabsContent value="visualization">
              <PythonVisualizationSection topicSlug={topic.slug} />
            </TabsContent>

            <TabsContent value="code">
              <CodeEditorSection
                defaultCode={topic.code.defaultCode}
                language={topic.code.language}
              />
            </TabsContent>
          </Tabs>

          {/* Prev / Next Navigation */}
          <Separator className="my-8" />
          <div className="flex flex-col sm:flex-row gap-3 pb-8">
            {prevTopic ? (
              <Link href={`/python/${prevTopic.slug}`} className="flex-1">
                <Card className="h-full hover:bg-accent/50 transition-colors group cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1.5 group-hover:text-primary transition-colors">
                      <ChevronLeft className="h-3.5 w-3.5 shrink-0" />
                      <span>Previous</span>
                    </div>
                    <p className="font-semibold text-sm leading-snug">
                      {prevTopic.title}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ) : (
              <div className="flex-1 hidden sm:block" />
            )}

            {nextTopic ? (
              <Link href={`/python/${nextTopic.slug}`} className="flex-1">
                <Card className="h-full hover:bg-accent/50 transition-colors group cursor-pointer">
                  <CardContent className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1 text-xs text-muted-foreground mb-1.5 group-hover:text-primary transition-colors">
                      <span>Next</span>
                      <ChevronRight className="h-3.5 w-3.5 shrink-0" />
                    </div>
                    <p className="font-semibold text-sm leading-snug">
                      {nextTopic.title}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ) : (
              <div className="flex-1 hidden sm:block" />
            )}
          </div>
        </div>
      </div>
      <TopicAssistant topic={topic} sectionTitle="Python" />
    </div>
  );
}
