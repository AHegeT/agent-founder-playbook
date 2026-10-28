import { ArrowRight, CalendarDays, Clock3, Linkedin, MapPin, Radio } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import maryImage from "@/assets/members/mary_martinez.png";
import lauImage from "@/assets/members/lauyumi_rojas.jpeg";
import alanImage from "@/assets/members/alan_hegewisch.jpeg";
import urielImage from "@/assets/members/uriel_valtierra.jpeg";

const panelists = [
  {
    name: "Mary Martínez",
    focus: "Talento y operaciones",
    bio: "CEO y fundadora de WIND HR. Ha creado funciones de Recursos Humanos y liderado operaciones de talento en empresas en crecimiento.",
    image: maryImage,
    linkedin: "https://www.linkedin.com/in/marymartinezhr/",
  },
  {
    name: "Lauyumi Rojas",
    focus: "Operaciones y talento",
    bio: "COO y cofundadora de WIND HR. Ha escalado operaciones, liderado equipos multidisciplinarios e incorporado automatización en empresas.",
    image: lauImage,
    linkedin: "https://www.linkedin.com/in/lauyumiopsmx/",
  },
  {
    name: "Alan Hegewisch",
    focus: "Ingeniería, datos e IA",
    bio: "Fundador y CTO de Synapse. Ha trabajado como ingeniero, tech lead y engineering manager en equipos de tecnología.",
    image: alanImage,
    linkedin: "https://www.linkedin.com/in/alan-hegewisch/",
  },
  {
    name: "Uriel Valtierra",
    focus: "PropTech e inmobiliario",
    bio: "Fundador y CEO de Portofoly. Construye soluciones de software para mejorar la comercialización y la experiencia inmobiliaria.",
    image: urielImage,
    linkedin: "https://www.linkedin.com/in/valtierrac/",
  },
];

const questions = [
  "La IA es más objetiva que un reclutador humano.",
  "Si tu CV no tiene las palabras clave correctas, ningún humano lo va a ver.",
  "Usar IA para preparar tu CV o tu entrevista es trampa.",
  "Si un agente puede hacer la tarea, ya no necesitas contratar a alguien para ella.",
  "Saber usar IA ya es más importante que tener experiencia.",
  "Un perfil promedio con buenos agentes rinde más que un perfil brillante sin ellos.",
];

const agenda = [
  { time: "00:00", title: "Apertura", detail: "Bienvenida y voto de calentamiento", duration: "7 min" },
  { time: "00:07", title: "Cómo encontramos talento", detail: "Introducción del panel y tres rondas", duration: "35 min" },
  { time: "00:42", title: "Transición", detail: "Del proceso al talento que buscamos", duration: "3 min" },
  { time: "00:45", title: "Qué talento buscamos", detail: "Introducción del panel y tres rondas", duration: "35 min" },
  { time: "01:20", title: "Cierre", detail: "Voto final y frase de cada panelista", duration: "10 min" },
];

export default function FindingTalentRecap() {
  return (
    <main className="min-h-screen">
      <section className="bg-gradient-to-br from-background via-background to-primary/5 px-4 pb-20 pt-32">
        <div className="container mx-auto max-w-5xl">
          <div className="mx-auto max-w-4xl space-y-7 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-4 py-2 text-sm font-medium text-primary">
              <Radio className="h-4 w-4" /> Recap del evento
            </span>
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              Finding the right talent <span className="text-primary">in the agentic era</span>
            </h1>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              Una conversación sobre cómo la inteligencia artificial está cambiando la búsqueda de talento y lo que una persona puede lograr con agentes.
            </p>
            <div className="flex flex-wrap justify-center gap-x-7 gap-y-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4 text-primary" />26 de octubre de 2026</span>
              <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4 text-primary" />90 minutos</span>
              <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" />Presencial · en español</span>
            </div>
          </div>

          <Card className="mx-auto mt-14 max-w-4xl border-primary/15 bg-card/80 shadow-lg">
            <CardHeader className="p-7 md:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">La pregunta que abrió y cerró la sesión</p>
              <CardTitle className="mt-3 text-2xl leading-snug md:text-4xl">“La IA va a reemplazar a los humanos en los empleos.”</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                El público votó al inicio y al cierre para volver sobre la misma afirmación después de escuchar distintas perspectivas.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      <section className="px-4 py-16 md:py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary">La conversación</p>
            <h2 className="text-3xl font-bold md:text-4xl">Preguntas para repensar cómo contratamos</h2>
            <p className="mt-4 text-muted-foreground">El panel exploró afirmaciones sobre selección, preparación profesional y el valor de trabajar con agentes de IA.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {questions.map((question, index) => (
              <Card key={question} className="h-full transition-colors hover:border-primary/40">
                <CardHeader>
                  <span className="mb-2 text-sm font-bold text-primary">{String(index + 1).padStart(2, "0")}</span>
                  <CardTitle className="text-lg leading-snug">{question}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
          <div className="mx-auto mt-8 max-w-4xl rounded-2xl bg-secondary/50 p-6 text-center md:p-8">
            <p className="text-base leading-relaxed text-muted-foreground">
              La dinámica combinó votación del público con conversación entre panelistas: primero se escuchó la postura de la audiencia y después se revelaron los resultados para abrir el debate.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-secondary/30 px-4 py-16 md:py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary">Las voces del panel</p>
              <h2 className="text-3xl font-bold md:text-4xl">Cuatro perspectivas sobre talento e IA</h2>
            </div>
            <p className="max-w-xl text-muted-foreground">Recursos Humanos, operaciones, tecnología y negocios se encontraron para conversar sobre el talento de la era de los agentes.</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {panelists.map((person) => (
              <Card key={person.name} className="h-full overflow-hidden">
                <CardHeader className="h-full">
                  <img src={person.image} alt={person.name} className="mb-3 h-36 w-36 rounded-2xl object-cover" />
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">{person.focus}</p>
                  <CardTitle className="text-xl">{person.name}</CardTitle>
                  <CardDescription className="flex-1 text-sm leading-relaxed">{person.bio}</CardDescription>
                  <a href={person.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 pt-2 text-sm font-medium text-foreground hover:text-primary">
                    <Linkedin className="h-4 w-4" /> LinkedIn
                  </a>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary">El recorrido</p>
            <h2 className="text-3xl font-bold md:text-4xl">Una sesión de 90 minutos</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {agenda.map((item) => (
              <Card key={item.time}>
                <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                  <span className="min-w-16 rounded-lg bg-primary/10 px-3 py-2 text-center text-sm font-bold text-primary">{item.time}</span>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <span className="text-xs font-medium text-muted-foreground">{item.duration}</span>
                    </div>
                    <CardDescription className="mt-2">{item.detail}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="container mx-auto max-w-5xl rounded-3xl bg-gradient-to-r from-primary to-primary/80 p-8 text-primary-foreground md:flex md:items-center md:justify-between md:gap-8 md:p-12">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-foreground/80">Sigue la conversación</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">Explora los próximos encuentros</h2>
            <p className="mt-3 text-primary-foreground/85">Conoce otras conversaciones de la comunidad Agents & Founders.</p>
          </div>
          <Button asChild variant="secondary" className="mt-7 shrink-0 md:mt-0">
            <Link to="/events/roundtables">Ver roundtables <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
