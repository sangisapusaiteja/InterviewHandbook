"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { htmlTopics } from "@/data/html";

export default function HTMLPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/html/${htmlTopics[0].slug}`);
  }, [router]);

  return (
    <div className="flex items-center justify-center h-[calc(100vh-3.5rem)]">
      <div className="animate-pulse text-muted-foreground">
        Loading HTML topics...
      </div>
    </div>
  );
}
