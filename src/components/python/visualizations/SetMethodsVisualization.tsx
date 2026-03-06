"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Table } from "lucide-react";
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
type SetMethodKey =
  | "add-discard"
  | "union-intersection"
  | "difference-symmetric"
  | "subset-superset";

interface SetMethodDemo {
  label: string;
  color: string;
  badgeColor: string;
  badgeLabel: string;
  description: string;
  note: string;
  example: string;
  output: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const demos: Record<SetMethodKey, SetMethodDemo> = {
  "add-discard": {
    label: "add & discard",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    badgeLabel: "Modify",
    description:
      "Use add() to insert a single element, discard() to safely remove (no error if missing), remove() to remove (raises KeyError if missing), pop() to remove an arbitrary element, and clear() to empty the set.",
    note: "discard() is safer than remove() -- it won't raise an error if the element doesn't exist.",
    example: `fruits = {"apple", "banana", "cherry"}

# add() - add a single element
fruits.add("date")
print(fruits)
# {'apple', 'banana', 'cherry', 'date'}

# discard() - safe remove (no error if missing)
fruits.discard("banana")
fruits.discard("mango")   # no KeyError
print(fruits)
# {'apple', 'cherry', 'date'}

# remove() - raises KeyError if missing
fruits.remove("cherry")
print(fruits)
# {'apple', 'date'}

# pop() - remove & return arbitrary element
popped = fruits.pop()
print(f"Popped: {popped}")

# clear() - remove all elements
fruits.clear()
print(fruits)
# set()`,
    output: [
      "{'apple', 'banana', 'cherry', 'date'}",
      "{'apple', 'cherry', 'date'}",
      "{'apple', 'date'}",
      "Popped: apple",
      "set()",
    ],
  },
  "union-intersection": {
    label: "union & intersection",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    badgeLabel: "Combine",
    description:
      "union() or | combines all unique elements from both sets. intersection() or & returns only elements present in both sets. Great for finding overlapping skills across teams.",
    note: "Operators (|, &) only work with sets, but methods accept any iterable.",
    example: `# Developer team skills example
frontend = {"HTML", "CSS", "JavaScript", "React"}
backend  = {"Python", "SQL", "JavaScript", "Docker"}

# union() or | -- all unique skills
all_skills = frontend.union(backend)
print("All skills:", all_skills)
# {'HTML', 'CSS', 'JavaScript', 'React', 'Python', 'SQL', 'Docker'}

all_skills_op = frontend | backend
print("Same result:", all_skills_op == all_skills)
# True

# intersection() or & -- shared skills
shared = frontend.intersection(backend)
print("Shared skills:", shared)
# {'JavaScript'}

shared_op = frontend & backend
print("Same result:", shared_op == shared)
# True

print(f"Total: {len(all_skills)}, Shared: {len(shared)}")`,
    output: [
      "All skills: {'HTML', 'CSS', 'JavaScript', 'React', 'Python', 'SQL', 'Docker'}",
      "Same result: True",
      "Shared skills: {'JavaScript'}",
      "Same result: True",
      "Total: 7, Shared: 1",
    ],
  },
  "difference-symmetric": {
    label: "difference & symmetric",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    badgeLabel: "Compare",
    description:
      "difference() or - returns elements in the first set but not in the second. symmetric_difference() or ^ returns elements in either set but not both (the XOR of sets).",
    note: "difference is not symmetric: A - B != B - A. But symmetric_difference is: A ^ B == B ^ A.",
    example: `a = {1, 2, 3, 4, 5}
b = {4, 5, 6, 7, 8}

# difference() or - : in a but NOT in b
diff_ab = a.difference(b)
print("a - b:", diff_ab)
# {1, 2, 3}

diff_ba = b - a
print("b - a:", diff_ba)
# {6, 7, 8}

# symmetric_difference() or ^ : in either, NOT both
sym = a.symmetric_difference(b)
print("a ^ b:", sym)
# {1, 2, 3, 6, 7, 8}

sym_op = a ^ b
print("Same result:", sym_op == sym)
# True

# Verify: symmetric_diff = (a - b) | (b - a)
manual = diff_ab | diff_ba
print("Manual match:", manual == sym)
# True`,
    output: [
      "a - b: {1, 2, 3}",
      "b - a: {6, 7, 8}",
      "a ^ b: {1, 2, 3, 6, 7, 8}",
      "Same result: True",
      "Manual match: True",
    ],
  },
  "subset-superset": {
    label: "subset & superset",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    badgeLabel: "Test",
    description:
      "issubset() checks if every element of a set is in another. issuperset() checks the reverse. isdisjoint() returns True if two sets share no elements at all.",
    note: "You can also use <= for subset, >= for superset, and < / > for proper subset/superset.",
    example: `python_basics = {"variables", "loops", "functions"}
python_all    = {"variables", "loops", "functions", "classes", "decorators"}
java_basics   = {"variables", "loops", "methods"}

# issubset() -- is basics contained in all?
print(python_basics.issubset(python_all))
# True
print(python_basics <= python_all)
# True

# issuperset() -- does all contain basics?
print(python_all.issuperset(python_basics))
# True
print(python_all >= python_basics)
# True

# Proper subset (strict)
print(python_basics < python_all)
# True
print(python_all < python_all)
# False

# isdisjoint() -- no common elements?
print(python_basics.isdisjoint(java_basics))
# False (both have 'variables' and 'loops')

unique_topic = {"generics"}
print(unique_topic.isdisjoint(python_all))
# True`,
    output: [
      "True",
      "True",
      "True",
      "True",
      "True",
      "False",
      "False",
      "True",
    ],
  },
};

const order: SetMethodKey[] = [
  "add-discard",
  "union-intersection",
  "difference-symmetric",
  "subset-superset",
];

// ─── Methods reference table ──────────────────────────────────────────────────
interface MethodRow {
  method: string;
  operator: string;
  description: string;
  returns: string;
}

const methodsTable: MethodRow[] = [
  { method: "add(elem)", operator: "--", description: "Add element to set", returns: "None" },
  { method: "remove(elem)", operator: "--", description: "Remove element; KeyError if missing", returns: "None" },
  { method: "discard(elem)", operator: "--", description: "Remove element; no error if missing", returns: "None" },
  { method: "pop()", operator: "--", description: "Remove & return arbitrary element", returns: "element" },
  { method: "clear()", operator: "--", description: "Remove all elements", returns: "None" },
  { method: "union(other)", operator: "|", description: "All elements from both sets", returns: "set" },
  { method: "intersection(other)", operator: "&", description: "Elements in both sets", returns: "set" },
  { method: "difference(other)", operator: "-", description: "Elements in first but not second", returns: "set" },
  { method: "symmetric_difference(other)", operator: "^", description: "Elements in either but not both", returns: "set" },
  { method: "issubset(other)", operator: "<=", description: "All elements are in other", returns: "bool" },
  { method: "issuperset(other)", operator: ">=", description: "Contains all elements of other", returns: "bool" },
  { method: "isdisjoint(other)", operator: "--", description: "No common elements", returns: "bool" },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function SetMethodsVisualization() {
  const [selected, setSelected] = useState<SetMethodKey>("add-discard");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);
  const [showTable, setShowTable] = useState(false);

  const demo = demos[selected];

  const handleSelect = (key: SetMethodKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Python Set Methods</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Method selector chips */}
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
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold font-mono">{demo.label}</span>
                <Badge variant="secondary" className={`text-[10px] ${demo.badgeColor}`}>
                  {demo.badgeLabel}
                </Badge>
              </div>
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

        {/* Methods Reference Table Toggle */}
        <div className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowTable((prev) => !prev)}
          >
            <Table className="h-3.5 w-3.5 mr-1" />
            {showTable ? "Hide" : "Show"} Methods Reference
          </Button>

