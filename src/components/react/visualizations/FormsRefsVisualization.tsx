"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StickyNote, FileText } from "lucide-react";

export function FormsRefsVisualization() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!email.includes("@")) errs.email = "Invalid email";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><FileText className="h-4 w-4 text-blue-500" /> Controlled Form</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <form onSubmit={e => { e.preventDefault(); if (validate()) { setSubmitted(email); setEmail(""); } }}>
              <input ref={inputRef} value={email} onChange={e => setEmail(e.target.value)}
                placeholder="Enter email"
                style={{ border: "1px solid #d1d5db", padding: "8px", borderRadius: "6px", width: "100%", marginBottom: "8px" }} />
              {errors.email && <p className="text-xs text-destructive mb-2">{errors.email}</p>}
              <Button size="sm" type="submit">Submit</Button>
            </form>
            {submitted && <p className="text-xs text-green-600">Submitted: {submitted}</p>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><StickyNote className="h-4 w-4 text-orange-500" /> useRef</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <p className="text-xs text-muted-foreground">useRef persists across renders without causing re-renders.</p>
            <div className="rounded-lg border bg-muted/30 p-3 font-mono text-xs">
              <p>{`const inputRef = useRef(null);`}</p>
              <p>{`<input ref={inputRef} />`}</p>
              <p className="text-muted-foreground mt-1">{`// Access: inputRef.current.value`}</p>
            </div>
            <p className="text-xs text-muted-foreground">Uses: DOM access, previous values, mutable storage, timer IDs.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
