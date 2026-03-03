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
import { VisualizationSection } from "@/components/dsa/VisualizationSection";
import { CodeEditorSection } from "@/components/dsa/CodeEditorSection";
import { dsaTopics } from "@/data/dsa";
import { useProgress } from "@/hooks/useProgress";
import { useEffect } from "react";

export default function TopicPage() {
  const params = useParams();
  const topicSlug = params.topic as string;
  const {
    progress,
    isLoaded,
    completedCount,
    toggleTopicComplete,
    setLastVisited,
    isTopicComplete,
  } = useProgress();

  const topicIndex = dsaTopics.findIndex((t) => t.slug === topicSlug);
  const topic = topicIndex >= 0 ? dsaTopics[topicIndex] : undefined;
  const prevTopic = topicIndex > 0 ? dsaTopics[topicIndex - 1] : null;
  const nextTopic =
    topicIndex < dsaTopics.length - 1 ? dsaTopics[topicIndex + 1] : null;

  useEffect(() => {
    if (topic) {
      setLastVisited(topic.id);
    }
  }, [topic, setLastVisited]);

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

  const completed = isLoaded && isTopicComplete(topic.id);

  return (
    <div className="flex">
      <TopicSidebar
        topics={dsaTopics}
        completedTopics={progress.completedTopics}
      />

      <div className="flex-1 min-w-0">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-6">
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
                    {completedCount}/{dsaTopics.length} topics completed
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
                onClick={() => toggleTopicComplete(topic.id)}
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
            <TabsList className="w-full justify-start h-auto p-1 flex-wrap">
              <TabsTrigger value="concept" className="text-xs sm:text-sm">
                Concept
              </TabsTrigger>
              <TabsTrigger value="visualization" className="text-xs sm:text-sm">
                Visualization
              </TabsTrigger>
              <TabsTrigger value="code" className="text-xs sm:text-sm">
                Code Editor
              </TabsTrigger>
            </TabsList>

            <TabsContent value="concept">
              <ConceptSection topic={topic} />
            </TabsContent>

            <TabsContent value="visualization">
              <VisualizationSection topicSlug={topic.slug} />
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
              <Link href={`/dsa/${prevTopic.slug}`} className="flex-1">
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
              <Link href={`/dsa/${nextTopic.slug}`} className="flex-1">
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
    </div>
  );
}
