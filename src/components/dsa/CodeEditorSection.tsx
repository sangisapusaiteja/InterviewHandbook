"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { Play, RotateCcw, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ConsoleSection } from "./ConsoleSection";
import { useTheme } from "next-themes";

const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

interface CodeEditorSectionProps {
  defaultCode: string;
  language: string;
}

export function CodeEditorSection({
  defaultCode,
  language,
}: CodeEditorSectionProps) {
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();

  const runCode = useCallback(() => {
    setIsRunning(true);
    setOutput([]);

    const logs: string[] = [];

    try {
      // Create a safe console.log replacement
      const safeConsole = {
        log: (...args: unknown[]) => {
          const message = args
            .map((arg) => {
              if (typeof arg === "object") {
                try {
                  return JSON.stringify(arg, null, 2);
                } catch {
                  return String(arg);
                }
              }
              return String(arg);
            })
            .join(" ");
          logs.push(message);
        },
      };

      // Use Function constructor for safe evaluation
      const fn = new Function("console", code);
      fn(safeConsole);

      setOutput(logs.length > 0 ? logs : ["// No output. Add console.log() statements to see results."]);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      setOutput([`Error: ${errorMessage}`]);
    } finally {
      setIsRunning(false);
    }
  }, [code]);

  const resetCode = useCallback(() => {
    setCode(defaultCode);
    setOutput([]);
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

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
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
              <Button
                size="sm"
                onClick={runCode}
                disabled={isRunning}
                className="h-8"
              >
                <Play className="h-3.5 w-3.5 mr-1" />
                {isRunning ? "Running..." : "Run Code"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="border-t rounded-b-lg overflow-hidden">
            <Editor
              height="400px"
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

      <ConsoleSection output={output} />
    </div>
  );
}
