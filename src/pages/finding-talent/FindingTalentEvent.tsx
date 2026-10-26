import { ArrowRight, CalendarDays, Clock3, Linkedin, MapPin, Radio } from "lucide-react";
import { Link } from "react-router-dom";
import { EventHeader } from "@/components/finding-talent/EventHeader";
import { eventPanelists } from "@/lib/findingTalent";
import "./FindingTalentEvent.css";

const agenda = [
  ["00:00", "Apertura", "Bienvenida y voto de calentamiento", "7 min"],
  ["00:07", "Cómo encontramos talento", "Introducción del panel y tres rondas", "35 min"],
  ["00:42", "Transición", "Del proceso al talento que buscamos", "3 min"],
  ["00:45", "Qué talento buscamos", "Introducción del panel y tres rondas", "35 min"],
  ["01:20", "Cierre", "Voto final y frase de cada panelista", "10 min"],
];

export default function FindingTalentEvent() {
  return (
    <main className="ft-page">
      <div className="ft-container">
        <EventHeader />
        <section className="ft-hero">
          <div className="ft-hero-copy">
            <span className="ft-eyebrow"><Radio size={14} /> Panel en vivo · En español</span>
            <h1>Finding the right talent in the <em>agentic era</em></h1>
            <p>
              Los agentes de IA están cambiando cómo encontramos talento y cuánto puede lograr una persona.
              Cuatro voces de Recursos Humanos, operaciones, tecnología y negocios conversan sobre qué es
              mito y qué es realidad.
            </p>
            <div className="ft-meta-row">
              <span><CalendarDays size={16} /> 23 de octubre de 2026</span>
              <span><Clock3 size={16} /> 90 minutos</span>
              <span><MapPin size={16} /> Evento presencial</span>
            </div>
            <div className="ft-hero-actions">
              <Link to="/events/finding-right-talent/vote" className="ft-button ft-button-primary">
                Participar en la votación <ArrowRight size={17} />
              </Link>
              <a href="#panelistas" className="ft-button ft-button-secondary">Conoce al panel</a>
            </div>
          </div>
          <div className="ft-hero-art" aria-hidden="true"><span>MITO</span><b>o</b><span>REALIDAD</span></div>
        </section>

        <section className="ft-section" id="panelistas">
          <div className="ft-section-heading">
            <div><span className="ft-eyebrow">Las voces del panel</span><h2>Conoce a los panelistas</h2></div>
            <p>Conoce la experiencia y las ideas que cada panelista aporta a la conversación.</p>
          </div>
          <div className="ft-panelist-grid">
            {eventPanelists.map((person) => (
              <article className="ft-panelist-card" key={person.name}>
                <img className="ft-avatar ft-avatar-photo" src={person.image} alt={person.name} />
                <div className="ft-specialty">{person.specialty}</div>
                <h3>{person.name}</h3>
                <p>{person.bio}</p>
                {person.linkedin ? (
                  <a href={person.linkedin} target="_blank" rel="noreferrer"><Linkedin size={15} /> LinkedIn</a>
                ) : <span className="ft-panelist-pending">Perfil de LinkedIn próximamente</span>}
              </article>
            ))}
          </div>
        </section>

        <section className="ft-section">
          <div className="ft-section-heading">
            <div><span className="ft-eyebrow">La conversación</span><h2>Agenda · 90 minutos</h2></div>
            <p>Vota desde tu celular. Primero participa el público; después revela su postura el panel.</p>
          </div>
          <div className="ft-agenda">
            {agenda.map(([time, name, description, duration]) => (
              <article className="ft-agenda-card" key={time}>
                <div className="ft-agenda-time">{time}<span>{duration}</span></div>
                <h3>{name}</h3><p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="ft-join-card">
          <div><span className="ft-eyebrow">Participa en vivo</span><h2>Tu opinión abre el debate.</h2>
            <p>Entra a la votación desde tu celular cuando la moderadora active cada afirmación.</p></div>
          <Link to="/events/finding-right-talent/vote" className="ft-button ft-button-light">Abrir votación <ArrowRight size={17} /></Link>
        </section>
        <details className="ft-english-description">
          <summary>Event description in English · copy for Luma</summary>
          <p>AI agents are changing how we find talent—and how much one person can accomplish. Join recruiters, founders, and candidates for a Spanish-language, 90-minute panel on separating hype from reality and defining the skills teams need in the agentic era. Through live audience polls and a “Myth or Reality” discussion, four guests from HR, operations, technology, and business will explore how AI is reshaping hiring and work. Vote from your phone, hear the panel’s take, and join the conversation.</p>
        </details>
        <footer className="ft-footer"><span>Agents & Founders</span><span>Prototipo del evento · contenido en revisión</span></footer>
      </div>
    </main>
  );
}
