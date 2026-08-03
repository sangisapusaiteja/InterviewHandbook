import type { HTMLTopic, HTMLModule } from "@/types/html";

export const htmlTopics: HTMLTopic[] = [
  // ─────────────────────────────────────────────
  // 1. HTML Introduction
  // ─────────────────────────────────────────────
  {
    id: "html-introduction",
    title: "HTML Introduction",
    slug: "html-introduction",
    icon: "FileCode",
    difficulty: "Beginner",
    description:
      "Understand what HTML is, why it exists, and how browsers use it to render web pages. The absolute starting point of web development.",
    concept: {
      explanation:
        "HTML (HyperText Markup Language) is the standard language used to create and structure content on the web. It is not a programming language — it is a markup language that tells the browser what content to display and how to structure it. Every website you visit is built on an HTML foundation. The browser reads the HTML file, parses the tags, and renders the content visually. HTML was created by Tim Berners-Lee in 1991 and has evolved through several versions — the current standard is HTML5, which introduced semantic elements, multimedia support, and powerful APIs. HTML works alongside CSS (for styling) and JavaScript (for interactivity) to form the three pillars of the web. Understanding HTML is non-negotiable for any web developer — it is the skeleton of every web page.",
      realLifeAnalogy:
        "Think of building a house. HTML is the structural framework — the walls, floors, rooms, and doors. It defines what exists and where it goes. CSS is the paint, wallpaper, and interior design that makes it look good. JavaScript is the electricity and plumbing — the interactive systems that make things work. Without the HTML structure, there is nothing to style or make interactive. Every house needs a frame first.",
      keyPoints: [
        "HTML stands for HyperText Markup Language — it structures web content",
        "HTML is NOT a programming language — it has no logic, loops, or variables",
        "Browsers parse HTML files and render the content visually on screen",
        "HTML5 is the current standard — introduced in 2014 with semantic tags and new APIs",
        "HTML uses tags (like <p>, <h1>, <div>) wrapped in angle brackets to mark up content",
        "Every web page is an HTML document — even React and Next.js compile down to HTML",
        "HTML works with CSS (styling) and JavaScript (behaviour) — the three pillars of the web",
        "You can write HTML in any text editor — no compiler or special software needed",
      ],
    },
    code: {
      language: "html",
      defaultCode: `<!-- ===== Your First HTML Page ===== -->

<!-- This is a complete, minimal HTML page -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My First Page</title>
</head>
<body>

  <h1>Hello, World!</h1>
  <p>This is my first HTML page.</p>
  <p>HTML is the foundation of every website.</p>

</body>
</html>

<!--
  Key observations:
  1. <!DOCTYPE html> tells the browser this is an HTML5 document
  2. <html> is the root element — everything goes inside it
  3. <head> contains metadata (title, charset) — not visible on the page
  4. <body> contains everything the user sees
  5. <h1> is a heading, <p> is a paragraph
  6. Tags come in pairs: <p>content</p> (opening + closing)
  7. Comments use <!-- ... -${""}- > and are not rendered
-->
`,
    },
    interviewQuestions: [
      {
        question: "What is HTML and why is it not considered a programming language?",
        difficulty: "Easy",
        hint: "HTML is a markup language that structures content using tags. It has no logic, variables, conditionals, or loops — it only describes what content exists and how it is organized. Programming languages (JavaScript, Python) execute instructions and make decisions. HTML simply marks up text so the browser knows how to display it.",
      },
      {
        question: "What is the difference between HTML, CSS, and JavaScript?",
        difficulty: "Easy",
        hint: "HTML provides structure (what content exists — headings, paragraphs, images). CSS provides presentation (how it looks — colors, fonts, layout). JavaScript provides behaviour (what it does — click handlers, data fetching, animations). Together they form the three pillars of web development. A page can exist with only HTML, but CSS and JS enhance it.",
      },
      {
        question: "What does the <!DOCTYPE html> declaration do and what happens if you omit it?",
        difficulty: "Medium",
        hint: "<!DOCTYPE html> tells the browser to render the page in standards mode (HTML5). Without it, the browser falls into 'quirks mode' — it emulates old rendering behaviours from the 1990s for backward compatibility, which can cause layout inconsistencies across browsers. Always include it as the very first line.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 2. HTML Document Structure
  // ─────────────────────────────────────────────
  {
    id: "html-document-structure",
    title: "HTML Document Structure",
    slug: "html-document-structure",
    icon: "FileText",
    difficulty: "Beginner",
    description:
      "Learn the anatomy of every HTML document — DOCTYPE, html, head, and body — and understand what belongs in each section and why the order matters.",
    concept: {
      explanation:
        "Every HTML document follows a strict skeleton: <!DOCTYPE html> declares the document type, <html> wraps everything as the root element, <head> contains metadata that is not displayed (character encoding, title, linked stylesheets, meta tags for SEO), and <body> contains all visible content the user interacts with. The <head> section is critical for SEO, accessibility, and proper rendering — it tells the browser the character set (UTF-8), the page title (shown in the browser tab and search results), viewport settings for mobile, and links to CSS/JS resources. The <body> is where all your headings, paragraphs, images, and interactive elements live. This structure is mandatory — browsers will attempt to fix malformed HTML, but relying on browser error correction leads to unpredictable behaviour across different browsers.",
      realLifeAnalogy:
        "Think of an HTML document like a formal letter. The DOCTYPE is the letterhead format — it tells the reader what kind of document this is. The <head> is the envelope — it contains the recipient address, return address, and stamps (metadata) but is not the actual message. The <body> is the letter content itself — what the reader actually sees and reads. You need the envelope to deliver the letter correctly, even though the reader mainly cares about the content inside.",
      keyPoints: [
        "<!DOCTYPE html> must be the very first line — activates standards mode",
        "<html lang='en'> is the root element — lang attribute helps screen readers and search engines",
        "<head> is for metadata: <meta charset>, <title>, <link>, <meta viewport>, <script>",
        "<body> contains all visible page content — everything the user sees and interacts with",
        "<meta charset='UTF-8'> ensures proper rendering of special characters and international text",
        "<title> text appears in the browser tab, bookmarks, and search engine results",
        "<meta name='viewport' content='width=device-width, initial-scale=1.0'> enables responsive design on mobile",
        "Browsers auto-fix missing tags but this causes inconsistency — always write the full skeleton",
      ],
    },
    code: {
      language: "html",
      defaultCode: `<!-- ===== HTML Document Structure ===== -->

<!DOCTYPE html>
<html lang="en">

<!-- ── HEAD: Metadata (not visible) ────────────── -->
<head>
  <!-- Character encoding — always use UTF-8 -->
  <meta charset="UTF-8">

  <!-- Responsive design on mobile devices -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Page title — shows in browser tab & search results -->
  <title>HTML Document Structure</title>

  <!-- SEO meta tags -->
  <meta name="description" content="Learn the anatomy of an HTML document">
  <meta name="author" content="Interview Handbook">

  <!-- Link external CSS -->
  <link rel="stylesheet" href="styles.css">

  <!-- Favicon -->
  <link rel="icon" href="favicon.ico" type="image/x-icon">
</head>

<!-- ── BODY: Visible content ───────────────────── -->
<body>

  <h1>Welcome to My Website</h1>
  <p>This is the body — everything visible goes here.</p>

  <h2>What goes in the head?</h2>
  <ul>
    <li>Character encoding (charset)</li>
    <li>Page title</li>
    <li>Meta descriptions for SEO</li>
    <li>Viewport settings for mobile</li>
    <li>Links to stylesheets and scripts</li>
  </ul>

  <h2>What goes in the body?</h2>
  <ul>
    <li>Headings, paragraphs, and text</li>
    <li>Images, videos, and media</li>
    <li>Links and navigation</li>
    <li>Forms and interactive elements</li>
    <li>All content the user sees</li>
  </ul>

  <!-- Scripts typically go at the end of body -->
  <script src="app.js"></script>
</body>

</html>
`,
    },
    interviewQuestions: [
      {
        question: "What is the purpose of the <head> section in an HTML document? Name at least 5 things that go inside it.",
        difficulty: "Easy",
        hint: "The <head> contains metadata — information about the page that is not directly visible. Key contents: (1) <meta charset='UTF-8'> for character encoding, (2) <title> for the browser tab and SEO, (3) <meta name='viewport'> for responsive mobile design, (4) <meta name='description'> for SEO snippets, (5) <link rel='stylesheet'> for CSS files, (6) <link rel='icon'> for the favicon, (7) <script> for JavaScript (though often placed at end of body).",
      },
      {
        question: "Why is the lang attribute on the <html> tag important?",
        difficulty: "Easy",
        hint: "The lang attribute (<html lang='en'>) tells browsers and screen readers what language the page content is in. Screen readers use it to select the correct pronunciation rules. Search engines use it for language-specific indexing. It also helps browser features like auto-translation. Omitting it hurts accessibility and SEO. Use lang='en' for English, lang='es' for Spanish, etc.",
      },
      {
        question: "What is the difference between placing a <script> tag in the <head> vs at the end of <body>? What do defer and async do?",
        difficulty: "Medium",
        hint: "A <script> in <head> blocks HTML parsing — the browser stops building the DOM, downloads and executes the script, then resumes. At the end of <body>, the DOM is already built before the script runs. The defer attribute downloads the script in parallel but executes it after the DOM is fully parsed (in order). The async attribute downloads in parallel and executes immediately when ready (out of order). Best practice: use <script defer src='...'> in <head> for reliable, non-blocking loading.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 3. HTML Elements and Tags
  // ─────────────────────────────────────────────
  {
    id: "html-elements-and-tags",
    title: "HTML Elements and Tags",
    slug: "html-elements-and-tags",
    icon: "Code",
    difficulty: "Beginner",
    description:
      "Understand the difference between tags, elements, and content — and learn the distinction between block-level, inline, and void (self-closing) elements.",
    concept: {
      explanation:
        "An HTML element consists of three parts: an opening tag (like <p>), content (the text or nested elements inside), and a closing tag (like </p>). The opening tag can also contain attributes that provide additional information. Block-level elements (like <div>, <p>, <h1>) start on a new line and take the full available width — they stack vertically. Inline elements (like <span>, <a>, <strong>) flow within the text and only take as much width as their content needs — they sit side by side. Void elements (also called self-closing or empty elements) have no content and no closing tag — examples include <br>, <hr>, <img>, <input>, and <meta>. Understanding this distinction is fundamental because it determines how elements are laid out on the page and how they can be nested.",
      realLifeAnalogy:
        "Think of block elements as shipping boxes — each box sits on its own shelf row, taking the full width. Inline elements are items inside a box — they sit next to each other until the row runs out of space, then wrap to the next line. Void elements are stickers — they mark something (a line break, a divider) but don't contain anything inside them. You can put items (inline) inside a box (block), but you cannot put a box inside an item.",
      keyPoints: [
        "Element = opening tag + content + closing tag: <p>Hello</p>",
        "Block elements (<div>, <p>, <h1>-<h6>, <ul>, <section>) start on a new line and take full width",
        "Inline elements (<span>, <a>, <strong>, <em>, <img>) flow within text, side by side",
        "Void elements (<br>, <hr>, <img>, <input>, <meta>, <link>) have no closing tag and no content",
        "Block elements can contain other block and inline elements",
        "Inline elements should NOT contain block elements — <span><div></div></span> is invalid",
        "<div> is the generic block container — used for grouping and layout",
        "<span> is the generic inline container — used for styling small text portions",
        "In HTML5, the trailing slash on void elements is optional: <br> and <br /> are both valid",
      ],
    },
    code: {
      language: "html",
      defaultCode: `<!-- ===== HTML Elements and Tags ===== -->

<!-- ── Element anatomy ─────────────────────────── -->
<!--
  <p class="intro">Hello World</p>
   |_____________|  |__________|  |__|
    opening tag      content    closing tag
       |
    attribute
-->

<!-- ── Block-level elements ────────────────────── -->
<!-- Each starts on a new line, takes full width -->
<div style="border: 1px solid #ccc; padding: 8px; margin: 4px 0;">
  <h1>I am a block heading (h1)</h1>
  <p>I am a block paragraph. I start on a new line.</p>
  <p>I am another paragraph. I also start on a new line.</p>
</div>

<!-- ── Inline elements ─────────────────────────── -->
<!-- Flow within the text, side by side -->
<p>
  This is normal text with a
  <strong>bold word</strong> and an
  <em>italic word</em> and a
  <a href="#">link</a> and a
  <span style="color: red;">red span</span>
  — all inline, flowing together.
</p>

<!-- ── Void (self-closing) elements ────────────── -->
<!-- No content, no closing tag -->
<p>Line one<br>Line two after a break</p>
<hr>
<img src="https://via.placeholder.com/200x100" alt="Placeholder image">
<input type="text" placeholder="I am a void element too">

<!-- ── Nesting rules ───────────────────────────── -->
<!-- CORRECT: block contains inline -->
<div>
  <p>A paragraph with <strong>bold</strong> text.</p>
</div>

<!-- CORRECT: block contains block -->
<div>
  <section>
    <p>Nested blocks are fine.</p>
  </section>
</div>

<!-- WRONG: inline should NOT contain block -->
<!-- <span><div>This is invalid!</div></span> -->

<!-- ── div vs span ─────────────────────────────── -->
<div style="background: #f0f0f0; padding: 8px;">
  This entire area is a &lt;div&gt; — block container.
  <span style="color: blue;">This part is a &lt;span&gt; — inline.</span>
</div>
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between block-level and inline elements? Give examples of each.",
        difficulty: "Easy",
        hint: "Block elements start on a new line and take the full available width — they stack vertically. Examples: <div>, <p>, <h1>-<h6>, <ul>, <section>, <article>. Inline elements flow within text and only take the width of their content — they sit side by side. Examples: <span>, <a>, <strong>, <em>, <img>, <input>. Block can contain inline; inline should not contain block.",
      },
      {
        question: "What are void (self-closing) elements in HTML? Why don't they have closing tags?",
        difficulty: "Easy",
        hint: "Void elements are HTML elements that cannot have any child content — they are inherently empty. Examples: <br>, <hr>, <img>, <input>, <meta>, <link>. They have no closing tag because there is nothing to put between an opening and closing tag. In HTML5, the trailing slash is optional: <br> and <br /> are both valid. XHTML required the slash; HTML5 does not.",
      },
      {
        question: "What is the difference between <div> and <span>? When would you use each?",
        difficulty: "Easy",
        hint: "<div> is a generic block-level container — it starts on a new line and takes full width. Use it to group sections of content for layout or styling. <span> is a generic inline container — it flows within text. Use it to style a small portion of text without breaking the line. Neither has any semantic meaning — they are purely structural. When a semantic element exists (like <section>, <nav>, <strong>), prefer it over <div>/<span>.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 4. HTML Attributes
  // ─────────────────────────────────────────────
  {
    id: "html-attributes",
    title: "HTML Attributes",
    slug: "html-attributes",
    icon: "Settings",
    difficulty: "Beginner",
    description:
      "Learn how HTML attributes provide additional information to elements — from universal attributes like id, class, and style to element-specific ones like href, src, and alt.",
    concept: {
      explanation:
        "HTML attributes are name-value pairs written inside the opening tag of an element that provide additional configuration or metadata. They follow the syntax: name=\"value\". Some attributes are universal — they work on any element: id (unique identifier), class (CSS class names), style (inline CSS), title (tooltip text), data-* (custom data), hidden, and tabindex. Other attributes are element-specific: href on <a> tags for links, src and alt on <img> tags for images, type and placeholder on <input> tags. Boolean attributes like disabled, required, checked, and hidden are special — their mere presence means true; they don't need a value. The id attribute must be unique across the entire page — it is used by CSS (#id), JavaScript (getElementById), and anchor links (#section). The class attribute can have multiple space-separated values and is the primary hook for CSS styling.",
      realLifeAnalogy:
        "Think of an HTML element as a package being shipped. The tag (<div>, <img>) is the type of package. Attributes are the labels on the package: id is the tracking number (unique), class is the category label (multiple packages can share it), style is special handling instructions written directly on the box, src is the contents description, and alt is the fallback label if the contents are damaged. Some labels are universal (every package needs a tracking number); others are specific (only food packages have a temperature label).",
      keyPoints: [
        "Syntax: <tag attribute=\"value\"> — always inside the opening tag",
        "id — unique identifier for the element; used by CSS (#), JS (getElementById), and anchor links",
        "class — one or more space-separated CSS class names; the primary CSS hook",
        "style — inline CSS rules directly on the element; overrides stylesheet rules",
        "title — tooltip text shown on hover; also used by screen readers",
        "data-* — custom data attributes for storing application data (e.g., data-user-id=\"42\")",
        "Boolean attributes (disabled, required, checked, hidden) — presence = true, absence = false",
        "href (links), src (images/scripts), alt (image fallback), type (inputs) are element-specific",
        "Attribute values should always be quoted — double quotes are the convention",
      ],
    },
    code: {
      language: "html",
      defaultCode: `<!-- ===== HTML Attributes ===== -->

<!-- ── Universal attributes (work on any element) ── -->

<!-- id: unique identifier -->
<h1 id="page-title">Welcome to My Site</h1>

<!-- class: one or more CSS classes -->
<p class="intro highlight">
  This paragraph has two classes: "intro" and "highlight".
</p>

<!-- style: inline CSS -->
<p style="color: blue; font-size: 18px;">
  Inline styled text — blue and 18px.
</p>

<!-- title: tooltip on hover -->
<p title="This is a tooltip!">Hover over me to see the tooltip.</p>

<!-- data-* : custom data attributes -->
<div data-user-id="42" data-role="admin">
  Custom data stored on the element.
</div>

<!-- hidden: hides the element from the page -->
<p hidden>You cannot see me on the page.</p>

<!-- tabindex: controls keyboard tab order -->
<button tabindex="1">Tab to me first</button>
<button tabindex="2">Tab to me second</button>


<!-- ── Element-specific attributes ─────────────── -->

<!-- href on <a> (links) -->
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
  Visit Example.com (opens in new tab)
</a>

<!-- src, alt, width, height on <img> -->
<img
  src="https://via.placeholder.com/300x200"
  alt="A placeholder image"
  width="300"
  height="200"
>

<!-- type, placeholder, required on <input> -->
<input type="email" placeholder="Enter your email" required>


<!-- ── Boolean attributes ──────────────────────── -->
<!-- Presence = true, absence = false -->
<input type="text" disabled>           <!-- cannot type -->
<input type="checkbox" checked>        <!-- checked by default -->
<input type="text" required>           <!-- must be filled -->

<!-- These are equivalent: -->
<!-- <input disabled>             -->
<!-- <input disabled="">          -->
<!-- <input disabled="disabled">  -->


<!-- ── id vs class ─────────────────────────────── -->
<!-- id is UNIQUE — only one element per page -->
<div id="main-content">Only one element can have this id.</div>

<!-- class is REUSABLE — many elements can share it -->
<p class="card">Card 1</p>
<p class="card">Card 2</p>
<p class="card">Card 3</p>
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between the id and class attributes? When would you use each?",
        difficulty: "Easy",
        hint: "id must be unique across the entire page — only one element can have a given id. It is used for JavaScript targeting (getElementById), CSS specificity (#id), and anchor links (<a href='#section'>). class can be shared by multiple elements and an element can have multiple classes. It is the primary mechanism for applying reusable CSS styles. Use id for unique landmarks; use class for reusable styling groups.",
      },
      {
        question: "What are data-* attributes and what are they used for?",
        difficulty: "Medium",
        hint: "data-* attributes (e.g., data-user-id='42', data-color='blue') let you store custom data directly on HTML elements without using non-standard attributes. JavaScript can read them via element.dataset.userId (camelCase conversion). They are useful for passing configuration to JS components, storing state, or adding metadata that CSS can target with attribute selectors ([data-active='true']). They do not affect rendering or semantics.",
      },
      {
        question: "How do boolean attributes work in HTML? Is <input disabled='false'> disabled or not?",
        difficulty: "Medium",
        hint: "Boolean attributes are true when present and false when absent — the value does not matter. <input disabled>, <input disabled=''>, and <input disabled='false'> ALL result in a disabled input. The string 'false' is not interpreted as a boolean — the mere presence of the attribute activates it. To make an input enabled, remove the attribute entirely: <input> with no disabled attribute. In JavaScript frameworks like React, you set disabled={false} which removes the attribute from the DOM.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 5. Headings and Paragraphs
  // ─────────────────────────────────────────────
  {
    id: "headings-and-paragraphs",
    title: "Headings and Paragraphs",
    slug: "headings-and-paragraphs",
    icon: "Heading",
    difficulty: "Beginner",
    description:
      "Master HTML headings (<h1> through <h6>) and paragraphs (<p>) — the fundamental building blocks for structuring text content, SEO, and accessibility.",
    concept: {
      explanation:
        "Headings (<h1> through <h6>) define a hierarchical outline of your page content. <h1> is the most important heading — typically the main page title — and <h6> is the least important. This hierarchy is not just visual; it is semantic. Screen readers use headings to let users navigate between sections. Search engines use the heading hierarchy to understand the topic and structure of your content. Paragraphs (<p>) represent blocks of text. Browsers automatically add margin above and below paragraphs. An important rule: there should be only one <h1> per page (the main topic), and headings should not skip levels — don't jump from <h1> to <h3> without an <h2> in between. White space in HTML source code is collapsed into a single space — multiple spaces and newlines in your code will render as one space in the browser.",
      realLifeAnalogy:
        "Headings are like the table of contents in a textbook. <h1> is the book title, <h2> are chapter titles, <h3> are section titles within chapters, and so on. A well-structured book never puts a subsection title without its parent chapter title. Paragraphs are the actual text content under each section. A screen reader user navigates your page like someone scanning a table of contents — jumping between headings to find the section they want, then reading the paragraphs within.",
      keyPoints: [
        "<h1> is the most important heading — use only ONE per page for the main topic",
        "<h2> through <h6> create a hierarchy — do not skip levels (h1 → h3 is bad practice)",
        "Screen readers generate a heading outline — proper hierarchy enables keyboard navigation",
        "Search engines weight <h1> heavily for page topic — critical for SEO",
        "<p> defines a paragraph — browsers add default margin (typically 16px top and bottom)",
        "HTML collapses whitespace: multiple spaces and newlines render as a single space",
        "Use <br> for a line break within a paragraph — not for spacing (use CSS margin instead)",
        "Headings are block elements — they always start on a new line",
      ],
    },
    code: {
      language: "html",
      defaultCode: `<!-- ===== Headings and Paragraphs ===== -->

<!-- ── Heading hierarchy (h1 through h6) ───────── -->
<h1>Main Page Title (h1)</h1>
<p>Only one h1 per page. It defines the main topic.</p>

<h2>Chapter Title (h2)</h2>
<p>Major sections of the page use h2.</p>

<h3>Section Title (h3)</h3>
<p>Subsections within a chapter use h3.</p>

<h4>Subsection (h4)</h4>
<p>Deeper nesting — use sparingly.</p>

<h5>Minor Heading (h5)</h5>
<p>Rarely needed in practice.</p>

<h6>Smallest Heading (h6)</h6>
<p>The least important heading level.</p>


<!-- ── Correct heading hierarchy ────────────────── -->
<!-- GOOD: proper nesting -->
<h1>My Blog</h1>
  <h2>Latest Articles</h2>
    <h3>How to Learn HTML</h3>
    <p>HTML is the foundation of the web...</p>

    <h3>CSS for Beginners</h3>
    <p>CSS controls the visual presentation...</p>

  <h2>About Me</h2>
    <p>I am a web developer who loves teaching.</p>

<!-- BAD: skipping levels -->
<!-- <h1>Title</h1>
     <h3>Subsection</h3>  ← skipped h2! -->


<!-- ── Paragraphs ──────────────────────────────── -->
<h2>About Paragraphs</h2>

<p>
  This is a paragraph. Browsers add default margin above and below.
  Multiple    spaces    in    source    code   collapse   into   one.
</p>

<p>This is another paragraph. It starts on a new line with margin.</p>


<!-- ── Whitespace collapsing ───────────────────── -->
<h2>Whitespace Behaviour</h2>

<p>These      multiple      spaces      become      one.</p>
<p>This
has
newlines
but
renders
on
one
line.</p>

<!-- Use <br> for intentional line breaks -->
<p>
  Line one<br>
  Line two<br>
  Line three
</p>

<!-- Use <pre> to preserve whitespace exactly -->
<pre>
  This    preserves
  all     spaces
  and     newlines.
</pre>
`,
    },
    interviewQuestions: [
      {
        question: "Why should you use only one <h1> per page? What impact does heading hierarchy have on SEO and accessibility?",
        difficulty: "Easy",
        hint: "One <h1> per page clearly communicates the main topic to search engines — Google uses it as a strong ranking signal. For accessibility, screen readers build a heading outline that users navigate like a table of contents. Proper hierarchy (h1 → h2 → h3, no skipping) ensures this outline makes logical sense. Multiple <h1> tags dilute the page topic signal and confuse the heading outline.",
      },
      {
        question: "Why does HTML collapse whitespace, and how can you preserve it when needed?",
        difficulty: "Easy",
        hint: "HTML collapses multiple spaces, tabs, and newlines into a single space so that source code formatting doesn't affect rendering. This lets developers indent and format their code freely. To preserve whitespace: use the <pre> element (preformatted text), or the CSS property white-space: pre (or pre-wrap). Use <br> for intentional line breaks within flowing text, and CSS margin/padding for spacing — never use multiple <br> tags for layout.",
      },
      {
        question: "What is the difference between using <br> for line breaks and using separate <p> tags?",
        difficulty: "Medium",
        hint: "<br> creates a line break within the same paragraph — no extra margin or spacing. Multiple <br> tags are often misused for spacing. <p> tags create separate paragraphs with default margins above and below — they are semantic blocks of text. Use <p> for distinct paragraphs of content; use <br> only when a line break within a single block is semantically meaningful (like in a poem or address). For spacing, always use CSS margin/padding instead of empty <p> or <br> tags.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 6. Text Formatting
  // ─────────────────────────────────────────────
  {
    id: "text-formatting",
    title: "Text Formatting",
    slug: "text-formatting",
    icon: "Bold",
    difficulty: "Beginner",
    description:
      "Learn semantic text formatting tags — <strong>, <em>, <mark>, <del>, <ins>, <sub>, <sup>, <code> — and understand why they matter more than their visual appearance.",
    concept: {
      explanation:
        "HTML provides two categories of text formatting tags: semantic tags that convey meaning, and presentational tags that only describe appearance. Semantic tags tell the browser, screen readers, and search engines what the text means: <strong> means important text (rendered bold), <em> means emphasized text (rendered italic), <mark> means highlighted/relevant text, <del> means deleted text, <ins> means inserted text, <code> means computer code. Presentational tags like <b> (bold) and <i> (italic) only describe visual appearance with no semantic meaning. In modern HTML, always prefer semantic tags: <strong> over <b>, and <em> over <i>. Screen readers change their tone of voice for <strong> and <em> but ignore <b> and <i>. Search engines give extra weight to text inside <strong>. The <code> tag uses a monospace font and indicates that text is a code snippet. The <pre> tag preserves whitespace formatting — often used together with <code> for code blocks.",
      realLifeAnalogy:
        "Imagine reading a textbook aloud. <strong> is like the instructor raising their voice and saying 'This is important — pay attention!' <em> is like adding stress to a word: 'You must use this method.' <b> and <i> are like someone highlighting text with a marker without explaining why. A blind listener benefits from the verbal emphasis (<strong>, <em>) but gains nothing from visual highlighting alone (<b>, <i>). That is why semantic tags matter — they carry meaning beyond appearance.",
      keyPoints: [
        "<strong> — important text (bold appearance) — screen readers emphasize it",
        "<em> — emphasized text (italic appearance) — screen readers change tone",
        "<b> — visually bold with no semantic importance — use <strong> instead",
        "<i> — visually italic with no semantic importance — use <em> instead",
        "<mark> — highlighted/relevant text — yellow background by default",
        "<del> — deleted/removed text — strikethrough appearance",
        "<ins> — inserted/added text — underline appearance",
        "<small> — side comments, fine print — smaller font size",
        "<sub> and <sup> — subscript (H₂O) and superscript (x²) for math and chemistry",
        "<code> — inline code snippet — monospace font",
        "<pre> — preformatted text block — preserves whitespace and line breaks",
        "<blockquote> — long quotation from another source — indented by default",
      ],
    },
    code: {
      language: "html",
      defaultCode: `<!-- ===== Text Formatting ===== -->

<!-- ── Semantic formatting (preferred) ─────────── -->
<h2>Semantic Tags</h2>

<p><strong>This text is important.</strong> Screen readers emphasize it.</p>
<p><em>This text is emphasized.</em> Screen readers change tone.</p>
<p><mark>This text is highlighted</mark> as relevant to the current context.</p>
<p><del>This was removed.</del> <ins>This was added.</ins></p>
<p><small>This is fine print or a side comment.</small></p>


<!-- ── Presentational formatting (avoid) ───────── -->
<h2>Presentational Tags (prefer semantic alternatives)</h2>

<p><b>Bold (no meaning)</b> — use &lt;strong&gt; instead.</p>
<p><i>Italic (no meaning)</i> — use &lt;em&gt; instead.</p>
<p><u>Underlined</u> — often confused with links, avoid.</p>


<!-- ── Subscript and Superscript ────────────────── -->
<h2>Subscript &amp; Superscript</h2>

<p>Water: H<sub>2</sub>O</p>
<p>Einstein: E = mc<sup>2</sup></p>
<p>Footnote reference<sup><a href="#note1">[1]</a></sup></p>


<!-- ── Code formatting ─────────────────────────── -->
<h2>Code Formatting</h2>

<!-- Inline code -->
<p>Use the <code>console.log()</code> function to debug.</p>
<p>Install with <code>npm install express</code>.</p>

<!-- Code block (pre + code) -->
<pre><code>function greet(name) {
  return "Hello, " + name + "!";
}
console.log(greet("World"));</code></pre>


<!-- ── Quotations ──────────────────────────────── -->
<h2>Quotations</h2>

<!-- Block quote — for longer quotes -->
<blockquote>
  <p>The only way to do great work is to love what you do.</p>
  <footer>— Steve Jobs</footer>
</blockquote>

<!-- Inline quote -->
<p>As Einstein said, <q>Imagination is more important than knowledge.</q></p>


<!-- ── Abbreviation ────────────────────────────── -->
<p>
  <abbr title="HyperText Markup Language">HTML</abbr> is the
  standard markup language for the web.
</p>
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between <strong> and <b>, and between <em> and <i>?",
        difficulty: "Easy",
        hint: "<strong> means semantically important text — screen readers emphasize it, and search engines give it extra weight. <b> only makes text visually bold with no semantic meaning. Similarly, <em> means stressed emphasis — screen readers change their tone of voice. <i> only makes text visually italic. In modern HTML, always prefer <strong> over <b> and <em> over <i> because accessibility and SEO benefit from semantic meaning.",
      },
      {
        question: "When would you use <code> vs <pre> vs both together?",
        difficulty: "Easy",
        hint: "<code> marks text as a code snippet — typically renders in monospace font. Use it inline: 'Run <code>npm install</code>.' <pre> preserves whitespace and line breaks — used for preformatted text blocks. Use them together for code blocks: <pre><code>multi-line code here</code></pre>. <code> alone is for inline snippets; <pre> alone is for any preformatted text (ASCII art, poetry); combined they create a proper code block.",
      },
      {
        question: "What is the purpose of the <abbr> tag and how does it improve accessibility?",
        difficulty: "Medium",
        hint: "<abbr title='HyperText Markup Language'>HTML</abbr> marks an abbreviation or acronym. The title attribute provides the full expansion, which appears as a tooltip on hover and is announced by screen readers. This helps users who may not know what an abbreviation stands for. It also signals to search engines that the abbreviated term has a specific meaning. Always include the title attribute when using <abbr>.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 7. HTML Links
  // ─────────────────────────────────────────────
  {
    id: "html-links",
    title: "HTML Links",
    slug: "html-links",
    icon: "Link",
    difficulty: "Beginner",
    description:
      "Master the <a> anchor tag — the element that makes the web a web. Learn internal links, external links, email links, anchor links, and critical attributes like target and rel.",
    concept: {
      explanation:
        "The anchor tag <a> creates hyperlinks — the connections that make the web a web. The href attribute specifies the destination URL. Links can point to external websites (absolute URLs like https://example.com), internal pages (relative URLs like /about or ./contact.html), sections within the same page (anchor links like #section-id), email addresses (mailto:user@example.com), and phone numbers (tel:+1234567890). The target attribute controls where the link opens: _self (same tab, default), _blank (new tab). When using target='_blank', always add rel='noopener noreferrer' for security — without it, the new page can access your page's window.opener object. The <a> tag is an inline element but can wrap block elements in HTML5. Link text should be descriptive for accessibility — never use 'click here' as the link text because screen readers often list all links out of context.",
      realLifeAnalogy:
        "Links are like doors in a building. An internal link is a door to another room in the same building (relative URL). An external link is a door that leads outside to a different building (absolute URL). An anchor link is an elevator button that jumps you to a specific floor in the same building (#section). target='_blank' is opening a new window to look at another building while keeping your current window open. The rel='noopener' is locking the door behind you so the other building can't reach back into yours.",
      keyPoints: [
        "<a href='url'>link text</a> — creates a clickable hyperlink",
        "Absolute URL: href='https://example.com' — points to an external site",
        "Relative URL: href='/about' or href='contact.html' — points within the same site",
        "Anchor link: href='#section-id' — jumps to an element with matching id on the same page",
        "Email link: href='mailto:user@example.com' — opens the default email client",
        "Phone link: href='tel:+1234567890' — triggers phone dialing on mobile",
        "target='_blank' opens in a new tab — always pair with rel='noopener noreferrer' for security",
        "Download link: <a href='file.pdf' download> — prompts file download instead of navigation",
        "Link text must be descriptive — 'Read the documentation' not 'click here'",
        "An <a> without href is a placeholder link — it is not focusable or clickable",
      ],
    },
    code: {
      language: "html",
      defaultCode: `<!-- ===== HTML Links ===== -->

<!-- ── External link (absolute URL) ────────────── -->
<p>
  <a href="https://developer.mozilla.org" target="_blank" rel="noopener noreferrer">
    MDN Web Docs (opens in new tab)
  </a>
</p>

<!-- ── Internal link (relative URL) ────────────── -->
<p>
  <a href="/about">About Us</a> |
  <a href="/contact">Contact</a> |
  <a href="../index.html">Home (parent directory)</a>
</p>

<!-- ── Anchor link (same page) ─────────────────── -->
<nav>
  <a href="#section1">Jump to Section 1</a> |
  <a href="#section2">Jump to Section 2</a> |
  <a href="#top">Back to Top</a>
</nav>

<h2 id="top">Top of Page</h2>
<p>Content here...</p>

<h2 id="section1">Section 1</h2>
<p>This is section 1. You jumped here from the nav above.</p>

<h2 id="section2">Section 2</h2>
<p>This is section 2.</p>


<!-- ── Email and phone links ───────────────────── -->
<p>
  <a href="mailto:hello@example.com">Send us an email</a>
</p>
<p>
  <a href="mailto:hello@example.com?subject=Hello&body=Hi there!">
    Email with pre-filled subject
  </a>
</p>
<p>
  <a href="tel:+14155551234">Call us: (415) 555-1234</a>
</p>


<!-- ── Download link ───────────────────────────── -->
<p>
  <a href="/files/resume.pdf" download>
    Download Resume (PDF)
  </a>
</p>
<p>
  <a href="/files/resume.pdf" download="john-doe-resume.pdf">
    Download with custom filename
  </a>
</p>


<!-- ── Link wrapping a block (HTML5) ───────────── -->
<a href="/article/1" style="text-decoration: none; color: inherit;">
  <div style="border: 1px solid #ccc; padding: 16px;">
    <h3>Article Title</h3>
    <p>Click anywhere in this card to navigate.</p>
  </div>
</a>


<!-- ── Accessibility: good vs bad link text ────── -->
<!-- BAD: screen reader says "click here" with no context -->
<!-- <a href="/docs">Click here</a> -->

<!-- GOOD: screen reader says "Read the HTML documentation" -->
<a href="/docs">Read the HTML documentation</a>
`,
    },
    interviewQuestions: [
      {
        question: "Why should you always add rel='noopener noreferrer' when using target='_blank'?",
        difficulty: "Easy",
        hint: "Without rel='noopener', the new page can access your page's window.opener object — a security vulnerability called 'tabnapping' where the new page could redirect your original page to a phishing site. noopener prevents this access. noreferrer additionally prevents the new page from knowing which page linked to it (hides the Referer header). Modern browsers now default to noopener for target='_blank', but explicit declaration ensures compatibility with older browsers.",
      },
      {
        question: "What is the difference between an absolute URL and a relative URL in href?",
        difficulty: "Easy",
        hint: "Absolute URL includes the full path with protocol: href='https://example.com/about' — always points to the same page regardless of where your HTML file lives. Relative URL is relative to the current page: href='/about' (from root), href='contact.html' (same directory), href='../index.html' (parent directory). Use relative URLs for internal navigation (they work across environments — dev, staging, prod) and absolute URLs for external sites.",
      },
      {
        question: "How do anchor links work and how would you implement smooth scrolling to a section?",
        difficulty: "Medium",
        hint: "Anchor links use href='#id' to jump to the element with the matching id attribute on the same page. The browser scrolls instantly by default. For smooth scrolling: add CSS html { scroll-behavior: smooth; } — this makes all anchor jumps animate smoothly. Alternatively, use JavaScript: element.scrollIntoView({ behavior: 'smooth' }). For accessibility, ensure the target section has a focusable heading so keyboard users land in the right place after the jump.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 8. HTML Images
  // ─────────────────────────────────────────────
  {
    id: "html-images",
    title: "HTML Images",
    slug: "html-images",
    icon: "Image",
    difficulty: "Beginner",
    description:
      "Learn how to embed images with <img>, write meaningful alt text for accessibility and SEO, and use modern responsive image techniques with srcset and <picture>.",
    concept: {
      explanation:
        "The <img> tag embeds an image into an HTML page. It is a void element — it has no closing tag and no content. The two required attributes are src (the image URL) and alt (alternative text). The alt attribute is critically important: it is displayed when the image fails to load, read aloud by screen readers for visually impaired users, and used by search engines to understand image content. Writing good alt text is an accessibility skill — describe what the image shows in context, not just 'image of...' For decorative images that add no information, use alt='' (empty string) so screen readers skip them. Modern HTML provides responsive image tools: the srcset attribute lets you offer multiple image sizes so the browser picks the best one for the device, and the <picture> element lets you serve different image formats (WebP, AVIF) with fallbacks for older browsers.",
      realLifeAnalogy:
        "Think of <img> as hanging a picture frame on a wall. The src is the actual photograph you put in the frame. The alt text is the small label under the frame in a museum — it tells blind visitors what the picture shows and appears as a description if the photo is ever removed. The width and height are the frame dimensions. srcset is like offering the same photo in small, medium, and large prints — the frame picks the best size for the wall space. <picture> is like offering the same scene as a painting, a photograph, and a sketch — the gallery chooses the format that works best.",
      keyPoints: [
        "<img src='url' alt='description'> — src and alt are both required",
        "alt text is read by screen readers — critical for accessibility (WCAG compliance)",
        "alt text is shown when the image fails to load — fallback for broken images",
        "Decorative images: use alt='' (empty) so screen readers skip them entirely",
        "Always set width and height attributes to prevent layout shift (CLS) during loading",
        "loading='lazy' defers off-screen images — improves initial page load performance",
        "srcset offers multiple sizes: srcset='small.jpg 480w, large.jpg 1024w' — browser chooses",
        "<picture> with <source> elements enables format switching (WebP with JPEG fallback)",
        "Supported formats: JPEG (photos), PNG (transparency), SVG (vectors), WebP (modern), AVIF (newest)",
      ],
    },
    code: {
      language: "html",
      defaultCode: `<!-- ===== HTML Images ===== -->

<!-- ── Basic image ─────────────────────────────── -->
<img
  src="https://via.placeholder.com/400x300"
  alt="A placeholder image showing dimensions 400 by 300"
  width="400"
  height="300"
>

<!-- ── Why alt text matters ─────────────────────── -->

<!-- Informative image: describe what it shows -->
<img src="team-photo.jpg" alt="Five team members standing in the office lobby, smiling">

<!-- Functional image (used as a link): describe the action -->
<a href="/home">
  <img src="logo.png" alt="Company logo — go to homepage">
</a>

<!-- Decorative image: empty alt so screen readers skip it -->
<img src="decorative-border.png" alt="">


<!-- ── Lazy loading ────────────────────────────── -->
<!-- Browser loads this image only when it's near the viewport -->
<img
  src="large-photo.jpg"
  alt="A landscape photograph of mountains at sunset"
  loading="lazy"
  width="800"
  height="600"
>


<!-- ── Responsive images with srcset ───────────── -->
<!-- Browser picks the best size based on viewport width -->
<img
  src="photo-800.jpg"
  srcset="
    photo-400.jpg  400w,
    photo-800.jpg  800w,
    photo-1200.jpg 1200w
  "
  sizes="(max-width: 600px) 400px, (max-width: 1000px) 800px, 1200px"
  alt="A responsive photo that adapts to screen size"
>


<!-- ── <picture> element for format switching ──── -->
<!-- Serves modern formats with JPEG fallback -->
<picture>
  <source srcset="photo.avif" type="image/avif">
  <source srcset="photo.webp" type="image/webp">
  <img src="photo.jpg" alt="A photo served in the best supported format">
</picture>


<!-- ── Figure with caption ─────────────────────── -->
<figure>
  <img
    src="https://via.placeholder.com/400x300"
    alt="A chart showing website traffic growth over 12 months"
    width="400"
    height="300"
  >
  <figcaption>Figure 1: Website traffic growth in 2024</figcaption>
</figure>
`,
    },
    interviewQuestions: [
      {
        question: "Why is the alt attribute important, and what should you write for decorative vs informative images?",
        difficulty: "Easy",
        hint: "alt serves three purposes: (1) screen readers read it aloud for visually impaired users — it IS the image for them; (2) it displays as fallback text when the image fails to load; (3) search engines use it to understand image content for indexing. For informative images: describe what the image shows in context ('Team photo of five engineers at the 2024 hackathon'). For decorative images (borders, spacers): use alt='' (empty string) so screen readers skip them. Never omit alt entirely — that makes screen readers announce the filename, which is worse.",
      },
      {
        question: "What is the purpose of the srcset attribute and the sizes attribute on an <img> tag?",
        difficulty: "Medium",
        hint: "srcset provides a set of image sources with their widths: srcset='small.jpg 480w, large.jpg 1024w'. The browser uses this with the sizes attribute (which declares how much viewport width the image will occupy at various breakpoints) to pick the most efficient image. This means mobile users download a small image and desktop users get a high-res version — saving bandwidth and improving performance. Without srcset, all users download the same (usually large) image.",
      },
      {
        question: "What is the difference between <img srcset> and the <picture> element? When would you use each?",
        difficulty: "Medium",
        hint: "srcset on <img> is for resolution switching — same image, different sizes. The browser picks the best size. <picture> with <source> elements is for format switching (WebP vs JPEG) or art direction (different crops for mobile vs desktop). Use srcset when you just need responsive sizing. Use <picture> when you need to serve different formats or fundamentally different images at different breakpoints.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 9. HTML Lists
  // ─────────────────────────────────────────────
  {
    id: "html-lists",
    title: "HTML Lists",
    slug: "html-lists",
    icon: "List",
    difficulty: "Beginner",
    description:
      "Master the three types of HTML lists — ordered (<ol>), unordered (<ul>), and description (<dl>) — and learn proper nesting, semantic usage, and accessibility implications.",
    concept: {
      explanation:
        "HTML provides three list types for structuring related items. Unordered lists (<ul>) display items with bullet points — use them when the order doesn't matter (navigation menus, feature lists, ingredients). Ordered lists (<ol>) display items with numbers — use them when sequence matters (step-by-step instructions, rankings, recipes). Description lists (<dl>) pair terms (<dt>) with descriptions (<dd>) — use them for glossaries, FAQs, and key-value information. All list items use the <li> tag inside <ul> or <ol>. Lists can be nested: put a <ul> or <ol> inside an <li> to create sub-lists. Lists are semantic: screen readers announce 'list of 5 items' and let users navigate between items. Most navigation menus (<nav>) are built as unordered lists because a set of navigation links is semantically a list of destinations with no inherent order.",
      realLifeAnalogy:
        "An unordered list is a shopping list — buy eggs, milk, bread in any order, marked with bullet points. An ordered list is assembly instructions for furniture — step 1, step 2, step 3 must be followed in sequence, marked with numbers. A description list is a dictionary — each word (term) is paired with its definition (description). You can nest lists like sub-tasks: 'Buy groceries' might have a sub-list of specific items within it.",
      keyPoints: [
        "<ul> — unordered list with bullet points; order does not matter",
        "<ol> — ordered list with numbers; sequence is meaningful",
        "<dl> — description list; pairs of <dt> (term) and <dd> (description)",
        "<li> — list item; only valid as a direct child of <ul> or <ol>",
        "Nested lists: place a <ul> or <ol> inside an <li> element",
        "<ol type='A'> for A, B, C; type='i' for i, ii, iii; start='5' to begin at 5",
        "<ol reversed> counts down: 5, 4, 3, 2, 1",
        "Screen readers announce 'list, 5 items' — semantic lists improve navigation",
        "Navigation menus are typically <nav><ul><li><a>...</a></li></ul></nav>",
        "Never use lists just for visual indentation — use CSS margin/padding instead",
      ],
    },
    code: {
      language: "html",
      defaultCode: `<!-- ===== HTML Lists ===== -->

<!-- ── Unordered list (bullets) ─────────────────── -->
<h2>Unordered List</h2>
<ul>
  <li>HTML — Structure</li>
  <li>CSS — Styling</li>
  <li>JavaScript — Behaviour</li>
</ul>

<!-- ── Ordered list (numbers) ──────────────────── -->
<h2>Ordered List</h2>
<ol>
  <li>Learn HTML basics</li>
  <li>Learn CSS fundamentals</li>
  <li>Learn JavaScript</li>
  <li>Build your first project</li>
</ol>

<!-- ── Ordered list variants ───────────────────── -->
<h3>Alphabetical (A, B, C)</h3>
<ol type="A">
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ol>

<h3>Roman numerals (i, ii, iii)</h3>
<ol type="i">
  <li>Introduction</li>
  <li>Main content</li>
  <li>Conclusion</li>
</ol>

<h3>Start at 5, reversed</h3>
<ol start="5" reversed>
  <li>Fifth</li>
  <li>Fourth</li>
  <li>Third</li>
</ol>


<!-- ── Nested lists ────────────────────────────── -->
<h2>Nested Lists</h2>
<ul>
  <li>Frontend
    <ul>
      <li>HTML</li>
      <li>CSS</li>
      <li>JavaScript
        <ul>
          <li>React</li>
          <li>Vue</li>
          <li>Angular</li>
        </ul>
      </li>
    </ul>
  </li>
  <li>Backend
    <ul>
      <li>Node.js</li>
      <li>Python</li>
    </ul>
  </li>
</ul>


<!-- ── Description list ────────────────────────── -->
<h2>Description List</h2>
<dl>
  <dt>HTML</dt>
  <dd>HyperText Markup Language — structures web content.</dd>

  <dt>CSS</dt>
  <dd>Cascading Style Sheets — styles the visual presentation.</dd>

  <dt>JavaScript</dt>
  <dd>A programming language that adds interactivity to web pages.</dd>
</dl>


<!-- ── Navigation menu as a list ───────────────── -->
<h2>Navigation Menu</h2>
<nav>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/services">Services</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</nav>
`,
    },
    interviewQuestions: [
      {
        question: "What are the three types of HTML lists and when would you use each?",
        difficulty: "Easy",
        hint: "<ul> (unordered): when item order doesn't matter — navigation links, feature lists, shopping lists. <ol> (ordered): when sequence is meaningful — step-by-step instructions, rankings, numbered references. <dl> (description): when pairing terms with definitions — glossaries, FAQs, metadata key-value pairs. Choose based on semantics, not appearance — you can always change the visual style with CSS.",
      },
      {
        question: "Why are navigation menus typically built as unordered lists? Is this required?",
        difficulty: "Easy",
        hint: "A navigation menu is semantically a set of links with no inherent order — an unordered list. Using <nav><ul><li><a>...</a></li></ul></nav> gives screen readers context: they announce 'navigation, list, 4 items' and let users jump between items. It is not strictly required — you could use plain <a> tags — but the list structure provides better accessibility, keyboard navigation, and semantic clarity. CSS removes the default bullets and styles it horizontally.",
      },
      {
        question: "How do you create a nested list, and what is the correct nesting rule?",
        difficulty: "Medium",
        hint: "Place a new <ul> or <ol> inside an <li> element of the parent list: <ul><li>Item<ul><li>Sub-item</li></ul></li></ul>. The nested list must be inside an <li>, not directly inside the parent <ul>/<ol>. You can mix list types: an <ol> inside a <ul> or vice versa. Screen readers announce the nesting level: 'list, 3 items, nested list, 2 items'. The browser applies increasing indentation by default.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 10. HTML Comments
  // ─────────────────────────────────────────────
  {
    id: "html-comments",
    title: "HTML Comments",
    slug: "html-comments",
    icon: "MessageSquare",
    difficulty: "Beginner",
    description:
      "Learn how to use HTML comments to annotate your code, temporarily disable elements, and organize large HTML files — and understand why comments are visible in the page source.",
    concept: {
      explanation:
        "HTML comments are written between <!-- and --> markers. Anything inside a comment is completely ignored by the browser during rendering — it does not appear on the page and does not affect layout or functionality. Comments serve multiple purposes: documenting code for other developers (or your future self), temporarily disabling HTML elements during debugging, marking sections in large HTML files for easier navigation, and leaving TODO notes. However, an important caveat: HTML comments ARE visible in the page source code. Anyone can right-click a page, choose 'View Page Source', and read all comments. Never put sensitive information (passwords, API keys, internal notes about security vulnerabilities) in HTML comments. Unlike CSS comments (/* */) and JavaScript comments (// or /* */), HTML uses its own unique syntax. Comments cannot be nested — putting <!-- inside a comment causes parsing errors.",
      realLifeAnalogy:
        "HTML comments are like pencil notes in the margins of a printed book. The reader (browser) ignores them when reading the story (rendering the page), but anyone who picks up the physical book (views page source) can see the pencil marks. They help the author organize their thoughts and leave reminders, but they should never contain secrets — the book is not locked. Nested comments are like trying to write a margin note inside another margin note — the pencil gets confused about where one note ends and the other begins.",
      keyPoints: [
        "Syntax: <!-- comment text here --> — works for single and multi-line",
        "Comments are NOT rendered — the browser ignores them completely",
        "Comments ARE visible in View Page Source — never put secrets in comments",
        "Use comments to document sections: <!-- Navigation --> <!-- Footer -->",
        "Use comments to temporarily disable elements during debugging",
        "Comments cannot be nested: <!-- outer <!-- inner --> --> will break",
        "Do not use -- inside a comment — technically violates the HTML spec",
        "Excessive comments in production slow page load — minification strips them",
        "Conditional comments (<!--[if IE]>) were used for old IE browsers — obsolete now",
      ],
    },
    code: {
      language: "html",
      defaultCode: `<!-- ===== HTML Comments ===== -->

<!-- This is a single-line comment -->

<!--
  This is a multi-line comment.
  It can span as many lines as you need.
  The browser ignores everything between the markers.
-->


<!-- ── Documenting sections ────────────────────── -->

<!-- === HEADER === -->
<header>
  <h1>My Website</h1>
  <!-- Logo and navigation will go here -->
</header>

<!-- === MAIN CONTENT === -->
<main>
  <h2>Welcome</h2>
  <p>This is the main content area.</p>
</main>

<!-- === FOOTER === -->
<footer>
  <p>&copy; 2024 My Website</p>
</footer>


<!-- ── Temporarily disabling elements ──────────── -->

<!-- Commenting out an element for debugging: -->
<!-- <p>This paragraph is temporarily hidden.</p> -->

<!-- Commenting out a broken feature: -->
<!--
<div class="beta-feature">
  <h3>New Feature</h3>
  <p>This feature is under development.</p>
</div>
-->

<!-- The disabled elements above do NOT render on the page -->


<!-- ── TODO notes ──────────────────────────────── -->

<!-- TODO: Add form validation -->
<!-- TODO: Replace placeholder image with real photo -->
<!-- FIXME: Footer links are broken on mobile -->


<!-- ── Common mistakes ─────────────────────────── -->

<!-- WRONG: Nested comments break! -->
<!-- This will <!-- cause an error --> and break the page -->

<!-- WRONG: Never put secrets in comments! -->
<!-- API Key: sk-12345 -->  <!-- Anyone can see this in View Source! -->

<!-- RIGHT: Comments for developers, not secrets -->
<!-- This section uses a grid layout — see styles.css line 42 -->


<!-- ── Visible in page source ──────────────────── -->
<!--
  REMEMBER: Comments are visible to anyone who views the page source.
  Right-click → View Page Source → all comments are readable.
  Use server-side code for sensitive information, not HTML comments.
-->


<!-- ── Before and after minification ───────────── -->
<!--
  In development: comments help organize code.
  In production: build tools (like HTML minifiers) strip all comments
  to reduce file size and page load time.
-->
`,
    },
    interviewQuestions: [
      {
        question: "Are HTML comments truly hidden from users? Why should you never put sensitive data in them?",
        difficulty: "Easy",
        hint: "No — HTML comments are hidden from the rendered page but are fully visible in the page source code. Anyone can right-click → View Page Source (or use browser DevTools) and read every comment. Never put API keys, passwords, internal server paths, security notes, or user data in HTML comments. Use server-side environment variables for secrets. In production, use a build tool to strip comments from the HTML to reduce file size.",
      },
      {
        question: "Why can't HTML comments be nested? What happens if you try?",
        difficulty: "Easy",
        hint: "The HTML parser finds the first --> after <!-- and considers the comment closed. So <!-- outer <!-- inner --> --> actually ends the comment at the first -->, leaving 'inner --> -->' as visible broken text on the page. The parser does not track nesting depth for comments. If you need to disable a section that already contains comments, remove the inner comments first, or use a different approach (like wrapping in a <template> tag, which is not rendered).",
      },
      {
        question: "What are conditional comments and are they still used in modern web development?",
        difficulty: "Medium",
        hint: "Conditional comments (<!--[if IE 9]><link href='ie9.css'><![endif]-->) were a Microsoft-specific feature that allowed targeting specific versions of Internet Explorer with custom HTML/CSS. They were essential during the IE6-IE11 era for fixing browser-specific bugs. Modern browsers (Edge, Chrome, Firefox, Safari) do not support conditional comments, and IE has been officially retired. They are obsolete — if you see them in legacy code, they can safely be removed. Modern cross-browser compatibility is handled with CSS feature queries (@supports), autoprefixer, and progressive enhancement.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 11. Div vs Span
  // ─────────────────────────────────────────────
  {
    id: "div-vs-span",
    title: "Div vs Span",
    slug: "div-vs-span",
    icon: "Layers",
    difficulty: "Beginner",
    description:
      "Understand the two most common generic containers in HTML — when to use block-level <div> and when to use inline <span>.",
    concept: {
      explanation:
        "HTML elements are either block-level or inline. Block-level elements start on a new line and take the full width available — <div> is the generic block container. Inline elements sit within the flow of text and only take as much width as their content — <span> is the generic inline container. Neither <div> nor <span> has any visual meaning by themselves; they are blank canvases you style with CSS or target with JavaScript. <div> is used to group sections of a page (navigation, sidebar, card), while <span> is used to target a piece of text inside a paragraph (highlight a word, apply a colour). Using the right one matters for layout — putting a <div> inside a <p> breaks the HTML spec, but a <span> inside a <p> is perfectly valid. In modern HTML, prefer semantic elements (<header>, <nav>, <section>) over <div> when the content has meaning, and only reach for <div>/<span> when no semantic tag fits.",
      realLifeAnalogy:
        "Think of a bookshelf. A <div> is a shelf — it takes the full width and stacks vertically. You use shelves to organise sections (fiction, non-fiction). A <span> is a sticky note on a specific book — it highlights something without changing the shelf layout. You would not use a shelf to mark one word, and you would not use a sticky note to hold a row of books.",
      keyPoints: [
        "<div> is a block-level generic container — starts on a new line, takes full width",
        "<span> is an inline generic container — stays in the text flow, takes only content width",
        "Neither has visual meaning by default — they are styled via CSS classes or IDs",
        "Block elements stack vertically; inline elements sit side by side",
        "<div> is for grouping sections: wrappers, cards, rows, columns",
        "<span> is for targeting inline text: highlighting a word, adding a tooltip",
        "Nesting rule: <span> can go inside <div>, but <div> cannot go inside <span> or <p>",
        "Prefer semantic HTML (<header>, <nav>, <article>) over <div> when meaning exists",
      ],
    },
    code: {
      language: "html",
      defaultCode: `<!-- ===== Block vs Inline Demo ===== -->

<!-- <div> is BLOCK-LEVEL — takes full width, stacks vertically -->
<div style="background: #e3f2fd; padding: 16px; margin-bottom: 8px;">
  <h2>This is inside a div</h2>
  <p>The div takes the full width of its container.</p>
</div>

<div style="background: #fce4ec; padding: 16px; margin-bottom: 16px;">
  <p>This second div starts on a NEW line below.</p>
</div>


<!-- <span> is INLINE — sits within the text flow -->
<p>
  This is a paragraph with a
  <span style="background: #fff9c4; padding: 2px 6px;">highlighted word</span>
  and a
  <span style="color: red; font-weight: bold;">red bold word</span>
  inside it.
</p>


<!-- Practical example: Card layout with div + span -->
<div style="border: 1px solid #ccc; border-radius: 8px; padding: 16px; max-width: 300px;">
  <h3>Product Card</h3>
  <p>
    Price: <span style="color: green; font-weight: bold;">$29.99</span>
    <span style="text-decoration: line-through; color: gray; margin-left: 8px;">$49.99</span>
  </p>
  <p>
    Status: <span style="background: #c8e6c9; padding: 2px 8px; border-radius: 4px;">In Stock</span>
  </p>
</div>
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between <div> and <span>? When would you use each?",
        difficulty: "Easy",
        hint: "<div> is a block-level element — it starts on a new line and takes the full width of its parent. <span> is an inline element — it sits within the text flow and only takes as much width as its content. Use <div> to group sections (cards, rows, wrappers). Use <span> to style or target a specific piece of inline text. Neither has semantic meaning — they are generic containers for CSS and JavaScript hooks.",
      },
      {
        question: "Can you put a <div> inside a <p> tag? Why or why not?",
        difficulty: "Medium",
        hint: "No — it is invalid HTML. The <p> element can only contain inline content (text, <span>, <strong>, <em>, <a>, etc.). When the browser encounters a <div> inside a <p>, it auto-closes the <p> before the <div>, creating broken structure. This is because <p> is defined in the HTML spec to only accept 'phrasing content'.",
      },
      {
        question: "When should you use <div> versus semantic HTML elements like <section>, <article>, or <nav>?",
        difficulty: "Medium",
        hint: "Use semantic elements when the content has meaning — <nav> for navigation, <header> for page/section headers, <article> for self-contained content. Use <div> only when no semantic element fits — for purely visual grouping. Semantic HTML improves accessibility, SEO, and code readability.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 12. HTML Tables
  // ─────────────────────────────────────────────
  {
    id: "html-tables",
    title: "HTML Tables",
    slug: "html-tables",
    icon: "LayoutGrid",
    difficulty: "Beginner",
    description:
      "Learn how to create structured tabular data with HTML tables — rows, columns, headers, spanning, and accessibility.",
    concept: {
      explanation:
        "HTML tables display tabular data — information in rows and columns like spreadsheets and schedules. A table is built with nested elements: <table> wraps everything, <tr> defines a row, <th> defines a header cell, and <td> defines a data cell. Tables support structural sections: <thead> for headers, <tbody> for data, <tfoot> for summaries. Cells can span columns with colspan or rows with rowspan. The <caption> element provides a title for accessibility. Important: tables should ONLY be used for tabular data, never for page layout — use CSS Grid or Flexbox for layouts.",
      realLifeAnalogy:
        "Think of a spreadsheet. The entire spreadsheet is the <table>. Each row is a <tr>. The bold header row is a <thead> with <th> cells. Each data cell is a <td>. You can merge cells across columns (colspan) or rows (rowspan). The sheet title is the <caption>.",
      keyPoints: [
        "<table> wraps the entire table structure",
        "<tr> defines a table row — every row must be inside <tr>",
        "<th> defines a header cell — bold and centred by default",
        "<td> defines a data cell — the actual content cells",
        "<thead>, <tbody>, <tfoot> group rows into semantic sections",
        "<caption> provides an accessible title for the table",
        "colspan='2' spans 2 columns; rowspan='2' spans 2 rows",
        "Tables are for DATA only — never use <table> for page layout",
      ],
    },
    code: {
      language: "html",
      defaultCode: `<!-- ===== Basic HTML Table ===== -->

<table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
  <caption><strong>Student Grades</strong></caption>

  <thead>
    <tr>
      <th>Name</th>
      <th>Subject</th>
      <th>Grade</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>Alice</td>
      <td>Math</td>
      <td>A</td>
    </tr>
    <tr>
      <td>Bob</td>
      <td>Science</td>
      <td>B+</td>
    </tr>
    <tr>
      <td>Charlie</td>
      <td>English</td>
      <td>A-</td>
    </tr>
  </tbody>

  <tfoot>
    <tr>
      <td colspan="2"><strong>Class Average</strong></td>
      <td><strong>A-</strong></td>
    </tr>
  </tfoot>
</table>

<br>

<!-- ===== Table with Colspan and Rowspan ===== -->
<table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse;">
  <caption><strong>Schedule</strong></caption>
  <thead>
    <tr>
      <th>Time</th>
      <th>Monday</th>
      <th>Tuesday</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>9:00 AM</td>
      <td rowspan="2">Math (2 hours)</td>
      <td>English</td>
    </tr>
    <tr>
      <td>10:00 AM</td>
      <td>Science</td>
    </tr>
    <tr>
      <td>11:00 AM</td>
      <td colspan="2" style="text-align: center;">Lunch Break</td>
    </tr>
  </tbody>
</table>
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between <th> and <td>? Why does it matter for accessibility?",
        difficulty: "Easy",
        hint: "<th> defines a header cell and <td> defines a data cell. Screen readers use <th> to announce column/row headers as users navigate — 'Name: Alice'. Without <th>, assistive technology cannot associate data cells with headers.",
      },
      {
        question: "Why should you not use HTML tables for page layout?",
        difficulty: "Medium",
        hint: "Tables are semantically for data. Layout issues: screen readers announce 'table with X rows', tables don't reflow on mobile, the browser can't render until all rows are parsed, and layout changes require restructuring nested elements. Use CSS Grid/Flexbox instead.",
      },
      {
        question: "Explain colspan and rowspan with examples.",
        difficulty: "Easy",
        hint: "colspan makes a cell span multiple columns — useful for summary rows. rowspan makes a cell span multiple rows — useful for multi-period classes. The spanned cell replaces cells it covers, so omit those <td> elements in affected rows.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 13. HTML Forms Basics
  // ─────────────────────────────────────────────
  {
    id: "html-forms-basics",
    title: "HTML Forms Basics",
    slug: "html-forms-basics",
    icon: "FileText",
    difficulty: "Beginner",
    description:
      "Learn the fundamentals of HTML forms — how browsers collect user input and submit data to a server.",
    concept: {
      explanation:
        "HTML forms are the primary way users interact with web applications. A form is created with the <form> element, which wraps input fields, buttons, and labels. The <form> tag has two critical attributes: action (the URL where data is sent) and method (GET or POST). GET appends data to the URL as query parameters — used for searches. POST sends data in the request body — used for sensitive data. Each form field needs a name attribute — this becomes the key in the submitted data. The <label> element is paired with inputs via for/id, making forms accessible. Modern web apps often use JavaScript (e.preventDefault()) instead of the browser's default submission for AJAX requests without page reloads.",
      realLifeAnalogy:
        "Think of a paper form at a doctor's office. The clipboard is the <form>. Each blank line is an <input>. The printed label next to each line is a <label>. The 'Submit' button is the submit button. GET is like writing on a postcard — visible to everyone. POST is like putting info in a sealed envelope — private.",
      keyPoints: [
        "<form> wraps all inputs — defines where (action) and how (method) data is sent",
        "method='GET' appends data to URL — visible, bookmarkable, limited size",
        "method='POST' sends in request body — private, no size limit",
        "Every input needs a name attribute — this is the key in submitted data",
        "<label for='id'> links to <input id='id'> — clicking label focuses input",
        "Labels are essential for accessibility — screen readers read them",
        "<button type='submit'> triggers form submission",
        "JavaScript's e.preventDefault() stops default submission for SPA handling",
      ],
    },
    code: {
      language: "html",
      defaultCode: `<!-- ===== Basic HTML Form ===== -->

<h2>Contact Form</h2>

<form action="/submit" method="POST">
  <div style="margin-bottom: 12px;">
    <label for="name">Full Name:</label><br>
    <input type="text" id="name" name="name" placeholder="John Doe" required>
  </div>

  <div style="margin-bottom: 12px;">
    <label for="email">Email:</label><br>
    <input type="email" id="email" name="email" placeholder="john@example.com" required>
  </div>

  <div style="margin-bottom: 12px;">
    <label for="message">Message:</label><br>
    <textarea id="message" name="message" rows="4" cols="40" placeholder="Your message..."></textarea>
  </div>

  <button type="submit">Send Message</button>
  <button type="reset">Clear Form</button>
</form>

<hr>

<h2>GET vs POST</h2>

<form action="/search" method="GET">
  <label for="query">Search (GET):</label>
  <input type="text" id="query" name="q" placeholder="Search...">
  <button type="submit">Search</button>
  <p><small>Data appears in URL as ?q=yourquery</small></p>
</form>

<form action="/login" method="POST">
  <label for="password">Password (POST):</label>
  <input type="password" id="password" name="password">
  <button type="submit">Login</button>
  <p><small>Data sent in request body — NOT in the URL</small></p>
</form>
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between GET and POST in HTML forms?",
        difficulty: "Easy",
        hint: "GET appends data to URL as query parameters — visible, bookmarkable, cached, ~2KB limit. POST sends in request body — private, not cached, no size limit. Use GET for searches; POST for sensitive data, file uploads, and creating resources.",
      },
      {
        question: "Why is the <label> element important in forms?",
        difficulty: "Easy",
        hint: "Labels provide accessible names for inputs. Screen readers read them aloud. Clicking a label focuses the input, increasing the click target. Without labels, screen readers announce 'edit text' with no context. Required for WCAG compliance.",
      },
      {
        question: "What is the name attribute on form inputs and why is it required?",
        difficulty: "Medium",
        hint: "The name attribute defines the key when form data is submitted. Without it, the input value is NOT sent. It becomes the key in key-value pairs (e.g., email=a@b.com). Separate from id — id is for label/JS targeting, name is for form submission.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 14. Input Types
  // ─────────────────────────────────────────────
  {
    id: "html-input-types",
    title: "Input Types",
    slug: "html-input-types",
    icon: "Settings",
    difficulty: "Beginner",
    description:
      "Explore the full range of HTML input types — text, email, number, date, color, range, file, and more.",
    concept: {
      explanation:
        "The <input> element is the most versatile form element. Its behaviour changes based on the type attribute. HTML5 introduced many types beyond text and password. Each type provides built-in validation, mobile keyboards, and native UI. type='email' validates format and shows @ keyboard. type='number' shows increment buttons. type='date' shows a date picker. type='color' shows a colour picker. type='range' shows a slider. type='file' opens a file browser. Using the correct type improves UX, reduces JavaScript validation, and improves accessibility. Default type is 'text' if omitted.",
      realLifeAnalogy:
        "Think of vending machine slots. One only accepts coins (number), one accepts bills (text), one has a card reader (password). Each slot is shaped for specific input. HTML input types work the same way — a date picker only lets you pick dates, an email field checks for @.",
      keyPoints: [
        "type='text' — default, any text input",
        "type='password' — masks characters",
        "type='email' — validates email format, shows @ keyboard on mobile",
        "type='number' — numeric only, has min/max/step",
        "type='date' — native date picker, returns YYYY-MM-DD",
        "type='checkbox' — boolean toggle, multiple can share same name",
        "type='radio' — single selection from a group (same name = one group)",
        "type='file' — file upload, use accept and multiple attributes",
      ],
    },
    code: {
      language: "html",
      defaultCode: `<!-- ===== HTML Input Types ===== -->

<form>
  <div style="margin-bottom: 10px;">
    <label for="t1">text:</label>
    <input type="text" id="t1" placeholder="Any text">
  </div>

  <div style="margin-bottom: 10px;">
    <label for="t2">password:</label>
    <input type="password" id="t2" placeholder="Hidden">
  </div>

  <div style="margin-bottom: 10px;">
    <label for="t3">email:</label>
    <input type="email" id="t3" placeholder="user@example.com">
  </div>

  <div style="margin-bottom: 10px;">
    <label for="t4">number:</label>
    <input type="number" id="t4" min="0" max="100" step="5" value="50">
  </div>

  <div style="margin-bottom: 10px;">
    <label for="t5">date:</label>
    <input type="date" id="t5">
  </div>

  <div style="margin-bottom: 10px;">
    <label for="t6">color:</label>
    <input type="color" id="t6" value="#3b82f6">
  </div>

  <div style="margin-bottom: 10px;">
    <label for="t7">range:</label>
    <input type="range" id="t7" min="0" max="100" value="60">
  </div>

  <div style="margin-bottom: 10px;">
    <label for="t8">file:</label>
    <input type="file" id="t8" accept="image/*" multiple>
  </div>

  <div style="margin-bottom: 10px;">
    <label for="t9">tel:</label>
    <input type="tel" id="t9" placeholder="+1-234-567-8900">
  </div>

  <div style="margin-bottom: 10px;">
    <label for="t10">url:</label>
    <input type="url" id="t10" placeholder="https://example.com">
  </div>

  <div style="margin-bottom: 10px;">
    <label for="t11">search:</label>
    <input type="search" id="t11" placeholder="Search...">
  </div>

  <input type="hidden" name="userId" value="12345">

  <button type="submit">Submit</button>
</form>
`,
    },
    interviewQuestions: [
      {
        question: "What happens if you use type='text' instead of type='email'?",
        difficulty: "Easy",
        hint: "No built-in email validation. Standard keyboard on mobile instead of email keyboard. You lose autofill suggestions. You must write custom JS validation. Always use the most specific input type.",
      },
      {
        question: "What is the difference between type='hidden' and CSS display:none?",
        difficulty: "Medium",
        hint: "type='hidden' is semantically hidden — not focusable, not read by screen readers, value is submitted. CSS hidden still exists in DOM and may be focusable. For form data you need to send but not show, use type='hidden'.",
      },
      {
        question: "How do min, max, and step work on number inputs?",
        difficulty: "Easy",
        hint: "min sets minimum, max sets maximum, step sets increment. Browser validates on submission. step='any' allows any decimal. These also apply to date (step in days) and time (step in seconds) inputs.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 15. Buttons and Labels
  // ─────────────────────────────────────────────
  {
    id: "buttons-and-labels",
    title: "Buttons and Labels",
    slug: "buttons-and-labels",
    icon: "Bold",
    difficulty: "Beginner",
    description:
      "Master the <button> element types (submit, reset, button) and the <label> element for accessible form controls.",
    concept: {
      explanation:
        "The <button> element has three types: submit (default — submits the form), reset (clears fields), and button (does nothing — used with JavaScript). Always specify type to avoid accidental submission. <button> is preferred over <input type='submit'> because it can contain HTML — icons, images, formatted text. The <label> element connects to an input via for/id matching or by wrapping the input. Clicking a connected label focuses the input — crucial for checkboxes and radios on mobile. Labels are required for accessibility compliance.",
      realLifeAnalogy:
        "In an elevator, the label is the floor number printed next to each button. Without labels, you press random buttons blindfolded. The three button types: submit = 'Close Doors' (performs action), reset = emergency stop (resets), button = decorative until wired up.",
      keyPoints: [
        "<button type='submit'> submits the form — DEFAULT if type is omitted",
        "<button type='reset'> resets all fields to initial values",
        "<button type='button'> does nothing — use with JavaScript onclick",
        "Always set type to avoid accidental form submission",
        "<button> can contain HTML; <input type='submit'> can only show text",
        "<label for='id'> connects to <input id='id'> — clicking label focuses input",
        "Alternative: wrap input inside <label> — no for/id needed",
        "Labels increase click target area — crucial for mobile and checkboxes",
      ],
    },
    code: {
      language: "html",
      defaultCode: `<!-- ===== Buttons and Labels ===== -->

<h2>Button Types</h2>

<form>
  <div style="margin-bottom: 12px;">
    <label for="demo-name">Name:</label><br>
    <input type="text" id="demo-name" name="name" value="Initial Value">
  </div>

  <button type="submit">Submit Form</button>
  <button type="reset">Reset Fields</button>
  <button type="button" onclick="alert('Clicked!')">Custom Action</button>
</form>

<hr>

<h2>Label Connection Methods</h2>

<!-- Method 1: for + id -->
<div style="margin-bottom: 12px;">
  <label for="fname">Method 1 (for/id):</label><br>
  <input type="text" id="fname" name="fname" placeholder="Click the label">
</div>

<!-- Method 2: Wrapping -->
<div style="margin-bottom: 12px;">
  <label>
    Method 2 (wrapping):
    <input type="text" name="lname" placeholder="Click the label">
  </label>
</div>

<hr>

<h2>Labels Make Checkboxes Easier</h2>

<div style="margin-bottom: 8px;">
  <input type="checkbox" id="no-label"> Without label (click tiny box)
</div>

<div style="margin-bottom: 8px;">
  <input type="checkbox" id="with-label">
  <label for="with-label">With label (click this text!)</label>
</div>
`,
    },
    interviewQuestions: [
      {
        question: "What are the three types of <button> and what is the default?",
        difficulty: "Easy",
        hint: "submit (submits form), reset (clears fields), button (no default action). Default is 'submit' when type is omitted — a common bug causing accidental submissions.",
      },
      {
        question: "What is the difference between <button> and <input type='submit'>?",
        difficulty: "Easy",
        hint: "<button> can contain HTML content (icons, spans); <input type='submit'> only shows plain text via the value attribute. <button> can also be type='button' or type='reset'. Always prefer <button>.",
      },
      {
        question: "What are the two ways to connect a <label> to an <input>?",
        difficulty: "Medium",
        hint: "Explicit: <label for='id'> + <input id='id'>. Implicit: wrap <input> inside <label>. Explicit is preferred — works with input anywhere on page, more reliable across screen readers.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 16. Select, Radio and Checkbox
  // ─────────────────────────────────────────────
  {
    id: "select-radio-checkbox",
    title: "Select, Radio and Checkbox",
    slug: "select-radio-checkbox",
    icon: "List",
    difficulty: "Intermediate",
    description:
      "Learn how to create selection controls — dropdowns, radio buttons, and checkboxes — for user choices in forms.",
    concept: {
      explanation:
        "HTML provides three selection controls. <select> creates a dropdown with <option> elements. Radio buttons (<input type='radio'>) let users choose ONE option — all radios in a group share the same name. Checkboxes (<input type='checkbox'>) let users select ZERO OR MORE options independently. Key difference: radio = mutually exclusive, checkbox = independent, select = dropdown UI. For radios, same name = same group. Unchecked checkboxes are NOT submitted. The <optgroup> element groups options within a select.",
      realLifeAnalogy:
        "Radio buttons are like a car radio — only one station at a time. Checkboxes are like pizza toppings — pick none, one, or many. A dropdown is like a vending machine display — scroll through options.",
      keyPoints: [
        "<select> creates a dropdown with <option> elements",
        "<optgroup label='Group'> groups related options",
        "<input type='radio'> — same name = one group, only ONE selected",
        "<input type='checkbox'> — independent, MULTIPLE can be selected",
        "Unchecked checkboxes are NOT submitted to the server",
        "Radio buttons REQUIRE same name to form a group",
        "Use radio for mutually exclusive choices, checkbox for independent toggles",
        "select with multiple attribute allows multi-selection",
      ],
    },
    code: {
      language: "html",
      defaultCode: `<!-- ===== Select, Radio, and Checkbox ===== -->

<form>
  <h3>Select Dropdown</h3>

  <label for="country">Country:</label>
  <select id="country" name="country">
    <option value="">-- Choose --</option>
    <optgroup label="Asia">
      <option value="in">India</option>
      <option value="jp">Japan</option>
    </optgroup>
    <optgroup label="Europe">
      <option value="uk">United Kingdom</option>
      <option value="de">Germany</option>
    </optgroup>
  </select>

  <br><br>

  <label for="skills">Skills (Ctrl+click for multiple):</label><br>
  <select id="skills" name="skills" multiple size="4">
    <option value="html">HTML</option>
    <option value="css">CSS</option>
    <option value="js">JavaScript</option>
    <option value="react">React</option>
  </select>

  <hr>

  <h3>Radio Buttons (pick ONE)</h3>
  <p>T-shirt size:</p>
  <label><input type="radio" name="size" value="s"> Small</label><br>
  <label><input type="radio" name="size" value="m" checked> Medium</label><br>
  <label><input type="radio" name="size" value="l"> Large</label><br>
  <label><input type="radio" name="size" value="xl"> X-Large</label>

  <hr>

  <h3>Checkboxes (pick MANY)</h3>
  <p>Pizza toppings:</p>
  <label><input type="checkbox" name="toppings" value="cheese" checked> Cheese</label><br>
  <label><input type="checkbox" name="toppings" value="pepperoni"> Pepperoni</label><br>
  <label><input type="checkbox" name="toppings" value="mushrooms"> Mushrooms</label><br>
  <label><input type="checkbox" name="toppings" value="olives"> Olives</label>

  <br><br>
  <label>
    <input type="checkbox" name="terms" value="agreed" required>
    I agree to the Terms
  </label>

  <br><br>
  <button type="submit">Submit</button>
</form>
`,
    },
    interviewQuestions: [
      {
        question: "What happens when a checkbox is unchecked and the form is submitted?",
        difficulty: "Easy",
        hint: "The unchecked checkbox is completely omitted from submitted data. Workaround: add a hidden input before it with same name and default 'no' value — if checked, checkbox overrides hidden input.",
      },
      {
        question: "Why must radio buttons in the same group share the same name?",
        difficulty: "Easy",
        hint: "The name attribute identifies which radios belong together. Same name = mutually exclusive group. Different names = independent radios that can all be selected. Only the selected radio's value is submitted.",
      },
      {
        question: "When should you use <select> versus radio buttons?",
        difficulty: "Medium",
        hint: "Radios for 2-5 options — all visible without clicking. Select for 6+ options — saves space. Radios are better for critical choices (all options visible). Selects better for long lists (country, timezone).",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 17. Fieldset and Legend
  // ─────────────────────────────────────────────
  {
    id: "fieldset-and-legend",
    title: "Fieldset and Legend",
    slug: "fieldset-and-legend",
    icon: "Braces",
    difficulty: "Intermediate",
    description:
      "Group related form controls with <fieldset> and provide a caption with <legend> for structure and accessibility.",
    concept: {
      explanation:
        "The <fieldset> element groups related form controls visually and semantically. It draws a border around its contents by default. The <legend> is the caption — placed as the first child inside <fieldset>, appearing embedded in the border. This combination is essential for accessibility: screen readers announce the legend when entering a fieldset. This is critical for radio/checkbox groups — without fieldset+legend, screen readers announce each radio independently without context. The disabled attribute on <fieldset> disables ALL form controls inside it. Fieldsets can be nested.",
      realLifeAnalogy:
        "Think of a paper form with boxed sections. A fieldset is the box drawn around related fields — 'Personal Info', 'Payment'. The legend is the section title on the border. Without boxes and titles, the form is one long confusing list. Disabled fieldset = crossing out an entire section.",
      keyPoints: [
        "<fieldset> groups related form controls with a visual border",
        "<legend> is the caption — must be the first child inside <fieldset>",
        "Screen readers announce the legend when entering a fieldset",
        "Essential for radio/checkbox groups — provides group context",
        "disabled on <fieldset> disables ALL inputs inside",
        "Fieldsets can be nested for complex forms",
        "Default border removable with CSS — semantic grouping still works",
        "Use fieldset+legend instead of headings for form sections",
      ],
    },
    code: {
      language: "html",
      defaultCode: `<!-- ===== Fieldset and Legend ===== -->

<form>
  <fieldset>
    <legend>Personal Information</legend>
    <div style="margin-bottom: 8px;">
      <label for="fname">First Name:</label><br>
      <input type="text" id="fname" name="fname">
    </div>
    <div style="margin-bottom: 8px;">
      <label for="lname">Last Name:</label><br>
      <input type="text" id="lname" name="lname">
    </div>
    <div style="margin-bottom: 8px;">
      <label for="dob">Date of Birth:</label><br>
      <input type="date" id="dob" name="dob">
    </div>
  </fieldset>

  <br>

  <fieldset>
    <legend>Payment Method</legend>
    <label><input type="radio" name="payment" value="card"> Credit Card</label><br>
    <label><input type="radio" name="payment" value="paypal"> PayPal</label><br>
    <label><input type="radio" name="payment" value="bank"> Bank Transfer</label>
  </fieldset>

  <br>

  <fieldset>
    <legend>Notifications</legend>
    <label><input type="checkbox" name="notify" value="email" checked> Email</label><br>
    <label><input type="checkbox" name="notify" value="sms"> SMS</label><br>
    <label><input type="checkbox" name="notify" value="push"> Push</label>
  </fieldset>

  <br>

  <fieldset disabled>
    <legend>Shipping (disabled)</legend>
    <div style="margin-bottom: 8px;">
      <label for="street">Street:</label><br>
      <input type="text" id="street" name="street">
    </div>
    <div style="margin-bottom: 8px;">
      <label for="city">City:</label><br>
      <input type="text" id="city" name="city">
    </div>
    <p><small>Enable shipping to fill this section.</small></p>
  </fieldset>

  <br>
  <button type="submit">Complete Order</button>
</form>
`,
    },
    interviewQuestions: [
      {
        question: "Why is <fieldset> with <legend> important for radio button accessibility?",
        difficulty: "Easy",
        hint: "Without it, screen readers announce each radio in isolation. With fieldset+legend, the reader announces 'Payment Method group' first, then lists options. The legend provides the group label (the question). Required by WCAG.",
      },
      {
        question: "What happens when you add disabled to a <fieldset>?",
        difficulty: "Easy",
        hint: "ALL form controls inside become non-interactive — users cannot focus, type, or click. Disabled values are NOT submitted. Useful for conditionally enabling sections. The <legend> remains visible.",
      },
      {
        question: "Can you nest <fieldset> elements? When is it useful?",
        difficulty: "Medium",
        hint: "Yes. Useful for hierarchical grouping — outer 'Billing Information' with inner 'Credit Card Details'. Screen readers announce each level. Disabling outer also disables nested. Use sparingly — one level usually suffices.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 18. HTML Iframe
  // ─────────────────────────────────────────────
  {
    id: "html-iframe",
    title: "HTML Iframe",
    slug: "html-iframe",
    icon: "Code",
    difficulty: "Intermediate",
    description:
      "Learn how to embed external content like maps, videos, and other web pages using the <iframe> element.",
    concept: {
      explanation:
        "The <iframe> (inline frame) embeds another HTML document inside the current page — a nested browsing context. Common uses: YouTube videos, Google Maps, payment forms, third-party widgets. The src attribute specifies the URL. The iframe has its own DOM and JavaScript context — isolated from the parent. The sandbox attribute restricts what embedded content can do (prevent scripts, forms, popups). The allow attribute controls feature permissions (camera, fullscreen, autoplay). loading='lazy' defers loading for performance. Communication between parent and iframe uses postMessage(). Security: cross-origin iframes cannot access each other's DOM (Same-Origin Policy).",
      realLifeAnalogy:
        "An iframe is picture-in-picture on your TV. The main screen is your page; the PiP window is the iframe — isolated content. They cannot control each other. Sandbox = parental controls. postMessage = a walkie-talkie between them.",
      keyPoints: [
        "<iframe src='url'> embeds another document",
        "Creates isolated browsing context — separate DOM and JavaScript",
        "sandbox restricts capabilities — scripts, forms, navigation",
        "allow controls feature permissions — fullscreen, camera, autoplay",
        "loading='lazy' defers loading until near viewport",
        "Same-Origin Policy prevents cross-origin DOM access",
        "postMessage() enables safe cross-origin communication",
        "Always set width, height, and title (accessibility)",
      ],
    },
    code: {
      language: "html",
      defaultCode: `<!-- ===== HTML Iframe Examples ===== -->

<h2>Basic Iframe</h2>

<iframe
  src="https://example.com"
  width="100%"
  height="300"
  title="Example Website"
  style="border: 1px solid #ccc; border-radius: 8px;"
></iframe>

<br><br>

<h2>Sandboxed Iframe</h2>

<iframe
  src="https://example.com"
  width="100%"
  height="200"
  title="Sandboxed content"
  sandbox="allow-scripts allow-same-origin"
  style="border: 1px solid #ccc; border-radius: 8px;"
></iframe>
<p><small>Cannot submit forms, open popups, or navigate parent.</small></p>

<br>

<h2>Iframe with Fallback</h2>

<iframe
  src="https://example.com"
  width="100%"
  height="200"
  title="Content with fallback"
  loading="lazy"
  style="border: 1px solid #ccc; border-radius: 8px;"
>
  <p>Your browser does not support iframes.
     <a href="https://example.com">Visit directly</a>.
  </p>
</iframe>

<br><br>

<h2>Attributes Reference</h2>
<table border="1" cellpadding="8" style="border-collapse: collapse; width: 100%;">
  <tr><th>Attribute</th><th>Purpose</th></tr>
  <tr><td>src</td><td>URL to embed</td></tr>
  <tr><td>title</td><td>Accessible name (required)</td></tr>
  <tr><td>width / height</td><td>Dimensions</td></tr>
  <tr><td>sandbox</td><td>Security restrictions</td></tr>
  <tr><td>allow</td><td>Feature permissions</td></tr>
  <tr><td>loading</td><td>"lazy" for deferred loading</td></tr>
</table>
`,
    },
    interviewQuestions: [
      {
        question: "What is the sandbox attribute and why is it important?",
        difficulty: "Medium",
        hint: "sandbox restricts iframe capabilities. Default blocks scripts, forms, popups, navigation. Selectively re-enable with allow-scripts, allow-forms. Critical for third-party content security.",
      },
      {
        question: "How can a parent page communicate with a cross-origin iframe?",
        difficulty: "Medium",
        hint: "postMessage() API. Parent calls iframe.contentWindow.postMessage(data, targetOrigin). Iframe listens with addEventListener('message'). Always specify exact targetOrigin (never '*'). Validate event.origin on receiving end.",
      },
      {
        question: "What are the performance implications of iframes?",
        difficulty: "Medium",
        hint: "Each iframe creates separate browsing context (memory overhead), makes additional HTTP requests, blocks parent load event. Mitigate with loading='lazy', srcdoc for inline HTML, dynamic creation, sandbox to prevent scripts.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 19. Semantic HTML Overview
  // ─────────────────────────────────────────────
  {
    id: "semantic-html-overview",
    title: "Semantic HTML Overview",
    slug: "semantic-html-overview",
    icon: "FileCode",
    difficulty: "Intermediate",
    description:
      "Understand why semantic HTML matters — how meaningful tags improve accessibility, SEO, and code maintainability.",
    concept: {
      explanation:
        "Semantic HTML means using HTML elements that carry meaning about the content they contain, rather than using generic <div> and <span> for everything. Elements like <header>, <nav>, <main>, <article>, <section>, <aside>, and <footer> tell the browser, search engines, and assistive technologies WHAT the content IS — not just how it looks. Before HTML5, developers used <div id='header'>, <div id='nav'>, <div class='sidebar'> — these convey zero meaning to machines. A screen reader seeing <div class='nav'> just says 'group' — but seeing <nav> it announces 'navigation'. Google's crawler understands <article> contains the primary content and <aside> is supplementary. Semantic HTML creates an 'outline' of your page that machines can parse. It also makes code self-documenting — another developer seeing <aside> immediately understands the purpose without reading CSS classes. The HTML5 spec introduced these semantic elements specifically to solve the 'div soup' problem of the early web. Using semantic HTML is not optional for professional development — it is a requirement for accessibility compliance (WCAG), SEO best practices, and maintainable code.",
      realLifeAnalogy:
        "Imagine a newspaper. It has clear sections: headline, navigation bar, main article, sidebar with related stories, and a footer with contact info. Each section is labelled and a reader instantly knows what each part is for. Now imagine the same newspaper where every section is printed in identical unmarked boxes — you would have to read everything to find what you need. That is the difference between semantic HTML and div soup. Semantic tags are the section labels that help everyone — readers, search engines, and screen readers — navigate efficiently.",
      keyPoints: [
        "Semantic elements describe their content's PURPOSE — <nav> means navigation, <article> means self-contained content",
        "Non-semantic elements (<div>, <span>) describe NOTHING — they are generic containers",
        "Accessibility: screen readers use semantic elements to create a navigable page outline",
        "SEO: search engines give more weight to content inside <article> and <main> than generic <div>",
        "Maintainability: semantic HTML is self-documenting — <header> is clearer than <div class='header'>",
        "HTML5 introduced semantic elements to replace the 'div soup' of Web 1.0",
        "Landmark roles are automatically assigned — <nav> gets role='navigation', <main> gets role='main'",
        "Screen reader users can jump between landmarks — header, nav, main, footer — like a table of contents",
      ],
    },
    code: {
      language: "html",
      defaultCode: `<!-- ===== Non-Semantic (Bad) vs Semantic (Good) ===== -->

<!-- ❌ NON-SEMANTIC — div soup -->
<!--
<div id="header">
  <div class="logo">My Site</div>
  <div class="nav">
    <div class="nav-item"><a href="/">Home</a></div>
    <div class="nav-item"><a href="/about">About</a></div>
  </div>
</div>
<div id="main-content">
  <div class="article">
    <div class="article-title">Blog Post</div>
    <div class="article-body">Content here...</div>
  </div>
  <div class="sidebar">Related links...</div>
</div>
<div id="footer">© 2024</div>
-->

<!-- ✅ SEMANTIC — meaningful structure -->
<header>
  <h1>My Site</h1>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <h2>Understanding Semantic HTML</h2>
    <p>Semantic HTML uses meaningful tags instead of generic divs.</p>
    <p>This improves accessibility, SEO, and code readability.</p>
  </article>

  <aside>
    <h3>Related Articles</h3>
    <ul>
      <li><a href="#">HTML5 New Features</a></li>
      <li><a href="#">Accessibility Guide</a></li>
    </ul>
  </aside>
</main>

<footer>
  <p>&copy; 2024 My Site. All rights reserved.</p>
</footer>

<!--
  Screen reader navigation:
  - "Header landmark" → jumps to <header>
  - "Navigation landmark" → jumps to <nav>
  - "Main landmark" → jumps to <main>
  - "Footer landmark" → jumps to <footer>

  With div soup, none of this works.
-->
`,
    },
    interviewQuestions: [
      {
        question: "What is semantic HTML and why is it important?",
        difficulty: "Easy",
        hint: "Semantic HTML uses elements that describe their content's meaning (<header>, <nav>, <article>, <footer>) instead of generic containers (<div>, <span>). Benefits: (1) Accessibility — screen readers announce landmarks and create a navigable page outline. (2) SEO — search engines understand page structure and prioritize content in <main>/<article>. (3) Maintainability — code is self-documenting. (4) Standards compliance — required by WCAG for accessibility.",
      },
      {
        question: "What is the difference between <div class='nav'> and <nav>? Why does it matter?",
        difficulty: "Easy",
        hint: "<div class='nav'> is meaningless to browsers, screen readers, and search engines — it is just a styled container. <nav> is a semantic landmark — screen readers announce 'navigation' and let users jump to it. Search engines understand it contains navigation links. The class name 'nav' is only meaningful to developers reading the code. The semantic element communicates meaning to MACHINES, not just humans.",
      },
      {
        question: "How do semantic HTML elements improve SEO?",
        difficulty: "Medium",
        hint: "Search engines use semantic elements to understand page structure: <main> identifies primary content (more ranking weight), <article> marks self-contained content (can appear in search snippets), <nav> identifies navigation (usually excluded from content indexing), <aside> marks supplementary content (lower weight). Google's crawler can extract structured data more accurately from semantic HTML. Pages with proper semantic structure tend to rank better because the crawler understands content hierarchy. Rich snippets and featured snippets often rely on semantic HTML structure.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 20. Header Tag
  // ─────────────────────────────────────────────
  {
    id: "html-header-tag",
    title: "Header Tag",
    slug: "html-header-tag",
    icon: "Heading",
    difficulty: "Intermediate",
    description:
      "Learn the <header> element — the semantic container for introductory content, logos, navigation, and headings.",
    concept: {
      explanation:
        "The <header> element represents introductory content or a set of navigational aids. It typically contains the site logo, site title, primary navigation, search bar, or login buttons. A page can have MULTIPLE <header> elements — one for the page-level header and one inside each <article> or <section> for that section's introductory content. The page-level <header> automatically gets the ARIA landmark role 'banner', which lets screen reader users jump directly to the site header. However, <header> inside <article> or <section> does NOT get the banner role — it is just a semantic grouping within that context. <header> should not contain another <header> or a <footer>. Before HTML5, developers used <div id='header'> which carried zero semantic meaning — screen readers and search engines could not distinguish it from any other div. Using <header> explicitly communicates 'this is the introductory/navigational area' to all consumers of the HTML.",
      realLifeAnalogy:
        "Think of the header like the masthead of a newspaper — the top section with the newspaper name, date, edition, and navigation to different sections. Every newspaper has one. Individual articles within the newspaper can also have their own mini-headers (article title, author, date). The <header> element works the same way — a page header for the site, and optional headers within articles for their introductory info.",
      keyPoints: [
        "<header> contains introductory content — logo, title, nav, search, login",
        "Page-level <header> gets ARIA role='banner' — a landmark for screen readers",
        "Multiple <header> elements are valid — one per page, one per article/section",
        "<header> inside <article>/<section> does NOT get the banner landmark role",
        "Cannot nest <header> inside another <header> or inside <footer>",
        "Replaces the old <div id='header'> pattern with semantic meaning",
        "Screen readers let users jump to 'banner' landmark for quick page navigation",
        "SEO: search engines identify the site branding area from <header>",
      ],
    },
    code: {
      language: "html",
      defaultCode: `<!-- ===== Page-Level Header ===== -->

<header style="background: #1e293b; color: white; padding: 16px 24px;">
  <div style="display: flex; justify-content: space-between; align-items: center;">
    <h1 style="margin: 0; font-size: 20px;">🌐 MySite</h1>
    <nav>
      <a href="/" style="color: #93c5fd; margin-right: 16px;">Home</a>
      <a href="/blog" style="color: #93c5fd; margin-right: 16px;">Blog</a>
      <a href="/about" style="color: #93c5fd;">About</a>
    </nav>
  </div>
</header>


<!-- ===== Article with its own Header ===== -->

<main style="padding: 24px;">

  <article style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 16px;">
    <header>
      <h2 style="margin-top: 0;">Understanding Semantic HTML</h2>
      <p style="color: #64748b; font-size: 14px;">
        By Jane Developer &bull; March 4, 2026 &bull; 5 min read
      </p>
    </header>
    <p>Semantic HTML uses meaningful tags to describe content structure...</p>
  </article>

  <article style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px;">
    <header>
      <h2 style="margin-top: 0;">CSS Grid vs Flexbox</h2>
      <p style="color: #64748b; font-size: 14px;">
        By John Coder &bull; March 1, 2026 &bull; 8 min read
      </p>
    </header>
    <p>When choosing between Grid and Flexbox, consider the layout type...</p>
  </article>

</main>

<!--
  Accessibility:
  - The page <header> gets role="banner" automatically
  - Screen readers: "Banner landmark — MySite"
  - Article headers do NOT get banner role — they are section-scoped
-->
`,
    },
    interviewQuestions: [
      {
        question: "Can a page have multiple <header> elements? When would you use more than one?",
        difficulty: "Easy",
        hint: "Yes. A page can have one page-level <header> (for site branding, nav) and additional <header> elements inside <article> or <section> elements (for article title, author, date). The page-level <header> gets the 'banner' ARIA role. Nested headers do not get this role — they are just semantic groupings within their parent.",
      },
      {
        question: "What ARIA landmark role does <header> automatically receive? What is the condition?",
        difficulty: "Medium",
        hint: "A <header> that is a direct child of <body> (or not nested inside <article>, <aside>, <section>, <nav>) automatically gets role='banner'. This means screen readers can jump to it as a landmark. A <header> nested inside <article> or <section> does NOT get the banner role — it is just a semantic container within that section. Only one banner landmark should exist per page.",
      },
      {
        question: "What is the difference between <header> and <head>?",
        difficulty: "Easy",
        hint: "<head> is a metadata container — it holds <title>, <meta>, <link>, <script> tags and is NOT displayed on the page. <header> is a semantic body element — it is VISIBLE and contains introductory content like logos, navigation, and headings. <head> appears before <body>; <header> appears inside <body>. They are completely unrelated despite the similar names.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 21. Navigation Tag
  // ─────────────────────────────────────────────
  {
    id: "html-nav-tag",
    title: "Navigation Tag",
    slug: "html-nav-tag",
    icon: "Route",
    difficulty: "Intermediate",
    description:
      "Learn the <nav> element — the semantic container for major navigation blocks like menus, breadcrumbs, and table of contents.",
    concept: {
      explanation:
        "The <nav> element represents a section of the page that contains navigation links — to other pages on the site or to sections within the current page. It automatically receives the ARIA landmark role 'navigation', allowing screen reader users to jump directly to it. A page can have multiple <nav> elements — e.g., a primary nav in the header, a sidebar nav, a breadcrumb nav, and a footer nav. When multiple <nav> elements exist, use aria-label to distinguish them: <nav aria-label='Primary'> and <nav aria-label='Footer'>. Not every group of links needs <nav> — it is specifically for MAJOR navigation blocks. A list of links in a blog post body or a set of social media links in a footer are typically not worth wrapping in <nav>. The <nav> element usually contains a <ul> list of <li><a> links, which is the most accessible pattern for navigation. Screen readers announce 'navigation landmark' and the number of items, allowing efficient page exploration.",
      realLifeAnalogy:
        "Think of a shopping mall directory — the big map board at the entrance that shows you where every store is. That is the <nav> element. It does not contain the stores themselves, just the links (directions) to get there. A mall might have multiple directories: one at the main entrance, one at each floor, one near the food court. Similarly, a page can have multiple <nav> elements for different navigation contexts.",
      keyPoints: [
        "<nav> wraps major navigation blocks — menus, breadcrumbs, table of contents",
        "Automatically gets ARIA role='navigation' — a landmark for screen readers",
        "Multiple <nav> elements are valid — use aria-label to distinguish them",
        "Best practice: <nav> contains <ul> → <li> → <a> for accessible link lists",
        "Not every group of links needs <nav> — only MAJOR navigation sections",
        "Screen readers let users jump between navigation landmarks",
        "SEO: search engines identify navigation and may exclude it from main content indexing",
        "Common uses: main menu, sidebar menu, breadcrumbs, pagination, footer links",
      ],
    },
    code: {
      language: "html",
      defaultCode: `<!-- ===== Primary Navigation ===== -->

<header style="background: #1e293b; padding: 16px 24px;">
  <nav aria-label="Primary">
    <ul style="list-style: none; margin: 0; padding: 0; display: flex; gap: 20px;">
      <li><a href="/" style="color: #93c5fd; text-decoration: none;">Home</a></li>
      <li><a href="/products" style="color: #93c5fd; text-decoration: none;">Products</a></li>
      <li><a href="/blog" style="color: #93c5fd; text-decoration: none;">Blog</a></li>
      <li><a href="/contact" style="color: #93c5fd; text-decoration: none;">Contact</a></li>
    </ul>
  </nav>
</header>


<!-- ===== Breadcrumb Navigation ===== -->

<nav aria-label="Breadcrumb" style="padding: 12px 24px; font-size: 14px;">
  <ol style="list-style: none; margin: 0; padding: 0; display: flex; gap: 8px;">
    <li><a href="/">Home</a></li>
    <li>/</li>
    <li><a href="/blog">Blog</a></li>
    <li>/</li>
    <li aria-current="page"><strong>Semantic HTML</strong></li>
  </ol>
</nav>


<!-- ===== Sidebar Navigation ===== -->

<aside style="padding: 24px;">
  <nav aria-label="Sidebar">
    <h3>Categories</h3>
    <ul>
      <li><a href="/html">HTML</a></li>
      <li><a href="/css">CSS</a></li>
      <li><a href="/js">JavaScript</a></li>
      <li><a href="/react">React</a></li>
    </ul>
  </nav>
</aside>


<!--
  Screen reader announces:
  - "Primary navigation landmark, 4 items"
  - "Breadcrumb navigation landmark"
  - "Sidebar navigation landmark, 4 items"

  Users can jump between these landmarks instantly.
-->
`,
    },
    interviewQuestions: [
      {
        question: "When should you use <nav> and when is it unnecessary?",
        difficulty: "Easy",
        hint: "Use <nav> for MAJOR navigation blocks: primary menu, sidebar navigation, breadcrumbs, pagination, footer site links. Do NOT use <nav> for every group of links — a few social media links, a list of references in a blog post, or inline links in text do not warrant <nav>. The rule: if a screen reader user would benefit from jumping to this navigation section as a landmark, use <nav>.",
      },
      {
        question: "How do you handle multiple <nav> elements on the same page?",
        difficulty: "Medium",
        hint: "Use aria-label to give each <nav> a unique name: <nav aria-label='Primary'>, <nav aria-label='Breadcrumb'>, <nav aria-label='Footer'>. Screen readers announce the label when listing landmarks, so users can distinguish between them. Without labels, screen readers just say 'navigation' for each one, which is confusing. aria-labelledby can also reference a heading inside the nav.",
      },
      {
        question: "What is the recommended HTML pattern for accessible navigation?",
        difficulty: "Medium",
        hint: "<nav> containing an unordered list (<ul>) of list items (<li>) with anchor links (<a>). This pattern: (1) conveys the number of items to screen readers, (2) allows keyboard navigation with Tab, (3) is understood by all assistive technologies. For breadcrumbs, use <ol> (ordered list) since order matters. Add aria-current='page' to the current page link. Screen readers announce 'list, 5 items' helping users understand the navigation scope.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 22. Section Tag
  // ─────────────────────────────────────────────
  {
    id: "html-section-tag",
    title: "Section Tag",
    slug: "html-section-tag",
    icon: "Layers",
    difficulty: "Intermediate",
    description:
      "Learn the <section> element — the semantic container for thematic groupings of content with their own heading.",
    concept: {
      explanation:
        "The <section> element represents a thematic grouping of content — a distinct section that would logically appear as an entry in a document's outline or table of contents. Every <section> should have a heading (<h1>–<h6>) as a child. If content does not have a natural heading, <section> might not be the right element — use <div> instead. <section> is NOT a generic container for styling — that is <div>'s job. Use <section> when the content forms a logical section: chapters, tabbed content panels, numbered sections of a thesis, or thematic groups on a homepage (features, testimonials, pricing). <section> gets the ARIA role 'region' ONLY when it has an accessible name (via aria-label or aria-labelledby). Without a name, screen readers treat it as a generic container. This is why a heading or aria-label is important. The difference between <section> and <article>: an <article> is self-contained and independently distributable; a <section> is a thematic group that is part of a larger whole.",
      realLifeAnalogy:
        "Think of a textbook. Each chapter is a <section> — it has a heading, a theme, and is part of the larger book. You would list each chapter in the table of contents. If content would not appear in a table of contents, it probably should not be a <section>. An <article> would be like a detachable handout that makes sense even outside the textbook.",
      keyPoints: [
        "<section> groups thematic content — should appear in a document outline",
        "Every <section> should have a heading (<h1>–<h6>) as a child",
        "NOT a generic wrapper — use <div> for non-thematic visual grouping",
        "Gets ARIA role='region' only when given an accessible name (aria-label/aria-labelledby)",
        "<section> vs <article>: section = thematic part of a whole; article = self-contained content",
        "<section> vs <div>: section has semantic meaning; div is purely for styling/layout",
        "Common uses: homepage sections (Hero, Features, Pricing), document chapters, tab panels",
        "Multiple <section> elements create the document outline — browsers and screen readers can build a ToC",
      ],
    },
    code: {
      language: "html",
      defaultCode: `<!-- ===== Homepage with Semantic Sections ===== -->

<header style="text-align: center; padding: 40px 20px; background: #eff6ff;">
  <h1>My Product</h1>
  <p>The best solution for your needs.</p>
</header>

<main>

  <!-- Features Section -->
  <section style="padding: 30px 20px;">
    <h2>Features</h2>
    <ul>
      <li><strong>Fast</strong> — Loads in under 1 second</li>
      <li><strong>Secure</strong> — End-to-end encryption</li>
      <li><strong>Simple</strong> — No learning curve</li>
    </ul>
  </section>

  <!-- Testimonials Section -->
  <section style="padding: 30px 20px; background: #f8fafc;">
    <h2>What Users Say</h2>
    <blockquote>
      <p>"This product changed how I work."</p>
      <footer>— Alice, Developer</footer>
    </blockquote>
    <blockquote>
      <p>"Simple and effective. Highly recommend."</p>
      <footer>— Bob, Designer</footer>
    </blockquote>
  </section>

  <!-- Pricing Section -->
  <section style="padding: 30px 20px;">
    <h2>Pricing</h2>
    <div style="display: flex; gap: 16px; flex-wrap: wrap;">
      <div style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; flex: 1; min-width: 150px;">
        <h3>Free</h3>
        <p>$0/month</p>
      </div>
      <div style="border: 2px solid #3b82f6; border-radius: 8px; padding: 20px; flex: 1; min-width: 150px;">
        <h3>Pro</h3>
        <p>$9/month</p>
      </div>
    </div>
  </section>

</main>

<!--
  Document outline:
  1. My Product (h1)
    1.1 Features (h2)
    1.2 What Users Say (h2)
    1.3 Pricing (h2)

  Each <section> appears as a heading in the outline.
-->
`,
    },
    interviewQuestions: [
      {
        question: "When should you use <section> versus <div>?",
        difficulty: "Easy",
        hint: "Use <section> when content forms a thematic group that would appear in a table of contents — it should have a heading. Use <div> for non-semantic grouping needed only for styling or layout (flex container, grid wrapper, card shell). Test: if you would give the group a heading in an outline, use <section>. If it is purely visual, use <div>.",
      },
      {
        question: "What is the difference between <section> and <article>?",
        difficulty: "Medium",
        hint: "<section> is a thematic grouping that is part of a larger whole — e.g., a 'Features' section on a homepage. <article> is self-contained content that makes sense independently — a blog post, news article, or comment. Test: would the content make sense if extracted and displayed on another site (RSS feed, social media)? If yes, use <article>. If it only makes sense within the current page context, use <section>. Articles can contain sections, and sections can contain articles.",
      },
      {
        question: "Does <section> create an ARIA landmark? Under what condition?",
        difficulty: "Medium",
        hint: "<section> gets the ARIA role='region' ONLY when it has an accessible name via aria-label or aria-labelledby. Without a name, screen readers treat it as a generic container. Best practice: <section aria-labelledby='features-heading'><h2 id='features-heading'>Features</h2>...</section>. This creates a 'Features region' landmark that screen reader users can jump to.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 23. Article Tag
  // ─────────────────────────────────────────────
  {
    id: "html-article-tag",
    title: "Article Tag",
    slug: "html-article-tag",
    icon: "FileText",
    difficulty: "Intermediate",
    description:
      "Learn the <article> element — the semantic container for self-contained content that can be independently distributed.",
    concept: {
      explanation:
        "The <article> element represents self-contained, independently distributable content. The key test: would this content make sense if it appeared on its own — in an RSS feed, a social media card, a search result snippet, or a syndicated news article? If yes, it should be an <article>. Common uses: blog posts, news articles, user comments, forum posts, product cards, social media posts, and interactive widgets. An <article> typically has its own <header> (title, author, date), body content, and optional <footer> (tags, share buttons). Articles can be nested — a blog post <article> can contain comment <article> elements. <article> gets the ARIA role 'article', and screen readers announce it as an independent content unit. For SEO, Google identifies <article> content as the primary content of the page — it may be used for featured snippets, Google News, and AMP pages. Schema.org structured data often maps to <article> elements.",
      realLifeAnalogy:
        "Think of a newspaper article. You can cut it out, share it with someone, post it on a bulletin board, or send it to another newspaper — it makes complete sense on its own. That is an <article>. A 'Features' section on a homepage is NOT an article because it does not make sense outside of that page context — that is a <section>.",
      keyPoints: [
        "<article> is for self-contained, independently distributable content",
        "Test: would it make sense in an RSS feed or on another site? If yes → <article>",
        "Gets ARIA role='article' — screen readers identify it as independent content",
        "Common uses: blog posts, news articles, comments, product cards, forum posts",
        "Can contain its own <header> and <footer> for metadata",
        "Articles can be nested — a post <article> with comment <article> children",
        "SEO: Google may extract <article> content for rich snippets and Google News",
        "<article> vs <section>: article is self-contained; section is a thematic part of a larger page",
      ],
    },
    code: {
      language: "html",
      defaultCode: `<!-- ===== Blog Post as Article ===== -->

<main style="max-width: 700px; margin: 0 auto; padding: 20px;">

  <article>
    <header>
      <h1>Why Semantic HTML Matters in 2026</h1>
      <p style="color: #64748b; font-size: 14px;">
        By Jane Developer &bull; March 4, 2026 &bull; 5 min read
      </p>
    </header>

    <p>Semantic HTML is not just about best practices — it directly impacts
       your site's accessibility, SEO ranking, and code maintainability.</p>

    <h2>Accessibility Benefits</h2>
    <p>Screen readers use semantic elements to create a navigable outline...</p>

    <h2>SEO Benefits</h2>
    <p>Search engines prioritize content inside semantic elements...</p>

    <footer style="border-top: 1px solid #e2e8f0; margin-top: 20px; padding-top: 12px;">
      <p style="font-size: 12px; color: #64748b;">
        Tags: <a href="#">HTML</a>, <a href="#">Accessibility</a>, <a href="#">SEO</a>
      </p>
    </footer>
  </article>

  <hr>

  <!-- Comments — nested articles -->
  <section>
    <h2>Comments (2)</h2>

    <article style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
      <header>
        <strong>Alice</strong>
        <time style="color: #64748b; font-size: 12px; margin-left: 8px;">2 hours ago</time>
      </header>
      <p>Great article! I switched from div soup to semantic HTML last week.</p>
    </article>

    <article style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px;">
      <header>
        <strong>Bob</strong>
        <time style="color: #64748b; font-size: 12px; margin-left: 8px;">1 hour ago</time>
      </header>
      <p>The SEO impact is huge. My site ranking improved after refactoring.</p>
    </article>

  </section>

</main>

<!--
  This entire blog post <article> makes sense on its own —
  it could appear in an RSS feed or be shared independently.
  Each comment is also a self-contained <article>.
-->
`,
    },
    interviewQuestions: [
      {
        question: "How do you decide between <article> and <section>?",
        difficulty: "Easy",
        hint: "Ask: 'Would this content make sense if extracted and displayed independently — in an RSS feed, a social media embed, or on another website?' If yes, use <article>. If the content is a thematic group that only makes sense within the current page (like a 'Features' section), use <section>. Articles can contain sections (chapters of a post) and sections can contain articles (a 'Latest Posts' section with article cards).",
      },
      {
        question: "Can <article> elements be nested? Give an example.",
        difficulty: "Easy",
        hint: "Yes. A common pattern is a blog post <article> containing comment <article> elements. The blog post is self-contained content. Each comment is also self-contained — it has its own author, timestamp, and can be independently referenced. The nested articles represent independent units that happen to be related to the parent article.",
      },
      {
        question: "How does <article> affect SEO and Google search results?",
        difficulty: "Medium",
        hint: "Google identifies <article> as primary content and may use it for: (1) Featured snippets — content inside <article> is preferred for quick answers. (2) Google News — requires <article> for story identification. (3) AMP pages — rely on <article> for content parsing. (4) Rich results — structured data (JSON-LD) often maps to <article> elements. Using <article> helps search engines distinguish primary content from navigation, sidebars, and ads.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 24. Aside Tag
  // ─────────────────────────────────────────────
  {
    id: "html-aside-tag",
    title: "Aside Tag",
    slug: "html-aside-tag",
    icon: "MessageSquare",
    difficulty: "Intermediate",
    description:
      "Learn the <aside> element — the semantic container for content that is tangentially related to the surrounding content.",
    concept: {
      explanation:
        "The <aside> element represents content that is tangentially related to the content around it — content that could be considered separate from the main content. When used at the page level (outside <article>), it typically represents a sidebar: related links, advertisements, author bio, social media widgets. When used inside an <article>, it represents content related to the article but not essential — a pull quote, a glossary term, related statistics. <aside> automatically gets the ARIA landmark role 'complementary', allowing screen reader users to jump to it. The key distinction: aside content is supplementary — removing it would not change the meaning of the main content. Search engines understand <aside> contains secondary content and may give it lower ranking weight than <main> or <article> content. This helps prevent sidebar content from diluting the main topic signal.",
      realLifeAnalogy:
        "In a textbook, an aside is a sidebar box with 'Fun Fact' or 'Did You Know?' — interesting but not essential to the chapter's main topic. In a newspaper, it is the sidebar with related stories, ads, or the weather widget. You can skip the aside and still understand the main content perfectly. It adds context without being critical.",
      keyPoints: [
        "<aside> contains tangentially related content — supplementary, not essential",
        "Gets ARIA role='complementary' — a landmark for screen readers",
        "Page-level: sidebars, ads, related links, author bio, social widgets",
        "Inside <article>: pull quotes, glossary terms, related statistics",
        "Removing <aside> content should NOT change the meaning of the main content",
        "SEO: search engines give lower weight to <aside> — prevents sidebar content from diluting topic signal",
        "Screen reader users can skip the aside entirely when navigating by landmarks",
        "Common mistake: using <aside> for all sidebars — only use when content is truly supplementary",
      ],
    },
    code: {
      language: "html",
      defaultCode: `<!-- ===== Page Layout with Aside ===== -->

<div style="display: flex; gap: 24px; padding: 20px; flex-wrap: wrap;">

  <!-- Main content -->
  <main style="flex: 2; min-width: 300px;">
    <article>
      <h1>Understanding CSS Grid</h1>
      <p>CSS Grid is a two-dimensional layout system that lets you
         create complex layouts with rows and columns.</p>

      <!-- Aside INSIDE an article — related but not essential -->
      <aside style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 12px 16px; margin: 16px 0;">
        <p style="margin: 0; font-size: 14px;">
          <strong>Fun fact:</strong> CSS Grid was first proposed in 2011
          by Microsoft and shipped in all major browsers by 2017.
        </p>
      </aside>

      <p>Grid allows you to define template rows and columns...</p>
      <p>The key difference between Grid and Flexbox is dimensionality...</p>
    </article>
  </main>

  <!-- Aside at PAGE LEVEL — sidebar -->
  <aside style="flex: 1; min-width: 200px;">
    <div style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
      <h3 style="margin-top: 0;">Related Articles</h3>
      <ul style="padding-left: 20px;">
        <li><a href="#">CSS Flexbox Guide</a></li>
        <li><a href="#">Responsive Design</a></li>
        <li><a href="#">Media Queries</a></li>
      </ul>
    </div>

    <div style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px;">
      <h3 style="margin-top: 0;">About the Author</h3>
      <p style="font-size: 14px;">Jane is a frontend developer with 5 years of experience.</p>
    </div>
  </aside>

</div>

<!--
  Screen reader landmarks:
  - "Main landmark" → article content
  - "Complementary landmark" → sidebar
  Users can skip the sidebar entirely.
-->
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between <aside> at page level and inside an <article>?",
        difficulty: "Easy",
        hint: "At page level, <aside> is a sidebar — related links, ads, author bio, social widgets. It acts as the 'complementary' landmark. Inside an <article>, <aside> is tangentially related content — a pull quote, fun fact, glossary definition. Both are supplementary content that can be removed without affecting the main meaning, but they differ in scope.",
      },
      {
        question: "How does <aside> affect SEO compared to <main> or <article>?",
        difficulty: "Medium",
        hint: "Search engines give lower ranking weight to content inside <aside> because it is supplementary. This prevents sidebar navigation, ads, and related links from diluting the main topic signal. Content in <main> and <article> is prioritized for indexing and featured snippets. Using <aside> correctly helps search engines focus on your primary content rather than boilerplate sidebar elements that appear on every page.",
      },
      {
        question: "What ARIA landmark role does <aside> receive? Why is this useful?",
        difficulty: "Easy",
        hint: "<aside> automatically gets role='complementary'. Screen reader users navigating by landmarks can identify it as supplementary content and choose to skip it. When listing landmarks, the screen reader announces 'complementary' — users know this is secondary information. This is especially useful on pages with long sidebars — users can jump directly to <main> without reading through sidebar content.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 25. Footer Tag
  // ─────────────────────────────────────────────
  {
    id: "html-footer-tag",
    title: "Footer Tag",
    slug: "html-footer-tag",
    icon: "FileCode",
    difficulty: "Intermediate",
    description:
      "Learn the <footer> element — the semantic container for closing content like copyright, contact info, and site links.",
    concept: {
      explanation:
        "The <footer> element represents the footer of its nearest sectioning ancestor — the page, an <article>, a <section>, or an <aside>. A page-level <footer> typically contains copyright notices, contact information, site maps, legal links (privacy policy, terms), and social media links. An <article> footer might contain tags, author info, share buttons, or publication metadata. The page-level <footer> gets the ARIA landmark role 'contentinfo', allowing screen readers to jump to it. Like <header>, multiple <footer> elements are valid — one for the page and one inside each article or section. <footer> should NOT contain another <footer> or <header>. A common misconception: <footer> does not have to be at the bottom of the page visually — it semantically means 'closing/supplementary information for this section'. It often IS at the bottom, but CSS can position it anywhere. SEO benefit: search engines identify footer content and may reduce its ranking weight, preventing boilerplate footer links from affecting page topic signals.",
      realLifeAnalogy:
        "Think of the credits at the end of a movie — copyright, studio name, production team, legal disclaimers. Every movie has them, they are always at the end, and they are supplementary to the actual film. A website footer works the same way — copyright, company info, legal links, contact details. Each article also has its own 'credits' — tags, author, share buttons — like the byline at the end of a newspaper article.",
      keyPoints: [
        "<footer> contains closing content — copyright, contact, legal links, site map",
        "Page-level <footer> gets ARIA role='contentinfo' — a landmark for screen readers",
        "Multiple <footer> elements are valid — one per page, one per article/section",
        "<footer> inside <article> contains article metadata — tags, author, share buttons",
        "Cannot nest <footer> inside another <footer> or <header>",
        "Does not have to be at the bottom visually — it is a semantic designation",
        "SEO: footer content is given lower ranking weight — prevents boilerplate link dilution",
        "Common content: © copyright, privacy policy, terms of service, social links, newsletter signup",
      ],
    },
    code: {
      language: "html",
      defaultCode: `<!-- ===== Article Footer ===== -->

<main style="max-width: 700px; margin: 0 auto; padding: 20px;">
  <article>
    <h1>How to Learn HTML in 2026</h1>
    <p>Start with the basics — document structure, elements, and attributes.
       Then move to semantic HTML and forms.</p>

    <!-- Article footer — metadata about this specific article -->
    <footer style="border-top: 1px solid #e2e8f0; margin-top: 20px; padding-top: 12px;">
      <p style="font-size: 12px; color: #64748b;">
        Published: <time datetime="2026-03-04">March 4, 2026</time> &bull;
        Category: <a href="#">Web Development</a> &bull;
        Tags: <a href="#">HTML</a>, <a href="#">Beginners</a>
      </p>
    </footer>
  </article>
</main>


<!-- ===== Page-Level Footer ===== -->

<footer style="background: #1e293b; color: #94a3b8; padding: 30px 24px; margin-top: 40px;">
  <div style="display: flex; gap: 40px; flex-wrap: wrap; margin-bottom: 20px;">

    <div>
      <h3 style="color: white; margin-top: 0;">Company</h3>
      <ul style="list-style: none; padding: 0; font-size: 14px;">
        <li><a href="/about" style="color: #94a3b8;">About Us</a></li>
        <li><a href="/careers" style="color: #94a3b8;">Careers</a></li>
        <li><a href="/blog" style="color: #94a3b8;">Blog</a></li>
      </ul>
    </div>

    <div>
      <h3 style="color: white; margin-top: 0;">Legal</h3>
      <ul style="list-style: none; padding: 0; font-size: 14px;">
        <li><a href="/privacy" style="color: #94a3b8;">Privacy Policy</a></li>
        <li><a href="/terms" style="color: #94a3b8;">Terms of Service</a></li>
      </ul>
    </div>

    <div>
      <h3 style="color: white; margin-top: 0;">Connect</h3>
      <ul style="list-style: none; padding: 0; font-size: 14px;">
        <li><a href="#" style="color: #94a3b8;">Twitter</a></li>
        <li><a href="#" style="color: #94a3b8;">GitHub</a></li>
      </ul>
    </div>

  </div>

  <p style="text-align: center; font-size: 12px; border-top: 1px solid #334155; padding-top: 16px;">
    &copy; 2026 MySite. All rights reserved.
  </p>
</footer>
`,
    },
    interviewQuestions: [
      {
        question: "Can a page have multiple <footer> elements? What are the use cases?",
        difficulty: "Easy",
        hint: "Yes. A page can have one page-level <footer> (copyright, site links) and additional <footer> elements inside <article> or <section> elements (article tags, author info, share buttons). The page-level footer gets role='contentinfo'. Article/section footers do not get this role — they are scoped to their parent.",
      },
      {
        question: "What ARIA landmark does a page-level <footer> receive?",
        difficulty: "Easy",
        hint: "Page-level <footer> (not nested inside article/section/aside/nav) receives role='contentinfo'. Screen readers announce it as 'content information landmark'. Users can jump to it directly. A <footer> nested inside <article> or <section> does NOT receive this role.",
      },
      {
        question: "What content typically belongs in a page footer vs. being in the main content?",
        difficulty: "Medium",
        hint: "Footer: copyright notice, privacy/terms links, site map, contact info, social media links, newsletter signup — boilerplate that appears on every page. Main content: anything unique to the current page. Test: if it repeats on every page of the site, it probably belongs in the footer. Search engines reduce ranking weight for footer content to prevent boilerplate links from affecting page topic signals.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 26. Main Tag
  // ─────────────────────────────────────────────
  {
    id: "html-main-tag",
    title: "Main Tag",
    slug: "html-main-tag",
    icon: "Code",
    difficulty: "Intermediate",
    description:
      "Learn the <main> element — the semantic container for the primary content unique to each page.",
    concept: {
      explanation:
        "The <main> element represents the dominant, unique content of the page — the content directly related to or expanding upon the page's central topic. It excludes content that repeats across pages like site headers, navigation, sidebars, and footers. There should be only ONE visible <main> per page (hidden <main> elements are allowed for single-page apps). <main> automatically gets the ARIA landmark role 'main', which is the most important landmark for accessibility — screen readers let users skip navigation and jump directly to the main content with one keystroke. This solves the classic 'skip to content' problem. <main> should NOT be a descendant of <article>, <aside>, <footer>, <header>, or <nav>. It sits at the top level of <body>, between the site header and footer. For SEO, Google identifies <main> as the primary content area — content inside is given the highest ranking weight. This is where your unique, valuable content belongs.",
      realLifeAnalogy:
        "Think of a restaurant menu. The <main> element is the food — the entrées, appetizers, desserts. Everything else — the restaurant name, location, hours, social media links — is supplementary. Customers come for the food (main content), not the address (header/footer). The <main> tag tells search engines and screen readers: 'This is why people visit this page.'",
      keyPoints: [
        "<main> contains the primary, unique content of each page",
        "Only ONE visible <main> per page — the most important content area",
        "Automatically gets ARIA role='main' — THE primary landmark for screen readers",
        "Screen readers let users jump to <main> instantly — solves 'skip to content'",
        "Must NOT be inside <article>, <aside>, <footer>, <header>, or <nav>",
        "SEO: content inside <main> gets highest ranking weight from search engines",
        "Excludes repeating content — nav, sidebar, footer belong outside <main>",
        "In SPAs, only one <main> should be visible at a time (others can be hidden)",
      ],
    },
    code: {
      language: "html",
      defaultCode: `<!-- ===== Proper Page Structure with <main> ===== -->

<!-- Skip to content link (for keyboard users) -->
<a href="#main-content"
   style="position: absolute; top: -100px; left: 0; background: #3b82f6; color: white; padding: 8px 16px; z-index: 100;"
   onfocus="this.style.top='0'"
   onblur="this.style.top='-100px'">
  Skip to main content
</a>

<!-- Site header — repeats on every page -->
<header style="background: #1e293b; color: white; padding: 12px 24px;">
  <nav>
    <a href="/" style="color: #93c5fd; margin-right: 16px;">Home</a>
    <a href="/blog" style="color: #93c5fd; margin-right: 16px;">Blog</a>
    <a href="/about" style="color: #93c5fd;">About</a>
  </nav>
</header>

<!-- MAIN — unique content for THIS page only -->
<main id="main-content" style="max-width: 800px; margin: 0 auto; padding: 24px;">

  <h1>Getting Started with Semantic HTML</h1>

  <p>This guide covers everything you need to know about using
     semantic elements in your HTML.</p>

  <section>
    <h2>Why It Matters</h2>
    <p>Semantic HTML improves accessibility, SEO, and maintainability.</p>
  </section>

  <section>
    <h2>Key Elements</h2>
    <p>The most important semantic elements are header, nav, main,
       article, section, aside, and footer.</p>
  </section>

</main>

<!-- Site footer — repeats on every page -->
<footer style="background: #f1f5f9; padding: 16px 24px; text-align: center; font-size: 12px;">
  <p>&copy; 2026 MySite. All rights reserved.</p>
</footer>

<!--
  <main> contains ONLY the unique content.
  Header, nav, and footer are OUTSIDE <main>
  because they repeat on every page.
-->
`,
    },
    interviewQuestions: [
      {
        question: "Why should there be only one visible <main> element per page?",
        difficulty: "Easy",
        hint: "The <main> element represents THE dominant content of the page. Having multiple visible <main> elements creates confusion for screen readers — which one is the primary content? The ARIA role='main' should appear once. In SPAs, you can have multiple <main> elements if only one is visible at a time (others hidden with CSS or the hidden attribute). The spec requires no more than one visible <main>.",
      },
      {
        question: "How does <main> solve the 'skip to content' accessibility problem?",
        difficulty: "Medium",
        hint: "Before semantic HTML, keyboard/screen reader users had to Tab through every navigation link before reaching the page content. <main> with role='main' lets screen readers jump directly to the primary content with one keystroke. Additionally, adding a 'skip to main content' link at the top of the page (<a href='#main-content'>Skip to content</a>) lets keyboard users bypass navigation. The <main id='main-content'> serves as the target. This is a WCAG requirement.",
      },
      {
        question: "What should NOT be inside the <main> element?",
        difficulty: "Easy",
        hint: "Content that repeats across pages: site header, primary navigation, sidebar, footer, copyright notice. These belong outside <main>. The <main> element should only contain content unique to the current page — the blog post, the product details, the search results. Test: if this content appears on every page of the site, it does not belong in <main>.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 27. Figure and Figcaption
  // ─────────────────────────────────────────────
  {
    id: "html-figure-figcaption",
    title: "Figure and Figcaption",
    slug: "html-figure-figcaption",
    icon: "Image",
    difficulty: "Intermediate",
    description:
      "Learn the <figure> and <figcaption> elements — semantic containers for self-contained media with captions.",
    concept: {
      explanation:
        "The <figure> element represents self-contained content — typically an image, illustration, diagram, code snippet, or table — that is referenced in the main text but could be moved to an appendix without affecting the text flow. <figcaption> is the optional caption for a <figure> — it must be the first or last child of <figure>. Together they create a semantic association between media and its description. This is fundamentally different from an image with a paragraph below it — <figure>/<figcaption> tells browsers, screen readers, and search engines that the caption BELONGS to the figure. Screen readers announce 'figure' and read the figcaption as the figure's accessible name. For SEO, Google can associate caption text with images for better image search ranking. <figure> is NOT limited to images — it can contain code blocks, tables, charts, videos, audio, quotes, or any content that is referenced from the main text. Multiple media elements can share one <figure> and one <figcaption>.",
      realLifeAnalogy:
        "In a textbook, figures are numbered: 'Figure 3.1: The water cycle diagram'. The diagram and its caption are a single unit — they belong together. If you move the diagram to an appendix, the caption goes with it. This is what <figure> and <figcaption> create — a semantic bond between content and its description that stays together regardless of where it appears.",
      keyPoints: [
        "<figure> wraps self-contained content referenced in the main text",
        "<figcaption> provides a caption — must be first or last child of <figure>",
        "Creates a semantic association between media and its description",
        "Not limited to images — can wrap code, tables, charts, videos, quotes",
        "Screen readers announce 'figure' and read figcaption as accessible name",
        "SEO: Google associates caption text with images for image search ranking",
        "Content should be movable to an appendix without breaking the main text flow",
        "Multiple images can share one <figure> and one <figcaption>",
      ],
    },
    code: {
      language: "html",
      defaultCode: `<!-- ===== Figure with Image ===== -->

<article style="max-width: 700px; margin: 0 auto; padding: 20px;">
  <h1>The Solar System</h1>
  <p>Our solar system contains eight planets orbiting the Sun.</p>

  <!-- Image figure -->
  <figure style="text-align: center; margin: 24px 0;">
    <img
      src="https://via.placeholder.com/600x300?text=Solar+System+Diagram"
      alt="Diagram showing the eight planets of our solar system in order from the Sun"
      style="max-width: 100%; border-radius: 8px;"
    >
    <figcaption style="color: #64748b; font-size: 13px; margin-top: 8px; font-style: italic;">
      Figure 1: The eight planets of our solar system, shown in order from the Sun.
    </figcaption>
  </figure>

  <p>As shown in Figure 1, the inner planets are rocky while the outer planets are gas giants.</p>


  <!-- Code figure -->
  <figure style="margin: 24px 0;">
    <pre style="background: #1e293b; color: #e2e8f0; padding: 16px; border-radius: 8px; overflow-x: auto;">
&lt;nav&gt;
  &lt;ul&gt;
    &lt;li&gt;&lt;a href="/"&gt;Home&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="/about"&gt;About&lt;/a&gt;&lt;/li&gt;
  &lt;/ul&gt;
&lt;/nav&gt;</pre>
    <figcaption style="color: #64748b; font-size: 13px; margin-top: 8px; font-style: italic;">
      Figure 2: Accessible navigation pattern using semantic HTML.
    </figcaption>
  </figure>


  <!-- Blockquote figure -->
  <figure style="margin: 24px 0; border-left: 4px solid #3b82f6; padding-left: 16px;">
    <blockquote style="margin: 0; font-style: italic; font-size: 18px;">
      "The web is for everyone, and collectively we hold the power to change it."
    </blockquote>
    <figcaption style="color: #64748b; font-size: 13px; margin-top: 8px;">
      — Tim Berners-Lee, inventor of the World Wide Web
    </figcaption>
  </figure>


  <!-- Multiple images in one figure -->
  <figure style="text-align: center; margin: 24px 0;">
    <div style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap;">
      <img src="https://via.placeholder.com/150?text=Before" alt="Before redesign" style="border-radius: 4px;">
      <img src="https://via.placeholder.com/150?text=After" alt="After redesign" style="border-radius: 4px;">
    </div>
    <figcaption style="color: #64748b; font-size: 13px; margin-top: 8px; font-style: italic;">
      Figure 3: Website before and after the semantic HTML redesign.
    </figcaption>
  </figure>

</article>
`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between using <figure>/<figcaption> versus an <img> with a <p> below it?",
        difficulty: "Easy",
        hint: "With <img> + <p>, there is no semantic relationship — the browser, screen readers, and search engines do not know the paragraph is a caption for the image. With <figure>/<figcaption>, the caption is semantically associated with the figure. Screen readers announce 'figure' and read the figcaption as its accessible name. Google can use figcaption text for image search ranking. The semantic relationship persists even if the figure is moved.",
      },
      {
        question: "Can <figure> be used for content other than images?",
        difficulty: "Easy",
        hint: "Yes. <figure> can wrap any self-contained content referenced in the main text: code snippets, data tables, charts, diagrams, videos, audio clips, blockquotes, poems, or mathematical equations. The spec defines <figure> as 'content that is typically referenced as a single unit from the main flow of the document'. If you would label it 'Figure X' in an academic paper, it can be a <figure>.",
      },
      {
        question: "Where must <figcaption> be placed within <figure>?",
        difficulty: "Medium",
        hint: "<figcaption> must be the first or last child of <figure> — not in the middle between other elements. Only one <figcaption> is allowed per <figure>. If placed first, it appears as a title above the content. If placed last, it appears as a caption below — the more common pattern. <figcaption> is optional — a <figure> can exist without a caption. The figcaption becomes the figure's accessible name for screen readers.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Level 4 — Media Elements
  // ─────────────────────────────────────────────

  // ─────────────────────────────────────────────
  // 1. HTML Audio
  // ─────────────────────────────────────────────
  {
    id: "html-audio",
    title: "HTML Audio",
    slug: "html-audio",
    icon: "Volume2",
    difficulty: "Intermediate",
    description:
      "Embed and control audio playback directly in the browser using the <audio> element — no plugins required.",
    concept: {
      explanation:
        "The <audio> element lets you embed sound content in a web page. Before HTML5, audio required third-party plugins like Flash. Now, the browser handles playback natively. You provide one or more <source> elements inside <audio> so the browser can pick the format it supports (MP3, OGG, WAV). The controls attribute adds a built-in play/pause UI. You can also control playback programmatically via the HTMLAudioElement JavaScript API — play(), pause(), volume, currentTime, and events like 'ended' or 'timeupdate'. Key attributes include autoplay (plays immediately — often blocked by browsers without user interaction), loop (repeats), muted, and preload (none | metadata | auto). Always provide fallback text between the tags for browsers that don't support <audio>.",
      realLifeAnalogy:
        "Think of the <audio> element as a built-in music player on your web page — like a portable speaker that comes with play, pause, and volume controls out of the box. The <source> tags are like having the same song in MP3 and vinyl — the speaker picks whichever format it can play.",
      keyPoints: [
        "The <audio> element embeds sound — no plugins needed since HTML5",
        "Use the controls attribute to show the browser's built-in player UI",
        "Provide multiple <source> elements for format fallback (MP3, OGG, WAV)",
        "autoplay is often blocked by browsers unless the audio is muted",
        "Use preload='none' to save bandwidth when audio may not be played",
        "The JavaScript API exposes play(), pause(), volume, currentTime, and events",
        "Always include fallback text between <audio> tags for unsupported browsers",
        "The loop attribute repeats playback indefinitely",
      ],
    },
    code: {
      language: "html",
      defaultCode: `<!-- Basic audio with controls -->
<h3>Simple Audio Player</h3>
<audio controls>
  <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg">
  Your browser does not support the audio element.
</audio>

<!-- Audio with multiple sources for fallback -->
<h3>Audio with Format Fallback</h3>
<audio controls preload="metadata">
  <source src="song.ogg" type="audio/ogg">
  <source src="song.mp3" type="audio/mpeg">
  <p>Your browser doesn't support audio.
     <a href="song.mp3">Download</a> instead.</p>
</audio>

<!-- Audio attributes demo -->
<h3>Looping Background Audio (muted)</h3>
<audio controls loop muted>
  <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg">
</audio>

<!-- JavaScript-controlled audio -->
<h3>JavaScript Controlled</h3>
<audio id="myAudio">
  <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg">
</audio>
<button onclick="document.getElementById('myAudio').play()">Play</button>
<button onclick="document.getElementById('myAudio').pause()">Pause</button>`,
    },
    interviewQuestions: [
      {
        question: "What audio formats are supported by the <audio> element and why should you provide multiple sources?",
        difficulty: "Medium",
        hint:
          "The main formats are MP3 (widest support), OGG Vorbis, and WAV. Different browsers support different formats — for example, older Firefox versions didn't support MP3. By providing multiple <source> elements, the browser picks the first format it can play, ensuring cross-browser compatibility.",
      },
      {
        question: "Why does autoplay often fail on modern browsers?",
        difficulty: "Medium",
        hint:
          "Modern browsers block autoplay with sound to improve user experience and prevent unwanted noise. Autoplay only works if the audio is muted (autoplay muted) or the user has previously interacted with the site. This is called the autoplay policy. You can use the play() promise to detect if autoplay was blocked.",
      },
      {
        question: "How do you control audio playback with JavaScript?",
        difficulty: "Medium",
        hint:
          "The HTMLAudioElement API provides: play() and pause() methods, volume property (0.0 to 1.0), currentTime to seek, duration for total length, and events like 'play', 'pause', 'ended', 'timeupdate'. Example: document.getElementById('audio').play() starts playback.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 2. HTML Video
  // ─────────────────────────────────────────────
  {
    id: "html-video",
    title: "HTML Video",
    slug: "html-video",
    icon: "Video",
    difficulty: "Intermediate",
    description:
      "Embed video content natively with the <video> element — supports multiple formats, captions, and JavaScript control.",
    concept: {
      explanation:
        "The <video> element embeds video content directly in the page. Like <audio>, it replaced plugin-based solutions (Flash, Silverlight). You provide sources in multiple formats (MP4, WebM, OGG) for cross-browser support. The controls attribute adds a native player UI with play/pause, seek bar, volume, and fullscreen. The poster attribute shows a thumbnail image before playback starts. You can add subtitles/captions via <track> elements with WebVTT files. Key attributes: width/height (set dimensions), autoplay + muted (needed together for autoplay to work), loop, preload, and playsinline (prevents fullscreen on iOS). The JavaScript API mirrors <audio> — play(), pause(), volume, currentTime, plus video-specific properties like videoWidth and videoHeight.",
      realLifeAnalogy:
        "The <video> element is like a built-in TV screen on your web page. The <source> tags are like having the same movie on Blu-ray and DVD — the TV picks whichever disc it can play. The poster attribute is the movie poster shown before you press play. The <track> element is the subtitle track you can toggle on and off.",
      keyPoints: [
        "The <video> element embeds video natively — no Flash needed",
        "Provide MP4 (H.264) + WebM for maximum browser coverage",
        "Use the poster attribute to show a preview image before playback",
        "autoplay only works when combined with muted on most browsers",
        "Add captions with <track kind='subtitles' src='captions.vtt'>",
        "The controls attribute shows the browser's built-in video player",
        "Set width and height to prevent layout shift during loading",
        "playsinline prevents iOS from forcing fullscreen playback",
      ],
    },
    code: {
      language: "html",
      defaultCode: `<!-- Basic video with controls -->
<h3>Simple Video Player</h3>
<video controls width="400">
  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
  <source src="movie.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

<!-- Video with poster image -->
<h3>Video with Poster</h3>
<video controls width="400"
       poster="https://via.placeholder.com/400x225?text=Click+to+Play">
  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
</video>

<!-- Video with captions -->
<h3>Video with Subtitles</h3>
<video controls width="400">
  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
  <track kind="subtitles" src="captions_en.vtt"
         srclang="en" label="English" default>
</video>

<!-- Autoplay muted loop (like a GIF replacement) -->
<h3>Autoplay Muted Loop (GIF replacement)</h3>
<video autoplay muted loop playsinline width="300">
  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
</video>`,
    },
    interviewQuestions: [
      {
        question: "What video formats should you provide for maximum browser support?",
        difficulty: "Medium",
        hint:
          "MP4 with H.264 codec has the widest support (all modern browsers). WebM with VP9 codec is an open alternative preferred by Chrome/Firefox. Providing both ensures coverage. OGG/Theora is largely obsolete. The browser picks the first <source> it can play.",
      },
      {
        question: "How do you add subtitles or captions to an HTML video?",
        difficulty: "Medium",
        hint:
          "Use the <track> element inside <video> with kind='subtitles' or kind='captions', a src pointing to a WebVTT (.vtt) file, srclang for the language, and label for the display name. The default attribute auto-enables that track. Captions differ from subtitles — captions also describe sounds for deaf users.",
      },
      {
        question: "Why would you use <video autoplay muted loop> instead of a GIF?",
        difficulty: "Medium",
        hint:
          "Videos are typically 80-90% smaller than equivalent GIFs, load faster, and look better. Autoplay with muted and loop replicates GIF behaviour. The playsinline attribute prevents iOS fullscreen. This pattern is widely used for hero backgrounds and product demos.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 3. HTML Canvas Basics
  // ─────────────────────────────────────────────
  {
    id: "html-canvas-basics",
    title: "HTML Canvas Basics",
    slug: "html-canvas-basics",
    icon: "PenTool",
    difficulty: "Intermediate",
    description:
      "Draw graphics, animations, and pixel-level visuals using the <canvas> element and its 2D rendering context.",
    concept: {
      explanation:
        "The <canvas> element provides a blank rectangular area where you can draw graphics using JavaScript. Unlike SVG, canvas is raster-based — it draws pixels on a bitmap. You get a drawing context via canvas.getContext('2d'), which provides methods to draw shapes (fillRect, arc, lineTo), paths, text, images, and gradients. Canvas is immediate-mode: once drawn, the pixels are just pixels — there's no DOM node for each shape. This makes canvas fast for animations and games but harder to make accessible or interactive per-shape. Common use cases: charts, games, image editing, data visualizations, and creative coding. You set the canvas size via width/height attributes (not CSS, which just stretches). Always provide fallback content between the tags.",
      realLifeAnalogy:
        "Canvas is like a physical painting canvas and paintbrush. You give JavaScript the brush and it paints pixels directly. Once paint is on the canvas, you can't click on individual strokes — it's just a flat image. SVG, by contrast, is like a felt board where each piece can be picked up and moved independently.",
      keyPoints: [
        "<canvas> provides a pixel-based drawing surface controlled by JavaScript",
        "Get the 2D context with canvas.getContext('2d') to access drawing methods",
        "Set canvas dimensions via width/height attributes, NOT CSS (CSS stretches)",
        "Canvas is immediate-mode — drawn pixels have no DOM representation",
        "Great for: games, charts, image manipulation, generative art, animations",
        "Not inherently accessible — you must add ARIA labels or fallback content",
        "Use requestAnimationFrame for smooth canvas animations",
        "Also supports a WebGL context (getContext('webgl')) for 3D graphics",
      ],
    },
    code: {
      language: "html",
      defaultCode: `<!-- Basic Canvas Drawing -->
<h3>Canvas Shapes</h3>
<canvas id="myCanvas" width="400" height="200"
        style="border: 1px solid #ccc; border-radius: 8px;">
  Your browser does not support canvas.
</canvas>

<script>
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');

  // Rectangle
  ctx.fillStyle = '#3b82f6';
  ctx.fillRect(20, 20, 100, 80);

  // Circle
  ctx.beginPath();
  ctx.arc(200, 60, 40, 0, Math.PI * 2);
  ctx.fillStyle = '#10b981';
  ctx.fill();

  // Triangle
  ctx.beginPath();
  ctx.moveTo(300, 100);
  ctx.lineTo(340, 20);
  ctx.lineTo(380, 100);
  ctx.closePath();
  ctx.fillStyle = '#f59e0b';
  ctx.fill();

  // Text
  ctx.fillStyle = '#333';
  ctx.font = '14px sans-serif';
  ctx.fillText('Rectangle', 30, 130);
  ctx.fillText('Circle', 175, 130);
  ctx.fillText('Triangle', 310, 130);

  // Line with stroke
  ctx.beginPath();
  ctx.moveTo(20, 160);
  ctx.lineTo(380, 160);
  ctx.strokeStyle = '#e11d48';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillText('Stroke line', 170, 185);
</script>`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between Canvas and SVG?",
        difficulty: "Medium",
        hint:
          "Canvas is raster/pixel-based and drawn via JavaScript — great for games and animations but not accessible per-shape. SVG is vector-based and part of the DOM — each element is a node you can style with CSS and attach events to. Canvas is faster for many objects; SVG is better for scalable, interactive graphics.",
      },
      {
        question: "Why should you set canvas width/height as attributes, not CSS?",
        difficulty: "Medium",
        hint:
          "The width/height attributes set the actual drawing surface resolution. CSS width/height only stretch or shrink the displayed canvas, causing blurry or distorted graphics. For example, a 200x200 canvas stretched to 400x400 via CSS looks pixelated. Always set the attribute dimensions to match the desired resolution.",
      },
      {
        question: "How do you animate on a canvas?",
        difficulty: "Medium",
        hint:
          "Use requestAnimationFrame() in a loop: clear the canvas each frame with clearRect(), update positions/state, then redraw everything. This gives ~60fps smooth animation. Example: function animate() { ctx.clearRect(0,0,w,h); drawScene(); requestAnimationFrame(animate); } animate();",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 4. SVG Basics
  // ─────────────────────────────────────────────
  {
    id: "html-svg-basics",
    title: "SVG Basics",
    slug: "html-svg-basics",
    icon: "Shapes",
    difficulty: "Intermediate",
    description:
      "Create scalable vector graphics directly in HTML — resolution-independent shapes, icons, and illustrations using SVG.",
    concept: {
      explanation:
        "SVG (Scalable Vector Graphics) is an XML-based format for drawing 2D vector graphics. Unlike canvas, SVG elements live in the DOM — each shape (<rect>, <circle>, <path>, <text>, <line>, <polygon>) is a real element you can style with CSS, animate, and attach event listeners to. SVG graphics scale to any size without losing quality because they're defined by math (coordinates, curves) not pixels. You can inline SVG directly in HTML or reference it via <img>, <object>, or CSS background-image. Inline SVG gives you full control — CSS styling, JavaScript interaction, and animation. The viewBox attribute defines the coordinate system and enables responsive scaling. SVG is ideal for logos, icons, charts, maps, and any graphics that need to look crisp at every screen size.",
      realLifeAnalogy:
        "SVG is like a blueprint drawn with rulers and compasses — no matter how much you zoom in, the lines stay perfectly sharp. Canvas is like a photograph — zoom in and you see pixels. SVG shapes are like individual stickers on a board — you can pick up, move, and restyle each one. Canvas is like spray paint — once it's on the surface, it's just a flat image.",
      keyPoints: [
        "SVG is vector-based — scales to any size without pixelation",
        "SVG elements live in the DOM — styleable with CSS, scriptable with JS",
        "Basic shapes: <rect>, <circle>, <ellipse>, <line>, <polygon>, <path>",
        "The viewBox attribute defines the coordinate system for responsive scaling",
        "Inline SVG allows full CSS styling and JavaScript event handling",
        "<img src='icon.svg'> works but blocks CSS/JS access to SVG internals",
        "SVG is ideal for logos, icons, charts, and illustrations",
        "The <path> element with the d attribute can draw any shape using commands (M, L, C, Z)",
      ],
    },
    code: {
      language: "html",
      defaultCode: `<!-- Inline SVG with basic shapes -->
<h3>SVG Basic Shapes</h3>
<svg width="400" height="150" viewBox="0 0 400 150"
     style="border: 1px solid #ccc; border-radius: 8px;">

  <!-- Rectangle -->
  <rect x="20" y="20" width="80" height="60" rx="8"
        fill="#3b82f6" />
  <text x="35" y="110" font-size="12" fill="#333">Rect</text>

  <!-- Circle -->
  <circle cx="170" cy="50" r="35" fill="#10b981" />
  <text x="150" y="110" font-size="12" fill="#333">Circle</text>

  <!-- Ellipse -->
  <ellipse cx="270" cy="50" rx="45" ry="30" fill="#f59e0b" />
  <text x="248" y="110" font-size="12" fill="#333">Ellipse</text>

  <!-- Line -->
  <line x1="340" y1="20" x2="390" y2="80"
        stroke="#e11d48" stroke-width="3" />
  <text x="348" y="110" font-size="12" fill="#333">Line</text>
</svg>

<!-- SVG with path (star) -->
<h3>SVG Path — Star</h3>
<svg width="100" height="100" viewBox="0 0 100 100">
  <path d="M50 5 L61 40 L98 40 L68 62 L79 97
           L50 75 L21 97 L32 62 L2 40 L39 40 Z"
        fill="#f59e0b" stroke="#d97706" stroke-width="2" />
</svg>

<!-- Responsive SVG -->
<h3>Responsive SVG (resize the window)</h3>
<svg viewBox="0 0 200 50"
     style="width: 100%; max-width: 400px; height: auto;">
  <rect width="200" height="50" rx="10" fill="#6366f1" />
  <text x="100" y="30" text-anchor="middle"
        fill="white" font-size="16">Responsive!</text>
</svg>`,
    },
    interviewQuestions: [
      {
        question: "When would you choose SVG over Canvas?",
        difficulty: "Medium",
        hint:
          "Use SVG when you need: scalable graphics (logos, icons), DOM interaction (click handlers on shapes), CSS styling/animation, accessibility (screen readers can read SVG text), or fewer elements to render. Use Canvas for: many objects (games, particles), pixel manipulation, or complex real-time animations where DOM overhead is too high.",
      },
      {
        question: "What does the viewBox attribute do in SVG?",
        difficulty: "Medium",
        hint:
          "viewBox='min-x min-y width height' defines the internal coordinate system. It decouples the SVG's coordinate space from its display size, enabling responsive scaling. For example, viewBox='0 0 100 100' on an SVG displayed at 400x400px means each SVG unit equals 4px. The graphic scales proportionally to fit any container size.",
      },
      {
        question: "What are the different ways to include SVG in an HTML page?",
        difficulty: "Medium",
        hint:
          "1) Inline SVG in HTML — full CSS/JS access. 2) <img src='icon.svg'> — simple, no CSS/JS access to internals. 3) CSS background-image — decorative only. 4) <object data='icon.svg'> — allows scripting but more complex. 5) <iframe> — isolated context. Inline is preferred when you need interaction or styling.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 5. Picture Element
  // ─────────────────────────────────────────────
  {
    id: "html-picture-element",
    title: "Picture Element",
    slug: "html-picture-element",
    icon: "Image",
    difficulty: "Intermediate",
    description:
      "Serve responsive, optimized images using the <picture> element — art direction, format switching, and resolution adaptation.",
    concept: {
      explanation:
        "The <picture> element lets you serve different images based on the user's device, screen size, or browser support. It contains one or more <source> elements and a required <img> fallback. The browser evaluates each <source> in order and picks the first one whose media query or type matches. This enables two key patterns: art direction (different cropped images for mobile vs desktop) and format switching (serving WebP/AVIF to browsers that support them, falling back to JPEG/PNG). Unlike srcset on <img> (which only handles resolution switching), <picture> gives you full control over which image is loaded. The <img> inside <picture> is required — it's what renders and provides the alt text. The <source> elements only specify the image URL and conditions.",
      realLifeAnalogy:
        "Think of <picture> as a smart photo frame that changes the photo based on who's looking. If someone is viewing from far away (large screen), it shows the wide landscape shot. If viewing up close (mobile), it shows a tight crop of the main subject. It also picks the highest-quality print format the frame can display.",
      keyPoints: [
        "<picture> contains <source> elements + a required <img> fallback",
        "Use media attribute on <source> for art direction (different crops per screen size)",
        "Use type attribute on <source> for format switching (WebP/AVIF fallback to JPEG)",
        "The browser picks the FIRST matching <source> — order matters",
        "The <img> element is required and is what actually renders on the page",
        "alt text goes on the <img>, not on <source>",
        "Different from srcset — <picture> allows completely different images, not just resolutions",
        "Improves performance by serving smaller/optimized images to mobile devices",
      ],
    },
    code: {
      language: "html",
      defaultCode: `<!-- Art Direction: different images for different screens -->
<h3>Art Direction with &lt;picture&gt;</h3>
<picture>
  <!-- Wide crop for desktop -->
  <source media="(min-width: 800px)"
          srcset="https://via.placeholder.com/800x300?text=Desktop+Wide+Shot">
  <!-- Tight crop for mobile -->
  <source media="(min-width: 400px)"
          srcset="https://via.placeholder.com/400x300?text=Tablet+Crop">
  <!-- Fallback -->
  <img src="https://via.placeholder.com/300x300?text=Mobile+Square"
       alt="Responsive landscape photo"
       style="width: 100%; max-width: 800px; border-radius: 8px;">
</picture>

<!-- Format Switching: serve modern formats with fallback -->
<h3>Format Switching</h3>
<picture>
  <source type="image/avif" srcset="photo.avif">
  <source type="image/webp" srcset="photo.webp">
  <img src="https://via.placeholder.com/400x250?text=JPEG+Fallback"
       alt="Photo with format fallback"
       style="max-width: 400px; border-radius: 8px;">
</picture>

<!-- Combined: art direction + format switching -->
<h3>Combined Example</h3>
<picture>
  <source media="(min-width: 800px)"
          type="image/webp"
          srcset="hero-desktop.webp">
  <source media="(min-width: 800px)"
          srcset="https://via.placeholder.com/800x250?text=Desktop+JPEG">
  <source type="image/webp"
          srcset="hero-mobile.webp">
  <img src="https://via.placeholder.com/400x250?text=Mobile+JPEG"
       alt="Hero image with art direction and format switching"
       style="width: 100%; border-radius: 8px;">
</picture>`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between <picture> and <img srcset>?",
        difficulty: "Medium",
        hint:
          "srcset on <img> is for resolution switching — the browser picks the best resolution of the SAME image. <picture> is for art direction and format switching — you can serve completely different images. Use srcset for 1x/2x/3x density. Use <picture> when you need different crops for mobile vs desktop, or WebP/AVIF with JPEG fallback.",
      },
      {
        question: "Why is the <img> element required inside <picture>?",
        difficulty: "Medium",
        hint:
          "The <img> is the actual rendering element — it's what the browser displays. <source> elements only provide candidate URLs and conditions. The <img> also provides the alt attribute for accessibility and serves as the fallback if no <source> matches. Without <img>, nothing renders.",
      },
      {
        question: "How does <picture> improve web performance?",
        difficulty: "Medium",
        hint:
          "1) Format switching — AVIF/WebP images are 30-50% smaller than JPEG. 2) Art direction — mobile users download a smaller cropped image instead of the full desktop version. 3) The browser only downloads the matching source, not all of them. This reduces bandwidth usage significantly, especially on mobile networks.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 6. Source Tag
  // ─────────────────────────────────────────────
  {
    id: "html-source-tag",
    title: "Source Tag",
    slug: "html-source-tag",
    icon: "FileAudio",
    difficulty: "Intermediate",
    description:
      "Understand the <source> tag — the universal format fallback mechanism used inside <audio>, <video>, and <picture> elements.",
    concept: {
      explanation:
        "The <source> element specifies alternative media resources for <audio>, <video>, and <picture> elements. It's a void element (no closing tag) with key attributes: src (media URL for audio/video), srcset (image URL for picture), type (MIME type like 'video/mp4' or 'image/webp'), and media (media query for picture). The browser evaluates <source> elements top-to-bottom and uses the first one it supports. This is the core mechanism for progressive enhancement — you serve the best modern format first and fall back to widely-supported formats. For audio/video, the type attribute helps the browser skip unsupported formats without downloading them. For picture, the media attribute enables art direction. You can combine type and media on the same <source>. Always place <source> elements inside their parent container, and always include a fallback (<img> for picture, text for audio/video).",
      realLifeAnalogy:
        "The <source> tag is like giving a restaurant multiple menu options: 'If you have truffle oil, make dish A. If not but you have olive oil, make dish B. Otherwise, use butter.' The chef (browser) picks the first option they have ingredients (codec support) for. You always end with a safe default.",
      keyPoints: [
        "<source> is a void element — no closing tag",
        "Used inside <audio>, <video>, and <picture> elements only",
        "The browser picks the FIRST <source> it can handle — order matters",
        "For audio/video: use src and type attributes",
        "For picture: use srcset, type, and media attributes",
        "The type attribute (MIME type) helps browsers skip unsupported formats without downloading",
        "Place modern formats first (WebM, AVIF, WebP), fallbacks last (MP4, JPEG)",
        "Multiple <source> elements enable progressive enhancement across browsers",
      ],
    },
    code: {
      language: "html",
      defaultCode: `<!-- Source in <video> — format fallback -->
<h3>Source in Video</h3>
<video controls width="400">
  <!-- Best quality first -->
  <source src="movie.webm" type="video/webm">
  <!-- Widely supported fallback -->
  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
  <!-- Final fallback text -->
  <p>Your browser doesn't support video.
     <a href="movie.mp4">Download</a></p>
</video>

<!-- Source in <audio> — format fallback -->
<h3>Source in Audio</h3>
<audio controls>
  <source src="song.ogg" type="audio/ogg">
  <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg">
  <source src="song.wav" type="audio/wav">
  Your browser does not support audio.
</audio>

<!-- Source in <picture> — format + art direction -->
<h3>Source in Picture</h3>
<picture>
  <!-- Modern format for large screens -->
  <source media="(min-width: 800px)"
          type="image/webp"
          srcset="hero-wide.webp">
  <!-- Fallback format for large screens -->
  <source media="(min-width: 800px)"
          srcset="https://via.placeholder.com/800x300?text=Desktop">
  <!-- Modern format for small screens -->
  <source type="image/webp"
          srcset="hero-mobile.webp">
  <!-- Ultimate fallback -->
  <img src="https://via.placeholder.com/400x300?text=Mobile+Fallback"
       alt="Responsive hero" style="width:100%; max-width:800px;">
</picture>

<!-- Why type attribute matters -->
<!--
  Without type: browser downloads the file to check format
  With type:    browser skips instantly if format unsupported
  Always include type for performance!
-->`,
    },
    interviewQuestions: [
      {
        question: "Why is the order of <source> elements important?",
        difficulty: "Medium",
        hint:
          "The browser picks the FIRST <source> it can handle and ignores the rest. Place the most modern/efficient format first (WebM, AVIF, WebP) and the most compatible format last (MP4, JPEG). Wrong order means the browser uses a less optimal format even if it supports a better one listed later.",
      },
      {
        question: "What is the difference between src and srcset on <source>?",
        difficulty: "Medium",
        hint:
          "src is used inside <audio> and <video> — it points to a single media file. srcset is used inside <picture> — it specifies image URLs and can include width descriptors or pixel density descriptors. Using src inside <picture>'s <source> is invalid; using srcset inside <audio>/<video>'s <source> is invalid.",
      },
      {
        question: "How does the type attribute improve performance?",
        difficulty: "Medium",
        hint:
          "The type attribute declares the MIME type (e.g., 'video/webm', 'image/avif'). If the browser doesn't support that type, it immediately skips to the next <source> without downloading anything. Without type, the browser might start downloading the file just to check if it can play it — wasting bandwidth.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Level 5 — SEO and Metadata
  // ─────────────────────────────────────────────

  // ─────────────────────────────────────────────
  // 1. HTML Meta Tags
  // ─────────────────────────────────────────────
  {
    id: "html-meta-tags",
    title: "HTML Meta Tags",
    slug: "html-meta-tags",
    icon: "Tags",
    difficulty: "Intermediate",
    description:
      "Provide metadata about your HTML document — character encoding, descriptions, keywords, and instructions for browsers and search engines.",
    concept: {
      explanation:
        "Meta tags live inside the <head> of an HTML document and provide metadata — information about the page that isn't displayed directly. They communicate with browsers, search engines, and social media platforms. The <meta> tag is a void element with key attributes: charset (character encoding), name + content (named metadata like description, author, keywords), and http-equiv + content (HTTP header equivalents like refresh, content-type). The most critical meta tags for SEO are: description (appears in search results as the page snippet — 150-160 characters ideal), viewport (enables responsive design on mobile), and charset (almost always UTF-8). Search engines use meta descriptions to generate snippets in results pages. While meta keywords are largely ignored by Google today, meta description remains one of the most important on-page SEO elements because it directly influences click-through rates from search results.",
      realLifeAnalogy:
        "Meta tags are like the label on the back of a book. The reader (browser) sees the front cover (visible page), but the bookstore (search engine) reads the back label to know the genre, summary, author, and ISBN. The label doesn't change what's inside the book — it tells others what to expect before they open it.",
      keyPoints: [
        "Meta tags go inside <head> — they provide information ABOUT the page, not ON the page",
        "<meta charset='UTF-8'> should be the first tag in <head> — defines character encoding",
        "<meta name='description'> appears as the snippet in Google search results",
        "<meta name='viewport'> is essential for responsive mobile design",
        "Meta tags use name+content or http-equiv+content attribute pairs",
        "Google ignores <meta name='keywords'> — don't waste time on it",
        "http-equiv='refresh' can redirect or auto-reload (but prefer server redirects)",
        "Meta tags affect SEO, social sharing, browser behaviour, and accessibility",
      ],
    },
    code: {
      language: "html",
      defaultCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Character encoding — always first -->
  <meta charset="UTF-8">

  <!-- Responsive design — essential for mobile -->
  <meta name="viewport"
        content="width=device-width, initial-scale=1.0">

  <!-- SEO: page description (shown in search results) -->
  <meta name="description"
        content="Learn HTML meta tags — how they impact SEO,
                 social sharing, and browser behaviour.">

  <!-- SEO: author -->
  <meta name="author" content="Interview Handbook">

  <!-- Browser: theme color (mobile address bar) -->
  <meta name="theme-color" content="#3b82f6">

  <!-- HTTP equivalent: redirect after 5 seconds -->
  <!-- <meta http-equiv="refresh" content="5;url=https://example.com"> -->

  <!-- Prevent caching (for development) -->
  <!-- <meta http-equiv="cache-control" content="no-cache"> -->

  <title>HTML Meta Tags Guide</title>
</head>
<body>
  <h1>HTML Meta Tags</h1>
  <p>View the page source to see the meta tags in &lt;head&gt;.</p>
  <p>Meta tags are invisible on the page but critical for SEO.</p>
</body>
</html>`,
    },
    interviewQuestions: [
      {
        question: "What is the purpose of <meta charset='UTF-8'> and why should it be the first tag in <head>?",
        difficulty: "Easy",
        hint:
          "It declares the character encoding for the document. UTF-8 supports virtually all characters from all languages. It must be first (within the first 1024 bytes) so the browser knows how to decode the rest of the HTML. Without it, special characters may render as garbled text (mojibake).",
      },
      {
        question: "How does <meta name='description'> affect SEO?",
        difficulty: "Medium",
        hint:
          "Google often uses the meta description as the snippet text shown below the page title in search results. A compelling description (150-160 chars) improves click-through rates. Google may override it with page content if it finds a better match for the query. It doesn't directly affect ranking but indirectly improves CTR.",
      },
      {
        question: "What is the difference between name and http-equiv attributes on <meta>?",
        difficulty: "Medium",
        hint:
          "name+content provides document-level metadata (description, author, viewport). http-equiv+content simulates HTTP response headers (refresh, content-type, cache-control). name is for metadata consumers (search engines, browsers), while http-equiv affects how the browser processes the page at the HTTP level.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 2. Viewport Meta Tag
  // ─────────────────────────────────────────────
  {
    id: "html-viewport-meta",
    title: "Viewport Meta Tag",
    slug: "html-viewport-meta",
    icon: "Smartphone",
    difficulty: "Intermediate",
    description:
      "Control how your page scales on mobile devices — the viewport meta tag is the foundation of responsive web design.",
    concept: {
      explanation:
        "The viewport meta tag tells the browser how to control the page's dimensions and scaling on mobile devices. Without it, mobile browsers render the page at a desktop width (typically 980px) and then shrink it to fit the screen — making text tiny and unusable. The standard tag is: <meta name='viewport' content='width=device-width, initial-scale=1.0'>. 'width=device-width' sets the viewport width to the device's screen width. 'initial-scale=1.0' sets the initial zoom level. Other properties include: minimum-scale, maximum-scale, and user-scalable (though disabling user zoom is an accessibility violation — WCAG 1.4.4). This tag is essential for responsive design — without it, media queries based on viewport width won't work correctly on mobile. Google uses mobile-first indexing, so a missing viewport tag can hurt SEO rankings because Google considers the page non-mobile-friendly.",
      realLifeAnalogy:
        "Imagine reading a full newspaper spread on a phone screen. Without the viewport tag, the browser shows the entire newspaper page shrunk down to fit — everything is tiny. With the viewport tag, it's like the newspaper reformats itself into a single-column layout sized perfectly for your phone screen. Each column is readable without zooming.",
      keyPoints: [
        "Without viewport meta, mobile browsers render at ~980px width and shrink to fit",
        "width=device-width matches the viewport to the device's actual screen width",
        "initial-scale=1.0 sets the starting zoom level to 100%",
        "Essential for CSS media queries to work correctly on mobile devices",
        "Never use user-scalable=no — it breaks accessibility (WCAG 1.4.4 violation)",
        "Google requires viewport meta for mobile-friendly ranking signals",
        "maximum-scale=1.0 also prevents pinch-to-zoom — avoid it for accessibility",
        "This tag goes inside <head> and has no effect on desktop browsers",
      ],
    },
    code: {
      language: "html",
      defaultCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">

  <!-- ✅ Standard responsive viewport -->
  <meta name="viewport"
        content="width=device-width, initial-scale=1.0">

  <title>Viewport Meta Tag Demo</title>
  <style>
    body {
      font-family: system-ui, sans-serif;
      margin: 0;
      padding: 20px;
    }
    .card {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      border: 2px solid #3b82f6;
      border-radius: 12px;
    }
    /* This media query ONLY works with viewport meta tag */
    @media (max-width: 480px) {
      .card {
        border-color: #ef4444;
        background: #fef2f2;
      }
      .card::after {
        content: "📱 Mobile viewport active!";
        display: block;
        margin-top: 10px;
        color: #ef4444;
        font-weight: bold;
      }
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>Viewport Demo</h1>
    <p>Resize the browser to see the media query work.</p>
    <p>Without the viewport meta tag, mobile devices
       would show this at 980px width, shrunk to fit.</p>
  </div>

  <!-- ❌ BAD: Don't do this — breaks accessibility -->
  <!-- <meta name="viewport"
        content="width=device-width, initial-scale=1.0,
                 user-scalable=no, maximum-scale=1.0"> -->
</body>
</html>`,
    },
    interviewQuestions: [
      {
        question: "What happens on mobile if you omit the viewport meta tag?",
        difficulty: "Easy",
        hint:
          "The mobile browser assumes the page is designed for desktop and renders it at a virtual viewport of ~980px, then scales it down to fit the screen. Everything appears tiny. Media queries based on viewport width won't trigger at the expected breakpoints because the viewport is 980px, not the actual device width.",
      },
      {
        question: "Why is user-scalable=no considered bad practice?",
        difficulty: "Medium",
        hint:
          "It disables pinch-to-zoom, which violates WCAG 1.4.4 (Resize Text). Users with low vision depend on zooming to read content. It's an accessibility failure. Similarly, maximum-scale=1.0 prevents zoom. Both should be avoided. Let users zoom freely — design your responsive layout to look good without restricting zoom.",
      },
      {
        question: "How does the viewport meta tag affect SEO?",
        difficulty: "Medium",
        hint:
          "Google uses mobile-first indexing — it crawls and ranks the mobile version of your site. Without a viewport meta tag, Google considers your page not mobile-friendly, which can lower your search rankings. Google's mobile-friendly test specifically checks for this tag. It's a direct ranking signal for mobile search results.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 3. Open Graph Meta Tags
  // ─────────────────────────────────────────────
  {
    id: "html-open-graph",
    title: "Open Graph Meta Tags",
    slug: "html-open-graph",
    icon: "Share2",
    difficulty: "Intermediate",
    description:
      "Control how your page appears when shared on social media — title, description, image, and URL via Open Graph protocol.",
    concept: {
      explanation:
        "Open Graph (OG) meta tags control how your page appears when shared on social media platforms like Facebook, LinkedIn, Twitter/X, Slack, Discord, and iMessage. Created by Facebook in 2010, Open Graph turns a web page into a rich object in a social graph. Without OG tags, platforms guess what to show — often picking the wrong image or truncated text. The four required OG tags are: og:title (the headline), og:type (usually 'website'), og:image (preview image URL — absolute path required), and og:url (canonical URL). Additional tags include og:description (snippet text), og:site_name, og:locale, and image dimensions (og:image:width, og:image:height). Twitter/X has its own card system via twitter:card, twitter:title, twitter:description, and twitter:image — but falls back to OG tags if Twitter-specific ones are missing. A compelling OG image (1200x630px recommended) dramatically increases click-through rates on social platforms.",
      realLifeAnalogy:
        "Open Graph tags are like designing a custom greeting card for your page. When someone shares your URL, instead of showing a plain text link, the platform displays a rich card with a title, image, and description — like a mini billboard. Without OG tags, it's like sending a blank envelope — the recipient has no idea what's inside until they open it.",
      keyPoints: [
        "OG tags control social media preview cards (Facebook, LinkedIn, Slack, Discord, etc.)",
        "Four required tags: og:title, og:type, og:image, og:url",
        "og:image must be an absolute URL — relative paths don't work",
        "Recommended image size: 1200×630px (1.91:1 ratio) for best display",
        "Twitter/X uses twitter:card tags but falls back to OG tags",
        "og:description should be 55-200 characters for optimal display",
        "Use og:url to set the canonical URL for the shared content",
        "Test with Facebook Sharing Debugger, Twitter Card Validator, or LinkedIn Post Inspector",
      ],
    },
    code: {
      language: "html",
      defaultCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, initial-scale=1.0">

  <!-- Standard SEO -->
  <title>Open Graph Meta Tags Guide</title>
  <meta name="description"
        content="Learn how OG tags control social media previews.">

  <!-- ===== Open Graph Tags ===== -->
  <meta property="og:title"
        content="Open Graph Meta Tags — Complete Guide">
  <meta property="og:type" content="website">
  <meta property="og:url"
        content="https://example.com/og-guide">
  <meta property="og:image"
        content="https://example.com/images/og-preview.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:description"
        content="Control how your page looks when shared
                 on Facebook, LinkedIn, Slack, and more.">
  <meta property="og:site_name" content="Interview Handbook">

  <!-- ===== Twitter/X Card Tags ===== -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title"
        content="Open Graph Meta Tags — Complete Guide">
  <meta name="twitter:description"
        content="Control social media preview cards.">
  <meta name="twitter:image"
        content="https://example.com/images/og-preview.jpg">
</head>
<body>
  <h1>Open Graph Demo</h1>
  <p>Share this page on social media to see the preview card.</p>
  <p>View source to see the OG and Twitter meta tags.</p>
</body>
</html>`,
    },
    interviewQuestions: [
      {
        question: "What are the four required Open Graph tags?",
        difficulty: "Easy",
        hint:
          "og:title (page title for social cards), og:type (content type — usually 'website'), og:image (preview image — must be absolute URL), and og:url (canonical URL of the page). Without these, platforms fall back to guessing from page content, which often produces poor previews.",
      },
      {
        question: "Why must og:image use an absolute URL?",
        difficulty: "Medium",
        hint:
          "Social media crawlers fetch the page from your server but don't resolve relative paths the same way browsers do. They need the full URL (https://example.com/image.jpg) to fetch the image. A relative path like '/image.jpg' won't work because the crawler doesn't know your domain from a relative path context.",
      },
      {
        question: "How do Twitter/X card tags relate to Open Graph tags?",
        difficulty: "Medium",
        hint:
          "Twitter has its own meta tags (twitter:card, twitter:title, twitter:description, twitter:image). If Twitter-specific tags are missing, Twitter falls back to OG tags. Best practice: always set OG tags (works everywhere) and add twitter:card to specify the card type (summary, summary_large_image, player, app). Twitter:card has no OG equivalent.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 4. Favicon
  // ─────────────────────────────────────────────
  {
    id: "html-favicon",
    title: "Favicon",
    slug: "html-favicon",
    icon: "Star",
    difficulty: "Intermediate",
    description:
      "Add icons to your site that appear in browser tabs, bookmarks, home screens, and search results — the complete favicon guide.",
    concept: {
      explanation:
        "A favicon (favourite icon) is the small icon displayed in browser tabs, bookmarks, history, and sometimes search results. The simplest approach is placing a favicon.ico file in the root directory — browsers check for this automatically. Modern favicon setup uses <link> tags in <head> to specify icons in multiple sizes and formats. You need: a 32×32 favicon.ico for legacy browsers, a 180×180 apple-touch-icon.png for iOS home screen, a 192×192 and 512×512 PNG for Android/PWA, and an SVG favicon for modern browsers (scales perfectly to any size). The SVG favicon is the most efficient — one file works at every size. Use <link rel='icon' type='image/svg+xml' href='/icon.svg'> for SVG, and <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png'> for PNG fallback. Google shows favicons in mobile search results, so a clear, recognizable favicon improves brand visibility in search.",
      realLifeAnalogy:
        "A favicon is like the logo on a shop's sign. When you walk down a street of browser tabs, each shop (tab) has a tiny logo that helps you find the right one instantly. Without a favicon, it's like a shop with no sign — harder to recognize among the crowd. For mobile home screens, it's like the app icon.",
      keyPoints: [
        "Favicon appears in tabs, bookmarks, history, and Google mobile search results",
        "Place favicon.ico in root — browsers check /favicon.ico automatically",
        "Use <link rel='icon'> in <head> for explicit favicon paths and formats",
        "Modern setup: SVG (scalable) + PNG fallback (32x32) + apple-touch-icon (180x180)",
        "SVG favicons support dark mode via prefers-color-scheme media query inside SVG",
        "For PWAs: include 192x192 and 512x512 PNGs in the web app manifest",
        "Google displays favicons in mobile search results — impacts brand recognition",
        "Use type attribute to help browsers pick the right format (image/svg+xml, image/png)",
      ],
    },
    code: {
      language: "html",
      defaultCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, initial-scale=1.0">
  <title>Favicon Setup Guide</title>

  <!-- ===== Modern Favicon Setup ===== -->

  <!-- SVG favicon (modern browsers, scales perfectly) -->
  <link rel="icon" type="image/svg+xml" href="/icon.svg">

  <!-- PNG fallback (older browsers) -->
  <link rel="icon" type="image/png" sizes="32x32"
        href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16"
        href="/favicon-16x16.png">

  <!-- Apple Touch Icon (iOS home screen) -->
  <link rel="apple-touch-icon" sizes="180x180"
        href="/apple-touch-icon.png">

  <!-- Web App Manifest (PWA, Android) -->
  <link rel="manifest" href="/site.webmanifest">

  <!-- Theme color for mobile browser chrome -->
  <meta name="theme-color" content="#3b82f6">
</head>
<body>
  <h1>Favicon Demo</h1>
  <p>Check the browser tab — you should see the favicon.</p>

  <h3>Required Files:</h3>
  <ul>
    <li><code>/icon.svg</code> — SVG icon (scalable)</li>
    <li><code>/favicon-32x32.png</code> — PNG 32×32</li>
    <li><code>/favicon-16x16.png</code> — PNG 16×16</li>
    <li><code>/apple-touch-icon.png</code> — 180×180</li>
    <li><code>/favicon.ico</code> — Legacy fallback</li>
  </ul>

  <!-- site.webmanifest example:
  {
    "icons": [
      { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
      { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
    ]
  }
  -->
</body>
</html>`,
    },
    interviewQuestions: [
      {
        question: "What favicon files do you need for a modern website?",
        difficulty: "Medium",
        hint:
          "Minimum modern setup: 1) SVG favicon (works at any size, supports dark mode). 2) PNG 32×32 fallback for older browsers. 3) apple-touch-icon 180×180 for iOS home screen. 4) 192×192 and 512×512 PNGs in web manifest for Android/PWA. Optional: favicon.ico in root for legacy support. Browsers check /favicon.ico automatically.",
      },
      {
        question: "How do favicons affect SEO?",
        difficulty: "Easy",
        hint:
          "Google displays favicons in mobile search results next to the site name. A recognizable favicon improves brand visibility and can improve click-through rates. Google has guidelines: the icon must be at least 48×48px, square, and visually representative of the site. Missing or low-quality favicons may be replaced by a generic globe icon.",
      },
      {
        question: "Why use an SVG favicon instead of PNG or ICO?",
        difficulty: "Medium",
        hint:
          "SVG favicons scale to any size without pixelation — one file works for every context (tabs, bookmarks, shortcuts). SVGs also support CSS features like prefers-color-scheme, so the favicon can automatically switch colors for dark mode. ICO is limited to fixed sizes. PNG requires multiple files at different sizes.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 5. HTML Title and SEO
  // ─────────────────────────────────────────────
  {
    id: "html-title-seo",
    title: "HTML Title and SEO",
    slug: "html-title-seo",
    icon: "Heading",
    difficulty: "Intermediate",
    description:
      "The <title> tag is the single most important on-page SEO element — it defines the clickable headline in search results.",
    concept: {
      explanation:
        "The <title> element defines the page's title shown in browser tabs, bookmarks, history, and — most critically — as the clickable headline in search engine results pages (SERPs). It's the single most important on-page SEO element. Google uses the title to understand what the page is about and to display in search results. Best practices: keep it under 60 characters (Google truncates longer titles), place the primary keyword near the beginning, make each page's title unique, and include your brand name at the end (separated by | or —). The title should accurately describe the page content — misleading titles can increase bounce rate, which hurts rankings. The <title> tag goes inside <head> and every page must have exactly one. It also affects social sharing — og:title overrides it for social platforms, but if og:title is missing, platforms fall back to <title>.",
      realLifeAnalogy:
        "The <title> tag is like the headline of a newspaper article. It's the first thing people read in search results, just like a headline catches your eye when scanning a newspaper. A great headline makes you want to read the article. A vague headline gets skipped. The title is your one chance to convince a searcher to click.",
      keyPoints: [
        "The <title> is the #1 on-page SEO element — it appears as the clickable headline in Google",
        "Keep titles under 60 characters to avoid truncation in search results",
        "Place the primary keyword near the beginning of the title",
        "Every page should have a unique title — duplicate titles confuse search engines",
        "Format: 'Primary Keyword — Secondary Info | Brand Name'",
        "The title appears in browser tabs, bookmarks, and history",
        "Google may rewrite your title in search results if it considers it not descriptive enough",
        "og:title overrides <title> for social sharing — but <title> is the fallback",
      ],
    },
    code: {
      language: "html",
      defaultCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, initial-scale=1.0">

  <!-- ✅ GOOD title: keyword first, under 60 chars, branded -->
  <title>HTML Meta Tags Guide — Learn SEO Basics | InterviewHandbook</title>

  <!-- ✅ GOOD: description matches the title's promise -->
  <meta name="description"
        content="Master HTML meta tags for SEO. Learn how to
                 write effective titles, descriptions, and OG tags
                 that improve search rankings and click-through rates.">

  <!-- OG title (overrides <title> on social media) -->
  <meta property="og:title"
        content="HTML Meta Tags — The Complete SEO Guide">
</head>
<body>
  <h1>HTML Title and SEO</h1>

  <h3>Title Best Practices:</h3>
  <ul>
    <li>Under 60 characters (Google truncates at ~60)</li>
    <li>Primary keyword near the beginning</li>
    <li>Unique per page — no duplicates</li>
    <li>Accurate — matches page content</li>
    <li>Brand at the end: "Topic | Brand"</li>
  </ul>

  <h3>Examples:</h3>
  <pre>
❌ "Home" — too vague
❌ "Our Company - Welcome to Our Amazing Website" — keyword-stuffed
✅ "JavaScript Closures Explained — Interview Handbook"
✅ "Buy Running Shoes Online | Nike"
  </pre>

  <!-- ❌ BAD title examples (DO NOT DO): -->
  <!-- <title>Home</title> -->
  <!-- <title>Page 1</title> -->
  <!-- <title>Buy Shoes | Buy Sneakers | Buy Trainers | ShoeShop</title> -->
</body>
</html>`,
    },
    interviewQuestions: [
      {
        question: "Why is the <title> tag considered the most important on-page SEO element?",
        difficulty: "Easy",
        hint:
          "It's the clickable headline in search results — the first thing users see. Google uses it as a strong signal for understanding page content and relevance. A well-written title directly impacts click-through rate (CTR), which indirectly affects rankings. It also appears in browser tabs, bookmarks, and social sharing fallbacks.",
      },
      {
        question: "What happens if your title is longer than 60 characters?",
        difficulty: "Easy",
        hint:
          "Google truncates it with an ellipsis (...) in search results, cutting off potentially important information. The full title still exists for ranking purposes, but users only see ~60 characters. Some of your keywords or brand name may be hidden. Best practice: front-load the most important information within the first 60 characters.",
      },
      {
        question: "Can Google change your <title> in search results?",
        difficulty: "Medium",
        hint:
          "Yes. Google may rewrite titles it considers too long, keyword-stuffed, inaccurate, or not descriptive enough for the search query. It may pull text from H1 headings, anchor text, or other page content. To minimize rewrites: keep titles concise, accurate, and matching the page content. Google's rewriting is intended to improve the searcher's experience.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 6. Robots Meta Tag
  // ─────────────────────────────────────────────
  {
    id: "html-robots-meta",
    title: "Robots Meta Tag",
    slug: "html-robots-meta",
    icon: "Bot",
    difficulty: "Intermediate",
    description:
      "Control how search engines crawl and index your pages — the robots meta tag tells Googlebot what to do with your content.",
    concept: {
      explanation:
        "The robots meta tag instructs search engine crawlers how to handle a page. It goes in <head> as <meta name='robots' content='directives'>. Key directives: index (allow indexing — default), noindex (don't add to search results), follow (follow links on the page — default), nofollow (don't follow/pass authority through links), noarchive (don't show cached copy), nosnippet (don't show description snippet), max-snippet:N (limit snippet to N characters), max-image-preview:large/standard/none (control image preview size), and noimageindex (don't index images). You can target specific bots: <meta name='googlebot' content='noindex'> only affects Google. The default is 'index, follow' — you don't need the tag unless you want to restrict something. The robots meta tag works alongside robots.txt, but they serve different purposes: robots.txt blocks crawling (the bot never sees the page), while robots meta blocks indexing (the bot sees the page but won't list it in results). If robots.txt blocks crawling, the bot never reaches the meta tag.",
      realLifeAnalogy:
        "The robots meta tag is like a sign on your store's door. 'index, follow' means 'Come in, look around, and feel free to tell others about the stores I recommend.' 'noindex' means 'You can come in and browse, but don't list me in the directory.' 'nofollow' means 'Come in, but don't trust my recommendations of other stores.' robots.txt is the fence around the property — it stops visitors from even reaching the door.",
      keyPoints: [
        "Default is 'index, follow' — no tag needed unless you want to restrict",
        "noindex prevents the page from appearing in search results",
        "nofollow tells crawlers not to pass link equity through outbound links",
        "Can target specific bots: name='googlebot' vs name='robots' (all bots)",
        "robots.txt blocks crawling; robots meta blocks indexing — different purposes",
        "If robots.txt blocks a page, the crawler never sees the meta robots tag",
        "max-snippet, max-image-preview control how rich your search result appears",
        "Use noindex for: login pages, thank-you pages, internal search results, staging sites",
      ],
    },
    code: {
      language: "html",
      defaultCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, initial-scale=1.0">
  <title>Robots Meta Tag Guide</title>

  <!-- ===== Robots Directives ===== -->

  <!-- Default: index and follow (no tag needed) -->
  <meta name="robots" content="index, follow">

  <!-- Don't index this page (e.g., login page) -->
  <!-- <meta name="robots" content="noindex"> -->

  <!-- Index but don't follow outbound links -->
  <!-- <meta name="robots" content="index, nofollow"> -->

  <!-- Google-specific: no cached copy, limit snippet -->
  <!-- <meta name="googlebot"
        content="noarchive, max-snippet:100"> -->

  <!-- Control image preview size in search results -->
  <!-- <meta name="robots"
        content="max-image-preview:large"> -->
</head>
<body>
  <h1>Robots Meta Tag</h1>

  <h3>Common Directives:</h3>
  <table border="1" cellpadding="8" style="border-collapse: collapse;">
    <tr>
      <th>Directive</th>
      <th>Effect</th>
    </tr>
    <tr>
      <td><code>index</code></td>
      <td>Allow indexing (default)</td>
    </tr>
    <tr>
      <td><code>noindex</code></td>
      <td>Don't show in search results</td>
    </tr>
    <tr>
      <td><code>follow</code></td>
      <td>Follow links on page (default)</td>
    </tr>
    <tr>
      <td><code>nofollow</code></td>
      <td>Don't follow/pass link equity</td>
    </tr>
    <tr>
      <td><code>noarchive</code></td>
      <td>Don't show "Cached" link</td>
    </tr>
    <tr>
      <td><code>nosnippet</code></td>
      <td>Don't show description snippet</td>
    </tr>
  </table>

  <h3>When to Use noindex:</h3>
  <ul>
    <li>Login / registration pages</li>
    <li>Thank-you / confirmation pages</li>
    <li>Internal search results pages</li>
    <li>Staging / development environments</li>
    <li>Duplicate content pages</li>
  </ul>
</body>
</html>`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between robots.txt and the robots meta tag?",
        difficulty: "Medium",
        hint:
          "robots.txt blocks crawling — the search engine never downloads or sees the page content. The robots meta tag blocks indexing — the crawler downloads the page, reads it, but doesn't list it in search results. If robots.txt blocks a page, the crawler never reaches the meta tag. Use robots.txt for entire sections; use meta robots for individual page control.",
      },
      {
        question: "When should you use noindex?",
        difficulty: "Easy",
        hint:
          "Use noindex on pages that shouldn't appear in search results: login pages, registration forms, thank-you/confirmation pages, internal search results (thin content), admin dashboards, staging/dev sites, paginated archives beyond page 1, and duplicate content pages. These pages provide no value to search users and can dilute your site's crawl budget.",
      },
      {
        question: "What happens if you set both noindex and nofollow vs just noindex?",
        difficulty: "Hard",
        hint:
          "noindex alone: the page won't appear in search results, but the crawler still follows outbound links and passes link equity to those pages. noindex, nofollow: the page won't appear in results AND the crawler won't follow or pass authority through any links on the page. Use nofollow when you don't want to endorse linked pages (e.g., user-generated content with spam links).",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Level 6 — Accessibility
  // ─────────────────────────────────────────────

  // ─────────────────────────────────────────────
  // 1. Web Accessibility Basics
  // ─────────────────────────────────────────────
  {
    id: "web-accessibility-basics",
    title: "Web Accessibility Basics",
    slug: "web-accessibility-basics",
    icon: "Accessibility",
    difficulty: "Intermediate",
    description:
      "Build websites that everyone can use — understand WCAG, assistive technologies, and the four principles of accessibility (POUR).",
    concept: {
      explanation:
        "Web accessibility (a11y) means designing websites so that people with disabilities can perceive, understand, navigate, and interact with them. This includes users who are blind (screen readers), deaf (captions), motor-impaired (keyboard-only), cognitively impaired, or have temporary disabilities (broken arm, bright sunlight). The Web Content Accessibility Guidelines (WCAG) define the international standard, organized around four principles — POUR: Perceivable (content must be presentable to all senses), Operable (UI must be usable via keyboard, voice, etc.), Understandable (content and UI must be clear), and Robust (content must work with current and future assistive technologies). WCAG has three conformance levels: A (minimum), AA (standard — required by most laws), and AAA (enhanced). In practice, most organizations target WCAG 2.1 AA. Accessibility isn't just ethical — it's legal (ADA, EAA, Section 508) and good business (15% of the world population has a disability). Semantic HTML is the foundation — using the right elements (<button>, <nav>, <main>) gives assistive technologies the information they need for free.",
      realLifeAnalogy:
        "Accessibility is like building a public building with ramps, elevators, braille signs, and automatic doors alongside stairs and regular doors. The building works for everyone — wheelchair users, people carrying heavy boxes, parents with strollers — not just people who can climb stairs. Cutting corners on accessibility is like building a store with only a narrow spiral staircase entrance.",
      keyPoints: [
        "Accessibility (a11y) ensures websites work for people with disabilities",
        "WCAG is the international standard — organized around POUR principles",
        "POUR: Perceivable, Operable, Understandable, Robust",
        "Target WCAG 2.1 AA — required by most accessibility laws (ADA, EAA, Section 508)",
        "15% of the world population has a disability — a11y is good business",
        "Semantic HTML is the foundation — correct elements provide a11y for free",
        "Screen readers, keyboard navigation, voice control, and switch devices are assistive technologies",
        "Test with: screen reader (NVDA/VoiceOver), keyboard-only, Lighthouse, axe DevTools",
      ],
    },
    code: {
      language: "html",
      defaultCode: `<!DOCTYPE html>
<html lang="en">
<!-- lang attribute: screen readers use correct pronunciation -->
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, initial-scale=1.0">
  <title>Accessible Page Example</title>
</head>
<body>

  <!-- Skip navigation link (keyboard users) -->
  <a href="#main-content" class="sr-only focus:not-sr-only">
    Skip to main content
  </a>

  <!-- Semantic landmarks -->
  <header>
    <nav aria-label="Main navigation">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  </header>

  <main id="main-content">
    <h1>Web Accessibility Basics</h1>
    <p>This page demonstrates accessible HTML patterns.</p>

    <!-- Accessible image -->
    <img src="chart.png"
         alt="Bar chart showing 60% increase in sales from Q1 to Q4">

    <!-- Accessible form -->
    <form>
      <label for="email">Email address:</label>
      <input type="email" id="email" name="email"
             required aria-describedby="email-hint">
      <p id="email-hint">We'll never share your email.</p>

      <button type="submit">Subscribe</button>
    </form>
  </main>

  <footer>
    <p>&copy; 2026 Accessible Website</p>
  </footer>

</body>
</html>`,
    },
    interviewQuestions: [
      {
        question: "What are the four POUR principles of web accessibility?",
        difficulty: "Easy",
        hint:
          "Perceivable: content must be presentable to all senses (alt text, captions, contrast). Operable: UI must work with keyboard, voice, etc. (no mouse-only interactions). Understandable: content and navigation must be clear and predictable. Robust: content must work with assistive technologies now and in the future (valid HTML, ARIA when needed).",
      },
      {
        question: "Why is semantic HTML the foundation of accessibility?",
        difficulty: "Medium",
        hint:
          "Semantic elements (<button>, <nav>, <main>, <h1>-<h6>) have built-in roles, keyboard behaviour, and screen reader announcements. A <button> is focusable, activatable with Enter/Space, and announced as 'button'. A <div onclick> has none of this — you'd need to manually add tabindex, role, keydown handlers, and ARIA. Semantic HTML gives you accessibility for free.",
      },
      {
        question: "What WCAG conformance level should most websites target and why?",
        difficulty: "Medium",
        hint:
          "WCAG 2.1 Level AA. It's the standard required by most accessibility laws (ADA in the US, European Accessibility Act, Section 508 for government). Level A is too minimal (allows many barriers). Level AAA is aspirational and often impractical for entire sites (e.g., requires sign language for all audio). AA balances usability with practical implementation.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 2. ARIA Roles
  // ─────────────────────────────────────────────
  {
    id: "html-aria-roles",
    title: "ARIA Roles",
    slug: "html-aria-roles",
    icon: "UserCheck",
    difficulty: "Intermediate",
    description:
      "Define what an element IS for assistive technologies — ARIA roles communicate purpose when semantic HTML alone isn't enough.",
    concept: {
      explanation:
        "ARIA (Accessible Rich Internet Applications) roles tell assistive technologies what an element's purpose is. The role attribute overrides the element's default semantic meaning. There are six categories: landmark roles (banner, navigation, main, complementary, contentinfo — matching <header>, <nav>, <main>, <aside>, <footer>), widget roles (button, tab, tabpanel, dialog, alert, progressbar, slider, switch), document structure roles (heading, list, listitem, table, row, cell), live region roles (alert, log, status, timer — for dynamic content), window roles (dialog, alertdialog), and abstract roles (never use directly). The first rule of ARIA is: don't use ARIA if a native HTML element does the job. <button> is better than <div role='button'> because it includes keyboard handling, focus management, and click events for free. ARIA only adds semantics — it doesn't add behaviour. role='button' on a <div> won't make it focusable or clickable; you must also add tabindex='0' and keydown handlers. Use ARIA for custom widgets, dynamic content, and situations where native HTML falls short.",
      realLifeAnalogy:
        "ARIA roles are like name badges at a conference. A person (element) might look the same as everyone else, but the badge tells you 'I'm the speaker' (role='button'), 'I'm the organizer' (role='navigation'), or 'I'm the emergency contact' (role='alert'). Without badges, you'd have to guess everyone's role. But if someone already has their name on the door (semantic HTML), adding a badge is redundant.",
      keyPoints: [
        "First rule of ARIA: don't use ARIA if native HTML does the job",
        "Roles tell assistive tech WHAT an element is — not how it looks",
        "ARIA adds semantics only — no behaviour (no keyboard, focus, or click handling)",
        "Landmark roles: banner, navigation, main, complementary, contentinfo",
        "Widget roles: button, tab, tabpanel, dialog, alert, switch, slider",
        "role='button' on a <div> needs tabindex='0' + keydown handler to actually work",
        "Don't change native roles: <button role='heading'> is invalid/confusing",
        "Use ARIA for custom components that have no native HTML equivalent",
      ],
    },
    code: {
      language: "html",
      defaultCode: `<!-- ❌ BAD: Using ARIA when HTML does the job -->
<div role="button" tabindex="0"
     onclick="handleClick()"
     onkeydown="if(event.key==='Enter')handleClick()">
  Click me
</div>

<!-- ✅ GOOD: Just use a <button> -->
<button onclick="handleClick()">Click me</button>

<!-- ===== Landmark Roles ===== -->
<div role="banner">Site header</div>       <!-- = <header> -->
<div role="navigation">Nav links</div>     <!-- = <nav> -->
<div role="main">Main content</div>        <!-- = <main> -->
<div role="complementary">Sidebar</div>    <!-- = <aside> -->
<div role="contentinfo">Footer</div>       <!-- = <footer> -->

<!-- ===== Widget Roles (custom components) ===== -->

<!-- Custom tab interface -->
<div role="tablist" aria-label="Settings">
  <button role="tab" aria-selected="true"
          aria-controls="panel-1" id="tab-1">
    General
  </button>
  <button role="tab" aria-selected="false"
          aria-controls="panel-2" id="tab-2">
    Security
  </button>
</div>
<div role="tabpanel" id="panel-1"
     aria-labelledby="tab-1">
  <p>General settings content...</p>
</div>

<!-- Alert for dynamic messages -->
<div role="alert">
  Form submitted successfully!
</div>

<!-- Dialog (modal) -->
<div role="dialog" aria-labelledby="dialog-title"
     aria-modal="true">
  <h2 id="dialog-title">Confirm Delete</h2>
  <p>Are you sure you want to delete this item?</p>
  <button>Cancel</button>
  <button>Delete</button>
</div>`,
    },
    interviewQuestions: [
      {
        question: "What is the first rule of ARIA?",
        difficulty: "Easy",
        hint:
          "Don't use ARIA if a native HTML element or attribute provides the semantics you need. <button> is always better than <div role='button'> because it includes keyboard support, focus management, and activation behaviour for free. ARIA only adds semantics — it doesn't add any behaviour. Using unnecessary ARIA can actually make accessibility worse if used incorrectly.",
      },
      {
        question: "Why is <div role='button'> worse than <button>?",
        difficulty: "Medium",
        hint:
          "role='button' only tells screen readers 'this is a button' — it doesn't add: keyboard focusability (need tabindex='0'), Enter/Space activation (need keydown handler), click event on Enter (need JavaScript), form submission behaviour, or disabled state handling. <button> includes all of this natively. The ARIA version requires 5+ lines of extra code and is more likely to have bugs.",
      },
      {
        question: "What are ARIA landmark roles and why do they matter?",
        difficulty: "Medium",
        hint:
          "Landmark roles (banner, navigation, main, complementary, contentinfo, search, form, region) define page structure for screen reader users. Screen readers can jump between landmarks — like a table of contents. Users press a shortcut to list all landmarks and navigate directly. Semantic HTML (<header>, <nav>, <main>, <aside>, <footer>) automatically maps to these roles.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 3. ARIA Labels
  // ─────────────────────────────────────────────
  {
    id: "html-aria-labels",
    title: "ARIA Labels",
    slug: "html-aria-labels",
    icon: "Tag",
    difficulty: "Intermediate",
    description:
      "Give elements accessible names and descriptions — aria-label, aria-labelledby, and aria-describedby provide context that screen readers announce.",
    concept: {
      explanation:
        "ARIA labelling attributes give elements accessible names and descriptions that screen readers announce. There are three key attributes: aria-label (provides an inline text label — used when no visible text is available, e.g., icon buttons), aria-labelledby (points to the ID of another element whose text becomes the label — used when a visible label exists elsewhere on the page), and aria-describedby (points to the ID of an element providing supplementary description — announced after the label and role). The accessible name calculation follows a priority order: aria-labelledby > aria-label > <label> element > title attribute > placeholder. aria-labelledby can reference multiple IDs (space-separated) and even reference hidden elements. aria-label overwrites the element's visible text for screen readers — a <button aria-label='Close'>X</button> is announced as 'Close button', not 'X button'. Use aria-describedby for hints, error messages, or additional context that supplements the name. These attributes are essential for: icon-only buttons, form fields without visible labels, groups of controls, and custom widgets.",
      realLifeAnalogy:
        "aria-label is like a name tag on a tool with no visible label — the toolbox (screen reader) reads the tag to know what the tool does. aria-labelledby is like a label on a shelf that applies to everything on that shelf — 'these are all power tools.' aria-describedby is like fine print instructions underneath — extra context you get after knowing what the item is.",
      keyPoints: [
        "aria-label: inline text label for elements with no visible text (icon buttons)",
        "aria-labelledby: references another element's ID as the label (visible label exists elsewhere)",
        "aria-describedby: supplementary description announced after name and role",
        "Priority: aria-labelledby > aria-label > <label> > title > placeholder",
        "aria-labelledby can reference multiple IDs: aria-labelledby='title subtitle'",
        "aria-label overrides visible text for screen readers",
        "Use aria-describedby for form hints, error messages, and additional context",
        "Don't use aria-label on elements that already have clear visible text",
      ],
    },
    code: {
      language: "html",
      defaultCode: `<!-- ===== aria-label: inline text name ===== -->

<!-- Icon-only button with no visible text -->
<button aria-label="Close dialog">
  <svg><!-- X icon --></svg>
</button>
<!-- Screen reader: "Close dialog, button" -->

<!-- Search input with no visible label -->
<input type="search" aria-label="Search articles"
       placeholder="Search...">

<!-- Navigation with aria-label to distinguish -->
<nav aria-label="Main navigation">...</nav>
<nav aria-label="Footer navigation">...</nav>


<!-- ===== aria-labelledby: reference another element ===== -->

<!-- Label from a heading -->
<section aria-labelledby="pricing-heading">
  <h2 id="pricing-heading">Pricing Plans</h2>
  <p>Choose the plan that works for you.</p>
</section>
<!-- Screen reader: "Pricing Plans, region" -->

<!-- Multiple IDs (concatenated) -->
<div id="fname">First</div>
<div id="lname">Name</div>
<input aria-labelledby="fname lname">
<!-- Screen reader: "First Name, edit text" -->


<!-- ===== aria-describedby: supplementary info ===== -->

<!-- Form field with hint -->
<label for="password">Password:</label>
<input type="password" id="password"
       aria-describedby="pw-hint pw-error">
<p id="pw-hint">Must be at least 8 characters.</p>
<p id="pw-error" role="alert" hidden>
  Password is too short.
</p>
<!-- Reader: "Password, edit text,
     Must be at least 8 characters." -->


<!-- ===== Real-world pattern: modal dialog ===== -->
<div role="dialog"
     aria-labelledby="modal-title"
     aria-describedby="modal-desc">
  <h2 id="modal-title">Delete Account</h2>
  <p id="modal-desc">This action cannot be undone.
     All data will be permanently removed.</p>
  <button>Cancel</button>
  <button>Delete</button>
</div>`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between aria-label, aria-labelledby, and aria-describedby?",
        difficulty: "Medium",
        hint:
          "aria-label provides an inline string as the accessible name. aria-labelledby references another element's ID whose text becomes the name — takes priority over aria-label. aria-describedby references an element providing supplementary description — announced after the name and role. Label = what it IS; description = extra context ABOUT it.",
      },
      {
        question: "When should you use aria-label vs a visible <label>?",
        difficulty: "Medium",
        hint:
          "Always prefer visible <label> — it helps ALL users, not just screen reader users. Use aria-label only when a visible label isn't practical: icon-only buttons, search inputs with placeholder-only design, or distinguishing multiple navigations (aria-label='Main' vs aria-label='Footer'). A visible label is always better for usability because sighted users benefit too.",
      },
      {
        question: "What happens when both aria-label and aria-labelledby are on the same element?",
        difficulty: "Hard",
        hint:
          "aria-labelledby wins — it has the highest priority in the accessible name calculation. The order is: aria-labelledby > aria-label > native label (<label>, alt, <legend>) > title attribute > placeholder. If aria-labelledby references an element with no text, the accessible name is empty, which is worse than not having it at all. Only use one naming mechanism per element.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 4. Alt Text Best Practices
  // ─────────────────────────────────────────────
  {
    id: "html-alt-text",
    title: "Alt Text Best Practices",
    slug: "html-alt-text",
    icon: "ImageIcon",
    difficulty: "Intermediate",
    description:
      "Write effective alt text that conveys meaning — the most common accessibility requirement and the easiest to get wrong.",
    concept: {
      explanation:
        "Alt text (alternative text) is the text description of an image provided via the alt attribute on <img> tags. It serves three purposes: screen readers announce it to blind users, it displays when images fail to load, and search engines use it to understand image content. Writing good alt text is a skill — it should convey the meaning and function of the image, not just describe its appearance. The key decision is: what role does this image play? Informative images need descriptive alt text. Functional images (links, buttons) need alt text describing the action. Decorative images should have empty alt text (alt='') so screen readers skip them entirely — NOT a missing alt attribute (missing alt causes screen readers to announce the filename). Complex images (charts, infographics) need a brief alt with a longer description nearby. The ideal length is 125 characters or less — some screen readers cut off at this point. Never start with 'Image of' or 'Picture of' — screen readers already announce 'image'. Context matters: the same photo needs different alt text depending on how it's used.",
      realLifeAnalogy:
        "Writing alt text is like describing a photo to someone over the phone. You don't say 'There's a rectangular image with pixels' — you say what matters: 'The sales chart shows revenue doubled this quarter' or 'The team celebrating after winning the championship.' The description depends on why you're showing them the photo in the first place.",
      keyPoints: [
        "alt describes the PURPOSE of the image, not just its appearance",
        "Decorative images: use alt='' (empty) — screen readers skip them",
        "Never omit the alt attribute entirely — readers announce the filename instead",
        "Don't start with 'Image of' or 'Picture of' — screen readers already say 'image'",
        "Functional images (in links/buttons): describe the ACTION, not the image",
        "Keep alt text under 125 characters — some screen readers truncate",
        "Complex images (charts): brief alt + longer description in figcaption or nearby text",
        "Same image, different context = different alt text",
      ],
    },
    code: {
      language: "html",
      defaultCode: `<!-- ===== Informative Images ===== -->

<!-- ✅ GOOD: Describes what matters -->
<img src="chart.png"
     alt="Bar chart: revenue grew from $2M to $4.5M between Q1 and Q4 2025">

<!-- ❌ BAD: Describes appearance, not meaning -->
<img src="chart.png"
     alt="A colorful bar chart with blue bars">

<!-- ❌ BAD: Starts with "Image of" -->
<img src="chart.png"
     alt="Image of a bar chart showing revenue">


<!-- ===== Decorative Images ===== -->

<!-- ✅ GOOD: Empty alt for decorative images -->
<img src="divider.svg" alt="">

<!-- ❌ BAD: Missing alt attribute entirely -->
<!-- Screen reader announces: "divider dot SVG, image" -->
<img src="divider.svg">


<!-- ===== Functional Images (in links/buttons) ===== -->

<!-- ✅ GOOD: Describes the action -->
<a href="/home">
  <img src="logo.png" alt="Go to homepage">
</a>

<!-- ❌ BAD: Describes the image, not the action -->
<a href="/home">
  <img src="logo.png" alt="Company logo">
</a>


<!-- ===== Complex Images ===== -->

<!-- Use figure + figcaption for detailed descriptions -->
<figure>
  <img src="infographic.png"
       alt="2025 market share breakdown by region">
  <figcaption>
    North America leads with 42%, followed by
    Europe (28%), Asia-Pacific (22%), and
    Rest of World (8%).
  </figcaption>
</figure>


<!-- ===== Context Changes Alt Text ===== -->

<!-- On a cooking blog: -->
<img src="pasta.jpg"
     alt="Finished carbonara with crispy guanciale and fresh parsley">

<!-- On a restaurant menu page: -->
<img src="pasta.jpg"
     alt="Spaghetti Carbonara — $18">

<!-- As a decorative background: -->
<img src="pasta.jpg" alt="">`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between alt='' (empty) and no alt attribute at all?",
        difficulty: "Easy",
        hint:
          "alt='' tells screen readers 'this image is decorative, skip it.' No alt attribute causes screen readers to announce the filename (e.g., 'DSC_0042.jpg, image'), which is useless and annoying. Always include the alt attribute — use empty string for decorative images, descriptive text for meaningful images.",
      },
      {
        question: "How should you write alt text for an image inside a link?",
        difficulty: "Medium",
        hint:
          "Describe the link's destination or action, not the image itself. The image is functioning as a link, so alt text should convey where the link goes. Example: <a href='/home'><img alt='Go to homepage'></a>, not alt='company logo'. If the link also has text, the image can have alt='' to avoid redundancy.",
      },
      {
        question: "Why shouldn't you start alt text with 'Image of' or 'Picture of'?",
        difficulty: "Easy",
        hint:
          "Screen readers already announce 'image' before reading alt text. Adding 'Image of' makes it say 'image, Image of a sunset' — redundant and verbose. Similarly, don't say 'photo of', 'graphic of', etc. Just describe the content directly: 'Sunset over the Pacific Ocean' instead of 'Photo of a sunset over the Pacific Ocean'.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 5. Keyboard Navigation
  // ─────────────────────────────────────────────
  {
    id: "html-keyboard-navigation",
    title: "Keyboard Navigation",
    slug: "html-keyboard-navigation",
    icon: "Keyboard",
    difficulty: "Intermediate",
    description:
      "Ensure your website is fully operable without a mouse — Tab, Enter, Escape, and arrow keys must work for all interactive elements.",
    concept: {
      explanation:
        "Keyboard navigation is a core accessibility requirement — many users can't use a mouse (motor disabilities, power users, screen reader users). All interactive elements must be reachable via Tab key and activatable via Enter or Space. The Tab key moves focus through interactive elements in DOM order. Shift+Tab moves backward. Enter activates links and buttons. Space activates buttons, checkboxes, and select options. Escape closes modals, menus, and popups. Arrow keys navigate within composite widgets (tabs, menus, radio groups). Focus management is critical: visible focus indicators (outline) must never be removed (CSS outline: none without a replacement is a WCAG failure). The tabindex attribute controls tab order: tabindex='0' adds an element to the natural tab order, tabindex='-1' makes it programmatically focusable but not tabbable, and positive tabindex values should never be used (they create confusing tab order). Skip navigation links let keyboard users bypass repetitive navigation. Focus trapping in modals prevents users from tabbing to hidden background content.",
      realLifeAnalogy:
        "Keyboard navigation is like navigating a building with clearly marked paths and exits. Tab is walking through doors in order. Enter is pressing a doorbell. Escape is the emergency exit. If any door is locked (not focusable) or invisible (no focus indicator), a keyboard user is stuck. Skip links are like express elevators that bypass the lobby.",
      keyPoints: [
        "Tab moves forward through interactive elements; Shift+Tab moves backward",
        "Enter activates links and buttons; Space activates buttons and toggles",
        "Escape closes modals, menus, dropdowns, and popups",
        "Never remove focus outlines without providing a visible alternative",
        "tabindex='0' adds to tab order; tabindex='-1' allows programmatic focus only",
        "Never use positive tabindex values (tabindex='5') — creates confusing order",
        "Skip navigation links let keyboard users bypass repetitive menus",
        "Focus trapping in modals prevents tabbing to background content",
      ],
    },
    code: {
      language: "html",
      defaultCode: `<!-- ===== Skip Navigation Link ===== -->
<a href="#main" class="skip-link">
  Skip to main content
</a>
<style>
  .skip-link {
    position: absolute;
    left: -9999px;
    top: 0;
    padding: 8px 16px;
    background: #1e293b;
    color: white;
    z-index: 100;
  }
  /* Show on focus */
  .skip-link:focus {
    left: 0;
  }
</style>

<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
  <a href="/contact">Contact</a>
</nav>

<main id="main" tabindex="-1">
  <h1>Keyboard Navigation</h1>

  <!-- ✅ Natively keyboard accessible -->
  <button onclick="alert('Clicked!')">
    Native Button (Enter + Space work)
  </button>

  <a href="/about">
    Native Link (Enter works)
  </a>

  <!-- ❌ NOT keyboard accessible -->
  <div onclick="alert('Clicked!')"
       style="padding:8px; background:#eee; cursor:pointer;">
    Div "button" — can't Tab or Enter!
  </div>

  <!-- ✅ Fixed with tabindex + keyboard handler -->
  <div role="button" tabindex="0"
       onclick="alert('Clicked!')"
       onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();alert('Clicked!')}">
    Div button — now keyboard accessible
  </div>

  <!-- ===== Focus Indicators ===== -->
  <style>
    /* ❌ NEVER do this without a replacement */
    /* button:focus { outline: none; } */

    /* ✅ Custom focus indicator */
    button:focus-visible {
      outline: 3px solid #3b82f6;
      outline-offset: 2px;
    }
  </style>

  <!-- ===== tabindex examples ===== -->

  <!-- tabindex="0": added to tab order (use for custom widgets) -->
  <div tabindex="0" role="button">Tabbable custom widget</div>

  <!-- tabindex="-1": focusable via JS only (useful for modals) -->
  <div tabindex="-1" id="modal">
    Programmatically focusable
  </div>

  <!-- ❌ tabindex="5": NEVER use positive values -->
  <!-- <div tabindex="5">Don't do this!</div> -->
</main>`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between tabindex='0', tabindex='-1', and positive tabindex values?",
        difficulty: "Medium",
        hint:
          "tabindex='0': element joins the natural tab order (based on DOM position). tabindex='-1': element is focusable via JavaScript (element.focus()) but NOT reachable by Tab key — useful for modals and programmatic focus. Positive values (1, 2, 5): DON'T USE — they create a custom tab order that's confusing and unmaintainable. Elements with positive tabindex are focused before tabindex='0' elements.",
      },
      {
        question: "Why is removing CSS outline on :focus a WCAG violation?",
        difficulty: "Easy",
        hint:
          "WCAG 2.4.7 (Focus Visible) requires that keyboard focus indicators are visible. Removing outline:none without a visible replacement makes it impossible for keyboard users to see where they are on the page. Use :focus-visible instead to show outlines only for keyboard navigation (not mouse clicks). Always provide a visible custom focus style if replacing the default.",
      },
      {
        question: "How do you implement focus trapping in a modal dialog?",
        difficulty: "Hard",
        hint:
          "1) On open: move focus to the first focusable element inside the modal. 2) Listen for Tab/Shift+Tab: if focus reaches the last element, wrap to the first (and vice versa). 3) Listen for Escape: close the modal. 4) On close: return focus to the element that opened the modal. 5) Add aria-modal='true' and role='dialog'. This prevents keyboard users from interacting with background content.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Level 7 — HTML5 APIs
  // ─────────────────────────────────────────────

  // ─────────────────────────────────────────────
  // 1. Local Storage
  // ─────────────────────────────────────────────
  {
    id: "html-local-storage",
    title: "Local Storage",
    slug: "html-local-storage",
    icon: "HardDrive",
    difficulty: "Intermediate",
    description:
      "Persist key-value data in the browser with no expiration — localStorage survives page reloads, tab closes, and browser restarts.",
    concept: {
      explanation:
        "localStorage is a Web Storage API that lets you store key-value pairs in the browser with no expiration date. Data persists even after the browser is closed and reopened. It stores strings only — objects must be serialized with JSON.stringify() and parsed back with JSON.parse(). Each origin (protocol + domain + port) gets its own isolated storage with a ~5MB limit. The API is synchronous and blocking — it runs on the main thread, so storing large amounts of data can freeze the UI. Key methods: setItem(key, value), getItem(key), removeItem(key), clear(), and the key(index) method. localStorage fires a 'storage' event on other tabs/windows of the same origin when data changes — useful for cross-tab communication. It's supported in all modern browsers. Common use cases: user preferences (theme, language), form draft data, shopping cart persistence, authentication tokens (though httpOnly cookies are safer for auth), and caching API responses. Never store sensitive data in localStorage — it's accessible via JavaScript and vulnerable to XSS attacks.",
      realLifeAnalogy:
        "localStorage is like a permanent sticky note on your desk. You write something on it, and it stays there even when you leave the office and come back the next day. It has limited space (one note pad), only holds text (no objects), and anyone who sits at your desk can read it (no security). sessionStorage is a note you throw away when you leave for the day.",
      keyPoints: [
        "Data persists forever — survives page reloads, tab closes, and browser restarts",
        "Stores strings only — use JSON.stringify/parse for objects and arrays",
        "~5MB storage limit per origin (protocol + domain + port)",
        "Synchronous API — blocks the main thread (don't store large data)",
        "Methods: setItem(), getItem(), removeItem(), clear(), key()",
        "'storage' event fires on OTHER tabs when data changes — enables cross-tab sync",
        "Never store sensitive data — accessible via JS, vulnerable to XSS",
        "Supported in all modern browsers including IE8+",
      ],
    },
    code: {
      language: "html",
      defaultCode: `<h2>localStorage Demo</h2>

<!-- Theme preference example -->
<button id="toggle-theme">Toggle Theme</button>
<p id="current-theme">Current: loading...</p>

<!-- Simple counter -->
<p>Visit count: <span id="count">0</span></p>
<button id="reset">Reset Count</button>

<!-- Save form draft -->
<h3>Draft Saver</h3>
<textarea id="draft" rows="3" cols="40"
  placeholder="Type something... it auto-saves!"></textarea>
<p id="draft-status"></p>

<script>
  // ===== Theme Toggle =====
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.getElementById('current-theme')
    .textContent = 'Current: ' + savedTheme;

  document.getElementById('toggle-theme')
    .addEventListener('click', () => {
    const current = localStorage.getItem('theme') || 'light';
    const next = current === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', next);
    document.getElementById('current-theme')
      .textContent = 'Current: ' + next;
  });

  // ===== Visit Counter =====
  let count = parseInt(localStorage.getItem('visits') || '0');
  count++;
  localStorage.setItem('visits', count.toString());
  document.getElementById('count').textContent = count;

  document.getElementById('reset').addEventListener('click', () => {
    localStorage.removeItem('visits');
    document.getElementById('count').textContent = '0';
  });

  // ===== Draft Auto-Save =====
  const draft = document.getElementById('draft');
  const status = document.getElementById('draft-status');
  draft.value = localStorage.getItem('draft') || '';
  if (draft.value) status.textContent = 'Draft restored!';

  draft.addEventListener('input', () => {
    localStorage.setItem('draft', draft.value);
    status.textContent = 'Draft saved at ' +
      new Date().toLocaleTimeString();
  });

  // ===== Storing Objects =====
  const user = { name: 'Alice', score: 95 };
  localStorage.setItem('user', JSON.stringify(user));
  const parsed = JSON.parse(localStorage.getItem('user'));
  console.log('Stored object:', parsed);
</script>`,
    },
    interviewQuestions: [
      {
        question: "What is the difference between localStorage and sessionStorage?",
        difficulty: "Easy",
        hint:
          "localStorage persists forever (until manually cleared) — data survives browser restarts. sessionStorage is cleared when the tab/window is closed. Both share the same API (setItem, getItem, removeItem, clear) and ~5MB limit per origin. Use localStorage for long-term preferences; use sessionStorage for temporary per-session data like form wizard state.",
      },
      {
        question: "Why should you never store authentication tokens in localStorage?",
        difficulty: "Medium",
        hint:
          "localStorage is accessible via JavaScript — any XSS vulnerability allows an attacker to steal tokens with document.cookie or localStorage.getItem('token'). HttpOnly cookies are safer because JavaScript cannot access them. localStorage also has no built-in expiration — stale tokens persist forever. For auth, use httpOnly, Secure, SameSite cookies instead.",
      },
      {
        question: "How can you use the storage event for cross-tab communication?",
        difficulty: "Hard",
        hint:
          "When localStorage changes in one tab, a 'storage' event fires on all OTHER tabs/windows of the same origin. Listen with window.addEventListener('storage', e => { ... }). The event object has key, oldValue, newValue, and url properties. Use case: user logs out in one tab → all other tabs detect the change and redirect to login. The event does NOT fire on the tab that made the change.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 2. Session Storage
  // ─────────────────────────────────────────────
  {
    id: "html-session-storage",
    title: "Session Storage",
    slug: "html-session-storage",
    icon: "Clock",
    difficulty: "Intermediate",
    description:
      "Store temporary key-value data scoped to a single browser tab — sessionStorage is cleared when the tab closes.",
    concept: {
      explanation:
        "sessionStorage is part of the Web Storage API, identical to localStorage in its API but with a critical difference: data is scoped to the browser tab and cleared when the tab or window is closed. Each tab gets its own isolated sessionStorage — opening the same URL in two tabs creates two separate storage instances. The API is the same: setItem(), getItem(), removeItem(), clear(). Like localStorage, it stores strings only (~5MB limit) and is synchronous. sessionStorage survives page reloads and in-page navigation within the same tab, but NOT when the tab is closed or duplicated (duplicate tabs get a copy of the data at duplication time, then diverge). Use cases: multi-step form wizard state (so the user doesn't lose progress on refresh but starts fresh in a new tab), one-time notification dismissals, per-tab UI state, scroll position restoration, and temporary authentication flow data. It's the right choice when data should NOT persist across sessions.",
      realLifeAnalogy:
        "sessionStorage is like a whiteboard in a meeting room. Everyone in that meeting (tab) can see and edit it, it survives a quick coffee break (page reload), but when the meeting ends (tab closes), the whiteboard is wiped clean. A new meeting in the same room starts with a blank whiteboard. localStorage is a permanent notice board in the hallway — it stays until someone removes it.",
      keyPoints: [
        "Data is scoped to the browser TAB — not shared between tabs",
        "Cleared automatically when the tab or window is closed",
        "Survives page reloads and in-page navigation within the same tab",
        "Same API as localStorage: setItem(), getItem(), removeItem(), clear()",
        "Stores strings only — ~5MB limit per origin per tab",
        "Duplicate tab gets a copy of data at duplication time, then diverges",
        "Use for: form wizard state, per-tab UI state, temporary session data",
        "Safer than localStorage for sensitive temporary data (auto-cleanup)",
      ],
    },
    code: {
      language: "html",
      defaultCode: `<h2>sessionStorage Demo</h2>

<!-- Multi-step form wizard -->
<h3>Form Wizard (survives refresh, resets on new tab)</h3>
<div id="wizard">
  <p>Step: <span id="step">1</span> / 3</p>
  <div id="step1">
    <label>Name: <input id="name" type="text"></label>
    <button onclick="nextStep(1)">Next →</button>
  </div>
  <div id="step2" style="display:none">
    <label>Email: <input id="email" type="email"></label>
    <button onclick="prevStep(2)">← Back</button>
    <button onclick="nextStep(2)">Next →</button>
  </div>
  <div id="step3" style="display:none">
    <p>Review:</p>
    <p id="review"></p>
    <button onclick="prevStep(3)">← Back</button>
    <button onclick="submitForm()">Submit</button>
  </div>
</div>

<hr>
<h3>Tab-specific counter</h3>
<p>This tab's count: <span id="count">0</span></p>
<button onclick="increment()">+1</button>
<p style="color:gray; font-size:12px;">
  Open another tab — it starts at 0 independently.
</p>

<script>
  // ===== Form Wizard with sessionStorage =====
  function restoreWizard() {
    const saved = sessionStorage.getItem('wizardStep');
    const step = saved ? parseInt(saved) : 1;
    showStep(step);

    document.getElementById('name').value =
      sessionStorage.getItem('wizard_name') || '';
    document.getElementById('email').value =
      sessionStorage.getItem('wizard_email') || '';
  }

  function showStep(n) {
    for (let i = 1; i <= 3; i++) {
      document.getElementById('step' + i).style.display =
        i === n ? 'block' : 'none';
    }
    document.getElementById('step').textContent = n;
    sessionStorage.setItem('wizardStep', n.toString());

    if (n === 3) {
      const name = sessionStorage.getItem('wizard_name') || '';
      const email = sessionStorage.getItem('wizard_email') || '';
      document.getElementById('review').textContent =
        name + ' — ' + email;
    }
  }

  function nextStep(current) {
    if (current === 1)
      sessionStorage.setItem('wizard_name',
        document.getElementById('name').value);
    if (current === 2)
      sessionStorage.setItem('wizard_email',
        document.getElementById('email').value);
    showStep(current + 1);
  }

  function prevStep(current) { showStep(current - 1); }

  function submitForm() {
    alert('Submitted: ' +
      sessionStorage.getItem('wizard_name') + ', ' +
      sessionStorage.getItem('wizard_email'));
    sessionStorage.removeItem('wizardStep');
    sessionStorage.removeItem('wizard_name');
    sessionStorage.removeItem('wizard_email');
    showStep(1);
  }

  restoreWizard();

  // ===== Per-tab counter =====
  let c = parseInt(sessionStorage.getItem('tabCount') || '0');
  document.getElementById('count').textContent = c;

  function increment() {
    c++;
    sessionStorage.setItem('tabCount', c.toString());
    document.getElementById('count').textContent = c;
  }
</script>`,
    },
    interviewQuestions: [
      {
        question: "When should you use sessionStorage instead of localStorage?",
        difficulty: "Easy",
        hint:
          "Use sessionStorage when data should NOT persist beyond the current tab session: multi-step form wizards, per-tab UI state, one-time dismissed notifications, temporary authentication flow data, and sensitive data that should auto-cleanup. Use localStorage for long-term preferences (theme, language), caching, and data that should persist across browser restarts.",
      },
      {
        question: "What happens to sessionStorage when you duplicate a tab?",
        difficulty: "Medium",
        hint:
          "The duplicated tab gets a COPY of the original tab's sessionStorage at the moment of duplication. After that, they diverge — changes in one tab don't affect the other. This is different from localStorage where all tabs share the same data. This copy-on-duplicate behaviour can cause unexpected bugs if your app assumes sessionStorage is always fresh.",
      },
      {
        question: "How does sessionStorage behave with browser back/forward navigation?",
        difficulty: "Medium",
        hint:
          "sessionStorage persists through back/forward navigation within the same tab because the session hasn't ended. If a user navigates away and comes back, sessionStorage data is still available. It's only cleared when the tab is CLOSED. This is useful for restoring scroll position or form state when the user navigates back, but can cause stale data issues if not managed.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 3. Geolocation API
  // ─────────────────────────────────────────────
  {
    id: "html-geolocation-api",
    title: "Geolocation API",
    slug: "html-geolocation-api",
    icon: "MapPin",
    difficulty: "Intermediate",
    description:
      "Get the user's geographic location with their permission — latitude, longitude, altitude, speed, and heading from the Geolocation API.",
    concept: {
      explanation:
        "The Geolocation API lets you request the user's geographic position. It requires explicit user permission — the browser shows a permission prompt, and the user can allow or deny. Access it via navigator.geolocation with two main methods: getCurrentPosition() (one-time location fetch) and watchPosition() (continuous tracking that fires on every position change). Both take a success callback (receives a GeolocationPosition object with coords.latitude, coords.longitude, coords.accuracy, coords.altitude, coords.speed, coords.heading) and an optional error callback. A third options parameter supports: enableHighAccuracy (uses GPS if available — slower but more precise), timeout (max wait time in ms), and maximumAge (accept cached position up to N ms old). The API only works on HTTPS (or localhost) — blocked on HTTP for security. Location sources vary: GPS (most accurate, outdoors), Wi-Fi positioning (moderate, indoors), IP-based (least accurate, fallback). Common use cases: store locators, delivery tracking, weather apps, maps, and location-based features. Always provide a fallback for denied permissions and handle errors gracefully.",
      realLifeAnalogy:
        "The Geolocation API is like asking someone 'Where are you right now?' They can choose to share their location or decline. getCurrentPosition() is asking once — 'What's your address?' watchPosition() is like sharing your live location on a messaging app — it continuously updates as you move. enableHighAccuracy is like using GPS navigation instead of a rough city-level estimate.",
      keyPoints: [
        "Requires explicit user permission — browser shows a permission prompt",
        "Only works on HTTPS (or localhost) — blocked on insecure HTTP",
        "getCurrentPosition(): one-time location fetch",
        "watchPosition(): continuous tracking, fires on every position change",
        "Returns: latitude, longitude, accuracy, altitude, speed, heading",
        "Options: enableHighAccuracy, timeout, maximumAge",
        "Always handle permission denied and error cases gracefully",
        "Location sources: GPS (accurate), Wi-Fi (moderate), IP (rough fallback)",
      ],
    },
    code: {
      language: "html",
      defaultCode: `<h2>Geolocation API Demo</h2>

<button id="get-location">Get My Location</button>
<button id="watch-btn">Start Tracking</button>
<button id="stop-btn" disabled>Stop Tracking</button>

<div id="result" style="margin-top: 16px;">
  <p>Status: <span id="status">Click a button above</span></p>
  <p>Latitude: <span id="lat">—</span></p>
  <p>Longitude: <span id="lon">—</span></p>
  <p>Accuracy: <span id="acc">—</span></p>
</div>

<h3>Options</h3>
<label>
  <input type="checkbox" id="high-acc"> High Accuracy (GPS)
</label>

<script>
  const statusEl = document.getElementById('status');
  const latEl = document.getElementById('lat');
  const lonEl = document.getElementById('lon');
  const accEl = document.getElementById('acc');
  let watchId = null;

  function getOptions() {
    return {
      enableHighAccuracy:
        document.getElementById('high-acc').checked,
      timeout: 10000,       // 10 second timeout
      maximumAge: 0          // no cached position
    };
  }

  function showPosition(position) {
    const { latitude, longitude, accuracy } = position.coords;
    statusEl.textContent = 'Location found!';
    statusEl.style.color = 'green';
    latEl.textContent = latitude.toFixed(6);
    lonEl.textContent = longitude.toFixed(6);
    accEl.textContent = Math.round(accuracy) + ' meters';
  }

  function showError(error) {
    statusEl.style.color = 'red';
    switch (error.code) {
      case error.PERMISSION_DENIED:
        statusEl.textContent = 'Permission denied';
        break;
      case error.POSITION_UNAVAILABLE:
        statusEl.textContent = 'Position unavailable';
        break;
      case error.TIMEOUT:
        statusEl.textContent = 'Request timed out';
        break;
    }
  }

  // One-time location
  document.getElementById('get-location')
    .addEventListener('click', () => {
    if (!navigator.geolocation) {
      statusEl.textContent = 'Geolocation not supported';
      return;
    }
    statusEl.textContent = 'Requesting location...';
    navigator.geolocation.getCurrentPosition(
      showPosition, showError, getOptions()
    );
  });

  // Continuous tracking
  document.getElementById('watch-btn')
    .addEventListener('click', () => {
    statusEl.textContent = 'Tracking...';
    watchId = navigator.geolocation.watchPosition(
      showPosition, showError, getOptions()
    );
    document.getElementById('watch-btn').disabled = true;
    document.getElementById('stop-btn').disabled = false;
  });

  document.getElementById('stop-btn')
    .addEventListener('click', () => {
    navigator.geolocation.clearWatch(watchId);
    statusEl.textContent = 'Tracking stopped';
    document.getElementById('watch-btn').disabled = false;
    document.getElementById('stop-btn').disabled = true;
  });
</script>`,
    },
    interviewQuestions: [
      {
        question: "Why does the Geolocation API only work on HTTPS?",
        difficulty: "Easy",
        hint:
          "Location data is highly sensitive — exposing it over insecure HTTP could allow man-in-the-middle attacks to intercept the user's coordinates. Browsers enforce HTTPS (or localhost for development) as a security requirement. This is part of a broader trend: powerful APIs (camera, microphone, geolocation, service workers) all require secure contexts.",
      },
      {
        question: "What is the difference between getCurrentPosition() and watchPosition()?",
        difficulty: "Easy",
        hint:
          "getCurrentPosition() fetches the location ONCE and calls the success callback. watchPosition() registers a continuous watcher that fires the callback every time the position changes (like live tracking). watchPosition() returns an ID used to stop tracking via clearWatch(id). Use getCurrentPosition() for store locators; use watchPosition() for navigation/delivery tracking.",
      },
      {
        question: "How do you handle the case when a user denies location permission?",
        difficulty: "Medium",
        hint:
          "The error callback receives an error object with error.code. PERMISSION_DENIED (code 1) means the user clicked 'Block'. You should: show a friendly message explaining why location is needed, offer manual entry as a fallback (zip code, city), and never block the entire app. You can check navigator.permissions.query({name:'geolocation'}) to detect the permission state before prompting.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 4. Drag and Drop API
  // ─────────────────────────────────────────────
  {
    id: "html-drag-and-drop",
    title: "Drag and Drop API",
    slug: "html-drag-and-drop",
    icon: "GripVertical",
    difficulty: "Intermediate",
    description:
      "Implement native drag-and-drop interactions with the HTML5 Drag and Drop API — drag elements, reorder lists, and handle file drops.",
    concept: {
      explanation:
        "The HTML5 Drag and Drop API enables native drag-and-drop interactions in the browser. Make any element draggable by adding the draggable='true' attribute. The API is event-driven with events on both the dragged element and the drop target. Drag events on the source: dragstart (user begins dragging — set data here), drag (fires continuously while dragging), and dragend (drag operation finished). Drop target events: dragenter (dragged item enters target), dragover (item is over target — must call preventDefault() to allow drop), dragleave (item leaves target), and drop (item is released on target — read data here). Data is transferred via the DataTransfer object (event.dataTransfer) using setData() and getData(). You can transfer text, URLs, HTML, or custom types. The API also handles file drops from the desktop — access files via event.dataTransfer.files. Common use cases: sortable lists (Kanban boards, Trello), file upload zones, reordering dashboard widgets, and drag-to-arrange layouts. The native API is verbose — libraries like dnd-kit and react-beautiful-dnd provide better abstractions for complex use cases.",
      realLifeAnalogy:
        "Drag and drop is like moving sticky notes on a whiteboard. You pick up a note (dragstart), move it across the board (drag/dragover), and place it in a new column (drop). The whiteboard columns are drop targets — you need to mark them as accepting notes (preventDefault on dragover). The dataTransfer object is like writing a label on the back of the sticky note so the target knows what it received.",
      keyPoints: [
        "Add draggable='true' to make any element draggable",
        "Must call preventDefault() on dragover to allow dropping",
        "Use dataTransfer.setData() in dragstart, getData() in drop",
        "Source events: dragstart, drag, dragend",
        "Target events: dragenter, dragover, dragleave, drop",
        "Can transfer text, URLs, HTML, files, or custom MIME types",
        "File drops from desktop: access via event.dataTransfer.files",
        "Native API is verbose — consider libraries for complex interactions",
      ],
    },
    code: {
      language: "html",
      defaultCode: `<h2>Drag and Drop Demo</h2>
<style>
  .drag-item {
    padding: 10px 16px;
    margin: 4px 0;
    background: #e0e7ff;
    border-radius: 8px;
    cursor: grab;
    user-select: none;
  }
  .drag-item.dragging { opacity: 0.4; }
  .drop-zone {
    min-height: 120px;
    padding: 12px;
    border: 2px dashed #94a3b8;
    border-radius: 12px;
    margin: 8px 0;
  }
  .drop-zone.over {
    border-color: #3b82f6;
    background: #eff6ff;
  }
  .columns { display: flex; gap: 16px; }
  .column { flex: 1; }
  .column h3 { font-size: 14px; margin-bottom: 8px; }
</style>

<div class="columns">
  <div class="column">
    <h3>To Do</h3>
    <div class="drop-zone" id="todo">
      <div class="drag-item" draggable="true">Learn HTML5 APIs</div>
      <div class="drag-item" draggable="true">Build portfolio</div>
      <div class="drag-item" draggable="true">Practice interviews</div>
    </div>
  </div>
  <div class="column">
    <h3>Done</h3>
    <div class="drop-zone" id="done"></div>
  </div>
</div>

<h3>File Drop Zone</h3>
<div class="drop-zone" id="file-drop"
     style="text-align:center; color:#94a3b8;">
  Drop files here
</div>
<p id="file-info"></p>

<script>
  // ===== Sortable Items =====
  document.querySelectorAll('.drag-item').forEach(item => {
    item.addEventListener('dragstart', e => {
      e.dataTransfer.setData('text/plain', e.target.textContent);
      e.target.classList.add('dragging');
    });
    item.addEventListener('dragend', e => {
      e.target.classList.remove('dragging');
    });
  });

  document.querySelectorAll('.drop-zone').forEach(zone => {
    zone.addEventListener('dragover', e => {
      e.preventDefault(); // Required to allow drop!
      zone.classList.add('over');
    });
    zone.addEventListener('dragleave', () => {
      zone.classList.remove('over');
    });
    zone.addEventListener('drop', e => {
      e.preventDefault();
      zone.classList.remove('over');
      const text = e.dataTransfer.getData('text/plain');
      // Move the dragging element
      const dragging = document.querySelector('.dragging');
      if (dragging) zone.appendChild(dragging);
    });
  });

  // ===== File Drop =====
  const fileDrop = document.getElementById('file-drop');
  fileDrop.addEventListener('dragover', e => {
    e.preventDefault();
    fileDrop.classList.add('over');
  });
  fileDrop.addEventListener('dragleave', () => {
    fileDrop.classList.remove('over');
  });
  fileDrop.addEventListener('drop', e => {
    e.preventDefault();
    fileDrop.classList.remove('over');
    const files = e.dataTransfer.files;
    const info = Array.from(files)
      .map(f => f.name + ' (' + (f.size/1024).toFixed(1) + ' KB)')
      .join(', ');
    document.getElementById('file-info').textContent =
      'Dropped: ' + info;
  });
</script>`,
    },
    interviewQuestions: [
      {
        question: "Why must you call preventDefault() on the dragover event?",
        difficulty: "Easy",
        hint:
          "By default, most elements do NOT allow dropping. The browser's default action for dragover is to reject the drop. Calling preventDefault() cancels this default rejection and signals that the element is a valid drop target. Without it, the drop event will never fire, even if you have a drop event listener. This is the most common gotcha with the Drag and Drop API.",
      },
      {
        question: "How does the DataTransfer object work?",
        difficulty: "Medium",
        hint:
          "DataTransfer is the bridge between drag source and drop target. In dragstart, use e.dataTransfer.setData('text/plain', data) to attach data. In drop, use e.dataTransfer.getData('text/plain') to read it. You can set multiple types (text/plain, text/html, application/json). For file drops from desktop, access e.dataTransfer.files (a FileList). setData/getData only works within the same drag operation.",
      },
      {
        question: "What are the limitations of the native Drag and Drop API?",
        difficulty: "Medium",
        hint:
          "1) Verbose — many events to handle for simple interactions. 2) No built-in reordering — you must track position manually. 3) Poor mobile support — touch events don't trigger drag events natively. 4) Inconsistent cross-browser behaviour. 5) No visual constraints or snap-to-grid. For production apps, libraries like dnd-kit, react-beautiful-dnd, or SortableJS handle these issues.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 5. Web Workers
  // ─────────────────────────────────────────────
  {
    id: "html-web-workers",
    title: "Web Workers",
    slug: "html-web-workers",
    icon: "Cpu",
    difficulty: "Advanced",
    description:
      "Run JavaScript in background threads — Web Workers keep CPU-intensive tasks off the main thread so the UI stays responsive.",
    concept: {
      explanation:
        "Web Workers allow you to run JavaScript in a background thread, separate from the main thread that handles the UI. This prevents heavy computations from freezing the page. Create a worker with new Worker('worker.js') — the worker script runs in its own global scope (no access to DOM, window, or document). Communication happens via message passing: the main thread sends data with worker.postMessage(data) and listens with worker.onmessage. The worker receives via self.onmessage and responds with self.postMessage(data). Data is copied (structured clone), not shared — so there's no race condition risk, but large data transfers have overhead. Types of workers: Dedicated Workers (one-to-one with a page), Shared Workers (shared across tabs/iframes of the same origin), and Service Workers (proxy network requests, enable offline). Use cases: parsing large JSON/CSV files, image processing, complex calculations (fibonacci, sorting millions of items), encryption/decryption, and running WebAssembly. Workers can import scripts via importScripts() and can create sub-workers. Terminate with worker.terminate() from main thread or self.close() from within.",
      realLifeAnalogy:
        "A Web Worker is like hiring an assistant to handle paperwork while you continue talking to customers. You (main thread) can't have the assistant talk to customers directly (no DOM access), but you can pass notes back and forth (postMessage). The assistant works in a separate room (thread) so their work doesn't slow down customer service (UI responsiveness).",
      keyPoints: [
        "Runs JavaScript in a separate background thread — UI stays responsive",
        "No access to DOM, window, or document — workers live in their own scope",
        "Communication via postMessage() and onmessage — data is copied, not shared",
        "Create with new Worker('worker.js') — requires a separate JS file or Blob URL",
        "Types: Dedicated (per-page), Shared (cross-tab), Service (network proxy/offline)",
        "Use for: heavy computation, parsing, image processing, encryption",
        "Terminate: worker.terminate() (main thread) or self.close() (from worker)",
        "Supported in all modern browsers — check with 'Worker' in window",
      ],
    },
    code: {
      language: "html",
      defaultCode: `<h2>Web Workers Demo</h2>

<h3>Heavy Computation (Fibonacci)</h3>
<label>Calculate fib(n): <input id="fib-input" type="number" value="40"></label>
<button id="calc-main">Run on Main Thread (freezes UI)</button>
<button id="calc-worker">Run on Web Worker (UI stays smooth)</button>
<p>Result: <span id="result">—</span></p>
<p>UI test: <input placeholder="Type here during calculation..."></p>

<h3>Worker Status</h3>
<p id="status">Ready</p>

<script>
  // ===== Main thread Fibonacci (BLOCKS UI) =====
  function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
  }

  document.getElementById('calc-main')
    .addEventListener('click', () => {
    const n = parseInt(document.getElementById('fib-input').value);
    document.getElementById('status').textContent = 'Computing on MAIN thread...';
    document.getElementById('result').textContent = '...';

    // This blocks the UI!
    setTimeout(() => {
      const start = performance.now();
      const answer = fibonacci(n);
      const time = (performance.now() - start).toFixed(0);
      document.getElementById('result').textContent =
        answer + ' (' + time + 'ms)';
      document.getElementById('status').textContent =
        'Done (UI was frozen during computation)';
    }, 50);
  });

  // ===== Web Worker Fibonacci (UI stays responsive) =====
  // Create worker from inline script using Blob URL
  const workerCode = \`
    function fibonacci(n) {
      if (n <= 1) return n;
      return fibonacci(n - 1) + fibonacci(n - 2);
    }

    self.onmessage = function(e) {
      const start = performance.now();
      const result = fibonacci(e.data);
      const time = (performance.now() - start).toFixed(0);
      self.postMessage({ result, time });
    };
  \`;

  const blob = new Blob([workerCode], { type: 'application/javascript' });
  const workerURL = URL.createObjectURL(blob);
  let worker = null;

  document.getElementById('calc-worker')
    .addEventListener('click', () => {
    const n = parseInt(document.getElementById('fib-input').value);
    document.getElementById('status').textContent =
      'Computing on WORKER thread... (try typing!)';
    document.getElementById('result').textContent = '...';

    worker = new Worker(workerURL);

    worker.onmessage = function(e) {
      document.getElementById('result').textContent =
        e.data.result + ' (' + e.data.time + 'ms)';
      document.getElementById('status').textContent =
        'Done (UI remained responsive!)';
      worker.terminate();
    };

    worker.onerror = function(err) {
      document.getElementById('status').textContent =
        'Worker error: ' + err.message;
    };

    worker.postMessage(n);
  });
</script>`,
    },
    interviewQuestions: [
      {
        question: "Why can't Web Workers access the DOM?",
        difficulty: "Medium",
        hint:
          "The DOM is not thread-safe — allowing multiple threads to read/write DOM simultaneously would cause race conditions and crashes. Web Workers run in an isolated global scope (DedicatedWorkerGlobalScope) with no access to window, document, or DOM APIs. They communicate via message passing (postMessage), which copies data between threads. This design prevents concurrency bugs at the cost of requiring explicit data transfer.",
      },
      {
        question: "What is the difference between Dedicated Workers, Shared Workers, and Service Workers?",
        difficulty: "Hard",
        hint:
          "Dedicated Workers: one-to-one with a page/tab, simplest type, for background computation. Shared Workers: shared across multiple tabs/windows of the same origin, connected via ports, for shared state/computation. Service Workers: proxy between app and network, can intercept fetch requests, enable offline support (PWA), push notifications, and background sync. Service Workers persist even when no tab is open.",
      },
      {
        question: "How is data transferred between the main thread and a Web Worker?",
        difficulty: "Medium",
        hint:
          "Data is sent via postMessage() and received via onmessage event. By default, data is COPIED using the structured clone algorithm — not shared. This means large objects are duplicated in memory. For performance with large data (ArrayBuffers), you can use Transferable Objects — transfer ownership instead of copying. After transfer, the original becomes unusable (neutered). Example: worker.postMessage(buffer, [buffer]).",
      },
    ],
  },
];

export const htmlModules: HTMLModule[] = [
  {
    id: "html-basics",
    level: 1,
    title: "HTML Basics",
    difficulty: "Beginner",
    description: "The foundation of web development — learn how HTML structures every web page.",
    topicIds: [
      "html-introduction",
      "html-document-structure",
      "html-elements-and-tags",
      "html-attributes",
      "headings-and-paragraphs",
      "text-formatting",
      "html-links",
      "html-images",
      "html-lists",
      "html-comments",
    ],
  },
  {
    id: "forms-and-content",
    level: 2,
    title: "Forms and Content Elements",
    difficulty: "Intermediate",
    description: "Master forms, inputs, tables, and content containers — the building blocks of interactive web pages.",
    topicIds: [
      "div-vs-span",
      "html-tables",
      "html-forms-basics",
      "html-input-types",
      "buttons-and-labels",
      "select-radio-checkbox",
      "fieldset-and-legend",
      "html-iframe",
    ],
  },
  {
    id: "semantic-html",
    level: 3,
    title: "Semantic HTML",
    difficulty: "Intermediate",
    description: "Write meaningful, accessible HTML — semantic elements that improve SEO, accessibility, and code clarity.",
    topicIds: [
      "semantic-html-overview",
      "html-header-tag",
      "html-nav-tag",
      "html-section-tag",
      "html-article-tag",
      "html-aside-tag",
      "html-footer-tag",
      "html-main-tag",
      "html-figure-figcaption",
    ],
  },
  {
    id: "media-elements",
    level: 4,
    title: "Media Elements",
    difficulty: "Intermediate",
    description: "Embed audio, video, graphics, and responsive images — master the HTML5 media elements.",
    topicIds: [
      "html-audio",
      "html-video",
      "html-canvas-basics",
      "html-svg-basics",
      "html-picture-element",
      "html-source-tag",
    ],
  },
  {
    id: "seo-and-metadata",
    level: 5,
    title: "SEO and Metadata",
    difficulty: "Intermediate",
    description: "Control how search engines and social platforms see your pages — meta tags, Open Graph, favicons, and robots directives.",
    topicIds: [
      "html-meta-tags",
      "html-viewport-meta",
      "html-open-graph",
      "html-favicon",
      "html-title-seo",
      "html-robots-meta",
    ],
  },
  {
    id: "accessibility",
    level: 6,
    title: "Accessibility",
    difficulty: "Intermediate",
    description: "Build inclusive websites — WCAG standards, ARIA, alt text, and keyboard navigation for real-world applications.",
    topicIds: [
      "web-accessibility-basics",
      "html-aria-roles",
      "html-aria-labels",
      "html-alt-text",
      "html-keyboard-navigation",
    ],
  },
  {
    id: "html5-apis",
    level: 7,
    title: "HTML5 APIs",
    difficulty: "Advanced",
    description: "Harness the power of HTML5 APIs — local storage, geolocation, drag-and-drop, and web workers for modern web apps.",
    topicIds: [
      "html-local-storage",
      "html-session-storage",
      "html-geolocation-api",
      "html-drag-and-drop",
      "html-web-workers",
    ],
  },
];
