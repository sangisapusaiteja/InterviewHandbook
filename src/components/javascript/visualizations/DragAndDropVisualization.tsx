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
type DragDropTab = "dragEvents" | "dropZone" | "dataTransfer" | "fileDrop";

interface TabInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const tabs: Record<DragDropTab, TabInfo> = {
  dragEvents: {
    label: "Drag Events",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "The source element fires three key events during a drag operation: dragstart when the user begins dragging, drag continuously while dragging, and dragend when the drag finishes (whether dropped or cancelled).",
    codeSnippet: `const item = document.querySelector(".draggable");

item.addEventListener("dragstart", (e) => {
  e.dataTransfer.setData("text/plain", e.target.id);
  e.target.classList.add("dragging");
  console.log("dragstart:", e.target.id);
});

item.addEventListener("drag", (e) => {
  // Fires continuously while dragging
  console.log("drag: x=" + e.clientX + " y=" + e.clientY);
});

item.addEventListener("dragend", (e) => {
  e.target.classList.remove("dragging");
  console.log("dragend: dropEffect=" + e.dataTransfer.dropEffect);
});`,
    codeOutput: [
      "dragstart: item-1",
      "drag: x=120 y=340",
      "drag: x=185 y=290",
      "drag: x=250 y=210",
      'dragend: dropEffect="move"',
    ],
  },
  dropZone: {
    label: "Drop Zone",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "The target element (drop zone) fires dragenter when a dragged item enters it, dragover continuously while hovering over it, dragleave when the item leaves, and drop when released. You must call preventDefault() on dragover and drop to allow dropping.",
    codeSnippet: `const zone = document.querySelector(".drop-zone");

zone.addEventListener("dragenter", (e) => {
  e.preventDefault();
  zone.classList.add("highlight");
  console.log("dragenter: item entered zone");
});

zone.addEventListener("dragover", (e) => {
  e.preventDefault(); // REQUIRED to allow drop!
  console.log("dragover: hovering...");
});

zone.addEventListener("dragleave", () => {
  zone.classList.remove("highlight");
  console.log("dragleave: item left zone");
});

zone.addEventListener("drop", (e) => {
  e.preventDefault(); // REQUIRED to handle drop!
  const id = e.dataTransfer.getData("text/plain");
  zone.appendChild(document.getElementById(id));
  console.log("drop: received", id);
});`,
    codeOutput: [
      "dragenter: item entered zone",
      "dragover: hovering...",
      "dragover: hovering...",
      "drop: received item-1",
    ],
  },
  dataTransfer: {
    label: "DataTransfer",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "The DataTransfer object is the bridge between source and target. Use setData() in dragstart to attach data, and getData() in drop to read it. You can set multiple MIME types and control the dropEffect (copy, move, link, none).",
    codeSnippet: `// In dragstart — set data
source.addEventListener("dragstart", (e) => {
  // Set multiple data types
  e.dataTransfer.setData("text/plain", "Hello!");
  e.dataTransfer.setData("text/html", "<b>Hello!</b>");
  e.dataTransfer.setData("application/json",
    JSON.stringify({ id: 1, name: "Task" })
  );

  // Control the visual feedback
  e.dataTransfer.effectAllowed = "copyMove";
});

// In drop — read data
zone.addEventListener("drop", (e) => {
  e.preventDefault();
  const text = e.dataTransfer.getData("text/plain");
  const json = JSON.parse(
    e.dataTransfer.getData("application/json")
  );
  console.log("text:", text);
  console.log("json:", json);
  console.log("dropEffect:", e.dataTransfer.dropEffect);
});`,
    codeOutput: [
      'text: "Hello!"',
      'json: { id: 1, name: "Task" }',
      'dropEffect: "move"',
      'types: ["text/plain", "text/html", "application/json"]',
    ],
  },
  fileDrop: {
    label: "File Drop",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Users can drag files from their desktop into the browser. Access them via e.dataTransfer.files (a FileList) in the drop event. Always prevent the default on both dragover and drop to stop the browser from navigating to the file.",
    codeSnippet: `const dropArea = document.querySelector(".file-drop");

// Prevent browser default (opening the file)
dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropArea.classList.add("active");
});

dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("active");
});

dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  dropArea.classList.remove("active");

  const files = e.dataTransfer.files;
  console.log("Files dropped:", files.length);

  for (const file of files) {
    console.log(\`  \${file.name} (\${file.type}, \${file.size}B)\`);
  }

  // Can also read file content
  const reader = new FileReader();
  reader.onload = () => console.log("Content:", reader.result);
  reader.readAsText(files[0]);
});`,
    codeOutput: [
      "Files dropped: 2",
      "  photo.png (image/png, 245760B)",
      "  readme.txt (text/plain, 1024B)",
      'Content: "# My Readme\\nHello world..."',
    ],
  },
};

