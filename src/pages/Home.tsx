import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Zap,
  Users,
  Lightbulb,
  TrendingUp,
  Building2,
  Rocket,
  Database,
  MessageSquare
} from "lucide-react";
import agentKMascot from "@/assets/coffee_square.png";
import agentKFace from "@/assets/face.png";
import "./Home.css";
import { useTranslation, Trans } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                {t('home.hero.title')}{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {t('home.hero.titleHighlight')}
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {t('home.hero.subtitle')}
              </p>
              <a href="https://www.meetup.com/agents-and-founders/" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-primary hover:bg-primary/90 transition-all hover:scale-105 text-lg h-14 px-8">
                  {t('common.applyNow')}
                  <Zap className="ml-2 w-5 h-5" />
                </Button>
              </a>
            </div>
            <div className="flex justify-center">
              <img
                src={agentKMascot}
                alt="Agent K Mascot"
                className="w-full max-w-md rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What is this Section */}
      <section className="py-20 px-4 bg-card">
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <h2 className="text-4xl font-bold">{t('home.whatIsThis.heading')}</h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            <Trans
              i18nKey="home.whatIsThis.description"
              values={{
                founders: t('home.whatIsThis.foundersLabel'),
                agents: t('home.whatIsThis.agentsLabel')
              }}
              components={{
                founders: <span className="text-primary font-semibold" />,
                agents: <span className="text-accent font-semibold" />
              }}
            />
          </p>
        </div>
      </section>

      {/* Who is this for Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">{t('home.whoIsThisFor.heading')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-primary transition-all hover:shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Rocket className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>{t('home.whoIsThisFor.bootstrappers.title')}</CardTitle>
                <CardDescription className="text-base">
                  {t('home.whoIsThisFor.bootstrappers.description')}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary transition-all hover:shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Building2 className="w-6 h-6 text-accent" />
                </div>
                <CardTitle>{t('home.whoIsThisFor.agencyOwners.title')}</CardTitle>
                <CardDescription className="text-base">
                  {t('home.whoIsThisFor.agencyOwners.description')}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary transition-all hover:shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>{t('home.whoIsThisFor.productFounders.title')}</CardTitle>
                <CardDescription className="text-base">
                  {t('home.whoIsThisFor.productFounders.description')}
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* What's Inside Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">{t('home.whatsInside.heading')}</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="bg-card/50 backdrop-blur">
              <CardHeader>
                <Users className="w-12 h-12 text-primary mb-4" />
                <CardTitle className="text-2xl">{t('home.whatsInside.community.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t('home.whatsInside.community.description')}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur">
              <CardHeader>
                <Database className="w-12 h-12 text-accent mb-4" />
                <CardTitle className="text-2xl">{t('home.whatsInside.playbooks.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t('home.whatsInside.playbooks.description')}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur">
              <CardHeader>
                <Lightbulb className="w-12 h-12 text-primary mb-4" />
                <CardTitle className="text-2xl">{t('home.whatsInside.masterminds.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t('home.whatsInside.masterminds.description')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Meet Your Guide Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row items-center gap-12 bg-card p-8 rounded-2xl shadow-xl">
            <div className="w-48 h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
              <img
                src={agentKFace}
                alt="Agent K"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">{t('home.meetYourGuide.heading')}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('home.meetYourGuide.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-primary text-white">
        <div className="container mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold">{t('home.finalCta.heading')}</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            {t('home.finalCta.subtitle')}
          </p>
          <a href="https://www.meetup.com/agents-and-founders/" target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="secondary" className="text-lg h-14 px-8 hover:scale-105 transition-transform">
              {t('common.applyNow')}
              <MessageSquare className="ml-2 w-5 h-5" />
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
