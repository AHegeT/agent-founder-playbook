#!/usr/bin/env python3
"""
Generate platform-specific announcements for AI Business meetups.

Usage:
    python generate_announcement.py --topic "Topic" --date "Date" --location "Location"
    
Generates announcements for:
- Meetup.com (full description)
- WhatsApp (brief with link)
- LinkedIn (professional tone)
- Luma (event-focused)
"""

import argparse
import json
from datetime import datetime
from pathlib import Path


def generate_meetup_announcement(topic, date, location, time, problem_statement="", what_well_cover="", additional_details="", bilingual=True):
    """Generate full Meetup.com announcement in English and optionally Spanish."""
    
    # English version
    en_announcement = f"""**EN:**

Hola, Founders & Builders!

{problem_statement if problem_statement else f"Our next session tackles a challenge many of us face: {topic}."}

Let's get practical: **How can we use AI and automation to solve this?**

This is a focused, confidential roundtable, not a lecture. We will break into small groups to explore:

{what_well_cover if what_well_cover else "• Practical tools and workflows\n• Real-world implementations\n• Community-sourced solutions"}

**The Format:** We will start with a focused exercise to help you identify your biggest challenges. Then, we will break into groups of 4 to crowdsource solutions and tools. We will swap groups halfway through to ensure you meet new peers and cross-pollinate ideas.

This is a proudly bilingual and multicultural community. We will flow between English and Spanish, so please feel free to speak in the language you feel most comfortable in.

**How to RSVP:** Spaces are limited. When you register, you will be asked a specific question about your current focus. Please answer this so we can seat you at a table with peers facing similar challenges.

Whether you are just getting started or scaling up, this is your space to build better systems.

RSVP now and come ready to build!

📅 **When:** {date} at {time}
📍 **Where:** {location}

{additional_details}"""

    if not bilingual:
        return en_announcement
    
    # Spanish version
    es_announcement = f"""

---

**ES:**

¡Hola, Founders y Builders!

{problem_statement if problem_statement else f"Nuestra próxima sesión aborda un desafío que muchos enfrentamos: {topic}."}

Pongámonos prácticos: **¿Cómo podemos usar la IA y la automatización para resolver esto?**

Esta es una mesa redonda confidencial y enfocada, no una conferencia. Nos dividiremos en grupos pequeños para explorar:

{what_well_cover if what_well_cover else "• Herramientas y flujos de trabajo prácticos\n• Implementaciones del mundo real\n• Soluciones provenientes de la comunidad"}

**Formato:** Comenzaremos con un ejercicio enfocado para ayudarte a identificar tus principales desafíos. Luego, nos dividiremos en grupos de 4 para buscar soluciones y herramientas de forma colaborativa. Cambiaremos de grupo a mitad de la sesión para asegurarnos de que conozcas a nuevos compañeros e intercambies ideas.

Esta es una comunidad orgullosamente bilingüe y multicultural. Hablaremos inglés y español, así que siéntete libre de hablar en el idioma que te resulte más cómodo.

**Cómo confirmar asistencia:** Las plazas son limitadas. Al registrarte, se te hará una pregunta específica sobre tu enfoque actual. Responde para que podamos sentarte en una mesa con compañeros que enfrentan desafíos similares.

Tanto si te estás organizando como si estás expandiendo tu negocio, este es tu espacio para construir sistemas mejores.

¡Regístrate ahora y ven preparado para construir!

📅 **Cuándo:** {date} a las {time}
📍 **Dónde:** {location}

{additional_details}"""
    
    return en_announcement + es_announcement


def generate_whatsapp_announcement(topic, date, location, meetup_link, recipient_name="", spanish=False):
    """Generate brief WhatsApp announcement with link."""
    
    if spanish:
        greeting = f"Hola {recipient_name}! Como estas? Espero todo vaya bien!" if recipient_name else "Hola!"
        return f"""{greeting}

Oye, vamos a tener otra sesión de Agents and Founders este {date}!

Esta va a estar enfocada en {topic.lower()}.

{meetup_link}

Nos vemos! 🚀"""
    else:
        greeting = f"Hey {recipient_name}!" if recipient_name else "Hello!"
        return f"""{greeting} Our next Agents & Founders roundtable is live!

This month, we are tackling: {topic}

Come ready to share and learn from peers.

👉 Grab your spot: {meetup_link}"""


def generate_linkedin_announcement(topic, date, location, time, hashtags=None):
    """Generate professional LinkedIn announcement."""
    if hashtags is None:
        hashtags = ["#AI", "#Entrepreneurship", "#Business", "#AIBusiness", "#Startups"]
    
    hashtag_str = " ".join(hashtags)
    
    return f"""Excited to announce our next AI Business Roundtable! 🚀

Topic: {topic}
Date: {date} at {time}
Location: {location}

This collaborative session brings together entrepreneurs and business leaders who are actively building with AI. We focus on real-world implementation, sharing experiences, and creating actionable playbooks.

What makes our roundtables unique:
→ Intimate group discussions (limited spots)
→ Real case studies from attendees
→ Published playbooks after each session
→ Supportive community of AI builders

Whether you're exploring AI opportunities or already implementing solutions, you'll gain practical insights you can apply immediately.

Comment below or DM me to learn more!

{hashtag_str}"""


