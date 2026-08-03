"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { reactTopics } from "@/data/react";

export default function ReactPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/react/${reactTopics[0].slug}`);
  }, [router]);

  return (
    <div className="flex items-center justify-center h-[calc(100vh-3.5rem)]">
      <div className="animate-pulse text-muted-foreground">
        Loading React topics...
      </div>
    </div>
  );
}
