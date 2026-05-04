# Memory.md - content-show Agent Memory

This file is durable working memory for AI agents in this repository. Read it after
`AGENTS.md` before making changes, and update it after meaningful work.

## How to update this file

- Keep entries factual, concise, and useful for the next agent.
- Use the current date for operation log entries.
- Append new work under `Agent Operation Log`.
- Edit `Stable Project Memory` only when the underlying project fact changes.
- Record decisions, changed files, validation results, and follow-up work.
- Do not store secrets, credentials, private user data, or long raw command output.

## Stable Project Memory

- Project name: Content Show.
- Purpose: public-facing AI knowledge, glossary, learning path, topic, source, and knowledge graph site for general readers.
- Stack: Next.js 16 App Router, React 19, Fumadocs MDX, Tailwind CSS 4, pnpm.
- Deployment model: static export to `out/` for GitHub Pages.
- Public URLs are root-level routes such as `/glossary`, `/learn`, `/graph`, `/fundamentals`, and `/resources/source-list`; they intentionally do not use `/docs/...`.
- Internal Fumadocs content directory is `content/docs/`.
- Research drafts and source preparation belong in `AI Knowledge/`.
- Published MDX pages belong in `content/docs/` and must be wired through the relevant `meta.json` when they should appear in navigation.
- Glossary data and relationships are maintained in `lib/ai-glossary.ts`.
- Main navigation and homepage content configuration are maintained in `lib/site-config.tsx`.
- Generated/dependency folders such as `.next/`, `.source/`, `out/`, and `node_modules/` should not be edited directly.

## Editorial Memory

- Accuracy matters more than speed for public content.
- Prefer credible primary or near-primary sources.
- Distinguish fact, interpretation, dispute, and speculation.
- Add `lastReviewed` for fast-changing or contested AI topics when the page format supports it.
- Use clear explanations for general readers and avoid hype-heavy wording.
- Source-backed drafts can start in `AI Knowledge/` before being adapted into public MDX pages.

## Working Preferences

- For code, config, or MDX structure changes, run `pnpm typecheck` and `pnpm build` when feasible.
- For simple repository guidance or memory-only Markdown edits, reviewing `git diff` is usually sufficient.
- Keep changes small and aligned with existing file organization.
- Avoid unrelated app shell refactors during editorial/content tasks.

## Open Follow-ups

- Use `AI Knowledge/second-batch-glossary-candidates-2026-05-04.md` as the shortlist for the 2026-05-05 to 2026-05-07 glossary expansion work. First-tier main terms are Inference, Parameters, and RLHF; second-tier candidates include Attention, Gradient Descent, Loss Function, Compute, Multimodal, Vector Database, and Bias.

## Agent Operation Log

### 2026-05-04

- Completed the Monday candidate inventory for the 2026-05-04 to 2026-05-10 weekly plan.
- Reviewed 69 remaining glossary card terms from `lib/ai-glossary.ts` and created `AI Knowledge/second-batch-glossary-candidates-2026-05-04.md`, grading terms into main-term priority, related-card enhancement, and deferred buckets.
- Recommended Inference, Parameters, and RLHF as first-tier candidates for upcoming public detail pages, with Bias / Vector Database / Compute / Multimodal as strong alternates depending on the daily theme.
- Updated `AI Knowledge/README.md` and `README.md` to point to the new candidate inventory.

### 2026-05-03

- Ran the Sunday weekly review for the 2026-04-27 to 2026-05-03 plan: confirmed 29 glossary detail pages are present, `content/docs/glossary/meta.json` matches those pages, and public glossary pages include source markers.
- Created the next planning artifacts for 2026-05-04 to 2026-05-10: `AI Knowledge/weekly-plans/2026-05-04-2026-05-10-content-roadmap.md`, dated weekly-plan Excel, and updated rolling `weekly-plan.xlsx`.
- Updated `README.md` with the latest maintenance status, current weekly-plan pointers, and validation status.
- Validation: `pnpm typecheck` and `pnpm build` passed before publishing.
- Restructured eight major AI knowledge sections so each section `index.mdx` is an Overview / chapter directory page and the substantive subsections live in sibling MDX child pages.
- Updated corresponding section `meta.json` files so `index` remains first and the child pages appear directly under the Overview in navigation.
- Updated `components/sidebar-content.tsx` so the custom docs sidebar exposes the new child pages under each section.
- Validation: `pnpm exec fumadocs-mdx && pnpm typecheck`, custom section-structure check, `git diff --check`, and `pnpm build` all passed before publishing.

### 2026-05-02

- Advanced the same-day 50-task Content Show run: repaired glossary relationship naming for Generative AI / Gen AI, Agents, AlphaGo, Learning Rate, Reasoning, and moved Generalization ability into the machine-learning category.
- Added nine source-backed machine-learning glossary pages: Supervised Learning, Unsupervised Learning, Reinforcement Learning, Training Data, Validation Data, Generalization ability, Overfitting, Underfitting, and Regularization.
- Added nine original SVG diagrams under `public/diagrams/` and wired new slugs into `content/docs/glossary/meta.json` plus `lib/ai-glossary.ts` core metadata.
- Updated `/machine-learning`, `/learn/learning-path`, `/llm-prompting`, source tracking, and README page counts to reflect the expanded core learning path.
- Validation notes for this run should be checked in the final cron report; do not assume full Node validation passed unless `pnpm typecheck` / `pnpm build` are recorded there.

### 2026-04-26

- Reviewed the 2026-04-20 to 2026-04-26 weekly content plan and found four missing planned public pages: Token, Prompt Engineering, Embedding, and Fine-Tuning.
- Added the four missing glossary MDX pages under `content/docs/glossary/` plus original diagrams under `public/diagrams/`.
- Updated `content/docs/glossary/meta.json`, `lib/ai-glossary.ts`, `AI Knowledge/glossary-core-sources.md`, and `content/docs/resources/source-list.mdx` so published pages, glossary cards, source notes, and resources stay aligned.
- Updated `README.md` to reflect 20 published core glossary pages and the weekly planning workbook location.
- Added next-week planning artifacts: `AI Knowledge/weekly-plans/2026-04-27-2026-05-03-content-roadmap.md`, `AI Knowledge/weekly-plans/weekly-plan.xlsx`, and dated copy `2026-04-27-2026-05-03-weekly-plan.xlsx`.
- Validation: custom glossary metadata/source check passed for 20 detail pages; `pnpm build` passed. Initial `pnpm typecheck` failed because stale generated `.next/dev/types` referenced removed `/docs` routes; removing generated `.next/dev` fixed it and `pnpm typecheck` then passed.

### 2026-04-19

- Expanded `AGENTS.md` from a brief repo overview into a fuller AI-agent guide covering technical stack, content architecture, editorial rules, common commands, and memory workflow.
- Created `Memory.md` to preserve stable project facts, editorial preferences, working conventions, open follow-ups, and future operation logs.
