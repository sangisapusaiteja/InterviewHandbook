import type { CSSTopic, CSSModule } from "@/types/css";

export const cssTopics: CSSTopic[] = [
  // ─── Level 1: CSS Fundamentals ───
  {
    id: "what-is-css",
    title: "What is CSS",
    slug: "what-is-css",
    icon: "Paintbrush",
    difficulty: "Beginner",
    description: "Understand what CSS is, why it exists, and how it styles web pages.",
    concept: {
      explanation:
        "CSS (Cascading Style Sheets) is a stylesheet language that controls the visual presentation of HTML documents. While HTML defines the structure and content of a web page, CSS defines how that content looks — colors, fonts, spacing, layout, and animations. The 'cascading' part means that styles can come from multiple sources (browser defaults, external stylesheets, inline styles) and CSS has rules for which style wins when there are conflicts. CSS separates presentation from content, which makes websites easier to maintain, faster to load, and more accessible.",
      realLifeAnalogy:
        "If HTML is the skeleton and walls of a house, CSS is the paint, wallpaper, furniture arrangement, and interior design. Two houses can have the same floor plan (same HTML) but look completely different depending on the decoration (CSS). You can even redecorate (change CSS) without rebuilding the walls (changing HTML).",
      keyPoints: [
        "CSS stands for Cascading Style Sheets",
        "It controls the visual appearance of HTML elements",
        "Separation of concerns: HTML = structure, CSS = presentation",
        "Three ways to add CSS: inline, internal (<style>), external (.css file)",
        "External stylesheets are the preferred method for production",
        "The cascade determines which styles take priority when rules conflict",
        "CSS is maintained by the W3C (World Wide Web Consortium)",
      ],
    },
    code: {
      defaultCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    /* Internal CSS — styles go inside <style> tags */
    body {
      font-family: Arial, sans-serif;
      background-color: #f0f4f8;
      padding: 40px;
    }

    h1 {
      color: #1a365d;
      border-bottom: 3px solid #3182ce;
      padding-bottom: 10px;
    }

    p {
      color: #4a5568;
      line-height: 1.6;
    }

    .highlight {
      background-color: #ebf8ff;
      padding: 16px;
      border-left: 4px solid #3182ce;
      border-radius: 4px;
    }
  </style>
</head>
<body>
  <h1>Hello, CSS!</h1>
  <p>This page is styled with CSS.</p>
  <div class="highlight">
    <p>CSS makes the web beautiful.</p>
  </div>
</body>
</html>`,
      language: "html",
    },
    interviewQuestions: [
      {
        question: "What does CSS stand for and what is its primary purpose?",
        difficulty: "Easy",
        hint: "Think about the separation between content and presentation on the web.",
      },
      {
        question: "What are the three ways to include CSS in an HTML document, and which is preferred?",
        difficulty: "Easy",
        hint: "Consider inline, internal, and external. Think about maintainability and reusability.",
      },
      {
        question: "What does 'cascading' mean in CSS?",
        difficulty: "Medium",
        hint: "Think about what happens when multiple CSS rules target the same element — specificity, source order, and importance.",
      },
    ],
  },
  {
    id: "css-syntax",
    title: "CSS Syntax",
    slug: "css-syntax",
    icon: "Braces",
    difficulty: "Beginner",
    description: "Learn the structure of CSS rules — selectors, properties, and values.",
    concept: {
      explanation:
        "A CSS rule consists of a selector and a declaration block. The selector targets which HTML elements to style. The declaration block (inside curly braces) contains one or more declarations, each consisting of a property and a value separated by a colon, ending with a semicolon. For example, in `h1 { color: blue; }`, 'h1' is the selector, 'color' is the property, and 'blue' is the value. Multiple declarations can be placed inside one rule, and multiple rules make up a stylesheet. Understanding this structure is fundamental to writing and reading any CSS.",
      realLifeAnalogy:
        "Think of CSS rules like instructions for a painter. The selector is the room name ('kitchen'), and the declarations are the painting instructions ('wall color: yellow; trim color: white'). Each instruction has a what (property) and a how (value).",
      keyPoints: [
        "A CSS rule = selector + declaration block { }",
        "Each declaration = property: value;",
        "Semicolons separate declarations; the last one is optional but recommended",
        "Curly braces { } wrap the declaration block",
        "Selectors can target elements, classes, IDs, attributes, and more",
        "Properties are predefined CSS keywords (color, font-size, margin, etc.)",
        "Values depend on the property (colors, lengths, keywords)",
        "CSS is case-insensitive for property names but case-sensitive for class/ID selectors",
      ],
    },
    code: {
      defaultCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    /* Rule structure:
       selector { property: value; } */

    /* Element selector */
    h1 {
      color: #2d3748;
      font-size: 28px;
      text-align: center;
    }

    /* Class selector */
    .card {
      background: white;
      padding: 20px;
      margin: 16px 0;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    /* Multiple declarations in one rule */
    .card p {
      color: #718096;
      font-size: 14px;
      line-height: 1.6;
      margin: 0;
    }

    /* Grouping selectors with comma */
    h1, h2, h3 {
      font-family: Georgia, serif;
    }
  </style>
</head>
<body style="background:#edf2f7; padding:30px; font-family:sans-serif;">
  <h1>CSS Syntax</h1>
  <div class="card">
    <p><strong>Selector</strong> → targets the element</p>
    <p><strong>Property</strong> → what to change</p>
    <p><strong>Value</strong> → the new setting</p>
  </div>
</body>
</html>`,
      language: "html",
    },
    interviewQuestions: [
      {
        question: "What are the three parts of a CSS rule?",
        difficulty: "Easy",
        hint: "Think about what targets the element, and what goes inside the curly braces.",
      },
      {
        question: "What happens if you forget the semicolon between two CSS declarations?",
        difficulty: "Medium",
        hint: "The browser tries to parse everything as one declaration — the second property becomes part of the first value.",
      },
      {
        question: "Can you group multiple selectors in one CSS rule? How?",
        difficulty: "Easy",
        hint: "Think about using a comma to separate selectors that share the same styles.",
      },
    ],
  },
  {
    id: "css-selectors-basics",
    title: "CSS Selectors Basics",
    slug: "css-selectors-basics",
    icon: "MousePointerClick",
    difficulty: "Beginner",
    description: "Target HTML elements using element, class, ID, and universal selectors.",
    concept: {
      explanation:
        "CSS selectors are patterns used to target HTML elements for styling. The most basic selectors are: the element selector (targets all elements of a type, like `p`), the class selector (targets elements with a specific class, like `.intro`), the ID selector (targets a single element with a specific ID, like `#header`), and the universal selector (`*` targets all elements). Class selectors are the most commonly used in modern CSS because they're reusable and have moderate specificity. ID selectors have higher specificity but should be used sparingly since IDs must be unique per page.",
      realLifeAnalogy:
        "Selectors are like addressing a letter. 'All houses' is the universal selector (*). 'All blue houses' is an element selector. 'Houses with mailbox number 42' is an ID selector (#42). 'Houses with a garden' is a class selector (.garden) — many houses can have gardens.",
      keyPoints: [
        "Element selector: `p { }` — targets all <p> elements",
        "Class selector: `.name { }` — targets all elements with class='name'",
        "ID selector: `#name { }` — targets the single element with id='name'",
        "Universal selector: `* { }` — targets every element",
        "Specificity order: inline > #id > .class > element > *",
        "Classes are reusable (many elements can share a class)",
        "IDs must be unique — only one element per ID per page",
        "Combine selectors: `div.card` targets <div> elements with class 'card'",
      ],
    },
    code: {
      defaultCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    /* Universal selector — resets all elements */
    * {
      margin: 0;
      box-sizing: border-box;
    }

    /* Element selector */
    body {
      font-family: system-ui, sans-serif;
      padding: 30px;
      background: #f7fafc;
    }

    /* Element selector */
    h2 {
      color: #2d3748;
      margin-bottom: 12px;
    }

    /* Class selector — reusable */
    .card {
      background: white;
      padding: 16px;
      margin-bottom: 12px;
      border-radius: 8px;
      border: 1px solid #e2e8f0;
    }

    /* ID selector — unique */
    #special {
      border-left: 4px solid #3182ce;
      background: #ebf8ff;
    }

    /* Combined: element + class */
    p.note {
      font-size: 13px;
      color: #718096;
      font-style: italic;
    }
  </style>
</head>
<body>
  <h2>CSS Selectors</h2>

  <div class="card">
    <p>This div has class="card"</p>
  </div>

  <div class="card" id="special">
    <p>This div has class="card" AND id="special"</p>
  </div>

  <div class="card">
    <p class="note">This paragraph has class="note"</p>
  </div>
</body>
</html>`,
      language: "html",
    },
    interviewQuestions: [
      {
        question: "What is the difference between a class selector and an ID selector?",
        difficulty: "Easy",
        hint: "Think about reusability and specificity — one uses a dot, the other uses a hash.",
      },
      {
        question: "What is CSS specificity and how do basic selectors rank?",
        difficulty: "Medium",
        hint: "Inline styles beat IDs, IDs beat classes, classes beat elements, elements beat *.",
      },
      {
        question: "When should you use a class vs an ID selector?",
        difficulty: "Medium",
        hint: "Consider how many elements need the style and whether the identifier has other uses (like JavaScript hooks).",
      },
    ],
  },
  {
    id: "css-colors",
    title: "CSS Colors",
    slug: "css-colors",
    icon: "Palette",
    difficulty: "Beginner",
    description: "Apply colors using named values, hex codes, RGB, HSL, and transparency.",
    concept: {
      explanation:
        "CSS offers several ways to define colors. Named colors (like 'red', 'blue') are the simplest but limited to ~147 predefined names. Hexadecimal codes (#FF0000) use a 6-digit format representing Red, Green, and Blue channels (00-FF each). RGB uses `rgb(255, 0, 0)` with decimal values 0-255 per channel. HSL uses `hsl(0, 100%, 50%)` representing Hue (0-360°), Saturation (0-100%), and Lightness (0-100%) — often the most intuitive for designers. All formats support an alpha (transparency) channel: rgba(), hsla(), or #RRGGBBAA. Colors can be applied to text (color), backgrounds (background-color), borders (border-color), and more.",
      realLifeAnalogy:
        "Think of color formats like different ways to give someone a paint color. Named colors are like saying 'red'. Hex is like giving a paint store code (#FF0000). RGB is like mixing exact amounts of red, green, and blue paint. HSL is like using a color wheel — pick a hue, then adjust how vivid and how light it is.",
      keyPoints: [
        "Named colors: red, blue, coral, etc. (~147 options)",
        "Hex: #RRGGBB — each pair is 0-9, A-F (e.g., #3182ce)",
        "Shorthand hex: #RGB → #RRGGBB (e.g., #f00 = #ff0000)",
        "RGB: rgb(R, G, B) — values from 0 to 255",
        "HSL: hsl(hue, saturation%, lightness%) — intuitive color picking",
        "Alpha transparency: rgba(0,0,0,0.5) or hsla(0,0%,0%,0.5)",
        "Modern syntax: rgb(0 0 0 / 0.5) — space-separated with slash for alpha",
        "currentColor keyword inherits the element's text color",
      ],
    },
    code: {
      defaultCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: system-ui, sans-serif;
      padding: 30px;
      background: #f7fafc;
    }

    .swatch {
      display: inline-block;
      width: 100px;
      height: 60px;
      margin: 8px;
      border-radius: 8px;
      text-align: center;
      line-height: 60px;
      font-size: 11px;
      font-weight: bold;
      color: white;
      text-shadow: 0 1px 2px rgba(0,0,0,0.3);
    }

    /* Named color */
    .named    { background-color: coral; }

    /* Hex color */
    .hex      { background-color: #3182ce; }

    /* RGB */
    .rgb      { background-color: rgb(56, 161, 105); }

    /* HSL */
    .hsl      { background-color: hsl(270, 60%, 55%); }

    /* RGBA — semi-transparent */
    .rgba     {
      background-color: rgba(0, 0, 0, 0.4);
    }

    /* HSLA */
    .hsla     {
      background-color: hsla(340, 80%, 55%, 0.8);
    }
  </style>
</head>
<body>
  <h2 style="margin-bottom:16px; color:#2d3748;">CSS Color Formats</h2>

  <div class="swatch named">coral</div>
  <div class="swatch hex">#3182ce</div>
  <div class="swatch rgb">rgb()</div>
  <div class="swatch hsl">hsl()</div>
  <div class="swatch rgba">rgba()</div>
  <div class="swatch hsla">hsla()</div>
</body>
</html>`,
      language: "html",
    },
    interviewQuestions: [
      {
        question: "What is the difference between rgb() and hsl()?",
        difficulty: "Easy",
        hint: "RGB mixes red/green/blue channels. HSL uses a color wheel with hue, saturation, and lightness.",
      },
      {
        question: "How do you make a color semi-transparent in CSS?",
        difficulty: "Easy",
        hint: "Use rgba() or hsla() with an alpha value between 0 (invisible) and 1 (opaque), or the 8-digit hex format.",
      },
      {
        question: "What is the difference between opacity and rgba transparency?",
        difficulty: "Medium",
        hint: "opacity affects the entire element and its children, while rgba only affects the specific color property it's applied to.",
      },
    ],
  },
  {
    id: "css-units",
    title: "CSS Units",
    slug: "css-units",
    icon: "Ruler",
    difficulty: "Beginner",
    description: "Understand px, em, rem, %, vw, vh, and when to use each unit.",
    concept: {
      explanation:
        "CSS has two categories of length units: absolute and relative. Absolute units like `px` (pixels) are fixed regardless of context — 16px is always 16px. Relative units scale based on something else: `em` is relative to the parent element's font-size, `rem` is relative to the root (<html>) font-size (default 16px), `%` is relative to the parent element's size, `vw` is 1% of the viewport width, and `vh` is 1% of the viewport height. Modern CSS best practice uses `rem` for typography (consistent scaling), `px` for borders/shadows (precision), `%` or viewport units for layout widths, and avoids `em` in nested contexts due to compounding.",
      realLifeAnalogy:
        "Absolute units (px) are like measuring in inches — always the same. Relative units are like saying 'half the room width' (50%) or 'twice the base font size' (2em). If the room (parent) gets bigger, so does 'half'. `rem` is like measuring relative to the building's standard — it doesn't change room by room.",
      keyPoints: [
        "px — absolute, fixed size, good for borders and small details",
        "em — relative to parent's font-size; compounds when nested",
        "rem — relative to root (<html>) font-size; consistent, no compounding",
        "% — relative to the parent element's dimension",
        "vw — 1% of viewport width; great for fluid layouts",
        "vh — 1% of viewport height; useful for full-screen sections",
        "Default root font-size is 16px, so 1rem = 16px",
        "Use rem for font sizes, px for borders, % or vw/vh for layouts",
      ],
    },
    code: {
      defaultCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    /* Root font-size = 16px (browser default) */
    html { font-size: 16px; }

    body {
      font-family: system-ui, sans-serif;
      padding: 30px;
      background: #f7fafc;
      margin: 0;
    }

    .demo {
      margin-bottom: 16px;
      padding: 12px 16px;
      background: white;
      border-radius: 8px;
      border: 1px solid #e2e8f0;
    }

    .demo code {
      color: #3182ce;
      font-weight: bold;
    }

    /* px — always 20px */
    .px-demo  { font-size: 20px; }

    /* rem — 1.5 × 16px = 24px */
    .rem-demo { font-size: 1.5rem; }

    /* em — relative to parent (body = 16px) */
    .em-demo  { font-size: 1.25em; }

    /* % width — 50% of parent */
    .pct-demo {
      width: 50%;
      background: #ebf8ff;
      padding: 12px;
      border-radius: 8px;
    }

    /* vw — 80% of viewport width */
    .vw-demo {
      width: 80vw;
      background: #f0fff4;
      padding: 12px;
      border-radius: 8px;
    }

    /* vh — 15% of viewport height */
    .vh-demo {
      height: 15vh;
      background: #fff5f5;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <h2 style="color:#2d3748; margin-bottom:16px;">CSS Units</h2>

  <div class="demo px-demo">
    <code>20px</code> — fixed pixel size
  </div>
  <div class="demo rem-demo">
    <code>1.5rem</code> — 1.5 × root font (24px)
  </div>
  <div class="demo em-demo">
    <code>1.25em</code> — 1.25 × parent font (20px)
  </div>
  <div class="demo">
    <div class="pct-demo"><code>width: 50%</code> of parent</div>
  </div>
  <div class="demo">
    <div class="vw-demo"><code>width: 80vw</code> of viewport</div>
  </div>
  <div class="demo">
    <div class="vh-demo"><code>height: 15vh</code> of viewport</div>
  </div>
</body>
</html>`,
      language: "html",
    },
    interviewQuestions: [
      {
        question: "What is the difference between em and rem?",
        difficulty: "Easy",
        hint: "em compounds — it's relative to the parent's font-size. rem always refers to the root (<html>) font-size.",
      },
      {
        question: "Why is rem generally preferred over em for font sizes?",
        difficulty: "Medium",
        hint: "Think about what happens when elements are nested multiple levels deep with em-based sizing.",
      },
      {
        question: "When would you use vw/vh instead of percentage?",
        difficulty: "Medium",
        hint: "Percentage is relative to the parent, but vw/vh is always relative to the viewport — useful when the parent isn't full-width.",
      },
    ],
  },
  {
    id: "css-comments",
    title: "CSS Comments",
    slug: "css-comments",
    icon: "MessageSquare",
    difficulty: "Beginner",
    description: "Add comments to CSS code for documentation and debugging.",
    concept: {
      explanation:
        "CSS comments use the `/* comment */` syntax. Everything between `/*` and `*/` is ignored by the browser. Unlike HTML comments (<!-- -->) or JavaScript comments (// and /* */), CSS only supports the block comment syntax — there is no single-line comment in CSS. Comments are used to explain complex rules, organize sections of a stylesheet, temporarily disable code during debugging, and document design decisions. Well-commented CSS is crucial for team collaboration and long-term maintenance. Comments can span single or multiple lines.",
      realLifeAnalogy:
        "CSS comments are like sticky notes on a blueprint. The builder (browser) ignores them, but they help anyone reading the plans understand why certain decisions were made. You can also use them to 'cross out' parts of the plan temporarily without erasing them.",
      keyPoints: [
        "Syntax: /* This is a comment */",
        "Can span multiple lines",
        "No single-line comment syntax in CSS (// doesn't work)",
        "Use comments to organize stylesheet sections",
        "Use comments to explain why, not what (the code shows what)",
        "Comment out code temporarily for debugging",
        "Comments are stripped in production by minifiers",
        "Nested comments are NOT supported — /* /* nested */ */ breaks",
      ],
    },
    code: {
      defaultCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    /* ===========================
       CSS Comments Demo
       =========================== */

    /* Reset */
    * { margin: 0; box-sizing: border-box; }

    body {
      font-family: system-ui, sans-serif;
      padding: 30px;
      background: #f7fafc;
    }

    /* Section: Typography
       ------------------- */
    h2 {
      color: #2d3748;
      margin-bottom: 16px;
      /* font-style: italic; — disabled for now */
    }

    /* Card component
       Used on homepage and dashboard */
    .card {
      background: white;
      padding: 16px;
      margin-bottom: 12px;
      border-radius: 8px;
      border: 1px solid #e2e8f0;

      /* TODO: add hover shadow later */
    }

    /*
      Multi-line comment:
      This rule uses !important because it overrides
      a third-party library style. Remove when the
      library is updated.
    */
    .alert {
      color: #c53030 !important;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <h2>CSS Comments</h2>
  <div class="card">
    <p>Comments help organize and document your CSS.</p>
  </div>
  <div class="card">
    <p class="alert">This uses !important (see comment in CSS).</p>
  </div>
</body>
</html>`,
      language: "html",
    },
    interviewQuestions: [
      {
        question: "What is the correct syntax for CSS comments?",
        difficulty: "Easy",
        hint: "CSS uses /* */ for comments. Unlike JavaScript, there is no // single-line comment.",
      },
      {
        question: "Can you nest CSS comments inside each other?",
        difficulty: "Easy",
        hint: "No — the browser closes the comment at the first */ it finds, which breaks nested comments.",
      },
      {
        question: "Do CSS comments affect page performance?",
        difficulty: "Medium",
        hint: "They increase file size (more bytes to download), but minifiers remove them in production builds.",
      },
    ],
  },
  {
    id: "css-box-model",
    title: "CSS Box Model",
    slug: "css-box-model",
    icon: "Box",
    difficulty: "Beginner",
    description: "Understand the content, padding, border, and margin that make up every element.",
    concept: {
      explanation:
        "Every HTML element is rendered as a rectangular box. The CSS Box Model describes the four layers of this box from inside out: content (the actual text/image), padding (space between content and border), border (the visible edge), and margin (space outside the border separating the element from neighbours). By default (`content-box`), width and height set the content size — padding and border are added on top, making the total element bigger. With `box-sizing: border-box`, width and height include padding and border, which is far more intuitive and the reason most CSS resets include `* { box-sizing: border-box; }`. Understanding the box model is essential for debugging layout issues.",
      realLifeAnalogy:
        "Think of a picture in a frame on a wall. The picture itself is the content. The matting (white space between picture and frame) is padding. The frame is the border. The gap between the frame and the next frame on the wall is the margin. With `border-box`, when you say 'this frame is 10 inches wide', the frame, matting, and picture all fit within those 10 inches.",
      keyPoints: [
        "Every element = content + padding + border + margin",
        "Content: the text, image, or child elements",
        "Padding: space inside the border, around the content",
        "Border: visible edge of the element",
        "Margin: space outside the border, between elements",
        "Default box-sizing: content-box (width = content only)",
        "border-box: width includes content + padding + border",
        "Always use `* { box-sizing: border-box; }` in your resets",
        "Margins collapse vertically — adjacent margins overlap, the larger one wins",
      ],
    },
    code: {
      defaultCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    * { margin: 0; box-sizing: border-box; }

    body {
      font-family: system-ui, sans-serif;
      padding: 30px;
      background: #f7fafc;
    }

    h2 { color: #2d3748; margin-bottom: 16px; }

    /* Visual box model demo */
    .box-model {
      /* Margin — outermost (shown with background) */
      background: #fed7d7;
      padding: 20px; /* simulates margin area */
      border-radius: 8px;
      margin-bottom: 20px;
      text-align: center;
    }

    .box-model .border-area {
      background: #fefcbf;
      border: 4px solid #d69e2e;
      padding: 20px;
      border-radius: 6px;
    }

    .box-model .padding-area {
      background: #c6f6d5;
      padding: 20px;
      border-radius: 4px;
    }

    .box-model .content-area {
      background: #bee3f8;
      padding: 16px;
      border-radius: 4px;
      font-weight: bold;
      color: #2a4365;
    }

    /* Comparison */
    .compare {
      display: flex;
      gap: 16px;
      margin-top: 16px;
    }
    .compare div {
      width: 200px;
      padding: 20px;
      border: 4px solid #3182ce;
      background: #ebf8ff;
      font-size: 13px;
    }
    .content-box { box-sizing: content-box; }
    .border-box  { box-sizing: border-box; }
  </style>
</head>
<body>
  <h2>CSS Box Model</h2>

  <div class="box-model">
    <span style="font-size:11px;color:#c53030;">Margin</span>
    <div class="border-area">
      <span style="font-size:11px;color:#975a16;">Border</span>
      <div class="padding-area">
        <span style="font-size:11px;color:#276749;">Padding</span>
        <div class="content-area">Content</div>
      </div>
    </div>
  </div>

  <h3 style="color:#4a5568;font-size:14px;margin-bottom:8px;">content-box vs border-box (both width: 200px)</h3>
  <div class="compare">
    <div class="content-box">
      <strong>content-box</strong><br>
      Total: 200 + 40 + 8 = 248px
    </div>
    <div class="border-box">
      <strong>border-box</strong><br>
      Total: exactly 200px
    </div>
  </div>
</body>
</html>`,
      language: "html",
    },
    interviewQuestions: [
      {
        question: "What are the four parts of the CSS Box Model?",
        difficulty: "Easy",
        hint: "From inside out: content, padding, border, margin.",
      },
      {
        question: "What is the difference between content-box and border-box?",
        difficulty: "Medium",
        hint: "content-box: width = content only (padding/border added extra). border-box: width includes everything.",
      },
      {
        question: "What is margin collapsing and when does it happen?",
        difficulty: "Hard",
        hint: "Adjacent vertical margins overlap — the larger wins. Happens between siblings and parent-child in certain conditions.",
      },
    ],
  },
  {
    id: "css-margin",
    title: "CSS Margin",
    slug: "css-margin",
    icon: "Maximize",
    difficulty: "Beginner",
    description: "Control the outer spacing between elements using margin properties.",
    concept: {
      explanation:
        "Margin is the outermost layer of the box model — the transparent space outside an element's border that separates it from neighbouring elements. You can set margins on individual sides (margin-top, margin-right, margin-bottom, margin-left) or use the shorthand `margin` property. The shorthand accepts 1-4 values: one value applies to all sides, two values set vertical and horizontal, three set top, horizontal, bottom, and four set all sides clockwise (top, right, bottom, left). `margin: auto` on a block element with a set width centres it horizontally. Negative margins are valid and pull elements closer or overlap them. Vertical margins between adjacent block elements collapse — only the larger margin is applied.",
      realLifeAnalogy:
        "Margin is like the personal space bubble around a person. It pushes other people away from you. `margin: auto` is like standing in the exact centre of a hallway. Negative margins are like stepping into someone else's personal space.",
      keyPoints: [
        "Margin creates space outside the border",
        "Shorthand: margin: top right bottom left (clockwise)",
        "margin: 10px → all sides; margin: 10px 20px → vertical horizontal",
        "margin: auto centres a block element with a defined width",
        "Margins can be negative to pull elements closer",
        "Vertical margins collapse between adjacent block elements",
        "Margin does not have a background colour — it's always transparent",
        "Inline elements only respect horizontal margins (left/right)",
      ],
    },
    code: {
      defaultCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    * { margin: 0; box-sizing: border-box; }

    body {
      font-family: system-ui, sans-serif;
      padding: 30px;
      background: #f7fafc;
    }

    h2 { color: #2d3748; margin-bottom: 16px; }

    .box {
      background: #ebf8ff;
      border: 2px solid #3182ce;
      padding: 12px;
      font-size: 13px;
      border-radius: 6px;
    }

    /* Individual sides */
    .m-top    { margin-top: 20px; }
    .m-bottom { margin-bottom: 20px; }

    /* Shorthand: vertical | horizontal */
    .m-short  { margin: 10px 30px; }

    /* Auto centering */
    .m-center {
      width: 60%;
      margin: 20px auto;
      text-align: center;
      background: #f0fff4;
      border-color: #38a169;
    }

    /* Negative margin — overlap */
    .m-negative {
      margin-top: -10px;
      background: #fff5f5;
      border-color: #e53e3e;
      position: relative;
      z-index: 1;
    }

    .label {
      font-size: 11px;
      color: #718096;
      margin-bottom: 4px;
    }
  </style>
</head>
<body>
  <h2>CSS Margin</h2>

  <p class="label">margin-bottom: 20px ↓</p>
  <div class="box m-bottom">margin-bottom: 20px</div>

  <p class="label">margin-top: 20px ↑</p>
  <div class="box m-top">margin-top: 20px</div>

  <p class="label" style="margin-top:16px;">margin: 10px 30px</p>
  <div class="box m-short">Vertical 10px, Horizontal 30px</div>

  <p class="label" style="margin-top:16px;">margin: 20px auto (centered)</p>
  <div class="box m-center">Auto-centered block</div>

  <p class="label" style="margin-top:16px;">Negative margin: -10px (overlaps above)</p>
  <div class="box" style="margin-bottom:0;">Normal box</div>
  <div class="box m-negative">margin-top: -10px</div>
</body>
</html>`,
      language: "html",
    },
    interviewQuestions: [
      {
        question: "How does `margin: auto` work for centering?",
        difficulty: "Easy",
        hint: "The browser divides the remaining horizontal space equally between left and right. The element needs a defined width.",
      },
      {
        question: "What is margin collapsing?",
        difficulty: "Medium",
        hint: "When two adjacent vertical margins touch, they merge into one — the larger value wins instead of adding both.",
      },
      {
        question: "Can you use negative margins in CSS? What happens?",
        difficulty: "Medium",
        hint: "Yes — negative margins pull the element (or its neighbors) closer, potentially overlapping elements.",
      },
    ],
  },
  {
    id: "css-padding",
    title: "CSS Padding",
    slug: "css-padding",
    icon: "Square",
    difficulty: "Beginner",
    description: "Control the inner spacing between content and border using padding.",
    concept: {
      explanation:
        "Padding is the space between an element's content and its border — the inner spacing of the box model. Unlike margin (which is outside the border), padding is inside and shows the element's background color. You can set padding on individual sides (padding-top, padding-right, padding-bottom, padding-left) or use the shorthand `padding` property with the same 1-4 value syntax as margin. Padding cannot be negative (unlike margin). With the default `content-box` sizing, padding adds to the element's total size. With `border-box`, padding is included within the set width/height. Padding is crucial for creating breathing room inside cards, buttons, and containers.",
      realLifeAnalogy:
        "Padding is like the foam inside a package box. The box (border) stays the same size, but the foam (padding) protects and spaces out the item (content) inside. More foam means more space between the item and the box edges.",
      keyPoints: [
        "Padding is the space between content and border",
        "Shows the element's background color (unlike margin)",
        "Shorthand: padding: top right bottom left (clockwise)",
        "padding: 10px → all; padding: 10px 20px → vertical horizontal",
        "Padding CANNOT be negative",
        "With content-box, padding adds to the total element size",
        "With border-box, padding is included in the width/height",
        "Use padding for spacing inside elements (buttons, cards, sections)",
      ],
    },
    code: {
      defaultCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    * { margin: 0; box-sizing: border-box; }

    body {
      font-family: system-ui, sans-serif;
      padding: 30px;
      background: #f7fafc;
    }

    h2 { color: #2d3748; margin-bottom: 16px; }

    .demo {
      margin-bottom: 16px;
    }

    .label {
      font-size: 11px;
      color: #718096;
      margin-bottom: 4px;
    }

    /* No padding */
    .no-pad {
      background: #fed7d7;
      border: 2px solid #e53e3e;
      font-size: 13px;
      border-radius: 6px;
    }

    /* Uniform padding */
    .pad-all {
      background: #c6f6d5;
      border: 2px solid #38a169;
      padding: 20px;
      font-size: 13px;
      border-radius: 6px;
    }

    /* Different per side */
    .pad-sides {
      background: #ebf8ff;
      border: 2px solid #3182ce;
      padding: 10px 40px 10px 40px;
      font-size: 13px;
      border-radius: 6px;
    }

    /* Button examples */
    .btn {
      display: inline-block;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      cursor: pointer;
      color: white;
      background: #3182ce;
      margin-right: 8px;
    }
    .btn-small  { padding: 6px 12px; }
    .btn-medium { padding: 10px 20px; }
    .btn-large  { padding: 14px 28px; }
  </style>
</head>
<body>
  <h2>CSS Padding</h2>

  <div class="demo">
    <p class="label">No padding — content touches the border</p>
    <div class="no-pad">No padding</div>
  </div>

  <div class="demo">
    <p class="label">padding: 20px — equal on all sides</p>
    <div class="pad-all">padding: 20px</div>
  </div>

  <div class="demo">
    <p class="label">padding: 10px 40px — more horizontal space</p>
    <div class="pad-sides">padding: 10px 40px</div>
  </div>

  <div class="demo">
    <p class="label">Padding controls button sizes:</p>
    <button class="btn btn-small">Small</button>
    <button class="btn btn-medium">Medium</button>
    <button class="btn btn-large">Large</button>
  </div>
</body>
</html>`,
      language: "html",
    },
    interviewQuestions: [
      {
        question: "What is the difference between padding and margin?",
        difficulty: "Easy",
        hint: "Padding is inside the border (shows background color). Margin is outside the border (always transparent).",
      },
      {
        question: "Can padding be negative?",
        difficulty: "Easy",
        hint: "No — padding cannot be negative. Only margin supports negative values.",
      },
      {
        question: "How does padding behave differently with content-box vs border-box?",
        difficulty: "Medium",
        hint: "content-box: padding adds extra size. border-box: padding is included within width/height, shrinking the content area.",
      },
    ],
  },
  {
    id: "css-border",
    title: "CSS Border",
    slug: "css-border",
    icon: "Frame",
    difficulty: "Beginner",
    description: "Style element borders with width, style, color, and border-radius.",
    concept: {
      explanation:
        "The CSS border sits between padding and margin in the box model. A border has three properties: width (thickness), style (solid, dashed, dotted, etc.), and color. The shorthand `border: 2px solid #333` sets all three at once. You can style individual sides with border-top, border-right, border-bottom, border-left. `border-radius` rounds the corners — a single value rounds all corners equally, four values set each corner individually, and `border-radius: 50%` creates a circle (on a square element). The `outline` property looks similar but doesn't take up space in the layout and sits outside the border. Borders are commonly used for cards, buttons, dividers, and form inputs.",
      realLifeAnalogy:
        "A border is like the frame around a painting. It can be thick or thin (width), a solid line or dashed (style), and any colour. Border-radius is like rounding the corners of the frame. A fully rounded frame (50%) turns a square painting into a circular one.",
      keyPoints: [
        "Shorthand: border: width style color (e.g., 2px solid #333)",
        "Styles: solid, dashed, dotted, double, groove, ridge, none",
        "Set individual sides: border-top, border-right, etc.",
        "border-radius rounds corners (px, %, or em)",
        "border-radius: 50% makes a circle from a square",
        "Borders affect total element size (unless border-box)",
        "outline is similar but doesn't affect layout — used for focus indicators",
        "border: none or border: 0 removes borders entirely",
      ],
    },
    code: {
      defaultCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    * { margin: 0; box-sizing: border-box; }

    body {
      font-family: system-ui, sans-serif;
      padding: 30px;
      background: #f7fafc;
    }

    h2 { color: #2d3748; margin-bottom: 16px; }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 12px;
      margin-bottom: 24px;
    }

    .box {
      padding: 16px;
      background: white;
      font-size: 12px;
      text-align: center;
      color: #4a5568;
    }

    /* Border styles */
    .solid  { border: 3px solid #3182ce; }
    .dashed { border: 3px dashed #e53e3e; }
    .dotted { border: 3px dotted #38a169; }
    .double { border: 4px double #d69e2e; }
    .groove { border: 4px groove #805ad5; }

    /* Border radius */
    .rounded-sm { border: 2px solid #3182ce; border-radius: 4px; }
    .rounded-md { border: 2px solid #3182ce; border-radius: 12px; }
    .rounded-lg { border: 2px solid #3182ce; border-radius: 24px; }
    .circle {
      border: 3px solid #e53e3e;
      border-radius: 50%;
      width: 80px;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
    }

    /* Individual sides */
    .left-only {
      border-left: 4px solid #3182ce;
      border-radius: 0;
      background: #ebf8ff;
    }
  </style>
</head>
<body>
  <h2>Border Styles</h2>
  <div class="grid">
    <div class="box solid">solid</div>
    <div class="box dashed">dashed</div>
    <div class="box dotted">dotted</div>
    <div class="box double">double</div>
    <div class="box groove">groove</div>
  </div>

  <h2>Border Radius</h2>
  <div class="grid">
    <div class="box rounded-sm">4px</div>
    <div class="box rounded-md">12px</div>
    <div class="box rounded-lg">24px</div>
    <div class="box"><div class="circle">50%</div></div>
  </div>

  <h2>Single Side</h2>
  <div class="box left-only" style="margin-top:12px;">
    border-left: 4px solid blue
  </div>
</body>
</html>`,
      language: "html",
    },
    interviewQuestions: [
      {
        question: "What are the three components of the border shorthand property?",
        difficulty: "Easy",
        hint: "width, style, and color — e.g., border: 2px solid #333.",
      },
      {
        question: "How do you create a circular element using CSS?",
        difficulty: "Easy",
        hint: "Set equal width and height, then border-radius: 50%.",
      },
      {
        question: "What is the difference between border and outline?",
        difficulty: "Medium",
        hint: "Border is part of the box model and affects layout size. Outline is painted outside the border and doesn't affect layout.",
      },
    ],
  },
  // ─── Level 2: CSS Selectors and Specificity ───
  {
    id: "css-class-selector",
    title: "Class Selector",
    slug: "css-class-selector",
    icon: "Tag",
    difficulty: "Beginner",
    description: "Target reusable groups of elements using the .class selector.",
    concept: {
      explanation:
        "The class selector targets every element that has a specific class attribute. It uses a dot (.) followed by the class name: `.card { }`. Classes are the workhorse of CSS because they're reusable — multiple elements can share the same class, and one element can have multiple classes separated by spaces. This makes classes perfect for creating design systems and component-based styling. You can combine a class with an element selector (`div.card`) to be more specific, or chain multiple classes (`.card.featured`) to target elements that have both classes. In modern CSS methodologies like BEM, classes are the primary — sometimes only — selector used.",
      realLifeAnalogy:
        "A class is like a membership badge. Many people can carry a 'VIP' badge, and one person can carry both a 'VIP' badge and a 'Speaker' badge. Rules for 'VIP' badge holders apply to everyone wearing that badge.",
      keyPoints: [
        "Syntax: .classname { } — the dot is required",
        "Multiple elements can share the same class",
        "One element can have multiple classes: class=\"card featured\"",
        "Chain classes: .card.featured targets elements with BOTH classes",
        "Combine with element: div.card targets only <div> elements with class 'card'",
        "Specificity: 0-1-0 — higher than element selectors, lower than IDs",
        "Classes are case-sensitive: .Card ≠ .card",
        "Prefer classes over IDs for styling — they're more flexible and reusable",
      ],
    },
    code: {
      defaultCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    * { margin: 0; box-sizing: border-box; }
    body { font-family: system-ui, sans-serif; padding: 30px; background: #f7fafc; }

    /* Single class */
    .card {
      background: white;
      padding: 16px;
      margin-bottom: 12px;
      border-radius: 8px;
      border: 1px solid #e2e8f0;
    }

    /* Chained classes — must have BOTH */
    .card.featured {
      border-left: 4px solid #3182ce;
      background: #ebf8ff;
    }

    /* Element + class */
    p.note {
      font-size: 13px;
      color: #718096;
      font-style: italic;
    }

    /* Multiple classes on one element */
    .text-bold { font-weight: bold; }
    .text-blue { color: #3182ce; }
    .text-sm   { font-size: 13px; }
  </style>
</head>
<body>
  <h2 style="margin-bottom:16px; color:#2d3748;">Class Selector</h2>

  <div class="card">
    <p>Basic card with <code>.card</code></p>
  </div>

  <div class="card featured">
    <p>Featured card with <code>.card.featured</code></p>
  </div>

  <p class="note">This paragraph uses <code>p.note</code></p>

  <div class="card">
    <p class="text-bold text-blue text-sm">
      Multiple classes: .text-bold .text-blue .text-sm
    </p>
  </div>
</body>
</html>`,
      language: "html",
    },
    interviewQuestions: [
      {
        question: "What is the difference between .card.featured and .card .featured?",
        difficulty: "Medium",
        hint: "Without space: element must have BOTH classes. With space: .featured is a descendant inside .card.",
      },
      {
        question: "Can an element have multiple CSS classes? How?",
        difficulty: "Easy",
        hint: "Yes — separate class names with spaces in the class attribute: class=\"card featured large\".",
      },
      {
        question: "Why are classes preferred over IDs for styling?",
        difficulty: "Medium",
        hint: "Classes are reusable, have moderate specificity (easier to override), and support multiple per element.",
      },
    ],
  },
  {
    id: "css-id-selector",
    title: "ID Selector",
    slug: "css-id-selector",
    icon: "Hash",
    difficulty: "Beginner",
    description: "Target a unique element using the #id selector and understand its high specificity.",
    concept: {
      explanation:
        "The ID selector uses a hash (#) followed by the element's id attribute value: `#header { }`. IDs must be unique per page — only one element can have a given ID. Because of this uniqueness, ID selectors have very high specificity (1-0-0), making them difficult to override without using other IDs or !important. This high specificity is actually a disadvantage in most CSS architectures, which is why modern best practices recommend reserving IDs for JavaScript hooks and anchor links, while using classes for styling. An ID selector will always beat any combination of class and element selectors.",
      realLifeAnalogy:
        "An ID is like a social security number — unique to exactly one person. A class is like a job title — many people can be 'engineers'. Using an ID for styling is like addressing a letter to a specific person by SSN instead of their role — overly specific and hard to change.",
      keyPoints: [
        "Syntax: #idname { } — the hash is required",
        "IDs must be unique — only ONE element per ID per page",
        "Specificity: 1-0-0 — higher than any number of classes",
        "One #id beats 100 .classes in specificity",
        "IDs are case-sensitive in CSS",
        "Prefer classes for styling; reserve IDs for JS and anchor links",
        "An element can have only one ID but multiple classes",
        "IDs also serve as URL fragment identifiers: page.html#section",
      ],
    },
    code: {
      defaultCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    * { margin: 0; box-sizing: border-box; }
    body { font-family: system-ui, sans-serif; padding: 30px; background: #f7fafc; }

    /* ID selector — unique target */
    #main-header {
      background: #2d3748;
      color: white;
      padding: 16px 20px;
      border-radius: 8px;
      margin-bottom: 16px;
    }

    #sidebar {
      background: #ebf8ff;
      border: 2px solid #3182ce;
      padding: 16px;
      border-radius: 8px;
      margin-bottom: 16px;
    }

    /* Specificity demo: ID beats class */
    .red-text { color: red; }
    #winner   { color: green; }
    /* #winner wins even though .red-text
       appears later in the stylesheet */
  </style>
</head>
<body>
  <div id="main-header">
    <h2>#main-header — unique element</h2>
  </div>

  <div id="sidebar">
    <p>#sidebar — another unique element</p>
  </div>

  <p id="winner" class="red-text" style="font-size:18px; margin-top:12px;">
    I have both id="winner" and class="red-text".
    The ID selector wins — I'm green!
  </p>
</body>
</html>`,
      language: "html",
    },
    interviewQuestions: [
      {
        question: "Why is using ID selectors for styling considered a bad practice?",
        difficulty: "Medium",
        hint: "Their high specificity (1-0-0) makes them very hard to override without resorting to more IDs or !important.",
      },
      {
        question: "What is the specificity of #header .nav a?",
        difficulty: "Medium",
        hint: "Count: 1 ID + 1 class + 1 element = 1-1-1.",
      },
      {
        question: "Can two elements on the same page share the same ID?",
        difficulty: "Easy",
        hint: "No — IDs must be unique per page. The browser may style both, but it's invalid HTML and breaks JS methods like getElementById.",
      },
    ],
  },
  {
    id: "css-attribute-selectors",
    title: "Attribute Selectors",
    slug: "css-attribute-selectors",
    icon: "Settings",
    difficulty: "Intermediate",
    description: "Target elements based on their attributes or attribute values.",
    concept: {
      explanation:
        "Attribute selectors match elements based on the presence or value of their HTML attributes. The basic form `[attr]` matches any element that has the attribute, regardless of value. More specific forms include: `[attr=\"value\"]` (exact match), `[attr^=\"val\"]` (starts with), `[attr$=\"val\"]` (ends with), `[attr*=\"val\"]` (contains), and `[attr~=\"val\"]` (word in space-separated list). Attribute selectors have the same specificity as class selectors (0-1-0). They're particularly useful for styling form elements based on their type, links based on their href, or any element based on data attributes — all without adding extra classes.",
      realLifeAnalogy:
        "Attribute selectors are like filters on a search engine. [href] is 'show me all results that have a link'. [href$='.pdf'] is 'show me only PDF links'. [type='email'] is 'show me only email inputs'. You're filtering by properties rather than by name.",
      keyPoints: [
        "[attr] — has the attribute (any value)",
        "[attr=\"value\"] — exact match",
        "[attr^=\"val\"] — starts with 'val'",
        "[attr$=\"val\"] — ends with 'val'",
        "[attr*=\"val\"] — contains 'val' anywhere",
        "[attr~=\"val\"] — 'val' is one of space-separated words",
        "[attr|=\"val\"] — exact match or starts with 'val-' (language codes)",
        "Specificity: 0-1-0 — same as a class selector",
        "Add 'i' for case-insensitive: [attr=\"val\" i]",
      ],
    },
    code: {
      defaultCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    * { margin: 0; box-sizing: border-box; }
    body { font-family: system-ui, sans-serif; padding: 30px; background: #f7fafc; }
    h2 { color: #2d3748; margin-bottom: 16px; }

    .demo { margin-bottom: 20px; }
    .demo label { display: block; font-size: 13px; margin-bottom: 4px; color: #4a5568; }

    /* [attr] — has the attribute */
    [disabled] {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* [attr="value"] — exact match */
    [type="email"] {
      border: 2px solid #3182ce;
      padding: 8px;
      border-radius: 6px;
    }

    /* [attr^="val"] — starts with */
    a[href^="https"] {
      color: #38a169;
    }
    a[href^="http:"] {
      color: #e53e3e;
    }

    /* [attr$="val"] — ends with */
    a[href$=".pdf"] {
      font-weight: bold;
    }
    a[href$=".pdf"]::after {
      content: " (PDF)";
      font-size: 11px;
      color: #e53e3e;
    }

    /* [attr*="val"] — contains */
    [class*="btn"] {
      padding: 8px 16px;
      border: none;
      border-radius: 6px;
      color: white;
      cursor: pointer;
      margin-right: 8px;
    }

    .link-list a {
      display: block;
      padding: 6px 0;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <h2>Attribute Selectors</h2>

  <div class="demo">
    <label>type="email" — blue border:</label>
    <input type="email" placeholder="you@example.com" style="width:250px">
  </div>

  <div class="demo">
    <label>[disabled] — faded:</label>
    <input type="text" disabled value="I'm disabled" style="padding:8px;border-radius:6px;border:1px solid #ccc">
  </div>

  <div class="demo link-list">
    <label>Links — colored by protocol, PDF marked:</label>
    <a href="https://example.com">https://example.com (green)</a>
    <a href="http://old-site.com">http://old-site.com (red)</a>
    <a href="https://docs.example.com/guide.pdf">guide.pdf download</a>
  </div>

  <div class="demo">
    <label>[class*="btn"] — targets any class containing "btn":</label>
    <button class="btn-primary" style="background:#3182ce">Primary</button>
    <button class="btn-danger" style="background:#e53e3e">Danger</button>
  </div>
</body>
</html>`,
      language: "html",
    },
    interviewQuestions: [
      {
        question: "How would you style all external links differently from internal links?",
        difficulty: "Medium",
        hint: "Use a[href^='http'] to target links starting with http. Internal links typically start with '/' or '#'.",
      },
      {
        question: "What is the difference between [attr~='val'] and [attr*='val']?",
        difficulty: "Hard",
        hint: "~= matches a whole word in a space-separated list. *= matches the substring anywhere in the attribute value.",
      },
      {
        question: "What specificity does an attribute selector have?",
        difficulty: "Medium",
        hint: "Same as a class selector: 0-1-0. [type='text'] has the same weight as .text-input.",
      },
    ],
  },
  {
    id: "css-group-selectors",
    title: "Group Selectors",
    slug: "css-group-selectors",
    icon: "ListPlus",
    difficulty: "Beginner",
    description: "Apply the same styles to multiple selectors using comma-separated grouping.",
    concept: {
      explanation:
        "Group selectors let you apply the same styles to multiple selectors at once by separating them with commas. Instead of writing the same declarations for `h1 { }`, `h2 { }`, and `h3 { }` separately, you write `h1, h2, h3 { }`. This keeps your CSS DRY (Don't Repeat Yourself). You can group any types of selectors — elements, classes, IDs, and even complex selectors. Each selector in the group is independent — if one selector is invalid, modern browsers still apply styles to the valid ones (though older browsers may discard the entire rule). Grouping is one of the simplest but most effective ways to reduce CSS file size.",
      realLifeAnalogy:
        "Grouping is like sending a group text message. Instead of texting 'Meeting at 3pm' individually to Alice, Bob, and Carol, you add them all to one message. The message (styles) is the same, but multiple recipients (selectors) receive it.",
      keyPoints: [
        "Syntax: selector1, selector2, selector3 { }",
        "Each selector is independent — specificity calculated separately",
        "Can mix selector types: h1, .title, #main { }",
        "Reduces code repetition and file size",
        "If one selector is invalid, others still work (in modern browsers)",
        "Each selector in the group starts fresh — no combining",
        "Commas go between selectors, not inside them",
        "Often used for reset styles and typography baselines",
      ],
    },
    code: {
      defaultCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    * { margin: 0; box-sizing: border-box; }
    body { font-family: system-ui, sans-serif; padding: 30px; background: #f7fafc; }

    /* Group selector — same styles for all headings */
    h1, h2, h3 {
      font-family: Georgia, serif;
      color: #2d3748;
      margin-bottom: 8px;
    }

    /* Mix selector types */
    .alert, .warning, #notice {
      padding: 12px 16px;
      border-radius: 8px;
      margin-bottom: 12px;
      font-size: 14px;
    }

    /* Individual styles still apply */
    .alert   { background: #fed7d7; color: #c53030; }
    .warning { background: #fefcbf; color: #975a16; }
    #notice  { background: #c6f6d5; color: #276749; }

    /* Common reset */
    ul, ol {
      padding-left: 20px;
      margin: 12px 0;
    }

    li {
      margin-bottom: 4px;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <h1>Heading 1</h1>
  <h2>Heading 2</h2>
  <h3>Heading 3</h3>
  <p style="font-size:13px;color:#718096;margin-bottom:16px;">
    All headings share font-family and color via grouping.
  </p>

  <div class="alert">Alert — .alert</div>
  <div class="warning">Warning — .warning</div>
  <div id="notice">Notice — #notice</div>

  <h3 style="margin-top:16px;">Grouped list reset:</h3>
  <ul><li>Unordered item</li><li>Another item</li></ul>
  <ol><li>Ordered item</li><li>Another item</li></ol>
</body>
</html>`,
      language: "html",
    },
    interviewQuestions: [
      {
        question: "What happens if one selector in a grouped rule is invalid?",
        difficulty: "Medium",
        hint: "In modern browsers the valid selectors still work. But in older browsers the entire rule might be discarded.",
      },
      {
        question: "Is the specificity of `h1, .title` the same for both parts?",
        difficulty: "Medium",
        hint: "No — each selector has its own specificity. h1 = 0-0-1, .title = 0-1-0. They just share declarations.",
      },
      {
        question: "How does grouping selectors help with CSS maintenance?",
        difficulty: "Easy",
        hint: "It eliminates duplicate declarations — change the style in one place and it applies to all grouped selectors.",
      },
    ],
  },
  {
    id: "css-descendant-selector",
    title: "Descendant Selector",
    slug: "css-descendant-selector",
    icon: "GitFork",
    difficulty: "Beginner",
    description: "Target elements nested inside other elements using the space combinator.",
    concept: {
      explanation:
        "The descendant selector (also called the descendant combinator) targets elements that are nested inside another element, at any depth. It's written as two selectors separated by a space: `.card p { }` targets all `<p>` elements inside any element with class 'card', whether they're direct children or deeply nested. This is one of the most commonly used combinators in CSS. However, deeply nested descendant selectors like `.header .nav .menu .item a` can be fragile — they break when the HTML structure changes and have higher specificity than necessary. Modern CSS favours flat, class-based selectors over deep descendant chains.",
      realLifeAnalogy:
        "A descendant selector is like saying 'all rooms inside Building A' — it doesn't matter if the room is on the first floor or the fifth floor, or inside another room. Any room that is somewhere inside Building A matches.",
      keyPoints: [
        "Syntax: ancestor descendant { } — separated by a SPACE",
        "Matches at ANY depth — children, grandchildren, etc.",
        "Most commonly used combinator in CSS",
        ".card p targets every <p> anywhere inside .card",
        "Specificity adds up: .card p = 0-1-1",
        "Deep nesting (.a .b .c .d) is fragile — avoid more than 2-3 levels",
        "Different from child selector (>) which only matches direct children",
        "Space is the combinator — no special character needed",
      ],
    },
    code: {
      defaultCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    * { margin: 0; box-sizing: border-box; }
    body { font-family: system-ui, sans-serif; padding: 30px; background: #f7fafc; }

    /* Descendant: any <p> inside .card */
    .card p {
      color: #4a5568;
      font-size: 14px;
      line-height: 1.6;
    }

    /* Descendant: any <a> inside .nav */
    .nav a {
      color: #3182ce;
      text-decoration: none;
      margin-right: 16px;
    }
    .nav a:hover { text-decoration: underline; }

    /* Deeper nesting still works */
    .card .meta span {
      font-size: 12px;
      color: #a0aec0;
    }

    .card {
      background: white;
      padding: 16px;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      margin-bottom: 12px;
    }

    .nav {
      background: #2d3748;
      padding: 12px 20px;
      border-radius: 8px;
      margin-bottom: 16px;
    }
    .nav a { color: #a0d2ff; }
  </style>
</head>
<body>
  <nav class="nav">
    <a href="#">Home</a>
    <a href="#">About</a>
    <a href="#">Blog</a>
  </nav>

  <div class="card">
    <p>Direct child paragraph — matches .card p</p>
    <div class="meta">
      <span>Deeply nested span — matches .card .meta span</span>
    </div>
    <div>
      <div>
        <p>Deeply nested paragraph — still matches .card p</p>
      </div>
    </div>
  </div>
</body>
</html>`,
      language: "html",
    },
    interviewQuestions: [
      {
        question: "What is the difference between `.card p` and `.card > p`?",
        difficulty: "Medium",
        hint: "Space (descendant) matches at any depth. > (child) matches only direct children.",
      },
      {
        question: "Why should you avoid deeply nested selectors like `.header .nav .menu .item a`?",
        difficulty: "Medium",
        hint: "High specificity, brittle to HTML changes, hard to override, and poor performance (browser reads right to left).",
      },
      {
        question: "What is the specificity of `div.card p.intro`?",
        difficulty: "Medium",
        hint: "Count: 0 IDs + 2 classes + 2 elements = 0-2-2.",
      },
    ],
  },
  {
    id: "css-child-selector",
    title: "Child Selector",
    slug: "css-child-selector",
    icon: "ChevronRight",
    difficulty: "Intermediate",
    description: "Target only direct children using the > combinator.",
    concept: {
      explanation:
        "The child selector (>) targets only the direct children of an element — not grandchildren or deeper descendants. `.card > p` matches `<p>` elements that are immediately inside `.card`, but not `<p>` elements nested deeper. This is more precise than the descendant selector (space) and prevents styles from leaking into nested components. It's especially useful in component-based architectures where you want to style a component's direct content without affecting nested sub-components. Other combinators include the adjacent sibling (+) which targets the next sibling, and the general sibling (~) which targets all following siblings.",
      realLifeAnalogy:
        "The child selector is like saying 'rooms directly on the first floor' — not rooms inside those rooms. The descendant selector would include all rooms at any floor. The child selector only goes one level deep.",
      keyPoints: [
        "Syntax: parent > child { } — the > is the combinator",
        "Only matches DIRECT children, not deeper descendants",
        "More precise than descendant selector — prevents style leaking",
        "Useful for component-scoped styling",
        ".card > p only matches <p> directly inside .card",
        "Adjacent sibling: A + B matches B immediately after A",
        "General sibling: A ~ B matches all B siblings after A",
        "Specificity is the same as descendant — it's the selectors that count",
      ],
    },
    code: {
      defaultCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    * { margin: 0; box-sizing: border-box; }
    body { font-family: system-ui, sans-serif; padding: 30px; background: #f7fafc; }
    h2 { color: #2d3748; margin-bottom: 16px; }

    .parent {
      background: white;
      padding: 16px;
      border: 2px solid #e2e8f0;
      border-radius: 8px;
      margin-bottom: 16px;
    }

    /* Child selector: only direct <p> children */
    .parent > p {
      color: #3182ce;
      font-weight: bold;
      padding: 8px;
      background: #ebf8ff;
      border-radius: 4px;
      margin-bottom: 8px;
    }

    .nested {
      background: #f7fafc;
      padding: 12px;
      border: 1px dashed #a0aec0;
      border-radius: 4px;
    }

    /* Adjacent sibling: element right after h3 */
    h3 + p {
      color: #38a169;
      font-style: italic;
    }

    /* General sibling: all p after h3 */
    h3 ~ p {
      margin-top: 4px;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <h2>Child Selector (>)</h2>
  <div class="parent">
    <p>Direct child — styled blue ✓</p>
    <p>Direct child — styled blue ✓</p>
    <div class="nested">
      <p>Nested paragraph — NOT styled (not a direct child)</p>
    </div>
  </div>

  <h2>Sibling Selectors (+ and ~)</h2>
  <div class="parent">
    <h3 style="margin-bottom:8px;">Title</h3>
    <p>Adjacent sibling (h3 + p) — green italic</p>
    <p>General sibling (h3 ~ p) — also matched</p>
    <p>General sibling (h3 ~ p) — also matched</p>
  </div>
</body>
</html>`,
      language: "html",
    },
    interviewQuestions: [
      {
        question: "When would you use > instead of a space in a selector?",
        difficulty: "Medium",
        hint: "When you want to style only the direct children of a container, preventing styles from leaking into nested sub-components.",
      },
      {
        question: "What is the difference between + and ~ sibling selectors?",
        difficulty: "Medium",
        hint: "+ selects only the immediately next sibling. ~ selects all following siblings.",
      },
      {
        question: "Does the > selector change the specificity compared to a descendant selector?",
        difficulty: "Medium",
        hint: "No — combinators (> + ~ space) don't add to specificity. Only the selectors themselves count.",
      },
    ],
  },
  {
    id: "css-pseudo-classes",
    title: "Pseudo Classes",
    slug: "css-pseudo-classes",
    icon: "MousePointerClick",
    difficulty: "Intermediate",
    description: "Style elements based on state or position using :hover, :focus, :nth-child, and more.",
    concept: {
      explanation:
        "Pseudo-classes select elements based on their state or position in the DOM, using a single colon (:) syntax. State-based pseudo-classes include `:hover` (mouse over), `:focus` (keyboard/click focus), `:active` (being clicked), `:visited` (clicked links), `:checked` (toggled inputs), and `:disabled`. Structural pseudo-classes include `:first-child`, `:last-child`, `:nth-child(n)` (pattern-based), and `:not()` (negation). Pseudo-classes have the same specificity as classes (0-1-0). They're essential for creating interactive interfaces — hover effects on buttons, focus styles for accessibility, zebra-striped tables, and form validation states (`:valid`, `:invalid`).",
      realLifeAnalogy:
        "Pseudo-classes are like adjectives that describe a state: 'the hovered button', 'the focused input', 'the first child'. You're not creating a new class — you're targeting an element when it's in a particular condition, like saying 'the door when it's open' vs 'the door when it's closed'.",
      keyPoints: [
        ":hover — mouse is over the element",
        ":focus — element has keyboard/click focus",
        ":active — element is being clicked/activated",
        ":first-child / :last-child — position in parent",
        ":nth-child(n) — pattern: odd, even, 3n, 2n+1",
        ":not(selector) — negation — matches everything except",
        ":checked — for checked checkboxes/radios",
        ":disabled / :enabled — form element states",
        "Specificity: 0-1-0 — same as a class",
        "Order matters for links: :link :visited :hover :active (LVHA)",
      ],
    },
    code: {
      defaultCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    * { margin: 0; box-sizing: border-box; }
    body { font-family: system-ui, sans-serif; padding: 30px; background: #f7fafc; }
    h2 { color: #2d3748; margin: 16px 0 12px; }

    /* :hover — mouse over */
    .btn {
      padding: 10px 20px;
      background: #3182ce;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      transition: background 0.2s;
    }
    .btn:hover {
      background: #2c5282;
    }
    .btn:active {
      background: #1a365d;
      transform: scale(0.98);
    }

    /* :focus — keyboard focus */
    input {
      padding: 8px 12px;
      border: 2px solid #e2e8f0;
      border-radius: 6px;
      outline: none;
      font-size: 14px;
      transition: border-color 0.2s;
    }
    input:focus {
      border-color: #3182ce;
      box-shadow: 0 0 0 3px rgba(49,130,206,0.2);
    }

    /* :nth-child — zebra stripes */
    .list { list-style: none; padding: 0; }
    .list li {
      padding: 10px 16px;
      font-size: 14px;
    }
    .list li:nth-child(odd) {
      background: #ebf8ff;
    }
    .list li:first-child {
      font-weight: bold;
      border-radius: 8px 8px 0 0;
    }
    .list li:last-child {
      border-radius: 0 0 8px 8px;
    }

    /* :not() — negate */
    p:not(.skip) {
      color: #4a5568;
      font-size: 14px;
      margin-bottom: 4px;
    }
  </style>
</head>
<body>
  <h2>:hover and :active</h2>
  <button class="btn">Hover & click me</button>

  <h2>:focus</h2>
  <input type="text" placeholder="Click or Tab into me">

  <h2>:nth-child (zebra stripes)</h2>
  <ul class="list">
    <li>Item 1 (:first-child, bold)</li>
    <li>Item 2 (odd bg)</li>
    <li>Item 3</li>
    <li>Item 4 (odd bg)</li>
    <li>Item 5 (:last-child)</li>
  </ul>

  <h2>:not()</h2>
  <p>Styled normally</p>
  <p class="skip" style="color:red;">Skipped by :not(.skip)</p>
  <p>Styled normally</p>
</body>
</html>`,
      language: "html",
    },
    interviewQuestions: [
      {
        question: "What is the difference between :hover and :focus?",
        difficulty: "Easy",
        hint: ":hover triggers on mouse over. :focus triggers when the element receives keyboard or click focus. Both are important for different input methods.",
      },
      {
        question: "How does :nth-child() work and what patterns can it accept?",
        difficulty: "Medium",
        hint: "It takes a formula: 'odd', 'even', 'An+B' (e.g., 3n selects every 3rd, 2n+1 selects odd). n starts from 0.",
      },
      {
        question: "Why is the LVHA order important for link pseudo-classes?",
        difficulty: "Hard",
        hint: ":link, :visited, :hover, :active must be in this order because of specificity — each state overrides the previous when active.",
      },
    ],
  },
  {
    id: "css-pseudo-elements",
    title: "Pseudo Elements",
    slug: "css-pseudo-elements",
    icon: "PenTool",
    difficulty: "Intermediate",
    description: "Insert virtual content with ::before and ::after, and style parts of elements.",
    concept: {
      explanation:
        "Pseudo-elements create virtual elements that don't exist in the HTML DOM, using a double colon (::) syntax. `::before` inserts content before an element's actual content, and `::after` inserts content after it — both require the `content` property to work (even if it's an empty string). Other pseudo-elements include `::first-line` (first line of text), `::first-letter` (first letter for drop caps), `::selection` (highlighted text), and `::placeholder` (input placeholder text). Pseudo-elements are commonly used for decorative elements (icons, arrows, dividers), clearing floats, creating tooltips, and adding visual indicators without polluting the HTML. Each selector can have only one pseudo-element.",
      realLifeAnalogy:
        "Pseudo-elements are like accessories you attach to an outfit without sewing them in. ::before is a pin you attach to the front, ::after is a tag on the back. They appear visually but aren't part of the original garment (HTML). The 'content' property is the accessory itself — without it, there's nothing to attach.",
      keyPoints: [
        "Use :: (double colon) — single : works but :: is correct for pseudo-elements",
        "::before — insert content before the element's content",
        "::after — insert content after the element's content",
        "content property is REQUIRED — even content: '' for empty",
        "::first-line — style the first line of a block of text",
        "::first-letter — style the first letter (drop caps)",
        "::selection — style user-highlighted text",
        "::placeholder — style input placeholder text",
        "Pseudo-elements are inline by default — set display for sizing",
        "Specificity: 0-0-1 — same as an element selector",
      ],
    },
    code: {
      defaultCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    * { margin: 0; box-sizing: border-box; }
    body { font-family: system-ui, sans-serif; padding: 30px; background: #f7fafc; }
    h2 { color: #2d3748; margin: 16px 0 12px; }

    /* ::before — decorative prefix */
    .quote::before {
      content: "\\201C"; /* left double quote */
      font-size: 48px;
      color: #3182ce;
      line-height: 1;
      display: block;
    }
    .quote {
      font-size: 18px;
      color: #4a5568;
      font-style: italic;
      padding: 16px;
      background: white;
      border-radius: 8px;
      border-left: 4px solid #3182ce;
      margin-bottom: 16px;
    }

    /* ::after — required indicator */
    .required::after {
      content: " *";
      color: #e53e3e;
      font-weight: bold;
    }

    label {
      display: block;
      font-size: 14px;
      margin-bottom: 6px;
      color: #4a5568;
    }

    /* ::first-letter — drop cap */
    .article p::first-letter {
      font-size: 3em;
      font-weight: bold;
      color: #3182ce;
      float: left;
      margin-right: 8px;
      line-height: 1;
    }
    .article p {
      font-size: 14px;
      line-height: 1.6;
      color: #4a5568;
    }

    /* ::selection — custom highlight */
    ::selection {
      background: #3182ce;
      color: white;
    }

    /* ::placeholder */
    input::placeholder {
      color: #a0aec0;
      font-style: italic;
    }
    input {
      padding: 8px 12px;
      border: 2px solid #e2e8f0;
      border-radius: 6px;
      font-size: 14px;
      width: 250px;
    }

    /* ::before + ::after for decorative divider */
    .divider {
      text-align: center;
      color: #a0aec0;
      font-size: 13px;
      margin: 20px 0;
    }
    .divider::before,
    .divider::after {
      content: "";
      display: inline-block;
      width: 60px;
      height: 1px;
      background: #cbd5e0;
      vertical-align: middle;
      margin: 0 12px;
    }
  </style>
</head>
<body>
  <h2>::before — Decorative Quote</h2>
  <div class="quote">CSS is awesome when you understand it.</div>

  <h2>::after — Required Indicator</h2>
  <label class="required">Email address</label>
  <input type="email" placeholder="you@example.com">

  <h2>::first-letter — Drop Cap</h2>
  <div class="article" style="margin-top:8px;">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
  </div>

  <div class="divider">Section Break</div>

  <p style="font-size:13px;color:#718096;">Try selecting this text to see ::selection styling.</p>
</body>
</html>`,
      language: "html",
    },
    interviewQuestions: [
      {
        question: "What is the difference between pseudo-classes and pseudo-elements?",
        difficulty: "Medium",
        hint: "Pseudo-classes (:) select elements in a certain state. Pseudo-elements (::) create virtual sub-elements that don't exist in the DOM.",
      },
      {
        question: "Why is the content property required for ::before and ::after?",
        difficulty: "Medium",
        hint: "Without content, the pseudo-element isn't generated at all. Use content: '' for a purely decorative empty element.",
      },
      {
        question: "Can you add a ::before and ::after to an <img> or <input> element?",
        difficulty: "Hard",
        hint: "No — replaced elements (img, input, br, hr) don't have content to insert before/after. They can't have pseudo-elements.",
      },
    ],
  },
  {
    id: "css-specificity",
    title: "CSS Specificity",
    slug: "css-specificity",
    icon: "Scale",
    difficulty: "Intermediate",
    description: "Understand how browsers calculate which CSS rule wins when multiple rules match.",
    concept: {
      explanation:
        "CSS specificity is the algorithm browsers use to decide which CSS rule takes precedence when multiple rules target the same element. Specificity is calculated as a four-part tuple: (inline, IDs, classes/attributes/pseudo-classes, elements/pseudo-elements). A selector with specificity 0-1-0-0 (#id) always beats 0-0-10-0 (ten classes). When specificity is equal, the rule that appears last in the source wins (source order). Inline styles (1-0-0-0) beat everything except !important. Understanding specificity is crucial for debugging 'why isn't my CSS working?' problems — the answer is almost always specificity, not a browser bug. Modern CSS methodologies use flat, class-only selectors to keep specificity low and predictable.",
      realLifeAnalogy:
        "Specificity is like a military rank system. A general (ID) always outranks a colonel (class), no matter how many colonels there are. 100 colonels don't outrank 1 general. Inline styles are like the commander-in-chief — they outrank everyone. !important is like a presidential override.",
      keyPoints: [
        "Specificity: (inline, IDs, classes, elements)",
        "Inline styles: 1-0-0-0 — highest normal specificity",
        "ID selectors: 0-1-0-0",
        "Classes, attributes, pseudo-classes: 0-0-1-0",
        "Elements, pseudo-elements: 0-0-0-1",
        "Universal (*), combinators (>, +, ~, space): 0-0-0-0",
        "Higher category always wins: 1 ID > 100 classes",
        "Equal specificity → last rule in source order wins",
        ":not() itself adds no specificity but its argument does",
        "Keep specificity low and flat for maintainable CSS",
      ],
    },
    code: {
      defaultCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    * { margin: 0; box-sizing: border-box; }
    body { font-family: system-ui, sans-serif; padding: 30px; background: #f7fafc; }
    h2 { color: #2d3748; margin-bottom: 16px; }

    .demo {
      padding: 12px 16px;
      margin-bottom: 8px;
      border-radius: 6px;
      font-size: 14px;
      border: 2px solid #e2e8f0;
    }

    /* Specificity battle! */

    /* 0-0-0-1 — element */
    p { color: gray; }

    /* 0-0-1-0 — class (beats element) */
    .text { color: blue; }

    /* 0-0-2-0 — two classes (beats one class) */
    .text.special { color: purple; }

    /* 0-1-0-0 — ID (beats any classes) */
    #winner { color: green; }

    /* 0-0-1-1 — class + element */
    p.demo { background: #ebf8ff; }

    /* Source order: same specificity → last wins */
    .order-test { color: red; }
    .order-test { color: orange; }
  </style>
</head>
<body>
  <h2>Specificity Battles</h2>

  <p class="demo">
    p { color: gray; } → specificity 0-0-0-1
  </p>

  <p class="demo text">
    .text { color: blue; } → specificity 0-0-1-0 (beats p)
  </p>

  <p class="demo text special">
    .text.special { color: purple; } → 0-0-2-0 (beats .text)
  </p>

  <p class="demo text special" id="winner">
    #winner { color: green; } → 0-1-0-0 (beats all classes)
  </p>

  <p class="demo order-test">
    Same specificity → last rule wins → orange
  </p>

  <p class="demo" style="color: crimson;">
    Inline style → 1-0-0-0 (beats everything above)
  </p>
</body>
</html>`,
      language: "html",
    },
    interviewQuestions: [
      {
        question: "Calculate the specificity of: div#main .content p.intro::first-line",
        difficulty: "Hard",
        hint: "Count: 0 inline + 1 ID (#main) + 2 classes (.content, .intro) + 3 elements (div, p, ::first-line) = 0-1-2-3.",
      },
      {
        question: "Can 10 class selectors beat 1 ID selector in specificity?",
        difficulty: "Medium",
        hint: "No — specificity categories don't overflow. Any number of classes (0-0-X-0) never beats one ID (0-1-0-0).",
      },
      {
        question: "How do you override a high-specificity selector without using !important?",
        difficulty: "Hard",
        hint: "Match or exceed its specificity, use the same selector type, place it later in the source, or restructure to use lower-specificity selectors.",
      },
    ],
  },
  {
    id: "css-important-rule",
    title: "!important Rule",
    slug: "css-important-rule",
    icon: "AlertTriangle",
    difficulty: "Intermediate",
    description: "Understand !important, when it's acceptable, and why it's usually a code smell.",
    concept: {
      explanation:
        "The `!important` declaration overrides the normal specificity cascade. A property marked `!important` beats any other declaration for that property, regardless of specificity — even inline styles. The only way to override an `!important` is with another `!important` with equal or higher specificity. When two `!important` declarations conflict, normal specificity rules apply between them. While `!important` is a powerful escape hatch, it's considered a code smell because it breaks the predictable cascade, creates specificity wars (where you need ever-more !importants to override), and makes debugging harder. Legitimate uses include: overriding third-party library styles, utility classes (like `.hidden { display: none !important; }`), and accessibility overrides.",
      realLifeAnalogy:
        "!important is like a 'VETO' stamp. It overrides all normal rules. But if everyone starts using vetoes, you need a veto-of-a-veto, then a veto-of-a-veto-of-a-veto — total chaos. It should be used only when you genuinely need an absolute override that can't be achieved through normal means.",
      keyPoints: [
        "Syntax: property: value !important;",
        "Overrides ALL normal specificity — even inline styles",
        "Only another !important with equal/higher specificity can override it",
        "Considered a code smell — indicates a specificity problem",
        "Breaks the natural cascade — makes CSS unpredictable",
        "Acceptable uses: utility classes, third-party overrides, a11y",
        "Multiple !importants follow normal specificity rules between themselves",
        "If you need !important, first ask: can I lower the original specificity?",
        "User stylesheets with !important beat author !important (for accessibility)",
      ],
    },
    code: {
      defaultCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    * { margin: 0; box-sizing: border-box; }
    body { font-family: system-ui, sans-serif; padding: 30px; background: #f7fafc; }
    h2 { color: #2d3748; margin-bottom: 16px; }

    .demo {
      padding: 12px 16px;
      margin-bottom: 8px;
      border-radius: 6px;
      font-size: 14px;
      border: 2px solid #e2e8f0;
    }

    /* Normal specificity chain */
    #hero .title { color: blue; }      /* 0-1-1-0 */

    /* !important beats everything */
    .title { color: red !important; }  /* 0-0-1-0 + !important */

    /* Even inline styles lose to !important */
    .override-inline {
      color: green !important;
    }

    /* ✅ Acceptable: utility class */
    .hidden {
      display: none !important;
    }

    .sr-only {
      position: absolute !important;
      width: 1px !important;
      height: 1px !important;
      overflow: hidden !important;
      clip: rect(0,0,0,0) !important;
    }

    /* ❌ Bad: specificity war */
    .card .text { color: purple !important; }
    .card .text.special { color: orange !important; }
    /* Now you need more !importants to override... */
  </style>
</head>
<body>
  <h2>!important Overrides</h2>

  <div id="hero">
    <p class="demo title">
      #hero .title says blue, but .title !important says red → RED wins
    </p>
  </div>

  <p class="demo override-inline" style="color: purple;">
    Inline style says purple, but !important says green → GREEN wins
  </p>

  <h2 style="margin-top:16px;">Acceptable Uses</h2>
  <p class="demo" style="margin-bottom:4px;">
    <code>.hidden { display: none !important; }</code> — utility class
  </p>
  <p class="demo">
    <code>.sr-only { ... !important; }</code> — accessibility helper
  </p>

  <h2 style="margin-top:16px;">Cascade Priority</h2>
  <ol style="font-size:14px; padding-left:20px; line-height:2;">
    <li>User !important</li>
    <li>Author !important</li>
    <li>Author normal (inline > ID > class > element)</li>
    <li>User normal</li>
    <li>Browser defaults</li>
  </ol>
</body>
</html>`,
      language: "html",
    },
    interviewQuestions: [
      {
        question: "How can you override an !important declaration?",
        difficulty: "Medium",
        hint: "With another !important that has equal or higher specificity, or by matching the exact same selector later in the source.",
      },
      {
        question: "Why is !important considered a bad practice in most situations?",
        difficulty: "Medium",
        hint: "It breaks the cascade, creates specificity wars, makes debugging harder, and usually indicates the real problem is overly-specific selectors.",
      },
      {
        question: "In what order does the cascade resolve conflicts?",
        difficulty: "Hard",
        hint: "Origin & importance → specificity → source order. User !important > Author !important > Author normal > User normal > Browser defaults.",
      },
    ],
  },
  // ─── Level 3: Layout Basics ───
  {
    id: "css-display-property",
    title: "Display Property",
    slug: "css-display-property",
    icon: "Monitor",
    difficulty: "Beginner",
    description: "Understand the display property and how it controls element rendering.",
    concept: {
      explanation:
        "The CSS display property is the most fundamental layout property. It determines how an element generates boxes — whether it behaves as a block-level element (taking the full width), an inline element (flowing with text), or something else entirely like flex or grid. Every element has a default display value (div is block, span is inline), but you can change it. The display property controls the outer display type (how the element participates in its parent's layout) and the inner display type (how the element's children are laid out).",
      realLifeAnalogy:
        "Think of display like the shape of containers in a warehouse. Block elements are like large shipping crates — each one sits on its own shelf row. Inline elements are like small packages on a conveyor belt — they line up side by side until the belt wraps. Inline-block elements are like boxed items on the belt — they flow inline but have their own rigid dimensions.",
      keyPoints: [
        "display: block — takes full width, starts on a new line",
        "display: inline — flows with text, ignores width/height",
        "display: inline-block — flows inline but accepts width/height",
        "display: none — removes element from the layout entirely",
        "display: flex — creates a flex container for 1D layouts",
        "display: grid — creates a grid container for 2D layouts",
        "Every HTML element has a default display value",
      ],
    },
    code: {
      defaultCode: `<!DOCTYPE html>
<html><head><style>
  .block-demo { display: block; background: #3b82f6; color: white; padding: 10px; margin: 5px 0; }
  .inline-demo { display: inline; background: #10b981; color: white; padding: 5px; }
  .ib-demo { display: inline-block; background: #f59e0b; color: white; padding: 10px; width: 120px; height: 50px; text-align: center; margin: 5px; }
</style></head>
<body>
  <h3>Block</h3>
  <div class="block-demo">Block 1</div>
  <div class="block-demo">Block 2</div>
  <h3>Inline</h3>
  <p>Text <span class="inline-demo">inline A</span> and <span class="inline-demo">inline B</span></p>
  <h3>Inline-Block</h3>
  <div class="ib-demo">Box 1</div>
  <div class="ib-demo">Box 2</div>
  <div class="ib-demo">Box 3</div>
</body></html>`,
      language: "html",
    },
    interviewQuestions: [
      { question: "What is the difference between display: none and visibility: hidden?", difficulty: "Easy", hint: "display: none removes the element from layout flow entirely. visibility: hidden hides it visually but it still occupies space." },
      { question: "What is the default display value of a div and a span?", difficulty: "Easy", hint: "div is block, span is inline." },
      { question: "When would you use inline-block instead of block?", difficulty: "Medium", hint: "When you need elements to flow side by side but also need to set width, height, and vertical margins/padding." },
    ],
  },
  {
    id: "css-block-inline",
    title: "Block vs Inline vs Inline-Block",
    slug: "css-block-inline",
    icon: "LayoutDashboard",
    difficulty: "Beginner",
    description: "Compare block, inline, and inline-block display behaviors.",
    concept: {
      explanation:
        "Block, inline, and inline-block are the three foundational display types. Block elements stack vertically taking full parent width. Inline elements flow horizontally with text ignoring width/height. Inline-block is the hybrid: flows inline but accepts width, height, and vertical margin/padding. Understanding these is essential because they determine how elements interact in normal document flow.",
      realLifeAnalogy:
        "Block elements are like paragraphs — each starts on a new line. Inline elements are like words — they flow side by side. Inline-block elements are like images in text — they sit in the line but have their own fixed dimensions.",
      keyPoints: [
        "Block: takes full width, respects all margin/padding, starts new line",
        "Inline: only takes content width, ignores width/height/vertical margin",
        "Inline-block: flows inline but respects width/height/vertical margin",
        "Common block elements: div, p, h1-h6, section, form",
        "Common inline elements: span, a, strong, em, img",
        "You can change any element's display type with CSS",
        "Inline-block is useful for navigation items, button groups",
      ],
    },
    code: {
      defaultCode: `<!DOCTYPE html>
<html><head><style>
  .block { display: block; background: #dbeafe; border: 2px solid #3b82f6; padding: 10px; margin: 5px 0; }
  .inline { display: inline; background: #d1fae5; border: 2px solid #10b981; padding: 5px; width: 200px; height: 50px; }
  .ib { display: inline-block; background: #fef3c7; border: 2px solid #f59e0b; padding: 10px; width: 120px; height: 60px; text-align: center; margin: 5px; }
</style></head>
<body>
  <h3>Block</h3>
  <div class="block">Block A (full width)</div>
  <div class="block">Block B (new line)</div>
  <h3>Inline (width/height ignored!)</h3>
  <p>Text <span class="inline">inline A</span> and <span class="inline">inline B</span></p>
  <h3>Inline-Block</h3>
  <div class="ib">IB 1</div><div class="ib">IB 2</div><div class="ib">IB 3</div>
</body></html>`,
      language: "html",
    },
    interviewQuestions: [
      { question: "Why does setting width/height on a span have no effect?", difficulty: "Easy", hint: "span is inline by default. Inline elements ignore width and height." },
      { question: "How do you place two divs side by side?", difficulty: "Medium", hint: "Use display: inline-block, flexbox, or grid." },
      { question: "What is the whitespace gap issue with inline-block?", difficulty: "Hard", hint: "HTML whitespace between inline-block elements creates a gap. Fix with font-size: 0 on parent, negative margin, or use flexbox." },
    ],
  },
  {
    id: "css-position-property",
    title: "Position Property",
    slug: "css-position-property",
    icon: "Move",
    difficulty: "Intermediate",
    description: "Learn the five CSS position values and how they affect element placement.",
    concept: {
      explanation:
        "The CSS position property controls how an element is positioned. Five values: static (default — normal flow), relative (offset from normal position, stays in flow), absolute (removed from flow, positioned relative to nearest positioned ancestor), fixed (relative to viewport), and sticky (hybrid — normal until scroll threshold, then fixed). When position is anything other than static, top/right/bottom/left offsets work.",
      realLifeAnalogy:
        "Static is default furniture placement. Relative is nudging it a few inches (space reserved). Absolute is picking it up and placing at exact coordinates (no reserved space). Fixed is a TV mounted on the wall (stays put during scroll). Sticky is a magnet that slides until hitting an edge, then sticks.",
      keyPoints: [
        "static — default, normal flow, ignores offsets",
        "relative — offset from original position, space preserved",
        "absolute — removed from flow, relative to positioned ancestor",
        "fixed — removed from flow, relative to viewport",
        "sticky — normal flow until scroll threshold, then sticks",
        "z-index only works on positioned elements (not static)",
        "position: relative on parent creates positioning context for absolute children",
      ],
    },
    code: {
      defaultCode: `<!DOCTYPE html>
<html><head><style>
  .box { padding: 12px; margin: 10px; border-radius: 8px; font-weight: bold; }
  .static { background: #e2e8f0; }
  .relative { background: #dbeafe; position: relative; top: 20px; left: 30px; border: 2px dashed #3b82f6; }
  .parent { position: relative; background: #f0fdf4; border: 2px solid #10b981; padding: 50px 15px 15px; margin-top: 30px; }
  .absolute { position: absolute; top: 10px; right: 10px; background: #10b981; color: white; padding: 5px 10px; border-radius: 4px; }
  .fixed-btn { position: fixed; bottom: 20px; right: 20px; background: #8b5cf6; color: white; padding: 10px 20px; border-radius: 8px; }
  .sticky-h { position: sticky; top: 0; background: #f59e0b; color: white; padding: 10px; }
</style></head>
<body>
  <div class="box static">Static (default)</div>
  <div class="box relative">Relative (offset 20px/30px)</div>
  <div class="parent"><span class="absolute">Absolute</span>Parent with relative position</div>
  <div class="sticky-h">Sticky Header</div>
  <div style="height:500px;padding:20px">Scroll content...</div>
  <div class="fixed-btn">Fixed</div>
</body></html>`,
      language: "html",
    },
    interviewQuestions: [
      { question: "What is the default position value?", difficulty: "Easy", hint: "static — normal flow, ignores top/right/bottom/left." },
      { question: "What is the difference between relative and absolute?", difficulty: "Medium", hint: "Relative offsets from original position and stays in flow. Absolute removes from flow and positions relative to nearest positioned ancestor." },
      { question: "What happens if an absolute element has no positioned ancestor?", difficulty: "Medium", hint: "It positions relative to the initial containing block (the viewport)." },
    ],
  },
  {
    id: "css-relative-absolute",
    title: "Relative vs Absolute",
    slug: "css-relative-absolute",
    icon: "Crosshair",
    difficulty: "Intermediate",
    description: "Deep dive into relative and absolute positioning patterns.",
    concept: {
      explanation:
        "Relative and absolute positioning work together as the most common positioning pattern. The 'relative parent + absolute child' combo is the foundation for badges, overlays, tooltips, dropdowns, and centering techniques. Relative offsets from original position preserving space. Absolute removes from flow and positions relative to closest positioned ancestor. The classic centering trick uses absolute + top: 50% + left: 50% + transform: translate(-50%, -50%).",
      realLifeAnalogy:
        "Relative is like sliding a book on a shelf — the gap remains. Absolute is like placing a sticky note anywhere on a specific page — you choose the page (positioned ancestor) and the exact spot (offsets).",
      keyPoints: [
        "Relative: stays in flow, offsets from original position",
        "Absolute: removed from flow, offsets from positioned ancestor",
        "'Relative parent + absolute child' pattern is essential",
        "Without positioned ancestor, absolute positions from viewport",
        "Centering: absolute + top: 50% + left: 50% + translate(-50%, -50%)",
        "Both create stacking contexts when z-index is set",
        "Use relative to create positioning contexts without visible offset",
      ],
    },
    code: {
      defaultCode: `<!DOCTYPE html>
<html><head><style>
  .card { position: relative; background: white; border: 2px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 20px; width: 280px; }
  .badge { position: absolute; top: -10px; right: -10px; background: #ef4444; color: white; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: bold; }
  .center-box { position: relative; background: #f0fdf4; border: 2px solid #10b981; width: 280px; height: 180px; margin: 20px; border-radius: 12px; }
  .centered { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: #10b981; color: white; padding: 12px 24px; border-radius: 8px; font-weight: bold; }
  .img-wrap { position: relative; width: 280px; margin: 20px; border-radius: 12px; overflow: hidden; }
  .overlay { position: absolute; bottom: 0; left: 0; right: 0; background: rgba(0,0,0,0.7); color: white; padding: 12px; }
</style></head>
<body>
  <h3>Badge Pattern</h3>
  <div class="card"><div class="badge">3</div><h4>Card</h4><p>Badge positioned absolutely.</p></div>
  <h3>Centering</h3>
  <div class="center-box"><div class="centered">Centered</div></div>
  <h3>Overlay</h3>
  <div class="img-wrap"><div style="background:#3b82f6;height:180px"></div><div class="overlay"><strong>Overlay</strong></div></div>
</body></html>`,
      language: "html",
    },
    interviewQuestions: [
      { question: "How do you center an element with absolute positioning?", difficulty: "Medium", hint: "position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);" },
      { question: "Why set position: relative on a parent even without offsets?", difficulty: "Medium", hint: "To create a positioning context so absolute children position relative to that parent." },
      { question: "What happens to document flow when an element is absolute?", difficulty: "Easy", hint: "It is removed from flow. Other elements behave as if it doesn't exist." },
    ],
  },
  {
    id: "css-fixed-sticky",
    title: "Fixed vs Sticky",
    slug: "css-fixed-sticky",
    icon: "Pin",
    difficulty: "Intermediate",
    description: "Compare fixed and sticky positioning for scroll-based layouts.",
    concept: {
      explanation:
        "Fixed positioning removes the element from flow and positions it relative to the viewport — stays in the same spot during scrolling. Sticky is a hybrid: normal flow until a scroll threshold (top, bottom, etc.), then it sticks in place. Sticky elements stay within their parent — they unstick when the parent scrolls away. Fixed is for persistent UI (navbars, FABs, modals). Sticky is for headers, sidebars, table headers.",
      realLifeAnalogy:
        "Fixed is like a stamp on a window — stays put while the world moves behind it. Sticky is like a magnet on a whiteboard ruler — slides along until hitting the edge, then sticks.",
      keyPoints: [
        "Fixed: always relative to viewport, removed from flow",
        "Sticky: normal flow until threshold, then sticks within parent",
        "Sticky requires a threshold value (top, bottom, etc.)",
        "Sticky stops sticking when parent scrolls away",
        "A transform on any ancestor breaks fixed positioning",
        "Fixed: navbars, FABs, modals. Sticky: headers, sidebars",
        "Both create stacking contexts",
      ],
    },
    code: {
      defaultCode: `<!DOCTYPE html>
<html><head><style>
  body { margin: 0; font-family: sans-serif; }
  .sticky-nav { position: sticky; top: 0; background: #1e293b; color: white; padding: 15px 20px; font-weight: bold; z-index: 10; }
  .fixed-btn { position: fixed; bottom: 20px; right: 20px; background: #3b82f6; color: white; border: none; border-radius: 50%; width: 50px; height: 50px; font-size: 20px; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.3); z-index: 100; }
  .section { padding: 30px 20px; min-height: 300px; }
  .section:nth-child(even) { background: #f8fafc; }
  .sticky-h { position: sticky; top: 52px; background: #f0fdf4; border-left: 4px solid #10b981; padding: 8px 12px; font-weight: bold; z-index: 5; }
</style></head>
<body>
  <div class="sticky-nav">Sticky Nav</div>
  <div class="section"><div class="sticky-h">Section 1</div><p style="margin-top:15px">Scroll to see sticky and fixed behavior.</p><div style="height:400px"></div></div>
  <div class="section"><div class="sticky-h">Section 2</div><div style="height:400px"></div></div>
  <div class="section"><div class="sticky-h">Section 3</div><div style="height:400px"></div></div>
  <button class="fixed-btn">↑</button>
</body></html>`,
      language: "html",
    },
    interviewQuestions: [
      { question: "What is the difference between fixed and sticky?", difficulty: "Medium", hint: "Fixed is always relative to viewport. Sticky scrolls normally until a threshold, then sticks within its parent." },
      { question: "Why might position: sticky not work?", difficulty: "Hard", hint: "No threshold set, parent has overflow: hidden/auto, ancestor has transform, or parent is too short." },
      { question: "Does fixed always position relative to the viewport?", difficulty: "Hard", hint: "No — if any ancestor has transform, perspective, or filter, fixed positions relative to that ancestor." },
    ],
  },
  {
    id: "css-z-index",
    title: "Z-index",
    slug: "css-z-index",
    icon: "Layers",
    difficulty: "Intermediate",
    description: "Control stacking order with z-index and stacking contexts.",
    concept: {
      explanation:
        "Z-index controls which positioned elements appear in front of or behind others. It only works on positioned elements (not static). Higher values appear in front. But z-index is complex because of stacking contexts — isolated groups where z-index values are compared independently. Properties like opacity < 1, transform, filter create new stacking contexts. A child with z-index: 9999 can still be behind another element if its parent's stacking context has a lower z-index.",
      realLifeAnalogy:
        "Z-index is like floors in buildings. Within one building, floor 10 is above floor 5. But if Building A is shorter than Building B, even the top floor of A is below mid floors of B. Each building is a stacking context.",
      keyPoints: [
        "z-index only works on positioned elements (not static)",
        "Higher z-index appears in front",
        "Stacking contexts isolate z-index comparisons",
        "opacity < 1, transform, filter create stacking contexts",
        "Without z-index, elements stack by source order (later = on top)",
        "Negative z-index places behind the stacking context root",
        "Use a z-index scale (100, 200, 500, 1000) to avoid conflicts",
      ],
    },
    code: {
      defaultCode: `<!DOCTYPE html>
<html><head><style>
  .demo { position: relative; height: 220px; margin: 20px; }
  .box { position: absolute; width: 140px; height: 140px; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; }
  .a { background: #3b82f6; top: 0; left: 0; z-index: 3; }
  .b { background: #10b981; top: 40px; left: 60px; z-index: 2; }
  .c { background: #f59e0b; top: 80px; left: 120px; z-index: 1; }
  /* Stacking context trap */
  .parent-low { position: relative; z-index: 1; }
  .child-high { position: absolute; z-index: 9999; background: #ef4444; color: white; padding: 10px; border-radius: 8px; }
  .parent-high { position: relative; z-index: 2; background: #3b82f6; color: white; padding: 20px; border-radius: 8px; margin-top: -20px; }
</style></head>
<body>
  <h3>Z-Index Ordering</h3>
  <div class="demo">
    <div class="box a">z:3</div>
    <div class="box b">z:2</div>
    <div class="box c">z:1</div>
  </div>
  <h3>Stacking Context Trap</h3>
  <div style="position:relative;height:100px;margin:20px">
    <div class="parent-low"><div class="child-high">z: 9999 (still behind!)</div></div>
    <div class="parent-high">Parent z: 2 wins (higher context)</div>
  </div>
</body></html>`,
      language: "html",
    },
    interviewQuestions: [
      { question: "Why does z-index only work on positioned elements?", difficulty: "Easy", hint: "Static elements are in normal flow and don't participate in stacking order." },
      { question: "What is a stacking context?", difficulty: "Hard", hint: "An isolated group where z-index values are compared independently. Children's z-index is only compared within the same context." },
      { question: "Can z-index: 9999 still be hidden behind another element?", difficulty: "Hard", hint: "Yes, if its parent stacking context has a lower z-index than another element's stacking context." },
    ],
  },
  {
    id: "css-overflow",
    title: "Overflow",
    slug: "css-overflow",
    icon: "Expand",
    difficulty: "Beginner",
    description: "Control what happens when content overflows its container.",
    concept: {
      explanation:
        "The overflow property controls what happens when content is larger than its container. visible (default): content spills out. hidden: clipped at boundary. scroll: always shows scrollbars. auto: scrollbars only when needed. You can control each axis independently with overflow-x and overflow-y. Overflow is also used for text truncation (overflow: hidden + text-overflow: ellipsis + white-space: nowrap) and creating Block Formatting Contexts.",
      realLifeAnalogy:
        "Overflow is like water in a cup. Visible: water spills over. Hidden: excess water poured away. Scroll: cup has a straw to reach below the rim. Auto: straw appears only when the cup is full.",
      keyPoints: [
        "visible (default) — content spills out",
        "hidden — content clipped and invisible",
        "scroll — always shows scrollbars",
        "auto — scrollbars only when needed",
        "overflow-x and overflow-y for independent control",
        "Text truncation: hidden + text-overflow: ellipsis + nowrap",
        "overflow: hidden/auto creates a Block Formatting Context",
      ],
    },
    code: {
      defaultCode: `<!DOCTYPE html>
<html><head><style>
  .box { width: 200px; height: 80px; border: 2px solid #3b82f6; border-radius: 8px; margin: 10px; padding: 10px; display: inline-block; vertical-align: top; font-size: 13px; }
  .visible { overflow: visible; }
  .hidden { overflow: hidden; }
  .scroll { overflow: scroll; }
  .auto { overflow: auto; }
  .truncate { width: 220px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; border: 2px solid #10b981; border-radius: 8px; padding: 10px; margin: 15px; }
  .clamp { width: 220px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; border: 2px solid #f59e0b; border-radius: 8px; padding: 10px; margin: 15px; }
</style></head>
<body>
  <h3>Overflow Values</h3>
  <div class="box visible"><b>visible</b><br>Content overflows the container boundaries.</div>
  <div class="box hidden"><b>hidden</b><br>Content is clipped at the boundary edge.</div>
  <div class="box scroll"><b>scroll</b><br>Always shows scrollbars for this content area.</div>
  <div class="box auto"><b>auto</b><br>Scrollbars only appear when content overflows the box.</div>
  <h3 style="clear:both;margin-top:80px">Text Truncation</h3>
  <div class="truncate">This very long text gets truncated with an ellipsis at the end</div>
  <div class="clamp">Multi-line clamp: text beyond 2 lines is hidden with an ellipsis indicator for previews.</div>
</body></html>`,
      language: "html",
    },
    interviewQuestions: [
      { question: "How do you truncate text with an ellipsis?", difficulty: "Easy", hint: "overflow: hidden; white-space: nowrap; text-overflow: ellipsis; — all three required." },
      { question: "What is the difference between overflow: scroll and auto?", difficulty: "Easy", hint: "scroll always shows scrollbars. auto only shows them when content overflows." },
      { question: "What is a Block Formatting Context?", difficulty: "Hard", hint: "overflow: hidden/auto creates a BFC, which contains floats, prevents margin collapse, and isolates formatting." },
    ],
  },
  {
    id: "css-float-clear",
    title: "Float and Clear",
    slug: "css-float-clear",
    icon: "AlignLeft",
    difficulty: "Intermediate",
    description: "Understand float-based layouts and how to clear them.",
    concept: {
      explanation:
        "Float was designed for wrapping text around images. A floated element is taken out of normal flow and pushed left or right, allowing inline content to wrap around it. The clear property prevents sitting next to a float. The 'parent collapse' problem occurs when a parent with only floated children collapses to zero height. Fixes include the clearfix hack (::after with clear: both) or display: flow-root. Today, use flexbox/grid for layouts; reserve floats for text wrapping.",
      realLifeAnalogy:
        "Float is like placing a photo in a magazine — text wraps around it. Clear is a section break. The clearfix hack is an invisible wall at the bottom of a section to extend past floated content.",
      keyPoints: [
        "float: left/right pushes element to side; content wraps around",
        "Floated elements are removed from normal flow",
        "clear: left/right/both prevents wrapping next to floats",
        "Parent collapse: floated children don't contribute to parent height",
        "Clearfix: ::after { content: ''; display: block; clear: both; }",
        "Modern fix: display: flow-root (creates BFC)",
        "Use flexbox/grid for layouts; floats for text wrapping only",
      ],
    },
    code: {
      defaultCode: `<!DOCTYPE html>
<html><head><style>
  body { font-family: sans-serif; max-width: 450px; margin: 20px auto; }
  .float-img { float: left; width: 100px; height: 100px; background: #3b82f6; border-radius: 8px; margin: 0 12px 8px 0; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; }
  .broken { border: 3px solid #ef4444; border-radius: 8px; padding: 10px; margin: 20px 0; }
  .fixed { border: 3px solid #10b981; border-radius: 8px; padding: 10px; margin: 20px 0; display: flow-root; }
  .fbox { float: left; width: 70px; height: 70px; margin: 5px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; }
</style></head>
<body>
  <h3>Text Wrapping (proper use)</h3>
  <div style="overflow:auto"><div class="float-img">IMG</div><p>Text wraps around the floated image, like a magazine layout. This is what float was designed for.</p></div>
  <h3 style="clear:both">Parent Collapse</h3>
  <div class="broken"><div class="fbox" style="background:#ef4444">1</div><div class="fbox" style="background:#ef4444">2</div></div>
  <h3>Fixed (flow-root)</h3>
  <div class="fixed"><div class="fbox" style="background:#10b981">1</div><div class="fbox" style="background:#10b981">2</div></div>
</body></html>`,
      language: "html",
    },
    interviewQuestions: [
      { question: "What is the clearfix hack and why is it needed?", difficulty: "Medium", hint: "Uses ::after with clear: both to make parent contain floated children, needed because floats don't contribute to parent height." },
      { question: "Why are floats no longer used for layouts?", difficulty: "Easy", hint: "Flexbox and Grid are purpose-built for layouts without float's problems." },
      { question: "What does display: flow-root do?", difficulty: "Hard", hint: "Creates a Block Formatting Context, making the element contain its floated children. Modern replacement for clearfix." },
    ],
  },
  // ─── Level 4: Flexbox ───
  {
    id: "css-flexbox-intro",
    title: "Flexbox Introduction",
    slug: "css-flexbox-intro",
    icon: "Columns",
    difficulty: "Beginner",
    description: "Introduction to Flexbox and the problems it solves.",
    concept: {
      explanation: "Flexbox (Flexible Box Layout) is a one-dimensional layout model designed for distributing space and aligning items in a container. Before flexbox, centering elements, creating equal-height columns, and distributing space required hacks with floats, tables, or positioning. Flexbox solves all of these elegantly. It works along a main axis (horizontal by default) and a cross axis (perpendicular). You set display: flex on a container, and its direct children become flex items.",
      realLifeAnalogy: "Flexbox is like a shelf organizer. You decide the direction items go (left-to-right or top-to-bottom), how much space each takes, and how they align. Items can grow to fill space, shrink to fit, or stay fixed size.",
      keyPoints: ["display: flex creates a flex container", "Direct children become flex items", "Main axis: default horizontal (row)", "Cross axis: perpendicular to main axis", "Solves centering, equal-height columns, spacing", "One-dimensional: row OR column, not both", "flex-direction, justify-content, align-items are the core properties"],
    },
    code: { defaultCode: `<!DOCTYPE html>\n<html><head><style>\n  .flex-container { display: flex; gap: 12px; padding: 20px; background: #f8fafc; border-radius: 12px; }\n  .flex-item { background: #3b82f6; color: white; padding: 20px 30px; border-radius: 8px; font-weight: bold; }\n  .center-demo { display: flex; justify-content: center; align-items: center; height: 200px; background: #f0fdf4; border: 2px dashed #10b981; border-radius: 12px; margin-top: 20px; }\n  .centered { background: #10b981; color: white; padding: 20px 40px; border-radius: 8px; font-weight: bold; }\n</style></head>\n<body>\n  <h3>Basic Flex Row</h3>\n  <div class="flex-container">\n    <div class="flex-item">Item 1</div>\n    <div class="flex-item">Item 2</div>\n    <div class="flex-item">Item 3</div>\n  </div>\n  <h3>Perfect Centering</h3>\n  <div class="center-demo">\n    <div class="centered">Centered!</div>\n  </div>\n</body></html>`, language: "html" },
    interviewQuestions: [
      { question: "What problems does flexbox solve?", difficulty: "Easy", hint: "Centering, equal-height columns, space distribution, source order independence." },
      { question: "What is the difference between the main axis and cross axis?", difficulty: "Easy", hint: "Main axis follows flex-direction (row = horizontal). Cross axis is perpendicular." },
      { question: "How do you center an element with flexbox?", difficulty: "Easy", hint: "display: flex; justify-content: center; align-items: center;" },
    ],
  },
  {
    id: "css-flex-container",
    title: "Flex Container",
    slug: "css-flex-container",
    icon: "Box",
    difficulty: "Beginner",
    description: "Learn about flex container properties and behavior.",
    concept: {
      explanation: "A flex container is created with display: flex (block-level) or display: inline-flex (inline-level). All direct children become flex items. The container controls layout direction (flex-direction), wrapping (flex-wrap), alignment (justify-content, align-items, align-content), and gaps. Flex containers change child behavior: floats are ignored, vertical-align has no effect, and children become blockified.",
      realLifeAnalogy: "A flex container is like a toolbox organizer. The container decides the arrangement rules — horizontal or vertical slots, how items are spaced, whether items wrap to new rows when the box is full.",
      keyPoints: ["display: flex (block) vs display: inline-flex (inline)", "All direct children become flex items", "Container properties: flex-direction, flex-wrap, justify-content, align-items, align-content, gap", "float is ignored on flex items", "vertical-align has no effect on flex items", "Inline elements become block-level inside flex container", "gap property adds space between items"],
    },
    code: { defaultCode: `<!DOCTYPE html>\n<html><head><style>\n  .flex { display: flex; gap: 10px; padding: 15px; background: #f8fafc; border-radius: 12px; border: 2px solid #e2e8f0; margin: 10px 0; }\n  .inline-flex { display: inline-flex; gap: 10px; padding: 15px; background: #fef3c7; border-radius: 12px; border: 2px solid #f59e0b; }\n  .item { background: #3b82f6; color: white; padding: 12px 20px; border-radius: 6px; font-weight: bold; }\n</style></head>\n<body>\n  <h3>display: flex (block-level)</h3>\n  <div class="flex">\n    <div class="item">A</div><div class="item">B</div><div class="item">C</div>\n  </div>\n  <h3>display: inline-flex (inline-level)</h3>\n  <span class="inline-flex">\n    <div class="item">A</div><div class="item">B</div>\n  </span>\n  <span> — text flows next to inline-flex</span>\n</body></html>`, language: "html" },
    interviewQuestions: [
      { question: "What is the difference between flex and inline-flex?", difficulty: "Easy", hint: "flex creates a block-level container. inline-flex creates an inline-level container that flows with text." },
      { question: "What happens to floated elements inside a flex container?", difficulty: "Medium", hint: "float is ignored on flex items. The flex layout takes precedence." },
      { question: "Do all children become flex items?", difficulty: "Easy", hint: "Only direct children become flex items. Deeper descendants are not affected." },
    ],
  },
  {
    id: "css-flex-direction",
    title: "Flex Direction",
    slug: "css-flex-direction",
    icon: "ArrowRightLeft",
    difficulty: "Beginner",
    description: "Control the direction of flex items with flex-direction.",
    concept: {
      explanation: "flex-direction sets the main axis of a flex container, determining how items are placed. row (default): left to right. row-reverse: right to left. column: top to bottom. column-reverse: bottom to top. Changing direction swaps what justify-content and align-items control — justify-content always works on the main axis, align-items on the cross axis.",
      realLifeAnalogy: "flex-direction is like rotating a shelf. Row is a horizontal bookshelf. Column is a vertical stack of drawers. Reverse versions flip the order like reading right-to-left.",
      keyPoints: ["row (default): horizontal, left to right", "row-reverse: horizontal, right to left", "column: vertical, top to bottom", "column-reverse: vertical, bottom to top", "Changes which axis justify-content and align-items affect", "flex-flow is shorthand for direction + wrap", "Used for responsive layouts: row on desktop, column on mobile"],
    },
    code: { defaultCode: `<!DOCTYPE html>\n<html><head><style>\n  .demo { display: flex; gap: 8px; padding: 12px; background: #f8fafc; border-radius: 8px; margin: 8px 0; }\n  .item { background: #3b82f6; color: white; padding: 10px 18px; border-radius: 6px; font-weight: bold; }\n  .row { flex-direction: row; }\n  .row-rev { flex-direction: row-reverse; }\n  .col { flex-direction: column; width: 200px; }\n  .col-rev { flex-direction: column-reverse; width: 200px; }\n</style></head>\n<body>\n  <h3>row (default)</h3>\n  <div class="demo row"><div class="item">1</div><div class="item">2</div><div class="item">3</div></div>\n  <h3>row-reverse</h3>\n  <div class="demo row-rev"><div class="item">1</div><div class="item">2</div><div class="item">3</div></div>\n  <h3>column</h3>\n  <div class="demo col"><div class="item">1</div><div class="item">2</div><div class="item">3</div></div>\n  <h3>column-reverse</h3>\n  <div class="demo col-rev"><div class="item">1</div><div class="item">2</div><div class="item">3</div></div>\n</body></html>`, language: "html" },
    interviewQuestions: [
      { question: "What is the default flex-direction?", difficulty: "Easy", hint: "row — items flow horizontally from left to right." },
      { question: "How does flex-direction affect justify-content?", difficulty: "Medium", hint: "justify-content always works on the main axis. In row, that's horizontal. In column, that's vertical." },
      { question: "What is the flex-flow shorthand?", difficulty: "Easy", hint: "flex-flow: <direction> <wrap>; e.g., flex-flow: row wrap;" },
    ],
  },
  {
    id: "css-justify-content",
    title: "Justify Content",
    slug: "css-justify-content",
    icon: "AlignHorizontalSpaceAround",
    difficulty: "Beginner",
    description: "Distribute space along the main axis with justify-content.",
    concept: {
      explanation: "justify-content controls how flex items are distributed along the main axis. flex-start (default): items packed at start. flex-end: packed at end. center: centered. space-between: first item at start, last at end, equal space between. space-around: equal space around each item (half-space at edges). space-evenly: equal space between all items and edges.",
      realLifeAnalogy: "justify-content is like arranging books on a shelf. flex-start pushes them all left. center puts them in the middle. space-between spreads them edge-to-edge. space-evenly gives equal gaps everywhere.",
      keyPoints: ["flex-start: items at the start (default)", "flex-end: items at the end", "center: items centered", "space-between: equal space between, no edge space", "space-around: equal space around items (half at edges)", "space-evenly: truly equal spacing everywhere", "Works on the main axis (horizontal for row, vertical for column)"],
    },
    code: { defaultCode: `<!DOCTYPE html>\n<html><head><style>\n  .demo { display: flex; padding: 10px; background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 8px; margin: 8px 0; min-height: 60px; }\n  .item { background: #3b82f6; color: white; padding: 10px 18px; border-radius: 6px; font-weight: bold; }\n  .start { justify-content: flex-start; }\n  .end { justify-content: flex-end; }\n  .center { justify-content: center; }\n  .between { justify-content: space-between; }\n  .around { justify-content: space-around; }\n  .evenly { justify-content: space-evenly; }\n</style></head>\n<body>\n  <h4>flex-start</h4><div class="demo start"><div class="item">A</div><div class="item">B</div><div class="item">C</div></div>\n  <h4>flex-end</h4><div class="demo end"><div class="item">A</div><div class="item">B</div><div class="item">C</div></div>\n  <h4>center</h4><div class="demo center"><div class="item">A</div><div class="item">B</div><div class="item">C</div></div>\n  <h4>space-between</h4><div class="demo between"><div class="item">A</div><div class="item">B</div><div class="item">C</div></div>\n  <h4>space-around</h4><div class="demo around"><div class="item">A</div><div class="item">B</div><div class="item">C</div></div>\n  <h4>space-evenly</h4><div class="demo evenly"><div class="item">A</div><div class="item">B</div><div class="item">C</div></div>\n</body></html>`, language: "html" },
    interviewQuestions: [
      { question: "What is the difference between space-between and space-evenly?", difficulty: "Medium", hint: "space-between has no space at edges. space-evenly has equal space everywhere including edges." },
      { question: "Which axis does justify-content work on?", difficulty: "Easy", hint: "The main axis. In flex-direction: row, that's horizontal. In column, that's vertical." },
      { question: "How do you push one item to the right in a flex row?", difficulty: "Medium", hint: "Use margin-left: auto on that item, or use justify-content: space-between." },
    ],
  },
  {
    id: "css-align-items",
    title: "Align Items",
    slug: "css-align-items",
    icon: "AlignVerticalSpaceAround",
    difficulty: "Beginner",
    description: "Align flex items along the cross axis.",
    concept: {
      explanation: "align-items controls how flex items are aligned along the cross axis (perpendicular to main axis). stretch (default): items stretch to fill container height. flex-start: items at top. flex-end: items at bottom. center: items centered vertically. baseline: items aligned by text baseline. Individual items can override with align-self.",
      realLifeAnalogy: "If justify-content arranges items on a shelf horizontally, align-items controls their vertical position on the shelf — do they sit on the shelf, hang from the ceiling, float in the middle, or stretch floor-to-ceiling?",
      keyPoints: ["stretch (default): items fill cross-axis", "flex-start: items at start of cross-axis", "flex-end: items at end of cross-axis", "center: items centered on cross-axis", "baseline: aligned by text baseline", "align-self overrides align-items for individual items", "For row direction, cross axis is vertical; for column, horizontal"],
    },
    code: { defaultCode: `<!DOCTYPE html>\n<html><head><style>\n  .demo { display: flex; gap: 10px; padding: 10px; background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 8px; margin: 8px 0; height: 120px; }\n  .item { background: #3b82f6; color: white; padding: 10px 18px; border-radius: 6px; font-weight: bold; }\n  .tall { padding: 30px 18px; }\n  .stretch { align-items: stretch; }\n  .start { align-items: flex-start; }\n  .end { align-items: flex-end; }\n  .center { align-items: center; }\n  .baseline { align-items: baseline; }\n</style></head>\n<body>\n  <h4>stretch (default)</h4><div class="demo stretch"><div class="item">A</div><div class="item tall">B</div><div class="item">C</div></div>\n  <h4>flex-start</h4><div class="demo start"><div class="item">A</div><div class="item tall">B</div><div class="item">C</div></div>\n  <h4>center</h4><div class="demo center"><div class="item">A</div><div class="item tall">B</div><div class="item">C</div></div>\n  <h4>flex-end</h4><div class="demo end"><div class="item">A</div><div class="item tall">B</div><div class="item">C</div></div>\n  <h4>baseline</h4><div class="demo baseline"><div class="item" style="font-size:12px">Small</div><div class="item" style="font-size:24px">Big</div><div class="item">Normal</div></div>\n</body></html>`, language: "html" },
    interviewQuestions: [
      { question: "What is the default value of align-items?", difficulty: "Easy", hint: "stretch — items stretch to fill the container's cross-axis." },
      { question: "What is the difference between align-items and align-self?", difficulty: "Medium", hint: "align-items is set on the container and affects all items. align-self is set on individual items to override." },
      { question: "How does align-items behave differently in column direction?", difficulty: "Medium", hint: "In column, the cross axis is horizontal, so align-items controls horizontal alignment." },
    ],
  },
  {
    id: "css-align-content",
    title: "Align Content",
    slug: "css-align-content",
    icon: "AlignCenter",
    difficulty: "Intermediate",
    description: "Align wrapped flex lines along the cross axis.",
    concept: {
      explanation: "align-content controls the distribution of space between and around flex lines (rows/columns of wrapped items). It only applies when there are multiple lines — flex-wrap must be wrap or wrap-reverse. Values: stretch (default), flex-start, flex-end, center, space-between, space-around. Think of align-content as justify-content for the cross axis, but for lines rather than individual items.",
      realLifeAnalogy: "align-items positions items within each row. align-content positions the rows themselves. Like arranging multiple shelves in a bookcase — align-content controls the vertical spacing between shelves.",
      keyPoints: ["Only works with flex-wrap: wrap/wrap-reverse", "Controls spacing between flex lines, not items", "stretch: lines stretch to fill container (default)", "center: lines centered in container", "space-between: equal space between lines", "align-items: individual item alignment. align-content: line alignment", "Has no effect on single-line flex containers"],
    },
    code: { defaultCode: `<!DOCTYPE html>\n<html><head><style>\n  .demo { display: flex; flex-wrap: wrap; gap: 8px; padding: 10px; background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 8px; margin: 8px 0; height: 250px; width: 300px; }\n  .item { background: #3b82f6; color: white; padding: 10px 18px; border-radius: 6px; font-weight: bold; width: 80px; text-align: center; }\n  .start { align-content: flex-start; }\n  .center { align-content: center; }\n  .between { align-content: space-between; }\n  .around { align-content: space-around; }\n</style></head>\n<body>\n  <div style="display:flex;gap:15px;flex-wrap:wrap">\n    <div><h4>flex-start</h4><div class="demo start"><div class="item">1</div><div class="item">2</div><div class="item">3</div><div class="item">4</div><div class="item">5</div><div class="item">6</div></div></div>\n    <div><h4>center</h4><div class="demo center"><div class="item">1</div><div class="item">2</div><div class="item">3</div><div class="item">4</div><div class="item">5</div><div class="item">6</div></div></div>\n    <div><h4>space-between</h4><div class="demo between"><div class="item">1</div><div class="item">2</div><div class="item">3</div><div class="item">4</div><div class="item">5</div><div class="item">6</div></div></div>\n  </div>\n</body></html>`, language: "html" },
    interviewQuestions: [
      { question: "When does align-content have an effect?", difficulty: "Medium", hint: "Only when there are multiple flex lines — flex-wrap must be wrap or wrap-reverse." },
      { question: "What is the difference between align-items and align-content?", difficulty: "Hard", hint: "align-items positions items within each line. align-content positions the lines themselves within the container." },
      { question: "What is the default value of align-content?", difficulty: "Easy", hint: "stretch — lines stretch to fill the container." },
    ],
  },
  {
    id: "css-flex-wrap",
    title: "Flex Wrap",
    slug: "css-flex-wrap",
    icon: "WrapText",
    difficulty: "Beginner",
    description: "Control whether flex items wrap to new lines.",
    concept: {
      explanation: "flex-wrap controls whether flex items are forced onto a single line or can wrap to multiple lines. nowrap (default): all items on one line, may shrink or overflow. wrap: items wrap to new lines when they can't fit. wrap-reverse: items wrap upward. The flex-flow shorthand combines flex-direction and flex-wrap. Wrapping is essential for responsive layouts — items reflow naturally as container size changes.",
      realLifeAnalogy: "flex-wrap is like text wrapping in a text editor. nowrap forces everything on one line (may overflow). wrap lets content flow to the next line when the edge is reached.",
      keyPoints: ["nowrap (default): single line, items may shrink", "wrap: items wrap to new lines", "wrap-reverse: items wrap upward/leftward", "flex-flow: shorthand for direction + wrap", "Wrapping enables responsive layouts without media queries", "Items on each line are sized independently", "align-content controls spacing between wrapped lines"],
    },
    code: { defaultCode: `<!DOCTYPE html>\n<html><head><style>\n  .demo { display: flex; gap: 8px; padding: 10px; background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 8px; margin: 8px 0; width: 350px; }\n  .item { background: #3b82f6; color: white; padding: 10px 25px; border-radius: 6px; font-weight: bold; min-width: 80px; text-align: center; }\n  .nowrap { flex-wrap: nowrap; }\n  .wrap { flex-wrap: wrap; }\n  .wrap-rev { flex-wrap: wrap-reverse; }\n</style></head>\n<body>\n  <h4>nowrap (items shrink)</h4>\n  <div class="demo nowrap"><div class="item">One</div><div class="item">Two</div><div class="item">Three</div><div class="item">Four</div><div class="item">Five</div></div>\n  <h4>wrap (items flow to new line)</h4>\n  <div class="demo wrap"><div class="item">One</div><div class="item">Two</div><div class="item">Three</div><div class="item">Four</div><div class="item">Five</div></div>\n  <h4>wrap-reverse</h4>\n  <div class="demo wrap-rev"><div class="item">One</div><div class="item">Two</div><div class="item">Three</div><div class="item">Four</div><div class="item">Five</div></div>\n</body></html>`, language: "html" },
    interviewQuestions: [
      { question: "What is the default flex-wrap value?", difficulty: "Easy", hint: "nowrap — items stay on one line and may shrink to fit." },
      { question: "What is the flex-flow shorthand?", difficulty: "Easy", hint: "flex-flow: <flex-direction> <flex-wrap>; e.g., flex-flow: row wrap;" },
      { question: "How does flex-wrap help with responsive design?", difficulty: "Medium", hint: "Items naturally reflow to new lines as the container shrinks, without needing media queries." },
    ],
  },
  {
    id: "css-flex-grow-shrink",
    title: "Flex Grow, Shrink, Basis",
    slug: "css-flex-grow-shrink",
    icon: "Scaling",
    difficulty: "Intermediate",
    description: "Control how flex items grow, shrink, and set their base size.",
    concept: {
      explanation: "flex-grow, flex-shrink, and flex-basis control how flex items size themselves. flex-grow: how much an item grows relative to siblings when there's extra space (default: 0, don't grow). flex-shrink: how much an item shrinks when there's not enough space (default: 1). flex-basis: the initial size before growing/shrinking (default: auto). The flex shorthand combines all three: flex: <grow> <shrink> <basis>. Common values: flex: 1 (grow equally), flex: 0 0 auto (don't grow/shrink), flex: none.",
      realLifeAnalogy: "Imagine sharing a pizza. flex-grow is how many extra slices each person gets. flex-shrink is how much each person gives up when there's not enough. flex-basis is the minimum each person expects.",
      keyPoints: ["flex-grow: growth factor when extra space (default: 0)", "flex-shrink: shrink factor when tight (default: 1)", "flex-basis: initial size before grow/shrink (default: auto)", "flex: 1 means flex: 1 1 0 (grow equally, shrink, basis 0)", "flex: auto means flex: 1 1 auto", "flex: none means flex: 0 0 auto (rigid)", "flex-basis vs width: flex-basis respects min/max and is flex-aware"],
    },
    code: { defaultCode: `<!DOCTYPE html>\n<html><head><style>\n  .demo { display: flex; gap: 8px; padding: 10px; background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 8px; margin: 8px 0; }\n  .item { color: white; padding: 12px; border-radius: 6px; font-weight: bold; text-align: center; }\n  .g0 { flex-grow: 0; background: #94a3b8; }\n  .g1 { flex-grow: 1; background: #3b82f6; }\n  .g2 { flex-grow: 2; background: #10b981; }\n  .fixed { flex: 0 0 150px; background: #f59e0b; }\n  .fluid { flex: 1; background: #3b82f6; }\n</style></head>\n<body>\n  <h4>flex-grow: 0 vs 1 vs 2</h4>\n  <div class="demo">\n    <div class="item g0">grow:0</div>\n    <div class="item g1">grow:1</div>\n    <div class="item g2">grow:2</div>\n  </div>\n  <h4>Fixed sidebar + fluid main</h4>\n  <div class="demo">\n    <div class="item fixed">Sidebar (150px)</div>\n    <div class="item fluid">Main (flex: 1)</div>\n  </div>\n  <h4>Equal columns</h4>\n  <div class="demo">\n    <div class="item g1" style="background:#3b82f6">flex: 1</div>\n    <div class="item g1" style="background:#10b981">flex: 1</div>\n    <div class="item g1" style="background:#f59e0b">flex: 1</div>\n  </div>\n</body></html>`, language: "html" },
    interviewQuestions: [
      { question: "What does flex: 1 mean?", difficulty: "Medium", hint: "flex: 1 1 0 — grow factor 1, shrink factor 1, basis 0. Items grow equally to fill space." },
      { question: "What is the difference between flex-basis and width?", difficulty: "Hard", hint: "flex-basis is the initial size in the flex context. It respects min/max constraints and is used by the flex algorithm. Width is a CSS property that flex-basis can override." },
      { question: "What does flex: none mean?", difficulty: "Medium", hint: "flex: 0 0 auto — don't grow, don't shrink, use auto (content) size. Makes an item rigid." },
    ],
  },
  {
    id: "css-flexbox-patterns",
    title: "Flexbox Layout Patterns",
    slug: "css-flexbox-patterns",
    icon: "LayoutGrid",
    difficulty: "Intermediate",
    description: "Common layout patterns built with flexbox.",
    concept: {
      explanation: "Flexbox enables many common layout patterns: navbar with logo + links + actions (space-between), holy grail layout (header, sidebar, main, footer), card grids with wrapping (flex-wrap), sticky footer (flex-direction: column on body, flex: 1 on main), and centering (justify-content + align-items: center). These patterns replace complex float/table hacks with clean, maintainable code.",
      realLifeAnalogy: "Flexbox patterns are like IKEA furniture templates. Instead of building from scratch with raw lumber (floats), you have pre-designed arrangements that snap together — just pick the right template for your layout needs.",
      keyPoints: ["Navbar: space-between with logo, links, actions", "Holy grail: header + (sidebar + main + aside) + footer", "Card grid: flex-wrap with flex: 1 1 calc(33% - gap)", "Sticky footer: flex-direction: column, min-height: 100vh, flex: 1 on main", "Centering: justify-content: center + align-items: center", "Media object: fixed image + fluid text", "Split navigation: margin-left: auto on right group"],
    },
    code: { defaultCode: `<!DOCTYPE html>\n<html><head><style>\n  * { margin: 0; box-sizing: border-box; }\n  body { font-family: sans-serif; }\n  /* Navbar */\n  .navbar { display: flex; align-items: center; justify-content: space-between; background: #1e293b; color: white; padding: 12px 20px; }\n  .nav-links { display: flex; gap: 15px; list-style: none; padding: 0; }\n  .nav-links a { color: #94a3b8; text-decoration: none; }\n  /* Card Grid */\n  .cards { display: flex; flex-wrap: wrap; gap: 12px; padding: 20px; }\n  .card { flex: 1 1 calc(33.333% - 12px); min-width: 150px; background: white; border: 2px solid #e2e8f0; border-radius: 8px; padding: 15px; }\n  /* Sticky Footer */\n  .page { display: flex; flex-direction: column; min-height: 300px; border: 2px solid #e2e8f0; border-radius: 8px; margin: 20px; overflow: hidden; }\n  .main { flex: 1; padding: 20px; }\n  .footer { background: #1e293b; color: white; padding: 10px 20px; text-align: center; }\n</style></head>\n<body>\n  <h3 style="padding:10px">Navbar</h3>\n  <nav class="navbar">\n    <strong>Logo</strong>\n    <ul class="nav-links"><li><a href="#">Home</a></li><li><a href="#">About</a></li><li><a href="#">Contact</a></li></ul>\n    <button style="background:#3b82f6;color:white;border:none;padding:6px 16px;border-radius:4px">Sign Up</button>\n  </nav>\n  <h3 style="padding:10px">Card Grid</h3>\n  <div class="cards">\n    <div class="card"><strong>Card 1</strong><p style="font-size:13px;color:#64748b">Responsive card grid</p></div>\n    <div class="card"><strong>Card 2</strong><p style="font-size:13px;color:#64748b">Wraps on small screens</p></div>\n    <div class="card"><strong>Card 3</strong><p style="font-size:13px;color:#64748b">Using flex-wrap</p></div>\n  </div>\n  <h3 style="padding:10px">Sticky Footer</h3>\n  <div class="page">\n    <div class="main">Main content (flex: 1 pushes footer down)</div>\n    <div class="footer">Footer always at bottom</div>\n  </div>\n</body></html>`, language: "html" },
    interviewQuestions: [
      { question: "How do you create a sticky footer with flexbox?", difficulty: "Medium", hint: "Container: display: flex; flex-direction: column; min-height: 100vh. Main content: flex: 1." },
      { question: "How do you push an item to the far right in a flex row?", difficulty: "Easy", hint: "Use margin-left: auto on the item, or justify-content: space-between on the container." },
      { question: "When would you use flexbox vs grid for a card layout?", difficulty: "Hard", hint: "Flexbox for 1D wrapping card rows. Grid for a strict 2D grid with fixed columns. Flexbox cards can have uneven last rows." },
    ],
  },
  // ─── Level 5: CSS Grid ───
  {
    id: "css-grid-intro",
    title: "CSS Grid Introduction",
    slug: "css-grid-intro",
    icon: "Grid3X3",
    difficulty: "Beginner",
    description: "Introduction to CSS Grid for two-dimensional layouts.",
    concept: {
      explanation: "CSS Grid Layout is a two-dimensional layout system that handles both rows and columns simultaneously. Unlike flexbox which is one-dimensional (row OR column), Grid lets you define both dimensions at once. You set display: grid on a container, then define columns with grid-template-columns and rows with grid-template-rows. Grid items can span multiple rows/columns and be placed precisely in named areas.",
      realLifeAnalogy: "Grid is like a spreadsheet. You define rows and columns, then place items in specific cells. Items can span multiple cells, like merging cells in Excel.",
      keyPoints: ["display: grid creates a grid container", "Two-dimensional: rows AND columns", "grid-template-columns defines column sizes", "grid-template-rows defines row sizes", "fr unit: fractional unit for flexible sizing", "repeat() function for repeating patterns", "Grid items can span multiple rows/columns"],
    },
    code: { defaultCode: `<!DOCTYPE html>\n<html><head><style>\n  .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; padding: 20px; }\n  .item { background: #3b82f6; color: white; padding: 20px; border-radius: 8px; text-align: center; font-weight: bold; }\n  .span2 { grid-column: span 2; background: #10b981; }\n  .tall { grid-row: span 2; background: #f59e0b; }\n</style></head>\n<body>\n  <h3>Basic Grid</h3>\n  <div class="grid">\n    <div class="item">1</div><div class="item">2</div><div class="item">3</div>\n    <div class="item">4</div><div class="item">5</div><div class="item">6</div>\n  </div>\n  <h3>Spanning</h3>\n  <div class="grid">\n    <div class="item span2">Span 2 cols</div><div class="item">3</div>\n    <div class="item tall">Span 2 rows</div><div class="item">5</div><div class="item">6</div>\n    <div class="item">7</div><div class="item">8</div>\n  </div>\n</body></html>`, language: "html" },
    interviewQuestions: [
      { question: "What is the difference between CSS Grid and Flexbox?", difficulty: "Medium", hint: "Grid is 2D (rows AND columns). Flexbox is 1D (row OR column). Use Grid for page layouts, Flexbox for component layouts." },
      { question: "What is the fr unit?", difficulty: "Easy", hint: "Fractional unit — represents a fraction of available space. 1fr 2fr means second column is twice as wide as first." },
      { question: "How do you make a grid item span multiple columns?", difficulty: "Easy", hint: "grid-column: span 2; or grid-column: 1 / 3;" },
    ],
  },
  {
    id: "css-grid-container",
    title: "Grid Container",
    slug: "css-grid-container",
    icon: "LayoutGrid",
    difficulty: "Beginner",
    description: "Learn about grid container properties.",
    concept: {
      explanation: "A grid container is created with display: grid (block-level) or display: inline-grid (inline-level). The container controls the entire grid structure: column/row definitions, gaps, alignment, and item placement. Key container properties: grid-template-columns, grid-template-rows, grid-template-areas, gap, justify-items, align-items, justify-content, align-content.",
      realLifeAnalogy: "The grid container is like an architect's blueprint — it defines the floor plan, room sizes, and corridors. Grid items are the furniture placed within those rooms.",
      keyPoints: ["display: grid (block) vs display: inline-grid (inline)", "grid-template-columns: defines column sizes", "grid-template-rows: defines row sizes", "gap: spacing between grid cells", "justify-items / align-items: item alignment within cells", "justify-content / align-content: grid alignment within container", "grid-auto-rows / grid-auto-columns: sizing for implicit tracks"],
    },
    code: { defaultCode: `<!DOCTYPE html>\n<html><head><style>\n  .grid { display: grid; grid-template-columns: 200px 1fr 1fr; grid-template-rows: 60px auto 60px; gap: 10px; padding: 15px; background: #f8fafc; border-radius: 12px; min-height: 300px; }\n  .item { background: #3b82f6; color: white; padding: 12px; border-radius: 6px; font-weight: bold; display: flex; align-items: center; justify-content: center; }\n  .header { grid-column: 1 / -1; background: #1e293b; }\n  .sidebar { background: #10b981; }\n  .footer { grid-column: 1 / -1; background: #1e293b; }\n</style></head>\n<body>\n  <div class="grid">\n    <div class="item header">Header (full width)</div>\n    <div class="item sidebar">Sidebar (200px)</div>\n    <div class="item">Main (1fr)</div>\n    <div class="item">Aside (1fr)</div>\n    <div class="item footer">Footer (full width)</div>\n  </div>\n</body></html>`, language: "html" },
    interviewQuestions: [
      { question: "What is the difference between display: grid and inline-grid?", difficulty: "Easy", hint: "grid creates a block-level container. inline-grid creates an inline-level one that flows with text." },
      { question: "What are implicit grid tracks?", difficulty: "Medium", hint: "Tracks created automatically when items are placed beyond the explicit grid. Sized by grid-auto-rows/grid-auto-columns." },
      { question: "What does grid-column: 1 / -1 mean?", difficulty: "Medium", hint: "Span from the first grid line to the last — effectively full width of the grid." },
    ],
  },
  {
    id: "css-grid-template-columns",
    title: "Grid Template Columns",
    slug: "css-grid-template-columns",
    icon: "Columns",
    difficulty: "Intermediate",
    description: "Define column sizes with grid-template-columns.",
    concept: {
      explanation: "grid-template-columns defines the size of each column in the grid. You can use fixed units (px), flexible units (fr), percentages, auto, and functions like repeat(), minmax(), auto-fill, auto-fit. The fr unit distributes remaining space proportionally. repeat(3, 1fr) creates 3 equal columns. auto-fill creates as many columns as fit. auto-fit is similar but collapses empty tracks. minmax(min, max) sets a size range.",
      realLifeAnalogy: "Defining columns is like setting up dividers in a drawer. You can use fixed-width dividers (px), proportional ones (fr), or flexible ones that adjust based on content (auto, minmax).",
      keyPoints: ["Fixed: grid-template-columns: 200px 300px 200px", "Flexible: grid-template-columns: 1fr 2fr 1fr", "repeat(): grid-template-columns: repeat(3, 1fr)", "auto-fill: creates as many columns as fit", "auto-fit: like auto-fill but collapses empty tracks", "minmax(): minmax(200px, 1fr) — at least 200px, up to 1fr", "Mix units: 250px 1fr 1fr (fixed sidebar + fluid)"],
    },
    code: { defaultCode: `<!DOCTYPE html>\n<html><head><style>\n  .grid { display: grid; gap: 8px; padding: 10px; background: #f8fafc; border-radius: 8px; margin: 10px 0; }\n  .item { background: #3b82f6; color: white; padding: 12px; border-radius: 6px; text-align: center; font-weight: bold; font-size: 13px; }\n  .fr { grid-template-columns: 1fr 2fr 1fr; }\n  .repeat { grid-template-columns: repeat(4, 1fr); }\n  .fit { grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); }\n  .mixed { grid-template-columns: 180px 1fr 1fr; }\n</style></head>\n<body>\n  <h4>1fr 2fr 1fr</h4>\n  <div class="grid fr"><div class="item">1fr</div><div class="item" style="background:#10b981">2fr</div><div class="item">1fr</div></div>\n  <h4>repeat(4, 1fr)</h4>\n  <div class="grid repeat"><div class="item">1</div><div class="item">2</div><div class="item">3</div><div class="item">4</div></div>\n  <h4>auto-fit + minmax (resize window!)</h4>\n  <div class="grid fit"><div class="item">A</div><div class="item">B</div><div class="item">C</div><div class="item">D</div><div class="item">E</div></div>\n  <h4>180px + 1fr + 1fr</h4>\n  <div class="grid mixed"><div class="item" style="background:#f59e0b">Sidebar</div><div class="item">Main</div><div class="item" style="background:#10b981">Aside</div></div>\n</body></html>`, language: "html" },
    interviewQuestions: [
      { question: "What is the difference between auto-fill and auto-fit?", difficulty: "Hard", hint: "auto-fill keeps empty tracks. auto-fit collapses empty tracks, letting items stretch to fill." },
      { question: "What does minmax(200px, 1fr) do?", difficulty: "Medium", hint: "Column is at least 200px wide but grows up to 1fr of available space." },
      { question: "How do you create a responsive grid without media queries?", difficulty: "Medium", hint: "repeat(auto-fit, minmax(250px, 1fr)) — columns auto-adjust based on container width." },
    ],
  },
  {
    id: "css-grid-template-rows",
    title: "Grid Template Rows",
    slug: "css-grid-template-rows",
    icon: "Rows3",
    difficulty: "Intermediate",
    description: "Define row sizes and understand implicit vs explicit rows.",
    concept: {
      explanation: "grid-template-rows defines explicit row sizes. Rows not explicitly defined become implicit rows, sized by grid-auto-rows. You can use the same units as columns: px, fr, auto, minmax(). Common pattern: grid-template-rows: auto 1fr auto (header, flexible main, footer). grid-auto-rows: minmax(100px, auto) ensures implicit rows are at least 100px.",
      realLifeAnalogy: "Explicit rows are shelves you installed intentionally. Implicit rows are extra shelves that appear automatically when you have more items than planned.",
      keyPoints: ["grid-template-rows: defines explicit row heights", "grid-auto-rows: sizes for auto-generated rows", "auto: row sizes to content", "fr: proportional distribution", "minmax(): min and max size range", "Common: auto 1fr auto for header/main/footer", "Implicit rows appear when items overflow explicit grid"],
    },
    code: { defaultCode: `<!DOCTYPE html>\n<html><head><style>\n  .grid { display: grid; grid-template-columns: 1fr; gap: 8px; padding: 10px; background: #f8fafc; border-radius: 8px; margin: 10px 0; }\n  .item { background: #3b82f6; color: white; padding: 12px; border-radius: 6px; font-weight: bold; text-align: center; }\n  .explicit { grid-template-rows: 50px 150px 50px; height: 300px; }\n  .auto-rows { grid-template-rows: 50px; grid-auto-rows: minmax(60px, auto); }\n</style></head>\n<body>\n  <h4>Explicit: 50px 150px 50px</h4>\n  <div class="grid explicit">\n    <div class="item" style="background:#1e293b">Header (50px)</div>\n    <div class="item">Main (150px)</div>\n    <div class="item" style="background:#1e293b">Footer (50px)</div>\n  </div>\n  <h4>grid-auto-rows: minmax(60px, auto)</h4>\n  <div class="grid auto-rows">\n    <div class="item" style="background:#1e293b">Explicit (50px)</div>\n    <div class="item">Implicit row 1</div>\n    <div class="item" style="background:#10b981">Implicit row 2</div>\n    <div class="item" style="background:#f59e0b">Implicit row 3</div>\n  </div>\n</body></html>`, language: "html" },
    interviewQuestions: [
      { question: "What is the difference between explicit and implicit grid tracks?", difficulty: "Medium", hint: "Explicit tracks are defined by grid-template-rows/columns. Implicit tracks are auto-created when items overflow." },
      { question: "How do you size implicit rows?", difficulty: "Easy", hint: "grid-auto-rows sets the size for rows not defined in grid-template-rows." },
      { question: "What is a common row pattern for page layout?", difficulty: "Easy", hint: "grid-template-rows: auto 1fr auto — header and footer auto-size, main fills remaining space." },
    ],
  },
  {
    id: "css-grid-gap",
    title: "Grid Gap",
    slug: "css-grid-gap",
    icon: "Space",
    difficulty: "Beginner",
    description: "Add spacing between grid cells with gap.",
    concept: {
      explanation: "The gap property (formerly grid-gap) adds spacing between grid rows and columns. gap is shorthand for row-gap and column-gap. Unlike margins, gaps only appear between items, not at the edges. This makes gap more predictable than margins for spacing. Gap works in both Grid and Flexbox containers.",
      realLifeAnalogy: "Gap is like the grout between tiles. It creates consistent spacing between tiles without adding space at the edges of the tile floor.",
      keyPoints: ["gap: shorthand for row-gap and column-gap", "gap: 10px (equal both), gap: 10px 20px (row column)", "Only between items, not at container edges", "Works in both Grid and Flexbox", "More predictable than margin for spacing", "Formerly called grid-gap (now just gap)", "Cannot be negative (unlike margins)"],
    },
    code: { defaultCode: `<!DOCTYPE html>\n<html><head><style>\n  .grid { display: grid; grid-template-columns: repeat(3, 1fr); padding: 10px; background: #f8fafc; border-radius: 8px; margin: 10px 0; }\n  .item { background: #3b82f6; color: white; padding: 15px; border-radius: 6px; text-align: center; font-weight: bold; }\n  .g10 { gap: 10px; }\n  .g-diff { gap: 20px 10px; }\n  .g0 { gap: 0; }\n</style></head>\n<body>\n  <h4>gap: 10px</h4>\n  <div class="grid g10"><div class="item">1</div><div class="item">2</div><div class="item">3</div><div class="item">4</div><div class="item">5</div><div class="item">6</div></div>\n  <h4>gap: 20px 10px (row col)</h4>\n  <div class="grid g-diff"><div class="item">1</div><div class="item">2</div><div class="item">3</div><div class="item">4</div><div class="item">5</div><div class="item">6</div></div>\n  <h4>gap: 0</h4>\n  <div class="grid g0"><div class="item">1</div><div class="item">2</div><div class="item">3</div><div class="item">4</div><div class="item">5</div><div class="item">6</div></div>\n</body></html>`, language: "html" },
    interviewQuestions: [
      { question: "What is the difference between gap and margin for spacing?", difficulty: "Medium", hint: "Gap only appears between items. Margin adds space around each item including edges, can cause doubling between items." },
      { question: "Does gap work with Flexbox?", difficulty: "Easy", hint: "Yes, gap works in both Grid and Flexbox containers." },
      { question: "How do you set different row and column gaps?", difficulty: "Easy", hint: "gap: 20px 10px — first value is row-gap, second is column-gap." },
    ],
  },
  {
    id: "css-grid-areas",
    title: "Grid Areas",
    slug: "css-grid-areas",
    icon: "LayoutDashboard",
    difficulty: "Intermediate",
    description: "Name and place grid regions with grid-template-areas.",
    concept: {
      explanation: "grid-template-areas lets you name regions of your grid with an ASCII art-like syntax, making complex layouts readable. Each string represents a row, and each word is a column. Items are assigned to areas with grid-area: name. Use dots (.) for empty cells. This is the most visual way to define layouts and makes restructuring easy.",
      realLifeAnalogy: "grid-template-areas is like drawing a floor plan with labeled rooms. You sketch out 'header header header' / 'sidebar main main' / 'footer footer footer' and then assign furniture to rooms by name.",
      keyPoints: ["grid-template-areas: ASCII art layout definition", "Each string = one row, each word = one column", "grid-area: name assigns item to named area", "Use . (dot) for empty cells", "Area names must form rectangles", "Makes layout restructuring easy", "Very readable for complex layouts"],
    },
    code: { defaultCode: `<!DOCTYPE html>\n<html><head><style>\n  .layout { display: grid; grid-template-areas: "header header header" "sidebar main main" "footer footer footer"; grid-template-columns: 200px 1fr 1fr; grid-template-rows: auto 1fr auto; gap: 10px; padding: 10px; min-height: 350px; background: #f8fafc; border-radius: 12px; }\n  .header { grid-area: header; background: #1e293b; color: white; padding: 15px; border-radius: 6px; text-align: center; font-weight: bold; }\n  .sidebar { grid-area: sidebar; background: #10b981; color: white; padding: 15px; border-radius: 6px; font-weight: bold; }\n  .main { grid-area: main; background: #3b82f6; color: white; padding: 15px; border-radius: 6px; font-weight: bold; }\n  .footer { grid-area: footer; background: #1e293b; color: white; padding: 15px; border-radius: 6px; text-align: center; font-weight: bold; }\n</style></head>\n<body>\n  <div class="layout">\n    <div class="header">Header</div>\n    <div class="sidebar">Sidebar</div>\n    <div class="main">Main Content</div>\n    <div class="footer">Footer</div>\n  </div>\n</body></html>`, language: "html" },
    interviewQuestions: [
      { question: "How do you create empty cells with grid-template-areas?", difficulty: "Easy", hint: "Use a dot (.) for empty cells in the area template string." },
      { question: "Can grid areas be non-rectangular?", difficulty: "Medium", hint: "No, each named area must form a rectangle. L-shaped or irregular areas are invalid." },
      { question: "What is the advantage of grid-template-areas over line numbers?", difficulty: "Medium", hint: "Much more readable and visual. Easy to restructure layouts by rearranging the template strings." },
    ],
  },
  {
    id: "css-grid-vs-flexbox",
    title: "Grid vs Flexbox",
    slug: "css-grid-vs-flexbox",
    icon: "GitCompare",
    difficulty: "Intermediate",
    description: "When to use Grid vs Flexbox.",
    concept: {
      explanation: "Grid and Flexbox are complementary, not competitors. Grid is for two-dimensional layouts (rows AND columns at once) — page layouts, dashboards, image galleries. Flexbox is for one-dimensional layouts (row OR column) — navigation bars, card rows, centering, component internals. You can and should use both together: Grid for the page layout, Flexbox inside grid items for component layouts.",
      realLifeAnalogy: "Grid is like an architect designing rooms (2D floor plan). Flexbox is like an interior designer arranging furniture within a room (1D arrangement along a wall or shelf).",
      keyPoints: ["Grid: 2D layout (rows AND columns)", "Flexbox: 1D layout (row OR column)", "Grid: content placement is container-controlled", "Flexbox: content placement is content-driven", "Use Grid for page/section layouts", "Use Flexbox for component internals, navbars, centering", "They work great together — Grid for structure, Flexbox inside"],
    },
    code: { defaultCode: `<!DOCTYPE html>\n<html><head><style>\n  /* Grid for page layout */\n  .page { display: grid; grid-template-areas: "nav nav" "sidebar main" "footer footer"; grid-template-columns: 200px 1fr; grid-template-rows: auto 1fr auto; gap: 10px; min-height: 400px; padding: 10px; }\n  .nav { grid-area: nav; background: #1e293b; color: white; padding: 10px; border-radius: 6px; display: flex; align-items: center; justify-content: space-between; }\n  .sidebar { grid-area: sidebar; background: #f0fdf4; border: 2px solid #10b981; border-radius: 6px; padding: 10px; }\n  .main { grid-area: main; background: #f8fafc; border-radius: 6px; padding: 15px; display: flex; flex-wrap: wrap; gap: 10px; align-content: flex-start; }\n  .footer { grid-area: footer; background: #1e293b; color: white; padding: 10px; border-radius: 6px; text-align: center; }\n  /* Flexbox inside grid items */\n  .nav-links { display: flex; gap: 12px; list-style: none; margin: 0; padding: 0; }\n  .card { flex: 1 1 calc(50% - 10px); background: white; border: 2px solid #e2e8f0; border-radius: 8px; padding: 12px; min-width: 120px; }\n</style></head>\n<body>\n  <div class="page">\n    <nav class="nav"><strong>Logo</strong><ul class="nav-links"><li>Home</li><li>About</li></ul></nav>\n    <aside class="sidebar"><strong>Sidebar</strong><p style="font-size:12px;margin-top:8px">Grid area</p></aside>\n    <main class="main"><div class="card"><strong>Card 1</strong></div><div class="card"><strong>Card 2</strong></div><div class="card"><strong>Card 3</strong></div><div class="card"><strong>Card 4</strong></div></main>\n    <footer class="footer">Footer</footer>\n  </div>\n</body></html>`, language: "html" },
    interviewQuestions: [
      { question: "When should you use Grid vs Flexbox?", difficulty: "Medium", hint: "Grid for 2D layouts (page structure). Flexbox for 1D layouts (component internals, navbars, centering)." },
      { question: "Can you use Grid and Flexbox together?", difficulty: "Easy", hint: "Yes! Use Grid for the page layout, then Flexbox inside individual grid items for their internal layout." },
      { question: "What does 'content-driven vs container-driven' mean?", difficulty: "Hard", hint: "Flexbox: items influence their own sizing (content-driven). Grid: container defines the structure and items fill it (container-driven)." },
    ],
  },
  {
    id: "css-grid-patterns",
    title: "Grid Layout Patterns",
    slug: "css-grid-patterns",
    icon: "LayoutTemplate",
    difficulty: "Intermediate",
    description: "Common layout patterns built with CSS Grid.",
    concept: {
      explanation: "CSS Grid enables powerful layout patterns: dashboard grids with spanning items, responsive image galleries with auto-fit, magazine-style layouts with grid-template-areas, and responsive card grids with minmax(). The key pattern for responsive grids without media queries is: grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)).",
      realLifeAnalogy: "Grid patterns are like pre-designed room layouts for different purposes — open plan offices, gallery walls, magazine page templates. Each pattern solves a specific layout challenge.",
      keyPoints: ["Dashboard: spanning items across rows/columns", "Image gallery: auto-fit with aspect-ratio", "Magazine: grid-template-areas with varied spans", "Responsive cards: repeat(auto-fit, minmax(250px, 1fr))", "Holy grail: header/sidebar/main/aside/footer", "Masonry-like: grid-row: span 2 for tall items", "No media queries needed with auto-fit + minmax"],
    },
    code: { defaultCode: `<!DOCTYPE html>\n<html><head><style>\n  .dashboard { display: grid; grid-template-columns: repeat(4, 1fr); grid-auto-rows: minmax(80px, auto); gap: 10px; padding: 10px; }\n  .widget { background: #3b82f6; color: white; padding: 15px; border-radius: 8px; font-weight: bold; display: flex; align-items: center; justify-content: center; }\n  .w-wide { grid-column: span 2; background: #10b981; }\n  .w-tall { grid-row: span 2; background: #f59e0b; }\n  .w-big { grid-column: span 2; grid-row: span 2; background: #8b5cf6; }\n  .responsive { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; padding: 10px; margin-top: 20px; }\n  .rcard { background: white; border: 2px solid #e2e8f0; border-radius: 8px; padding: 15px; text-align: center; }\n</style></head>\n<body>\n  <h3 style="padding:0 10px">Dashboard Grid</h3>\n  <div class="dashboard">\n    <div class="widget w-big">Chart</div>\n    <div class="widget">Stats 1</div>\n    <div class="widget">Stats 2</div>\n    <div class="widget w-wide">Table</div>\n    <div class="widget w-tall">Sidebar</div>\n    <div class="widget">Card</div>\n  </div>\n  <h3 style="padding:0 10px">Responsive Cards (resize!)</h3>\n  <div class="responsive">\n    <div class="rcard"><strong>Card 1</strong></div>\n    <div class="rcard"><strong>Card 2</strong></div>\n    <div class="rcard"><strong>Card 3</strong></div>\n    <div class="rcard"><strong>Card 4</strong></div>\n    <div class="rcard"><strong>Card 5</strong></div>\n  </div>\n</body></html>`, language: "html" },
    interviewQuestions: [
      { question: "How do you create a responsive grid without media queries?", difficulty: "Medium", hint: "grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)) — auto-adjusts column count." },
      { question: "How do you make a grid item span multiple columns and rows?", difficulty: "Easy", hint: "grid-column: span 2; grid-row: span 2;" },
      { question: "What is the difference between auto-fill and auto-fit?", difficulty: "Hard", hint: "auto-fill keeps empty tracks. auto-fit collapses empty tracks, letting items stretch." },
    ],
  },
  // ─── Level 6: Responsive Design ───
  {
    id: "css-responsive-basics",
    title: "Responsive Design Basics",
    slug: "css-responsive-basics",
    icon: "Smartphone",
    difficulty: "Beginner",
    description: "Understand the fundamentals of responsive web design.",
    concept: {
      explanation:
        "Responsive web design (RWD) makes websites adapt to any screen size — phones, tablets, laptops, desktops. The three pillars are: flexible grids (use relative units like %, fr, vw instead of fixed px), flexible images (max-width: 100% so images scale down), and media queries (apply different CSS at different screen widths). The viewport meta tag is essential: <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"> tells mobile browsers to use the actual device width instead of a virtual 980px viewport.",
      realLifeAnalogy:
        "Responsive design is like water in a container — it takes the shape of whatever vessel it's in. A responsive website flows and adapts to fit the screen, whether it's a phone, tablet, or widescreen monitor.",
      keyPoints: [
        "Three pillars: flexible grids, flexible images, media queries",
        "Viewport meta tag is required for mobile devices",
        "Use relative units (%, fr, rem, vw) instead of fixed px",
        "Images: max-width: 100% prevents overflow",
        "Mobile users now exceed desktop users globally",
        "Test at multiple breakpoints, not just phone/desktop",
        "CSS Grid and Flexbox make responsive layouts much easier",
      ],
    },
    code: {
      defaultCode: `<!DOCTYPE html>
<html><head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  * { box-sizing: border-box; margin: 0; }
  body { font-family: sans-serif; padding: 16px; }
  .container { max-width: 900px; margin: 0 auto; }
  h1 { font-size: clamp(1.5rem, 4vw, 2.5rem); margin-bottom: 16px; }
  .cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; }
  .card { background: white; border: 2px solid #e2e8f0; border-radius: 12px; padding: 20px; }
  .card h3 { color: #1e293b; margin-bottom: 8px; }
  .card p { color: #64748b; font-size: 14px; line-height: 1.5; }
  img { max-width: 100%; height: auto; border-radius: 8px; }
</style></head>
<body>
  <div class="container">
    <h1>Responsive Layout</h1>
    <p style="color:#64748b;margin-bottom:20px">Resize the preview to see cards reflow automatically.</p>
    <div class="cards">
      <div class="card"><h3>Flexible Grid</h3><p>Cards use auto-fit + minmax to reflow at any width.</p></div>
      <div class="card"><h3>Relative Units</h3><p>Font uses clamp() to scale between min and max sizes.</p></div>
      <div class="card"><h3>Fluid Images</h3><p>max-width: 100% ensures images never overflow their container.</p></div>
      <div class="card"><h3>Viewport Meta</h3><p>The meta tag tells mobile browsers to use real device width.</p></div>
    </div>
  </div>
</body></html>`,
      language: "html",
    },
    interviewQuestions: [
      { question: "What are the three pillars of responsive web design?", difficulty: "Easy", hint: "Flexible grids, flexible images, and media queries — coined by Ethan Marcotte." },
      { question: "Why is the viewport meta tag important?", difficulty: "Medium", hint: "Without it, mobile browsers render at ~980px width and zoom out, making text tiny and layouts broken." },
      { question: "What is the difference between adaptive and responsive design?", difficulty: "Hard", hint: "Responsive uses fluid grids that scale continuously. Adaptive uses fixed layouts that snap at specific breakpoints." },
    ],
  },
  {
    id: "css-media-queries",
    title: "Media Queries",
    slug: "css-media-queries",
    icon: "MonitorSmartphone",
    difficulty: "Intermediate",
    description: "Apply different styles based on screen size and device features.",
    concept: {
      explanation:
        "Media queries let you apply CSS rules conditionally based on device characteristics — most commonly screen width. Syntax: @media (condition) { rules }. Common conditions: min-width, max-width, orientation, prefers-color-scheme, hover, prefers-reduced-motion. You can combine conditions with 'and', 'or' (comma), and 'not'. Media queries are the primary tool for creating breakpoints where layouts change.",
      realLifeAnalogy:
        "Media queries are like a building's climate control system. When temperature (screen width) crosses a threshold, the system activates different settings (styles). Below 60°F, heat turns on. Above 75°F, AC activates.",
      keyPoints: [
        "@media (min-width: 768px) { } — styles for 768px and wider",
        "@media (max-width: 767px) { } — styles for below 768px",
        "Combine with 'and': @media (min-width: 768px) and (max-width: 1024px)",
        "prefers-color-scheme: dark/light for theme detection",
        "prefers-reduced-motion: reduce for accessibility",
        "hover: hover detects devices with hover capability",
        "Place media queries after base styles (cascade order matters)",
      ],
    },
    code: {
      defaultCode: `<!DOCTYPE html>
<html><head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  * { box-sizing: border-box; margin: 0; }
  body { font-family: sans-serif; padding: 16px; }
  .indicator { padding: 12px 20px; border-radius: 8px; font-weight: bold; text-align: center; margin-bottom: 16px; }
  .layout { display: flex; flex-direction: column; gap: 12px; }
  .box { padding: 20px; border-radius: 8px; color: white; font-weight: bold; text-align: center; }
  .box:nth-child(1) { background: #3b82f6; }
  .box:nth-child(2) { background: #10b981; }
  .box:nth-child(3) { background: #f59e0b; }

  /* Small screens (default) */
  .indicator { background: #fef3c7; color: #92400e; }
  .indicator::after { content: "Small (< 600px)"; }

  /* Medium screens */
  @media (min-width: 600px) {
    .indicator { background: #dbeafe; color: #1e40af; }
    .indicator::after { content: "Medium (600px - 899px)"; }
    .layout { flex-direction: row; }
    .box { flex: 1; }
  }

  /* Large screens */
  @media (min-width: 900px) {
    .indicator { background: #d1fae5; color: #065f46; }
    .indicator::after { content: "Large (900px+)"; }
    .box { padding: 40px; font-size: 18px; }
  }
</style></head>
<body>
  <div class="indicator"></div>
  <p style="color:#64748b;font-size:14px;margin-bottom:16px">Resize the preview to see layout changes at different widths.</p>
  <div class="layout">
    <div class="box">Column 1</div>
    <div class="box">Column 2</div>
    <div class="box">Column 3</div>
  </div>
</body></html>`,
      language: "html",
    },
    interviewQuestions: [
      { question: "What is the difference between min-width and max-width in media queries?", difficulty: "Easy", hint: "min-width: styles apply at that width AND above (mobile-first). max-width: styles apply at that width AND below (desktop-first)." },
      { question: "How do you detect dark mode preference with CSS?", difficulty: "Medium", hint: "@media (prefers-color-scheme: dark) { } — matches when the user's OS is set to dark mode." },
      { question: "Why should media queries come after base styles?", difficulty: "Medium", hint: "CSS cascade: later rules override earlier ones at the same specificity. Media query styles need to override base styles." },
    ],
  },
  {
    id: "css-mobile-first",
    title: "Mobile First Design",
    slug: "css-mobile-first",
    icon: "Smartphone",
    difficulty: "Intermediate",
    description: "Build responsive layouts starting from the smallest screen.",
    concept: {
      explanation:
        "Mobile-first design means writing base CSS for mobile screens, then using min-width media queries to add complexity for larger screens. This approach is better than desktop-first (max-width) because: mobile styles are simpler and serve as a clean foundation, smaller devices don't download unused styles, it forces you to prioritize content, and min-width queries stack naturally. The progression is: base styles (mobile) → @media (min-width: 768px) tablet → @media (min-width: 1024px) desktop.",
      realLifeAnalogy:
        "Mobile-first is like packing a carry-on bag first (essentials only), then adding more items as your luggage gets bigger. Desktop-first is like filling a suitcase and then trying to squeeze everything into a carry-on — much harder.",
      keyPoints: [
        "Base styles = mobile (no media query needed)",
        "Use min-width media queries to add complexity for larger screens",
        "Desktop-first uses max-width (opposite approach, less recommended)",
        "Forces content prioritization — what matters most on small screens?",
        "Smaller CSS payload for mobile devices",
        "Progressive enhancement: add features as screen grows",
        "Common breakpoints: 640px, 768px, 1024px, 1280px",
      ],
    },
    code: {
      defaultCode: `<!DOCTYPE html>
<html><head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  * { box-sizing: border-box; margin: 0; }
  body { font-family: sans-serif; }

  /* ── MOBILE FIRST (base styles) ── */
  .nav { background: #1e293b; color: white; padding: 12px 16px; }
  .nav-brand { font-weight: bold; font-size: 18px; }
  .nav-links { display: none; } /* Hidden on mobile */
  .nav-toggle { display: block; background: none; border: 1px solid #475569; color: white; padding: 4px 12px; border-radius: 4px; cursor: pointer; }

  .hero { padding: 30px 16px; text-align: center; background: #f0f9ff; }
  .hero h1 { font-size: 1.5rem; margin-bottom: 8px; }

  .features { display: grid; grid-template-columns: 1fr; gap: 12px; padding: 16px; }
  .feature { background: white; border: 2px solid #e2e8f0; border-radius: 8px; padding: 16px; }

  /* ── TABLET (min-width: 640px) ── */
  @media (min-width: 640px) {
    .nav { display: flex; align-items: center; justify-content: space-between; }
    .nav-links { display: flex; gap: 16px; list-style: none; padding: 0; }
    .nav-links a { color: #94a3b8; text-decoration: none; }
    .nav-toggle { display: none; }
    .features { grid-template-columns: repeat(2, 1fr); }
    .hero h1 { font-size: 2rem; }
  }

  /* ── DESKTOP (min-width: 1024px) ── */
  @media (min-width: 1024px) {
    .features { grid-template-columns: repeat(3, 1fr); max-width: 960px; margin: 0 auto; }
    .hero { padding: 50px 16px; }
    .hero h1 { font-size: 2.5rem; }
  }
</style></head>
<body>
  <nav class="nav">
    <span class="nav-brand">Brand</span>
    <button class="nav-toggle">Menu</button>
    <ul class="nav-links"><li><a href="#">Home</a></li><li><a href="#">About</a></li><li><a href="#">Contact</a></li></ul>
  </nav>
  <section class="hero"><h1>Mobile First</h1><p style="color:#64748b">Base styles are mobile. Complexity added with min-width.</p></section>
  <div class="features">
    <div class="feature"><strong>1 col</strong> on mobile</div>
    <div class="feature"><strong>2 cols</strong> on tablet</div>
    <div class="feature"><strong>3 cols</strong> on desktop</div>
  </div>
</body></html>`,
      language: "html",
    },
    interviewQuestions: [
      { question: "What is mobile-first design and why is it preferred?", difficulty: "Medium", hint: "Write base styles for mobile, use min-width to enhance. Simpler base, better performance, forces content prioritization." },
      { question: "What is the difference between mobile-first and desktop-first media queries?", difficulty: "Easy", hint: "Mobile-first: min-width (add complexity). Desktop-first: max-width (remove complexity)." },
      { question: "How does mobile-first improve performance?", difficulty: "Hard", hint: "Mobile devices get only base styles. Complex styles (larger images, multi-column layouts) are only loaded when the screen is large enough." },
    ],
  },
  {
    id: "css-breakpoints",
    title: "Breakpoints",
    slug: "css-breakpoints",
    icon: "Ruler",
    difficulty: "Intermediate",
    description: "Choose and implement responsive breakpoints effectively.",
    concept: {
      explanation:
        "Breakpoints are the screen widths where your layout changes via media queries. Common breakpoints: 640px (small/phone landscape), 768px (tablet), 1024px (laptop), 1280px (desktop), 1536px (large desktop). But don't design for specific devices — design for content. Add a breakpoint when your content looks broken or cramped. Fewer, well-chosen breakpoints are better than many. Frameworks like Tailwind use: sm(640), md(768), lg(1024), xl(1280), 2xl(1536).",
      realLifeAnalogy:
        "Breakpoints are like clothing sizes — S, M, L, XL. You don't make a unique outfit for every person. Instead, you define a few sizes that work for ranges of body types. Similarly, breakpoints define layouts that work for ranges of screen widths.",
      keyPoints: [
        "Common breakpoints: 640px, 768px, 1024px, 1280px, 1536px",
        "Design for content, not devices — add breakpoints when content breaks",
        "Fewer breakpoints = easier maintenance",
        "Use em or rem for breakpoints (better for zoom accessibility)",
        "Tailwind: sm(640), md(768), lg(1024), xl(1280), 2xl(1536)",
        "Test between breakpoints too, not just at them",
        "Content-first approach: start with content, add breakpoints as needed",
      ],
    },
    code: {
      defaultCode: `<!DOCTYPE html>
<html><head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  * { box-sizing: border-box; margin: 0; }
  body { font-family: sans-serif; padding: 16px; }
  .breakpoint-bar { display: flex; gap: 4px; margin-bottom: 20px; }
  .bp { flex: 1; padding: 8px 4px; text-align: center; font-size: 11px; font-weight: bold; border-radius: 6px; background: #f1f5f9; color: #94a3b8; transition: all 0.3s; }
  .bp.active { color: white; }

  .grid { display: grid; gap: 12px; }
  .item { background: #3b82f6; color: white; padding: 16px; border-radius: 8px; text-align: center; font-weight: bold; }
  .sidebar { background: #10b981; }
  .aside { background: #f59e0b; }

  /* Mobile (default) — 1 column */
  .grid { grid-template-columns: 1fr; }
  .bp-xs { background: #3b82f6 !important; color: white !important; }

  @media (min-width: 640px) {
    .grid { grid-template-columns: repeat(2, 1fr); }
    .bp-sm { background: #10b981 !important; color: white !important; }
  }
  @media (min-width: 768px) {
    .bp-md { background: #f59e0b !important; color: white !important; }
  }
  @media (min-width: 1024px) {
    .grid { grid-template-columns: 200px 1fr 200px; }
    .bp-lg { background: #8b5cf6 !important; color: white !important; }
  }
  @media (min-width: 1280px) {
    .bp-xl { background: #ef4444 !important; color: white !important; }
  }
</style></head>
<body>
  <h3 style="margin-bottom:12px">Active Breakpoint</h3>
  <div class="breakpoint-bar">
    <div class="bp bp-xs">xs<br>&lt;640</div>
    <div class="bp bp-sm">sm<br>640+</div>
    <div class="bp bp-md">md<br>768+</div>
    <div class="bp bp-lg">lg<br>1024+</div>
    <div class="bp bp-xl">xl<br>1280+</div>
  </div>
  <div class="grid">
    <div class="item sidebar">Sidebar</div>
    <div class="item">Main Content</div>
    <div class="item aside">Aside</div>
    <div class="item">Card 1</div>
    <div class="item">Card 2</div>
    <div class="item">Card 3</div>
  </div>
</body></html>`,
      language: "html",
    },
    interviewQuestions: [
      { question: "How do you choose breakpoints?", difficulty: "Medium", hint: "Based on content, not devices. Resize until the layout looks broken, then add a breakpoint there." },
      { question: "What are the common breakpoints used by CSS frameworks?", difficulty: "Easy", hint: "Tailwind/Bootstrap: ~640px (sm), 768px (md), 1024px (lg), 1280px (xl)." },
      { question: "Should breakpoints use px or em?", difficulty: "Hard", hint: "em-based breakpoints (e.g., 48em = 768px) are more accessible because they respect user's font-size zoom settings." },
    ],
  },
  {
    id: "css-responsive-images",
    title: "Responsive Images",
    slug: "css-responsive-images",
    icon: "Image",
    difficulty: "Intermediate",
    description: "Make images scale and adapt to any screen size.",
    concept: {
      explanation:
        "Responsive images scale to fit their container without overflowing. The foundation is max-width: 100%; height: auto — images shrink when the container is smaller but never stretch beyond their natural size. For art direction (different crops at different sizes), use the <picture> element with <source> and media attributes. For resolution switching (same image, different sizes), use srcset and sizes attributes. The object-fit property controls how images fill their container: cover, contain, fill, none.",
      realLifeAnalogy:
        "Responsive images are like photo prints in different frame sizes. max-width: 100% is like a photo that shrinks to fit any frame. srcset is like having the same photo in wallet, 5x7, and poster sizes — the browser picks the best one.",
      keyPoints: [
        "max-width: 100%; height: auto — basic responsive image",
        "object-fit: cover fills the container, cropping excess",
        "object-fit: contain fits entire image, may leave gaps",
        "<picture> element for art direction (different crops)",
        "srcset for resolution switching (same image, different sizes)",
        "sizes attribute tells browser the rendered size at each breakpoint",
        "aspect-ratio property maintains proportions without padding hack",
      ],
    },
    code: {
      defaultCode: `<!DOCTYPE html>
<html><head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  * { box-sizing: border-box; margin: 0; }
  body { font-family: sans-serif; padding: 16px; }
  h3 { margin: 16px 0 8px; }

  /* Basic responsive image */
  .responsive-img { max-width: 100%; height: auto; border-radius: 8px; }

  /* Object-fit demo */
  .fit-demo { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px; }
  .fit-box { width: 100%; aspect-ratio: 1; border-radius: 8px; border: 2px solid #e2e8f0; overflow: hidden; position: relative; }
  .fit-box div { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-weight: bold; color: white; font-size: 14px; }
  .cover div { background: #3b82f6; }
  .contain div { background: #10b981; }
  .fill div { background: #f59e0b; }

  /* Aspect ratio */
  .aspect-demo { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
  .aspect-box { border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 13px; }
  .a169 { aspect-ratio: 16/9; background: #3b82f6; }
  .a11 { aspect-ratio: 1; background: #10b981; }
  .a43 { aspect-ratio: 4/3; background: #f59e0b; }
</style></head>
<body>
  <h3>Object-Fit Values</h3>
  <div class="fit-demo">
    <div><p style="font-size:12px;margin-bottom:4px;font-weight:bold">cover (crop to fill)</p><div class="fit-box cover"><div>cover</div></div></div>
    <div><p style="font-size:12px;margin-bottom:4px;font-weight:bold">contain (fit inside)</p><div class="fit-box contain"><div>contain</div></div></div>
    <div><p style="font-size:12px;margin-bottom:4px;font-weight:bold">fill (stretch)</p><div class="fit-box fill"><div>fill</div></div></div>
  </div>

  <h3>Aspect Ratio</h3>
  <div class="aspect-demo">
    <div class="aspect-box a169">16:9</div>
    <div class="aspect-box a11">1:1</div>
    <div class="aspect-box a43">4:3</div>
  </div>

  <h3 style="margin-top:20px">Responsive Image Code</h3>
  <pre style="background:#1e293b;color:#e2e8f0;padding:12px;border-radius:8px;font-size:12px;overflow-x:auto">
&lt;!-- Basic responsive --&gt;
&lt;img src="photo.jpg" style="max-width:100%;height:auto"&gt;

&lt;!-- Resolution switching --&gt;
&lt;img srcset="photo-400.jpg 400w,
             photo-800.jpg 800w"
     sizes="(max-width:600px) 400px, 800px"
     src="photo-800.jpg"&gt;

&lt;!-- Art direction --&gt;
&lt;picture&gt;
  &lt;source media="(min-width:800px)" srcset="wide.jpg"&gt;
  &lt;source media="(min-width:400px)" srcset="medium.jpg"&gt;
  &lt;img src="small.jpg" alt="Responsive"&gt;
&lt;/picture&gt;</pre>
</body></html>`,
      language: "html",
    },
    interviewQuestions: [
      { question: "How do you make an image responsive?", difficulty: "Easy", hint: "max-width: 100%; height: auto — image scales down but never exceeds its natural size." },
      { question: "What is the difference between srcset and the picture element?", difficulty: "Hard", hint: "srcset: same image in different resolutions (browser picks best). <picture>: different images entirely (art direction, different crops)." },
      { question: "What is the difference between object-fit: cover and contain?", difficulty: "Medium", hint: "cover fills the entire container, cropping as needed. contain fits the whole image inside, possibly leaving empty space." },
    ],
  },
  {
    id: "css-fluid-layouts",
    title: "Fluid Layouts",
    slug: "css-fluid-layouts",
    icon: "Waves",
    difficulty: "Intermediate",
    description: "Create layouts that scale smoothly without breakpoint jumps.",
    concept: {
      explanation:
        "Fluid layouts use relative units (%, vw, vh, fr, clamp()) so elements scale continuously rather than jumping at breakpoints. Key techniques: percentage widths for containers (max-width: 90%), viewport units for full-screen sections (height: 100vh), clamp() for fluid typography (font-size: clamp(1rem, 2.5vw, 2rem)), and CSS Grid's auto-fit + minmax for fluid grids. Fluid layouts reduce the need for media queries and create smoother transitions across screen sizes.",
      realLifeAnalogy:
        "A fluid layout is like a rubber band — it stretches and contracts smoothly. A non-fluid layout is like a set of fixed-size boxes — it jumps between sizes. Fluid typography is like text on a balloon — it grows and shrinks proportionally.",
      keyPoints: [
        "Use %, vw, vh, fr for fluid sizing",
        "clamp(min, preferred, max) for fluid typography",
        "max-width with margin: auto for centered containers",
        "CSS Grid auto-fit + minmax for fluid grids",
        "vw/vh: percentage of viewport width/height",
        "Reduces need for media queries",
        "Combine with min/max constraints to prevent extremes",
      ],
    },
    code: {
      defaultCode: `<!DOCTYPE html>
<html><head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  * { box-sizing: border-box; margin: 0; }
  body { font-family: sans-serif; }

  /* Fluid container */
  .container { width: min(90%, 960px); margin: 0 auto; padding: 20px 0; }

  /* Fluid typography */
  h1 { font-size: clamp(1.5rem, 4vw, 3rem); margin-bottom: 8px; }
  h2 { font-size: clamp(1.1rem, 2.5vw, 1.75rem); color: #475569; margin: 20px 0 12px; }
  p { font-size: clamp(0.875rem, 1.5vw, 1.125rem); color: #64748b; line-height: 1.6; }

  /* Fluid grid */
  .fluid-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(200px, 100%), 1fr)); gap: clamp(8px, 2vw, 20px); }
  .card { background: white; border: 2px solid #e2e8f0; border-radius: 12px; padding: clamp(12px, 2vw, 24px); }
  .card h3 { font-size: clamp(0.9rem, 1.8vw, 1.2rem); margin-bottom: 6px; }

  /* Fluid spacing */
  .hero { padding: clamp(30px, 8vw, 80px) 0; text-align: center; background: #f0f9ff; margin-bottom: clamp(16px, 4vw, 40px); }

  /* Fluid sidebar layout */
  .sidebar-layout { display: grid; grid-template-columns: minmax(200px, 25%) 1fr; gap: clamp(12px, 2vw, 24px); margin-top: 20px; }
  .side { background: #f0fdf4; border: 2px solid #10b981; border-radius: 8px; padding: 16px; }
  .main { background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 8px; padding: 16px; }
</style></head>
<body>
  <div class="hero">
    <div class="container">
      <h1>Fluid Layout</h1>
      <p>Everything scales smoothly — no breakpoint jumps.</p>
    </div>
  </div>
  <div class="container">
    <h2>Fluid Card Grid</h2>
    <div class="fluid-grid">
      <div class="card"><h3>clamp()</h3><p>Fluid font sizing between min and max.</p></div>
      <div class="card"><h3>auto-fit</h3><p>Columns adjust to available space.</p></div>
      <div class="card"><h3>min()</h3><p>Container uses the smaller of 90% or 960px.</p></div>
    </div>
    <h2>Fluid Sidebar</h2>
    <div class="sidebar-layout">
      <div class="side"><strong>Sidebar</strong><br><small>25% width, min 200px</small></div>
      <div class="main"><strong>Main Content</strong><br><small>Takes remaining space (1fr)</small></div>
    </div>
  </div>
</body></html>`,
      language: "html",
    },
    interviewQuestions: [
      { question: "What does clamp(1rem, 2.5vw, 2rem) do?", difficulty: "Medium", hint: "Font size is 2.5vw but never smaller than 1rem or larger than 2rem. Smoothly scales between those bounds." },
      { question: "What is the difference between fluid and responsive design?", difficulty: "Hard", hint: "Responsive uses breakpoints where layout jumps. Fluid uses relative units so layout scales smoothly. Best designs use both." },
      { question: "How do you create a fluid container?", difficulty: "Easy", hint: "width: min(90%, 960px); margin: 0 auto; — takes 90% width up to a 960px maximum, centered." },
    ],
  },
  {
    id: "css-container-queries",
    title: "Container Queries",
    slug: "css-container-queries",
    icon: "Container",
    difficulty: "Advanced",
    description: "Style elements based on their container's size, not the viewport.",
    concept: {
      explanation:
        "Container queries let you style elements based on their parent container's size instead of the viewport. This is a game-changer for component-based design — a card component can adapt its layout based on where it's placed (sidebar vs main content), not the screen width. Set container-type: inline-size on the parent, then use @container (min-width: 400px) { } to apply styles. You can name containers with container-name for targeted queries.",
      realLifeAnalogy:
        "Media queries are like dressing for the weather (global). Container queries are like dressing for the room you're in — the same person wears a coat in a cold room and removes it in a warm room, regardless of the weather outside.",
      keyPoints: [
        "container-type: inline-size makes an element a query container",
        "@container (min-width: 400px) { } applies styles based on container width",
        "container-name: sidebar for named containers",
        "@container sidebar (min-width: 300px) { } targets specific container",
        "container: sidebar / inline-size (shorthand for name + type)",
        "Enables truly reusable, context-aware components",
        "Supported in all modern browsers (2023+)",
      ],
    },
    code: {
      defaultCode: `<!DOCTYPE html>
<html><head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  * { box-sizing: border-box; margin: 0; }
  body { font-family: sans-serif; padding: 16px; }

  /* Container setup */
  .container { container-type: inline-size; }

  /* Card component — adapts to container */
  .card { background: white; border: 2px solid #e2e8f0; border-radius: 12px; padding: 16px; }
  .card-inner { display: flex; flex-direction: column; gap: 8px; }
  .card-img { width: 100%; height: 80px; background: #3b82f6; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; }
  .card h3 { font-size: 14px; }
  .card p { font-size: 12px; color: #64748b; }

  /* When container is wide enough, go horizontal */
  @container (min-width: 400px) {
    .card-inner { flex-direction: row; align-items: center; }
    .card-img { width: 120px; min-width: 120px; height: 80px; }
    .card h3 { font-size: 16px; }
  }

  @container (min-width: 600px) {
    .card { padding: 24px; }
    .card-img { width: 180px; min-width: 180px; height: 100px; }
    .card h3 { font-size: 18px; }
    .card p { font-size: 14px; }
  }

  /* Layout to show same card in different containers */
  .layout { display: grid; grid-template-columns: 250px 1fr; gap: 16px; margin-top: 16px; }
  .sidebar { background: #f8fafc; border-radius: 8px; padding: 12px; }
  .main { background: #f8fafc; border-radius: 8px; padding: 12px; }
  .label { font-size: 11px; font-weight: bold; color: #64748b; margin-bottom: 8px; text-transform: uppercase; }
</style></head>
<body>
  <h2 style="margin-bottom:4px">Container Queries</h2>
  <p style="font-size:14px;color:#64748b;margin-bottom:16px">Same card component adapts to its container's width, not the viewport.</p>

  <div class="layout">
    <div class="sidebar">
      <div class="label">Narrow container (250px)</div>
      <div class="container">
        <div class="card"><div class="card-inner"><div class="card-img">IMG</div><div><h3>Card Title</h3><p>Stacked layout in narrow container.</p></div></div></div>
      </div>
    </div>
    <div class="main">
      <div class="label">Wide container (remaining space)</div>
      <div class="container">
        <div class="card"><div class="card-inner"><div class="card-img">IMG</div><div><h3>Card Title</h3><p>Horizontal layout in wide container. Same component, different context.</p></div></div></div>
      </div>
    </div>
  </div>
</body></html>`,
      language: "html",
    },
    interviewQuestions: [
      { question: "What is the difference between media queries and container queries?", difficulty: "Medium", hint: "Media queries respond to viewport size. Container queries respond to the parent container's size — making components truly reusable." },
      { question: "How do you make an element a container query target?", difficulty: "Easy", hint: "Set container-type: inline-size on the parent element, then use @container to query its width." },
      { question: "Why are container queries important for component-based design?", difficulty: "Hard", hint: "Components can adapt based on where they're placed (sidebar vs main), not just the screen size. Enables truly reusable, context-aware components." },
    ],
  },
  // ─── Level 7: CSS Animations and Transitions ───
  { id: "css-transitions", title: "CSS Transitions", slug: "css-transitions", icon: "Timer", difficulty: "Beginner", description: "Add smooth transitions between CSS property changes.",
    concept: { explanation: "CSS transitions animate property changes smoothly. transition shorthand: property, duration, timing-function, delay. Triggered by state changes.", realLifeAnalogy: "Without transitions: light switch. With: dimmer switch.", keyPoints: ["transition: property duration timing-function delay", "transition: all 0.3s ease", "Only interpolatable properties", "Triggered by state changes", "Can transition multiple properties", "display can't transition", "Use transform/opacity for 60fps"] },
    code: { defaultCode: `<!DOCTYPE html>\n<html><head><style>\n  .btn { background: #3b82f6; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-size: 16px; cursor: pointer; transition: all 0.3s ease; }\n  .btn:hover { background: #1d4ed8; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(59,130,246,0.4); }\n</style></head>\n<body><button class="btn">Hover Me</button></body></html>`, language: "html" },
    interviewQuestions: [ { question: "Transition shorthand?", difficulty: "Easy", hint: "transition: property duration timing-function delay;" }, { question: "Transitions vs animations?", difficulty: "Medium", hint: "Transitions need trigger, A-to-B. Animations auto-play with keyframes." }, { question: "Which properties can be transitioned?", difficulty: "Medium", hint: "Interpolatable: color, opacity, transform. Not: display, font-family." } ] },
  { id: "css-transition-properties", title: "Transition Properties", slug: "css-transition-properties", icon: "Settings", difficulty: "Intermediate", description: "Master timing functions, delays, and multiple transitions.",
    concept: { explanation: "Timing functions control speed curve: ease (default), linear, ease-in, ease-out, ease-in-out, cubic-bezier().", realLifeAnalogy: "Like car acceleration curves.", keyPoints: ["ease: slow-fast-slow (default)", "linear: constant speed", "ease-in/out: starts/ends slow", "cubic-bezier for custom curves", "Multiple: transition: color 0.3s, transform 0.5s", "transition-delay for stagger", "Can specify per-property timing"] },
    code: { defaultCode: `<!DOCTYPE html>\n<html><head><style>\n  .track { background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 8px; padding: 8px; margin: 8px 0; position: relative; height: 50px; }\n  .ball { width: 40px; height: 40px; border-radius: 50%; position: absolute; left: 5px; top: 5px; transition-duration: 1s; }\n  .track:hover .ball { left: calc(100% - 45px); }\n  .ease { background: #3b82f6; transition-timing-function: ease; }\n  .linear { background: #10b981; transition-timing-function: linear; }\n</style></head>\n<body><h3>Hover to race</h3><div class="track"><div class="ball ease"></div></div><div class="track"><div class="ball linear"></div></div></body></html>`, language: "html" },
    interviewQuestions: [ { question: "Default timing function?", difficulty: "Easy", hint: "ease" }, { question: "What is cubic-bezier()?", difficulty: "Medium", hint: "Custom timing with 4 control points." }, { question: "Multiple properties with different durations?", difficulty: "Medium", hint: "Comma-separate: transition: color 0.3s, transform 0.5s;" } ] },
  { id: "css-transform", title: "CSS Transform", slug: "css-transform", icon: "RotateCcw", difficulty: "Intermediate", description: "Transform elements with translate, rotate, scale, skew.",
    concept: { explanation: "CSS transform applies visual transformations without affecting layout. Functions: translate, rotate, scale, skew. Uses GPU for performance.", realLifeAnalogy: "Like editing a photo — move, rotate, resize.", keyPoints: ["translate(x,y): move", "rotate(angle): spin", "scale(x,y): resize", "skew(x,y): slant", "Doesn't affect layout flow", "Chain multiple transforms", "transform-origin sets pivot"] },
    code: { defaultCode: `<!DOCTYPE html>\n<html><head><style>\n  .grid { display: flex; flex-wrap: wrap; gap: 20px; padding: 20px; }\n  .demo { width: 100px; height: 100px; background: #3b82f6; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px; transition: transform 0.3s; }\n  .translate:hover { transform: translate(20px, -10px); }\n  .rotate:hover { transform: rotate(45deg); }\n  .scale:hover { transform: scale(1.3); }\n</style></head>\n<body><div class="grid"><div class="demo translate">translate</div><div class="demo rotate" style="background:#10b981">rotate</div><div class="demo scale" style="background:#f59e0b">scale</div></div></body></html>`, language: "html" },
    interviewQuestions: [ { question: "Do transforms affect layout?", difficulty: "Easy", hint: "No — visual only." }, { question: "Why prefer transform for animation?", difficulty: "Medium", hint: "GPU compositor, no layout recalc." }, { question: "What is transform-origin?", difficulty: "Easy", hint: "Pivot point. Default center." } ] },
  { id: "css-translate", title: "Translate", slug: "css-translate", icon: "Move", difficulty: "Beginner", description: "Move elements with translate transform.",
    concept: { explanation: "translate() moves an element. % values relative to element's own size. Key for centering pattern.", realLifeAnalogy: "Like sliding a sticky note.", keyPoints: ["translateX/Y: single axis", "translate(x,y): both axes", "% relative to own size", "Centering: translate(-50%,-50%)", "More performant than top/left", "translate3d triggers GPU", "Doesn't affect flow"] },
    code: { defaultCode: `<!DOCTYPE html>\n<html><head><style>\n  .parent { position: relative; width: 300px; height: 200px; background: #f0fdf4; border: 2px dashed #10b981; border-radius: 12px; margin: 20px; }\n  .centered { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: #10b981; color: white; padding: 12px 24px; border-radius: 8px; font-weight: bold; }\n</style></head>\n<body><h3>Centering with translate</h3><div class="parent"><div class="centered">Centered!</div></div></body></html>`, language: "html" },
    interviewQuestions: [ { question: "Why translate(-50%,-50%) for centering?", difficulty: "Medium", hint: "Shifts back by half element's own size." }, { question: "translate vs top/left?", difficulty: "Medium", hint: "translate uses GPU, faster." }, { question: "% relative to parent?", difficulty: "Easy", hint: "No — relative to element's own dimensions." } ] },
  { id: "css-rotate", title: "Rotate", slug: "css-rotate", icon: "RotateCw", difficulty: "Beginner", description: "Rotate elements with rotate transform.",
    concept: { explanation: "rotate() spins around transform-origin. Units: deg, rad, turn. rotateX/Y for 3D.", realLifeAnalogy: "Like spinning a record.", keyPoints: ["rotate(45deg): clockwise", "Negative: counter-clockwise", "Units: deg, rad, turn", "transform-origin controls pivot", "rotateX/Y for 3D", "Used for spinners, flips", "Combine with transition"] },
    code: { defaultCode: `<!DOCTYPE html>\n<html><head><style>\n  .box { width: 80px; height: 80px; background: #3b82f6; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; margin: 20px; transition: transform 0.3s; }\n  .box:hover { transform: rotate(180deg); }\n  .spinner { width: 40px; height: 40px; border: 4px solid #e2e8f0; border-top: 4px solid #3b82f6; border-radius: 50%; animation: spin 1s linear infinite; margin: 20px; }\n  @keyframes spin { to { transform: rotate(360deg); } }\n</style></head>\n<body><div class="box">Hover</div><div class="spinner"></div></body></html>`, language: "html" },
    interviewQuestions: [ { question: "Units for rotate()?", difficulty: "Easy", hint: "deg, rad, turn." }, { question: "Change rotation pivot?", difficulty: "Easy", hint: "transform-origin." }, { question: "CSS spinner?", difficulty: "Medium", hint: "Border circle + one colored side + rotate animation." } ] },
  { id: "css-scale", title: "Scale", slug: "css-scale", icon: "Maximize", difficulty: "Beginner", description: "Resize elements with scale transform.",
    concept: { explanation: "scale() resizes visually without affecting layout. Common for hover zoom effects.", realLifeAnalogy: "Like pinch-to-zoom.", keyPoints: ["scale(1): normal", "scale(0.5): half", "scale(2): double", "Doesn't affect layout", "transform-origin controls scale point", "Common for hover zoom", "scale(-1) flips"] },
    code: { defaultCode: `<!DOCTYPE html>\n<html><head><style>\n  .card { width: 150px; background: white; border: 2px solid #e2e8f0; border-radius: 12px; padding: 15px; display: inline-block; margin: 15px; transition: transform 0.3s; cursor: pointer; text-align: center; }\n  .card:hover { transform: scale(1.05); box-shadow: 0 10px 30px rgba(0,0,0,0.1); }\n</style></head>\n<body><div class="card"><strong>Hover</strong></div><div class="card"><strong>Hover</strong></div></body></html>`, language: "html" },
    interviewQuestions: [ { question: "Does scale affect layout?", difficulty: "Easy", hint: "No." }, { question: "Zoom-on-hover pattern?", difficulty: "Medium", hint: "Container overflow:hidden, image scale on hover." }, { question: "scale(-1)?", difficulty: "Medium", hint: "Flips/mirrors." } ] },
  { id: "css-animations", title: "CSS Animations", slug: "css-animations", icon: "Play", difficulty: "Intermediate", description: "Create multi-step animations with @keyframes.",
    concept: { explanation: "CSS animations run automatically with @keyframes, can loop and have multiple steps.", realLifeAnalogy: "Transitions: door opening. Animations: movie.", keyPoints: ["@keyframes defines steps", "animation: name duration timing count direction fill-mode", "from/to or percentages", "iteration-count: infinite", "direction: alternate", "fill-mode: forwards", "play-state: running/paused"] },
    code: { defaultCode: `<!DOCTYPE html>\n<html><head><style>\n  @keyframes slideIn { from { transform: translateX(-100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }\n  @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }\n  .slide { animation: slideIn 0.5s ease forwards; background: #3b82f6; color: white; padding: 15px; border-radius: 8px; margin: 10px 0; }\n  .pulse { animation: pulse 2s ease-in-out infinite; width: 60px; height: 60px; background: #ef4444; border-radius: 50%; margin: 20px; }\n</style></head>\n<body><div class="slide">Slide In</div><div class="pulse"></div></body></html>`, language: "html" },
    interviewQuestions: [ { question: "Transitions vs animations?", difficulty: "Medium", hint: "Transitions: trigger, A-to-B. Animations: auto, keyframes, loop." }, { question: "fill-mode: forwards?", difficulty: "Medium", hint: "Retains last keyframe styles." }, { question: "Best properties to animate?", difficulty: "Medium", hint: "transform and opacity — GPU." } ] },
  { id: "css-keyframes", title: "Keyframes", slug: "css-keyframes", icon: "Film", difficulty: "Intermediate", description: "Define multi-step animations with @keyframes.",
    concept: { explanation: "@keyframes defines animation steps. from/to or percentage stops. Browser interpolates between.", realLifeAnalogy: "Storyboard — browser fills transitions between scenes.", keyPoints: ["from/to: two-step", "Percentages: multi-step", "Browser interpolates", "Reuse with different timing", "Prefer transform/opacity", "animation-delay for stagger", "Name must be unique"] },
    code: { defaultCode: `<!DOCTYPE html>\n<html><head><style>\n  @keyframes multi { 0% { transform: translateX(0); background: #3b82f6; } 50% { transform: translateX(200px); background: #10b981; } 100% { transform: translateX(0); background: #3b82f6; } }\n  .multi { width: 50px; height: 50px; border-radius: 8px; animation: multi 3s ease-in-out infinite; margin: 30px; }\n  @keyframes fadeSlide { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }\n  .stagger > div { animation: fadeSlide 0.5s ease forwards; opacity: 0; background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 8px; padding: 12px; margin: 8px 0; }\n  .stagger > div:nth-child(1) { animation-delay: 0s; } .stagger > div:nth-child(2) { animation-delay: 0.1s; } .stagger > div:nth-child(3) { animation-delay: 0.2s; }\n</style></head>\n<body><div class="multi"></div><div class="stagger"><div>Item 1</div><div>Item 2</div><div>Item 3</div></div></body></html>`, language: "html" },
    interviewQuestions: [ { question: "from/to vs percentages?", difficulty: "Easy", hint: "from/to: two-step. Percentages: multi-step." }, { question: "Staggered animations?", difficulty: "Medium", hint: "Incrementing animation-delay." }, { question: "Avoid animating width/height?", difficulty: "Hard", hint: "Triggers layout reflow. Use transform." } ] },
  // ─── Level 8: Advanced CSS ───
  { id: "css-variables", title: "CSS Variables", slug: "css-variables", icon: "Variable", difficulty: "Intermediate", description: "Custom properties for dynamic, maintainable CSS.",
    concept: { explanation: "CSS custom properties store reusable values. Define --name: value, use var(--name). :root for global. Cascade and inherit. JS-changeable.", realLifeAnalogy: "Named paint swatches — change one, everything updates.", keyPoints: ["Define: --color: #3b82f6", "Use: var(--color)", "Fallback: var(--color, #000)", ":root for global", "Cascade and inherit", "JS: setProperty('--name', 'value')", "Enable theming"] },
    code: { defaultCode: `<!DOCTYPE html>\n<html><head><style>\n  :root { --primary: #3b82f6; --radius: 8px; }\n  [data-theme="dark"] { --bg: #1e293b; --text: #e2e8f0; --card: #334155; }\n  [data-theme="light"] { --bg: #fff; --text: #1e293b; --card: #f8fafc; }\n  body { background: var(--bg); color: var(--text); font-family: sans-serif; padding: 15px; transition: background 0.3s; }\n  .card { background: var(--card); border-radius: var(--radius); padding: 15px; margin: 10px 0; border: 2px solid var(--primary); }\n  .btn { background: var(--primary); color: white; border: none; padding: 8px 16px; border-radius: var(--radius); cursor: pointer; }\n</style></head>\n<body data-theme="light"><button class="btn" onclick="document.body.dataset.theme=document.body.dataset.theme==='dark'?'light':'dark'">Toggle Theme</button><div class="card"><strong>Card</strong></div></body></html>`, language: "html" },
    interviewQuestions: [ { question: "CSS vs Sass variables?", difficulty: "Medium", hint: "CSS: live, cascade, JS-changeable. Sass: compile-time only." }, { question: "Fallback?", difficulty: "Easy", hint: "var(--color, #000)" }, { question: "Change with JS?", difficulty: "Easy", hint: "el.style.setProperty('--name', 'value')" } ] },
  { id: "css-calc-function", title: "Calc Function", slug: "css-calc-function", icon: "Calculator", difficulty: "Intermediate", description: "Calculations with mixed units.",
    concept: { explanation: "calc() does math with mixed units. Essential for fixed+fluid layouts.", realLifeAnalogy: "Full width minus seam allowance.", keyPoints: ["calc(100% - 250px)", "Operators: + - * /", "Spaces around + and -", "Any unit: px, %, em, vw", "Combine with variables", "Nesting allowed", "Common: width: calc(100% - var(--sidebar))"] },
    code: { defaultCode: `<!DOCTYPE html>\n<html><head><style>\n  :root { --sidebar: 200px; }\n  body { margin: 0; font-family: sans-serif; }\n  .layout { display: flex; min-height: 100vh; }\n  .sidebar { width: var(--sidebar); background: #1e293b; color: white; padding: 15px; flex-shrink: 0; }\n  .main { width: calc(100% - var(--sidebar)); padding: 15px; }\n</style></head>\n<body><div class="layout"><aside class="sidebar"><strong>Sidebar</strong></aside><main class="main"><h3>calc()</h3><p>Main: calc(100% - 200px)</p></main></div></body></html>`, language: "html" },
    interviewQuestions: [ { question: "Why calc()?", difficulty: "Easy", hint: "Mix units: calc(100% - 250px)." }, { question: "Operator rules?", difficulty: "Easy", hint: "Spaces around + and -." }, { question: "calc() with variables?", difficulty: "Medium", hint: "calc(100% - var(--sidebar))" } ] },
  { id: "css-clamp-function", title: "Clamp Function", slug: "css-clamp-function", icon: "Minimize", difficulty: "Intermediate", description: "Fluid values with min, preferred, max bounds.",
    concept: { explanation: "clamp(min, preferred, max) picks value between bounds. Perfect for fluid typography.", realLifeAnalogy: "Thermostat with a range.", keyPoints: ["clamp(min, preferred, max)", "Typography: clamp(1rem, 2.5vw, 2rem)", "Preferred usually vw", "= max(min, min(pref, max))", "Works for any numeric property", "min() and max() standalone", "Replaces complex media queries"] },
    code: { defaultCode: `<!DOCTYPE html>\n<html><head><meta name="viewport" content="width=device-width, initial-scale=1"><style>\n  body { font-family: sans-serif; padding: clamp(10px, 3vw, 40px); }\n  h1 { font-size: clamp(1.5rem, 5vw, 3.5rem); }\n  p { font-size: clamp(0.875rem, 1.5vw, 1.125rem); line-height: 1.6; color: #475569; }\n</style></head>\n<body><h1>Fluid Typography</h1><p>Scales with clamp(). Resize to see!</p></body></html>`, language: "html" },
    interviewQuestions: [ { question: "What is clamp()?", difficulty: "Easy", hint: "Value between min and max bounds." }, { question: "Fluid typography?", difficulty: "Medium", hint: "font-size: clamp(1rem, 2.5vw, 2rem)" }, { question: "clamp vs min/max?", difficulty: "Hard", hint: "clamp(a,b,c) = max(a, min(b,c))" } ] },
  { id: "css-functions", title: "CSS Functions", slug: "css-functions", icon: "FunctionSquare", difficulty: "Intermediate", description: "Modern CSS functions: min(), max(), env().",
    concept: { explanation: "min() picks smallest, max() picks largest. env() for safe areas. attr() reads HTML attributes.", realLifeAnalogy: "Calculator tools for specific operations.", keyPoints: ["min(): smallest", "max(): largest", "env(): safe-area-inset-*", "attr(): HTML attributes", "url(): reference files", "color-mix(): blend colors", "Replace many media queries"] },
    code: { defaultCode: `<!DOCTYPE html>\n<html><head><meta name="viewport" content="width=device-width, initial-scale=1"><style>\n  body { font-family: sans-serif; padding: max(15px, 3vw); }\n  .container { width: min(100%, 800px); margin: 0 auto; }\n  .card { background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 8px; padding: max(12px, 2vw); margin: 10px 0; }\n</style></head>\n<body><div class="container"><h2>CSS Functions</h2><div class="card"><strong>min(100%, 800px)</strong></div></div></body></html>`, language: "html" },
    interviewQuestions: [ { question: "What does min() do?", difficulty: "Easy", hint: "Returns smallest. min(100%, 800px) caps at 800px." }, { question: "What is env()?", difficulty: "Medium", hint: "Environment variables for phone notches." }, { question: "min(100%,800px) vs max-width?", difficulty: "Hard", hint: "Functionally equivalent for width." } ] },
  { id: "css-backdrop-filter", title: "Backdrop Filter", slug: "css-backdrop-filter", icon: "Eye", difficulty: "Intermediate", description: "Visual effects behind an element.",
    concept: { explanation: "backdrop-filter applies effects to area behind element. Creates glassmorphism. Needs semi-transparent background.", realLifeAnalogy: "Frosted glass.", keyPoints: ["backdrop-filter: blur(10px)", "Semi-transparent background needed", "filter vs backdrop-filter", "Effects: blur, brightness, contrast", "Glassmorphism recipe", "Combine effects", "Good browser support"] },
    code: { defaultCode: `<!DOCTYPE html>\n<html><head><style>\n  .bg { background: linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899); min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; font-family: sans-serif; }\n  .glass { backdrop-filter: blur(12px); background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3); border-radius: 16px; padding: 30px; max-width: 350px; color: white; }\n</style></head>\n<body><div class="bg"><div class="glass"><h2>Glassmorphism</h2><p>backdrop-filter: blur(12px)</p></div></div></body></html>`, language: "html" },
    interviewQuestions: [ { question: "filter vs backdrop-filter?", difficulty: "Medium", hint: "filter: element. backdrop-filter: area behind." }, { question: "Glassmorphism?", difficulty: "Easy", hint: "Blur + semi-transparent background." }, { question: "Why semi-transparent background?", difficulty: "Medium", hint: "Opaque hides blurred backdrop." } ] },
  { id: "css-object-fit", title: "Object Fit", slug: "css-object-fit", icon: "Crop", difficulty: "Beginner", description: "How images and videos fit containers.",
    concept: { explanation: "object-fit controls how replaced elements (img, video) size within containers. fill stretches, contain fits, cover fills+crops.", realLifeAnalogy: "Photo framing options.", keyPoints: ["fill: stretches (default)", "contain: fits inside", "cover: fills, crops", "none: original size", "scale-down: smaller of none/contain", "object-position: crop point", "Works on img, video"] },
    code: { defaultCode: `<!DOCTYPE html>\n<html><head><style>\n  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 15px; padding: 20px; }\n  .demo { text-align: center; } .demo div { width: 160px; height: 120px; border-radius: 8px; margin: 0 auto 5px; }\n</style></head>\n<body><div class="grid"><div class="demo"><div style="background:#3b82f6"></div><label>fill</label></div><div class="demo"><div style="background:#10b981"></div><label>contain</label></div><div class="demo"><div style="background:#f59e0b"></div><label>cover</label></div></div></body></html>`, language: "html" },
    interviewQuestions: [ { question: "cover vs contain?", difficulty: "Easy", hint: "cover fills+crops. contain fits inside." }, { question: "object-position?", difficulty: "Easy", hint: "Controls crop/position point." }, { question: "Which elements?", difficulty: "Medium", hint: "img, video, canvas, iframe." } ] },
  { id: "css-aspect-ratio", title: "Aspect Ratio", slug: "css-aspect-ratio", icon: "RectangleHorizontal", difficulty: "Beginner", description: "Maintain proportions with aspect-ratio.",
    concept: { explanation: "aspect-ratio sets preferred proportions. Replaces padding-bottom hack. Works with width OR height.", realLifeAnalogy: "Standard paper sizes — same proportions at any scale.", keyPoints: ["aspect-ratio: 16/9", "aspect-ratio: 1/1 square", "Replaces padding-bottom hack", "Calculates missing dimension", "Common: 16/9, 4/3, 1/1", "Great for video embeds", "All modern browsers"] },
    code: { defaultCode: `<!DOCTYPE html>\n<html><head><style>\n  body { font-family: sans-serif; padding: 20px; }\n  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; }\n  .r { border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; width: 100%; }\n  .r16 { aspect-ratio: 16/9; background: #3b82f6; } .r1 { aspect-ratio: 1/1; background: #10b981; } .r4 { aspect-ratio: 4/3; background: #f59e0b; }\n</style></head>\n<body><div class="grid"><div class="r r16">16:9</div><div class="r r1">1:1</div><div class="r r4">4:3</div></div></body></html>`, language: "html" },
    interviewQuestions: [ { question: "aspect-ratio: 16/9?", difficulty: "Easy", hint: "Maintains 16:9 proportions." }, { question: "padding-bottom hack?", difficulty: "Medium", hint: "padding-bottom: 56.25% for 16:9. Modern aspect-ratio replaces this." }, { question: "Both width and height set?", difficulty: "Medium", hint: "aspect-ratio is ignored." } ] },
  { id: "css-modern-features", title: "Modern CSS Features", slug: "css-modern-features", icon: "Sparkles", difficulty: "Advanced", description: "Cutting-edge CSS features.",
    concept: { explanation: "Modern CSS: :has() (parent selector), CSS Nesting, @layer (cascade control), Subgrid, color-mix(), scroll-driven animations.", realLifeAnalogy: "Professional workshop upgrade.", keyPoints: [":has(): parent selector", "Nesting: .card { .title { } }", "@layer: cascade control", "Subgrid", "color-mix(): blend colors", "Scroll-driven animations", "All modern browsers 2024+"] },
    code: { defaultCode: `<!DOCTYPE html>\n<html><head><style>\n  body { font-family: sans-serif; padding: 20px; }\n  .card { background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 15px; margin: 10px 0;\n    & .title { font-weight: bold; }\n    & .desc { font-size: 13px; color: #64748b; margin-top: 5px; }\n    &:hover { border-color: #3b82f6; }\n  }\n  .card:has(.badge) { border-color: #10b981; }\n  .badge { background: #10b981; color: white; font-size: 11px; padding: 2px 8px; border-radius: 4px; }\n  .mixed { background: color-mix(in srgb, #3b82f6 50%, #ef4444); color: white; padding: 10px; border-radius: 8px; margin: 10px 0; text-align: center; }\n</style></head>\n<body><div class="card"><div class="title">Regular Card</div><div class="desc">Standard</div></div><div class="card"><div class="title">With Badge <span class="badge">New</span></div><div class="desc">:has(.badge) = green border</div></div><div class="mixed">color-mix: blue + red</div></body></html>`, language: "html" },
    interviewQuestions: [ { question: "What is :has()?", difficulty: "Medium", hint: "Parent selector — .card:has(img) selects cards with images." }, { question: "CSS Nesting?", difficulty: "Easy", hint: "Native nesting like Sass." }, { question: "@layer?", difficulty: "Hard", hint: "Explicit cascade order control." } ] },
];

export const cssModules: CSSModule[] = [
  {
    id: "css-fundamentals",
    level: 1,
    title: "CSS Fundamentals",
    difficulty: "Beginner",
    description: "The building blocks of CSS — syntax, selectors, colors, units, and the box model.",
    topicIds: [
      "what-is-css",
      "css-syntax",
      "css-selectors-basics",
      "css-colors",
      "css-units",
      "css-comments",
      "css-box-model",
      "css-margin",
      "css-padding",
      "css-border",
    ],
  },
  {
    id: "css-selectors-specificity",
    level: 2,
    title: "CSS Selectors and Specificity",
    difficulty: "Intermediate",
    description: "Master advanced selectors and understand how browsers decide which styles apply.",
    topicIds: [
      "css-class-selector",
      "css-id-selector",
      "css-attribute-selectors",
      "css-group-selectors",
      "css-descendant-selector",
      "css-child-selector",
      "css-pseudo-classes",
      "css-pseudo-elements",
      "css-specificity",
      "css-important-rule",
    ],
  },
  {
    id: "css-layout-basics",
    level: 3,
    title: "Layout Basics",
    difficulty: "Intermediate",
    description: "Master the display property, positioning, z-index, overflow, and float-based layouts.",
    topicIds: [
      "css-display-property",
      "css-block-inline",
      "css-position-property",
      "css-relative-absolute",
      "css-fixed-sticky",
      "css-z-index",
      "css-overflow",
      "css-float-clear",
    ],
  },
  {
    id: "css-flexbox",
    level: 4,
    title: "Flexbox",
    difficulty: "Intermediate",
    description: "Build flexible one-dimensional layouts with flexbox — alignment, spacing, wrapping, and common patterns.",
    topicIds: [
      "css-flexbox-intro",
      "css-flex-container",
      "css-flex-direction",
      "css-justify-content",
      "css-align-items",
      "css-align-content",
      "css-flex-wrap",
      "css-flex-grow-shrink",
      "css-flexbox-patterns",
    ],
  },
  {
    id: "css-grid",
    level: 5,
    title: "CSS Grid",
    difficulty: "Intermediate",
    description: "Build two-dimensional layouts with CSS Grid — columns, rows, areas, and real layout patterns.",
    topicIds: [
      "css-grid-intro",
      "css-grid-container",
      "css-grid-template-columns",
      "css-grid-template-rows",
      "css-grid-gap",
      "css-grid-areas",
      "css-grid-vs-flexbox",
      "css-grid-patterns",
    ],
  },
  {
    id: "css-responsive-design",
    level: 6,
    title: "Responsive Design",
    difficulty: "Intermediate",
    description: "Make websites adapt to any screen size with media queries, fluid layouts, and container queries.",
    topicIds: [
      "css-responsive-basics",
      "css-media-queries",
      "css-mobile-first",
      "css-breakpoints",
      "css-responsive-images",
      "css-fluid-layouts",
      "css-container-queries",
    ],
  },
  {
    id: "css-animations-transitions",
    level: 7,
    title: "CSS Animations and Transitions",
    difficulty: "Advanced",
    description: "Add motion to your interfaces with CSS transitions, transforms, keyframe animations, and performance-aware patterns.",
    topicIds: [
      "css-transitions",
      "css-transition-properties",
      "css-transform",
      "css-translate",
      "css-rotate",
      "css-scale",
      "css-animations",
      "css-keyframes",
    ],
  },
  {
    id: "css-advanced",
    level: 8,
    title: "Advanced CSS",
    difficulty: "Advanced",
    description: "Master modern CSS features — custom properties, calc/clamp, backdrop-filter, object-fit, aspect-ratio, and more.",
    topicIds: [
      "css-variables",
      "css-calc-function",
      "css-clamp-function",
      "css-functions",
      "css-backdrop-filter",
      "css-object-fit",
      "css-aspect-ratio",
      "css-modern-features",
    ],
  },
];
