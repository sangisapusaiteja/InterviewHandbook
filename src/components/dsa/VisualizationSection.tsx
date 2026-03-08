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
import { QueueArrayVisualization } from "./visualizations/QueueArrayVisualization";
import { QueueLinkedListVisualization } from "./visualizations/QueueLinkedListVisualization";
import { CircularQueueVisualization } from "./visualizations/CircularQueueVisualization";
import { QueueUsingStackVisualization } from "./visualizations/QueueUsingStackVisualization";
import { BinaryTreeBasicsVisualization } from "./visualizations/BinaryTreeBasicsVisualization";
import { TreeTraversalsVisualization } from "./visualizations/TreeTraversalsVisualization";
import { BinarySearchTreeVisualization } from "./visualizations/BinarySearchTreeVisualization";
import { DiameterBinaryTreeVisualization } from "./visualizations/DiameterBinaryTreeVisualization";
import { LowestCommonAncestorVisualization } from "./visualizations/LowestCommonAncestorVisualization";
import { MaximumPathSumVisualization } from "./visualizations/MaximumPathSumVisualization";
import { GraphRepresentationVisualization } from "./visualizations/GraphRepresentationVisualization";
import { GraphDFSVisualization } from "./visualizations/GraphDFSVisualization";
import { GraphBFSVisualization } from "./visualizations/GraphBFSVisualization";
import { CycleDetectionVisualization } from "./visualizations/CycleDetectionVisualization";
import { TopologicalSortVisualization } from "./visualizations/TopologicalSortVisualization";
import { DijkstraVisualization } from "./visualizations/DijkstraVisualization";
import { FindLargestElementVisualization } from "./visualizations/FindLargestElementVisualization";
import { RemoveElementVisualization } from "./visualizations/RemoveElementVisualization";
import { BuyAndSellStockVisualization } from "./visualizations/BuyAndSellStockVisualization";
import { SquaresOfSortedArrayVisualization } from "./visualizations/SquaresOfSortedArrayVisualization";
import { RemoveDuplicatesSortedArrayVisualization } from "./visualizations/RemoveDuplicatesSortedArrayVisualization";
import { SortColorsVisualization } from "./visualizations/SortColorsVisualization";
import { RunningSumVisualization } from "./visualizations/RunningSumVisualization";
import { FindPivotIndexVisualization } from "./visualizations/FindPivotIndexVisualization";
import { SubarraySumEqualsKVisualization } from "./visualizations/SubarraySumEqualsKVisualization";
import { ContainsDuplicateVisualization } from "./visualizations/ContainsDuplicateVisualization";
import { MissingNumberVisualization } from "./visualizations/MissingNumberVisualization";
import { MergeIntervalsVisualization } from "./visualizations/MergeIntervalsVisualization";
import { MaximumAverageSubarrayVisualization } from "./visualizations/MaximumAverageSubarrayVisualization";
import { MoveZeroesVisualization } from "./visualizations/MoveZeroesVisualization";
import { LongestConsecutiveSequenceVisualization } from "./visualizations/LongestConsecutiveSequenceVisualization";
import { TwoSumVisualization } from "./visualizations/TwoSumVisualization";
import { FindDisappearedNumbersVisualization } from "./visualizations/FindDisappearedNumbersVisualization";
import { ContainerWithMostWaterVisualization } from "./visualizations/ContainerWithMostWaterVisualization";
import { FloodFillVisualization } from "./visualizations/FloodFillVisualization";
import { IslandPerimeterVisualization } from "./visualizations/IslandPerimeterVisualization";
import { SpiralMatrixVisualization } from "./visualizations/SpiralMatrixVisualization";
import { CanPlaceFlowersVisualization } from "./visualizations/CanPlaceFlowersVisualization";
import { MajorityElementVisualization } from "./visualizations/MajorityElementVisualization";
import { ThreeSumVisualization } from "./visualizations/ThreeSumVisualization";
import { Card, CardContent } from "@/components/ui/card";

interface VisualizationSectionProps {
  readonly topicSlug: string;
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
  "queue-array": QueueArrayVisualization,
  "queue-linked-list": QueueLinkedListVisualization,
  "circular-queue": CircularQueueVisualization,
  "queue-using-stack": QueueUsingStackVisualization,
  "binary-tree-basics":        BinaryTreeBasicsVisualization,
  "tree-traversals":           TreeTraversalsVisualization,
  "binary-search-tree":        BinarySearchTreeVisualization,
  "diameter-binary-tree":      DiameterBinaryTreeVisualization,
  "lowest-common-ancestor":    LowestCommonAncestorVisualization,
  "maximum-path-sum":          MaximumPathSumVisualization,
  "graph-representation":      GraphRepresentationVisualization,
  "graph-dfs":                 GraphDFSVisualization,
  "graph-bfs":                 GraphBFSVisualization,
  "cycle-detection":           CycleDetectionVisualization,
  "topological-sort":          TopologicalSortVisualization,
  "dijkstra":                  DijkstraVisualization,
  "find-largest-element":       FindLargestElementVisualization,
  "remove-element":             RemoveElementVisualization,
  "best-time-to-buy-sell-stock": BuyAndSellStockVisualization,
  "squares-of-sorted-array":     SquaresOfSortedArrayVisualization,
  "remove-duplicates-sorted-array": RemoveDuplicatesSortedArrayVisualization,
  "sort-colors":                 SortColorsVisualization,
  "running-sum":                 RunningSumVisualization,
  "find-pivot-index":            FindPivotIndexVisualization,
  "subarray-sum-equals-k":       SubarraySumEqualsKVisualization,
  "contains-duplicate":          ContainsDuplicateVisualization,
  "missing-number":              MissingNumberVisualization,
  "merge-intervals":             MergeIntervalsVisualization,
  "maximum-average-subarray":    MaximumAverageSubarrayVisualization,
  "move-zeroes":                 MoveZeroesVisualization,
  "longest-consecutive-sequence": LongestConsecutiveSequenceVisualization,
  "two-sum":                     TwoSumVisualization,
  "find-disappeared-numbers":    FindDisappearedNumbersVisualization,
  "container-with-most-water":   ContainerWithMostWaterVisualization,
  "flood-fill":                  FloodFillVisualization,
  "island-perimeter":            IslandPerimeterVisualization,
  "spiral-matrix":               SpiralMatrixVisualization,
  "can-place-flowers":           CanPlaceFlowersVisualization,
  "majority-element":            MajorityElementVisualization,
  "three-sum":                   ThreeSumVisualization,
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
