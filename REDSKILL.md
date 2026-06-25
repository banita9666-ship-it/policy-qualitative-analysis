# RedSkill Entry

Identifier: `policy-qualitative-analysis`

Use this skill when working with Chinese, English, or cross-lingual policy text analysis. It helps agents design research questions, collect policy corpora, build bilingual coding frameworks, validate reliability, compare policy tools, and draft Chinese or English academic reports.

## Install

If RedSkill CLI is already installed:

```bash
redskill install policy-qualitative-analysis
```

If RedSkill CLI is not installed, follow the official installer first:

```bash
curl -fsSL https://fe-video-qc.xhscdn.com/fe-platform-file/104101b8320fbjem2620653u0hejenq0004pf88g6ask5i.sh | bash
```

CLI-only install:

```bash
curl -fsSL https://fe-video-qc.xhscdn.com/fe-platform-file/104101b8320fbjem2620653u0hejenq0004pf88g6ask5i.sh | bash -s -- --cli-only
```

## Use

After installation, ask the agent:

```text
Use $policy-qualitative-analysis to design a bilingual policy text coding framework for Chinese and English policy documents.
```

For repository-local agents, read `AGENTS.md` or `CLAUDE.md`; both point to `policy-qualitative-analysis/SKILL.md`.

## Included Files

- `policy-qualitative-analysis/SKILL.md`: canonical skill instructions.
- `policy-qualitative-analysis/references/`: method references, templates, reliability rules, policy-type adaptation, and bilingual policy text adaptation.
- `AGENTS.md`: agent workspace entry.
- `CLAUDE.md`: Claude Code workspace entry.
