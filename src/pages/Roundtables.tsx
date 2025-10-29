import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Calendar, Users, Video, Clock } from "lucide-react";

const Roundtables = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold">
            <span className="text-primary">Roundtables</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Join intimate discussions with fellow founders to tackle real challenges,
            share insights, and accelerate your AI automation journey.
          </p>
        </div>
      </section>

      {/* What are Roundtables */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold">What are Roundtables?</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Roundtables are small-group video sessions where 6-8 founders come together
                to discuss specific challenges, share what's working, and provide actionable
                feedback to each other.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Unlike traditional networking, these are focused working sessions designed
                to help you solve real problems and implement AI solutions faster.
              </p>
            </div>
            <div className="bg-card p-8 rounded-2xl shadow-lg">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">90-Minute Sessions</h3>
                    <p className="text-sm text-muted-foreground">
                      Focused time to dive deep into specific topics
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">6-8 Founders</h3>
                    <p className="text-sm text-muted-foreground">
                      Small groups for meaningful conversation
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Video className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Live & Interactive</h3>
                    <p className="text-sm text-muted-foreground">
                      Real-time collaboration via video
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Topics */}
          <div className="space-y-12">
            <h2 className="text-4xl font-bold text-center">Recent Topics</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-2 hover:border-primary transition-all hover:shadow-lg">
                <CardHeader>
                  <CardTitle>AI for Customer Support</CardTitle>
                  <CardDescription>
                    Building automated support workflows that actually help customers
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-primary transition-all hover:shadow-lg">
                <CardHeader>
                  <CardTitle>Content Automation</CardTitle>
                  <CardDescription>
                    Scaling your content creation without losing your brand voice
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-primary transition-all hover:shadow-lg">
                <CardHeader>
                  <CardTitle>Sales Automation</CardTitle>
                  <CardDescription>
                    Using AI to qualify leads and accelerate your sales cycle
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-white">
        <div className="container mx-auto text-center space-y-8 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold">Join the Next Roundtable</h2>
          <p className="text-xl opacity-90">
            Members get access to all roundtables. Apply to join the community.
          </p>
          <Link to="/apply">
            <Button size="lg" variant="secondary" className="text-lg h-14 px-8 hover:scale-105 transition-transform">
              Apply to Join
              <Calendar className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Roundtables;
