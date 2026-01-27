import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench, Users, Code, Target, Layers, Zap } from "lucide-react";

const Workshops = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-background via-background to-accent/5">
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold">
            <span className="text-accent">Workshops</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Stub: Hands-on sessions to build real AI solutions for your business.
          </p>
        </div>
      </section>

      {/* What are Workshops */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="bg-card p-8 rounded-2xl shadow-lg">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Code className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Hands-On Building</h3>
                    <p className="text-sm text-muted-foreground">
                      Stub: Description of the practical, building-focused approach.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Layers className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Step-by-Step Guidance</h3>
                    <p className="text-sm text-muted-foreground">
                      Stub: Description of structured learning path.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Small Group Format</h3>
                    <p className="text-sm text-muted-foreground">
                      Stub: Description of intimate group setting for personalized help.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-bold">What are Workshops?</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Stub: Description of workshops and their hands-on nature.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Stub: Additional context about what participants will build and achieve.
              </p>
            </div>
          </div>

          {/* What You'll Build */}
          <div className="space-y-12">
            <h2 className="text-4xl font-bold text-center">What You'll Build</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-2 hover:border-accent transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-accent" />
                  </div>
                  <CardTitle>Stub: Workshop Topic 1</CardTitle>
                  <CardDescription className="text-base">
                    Stub: Description of what participants will build or learn.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-accent transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Stub: Workshop Topic 2</CardTitle>
                  <CardDescription className="text-base">
                    Stub: Description of what participants will build or learn.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-accent transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                    <Code className="w-6 h-6 text-accent" />
                  </div>
                  <CardTitle>Stub: Workshop Topic 3</CardTitle>
                  <CardDescription className="text-base">
                    Stub: Description of what participants will build or learn.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-accent transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Wrench className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Stub: Workshop Topic 4</CardTitle>
                  <CardDescription className="text-base">
                    Stub: Description of what participants will build or learn.
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
          <h2 className="text-4xl md:text-5xl font-bold">Ready to Build?</h2>
          <p className="text-xl opacity-90">
            Stub: Join our next workshop and start building AI solutions.
          </p>
          <a href="https://www.meetup.com/agents-and-founders/" target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="secondary" className="text-lg h-14 px-8 hover:scale-105 transition-transform">
              View Upcoming Workshops
              <Wrench className="ml-2 w-5 h-5" />
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Workshops;
