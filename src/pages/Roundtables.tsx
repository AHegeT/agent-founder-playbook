import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, Pizza, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import altataImage from "@/assets/altata.png";
import sirocoImage from "@/assets/siroco.png";

import { useTranslation } from "react-i18next";

const Roundtables = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold">
            <span className="text-primary">{t('roundtables.hero.title')}</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {t('roundtables.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* What are Roundtables */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold">{t('roundtables.whatAreRoundtables.heading')}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('roundtables.whatAreRoundtables.description1')}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('roundtables.whatAreRoundtables.description2')}
              </p>
            </div>
            <div className="bg-card p-8 rounded-2xl shadow-lg">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{t('roundtables.whatAreRoundtables.sessionDuration.title')}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t('roundtables.whatAreRoundtables.sessionDuration.description')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{t('roundtables.whatAreRoundtables.groupSize.title')}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t('roundtables.whatAreRoundtables.groupSize.description')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Pizza className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{t('roundtables.whatAreRoundtables.liveInteractive.title')}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t('roundtables.whatAreRoundtables.liveInteractive.description')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Current Session */}
          <div className="space-y-8 mb-20">
            <h2 className="text-4xl font-bold text-center">{t('roundtables.currentSession.heading')}</h2>
            <Card className="border-2 border-primary bg-gradient-to-br from-primary/5 to-accent/5 hover:shadow-xl transition-all">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-3xl">{t('roundtables.currentSession.intelligentNetworking.title')}</CardTitle>
                    <CardDescription className="text-lg">
                      {t('roundtables.currentSession.intelligentNetworking.description')}
                    </CardDescription>
                  </div>
                  <Link to="/events/roundtables/intelligent-networking">
                    <Button className="bg-primary hover:bg-primary/90">
                      {t('common.viewDetails')}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{t('roundtables.currentSession.intelligentNetworking.nextSession')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{t('roundtables.currentSession.intelligentNetworking.duration')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Locations */}
          <div className="space-y-12 mb-20">
            <h2 className="text-4xl font-bold text-center">{t('roundtables.locations.heading')}</h2>
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
                  <CardTitle>{t('roundtables.locations.altata.name')}</CardTitle>
                  <CardDescription className="text-base">
                    {t('roundtables.locations.altata.description')}
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
                  <CardTitle>{t('roundtables.locations.siroco.name')}</CardTitle>
                  <CardDescription className="text-base">
                    {t('roundtables.locations.siroco.description')}
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>

          {/* Topics */}
          <div className="space-y-12">
            <h2 className="text-4xl font-bold text-center">{t('roundtables.recentTopics.heading')}</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <a href="https://www.meetup.com/agents-and-founders/events/310471914/" target="_blank" rel="noopener noreferrer" className="block">
                <Card className="border-2 hover:border-primary transition-all hover:shadow-lg h-full">
                  <CardHeader>
                    <CardTitle>{t('roundtables.recentTopics.aiTools.title')}</CardTitle>
                    <CardDescription>
                      {t('roundtables.recentTopics.aiTools.description')}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </a>

              <a href="https://www.meetup.com/agents-and-founders/events/310947495" target="_blank" rel="noopener noreferrer" className="block">
                <Card className="border-2 hover:border-primary transition-all hover:shadow-lg h-full">
                  <CardHeader>
                    <CardTitle>{t('roundtables.recentTopics.customerEngine.title')}</CardTitle>
                    <CardDescription>
                      {t('roundtables.recentTopics.customerEngine.description')}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </a>

            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-white">
        <div className="container mx-auto text-center space-y-8 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold">{t('roundtables.cta.heading')}</h2>
          <p className="text-xl opacity-90">
            {t('roundtables.cta.subtitle')}
          </p>
          <a href="https://www.meetup.com/agents-and-founders/" target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="secondary" className="text-lg h-14 px-8 hover:scale-105 transition-transform">
              {t('common.applyNow')}
              <Calendar className="ml-2 w-5 h-5" />
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Roundtables;
