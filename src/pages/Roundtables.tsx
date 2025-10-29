import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, Video, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import altataImage from "@/assets/altata.png";
import sirocoImage from "@/assets/siroco.png";

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
                Roundtables are small-group video sessions where 4-6 founders come together
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
                    <h3 className="font-semibold mb-1">4-6 Founders</h3>
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

          {/* Current Session */}
          <div className="space-y-8 mb-20">
            <h2 className="text-4xl font-bold text-center">Current Session</h2>
            <Card className="border-2 border-primary bg-gradient-to-br from-primary/5 to-accent/5 hover:shadow-xl transition-all">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-3xl">Intelligent Networking</CardTitle>
                    <CardDescription className="text-lg">
                      Master the art of building meaningful connections using AI-powered strategies
                    </CardDescription>
                  </div>
                  <Link to="/events/roundtables/intelligent-networking">
                    <Button className="bg-primary hover:bg-primary/90">
                      View Details
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Next session: Oct 29th, 2025</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>90 minutes</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Locations */}
          <div className="space-y-12 mb-20">
            <h2 className="text-4xl font-bold text-center">Locations</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-2 hover:border-primary transition-all hover:shadow-lg overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={altataImage}
                    alt="Altata Café"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>Altata Café</CardTitle>
                  <CardDescription className="text-base">
                    A sophisticated café in a hotel with an intimate vibe, perfect for deep conversations in Mexico City
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-primary transition-all hover:shadow-lg overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={sirocoImage}
                    alt="Siroco Pizza"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>Siroco Pizza</CardTitle>
                  <CardDescription className="text-base">
                    A delicious pizzeria owned by one of our members - the perfect place to share ideas and come together
                  </CardDescription>
                </CardHeader>
              </Card>
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
            Members get access to all roundtables. Apply now to join the community.
          </p>
          <a href="https://www.meetup.com/agents-and-founders/" target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="secondary" className="text-lg h-14 px-8 hover:scale-105 transition-transform">
              Apply Now
              <Calendar className="ml-2 w-5 h-5" />
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Roundtables;
