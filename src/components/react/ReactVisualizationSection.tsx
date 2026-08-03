"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { PropsStateVisualization } from "./visualizations/PropsStateVisualization";
import { ComponentsVisualization } from "./visualizations/ComponentsVisualization";
import { PropsVisualization } from "./visualizations/PropsVisualization";
import { StateVisualization } from "./visualizations/StateVisualization";
import { EventsVisualization } from "./visualizations/EventsVisualization";
import { ConditionalRenderingVisualization } from "./visualizations/ConditionalRenderingVisualization";
import { ListsKeysVisualization } from "./visualizations/ListsKeysVisualization";
import { FormsRefsVisualization } from "./visualizations/FormsRefsVisualization";
import { UseEffectVisualization } from "./visualizations/UseEffectVisualization";
import { UseRefContextVisualization } from "./visualizations/UseRefContextVisualization";
import { CustomHooksVisualization } from "./visualizations/CustomHooksVisualization";
import { MemoVisualization } from "./visualizations/MemoVisualization";
import { RoutingVisualization } from "./visualizations/RoutingVisualization";
import { ApiCallsVisualization } from "./visualizations/ApiCallsVisualization";
import { StateManagementVisualization } from "./visualizations/StateManagementVisualization";
import { AdvancedReactVisualization } from "./visualizations/AdvancedReactVisualization";

interface ReactVisualizationSectionProps {
  readonly topicSlug: string;
}

const visualizationMap: Record<string, React.ComponentType> = {
  "react-introduction": PropsStateVisualization,
  "react-components": ComponentsVisualization,
  "react-props": PropsVisualization,
  "react-state": StateVisualization,
  "react-events": EventsVisualization,
  "react-conditional-rendering": ConditionalRenderingVisualization,
  "react-lists-keys": ListsKeysVisualization,
  "react-forms": FormsRefsVisualization,
  "react-useeffect": UseEffectVisualization,
  "react-usecontext": UseRefContextVisualization,
  "react-custom-hooks": CustomHooksVisualization,
  "react-usememo": MemoVisualization,
  "react-usecallback": MemoVisualization,
  "react-memo": MemoVisualization,
  "react-routing": RoutingVisualization,
  "react-api-calls": ApiCallsVisualization,
  "react-state-management": StateManagementVisualization,
  "react-advanced": AdvancedReactVisualization,
};

export function ReactVisualizationSection({ topicSlug }: ReactVisualizationSectionProps) {
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
