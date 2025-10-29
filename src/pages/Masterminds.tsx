import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Lightbulb, Users, TrendingUp, Target, MessageSquare } from "lucide-react";

const Masterminds = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-background via-background to-accent/5">
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold">
            <span className="text-accent">Masterminds</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Monthly deep-dive sessions where members share their winning (and losing)
            experiments with AI automation.
          </p>
        </div>
      </section>

      {/* What are Masterminds */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="bg-card p-8 rounded-2xl shadow-lg">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Real Experiments</h3>
                    <p className="text-sm text-muted-foreground">
                      Learn from actual implementations, not theory
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Results & Metrics</h3>
                    <p className="text-sm text-muted-foreground">
                      See the actual ROI and impact of AI workflows
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Community Learning</h3>
                    <p className="text-sm text-muted-foreground">
                      Collective wisdom from diverse founder experiences
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-bold">What are Masterminds?</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Masterminds are monthly gatherings where members present case studies of their
                AI automation projects. These aren't polished talks—they're raw, honest breakdowns
                of what worked, what didn't, and what they learned along the way.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Each session features 2-3 member presentations followed by group discussion,
                Q&A, and collaborative problem-solving.
              </p>
            </div>
          </div>

          {/* What You'll Learn */}
          <div className="space-y-12">
            <h2 className="text-4xl font-bold text-center">What You'll Learn</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-2 hover:border-accent transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-accent" />
                  </div>
                  <CardTitle>Implementation Strategies</CardTitle>
                  <CardDescription className="text-base">
                    Step-by-step breakdowns of how members built and deployed their AI workflows
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-accent transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>ROI & Business Impact</CardTitle>
                  <CardDescription className="text-base">
                    Real numbers on time saved, revenue generated, and costs reduced
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-accent transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                    <Lightbulb className="w-6 h-6 text-accent" />
                  </div>
                  <CardTitle>Lessons from Failures</CardTitle>
                  <CardDescription className="text-base">
                    Honest discussions about what didn't work and why, so you can avoid the same mistakes
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-accent transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <MessageSquare className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Tool Recommendations</CardTitle>
                  <CardDescription className="text-base">
                    Vetted recommendations for AI platforms, automation tools, and integrations
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-accent text-white">
        <div className="container mx-auto text-center space-y-8 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold">Join the Next Mastermind</h2>
          <p className="text-xl opacity-90">
            Get exclusive access to member case studies and collective founder wisdom.
          </p>
          <Link to="/apply">
            <Button size="lg" variant="secondary" className="text-lg h-14 px-8 hover:scale-105 transition-transform">
              Apply to Join
              <Lightbulb className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Masterminds;
