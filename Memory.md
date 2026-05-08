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

- Project name: AI知路 (repository/package remains `content-show`).
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
- 2026-05-07 rescue QA found 54 pages under 600 meaningful chars and 47 under 260; the worst debt is the empty `key-terms.mdx` pages across section directories, followed by thin section overview/why-it-matters pages. Treat these as the next content repair queue before adding new sections.
- Deploy the nginx/static routing fix and verify `https://ai.eggcampus.com/generative-multimodal/three-entry-points/` no longer redirects in a loop.

## Agent Operation Log

### 2026-05-07

- Started an 8-hour rescue pass after production review showed `ai.eggcampus.com/generative-multimodal/three-entry-points/` had `ERR_TOO_MANY_REDIRECTS` and the visible content quality was too thin to trust.
- Removed the nginx trailing-slash rewrite in `cicd/docker/default.conf` and simplified `try_files` to `try_files $uri $uri/ =404;` so nginx no longer fights static/Fumadocs canonical routing.
- Created `AI Knowledge/weekly-plans/2026-05-07-8h-content-show-rescue-plan.md` with the rescue sequence: P0 route fix, P1 core page rewrite, QA gate, and follow-up queue.
- Rewrote `content/docs/generative-multimodal/three-entry-points.mdx` into a real chapter entry around three reader tasks: visual understanding, generation, and cross-modal collaboration, with task table and source links.
- Rewrote `content/docs/generative-multimodal/quality-judgment.mdx` into a task-based quality guide covering image/video/multimodal evaluation, scoring dimensions, role-specific checks, and source links.
- Added dependency-free content QA script `scripts/content_qa.py` and package script `pnpm qa:content` to scan thin pages, duplicate routes, internal links/assets, route slugs, and `meta.json` references.
- Validation: `pnpm qa:content` passed structurally but warned about 54 thin pages / 47 very thin pages; `pnpm exec fumadocs-mdx` passed; `pnpm typecheck` passed; `git diff --check` passed. Full `pnpm build` was not run during this rescue step to avoid unnecessary local frontend build load.
- Cron Round 01 completed the route/build sanity gate without additional content/code edits. Validation: `pnpm qa:content` warned only on existing content debt (54 thin / 47 very thin), `pnpm exec fumadocs-mdx` passed, `pnpm typecheck` passed, `pnpm build` passed, and `git diff --check` passed. Changed files this round: `AI Knowledge/weekly-plans/2026-05-07-8h-rescue-cron-state.md`, `Memory.md`; remaining debt starts with empty `generative-multimodal/key-terms.mdx` for Round 02.
- Cron Round 02 rewrote `content/docs/generative-multimodal/key-terms.mdx` from a thin category embed into a reader-facing glossary map for CV, CNN, CLIP, Diffusion, GAN, NeRF, Multimodal, and cross-modal generalization, with internal links and source links. Validation: `pnpm qa:content` passed with remaining debt (53 thin / 46 very thin), `pnpm exec fumadocs-mdx` passed, and `git diff --check` passed. Remaining debt: other empty section `key-terms.mdx` pages plus thin section overview/why-it-matters pages; Round 03 should improve `generative-multimodal/index.mdx`.

### 2026-05-08

