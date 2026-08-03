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
type TopicKey = "simple" | "extra" | "hierarchy" | "patterns";

interface TopicInfo {
  label: string;
  subtitle: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
  keyPoints: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const topics: Record<TopicKey, TopicInfo> = {
  simple: {
    label: "Simple Custom",
    subtitle: "Basic Exception",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "The simplest custom exception is a class that inherits from Exception (or a subclass of it). Even with just 'pass' in the body, it gives you a distinct exception type you can catch separately from built-in exceptions.",
    codeSnippet: `class MyError(Exception):
    pass

class InputTooLargeError(Exception):
    """Raised when input exceeds the allowed limit."""
    pass

# Raising and catching a simple custom exception
try:
    raise MyError("Something went wrong")
except MyError as e:
    print(f"Caught MyError: {e}")

# Using the descriptive custom exception
try:
    value = 150
    if value > 100:
        raise InputTooLargeError(f"Value {value} exceeds max of 100")
except InputTooLargeError as e:
    print(f"Caught: {e}")

# Custom exceptions are distinct types
print(f"Is subclass of Exception: {issubclass(MyError, Exception)}")
print(f"MyError MRO: {[c.__name__ for c in MyError.__mro__]}")`,
    codeOutput: [
      "Caught MyError: Something went wrong",
      "Caught: Value 150 exceeds max of 100",
      "Is subclass of Exception: True",
      "MyError MRO: ['MyError', 'Exception', 'BaseException', 'object']",
    ],
    keyPoints: [
      "Inherit from Exception (not BaseException) for catchable errors",
      "Even 'pass' body creates a unique, catchable exception type",
      "Add a docstring to describe when the exception should be raised",
      "Custom exceptions follow the standard MRO chain",
    ],
  },
  extra: {
    label: "With Extra Data",
    subtitle: "Rich Exceptions",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "Custom exceptions can carry additional context by overriding __init__. Store fields like status_code, message, and context so that handlers can make informed decisions about recovery or logging.",
    codeSnippet: `class APIError(Exception):
    def __init__(self, message, status_code, context=None):
        super().__init__(message)
        self.message = message
        self.status_code = status_code
        self.context = context or {}

    def __str__(self):
        return f"[{self.status_code}] {self.message}"

    def to_dict(self):
        return {
            "error": self.message,
            "status": self.status_code,
            "context": self.context,
        }

# Raise with extra data
try:
    raise APIError(
        "User not found",
        status_code=404,
        context={"user_id": 42, "endpoint": "/api/users"}
    )
except APIError as e:
    print(f"Error: {e}")
    print(f"Status: {e.status_code}")
    print(f"Context: {e.context}")
    print(f"As dict: {e.to_dict()}")`,
    codeOutput: [
      "Error: [404] User not found",
      "Status: 404",
      "Context: {'user_id': 42, 'endpoint': '/api/users'}",
      "As dict: {'error': 'User not found', 'status': 404, 'context': {'user_id': 42, 'endpoint': '/api/users'}}",
    ],
    keyPoints: [
      "Always call super().__init__(message) to preserve standard behavior",
      "Store structured fields (status_code, context) for programmatic access",
      "Override __str__ for human-readable error messages",
      "Add helper methods like to_dict() for serialization / logging",
    ],
  },
  hierarchy: {
    label: "Exception Hierarchy",
    subtitle: "Inheritance Tree",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "Organize related exceptions into a hierarchy using inheritance. A base AppError can branch into DBError and AuthError, with DBError further splitting into QueryError and ConnectionError. Catching a parent catches all children.",
    codeSnippet: `class AppError(Exception):
    """Base exception for the application."""
    pass

class DBError(AppError):
    """Base for all database errors."""
    pass

class QueryError(DBError):
    """Raised on invalid queries."""
    pass

class ConnectionError(DBError):
    """Raised on connection failures."""
    pass

class AuthError(AppError):
    """Raised on authentication failures."""
    pass

# Catching at different levels
errors = [
    QueryError("Bad SQL syntax"),
    ConnectionError("Timeout after 30s"),
    AuthError("Invalid token"),
]

for err in errors:
    try:
        raise err
    except DBError as e:
        print(f"DB issue  -> {type(e).__name__}: {e}")
    except AppError as e:
        print(f"App issue -> {type(e).__name__}: {e}")

# Hierarchy check
print(f"QueryError is DBError: {issubclass(QueryError, DBError)}")
print(f"QueryError is AppError: {issubclass(QueryError, AppError)}")`,
    codeOutput: [
      "DB issue  -> QueryError: Bad SQL syntax",
      "DB issue  -> ConnectionError: Timeout after 30s",
      "App issue -> AuthError: Invalid token",
      "QueryError is DBError: True",
      "QueryError is AppError: True",
    ],
    keyPoints: [
      "AppError -> DBError -> QueryError forms a tree",
      "Catching DBError also catches QueryError and ConnectionError",
      "Order except blocks from most specific to most general",
      "issubclass() confirms the inheritance chain",
    ],
  },
  patterns: {
    label: "Practical Patterns",
    subtitle: "Real-World Use",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "In practice, create custom exceptions for domain-specific errors (validation, HTTP, business logic). Use built-in exceptions (ValueError, TypeError) for generic programming errors. Combine both for clean, maintainable error handling.",
    codeSnippet: `class ValidationError(Exception):
    def __init__(self, field, value, rule):
        self.field = field
        self.value = value
        self.rule = rule
        super().__init__(f"'{field}' failed: {rule}")

class HTTPError(Exception):
    STATUS_MESSAGES = {400: "Bad Request", 404: "Not Found", 500: "Server Error"}

    def __init__(self, status):
        self.status = status
        msg = self.STATUS_MESSAGES.get(status, "Unknown")
        super().__init__(f"HTTP {status}: {msg}")

# Validation pattern
def validate_age(age):
    if not isinstance(age, int):
        raise TypeError("age must be an integer")     # built-in
    if age < 0 or age > 150:
        raise ValidationError("age", age, "must be 0-150")  # custom

# HTTP pattern
def fetch(url):
    if "missing" in url:
        raise HTTPError(404)
    return "OK"

for age in [25, -5]:
    try:
        validate_age(age)
        print(f"Age {age}: valid")
    except ValidationError as e:
        print(f"Age {age}: {e} (field={e.field})")

for url in ["/api/data", "/api/missing"]:
    try:
        print(f"GET {url}: {fetch(url)}")
    except HTTPError as e:
        print(f"GET {url}: {e}")`,
    codeOutput: [
      "Age 25: valid",
      "Age -5: 'age' failed: must be 0-150 (field=age)",
      "GET /api/data: OK",
      "GET /api/missing: HTTP 404: Not Found",
    ],
    keyPoints: [
      "Use custom exceptions for domain logic (ValidationError, HTTPError)",
      "Use built-in exceptions (TypeError, ValueError) for generic checks",
      "Attach structured data so handlers can react programmatically",
      "Keep exception names descriptive and end with 'Error'",
    ],
  },
};

const order: TopicKey[] = ["simple", "extra", "hierarchy", "patterns"];

const chipColors: Record<TopicKey, string> = {
  simple: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  extra: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  hierarchy: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  patterns: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
};

// ─── Main export ──────────────────────────────────────────────────────────────
export function CustomExceptionsVisualization() {
  const [selected, setSelected] = useState<TopicKey>("simple");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const topic = topics[selected];

  const handleSelect = (key: TopicKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Custom Exceptions</CardTitle>
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
      </CardContent>
    </Card>
  );
}
