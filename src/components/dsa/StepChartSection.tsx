"use client";

import { motion } from "framer-motion";
import {
  CanPlaceFlowersStepChart,
  ContainerWithMostWaterStepChart,
  ContainsDuplicateStepChart,
  FindDisappearedNumbersStepChart,
  FindPivotIndexStepChart,
  FloodFillStepChart,
  IslandPerimeterStepChart,
  LongestConsecutiveSequenceStepChart,
  MajorityElementBoyerMooreStepChart,
  MaximumAverageSubarrayStepChart,
  MergeIntervalsStepChart,
  MissingNumberStepChart,
  MoveZeroesStepChart,
  RemoveDuplicatesSortedArrayStepChart,
  RunningSumStepChart,
  SortColorsStepChart,
  SpiralMatrixStepChart,
  SquaresOfSortedArrayStepChart,
  SubarraySumEqualsKStepChart,
  ThreeSumStepChart,
  TwoSumStepChart,
} from "./stepcharts/AdditionalStepCharts";
import { BuyAndSellStockStepChart } from "./stepcharts/BuyAndSellStockStepChart";
import { FindLargestElementStepChart } from "./stepcharts/FindLargestElementStepChart";
import { RemoveElementStepChart } from "./stepcharts/RemoveElementStepChart";

interface StepChartSectionProps {
  readonly topicSlug: string;
}

const stepChartMap: Record<string, React.ComponentType> = {
  "find-largest-element": FindLargestElementStepChart,
  "remove-element": RemoveElementStepChart,
  "best-time-to-buy-sell-stock": BuyAndSellStockStepChart,
  "squares-of-sorted-array": SquaresOfSortedArrayStepChart,
  "remove-duplicates-sorted-array": RemoveDuplicatesSortedArrayStepChart,
  "sort-colors": SortColorsStepChart,
  "running-sum": RunningSumStepChart,
  "find-pivot-index": FindPivotIndexStepChart,
  "subarray-sum-equals-k": SubarraySumEqualsKStepChart,
  "contains-duplicate": ContainsDuplicateStepChart,
  "missing-number": MissingNumberStepChart,
  "merge-intervals": MergeIntervalsStepChart,
  "maximum-average-subarray": MaximumAverageSubarrayStepChart,
  "move-zeroes": MoveZeroesStepChart,
  "longest-consecutive-sequence": LongestConsecutiveSequenceStepChart,
  "two-sum": TwoSumStepChart,
  "find-disappeared-numbers": FindDisappearedNumbersStepChart,
  "container-with-most-water": ContainerWithMostWaterStepChart,
  "flood-fill": FloodFillStepChart,
  "island-perimeter": IslandPerimeterStepChart,
  "spiral-matrix": SpiralMatrixStepChart,
  "can-place-flowers": CanPlaceFlowersStepChart,
  "majority-element": MajorityElementBoyerMooreStepChart,
  "three-sum": ThreeSumStepChart,
};

export function StepChartSection({ topicSlug }: StepChartSectionProps) {
  const StepChartComponent = stepChartMap[topicSlug];

  if (!StepChartComponent) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <StepChartComponent />
    </motion.div>
  );
}
