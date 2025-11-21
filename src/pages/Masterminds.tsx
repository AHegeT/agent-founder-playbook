import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Users, TrendingUp, Target, MessageSquare } from "lucide-react";

import { useTranslation } from "react-i18next";

const Masterminds = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-background via-background to-accent/5">
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold">
            <span className="text-accent">{t('masterminds.hero.title')}</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {t('masterminds.hero.subtitle')}
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
                    <h3 className="font-semibold mb-1">{t('masterminds.whatAreMasterminds.realExperiments.title')}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t('masterminds.whatAreMasterminds.realExperiments.description')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{t('masterminds.whatAreMasterminds.resultsMetrics.title')}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t('masterminds.whatAreMasterminds.resultsMetrics.description')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{t('masterminds.whatAreMasterminds.communityLearning.title')}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t('masterminds.whatAreMasterminds.communityLearning.description')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-bold">{t('masterminds.whatAreMasterminds.heading')}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('masterminds.whatAreMasterminds.description1')}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('masterminds.whatAreMasterminds.description2')}
              </p>
            </div>
          </div>

          {/* What You'll Learn */}
          <div className="space-y-12">
            <h2 className="text-4xl font-bold text-center">{t('masterminds.whatYoullLearn.heading')}</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-2 hover:border-accent transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-accent" />
                  </div>
                  <CardTitle>{t('masterminds.whatYoullLearn.implementation.title')}</CardTitle>
                  <CardDescription className="text-base">
                    {t('masterminds.whatYoullLearn.implementation.description')}
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-accent transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>{t('masterminds.whatYoullLearn.roi.title')}</CardTitle>
                  <CardDescription className="text-base">
                    {t('masterminds.whatYoullLearn.roi.description')}
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-accent transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                    <Lightbulb className="w-6 h-6 text-accent" />
                  </div>
                  <CardTitle>{t('masterminds.whatYoullLearn.failures.title')}</CardTitle>
                  <CardDescription className="text-base">
                    {t('masterminds.whatYoullLearn.failures.description')}
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-accent transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <MessageSquare className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>{t('masterminds.whatYoullLearn.tools.title')}</CardTitle>
                  <CardDescription className="text-base">
                    {t('masterminds.whatYoullLearn.tools.description')}
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
          <h2 className="text-4xl md:text-5xl font-bold">{t('masterminds.cta.heading')}</h2>
          <p className="text-xl opacity-90">
            {t('masterminds.cta.subtitle')}
          </p>
          <a href="https://www.meetup.com/agents-and-founders/" target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="secondary" className="text-lg h-14 px-8 hover:scale-105 transition-transform">
              {t('common.applyNow')}
              <Lightbulb className="ml-2 w-5 h-5" />
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Masterminds;
