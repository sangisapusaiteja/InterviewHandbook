"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { pythonProblemTopics } from "@/data/pythonproblems";

export default function PythonProblemsPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/python-problems/${pythonProblemTopics[0].slug}`);
  }, [router]);

  return (
    <div className="flex items-center justify-center h-[calc(100vh-3.5rem)]">
      <div className="animate-pulse text-muted-foreground">
        Loading Python Practice Problems...
      </div>
    </div>
  );
}
