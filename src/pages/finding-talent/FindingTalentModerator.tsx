import { ArrowLeft, ArrowRight, Eye, EyeOff, LockKeyhole, Play, RotateCcw, UnlockKeyhole } from "lucide-react";
import { Link } from "react-router-dom";
import { EventHeader } from "@/components/finding-talent/EventHeader";
import {
  eventQuestions,
  getQuestionResults,
  readEventState,
  saveEventState,
  type EventState,
} from "@/lib/findingTalent";
import { useFindingTalentState } from "@/lib/useFindingTalentState";
import "./FindingTalentEvent.css";

export default function FindingTalentModerator() {
  const state = useFindingTalentState();
  const question = eventQuestions[state.activeQuestionIndex];
  const results = getQuestionResults(state, question.id);
  const voteUrl = `${window.location.origin}/events/finding-right-talent/vote`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=2&data=${encodeURIComponent(voteUrl)}`;
  const update = (nextState: EventState) => saveEventState(nextState);

  const moveTo = (index: number) => {
    update({ ...state, activeQuestionIndex: index, pollStatus: "open" });
  };
  const closePoll = () => update({ ...state, pollStatus: "closed" });
  const revealResults = () => update({ ...state, pollStatus: "revealed" });
  const resetDemo = () => {
    if (window.confirm("¿Borrar todos los votos guardados en este navegador y reiniciar la demo?")) {
      const fresh = readEventState();
      update({ ...fresh, activeQuestionIndex: 0, pollStatus: "open", votes: [] });
    }
  };

  return (
    <main className="ft-page ft-moderator-page">
      <div className="ft-container">
        <EventHeader section="Control de moderación" />
        <div className="ft-moderator-heading">
          <div><span className="ft-eyebrow">Finding the right talent</span><h1>Control de la dinámica</h1>
            <p>Avanza entre preguntas, cierra el voto y revela el resultado al panel.</p></div>
          <Link to="/events/finding-right-talent" className="ft-text-link"><ArrowLeft size={16} /> Página del evento</Link>
        </div>
        <div className="ft-moderator-layout">
          <section className="ft-stage-card">
            <div className="ft-stage-topline"><span className={`ft-status-dot ${state.pollStatus}`} />
              <span>{state.pollStatus === "open" ? "VOTACIÓN ABIERTA" : state.pollStatus === "closed" ? "VOTACIÓN CERRADA" : "RESULTADOS REVELADOS"}</span>
              <span className="ft-question-count">{state.activeQuestionIndex + 1} / {eventQuestions.length}</span>
            </div>
            <div className="ft-stage-question">
              <p>{question.block}</p><h2>{question.statement}</h2>
            </div>
            <div className="ft-stage-options"><span>MITO</span><span>REALIDAD</span></div>
            {state.pollStatus === "revealed" && (
              <div className="ft-result-panel">
                <div className="ft-result-heading"><strong>Resultado del público</strong><span>{results.total} votos</span></div>
                <div className="ft-result-label"><span>Mito</span><b>{results.mythPercent}%</b></div>
                <div className="ft-result-track"><i style={{ width: `${results.mythPercent}%` }} /></div>
                <div className="ft-result-label"><span>Realidad</span><b>{results.realityPercent}%</b></div>
                <div className="ft-result-track reality"><i style={{ width: `${results.realityPercent}%` }} /></div>
              </div>
            )}
            <div className="ft-stage-controls">
              <button className="ft-control-button" onClick={() => moveTo(Math.max(0, state.activeQuestionIndex - 1))} disabled={state.activeQuestionIndex === 0}><ArrowLeft size={16} /> Anterior</button>
              {state.pollStatus === "open" ? (
                <button className="ft-control-button ft-control-warn" onClick={closePoll}><LockKeyhole size={16} /> Cerrar voto</button>
              ) : state.pollStatus === "closed" ? (
                <button className="ft-control-button ft-control-primary" onClick={revealResults}><Eye size={16} /> Revelar resultados</button>
              ) : (
                <button className="ft-control-button" onClick={() => update({ ...state, pollStatus: "closed" })}><EyeOff size={16} /> Ocultar resultados</button>
              )}
              <button className="ft-control-button ft-control-primary" onClick={() => moveTo(Math.min(eventQuestions.length - 1, state.activeQuestionIndex + 1))} disabled={state.activeQuestionIndex === eventQuestions.length - 1}>Siguiente <ArrowRight size={16} /></button>
            </div>
          </section>
          <aside className="ft-moderator-sidebar">
            <section className="ft-side-card ft-vote-link-card">
              <span className="ft-eyebrow">URL para el público</span><h2>Escanea para votar</h2>
              <p>Abre esta ruta en el teléfono para probar el flujo de participante.</p>
              <img className="ft-vote-qr" src={qrUrl} alt="Código QR para abrir la votación en el celular" />
              <Link to="/events/finding-right-talent/vote" className="ft-button ft-button-primary">Abrir vista móvil <ArrowRight size={16} /></Link>
              <code>{voteUrl}</code>
            </section>
            <section className="ft-side-card"><span className="ft-eyebrow">Afirmación asignada</span><h2>{question.assigned}</h2><p>El panel revela su postura después de cerrar la votación del público.</p></section>
            <section className="ft-side-card ft-side-agenda"><span className="ft-eyebrow">Ritmo de la ronda</span><p>0:30 Leer · 1:00 votar · 0:30 revelar · 2:00 panelista · 2:00 público · 3:00 debate</p></section>
            <button className="ft-reset-button" onClick={resetDemo}><RotateCcw size={14} /> Reiniciar datos de esta demo</button>
          </aside>
        </div>
        <div className="ft-question-list"><h2>Preguntas del evento</h2><div>
          {eventQuestions.map((item, index) => (
            <button key={item.id} className={index === state.activeQuestionIndex ? "active" : ""} onClick={() => moveTo(index)}>
              <span>{String(index + 1).padStart(2, "0")}</span>{item.statement}<Play size={13} />
            </button>
          ))}
        </div></div>
      </div>
    </main>
  );
}
