"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type ParentElement = "video" | "audio" | "picture";

const parents: { id: ParentElement; label: string; color: string }[] = [
  { id: "video", label: "<video>", color: "bg-blue-500" },
  { id: "audio", label: "<audio>", color: "bg-emerald-500" },
  { id: "picture", label: "<picture>", color: "bg-purple-500" },
];

const attributesByParent: Record<ParentElement, { attr: string; required: boolean; desc: string }[]> = {
  video: [
    { attr: "src", required: true, desc: "URL to the video file" },
    { attr: "type", required: false, desc: 'MIME type (e.g. "video/mp4")' },
  ],
  audio: [
    { attr: "src", required: true, desc: "URL to the audio file" },
    { attr: "type", required: false, desc: 'MIME type (e.g. "audio/mpeg")' },
  ],
  picture: [
    { attr: "srcset", required: true, desc: "Image URL(s) with optional descriptors" },
    { attr: "type", required: false, desc: 'MIME type (e.g. "image/webp")' },
    { attr: "media", required: false, desc: "Media query for art direction" },
    { attr: "sizes", required: false, desc: "Image display size hints" },
  ],
};

const codeByParent: Record<ParentElement, string> = {
  video: `<video controls>\n  <!-- Browser tries top-to-bottom -->\n  <source src="movie.webm"\n          type="video/webm">\n  <source src="movie.mp4"\n          type="video/mp4">\n  <p>Video not supported.</p>\n</video>`,
  audio: `<audio controls>\n  <source src="song.ogg"\n          type="audio/ogg">\n  <source src="song.mp3"\n          type="audio/mpeg">\n  Audio not supported.\n</audio>`,
  picture: `<picture>\n  <source type="image/avif"\n          srcset="photo.avif">\n  <source type="image/webp"\n          srcset="photo.webp">\n  <source media="(min-width: 800px)"\n          srcset="photo-wide.jpg">\n  <img src="photo.jpg" alt="Photo">\n</picture>`,
};

export function SourceTagVisualization() {
  const [activeParent, setActiveParent] = useState<ParentElement>("video");

  return (
    <div className="space-y-6">
      {/* How source works */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">&lt;source&gt; in Context</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            The <code>&lt;source&gt;</code> element provides format fallback inside media elements. Select a parent to see how it&apos;s used.
          </p>

          <div className="flex flex-wrap gap-2">
            {parents.map((p) => (
              <button
                key={p.id}
                onClick={() => setActiveParent(p.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeParent === p.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeParent}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {/* Attributes for this parent */}
              <div className="rounded-xl border p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Badge className={`text-[10px] ${parents.find((p) => p.id === activeParent)?.color}`}>
                    Inside {parents.find((p) => p.id === activeParent)?.label}
                  </Badge>
                </div>

                <p className="text-xs font-semibold">Available attributes:</p>
                <div className="space-y-2">
                  {attributesByParent[activeParent].map((a) => (
                    <div key={a.attr} className="flex items-start gap-2 text-xs rounded-lg bg-muted/50 p-2">
                      <code className="text-primary font-bold shrink-0">{a.attr}</code>
                      {a.required && <Badge variant="destructive" className="text-[8px] shrink-0">Required</Badge>}
                      <span className="text-muted-foreground">{a.desc}</span>
                    </div>
                  ))}
                </div>

                {activeParent === "picture" && (
                  <p className="text-[10px] text-amber-500 bg-amber-500/10 rounded-lg p-2">
                    Note: <code>srcset</code> (not <code>src</code>) is used in &lt;picture&gt;.
                    Using <code>src</code> inside &lt;picture&gt;&apos;s &lt;source&gt; is invalid.
                  </p>
                )}
              </div>

              {/* Code */}
              <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
                {codeByParent[activeParent]}
              </div>
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Browser evaluation flow */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">How the Browser Evaluates &lt;source&gt;</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { step: 1, label: "Read first <source>", desc: "Check if the browser supports the type/format" },
            { step: 2, label: "Type supported?", desc: "If type attribute present, skip if format is unsupported (no download!)" },
            { step: 3, label: "Media matches?", desc: "For <picture>: check if the media query matches the viewport" },
            { step: 4, label: "Use or skip", desc: "If both match → use this source. Otherwise → move to next <source>" },
            { step: 5, label: "Fallback", desc: "If no <source> matches → use <img> (picture) or fallback text (audio/video)" },
          ].map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-start gap-3 rounded-lg border p-2.5"
            >
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0">
                {item.step}
              </div>
              <div>
                <p className="text-xs font-semibold">{item.label}</p>
                <p className="text-[10px] text-muted-foreground">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>

      {/* Key rules */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Key Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { rule: "Order matters", detail: "Browser picks the FIRST match — put modern formats first" },
              { rule: "Void element", detail: "<source> has no closing tag — it's self-closing" },
              { rule: "Always include type", detail: "Lets browser skip unsupported formats without downloading" },
              { rule: "Requires parent", detail: "Only valid inside <audio>, <video>, or <picture>" },
              { rule: "src vs srcset", detail: "Use src for audio/video, srcset for picture — don't mix them" },
            ].map((item, i) => (
              <motion.div
                key={item.rule}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-lg border p-2.5 flex items-start gap-2.5"
              >
                <Badge className="bg-primary text-[9px] shrink-0">{item.rule}</Badge>
                <span className="text-xs text-muted-foreground">{item.detail}</span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
