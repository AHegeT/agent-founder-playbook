import { Check, Clock3, Radio } from "lucide-react";
import { useState } from "react";
import { EventHeader } from "@/components/finding-talent/EventHeader";
import {
  eventQuestions,
  getQuestionResults,
  getVoterId,
  saveEventState,
  type VoteChoice,
} from "@/lib/findingTalent";
import { useFindingTalentState } from "@/lib/useFindingTalentState";
import "./FindingTalentEvent.css";

export default function FindingTalentVote() {
  const state = useFindingTalentState();
  const [selected, setSelected] = useState<VoteChoice | null>(null);
  const question = eventQuestions[state.activeQuestionIndex];
  const voterId = getVoterId();
  const existingVote = state.votes.find((vote) => vote.questionId === question.id && vote.voterId === voterId);
  const results = getQuestionResults(state, question.id);

  const submitVote = () => {
    if (!selected || existingVote || state.pollStatus !== "open") return;
    saveEventState({
      ...state,
      votes: [...state.votes, { questionId: question.id, voterId, choice: selected }],
    });
  };

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
                <button className="ft-button ft-button-primary ft-submit-vote" onClick={submitVote} disabled={!selected}>Enviar mi voto</button>
                <p className="ft-anonymous-note">Tu voto es anónimo.</p>
              </>
            )
          ) : state.pollStatus === "closed" ? (
            <div className="ft-waiting-message"><Clock3 size={20} /><strong>Votación cerrada</strong><p>La moderadora está preparando la revelación del resultado.</p></div>
          ) : (
            <div className="ft-live-results">
              <strong>Así votó el público</strong><span>{results.total} votos</span>
              <div className="ft-result-label"><span>Mito</span><b>{results.mythPercent}%</b></div><div className="ft-result-track"><i style={{ width: `${results.mythPercent}%` }} /></div>
              <div className="ft-result-label"><span>Realidad</span><b>{results.realityPercent}%</b></div><div className="ft-result-track reality"><i style={{ width: `${results.realityPercent}%` }} /></div>
            </div>
          )}
          <footer className="ft-phone-footer">Opiniones distintas hacen mejores conversaciones.</footer>
        </div>
        <p className="ft-prototype-note">Prototipo local · esta votación solo se sincroniza dentro del mismo navegador.</p>
      </div>
    </main>
  );
}
