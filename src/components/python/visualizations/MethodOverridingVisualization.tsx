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
type TopicKey = "override" | "super" | "dunder_str" | "polymorphic";

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
  override: {
    label: "Override Methods",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "When a child class defines a method with the same name as a parent method, the child version replaces the parent version for instances of the child class. This lets subclasses customize inherited behavior.",
    keyPoints: [
      "Child method with same name shadows the parent method",
      "Only affects instances of the child class",
      "Parent class instances still use the original method",
      "No special syntax required — just redefine the method",
    ],
    codeSnippet: `class Animal:
    def speak(self):
        return "Some generic sound"

class Dog(Animal):
    def speak(self):
        return "Woof!"

class Cat(Animal):
    def speak(self):
        return "Meow!"

# Parent uses its own method
a = Animal()
print(a.speak())

# Children override with their own behavior
d = Dog()
print(d.speak())

c = Cat()
print(c.speak())`,
    codeOutput: [
      "Some generic sound",
      "Woof!",
      "Meow!",
    ],
  },
  super: {
    label: "Call super()",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "Use super() to call the parent class method from within the overriding child method. This lets you extend parent behavior rather than completely replacing it.",
    keyPoints: [
      "super().method() invokes the parent version",
      "Useful for extending rather than replacing behavior",
      "Commonly used in __init__ to initialize parent state",
      "Follows the MRO (Method Resolution Order) chain",
    ],
    codeSnippet: `class Employee:
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary

    def describe(self):
        return f"\{self.name}, salary: \${self.salary}"

class Manager(Employee):
    def __init__(self, name, salary, department):
        super().__init__(name, salary)
        self.department = department

    def describe(self):
        base = super().describe()
        return f"\{base}, dept: \{self.department}"

m = Manager("Alice", 95000, "Engineering")
print(m.describe())

e = Employee("Bob", 70000)
print(e.describe())`,
    codeOutput: [
      "Alice, salary: $95000, dept: Engineering",
      "Bob, salary: $70000",
    ],
  },
  dunder_str: {
    label: "Override __str__",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "Override __str__ to control what print() and str() return for your objects. Override __repr__ for a developer-friendly representation used in the REPL and debugging.",
    keyPoints: [
      "__str__ is called by print() and str()",
      "__repr__ is called by repr() and the REPL",
      "If __str__ is missing, Python falls back to __repr__",
      "__repr__ should ideally be unambiguous and reproducible",
    ],
    codeSnippet: `class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):
        return f"Point(\{self.x}, \{self.y})"

    def __repr__(self):
        return f"Point(x=\{self.x}, y=\{self.y})"

p = Point(3, 7)

# __str__ used by print()
print(str(p))

# __repr__ used for debugging
print(repr(p))

# In a list, __repr__ is used
points = [Point(1, 2), Point(3, 4)]
print(points)`,
    codeOutput: [
      "Point(3, 7)",
      "Point(x=3, y=7)",
      "[Point(x=1, y=2), Point(x=3, y=4)]",
    ],
  },
  polymorphic: {
    label: "Polymorphic Dispatch",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Polymorphism allows you to call the same method name on different types and get type-specific behavior at runtime. Python resolves which method to call based on the actual object type, not the variable type.",
    keyPoints: [
      "Same method name, different implementations per class",
      "Runtime resolution based on actual object type",
      "Enables writing generic code that works with many types",
      "No need for type-checking — just call the method",
    ],
    codeSnippet: `class Shape:
    def area(self):
        raise NotImplementedError

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    def area(self):
        return 3.14159 * self.radius ** 2

class Rectangle(Shape):
    def __init__(self, w, h):
        self.w = w
        self.h = h
    def area(self):
        return self.w * self.h

class Triangle(Shape):
    def __init__(self, base, height):
        self.base = base
        self.height = height
    def area(self):
        return 0.5 * self.base * self.height

# Polymorphic dispatch in action
shapes = [Circle(5), Rectangle(4, 6), Triangle(3, 8)]
for s in shapes:
    print(f"\{type(s).__name__}: area = \{s.area()}")`,
    codeOutput: [
      "Circle: area = 78.53975",
      "Rectangle: area = 24",
      "Triangle: area = 12.0",
    ],
  },
};

const order: TopicKey[] = ["override", "super", "dunder_str", "polymorphic"];

const chipColors: Record<TopicKey, string> = {
  override: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  super: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  dunder_str: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  polymorphic: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
};

// ─── Main export ──────────────────────────────────────────────────────────────
export function MethodOverridingVisualization() {
  const [selected, setSelected] = useState<TopicKey>("override");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const topic = topics[selected];

  const handleSelect = (key: TopicKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  const handleRun = () => {
    setOutputLines(topic.codeOutput);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Method Overriding</CardTitle>
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
                  overriding
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{topic.description}</p>
            </div>

            {/* Key Points */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-1.5">Key Points</p>
              <ul className="space-y-1">
                {topic.keyPoints.map((point, idx) => (
                  <li key={`kp-${selected}-${idx}`} className="text-xs text-muted-foreground flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">&#9679;</span>
                    {point}
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
