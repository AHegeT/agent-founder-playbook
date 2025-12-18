#!/usr/bin/env python3
"""
Generate structured playbook markdown files for AI Business Roundtable sessions.

Usage:
    python generate_playbook.py --topic "Topic" --date "Date" --session-number 5
    
Or interactively:
    python generate_playbook.py --interactive
"""

import argparse
from datetime import datetime
from pathlib import Path


PLAYBOOK_TEMPLATE = """---
id: {playbook_id}
title: {title}
category: {category}
author: {author}
summary: {summary}
metrics: {metrics}
icon: {icon}
published: true
date: {date}
---

# Playbook: {title}

{opening_hook}

## Introduction

{introduction}

### Which Profile Are You?
*Identify your current bottleneck to jump to the right section.*

| **The Builder** ⚙️ | **The Optimizer** 🔄 | **The Strategist** 📊 |
| :--- | :--- | :--- |
| **Pain:** {builder_pain} | **Pain:** {optimizer_pain} | **Pain:** {strategist_pain} |
| **Goal:** {builder_goal} | **Goal:** {optimizer_goal} | **Goal:** {strategist_goal} |

---

## ⚙️ Builder Profile
*Focus: {builder_focus}*

{builder_content}

---

## 🔄 Optimizer Profile
*Focus: {optimizer_focus}*

{optimizer_content}

---

## 📊 Strategist Profile
*Focus: {strategist_focus}*

{strategist_content}

---

## Common Mistakes

{common_mistakes}

---

## Getting Started

{tools_and_resources}

---

## Key Takeaways

{key_takeaways}

---

## About This Playbook

This playbook was developed from our **Agents & Founders Roundtable** session on {session_date}.

**Want to join the next session?** [RSVP here](https://www.meetup.com/agents-and-founders/)

**Session Details:**
- **Date:** {session_date}
- **Location:** {location}
- **Attendees:** {attendees} participants
- **Topic:** {topic}
"""


