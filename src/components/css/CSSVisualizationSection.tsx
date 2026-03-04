"use client";

import { motion } from "framer-motion";
import { WhatIsCSSVisualization } from "./visualizations/WhatIsCSSVisualization";
import { CSSSyntaxVisualization } from "./visualizations/CSSSyntaxVisualization";
import { SelectorsBasicsVisualization } from "./visualizations/SelectorsBasicsVisualization";
import { CSSColorsVisualization } from "./visualizations/CSSColorsVisualization";
import { CSSUnitsVisualization } from "./visualizations/CSSUnitsVisualization";
import { CSSCommentsVisualization } from "./visualizations/CSSCommentsVisualization";
import { BoxModelVisualization } from "./visualizations/BoxModelVisualization";
import { CSSMarginVisualization } from "./visualizations/CSSMarginVisualization";
import { CSSPaddingVisualization } from "./visualizations/CSSPaddingVisualization";
import { CSSBorderVisualization } from "./visualizations/CSSBorderVisualization";
// Level 2 — CSS Selectors and Specificity
import { ClassSelectorVisualization } from "./visualizations/ClassSelectorVisualization";
import { IDSelectorVisualization } from "./visualizations/IDSelectorVisualization";
import { AttributeSelectorsVisualization } from "./visualizations/AttributeSelectorsVisualization";
import { GroupSelectorsVisualization } from "./visualizations/GroupSelectorsVisualization";
import { DescendantSelectorVisualization } from "./visualizations/DescendantSelectorVisualization";
import { ChildSelectorVisualization } from "./visualizations/ChildSelectorVisualization";
import { PseudoClassesVisualization } from "./visualizations/PseudoClassesVisualization";
import { PseudoElementsVisualization } from "./visualizations/PseudoElementsVisualization";
import { SpecificityVisualization } from "./visualizations/SpecificityVisualization";
import { ImportantRuleVisualization } from "./visualizations/ImportantRuleVisualization";
// Level 3 — Layout Basics
import { DisplayPropertyVisualization } from "./visualizations/DisplayPropertyVisualization";
import { BlockInlineVisualization } from "./visualizations/BlockInlineVisualization";
import { PositionPropertyVisualization } from "./visualizations/PositionPropertyVisualization";
import { RelativeAbsoluteVisualization } from "./visualizations/RelativeAbsoluteVisualization";
import { FixedStickyVisualization } from "./visualizations/FixedStickyVisualization";
import { ZIndexVisualization } from "./visualizations/ZIndexVisualization";
import { OverflowVisualization } from "./visualizations/OverflowVisualization";
import { FloatClearVisualization } from "./visualizations/FloatClearVisualization";
// Level 4 — Flexbox
import { FlexboxIntroVisualization } from "./visualizations/FlexboxIntroVisualization";
import { FlexContainerVisualization } from "./visualizations/FlexContainerVisualization";
import { FlexDirectionVisualization } from "./visualizations/FlexDirectionVisualization";
import { JustifyContentVisualization } from "./visualizations/JustifyContentVisualization";
import { AlignItemsVisualization } from "./visualizations/AlignItemsVisualization";
import { AlignContentVisualization } from "./visualizations/AlignContentVisualization";
import { FlexWrapVisualization } from "./visualizations/FlexWrapVisualization";
import { FlexGrowShrinkVisualization } from "./visualizations/FlexGrowShrinkVisualization";
import { FlexboxPatternsVisualization } from "./visualizations/FlexboxPatternsVisualization";
// Level 5 — CSS Grid
import { GridIntroVisualization } from "./visualizations/GridIntroVisualization";
import { GridContainerVisualization } from "./visualizations/GridContainerVisualization";
import { GridTemplateColumnsVisualization } from "./visualizations/GridTemplateColumnsVisualization";
import { GridTemplateRowsVisualization } from "./visualizations/GridTemplateRowsVisualization";
import { GridGapVisualization } from "./visualizations/GridGapVisualization";
import { GridAreasVisualization } from "./visualizations/GridAreasVisualization";
import { GridVsFlexboxVisualization } from "./visualizations/GridVsFlexboxVisualization";
import { GridPatternsVisualization } from "./visualizations/GridPatternsVisualization";
// Level 6 — Responsive Design
import { ResponsiveBasicsVisualization } from "./visualizations/ResponsiveBasicsVisualization";
import { MediaQueriesVisualization } from "./visualizations/MediaQueriesVisualization";
import { MobileFirstVisualization } from "./visualizations/MobileFirstVisualization";
import { BreakpointsVisualization } from "./visualizations/BreakpointsVisualization";
import { ResponsiveImagesVisualization } from "./visualizations/ResponsiveImagesVisualization";
import { FluidLayoutsVisualization } from "./visualizations/FluidLayoutsVisualization";
import { ContainerQueriesVisualization } from "./visualizations/ContainerQueriesVisualization";
// Level 7 — CSS Animations and Transitions
import { CSSTransitionsVisualization } from "./visualizations/CSSTransitionsVisualization";
import { TransitionPropertiesVisualization } from "./visualizations/TransitionPropertiesVisualization";
import { CSSTransformVisualization } from "./visualizations/CSSTransformVisualization";
import { TranslateVisualization } from "./visualizations/TranslateVisualization";
import { RotateVisualization } from "./visualizations/RotateVisualization";
import { ScaleVisualization } from "./visualizations/ScaleVisualization";
import { CSSAnimationsVisualization } from "./visualizations/CSSAnimationsVisualization";
import { KeyframesVisualization } from "./visualizations/KeyframesVisualization";
// Level 8 — Advanced CSS
import { CSSVariablesVisualization } from "./visualizations/CSSVariablesVisualization";
import { CalcFunctionVisualization } from "./visualizations/CalcFunctionVisualization";
import { ClampFunctionVisualization } from "./visualizations/ClampFunctionVisualization";
import { CSSFunctionsVisualization } from "./visualizations/CSSFunctionsVisualization";
import { BackdropFilterVisualization } from "./visualizations/BackdropFilterVisualization";
import { ObjectFitVisualization } from "./visualizations/ObjectFitVisualization";
import { AspectRatioVisualization } from "./visualizations/AspectRatioVisualization";
import { ModernCSSVisualization } from "./visualizations/ModernCSSVisualization";
import { Card, CardContent } from "@/components/ui/card";

