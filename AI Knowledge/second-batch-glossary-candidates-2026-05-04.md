# 第二批 glossary 词条候选盘点（2026-05-04）

本盘点对应 `AI Knowledge/weekly-plans/2026-05-04-2026-05-10-content-roadmap.md` 的周一任务：从 `lib/ai-glossary.ts` 中仍为 `card` 的高频术语里，按读者价值、来源成熟度、内链价值分级。

## 盘点口径

- **盘点对象**：`lib/ai-glossary.ts` 中未进入 `coreTermConfig`、因此仍为 `depth: "card"` 的 69 个词条。
- **读者价值**：普通读者是否经常遇到、是否会影响理解后续章节。
- **来源成熟度**：是否已有明确论文、官方文档、教材、标准机构或稳定课程可支撑。
- **内链价值**：词条是否连接多个已发布核心页、主题页或后续学习路径；括号中的“被关联次数”来自现有 `relatedTerms` 反向引用粗略统计。
- **发布原则**：主词条优先补独立页；关联词优先增强 glossary 卡片；公司、产品、缩写和过窄方法除非服务清晰阅读路径，否则暂缓。

## 主词条优先：适合本周开始补独立页

这些词条既是学习路径中的关键断点，也有较成熟来源和较高内链价值。建议从中选择 3 个作为 2026-05-05 至 2026-05-07 的公开详情页候选。

| 优先级 | 词条 | 中文 | 分类 | 被关联次数 | 为什么值得补独立页 | 来源成熟度 | 推荐处理 |
| --- | --- | --- | --- | ---: | --- | --- | --- |
| P0 | Inference | 推理 | model-mechanisms | 7 | 读者很容易把“训练模型”和“使用模型”混在一起；它连接 LLM、Attention、Parameters、部署成本和产品体验。 | 高：可用 Stanford CS324、Google/Cloud 推理文档、NVIDIA/Triton 或 Hugging Face 推理文档。 | 本周最适合补的机制主词条之一；页面重点讲训练 vs 推理、延迟/吞吐/成本、常见误解。 |
| P0 | Parameters | 参数 | model-mechanisms | 9 | 当前反向引用最高；参数、权重、规模、训练和 MoE 都绕不开它。没有独立页时，读者容易把参数当成“知识条目”或“数据库”。 | 高：Deep Learning Book、CS231n/CS224N、基础模型论文均可支撑。 | 适合补独立页；和 Weight 保持边界：Parameters 是总称，Weight 是一种具体可学习参数。 |
| P0 | RLHF | 基于人类反馈的强化学习 | llm-prompting | 7 | 连接 Alignment、PPO、DPO、SFT，是理解大模型“更像人想要的回答”的关键概念。 | 高：InstructGPT 论文、Anthropic HH-RLHF、OpenAI / DeepMind alignment 相关材料。 | 适合补独立页；必须强调 RLHF 不是安全全部，也不保证事实正确。 |
| P1 | Attention | 注意力 | model-mechanisms | 3 | 虽已有 Transformer 独立页，但 Attention 是理解 Transformer 的前置机制；普通读者常把它误解成“模型真的在注意”。 | 高：Attention Is All You Need、CS224N、自注意力课程材料。 | 可补独立页或强化 model-mechanisms 页面；若补页，应避免重复 Transformer。 |
| P1 | Gradient Descent | 梯度下降 | model-mechanisms | 6 | 解释“模型怎么改参数”的核心入口，和 Loss Function、Backpropagation、Hyperparameter Tuning 强连接。 | 高：CS229、Deep Learning Book、Google ML Crash Course。 | 可作为模型机制补强页；适合和 Loss Function、Backpropagation 形成三件套。 |
| P1 | Loss Function | 损失函数 | model-mechanisms | 5 | 读者需要知道模型训练到底在优化什么；也是理解偏差、对齐、过拟合的桥梁。 | 高：机器学习教材、CS229、Deep Learning Book。 | 可补独立页；页面要讲“损失函数不是业务目标本身”。 |
| P1 | Compute | 算力 / 计算 | infrastructure | 6 | 已在来源笔记里被列为后续候选；能把 GPU、TPU、Accelerator、Foundation Model、MoE 连接起来。 | 中高：NVIDIA、Google Cloud、Epoch AI / Stanford AI Index 等可支撑；需避免厂商营销。 | 可作为基础设施主词条；如果本周只补机制/应用/治理各一页，可留到周后半或下周。 |
| P1 | Multimodal | 多模态 | generative-multimodal | 6 | 是生成式与多模态章节的主轴，连接 CLIP、CV、Embedding、Diffusion Models。 | 高：CLIP、Flamingo/Gemini/GPT-4V 等论文或系统卡；需按日期标边界。 | 适合作为生成式/多模态主词条；注意不要把“能看图”写成“真正理解世界”。 |
| P1 | Vector Database | 向量数据库 | llm-prompting | 4 | 普通读者做 RAG 时最容易遇到；连接 Embedding、RAG、Vector，是工程实践边界词。 | 中高：Pinecone / Milvus / Weaviate 文档可用，但要配合向量检索基础材料，避免厂商话术。 | 适合 LLM 工程实践页；强调它不是万能知识库。 |
| P1 | Bias | 偏差 | frontier | 4 | 对齐、幻觉、训练数据、XAI 都需要它；普通读者也会从新闻和产品争议里遇到。 | 高：NIST AI RMF、OECD、Fairness/ML 教材。 | 适合治理方向独立页；要区分统计偏差、公平性风险和产品伤害。 |
| P2 | Scaling Law | 规模定律 | frontier | 4 | 连接参数、算力、涌现和泛化，是理解大模型扩张逻辑的关键，但容易被写成口号。 | 高：Kaplan et al.、Chinchilla、Stanford/industry analysis；但口径随时间变化。 | 可做前沿页，`stability` 建议 `evolving`；强调经验规律而非铁律。 |
| P2 | XAI | 可解释的人工智能 | frontier | 3 | 和 Bias、Alignment、Hallucination 构成治理检查线，来源成熟。 | 高：NIST Four Principles of Explainable AI、DARPA XAI、学术综述。 | 可作为治理页候选；页面要说明“解释不等于正确”。 |

