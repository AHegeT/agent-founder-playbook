# Playbook Writing Guide

This guide shows you how to write playbooks in the Agents & Founders format, using real examples from published playbooks.

## The Profile-Based Framework

Every Agents & Founders playbook uses the **Builder/Optimizer/Strategist** framework. This isn't arbitrary—it maps to where people actually are in their journey.

### The Three Profiles

**Builder ⚙️** - *Focus: Organization & Hygiene*
- **Pain:** Chaos, disorganization, scattered systems
- **Goal:** Clean foundation, proper setup
- **Mindset:** "I need to get organized first"
- **Solutions:** Basic workflows, simple tools, foundational processes

**Optimizer 🔄** - *Focus: Automation & Agents*
- **Pain:** Friction, manual work, repetitive tasks
- **Goal:** Zero manual typing/clicking
- **Mindset:** "I have a system but I'm a slave to it"
- **Solutions:** AI agents, automation workflows, intelligent routing

**Strategist 📊** - *Focus: Insights & Forecasting*
- **Pain:** Blindness, lack of strategic visibility
- **Goal:** Decision intelligence, predictive insights
- **Mindset:** "I have data but no foresight"
- **Solutions:** Analytics, forecasting, strategic frameworks

## Real Example: Automated Finances

From the session on financial management, here's how the framework was applied:

### Builder Pain Point
"Chaos. Receipts are in a shoebox. Personal & business funds are mixed."

**Why this works:** Visceral, specific image ("shoebox"). People immediately recognize themselves.

### Builder Goal
"Clean Data."

**Why this works:** Simple, actionable. Not "better financial management" (too vague).

### Builder Content Structure

```markdown
### 1. The "Golden Rule" Separation
You cannot automate a mess. [Explains the principle]

### 2. The "Statement Sanitizer" Workflow
Stop manually categorizing lines in Excel. [Specific solution]
* **The Workflow:** Export CSV → Upload to LLM → Clean Table
* **The Prompt:** "[Exact prompt to use]"

### 3. The Builder's Stack
* **Bank:** A dedicated account (non-negotiable)
* **Tool:** Wave Apps (Free)
```

**Notice:**
- Numbered sections (1, 2, 3)
- Named workflows with memorable titles ("Statement Sanitizer")
- Specific tools with clear recommendations
- Actual prompts you can copy-paste
- Workflows use arrows (→) for visual flow

## Writing Style Guidelines

### 1. Strong Opening Hook
❌ "Financial management is important for businesses."
✅ "Most founders run their finances like a lemonade stand—checking the bank app to see if there's money."

**Pattern:** Use vivid metaphor + common pain point

### 2. Direct, Punchy Language
❌ "It would be beneficial to consider automating this process."
✅ "If you are typing a receipt amount, the system is broken."

**Pattern:** Declarative statements, no hedging

### 3. Workflows with Arrows
❌ "First you export the data, then you upload it, then you get results."
✅ "Export CSV → Upload to LLM → Clean Table"

**Pattern:** Action → Action → Outcome

### 4. Named Techniques
❌ "You should separate your accounts."
✅ "The 'Golden Rule' Separation"

**Pattern:** Quotation marks + memorable name

### 5. Specific Prompts
Always include actual prompts people can use:

```markdown
**The Prompt:** *"Act as a ruthless CFO. Analyze this P&L. If my revenue drops 20% next month, exactly which expenses should I cut to stay profitable?"*
```

### 6. "The" Pattern
Use "The" to make concepts feel established:
- "The Receipt Bot" (not "A receipt bot")
- "The Collections Bot" (not "Collections automation")
- "The Dashboard Trap" (not "Dashboard trap")

## Section Templates

### Builder Section Template

```markdown
## ⚙️ Builder Profile
*Focus: [Organization/Foundation/Setup]*

### 1. [The Core Foundation]
[What foundational problem this solves]

* **The Workflow:** [Step] → [Step] → [Step]
* **The Tool:** [Specific tool name]
* **The Rule:** [Key principle to remember]

### 2. [The First Automation]
[Description]

* **The Workflow:** [Steps]
* **The Tool:** [Tool]

### 3. The Builder's Stack
* **[Category]:** [Specific recommendation] - [Why]
* **[Category]:** [Specific recommendation] - [Why]
```

### Optimizer Section Template

