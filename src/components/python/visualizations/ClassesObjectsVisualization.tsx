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
type TopicKey = "define-class" | "create-objects" | "class-vs-instance" | "type-identity";

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
  "define-class": {
    label: "Define a Class",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "A class is a blueprint for creating objects. Use the class keyword to define one. The __init__ method is the constructor that runs when an object is created. The self parameter refers to the current instance.",
    keyPoints: [
      "Use the class keyword followed by the class name (PascalCase convention)",
      "__init__ is the constructor — called automatically on instantiation",
      "self refers to the current instance being created or accessed",
      "Attributes are variables attached to self inside __init__",
    ],
    codeSnippet: `# Define a simple class
class Dog:
    def __init__(self, name, breed, age):
        self.name = name      # instance attribute
        self.breed = breed
        self.age = age

    def bark(self):
        return f"{self.name} says: Woof!"

    def describe(self):
        return f"{self.name} is a {self.age}-year-old {self.breed}"

# Create an instance
my_dog = Dog("Buddy", "Golden Retriever", 3)
print(my_dog.bark())
print(my_dog.describe())`,
    codeOutput: [
      "Buddy says: Woof!",
      "Buddy is a 3-year-old Golden Retriever",
    ],
  },
  "create-objects": {
    label: "Create Objects",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "Objects (instances) are created by calling the class like a function. Each object has its own copy of instance attributes. You can access attributes with dot notation and call methods on the object.",
    keyPoints: [
      "Instantiate by calling ClassName(args) — no 'new' keyword needed",
      "Each object gets its own independent attribute values",
      "Access attributes with dot notation: obj.attribute",
      "Call methods with dot notation: obj.method()",
    ],
    codeSnippet: `class Car:
    def __init__(self, make, model, year):
        self.make = make
        self.model = model
        self.year = year
        self.odometer = 0

    def drive(self, miles):
        self.odometer += miles

    def info(self):
        return f"{self.year} {self.make} {self.model} — {self.odometer} mi"

# Create multiple objects from one class
car1 = Car("Toyota", "Camry", 2022)
car2 = Car("Honda", "Civic", 2023)

car1.drive(150)
car2.drive(80)

print(car1.info())
print(car2.info())
print(f"car1 make: {car1.make}")
print(f"car2 year: {car2.year}")`,
    codeOutput: [
      "2022 Toyota Camry — 150 mi",
      "2023 Honda Civic — 80 mi",
      "car1 make: Toyota",
      "car2 year: 2023",
    ],
  },
  "class-vs-instance": {
    label: "Class vs Instance",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "Class attributes are shared across all instances of a class, while instance attributes are unique to each object. Changing a class attribute affects every instance, but instance attributes are independent.",
    keyPoints: [
      "Class attributes are defined directly in the class body, outside __init__",
      "Instance attributes are set on self inside __init__",
      "Class attributes are shared — changing one affects all instances",
      "Instance attributes are unique to each object",
    ],
    codeSnippet: `class Employee:
    # Class attribute — shared by all instances
    company = "TechCorp"
    employee_count = 0

    def __init__(self, name, role):
        # Instance attributes — unique to each object
        self.name = name
        self.role = role
        Employee.employee_count += 1

    def display(self):
        return f"{self.name} ({self.role}) at {self.company}"

e1 = Employee("Alice", "Engineer")
e2 = Employee("Bob", "Designer")

print(e1.display())
print(e2.display())
print(f"Total employees: {Employee.employee_count}")

# Change class attribute — affects all instances
Employee.company = "NewTechCorp"
print(f"e1 company: {e1.company}")
print(f"e2 company: {e2.company}")`,
    codeOutput: [
      "Alice (Engineer) at TechCorp",
      "Bob (Designer) at TechCorp",
      "Total employees: 2",
      "e1 company: NewTechCorp",
      "e2 company: NewTechCorp",
    ],
  },
  "type-identity": {
    label: "Type & Identity",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "In Python, everything is an object — integers, strings, lists, and even functions. Use type() to check an object's class, isinstance() to test membership, and id() to get the unique memory identity.",
    keyPoints: [
      "type(obj) returns the class/type of any object",
      "isinstance(obj, Class) checks if obj is an instance of Class",
      "id(obj) returns a unique integer identifier (memory address)",
      "Everything in Python is an object — even int, str, and functions",
    ],
    codeSnippet: `class Animal:
    def __init__(self, name):
        self.name = name

cat = Animal("Whiskers")

# type() — check the type
print(type(cat))
print(type(42))
print(type("hello"))
print(type([1, 2, 3]))

# isinstance() — check class membership
print(isinstance(cat, Animal))
print(isinstance(42, int))
print(isinstance("hello", (str, int)))

# id() — unique identity
a = Animal("Rex")
b = a              # b points to same object
c = Animal("Rex")  # c is a new object
print(f"a is b: {a is b} (id: {id(a)} == {id(b)})")
print(f"a is c: {a is c} (different objects)")`,
    codeOutput: [
      "<class '__main__.Animal'>",
      "<class 'int'>",
      "<class 'str'>",
      "<class 'list'>",
      "True",
      "True",
      "True",
      "a is b: True (id: 140234567890 == 140234567890)",
      "a is c: False (different objects)",
    ],
  },
};

const order: TopicKey[] = ["define-class", "create-objects", "class-vs-instance", "type-identity"];

const chipColors: Record<TopicKey, string> = {
  "define-class": "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  "create-objects": "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  "class-vs-instance": "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  "type-identity": "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
};

// ─── Main export ──────────────────────────────────────────────────────────────
export function ClassesObjectsVisualization() {
  const [selected, setSelected] = useState<TopicKey>("define-class");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const topic = topics[selected];

  const handleSelect = (key: TopicKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Python Classes &amp; Objects</CardTitle>
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
                  OOP
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
