"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ComplexityData {
  name: string;
  notation: string;
  color: string;
  getY: (x: number) => number;
}

const complexities: ComplexityData[] = [
  {
    name: "Constant",
    notation: "O(1)",
    color: "#22c55e",
    getY: () => 1,
  },
  {
    name: "Logarithmic",
    notation: "O(log n)",
    color: "#3b82f6",
    getY: (x) => Math.log2(Math.max(x, 1)),
  },
  {
    name: "Linear",
    notation: "O(n)",
    color: "#eab308",
    getY: (x) => x,
  },
  {
    name: "Linearithmic",
    notation: "O(n log n)",
    color: "#f97316",
    getY: (x) => x * Math.log2(Math.max(x, 1)),
  },
  {
    name: "Quadratic",
    notation: "O(n²)",
    color: "#ef4444",
    getY: (x) => x * x,
  },
];

export function ComplexityVisualization() {
  const [hoveredLine, setHoveredLine] = useState<string | null>(null);
  const [inputSize, setInputSize] = useState(10);

  const width = 400;
  const height = 250;
  const padding = 40;
  const graphWidth = width - padding * 2;
  const graphHeight = height - padding * 2;

  const maxX = 20;
  const maxY = complexities[4].getY(maxX); // O(n²) at max

  const getPoint = (x: number, getY: (x: number) => number) => {
    const px = padding + (x / maxX) * graphWidth;
    const yVal = Math.min(getY(x), maxY);
    const py = height - padding - (yVal / maxY) * graphHeight;
    return { x: px, y: py };
  };

  const getPath = (getY: (x: number) => number) => {
    const points: string[] = [];
    for (let x = 0; x <= maxX; x += 0.5) {
      const p = getPoint(x, getY);
      points.push(`${x === 0 ? "M" : "L"} ${p.x} ${p.y}`);
    }
    return points.join(" ");
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">
          Time Complexity Comparison
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-4">
          {/* Graph */}
          <div className="w-full max-w-md">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
              {/* Grid lines */}
              {[0.25, 0.5, 0.75, 1].map((fraction) => (
                <line
                  key={fraction}
                  x1={padding}
                  y1={height - padding - fraction * graphHeight}
                  x2={width - padding}
                  y2={height - padding - fraction * graphHeight}
                  stroke="currentColor"
                  strokeOpacity={0.1}
                  strokeDasharray="4 4"
                />
              ))}

              {/* Axes */}
              <line
                x1={padding}
                y1={padding}
                x2={padding}
                y2={height - padding}
                stroke="currentColor"
                strokeOpacity={0.3}
                strokeWidth={1}
              />
              <line
                x1={padding}
                y1={height - padding}
                x2={width - padding}
                y2={height - padding}
                stroke="currentColor"
                strokeOpacity={0.3}
                strokeWidth={1}
              />

              {/* Axis labels */}
              <text
                x={width / 2}
                y={height - 5}
                textAnchor="middle"
                className="fill-current text-[10px] opacity-50"
              >
                Input Size (n)
              </text>
              <text
                x={12}
                y={height / 2}
                textAnchor="middle"
                className="fill-current text-[10px] opacity-50"
                transform={`rotate(-90, 12, ${height / 2})`}
              >
                Operations
              </text>

              {/* Lines */}
              {complexities.map((c) => (
                <motion.path
                  key={c.notation}
                  d={getPath(c.getY)}
                  fill="none"
                  stroke={c.color}
                  strokeWidth={
                    hoveredLine === c.notation ? 3 : 2
                  }
                  strokeOpacity={
                    hoveredLine && hoveredLine !== c.notation ? 0.2 : 0.8
                  }
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              ))}

              {/* Input size indicator */}
              <line
                x1={padding + (inputSize / maxX) * graphWidth}
                y1={padding}
                x2={padding + (inputSize / maxX) * graphWidth}
                y2={height - padding}
                stroke="currentColor"
                strokeOpacity={0.2}
                strokeWidth={1}
                strokeDasharray="4 2"
              />
            </svg>
          </div>

          {/* Input size slider */}
          <div className="w-full max-w-xs">
            <label className="text-xs text-muted-foreground block mb-1 text-center">
              Input Size: n = {inputSize}
            </label>
            <input
              type="range"
              min={1}
              max={20}
              value={inputSize}
              onChange={(e) => setInputSize(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Legend & values */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full">
            {complexities.map((c) => (
              <div
                key={c.notation}
                className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 cursor-pointer transition-colors"
                onMouseEnter={() => setHoveredLine(c.notation)}
                onMouseLeave={() => setHoveredLine(null)}
              >
                <div
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: c.color }}
                />
                <div className="min-w-0">
                  <p className="text-xs font-medium truncate">{c.name}</p>
                  <p className="text-[10px] text-muted-foreground font-mono">
                    {c.notation} = {Math.round(c.getY(inputSize))}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