def generate_playbook(
    topic,
    session_number,
    date,
    location="TBD",
    attendees="TBD",
    author="Alan Hegewisch",
    category="Operations & Strategy",
    icon="Graph",
    opening_hook="",
    introduction="",
    builder_pain="",
    builder_goal="",
    builder_focus="",
    builder_content="",
    optimizer_pain="",
    optimizer_goal="",
    optimizer_focus="",
    optimizer_content="",
    strategist_pain="",
    strategist_goal="",
    strategist_focus="",
    strategist_content="",
    common_mistakes="",
    tools_and_resources="",
    key_takeaways=""
):
    """Generate a playbook from provided content using the Agents & Founders format."""
    
    # Generate playbook ID from topic
    playbook_id = topic.lower().replace(" ", "-").replace("&", "and")
    
    # Generate summary if not provided
    summary = f"A profile-based system for {topic.lower()}. Whether you are just getting started (Builder), automating workflows (Optimizer), or scaling strategically (Strategist), this guide has a specific workflow for you."
    
    # Calculate metrics placeholder
    metrics = "Save time and gain clarity with systematic automation"
    
    # Provide helpful placeholders if sections are empty
    if not opening_hook:
        opening_hook = f"""Most founders approach {topic.lower()} reactively, dealing with problems as they arise. This playbook is a system for moving from reaction to strategy.

*This is not about buying more tools; it's about building intelligent systems using insights from our Agents & Founders roundtable.*"""
    
    if not introduction:
        introduction = """The biggest mistake founders make is starting with the tool. The most successful automators start with the **answer**.

### The "Start by the End" Philosophy
Don't ask what software you need. Ask: *"What specific answer do I need?"* Work backwards from that insight to find the data and tools."""
    
    # Builder Profile defaults
    if not builder_pain:
        builder_pain = "Chaos. Everything is scattered and disorganized."
    if not builder_goal:
        builder_goal = "Clean Foundation."
    if not builder_focus:
        builder_focus = "Organization & Hygiene"
    if not builder_content:
        builder_content = """### 1. [First Step Title]
[Description of the core problem this solves]

* **The Workflow:** [Step 1] → [Step 2] → [Step 3]
* **The Tool:** [Recommended tool or approach]
* **The Rule:** [Key principle to follow]

### 2. [Second Step Title]
[Description]

* **The Workflow:** [Steps]
* **The Tool:** [Tool]

### 3. The Builder's Stack
* **[Category]:** [Specific tool recommendation]
* **[Category]:** [Specific tool recommendation]"""
    
    # Optimizer Profile defaults
    if not optimizer_pain:
        optimizer_pain = "Friction. You have a system, but it's manual and time-consuming."
    if not optimizer_goal:
        optimizer_goal = "Zero Manual Work."
    if not optimizer_focus:
        optimizer_focus = "Automation & Agents"
    if not optimizer_content:
        optimizer_content = """### 1. Agent 1: [Agent Name]
[What problem this agent solves]

* **The Workflow:** [Trigger] → [AI Processing] → [Automated Action]
* **The Tool:** [Specific tool recommendation]
* **The Rule:** [Key automation principle]

### 2. Agent 2: [Agent Name]
[What problem this agent solves]

* **The Workflow:** [Steps]
* **The Tool:** [Tool]

### 3. The Optimizer's Stack
* **[Category]:** [Tool] - [Why it's valuable]
* **[Category]:** [Tool] - [Why it's valuable]"""
    
    # Strategist Profile defaults
    if not strategist_pain:
        strategist_pain = "Blindness. You have data, but no insight or forecasting."
    if not strategist_goal:
        strategist_goal = "Decision Intelligence."
    if not strategist_focus:
        strategist_focus = "Insights & Forecasting"
    if not strategist_content:
        strategist_content = """### 1. [Insight System Name]
[What strategic question this answers]

* **The Workflow:** [Data Source] → [AI Analysis] → [Actionable Insight]
* **The Prompt:** *"[Example prompt for AI analysis]"*
* **The Insight:** [What you learn from this]

### 2. [Second System Name]
[Description]

* **The Workflow:** [Steps]
* **The Tool:** [Tool]

### 3. [Advanced Technique]
[Description and why it matters]"""
    
    # Common Mistakes defaults
    if not common_mistakes:
        common_mistakes = """### 1. The "Tool-First" Mistake
* **Mistake:** Buying software before understanding the workflow.
* **Fix:** Map the process on paper first. If you can't describe the logic, the software won't help.

### 2. The "Perfection Paralysis" Mistake
* **Mistake:** Trying to fix all historical data before starting.
* **Fix:** Draw a line in the sand. Build the perfect system for *new* data starting today.

### 3. The "Dashboard Trap" Mistake
* **Mistake:** Building beautiful dashboards that nobody uses.
* **Fix:** Build an **Alert System** instead. Get notified only when action is needed."""
    
    # Tools and Resources defaults
    if not tools_and_resources:
        tools_and_resources = """A curated list of tools discussed by the Builders, Optimizers, and Strategists in our group.

### The Low-Code Stack
* **n8n:** Open-source workflow automation
* **Make.com:** Visual automation platform
* **Zapier:** Quick integrations

### The No-Code Stack
* **[Tool Category]:** [Specific recommendations]
* **[Tool Category]:** [Specific recommendations]

### Essential Reading
* **[Book Title]:** [Why it's valuable]
* **[Resource]:** [Why it's valuable]"""
    
    # Key Takeaways defaults
    if not key_takeaways:
        key_takeaways = """1. **Start with the answer, not the tool.** Know what insight you need before choosing software.

2. **Match your profile.** Builders need organization, Optimizers need automation, Strategists need forecasting.

3. **Automate in layers.** Don't try to build everything at once. Start with the highest-friction task.

4. **Make it irreversible.** If you can manually override the system, you will. Design forcing functions."""
    
    return PLAYBOOK_TEMPLATE.format(
        playbook_id=playbook_id,
        title=topic,
        category=category,
        author=author,
        summary=summary,
        metrics=metrics,
        icon=icon,
        date=date,
        opening_hook=opening_hook,
        introduction=introduction,
        builder_pain=builder_pain,
        builder_goal=builder_goal,
        builder_focus=builder_focus,
        builder_content=builder_content,
        optimizer_pain=optimizer_pain,
        optimizer_goal=optimizer_goal,
        optimizer_focus=optimizer_focus,
        optimizer_content=optimizer_content,
        strategist_pain=strategist_pain,
        strategist_goal=strategist_goal,
        strategist_focus=strategist_focus,
        strategist_content=strategist_content,
        common_mistakes=common_mistakes,
        tools_and_resources=tools_and_resources,
        key_takeaways=key_takeaways,
        session_date=date,
        location=location,
        attendees=attendees,
        topic=topic
    )


def save_playbook(content, topic, session_number, output_dir="playbooks"):
    """Save playbook to a markdown file."""
    output_path = Path(output_dir)
    output_path.mkdir(exist_ok=True)
    
    # Create filename from topic (matching the ID format)
    playbook_id = topic.lower().replace(" ", "-").replace("&", "and")
    filename = output_path / f"{playbook_id}.md"
    
    with open(filename, "w") as f:
        f.write(content)
    
    print(f"✅ Playbook saved to {filename}")
    return filename


