"use client";

import { motion } from "framer-motion";
import { ArrayVisualization } from "./visualizations/ArrayVisualization";
import { StringVisualization } from "./visualizations/StringVisualization";
import { LoopsVisualization } from "./visualizations/LoopsVisualization";
import { ObjectsVisualization } from "./visualizations/ObjectsVisualization";
import { MapVisualization } from "./visualizations/MapVisualization";
import { SetVisualization } from "./visualizations/SetVisualization";
import { VariablesVisualization } from "./visualizations/VariablesVisualization";
import { OperatorsVisualization } from "./visualizations/OperatorsVisualization";
import { FunctionsVisualization } from "./visualizations/FunctionsVisualization";
import { ComplexityVisualization } from "./visualizations/ComplexityVisualization";
import { LinearSearchVisualization } from "./visualizations/LinearSearchVisualization";
import { BinarySearchVisualization } from "./visualizations/BinarySearchVisualization";
import { BubbleSortVisualization } from "./visualizations/BubbleSortVisualization";
import { SelectionSortVisualization } from "./visualizations/SelectionSortVisualization";
import { InsertionSortVisualization } from "./visualizations/InsertionSortVisualization";
import { MergeSortVisualization } from "./visualizations/MergeSortVisualization";
import { QuickSortVisualization } from "./visualizations/QuickSortVisualization";
import { ObjectsVsMapVisualization } from "./visualizations/ObjectsVsMapVisualization";
import { WeakMapVisualization } from "./visualizations/WeakMapVisualization";
import { LinkedListVisualization } from "./visualizations/LinkedListVisualization";
import { MiddleOfLinkedListVisualization } from "./visualizations/MiddleOfLinkedListVisualization";
import { LinkedListCycleVisualization } from "./visualizations/LinkedListCycleVisualization";
import { StackArrayVisualization } from "./visualizations/StackArrayVisualization";
import { StackLinkedListVisualization } from "./visualizations/StackLinkedListVisualization";
import { Card, CardContent } from "@/components/ui/card";

interface VisualizationSectionProps {
  topicSlug: string;
}

const visualizationMap: Record<string, React.ComponentType> = {
  "variables-and-data-types": VariablesVisualization,
  operators: OperatorsVisualization,
  loops: LoopsVisualization,
  functions: FunctionsVisualization,
  arrays: ArrayVisualization,
  strings: StringVisualization,
  objects: ObjectsVisualization,
  map: MapVisualization,
  set: SetVisualization,
  "time-complexity": ComplexityVisualization,
  "linear-search": LinearSearchVisualization,
  "binary-search": BinarySearchVisualization,
  "bubble-sort": BubbleSortVisualization,
  "selection-sort": SelectionSortVisualization,
  "insertion-sort": InsertionSortVisualization,
  "merge-sort": MergeSortVisualization,
  "quick-sort": QuickSortVisualization,
  "objects-vs-map": ObjectsVsMapVisualization,
  "weakmap": WeakMapVisualization,
  "linked-list": LinkedListVisualization,
  "middle-linked-list": MiddleOfLinkedListVisualization,
  "linked-list-cycle": LinkedListCycleVisualization,
  "stack-array": StackArrayVisualization,
  "stack-linked-list": StackLinkedListVisualization,
};

export function VisualizationSection({ topicSlug }: VisualizationSectionProps) {
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
              Visualization coming soon for this topic.
            </p>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
}
