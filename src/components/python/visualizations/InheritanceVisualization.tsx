"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, GitBranch } from "lucide-react";
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
type TopicKey = "basic" | "super" | "isinstance" | "mro";

interface TopicInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  keyPoints: string[];
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const topics: Record<TopicKey, TopicInfo> = {
  basic: {
    label: "Basic Inheritance",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "A child class inherits all methods and attributes from its parent class. Define a child by passing the parent in parentheses: class Child(Parent). The child can override methods or add new ones while keeping everything the parent provides.",
    keyPoints: [
      "class Child(Parent) creates an inheritance relationship",
      "The child inherits all attributes and methods from the parent",
      "The child can override parent methods to customize behavior",
      "The child can also define entirely new methods",
    ],
    codeSnippet: `class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return f"\${self.name} makes a sound"

    def info(self):
        return f"Animal: \${self.name}"

class Dog(Animal):
    def speak(self):
        return f"\${self.name} says Woof!"

    def fetch(self):
        return f"\${self.name} fetches the ball"

dog = Dog("Buddy")
print(dog.speak())
print(dog.info())      # inherited from Animal
print(dog.fetch())     # defined in Dog`,
    codeOutput: [
      "Buddy says Woof!",
      "Animal: Buddy",
      "Buddy fetches the ball",
    ],
  },
  super: {
    label: "super()",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "The super() function lets a child class call methods from its parent. This is most commonly used in __init__ to chain constructors, ensuring the parent is properly initialized before the child adds its own attributes.",
    keyPoints: [
      "super().__init__() calls the parent constructor",
      "Constructor chaining ensures parent attributes are initialized",
      "super().method() can call any parent method, not just __init__",
      "Avoids hardcoding the parent class name",
    ],
    codeSnippet: `class Vehicle:
    def __init__(self, brand, year):
        self.brand = brand
        self.year = year

    def describe(self):
        return f"\${self.brand} (\${self.year})"

class Car(Vehicle):
    def __init__(self, brand, year, doors):
        super().__init__(brand, year)  # chain to parent
        self.doors = doors

    def describe(self):
        base = super().describe()  # call parent method
        return f"\${base} - \${self.doors}-door car"

car = Car("Toyota", 2024, 4)
print(car.describe())
print(f"Brand: \${car.brand}")
print(f"Year: \${car.year}")
print(f"Doors: \${car.doors}")`,
    codeOutput: [
      "Toyota (2024) - 4-door car",
      "Brand: Toyota",
      "Year: 2024",
      "Doors: 4",
    ],
  },
  isinstance: {
    label: "isinstance & issubclass",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "isinstance() checks whether an object is an instance of a class (or its ancestors). issubclass() checks whether a class is a subclass of another. Both are essential for runtime type checking in inheritance hierarchies.",
    keyPoints: [
      "isinstance(obj, Class) returns True if obj is of that type or a subclass",
      "issubclass(Child, Parent) checks the class relationship directly",
      "Both accept tuples to check against multiple types at once",
      "A child instance is also an instance of the parent class",
    ],
    codeSnippet: `class Shape:
    pass

class Rectangle(Shape):
    pass

class Square(Rectangle):
    pass

sq = Square()

# isinstance checks
print(f"isinstance(sq, Square):    \${isinstance(sq, Square)}")
print(f"isinstance(sq, Rectangle): \${isinstance(sq, Rectangle)}")
print(f"isinstance(sq, Shape):     \${isinstance(sq, Shape)}")

# issubclass checks
print(f"\\nissubclass(Square, Rectangle): \${issubclass(Square, Rectangle)}")
print(f"issubclass(Square, Shape):     \${issubclass(Square, Shape)}")
print(f"issubclass(Rectangle, Square): \${issubclass(Rectangle, Square)}")

# Tuple form
print(f"\\nisinstance(sq, (int, Shape)): \${isinstance(sq, (int, Shape))}")`,
    codeOutput: [
      "isinstance(sq, Square):    True",
      "isinstance(sq, Rectangle): True",
      "isinstance(sq, Shape):     True",
      "",
      "issubclass(Square, Rectangle): True",
      "issubclass(Square, Shape):     True",
      "issubclass(Rectangle, Square): False",
      "",
      "isinstance(sq, (int, Shape)): True",
    ],
  },
  mro: {
    label: "MRO",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Method Resolution Order (MRO) determines the order in which Python searches for methods in an inheritance hierarchy. Python uses the C3 linearization algorithm. You can inspect it with __mro__ or the mro() method.",
    keyPoints: [
      "__mro__ returns a tuple of classes in resolution order",
      "ClassName.mro() returns the same info as a list",
      "Python uses C3 linearization to compute the MRO",
      "MRO is critical for understanding multi-level and multiple inheritance",
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
print(f"d.greet() => {d.greet()}")

print(f"\\nMRO of D:")
for cls in D.__mro__:
    print(f"  \${cls.__name__}")

print(f"\\nD.mro() = \${[c.__name__ for c in D.mro()]}")`,
    codeOutput: [
      "d.greet() => Hello from B",
      "",
      "MRO of D:",
      "  D",
      "  B",
      "  C",
      "  A",
      "  object",
      "",
      "D.mro() = ['D', 'B', 'C', 'A', 'object']",
    ],
  },
};

const order: TopicKey[] = ["basic", "super", "isinstance", "mro"];

const chipColors: Record<TopicKey, string> = {
  basic: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  super: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  isinstance: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  mro: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
};

// ─── Inheritance Hierarchy Diagram ───────────────────────────────────────────
const hierarchies: Record<TopicKey, { nodes: { id: string; label: string; color: string; level: number; col: number }[]; edges: { from: string; to: string }[] }> = {
  basic: {
    nodes: [
      { id: "animal", label: "Animal", color: "border-blue-400 bg-blue-500/15", level: 0, col: 1 },
      { id: "dog", label: "Dog", color: "border-blue-400 bg-blue-500/25", level: 1, col: 1 },
    ],
    edges: [{ from: "animal", to: "dog" }],
  },
  super: {
    nodes: [
      { id: "vehicle", label: "Vehicle", color: "border-emerald-400 bg-emerald-500/15", level: 0, col: 1 },
      { id: "car", label: "Car", color: "border-emerald-400 bg-emerald-500/25", level: 1, col: 1 },
    ],
    edges: [{ from: "vehicle", to: "car" }],
  },
  isinstance: {
    nodes: [
      { id: "shape", label: "Shape", color: "border-violet-400 bg-violet-500/15", level: 0, col: 1 },
      { id: "rect", label: "Rectangle", color: "border-violet-400 bg-violet-500/20", level: 1, col: 1 },
      { id: "square", label: "Square", color: "border-violet-400 bg-violet-500/30", level: 2, col: 1 },
    ],
    edges: [
      { from: "shape", to: "rect" },
      { from: "rect", to: "square" },
    ],
  },
  mro: {
    nodes: [
      { id: "a", label: "A", color: "border-orange-400 bg-orange-500/15", level: 0, col: 1 },
      { id: "b", label: "B", color: "border-orange-400 bg-orange-500/20", level: 1, col: 0 },
      { id: "c", label: "C", color: "border-orange-400 bg-orange-500/20", level: 1, col: 2 },
      { id: "d", label: "D", color: "border-orange-400 bg-orange-500/30", level: 2, col: 1 },
    ],
    edges: [
      { from: "a", to: "b" },
      { from: "a", to: "c" },
      { from: "b", to: "d" },
      { from: "c", to: "d" },
    ],
  },
};

function HierarchyDiagram({ topicKey, running }: Readonly<{ topicKey: TopicKey; running: boolean }>) {
  const hierarchy = hierarchies[topicKey];
  const maxLevel = Math.max(...hierarchy.nodes.map((n) => n.level));

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-2">
        <GitBranch className="h-4 w-4 text-muted-foreground" />
        <p className="text-xs font-semibold text-muted-foreground">Inheritance Hierarchy</p>
      </div>

      {running ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-xl border bg-muted/20 px-4 py-5"
        >
          <div className="flex flex-col items-center gap-3">
            {Array.from({ length: maxLevel + 1 }, (_, level) => {
              const nodesAtLevel = hierarchy.nodes.filter((n) => n.level === level);
              return (
                <div key={`level-${level}`} className="flex flex-col items-center gap-2 w-full">
                  <div className="flex justify-center gap-6">
                    {nodesAtLevel.map((node, nIdx) => (
                      <motion.div
                        key={`node-${node.id}`}
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: level * 0.25 + nIdx * 0.1, duration: 0.3 }}
                        className={`rounded-lg border-2 ${node.color} px-5 py-2 font-mono text-xs font-bold text-center min-w-[90px]`}
                      >
                        {node.label}
                      </motion.div>
                    ))}
                  </div>
                  {level < maxLevel && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: level * 0.25 + 0.15 }}
                      className="text-muted-foreground text-lg"
                    >
                      ↓
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>

          {topicKey === "mro" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="mt-4 rounded-lg border bg-zinc-900 dark:bg-zinc-950 px-3 py-2 font-mono text-xs text-center"
            >
              <span className="text-orange-400">MRO: D → B → C → A → object</span>
            </motion.div>
          )}
        </motion.div>
      ) : (
        <div className="rounded-xl border bg-muted/20 px-4 py-6 flex items-center justify-center">
          <p className="text-xs text-muted-foreground italic">Click ▶ Run to visualize the hierarchy</p>
        </div>
      )}
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function InheritanceVisualization() {
  const [selected, setSelected] = useState<TopicKey>("basic");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);
  const [diagramRunning, setDiagramRunning] = useState(false);

  const topic = topics[selected];

  const handleSelect = (key: TopicKey) => {
    setSelected(key);
    setOutputLines(null);
    setDiagramRunning(false);
  };

  const handleRun = () => {
    setDiagramRunning(true);
    setOutputLines(topic.codeOutput);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Inheritance</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Topic selector chips */}
        <div className="flex flex-wrap gap-2">
          {order.map((key) => {
            const chipColor = chipColors[key];
            return (
              <button
                key={key}
                onClick={() => handleSelect(key)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  selected === key
                    ? chipColor + " scale-105 shadow-sm"
                    : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {topics[key].label}
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
                  inheritance
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{topic.description}</p>
            </div>

            {/* Key points */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-1.5">Key Points</p>
              <ul className="space-y-1">
                {topic.keyPoints.map((point) => (
                  <li key={`kp-${point.slice(0, 30)}`} className="text-xs text-muted-foreground flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">●</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Code + Output */}
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-1.5">Code</p>
                <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[120px]">
                  {topic.codeSnippet}
                </pre>
              </div>
              <Button size="sm" onClick={handleRun}>
                <Play className="h-3.5 w-3.5 mr-1" /> Run
              </Button>

              {/* Inheritance hierarchy diagram */}
              <HierarchyDiagram topicKey={selected} running={diagramRunning} />

              {/* Console output */}
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-1.5">Output</p>
                <ConsoleOutput lines={outputLines} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
