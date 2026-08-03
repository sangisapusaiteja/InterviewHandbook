"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Server, Loader2 } from "lucide-react";

export function ApiCallsVisualization() {
  const [data, setData] = useState<{ title: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
      if (!res.ok) throw new Error("HTTP " + res.status);
      const d = await res.json();
      setData(d);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Server className="h-4 w-4 text-blue-500" /> API Call Demo</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button size="sm" onClick={fetchData} disabled={loading}>
              {loading ? <Loader2 className="h-3 w-3 mr-1 animate-spin" /> : <Server className="h-3 w-3 mr-1" />}
              {loading ? "Loading..." : "Fetch Data"}
            </Button>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4 min-h-[80px]">
            {loading && <p className="text-sm text-muted-foreground animate-pulse">Loading...</p>}
            {error && <p className="text-sm text-destructive">Error: {error}</p>}
            {data && !loading && (
              <div>
                <p className="text-xs text-muted-foreground mb-1">Response:</p>
                <pre className="text-sm bg-background p-2 rounded">{JSON.stringify(data, null, 2)}</pre>
              </div>
            )}
            {!data && !loading && !error && <p className="text-sm text-muted-foreground">Click &ldquo;Fetch Data&rdquo; to make an API call</p>}
          </div>

          <div className="grid gap-2 text-xs text-muted-foreground sm:grid-cols-3">
            <div className="p-2 rounded border border-green-200 bg-green-50 dark:bg-green-900/20"><span className="font-medium text-green-600">Loading</span> — show spinner</div>
            <div className="p-2 rounded border border-red-200 bg-red-50 dark:bg-red-900/20"><span className="font-medium text-red-600">Error</span> — show message</div>
            <div className="p-2 rounded border border-blue-200 bg-blue-50 dark:bg-blue-900/20"><span className="font-medium text-blue-600">Success</span> — render data</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
