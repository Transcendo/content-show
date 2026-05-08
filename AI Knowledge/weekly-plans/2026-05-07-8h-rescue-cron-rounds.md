# content-show 8h Rescue Cron Rounds

Date: 2026-05-07
Cadence: every 20 minutes
Max rounds: 24
Workdir: `/Users/djd/Documents/github/content-show`

## Non-negotiables

- Do not start local dev servers or watch processes.
- Do not run Playwright/E2E.
- Prefer targeted content edits, `pnpm qa:content`, `pnpm exec fumadocs-mdx`, `pnpm typecheck`, and only run `pnpm build` on planned gate rounds or before commit/push.
- Keep each round small enough to finish inside 20 minutes.
- Public pages must be useful, not placeholders.
- Do not add new empty pages.
- If credentials appear, redact as `[REDACTED]`.
- Every round must append a short log to `Memory.md` and update `AI Knowledge/weekly-plans/2026-05-07-8h-rescue-cron-state.md`.

## Round plan

### Block A — Stabilize current rescued section

1. **Round 01 — Route/build sanity gate**
   - Review git diff for current rescue changes.
   - Run `pnpm qa:content`, `pnpm exec fumadocs-mdx`, `pnpm typecheck`.
   - If safe, run `pnpm build` as the first full gate because routing config changed.
   - Fix only direct breakages.

2. **Round 02 — Repair `generative-multimodal/key-terms.mdx`**
   - Replace empty/thin key terms page with a compact glossary map for CV, CNN, CLIP, Diffusion, GAN, NeRF, Multimodal, Cross-modal generalization.
   - Link to existing glossary pages where available.
   - Run `pnpm qa:content`.

3. **Round 03 — Improve `generative-multimodal/index.mdx`**
   - Make the section overview useful: what this chapter answers, reader path, when to read which page.
   - Link to `three-entry-points`, `quality-judgment`, and `key-terms`.
   - Run `pnpm qa:content`.

4. **Round 04 — Full check for `generative-multimodal`**
   - Inspect all pages in `content/docs/generative-multimodal`.
   - Fix broken links, title/description weakness, obvious MDX problems.
   - Run `pnpm qa:content`, `pnpm exec fumadocs-mdx`, `pnpm typecheck`.

### Block B — Kill the empty key-term pages

5. **Round 05 — Repair `fundamentals/key-terms.mdx`**
   - Make it a real guide to AI, ML, DL, neural networks, training/inference, data, model, evaluation.
   - Run `pnpm qa:content`.

6. **Round 06 — Repair `machine-learning/key-terms.mdx`**
   - Cover supervised/unsupervised/reinforcement learning, training/validation data, overfitting/underfitting, regularization, generalization.
   - Run `pnpm qa:content`.

7. **Round 07 — Repair `model-mechanisms/key-terms.mdx`**
   - Cover token, embedding, transformer, attention if present, parameters, inference, fine-tuning, alignment.
   - Run `pnpm qa:content`.

8. **Round 08 — Repair `llm-prompting/key-terms.mdx`**
   - Cover prompt engineering, context, RAG, embedding/vector database, fine-tuning, preference optimization, hallucination.
   - Run `pnpm qa:content`.

9. **Round 09 — Repair `agents-products/key-terms.mdx`**
   - Cover agent, tool use, memory, workflow, guardrails, human-in-the-loop, product boundaries.
   - Run `pnpm qa:content`.

10. **Round 10 — Repair `frontier/key-terms.mdx`**
    - Cover AGI, ASI, alignment, multimodal, agents, capability evaluation, safety/governance.
    - Run `pnpm qa:content`.

11. **Round 11 — Repair `infrastructure/key-terms.mdx`**
    - Cover compute, inference, deployment, vector database, observability, latency/cost, data pipeline.
    - Run `pnpm qa:content`.

12. **Round 12 — Midpoint gate**
    - Run `pnpm qa:content`, `pnpm exec fumadocs-mdx`, `pnpm typecheck`.
    - If not too heavy and prior checks pass, run `pnpm build`.
    - Update the thin-page queue in the state file.

### Block C — Make section entrances readable

13. **Round 13 — Improve `fundamentals/index.mdx` and worst related thin page**
    - Prioritize reader orientation and no-bullshit map.
    - Run `pnpm qa:content`.

14. **Round 14 — Improve `machine-learning/index.mdx` and worst related thin page**
    - Make clear what ML is for, what to read first, common misconceptions.
    - Run `pnpm qa:content`.

15. **Round 15 — Improve `model-mechanisms/index.mdx` and worst related thin page**
    - Explain model internals without fake depth.
    - Run `pnpm qa:content`.

16. **Round 16 — Improve `llm-prompting/index.mdx` and worst related thin page**
    - Explain prompting as task specification and workflow design, not magic phrases.
    - Run `pnpm qa:content`.

17. **Round 17 — Improve `agents-products/index.mdx` and worst related thin page**
    - Explain agent/product boundary and why demos lie.
    - Run `pnpm qa:content`.

18. **Round 18 — Improve `frontier/index.mdx` and worst related thin page**
    - Separate evidence, speculation, and hype.
    - Run `pnpm qa:content`.

19. **Round 19 — Improve `infrastructure/index.mdx` and worst related thin page**
    - Explain deployment/cost/latency/reliability as real constraints.
    - Run `pnpm qa:content`.

20. **Round 20 — Thin-page sweep**
    - Run `pnpm qa:content`.
    - Pick the 3 worst thin non-index pages still under 260 chars and repair at least 2.
    - Run `pnpm qa:content` again.

### Block D — Final gates and publication readiness

21. **Round 21 — Internal link and nav review**
    - Inspect `meta.json` files and custom sidebar/nav if relevant.
    - Fix missing nav ordering or broken internal paths.
    - Run `pnpm qa:content` and `pnpm exec fumadocs-mdx`.

22. **Round 22 — Full local gate**
    - Run `pnpm qa:content`, `pnpm exec fumadocs-mdx`, `pnpm typecheck`, `pnpm build`.
    - Fix failures caused by the rescue changes.

23. **Round 23 — Commit-ready cleanup**
    - Review `git diff --stat`, `git diff --check`, and changed files.
    - Remove accidental/generated files if any.
    - Update `Memory.md` with final validation status and remaining debt.
    - Do not commit/push unless explicitly allowed by the user or the repo convention requires it and build passes.

24. **Round 24 — Final report**
    - Produce a concise final rescue report: changed files, pages repaired, QA/build status, remaining thin-page count, deploy verification still needed.
    - If all checks pass and commit/push is allowed by existing repo/user convention, commit and push; otherwise leave a clear commit command suggestion.

## Dynamic rule

If a planned file is already healthy by the time a round starts, use that round on the current worst thin page from `pnpm qa:content`, but stay inside the same section block where possible.
