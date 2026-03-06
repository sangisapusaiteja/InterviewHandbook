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
type TopicKey = "init-basics" | "default-values" | "new-vs-init" | "super-init";

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
  "init-basics": {
    label: "__init__ Basics",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "The __init__ method is Python's constructor. It is called automatically when a new object is created. The first parameter is always self, which refers to the instance being initialized.",
    keyPoints: [
      "Called automatically when you create an object with ClassName()",
      "The self parameter refers to the new instance",
      "Use self.attribute to set instance attributes",
      "Can accept additional arguments for customization",
    ],
    codeSnippet: `# Basic constructor with __init__
class Dog:
    def __init__(self, name, breed):
        self.name = name
        self.breed = breed
        self.energy = 100

    def info(self):
        return f"{self.name} ({self.breed}), energy: {self.energy}"

# Creating objects calls __init__ automatically
buddy = Dog("Buddy", "Golden Retriever")
max_dog = Dog("Max", "Labrador")

print(buddy.info())
print(max_dog.info())
print(f"Name attribute: {buddy.name}")
print(f"Type: {type(buddy).__name__}")`,
    codeOutput: [
      "Buddy (Golden Retriever), energy: 100",
      "Max (Labrador), energy: 100",
      "Name attribute: Buddy",
      "Type: Dog",
    ],
  },
  "default-values": {
    label: "Default Values",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "Constructors can have default argument values, making some parameters optional. This allows flexible object creation with sensible defaults while still allowing customization.",
    keyPoints: [
      "Default values make constructor arguments optional",
      "Place required parameters before optional ones",
      "Avoid mutable defaults like lists — use None instead",
      "Combine with keyword arguments for readability",
    ],
    codeSnippet: `# Constructor with default values
class User:
    def __init__(self, username, role="viewer", active=True):
        self.username = username
        self.role = role
        self.active = active
        self.login_count = 0

    def __repr__(self):
        status = "active" if self.active else "inactive"
        return f"User({self.username}, {self.role}, {status})"

# Different ways to create users
admin = User("alice", role="admin")
viewer = User("bob")
inactive = User("charlie", active=False)

print(admin)
print(viewer)
print(inactive)

# Safe mutable default pattern
class Team:
    def __init__(self, name, members=None):
        self.name = name
        self.members = members if members is not None else []

    def add(self, member):
        self.members.append(member)

t = Team("Dev")
t.add("Alice")
print(f"{t.name}: {t.members}")`,
    codeOutput: [
      "User(alice, admin, active)",
      "User(bob, viewer, active)",
      "User(charlie, viewer, inactive)",
      "Dev: ['Alice']",
    ],
  },
  "new-vs-init": {
    label: "__new__ vs __init__",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "__new__ creates the instance (allocation), while __init__ initializes it (setting attributes). __new__ is rarely overridden, but is essential for patterns like singletons and immutable types.",
    keyPoints: [
      "__new__ is called first — it creates and returns the instance",
      "__init__ is called second — it initializes the instance",
      "__new__ receives cls (the class), __init__ receives self (the instance)",
      "Override __new__ for singletons or subclassing immutable types",
    ],
    codeSnippet: `# Seeing the call order
class MyClass:
    def __new__(cls, value):
        print(f"__new__ called with cls={cls.__name__}")
        instance = super().__new__(cls)
        return instance

    def __init__(self, value):
        print(f"__init__ called with value={value}")
        self.value = value

obj = MyClass(42)
print(f"obj.value = {obj.value}")

# Singleton pattern using __new__
class Singleton:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            print("Creating new instance")
            cls._instance = super().__new__(cls)
        else:
            print("Reusing existing instance")
        return cls._instance

a = Singleton()
b = Singleton()
print(f"Same object? {a is b}")`,
    codeOutput: [
      "__new__ called with cls=MyClass",
      "__init__ called with value=42",
      "obj.value = 42",
      "Creating new instance",
      "Reusing existing instance",
      "Same object? True",
    ],
  },
  "super-init": {
    label: "super().__init__()",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "When a child class defines __init__, it should call super().__init__() to ensure the parent class is properly initialized. This is critical for inheritance chains to work correctly.",
    keyPoints: [
      "super().__init__() calls the parent class constructor",
      "Always call it to ensure parent attributes are initialized",
      "Pass only the arguments the parent expects",
      "Works with multi-level inheritance (MRO)",
    ],
    codeSnippet: `# Basic inheritance with super()
class Animal:
    def __init__(self, name, species):
        self.name = name
        self.species = species
        print(f"Animal.__init__: {name} ({species})")

class Pet(Animal):
    def __init__(self, name, species, owner):
        super().__init__(name, species)
        self.owner = owner
        print(f"Pet.__init__: owner={owner}")

class Dog(Pet):
    def __init__(self, name, owner, tricks=None):
        super().__init__(name, "Canine", owner)
        self.tricks = tricks if tricks is not None else []
        print(f"Dog.__init__: tricks={self.tricks}")

# Multi-level chain
rex = Dog("Rex", "Alice", ["sit", "shake"])
print(f"\\n{rex.name}, {rex.species}, owner: {rex.owner}")
print(f"Tricks: {rex.tricks}")

# Forgetting super() is a common bug
class BadChild(Animal):
    def __init__(self, name):
        self.tag = "broken"
        # Forgot super().__init__()!

try:
    b = BadChild("Oops")
    print(b.species)
except AttributeError as e:
    print(f"Error: {e}")`,
    codeOutput: [
      "Animal.__init__: Rex (Canine)",
      "Pet.__init__: owner=Alice",
      "Dog.__init__: tricks=['sit', 'shake']",
      "",
      "Rex, Canine, owner: Alice",
      "Tricks: ['sit', 'shake']",
      "Error: 'BadChild' object has no attribute 'species'",
    ],
  },
};

const order: TopicKey[] = ["init-basics", "default-values", "new-vs-init", "super-init"];

const chipColors: Record<TopicKey, string> = {
  "init-basics": "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  "default-values": "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  "new-vs-init": "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  "super-init": "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
};

// ─── Main export ──────────────────────────────────────────────────────────────
export function ConstructorsVisualization() {
  const [selected, setSelected] = useState<TopicKey>("init-basics");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const topic = topics[selected];

  const handleSelect = (key: TopicKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Python Constructors</CardTitle>
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
                  constructor
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{topic.description}</p>
            </div>

            {/* Key Points */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Key Points
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {topic.keyPoints.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2 text-xs text-muted-foreground"
                  >
                    <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-current shrink-0" />
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
