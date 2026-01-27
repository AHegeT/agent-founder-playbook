import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Rocket, LinkedinIcon } from "lucide-react";
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
      <section className="py-20 px-4 bg-secondary/30">
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
                    <LinkedinIcon className="w-4 h-4" />
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

      <Footer />
    </div>
  );
};

export default About;
