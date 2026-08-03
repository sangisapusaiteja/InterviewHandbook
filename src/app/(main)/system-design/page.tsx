"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { systemDesignTopics } from "@/data/system-design";

export default function SystemDesignPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/system-design/${systemDesignTopics[0].slug}`);
  }, [router]);

  return (
    <div className="flex items-center justify-center h-[calc(100vh-3.5rem)]">
      <div className="animate-pulse text-muted-foreground">
        Loading System Design topics...
      </div>
    </div>
  );
}
