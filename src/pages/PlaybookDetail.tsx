import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { getPlaybookBySlug, type Playbook } from "@/lib/playbooks";
import { getIconByName } from "@/lib/playbookIcons";
import { PlaybookContent } from "@/components/PlaybookContent";
import { TableOfContents } from "@/components/TableOfContents";

const PlaybookDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [playbook, setPlaybook] = useState<Playbook | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPlaybook = async () => {
      if (!slug) return;

      try {
        const data = await getPlaybookBySlug(slug);
        setPlaybook(data);
      } catch (error) {
        console.error('Error loading playbook:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPlaybook();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-muted-foreground">Loading playbook...</p>
        </div>
      </div>
    );
  }

  if (!playbook) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <h1 className="text-4xl font-bold">Playbook Not Found</h1>
          <p className="text-xl text-muted-foreground">
            The playbook you're looking for doesn't exist.
          </p>
          <Link to="/playbooks">
            <Button>
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Playbooks
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = getIconByName(playbook.icon);

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Back Button */}
      <section className="px-4 py-6">
        <div className="container mx-auto max-w-7xl">
          <Link to="/playbooks">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Playbooks
            </Button>
          </Link>
        </div>
      </section>

      {/* Header */}
      <section className="px-4 pb-12">
        <div className="container mx-auto max-w-7xl">
          <div className="max-w-4xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
              <IconComponent className="w-8 h-8 text-primary" />
            </div>
            <Badge variant="secondary" className="text-sm">
              {playbook.category}
            </Badge>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            {playbook.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="text-sm">By {playbook.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">
                {new Date(playbook.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <p className="text-lg font-semibold text-primary">
                {playbook.metrics}
              </p>
            </CardContent>
          </Card>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
            <article className="max-w-4xl">
              <PlaybookContent content={playbook.content} />
            </article>
            <aside>
              <TableOfContents content={playbook.content} />
            </aside>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="px-4 mt-20">
        <div className="container mx-auto max-w-7xl">
          <div className="max-w-4xl">
          <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/20">
            <CardContent className="p-8 text-center space-y-4">
              <h3 className="text-2xl font-bold">Want More Playbooks Like This?</h3>
              <p className="text-muted-foreground">
                Join the Agents & Founders community to access exclusive playbooks and connect with fellow founders.
              </p>
              <a href="https://www.meetup.com/agents-and-founders/" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="mt-4">
                  Join the Community
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

export default PlaybookDetail;
