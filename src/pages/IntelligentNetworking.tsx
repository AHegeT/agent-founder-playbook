import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, MapPin, ExternalLink } from "lucide-react";

const IntelligentNetworking = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold">
              <span className="text-primary">Intelligent Networking</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Master the art of building meaningful connections using AI-powered strategies
            </p>
          </div>
        </div>
      </section>

      {/* Session Details */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl space-y-12">
          {/* Topic Breakdown */}
          <div className="space-y-6">
            <h2 id="session-overview" className="text-4xl font-bold">Session Overview</h2>
            <Card className="bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-2xl">What We'll Discuss</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  In this roundtable session, we'll explore how to leverage AI tools and strategies to build
                  more meaningful professional connections. We'll discuss practical approaches to networking
                  that go beyond traditional methods, like:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Using AI to research and personalize outreach</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Automating follow-ups while maintaining authenticity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Building systems to nurture long-term relationships</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Tools and workflows that actually work</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Session Playbook */}
          <div className="space-y-6">
            <h2 id="session-playbook" className="text-4xl font-bold">Session Playbook</h2>
            <Card className="bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-2xl">Networking Strategies & Resources</CardTitle>
              </CardHeader>
              <CardContent className="py-12">
                <div className="text-center space-y-4">
                  <div className="inline-block px-6 py-2 bg-primary/10 rounded-full">
                    <span className="text-primary font-semibold text-lg">Coming Soon</span>
                  </div>
                  <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    A comprehensive guide with tools, templates, and actionable strategies from our intelligent networking sessions.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RSVP Section */}
          <div className="space-y-6">
            <h2 id="join-the-session" className="text-4xl font-bold">Join the Session</h2>
            <Card className="border-2 border-primary">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-semibold">RSVP on Meetup</h3>
                    <p className="text-muted-foreground">
                      Reserve your spot for this roundtable session
                    </p>
                    <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>Date: Oct 29th, 2025</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>Limited to 20-30 founders</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>Location: Siroco Pizza</span>
                      </div>
                    </div>
                  </div>
                  <a href="https://www.meetup.com/agents-and-founders/events/311627729" target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg h-14 px-8">
                      RSVP on Meetup
                      <ExternalLink className="ml-2 w-5 h-5" />
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Slido Interactive Session */}
          <div className="space-y-6">
            <h2 id="join-the-conversation" className="text-4xl font-bold">Join the Conversation</h2>
            <Card className="border-2 border-accent">
              <CardHeader>
                <CardTitle>Live Q&A and Polls via Slido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Join our interactive session to ask questions, participate in polls, and engage with other founders in real-time.
                </p>
                <a href="https://app.sli.do/event/mbvtbo8674RnCX4vLi1q5J" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-accent hover:bg-accent/90">
                    Join Slido Session
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Pre-Event Poll */}
          {/* <div className="space-y-6">
            <h2 className="text-4xl font-bold">Pre-Event Poll</h2>
            <Card>
              <CardHeader>
                <CardTitle>Share Your Networking Challenges</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Help us tailor the session by sharing what you'd like to learn and the challenges you're facing with networking.
                </p>
                <a href="https://forms.gle/DKeCr1jsDzQ7PirFA" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-primary hover:bg-primary/90">
                    Complete Pre-Event Survey
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div> */}

          {/* Connect with the Community */}
          <div className="space-y-6">
            <h2 id="connect-with-the-community" className="text-4xl font-bold">Connect with the Community</h2>
            <Card>
              <CardHeader>
                <CardTitle>Join Our Founder Community</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Stay connected with fellow founders, share insights, and continue the conversation beyond the roundtable sessions.
                </p>
                <a href="https://forms.gle/DKeCr1jsDzQ7PirFA" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-primary hover:bg-primary/90">
                    Connect with the Community
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IntelligentNetworking;
