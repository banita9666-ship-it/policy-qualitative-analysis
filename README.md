# Policy Text Qualitative Analysis Skill

面向 Codex 的政策文本质性与混合方法分析 skill，适用于中文公共政策文本研究、政策工具分析、PMC 指数评价、扎根理论编码、话语分析、社会网络分析和学术报告撰写。

## 内容

- `policy-text-qualitative-analysis/`：可安装的 Codex skill 本体。
- `policy-text-qualitative-analysis/SKILL.md`：触发描述与核心工作流。
- `policy-text-qualitative-analysis/references/`：方法体系、框架模板、编码与信效度、报告规范、政策类型适配指南。
- `examples/`：示例可视化面板和示例输出图。示例数据为模拟数据，仅用于展示 skill 方法论如何映射到可视化产出。

## 安装

将 skill 文件夹复制到本机 Codex skills 目录：

```powershell
Copy-Item -Recurse .\policy-text-qualitative-analysis "$env:USERPROFILE\.codex\skills\policy-text-qualitative-analysis"
```

也可以在 Codex 中显式调用：

```text
Use $policy-text-qualitative-analysis to design a coding framework for central-level education policy documents from 2015 to 2025.
```

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
