"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type DnDEvent = "dragstart" | "dragover" | "drop" | "dragend";

const events: { id: DnDEvent; label: string }[] = [
  { id: "dragstart", label: "dragstart" },
  { id: "dragover", label: "dragover" },
  { id: "drop", label: "drop" },
  { id: "dragend", label: "dragend" },
];

const eventDetails: Record<DnDEvent, { when: string; target: string; must: string; code: string }> = {
  dragstart: {
    when: "User starts dragging an element",
    target: "The element being dragged",
    must: "Set dataTransfer data and optional effectAllowed",
    code: `<div draggable="true" id="item">Drag me</div>

<script>
item.addEventListener("dragstart", (e) => {
  // Store data to transfer
  e.dataTransfer.setData("text/plain", e.target.id);

  // Optional: set allowed effect
  e.dataTransfer.effectAllowed = "move";

  // Optional: custom drag image
  // e.dataTransfer.setDragImage(img, 0, 0);
});
</script>`,
  },
  dragover: {
    when: "Dragged item is over a valid drop target",
    target: "The drop zone element",
    must: "Call e.preventDefault() to allow dropping (default is to reject)",
    code: `<div id="dropZone">Drop here</div>

<script>
dropZone.addEventListener("dragover", (e) => {
  // MUST prevent default to allow drop!
  e.preventDefault();

  // Optional: indicate what will happen
  e.dataTransfer.dropEffect = "move";

  // Optional: visual feedback
  e.target.classList.add("drag-over");
});

// Clean up visual feedback
dropZone.addEventListener("dragleave", (e) => {
  e.target.classList.remove("drag-over");
});
</script>`,
  },
  drop: {
    when: "Dragged item is released over the drop target",
    target: "The drop zone element",
    must: "Prevent default, retrieve dataTransfer data, update DOM",
    code: `dropZone.addEventListener("drop", (e) => {
  // Prevent browser default (open link, etc.)
  e.preventDefault();

  // Get the transferred data
  const id = e.dataTransfer.getData("text/plain");
  const draggedEl = document.getElementById(id);

  // Move the element to the drop zone
  e.target.appendChild(draggedEl);

  // Clean up styling
  e.target.classList.remove("drag-over");
});`,
  },
  dragend: {
    when: "Drag operation completes (drop or cancel)",
    target: "The element that was being dragged",
    must: "Clean up any visual state from the drag",
    code: `item.addEventListener("dragend", (e) => {
  // Fires on the dragged element, not the target

  // Check if the drop was successful
  if (e.dataTransfer.dropEffect === "none") {
    console.log("Drag cancelled");
  } else {
    console.log("Drop successful");
  }

  // Reset styles on source element
  e.target.classList.remove("dragging");
});`,
  },
};

export function DragAndDropVisualization() {
  const [activeEvent, setActiveEvent] = useState<DnDEvent>("dragstart");
  const active = eventDetails[activeEvent];

  return (
    <div className="space-y-6">
      {/* Event explorer */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Drag & Drop Events</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            HTML5 Drag and Drop uses a sequence of events on the dragged element and the drop target.
          </p>

          <div className="flex flex-wrap gap-2">
            {events.map((e) => (
              <button
                key={e.id}
                onClick={() => setActiveEvent(e.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeEvent === e.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {e.label}
              </button>
            ))}
          </div>

          <motion.div
            key={activeEvent}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="rounded-xl border p-4 space-y-3">
              <div className="space-y-2 text-xs">
                <p><strong>When:</strong> {active.when}</p>
                <p><strong>Fires on:</strong> {active.target}</p>
                <p><strong>Must do:</strong> <span className="text-primary">{active.must}</span></p>
              </div>
            </div>
            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
              {active.code}
            </div>
          </motion.div>
        </CardContent>
      </Card>

      {/* Event flow diagram */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Event Flow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-2 justify-center">
            {[
              { event: "dragstart", on: "source", color: "bg-blue-500" },
              { event: "drag", on: "source", color: "bg-blue-400" },
              { event: "dragenter", on: "target", color: "bg-purple-500" },
              { event: "dragover", on: "target", color: "bg-purple-400" },
              { event: "drop", on: "target", color: "bg-emerald-500" },
              { event: "dragend", on: "source", color: "bg-zinc-500" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-2"
              >
                <div className="rounded-lg border p-2 text-center">
                  <code className="text-[10px] font-bold text-primary block">{item.event}</code>
                  <Badge className={`${item.color} text-[7px] mt-1`}>{item.on}</Badge>
                </div>
                {i < 5 && <span className="text-muted-foreground text-xs">→</span>}
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* dataTransfer object */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">dataTransfer Object</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Property/Method</th>
                  <th className="text-left p-2">Description</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { prop: "setData(format, data)", desc: "Store data with a MIME type key (e.g., 'text/plain')" },
                  { prop: "getData(format)", desc: "Retrieve data by MIME type key" },
                  { prop: "clearData()", desc: "Clear stored data" },
                  { prop: "effectAllowed", desc: "Set on dragstart: 'move', 'copy', 'link', 'all', 'none'" },
                  { prop: "dropEffect", desc: "Set on dragover: determines cursor and drop behaviour" },
                  { prop: "files", desc: "FileList of dragged files (for file upload drop zones)" },
                  { prop: "setDragImage(el, x, y)", desc: "Custom image shown during drag" },
                ].map((row) => (
                  <tr key={row.prop} className="border-b last:border-0">
                    <td className="p-2">
                      <code className="text-primary font-bold text-[10px]">{row.prop}</code>
                    </td>
                    <td className="p-2">{row.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Making elements draggable */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Key Concepts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { concept: "draggable=\"true\"", detail: "Required on the source element to make it draggable (images and links are draggable by default)" },
              { concept: "preventDefault() in dragover", detail: "Without this, the browser rejects the drop — this is the #1 mistake beginners make" },
              { concept: "preventDefault() in drop", detail: "Prevents the browser from navigating to the dropped data (e.g., opening a URL)" },
              { concept: "File drops", detail: "Use e.dataTransfer.files in the drop event to access dragged files from the desktop" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="rounded-lg border p-2.5 space-y-1"
              >
                <code className="text-xs text-primary font-bold">{item.concept}</code>
                <p className="text-[10px] text-muted-foreground">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
