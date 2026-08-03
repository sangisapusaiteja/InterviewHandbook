"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DocNode {
  tag: string;
  description: string;
  children?: DocNode[];
  color: string;
}

const docTree: DocNode = {
  tag: "<!DOCTYPE html>",
  description: "Tells the browser this is an HTML5 document",
  color: "bg-zinc-500",
  children: [
    {
      tag: "<html>",
      description: "Root element — everything goes inside this",
      color: "bg-orange-500",
      children: [
        {
          tag: "<head>",
          description: "Metadata — not visible on the page",
          color: "bg-blue-500",
          children: [
            { tag: "<meta charset>", description: "Character encoding (UTF-8)", color: "bg-blue-400" },
            { tag: "<title>", description: "Page title shown in browser tab", color: "bg-blue-400" },
            { tag: "<link>", description: "Links to stylesheets or icons", color: "bg-blue-400" },
          ],
        },
        {
          tag: "<body>",
          description: "Visible content — everything users see",
          color: "bg-emerald-500",
          children: [
            { tag: "<h1>", description: "Main heading of the page", color: "bg-emerald-400" },
            { tag: "<p>", description: "Paragraph of text", color: "bg-emerald-400" },
            { tag: "<img>", description: "An image element", color: "bg-emerald-400" },
          ],
        },
      ],
    },
  ],
};

function TreeNode({
  node,
  depth = 0,
  activeTag,
  onSelect,
}: {
  node: DocNode;
  depth?: number;
  activeTag: string;
  onSelect: (tag: string) => void;
}) {
  const isActive = activeTag === node.tag;
  return (
    <div className="flex flex-col">
      <motion.button
        onClick={() => onSelect(node.tag)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{ marginLeft: depth * 24 }}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-left transition-colors ${
          isActive ? "ring-2 ring-primary bg-primary/10" : "hover:bg-accent"
        }`}
      >
        <span className={`w-3 h-3 rounded-sm shrink-0 ${node.color}`} />
        <code className="text-xs font-mono font-semibold">{node.tag}</code>
      </motion.button>
      {node.children?.map((child) => (
        <TreeNode
          key={child.tag}
          node={child}
          depth={depth + 1}
          activeTag={activeTag}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

function findNode(tree: DocNode, tag: string): DocNode | undefined {
  if (tree.tag === tag) return tree;
  for (const child of tree.children ?? []) {
    const found = findNode(child, tag);
    if (found) return found;
  }
  return undefined;
}

export function DocumentStructureVisualization() {
  const [activeTag, setActiveTag] = useState("<!DOCTYPE html>");
  const activeNode = findNode(docTree, activeTag);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">HTML Document Structure</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Click any element to learn what it does.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Tree */}
          <div className="space-y-1 rounded-xl border p-3 bg-muted/30">
            <TreeNode
              node={docTree}
              activeTag={activeTag}
              onSelect={setActiveTag}
            />
          </div>
          {/* Detail */}
          {activeNode && (
            <motion.div
              key={activeTag}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-xl border p-4 space-y-2"
            >
              <div className="flex items-center gap-2">
                <span className={`w-4 h-4 rounded-sm ${activeNode.color}`} />
                <code className="font-mono font-bold text-sm">
                  {activeNode.tag}
                </code>
              </div>
              <p className="text-sm">{activeNode.description}</p>
              {activeNode.children && (
                <p className="text-xs text-muted-foreground">
                  Contains {activeNode.children.length} child element
                  {activeNode.children.length > 1 ? "s" : ""}
                </p>
              )}
            </motion.div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
