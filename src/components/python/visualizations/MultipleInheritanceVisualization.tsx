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

// ─── Diamond Diagram ──────────────────────────────────────────────────────────
function DiamondDiagram() {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-muted-foreground">
        Diamond Inheritance Diagram
      </p>
      <div className="rounded-xl border bg-muted/20 px-4 py-4 flex flex-col items-center gap-1 font-mono text-xs">
        <div className="px-3 py-1.5 rounded-lg bg-amber-500/15 border border-amber-500/40 text-amber-700 dark:text-amber-300 font-bold">
          A (Base)
        </div>
        <div className="flex items-center gap-1 text-muted-foreground select-none">
          <span className="inline-block w-12 text-right">┌───</span>
          <span>┴</span>
          <span className="inline-block w-12">───┐</span>
        </div>
        <div className="flex gap-8">
          <div className="px-3 py-1.5 rounded-lg bg-blue-500/15 border border-blue-500/40 text-blue-700 dark:text-blue-300 font-bold">
            B(A)
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-violet-500/15 border border-violet-500/40 text-violet-700 dark:text-violet-300 font-bold">
            C(A)
          </div>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground select-none">
          <span className="inline-block w-12 text-right">└───</span>
          <span>┬</span>
          <span className="inline-block w-12">───┘</span>
        </div>
        <div className="px-3 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 font-bold">
          D(B, C)
        </div>
        <p className="text-[10px] text-muted-foreground opacity-70 mt-2 text-center">
          MRO: D → B → C → A → object (C3 linearization)
        </p>
      </div>
    </div>
  );
}

// ─── types ────────────────────────────────────────────────────────────────────
type TopicKey = "basic" | "diamond" | "mixins" | "cooperative";

interface TopicInfo {
  label: string;
  subtitle: string;
  color: string;
  badgeColor: string;
  badgeText: string;
  description: string;
  keyPoints: string[];
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const topics: Record<TopicKey, TopicInfo> = {
  basic: {
    label: "Basic Multiple",
    subtitle: "Combine Parent Classes",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    badgeText: "inheritance",
    description:
      "Multiple inheritance allows a class to inherit from more than one parent class. The child class gains attributes and methods from all parents, combining their capabilities into a single class.",
    keyPoints: [
      "Syntax: class Child(Parent1, Parent2)",
      "Child inherits methods and attributes from all parents",
      "First parent in the list takes priority for name conflicts",
      "Use isinstance() to check against any parent",
    ],
    codeSnippet: `class Flyer:
    def fly(self):
        return "I can fly!"

class Swimmer:
    def swim(self):
        return "I can swim!"

class Duck(Flyer, Swimmer):
    def quack(self):
        return "Quack!"

duck = Duck()
print(duck.fly())
print(duck.swim())
print(duck.quack())
print(isinstance(duck, Flyer))
print(isinstance(duck, Swimmer))`,
    codeOutput: [
      "I can fly!",
      "I can swim!",
      "Quack!",
      "True",
      "True",
    ],
  },
  diamond: {
    label: "Diamond Problem",
    subtitle: "C3 Linearization & MRO",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    badgeText: "MRO",
    description:
      "The diamond problem occurs when a class inherits from two classes that share a common ancestor. Python resolves this using C3 linearization, which defines a consistent Method Resolution Order (MRO) so each class in the hierarchy is called exactly once.",
    keyPoints: [
      "Diamond: D inherits B and C, both inherit A",
      "C3 linearization ensures a deterministic method order",
      "Use ClassName.mro() or ClassName.__mro__ to inspect",
      "Each ancestor appears exactly once in the MRO",
    ],
    codeSnippet: `class A:
    def greet(self):
        return "Hello from A"

class B(A):
    def greet(self):
        return "Hello from B"

class C(A):
    def greet(self):
        return "Hello from C"

class D(B, C):
    pass

d = D()
print(d.greet())
print("MRO:", [cls.__name__ for cls in D.mro()])`,
    codeOutput: [
      "Hello from B",
      "MRO: ['D', 'B', 'C', 'A', 'object']",
    ],
  },
  mixins: {
    label: "Mixins",
    subtitle: "Small Focused Classes",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    badgeText: "pattern",
    description:
      "Mixins are small, focused classes designed to be combined with other classes via multiple inheritance. They add specific functionality without being used as standalone base classes. Common patterns include JsonMixin, LogMixin, and SerializeMixin.",
    keyPoints: [
      "Mixins add a single, focused capability",
      "Named with a Mixin suffix by convention",
      "Not intended to be instantiated alone",
      "Multiple mixins can be combined freely",
    ],
    codeSnippet: `import json

class JsonMixin:
    def to_json(self):
        return json.dumps(self.__dict__)

class LogMixin:
    def log(self, message):
        return f"[LOG \${type(self).__name__}] \${message}"

class User(JsonMixin, LogMixin):
    def __init__(self, name, age):
        self.name = name
        self.age = age

user = User("Alice", 30)
print(user.to_json())
print(user.log("created"))
print(isinstance(user, JsonMixin))`,
    codeOutput: [
      '{"name": "Alice", "age": 30}',
      "[LOG User] created",
      "True",
    ],
  },
  cooperative: {
    label: "Cooperative super()",
    subtitle: "MRO Chain Calls",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    badgeText: "super()",
    description:
      "Cooperative multiple inheritance uses super() to follow the MRO chain, ensuring every class in the hierarchy gets a chance to run its method. Each super() call delegates to the next class in the MRO, not necessarily the direct parent.",
    keyPoints: [
      "super() follows the MRO, not just the direct parent",
      "Every class in the chain should call super()",
      "Ensures all __init__ methods run in MRO order",
      "Use **kwargs to pass arguments through the chain",
    ],
    codeSnippet: `class Base:
    def __init__(self, **kwargs):
        print("Base.__init__")

class Left(Base):
    def __init__(self, **kwargs):
        print("Left.__init__")
        super().__init__(**kwargs)

class Right(Base):
    def __init__(self, **kwargs):
        print("Right.__init__")
        super().__init__(**kwargs)

class Child(Left, Right):
    def __init__(self, **kwargs):
        print("Child.__init__")
        super().__init__(**kwargs)

child = Child()
print("MRO:", [c.__name__ for c in Child.mro()])`,
    codeOutput: [
      "Child.__init__",
      "Left.__init__",
      "Right.__init__",
      "Base.__init__",
      "MRO: ['Child', 'Left', 'Right', 'Base', 'object']",
    ],
  },
};

const order: TopicKey[] = ["basic", "diamond", "mixins", "cooperative"];

const chipColors: Record<TopicKey, string> = {
  basic: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  diamond: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  mixins: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  cooperative: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
};

// ─── Main export ──────────────────────────────────────────────────────────────
export function MultipleInheritanceVisualization() {
  const [selected, setSelected] = useState<TopicKey>("basic");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const topic = topics[selected];

  const handleSelect = (key: TopicKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Python Multiple Inheritance</CardTitle>
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
                {t.label} — {t.subtitle}
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
                  {topic.badgeText}
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{topic.description}</p>
            </div>

            {/* Key points */}
            <div className="space-y-1.5">
              <p className="text-xs font-semibold text-muted-foreground">Key Points</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {topic.keyPoints.map((point) => (
                  <li
                    key={point}
                    className="text-xs text-muted-foreground flex items-start gap-1.5"
                  >
                    <span className="text-emerald-500 mt-0.5 select-none">●</span>
                    {point}
                  </li>
                ))}
              </ul>
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

            {/* Diamond diagram (shown only for diamond topic) */}
            {selected === "diamond" && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <DiamondDiagram />
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
