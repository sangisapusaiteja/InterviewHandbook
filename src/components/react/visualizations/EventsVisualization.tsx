"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap } from "lucide-react";

export function EventsVisualization() {
  const [log, setLog] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const addLog = (msg: string) => setLog(l => [`> ${msg}`, ...l].slice(0, 5));

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Zap className="h-4 w-4 text-yellow-500" /> Click Events</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            <div className="flex gap-2">
              <button onClick={() => addLog("Button 1 clicked")}
                style={{ background: "#3b82f6", color: "white", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer" }}>Button 1</button>
              <button onClick={() => addLog("Button 2 clicked")}
                style={{ background: "#22c55e", color: "white", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer" }}>Button 2</button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Zap className="h-4 w-4 text-orange-500" /> Form Events</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            <form onSubmit={e => { e.preventDefault(); addLog("Submitted: " + input); }}>
              <input value={input} onChange={e => setInput(e.target.value)}
                placeholder="Type and submit"
                style={{ border: "1px solid #d1d5db", padding: "8px", borderRadius: "6px", width: "100%", marginBottom: "8px" }} />
              <button type="submit"
                style={{ background: "#8b5cf6", color: "white", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer" }}>Submit</button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Zap className="h-4 w-4 text-muted-foreground" /> Event Log</CardTitle></CardHeader>
        <CardContent>
          <div className="rounded-lg border bg-muted/30 p-3 font-mono text-xs min-h-[80px]">
            {log.length === 0 ? <p className="text-muted-foreground">Click buttons or submit form to see events</p> : log.map((l, i) => <p key={i}>{l}</p>)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
