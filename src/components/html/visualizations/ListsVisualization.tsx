"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type ListType = "ul" | "ol" | "dl";

interface ListTypeInfo {
  id: ListType;
  label: string;
  tag: string;
  description: string;
  itemTag: string;
}

const listTypes: ListTypeInfo[] = [
  {
    id: "ul",
    label: "Unordered List",
    tag: "<ul>",
    description: "Bullet points — order does not matter. Use for navigation menus, feature lists, etc.",
    itemTag: "<li>",
  },
  {
    id: "ol",
    label: "Ordered List",
    tag: "<ol>",
    description: "Numbered items — order matters. Use for steps, rankings, instructions.",
    itemTag: "<li>",
  },
  {
    id: "dl",
    label: "Description List",
    tag: "<dl>",
    description: "Term-description pairs — like a glossary. Uses <dt> for terms and <dd> for descriptions.",
    itemTag: "<dt>/<dd>",
  },
];

const defaultItems = ["HTML", "CSS", "JavaScript"];

export function ListsVisualization() {
  const [activeType, setActiveType] = useState<ListType>("ul");
  const [items, setItems] = useState<string[]>(defaultItems);
  const [newItem, setNewItem] = useState("");

  const addItem = () => {
    const value = newItem.trim();
    if (value) {
      setItems((prev) => [...prev, value]);
      setNewItem("");
    }
  };

  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const activeInfo = listTypes.find((t) => t.id === activeType)!;

  // Generate code string
  const generateCode = () => {
    if (activeType === "dl") {
      const lines = items.map(
        (item) => `  <dt>${item}</dt>\n  <dd>Description of ${item}</dd>`
      );
      return `<dl>\n${lines.join("\n")}\n</dl>`;
    }
    const tag = activeType;
    const lines = items.map((item) => `  <li>${item}</li>`);
    return `<${tag}>\n${lines.join("\n")}\n</${tag}>`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">HTML Lists</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Type selector */}
        <div className="flex gap-2">
          {listTypes.map((lt) => (
            <button
              key={lt.id}
              onClick={() => setActiveType(lt.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeType === lt.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              {lt.label}
            </button>
          ))}
        </div>

        <p className="text-sm text-muted-foreground">{activeInfo.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Interactive list */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-[10px]">
                {activeInfo.tag} + {activeInfo.itemTag}
              </Badge>
            </div>

            {/* Add item */}
            <div className="flex gap-2">
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addItem()}
                placeholder="Add an item..."
                className="flex-1 px-3 py-1.5 rounded-lg border bg-background text-sm"
              />
              <Button size="sm" onClick={addItem} className="h-8">
                <Plus className="h-3.5 w-3.5" />
              </Button>
            </div>

            {/* Rendered preview */}
            <div className="rounded-xl border p-4 bg-white text-black dark:bg-zinc-900 dark:text-white min-h-[120px]">
              <AnimatePresence mode="popLayout">
                {activeType === "ul" && (
                  <ul className="list-disc pl-5 space-y-1">
                    {items.map((item, i) => (
                      <motion.li
                        key={`${item}-${i}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="text-sm flex items-center justify-between group"
                      >
                        <span>{item}</span>
                        <button
                          onClick={() => removeItem(i)}
                          className="opacity-0 group-hover:opacity-100 text-red-400 transition-opacity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                      </motion.li>
                    ))}
                  </ul>
                )}
                {activeType === "ol" && (
                  <ol className="list-decimal pl-5 space-y-1">
                    {items.map((item, i) => (
                      <motion.li
                        key={`${item}-${i}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="text-sm flex items-center justify-between group"
                      >
                        <span>{item}</span>
                        <button
                          onClick={() => removeItem(i)}
                          className="opacity-0 group-hover:opacity-100 text-red-400 transition-opacity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                      </motion.li>
                    ))}
                  </ol>
                )}
                {activeType === "dl" && (
                  <dl className="space-y-2">
                    {items.map((item, i) => (
                      <motion.div
                        key={`${item}-${i}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="group"
                      >
                        <dt className="text-sm font-semibold flex items-center justify-between">
                          <span>{item}</span>
                          <button
                            onClick={() => removeItem(i)}
                            className="opacity-0 group-hover:opacity-100 text-red-400 transition-opacity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                        </dt>
                        <dd className="text-xs text-muted-foreground pl-4">
                          Description of {item}
                        </dd>
                      </motion.div>
                    ))}
                  </dl>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Code view */}
          <div className="rounded-xl border bg-zinc-950 p-4 font-mono text-xs text-emerald-400 overflow-x-auto">
            <pre className="whitespace-pre">{generateCode()}</pre>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
