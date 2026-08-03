"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, RotateCcw, TreePine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BTreeNode {
  id: string;
  keys: number[];
  level: "root" | "internal" | "leaf";
  children?: string[];
  rowPointers?: number[];
}

const nodes: Record<string, BTreeNode> = {
  root: { id: "root", keys: [30, 60], level: "root", children: ["int1", "int2", "int3"] },
  int1: { id: "int1", keys: [10, 20], level: "internal", children: ["leaf1", "leaf2", "leaf3"] },
  int2: { id: "int2", keys: [40, 50], level: "internal", children: ["leaf4", "leaf5", "leaf6"] },
  int3: { id: "int3", keys: [70, 80], level: "internal", children: ["leaf7", "leaf8", "leaf9"] },
  leaf1: { id: "leaf1", keys: [5, 8], level: "leaf", rowPointers: [5, 8] },
  leaf2: { id: "leaf2", keys: [12, 15], level: "leaf", rowPointers: [12, 15] },
  leaf3: { id: "leaf3", keys: [22, 25, 28], level: "leaf", rowPointers: [22, 25, 28] },
  leaf4: { id: "leaf4", keys: [32, 35], level: "leaf", rowPointers: [32, 35] },
  leaf5: { id: "leaf5", keys: [42, 45], level: "leaf", rowPointers: [42, 45] },
  leaf6: { id: "leaf6", keys: [52, 55], level: "leaf", rowPointers: [52, 55] },
  leaf7: { id: "leaf7", keys: [62, 65], level: "leaf", rowPointers: [62, 65] },
  leaf8: { id: "leaf8", keys: [72, 75], level: "leaf", rowPointers: [72, 75] },
  leaf9: { id: "leaf9", keys: [82, 85, 90], level: "leaf", rowPointers: [82, 85, 90] },
};

const searchTargets = [42, 25, 72, 8, 55, 85];

function findSearchPath(target: number): string[] {
  const path: string[] = ["root"];
  const root = nodes["root"];

  // Find internal node
  let internalIdx = root.children!.length - 1;
  for (let i = 0; i < root.keys.length; i++) {
    if (target < root.keys[i]) { internalIdx = i; break; }
  }
  const internalId = root.children![internalIdx];
  path.push(internalId);

  // Find leaf node
  const internal = nodes[internalId];
  let leafIdx = internal.children!.length - 1;
  for (let i = 0; i < internal.keys.length; i++) {
    if (target < internal.keys[i]) { leafIdx = i; break; }
  }
  const leafId = internal.children![leafIdx];
  path.push(leafId);

  return path;
}

const levelColors = {
  root: { bg: "bg-violet-500/15", border: "border-violet-500/40", text: "text-violet-700 dark:text-violet-300", active: "bg-violet-500/30 border-violet-500/60" },
  internal: { bg: "bg-blue-500/15", border: "border-blue-500/40", text: "text-blue-700 dark:text-blue-300", active: "bg-blue-500/30 border-blue-500/60" },
  leaf: { bg: "bg-emerald-500/15", border: "border-emerald-500/40", text: "text-emerald-700 dark:text-emerald-300", active: "bg-emerald-500/30 border-emerald-500/60" },
};

