"use client";

import { SemanticTagVisualization } from "./SemanticTagVisualization";

export function SectionTagVisualization() {
  return (
    <SemanticTagVisualization
      tag="<section>"
      ariaRole="region*"
      description="Groups thematic content that would appear in a document outline. Each <section> should have a heading. NOT a generic wrapper — use <div> for styling-only containers."
      canHaveMultiple={true}
      allowedParents="Inside <main>, <article>, or <body>. Can be nested for sub-sections."
      keyRule="Every <section> should have a heading (<h1>–<h6>). Only gets role='region' when given an accessible name via aria-label or aria-labelledby."
      screenReaderAnnouncement="Features region"
      benefits={[
        { category: "Accessibility", benefit: "With aria-labelledby, creates named 'region' landmarks for keyboard navigation" },
        { category: "Accessibility", benefit: "Screen readers can build a document outline from section headings" },
        { category: "SEO", benefit: "Creates a clear document outline — search engines understand content hierarchy" },
        { category: "SEO", benefit: "Headings within sections contribute to the page's topic structure for ranking" },
        { category: "Code Quality", benefit: "Communicates 'this is a thematic group' — clearer than <div class='section'>" },
        { category: "Code Quality", benefit: "Forces good structure — encourages using headings for each content group" },
      ]}
      codeExample={{
        nonSemantic: `<div class="features">\n  <h2>Features</h2>\n  <p>Feature list...</p>\n</div>`,
        semantic: `<section aria-labelledby="feat">\n  <h2 id="feat">Features</h2>\n  <p>Feature list...</p>\n</section>`,
      }}
    />
  );
}
