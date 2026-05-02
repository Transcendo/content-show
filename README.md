# Content Show

Content Show is an AI knowledge and glossary site for general readers. It is built with **Next.js 16** and **Fumadocs**, and is currently organized around three public experiences:

- **AI glossary**: short explanations for high-frequency AI terms, with selected core terms expanded into source-backed MDX pages.
- **Learning path**: a guided route for non-technical readers to understand AI concepts, model basics, tools, risks, and infrastructure.
- **Knowledge graph**: concept and page relationship views that help readers see how AI terms connect.

The site is deployed as a static export for GitHub Pages.

## Current Routes

Public URLs intentionally do **not** use `/docs/...`.

| Area | Route |
| --- | --- |
| Home | `/` |
| Learning entry | `/learn` |
| Learning path | `/learn/learning-path` |
| AI glossary | `/glossary` |
| Core glossary pages | 29 published pages, including `/glossary/ai`, `/glossary/llm`, `/glossary/rag`, `/glossary/machine-learning`, `/glossary/supervised-learning`, `/glossary/unsupervised-learning`, `/glossary/reinforcement-learning`, `/glossary/training-data`, `/glossary/validation-data`, `/glossary/generalization-ability`, `/glossary/overfitting`, `/glossary/underfitting`, `/glossary/regularization`, `/glossary/prompt-engineering`, `/glossary/foundation-model`, and `/glossary/moe` |
| Topic pages | `/fundamentals`, `/machine-learning`, `/model-mechanisms`, `/llm-prompting`, `/generative-multimodal`, `/agents-products`, `/frontier`, `/infrastructure` |
| Knowledge graph | `/graph` |
| Sources | `/resources`, `/resources/source-list` |

`content/docs/` is still the internal Fumadocs content directory. The public route prefix is controlled by `lib/source.ts`.

## Content Principles

Content Show is a public-facing science communication site, so accuracy matters more than speed.

- Use credible sources, preferably primary or near-primary sources.
- Separate facts, mainstream explanations, disputes, and speculation.
- Do not treat screenshots or second-hand summaries as the only source of truth.
- Add `lastReviewed` for fast-changing or contested topics.
- Use diagrams, callouts, cards, tabs, steps, accordions, and image credits where they improve understanding.
- Keep glossary depth layered: not every term needs a full article, but core terms should be professional, readable, and source-backed.

Research notes and source preparation can live in `AI Knowledge/` before being adapted into public MDX pages. Weekly planning lives under `AI Knowledge/weekly-plans/`; the rolling Excel workbook is `AI Knowledge/weekly-plans/weekly-plan.xlsx`.

## Features

- **Next.js App Router** with static export.
- **Fumadocs MDX** for structured content pages.
- **Global search** using Fumadocs + Orama, configured with Mandarin tokenization for Chinese content.
- **Graph View** using Fumadocs-generated link references and `react-force-graph-2d`.
- **Homepage concept graph** driven by glossary relationships.
- **Original SVG diagrams** under `public/diagrams/`.
- **GitHub Pages deployment** through GitHub Actions.

## Quick Start

```bash
pnpm install
pnpm dev
```

Open [localhost:3000](http://localhost:3000) to preview the site.

## Scripts

```bash
pnpm dev          # Start local dev server on port 3000
pnpm build        # Build static production output into out/
pnpm start        # Serve the exported out/ directory
pnpm typecheck    # Type-check the app
```

## Project Structure

```text
├─ app/
│  ├─ page.tsx                 # Home page
│  ├─ api/search/              # Static Fumadocs search endpoint
│  └─ (knowledge)/[...slug]/   # Root-level knowledge routes
│
├─ components/
│  ├─ concept-graph.tsx        # Homepage concept graph
│  ├─ graph-view.tsx           # Fumadocs page graph view
│  ├─ glossary-browser.tsx     # Glossary category/card browser
│  ├─ docs/                    # Docs layout/sidebar pieces
│  └─ ui/                      # Shared UI primitives
│
├─ content/docs/
│  ├─ glossary/                # AI glossary index and core term pages
│  ├─ learn/                   # Learning entry and learning path
│  ├─ resources/               # Sources and citation rules
│  └─ *.mdx                    # Topic landing pages
│
├─ AI Knowledge/               # Research notes before public MDX adaptation
├─ lib/
│  ├─ ai-glossary.ts           # Glossary data model and relationships
│  ├─ build-graph.ts           # Page graph data builder
│  ├─ site-config.tsx          # Top navigation and homepage content config
│  └─ source.ts                # Fumadocs source loader
│
└─ public/
   ├─ branding/                # Site branding assets
   └─ diagrams/                # Original diagrams used by glossary pages
```

## Adding A Core Glossary Page

1. Add or update the term metadata in `lib/ai-glossary.ts`.
2. Create a page under `content/docs/glossary/<slug>.mdx`.
3. Add the page slug to `content/docs/glossary/meta.json`.
4. Include at least two credible sources and a `lastReviewed` date.
5. Add an original or properly licensed visual asset, with credit.
6. Run:

```bash
pnpm typecheck
pnpm build
```

## Deployment

The project is configured for GitHub Pages static export:

- `next.config.js` uses `output: "export"`.
- `trailingSlash: true` generates route folders such as `out/glossary/index.html`.
- GitHub Actions builds and deploys `out/`.
- In GitHub Actions, `basePath` and `assetPrefix` are set to `/content-show` for repository Pages deployment.

To deploy:

1. Push to `main`.
2. GitHub Actions runs `.github/workflows/deploy-github-pages.yml`.
3. The static site is published from `out/`.
