"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { dsaTopics } from "@/data/dsa";

export default function DSAPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/dsa/${dsaTopics[0].slug}`);
  }, [router]);

  return (
    <div className="flex items-center justify-center h-[calc(100vh-3.5rem)]">
      <div className="animate-pulse text-muted-foreground">
        Loading DSA topics...
      </div>
    </div>
  );
}
