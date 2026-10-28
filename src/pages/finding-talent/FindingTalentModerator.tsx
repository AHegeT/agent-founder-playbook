import { useEffect, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Eye, EyeOff, LockKeyhole, LogOut, Monitor, Play, QrCode, RotateCcw, UnlockKeyhole } from "lucide-react";
import { Link } from "react-router-dom";
import type { Session } from "@supabase/supabase-js";
import { EventHeader } from "@/components/finding-talent/EventHeader";
import { SessionCommentsPanel } from "@/components/finding-talent/SessionCommentsPanel";
import {
  eventQuestions,
  getQuestionResults,
  readEventState,
  saveEventState,
  type EventState,
} from "@/lib/findingTalent";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import { useFindingTalentState } from "@/lib/useFindingTalentState";
import "./FindingTalentEvent.css";

function messageFor(error: unknown) {
  return error instanceof Error ? error.message : "No se pudo completar la acción.";
}

export default function FindingTalentModerator() {
  const { state, loading, error: stateError, isRemote } = useFindingTalentState();
  const [session, setSession] = useState<Session | null>(null);
  const [authReady, setAuthReady] = useState(!isSupabaseConfigured);
  const [isModerator, setIsModerator] = useState(!isSupabaseConfigured);
  const [authError, setAuthError] = useState("");
  const [actionError, setActionError] = useState("");
  const [busy, setBusy] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [timerDuration, setTimerDuration] = useState(120);
  const [secondsLeft, setSecondsLeft] = useState(120);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    if (!timerRunning) return;
    const interval = window.setInterval(() => setSecondsLeft((remaining) => Math.max(0, remaining - 1)), 1000);
    return () => window.clearInterval(interval);
  }, [timerRunning]);

  useEffect(() => {
    if (secondsLeft === 0) setTimerRunning(false);
  }, [secondsLeft]);

  const configureTimer = (value: number) => {
    const duration = Math.max(1, Math.min(5999, Math.round(value || 1)));
    setTimerDuration(duration);
    setSecondsLeft(duration);
    setTimerRunning(false);
  };
  const formatTime = (value: number) => `${Math.floor(value / 60)}:${String(value % 60).padStart(2, "0")}`;

  useEffect(() => {
    if (!supabase) return;
    let alive = true;
    const checkModerator = async (currentSession: Session | null) => {
      if (!alive) return;
      setSession(currentSession);
      setAuthError("");
      if (!currentSession) {
        setIsModerator(false);
        setAuthReady(true);
        return;
      }
      const { data, error } = await supabase
        .from("finding_talent_moderators")
        .select("user_id")
        .eq("user_id", currentSession.user.id)
        .maybeSingle();
      if (!alive) return;
      setIsModerator(Boolean(data) && !error);
      if (error) setAuthError(error.message);
      setAuthReady(true);
    };

    void supabase.auth.getSession().then(({ data }) => void checkModerator(data.session));
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      void checkModerator(nextSession);
    });
    return () => {
      alive = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  const activeQuestionIndex = state.activeQuestionIndex;
  const question = eventQuestions[activeQuestionIndex];
  const results = getQuestionResults(state, question.id);
  const voteUrl = `${window.location.origin}/events/finding-right-talent/vote`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=2&data=${encodeURIComponent(voteUrl)}`;

  const update = async (nextState: EventState) => {
    setActionError("");
    setBusy(true);
    try {
      await saveEventState(nextState);
    } catch (error) {
      console.error("[finding-talent] Moderator action failed", {
        questionId: eventQuestions[nextState.activeQuestionIndex]?.id,
        error,
      });
      setActionError(messageFor(error));
    } finally {
      setBusy(false);
    }
  };
  const moveTo = (index: number) => update({
    ...state,
    activeQuestionIndex: index,
    pollStatus: "open",
    eventFinished: false,
    revealedQuestionId: null,
    revealAll: false,
  });
  const closePoll = () => update({ ...state, pollStatus: "revealed", revealedQuestionId: question.id, revealAll: false });
  const openPoll = () => update({ ...state, pollStatus: "open", eventFinished: false, revealedQuestionId: null, revealAll: false });
  const revealAll = () => update({ ...state, pollStatus: "closed", revealedQuestionId: null, revealAll: true });
  const hideResults = () => update({ ...state, pollStatus: "closed", revealedQuestionId: null, revealAll: false });
  const finishEvent = () => update({ ...state, eventFinished: true, pollStatus: "closed", revealedQuestionId: null, revealAll: false });
  const resumeEvent = () => update({ ...state, eventFinished: false, pollStatus: "open", revealedQuestionId: null, revealAll: false });

  const signIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setAuthError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setAuthError(error.message);
    setBusy(false);
  };

  const signOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setIsModerator(false);
    setSession(null);
  };

  const resetLocalDemo = () => {
    if (window.confirm("¿Borrar los votos de demostración guardados en este navegador?")) {
      const fresh = readEventState();
      void update({ ...fresh, activeQuestionIndex: 0, pollStatus: "open", eventFinished: false, votes: [], revealedQuestionId: null, revealAll: false });
    }
  };

  if (isRemote && (!authReady || loading)) {
    return <main className="ft-page"><div className="ft-container"><EventHeader section="Control de moderación" /><p className="ft-page-message">Conectando con Supabase…</p></div></main>;
  }

  if (isRemote && (!session || !isModerator)) {
    return (
      <main className="ft-page ft-moderator-page">
        <div className="ft-container"><EventHeader section="Control de moderación" />
          <section className="ft-auth-card">
            <span className="ft-eyebrow">Acceso de moderación</span><h1>Inicia sesión para controlar el evento.</h1>
            <p>Usa la cuenta de Supabase que fue autorizada como moderadora.</p>
            {session && !isModerator ? <div className="ft-form-error">Esta cuenta no está en la lista de moderadores.</div> : null}
            {authError && <div className="ft-form-error">{authError}</div>}
            <form onSubmit={signIn} className="ft-auth-form">
              <label>Correo<input type="email" autoComplete="username" required value={email} onChange={(event) => setEmail(event.target.value)} /></label>
              <label>Contraseña<input type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} /></label>
              <button className="ft-button ft-button-primary" disabled={busy}>Iniciar sesión</button>
            </form>
            <p className="ft-auth-help">Si todavía no tienes acceso, crea la cuenta en Supabase Auth y agrégala a `finding_talent_moderators`.</p>
          </section>
        </div>
      </main>
    );
  }

  if (stateError) {
    return <main className="ft-page"><div className="ft-container"><EventHeader section="Control de moderación" /><div className="ft-form-error">No se pudo leer el estado del evento. Aplica la migración de Supabase y recarga: {stateError}</div></div></main>;
  }

  return (
    <main className="ft-page ft-moderator-page">
      <div className="ft-container">
        <EventHeader section="Control de moderación" />
        <div className="ft-moderator-heading">
          <div><span className="ft-eyebrow">Finding the right talent</span><h1>Control de la dinámica</h1>
            <p>{isRemote ? "Los cambios se sincronizan con la audiencia en vivo." : "Demo local: cambios guardados en este navegador."}</p></div>
          <div className="ft-moderator-heading-actions">
            <Link to="/events/finding-right-talent/screen" className="ft-text-link"><Monitor size={16} /> Vista de proyección</Link>
            <Link to="/events/finding-right-talent/qr" className="ft-text-link"><QrCode size={16} /> QR del evento</Link>
            {session && <button className="ft-text-link ft-logout-button" onClick={signOut}><LogOut size={15} /> Cerrar sesión</button>}
            <Link to="/events/finding-right-talent" className="ft-text-link"><ArrowLeft size={16} /> Página del evento</Link>
          </div>
        </div>
        {actionError && <div className="ft-form-error ft-action-error">{actionError}</div>}
        <div className="ft-moderator-layout">
          <section className="ft-stage-card">
            <div className="ft-stage-topline"><span className={`ft-status-dot ${state.pollStatus}`} />
              <span>{state.eventFinished ? "EVENTO FINALIZADO" : state.pollStatus === "open" ? "VOTACIÓN ABIERTA" : state.pollStatus === "closed" ? "VOTACIÓN CERRADA" : "RESULTADOS REVELADOS"}</span>
              <span className="ft-question-count">{activeQuestionIndex + 1} / {eventQuestions.length}</span>
            </div>
            <div className="ft-stage-question">
              <p>{question.block}</p><h2>{question.statement}</h2>
            </div>
            <div className="ft-stage-options"><span>MITO</span><span>REALIDAD</span></div>
            {state.revealAll ? (
              <div className="ft-result-panel ft-global-results">
                <div className="ft-result-heading"><strong>Resultados globales · todas las preguntas</strong><span>{Object.values(state.voteResults).reduce((sum, result) => sum + result.total, 0)} votos</span></div>
                {eventQuestions.map((item) => {
                  const itemResults = getQuestionResults(state, item.id);
                  return <div className="ft-global-result-row" key={item.id}><strong>{item.statement}</strong><span>Mito {itemResults.mythPercent}% · Realidad {itemResults.realityPercent}% · {itemResults.total} votos</span></div>;
                })}
              </div>
            ) : state.revealedQuestionId === question.id ? (
              <div className="ft-result-panel">
                <div className="ft-result-heading"><strong>Resultado de esta pregunta</strong><span>{results.total} votos</span></div>
                <div className="ft-result-label"><span>Mito</span><b>{results.mythPercent}%</b></div><div className="ft-result-track"><i style={{ width: `${results.mythPercent}%` }} /></div>
                <div className="ft-result-label"><span>Realidad</span><b>{results.realityPercent}%</b></div><div className="ft-result-track reality"><i style={{ width: `${results.realityPercent}%` }} /></div>
              </div>
            ) : null}
            {!state.eventFinished && <div className="ft-stage-controls">
              <button className="ft-control-button" onClick={() => void moveTo(Math.max(0, activeQuestionIndex - 1))} disabled={activeQuestionIndex === 0 || busy}><ArrowLeft size={16} /> Anterior</button>
              {state.pollStatus === "open" ? (
                <button className="ft-control-button ft-control-warn" onClick={() => void closePoll()} disabled={busy}><LockKeyhole size={16} /> Cerrar y revelar</button>
              ) : (
                <button className="ft-control-button ft-control-primary" onClick={() => void openPoll()} disabled={busy}><UnlockKeyhole size={16} /> Abrir voto</button>
              )}
              <button className="ft-control-button ft-control-primary" onClick={() => void moveTo(Math.min(eventQuestions.length - 1, activeQuestionIndex + 1))} disabled={activeQuestionIndex === eventQuestions.length - 1 || busy}>Siguiente <ArrowRight size={16} /></button>
            </div>}
            {!state.eventFinished && state.pollStatus !== "open" && (
              <div className="ft-reveal-controls">
                <button className="ft-control-button" onClick={() => void revealAll()} disabled={busy}><Eye size={15} /> Revelar todas las votaciones</button>
                {(state.revealAll || state.revealedQuestionId) && <button className="ft-control-button" onClick={() => void hideResults()} disabled={busy}><EyeOff size={15} /> Ocultar resultados</button>}
              </div>
            )}
          </section>
          <aside className="ft-moderator-sidebar">
            <section className={`ft-side-card ft-moderator-timer ${secondsLeft === 0 ? "critical" : secondsLeft <= 10 ? "warning" : timerRunning ? "running" : ""}`}>
              <span className="ft-eyebrow">Timer del moderador</span>
              <div className="ft-timer-display" role="timer" aria-live="off">{formatTime(secondsLeft)}</div>
              <label className="ft-timer-config">Tiempo (segundos)
                <input type="number" min="1" max="5999" value={timerDuration} onChange={(event) => configureTimer(Number(event.target.value))} disabled={timerRunning} />
              </label>
              <div className="ft-timer-actions">
                <button className="ft-control-button ft-control-primary" onClick={() => setTimerRunning((running) => secondsLeft > 0 && !running)} disabled={timerRunning || secondsLeft === 0}>
                  <Play size={15} /> Iniciar
                </button>
                <button className="ft-control-button" onClick={() => setTimerRunning(false)} disabled={!timerRunning}>Pausar</button>
                <button className="ft-control-button" onClick={() => { setTimerRunning(false); setSecondsLeft(timerDuration); }}><RotateCcw size={14} /> Reiniciar</button>
              </div>
            </section>
            <section className="ft-side-card ft-vote-link-card">
              <span className="ft-eyebrow">Acceso del público</span><h2>Escanea para votar</h2>
              <p>El mismo QR sirve toda la sesión; muestra la pregunta activa.</p>
              <img className="ft-vote-qr" src={qrUrl} alt="Código QR para abrir la votación en el celular" />
              <Link to="/events/finding-right-talent/vote" className="ft-button ft-button-primary">Abrir vista móvil <ArrowRight size={16} /></Link>
              <code>{voteUrl}</code>
            </section>
            <section className="ft-side-card"><span className="ft-eyebrow">Experto</span><h2>{question.assigned}</h2><p>La audiencia vota primero; revela el resultado después de cerrar el voto.</p></section>
            <section className="ft-side-card ft-side-agenda"><span className="ft-eyebrow">Ritmo de la ronda</span><p>0:30 Leer · 1:00 votar · 0:30 revelar · 2:00 panelista · 2:00 público · 3:00 debate</p></section>
            <SessionCommentsPanel moderator />
            {state.eventFinished ? (
              <button className="ft-control-button ft-control-primary ft-finish-event" onClick={() => void resumeEvent()} disabled={busy}><Play size={15} /> Reabrir evento y votación</button>
            ) : (
              <button className="ft-control-button ft-control-warn ft-finish-event" onClick={() => void finishEvent()} disabled={busy}><LockKeyhole size={15} /> Finalizar evento</button>
            )}
            {!isRemote && <button className="ft-reset-button" onClick={resetLocalDemo}><RotateCcw size={14} /> Reiniciar datos de esta demo</button>}
          </aside>
        </div>
        <div className="ft-question-list"><h2>Preguntas del evento</h2>
          {[...new Set(eventQuestions.map((item) => item.group))].map((group) => <section className="ft-question-group" key={group}>
            <h3>{group}</h3>
            <div>{eventQuestions.map((item, index) => item.group === group ? (
              <button key={item.id} className={index === activeQuestionIndex ? "active" : ""} onClick={() => void moveTo(index)} disabled={busy}>
                <span>{String(index + 1).padStart(2, "0")}</span>{item.statement}<Play size={13} />
              </button>
            ) : null)}</div>
          </section>)}
        </div>
      </div>
    </main>
  );
}
