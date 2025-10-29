import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  Zap, 
  Users, 
  BookOpen, 
  Lightbulb, 
  TrendingUp, 
  Building2, 
  Rocket,
  Bot,
  Database,
  MessageSquare
} from "lucide-react";
import agentKMascot from "@/assets/agent-k-mascot.png";
import "./Home.css";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Stop Doing It All.{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Start Automating.
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Agents and Founders is the private community for entrepreneurs leveraging AI to scale their business.
              </p>
              <Link to="/apply">
                <Button size="lg" className="bg-primary hover:bg-primary/90 transition-all hover:scale-105 text-lg h-14 px-8">
                  Apply to Join
                  <Zap className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
            <div className="flex justify-center">
              <img 
                src={agentKMascot} 
                alt="Agent K Mascot" 
                className="w-full max-w-md animate-float"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What is this Section */}
      <section className="py-20 px-4 bg-card">
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <h2 className="text-4xl font-bold">What is this?</h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            We're <span className="text-primary font-semibold">Founders</span> acting as agents of change. 
            We build <span className="text-accent font-semibold">Agents</span> (AI-powered workflows) to grow our companies. 
            This is where we share the playbook.
          </p>
        </div>
      </section>

      {/* Who is this for Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Who is this for?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-primary transition-all hover:shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Rocket className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>For Bootstrappers</CardTitle>
                <CardDescription className="text-base">
                  Build lean, automate smart, and scale without burning capital.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary transition-all hover:shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Building2 className="w-6 h-6 text-accent" />
                </div>
                <CardTitle>For Agency Owners</CardTitle>
                <CardDescription className="text-base">
                  Deliver more value with AI workflows that wow clients and save time.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary transition-all hover:shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>For Product Founders</CardTitle>
                <CardDescription className="text-base">
                  Ship faster by automating ops, marketing, and customer success.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* What's Inside Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">What's Inside?</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="bg-card/50 backdrop-blur">
              <CardHeader>
                <Users className="w-12 h-12 text-primary mb-4" />
                <CardTitle className="text-2xl">Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  A private Slack/Discord with 100+ vetted founders sharing wins, fails, and everything in between.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur">
              <CardHeader>
                <Database className="w-12 h-12 text-accent mb-4" />
                <CardTitle className="text-2xl">Playbooks</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  A private database of real-world AI workflows for marketing, sales, and ops that actually work.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur">
              <CardHeader>
                <Lightbulb className="w-12 h-12 text-primary mb-4" />
                <CardTitle className="text-2xl">Masterminds</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Monthly deep-dives where members share their winning (and losing) experiments.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Meet Your Guide Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row items-center gap-12 bg-card p-8 rounded-2xl shadow-xl">
            <div className="w-48 h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Bot className="w-24 h-24 text-primary" />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Meet Agent K</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Agent K is your community's friendly AI strategist. He curates the best tools and tactics 
                so you don't have to. Think of him as your personal guide through the chaos of AI automation—
                always one step ahead, never overwhelming.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-primary text-white">
        <div className="container mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold">Ready to automate your growth?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Join 100+ founders who are already building the future with AI.
          </p>
          <Link to="/apply">
            <Button size="lg" variant="secondary" className="text-lg h-14 px-8 hover:scale-105 transition-transform">
              Apply Now
              <MessageSquare className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
