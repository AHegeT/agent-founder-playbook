import { Check, Clock3, Radio } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import type { Session } from "@supabase/supabase-js";
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
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import "./FindingTalentEvent.css";

export default function FindingTalentVote() {
  const { state, loading, error: stateError } = useFindingTalentState();
  const [session, setSession] = useState<Session | null>(null);
  const [profileReady, setProfileReady] = useState(!isSupabaseConfigured);
  const [identityLoading, setIdentityLoading] = useState(isSupabaseConfigured);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [organization, setOrganization] = useState("");
  const [eventIntent, setEventIntent] = useState("");
  const [identityError, setIdentityError] = useState("");
  const [identityNotice, setIdentityNotice] = useState("");
  const [identityBusy, setIdentityBusy] = useState(false);
  const [selected, setSelected] = useState<VoteChoice | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [voteError, setVoteError] = useState("");
  const [submittedQuestions, setSubmittedQuestions] = useState<Record<string, boolean>>({});
  const question = eventQuestions[state.activeQuestionIndex];
  const voterId = getVoterId();
  const localVote = state.votes.find((vote) => vote.questionId === question.id && vote.voterId === voterId);
  const existingVote = isSupabaseConfigured ? submittedQuestions[question.id] : localVote || submittedQuestions[question.id];
  const results = getQuestionResults(state, question.id);

  useEffect(() => {
    if (!supabase) return;
    let alive = true;
    const loadIdentity = async (nextSession: Session | null) => {
      if (!alive) return;
      setIdentityLoading(true);
      setSession(nextSession);
      setIdentityError("");
      if (!nextSession) {
        setProfileReady(false);
        setIdentityLoading(false);
        return;
      }
      // If the email matches an imported RSVP, link this auth account to that roster entry.
      // Accounts not in the RSVP list remain allowed, as the event can accept new registrations.
      await supabase.rpc("claim_finding_talent_attendee");
      if (!alive) return;
      const { data, error } = await supabase
        .from("finding_talent_participants")
        .select("display_name,organization,event_intent")
        .eq("user_id", nextSession.user.id)
        .maybeSingle();
      if (!alive) return;
      if (error) {
        setIdentityError(error.message);
        setProfileReady(false);
        setIdentityStep("profile");
      } else if (data) {
        setDisplayName(data.display_name);
        setOrganization(data.organization ?? "");
        setEventIntent(data.event_intent ?? "");
        setProfileReady(true);
      } else {
        setEmail(nextSession.user.email ?? "");
        setProfileReady(false);
      }
      setIdentityLoading(false);
    };
    void supabase.auth.getSession().then(({ data }) => void loadIdentity(data.session));
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      void loadIdentity(nextSession);
    });
    return () => {
      alive = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  const authenticate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!supabase) return;
    setIdentityBusy(true);
    setIdentityError("");
    setIdentityNotice("");
    if (authMode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (error) setIdentityError(error.message);
    } else {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: { emailRedirectTo: `${window.location.origin}/events/finding-right-talent/vote` },
      });
      if (error) setIdentityError(error.message);
      else if (!data.session) {
        setIdentityNotice("Cuenta creada. Revisa tu correo si Supabase solicita confirmar la dirección; después inicia sesión con tu contraseña.");
        setAuthMode("login");
      }
    }
    setIdentityBusy(false);
  };

  const saveProfile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!supabase || !session?.user.email) return;
    setIdentityBusy(true);
    setIdentityError("");
    const { error } = await supabase.from("finding_talent_participants").upsert({
      user_id: session.user.id,
      email: session.user.email,
      display_name: displayName.trim(),
      organization: organization.trim() || null,
      event_intent: eventIntent.trim() || null,
      updated_at: new Date().toISOString(),
    });
    if (error) setIdentityError(error.message);
    else setProfileReady(true);
    setIdentityBusy(false);
  };

  const signOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setProfileReady(false);
    setSubmittedQuestions({});
  };

  useEffect(() => {
    setSelected(null);
    setVoteError("");
    if (supabase && session?.user.id) {
      let alive = true;
      void supabase.from("finding_talent_votes").select("question_id")
        .eq("question_id", question.id).eq("user_id", session.user.id).maybeSingle()
        .then(({ data, error }) => {
          if (!alive) return;
          if (error) setVoteError(error.message);
          setSubmittedQuestions((current) => ({ ...current, [question.id]: Boolean(data) }));
        });
      return () => { alive = false; };
    }
    setSubmittedQuestions((current) => ({
      ...current,
      [question.id]: current[question.id] || (!isSupabaseConfigured && window.localStorage.getItem(`${EVENT_STORAGE_KEY}-cast-${question.id}`) === "1"),
    }));
  }, [question.id, session?.user.id]);

  const sendVote = async () => {
    if (!selected || existingVote || state.pollStatus !== "open") return;
    setSubmitting(true);
    setVoteError("");
    try {
      await submitEventVote(question.id, voterId, selected, session?.user.id);
      window.localStorage.setItem(`${EVENT_STORAGE_KEY}-cast-${question.id}`, "1");
      setSubmittedQuestions((current) => ({ ...current, [question.id]: true }));
    } catch (error) {
      const message = error instanceof Error ? error.message : "No se pudo guardar el voto.";
      setVoteError(message.includes("duplicate") || message.includes("unique")
        ? "Este correo ya registró un voto para esta pregunta."
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

  if (isSupabaseConfigured && identityLoading) {
    return <main className="ft-page ft-voter-page"><div className="ft-container ft-voter-container"><EventHeader section="Votación en vivo" compact /><p className="ft-page-message">Verificando tu acceso…</p></div></main>;
  }

  if (stateError) {
    return <main className="ft-page ft-voter-page"><div className="ft-container ft-voter-container"><EventHeader section="Votación en vivo" compact /><div className="ft-form-error">No se pudo cargar la pregunta del evento: {stateError}</div></div></main>;
  }

  if (isSupabaseConfigured && (!session || !profileReady)) {
    return (
      <main className="ft-page ft-voter-page">
        <div className="ft-container ft-voter-container">
          <EventHeader section="Votación en vivo" compact />
          <section className="ft-auth-card ft-attendee-card">
            <span className="ft-eyebrow">Acceso al evento</span>
            {!session && <>
              <h1>{authMode === "login" ? "Entra para registrar tu voto." : "Crea tu acceso al evento."}</h1>
              <p>Usa el correo con el que te registraste al evento, o crea una cuenta con otro correo.</p>
              <form onSubmit={authenticate} className="ft-auth-form">
                <label>Correo electrónico<input type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} /></label>
                <label>Contraseña<input type="password" autoComplete={authMode === "login" ? "current-password" : "new-password"} required minLength={6} value={password} onChange={(event) => setPassword(event.target.value)} /></label>
                <button className="ft-button ft-button-primary" disabled={identityBusy}>{identityBusy ? "Un momento…" : authMode === "login" ? "Iniciar sesión" : "Crear cuenta"}</button>
              </form>
              <button type="button" className="ft-text-link ft-auth-toggle" onClick={() => { setAuthMode(authMode === "login" ? "signup" : "login"); setIdentityError(""); setIdentityNotice(""); }}>{authMode === "login" ? "¿Primera vez? Crea una cuenta" : "¿Ya tienes cuenta? Inicia sesión"}</button>
            </>}
            {session && !profileReady && <>
              <h1>Cuéntanos un poco de ti.</h1><p>Esto nos ayuda a entender quiénes están en la conversación. Solo usaremos estos datos para el evento.</p>
              <form onSubmit={saveProfile} className="ft-auth-form">
                <label>Nombre<input autoComplete="name" required maxLength={100} value={displayName} onChange={(event) => setDisplayName(event.target.value)} /></label>
                <label>Organización <span>(opcional)</span><input autoComplete="organization" maxLength={120} value={organization} onChange={(event) => setOrganization(event.target.value)} /></label>
                <label>¿Qué te gustaría llevarte del evento? <span>(opcional)</span><textarea maxLength={240} rows={3} value={eventIntent} onChange={(event) => setEventIntent(event.target.value)} /></label>
                <button className="ft-button ft-button-primary" disabled={identityBusy}>{identityBusy ? "Guardando…" : "Continuar a la votación"}</button>
              </form>
            </>}
            {identityError && <div className="ft-form-error">{identityError}</div>}
            {identityNotice && <div className="ft-auth-notice">{identityNotice}</div>}
            <p className="ft-auth-help">Cada cuenta puede votar una vez por pregunta.</p>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="ft-page ft-voter-page">
      <div className="ft-container ft-voter-container">
        <EventHeader section="Votación en vivo" compact />
        <div className="ft-phone-card">
          <div className="ft-voter-brand">AGENTS <span>&</span> FOUNDERS <Radio size={15} /></div>
          <div className="ft-voter-event">FINDING THE RIGHT TALENT <span>·</span> {state.activeQuestionIndex + 1}/{eventQuestions.length}</div>
          {session && <button className="ft-voter-account" onClick={() => void signOut()}>{session.user.email} · Cambiar cuenta</button>}
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
                <p className="ft-anonymous-note">Un voto por correo verificado y pregunta.</p>
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
