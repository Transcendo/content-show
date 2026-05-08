# 2026-05-07 content-show 8h 拯救计划

**目标：** 8 小时内把 content-show 从“像知识站的空架子”救到“核心路径能打开、代表页面可读、后续扩写有标准”。

**判断标准：** 不追求一次性补完整站；只修最致命的断点，重写最伤信任的样板页，建立质量门槛，避免继续堆空页面。

## H0-H1：救访问

**问题：** `ai.eggcampus.com` 首页可访问，但多个站内目录路径出现 301 自循环。

**动作：**

- 定位 `next.config.js`、静态导出目录、生产 Nginx/Caddy 配置之间的冲突。
- 修复 `cicd/docker/default.conf` 中与 `trailingSlash: true` 冲突的规则。
- 验证本地配置不再把 `/route/` 改写成 `/route` 后又让 Nginx 301 回 `/route/`。

**验收：**

- 生产镜像配置不再包含 `rewrite ^/(.+)/$ /$1 break;`。
- 部署后这些路径最终应返回 200：
  - `/learn/`
  - `/glossary/`
  - `/fundamentals/`
  - `/generative-multimodal/`
  - `/generative-multimodal/three-entry-points/`

## H1-H2：建立内容急救标准

**动作：**

- 扫描 `content/docs/**/*.mdx`，找出正文极薄页面。
- 给 topic 页面设最低上线标准：不是索引页就必须有解释、例子、误区、下一步阅读。
- 先救最伤信任的 `generative-multimodal` 章节。

**验收：**

- 形成薄页列表。
- 明确 P0/P1/P2 页面队列。

## H2-H4：重写“生成式与多模态”样板页

**动作：**

- 重写 `content/docs/generative-multimodal/three-entry-points.mdx`。
- 重写 `content/docs/generative-multimodal/quality-judgment.mdx`。
- 保留现有 URL，不改导航结构。
- 写给普通读者，不写给术语熟练工。

**单页验收：**

- 不再是 3 行表格或 1 行短文。
- 有清楚问题意识：用户为什么要读。
- 有现实产品例子：文生图、图片问答、视频生成、多模态助手等。
- 有概念边界：CV / CLIP / Diffusion / GAN / NeRF / Multimodal 各自在哪一层。
- 有误区提醒和下一步阅读。
- 有可信来源或来源入口。

## H4-H5：首页和章节入口收敛

**动作：**

- 检查首页是否承诺过大、内页撑不住。
- 优先调整入口文案，让用户知道“从哪里开始”和“看完能解决什么”。
- 不做大 UI 重构，只做能提高动机和路径感的内容级改动。

**验收：**

- 首页主 CTA 更明确。
- “99 个词”不只是堆术语，而是引导学习路线。

## H5-H6：QA 脚本和静态检查

**动作：**

- 添加或运行轻量检查：
  - 薄页扫描；
  - MDX 生成；
  - TypeScript typecheck；
  - 必要时跑 production build。
- 不启动本地 dev server。

**验收：**

- `pnpm exec fumadocs-mdx` 通过。
- `pnpm typecheck` 通过。
- 如执行 `pnpm build`，必须记录结果；不通过就不声称可发布。

## H6-H7：提交前内容审计

**动作：**

- 看 `git diff`，确认没有误改生成文件。
- 检查所有新增链接、标题层级、MDX 语法。
- 更新 `Memory.md`。

**验收：**

- diff 可解释。
- 没有把临时报告、缓存、生成物误提交。

## H7-H8：阶段交付和下一轮队列

**动作：**

- 输出已修内容、验证结果、未解决风险。
- 给下一轮 8 小时队列：
  - 批量重写其他薄页；
  - 加首页动机改版；
  - 补第二批核心术语；
  - 部署后复测 live route。

**验收：**

- 本地 commit 可生成。
- 推送/生产发布只在验证通过后进行。
- live 站点必须用 `curl -I -L` 和浏览器复测，不能只看本地。

## 本轮优先队列

1. P0：修复 Nginx trailing slash 自循环。
2. P1：重写 `generative-multimodal/three-entry-points`。
3. P1：重写 `generative-multimodal/quality-judgment`。
4. P2：生成薄页扫描报告。
5. P2：通过 Fumadocs / typecheck / build 验证。
