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
type TopicKey = "csv-rw" | "dictreader" | "json-rw" | "patterns";

interface TopicInfo {
  label: string;
  subtitle: string;
  color: string;
  badgeColor: string;
  badgeLabel: string;
  description: string;
  keyPoints: string[];
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const topics: Record<TopicKey, TopicInfo> = {
  "csv-rw": {
    label: "CSV Read/Write",
    subtitle: "csv.reader & csv.writer",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    badgeLabel: "csv",
    description:
      "The csv module provides csv.reader() and csv.writer() for reading and writing CSV files. csv.reader returns an iterator of lists (one per row), while csv.writer writes sequences as CSV rows. Always open CSV files with newline='' to prevent blank-line issues on Windows.",
    keyPoints: [
      "csv.reader() returns an iterator of row lists",
      "csv.writer() writes sequences with .writerow() and .writerows()",
      "Use newline='' when opening CSV files",
      "Supports custom delimiters and quoting options",
    ],
    codeSnippet: `import csv
from io import StringIO

# Writing CSV data
output = StringIO()
writer = csv.writer(output)
writer.writerow(["Name", "Age", "City"])
writer.writerow(["Alice", 30, "New York"])
writer.writerow(["Bob", 25, "London"])
print("Written CSV:")
print(output.getvalue())

# Reading CSV data
output.seek(0)
reader = csv.reader(output)
for row in reader:
    print(row)`,
    codeOutput: [
      "Written CSV:",
      "Name,Age,City",
      "Alice,30,New York",
      "Bob,25,London",
      "",
      "['Name', 'Age', 'City']",
      "['Alice', '30', 'New York']",
      "['Bob', '25', 'London']",
    ],
  },
  dictreader: {
    label: "DictReader/Writer",
    subtitle: "Dict-Based CSV Access",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    badgeLabel: "dict-csv",
    description:
      "csv.DictReader reads each row as an OrderedDict (or dict in Python 3.7+) mapping column headers to values. csv.DictWriter writes dicts as CSV rows, requiring a fieldnames list to define column order. This makes code more readable when accessing columns by name.",
    keyPoints: [
      "DictReader maps header names to row values automatically",
      "DictWriter requires fieldnames parameter",
      "Use writeheader() to output the header row",
      "More readable than index-based csv.reader access",
    ],
    codeSnippet: `import csv
from io import StringIO

# Writing with DictWriter
output = StringIO()
fields = ["name", "score", "grade"]
writer = csv.DictWriter(output, fieldnames=fields)
writer.writeheader()
writer.writerow({"name": "Alice", "score": 95, "grade": "A"})
writer.writerow({"name": "Bob", "score": 82, "grade": "B"})
print("DictWriter output:")
print(output.getvalue())

# Reading with DictReader
output.seek(0)
reader = csv.DictReader(output)
for row in reader:
    print(f"\{row['name']}: \{row['score']} (\{row['grade']})")`,
    codeOutput: [
      "DictWriter output:",
      "name,score,grade",
      "Alice,95,A",
      "Bob,82,B",
      "",
      "Alice: 95 (A)",
      "Bob: 82 (B)",
    ],
  },
  "json-rw": {
    label: "JSON Read/Write",
    subtitle: "json.load/dump & loads/dumps",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    badgeLabel: "json",
    description:
      "The json module provides load/dump for file objects and loads/dumps for strings. json.dumps() serialises a Python object to a JSON string, while json.loads() parses a JSON string back into a Python object. Use indent for pretty printing and sort_keys for consistent output.",
    keyPoints: [
      "json.dumps() → Python to JSON string",
      "json.loads() → JSON string to Python",
      "json.dump() / json.load() work with file objects",
      "Supports indent, sort_keys, and default parameters",
    ],
    codeSnippet: `import json

# Python dict to JSON string
data = {"name": "Alice", "age": 30, "hobbies": ["reading", "coding"]}
json_str = json.dumps(data)
print("JSON string:", json_str)

# JSON string back to Python
parsed = json.loads(json_str)
print("Parsed name:", parsed["name"])
print("Parsed hobbies:", parsed["hobbies"])

# Pretty printing with indent
pretty = json.dumps(data, indent=2, sort_keys=True)
print("Pretty JSON:")
print(pretty)`,
    codeOutput: [
      'JSON string: {"name": "Alice", "age": 30, "hobbies": ["reading", "coding"]}',
      "Parsed name: Alice",
      "Parsed hobbies: ['reading', 'coding']",
      "Pretty JSON:",
      "{",
      '  "age": 30,',
      '  "hobbies": [',
      '    "reading",',
      '    "coding"',
      "  ],",
      '  "name": "Alice"',
      "}",
    ],
  },
  patterns: {
    label: "Practical Patterns",
    subtitle: "Serialization & Format Choice",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    badgeLabel: "practical",
    description:
      "Real-world patterns include custom JSON serialization with the default parameter, converting between CSV and JSON, and choosing the right format. CSV is ideal for tabular data and spreadsheet compatibility; JSON is best for nested/hierarchical data and API communication.",
    keyPoints: [
      "Use default= parameter for custom JSON serialization",
      "Convert CSV rows to list of dicts for JSON export",
      "CSV: flat tabular data, spreadsheet-friendly",
      "JSON: nested structures, API communication, configs",
    ],
    codeSnippet: `import json
from datetime import datetime

# Custom serialization with default
def serialize(obj):
    if isinstance(obj, datetime):
        return obj.isoformat()
    raise TypeError(f"Not serializable: \{type(obj)}")

event = {
    "title": "Meeting",
    "when": datetime(2025, 6, 15, 14, 30)
}
result = json.dumps(event, default=serialize, indent=2)
print(result)

# CSV vs JSON decision guide
print()
print("CSV  -> flat rows, Excel-friendly, smaller size")
print("JSON -> nested data, APIs, human-readable configs")

# Quick CSV-to-JSON conversion pattern
import csv
from io import StringIO
csv_data = "name,age\\nAlice,30\\nBob,25"
reader = csv.DictReader(StringIO(csv_data))
records = list(reader)
print("\\nCSV as JSON:", json.dumps(records))`,
    codeOutput: [
      "{",
      '  "title": "Meeting",',
      '  "when": "2025-06-15T14:30:00"',
      "}",
      "",
      "CSV  -> flat rows, Excel-friendly, smaller size",
      "JSON -> nested data, APIs, human-readable configs",
      "",
      'CSV as JSON: [{"name": "Alice", "age": "30"}, {"name": "Bob", "age": "25"}]',
    ],
  },
};

const order: TopicKey[] = ["csv-rw", "dictreader", "json-rw", "patterns"];

const chipColors: Record<TopicKey, string> = {
  "csv-rw": "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  dictreader: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  "json-rw": "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  patterns: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
};

// ─── Main export ──────────────────────────────────────────────────────────────
export function CsvJsonVisualization() {
  const [selected, setSelected] = useState<TopicKey>("csv-rw");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const topic = topics[selected];

  const handleSelect = (key: TopicKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Working with CSV and JSON</CardTitle>
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
                  {topic.badgeLabel}
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
                    key={`kp-${selected}-${point}`}
                    className="text-xs text-muted-foreground flex items-start gap-1.5"
                  >
                    <span className="text-emerald-500 mt-0.5 select-none">*</span>
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
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