def interactive_mode():
    """Interactive mode for creating playbooks."""
    print("=== AI Business Roundtable Playbook Generator ===\n")
    
    topic = input("Session topic: ")
    session_number = int(input("Session number: "))
    date = input("Date (e.g., 'January 15, 2024'): ")
    location = input("Location: ")
    attendees = input("Number of attendees: ")
    
    print("\nGenerating playbook template...")
    
    playbook = generate_playbook(
        topic=topic,
        session_number=session_number,
        date=date,
        location=location,
        attendees=attendees
    )
    
    filename = save_playbook(playbook, topic, session_number)
    
    print(f"\n✅ Template created at {filename}")
    print("\nNext steps:")
    print("1. Open the file and fill in the bracketed sections")
    print("2. Add your debrief notes to each section")
    print("3. Review and publish to your website")


def main():
    parser = argparse.ArgumentParser(description="Generate playbook markdown files in Agents & Founders format")
    
    # Required fields
    parser.add_argument("--topic", help="Playbook title/topic")
    parser.add_argument("--session-number", type=int, help="Session number")
    parser.add_argument("--date", help="Session date")
    
    # Optional metadata
    parser.add_argument("--location", default="TBD", help="Session location")
    parser.add_argument("--attendees", default="TBD", help="Number of attendees")
    parser.add_argument("--author", default="Alan Hegewisch", help="Playbook author")
    parser.add_argument("--category", default="Operations & Strategy", help="Playbook category")
    parser.add_argument("--icon", default="Graph", help="Icon for playbook")
    parser.add_argument("--output-dir", default="playbooks", help="Output directory")
    parser.add_argument("--interactive", "-i", action="store_true", help="Run in interactive mode")
    
    # Content sections
    parser.add_argument("--opening-hook", default="", help="Opening hook paragraph")
    parser.add_argument("--introduction", default="", help="Introduction section")
    
    # Builder profile
    parser.add_argument("--builder-pain", default="", help="Builder pain point")
    parser.add_argument("--builder-goal", default="", help="Builder goal")
    parser.add_argument("--builder-focus", default="", help="Builder focus area")
    parser.add_argument("--builder-content", default="", help="Builder section content")
    
    # Optimizer profile
    parser.add_argument("--optimizer-pain", default="", help="Optimizer pain point")
    parser.add_argument("--optimizer-goal", default="", help="Optimizer goal")
    parser.add_argument("--optimizer-focus", default="", help="Optimizer focus area")
    parser.add_argument("--optimizer-content", default="", help="Optimizer section content")
    
    # Strategist profile
    parser.add_argument("--strategist-pain", default="", help="Strategist pain point")
    parser.add_argument("--strategist-goal", default="", help="Strategist goal")
    parser.add_argument("--strategist-focus", default="", help="Strategist focus area")
    parser.add_argument("--strategist-content", default="", help="Strategist section content")
    
    # Other sections
    parser.add_argument("--common-mistakes", default="", help="Common mistakes section")
    parser.add_argument("--tools", default="", help="Tools and resources section")
    parser.add_argument("--takeaways", default="", help="Key takeaways section")
    
    args = parser.parse_args()
    
    if args.interactive:
        interactive_mode()
        return
    
    if not all([args.topic, args.session_number, args.date]):
        parser.error("--topic, --session-number, and --date are required (or use --interactive)")
    
    # Generate playbook
    playbook = generate_playbook(
        topic=args.topic,
        session_number=args.session_number,
        date=args.date,
        location=args.location,
        attendees=args.attendees,
        author=args.author,
        category=args.category,
        icon=args.icon,
        opening_hook=args.opening_hook,
        introduction=args.introduction,
        builder_pain=args.builder_pain,
        builder_goal=args.builder_goal,
        builder_focus=args.builder_focus,
        builder_content=args.builder_content,
        optimizer_pain=args.optimizer_pain,
        optimizer_goal=args.optimizer_goal,
        optimizer_focus=args.optimizer_focus,
        optimizer_content=args.optimizer_content,
        strategist_pain=args.strategist_pain,
        strategist_goal=args.strategist_goal,
        strategist_focus=args.strategist_focus,
        strategist_content=args.strategist_content,
        common_mistakes=args.common_mistakes,
        tools_and_resources=args.tools,
        key_takeaways=args.takeaways
    )
    
    # Save playbook
    filename = save_playbook(playbook, args.topic, args.session_number, args.output_dir)
    
    print("\n✅ Playbook generated successfully!")
    print("\nYour playbook uses the Builder/Optimizer/Strategist framework.")
    print("Fill in each profile section with insights from your roundtable session.")
    print("\nNext steps:")
    print(f"1. Open {filename}")
    print("2. Fill in the profile sections with specific workflows and tools")
    print("3. Add real examples from attendees")
    print("4. Review and publish to your website")


if __name__ == "__main__":
    main()
