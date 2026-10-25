import { Check, Clock3, Radio } from "lucide-react";
import { useEffect, useState } from "react";
import { EventHeader } from "@/components/finding-talent/EventHeader";
import {
  EVENT_STORAGE_KEY,
  eventQuestions,
  getQuestionResults,
  getVoterId,
  submitEventVote,
  type VoteChoice,
} from "@/lib/findingTalent";
import { useFindingTalentState } from "@/lib/useFindingTalentState";
import { isSupabaseConfigured } from "@/lib/supabase";
import "./FindingTalentEvent.css";

export default function FindingTalentVote() {
  const { state, loading, error: stateError } = useFindingTalentState();
  const [selected, setSelected] = useState<VoteChoice | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [voteError, setVoteError] = useState("");
  const [submittedQuestions, setSubmittedQuestions] = useState<Record<string, boolean>>({});
  const question = eventQuestions[state.activeQuestionIndex];
  const voterId = getVoterId();
  const localVote = state.votes.find((vote) => vote.questionId === question.id && vote.voterId === voterId);
  const existingVote = localVote || submittedQuestions[question.id];
  const results = getQuestionResults(state, question.id);

  useEffect(() => {
    setSelected(null);
    setVoteError("");
    setSubmittedQuestions((current) => ({
      ...current,
      [question.id]: current[question.id] || window.localStorage.getItem(`${EVENT_STORAGE_KEY}-cast-${question.id}`) === "1",
    }));
  }, [question.id]);

  const sendVote = async () => {
    if (!selected || existingVote || state.pollStatus !== "open") return;
    setSubmitting(true);
    setVoteError("");
    try {
      await submitEventVote(question.id, voterId, selected);
      window.localStorage.setItem(`${EVENT_STORAGE_KEY}-cast-${question.id}`, "1");
      setSubmittedQuestions((current) => ({ ...current, [question.id]: true }));
    } catch (error) {
      const message = error instanceof Error ? error.message : "No se pudo guardar el voto.";
      setVoteError(message.includes("duplicate") || message.includes("unique")
        ? "Este dispositivo ya registró un voto para esta pregunta."
        : message);
    } finally {
      setSubmitting(false);
    }
  };

  const showGlobalResults = state.revealAll;
  const showQuestionResults = state.revealedQuestionId === question.id;

  if (loading) {
    return <main className="ft-page ft-voter-page"><div className="ft-container ft-voter-container"><EventHeader section="Votación en vivo" compact /><p className="ft-page-message">Conectando con el evento…</p></div></main>;
  }

  if (stateError) {
    return <main className="ft-page ft-voter-page"><div className="ft-container ft-voter-container"><EventHeader section="Votación en vivo" compact /><div className="ft-form-error">No se pudo cargar la pregunta del evento: {stateError}</div></div></main>;
  }

  return (
    <main className="ft-page ft-voter-page">
      <div className="ft-container ft-voter-container">
        <EventHeader section="Votación en vivo" compact />
        <div className="ft-phone-card">
          <div className="ft-voter-brand">AGENTS <span>&</span> FOUNDERS <Radio size={15} /></div>
          <div className="ft-voter-event">FINDING THE RIGHT TALENT <span>·</span> {state.activeQuestionIndex + 1}/{eventQuestions.length}</div>
          <div className="ft-vote-status">
            <span className={`ft-status-dot ${state.pollStatus}`} />
            {state.pollStatus === "open" ? "Votación abierta" : state.pollStatus === "closed" ? "Voto cerrado" : "Resultados"}
          </div>
          <h1>{question.statement}</h1>
          {state.pollStatus === "open" ? (
            existingVote ? (
              <div className="ft-voted-message"><span><Check size={18} /></span><strong>¡Tu voto quedó registrado!</strong><p>Gracias por ayudar a abrir la conversación.</p></div>
            ) : (
              <>
                <p className="ft-voter-prompt">¿Mito o realidad? Elige una opción.</p>
                <div className="ft-vote-choice-list">
                  <button className={selected === "myth" ? "selected myth" : "myth"} onClick={() => setSelected("myth")}><span>A</span>Mito</button>
                  <button className={selected === "reality" ? "selected reality" : "reality"} onClick={() => setSelected("reality")}><span>B</span>Realidad</button>
                </div>
                <button className="ft-button ft-button-primary ft-submit-vote" onClick={() => void sendVote()} disabled={!selected || submitting}>{submitting ? "Enviando…" : "Enviar mi voto"}</button>
                {voteError && <p className="ft-vote-error">{voteError}</p>}
                <p className="ft-anonymous-note">Un voto por dispositivo y pregunta.</p>
              </>
            )
          ) : showGlobalResults ? (
            <div className="ft-live-results ft-all-voter-results">
              <strong>Resultados de todas las preguntas</strong>
              {eventQuestions.map((item) => {
                const itemResults = getQuestionResults(state, item.id);
                return <div className="ft-voter-global-row" key={item.id}>
                  <p>{item.statement}</p><div className="ft-result-label"><span>Mito</span><b>{itemResults.mythPercent}%</b></div>
                  <div className="ft-result-track"><i style={{ width: `${itemResults.mythPercent}%` }} /></div>
                  <div className="ft-result-label"><span>Realidad</span><b>{itemResults.realityPercent}%</b></div>
                  <div className="ft-result-track reality"><i style={{ width: `${itemResults.realityPercent}%` }} /></div>
                  <small>{itemResults.total} votos</small>
                </div>;
              })}
            </div>
          ) : showQuestionResults ? (
            <div className="ft-live-results">
              <strong>Así votó el público</strong><span>{results.total} votos</span>
              <div className="ft-result-label"><span>Mito</span><b>{results.mythPercent}%</b></div><div className="ft-result-track"><i style={{ width: `${results.mythPercent}%` }} /></div>
              <div className="ft-result-label"><span>Realidad</span><b>{results.realityPercent}%</b></div><div className="ft-result-track reality"><i style={{ width: `${results.realityPercent}%` }} /></div>
            </div>
          ) : state.pollStatus === "revealed" || state.pollStatus === "closed" ? (
            <div className="ft-waiting-message"><Clock3 size={20} /><strong>{state.pollStatus === "closed" ? "Votación cerrada" : "Resultados ocultos"}</strong><p>Espera a que la moderadora avance o revele los resultados.</p></div>
          ) : null}
          <footer className="ft-phone-footer">Opiniones distintas hacen mejores conversaciones.</footer>
        </div>
        {!isSupabaseConfigured && <p className="ft-prototype-note">Modo local: los cambios solo se sincronizan en este navegador.</p>}
      </div>
    </main>
  );
}
