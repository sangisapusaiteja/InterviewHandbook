"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type BtnType = "submit" | "reset" | "button";

interface ButtonTypeInfo {
  type: BtnType;
  label: string;
  description: string;
  default: boolean;
  color: string;
}

const buttonTypes: ButtonTypeInfo[] = [
  {
    type: "submit",
    label: "Submit",
    description: "Submits the parent <form> — this is the DEFAULT if type is omitted. Triggers validation and sends data.",
    default: true,
    color: "bg-blue-500",
  },
  {
    type: "reset",
    label: "Reset",
    description: "Resets ALL form fields to their initial values. Use sparingly — users rarely expect it.",
    default: false,
    color: "bg-amber-500",
  },
  {
    type: "button",
    label: "Button",
    description: "Does nothing by default. Used with JavaScript onclick for custom actions. Always set this type for non-form buttons.",
    default: false,
    color: "bg-emerald-500",
  },
];

export function ButtonsAndLabelsVisualization() {
  const [activeType, setActiveType] = useState<BtnType>("submit");
  const [formValue, setFormValue] = useState("Initial Text");
  const [action, setAction] = useState<string | null>(null);
  const activeInfo = buttonTypes.find((b) => b.type === activeType)!;

  const handleAction = (type: BtnType) => {
    if (type === "submit") setAction("Form submitted!");
    else if (type === "reset") {
      setFormValue("Initial Text");
      setAction("Form reset!");
    } else {
      setAction("Custom action triggered!");
    }
    setTimeout(() => setAction(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Button types */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Button Types</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            {buttonTypes.map((bt) => (
              <button
                key={bt.type}
                onClick={() => setActiveType(bt.type)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeType === bt.type
                    ? `${bt.color} text-white`
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                type=&quot;{bt.type}&quot;
                {bt.default && " (default)"}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeType}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="rounded-xl border p-4 space-y-3"
            >
              <div className="flex items-center gap-2">
                <Badge className={activeInfo.color}>type=&quot;{activeInfo.type}&quot;</Badge>
                {activeInfo.default && (
                  <Badge variant="destructive" className="text-[9px]">Default if omitted</Badge>
                )}
              </div>
              <p className="text-sm">{activeInfo.description}</p>
            </motion.div>
          </AnimatePresence>

          {/* Interactive demo */}
          <div className="rounded-xl border p-4 bg-white dark:bg-zinc-900 space-y-3">
            <p className="text-xs font-semibold">Try it:</p>
            <div className="space-y-2">
              <input
                type="text"
                value={formValue}
                onChange={(e) => setFormValue(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm"
              />
              <div className="flex gap-2 flex-wrap">
                {buttonTypes.map((bt) => (
                  <button
                    key={bt.type}
                    onClick={() => handleAction(bt.type)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold text-white ${bt.color} hover:opacity-90 transition-opacity`}
                  >
                    {bt.label}
                  </button>
                ))}
              </div>
              <AnimatePresence>
                {action && (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-primary font-semibold"
                  >
                    {action}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Label connection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Label Connection Methods</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Method 1 */}
            <div className="rounded-xl border p-4 space-y-2">
              <Badge>Method 1: for + id</Badge>
              <div className="rounded-lg bg-zinc-950 p-3 font-mono text-xs space-y-0.5">
                <div><span className="text-orange-400">&lt;label</span> <span className="text-blue-400">for=&quot;email&quot;</span><span className="text-orange-400">&gt;</span></div>
                <div className="pl-4 text-zinc-300">Email:</div>
                <div><span className="text-red-400">&lt;/label&gt;</span></div>
                <div><span className="text-orange-400">&lt;input</span> <span className="text-blue-400">id=&quot;email&quot;</span><span className="text-orange-400"> /&gt;</span></div>
              </div>
              <p className="text-[10px] text-muted-foreground">
                for value must match input id. Works anywhere on page.
              </p>
            </div>

            {/* Method 2 */}
            <div className="rounded-xl border p-4 space-y-2">
              <Badge variant="secondary">Method 2: Wrapping</Badge>
              <div className="rounded-lg bg-zinc-950 p-3 font-mono text-xs space-y-0.5">
                <div><span className="text-orange-400">&lt;label&gt;</span></div>
                <div className="pl-4 text-zinc-300">Email:</div>
                <div className="pl-4"><span className="text-orange-400">&lt;input /&gt;</span></div>
                <div><span className="text-red-400">&lt;/label&gt;</span></div>
              </div>
              <p className="text-[10px] text-muted-foreground">
                No for/id needed. Simpler but less flexible.
              </p>
            </div>
          </div>

          {/* Click area demo */}
          <div className="rounded-xl bg-muted/50 p-3 space-y-2">
            <p className="text-xs font-semibold">Click area comparison:</p>
            <div className="flex items-center gap-6">
              <div className="text-xs">
                <input type="checkbox" /> <span className="text-muted-foreground">No label (tiny target)</span>
              </div>
              <div className="text-xs">
                <label className="cursor-pointer bg-primary/10 px-2 py-1 rounded">
                  <input type="checkbox" /> <span>With label (click anywhere here)</span>
                </label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
