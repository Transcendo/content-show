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

## Machine Learning

- Tom Mitchell, Machine Learning: <https://www.cs.cmu.edu/~tom/mlbook.html>
- Stanford CS229 Machine Learning: <https://cs229.stanford.edu/>
- Editorial boundary: explain machine learning as learning patterns from data, not as a synonym for all AI or for deep learning alone.

## Deep Learning

- Goodfellow, Bengio, and Courville, Deep Learning: <https://www.deeplearningbook.org/>
- LeCun, Bengio, and Hinton, Deep learning: <https://www.nature.com/articles/nature14539>
- Editorial boundary: explain deep learning as a machine-learning branch based on multi-layer neural networks; avoid reducing it to current LLM products.

## Neural Network

- IBM, What are neural networks?: <https://www.ibm.com/think/topics/neural-networks>
- Goodfellow, Bengio, and Courville, Deep Learning: <https://www.deeplearningbook.org/>
- Editorial boundary: explain layers, weights, activations, and training without implying neural networks think like biological brains.

## Transformer

- Vaswani et al., Attention Is All You Need: <https://arxiv.org/abs/1706.03762>
- Stanford CS224N notes on self-attention and transformers: <https://web.stanford.edu/class/cs224n/readings/cs224n-self-attention-transformers-2023_draft.pdf>
- Editorial boundary: explain Transformer as an architecture centered on attention, not as a product or a synonym for every LLM.

## LLM

- Vaswani et al., Attention Is All You Need: <https://arxiv.org/abs/1706.03762>
- Stanford CS324, Large Language Models: <https://stanford-cs324.github.io/winter2022/>
- Editorial boundary: separate model behavior from product features such as browsing, retrieval, and tool use.

## Token

- OpenAI Cookbook, How to count tokens with tiktoken: <https://developers.openai.com/cookbook/examples/how_to_count_tokens_with_tiktoken>
- OpenAI tiktoken repository: <https://github.com/openai/tiktoken>
- Editorial boundary: define token as model/tokenizer processing unit, not as a fixed character, word, or semantic concept.

## Prompt Engineering

- OpenAI API, Prompt engineering: <https://developers.openai.com/api/docs/guides/prompt-engineering>
- Anthropic Docs, Prompt engineering overview: <https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview>
- Editorial boundary: present prompting as task/context/format/evaluation design, not as magic phrases that remove the need for data, retrieval, or review.

## Embedding

- OpenAI API, Vector embeddings: <https://developers.openai.com/api/docs/guides/embeddings>
- Mikolov et al., Efficient Estimation of Word Representations in Vector Space: <https://arxiv.org/abs/1301.3781>
- Editorial boundary: explain embeddings as vector representations for similarity and retrieval, not as full-fidelity copies of source content or proof of factual correctness.

## Fine-Tuning

- Hugging Face PEFT documentation: <https://huggingface.co/docs/peft/en/index>
- Hugging Face Transformers, Parameter-efficient fine-tuning: <https://huggingface.co/docs/transformers/en/peft>
- Editorial boundary: distinguish behavior adaptation from knowledge retrieval; avoid recommending fine-tuning when RAG, prompting, or data cleanup is the better first step.

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

## Foundation Model

- Bommasani et al., On the Opportunities and Risks of Foundation Models: <https://arxiv.org/abs/2108.07258>
- Stanford HAI, What is a Foundation Model?: <https://hai.stanford.edu/news/what-foundation-model>
- Editorial boundary: explain foundation model as a reusable model base trained on broad data, not as a synonym for chatbot, not as a guarantee of product quality, and not as language-only.

## MoE

- Fedus et al., Switch Transformers: <https://jmlr.org/papers/v23/21-0998.html>
- Shazeer et al., Outrageously Large Neural Networks: <https://arxiv.org/abs/1701.06538>
- Editorial boundary: explain MoE as sparse expert routing inside the model, not as “many models stitched together” and not as a blanket promise of cheap inference.

## Related card refresh for 2026-04-26

- Compute: keep the focus on AI-relevant compute as a bundle of chips, time, power, throughput, and scheduling; avoid reducing it to “number of GPUs”.
- GPU: useful anchor is NVIDIA’s data-center explainer alongside existing infrastructure context; stress parallel compute instead of gaming imagery.
- TPU: use Google Cloud TPU docs as the clean reference; distinguish specialized tensor hardware from the broader GPU ecosystem.
- Accelerator: present it as an umbrella term covering GPU, TPU, and other AI chips rather than a single product category.
- Chatbot: keep the distinction between interaction form and underlying model capability; old rule-based bots still count.
- ChatGPT: present it as a product built on model capability plus interface, tools, and policies; avoid treating the brand name as a synonym for all AI.

## Next backlog after 2026-04-26

- Continue the infrastructure lane with Inference, Pruning, and Knowledge Distillation so the deployment-efficiency row under `/infrastructure` becomes complete.
- Decide whether Compute deserves a standalone public page or should stay as a strong glossary card plus topic-page explanation.
- Add missing public pages for the most-linked adjacent infrastructure terms only after sources and diagrams are ready.

## Related card refresh for 2026-04-25

- Bias: keep the focus on system-level skew, not only offensive wording. Useful anchors: NIST AI RMF and OECD AI principles.
- XAI: use NIST IR 8312 Four Principles of Explainable AI as the cleanest reader-facing framing.
- Emergence: use Emergent Abilities of Large Language Models (<https://arxiv.org/abs/2206.07682>) carefully; mark debate around measurement thresholds.
- Scaling Law: use Scaling Laws for Neural Language Models (<https://arxiv.org/abs/2001.08361>); present as an empirical trend, not a universal law.
- Double Descent: use Deep Double Descent (<https://arxiv.org/abs/1912.02292>) to explain non-monotonic error curves.
- Generalization ability: keep the explanation tied to performance on unseen data and real-world transfer, not just benchmark scores.
