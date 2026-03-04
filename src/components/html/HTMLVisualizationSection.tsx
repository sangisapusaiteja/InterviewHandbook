"use client";

import { motion } from "framer-motion";
import { HTMLIntroductionVisualization } from "./visualizations/HTMLIntroductionVisualization";
import { DocumentStructureVisualization } from "./visualizations/DocumentStructureVisualization";
import { ElementsAndTagsVisualization } from "./visualizations/ElementsAndTagsVisualization";
import { AttributesVisualization } from "./visualizations/AttributesVisualization";
import { HeadingsAndParagraphsVisualization } from "./visualizations/HeadingsAndParagraphsVisualization";
import { TextFormattingVisualization } from "./visualizations/TextFormattingVisualization";
import { LinksVisualization } from "./visualizations/LinksVisualization";
import { ImagesVisualization } from "./visualizations/ImagesVisualization";
import { ListsVisualization } from "./visualizations/ListsVisualization";
import { CommentsVisualization } from "./visualizations/CommentsVisualization";
import { DivVsSpanVisualization } from "./visualizations/DivVsSpanVisualization";
import { TablesVisualization } from "./visualizations/TablesVisualization";
import { FormsBasicsVisualization } from "./visualizations/FormsBasicsVisualization";
import { InputTypesVisualization } from "./visualizations/InputTypesVisualization";
import { ButtonsAndLabelsVisualization } from "./visualizations/ButtonsAndLabelsVisualization";
import { SelectRadioCheckboxVisualization } from "./visualizations/SelectRadioCheckboxVisualization";
import { FieldsetAndLegendVisualization } from "./visualizations/FieldsetAndLegendVisualization";
import { IframeVisualization } from "./visualizations/IframeVisualization";
import { SemanticOverviewVisualization } from "./visualizations/SemanticOverviewVisualization";
import { HeaderTagVisualization } from "./visualizations/HeaderTagVisualization";
import { NavTagVisualization } from "./visualizations/NavTagVisualization";
import { SectionTagVisualization } from "./visualizations/SectionTagVisualization";
import { ArticleTagVisualization } from "./visualizations/ArticleTagVisualization";
import { AsideTagVisualization } from "./visualizations/AsideTagVisualization";
import { FooterTagVisualization } from "./visualizations/FooterTagVisualization";
import { MainTagVisualization } from "./visualizations/MainTagVisualization";
import { FigureVisualization } from "./visualizations/FigureVisualization";
import { AudioVisualization } from "./visualizations/AudioVisualization";
import { VideoVisualization } from "./visualizations/VideoVisualization";
import { CanvasVisualization } from "./visualizations/CanvasVisualization";
import { SVGVisualization } from "./visualizations/SVGVisualization";
import { PictureElementVisualization } from "./visualizations/PictureElementVisualization";
import { SourceTagVisualization } from "./visualizations/SourceTagVisualization";
import { MetaTagsVisualization } from "./visualizations/MetaTagsVisualization";
import { ViewportMetaVisualization } from "./visualizations/ViewportMetaVisualization";
import { OpenGraphVisualization } from "./visualizations/OpenGraphVisualization";
import { FaviconVisualization } from "./visualizations/FaviconVisualization";
import { TitleSEOVisualization } from "./visualizations/TitleSEOVisualization";
import { RobotsMetaVisualization } from "./visualizations/RobotsMetaVisualization";
import { AccessibilityBasicsVisualization } from "./visualizations/AccessibilityBasicsVisualization";
import { ARIARolesVisualization } from "./visualizations/ARIARolesVisualization";
import { ARIALabelsVisualization } from "./visualizations/ARIALabelsVisualization";
import { AltTextVisualization } from "./visualizations/AltTextVisualization";
import { KeyboardNavigationVisualization } from "./visualizations/KeyboardNavigationVisualization";
import { LocalStorageVisualization } from "./visualizations/LocalStorageVisualization";
import { SessionStorageVisualization } from "./visualizations/SessionStorageVisualization";
import { GeolocationVisualization } from "./visualizations/GeolocationVisualization";
import { DragAndDropVisualization } from "./visualizations/DragAndDropVisualization";
import { WebWorkersVisualization } from "./visualizations/WebWorkersVisualization";
import { Card, CardContent } from "@/components/ui/card";

interface HTMLVisualizationSectionProps {
  readonly topicSlug: string;
}

const visualizationMap: Record<string, React.ComponentType> = {
  // Level 1 — HTML Basics
  "html-introduction": HTMLIntroductionVisualization,
  "html-document-structure": DocumentStructureVisualization,
  "html-elements-and-tags": ElementsAndTagsVisualization,
  "html-attributes": AttributesVisualization,
  "headings-and-paragraphs": HeadingsAndParagraphsVisualization,
  "text-formatting": TextFormattingVisualization,
  "html-links": LinksVisualization,
  "html-images": ImagesVisualization,
  "html-lists": ListsVisualization,
  "html-comments": CommentsVisualization,
  // Level 2 — Forms and Content Elements
  "div-vs-span": DivVsSpanVisualization,
  "html-tables": TablesVisualization,
  "html-forms-basics": FormsBasicsVisualization,
  "html-input-types": InputTypesVisualization,
  "buttons-and-labels": ButtonsAndLabelsVisualization,
  "select-radio-checkbox": SelectRadioCheckboxVisualization,
  "fieldset-and-legend": FieldsetAndLegendVisualization,
  "html-iframe": IframeVisualization,
  // Level 3 — Semantic HTML
  "semantic-html-overview": SemanticOverviewVisualization,
  "html-header-tag": HeaderTagVisualization,
  "html-nav-tag": NavTagVisualization,
  "html-section-tag": SectionTagVisualization,
  "html-article-tag": ArticleTagVisualization,
  "html-aside-tag": AsideTagVisualization,
  "html-footer-tag": FooterTagVisualization,
  "html-main-tag": MainTagVisualization,
  "html-figure-figcaption": FigureVisualization,
  // Level 4 — Media Elements
  "html-audio": AudioVisualization,
  "html-video": VideoVisualization,
  "html-canvas-basics": CanvasVisualization,
  "html-svg-basics": SVGVisualization,
  "html-picture-element": PictureElementVisualization,
  "html-source-tag": SourceTagVisualization,
  // Level 5 — SEO and Metadata
  "html-meta-tags": MetaTagsVisualization,
  "html-viewport-meta": ViewportMetaVisualization,
  "html-open-graph": OpenGraphVisualization,
  "html-favicon": FaviconVisualization,
  "html-title-seo": TitleSEOVisualization,
  "html-robots-meta": RobotsMetaVisualization,
  // Level 6 — Accessibility
  "web-accessibility-basics": AccessibilityBasicsVisualization,
  "html-aria-roles": ARIARolesVisualization,
  "html-aria-labels": ARIALabelsVisualization,
  "html-alt-text": AltTextVisualization,
  "html-keyboard-navigation": KeyboardNavigationVisualization,
  // Level 7 — HTML5 APIs
  "html-local-storage": LocalStorageVisualization,
  "html-session-storage": SessionStorageVisualization,
  "html-geolocation-api": GeolocationVisualization,
  "html-drag-and-drop": DragAndDropVisualization,
  "html-web-workers": WebWorkersVisualization,
};

export function HTMLVisualizationSection({ topicSlug }: HTMLVisualizationSectionProps) {
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
