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

// ── Pyodide loader (cached singleton) ────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getPyodide(): Promise<any> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const win = window as any;
  if (win._pyodideInstance) return win._pyodideInstance;

  if (!win.loadPyodide) {
    await new Promise<void>((resolve, reject) => {
      const existing = document.querySelector('script[src*="pyodide.js"]');
      if (existing) {
        existing.addEventListener("load", () => resolve());
        return;
      }
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js";
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Failed to load Pyodide CDN"));
      document.head.appendChild(script);
    });
  }

  const instance = await win.loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.2/full/",
  });
  win._pyodideInstance = instance;
  return instance;
}

export function CodeEditorSection({
  defaultCode,
  language,
}: CodeEditorSectionProps) {
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [stdinValue, setStdinValue] = useState("");
  const { theme } = useTheme();

  const isPython = language === "python";
  // Only show stdin panel when code actually calls input()
  const hasInputCalls = isPython && /\binput\s*\(/.test(code);

  const runCode = useCallback(async () => {
    setIsRunning(true);
    setOutput([]);

    // ── SQL ──────────────────────────────────────────────────────────────────
    if (language === "sql") {
      setOutput([
        "-- SQL cannot be executed in the browser.",
        "-- Copy this code and run it in psql, pgAdmin, or any PostgreSQL client.",
      ]);
      setIsRunning(false);
      return;
    }

    // ── Python ───────────────────────────────────────────────────────────────
    if (language === "python") {
      try {
        setOutput(["Loading Python runtime… (first run may take a moment)"]);
        const pyodide = await getPyodide();

        const logs: string[] = [];

        pyodide.setStdout({
          batched: (text: string) => {
            text
              .split("\n")
              .filter((l: string) => l !== "")
              .forEach((l: string) => logs.push(l));
          },
        });
        pyodide.setStderr({
          batched: (text: string) => {
            text
              .split("\n")
              .filter((l: string) => l !== "")
              .forEach((l: string) => logs.push(`Error: ${l}`));
          },
        });

        // Build input queue from the stdin textarea (one value per line)
        const inputLines = stdinValue
          .split("\n")
          .map((l) => l.trimEnd());
        let inputIdx = 0;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        pyodide.globals.set("input", (prompt: any) => {
          const promptStr = prompt ? String(prompt) : "";
          const value = inputLines[inputIdx] ?? "";
          inputIdx++;
          // Echo prompt + user value just like a real terminal
          logs.push(`${promptStr}${value}`);
          return value;
        });

        setOutput(["Running…"]);
        await pyodide.runPythonAsync(code);

        setOutput(
          logs.length > 0
            ? logs
            : ["# No output. Add print() statements to see results."]
        );
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        const lines = msg.split("\n");
        const simplified = lines[lines.length - 1] || msg;
        setOutput([`Error: ${simplified}`]);
      } finally {
        setIsRunning(false);
      }
      return;
    }

    // ── JavaScript ───────────────────────────────────────────────────────────
    const logs: string[] = [];
    try {
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

      const fn = new Function("console", code);
      fn(safeConsole);

      setOutput(
        logs.length > 0
          ? logs
          : ["// No output. Add console.log() statements to see results."]
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      setOutput([`Error: ${errorMessage}`]);
    } finally {
      setIsRunning(false);
    }
  }, [code, language, stdinValue]);

  const resetCode = useCallback(() => {
    setCode(defaultCode);
    setOutput([]);
    setStdinValue("");
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
    <div className="flex flex-col lg:flex-row gap-4">
      {/* Editor */}
      <Card className="flex flex-col flex-1 min-w-0">
        <CardHeader className="pb-3 shrink-0">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Code Editor</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={copyCode} className="h-8">
                {copied ? (
                  <Check className="h-3.5 w-3.5 mr-1 text-emerald-500" />
                ) : (
                  <Copy className="h-3.5 w-3.5 mr-1" />
                )}
                {copied ? "Copied" : "Copy"}
              </Button>
              <Button variant="ghost" size="sm" onClick={resetCode} className="h-8">
                <RotateCcw className="h-3.5 w-3.5 mr-1" />
                Reset
              </Button>
              <Button size="sm" onClick={runCode} disabled={isRunning} className="h-8">
                <Play className="h-3.5 w-3.5 mr-1" />
                {isRunning ? "Running..." : "Run Code"}
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

      {/* Console */}
      <div className="flex-1 min-w-0">
        <ConsoleSection
          output={output}
          stdin={hasInputCalls ? { value: stdinValue, onChange: setStdinValue } : undefined}
        />
      </div>
    </div>
  );
}
