---
name: meetup-playbook-manager
description: Plan, announce, and document AI Business Roundtable sessions. Use when user wants to create meetup announcements, generate playbooks, or manage the complete workflow for AI business roundtable sessions. Handles multi-platform announcement generation (Meetup, WhatsApp, LinkedIn, Luma) and structured playbook creation with consistent formatting.
---

# Meetup & Playbook Manager

Streamline the complete workflow for AI Business Roundtable sessions: from planning and announcements to post-session playbook documentation.

## When to Use This Skill

Use this skill when the user wants to:
- Create announcements for a new roundtable session
- Generate platform-specific variations (Meetup, WhatsApp, LinkedIn, Luma)
- Create a playbook template after a session
- Follow the complete workflow from planning to publishing

## Quick Start

### Creating Announcements

Generate bilingual announcements for all platforms in one command:

```bash
python3 scripts/generate_announcement.py \
  --topic "Your Session Topic" \
  --date "Wednesday, January 22, 2024" \
  --location "Your Location" \
  --time "6:00 PM - 8:00 PM" \
  --meetup-link "https://meetup.com/your-group/events/12345" \
  --problem-statement "The pain point you're addressing..." \
  --what-well-cover "• Topic 1
• Topic 2  
• Topic 3" \
  --output-dir announcements
```

This creates **six** platform and language-specific announcements:
- **meetup_en**: English-only version
- **meetup_bilingual**: Full EN/ES version (recommended for Agents & Founders)
- **whatsapp_en**: Brief English message
- **whatsapp_es**: Personal Spanish message
- **linkedin**: Professional post with hashtags
- **luma**: Event-focused description

**Personalize WhatsApp messages:**
```bash
--recipient-name "Mary"  # Creates: "Hola Mary! Como estas?"
```

**See `references/announcement_examples.md` for real examples from past sessions**

### Creating Playbooks

Generate a profile-based playbook template after your session:

```bash
python3 scripts/generate_playbook.py \
  --topic "Your Session Topic" \
  --session-number 4 \
  --date "2024-01-20" \
  --location "Your Location" \
  --attendees "15" \
  --output-dir playbooks
```

This creates a structured markdown file with:
- **YAML frontmatter** (id, title, category, author, summary, metrics, icon, published, date)
- **Profile-based framework** (Builder/Optimizer/Strategist)
- **Consistent sections** (Introduction, Profiles, Common Mistakes, Getting Started, Key Takeaways)
- **Placeholder workflows** ready to fill with your session insights

**The profile framework:**
- **Builder** ⚙️: Organization & Hygiene (for those starting out)
- **Optimizer** 🔄: Automation & Agents (for those with systems)
- **Strategist** 📊: Insights & Forecasting (for those scaling)

**Interactive mode** (recommended for first-time users):
```bash
python3 scripts/generate_playbook.py --interactive
```

**See `references/playbook_writing_guide.md` for:**
- How to write in the Agents & Founders style
- Real examples from published playbooks
- Section templates and patterns
- Writing guidelines and tone

## Complete Workflow

### 1. Planning Phase
**User says:** "I want to plan my next roundtable session"

**Actions:**
1. Gather session details (topic, date, location, time)
2. Generate announcements using `generate_announcement.py`
3. Review generated announcements with user
4. Adjust tone/content for different WhatsApp groups if needed

**Output:** Platform-specific announcement files ready to post

### 2. Announcement Phase
**User says:** "Create announcements for [topic] on [date]"

**Actions:**
1. Run announcement generator with provided details
2. Present all four platform versions
3. Offer customizations:
   - Different WhatsApp variations for different groups
   - Custom hashtags for LinkedIn
   - Additional context or special notes

**Variations for WhatsApp groups:**
- Tech founders: Emphasize technical implementation
- General entrepreneurs: Focus on business value
- Local community: Highlight networking opportunities

### 3. Session Execution
**User says:** "Help me prepare for tomorrow's session"

**Actions:**
1. Review session topic and objectives
2. Suggest discussion points based on topic
3. Remind to take notes during session on:
   - Key insights shared
   - Action items identified
   - Resources mentioned
   - Case studies discussed

### 4. Playbook Creation
**User says:** "Create playbook for [topic] session" or "We just finished the session on [topic]"

**Actions:**
1. Generate playbook template using `generate_playbook.py`
2. Guide user through the **Builder/Optimizer/Strategist framework**:
   - **Builder Profile**: What foundational setups did you discuss?
   - **Optimizer Profile**: What automation agents or workflows emerged?
   - **Strategist Profile**: What strategic insights or forecasting methods?
3. Help structure each section with:
   - **Workflows**: Use arrow notation (Step → Step → Result)
   - **Named Techniques**: "The [Memorable Name]" pattern
   - **Specific Tools**: Exact recommendations, not generics
   - **AI Prompts**: Include copy-pasteable prompts
   - **Common Mistakes**: What traps did people mention?
4. Review for tone: Direct, prescriptive, no hedging
5. Prepare for website publishing

**Playbook Structure:**
- Opening hook with vivid metaphor
- Profile table (Pain/Goal for each type)
- 3 numbered sections per profile
- Common Mistakes section
- Getting Started (tools by user type)
- Key Takeaways (4-5 actionable points)

**See `references/playbook_writing_guide.md` for detailed examples and patterns**

## Platform-Specific Guidelines

### Meetup.com
- **Use bilingual version** (`meetup_bilingual`) for Agents & Founders
- Starts with problem statement (pain point)
- Structured with clear sections (Format, RSVP, etc.)
- Emphasizes confidential, small-group nature
- Include specific focus question for seating
- "Hola, Founders & Builders!" greeting
- End with "Come ready to build!"

