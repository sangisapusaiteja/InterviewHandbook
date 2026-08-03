"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { postgresqlTopics } from "@/data/postgresql";

export default function PostgreSQLPage() {
  const router = useRouter();

  useEffect(() => {
    if (postgresqlTopics.length > 0) {
      router.replace(`/postgresql/${postgresqlTopics[0].slug}`);
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center h-[calc(100vh-3.5rem)]">
      <div className="animate-pulse text-muted-foreground">
        Loading PostgreSQL topics...
      </div>
    </div>
  );
}
