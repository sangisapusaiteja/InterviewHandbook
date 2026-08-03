"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ArrowRight } from "lucide-react";
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
type CastKey = "int" | "float" | "str" | "bool" | "list-tuple";

interface Conversion {
  expression: string;
  before: string;
  beforeType: string;
  after: string;
  afterType: string;
}

interface CastDemo {
  label: string;
  description: string;
  note: string;
  color: string;
  badgeColor: string;
  conversions: Conversion[];
  code: string;
  output: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const demos: Record<CastKey, CastDemo> = {
  int: {
    label: "int()",
    description:
      "Converts a value to an integer. Works with floats (truncates toward zero), numeric strings, and booleans.",
    note: "int() truncates floats rather than rounding. Non-numeric strings raise ValueError.",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    conversions: [
      { expression: 'int("42")', before: '"42"', beforeType: "str", after: "42", afterType: "int" },
      { expression: "int(3.99)", before: "3.99", beforeType: "float", after: "3", afterType: "int" },
      { expression: "int(True)", before: "True", beforeType: "bool", after: "1", afterType: "int" },
      { expression: "int(-7.5)", before: "-7.5", beforeType: "float", after: "-7", afterType: "int" },
    ],
    code: `x = int("42")
print(x, type(x))

y = int(3.99)
print(y, type(y))

z = int(True)
print(z, type(z))

w = int(-7.5)
print(w, type(w))`,
    output: [
      "42 <class 'int'>",
      "3 <class 'int'>",
      "1 <class 'int'>",
      "-7 <class 'int'>",
    ],
  },
  float: {
    label: "float()",
    description:
      "Converts a value to a floating-point number. Accepts integers, numeric strings, and booleans.",
    note: "float('inf') and float('nan') are valid special values.",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    conversions: [
      { expression: "float(10)", before: "10", beforeType: "int", after: "10.0", afterType: "float" },
      { expression: 'float("3.14")', before: '"3.14"', beforeType: "str", after: "3.14", afterType: "float" },
      { expression: "float(False)", before: "False", beforeType: "bool", after: "0.0", afterType: "float" },
      { expression: 'float("inf")', before: '"inf"', beforeType: "str", after: "inf", afterType: "float" },
    ],
    code: `a = float(10)
print(a, type(a))

b = float("3.14")
print(b, type(b))

c = float(False)
print(c, type(c))

d = float("inf")
print(d, type(d))`,
    output: [
      "10.0 <class 'float'>",
      "3.14 <class 'float'>",
      "0.0 <class 'float'>",
      "inf <class 'float'>",
    ],
  },
  str: {
    label: "str()",
    description:
      "Converts any value to its string representation. Every Python object has a __str__ method.",
    note: "str() never fails -- every object can be converted to a string.",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    conversions: [
      { expression: "str(3.14)", before: "3.14", beforeType: "float", after: '"3.14"', afterType: "str" },
      { expression: "str(42)", before: "42", beforeType: "int", after: '"42"', afterType: "str" },
      { expression: "str(True)", before: "True", beforeType: "bool", after: '"True"', afterType: "str" },
      { expression: "str([1, 2])", before: "[1, 2]", beforeType: "list", after: '"[1, 2]"', afterType: "str" },
    ],
    code: `a = str(3.14)
print(a, type(a))

b = str(42)
print(b, type(b))

c = str(True)
print(c, type(c))

d = str([1, 2])
print(d, type(d))`,
    output: [
      "3.14 <class 'str'>",
      "42 <class 'str'>",
      "True <class 'str'>",
      "[1, 2] <class 'str'>",
    ],
  },
  bool: {
    label: "bool()",
    description:
      "Converts a value to True or False. Falsy values: 0, 0.0, empty string, empty list, None. Everything else is truthy.",
    note: "Useful for explicit truth-value testing in conditionals.",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    conversions: [
      { expression: "bool(0)", before: "0", beforeType: "int", after: "False", afterType: "bool" },
      { expression: "bool(42)", before: "42", beforeType: "int", after: "True", afterType: "bool" },
      { expression: 'bool("")', before: '""', beforeType: "str", after: "False", afterType: "bool" },
      { expression: 'bool("hello")', before: '"hello"', beforeType: "str", after: "True", afterType: "bool" },
    ],
    code: `print(bool(0), type(bool(0)))
print(bool(42), type(bool(42)))
print(bool(""), type(bool("")))
print(bool("hello"), type(bool("hello")))
print(bool([]), type(bool([])))
print(bool(None), type(bool(None)))`,
    output: [
      "False <class 'bool'>",
      "True <class 'bool'>",
      "False <class 'bool'>",
      "True <class 'bool'>",
      "False <class 'bool'>",
      "False <class 'bool'>",
    ],
  },
  "list-tuple": {
    label: "list()/tuple()",
    description:
      "Converts iterables between list and tuple forms. Strings become lists of characters. Tuples become mutable lists and vice versa.",
    note: "list() and tuple() accept any iterable: strings, ranges, sets, dicts, etc.",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    conversions: [
      { expression: 'list("hello")', before: '"hello"', beforeType: "str", after: "['h','e','l','l','o']", afterType: "list" },
      { expression: "list((1,2,3))", before: "(1, 2, 3)", beforeType: "tuple", after: "[1, 2, 3]", afterType: "list" },
      { expression: "tuple([4,5,6])", before: "[4, 5, 6]", beforeType: "list", after: "(4, 5, 6)", afterType: "tuple" },
      { expression: "list(range(5))", before: "range(5)", beforeType: "range", after: "[0,1,2,3,4]", afterType: "list" },
    ],
    code: `a = list("hello")
print(a, type(a))

b = list((1, 2, 3))
print(b, type(b))

c = tuple([4, 5, 6])
print(c, type(c))

d = list(range(5))
print(d, type(d))`,
    output: [
      "['h', 'e', 'l', 'l', 'o'] <class 'list'>",
      "[1, 2, 3] <class 'list'>",
      "(4, 5, 6) <class 'tuple'>",
      "[0, 1, 2, 3, 4] <class 'list'>",
    ],
  },
};

const order: CastKey[] = ["int", "float", "str", "bool", "list-tuple"];

// ─── Main export ──────────────────────────────────────────────────────────────
export function TypeCastingVisualization() {
  const [selected, setSelected] = useState<CastKey>("int");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const demo = demos[selected];

  const handleSelect = (key: CastKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Python Type Casting</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Cast function selector chips */}
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
              <span className="text-lg font-bold font-mono">{demo.label}</span>
              <Badge variant="secondary" className={`text-[10px] ${demo.badgeColor}`}>
                Type Casting
              </Badge>
            </div>
            <p className="text-sm leading-relaxed">{demo.description}</p>
            <p className="text-xs opacity-80 italic">{demo.note}</p>
          </motion.div>
        </AnimatePresence>

        {/* Before / After conversion table */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Conversion Examples
          </p>
          <div className="rounded-xl border overflow-hidden text-xs">
            <div className="grid grid-cols-5 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
              <span>Expression</span>
              <span>Before</span>
              <span>Type</span>
              <span>After</span>
              <span>Type</span>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {demo.conversions.map((conv) => (
                  <div
                    key={conv.expression}
                    className="grid grid-cols-5 px-3 py-2.5 border-t items-center"
                  >
                    <code className="font-mono text-[11px] font-semibold">{conv.expression}</code>
                    <code className="font-mono text-[11px] text-muted-foreground">{conv.before}</code>
                    <Badge variant="outline" className="text-[9px] w-fit px-1.5 py-0 font-mono">
                      {conv.beforeType}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <ArrowRight className="h-3 w-3 text-muted-foreground shrink-0" />
                      <code className="font-mono text-[11px] font-semibold">{conv.after}</code>
                    </div>
                    <Badge variant="outline" className="text-[9px] w-fit px-1.5 py-0 font-mono bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30">
                      {conv.afterType}
                    </Badge>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

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
                {demo.code}
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