- Cron Round 03 expanded `content/docs/generative-multimodal/index.mdx` into a real section overview with reader paths, task table, internal links to `three-entry-points`, `quality-judgment`, `key-terms`, and source links. Validation: `pnpm qa:content` passed with remaining debt (52 thin / 45 very thin), `pnpm exec fumadocs-mdx` passed, and final `git diff --check` passed. Remaining debt: empty section `key-terms.mdx` pages outside generative-multimodal; Round 04 should do the planned generative-multimodal section handoff check.
- Cron Round 04 completed the `generative-multimodal` handoff check and tightened the weak `key-terms` page title/link text to `关键术语地图` across the section. Validation: `pnpm qa:content` passed with remaining debt (52 thin / 45 very thin), `pnpm exec fumadocs-mdx` passed, `pnpm typecheck` passed, and final `git diff --check` passed. Remaining debt: empty `key-terms.mdx` pages in fundamentals, machine-learning, model-mechanisms, llm-prompting, agents-products, frontier, and infrastructure; Round 05 should repair `fundamentals/key-terms.mdx`.
- Cron Round 05 rewrote `content/docs/fundamentals/key-terms.mdx` from a thin category embed into a reader-facing fundamentals term map for AI, ML, DL, neural networks, training, inference, data, model, and evaluation, with internal links and source links. Validation: `pnpm qa:content` passed with remaining debt (51 thin / 44 very thin), `pnpm exec fumadocs-mdx` passed, and final `git diff --check` passed. Remaining debt: empty `key-terms.mdx` pages in machine-learning, model-mechanisms, llm-prompting, agents-products, frontier, and infrastructure; Round 06 should repair `machine-learning/key-terms.mdx`.
- Cron Round 06 rewrote `content/docs/machine-learning/key-terms.mdx` from a thin category embed into a reader-facing machine-learning term map for learning paradigms, data splits, generalization, overfitting/underfitting, and regularization, with internal links and source links. Validation: `pnpm qa:content` passed with remaining debt (50 thin / 43 very thin), `pnpm exec fumadocs-mdx` passed, and final `git diff --check` passed. Remaining debt: empty `key-terms.mdx` pages in model-mechanisms, llm-prompting, agents-products, frontier, and infrastructure; Round 07 should repair `model-mechanisms/key-terms.mdx`.
- Cron Round 07 rewrote `content/docs/model-mechanisms/key-terms.mdx` from a thin category embed into a reader-facing model mechanism map for token, embedding, Transformer, attention, parameters, loss/gradient, inference, fine-tuning, and alignment; also updated the model-mechanisms index card title/description for that page. Validation: `pnpm qa:content` passed with remaining debt (49 thin / 42 very thin), `pnpm exec fumadocs-mdx` passed, and final `git diff --check` passed. Remaining debt: empty `key-terms.mdx` pages in llm-prompting, agents-products, frontier, and infrastructure; Round 08 should repair `llm-prompting/key-terms.mdx`.
- Cron Round 08 rewrote `content/docs/llm-prompting/key-terms.mdx` from a thin category embed into a reader-facing LLM prompting map for prompt engineering, context, RAG, embedding/vector database, fine-tuning, preference optimization, and hallucination; also updated the llm-prompting index card title/description for that page. Validation: `pnpm qa:content` passed with remaining debt (48 thin / 41 very thin), `pnpm exec fumadocs-mdx` passed, and final `git diff --check` passed. Remaining debt: empty `key-terms.mdx` pages in agents-products, frontier, and infrastructure; Round 09 should repair `agents-products/key-terms.mdx`.
- Cron Round 09 rewrote `content/docs/agents-products/key-terms.mdx` from a thin category embed into a reader-facing agents/products map for Agent, tool use, memory, workflow, guardrails, human-in-the-loop, and product boundaries; also updated the agents-products index card title/description for that page. Validation: `pnpm qa:content` passed with remaining debt (47 thin / 40 very thin), `pnpm exec fumadocs-mdx` passed, and final `git diff --check` passed. Remaining debt: empty `key-terms.mdx` pages in frontier and infrastructure plus thin section overview/why-it-matters pages; Round 10 should repair `frontier/key-terms.mdx`.
- Cron Round 10 rewrote `content/docs/frontier/key-terms.mdx` from a thin category embed into a reader-facing frontier/safety/governance map for AGI, ASI, alignment, bias, hallucination, multimodal systems, agents, capability evaluation, and governance; also updated the frontier index card title/description for that page. Validation: `pnpm qa:content` passed with remaining debt (46 thin / 39 very thin), `pnpm exec fumadocs-mdx` passed, and final `git diff --check` passed. Remaining debt: empty `content/docs/infrastructure/key-terms.mdx` plus thin section overview/why-it-matters pages; Round 11 should repair `infrastructure/key-terms.mdx`.
- Cron Round 11 rewrote `content/docs/infrastructure/key-terms.mdx` from a thin category embed into a reader-facing infrastructure map for compute, accelerators, foundation models, MoE, inference, deployment, vector databases, observability, latency/throughput, cost control, and data pipelines; also updated the infrastructure index card title/description for that page. Validation: `pnpm qa:content` passed with remaining debt (45 thin / 38 very thin), `pnpm exec fumadocs-mdx` passed, and final `git diff --check` passed. Remaining debt: thin section entrances such as `frontier/why-it-matters.mdx`, `infrastructure/index.mdx`, and `graph.mdx`; Round 12 is the midpoint validation/build gate.
- Cron Round 12 completed the midpoint validation/build gate without content/code edits. Validation: `pnpm qa:content` passed with remaining debt (45 thin / 38 very thin), `pnpm exec fumadocs-mdx` passed, `pnpm typecheck` passed, `pnpm build` passed, and final `git diff --check` passed. Remaining debt: worst thin pages include `frontier/why-it-matters.mdx`, `infrastructure/index.mdx`, `graph.mdx`, `agents-products/why-agent-matters.mdx`, and `fundamentals/index.mdx`; Round 13 should improve `fundamentals/index.mdx` plus one related fundamentals thin page.
- Cron Round 13 expanded `content/docs/fundamentals/index.mdx` into a real reader orientation page and rewrote `content/docs/fundamentals/history-routes.mdx` with a symbolist/connectionist/hybrid-systems explanation, misconceptions, internal links, and sources. Validation: `pnpm qa:content` passed with remaining debt (43 thin / 36 very thin), `pnpm exec fumadocs-mdx` passed, and final `git diff --check` passed. Remaining debt: `fundamentals/hierarchy.mdx` is still thin, but Round 14 should follow plan on `machine-learning/index.mdx` plus `machine-learning/why-it-matters.mdx`.
- Cron Round 14 expanded `content/docs/machine-learning/index.mdx` into a reader-facing section map and rewrote `content/docs/machine-learning/why-it-matters.mdx` around real AI-tool judgment questions, pitfalls, internal links, and sources. Validation: `pnpm qa:content` passed with remaining debt (41 thin / 34 very thin), `pnpm exec fumadocs-mdx` passed, and final `git diff --check` passed. Remaining debt: worst pages now start with `frontier/why-it-matters.mdx`, `infrastructure/index.mdx`, `graph.mdx`, and `agents-products/why-agent-matters.mdx`; Round 15 should improve `model-mechanisms/index.mdx` plus its worst related thin page.
- Cron Round 15 expanded `content/docs/model-mechanisms/index.mdx` into a useful model-mechanism orientation page and rewrote `content/docs/model-mechanisms/reading-next.mdx` as a goal-based follow-up reading guide with internal links, pitfalls, and sources. Validation: `pnpm qa:content` passed with remaining debt (39 thin / 32 very thin), `pnpm exec fumadocs-mdx` passed, and final `git diff --check` passed. Remaining debt: worst pages now start with `frontier/why-it-matters.mdx`, `infrastructure/index.mdx`, `graph.mdx`, `agents-products/why-agent-matters.mdx`, and `infrastructure/why-it-matters.mdx`; Round 16 should improve `llm-prompting/index.mdx` plus `llm-prompting/fine-tuning.mdx` or the current worst related thin page.
- Cron Round 16 expanded `content/docs/llm-prompting/index.mdx` into a task-specification/workflow orientation page and rewrote `content/docs/llm-prompting/fine-tuning.mdx` with when-to-use, when-not-to-use, comparison table, internal links, and sources. Validation: `pnpm qa:content` passed with remaining debt (37 thin / 30 very thin), `pnpm exec fumadocs-mdx` passed, and final `git diff --check` passed. Remaining debt: worst pages now start with `frontier/why-it-matters.mdx`, `infrastructure/index.mdx`, `graph.mdx`, `agents-products/why-agent-matters.mdx`, and `infrastructure/why-it-matters.mdx`; Round 17 should improve `agents-products/index.mdx` plus `agents-products/why-agent-matters.mdx` or the current worst related thin page.
- Cron Round 17 expanded `content/docs/agents-products/index.mdx` into a reader-facing section map about product/model/company/framework boundaries and rewrote `content/docs/agents-products/why-agent-matters.mdx` around Agent execution risk, demo pitfalls, use cases, permission checks, internal links, and sources. Validation: `pnpm qa:content` passed with remaining debt (35 thin / 28 very thin), `pnpm exec fumadocs-mdx` passed, and final `git diff --check` passed. Remaining debt: worst pages now start with `frontier/why-it-matters.mdx`, `infrastructure/index.mdx`, `graph.mdx`, `infrastructure/why-it-matters.mdx`, and `frontier/index.mdx`; Round 18 should improve `frontier/index.mdx` plus `frontier/why-it-matters.mdx`.
- Cron Round 18 expanded `content/docs/frontier/index.mdx` into a practical frontier/safety/governance orientation page and rewrote `content/docs/frontier/why-it-matters.mdx` around concrete ordinary-reader impact scenarios, evaluation questions, misconceptions, internal links, and sources. Validation: `pnpm qa:content` passed with remaining debt (33 thin / 26 very thin), `pnpm exec fumadocs-mdx` passed, and final `git diff --check` passed. Remaining debt: worst pages now start with `infrastructure/index.mdx`, `graph.mdx`, `infrastructure/why-it-matters.mdx`, `agents-products/four-objects.mdx`, and `machine-learning/overfitting.mdx`; Round 19 should improve `infrastructure/index.mdx` plus `infrastructure/why-it-matters.mdx` or the current worst related thin page.
- Cron Round 19 expanded `content/docs/infrastructure/index.mdx` into a real infrastructure orientation page and rewrote `content/docs/infrastructure/why-it-matters.mdx` around price, speed, privacy, availability, reliability, evaluation questions, misconceptions, internal links, and sources. Validation: `pnpm qa:content` passed with remaining debt (31 thin / 24 very thin), `pnpm exec fumadocs-mdx` passed, and final `git diff --check` passed. Remaining debt: worst pages now start with `graph.mdx`, `agents-products/four-objects.mdx`, `machine-learning/overfitting.mdx`, `llm-prompting/how-to-choose.mdx`, and `machine-learning/machine-learning-frame.mdx`; Round 20 should repair at least two worst non-index pages under 260 chars.
- Cron Round 20 swept the three worst non-index very-thin pages: expanded `content/docs/graph.mdx` into a practical site-map guide, rewrote `content/docs/agents-products/four-objects.mdx` to separate product/model/company/framework layers, and rewrote `content/docs/machine-learning/overfitting.mdx` with overfitting/underfitting/generalization diagnostics. Validation: `pnpm qa:content` passed with remaining debt (28 thin / 21 very thin), `pnpm exec fumadocs-mdx` passed, and final `git diff --check` passed. Remaining debt: worst pages now start with `llm-prompting/how-to-choose.mdx`, `machine-learning/machine-learning-frame.mdx`, `llm-prompting/rag.mdx`, `llm-prompting/misconceptions.mdx`, and `machine-learning/deep-learning-mainline.mdx`; Round 21 should review nav/internal links and metadata.
- Cron Round 21 reviewed section `meta.json` files and custom sidebar hrefs, found no missing/unlisted pages or missing sidebar targets, and changed eight sidebar key-term labels from vague `这组词` to `关键术语地图` in `components/sidebar-content.tsx`. Validation: `pnpm qa:content` passed with remaining debt (28 thin / 21 very thin), `pnpm exec fumadocs-mdx` passed, `pnpm typecheck` passed, and final `git diff --check` passed. Remaining debt: worst pages still start with `llm-prompting/how-to-choose.mdx`, `machine-learning/machine-learning-frame.mdx`, and `llm-prompting/rag.mdx`; Round 22 is the full local gate with build.
- Cron Round 22 completed the full local gate without code/content repair. Validation: `pnpm qa:content` passed with remaining debt (28 thin / 21 very thin), `pnpm exec fumadocs-mdx` passed, `pnpm typecheck` passed, `pnpm build` passed, and final `git diff --check` passed. Remaining debt: worst pages still start with `llm-prompting/how-to-choose.mdx`, `machine-learning/machine-learning-frame.mdx`, `llm-prompting/rag.mdx`, `llm-prompting/misconceptions.mdx`, and `machine-learning/deep-learning-mainline.mdx`; Round 23 should do commit-ready cleanup/status review without committing unless explicitly allowed.
- Cron Round 23 did commit-ready cleanup without committing: reviewed `git status --short` and `git diff --stat`, removed ignored local `scripts/__pycache__/`, ran `pnpm qa:content` (28 thin / 21 very thin), and final `git diff --check` passed. Changed files this round: state file and `Memory.md` only; remaining debt is the same worst thin queue, and Round 24 should produce the final rescue report/final gate.
- Cron Round 24 completed the final rescue gate. Validation: `pnpm qa:content` passed with remaining debt (28 thin / 21 very thin), `pnpm exec fumadocs-mdx` passed, `pnpm typecheck` passed, `pnpm build` passed, and final `git diff --check` passed. Changed files this round: state file and `Memory.md` only. Full rescue diff still needs human review/commit/push/deploy; production nginx fix should be verified at `https://ai.eggcampus.com/generative-multimodal/three-entry-points/` after deployment.

### 2026-05-05

- Renamed the public-facing brand from Content Show to AI知路 across the app shell, metadata, docs root title, web manifests, homepage, docs sidebar, and core intro pages.
- Replaced the homepage hero visual with `/public/branding/ai-zhilu-home.png`, derived from the user-provided AI知路 image.
- Validation: `pnpm typecheck` passed. Local `pnpm build` intentionally not run to avoid heavy frontend build on the 16GB Mac mini; GitHub Pages workflow will run the production build after push.

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
