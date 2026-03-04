"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type ControlType = "select" | "radio" | "checkbox";

interface ControlInfo {
  id: ControlType;
  label: string;
  tag: string;
  selection: string;
  submitted: string;
  bestFor: string;
}

const controls: ControlInfo[] = [
  {
    id: "select",
    label: "Select (Dropdown)",
    tag: "<select> + <option>",
    selection: "One (or multiple with multiple attribute)",
    submitted: "Value of selected option(s)",
    bestFor: "6+ options, saves space",
  },
  {
    id: "radio",
    label: "Radio Buttons",
    tag: '<input type="radio">',
    selection: "Exactly ONE (mutually exclusive)",
    submitted: "Value of selected radio only",
    bestFor: "2-5 mutually exclusive choices",
  },
  {
    id: "checkbox",
    label: "Checkboxes",
    tag: '<input type="checkbox">',
    selection: "ZERO or MORE (independent)",
    submitted: "Values of checked boxes; unchecked = NOT sent",
    bestFor: "Multiple independent toggles",
  },
];

export function SelectRadioCheckboxVisualization() {
  const [activeControl, setActiveControl] = useState<ControlType>("select");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedSize, setSelectedSize] = useState("m");
  const [selectedToppings, setSelectedToppings] = useState<Set<string>>(new Set(["cheese"]));

  const toggleTopping = (t: string) => {
    setSelectedToppings((prev) => {
      const next = new Set(prev);
      if (next.has(t)) next.delete(t);
      else next.add(t);
      return next;
    });
  };

  const info = controls.find((c) => c.id === activeControl)!;

  // Build submitted data preview
  const getSubmittedData = () => {
    if (activeControl === "select") {
      return selectedCountry ? `country=${selectedCountry}` : "(nothing selected)";
    }
    if (activeControl === "radio") {
      return `size=${selectedSize}`;
    }
    if (selectedToppings.size === 0) return "(nothing checked — field omitted!)";
    return Array.from(selectedToppings).map((t) => `toppings=${t}`).join("&");
  };

  return (
    <div className="space-y-6">
      {/* Control type selector */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Selection Controls Comparison</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            {controls.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveControl(c.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeControl === c.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <motion.div
            key={activeControl}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Info */}
            <div className="rounded-xl border p-4 space-y-2 text-xs">
              <code className="text-primary font-bold">{info.tag}</code>
              <div className="space-y-1.5">
                <div><span className="text-muted-foreground">Selection: </span>{info.selection}</div>
                <div><span className="text-muted-foreground">Submitted: </span>{info.submitted}</div>
                <div><span className="text-muted-foreground">Best for: </span>{info.bestFor}</div>
              </div>
            </div>

            {/* Live demo */}
            <div className="rounded-xl border p-4 bg-white dark:bg-zinc-900 space-y-3">
              <p className="text-xs font-semibold">Try it:</p>

              {activeControl === "select" && (
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-sm bg-background"
                >
                  <option value="">-- Choose Country --</option>
                  <option value="us">United States</option>
                  <option value="uk">United Kingdom</option>
                  <option value="in">India</option>
                  <option value="jp">Japan</option>
                  <option value="de">Germany</option>
                </select>
              )}

              {activeControl === "radio" && (
                <div className="space-y-1.5">
                  <p className="text-xs text-muted-foreground">T-shirt size:</p>
                  {["s", "m", "l", "xl"].map((size) => (
                    <label key={size} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="radio"
                        name="demo-size"
                        value={size}
                        checked={selectedSize === size}
                        onChange={() => setSelectedSize(size)}
                      />
                      {size.toUpperCase()}
                    </label>
                  ))}
                </div>
              )}

              {activeControl === "checkbox" && (
                <div className="space-y-1.5">
                  <p className="text-xs text-muted-foreground">Pizza toppings:</p>
                  {["cheese", "pepperoni", "mushrooms", "olives"].map((t) => (
                    <label key={t} className="flex items-center gap-2 text-sm cursor-pointer capitalize">
                      <input
                        type="checkbox"
                        checked={selectedToppings.has(t)}
                        onChange={() => toggleTopping(t)}
                      />
                      {t}
                    </label>
                  ))}
                </div>
              )}

              {/* Submitted data preview */}
              <div className="rounded-lg bg-zinc-950 p-2.5 font-mono text-[10px]">
                <span className="text-zinc-500">Submitted: </span>
                <span className="text-emerald-400">{getSubmittedData()}</span>
              </div>
            </div>
          </motion.div>
        </CardContent>
      </Card>

      {/* Quick comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">When to Use Which?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Scenario</th>
                  <th className="text-left p-2">Control</th>
                  <th className="text-left p-2">Why</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { scenario: "Country selection (200+ options)", control: "Select", why: "Saves screen space" },
                  { scenario: "Payment method (3 options)", control: "Radio", why: "All options visible" },
                  { scenario: "Newsletter preferences", control: "Checkbox", why: "Multiple can be toggled" },
                  { scenario: "Terms agreement", control: "Checkbox", why: "Single boolean toggle" },
                  { scenario: "Priority level (Low/Med/High)", control: "Radio", why: "Mutually exclusive, few options" },
                ].map((row) => (
                  <tr key={row.scenario} className="border-b last:border-0">
                    <td className="p-2">{row.scenario}</td>
                    <td className="p-2"><Badge variant="outline" className="text-[9px]">{row.control}</Badge></td>
                    <td className="p-2 text-muted-foreground">{row.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
