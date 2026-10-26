import { ArrowUpRight, BriefcaseBusiness, Mail, MessageCircle } from "lucide-react";
import { useEffect } from "react";
import luisImage from "@/assets/members/luis_gerardo_yanes.png";
import "./LauConnect.css";

const destinations = [
  {
    key: "work_with_luis",
    href: "https://paralaje.com.mx/",
    icon: <BriefcaseBusiness aria-hidden="true" />,
    title: "Trabaja con Luis Gerardo",
    description: "Conoce cómo Paralaje puede ayudarte a construir software para tu operación.",
    primary: true,
  },
  {
    key: "linkedin",
    href: "https://www.linkedin.com/in/luisgerardoyanes/",
    icon: <span className="lau-linkedin-mark" aria-hidden="true">in</span>,
    title: "Conectemos en LinkedIn",
    description: "Conoce más sobre mí y mi trabajo.",
  },
  {
    key: "whatsapp",
    href: "https://wa.me/5215530356753",
    icon: <MessageCircle aria-hidden="true" />,
    title: "Escríbeme por WhatsApp",
    description: "Cuéntale qué quieres mejorar o construir.",
  },
  {
    key: "email",
    href: "mailto:luis.yanes@paralaje.com.mx",
    icon: <Mail aria-hidden="true" />,
    title: "Envíame un correo",
    description: "luis.yanes@paralaje.com.mx",
  },
];

const LuisGerardoConnect = () => {
  useEffect(() => {
    const previousTitle = document.title;
    const previousLanguage = document.documentElement.lang;
    const existingRobots = document.querySelector('meta[name="robots"]');
    const previousRobotsContent = existingRobots?.getAttribute("content");
    const robots = existingRobots ?? document.createElement("meta");

    document.title = "Conecta con Luis Gerardo | Paralaje";
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
    posthog?.capture("connect_destination_selected", { destination, page: "/connect/luis-gerardo" });
  };

  return (
    <main className="lau-connect-page luis-connect-page">
      <section className="lau-connect-card" aria-labelledby="luis-connect-title">
        <header className="lau-connect-header">
          <img className="lau-connect-portrait" src={luisImage} alt="Luis Gerardo Yanes" />
          <p className="lau-connect-eyebrow">Software · Operaciones · Replit</p>
          <h1 id="luis-connect-title">Hagamos realidad <em>tu idea.</em></h1>
          <p className="lau-connect-intro">Soy Luis Gerardo, de Paralaje. Ayudo a empresas a convertir sus ideas y procesos en software útil, con soluciones a la medida y acompañamiento para construir con Replit.</p>
        </header>

        <nav className="lau-connect-options" aria-label="Formas de conectar con Luis Gerardo">
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
        <footer className="lau-connect-footer">Paralaje · Convertimos tu idea en software</footer>
      </section>
    </main>
  );
};

export default LuisGerardoConnect;
