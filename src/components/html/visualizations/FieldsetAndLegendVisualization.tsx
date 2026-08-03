"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function FieldsetAndLegendVisualization() {
  const [shippingEnabled, setShippingEnabled] = useState(false);

  return (
    <div className="space-y-6">
      {/* Anatomy */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Fieldset &amp; Legend Anatomy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-xl border bg-zinc-950 p-4 font-mono text-xs space-y-0.5">
            <div>
              <span className="text-orange-400">&lt;fieldset&gt;</span>
              <span className="text-zinc-500 ml-2">← Groups related controls</span>
            </div>
            <div className="pl-4">
              <span className="text-purple-400">&lt;legend&gt;</span>
              <span className="text-emerald-400">Payment Method</span>
              <span className="text-purple-400">&lt;/legend&gt;</span>
              <span className="text-zinc-500 ml-2">← Caption embedded in border</span>
            </div>
            <div className="pl-4 text-zinc-300">&lt;label&gt;&lt;input type=&quot;radio&quot;&gt; Credit Card&lt;/label&gt;</div>
            <div className="pl-4 text-zinc-300">&lt;label&gt;&lt;input type=&quot;radio&quot;&gt; PayPal&lt;/label&gt;</div>
            <div>
              <span className="text-red-400">&lt;/fieldset&gt;</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Without fieldset */}
            <div className="rounded-xl border p-4 space-y-2">
              <Badge variant="destructive" className="text-[10px]">Without Fieldset</Badge>
              <p className="text-[10px] text-muted-foreground">Screen reader announces:</p>
              <div className="space-y-1 text-xs bg-muted/50 rounded-lg p-2">
                <p>&quot;Credit Card, radio button&quot;</p>
                <p>&quot;PayPal, radio button&quot;</p>
                <p className="text-red-400 italic">No context — user doesn&apos;t know what they&apos;re choosing!</p>
              </div>
            </div>

            {/* With fieldset */}
            <div className="rounded-xl border p-4 space-y-2">
              <Badge className="text-[10px] bg-emerald-500">With Fieldset + Legend</Badge>
              <p className="text-[10px] text-muted-foreground">Screen reader announces:</p>
              <div className="space-y-1 text-xs bg-muted/50 rounded-lg p-2">
                <p className="text-emerald-500 font-semibold">&quot;Payment Method, group&quot;</p>
                <p>&quot;Credit Card, radio button&quot;</p>
                <p>&quot;PayPal, radio button&quot;</p>
                <p className="text-emerald-500 italic">User understands the context!</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive disabled demo */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Disabled Fieldset Demo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Toggle the checkbox to enable/disable the shipping fieldset.
            Notice how ALL inputs inside become disabled at once.
          </p>

          <div className="rounded-xl border p-4 bg-white dark:bg-zinc-900 space-y-4">
            {/* Toggle */}
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={shippingEnabled}
                onChange={(e) => setShippingEnabled(e.target.checked)}
              />
              <span className="font-semibold">Ship to different address</span>
            </label>

            {/* Fieldset that toggles */}
            <motion.fieldset
              disabled={!shippingEnabled}
              animate={{ opacity: shippingEnabled ? 1 : 0.4 }}
              transition={{ duration: 0.3 }}
              className="border rounded-lg p-4 space-y-3"
            >
              <legend className="px-2 text-sm font-semibold">
                Shipping Address
                {!shippingEnabled && (
                  <Badge variant="secondary" className="ml-2 text-[9px]">Disabled</Badge>
                )}
              </legend>
              <div>
                <label className="text-xs text-muted-foreground" htmlFor="ship-street">Street:</label>
                <input
                  type="text"
                  id="ship-street"
                  className="w-full px-3 py-1.5 border rounded-lg text-sm mt-0.5 bg-background"
                  placeholder="123 Main St"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground" htmlFor="ship-city">City:</label>
                  <input
                    type="text"
                    id="ship-city"
                    className="w-full px-3 py-1.5 border rounded-lg text-sm mt-0.5 bg-background"
                    placeholder="New York"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground" htmlFor="ship-zip">ZIP:</label>
                  <input
                    type="text"
                    id="ship-zip"
                    className="w-full px-3 py-1.5 border rounded-lg text-sm mt-0.5 bg-background"
                    placeholder="10001"
                  />
                </div>
              </div>
            </motion.fieldset>

            <p className="text-[10px] text-muted-foreground">
              {shippingEnabled
                ? "All inputs are now enabled — you can interact with them."
                : "All inputs are disabled by the fieldset's disabled attribute — one attribute controls everything."}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