### WhatsApp
- **Two versions**: English (general) and Spanish (personal)
- **General (EN)**: Brief, emoji bullets (✅), Meetup link
- **Personal (ES)**: Very casual, personal check-in first
  - "Hola [Name]! Como estas? Espero todo vaya bien!"
  - "Oye, vamos a tener otra sesión..."
  - Topic mention + link
  - "Nos vemos! 🚀"
- Keep under 10 lines
- Natural code-switching is OK

### LinkedIn  
- Professional but warm tone
- Problem → Solution structure
- Emphasize peer learning value
- Include 4-6 relevant hashtags
- Mention playbook as deliverable
- Encourage engagement (comments/DMs)

### Luma
- Event-focused format
- Highlight unique roundtable format
- Clear value proposition
- Professional but friendly
- Include post-session deliverable

## Bilingual Best Practices

### When to Use Each Language

**Meetup.com:**
- Always use bilingual version
- Full EN and ES sections separated by "---"
- Identical structure, natural translation (not word-for-word)

**WhatsApp:**
- English for general groups/announcements
- Spanish for personal messages and Latin American contacts
- Use `--recipient-name` for personalization

**LinkedIn:**
- Primarily English (wider reach)
- Can mention "bilingual community" in description

### Translation Tips

**Natural vs. Literal:**
- ✅ "Hola, Founders & Builders!" → "¡Hola, Founders y Builders!"
- ✅ "Come ready to build!" → "¡Ven preparado para construir!"
- ❌ Don't translate brand names ("Agents and Founders" stays in English)

**Code-Switching Patterns:**
- Tech terms stay in English: "AI", "dashboard", "automation"
- Action phrases in Spanish: "vamos a tener", "esta va a estar enfocada"
- Natural mixing: "usar automatización para tener mejor control"

**Tone Matching:**
- Formal announcements: "usted" form is OK but "tú" is warmer
- Personal messages: Always "tú" form
- Keep emoji usage consistent across languages

## Customization Tips

### Tailoring for Different Audiences

When creating announcements, consider the audience:

**For technical audiences:**
- Emphasize implementation details
- Mention technical depth
- Reference specific tools/frameworks

**For business-focused audiences:**
- Highlight ROI and business value
- Emphasize networking opportunities
- Focus on strategic insights

**For mixed audiences:**
- Balance technical and business perspectives
- Emphasize diverse learning opportunities
- Highlight community aspect

### Common Modifications

**Adding urgency:**
```bash
--additional-details "Only 5 spots remaining! RSVP soon to secure your seat."
```

**Highlighting special guests:**
```bash
--additional-details "Special guest: [Name], founder of [Company], will share their experience with [Topic]."
```

**Including prerequisites:**
```bash
--additional-details "Recommended: Basic familiarity with AI concepts. We'll dive into implementation details."
```

## File Naming Conventions

**Announcements:**
- Format: `{platform}_{timestamp}.txt`
- Example: `linkedin_20240120_143022.txt`

**Playbooks:**
- Format: `session-{number:02d}-{topic-slug}.md`
- Example: `session-05-building-ai-agents-for-customer-service.md`

## Quality Checklist

### Before Posting Announcements
- [ ] All dates and times are correct
- [ ] Location is accurate and clear
- [ ] Meetup link is included (for WhatsApp)
- [ ] Tone matches platform and audience
- [ ] Special details are included if relevant
- [ ] Hashtags are appropriate (LinkedIn)

### Before Publishing Playbook
- [ ] All sections are filled with content
- [ ] Links are working and relevant
- [ ] Case studies include permission from participants
- [ ] Action items are specific and actionable
- [ ] Takeaways provide real value
- [ ] Formatting is consistent
- [ ] YAML frontmatter is correct for website

## Troubleshooting

**Scripts not found:**
```bash
# Make sure you're in the skill directory
cd /path/to/meetup-playbook-manager
```

**Permission denied:**
```bash
chmod +x scripts/generate_announcement.py
chmod +x scripts/generate_playbook.py
```

**Want to modify templates:**
- Edit the templates directly in the Python scripts
- Look for `PLAYBOOK_TEMPLATE` or function definitions
- Modify text, add sections, change formatting

## Advanced Usage

### Batch Generation
Generate announcements for multiple sessions:
```bash
for topic in "Topic 1" "Topic 2" "Topic 3"; do
  python3 scripts/generate_announcement.py \
    --topic "$topic" \
    --date "TBD" \
    --location "TBD"
done
```

### Custom Templates
To create custom variations:
1. Copy the script to a new file
2. Modify the template functions
3. Save with descriptive name (e.g., `generate_announcement_enterprise.py`)

### Integration with Website
The playbook markdown files include YAML frontmatter compatible with static site generators like:
- Jekyll
- Hugo
- Gatsby
- Next.js

## Resources

See reference files for detailed guidance:

### references/workflow.md
- Complete workflow details (Planning → Announcement → Session → Playbook)
- Platform-specific strategies
- Seasonal and audience variations
- Distribution best practices

### references/announcement_examples.md
**Real examples from past Agents & Founders sessions:**
- Session 3: Financial Management (full bilingual announcement)
- WhatsApp variations (general EN, personal ES)
- Problem statement patterns that work
- Topic framing best practices
- Bilingual translation examples

### references/playbook_writing_guide.md
**Complete guide to writing Agents & Founders playbooks:**
- Builder/Optimizer/Strategist framework explained
- Real examples from "Automated Finances" playbook
- Section templates and patterns
- Writing style guidelines (tone, voice, structure)
- Workflows, named techniques, and AI prompts
- Checklist before publishing
