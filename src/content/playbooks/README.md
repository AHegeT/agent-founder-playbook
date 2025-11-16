# Playbooks Directory

This directory contains all the playbook markdown files that will be dynamically loaded and displayed on the website.

## File Structure

Each playbook is a markdown file (`.md`) with frontmatter metadata at the top.

### Example Structure

```markdown
---
id: unique-playbook-id
title: Your Playbook Title
category: Operations | Marketing | Sales | Support | Strategy
author: Author Name
summary: A brief 1-2 sentence summary of the playbook
metrics: Key results or metrics (e.g., "3x faster onboarding, 90% less manual work")
icon: Users | TrendingUp | Target | Mail | MessageSquare | Zap
published: true | false
date: YYYY-MM-DD
---

# Your Playbook Content Starts Here

Write your playbook content in markdown...
```

## Frontmatter Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `id` | string | Unique identifier for the playbook | `client-onboarding-automation` |
| `title` | string | Display title of the playbook | `How Sarah automated her entire client onboarding` |
| `category` | string | Category for filtering/grouping | `Operations`, `Marketing`, `Sales`, etc. |
| `author` | string | Author name | `Sarah Chen` |
| `summary` | string | Brief description shown on card | `From lead to signed contract in 24 hours...` |
| `metrics` | string | Key results/impact | `3x faster onboarding, 90% less manual work` |
| `icon` | string | Icon name from available icons | `Users`, `Target`, `Zap`, etc. |
| `published` | boolean | Whether to show on site | `true` or `false` |
| `date` | string | Publication date (ISO format) | `2024-01-15` |

## Available Icons

- `Users` - For team/people-related playbooks
- `TrendingUp` - For growth/scaling playbooks
- `Target` - For sales/goal-oriented playbooks
- `Mail` - For email/communication playbooks
- `MessageSquare` - For support/messaging playbooks
- `Zap` - For automation/efficiency playbooks

## Publishing Workflow

### Draft (unpublished)
Set `published: false` in the frontmatter to keep a playbook as a draft. It won't appear on the website.

### Published
Set `published: true` to make the playbook visible on the website.

## File Naming Convention

Use lowercase with hyphens for filenames:
- ✅ `client-onboarding-automation.md`
- ✅ `ai-powered-lead-generation.md`
- ❌ `Client Onboarding.md`
- ❌ `AI_Powered_LeadGen.md`

The filename becomes the URL slug (e.g., `/playbooks/client-onboarding-automation`)

## Markdown Features Supported

- Headings (`#`, `##`, `###`, etc.)
- Bold (`**bold**`) and italic (`*italic*`)
- Lists (bulleted and numbered)
- Links (`[text](url)`)
- Code blocks with syntax highlighting
- Tables (GitHub Flavored Markdown)
- Blockquotes
- Horizontal rules

## Example Playbook

See `client-onboarding-automation.md` for a complete example with:
- Proper frontmatter
- Well-structured sections
- Real-world examples
- Implementation guides
- Pro tips and common pitfalls

## Adding a New Playbook

1. Create a new `.md` file in this directory
2. Add frontmatter at the top (copy from an example)
3. Write your content in markdown
4. Set `published: false` while drafting
5. When ready, set `published: true`
6. The playbook will automatically appear on the website!

No code changes needed - just create the markdown file!
