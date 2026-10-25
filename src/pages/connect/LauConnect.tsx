import { ArrowUpRight, Mail, MessageCircle, Users } from "lucide-react";
import { useEffect } from "react";
import lauImage from "@/assets/members/lauyumi_rojas.jpeg";
import "./LauConnect.css";

const destinations = [
  {
    key: "agents_and_founders",
    href: "https://agfou.sidekickflow.com/",
    icon: <Users aria-hidden="true" />,
    title: "Únete a Agents & Founders",
    description: "Una comunidad para fundadores y builders que crean con IA.",
    primary: true,
  },
  {
    key: "linkedin",
    href: "https://www.linkedin.com/in/lauyumiopsmx/",
    icon: <span className="lau-linkedin-mark" aria-hidden="true">in</span>,
    title: "Conectemos en LinkedIn",
    description: "Conoce más sobre mi trabajo en operaciones y talento.",
  },
  {
    key: "whatsapp",
    href: "https://wa.me/5215631108284",
    icon: <MessageCircle aria-hidden="true" />,
    title: "Escríbeme por WhatsApp",
    description: "Continuemos la conversación por mensaje.",
  },
  {
    key: "email",
    href: "mailto:lau.reds94@gmail.com",
    icon: <Mail aria-hidden="true" />,
    title: "Envíame un correo",
    description: "Cuéntame qué tienes en mente y te respondo pronto.",
  },
];

const LauConnect = () => {
  useEffect(() => {
    const previousTitle = document.title;
    const previousLanguage = document.documentElement.lang;
    const existingRobots = document.querySelector('meta[name="robots"]');
    const previousRobotsContent = existingRobots?.getAttribute("content");
    const robots = existingRobots ?? document.createElement("meta");

    document.title = "Conecta con Lauyumi | Agents & Founders";
    document.documentElement.lang = "es";
    robots.setAttribute("name", "robots");
    robots.setAttribute("content", "noindex, nofollow");
    if (!existingRobots) document.head.appendChild(robots);

    return () => {
      document.title = previousTitle;
      document.documentElement.lang = previousLanguage;
      if (previousRobotsContent === null || previousRobotsContent === undefined) {
        robots.remove();
      } else {
        robots.setAttribute("content", previousRobotsContent);
      }
    };
  }, []);

  const trackDestination = (destination: string) => {
    const posthog = (window as Window & { posthog?: { capture: (event: string, properties: Record<string, string>) => void } }).posthog;
    posthog?.capture("connect_destination_selected", { destination, page: "/connect/lau" });
  };

  return (
    <main className="lau-connect-page">
      <section className="lau-connect-card" aria-labelledby="lau-connect-title">
        <header className="lau-connect-header">
          <img className="lau-connect-portrait" src={lauImage} alt="Lauyumi Rojas" />
          <p className="lau-connect-eyebrow">Operaciones · Talento · Comunidad</p>
          <h1 id="lau-connect-title">Hagamos buenas cosas <em>juntas.</em></h1>
          <p className="lau-connect-intro">Soy Lauyumi. Ayudo a equipos y fundadores a convertir retos de personas y operaciones en sistemas claros que sí funcionan.</p>
        </header>

        <nav className="lau-connect-options" aria-label="Formas de conectar con Lauyumi">
          {destinations.map(({ key, href, icon, title, description, primary }) => (
            <a
              key={key}
              className={`lau-connect-option${primary ? " primary" : ""}`}
              href={href}
              data-destination={key}
              onClick={() => trackDestination(key)}
              target={key === "email" ? undefined : "_blank"}
              rel={key === "email" ? undefined : "noopener noreferrer"}
            >
              <span className="lau-connect-icon">{icon}</span>
              <span className="lau-connect-copy"><strong>{title}</strong><small>{description}</small></span>
              <ArrowUpRight className="lau-connect-arrow" aria-hidden="true" />
            </a>
          ))}
        </nav>
        <footer className="lau-connect-footer">Operaciones con intención. Conexiones que suman.</footer>
      </section>
    </main>
  );
};

export default LauConnect;
