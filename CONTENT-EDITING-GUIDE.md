# Content Editing Guide

Each page keeps its content separate from the shared design components.

## Service pages

Edit only the matching file under `content/services/`.

Example:
- Coffee machine: `content/services/coffee-machines-repair.ts`
- Refrigerator: `content/services/refrigerator-repair.ts`
- Oven: `content/services/oven-repair.ts`

### SEO structure

Service page copy uses `sections` so headings are rendered as real semantic HTML headings.

- `level: 2` → `<h2>`
- `level: 3` → `<h3>`
- `paragraphs` → `<p>`
- `subsections` can be used for H3 content beneath an H2

Example:

```ts
sections: [
  {
    heading: "Professional Coffee Machine Repair in Watsonville, CA",
    level: 2,
    paragraphs: ["Your paragraph here."]
  },
  {
    heading: "Common Coffee Machine Problems We Repair",
    level: 2,
    paragraphs: ["Intro paragraph here."],
    subsections: [
      {
        heading: "Coffee Machine Not Brewing",
        paragraphs: ["Detailed paragraph here."]
      },
      {
        heading: "Coffee Machine Not Heating",
        paragraphs: ["Detailed paragraph here."]
      }
    ]
  }
]
```

The page template handles the HTML tags and styling automatically. Do not put `<h2>` or `<p>` tags inside the text strings.

## Page-level content

Home, About, Contact, and the Services listing each have their own files under `content/pages/`.

Shared components such as the header, footer, buttons, cards, and layout are intentionally reusable. Editing page content should not require editing those components.
