"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ─── ConsoleOutput ────────────────────────────────────────────────────────────
function ConsoleOutput({ lines }: Readonly<{ lines: string[] | null }>) {
  return (
    <AnimatePresence mode="wait">
      {lines ? (
        <motion.div
          key="out"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 px-4 py-3 font-mono text-xs space-y-1 min-h-[52px]"
        >
          {lines.map((line, i) => (
            <p key={`${line}-${i}`} className="text-emerald-400">
              <span className="text-zinc-500 select-none mr-2">&gt;</span>
              {line}
            </p>
          ))}
        </motion.div>
      ) : (
        <motion.div
          key="ph"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="rounded-xl border bg-muted/20 px-4 py-3 min-h-[52px] flex items-center justify-center"
        >
          <p className="text-xs text-muted-foreground italic">Click ▶ Run to see output</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── types ────────────────────────────────────────────────────────────────────
type ClipboardTab = "writeText" | "readText" | "richContent" | "copyButton";

interface GroupInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const groups: Record<ClipboardTab, GroupInfo> = {
  writeText: {
    label: "writeText",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "navigator.clipboard.writeText() copies a string to the system clipboard. It returns a Promise that resolves once the text is successfully written.",
    codeSnippet: `async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log("Text copied:", text);
  } catch (err) {
    console.log("Copy failed:", err.message);
  }
}

copyToClipboard("Hello, Clipboard!");`,
    codeOutput: [
      'Text copied: Hello, Clipboard!',
    ],
  },
  readText: {
    label: "readText",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "navigator.clipboard.readText() reads the current text content from the clipboard. The browser will prompt the user for permission before allowing access.",
    codeSnippet: `async function pasteFromClipboard() {
  try {
    const text = await navigator.clipboard.readText();
    console.log("Clipboard contains:", text);
    console.log("Length:", text.length, "characters");
  } catch (err) {
    console.log("Read failed:", err.message);
  }
}

pasteFromClipboard();`,
    codeOutput: [
      'Clipboard contains: Hello, Clipboard!',
      'Length: 17 characters',
    ],
  },
  richContent: {
    label: "Rich Content",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "The ClipboardItem API lets you copy rich content like HTML or images. Create a ClipboardItem with a Blob of the desired MIME type and pass it to navigator.clipboard.write().",
    codeSnippet: `// Copy HTML to clipboard
const htmlContent = "<b>Bold</b> and <em>italic</em>";
const blob = new Blob([htmlContent], { type: "text/html" });
const item = new ClipboardItem({ "text/html": blob });

await navigator.clipboard.write([item]);
console.log("HTML copied to clipboard");

// Copy an image from a canvas
const canvas = document.querySelector("canvas");
canvas.toBlob(async (imgBlob) => {
  const imgItem = new ClipboardItem({ "image/png": imgBlob });
  await navigator.clipboard.write([imgItem]);
  console.log("Image copied to clipboard");
});`,
    codeOutput: [
      'HTML copied to clipboard',
      'Image copied to clipboard',
    ],
  },
  copyButton: {
    label: "Copy Button",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "A common UI pattern: a button that copies text and shows feedback. Combine writeText with state management to toggle between &quot;Copy&quot; and &quot;Copied!&quot; labels.",
    codeSnippet: `function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    console.log("Copied! Showing feedback...");
    setTimeout(() => {
      setCopied(false);
      console.log("Reset to default state");
    }, 2000);
  };

  return (
    <button onClick={handleCopy}>
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}`,
    codeOutput: [
      'Copied! Showing feedback...',
      'Reset to default state',
    ],
  },
};

const order: ClipboardTab[] = ["writeText", "readText", "richContent", "copyButton"];

// ─── reference table data ─────────────────────────────────────────────────────
const referenceRows = [
  {
    method: "navigator.clipboard.writeText(text)",
    description: "Copies a plain-text string to the clipboard",
    permission: "No (user gesture required)",
  },
  {
    method: "navigator.clipboard.readText()",
    description: "Reads plain text from the clipboard",
    permission: "Yes (clipboard-read)",
  },
  {
    method: "navigator.clipboard.write(items)",
    description: "Writes one or more ClipboardItem objects (rich content)",
    permission: "No (user gesture required)",
  },
  {
    method: "navigator.clipboard.read()",
    description: "Reads rich content (HTML, images) from the clipboard",
    permission: "Yes (clipboard-read)",
  },
  {
    method: "document.execCommand(&quot;copy&quot;)",
    description: "Legacy method to copy selected text (deprecated)",
    permission: "No",
  },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function ClipboardVisualization() {
  const [selected, setSelected] = useState<ClipboardTab>("writeText");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  // Interactive clipboard demo state
  const [sourceText] = useState("Hello, Clipboard API!");
  const [clipboardContent, setClipboardContent] = useState<string | null>(null);
  const [pastedContent, setPastedContent] = useState<string | null>(null);
  const [copyPhase, setCopyPhase] = useState<"idle" | "copying" | "copied">("idle");
  const [pastePhase, setPastePhase] = useState<"idle" | "pasting" | "pasted">("idle");

  const group = groups[selected];

  const handleSelect = (key: ClipboardTab) => {
    setSelected(key);
    setOutputLines(null);
  };

  const handleCopyDemo = async () => {
    setCopyPhase("copying");
    setPastedContent(null);
    setPastePhase("idle");
    await new Promise((r) => setTimeout(r, 600));
    setClipboardContent(sourceText);
    setCopyPhase("copied");
    await new Promise((r) => setTimeout(r, 1500));
    setCopyPhase("idle");
  };

  const handlePasteDemo = async () => {
    if (!clipboardContent) return;
    setPastePhase("pasting");
    await new Promise((r) => setTimeout(r, 600));
    setPastedContent(clipboardContent);
    setPastePhase("pasted");
    await new Promise((r) => setTimeout(r, 1500));
    setPastePhase("idle");
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Clipboard API</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Group selector chips */}
        <div className="flex flex-wrap gap-2">
          {order.map((key) => {
            const g = groups[key];
            return (
              <button
                key={key}
                onClick={() => handleSelect(key)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  selected === key
                    ? g.color + " scale-105 shadow-sm"
                    : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {g.label}
              </button>
            );
          })}
        </div>

        {/* Animated detail area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {/* Description banner */}
            <div className={`rounded-xl border px-4 py-3 text-sm ${group.color}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold font-mono text-base">{group.label}</span>
                <Badge variant="secondary" className={`text-[10px] ${group.badgeColor}`}>
                  clipboard
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{group.description}</p>
            </div>

            {/* Code + Output */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left: Code */}
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1.5">Code</p>
                  <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[120px]">
                    {group.codeSnippet}
                  </pre>
                </div>
                <Button size="sm" onClick={() => setOutputLines(group.codeOutput)}>
                  <Play className="h-3.5 w-3.5 mr-1" /> Run
                </Button>
              </div>

              {/* Right: Output */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-muted-foreground mb-1.5">Output</p>
                <ConsoleOutput lines={outputLines} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Interactive clipboard demo */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
            Interactive Clipboard Demo
          </p>
          <div className="rounded-xl border bg-muted/20 px-4 py-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
              {/* Source */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">Source</p>
                <motion.div
                  animate={{
                    borderColor: copyPhase === "copying" ? "rgb(59,130,246)" : "rgb(228,228,231)",
                  }}
                  className="rounded-lg border-2 bg-background px-3 py-2.5 font-mono text-xs min-h-[48px] flex items-center"
                >
                  {sourceText}
                </motion.div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCopyDemo}
                  disabled={copyPhase === "copying"}
                  className="w-full"
                >
                  <AnimatePresence mode="wait">
                    {copyPhase === "copied" ? (
                      <motion.span
                        key="copied"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400"
                      >
                        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <motion.path
                            d="M5 13l4 4L19 7"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                        </svg>
                        Copied!
                      </motion.span>
                    ) : (
                      <motion.span
                        key="copy"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {copyPhase === "copying" ? "Copying..." : "Copy"}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </div>

              {/* Clipboard (middle) */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">System Clipboard</p>
                <motion.div
                  animate={{
                    scale: copyPhase === "copying" || pastePhase === "pasting" ? 1.05 : 1,
                    borderColor:
                      copyPhase === "copying"
                        ? "rgb(59,130,246)"
                        : pastePhase === "pasting"
                        ? "rgb(16,185,129)"
                        : "rgb(228,228,231)",
                  }}
                  className="rounded-lg border-2 border-dashed bg-muted/30 px-3 py-2.5 font-mono text-xs min-h-[48px] flex items-center justify-center"
                >
                  <AnimatePresence mode="wait">
                    {clipboardContent ? (
                      <motion.span
                        key="content"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="text-blue-600 dark:text-blue-400"
                      >
                        {clipboardContent}
                      </motion.span>
                    ) : (
                      <motion.span
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-muted-foreground italic"
                      >
                        (empty)
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
                <div className="flex items-center justify-center">
                  <AnimatePresence>
                    {copyPhase === "copying" && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-[10px] text-blue-500 font-semibold"
                      >
                        writing...
                      </motion.div>
                    )}
                    {pastePhase === "pasting" && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-[10px] text-emerald-500 font-semibold"
                      >
                        reading...
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Destination */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">Paste Destination</p>
                <motion.div
                  animate={{
                    borderColor: pastePhase === "pasting" ? "rgb(16,185,129)" : "rgb(228,228,231)",
                  }}
                  className="rounded-lg border-2 bg-background px-3 py-2.5 font-mono text-xs min-h-[48px] flex items-center justify-center"
                >
                  <AnimatePresence mode="wait">
                    {pastedContent ? (
                      <motion.span
                        key="pasted"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-emerald-600 dark:text-emerald-400"
                      >
                        {pastedContent}
                      </motion.span>
                    ) : (
                      <motion.span
                        key="placeholder"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-muted-foreground italic"
                      >
                        Click Paste to read
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handlePasteDemo}
                  disabled={!clipboardContent || pastePhase === "pasting"}
                  className="w-full"
                >
                  <AnimatePresence mode="wait">
                    {pastePhase === "pasted" ? (
                      <motion.span
                        key="pasted"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400"
                      >
                        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <motion.path
                            d="M5 13l4 4L19 7"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                        </svg>
                        Pasted!
                      </motion.span>
                    ) : (
                      <motion.span
                        key="paste"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {pastePhase === "pasting" ? "Pasting..." : "Paste"}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Reference table */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
            Clipboard API Methods
          </p>
          <div className="rounded-xl border overflow-hidden text-xs">
            <div className="grid grid-cols-3 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
              <span>Method</span>
              <span>Description</span>
              <span>Permission Required?</span>
            </div>
            {referenceRows.map((row) => (
              <div
                key={row.method}
                className="grid grid-cols-3 px-3 py-2 border-t items-center gap-1"
              >
                <code className="font-mono font-bold text-blue-700 dark:text-blue-300 text-[11px]">
                  {row.method}
                </code>
                <span className="text-[11px] text-muted-foreground">{row.description}</span>
                <span className="text-[11px] text-muted-foreground">{row.permission}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
