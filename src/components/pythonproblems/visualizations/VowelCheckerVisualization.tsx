"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const VOWELS = new Set("aeiouAEIOU");

export function VowelCheckerVisualization() {
  const [word, setWord] = useState("Python");
  const [checked, setChecked] = useState(false);

  const chars = word.split("");
  const vowelsFound = chars.filter((c) => VOWELS.has(c));
  const unique = Array.from(new Set(vowelsFound));

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Vowel Checker</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <pre className="rounded-xl border bg-muted/40 px-4 py-3 text-xs font-mono whitespace-pre overflow-x-auto">
{`word = input("Enter a word: ")
vowels = "aeiouAEIOU"
found = [c for c in word if c in vowels]
if found:
    print("Vowels found:", ', '.join(set(found)))
else:
    print("No vowels found.")`}
        </pre>

        <div className="flex flex-wrap items-end gap-3">
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">Enter a word</p>
            <input value={word} onChange={(e) => { setWord(e.target.value); setChecked(false); }}
              placeholder="e.g. Python"
              className="rounded-lg border-2 border-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 px-3 py-1.5 text-sm font-mono outline-none w-40" />
          </div>
          <button onClick={() => setChecked(true)}
            className="px-4 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
            Check
          </button>
        </div>

        {/* Character grid */}
        {word && (
          <div className="space-y-3">
            <p className="text-xs font-semibold text-muted-foreground">Character-by-character scan</p>
            <div className="flex flex-wrap gap-1.5">
              {chars.map((c, i) => {
                const isVowel = VOWELS.has(c);
                return (
                  <motion.div key={`${c}-${i}`} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className={`w-10 h-10 rounded-lg flex flex-col items-center justify-center border-2 text-sm font-mono font-bold ${
                      isVowel
                        ? "border-emerald-400 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300"
                        : "border-muted bg-muted/30 text-muted-foreground"
                    }`}>
                    {c}
                    {isVowel && <span className="text-[8px] text-emerald-500">vowel</span>}
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Result */}
        <AnimatePresence>
          {checked && word && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className={`rounded-xl border-2 px-4 py-3 ${
                vowelsFound.length > 0
                  ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/30"
                  : "border-red-400 bg-red-50 dark:bg-red-950/30"
              }`}>
              {vowelsFound.length > 0 ? (
                <>
                  <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300 mb-1">
                    ✓ &quot;{word}&quot; contains vowels!
                  </p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400">
                    Unique vowels: <span className="font-bold">{unique.join(", ")}</span>
                    {" · "}Total count: <span className="font-bold">{vowelsFound.length}</span>
                  </p>
                </>
              ) : (
                <p className="text-sm font-semibold text-red-700 dark:text-red-300">
                  ✗ &quot;{word}&quot; contains no vowels.
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-wrap gap-1.5">
          {["Python", "Rhythm", "Hello", "Sky", "Beautiful", "xyz"].map((w) => (
            <button key={w} onClick={() => { setWord(w); setChecked(true); }}
              className="px-2 py-1 rounded-md bg-muted text-xs font-mono hover:bg-muted/70 transition-colors">
              {w}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
