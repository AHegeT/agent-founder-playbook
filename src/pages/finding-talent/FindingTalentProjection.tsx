import { ArrowUpRight, Linkedin, Radio } from "lucide-react";
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
      <div className="ft-projection-layout">
        <section className="ft-projection-content">
          {state.eventFinished ? (
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
                  <p className="ft-projection-subtitle">Escanea y vota: ¿mito o realidad?</p>
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
        <aside className="ft-projection-qr">
          <img src={qrUrl} alt={state.eventFinished ? "Código QR para conocer a los ponentes" : "Código QR para votar desde el celular"} />
          <strong>{state.eventFinished ? "Conoce a los ponentes" : "Escanea para participar"}</strong>
          <span>{state.eventFinished ? "Perfiles y enlaces de LinkedIn" : "La pregunta se actualizará en tu celular"}</span>
          {state.eventFinished && <a href={destination} target="_blank" rel="noreferrer">Abrir detalles <ArrowUpRight size={15} /></a>}
        </aside>
      </div>
      <footer className="ft-projection-footer">
        <span>{state.eventFinished ? "Gracias por acompañarnos" : "Finding the right talent in the agentic era"}</span>
        {isRevealed && !state.eventFinished && <span>Resultados de la pregunta actual</span>}
      </footer>
    </main>
  );
}
