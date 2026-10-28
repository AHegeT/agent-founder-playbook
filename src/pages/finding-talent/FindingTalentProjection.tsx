import { ArrowUpRight, Linkedin, Radio } from "lucide-react";
import wifiQr from "@/assets/qr-code.png";
import { EventHeader } from "@/components/finding-talent/EventHeader";
import { eventPanelists, eventQuestions, getQuestionResults } from "@/lib/findingTalent";
import { useFindingTalentState } from "@/lib/useFindingTalentState";
import "./FindingTalentEvent.css";

function qrFor(url: string) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=420x420&margin=2&data=${encodeURIComponent(url)}`;
}

export default function FindingTalentProjection() {
  const { state, loading, error } = useFindingTalentState();
  const question = eventQuestions[state.activeQuestionIndex];
  const results = getQuestionResults(state, question.id);
  const isRevealed = state.revealAll || state.revealedQuestionId === question.id;
  const destination = state.eventFinished
    ? `${window.location.origin}/events/finding-right-talent#panelistas`
    : `${window.location.origin}/events/finding-right-talent/vote`;
  const qrUrl = qrFor(destination);
  const showLanding = state.screenView === "landing";

  if (loading || error) {
    return (
      <main className="ft-projection-page">
        <EventHeader section="Pantalla del evento" compact />
        <p className="ft-page-message">{loading ? "Conectando con el evento…" : `No se pudo cargar el evento: ${error}`}</p>
      </main>
    );
  }

  return (
    <main className={`ft-projection-page ${state.eventFinished ? "finished" : ""}`}>
      <header className="ft-projection-brand">AGENTS <span>&</span> FOUNDERS <Radio size={18} /></header>
      <div className={`ft-projection-layout ${showLanding ? "landing" : "questions"}`}>
        <section className="ft-projection-content">
          {showLanding ? (
            <>
              <span className="ft-eyebrow"><Radio size={15} /> Panel en vivo · En español</span>
              <h1>Finding the right talent in the <em>agentic era</em></h1>
              <p className="ft-projection-subtitle">Los agentes de IA están cambiando cómo encontramos talento y cuánto puede lograr una persona. Cuatro voces de Recursos Humanos, operaciones, tecnología y negocios conversan sobre qué es mito y qué es realidad.</p>
              <div className="ft-projection-landing-meta"><span>26 de octubre de 2026</span><span>90 minutos</span><span>Evento presencial</span></div>
            </>
          ) : state.eventFinished ? (
            <>
              <span className="ft-eyebrow">Finding the right talent in the agentic era</span>
              <h1>¡Gracias por ser parte de la conversación!</h1>
              <p className="ft-projection-subtitle">Escanea el código para conocer a los ponentes y conectar con ellos.</p>
              <div className="ft-projection-speakers">
                {eventPanelists.map((person) => (
                  <div key={person.name} className="ft-projection-speaker">
                    <img className="ft-avatar ft-avatar-photo" src={person.image} alt={person.name} />
                    <span><strong>{person.name}</strong><small>{person.specialty}</small></span>
                    {person.linkedin && <Linkedin size={20} />}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <span className="ft-eyebrow"><Radio size={15} /> {question.block} · {state.activeQuestionIndex + 1}/{eventQuestions.length}</span>
              <h1>{question.statement}</h1>
              {state.pollStatus === "open" ? (
                <>
                  <div className="ft-projection-choices"><span>MITO</span><span>REALIDAD</span></div>
                </>
              ) : isRevealed ? (
                <section className="ft-projection-results" aria-label="Resultados de la votación">
                  <p>Así votó el público <span>{results.total} votos</span></p>
                  <div className="ft-result-label"><span>Mito</span><b>{results.mythPercent}%</b></div>
                  <div className="ft-result-track"><i style={{ width: `${results.mythPercent}%` }} /></div>
                  <div className="ft-result-label"><span>Realidad</span><b>{results.realityPercent}%</b></div>
                  <div className="ft-result-track reality"><i style={{ width: `${results.realityPercent}%` }} /></div>
                </section>
              ) : (
                <p className="ft-projection-subtitle">Votación cerrada</p>
              )}
            </>
          )}
        </section>
        <aside className="ft-projection-qr-list">
          <div className="ft-projection-qr">
            <img src={wifiQr} alt="Código QR para conectarse al Wi-Fi del evento" />
            <strong>Conéctate al Wi-Fi</strong>
            <span>Escanea el código para unirte a INFINITUM6995</span>
          </div>
          <div className="ft-projection-qr">
            <img src={qrUrl} alt={state.eventFinished ? "Código QR para conocer a los ponentes" : "Código QR para votar desde el celular"} />
            <strong>{state.eventFinished ? "Conoce a los ponentes" : "Escanea para participar"}</strong>
            <span>{state.eventFinished ? "Perfiles y enlaces de LinkedIn" : "La pregunta se actualizará en tu celular"}</span>
            {state.eventFinished && <a href={destination} target="_blank" rel="noreferrer">Abrir detalles <ArrowUpRight size={15} /></a>}
          </div>
        </aside>
      </div>
      <footer className="ft-projection-footer">
        <span>{state.eventFinished ? "Gracias por acompañarnos" : "Finding the right talent in the agentic era"}</span>
        {isRevealed && !state.eventFinished && <span>Resultados de la pregunta actual</span>}
      </footer>
    </main>
  );
}
