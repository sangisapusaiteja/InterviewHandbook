"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ─── ConsoleOutput ────────────────────────────────────────────────────────────
function ConsoleOutput({ lines }: Readonly<{ lines: string[] | null }>) {
  return (
    <AnimatePresence mode="wait">
      {lines ? (
        <motion.div
          key="out"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 px-4 py-3 font-mono text-xs space-y-1 min-h-[52px]"
        >
          {lines.map((line, idx) => (
            <p key={`${idx}-${line}`} className="text-emerald-400">
              <span className="text-zinc-500 select-none mr-2">&gt;&gt;&gt;</span>
              {line}
            </p>
          ))}
        </motion.div>
      ) : (
        <motion.div
          key="ph"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="rounded-xl border bg-muted/20 px-4 py-3 min-h-[52px] flex items-center justify-center"
        >
          <p className="text-xs text-muted-foreground italic">Click ▶ Run to see output</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── types ────────────────────────────────────────────────────────────────────
type TopicKey =
  | "creating"
  | "naming"
  | "multiple"
  | "global-local";

interface TopicDemo {
  label: string;
  category: string;
  color: string;
  badgeColor: string;
  example: string;
  description: string;
  note: string;
  output: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const demos: Record<TopicKey, TopicDemo> = {
  creating: {
    label: "Creating Variables",
    category: "Basics",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    example: `x = 5\nname = "Alice"\npi = 3.14\nis_active = True\n\nprint(x)\nprint(name)\nprint(pi)\nprint(is_active)\nprint(type(x))\nprint(type(name))`,
    description:
      "Python has no command for declaring a variable. A variable is created the moment you first assign a value to it. No type annotation is required — Python infers the type automatically.",
    note: "Variables do not need to be declared with any particular type and can even change type after they have been set.",
    output: [
      "5",
      "Alice",
      "3.14",
      "True",
      "<class 'int'>",
      "<class 'str'>",
    ],
  },
  naming: {
    label: "Naming Rules",
    category: "Convention",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    example: `# Valid names\nmy_var = 10\n_private = "hidden"\nname2 = "Bob"\nMAX_SIZE = 100\n\n# Invalid names (would cause errors):\n# 2name = "bad"   # cannot start with digit\n# my-var = "bad"  # hyphens not allowed\n# class = "bad"   # reserved keyword\n\nprint(my_var)\nprint(_private)\nprint(name2)\nprint(MAX_SIZE)`,
    description:
      "Variable names must start with a letter or underscore, followed by letters, digits, or underscores. Names are case-sensitive. Use snake_case by convention (PEP 8).",
    note: "UPPER_SNAKE_CASE is used for constants. Names starting with _ hint at private/internal use.",
    output: ["10", "hidden", "Bob", "100"],
  },
  multiple: {
    label: "Multiple Assignment",
    category: "Syntax",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    example: `# Assign multiple values at once\nx, y, z = 1, 2, 3\nprint(x)\nprint(y)\nprint(z)\n\n# Same value to multiple variables\na = b = c = "hello"\nprint(a)\nprint(b)\nprint(c)\n\n# Swap variables\nx, y = y, x\nprint("after swap:", x, y)`,
    description:
      "Python allows you to assign values to multiple variables in a single line. You can also assign the same value to several variables at once, or swap values without a temporary variable.",
    note: "Tuple unpacking makes swapping elegant: x, y = y, x — no temp variable needed.",
    output: ["1", "2", "3", "hello", "hello", "hello", "after swap: 2 1"],
  },
  "global-local": {
    label: "Global vs Local",
    category: "Scope",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    example: `count = 0  # global variable\n\ndef increment():\n    global count\n    count += 1\n    local_var = "I am local"\n    print("inside:", count, local_var)\n\nincrement()\nincrement()\nprint("outside:", count)\n# print(local_var)  # NameError!`,
    description:
      "Variables created inside a function are local to that function. Use the global keyword to modify a global variable from within a function. Without it, Python creates a new local variable instead.",
    note: "Avoid excessive use of global — pass values as arguments and return results instead.",
    output: [
      "inside: 1 I am local",
      "inside: 2 I am local",
      "outside: 2",
    ],
  },
};

const order: TopicKey[] = ["creating", "naming", "multiple", "global-local"];

// ─── Main export ──────────────────────────────────────────────────────────────
export function VariablesVisualization() {
  const [selected, setSelected] = useState<TopicKey>("creating");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const demo = demos[selected];

  const handleSelect = (key: TopicKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Python Variables</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Topic selector chips */}
        <div className="flex flex-wrap gap-2">
          {order.map((key) => {
            const d = demos[key];
            return (
              <button
                key={key}
                onClick={() => handleSelect(key)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  selected === key
                    ? d.color + " scale-105 shadow-sm"
                    : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {d.label}
              </button>
            );
          })}
        </div>

        {/* Detail card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className={`rounded-xl border p-4 space-y-2 ${demo.color}`}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold">{demo.label}</span>
              <Badge variant="secondary" className={`text-[10px] ${demo.badgeColor}`}>
                {demo.category}
              </Badge>
            </div>
            <p className="text-sm leading-relaxed">{demo.description}</p>
            <p className="text-xs opacity-80 italic">{demo.note}</p>
          </motion.div>
        </AnimatePresence>

        {/* Code + Output */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">Code</p>
            <AnimatePresence mode="wait">
              <motion.pre
                key={selected}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[100px]"
              >
                {demo.example}
              </motion.pre>
            </AnimatePresence>
            <Button size="sm" onClick={() => setOutputLines(demo.output)}>
              <Play className="h-3.5 w-3.5 mr-1" /> Run
            </Button>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">Output</p>
            <ConsoleOutput lines={outputLines} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
