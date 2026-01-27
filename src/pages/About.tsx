import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Users, Target, Rocket } from "lucide-react";
import { Footer } from "@/components/Footer";

interface TeamMember {
  name: string;
  role: string;
  company: string;
  groupRole: string;
  image: string;
  linkedin: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Team Member Name",
    role: "Job Title",
    company: "Company Name",
    groupRole: "Role in the Group",
    image: "https://api.dicebear.com/9.x/micah/svg?seed=founder1",
    linkedin: "https://linkedin.com/in/username",
  },
  // Add more team members here as the team grows
  // {
  //   name: "Second Member",
  //   role: "Job Title",
  //   company: "Company Name",
  //   groupRole: "Role in the Group",
  //   image: "https://api.dicebear.com/9.x/micah/svg?seed=founder2",
  //   linkedin: "https://linkedin.com/in/username",
  // },
  // {
  //   name: "Third Member",
  //   role: "Job Title",
  //   company: "Company Name",
  //   groupRole: "Role in the Group",
  //   image: "https://api.dicebear.com/9.x/micah/svg?seed=founder3",
  //   linkedin: "https://linkedin.com/in/username",
  // },
];

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "What is Agents & Founders?",
    answer: "Stub: Description of the community and its purpose.",
  },
  {
    question: "Who can join the community?",
    answer: "Stub: Information about membership eligibility and target audience.",
  },
  {
    question: "How do I get started?",
    answer: "Stub: Steps to join and get involved with the community.",
  },
  {
    question: "What events do you host?",
    answer: "Stub: Overview of roundtables, masterminds, and other community events.",
  },
  {
    question: "Is there a cost to join?",
    answer: "Stub: Information about membership fees or free access.",
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
            Building a community where founders and AI agents work together to scale businesses.
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
                Stub: Description of the community's mission and purpose.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Stub: Additional context about what drives the community forward.
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
                      Stub: Description of community value.
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
                      Stub: Description of practical focus.
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
                      Stub: Description of growth mindset.
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
              Stub: Brief intro about the team behind the community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
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
                  <p className="text-sm text-muted-foreground mb-1">
                    {member.role} at {member.company}
                  </p>
                  <p className="text-sm font-medium text-primary mb-4">
                    {member.groupRole}
                  </p>
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
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-3xl text-center space-y-6">
          <h2 className="text-4xl font-bold">Our Story</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Stub: The story of how Agents & Founders came to be.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Stub: The vision for where the community is headed.
          </p>
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