## 关联词卡片增强：先补 definition / 误解 / relatedTerms，不急着独立页

这些词条适合作为本周主词条的配套增强。它们有内链价值，但独立页优先级低于上表。

### 模型机制配套

- **Backpropagation / 反向传播**（被关联 4）：适合配合 Gradient Descent、Loss Function、Parameters；卡片应明确“计算梯度，不等于模型反思”。
- **Forward Propagation / 前向传播**（被关联 3）：适合和 Inference、Backpropagation 区分；卡片可强调训练和使用时都会发生前向计算。
- **Weight / 模型权重**（被关联 2）：应作为 Parameters 的子概念增强，不急着单独成页。
- **Objective Function / 目标函数**（被关联 1）：应和 Loss Function 区分，适合增强卡片，暂不单独成页。
- **Hyperparameter Tuning / 超参数调优**（被关联 2）：可服务 Validation Data、Gradient Descent；适合卡片增强。
- **Pre-training / 预训练**（被关联 2）：连接 Foundation Model、Fine-Tuning、LLM，未来可升主词条；本周若补 RLHF 或 SFT，可先增强卡片。
- **Knowledge Distillation / 知识蒸馏**、**Pruning / 裁剪**：已在来源笔记 backlog 出现，适合基础设施效率线；先增强卡片，待 Compute / Inference 成页后再决定是否独立。

### LLM 应用与训练配套

- **SFT / 监督微调**（被关联 3）：RLHF 页面必备配套；卡片要说明它通常先于偏好优化，不等于全部微调。
- **Instruction Tuning / 指令调优**（被关联 3）：连接 Fine-Tuning、SFT、Prompt Engineering；先增强卡片，后续可并入 RLHF / SFT 页面。
- **DPO / 直接偏好优化**（被关联 3）、**PPO / 近端策略优化**（被关联 4）：适合作为 RLHF 关联词增强；不建议先做独立页，避免普通读者过早陷入算法细节。
- **CoT / 思维链提示**（被关联 2）：连接 Prompt Engineering、LLM、Inference；可增强卡片并在提示工程主题页回连。
- **NLP / 自然语言处理**（被关联 3）：概念范围大，但当前站点更聚焦 LLM；可先保持强卡片。
- **Few-Shot / Zero-Shot**（被关联 4 / 1）：适合作为 Prompt Engineering 和 Generalization 的卡片增强；独立页可暂缓。

### 生成式与多模态配套

