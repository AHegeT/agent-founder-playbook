import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, Video, Clock, ArrowRight, Play } from "lucide-react";

import { useTranslation } from "react-i18next";

const Webinars = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold">
            <span className="text-primary">Webinars</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Stub: Online sessions bringing AI insights directly to you.
          </p>
        </div>
      </section>

      {/* What are Webinars */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold">What are Webinars?</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Stub: Description of webinars and their purpose.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Stub: Additional context about webinar format and value.
              </p>
            </div>
            <div className="bg-card p-8 rounded-2xl shadow-lg">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Video className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Live & Recorded</h3>
                    <p className="text-sm text-muted-foreground">
                      Stub: Information about live sessions and recordings.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Expert Speakers</h3>
                    <p className="text-sm text-muted-foreground">
                      Stub: Information about webinar presenters.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Flexible Schedule</h3>
                    <p className="text-sm text-muted-foreground">
                      Stub: Information about timing and accessibility.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Webinars */}
          <div className="space-y-8 mb-20">
            <h2 className="text-4xl font-bold text-center">Upcoming Webinars</h2>
            <Card className="border-2 border-primary bg-gradient-to-br from-primary/5 to-accent/5 hover:shadow-xl transition-all">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-3xl">Stub: Webinar Title</CardTitle>
                    <CardDescription className="text-lg">
                      Stub: Webinar description and what attendees will learn.
                    </CardDescription>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90">
                    Register Now
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Stub: Date TBD</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Stub: Duration TBD</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Past Webinars */}
          <div className="space-y-12">
            <h2 className="text-4xl font-bold text-center">Past Webinars</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-2 hover:border-primary transition-all hover:shadow-lg h-full">
                <CardHeader>
                  <div className="flex items-center gap-2 text-primary mb-2">
                    <Play className="w-4 h-4" />
                    <span className="text-sm font-medium">Recording Available</span>
                  </div>
                  <CardTitle>Stub: Past Webinar Title 1</CardTitle>
                  <CardDescription>
                    Stub: Brief description of the past webinar topic.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-primary transition-all hover:shadow-lg h-full">
                <CardHeader>
                  <div className="flex items-center gap-2 text-primary mb-2">
                    <Play className="w-4 h-4" />
                    <span className="text-sm font-medium">Recording Available</span>
                  </div>
                  <CardTitle>Stub: Past Webinar Title 2</CardTitle>
                  <CardDescription>
                    Stub: Brief description of the past webinar topic.
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
          <h2 className="text-4xl md:text-5xl font-bold">Never Miss a Webinar</h2>
          <p className="text-xl opacity-90">
            Stub: Join our community to get notified about upcoming webinars.
          </p>
          <a href="https://www.meetup.com/agents-and-founders/" target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="secondary" className="text-lg h-14 px-8 hover:scale-105 transition-transform">
              Join the Community
              <Video className="ml-2 w-5 h-5" />
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Webinars;
