import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Users, Target, Rocket } from "lucide-react";
import { Footer } from "@/components/Footer";
import alanImage from "@/assets/members/alan_hegewisch.jpeg";
import alejandroImage from "@/assets/members/alejandro_rivera.jpeg";
import agentKImage from "@/assets/agfou_banner_k.png";

interface TeamMember {
  name: string;
  role: string;
  company: string;
  groupRole: string;
  image: string;
  linkedin?: string;
  bio?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Alan Hegewisch",
    role: "Founder",
    company: "Sidekick Flow",
    groupRole: "Founder and Lead Orchestrator",
    image: alanImage,
    linkedin: "https://linkedin.com/in/alan-hegewisch",
    bio: "Software Engineer turned founder. I bridge the gap between complex code and business fundamentals, helping founders build systems that actually work.",
  },
  {
    name: "Agent K",
    role: "Chief Vibe Officer",
    company: "Agents & Founders",
    groupRole: "Community Guardian",
    image: agentKImage,
    bio: "Ensuring the community stays friendly and the code stays clean.",
  },
  {
    name: "Alejandro Rivera",
    role: "Operations & Automation Consultant",
    company: "Agents & Founders",
    groupRole: "Growth Lead",
    image: alejandroImage,
    linkedin: "https://www.linkedin.com/in/alejandro-rivera-96aba4206/",
    bio: "Systems Engineer dedicated to building automation that works in the real world. I specialize in turning complex operational challenges into streamlined, scalable systems that deliver value beyond the demo.",
  },
];

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "What is Agents & Founders?",
    answer: "A community group based in Mexico City focused on the intersection of entrepreneurship and AI automation. We are builders, developers, and founders.",
  },
  {
    question: "Who can join the community?",
    answer: "Anyone interested in business fundamentals and AI. Whether you are an accountant with a business idea, a furniture rental business, or an engineer looking for a partner, you are welcome.",
  },
  {
    question: "What events do you host?",
    answer: "We host strategic workshops like our '2026 Launchpad' and technical sessions on topics like 'Automating Research for Sales and Interviews'.",
  },
  {
    question: "How do I get started?",
    answer: "Join our next meetup or connect with us on social. We value organic growth and meaningful conversations over rapid networking.",
  },
  {
    question: "Is there a cost to join?",
    answer: "Currently, our community events are open to dedicated builders. Some workshops may have specific requirements.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold">
            About <span className="text-primary">Us</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            A practical community for builders and entrepreneurs. We combine business fundamentals with AI automation to create sustainable growth.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our mission is to help each other leverage AI to either start or grow your business. We share tools, resources, best practices and challenges.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We believe in community, sharing our skills with each other and action. We bring together founders who want to build real systems, not just talk about them.
              </p>
            </div>
            <div className="bg-card p-8 rounded-2xl shadow-lg">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Community First</h3>
                    <p className="text-sm text-muted-foreground">
                      Networking that respects your time. We believe in genuine connections, win-win collaboration and creating value over extraction.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Practical Results</h3>
                    <p className="text-sm text-muted-foreground">
                      We focus on the 'how-to.' From automating sales research to building personal CRMs, we leave every session with actionable workflows.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Rocket className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Growth Focused</h3>
                    <p className="text-sm text-muted-foreground">
                      Learning business fundamentals alongside new tech. We use new tools intentionally and focus on results over hype.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-primary/10">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Meet the Team</h2>
            <p className="text-lg text-muted-foreground">
              The people (and agents) behind the community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="border-2 hover:border-primary transition-all hover:shadow-lg w-full max-w-sm"
              >
                <CardContent className="p-6 text-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-primary/20"
                  />
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  {member.role && (
                    <p className="text-sm text-muted-foreground mb-1">
                      {member.role} @ {member.company}
                    </p>
                  )}
                  <p className="text-sm font-medium text-primary mb-3">
                    {member.groupRole}
                  </p>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      LinkedIn
                    </a>
                  )}
                  {member.bio && (
                    <p className="text-sm text-muted-foreground mb-4 italic">
                      "{member.bio}"
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-3xl space-y-6">
          <h2 className="text-4xl font-bold text-center">Our Story</h2>

          <blockquote className="relative bg-card rounded-2xl p-8 shadow-lg border-l-4 border-primary">
            <div className="absolute -top-4 left-6 text-6xl text-primary/20 font-serif">"</div>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                I was living in Austin and working for a startup when I noticed most people did not use AI beyond ChatGPT. I had friends in tech with great skills but barely tapping their potential and entrepreneur friends who were still spending 3 days each month doing their taxes. If only they could speak to each other...
              </p>
              <p>
                AI and automation tools can make entrepreneurship viable for more people. Before, it meant you needed to "go big or go home" and hype determined who got investors. Now, it's possible to stay lean, build a lifestyle business or for someone with a unique background to use tech to make their vision a reality.
              </p>
              <p>
                We are building a space where a founder can walk in with an idea and walk out with a deployed AI agent. Whether it's a PR workshop or a deep dive into lead automation, our vision is to make the technical accessible.
              </p>
            </div>
            <footer className="mt-6 flex items-center gap-3">
              <img
                src={alanImage}
                alt="Alan Hegewisch"
                className="w-12 h-12 rounded-full border-2 border-primary/20"
              />
              <div>
                <p className="font-semibold text-foreground">Alan Hegewisch</p>
                <p className="text-sm text-muted-foreground">Founder, Agents & Founders</p>
              </div>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-primary/10">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">
              Got questions? We've got answers.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="bg-card border-2 border-border rounded-lg px-6 data-[state=open]:border-primary"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
