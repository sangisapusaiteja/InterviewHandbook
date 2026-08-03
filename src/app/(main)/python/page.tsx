"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { pythonTopics } from "@/data/python";

export default function PythonPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/python/${pythonTopics[0].slug}`);
  }, [router]);

  return (
    <div className="flex items-center justify-center h-[calc(100vh-3.5rem)]">
      <div className="animate-pulse text-muted-foreground">
        Loading Python topics...
      </div>
    </div>
  );
}
