# Policy Qualitative Analysis Skill

面向 Codex 和 Claude Code 的政策文本质性与混合方法分析 skill，适用于中文公共政策文本研究、政策工具分析、PMC 指数评价、扎根理论编码、话语分析、社会网络分析和学术报告撰写。

## 内容

- `policy-qualitative-analysis/`：可安装的 skill 本体。
- `policy-qualitative-analysis/SKILL.md`：触发描述与核心工作流。
- `policy-qualitative-analysis/references/`：方法体系、框架模板、编码与信效度、报告规范、政策类型适配指南。
- `AGENTS.md`：Codex/agent 仓库级入口。
- `CLAUDE.md`：Claude Code 仓库级入口。

本仓库不包含示例工程和示例输出图，保持 skill 发布包简洁。

## Codex 接入

将 skill 文件夹复制到本机 Codex skills 目录：

```powershell
Copy-Item -Recurse .\policy-qualitative-analysis "$env:USERPROFILE\.codex\skills\policy-qualitative-analysis"
```

在 Codex 中显式调用：

```text
Use $policy-qualitative-analysis to design a coding framework for central-level education policy documents from 2015 to 2025.
```

## Claude Code 接入

Claude Code 可直接读取仓库根目录的 `CLAUDE.md`，该文件会指向本 skill。也可以把本 skill 当作项目级方法说明复制到其他项目：

```powershell
Copy-Item .\policy-qualitative-analysis\SKILL.md .\CLAUDE.md
```

或在 Claude Code 提示中指定：

```text
Read ./policy-qualitative-analysis/SKILL.md and follow it to design a policy qualitative analysis workflow.
```

需要更完整的上下文时，让 Claude Code 继续读取 `policy-qualitative-analysis/references/` 中与任务相关的文件。

## 适用场景

- 设计政策文本研究方案、样本筛选标准和分析流程。
- 选择内容分析、政策工具框架、PMC 指数、扎根理论、话语分析、叙事政策框架或社会网络分析。
- 构建政策工具、政策目标、政策主体、政策力度等编码框架。
- 编写编码手册、信效度检验方案和研究报告结构。
- 将政策分析结果组织为论文、学位论文章节或政策评估报告。

## 开源说明

本仓库发布的是方法论与工作流参考，不替代正式学术训练、导师意见、期刊规范或法律政策意见。使用时应结合具体政策领域、研究问题、样本来源和引用规范进行调整。

## License

MIT License. See [LICENSE](LICENSE).
