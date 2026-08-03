"use client";

import { useState, useCallback, useRef } from "react";
import { Play, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ReactPreviewProps {
  code: string;
  files?: { name: string; language: string; content: string }[];
}

export function ReactPreview({ code, files }: ReactPreviewProps) {
  const [error, setError] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const runCode = useCallback(() => {
    setIsRunning(true);
    setError("");

    try {
      // Combine all files into a single app
      let allCode = code;
      if (files) {
        for (const file of files) {
          if (file.name !== "default") {
            allCode += "\n\n" + file.content;
          }
        }
      }

      // Strip imports and exports
      const sanitized = allCode
        .replace(/^import\s+.*?;?\s*$/gm, "")
        .replace(/^export\s+default\s+/gm, "")
        .replace(/^export\s+.*?;?\s*$/gm, "")
        .trim();

      // Wrap in a render call if it defines a component
      const hasRender = sanitized.includes("root.render") || sanitized.includes("ReactDOM");
      const wrapped = hasRender
        ? sanitized
        : sanitized + `\n\nconst root = ReactDOM.createRoot(document.getElementById("root"));\nroot.render(React.createElement(App));`;

      const html = `<!DOCTYPE html>
<html>
<head>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>
    body { font-family: system-ui, sans-serif; margin: 16px; }
    #root { max-width: 100%; }
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel" data-type="module">
    ${wrapped}
  </script>
</body>
</html>`;

      if (iframeRef.current) {
        iframeRef.current.srcdoc = html;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsRunning(false);
    }
  }, [code, files]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button size="sm" onClick={runCode} disabled={isRunning}>
          {isRunning ? (
            <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
          ) : (
            <Play className="h-4 w-4 mr-1.5" />
          )}
          {isRunning ? "Rendering..." : "Render Preview"}
        </Button>
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="rounded-lg border bg-background overflow-hidden">
        <div className="border-b bg-muted/30 px-3 py-1.5 text-xs text-muted-foreground">
          Preview
        </div>
        <iframe
          ref={iframeRef}
          className="w-full min-h-[300px]"
          title="React Preview"
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    </div>
  );
}
