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

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl">
            <div className="space-y-8">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight text-foreground">
                Stop Doing It All.{" "}
                <span className="text-primary">
                  Start Automating.
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                A private community for entrepreneurs leveraging AI to scale their business. Share what works. Skip what doesn't.
              </p>
              <Link to="/apply">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg h-12 px-8">
                  Apply to Join
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What is this Section */}
      <section className="py-20 px-4 border-t border-border">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-6">What is this?</h2>
          <p className="text-lg text-foreground leading-relaxed">
            We're <span className="font-semibold">Founders</span> acting as agents of change. 
            We build <span className="font-semibold">Agents</span> (AI-powered workflows) to grow our companies. 
            This is where we share the playbook—no fluff, just what actually works.
          </p>
        </div>
      </section>

      {/* Who is this for Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12">Who is this for?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border border-border hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-10 h-10 bg-primary/10 rounded flex items-center justify-center mb-3">
                  <Rocket className="w-5 h-5 text-primary" />
                </div>
                <CardTitle className="text-xl">Bootstrappers</CardTitle>
                <CardDescription className="text-base">
                  Build lean, automate smart, and scale without burning capital.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border border-border hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-10 h-10 bg-accent/10 rounded flex items-center justify-center mb-3">
                  <Building2 className="w-5 h-5 text-accent" />
                </div>
                <CardTitle className="text-xl">Agency Owners</CardTitle>
                <CardDescription className="text-base">
                  Deliver more value with AI workflows that wow clients and save time.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border border-border hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-10 h-10 bg-primary/10 rounded flex items-center justify-center mb-3">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <CardTitle className="text-xl">Product Founders</CardTitle>
                <CardDescription className="text-base">
                  Ship faster by automating ops, marketing, and customer success.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* What's Inside Section */}
      <section className="py-20 px-4 border-y border-border">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12">What's Inside?</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl">
            <div className="space-y-3">
              <Users className="w-10 h-10 text-primary" />
              <h3 className="text-xl font-semibold">Community</h3>
              <p className="text-muted-foreground">
                A private Slack with 100+ vetted founders sharing wins, fails, and everything in between.
              </p>
            </div>

            <div className="space-y-3">
              <Database className="w-10 h-10 text-primary" />
              <h3 className="text-xl font-semibold">Playbooks</h3>
              <p className="text-muted-foreground">
                Real-world AI workflows for marketing, sales, and ops. No theory, just what actually works.
              </p>
            </div>

            <div className="space-y-3">
              <Lightbulb className="w-10 h-10 text-primary" />
              <h3 className="text-xl font-semibold">Masterminds</h3>
              <p className="text-muted-foreground">
                Monthly deep-dives where members share their winning (and losing) experiments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Your Guide Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row items-start gap-8 bg-muted/30 p-8 rounded border border-border">
            <div className="w-16 h-16 bg-primary/10 rounded flex items-center justify-center flex-shrink-0">
              <Bot className="w-8 h-8 text-primary" />
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl font-bold">Meet Agent K</h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                Agent K curates the best tools and tactics so you don't have to wade through the noise. 
                Think of him as your guide through AI automation—practical, no-nonsense, always useful.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to automate your growth?</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Join 100+ founders who are already building smarter businesses with AI.
          </p>
          <Link to="/apply">
            <Button size="lg" variant="secondary" className="text-base h-12 px-8">
              Apply Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
