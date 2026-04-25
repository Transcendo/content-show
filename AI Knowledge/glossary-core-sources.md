# Core Glossary Source Notes

These notes support the first public glossary pages under `content/docs/glossary/`.

## AI

- OECD AI Principles: <https://oecd.ai/en/ai-principles>
- NIST AI Risk Management Framework: <https://www.nist.gov/itl/ai-risk-management-framework>
- Editorial boundary: explain AI as the broad field, not as a single product or capability level.

## AGI

- Morris et al., Levels of AGI: <https://arxiv.org/abs/2311.02462>
- OpenAI Charter: <https://openai.com/charter/>
- Editorial boundary: mark AGI as a contested target and avoid claiming a public system has reached it.

## ASI

- OpenAI, Governance of Superintelligence: <https://openai.com/index/governance-of-superintelligence/>
- Google DeepMind, Frontier Safety Framework: <https://deepmind.google/blog/introducing-the-frontier-safety-framework/>
- Editorial boundary: present ASI as a forward-looking governance and risk topic, not a current product category.

## LLM

- Vaswani et al., Attention Is All You Need: <https://arxiv.org/abs/1706.03762>
- Stanford CS324, Large Language Models: <https://stanford-cs324.github.io/winter2022/>
- Editorial boundary: separate model behavior from product features such as browsing, retrieval, and tool use.

## RAG

- Lewis et al., Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks: <https://arxiv.org/abs/2005.11401>
- AWS, What is Retrieval-Augmented Generation: <https://aws.amazon.com/what-is/retrieval-augmented-generation/>
- Editorial boundary: explain RAG as retrieval plus generation, not as a guarantee of factual correctness.

## Agent

- Anthropic, Building Effective Agents: <https://www.anthropic.com/engineering/building-effective-agents>
- Model Context Protocol specification: <https://modelcontextprotocol.io/specification/2025-06-18>
- Editorial boundary: emphasize permissions, logs, rollback, and human confirmation for real-world actions.

## Generative AI / Gen AI

- NIST, Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile: <https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence>
- IBM, What is generative AI?: <https://www.ibm.com/think/topics/generative-ai>
- Editorial boundary: explain Generative AI as a broad content-generation category, not as a guarantee of truthfulness or a synonym for chatbots alone.

## Diffusion Models

- Ho et al., Denoising Diffusion Probabilistic Models: <https://arxiv.org/abs/2006.11239>
- Nichol & Dhariwal, Improved Denoising Diffusion Probabilistic Models: <https://arxiv.org/abs/2102.09672>
- Editorial boundary: explain diffusion as a step-by-step denoising generation method, distinguish it from GANs and text-only LLMs, and avoid implying that all image generation systems work the same way.

## Alignment

- Wang et al., AI Alignment: A Comprehensive Survey: <https://arxiv.org/abs/2310.19852>
- NIST, AI Risk Management Framework: <https://www.nist.gov/itl/ai-risk-management-framework>
- Editorial boundary: explain alignment as the problem of making goals, behavior, and outcomes line up with human intent; do not reduce it to politeness filters or speculative superintelligence doom talk.

## Hallucination

- Huang et al., A Survey on Hallucination in Large Language Models: <https://arxiv.org/abs/2311.05232>
- NIST, Generative Artificial Intelligence Profile: <https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence>
- Editorial boundary: define hallucination as unsupported output rather than intentional deception; stress evidence, retrieval, and review limits instead of claiming any single mitigation removes the risk.

## Related card refresh for 2026-04-25

- Bias: keep the focus on system-level skew, not only offensive wording. Useful anchors: NIST AI RMF and OECD AI principles.
- XAI: use NIST IR 8312 Four Principles of Explainable AI as the cleanest reader-facing framing.
- Emergence: use Emergent Abilities of Large Language Models (<https://arxiv.org/abs/2206.07682>) carefully; mark debate around measurement thresholds.
- Scaling Law: use Scaling Laws for Neural Language Models (<https://arxiv.org/abs/2001.08361>); present as an empirical trend, not a universal law.
- Double Descent: use Deep Double Descent (<https://arxiv.org/abs/1912.02292>) to explain non-monotonic error curves.
- Generalization ability: keep the explanation tied to performance on unseen data and real-world transfer, not just benchmark scores.
