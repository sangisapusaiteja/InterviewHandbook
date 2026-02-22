"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ListNode {
  value: number;
  id: number;
}

let nodeIdCounter = 100;

export function LinkedListVisualization() {
  const [nodes, setNodes] = useState<ListNode[]>([
    { value: 10, id: 1 },
    { value: 20, id: 2 },
    { value: 30, id: 3 },
  ]);
  const [lastAction, setLastAction] = useState("");

  const addToHead = () => {
    if (nodes.length >= 7) return;
    const val = Math.floor(Math.random() * 90) + 10;
    nodeIdCounter++;
    setNodes([{ value: val, id: nodeIdCounter }, ...nodes]);
    setLastAction(`Added ${val} to head`);
  };

  const addToTail = () => {
    if (nodes.length >= 7) return;
    const val = Math.floor(Math.random() * 90) + 10;
    nodeIdCounter++;
    setNodes([...nodes, { value: val, id: nodeIdCounter }]);
    setLastAction(`Added ${val} to tail`);
  };

  const removeHead = () => {
    if (nodes.length === 0) return;
    setLastAction(`Removed ${nodes[0].value} from head`);
    setNodes(nodes.slice(1));
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Linked List Visualization</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-6">
          {/* Controls */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <Button onClick={addToHead} size="sm" disabled={nodes.length >= 7}>
              <Plus className="h-4 w-4 mr-1" />
              Add Head
            </Button>
            <Button onClick={addToTail} size="sm" disabled={nodes.length >= 7}>
              <Plus className="h-4 w-4 mr-1" />
              Add Tail
            </Button>
            <Button
              onClick={removeHead}
              variant="destructive"
              size="sm"
              disabled={nodes.length === 0}
            >
              <Minus className="h-4 w-4 mr-1" />
              Remove Head
            </Button>
          </div>

          {lastAction && (
            <motion.p
              key={lastAction}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-muted-foreground"
            >
              {lastAction}
            </motion.p>
          )}

          {/* Linked List visual */}
          <div className="flex items-center gap-0 overflow-x-auto py-4 px-2 w-full">
            <div className="text-xs text-primary font-semibold mr-2 shrink-0">
              HEAD
            </div>
            <AnimatePresence mode="popLayout">
              {nodes.map((node, index) => (
                <motion.div
                  key={node.id}
                  layout
                  initial={{ opacity: 0, scale: 0.5, x: -20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.5, x: -20 }}
                  transition={{ type: "spring", bounce: 0.3 }}
                  className="flex items-center shrink-0"
                >
                  <div className="flex border-2 border-primary/30 rounded-lg overflow-hidden">
                    {/* Data part */}
                    <div className="w-12 h-12 flex items-center justify-center font-mono font-bold text-sm bg-primary/10">
                      {node.value}
                    </div>
                    {/* Pointer part */}
                    <div className="w-8 h-12 flex items-center justify-center border-l border-primary/30 bg-primary/5">
                      {index < nodes.length - 1 ? (
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      ) : (
                        <span className="text-[9px] text-muted-foreground">
                          null
                        </span>
                      )}
                    </div>
                  </div>
                  {index < nodes.length - 1 && (
                    <ArrowRight className="h-4 w-4 text-primary mx-1 shrink-0" />
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            {nodes.length === 0 && (
              <p className="text-sm text-muted-foreground">Empty List (null)</p>
            )}
          </div>

          <p className="text-xs text-muted-foreground text-center max-w-sm">
            Each node has two parts: data and a pointer to the next node. The
            last node points to null.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
