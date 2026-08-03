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
type TopicKey = "duck_typing" | "method_override" | "operator_overloading" | "abc_protocol";

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
  duck_typing: {
    label: "Duck Typing",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "\"If it walks like a duck and quacks like a duck, it's a duck.\" Python doesn't require objects to share a common base class — if an object has the right methods, it works. No inheritance needed.",
    keyPoints: [
      "No type checking — only method availability matters",
      "Objects don't need a shared base class",
      "Enables flexible, loosely-coupled code",
      "Core philosophy of Python's dynamic typing",
    ],
    codeSnippet: `class Dog:
    def speak(self):
        return "Woof!"

class Cat:
    def speak(self):
        return "Meow!"

class Duck:
    def speak(self):
        return "Quack!"

# No inheritance needed — just the same method
def make_it_speak(animal):
    """Works with ANY object that has a speak() method."""
    print(f"\{type(animal).__name__\} says: \{animal.speak()\}")

# All three work despite no shared base class
for animal in [Dog(), Cat(), Duck()]:
    make_it_speak(animal)

# Even a custom class works!
class Robot:
    def speak(self):
        return "Beep boop!"

make_it_speak(Robot())`,
    codeOutput: [
      "Dog says: Woof!",
      "Cat says: Meow!",
      "Duck says: Quack!",
      "Robot says: Beep boop!",
    ],
  },
  method_override: {
    label: "Method Override",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "Subclasses can override parent methods to provide specialized behavior. The same interface (method name) produces different results depending on which class the object belongs to.",
    keyPoints: [
      "Child class redefines a parent method",
      "Same interface, different behavior per class",
      "Use super() to extend rather than replace",
      "Enables the Open/Closed Principle",
    ],
    codeSnippet: `class Shape:
    def area(self):
        return 0

    def describe(self):
        return f"\{self.__class__.__name__\}: area = \{self.area():.2f\}"

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return 3.14159 * self.radius ** 2

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

class Triangle(Shape):
    def __init__(self, base, height):
        self.base = base
        self.height = height

    def area(self):
        return 0.5 * self.base * self.height

# Same interface, different behavior
shapes = [Circle(5), Rectangle(4, 6), Triangle(3, 8)]
for shape in shapes:
    print(shape.describe())`,
    codeOutput: [
      "Circle: area = 78.54",
      "Rectangle: area = 24.00",
      "Triangle: area = 12.00",
    ],
  },
  operator_overloading: {
    label: "Operator Overloading",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "Python lets you define how operators (+, ==, <, etc.) work with your custom classes by implementing special dunder methods like __add__, __eq__, and __lt__.",
    keyPoints: [
      "__add__ for +, __sub__ for -",
      "__eq__ for ==, __lt__ for <",
      "__repr__ / __str__ for string output",
      "Makes custom objects feel like built-in types",
    ],
    codeSnippet: `class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

    def __eq__(self, other):
        return self.x == other.x and self.y == other.y

    def __lt__(self, other):
        return (self.x**2 + self.y**2) < (other.x**2 + other.y**2)

    def __repr__(self):
        return f"Vector(\{self.x\}, \{self.y\})"

v1 = Vector(1, 2)
v2 = Vector(3, 4)
v3 = v1 + v2

print(f"\{v1\} + \{v2\} = \{v3\}")
print(f"\{v1\} == \{v2\}: \{v1 == v2\}")
print(f"\{v1\} == Vector(1, 2): \{v1 == Vector(1, 2)\}")
print(f"\{v1\} < \{v2\}: \{v1 < v2\}")

# Sorting uses __lt__
vectors = [Vector(3, 4), Vector(1, 1), Vector(2, 3)]
print(f"sorted: \{sorted(vectors)\}")`,
    codeOutput: [
      "Vector(1, 2) + Vector(3, 4) = Vector(4, 6)",
      "Vector(1, 2) == Vector(3, 4): False",
      "Vector(1, 2) == Vector(1, 2): True",
      "Vector(1, 2) < Vector(3, 4): True",
      "sorted: [Vector(1, 1), Vector(2, 3), Vector(3, 4)]",
    ],
  },
  abc_protocol: {
    label: "ABC & Protocol",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Abstract Base Classes (ABCs) enforce that subclasses implement required methods using @abstractmethod. Protocol (3.8+) provides structural subtyping — like duck typing with type checker support.",
    keyPoints: [
      "ABC + @abstractmethod enforce implementation",
      "Cannot instantiate an ABC directly",
      "Protocol enables structural (implicit) subtyping",
      "Protocol needs no inheritance — just matching methods",
    ],
    codeSnippet: `from abc import ABC, abstractmethod
from typing import Protocol

# ── Abstract Base Class ──
class Drawable(ABC):
    @abstractmethod
    def draw(self) -> str:
        pass

class Star(Drawable):
    def draw(self) -> str:
        return "* * *"

class Box(Drawable):
    def draw(self) -> str:
        return "[===]"

# Drawable() would raise TypeError!
for obj in [Star(), Box()]:
    print(f"draw: \{obj.draw()\}")

# ── Protocol (3.8+) ──
class Speakable(Protocol):
    def speak(self) -> str: ...

def announce(thing: Speakable) -> None:
    print(f"says: \{thing.speak()\}")

class Parrot:          # no inheritance needed!
    def speak(self) -> str:
        return "Polly wants a cracker"

announce(Parrot())     # type-safe duck typing`,
    codeOutput: [
      "draw: * * *",
      "draw: [===]",
      "says: Polly wants a cracker",
    ],
  },
};

const order: TopicKey[] = ["duck_typing", "method_override", "operator_overloading", "abc_protocol"];

const chipColors: Record<TopicKey, string> = {
  duck_typing: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  method_override: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  operator_overloading: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  abc_protocol: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
};

// ─── Main export ──────────────────────────────────────────────────────────────
export function PolymorphismVisualization() {
  const [selected, setSelected] = useState<TopicKey>("duck_typing");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const topic = topics[selected];

  const handleSelect = (key: TopicKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Python Polymorphism</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Topic selector chips */}
        <div className="flex flex-wrap gap-2">
          {order.map((key) => (
            <button
              key={key}
              onClick={() => handleSelect(key)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                selected === key
                  ? chipColors[key] + " scale-105 shadow-sm"
                  : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
              }`}
            >
              {topics[key].label}
            </button>
          ))}
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
                  polymorphism
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{topic.description}</p>
            </div>

            {/* Key Points */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-1.5">Key Points</p>
              <ul className="space-y-1">
                {topic.keyPoints.map((point) => (
                  <li key={point} className="text-xs text-muted-foreground flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">&#x2022;</span>
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
              <Button size="sm" onClick={() => setOutputLines(topic.codeOutput)}>
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
