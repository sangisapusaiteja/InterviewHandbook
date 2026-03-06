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
type TopicKey = "date-time" | "formatting" | "parsing" | "arithmetic";

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
  "date-time": {
    label: "Date & Time",
    subtitle: "date, time & datetime.now()",
    color: "bg-blue-500/15 border-blue-500/30 text-blue-400",
    badgeColor: "bg-blue-500/10 text-blue-400",
    badgeLabel: "basics",
    description:
      "The datetime module provides date, time, and datetime classes for working with dates and times. Use date() for calendar dates, time() for clock times, and datetime.now() to get the current date and time. Individual components like year, month, day, hour, minute, and second are accessible as attributes.",
    keyPoints: [
      "date(year, month, day) creates a date object",
      "time(hour, minute, second) creates a time object",
      "datetime.now() returns current local date and time",
      "Access components via .year, .month, .day, .hour, etc.",
    ],
    codeSnippet: `from datetime import date, time, datetime

# Creating a date object
d = date(2025, 6, 15)
print("Date:", d)
print("Year:", d.year, "Month:", d.month, "Day:", d.day)

# Creating a time object
t = time(14, 30, 45)
print("Time:", t)
print("Hour:", t.hour, "Minute:", t.minute)

# Current date and time
now = datetime.now()
print("Now:", now)
print("Today's date:", date.today())`,
    codeOutput: [
      "Date: 2025-06-15",
      "Year: 2025 Month: 6 Day: 15",
      "Time: 14:30:45",
      "Hour: 14 Minute: 30",
      "Now: 2025-06-15 10:23:47.123456",
      "Today's date: 2025-06-15",
    ],
  },
  formatting: {
    label: "Formatting",
    subtitle: "strftime() & ISO Format",
    color: "bg-emerald-500/15 border-emerald-500/30 text-emerald-400",
    badgeColor: "bg-emerald-500/10 text-emerald-400",
    badgeLabel: "strftime",
    description:
      "strftime() converts datetime objects to formatted strings using format codes. Common codes include %Y (4-digit year), %m (month), %d (day), %H (24-hour), %I (12-hour), %M (minute), %S (second), and %p (AM/PM). The isoformat() method returns an ISO 8601 formatted string.",
    keyPoints: [
      "%Y-%m-%d formats as 2025-06-15",
      "%H:%M:%S for 24-hour time, %I:%M %p for 12-hour",
      "%A gives full weekday name, %B gives full month name",
      ".isoformat() returns ISO 8601 string representation",
    ],
    codeSnippet: `from datetime import datetime

dt = datetime(2025, 6, 15, 14, 30, 0)

# Common format patterns
print(dt.strftime("%Y-%m-%d"))
print(dt.strftime("%d/%m/%Y"))
print(dt.strftime("%B %d, %Y"))
print(dt.strftime("%A, %B %d"))
print(dt.strftime("%I:%M %p"))
print(dt.strftime("%H:%M:%S"))

# Full date-time formatting
print(dt.strftime("%Y-%m-%d %H:%M:%S"))

# ISO format
print("ISO:", dt.isoformat())`,
    codeOutput: [
      "2025-06-15",
      "15/06/2025",
      "June 15, 2025",
      "Sunday, June 15",
      "02:30 PM",
      "14:30:00",
      "2025-06-15 14:30:00",
      "ISO: 2025-06-15T14:30:00",
    ],
  },
  parsing: {
    label: "Parsing",
    subtitle: "strptime() & String Conversion",
    color: "bg-violet-500/15 border-violet-500/30 text-violet-400",
    badgeColor: "bg-violet-500/10 text-violet-400",
    badgeLabel: "strptime",
    description:
      "strptime() parses a string into a datetime object using a matching format string. The format codes must match the input string exactly. If the format doesn't match, a ValueError is raised. Use try/except to handle invalid date strings gracefully.",
    keyPoints: [
      "strptime(string, format) parses string to datetime",
      "Format codes must match input string structure exactly",
      "Raises ValueError if string doesn't match format",
      "Use try/except for safe parsing of user input",
    ],
    codeSnippet: `from datetime import datetime

# Parsing date strings
d1 = datetime.strptime("2025-06-15", "%Y-%m-%d")
print("Parsed:", d1)

d2 = datetime.strptime("June 15, 2025", "%B %d, %Y")
print("Parsed:", d2)

d3 = datetime.strptime("15/06/2025 14:30", "%d/%m/%Y %H:%M")
print("Parsed:", d3)

# ISO format parsing
d4 = datetime.fromisoformat("2025-06-15T14:30:00")
print("From ISO:", d4)

# Error handling
try:
    bad = datetime.strptime("not-a-date", "%Y-%m-%d")
except ValueError as e:
    print(f"Error: \${e}")`,
    codeOutput: [
      "Parsed: 2025-06-15 00:00:00",
      "Parsed: 2025-06-15 00:00:00",
      "Parsed: 2025-06-15 14:30:00",
      "From ISO: 2025-06-15 14:30:00",
      "Error: time data 'not-a-date' does not match format '%Y-%m-%d'",
    ],
  },
  arithmetic: {
    label: "Arithmetic",
    subtitle: "timedelta & Date Math",
    color: "bg-orange-500/15 border-orange-500/30 text-orange-400",
    badgeColor: "bg-orange-500/10 text-orange-400",
    badgeLabel: "timedelta",
    description:
      "timedelta represents a duration — the difference between two dates or times. You can add or subtract timedelta objects from dates and datetimes. Subtracting two datetime objects produces a timedelta. Use comparison operators (<, >, ==) to compare dates directly.",
    keyPoints: [
      "timedelta(days=, hours=, minutes=, seconds=) creates a duration",
      "Add/subtract timedelta from date or datetime objects",
      "Subtracting two datetimes returns a timedelta",
      "Compare dates directly with <, >, ==, !=",
    ],
    codeSnippet: `from datetime import datetime, timedelta, date

# Creating timedelta
delta = timedelta(days=7, hours=3)
print("Delta:", delta)

# Date arithmetic
today = date(2025, 6, 15)
next_week = today + timedelta(days=7)
print("Today:", today)
print("Next week:", next_week)

last_month = today - timedelta(days=30)
print("30 days ago:", last_month)

# Difference between dates
d1 = datetime(2025, 6, 15)
d2 = datetime(2025, 12, 31)
diff = d2 - d1
print("Days between:", diff.days)
print("Total seconds:", diff.total_seconds())

# Comparing dates
print("d1 < d2:", d1 < d2)
print("Same date:", d1 == d2)`,
    codeOutput: [
      "Delta: 7 days, 3:00:00",
      "Today: 2025-06-15",
      "Next week: 2025-06-22",
      "30 days ago: 2025-05-16",
      "Days between: 199",
      "Total seconds: 17193600.0",
      "d1 < d2: True",
      "Same date: False",
    ],
  },
};

const order: TopicKey[] = ["date-time", "formatting", "parsing", "arithmetic"];

const chipColors: Record<TopicKey, string> = {
  "date-time": "bg-blue-500/15 border-blue-500/30 text-blue-400",
  formatting: "bg-emerald-500/15 border-emerald-500/30 text-emerald-400",
  parsing: "bg-violet-500/15 border-violet-500/30 text-violet-400",
  arithmetic: "bg-orange-500/15 border-orange-500/30 text-orange-400",
};

// ─── Main export ──────────────────────────────────────────────────────────────
export function DatetimeModuleVisualization() {
  const [selected, setSelected] = useState<TopicKey>("date-time");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const topic = topics[selected];

  const handleSelect = (key: TopicKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Python datetime Module</CardTitle>
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
