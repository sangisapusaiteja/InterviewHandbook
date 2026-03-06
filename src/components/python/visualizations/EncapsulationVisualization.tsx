"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Shield, Hash, Settings, Lock } from "lucide-react";
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
type TopicKey = "access" | "mangling" | "property" | "hiding";

interface TopicInfo {
  label: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
  keyPoints: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const topics: Record<TopicKey, TopicInfo> = {
  access: {
    label: "Access Levels",
    subtitle: "Conventions",
    icon: <Shield className="h-3.5 w-3.5" />,
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "Python uses naming conventions to indicate access levels. A plain name is public, a single underscore _name is protected (internal use), and a double underscore __name is private (name-mangled). These are conventions — Python trusts developers to respect them.",
    codeSnippet: `class Employee:
    def __init__(self, name, salary, ssn):
        self.name = name         # public
        self._salary = salary    # protected
        self.__ssn = ssn         # private

emp = Employee("Alice", 75000, "123-45-6789")

# Public: accessible anywhere
print(f"Name: {emp.name}")

# Protected: accessible but signals internal use
print(f"Salary: {emp._salary}")

# Private: raises AttributeError
try:
    print(emp.__ssn)
except AttributeError as e:
    print(f"Error: {e}")`,
    codeOutput: [
      "Name: Alice",
      "Salary: 75000",
      "Error: 'Employee' object has no attribute '__ssn'",
    ],
    keyPoints: [
      "public (name) — no restriction, part of the API",
      "protected (_name) — single underscore, internal convention",
      "private (__name) — double underscore, triggers name mangling",
      "Python has no true access modifiers like Java/C++",
    ],
  },
  mangling: {
    label: "Name Mangling",
    subtitle: "__attr",
    icon: <Hash className="h-3.5 w-3.5" />,
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "When you use double underscores (__attr), Python internally renames it to _ClassName__attr. This is called name mangling. Its primary purpose is to prevent accidental name clashes in subclasses, not to enforce strict privacy.",
    codeSnippet: `class BankAccount:
    def __init__(self, balance):
        self.__balance = balance  # mangled

    def get_balance(self):
        return self.__balance

acc = BankAccount(1000)

# Normal access through method works
print(f"Balance: {acc.get_balance()}")

# Direct __balance fails
try:
    print(acc.__balance)
except AttributeError:
    print("Cannot access __balance directly")

# But mangled name still works
print(f"Mangled: {acc._BankAccount__balance}")

# Show all attributes with double-underscore mangling
attrs = [a for a in dir(acc) if "balance" in a.lower()]
print(f"Attributes: {attrs}")`,
    codeOutput: [
      "Balance: 1000",
      "Cannot access __balance directly",
      "Mangled: 1000",
      "Attributes: ['_BankAccount__balance', 'get_balance']",
    ],
    keyPoints: [
      "__attr becomes _ClassName__attr internally",
      "Prevents accidental override in subclasses",
      "Not true security — still accessible via mangled name",
      "Use dir(obj) to see all attributes including mangled ones",
    ],
  },
  property: {
    label: "@property",
    subtitle: "Getter/Setter",
    icon: <Settings className="h-3.5 w-3.5" />,
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "The @property decorator lets you define getter, setter, and deleter methods that behave like attribute access. This provides controlled access with validation while keeping a clean interface — no need for explicit get_x() / set_x() calls.",
    codeSnippet: `class Temperature:
    def __init__(self, celsius):
        self._celsius = celsius  # uses setter

    @property
    def celsius(self):
        """Getter: returns the value."""
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        """Setter: validates before setting."""
        if value < -273.15:
            raise ValueError("Below absolute zero!")
        self._celsius = value

    @celsius.deleter
    def celsius(self):
        """Deleter: resets to default."""
        print("Resetting temperature")
        self._celsius = 0

t = Temperature(25)
print(f"Temp: {t.celsius}\u00b0C")

t.celsius = 100
print(f"Updated: {t.celsius}\u00b0C")

try:
    t.celsius = -300
except ValueError as e:
    print(f"Error: {e}")

del t.celsius
print(f"After delete: {t.celsius}\u00b0C")`,
    codeOutput: [
      "Temp: 25\u00b0C",
      "Updated: 100\u00b0C",
      "Error: Below absolute zero!",
      "Resetting temperature",
      "After delete: 0\u00b0C",
    ],
    keyPoints: [
      "@property — defines a getter (read access)",
      "@attr.setter — defines a setter with validation",
      "@attr.deleter — defines cleanup/reset on del",
      "Callers use obj.attr syntax, not obj.get_attr()",
    ],
  },
  hiding: {
    label: "Data Hiding",
    subtitle: "Why Encapsulate",
    icon: <Lock className="h-3.5 w-3.5" />,
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Encapsulation bundles data and the methods that operate on it, exposing only a public interface. Python follows the \"consenting adults\" philosophy — it won't stop you, but conventions clearly signal what's internal. This protects invariants and reduces coupling.",
    codeSnippet: `class Wallet:
    def __init__(self, owner):
        self.owner = owner           # public
        self._transactions = []      # protected
        self.__balance = 0           # private

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Must be positive")
        self.__balance += amount
        self._transactions.append(f"+\${amount}")
        print(f"Deposited \${amount}")

    def withdraw(self, amount):
        if amount > self.__balance:
            raise ValueError("Insufficient funds")
        self.__balance -= amount
        self._transactions.append(f"-\${amount}")
        print(f"Withdrew \${amount}")

    @property
    def balance(self):
        return self.__balance

    def statement(self):
        return f"{self.owner}: \${self.__balance} ({len(self._transactions)} txns)"

w = Wallet("Alice")
w.deposit(100)
w.deposit(50)
w.withdraw(30)
print(w.statement())
print(f"Balance: \${w.balance}")`,
    codeOutput: [
      "Deposited $100",
      "Deposited $50",
      "Withdrew $30",
      "Alice: $120 (3 txns)",
      "Balance: $120",
    ],
    keyPoints: [
      "Public interface (deposit/withdraw) enforces rules",
      "Internal state (__balance) can't be tampered with directly",
      "\"Consenting adults\" — conventions over enforcement",
      "Reduces coupling: internals can change without breaking callers",
    ],
  },
};

const order: TopicKey[] = ["access", "mangling", "property", "hiding"];

const chipColors: Record<TopicKey, string> = {
  access: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  mangling: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  property: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  hiding: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
};

const accessLevelColors: Record<string, string> = {
  public: "border-green-500/40 bg-green-500/10 text-green-700 dark:text-green-300",
  protected: "border-yellow-500/40 bg-yellow-500/10 text-yellow-700 dark:text-yellow-300",
  private: "border-red-500/40 bg-red-500/10 text-red-700 dark:text-red-300",
};

// ─── Main export ──────────────────────────────────────────────────────────────
export function EncapsulationVisualization() {
  const [selected, setSelected] = useState<TopicKey>("access");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const topic = topics[selected];

  const handleSelect = (key: TopicKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Python Encapsulation</CardTitle>
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
                {t.label}
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

            {/* Access Levels Diagram */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground">Access Levels Diagram</p>
              <div className="rounded-xl border bg-muted/20 px-4 py-4">
                <div className="flex flex-col items-center gap-2">
                  {/* Nested boxes representing access levels */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`w-full max-w-md rounded-xl border-2 border-dashed px-4 py-3 ${accessLevelColors.public}`}
                  >
                    <p className="text-xs font-mono font-bold mb-2">Public: self.name</p>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className={`w-full rounded-xl border-2 border-dashed px-4 py-3 ${accessLevelColors.protected}`}
                    >
                      <p className="text-xs font-mono font-bold mb-2">Protected: self._salary</p>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className={`w-full rounded-xl border-2 border-dashed px-4 py-3 ${accessLevelColors.private}`}
                      >
                        <p className="text-xs font-mono font-bold">Private: self.__ssn</p>
                        <p className="text-[10px] opacity-75 mt-0.5">
                          Mangled to _ClassName__ssn
                        </p>
                      </motion.div>
                    </motion.div>
                  </motion.div>

                  {/* Legend */}
                  <div className="flex flex-wrap gap-3 mt-2">
                    {(["public", "protected", "private"] as const).map((level) => (
                      <div key={`legend-${level}`} className="flex items-center gap-1.5">
                        <span
                          className={`inline-block w-2.5 h-2.5 rounded-sm border ${accessLevelColors[level]}`}
                        />
                        <span className="text-[10px] text-muted-foreground capitalize font-medium">
                          {level}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Key Points */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground">Key Points</p>
              <div className="rounded-xl border bg-muted/20 px-4 py-3">
                <ul className="space-y-1.5">
                  {topic.keyPoints.map((point, idx) => (
                    <motion.li
                      key={`kp-${selected}-${idx}`}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: idx * 0.05 }}
                      className="flex items-start gap-2 text-xs"
                    >
                      <span className="text-muted-foreground select-none mt-0.5">&#x2022;</span>
                      <span className="text-foreground/80">{point}</span>
                    </motion.li>
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

        {/* Access Modifier Comparison Table */}
        <div className="space-y-2 pt-2">
          <p className="text-xs font-semibold text-muted-foreground">Access Levels — Comparison</p>
          <div className="rounded-xl border overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-muted/40">
                  <th className="text-left px-3 py-2 font-semibold text-muted-foreground">Aspect</th>
                  <th className="text-left px-3 py-2 font-semibold text-green-700 dark:text-green-300">
                    Public
                  </th>
                  <th className="text-left px-3 py-2 font-semibold text-yellow-700 dark:text-yellow-300">
                    Protected
                  </th>
                  <th className="text-left px-3 py-2 font-semibold text-red-700 dark:text-red-300">
                    Private
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border/50">
                  <td className="px-3 py-2 font-medium text-muted-foreground">Syntax</td>
                  <td className="px-3 py-2">
                    <code className="text-green-600 dark:text-green-400">name</code>
                  </td>
                  <td className="px-3 py-2">
                    <code className="text-yellow-600 dark:text-yellow-400">_name</code>
                  </td>
                  <td className="px-3 py-2">
                    <code className="text-red-600 dark:text-red-400">__name</code>
                  </td>
                </tr>
                <tr className="border-t border-border/50">
                  <td className="px-3 py-2 font-medium text-muted-foreground">Access</td>
                  <td className="px-3 py-2">Anywhere</td>
                  <td className="px-3 py-2">Class &amp; subclasses (convention)</td>
                  <td className="px-3 py-2">Name-mangled</td>
                </tr>
                <tr className="border-t border-border/50">
                  <td className="px-3 py-2 font-medium text-muted-foreground">Mangled?</td>
                  <td className="px-3 py-2">No</td>
                  <td className="px-3 py-2">No</td>
                  <td className="px-3 py-2">
                    Yes — <code>_Class__name</code>
                  </td>
                </tr>
                <tr className="border-t border-border/50">
                  <td className="px-3 py-2 font-medium text-muted-foreground">Use case</td>
                  <td className="px-3 py-2">Public API, external interface</td>
                  <td className="px-3 py-2">Internal helpers, subclass access</td>
                  <td className="px-3 py-2">Avoid subclass name clashes</td>
                </tr>
                <tr className="border-t border-border/50">
                  <td className="px-3 py-2 font-medium text-muted-foreground">Enforced?</td>
                  <td className="px-3 py-2">N/A</td>
                  <td className="px-3 py-2">Convention only</td>
                  <td className="px-3 py-2">Soft — still accessible via mangled name</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
