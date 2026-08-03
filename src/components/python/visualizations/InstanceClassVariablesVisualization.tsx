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
type TopicKey = "class_vars" | "instance_vars" | "mutable_pitfall" | "dict_slots";

interface TopicInfo {
  label: string;
  subtitle: string;
  color: string;
  badgeColor: string;
  description: string;
  keyPoints: string[];
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const topics: Record<TopicKey, TopicInfo> = {
  class_vars: {
    label: "Class Variables",
    subtitle: "Shared State",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "Class variables are defined directly inside the class body, outside any method. They are shared by all instances of the class — every object sees the same value unless it shadows it with an instance attribute of the same name.",
    keyPoints: [
      "Defined at class level, outside __init__",
      "Shared across all instances",
      "Accessed via ClassName.var or self.var (read only)",
      "Changing via ClassName.var affects all instances",
    ],
    codeSnippet: `class Dog:
    species = "Canis familiaris"   # class variable
    count = 0                      # class variable

    def __init__(self, name):
        self.name = name           # instance variable
        Dog.count += 1

d1 = Dog("Rex")
d2 = Dog("Buddy")

print(f"d1.species = {d1.species}")
print(f"d2.species = {d2.species}")
print(f"Dog.species = {Dog.species}")
print(f"Dog.count   = {Dog.count}")
print(f"d1.species is d2.species: {d1.species is d2.species}")`,
    codeOutput: [
      "d1.species = Canis familiaris",
      "d2.species = Canis familiaris",
      "Dog.species = Canis familiaris",
      "Dog.count   = 2",
      "d1.species is d2.species: True",
    ],
  },
  instance_vars: {
    label: "Instance Variables",
    subtitle: "Per Object",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "Instance variables are unique to each object. They are typically created inside __init__ using self.variable_name. Each instance maintains its own copy, so changes to one object do not affect another.",
    keyPoints: [
      "Created with self.var inside __init__",
      "Each instance has its own copy",
      "Not shared between objects",
      "Can be added dynamically after construction",
    ],
    codeSnippet: `class Player:
    def __init__(self, name, score=0):
        self.name = name       # instance variable
        self.score = score     # instance variable

p1 = Player("Alice", 100)
p2 = Player("Bob", 200)

print(f"p1: {p1.name}, score={p1.score}")
print(f"p2: {p2.name}, score={p2.score}")

p1.score += 50
print(f"After p1 scores:")
print(f"  p1.score = {p1.score}")
print(f"  p2.score = {p2.score}")

# Dynamic attribute
p1.level = 5
print(f"p1.level = {p1.level}")
print(f"hasattr(p2, 'level') = {hasattr(p2, 'level')}")`,
    codeOutput: [
      "p1: Alice, score=100",
      "p2: Bob, score=200",
      "After p1 scores:",
      "  p1.score = 150",
      "  p2.score = 200",
      "p1.level = 5",
      "hasattr(p2, 'level') = False",
    ],
  },
  mutable_pitfall: {
    label: "Mutable Pitfall",
    subtitle: "Shared Bug",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "When a mutable object (like a list or dict) is used as a class variable, all instances share the same object. Mutating it through one instance affects every other instance — a common source of bugs. The fix is to initialize mutable data inside __init__.",
    keyPoints: [
      "Mutable class vars (list, dict) are shared references",
      "Appending via self.items.append() mutates the shared object",
      "Reassigning self.items = [...] creates instance-level shadow",
      "Fix: always initialize mutable data in __init__",
    ],
    codeSnippet: `# BUG: mutable class variable shared
class BuggyCart:
    items = []                    # shared list!

    def add(self, item):
        self.items.append(item)   # mutates shared list

c1 = BuggyCart()
c2 = BuggyCart()
c1.add("apple")
c2.add("banana")
print(f"c1.items = {c1.items}")   # both see same list!
print(f"c2.items = {c2.items}")
print(f"c1.items is c2.items: {c1.items is c2.items}")

# FIX: initialize in __init__
class FixedCart:
    def __init__(self):
        self.items = []           # per-instance list

f1 = FixedCart()
f2 = FixedCart()
f1.items.append("apple")
f2.items.append("banana")
print(f"f1.items = {f1.items}")
print(f"f2.items = {f2.items}")`,
    codeOutput: [
      "c1.items = ['apple', 'banana']",
      "c2.items = ['apple', 'banana']",
      "c1.items is c2.items: True",
      "f1.items = ['apple']",
      "f2.items = ['banana']",
    ],
  },
  dict_slots: {
    label: "__dict__ & __slots__",
    subtitle: "Namespace",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Every object stores its instance attributes in a __dict__ dictionary. You can inspect it to see all attributes. __slots__ replaces __dict__ with a fixed structure, saving memory and preventing dynamic attribute creation.",
    keyPoints: [
      "obj.__dict__ shows all instance attributes",
      "ClassName.__dict__ shows class-level attributes",
      "__slots__ defines allowed attribute names as a tuple",
      "__slots__ saves ~40% memory on many small objects",
    ],
    codeSnippet: `class Normal:
    def __init__(self, x, y):
        self.x = x
        self.y = y

n = Normal(10, 20)
print(f"n.__dict__ = {n.__dict__}")
n.z = 30                          # dynamic attr OK
print(f"n.__dict__ = {n.__dict__}")

class Optimized:
    __slots__ = ("x", "y")

    def __init__(self, x, y):
        self.x = x
        self.y = y

o = Optimized(10, 20)
print(f"o.x = {o.x}, o.y = {o.y}")
print(f"hasattr(o, '__dict__') = {hasattr(o, '__dict__')}")
try:
    o.z = 30
except AttributeError as e:
    print(f"Error: {e}")

import sys
print(f"Normal size:    {sys.getsizeof(n.__dict__)} bytes (__dict__)")
print(f"Optimized size: {sys.getsizeof(o)} bytes (slots)")`,
    codeOutput: [
      "n.__dict__ = {'x': 10, 'y': 20}",
      "n.__dict__ = {'x': 10, 'y': 20, 'z': 30}",
      "o.x = 10, o.y = 20",
      "hasattr(o, '__dict__') = False",
      "Error: 'Optimized' object has no attribute 'z'",
      "Normal size:    184 bytes (__dict__)",
      "Optimized size: 56 bytes (slots)",
    ],
  },
};

const order: TopicKey[] = ["class_vars", "instance_vars", "mutable_pitfall", "dict_slots"];

const chipColors: Record<TopicKey, string> = {
  class_vars: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  instance_vars: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  mutable_pitfall: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  dict_slots: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
};

// ─── Main export ──────────────────────────────────────────────────────────────
export function InstanceClassVariablesVisualization() {
  const [selected, setSelected] = useState<TopicKey>("class_vars");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const topic = topics[selected];

  const handleSelect = (key: TopicKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Instance vs Class Variables</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Topic selector chips */}
        <div className="flex flex-wrap gap-2">
          {order.map((key) => {
            const t = topics[key];
            return (
              <button
                key={key}
                onClick={() => handleSelect(key)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                  selected === key
                    ? chipColors[key] + " scale-105 shadow-sm"
                    : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {t.label}
                <Badge variant="secondary" className={`text-[10px] px-1.5 py-0 ${selected === key ? topics[key].badgeColor : ""}`}>
                  {t.subtitle}
                </Badge>
              </button>
            );
          })}
        </div>

        {/* Animated detail area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {/* Description banner */}
            <div className={`rounded-xl border px-4 py-3 text-sm ${topic.color}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold font-mono text-base">{topic.label}</span>
                <Badge variant="secondary" className={`text-[10px] ${topic.badgeColor}`}>
                  {topic.subtitle}
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{topic.description}</p>
            </div>

            {/* Key Points */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground">Key Points</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {topic.keyPoints.map((point, idx) => (
                  <motion.div
                    key={`kp-${selected}-${idx}`}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: idx * 0.05 }}
                    className={`rounded-lg border px-3 py-2 text-xs ${topic.color}`}
                  >
                    <span className="font-mono font-bold mr-1.5">{idx + 1}.</span>
                    {point}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Two-column: Code | Output */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left: Code snippet */}
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1.5">Code</p>
                  <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[120px]">
                    {topic.codeSnippet}
                  </pre>
                </div>
              </div>

              {/* Right: Run + Output */}
              <div className="space-y-3">
                <Button size="sm" onClick={() => setOutputLines(topic.codeOutput)}>
                  <Play className="h-3.5 w-3.5 mr-1" /> Run
                </Button>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1.5">Output</p>
                  <ConsoleOutput lines={outputLines} />
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
