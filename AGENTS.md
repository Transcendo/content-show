# AGENTS.md - content-show

This repository is a documentation/content site built with **Next.js 16 + Fumadocs**.

Use this file as the first stop for AI agents working in the repo. Use
`Memory.md` as the durable project memory and update it after meaningful work.

## What this repo is for

- Publishing structured AI knowledge pages for general readers.
- Organizing topic collections into browsable documentation.
- Maintaining clean, source-backed reference content.
- Supporting glossary, learning path, topic pages, source lists, and knowledge graph views.

Current repo state suggests it started from a docs frontend template and is now being repurposed into a content site.

## Current technical overview

- Framework: Next.js 16 App Router.
- Docs system: Fumadocs MDX.
- Package manager: pnpm.
- Static output: `next.config.js` exports to `out/` for GitHub Pages.
- Internal docs source: `content/docs/`.
- Public route prefix: root-level routes such as `/glossary`, `/learn`, and `/graph`; do not assume `/docs/...`.
- Source loader: `lib/source.ts`.
- Main navigation and homepage content config: `lib/site-config.tsx`.
- Glossary data model and relationships: `lib/ai-glossary.ts`.
- Generated or dependency folders such as `.next/`, `.source/`, `out/`, and `node_modules/` should not be edited directly.

## Content information architecture

- `AI Knowledge/` stores research notes, source preparation, and draft explainers before publication.
- `content/docs/` stores MDX pages that appear in the public site and Fumadocs navigation.
- `content/docs/meta.json` controls the top-level docs/page order.
- Topic landing pages currently include:
  - `fundamentals`
  - `machine-learning`
  - `model-mechanisms`
  - `llm-prompting`
  - `generative-multimodal`
  - `agents-products`
  - `frontier`
  - `infrastructure`
  - `resources`
- Glossary pages live in `content/docs/glossary/`; add each public page to `content/docs/glossary/meta.json`.
- Original visual assets should live under `public/diagrams/` or another clearly named folder under `public/`.

## Working rules

1. Prefer **content-first changes** over framework churn unless the user explicitly asks for UI/engineering work.
2. New editorial/topic collections should live in a clearly named content folder first, then be wired into the docs nav if needed.
3. For knowledge content:
   - use credible sources
   - distinguish fact vs interpretation
   - avoid hypey claims unless clearly labeled as opinion
4. When creating new topic series, prefer a stable folder structure that can expand over time.
5. Keep edits minimal and legible. Do not randomly refactor the app shell unless needed.
6. Preserve the current public URL model unless the user explicitly asks for route changes.
7. Prefer editing source MDX, metadata, config, or original assets; do not patch generated build output.
8. When adding or changing fast-moving AI topics, add or update `lastReviewed` where the page schema supports it.

## Recommended structure for editorial work

- `AI Knowledge/` for topic-driven research/content drafts and source-backed explainers
- `content/docs/` for pages that should appear in the site navigation

## Editorial standard

- Write for general readers, not only engineers.
- Separate definitions, mainstream explanations, disputes, open questions, and speculation.
- Prefer primary or near-primary sources: papers, official docs, standards bodies, reputable research organizations, or well-established technical references.
- Do not rely on screenshots, social media summaries, or unsourced claims as the only evidence.
- Avoid hypey claims. If a claim is interpretation or opinion, label it as such.
- Use diagrams, cards, tabs, steps, callouts, and source lists only when they improve understanding.

## Common commands

```bash
pnpm install
pnpm dev
pnpm typecheck
pnpm build
```

Run `pnpm typecheck` and `pnpm build` after code, config, or MDX structure changes when feasible. For documentation-only memory or guidance edits, a diff review is usually enough.

## Agent memory workflow

- Read `Memory.md` after this file when starting a new task.
- Update `Memory.md` after meaningful changes, especially when:
  - adding or restructuring content areas
  - changing routes, navigation, or metadata conventions
  - making build/deployment decisions
  - discovering recurring project constraints
  - leaving follow-up work for future agents
- Keep memory factual and concise. Record what changed, why it matters, and any follow-ups.
- Do not use `Memory.md` for secrets, credentials, private user data, or long raw command output.
- Prefer appending dated notes under the operation log; edit stable facts in place only when they actually change.

## Notes for future work

- If the user asks for a repo overview, summarize both:
  - technical stack
  - content information architecture
- If a topic is research-heavy, collect sources first, then write the page
- If publishing to the live docs site becomes necessary, mirror or adapt draft content from `AI Knowledge/` into `content/docs/`
- If the user asks to create a new glossary page, update both the MDX content and the relevant metadata/data files.
- If the user asks for a visual or diagram, prefer original assets and include attribution or source notes where applicable.