export function BTreeIndexVisualization() {
  const [targetIdx, setTargetIdx] = useState(0);
  const [searching, setSearching] = useState(false);
  const [pathStep, setPathStep] = useState(-1);
  const [searchPath, setSearchPath] = useState<string[]>([]);
  const [foundKey, setFoundKey] = useState<number | null>(null);

  const target = searchTargets[targetIdx];

  const reset = useCallback(() => {
    setSearching(false);
    setPathStep(-1);
    setSearchPath([]);
    setFoundKey(null);
  }, []);

  const startSearch = () => {
    reset();
    const path = findSearchPath(target);
    setSearchPath(path);
    setSearching(true);
    setPathStep(0);
  };

  useEffect(() => {
    if (!searching || pathStep < 0) return;
    if (pathStep >= searchPath.length) {
      setFoundKey(target);
      setSearching(false);
      return;
    }
    const timer = setTimeout(() => {
      setPathStep((s) => s + 1);
    }, 800);
    return () => clearTimeout(timer);
  }, [searching, pathStep, searchPath.length, target]);

  const isNodeActive = (nodeId: string) => {
    if (pathStep < 0) return false;
    const idx = searchPath.indexOf(nodeId);
    return idx >= 0 && idx <= pathStep;
  };

  const isNodeCurrent = (nodeId: string) => {
    if (pathStep < 0 || pathStep >= searchPath.length) return false;
    return searchPath[pathStep] === nodeId;
  };

  const renderNode = (nodeId: string) => {
    const node = nodes[nodeId];
    const colors = levelColors[node.level];
    const active = isNodeActive(nodeId);
    const current = isNodeCurrent(nodeId);

    return (
      <motion.div
        key={nodeId}
        animate={{
          scale: current ? 1.08 : 1,
          boxShadow: current ? "0 0 12px rgba(139, 92, 246, 0.3)" : "none",
        }}
        transition={{ duration: 0.3 }}
        className={`inline-flex items-center gap-0.5 px-2 py-1.5 rounded-lg border text-[10px] font-mono font-bold ${
          active ? colors.active + " " + colors.text : colors.bg + " " + colors.border + " " + colors.text
        }`}
      >
        {node.keys.map((k, i) => (
          <span key={i} className="flex items-center gap-0.5">
            {i > 0 && <span className="text-muted-foreground mx-0.5">|</span>}
            <span className={foundKey === k ? "text-amber-500 dark:text-amber-400" : ""}>
              {k}
            </span>
          </span>
        ))}
      </motion.div>
    );
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">B-Tree Index</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Description */}
        <div className="rounded-xl border bg-violet-500/10 border-violet-500/30 p-3">
          <div className="flex items-center gap-2 mb-1">
            <TreePine className="h-4 w-4 text-violet-600 dark:text-violet-400" />
            <p className="text-xs font-bold text-violet-700 dark:text-violet-300">B-Tree Structure</p>
          </div>
          <p className="text-xs text-violet-700/80 dark:text-violet-300/80">
            The default index type in PostgreSQL. A balanced tree where each node contains sorted keys.
            Search starts at the root and traverses down to a leaf node in O(log n) steps.
          </p>
        </div>

        {/* Search controls */}
        <div className="flex items-center gap-3 flex-wrap">
          <p className="text-xs font-semibold text-muted-foreground">Search for:</p>
          <div className="flex gap-1.5">
            {searchTargets.map((t, i) => (
              <motion.button
                key={t}
                onClick={() => { setTargetIdx(i); reset(); }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-2.5 py-1 rounded-lg border text-xs font-mono font-bold transition-all ${
                  targetIdx === i
                    ? "bg-amber-500/15 border-amber-500/40 text-amber-700 dark:text-amber-300 shadow-sm"
                    : "bg-background border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {t}
              </motion.button>
            ))}
          </div>
          <div className="flex gap-2 ml-auto">
            <Button size="sm" onClick={startSearch} disabled={searching}>
              <Search className="h-3.5 w-3.5 mr-1" /> Search
            </Button>
            <Button size="sm" variant="outline" onClick={reset}>
              <RotateCcw className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        {/* B-Tree visualization */}
        <div className="space-y-4">
          {/* Level labels */}
          <div className="flex items-center gap-3 flex-wrap">
            {(["root", "internal", "leaf"] as const).map((level) => {
              const c = levelColors[level];
              return (
                <div key={level} className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-medium ${c.bg} ${c.border} border ${c.text}`}>
                  <div className={`w-2 h-2 rounded-sm ${c.bg} ${c.border} border`} />
                  {level}
                </div>
              );
            })}
          </div>

          {/* Root level */}
          <div className="flex justify-center">
            {renderNode("root")}
          </div>

          {/* Connector lines root -> internal */}
          <div className="flex justify-center">
            <svg width="400" height="24" viewBox="0 0 400 24" className="overflow-visible">
              <line x1="200" y1="0" x2="70" y2="24" stroke="currentColor" strokeWidth="1" className="text-muted-foreground/40" />
              <line x1="200" y1="0" x2="200" y2="24" stroke="currentColor" strokeWidth="1" className="text-muted-foreground/40" />
              <line x1="200" y1="0" x2="330" y2="24" stroke="currentColor" strokeWidth="1" className="text-muted-foreground/40" />
            </svg>
          </div>

          {/* Internal level */}
          <div className="flex justify-center gap-6">
            {renderNode("int1")}
            {renderNode("int2")}
            {renderNode("int3")}
          </div>

          {/* Connector lines internal -> leaf */}
          <div className="flex justify-center">
            <svg width="500" height="24" viewBox="0 0 500 24" className="overflow-visible">
              {/* int1 connections */}
              <line x1="85" y1="0" x2="30" y2="24" stroke="currentColor" strokeWidth="1" className="text-muted-foreground/30" />
              <line x1="85" y1="0" x2="85" y2="24" stroke="currentColor" strokeWidth="1" className="text-muted-foreground/30" />
              <line x1="85" y1="0" x2="140" y2="24" stroke="currentColor" strokeWidth="1" className="text-muted-foreground/30" />
              {/* int2 connections */}
              <line x1="250" y1="0" x2="195" y2="24" stroke="currentColor" strokeWidth="1" className="text-muted-foreground/30" />
              <line x1="250" y1="0" x2="250" y2="24" stroke="currentColor" strokeWidth="1" className="text-muted-foreground/30" />
              <line x1="250" y1="0" x2="305" y2="24" stroke="currentColor" strokeWidth="1" className="text-muted-foreground/30" />
              {/* int3 connections */}
              <line x1="415" y1="0" x2="360" y2="24" stroke="currentColor" strokeWidth="1" className="text-muted-foreground/30" />
              <line x1="415" y1="0" x2="415" y2="24" stroke="currentColor" strokeWidth="1" className="text-muted-foreground/30" />
              <line x1="415" y1="0" x2="470" y2="24" stroke="currentColor" strokeWidth="1" className="text-muted-foreground/30" />
            </svg>
          </div>

          {/* Leaf level */}
          <div className="flex justify-center gap-2 flex-wrap">
            {["leaf1", "leaf2", "leaf3", "leaf4", "leaf5", "leaf6", "leaf7", "leaf8", "leaf9"].map(
              (id) => renderNode(id)
            )}
          </div>
        </div>

        {/* Search path explanation */}
        <AnimatePresence>
          {(pathStep >= 0 || foundKey !== null) && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-2"
            >
              <p className="text-xs font-semibold text-muted-foreground">Search Path</p>
              <div className="flex items-center gap-2 flex-wrap">
                {searchPath.map((nodeId, i) => {
                  const node = nodes[nodeId];
                  const visited = i <= pathStep;
                  const c = levelColors[node.level];
                  return (
                    <div key={nodeId} className="flex items-center gap-2">
                      {i > 0 && <span className="text-muted-foreground text-xs">→</span>}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: visited ? 1 : 0.3, scale: visited ? 1 : 0.9 }}
                        className={`px-2 py-1 rounded-lg border text-[10px] font-mono font-bold ${c.bg} ${c.border} ${c.text}`}
                      >
                        [{node.keys.join(", ")}]
                      </motion.div>
                    </div>
                  );
                })}
              </div>
              {foundKey !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-700 dark:text-emerald-300"
                >
                  <p className="font-semibold">
                    Found key {foundKey} in {searchPath.length} steps (root → internal → leaf).
                    With 50,000 rows a B-tree only needs ~4 levels.
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