- **CLIP / 对比语言图像预训练**（被关联 4）：Multimodal 页面关键配套；可先增强卡片，未来可能成页。
- **CV / 计算机视觉**（被关联 4）：范围很大，但对多模态主题有入口价值；先增强卡片。
- **GAN / 生成对抗网络**（被关联 2）：适合和 Diffusion Models 对比；除非扩展生成模型历史，否则先卡片增强。
- **CNN / 卷积神经网络**（被关联 2）：视觉基础词，适合卡片增强。
- **Latent Space / 潜在空间**、**Vector / 向量**：Embedding、Diffusion、Vector Database 的底层配套；先增强卡片即可。

### 基础设施配套

- **GPU / TPU / Accelerator**：GPU 已有稳定卡片配置，TPU、Accelerator 可继续增强；若补 Compute，三者作为关联卡片支撑即可。
- **Mixture of Experts / 专家组合**：当前已有核心词条 **MoE** 独立页，`Mixture of Experts` 这个卡片可能造成重复；建议后续清理命名或合并跳转语义，而不是另开页。

### 治理与前沿配套

- **Emergence / 涌现**（被关联 2）、**Double Descent / 双降**（被关联 2）：来源成熟但解释争议强，适合卡片增强；若成页必须明确评测阈值和争议边界。
- **Singularity / 奇点**：容易科幻化，先卡片即可；如写页必须标 `speculative`。
- **ANI / 狭义人工智能**：和 AI/AGI/ASI 能力层级有关，但现有 AI、AGI、ASI 页已经覆盖主线，先保持卡片。
- **Symbolic AI / Connectionism / Expert Systems**：适合基础路线历史线，先做卡片增强；若未来扩展 AI 历史专题再考虑独立页。

## 暂缓：当前不建议投入独立页

这些词条不是没有价值，而是目前不适合作为第二批核心公开页优先项。

- **公司 / 产品名**：ChatGPT、OpenAI、DeepMind、GPT-4、TensorFlow。原因：事实更新快，容易变成产品介绍或公司百科；除非服务明确主题页，否则不优先做独立页。
- **过窄或当前命名存疑的方法缩写**：GPO、KTO、MLA、GQA。原因：普通读者价值不够稳定，来源和命名容易混淆；先留在卡片或后续审名。
- **过于抽象的通用词**：Paradigm、Generalize、System1/System2。原因：容易写散，不如放在具体页面里解释。
- **传统架构细分但非当前主断点**：RNN、LSTM、Hidden Layer、End-to-End Learning、Transfer Learning、Data Augmentation、Fitting。原因：有教材来源，但现有学习路径更需要先补模型机制和 LLM 工程边界。
- **视觉细分前沿**：NeRF、Cross-modal generalization。原因：需要多模态主线先建立，之后再判断是否扩展。
- **AIGC**：常见但偏产业语境，已可由 Generative AI / Gen AI、Diffusion Models、ChatGPT 支撑；先增强卡片，不优先独立页。

## 本周建议执行顺序

如果严格沿本周计划每天推进一个主方向，建议如下：

1. **2026-05-05 模型机制 / 基础概念**：优先 `Inference`；备选 `Parameters`。  
   - 理由：它最直接解决“训练 vs 使用”的读者误解，也能服务基础设施、LLM、Agent 后续内容。
2. **2026-05-06 LLM 应用 / 工程实践**：优先 `RLHF` 或 `Vector Database`。  
   - 如果想讲“模型回答为什么变得更合人意”，选 `RLHF`；如果想讲“RAG 工程怎么落地”，选 `Vector Database`。
3. **2026-05-07 前沿 / 治理**：优先 `Bias`；备选 `Scaling Law` 或 `XAI`。  
   - 理由：Bias 和 Training Data、Alignment、Hallucination、XAI 的连接最稳，也最适合普通读者理解现实风险。
4. **2026-05-08 回连主题页**：把新增页回连到 `/model-mechanisms`、`/llm-prompting`、`/frontier`、`/learn/learning-path` 和 `/graph` 相关关系。
5. **2026-05-09 QA**：检查 `hasDetailPage`、slug、`relatedTerms`、`content/docs/glossary/meta.json` 与反向链接。

## 候选结论

- **第一梯队主词条**：`Inference`、`Parameters`、`RLHF`。
- **第二梯队主词条**：`Attention`、`Gradient Descent`、`Loss Function`、`Compute`、`Multimodal`、`Vector Database`、`Bias`。
- **治理 / 前沿储备**：`Scaling Law`、`XAI`、`Emergence`、`Double Descent`。
- **本周不建议追求数量**：优先把 3 个主词条写成有来源、图示、常见误解、内部链接的完整公开页；其余关联词通过卡片增强服务阅读路径。