```markdown
## 🔄 Optimizer Profile
*Focus: Automation & Agents*

### 1. Agent 1: [Agent Name]
[What this agent automates]

* **The Workflow:** [Trigger] → [AI Processing] → [Action]
* **The Tool:** [Specific tool]
* **The Rule:** [Automation principle]

### 2. Agent 2: [Agent Name]
[Description]

### 3. [Advanced Technique]
For complex logic...
* **The Stack:** [Tools needed]
* **Why:** [Strategic reason]
```

### Strategist Section Template

```markdown
## 📊 Strategist Profile
*Focus: Insights & Forecasting*

### 1. [The Insight System]
[What strategic question this answers]

* **The Workflow:** [Data] → [Analysis] → [Insight]
* **The Prompt:** *"[Actual AI prompt to use]"*
* **The Insight:** [What you learn]

### 2. [The Forecasting Method]
[Description]

* **The Math:** [Formula or calculation]
* **The Insight:** [What it reveals]
```

## Common Mistakes Section

Always include this section. Format as:

```markdown
## Common Mistakes

### 1. The "[Mistake Name]" Trap
* **Mistake:** [What people do wrong]
* **Fix:** [Specific solution]

### 2. [Another Mistake]
* **Mistake:** [Description]
* **Fix:** [Solution]
```

**Examples from Automated Finances:**
- "The Dashboard Trap" - Building dashboards nobody uses
- "Migration Paralysis" - Trying to fix old data before starting
- "The App Fallacy" - Buying tools without fixing processes

## Getting Started Section

Curated tool recommendations organized by user type:

```markdown
## Getting Started

### The Low-Code Stack
* **[Tool]:** [What it does]
* **[Tool]:** [What it does]

### The No-Code Stack
* **[Tool]:** [What it does]

### Essential Reading
* **[Book/Resource]:** [Why it's valuable]
```

## Key Takeaways Section

4-5 numbered takeaways, each a complete sentence:

```markdown
## Key Takeaways

1. **Start with the answer, not the tool.** Know what insight you need before choosing software.

2. **Match your profile.** Builders need organization, Optimizers need automation, Strategists need forecasting.

3. **Automate in layers.** Don't try to build everything at once.
```

## Tone & Voice

### What to Do
✅ Use "you" (direct address)
✅ Use contractions (you're, it's, don't)
✅ Use vivid metaphors and examples
✅ Be prescriptive ("You must", "Never", "Always")
✅ Include specific tool names
✅ Give exact prompts and workflows

### What to Avoid
❌ Academic language ("It is recommended that...")
❌ Vague advice ("Consider improving your systems")
❌ Generic tools ("Use a CRM")
❌ No specifics ("Automate where possible")
❌ Hedging ("This might help")

## Real Examples of Good Writing

### From "Automated Finances"

**Opening Hook:**
> "Most founders run their finances like a lemonade stand—checking the bank app to see if there's money. This 'Bank Balance Accounting' is reactive and stressful."

**Strong Statement:**
> "You cannot automate a mess."

**Specific Workflow:**
> "Snap Photo / Forward Email → AI Extracts Data → Pushes to Ledger"

**Memorable Name:**
> "The Statement Sanitizer Workflow"

**Actual Prompt:**
> "I will paste a list of raw bank transactions. Please clean the descriptions (remove codes like 'UBER *TRIP'), categorize each expense into [List of Categories], and format it as a CSV table I can copy."

**Strategic Insight:**
> "Accounting looks backward (what you spent). Forecasting looks forward (when you run out)."

## Checklist Before Publishing

- [ ] Opening hook uses vivid metaphor
- [ ] Profile table clearly differentiates Pain/Goal for each type
- [ ] Each profile section has 3 numbered subsections
- [ ] Workflows use arrow notation (→)
- [ ] Specific tool names are mentioned
- [ ] At least one AI prompt is included
- [ ] Common Mistakes section exists
- [ ] Getting Started has tool recommendations
- [ ] Key Takeaways are numbered and actionable
- [ ] Tone is direct and prescriptive
- [ ] No hedging language ("might", "could", "consider")
- [ ] Emojis are used for profile headers (⚙️ 🔄 📊)

## Fill-In Template

When starting a new playbook, begin with this structure and fill it in:

1. **Identify the pain** - What's the visceral problem?
2. **Define the profiles** - How does this manifest for Builder/Optimizer/Strategist?
3. **Build workflows** - What are the specific step-by-step processes?
4. **Name techniques** - Give memorable names to your methods
5. **List tools** - Specific recommendations for each level
6. **Capture mistakes** - What traps do people fall into?
7. **Write takeaways** - 4-5 key principles

This framework works because it meets people where they are and gives them a clear path forward.