const tabKeys: DragDropTab[] = ["dragEvents", "dropZone", "dataTransfer", "fileDrop"];

// ─── Interactive items ────────────────────────────────────────────────────────
interface DragItem {
  id: string;
  label: string;
  color: string;
}

const initialItems: DragItem[] = [
  { id: "item-1", label: "Task A", color: "bg-blue-500" },
  { id: "item-2", label: "Task B", color: "bg-emerald-500" },
  { id: "item-3", label: "Task C", color: "bg-violet-500" },
  { id: "item-4", label: "Task D", color: "bg-orange-500" },
];

// ─── Reference table data ─────────────────────────────────────────────────────
const eventReference = [
  { event: "dragstart", firesOn: "Source", description: "User begins dragging the element", preventDefault: "No" },
  { event: "drag", firesOn: "Source", description: "Fires continuously while element is being dragged", preventDefault: "No" },
  { event: "dragend", firesOn: "Source", description: "Drag operation ends (drop or cancel)", preventDefault: "No" },
  { event: "dragenter", firesOn: "Target", description: "Dragged element enters a valid drop target", preventDefault: "Yes (to allow drop)" },
  { event: "dragover", firesOn: "Target", description: "Dragged element hovers over a drop target", preventDefault: "Yes (required!)" },
  { event: "dragleave", firesOn: "Target", description: "Dragged element leaves the drop target", preventDefault: "No" },
  { event: "drop", firesOn: "Target", description: "Element is released over a valid drop target", preventDefault: "Yes (required!)" },
];

