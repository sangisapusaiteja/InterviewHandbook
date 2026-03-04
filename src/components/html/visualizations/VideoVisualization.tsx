"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type DemoTab = "basic" | "poster" | "captions" | "gif";

const tabs: { id: DemoTab; label: string }[] = [
  { id: "basic", label: "Basic Player" },
  { id: "poster", label: "Poster Image" },
  { id: "captions", label: "Captions" },
  { id: "gif", label: "GIF Replacement" },
];

export function VideoVisualization() {
  const [activeTab, setActiveTab] = useState<DemoTab>("basic");

  const codeSnippets: Record<DemoTab, string> = {
    basic: `<video controls width="400">\n  <source src="movie.mp4"\n          type="video/mp4">\n  <source src="movie.webm"\n          type="video/webm">\n  Your browser does not support video.\n</video>`,
    poster: `<video controls width="400"\n       poster="thumbnail.jpg">\n  <source src="movie.mp4"\n          type="video/mp4">\n</video>`,
    captions: `<video controls width="400">\n  <source src="movie.mp4"\n          type="video/mp4">\n  <track kind="subtitles"\n         src="captions_en.vtt"\n         srclang="en"\n         label="English"\n         default>\n</video>`,
    gif: `<video autoplay muted loop\n       playsinline width="300">\n  <source src="animation.mp4"\n          type="video/mp4">\n</video>`,
  };

  return (
    <div className="space-y-6">
      {/* Interactive demo */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">&lt;video&gt; Use Cases</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {/* Description */}
              <div className="rounded-xl border p-4 space-y-3">
                {activeTab === "basic" && (
                  <>
                    <Badge className="bg-blue-500 text-[10px]">Standard Player</Badge>
                    <p className="text-xs text-muted-foreground">
                      The <code>controls</code> attribute adds a native player with play/pause, volume, seek bar, and fullscreen.
                      Multiple <code>&lt;source&gt;</code> elements provide format fallback.
                    </p>
                    <div className="bg-muted/50 rounded-lg p-3 space-y-1 text-xs">
                      <p><strong>width/height:</strong> Set display dimensions (prevents layout shift)</p>
                      <p><strong>controls:</strong> Built-in player UI</p>
                      <p><strong>preload:</strong> none | metadata | auto</p>
                    </div>
                  </>
                )}
                {activeTab === "poster" && (
                  <>
                    <Badge className="bg-purple-500 text-[10px]">Poster Thumbnail</Badge>
                    <p className="text-xs text-muted-foreground">
                      The <code>poster</code> attribute shows an image before the user presses play.
                      Without it, the browser shows the first frame (often black).
                    </p>
                    <div className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-lg p-6 text-center">
                      <span className="text-2xl">🎬</span>
                      <p className="text-xs mt-2 text-muted-foreground">poster=&quot;thumbnail.jpg&quot;</p>
                    </div>
                  </>
                )}
                {activeTab === "captions" && (
                  <>
                    <Badge className="bg-emerald-500 text-[10px]">Accessibility</Badge>
                    <p className="text-xs text-muted-foreground">
                      The <code>&lt;track&gt;</code> element adds subtitles/captions using WebVTT (.vtt) files.
                    </p>
                    <div className="bg-muted/50 rounded-lg p-3 space-y-1 text-xs">
                      <p><strong>kind:</strong> subtitles | captions | descriptions | chapters</p>
                      <p><strong>srclang:</strong> Language code (en, es, fr...)</p>
                      <p><strong>default:</strong> Auto-enable this track</p>
                      <p className="text-emerald-500 italic mt-2">Captions include sound descriptions for deaf users</p>
                    </div>
                  </>
                )}
                {activeTab === "gif" && (
                  <>
                    <Badge className="bg-amber-500 text-[10px]">Performance</Badge>
                    <p className="text-xs text-muted-foreground">
                      Replace GIFs with <code>autoplay muted loop playsinline</code> videos — 80-90% smaller file size with better quality.
                    </p>
                    <div className="bg-muted/50 rounded-lg p-3 space-y-1 text-xs">
                      <p><strong>autoplay:</strong> Starts immediately</p>
                      <p><strong>muted:</strong> Required for autoplay to work</p>
                      <p><strong>loop:</strong> Repeats like a GIF</p>
                      <p><strong>playsinline:</strong> Prevents iOS fullscreen</p>
                    </div>
                  </>
                )}
              </div>

              {/* Code */}
              <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
                {codeSnippets[activeTab]}
              </div>
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Format comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Video Format Support</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Format</th>
                  <th className="text-left p-2">Codec</th>
                  <th className="text-left p-2">MIME Type</th>
                  <th className="text-left p-2">Support</th>
                  <th className="text-left p-2">Best For</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { format: "MP4", codec: "H.264", mime: "video/mp4", support: "All browsers", best: "Universal fallback" },
                  { format: "WebM", codec: "VP9", mime: "video/webm", support: "Chrome, Firefox, Edge", best: "Better compression" },
                  { format: "MP4", codec: "AV1", mime: "video/mp4", support: "Chrome, Firefox", best: "Best compression" },
                  { format: "OGG", codec: "Theora", mime: "video/ogg", support: "Chrome, Firefox", best: "Legacy open format" },
                ].map((row) => (
                  <tr key={row.format + row.codec} className="border-b last:border-0">
                    <td className="p-2 font-semibold">{row.format}</td>
                    <td className="p-2">{row.codec}</td>
                    <td className="p-2"><code className="text-primary">{row.mime}</code></td>
                    <td className="p-2">{row.support}</td>
                    <td className="p-2 text-muted-foreground">{row.best}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
