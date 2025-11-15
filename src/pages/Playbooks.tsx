import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lock, TrendingUp, Users, Zap, Target, Mail, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import comingSoon from "@/assets/coming_soon.png";
import { useTranslation } from "@/hooks/useTranslation";

const Playbooks = () => {
  const { t } = useTranslation();

  // Playbook examples data
  const playbooks = [
    {
      id: 1,
      title: t.playbooks.examples.clientOnboarding.title,
      category: t.playbooks.examples.clientOnboarding.category,
      author: t.playbooks.examples.clientOnboarding.author,
      summary: t.playbooks.examples.clientOnboarding.summary,
      metrics: t.playbooks.examples.clientOnboarding.metrics,
      icon: Users,
      locked: true
    },
    {
      id: 2,
      title: t.playbooks.examples.contentOutput.title,
      category: t.playbooks.examples.contentOutput.category,
      author: t.playbooks.examples.contentOutput.author,
      summary: t.playbooks.examples.contentOutput.summary,
      metrics: t.playbooks.examples.contentOutput.metrics,
      icon: TrendingUp,
      locked: true
    },
    {
      id: 3,
      title: t.playbooks.examples.leadGen.title,
      category: t.playbooks.examples.leadGen.category,
      author: t.playbooks.examples.leadGen.author,
      summary: t.playbooks.examples.leadGen.summary,
      metrics: t.playbooks.examples.leadGen.metrics,
      icon: Target,
      locked: true
    },
    {
      id: 4,
      title: t.playbooks.examples.customerSupport.title,
      category: t.playbooks.examples.customerSupport.category,
      author: t.playbooks.examples.customerSupport.author,
      summary: t.playbooks.examples.customerSupport.summary,
      metrics: t.playbooks.examples.customerSupport.metrics,
      icon: MessageSquare,
      locked: true
    },
    {
      id: 5,
      title: t.playbooks.examples.emailSequences.title,
      category: t.playbooks.examples.emailSequences.category,
      author: t.playbooks.examples.emailSequences.author,
      summary: t.playbooks.examples.emailSequences.summary,
      metrics: t.playbooks.examples.emailSequences.metrics,
      icon: Mail,
      locked: true
    },
    {
      id: 6,
      title: t.playbooks.examples.competitiveIntelligence.title,
      category: t.playbooks.examples.competitiveIntelligence.category,
      author: t.playbooks.examples.competitiveIntelligence.author,
      summary: t.playbooks.examples.competitiveIntelligence.summary,
      metrics: t.playbooks.examples.competitiveIntelligence.metrics,
      icon: Zap,
      locked: true
    }
  ];
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

      {/* Coming Soon Section */}
      <section className="px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-card/50 backdrop-blur border-2 border-primary/20">
            <CardContent className="p-12 md:p-16">
              <div className="flex flex-col items-center text-center space-y-8">
                <img
                  src={comingSoon}
                  alt={t.common.comingSoon}
                  className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-2xl shadow-lg"
                />
                <div className="space-y-4">
                  <div className="inline-block px-8 py-3 bg-primary/10 rounded-full">
                    <span className="text-primary font-bold text-2xl">{t.playbooks.comingSoon.badge}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold">
                    {t.playbooks.comingSoon.heading}
                  </h2>
                  <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    {t.playbooks.comingSoon.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Playbooks;
