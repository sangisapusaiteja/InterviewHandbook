"use client";

import { motion } from "framer-motion";
import { SumAverageVisualization } from "./visualizations/SumAverageVisualization";
import { ForLoopSequenceVisualization } from "./visualizations/ForLoopSequenceVisualization";
import { NegativeNumbersVisualization } from "./visualizations/NegativeNumbersVisualization";
import { PrintNameVisualization } from "./visualizations/PrintNameVisualization";
import { EvenOddVisualization } from "./visualizations/EvenOddVisualization";
import { Card, CardContent } from "@/components/ui/card";

interface PythonProblemsVisualizationSectionProps {
  readonly topicSlug: string;
}

const visualizationMap: Record<string, React.ComponentType> = {
  "sum-and-average": SumAverageVisualization,
  "for-loop-sequence": ForLoopSequenceVisualization,
  "negative-numbers-loop": NegativeNumbersVisualization,
  "print-name-loop": PrintNameVisualization,
  "even-odd-checker": EvenOddVisualization,
};

export function PythonProblemsVisualizationSection({
  topicSlug,
}: PythonProblemsVisualizationSectionProps) {
  const VisualizationComponent = visualizationMap[topicSlug];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {VisualizationComponent ? (
        <VisualizationComponent />
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">
              Visualization coming soon for this problem.
            </p>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
}
