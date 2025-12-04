import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import comingSoon from "@/assets/coming_soon.png";
import { useTranslation } from "@/hooks/useTranslation";
import { getPublishedPlaybooks, type Playbook } from "@/lib/playbooks";
import { getIconByName } from "@/lib/playbookIcons";

const Playbooks = () => {
  const { t } = useTranslation();
  const [playbooks, setPlaybooks] = useState<Playbook[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPlaybooks = async () => {
      try {
        const publishedPlaybooks = await getPublishedPlaybooks();
        console.log('Loaded playbooks:', publishedPlaybooks);
        setPlaybooks(publishedPlaybooks);
      } catch (error) {
        console.error('Error loading playbooks:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPlaybooks();
  }, []);
  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Header */}
      <section className="px-4 mb-16">
        <div className="container mx-auto text-center space-y-6 max-w-3xl">
          <h1 className="text-5xl font-bold">
            {t.playbooks.hero.title}{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t.playbooks.hero.titleHighlight}
            </span>
          </h1>
          <p className="text-xl text-muted-foreground">
            {t.playbooks.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Published Playbooks Grid */}
      <section className="px-4 mb-20">
        <div className="container mx-auto max-w-6xl">
          {loading ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">Loading playbooks...</p>
            </div>
          ) : playbooks.length > 0 ? (
            <>
              <h2 className="text-3xl font-bold mb-8">Available Now</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {playbooks.map((playbook) => {
                  const IconComponent = getIconByName(playbook.icon);
                  return (
                    <Link
                      key={playbook.id}
                      to={`/playbooks/${playbook.slug}`}
                      className="block group"
                    >
                      <Card className="border-2 hover:border-primary transition-all hover:shadow-lg h-full">
                        <CardHeader>
                          <div className="flex items-start justify-between mb-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                              <IconComponent className="w-6 h-6 text-primary" />
                            </div>
                            <Badge variant="secondary">{playbook.category}</Badge>
                          </div>
                          <CardTitle className="text-xl group-hover:text-primary transition-colors">
                            {playbook.title}
                          </CardTitle>
                          <CardDescription className="text-sm text-muted-foreground mt-2">
                            By {playbook.author}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {playbook.summary}
                          </p>
                          <div className="pt-4 border-t">
                            <p className="text-xs font-semibold text-primary">
                              {playbook.metrics}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-primary font-medium">
                            Read playbook
                            <ExternalLink className="w-4 h-4" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </>
          ) : null}
        </div>
      </section>
    </div>
  );
};

export default Playbooks;
