"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { Play, RotateCcw, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "next-themes";

const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

interface HTMLPreviewSectionProps {
  defaultCode: string;
  language: string;
}

export function HTMLPreviewSection({
  defaultCode,
  language,
}: HTMLPreviewSectionProps) {
  const [code, setCode] = useState(defaultCode);
  const [preview, setPreview] = useState("");
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const runCode = useCallback(() => {
    setPreview(code);
  }, [code]);

  const resetCode = useCallback(() => {
    setCode(defaultCode);
    setPreview("");
  }, [defaultCode]);

  const copyCode = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard not available
    }
  }, [code]);

  // Auto-run on mount
  useEffect(() => {
    setPreview(defaultCode);
  }, [defaultCode]);

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      {/* Editor */}
      <Card className="flex flex-col flex-1 min-w-0">
        <CardHeader className="pb-3 shrink-0">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Code Editor</CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={copyCode}
                className="h-8"
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5 mr-1 text-emerald-500" />
                ) : (
                  <Copy className="h-3.5 w-3.5 mr-1" />
                )}
                {copied ? "Copied" : "Copy"}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={resetCode}
                className="h-8"
              >
                <RotateCcw className="h-3.5 w-3.5 mr-1" />
                Reset
              </Button>
              <Button size="sm" onClick={runCode} className="h-8">
                <Play className="h-3.5 w-3.5 mr-1" />
                Preview
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 flex-1">
          <div className="border-t rounded-b-lg overflow-hidden">
            <Editor
              height="500px"
              language={language}
              value={code}
              onChange={(value) => setCode(value || "")}
              theme={theme === "dark" ? "vs-dark" : "light"}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: "on",
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 2,
                wordWrap: "on",
                padding: { top: 16 },
                renderLineHighlight: "line",
                cursorBlinking: "smooth",
                smoothScrolling: true,
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <div className="flex-1 min-w-0">
        <Card className="h-full">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Preview</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="border-t rounded-b-lg overflow-hidden bg-white">
              <iframe
                ref={iframeRef}
                srcDoc={preview}
                title="HTML Preview"
                className="w-full h-[200px] lg:h-[500px] border-0"
                sandbox="allow-scripts"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
