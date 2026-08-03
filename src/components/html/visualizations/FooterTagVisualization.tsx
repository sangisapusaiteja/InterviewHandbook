"use client";

import { SemanticTagVisualization } from "./SemanticTagVisualization";

export function FooterTagVisualization() {
  return (
    <SemanticTagVisualization
      tag="<footer>"
      ariaRole="contentinfo"
      description="Closing content for its nearest sectioning ancestor. Page-level: copyright, contact, legal links, site map. Article-level: tags, author info, share buttons. Gets ARIA 'contentinfo' landmark at page level."
      canHaveMultiple={true}
      allowedParents="Direct child of <body> for page footer (gets contentinfo role). Inside <article> or <section> for section-specific footers."
      keyRule="Cannot nest a <footer> inside another <footer> or inside a <header>."
      screenReaderAnnouncement="Content information landmark"
      benefits={[
        { category: "Accessibility", benefit: "Page-level footer gets 'contentinfo' landmark — users can jump to copyright/legal links" },
        { category: "Accessibility", benefit: "Article footers semantically associate metadata (tags, author) with the article" },
        { category: "SEO", benefit: "Search engines reduce ranking weight for footer content — prevents boilerplate link dilution" },
        { category: "SEO", benefit: "Helps search engines distinguish unique page content from repeating site-wide links" },
        { category: "Code Quality", benefit: "Self-documenting — <footer> clearly marks closing content" },
        { category: "Code Quality", benefit: "Consistent structure — page footer for site info, article footer for article metadata" },
      ]}
      codeExample={{
        nonSemantic: `<div class="footer">\n  <p>&copy; 2026 MySite</p>\n  <div class="footer-links">\n    <a href="/privacy">Privacy</a>\n  </div>\n</div>`,
        semantic: `<footer>\n  <p>&copy; 2026 MySite</p>\n  <nav aria-label="Footer">\n    <a href="/privacy">Privacy</a>\n  </nav>\n</footer>`,
      }}
    />
  );
}
