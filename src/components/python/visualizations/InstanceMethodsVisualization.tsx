"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, User, Factory, Wrench, Lock } from "lucide-react";
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
type TopicKey = "instance" | "classmethod" | "staticmethod" | "property";

interface TopicInfo {
  label: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  badgeColor: string;
  description: string;
  keyPoints: string[];
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const topics: Record<TopicKey, TopicInfo> = {
  instance: {
    label: "Instance Methods",
    subtitle: "self",
    icon: <User className="h-3.5 w-3.5" />,
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "Instance methods are the most common type of method in Python classes. They take 'self' as the first parameter, which refers to the specific instance calling the method. Through self, they can access and modify instance attributes and call other instance methods.",
    keyPoints: [
      "First parameter is always 'self' (the instance)",
      "Can access and modify instance attributes via self",
      "Can call other methods on the same instance",
      "Called on an instance: obj.method()",
    ],
    codeSnippet: `class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount
        print(f"\${amount} deposited. Balance: \${self.balance}")

    def withdraw(self, amount):
        if amount > self.balance:
            print("Insufficient funds!")
            return
        self.balance -= amount
        print(f"\${amount} withdrawn. Balance: \${self.balance}")

    def get_summary(self):
        return f"{self.owner}'s account: \${self.balance}"

acc = BankAccount("Alice", 100)
acc.deposit(50)
acc.withdraw(30)
print(acc.get_summary())`,
    codeOutput: [
      "$50 deposited. Balance: $150",
      "$30 withdrawn. Balance: $120",
      "Alice's account: $120",
    ],
  },
  classmethod: {
    label: "@classmethod",
    subtitle: "cls",
    icon: <Factory className="h-3.5 w-3.5" />,
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "Class methods receive the class itself as the first argument (cls) instead of an instance. They are defined with the @classmethod decorator and are commonly used as alternative constructors or to modify class-level state shared across all instances.",
    keyPoints: [
      "Decorated with @classmethod",
      "First parameter is 'cls' (the class itself)",
      "Can create instances via alternative constructors",
      "Can modify class state that applies to all instances",
    ],
    codeSnippet: `class Employee:
    raise_factor = 1.05
    count = 0

    def __init__(self, name, salary):
        self.name = name
        self.salary = salary
        Employee.count += 1

    @classmethod
    def from_string(cls, emp_str):
        name, salary = emp_str.split("-")
        return cls(name, int(salary))

    @classmethod
    def set_raise_factor(cls, factor):
        cls.raise_factor = factor
        print(f"Raise factor set to {factor}")

    def apply_raise(self):
        self.salary = int(self.salary * self.raise_factor)
        print(f"{self.name}: \${self.salary}")

emp = Employee.from_string("Bob-50000")
print(f"Created: {emp.name}, \${emp.salary}")
Employee.set_raise_factor(1.10)
emp.apply_raise()
print(f"Total employees: {Employee.count}")`,
    codeOutput: [
      "Created: Bob, $50000",
      "Raise factor set to 1.1",
      "Bob: $55000",
      "Total employees: 1",
    ],
  },
  staticmethod: {
    label: "@staticmethod",
    subtitle: "utility",
    icon: <Wrench className="h-3.5 w-3.5" />,
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "Static methods don't receive an implicit first argument — no self or cls. They behave like regular functions but belong to the class's namespace for organizational purposes. Use them for utility functions that are logically related to the class but don't need access to instance or class state.",
    keyPoints: [
      "Decorated with @staticmethod",
      "No self or cls parameter",
      "Cannot access instance or class state",
      "Used for utility/helper functions in the class namespace",
    ],
    codeSnippet: `class MathUtils:
    @staticmethod
    def is_even(n):
        return n % 2 == 0

    @staticmethod
    def factorial(n):
        if n <= 1:
            return 1
        return n * MathUtils.factorial(n - 1)

    @staticmethod
    def celsius_to_fahrenheit(c):
        return round(c * 9/5 + 32, 1)

print(f"Is 4 even? {MathUtils.is_even(4)}")
print(f"Is 7 even? {MathUtils.is_even(7)}")
print(f"5! = {MathUtils.factorial(5)}")
print(f"100C = {MathUtils.celsius_to_fahrenheit(100)}F")

# Can also call on an instance
m = MathUtils()
print(f"0C = {m.celsius_to_fahrenheit(0)}F")`,
    codeOutput: [
      "Is 4 even? True",
      "Is 7 even? False",
      "5! = 120",
      "100C = 212.0F",
      "0C = 32.0F",
    ],
  },
  property: {
    label: "@property",
    subtitle: "getter/setter",
    icon: <Lock className="h-3.5 w-3.5" />,
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "The @property decorator lets you define methods that are accessed like attributes. This enables the getter/setter pattern for controlled access, computed attributes, and validation — all while maintaining a clean attribute-style interface for the caller.",
    keyPoints: [
      "@property defines a getter accessed like an attribute",
      "@name.setter adds validation on assignment",
      "Useful for computed/derived attributes",
      "Keeps interface clean while adding logic behind the scenes",
    ],
    codeSnippet: `class Circle:
    def __init__(self, radius):
        self._radius = radius  # underscore = internal

    @property
    def radius(self):
        return self._radius

    @radius.setter
    def radius(self, value):
        if value < 0:
            raise ValueError("Radius cannot be negative")
        self._radius = value
        print(f"Radius set to {value}")

    @property
    def area(self):
        import math
        return round(math.pi * self._radius ** 2, 2)

    @property
    def diameter(self):
        return self._radius * 2

c = Circle(5)
print(f"Radius: {c.radius}")
print(f"Diameter: {c.diameter}")
print(f"Area: {c.area}")
c.radius = 10
print(f"New area: {c.area}")`,
    codeOutput: [
      "Radius: 5",
      "Diameter: 10",
      "Area: 78.54",
      "Radius set to 10",
      "New area: 314.16",
    ],
  },
};

const order: TopicKey[] = ["instance", "classmethod", "staticmethod", "property"];

const chipColors: Record<TopicKey, string> = {
  instance: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  classmethod: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  staticmethod: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  property: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
};

const pointColors: Record<TopicKey, string> = {
  instance: "bg-blue-500",
  classmethod: "bg-emerald-500",
  staticmethod: "bg-violet-500",
  property: "bg-orange-500",
};

// ─── Main export ──────────────────────────────────────────────────────────────
export function InstanceMethodsVisualization() {
  const [selected, setSelected] = useState<TopicKey>("instance");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const topic = topics[selected];

  const handleSelect = (key: TopicKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Python Instance Methods</CardTitle>
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
                {t.icon}
                {t.label} ({t.subtitle})
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

            {/* Key points */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground">Key Points</p>
              <div className="rounded-xl border bg-muted/20 px-4 py-3">
                <ul className="space-y-1.5">
                  {topic.keyPoints.map((point, idx) => (
                    <li key={`point-${selected}-${idx}`} className="flex items-start gap-2 text-xs">
                      <span
                        className={`mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 ${pointColors[selected]}`}
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
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

        {/* Comparison table */}
        <div className="space-y-2 pt-2">
          <p className="text-xs font-semibold text-muted-foreground">Method Types — Comparison</p>
          <div className="rounded-xl border overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-muted/40">
                  <th className="text-left px-3 py-2 font-semibold text-muted-foreground">Aspect</th>
                  <th className="text-left px-3 py-2 font-semibold text-blue-700 dark:text-blue-300">
                    Instance
                  </th>
                  <th className="text-left px-3 py-2 font-semibold text-emerald-700 dark:text-emerald-300">
                    @classmethod
                  </th>
                  <th className="text-left px-3 py-2 font-semibold text-violet-700 dark:text-violet-300">
                    @staticmethod
                  </th>
                  <th className="text-left px-3 py-2 font-semibold text-orange-700 dark:text-orange-300">
                    @property
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border/50">
                  <td className="px-3 py-2 font-medium text-muted-foreground">First param</td>
                  <td className="px-3 py-2"><code>self</code></td>
                  <td className="px-3 py-2"><code>cls</code></td>
                  <td className="px-3 py-2">None</td>
                  <td className="px-3 py-2"><code>self</code></td>
                </tr>
                <tr className="border-t border-border/50">
                  <td className="px-3 py-2 font-medium text-muted-foreground">Access</td>
                  <td className="px-3 py-2">Instance + class</td>
                  <td className="px-3 py-2">Class only</td>
                  <td className="px-3 py-2">Neither</td>
                  <td className="px-3 py-2">Instance + class</td>
                </tr>
                <tr className="border-t border-border/50">
                  <td className="px-3 py-2 font-medium text-muted-foreground">Called via</td>
                  <td className="px-3 py-2"><code>obj.method()</code></td>
                  <td className="px-3 py-2"><code>Cls.method()</code></td>
                  <td className="px-3 py-2"><code>Cls.method()</code></td>
                  <td className="px-3 py-2"><code>obj.attr</code></td>
                </tr>
                <tr className="border-t border-border/50">
                  <td className="px-3 py-2 font-medium text-muted-foreground">Common use</td>
                  <td className="px-3 py-2">Object behavior</td>
                  <td className="px-3 py-2">Alt constructors</td>
                  <td className="px-3 py-2">Utility helpers</td>
                  <td className="px-3 py-2">Computed attrs</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
