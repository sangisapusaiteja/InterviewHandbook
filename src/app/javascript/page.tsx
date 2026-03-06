"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { javascriptTopics } from "@/data/javascript";

export default function JavaScriptPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/javascript/${javascriptTopics[0].slug}`);
  }, [router]);

  return (
    <div className="flex items-center justify-center h-[calc(100vh-3.5rem)]">
      <div className="animate-pulse text-muted-foreground">
        Loading JavaScript topics...
      </div>
    </div>
  );
}