// ─── Component ────────────────────────────────────────────────────────────────
export function DragAndDropVisualization() {
  const [activeTab, setActiveTab] = useState<DragDropTab>("dragEvents");
  const [consoleLines, setConsoleLines] = useState<string[] | null>(null);

  // Interactive demo state
  const [sourceItems, setSourceItems] = useState<DragItem[]>(initialItems);
  const [droppedItems, setDroppedItems] = useState<DragItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [eventLog, setEventLog] = useState<string[]>([]);
  const [zoneHighlight, setZoneHighlight] = useState(false);

  const currentTab = tabs[activeTab];

  function handleRun() {
    setConsoleLines(currentTab.codeOutput);
  }

  function handlePickItem(item: DragItem) {
    if (selectedItem === item.id) {
      // Deselect
      setSelectedItem(null);
      setZoneHighlight(false);
      setEventLog((prev) => [...prev, `dragend: cancelled ${item.label}`].slice(-6));
      return;
    }
    setSelectedItem(item.id);
    setZoneHighlight(true);
    setEventLog((prev) =>
      [
        ...prev,
        `dragstart: picked up ${item.label}`,
        `dataTransfer.setData("text/plain", "${item.id}")`,
      ].slice(-6)
    );
  }

  function handleDropOnZone() {
    if (!selectedItem) return;
    const item = sourceItems.find((i) => i.id === selectedItem);
    if (!item) return;

    setSourceItems((prev) => prev.filter((i) => i.id !== selectedItem));
    setDroppedItems((prev) => [...prev, item]);
    setSelectedItem(null);
    setZoneHighlight(false);
    setEventLog((prev) =>
      [
        ...prev,
        `dragenter: ${item.label} entered zone`,
        `drop: received ${item.id}`,
        `dragend: dropEffect="move"`,
      ].slice(-6)
    );
  }

  function handleReset() {
    setSourceItems(initialItems);
    setDroppedItems([]);
    setSelectedItem(null);
    setZoneHighlight(false);
    setEventLog([]);
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold">Drag &amp; Drop API</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* ── Tab chips ── */}
        <div className="flex flex-wrap gap-2">
          {tabKeys.map((key) => {
            const t = tabs[key];
            const isActive = key === activeTab;
            return (
              <button
                key={key}
                onClick={() => {
                  setActiveTab(key);
                  setConsoleLines(null);
                }}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-all ${
                  isActive ? t.color + " ring-1 ring-current" : "bg-muted/40 text-muted-foreground hover:bg-muted"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* ── Description banner ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className={`rounded-xl border p-4 ${currentTab.color}`}
          >
            <div className="flex items-start gap-2">
              <Badge variant="outline" className={currentTab.badgeColor + " shrink-0 mt-0.5"}>
                {currentTab.label}
              </Badge>
              <p className="text-sm leading-relaxed">{currentTab.description}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Code snippet ── */}
        <div className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 p-4 overflow-x-auto">
          <pre className="text-xs font-mono text-zinc-300 whitespace-pre">{currentTab.codeSnippet}</pre>
        </div>

        {/* ── Run button + output ── */}
        <div className="space-y-3">
          <Button size="sm" onClick={handleRun} className="gap-1.5">
            <Play className="h-3.5 w-3.5" /> Run
          </Button>
          <ConsoleOutput lines={consoleLines} />
        </div>

        {/* ── Interactive drag-and-drop demo ── */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold">Interactive Demo</h3>
          <p className="text-xs text-muted-foreground">
            Click an item to &quot;pick it up&quot;, then click the drop zone to &quot;drop&quot; it. Events are logged below.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Source items */}
            <div className="rounded-xl border bg-muted/20 p-4 space-y-2 min-h-[160px]">
              <p className="text-xs font-medium text-muted-foreground mb-2">Source Items</p>
              <AnimatePresence>
                {sourceItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: 1,
                      scale: selectedItem === item.id ? 1.05 : 1,
                    }}
                    exit={{ opacity: 0, scale: 0.8, y: -10 }}
                    onClick={() => handlePickItem(item)}
                    className={`rounded-lg px-3 py-2 text-sm font-medium text-white cursor-pointer transition-shadow ${
                      item.color
                    } ${
                      selectedItem === item.id
                        ? "ring-2 ring-offset-2 ring-offset-background ring-white shadow-lg"
                        : "hover:shadow-md"
                    }`}
                  >
                    {item.label}
                    {selectedItem === item.id && (
                      <span className="ml-2 text-xs opacity-80">(picked up)</span>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
              {sourceItems.length === 0 && (
                <p className="text-xs text-muted-foreground italic py-4 text-center">All items moved!</p>
              )}
            </div>

            {/* Drop zone */}
            <motion.div
              onClick={handleDropOnZone}
              animate={{
                borderColor: zoneHighlight ? "rgba(16,185,129,0.7)" : "rgba(128,128,128,0.3)",
                backgroundColor: zoneHighlight ? "rgba(16,185,129,0.08)" : "transparent",
              }}
              className={`rounded-xl border-2 border-dashed p-4 space-y-2 min-h-[160px] cursor-pointer transition-colors`}
            >
              <p className="text-xs font-medium text-muted-foreground mb-2">
                Drop Zone {zoneHighlight && <span className="text-emerald-500">(ready to receive)</span>}
              </p>
              <AnimatePresence>
                {droppedItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className={`rounded-lg px-3 py-2 text-sm font-medium text-white ${item.color}`}
                  >
                    {item.label}
                  </motion.div>
                ))}
              </AnimatePresence>
              {droppedItems.length === 0 && !zoneHighlight && (
                <p className="text-xs text-muted-foreground italic py-4 text-center">
                  Click an item, then click here to drop it
                </p>
              )}
            </motion.div>
          </div>

          {/* Event log */}
          <div className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 px-4 py-3 font-mono text-xs space-y-1 min-h-[52px]">
            {eventLog.length > 0 ? (
              eventLog.map((line, i) => (
                <p key={`${line}-${i}`} className="text-emerald-400">
                  <span className="text-zinc-500 select-none mr-2">&gt;</span>
                  {line}
                </p>
              ))
            ) : (
              <p className="text-zinc-500 italic">Event log — interact with items above</p>
            )}
          </div>

          <Button size="sm" variant="outline" onClick={handleReset} className="text-xs">
            Reset Demo
          </Button>
        </div>

        {/* ── Reference table ── */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold">Drag &amp; Drop Events Reference</h3>
          <div className="overflow-x-auto rounded-xl border">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="px-3 py-2 text-left font-semibold">Event</th>
                  <th className="px-3 py-2 text-left font-semibold">Fires On</th>
                  <th className="px-3 py-2 text-left font-semibold">Description</th>
                  <th className="px-3 py-2 text-left font-semibold">Must preventDefault?</th>
                </tr>
              </thead>
              <tbody>
                {eventReference.map((row) => (
                  <tr key={row.event} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="px-3 py-2 font-mono font-medium text-violet-600 dark:text-violet-400">
                      {row.event}
                    </td>
                    <td className="px-3 py-2">
                      <Badge
                        variant="outline"
                        className={
                          row.firesOn === "Source"
                            ? "bg-blue-500/20 text-blue-700 dark:text-blue-300"
                            : "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"
                        }
                      >
                        {row.firesOn}
                      </Badge>
                    </td>
                    <td className="px-3 py-2 text-muted-foreground">{row.description}</td>
                    <td className="px-3 py-2">
                      <span
                        className={
                          row.preventDefault === "No"
                            ? "text-zinc-500"
                            : "text-orange-600 dark:text-orange-400 font-medium"
                        }
                      >
                        {row.preventDefault}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
