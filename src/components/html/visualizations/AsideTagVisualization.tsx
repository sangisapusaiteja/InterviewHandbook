"use client";

import { SemanticTagVisualization } from "./SemanticTagVisualization";

export function AsideTagVisualization() {
  return (
    <SemanticTagVisualization
      tag="<aside>"
      ariaRole="complementary"
      description="Tangentially related, supplementary content. At page level: sidebars, ads, related links. Inside <article>: pull quotes, fun facts, glossary terms. Removing it should not change the main content's meaning."
      canHaveMultiple={true}
      allowedParents="Direct child of <body> for page sidebar. Inside <article> for supplementary article content."
      keyRule="Content must be supplementary — removing the <aside> should NOT affect the meaning of the surrounding content."
      screenReaderAnnouncement="Complementary landmark — Related Articles"
      benefits={[
        { category: "Accessibility", benefit: "Screen readers announce 'complementary landmark' — users can skip sidebar content entirely" },
        { category: "Accessibility", benefit: "Users navigating by landmarks can distinguish main content from supplementary content" },
        { category: "SEO", benefit: "Search engines give LOWER weight to <aside> — prevents sidebar content from diluting the page topic" },
        { category: "SEO", benefit: "Helps search engines focus on primary <main>/<article> content for ranking" },
        { category: "Code Quality", benefit: "Clearly marks supplementary content — no ambiguity about what is primary vs secondary" },
        { category: "Code Quality", benefit: "Inside articles, marks tangential info (pull quotes, fun facts) vs core content" },
      ]}
      codeExample={{
        nonSemantic: `<div class="sidebar">\n  <div class="widget">\n    <h3>Related</h3>\n    <ul>...</ul>\n  </div>\n</div>`,
        semantic: `<aside>\n  <h3>Related Articles</h3>\n  <ul>\n    <li><a href="#">...</a></li>\n  </ul>\n</aside>`,
      }}
    />
  );
}
