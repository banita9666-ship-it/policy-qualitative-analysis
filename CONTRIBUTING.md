# Contributing

欢迎补充政策文本分析方法、编码框架、报告模板和案例。

## 原则

- 保持 `SKILL.md` 精简，只放触发后必须执行的核心流程。
- 详细方法、模板和领域差异放入 `references/`，并从 `SKILL.md` 明确指向。
- 不提交真实未脱敏研究数据、受版权限制的政策数据库导出、个人信息或未授权材料。
- 示例必须标明是否为模拟数据。
- 新增方法建议附上经典来源或常用引用线索。

## 提交前检查

```powershell
python "$env:USERPROFILE\.codex\skills\.system\skill-creator\scripts\quick_validate.py" .\policy-text-qualitative-analysis
```

如果校验失败，先修复 `SKILL.md` frontmatter、命名或目录问题。
