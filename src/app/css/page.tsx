"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { cssTopics } from "@/data/css";

export default function CSSPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/css/${cssTopics[0].slug}`);
  }, [router]);

  return (
    <div className="flex items-center justify-center h-[calc(100vh-3.5rem)]">
      <div className="animate-pulse text-muted-foreground">
        Loading CSS topics...
      </div>
    </div>
  );
}
