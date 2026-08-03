"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type ImageTechnique = "max-width" | "srcset" | "picture" | "object-fit";

const techniques: { id: ImageTechnique; label: string }[] = [
  { id: "max-width", label: "max-width: 100%" },
  { id: "srcset", label: "srcset & sizes" },
  { id: "picture", label: "<picture> Element" },
  { id: "object-fit", label: "object-fit" },
];

const objectFitValues = [
  { value: "cover", desc: "Fills container, crops to maintain aspect ratio. Most common for hero images and cards.", color: "bg-blue-500" },
  { value: "contain", desc: "Fits entirely within container, may leave empty space. Good for logos and icons.", color: "bg-emerald-500" },
  { value: "fill", desc: "Stretches to fill container, distorting aspect ratio. Rarely desired.", color: "bg-orange-500" },
  { value: "none", desc: "Image at natural size, may overflow container. Original dimensions preserved.", color: "bg-purple-500" },
  { value: "scale-down", desc: "Like contain, but never scales up beyond natural size.", color: "bg-rose-500" },
];

export function ResponsiveImagesVisualization() {
  const [activeTechnique, setActiveTechnique] = useState<ImageTechnique>("max-width");

  return (
    <div className="space-y-6">
      {/* Technique selector */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Responsive Image Techniques</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {techniques.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTechnique(t.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTechnique === t.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <motion.div
            key={activeTechnique}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Explanation */}
            <div className="rounded-xl border p-4 space-y-3">
              {activeTechnique === "max-width" && (
                <>
                  <Badge className="bg-blue-500 text-[10px]">Foundation Pattern</Badge>
                  <p className="text-xs text-muted-foreground">
                    The simplest responsive image technique. The image scales down to fit its container but never grows beyond its natural width.
                  </p>
                  <div className="space-y-2">
                    <div className="rounded-lg bg-muted/50 p-3 space-y-1">
                      <p className="text-[10px] font-semibold">How it works:</p>
                      <p className="text-[10px] text-muted-foreground">1. <code className="text-primary">max-width: 100%</code> -- image never exceeds container width</p>
                      <p className="text-[10px] text-muted-foreground">2. <code className="text-primary">height: auto</code> -- maintains aspect ratio</p>
                      <p className="text-[10px] text-muted-foreground">3. <code className="text-primary">display: block</code> -- removes inline whitespace gap</p>
                    </div>
                  </div>
                </>
              )}
              {activeTechnique === "srcset" && (
                <>
                  <Badge className="bg-emerald-500 text-[10px]">Performance Optimization</Badge>
                  <p className="text-xs text-muted-foreground">
                    Let the browser choose the best image file based on screen size and pixel density. Saves bandwidth on small devices.
                  </p>
                  <div className="space-y-2">
                    <div className="rounded-lg bg-muted/50 p-3 space-y-1">
                      <p className="text-[10px] font-semibold">srcset attributes:</p>
                      <p className="text-[10px] text-muted-foreground"><code className="text-primary">w descriptor</code> -- tells browser the image width (e.g., 800w)</p>
                      <p className="text-[10px] text-muted-foreground"><code className="text-primary">x descriptor</code> -- pixel density (e.g., 2x for Retina)</p>
                      <p className="text-[10px] font-semibold mt-2">sizes attribute:</p>
                      <p className="text-[10px] text-muted-foreground">Tells browser how wide the image will be displayed at each breakpoint</p>
                    </div>
                  </div>
                </>
              )}
              {activeTechnique === "picture" && (
                <>
                  <Badge className="bg-purple-500 text-[10px]">Art Direction</Badge>
                  <p className="text-xs text-muted-foreground">
                    Serve completely different images at different breakpoints. Use for art direction -- cropping, different compositions, or different formats.
                  </p>
                  <div className="space-y-2">
                    <div className="rounded-lg bg-muted/50 p-3 space-y-1">
                      <p className="text-[10px] font-semibold">When to use:</p>
                      <p className="text-[10px] text-muted-foreground">1. Different crop/composition at different sizes</p>
                      <p className="text-[10px] text-muted-foreground">2. Serving modern formats (WebP, AVIF) with fallbacks</p>
                      <p className="text-[10px] text-muted-foreground">3. Dark mode vs light mode images</p>
                    </div>
                  </div>
                </>
              )}
              {activeTechnique === "object-fit" && (
                <>
                  <Badge className="bg-orange-500 text-[10px]">Container Fitting</Badge>
                  <p className="text-xs text-muted-foreground">
                    Controls how an image fills its container, similar to background-size but for <code className="text-primary">&lt;img&gt;</code> elements.
                  </p>
                  <div className="space-y-1.5">
                    {objectFitValues.map((v, i) => (
                      <motion.div
                        key={v.value}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-start gap-2"
                      >
                        <Badge className={`${v.color} text-[10px] shrink-0`}>{v.value}</Badge>
                        <p className="text-[10px] text-muted-foreground">{v.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Code block */}
            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
              {activeTechnique === "max-width"
                ? `/* Basic responsive image */
img {
  max-width: 100%;
  height: auto;
  display: block;
}

/* With container constraint */
.image-wrapper {
  max-width: 800px;
  margin: 0 auto;
}

.image-wrapper img {
  width: 100%;
  height: auto;
}

/* Prevent layout shift */
.image-wrapper {
  aspect-ratio: 16 / 9;
  overflow: hidden;
}`
                : activeTechnique === "srcset"
                ? `<!-- Width descriptor (w) -->
<img
  src="photo-800.jpg"
  srcset="
    photo-400.jpg  400w,
    photo-800.jpg  800w,
    photo-1200.jpg 1200w
  "
  sizes="
    (max-width: 480px) 100vw,
    (max-width: 1024px) 50vw,
    33vw
  "
  alt="Responsive photo"
/>

<!-- Pixel density descriptor (x) -->
<img
  src="logo.png"
  srcset="
    logo.png    1x,
    logo@2x.png 2x,
    logo@3x.png 3x
  "
  alt="Logo"
/>`
                : activeTechnique === "picture"
                ? `<!-- Art direction: different crops -->
<picture>
  <source
    media="(min-width: 1024px)"
    srcset="hero-wide.jpg"
  />
  <source
    media="(min-width: 768px)"
    srcset="hero-medium.jpg"
  />
  <img src="hero-mobile.jpg"
       alt="Hero image" />
</picture>

<!-- Modern format with fallback -->
<picture>
  <source
    type="image/avif"
    srcset="photo.avif"
  />
  <source
    type="image/webp"
    srcset="photo.webp"
  />
  <img src="photo.jpg"
       alt="Photo" />
</picture>`
                : `/* object-fit on fixed containers */
.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  object-position: center;
}

/* Contain for logos */
.logo {
  width: 120px;
  height: 60px;
  object-fit: contain;
}

/* Responsive card image */
.card {
  aspect-ratio: 4 / 3;
  overflow: hidden;
}

.card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.card:hover img {
  transform: scale(1.05);
}`}
            </div>
          </motion.div>
        </CardContent>
      </Card>

      {/* Technique comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">When to Use Each Technique</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Technique</th>
                  <th className="text-left p-2">Use Case</th>
                  <th className="text-left p-2">Limitation</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { tech: "max-width: 100%", use: "All images (baseline)", limit: "Doesn't save bandwidth -- same file regardless of screen" },
                  { tech: "srcset + sizes", use: "Same image at different resolutions", limit: "Browser chooses which to download -- you can't force it" },
                  { tech: "<picture>", use: "Different images per breakpoint, format fallbacks", limit: "More HTML markup, browser must support <picture>" },
                  { tech: "object-fit", use: "Fixed-size containers needing proper image filling", limit: "Doesn't reduce file size, just changes display" },
                ].map((row) => (
                  <tr key={row.tech} className="border-b last:border-0">
                    <td className="p-2 font-semibold"><code className="text-primary">{row.tech}</code></td>
                    <td className="p-2 text-muted-foreground">{row.use}</td>
                    <td className="p-2 text-muted-foreground">{row.limit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Interview reference */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Interview Quick Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Question</th>
                  <th className="text-left p-2">Key Answer</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { q: "How do you make images responsive?", a: "img { max-width: 100%; height: auto; } as the foundation, plus srcset for performance" },
                  { q: "srcset vs <picture>?", a: "srcset: same image, different resolutions. <picture>: different images/formats per breakpoint (art direction)" },
                  { q: "What is object-fit: cover?", a: "Image fills its container completely, cropping if needed to maintain aspect ratio" },
                  { q: "How to prevent layout shift?", a: "Set width/height attributes or use aspect-ratio on the container" },
                ].map((row) => (
                  <tr key={row.q} className="border-b last:border-0">
                    <td className="p-2 font-semibold">{row.q}</td>
                    <td className="p-2 text-muted-foreground">{row.a}</td>
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