interface CSSVisualizationSectionProps {
  readonly topicSlug: string;
}

const visualizationMap: Record<string, React.ComponentType> = {
  // Level 1 — CSS Fundamentals
  "what-is-css": WhatIsCSSVisualization,
  "css-syntax": CSSSyntaxVisualization,
  "css-selectors-basics": SelectorsBasicsVisualization,
  "css-colors": CSSColorsVisualization,
  "css-units": CSSUnitsVisualization,
  "css-comments": CSSCommentsVisualization,
  "css-box-model": BoxModelVisualization,
  "css-margin": CSSMarginVisualization,
  "css-padding": CSSPaddingVisualization,
  "css-border": CSSBorderVisualization,
  // Level 2 — CSS Selectors and Specificity
  "css-class-selector": ClassSelectorVisualization,
  "css-id-selector": IDSelectorVisualization,
  "css-attribute-selectors": AttributeSelectorsVisualization,
  "css-group-selectors": GroupSelectorsVisualization,
  "css-descendant-selector": DescendantSelectorVisualization,
  "css-child-selector": ChildSelectorVisualization,
  "css-pseudo-classes": PseudoClassesVisualization,
  "css-pseudo-elements": PseudoElementsVisualization,
  "css-specificity": SpecificityVisualization,
  "css-important-rule": ImportantRuleVisualization,
  // Level 3 — Layout Basics
  "css-display-property": DisplayPropertyVisualization,
  "css-block-inline": BlockInlineVisualization,
  "css-position-property": PositionPropertyVisualization,
  "css-relative-absolute": RelativeAbsoluteVisualization,
  "css-fixed-sticky": FixedStickyVisualization,
  "css-z-index": ZIndexVisualization,
  "css-overflow": OverflowVisualization,
  "css-float-clear": FloatClearVisualization,
  // Level 4 — Flexbox
  "css-flexbox-intro": FlexboxIntroVisualization,
  "css-flex-container": FlexContainerVisualization,
  "css-flex-direction": FlexDirectionVisualization,
  "css-justify-content": JustifyContentVisualization,
  "css-align-items": AlignItemsVisualization,
  "css-align-content": AlignContentVisualization,
  "css-flex-wrap": FlexWrapVisualization,
  "css-flex-grow-shrink": FlexGrowShrinkVisualization,
  "css-flexbox-patterns": FlexboxPatternsVisualization,
  // Level 5 — CSS Grid
  "css-grid-intro": GridIntroVisualization,
  "css-grid-container": GridContainerVisualization,
  "css-grid-template-columns": GridTemplateColumnsVisualization,
  "css-grid-template-rows": GridTemplateRowsVisualization,
  "css-grid-gap": GridGapVisualization,
  "css-grid-areas": GridAreasVisualization,
  "css-grid-vs-flexbox": GridVsFlexboxVisualization,
  "css-grid-patterns": GridPatternsVisualization,
  // Level 6 — Responsive Design
  "css-responsive-basics": ResponsiveBasicsVisualization,
  "css-media-queries": MediaQueriesVisualization,
  "css-mobile-first": MobileFirstVisualization,
  "css-breakpoints": BreakpointsVisualization,
  "css-responsive-images": ResponsiveImagesVisualization,
  "css-fluid-layouts": FluidLayoutsVisualization,
  "css-container-queries": ContainerQueriesVisualization,
  // Level 7 — CSS Animations and Transitions
  "css-transitions": CSSTransitionsVisualization,
  "css-transition-properties": TransitionPropertiesVisualization,
  "css-transform": CSSTransformVisualization,
  "css-translate": TranslateVisualization,
  "css-rotate": RotateVisualization,
  "css-scale": ScaleVisualization,
  "css-animations": CSSAnimationsVisualization,
  "css-keyframes": KeyframesVisualization,
  // Level 8 — Advanced CSS
  "css-variables": CSSVariablesVisualization,
  "css-calc-function": CalcFunctionVisualization,
  "css-clamp-function": ClampFunctionVisualization,
  "css-functions": CSSFunctionsVisualization,
  "css-backdrop-filter": BackdropFilterVisualization,
  "css-object-fit": ObjectFitVisualization,
  "css-aspect-ratio": AspectRatioVisualization,
  "css-modern-features": ModernCSSVisualization,
};

export function CSSVisualizationSection({ topicSlug }: CSSVisualizationSectionProps) {
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
