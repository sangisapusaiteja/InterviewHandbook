"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type PreloadOption = "none" | "metadata" | "auto";

const attributes = [
  { name: "controls", type: "boolean", desc: "Shows built-in play/pause/volume UI" },
  { name: "autoplay", type: "boolean", desc: "Starts playback immediately (often blocked)" },
  { name: "loop", type: "boolean", desc: "Repeats playback when it reaches the end" },
  { name: "muted", type: "boolean", desc: "Starts with volume at zero" },
  { name: "preload", type: "select", desc: "Hint to the browser about preloading" },
];

export function AudioVisualization() {
  const [controls, setControls] = useState(true);
  const [autoplay, setAutoplay] = useState(false);
  const [loop, setLoop] = useState(false);
  const [muted, setMuted] = useState(false);
  const [preload, setPreload] = useState<PreloadOption>("metadata");

  const buildCode = () => {
    const attrs: string[] = [];
    if (controls) attrs.push("controls");
    if (autoplay) attrs.push("autoplay");
    if (loop) attrs.push("loop");
    if (muted) attrs.push("muted");
    if (preload !== "auto") attrs.push(`preload="${preload}"`);
    const attrStr = attrs.length > 0 ? " " + attrs.join(" ") : "";
    return `<audio${attrStr}>\n  <source src="song.mp3" type="audio/mpeg">\n  <source src="song.ogg" type="audio/ogg">\n  Your browser does not support audio.\n</audio>`;
  };

  return (
    <div className="space-y-6">
      {/* Interactive attribute builder */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">&lt;audio&gt; Attribute Builder</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Toggle attributes to see how they affect the audio element and generated code.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Controls */}
            <div className="rounded-xl border p-4 space-y-3">
              <p className="text-xs font-semibold">Attributes:</p>
              {attributes.map((attr) => (
                <label key={attr.name} className="flex items-start gap-2 text-sm cursor-pointer">
                  {attr.type === "boolean" ? (
                    <input
                      type="checkbox"
                      className="mt-0.5"
                      checked={
                        attr.name === "controls" ? controls :
                        attr.name === "autoplay" ? autoplay :
                        attr.name === "loop" ? loop : muted
                      }
                      onChange={(e) => {
                        const v = e.target.checked;
                        if (attr.name === "controls") setControls(v);
                        else if (attr.name === "autoplay") setAutoplay(v);
                        else if (attr.name === "loop") setLoop(v);
                        else if (attr.name === "muted") setMuted(v);
                      }}
                    />
                  ) : (
                    <select
                      className="text-xs border rounded px-1 py-0.5 bg-background"
                      value={preload}
                      onChange={(e) => setPreload(e.target.value as PreloadOption)}
                    >
                      <option value="none">none</option>
                      <option value="metadata">metadata</option>
                      <option value="auto">auto</option>
                    </select>
                  )}
                  <span>
                    <code className="text-primary font-bold">{attr.name}</code>
                    <span className="text-muted-foreground text-xs ml-1">— {attr.desc}</span>
                  </span>
                </label>
              ))}

              {autoplay && !muted && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-amber-500 bg-amber-500/10 rounded-lg p-2"
                >
                  Most browsers block autoplay with sound. Add <code className="font-bold">muted</code> for autoplay to work.
                </motion.div>
              )}
            </div>

            {/* Generated code */}
            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
              {buildCode()}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Format support */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Audio Format Support</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Format</th>
                  <th className="text-left p-2">MIME Type</th>
                  <th className="text-left p-2">Chrome</th>
                  <th className="text-left p-2">Firefox</th>
                  <th className="text-left p-2">Safari</th>
                  <th className="text-left p-2">Best For</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { format: "MP3", mime: "audio/mpeg", chrome: true, firefox: true, safari: true, best: "Universal fallback" },
                  { format: "OGG Vorbis", mime: "audio/ogg", chrome: true, firefox: true, safari: false, best: "Open-source alternative" },
                  { format: "WAV", mime: "audio/wav", chrome: true, firefox: true, safari: true, best: "Lossless, large files" },
                  { format: "AAC", mime: "audio/aac", chrome: true, firefox: true, safari: true, best: "Better quality than MP3" },
                  { format: "WebM/Opus", mime: "audio/webm", chrome: true, firefox: true, safari: false, best: "Low bitrate, high quality" },
                ].map((row) => (
                  <tr key={row.format} className="border-b last:border-0">
                    <td className="p-2 font-semibold">{row.format}</td>
                    <td className="p-2"><code className="text-primary">{row.mime}</code></td>
                    <td className="p-2">{row.chrome ? "Yes" : "No"}</td>
                    <td className="p-2">{row.firefox ? "Yes" : "No"}</td>
                    <td className="p-2">{row.safari ? "Yes" : "No"}</td>
                    <td className="p-2 text-muted-foreground">{row.best}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* JS API */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">JavaScript Audio API</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { method: "play()", desc: "Starts playback — returns a Promise" },
              { method: "pause()", desc: "Pauses playback at current position" },
              { method: "volume = 0.5", desc: "Set volume (0.0 to 1.0)" },
              { method: "currentTime = 10", desc: "Seek to 10 seconds" },
              { method: "duration", desc: "Total length in seconds (read-only)" },
              { method: "ended", desc: "Boolean — true when playback finished" },
            ].map((item, i) => (
              <motion.div
                key={item.method}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 rounded-lg border p-2.5"
              >
                <code className="text-xs text-primary font-bold shrink-0">{item.method}</code>
                <span className="text-xs text-muted-foreground">{item.desc}</span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
