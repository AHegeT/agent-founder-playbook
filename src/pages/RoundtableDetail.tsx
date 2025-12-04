import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, MapPin, ExternalLink, ArrowLeft } from "lucide-react";
import { getRoundtableBySlug, type Roundtable } from "@/lib/roundtables";
import ReactMarkdown from "react-markdown";

const RoundtableDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [roundtable, setRoundtable] = useState<Roundtable | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRoundtable = async () => {
      if (!slug) return;

      try {
        const data = await getRoundtableBySlug(slug);
        console.log('Loaded roundtable:', data);
        setRoundtable(data);
      } catch (error) {
        console.error('Error loading roundtable:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRoundtable();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-muted-foreground">Loading session...</p>
        </div>
      </div>
    );
  }

  if (!roundtable) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <h1 className="text-4xl font-bold">Session Not Found</h1>
          <p className="text-xl text-muted-foreground">
            The roundtable session you're looking for doesn't exist.
          </p>
          <Link to="/events/roundtables">
            <Button>
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Roundtables
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-6">
            <Link to="/events/roundtables">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Roundtables
              </Button>
            </Link>
          </div>
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold">
              <span className="text-primary">{roundtable.title}</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {roundtable.description}
            </p>
          </div>
        </div>
      </section>

      {/* Session Details */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl space-y-12">
          {/* Markdown Content */}
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <ReactMarkdown>{roundtable.content}</ReactMarkdown>
          </div>

          {/* RSVP Section */}
          {roundtable.meetupUrl && (
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
                          <span>{roundtable.nextSession}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>Limited to 20-30 founders</span>
                        </div>
                        {roundtable.location && (
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>Location: {roundtable.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <a href={roundtable.meetupUrl} target="_blank" rel="noopener noreferrer">
                      <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg h-14 px-8">
                        RSVP on Meetup
                        <ExternalLink className="ml-2 w-5 h-5" />
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Slido Interactive Session */}
          {roundtable.slidoUrl && (
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
                  <a href={roundtable.slidoUrl} target="_blank" rel="noopener noreferrer">
                    <Button className="bg-accent hover:bg-accent/90">
                      Join Slido Session
                      <ExternalLink className="ml-2 w-4 h-4" />
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>
          )}

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

export default RoundtableDetail;
