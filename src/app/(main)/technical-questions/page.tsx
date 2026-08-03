"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { technicalTopics } from "@/data/technical";

export default function TechnicalQuestionsPage() {
  const router = useRouter();

  useEffect(() => {
    if (technicalTopics.length > 0) {
      router.replace(`/technical-questions/${technicalTopics[0].slug}`);
    }
  }, [router]);

  if (technicalTopics.length === 0) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-3.5rem)]">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Technical Questions</h2>
          <p className="text-muted-foreground">
            Questions coming soon. Check back later!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-[calc(100vh-3.5rem)]">
      <div className="animate-pulse text-muted-foreground">
        Loading technical questions...
      </div>
    </div>
  );
}