def generate_luma_announcement(topic, date, location, time, additional_details=""):
    """Generate Luma event description."""
    return f"""Join us for an intimate AI Business Roundtable focused on {topic}.

🎯 What You'll Learn:
We'll explore real-world strategies for {topic.lower()}, sharing case studies and actionable insights from entrepreneurs who are building AI-powered businesses.

💡 Format:
This is a collaborative roundtable session where participants share experiences and learn from each other. We keep groups small to ensure meaningful discussion and networking.

📊 After the Session:
We publish detailed playbooks from each roundtable, documenting key insights, action items, and resources discussed.

👥 Who Should Attend:
• Entrepreneurs exploring AI opportunities
• Business owners implementing AI solutions  
• Anyone building AI-powered products or services

{additional_details}

This is part of our ongoing series helping entrepreneurs leverage AI to build and scale businesses. Join a community of builders who are actively implementing AI strategies.

Date: {date} at {time}
Location: {location}

Space is limited. Secure your spot today!"""


def generate_all_announcements(topic, date, location, time, meetup_link="", problem_statement="", what_well_cover="", additional_details="", hashtags=None, recipient_name="", bilingual=True):
    """Generate announcements for all platforms."""
    return {
        "meetup_en": generate_meetup_announcement(topic, date, location, time, problem_statement, what_well_cover, additional_details, bilingual=False),
        "meetup_bilingual": generate_meetup_announcement(topic, date, location, time, problem_statement, what_well_cover, additional_details, bilingual=True),
        "whatsapp_en": generate_whatsapp_announcement(topic, date, location, meetup_link, recipient_name, spanish=False),
        "whatsapp_es": generate_whatsapp_announcement(topic, date, location, meetup_link, recipient_name, spanish=True),
        "linkedin": generate_linkedin_announcement(topic, date, location, time, hashtags),
        "luma": generate_luma_announcement(topic, date, location, time, additional_details)
    }


def save_announcements(announcements, output_dir="announcements"):
    """Save announcements to individual files."""
    output_path = Path(output_dir)
    output_path.mkdir(exist_ok=True)
    
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    
    for platform, content in announcements.items():
        filename = output_path / f"{platform}_{timestamp}.txt"
        with open(filename, "w") as f:
            f.write(content)
        print(f"✅ Saved {platform} announcement to {filename}")


def main():
    parser = argparse.ArgumentParser(description="Generate platform-specific meetup announcements")
    parser.add_argument("--topic", required=True, help="Session topic")
    parser.add_argument("--date", required=True, help="Session date (e.g., 'Saturday, January 15')")
    parser.add_argument("--location", required=True, help="Session location")
    parser.add_argument("--time", default="10:00 AM - 12:00 PM", help="Session time")
    parser.add_argument("--meetup-link", default="", help="Meetup.com event link for WhatsApp")
    parser.add_argument("--problem-statement", default="", help="Opening problem statement for Meetup")
    parser.add_argument("--what-well-cover", default="", help="Bullet points of what will be covered")
    parser.add_argument("--additional-details", default="", help="Additional context or details")
    parser.add_argument("--hashtags", help="Comma-separated hashtags for LinkedIn")
    parser.add_argument("--recipient-name", default="", help="Name for personalized WhatsApp message")
    parser.add_argument("--output-dir", default="announcements", help="Output directory for announcements")
    parser.add_argument("--json-output", action="store_true", help="Also save as JSON")
    parser.add_argument("--no-bilingual", action="store_true", help="Skip bilingual Meetup announcement")
    
    args = parser.parse_args()
    
    # Parse hashtags if provided
    hashtags = None
    if args.hashtags:
        hashtags = [f"#{tag.strip().lstrip('#')}" for tag in args.hashtags.split(",")]
    
    # Generate all announcements
    announcements = generate_all_announcements(
        topic=args.topic,
        date=args.date,
        location=args.location,
        time=args.time,
        meetup_link=args.meetup_link,
        problem_statement=args.problem_statement,
        what_well_cover=args.what_well_cover,
        additional_details=args.additional_details,
        hashtags=hashtags,
        recipient_name=args.recipient_name,
        bilingual=not args.no_bilingual
    )
    
    # Save to files
    save_announcements(announcements, args.output_dir)
    
    # Optionally save as JSON
    if args.json_output:
        output_path = Path(args.output_dir)
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        json_file = output_path / f"all_announcements_{timestamp}.json"
        with open(json_file, "w") as f:
            json.dump(announcements, f, indent=2)
        print(f"✅ Saved JSON to {json_file}")
    
    print("\n📝 Announcements generated successfully!")
    print("\nNext steps:")
    print("1. Review the generated announcements")
    print("2. Customize as needed")
    print("3. Post to each platform")
    print("\nTip: Use --recipient-name for personalized WhatsApp messages!")


if __name__ == "__main__":
    main()