          <AnimatePresence>
            {showTable && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="rounded-xl border overflow-hidden text-xs">
                  <div className="grid grid-cols-4 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
                    <span>Method</span>
                    <span className="text-center">Operator</span>
                    <span>Description</span>
                    <span className="text-center">Returns</span>
                  </div>
                  {methodsTable.map((row) => (
                    <div
                      key={row.method}
                      className="grid grid-cols-4 px-3 py-2.5 border-t hover:bg-muted/40 transition-colors"
                    >
                      <code className="font-mono text-[11px] text-primary">
                        {row.method}
                      </code>
                      <span className="text-center font-mono text-muted-foreground">
                        {row.operator}
                      </span>
                      <span className="text-muted-foreground">
                        {row.description}
                      </span>
                      <span className="text-center">
                        <span
                          className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold ${
                            row.returns === "None"
                              ? "bg-zinc-500/15 text-zinc-600 dark:text-zinc-400"
                              : row.returns === "bool"
                              ? "bg-violet-500/15 text-violet-600 dark:text-violet-400"
                              : row.returns === "set"
                              ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                              : "bg-blue-500/15 text-blue-600 dark:text-blue-400"
                          }`}
                        >
                          {row.returns}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-muted-foreground mt-2">
                  Methods accept any iterable as argument, but operators (|, &amp;, -, ^) require both operands to be sets.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}
