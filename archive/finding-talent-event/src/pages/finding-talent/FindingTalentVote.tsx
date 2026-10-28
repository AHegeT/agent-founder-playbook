import { Check, Clock3, Linkedin } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { EventHeader } from "@/components/finding-talent/EventHeader";
import { SessionCommentsPanel } from "@/components/finding-talent/SessionCommentsPanel";
import {
  EVENT_STORAGE_KEY,
  eventQuestions,
  eventPanelists,
  getQuestionResults,
  getVoterId,
  submitEventVote,
  type VoteChoice,
} from "@/lib/findingTalent";
import { useFindingTalentState } from "@/lib/useFindingTalentState";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import "./FindingTalentEvent.css";

const ATTENDEE_EMAIL_KEY = `${EVENT_STORAGE_KEY}-attendee-email`;

export default function FindingTalentVote() {
  const { state, loading, error: stateError } = useFindingTalentState();
  const [attendeeEmail, setAttendeeEmail] = useState(() => window.localStorage.getItem(ATTENDEE_EMAIL_KEY) ?? "");
  const [email, setEmail] = useState(() => window.localStorage.getItem(ATTENDEE_EMAIL_KEY) ?? "");
  const [stage, setStage] = useState<"email" | "profile" | "vote">("email");
  const [attendeeName, setAttendeeName] = useState("");
  const [checkingAttendee, setCheckingAttendee] = useState(false);
  const [identityLoading, setIdentityLoading] = useState(false);
  const [attendeeReady, setAttendeeReady] = useState(false);
  const [role, setRole] = useState("");
  const [companyUrl, setCompanyUrl] = useState("");
  const [organization, setOrganization] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [identityError, setIdentityError] = useState("");
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
    if (!isSupabaseConfigured || !attendeeEmail) return;
    let alive = true;
    setIdentityLoading(true);
    void supabase?.rpc("check_finding_talent_attendee", { p_email: attendeeEmail }).then(({ data, error }) => {
      if (!alive) return;
      if (error) setIdentityError(error.message);
      else {
        const result = data as { registered: boolean; display_name?: string | null };
        if (result.registered) {
          setAttendeeReady(true);
          setAttendeeName(result.display_name ?? "");
          setStage("vote");
        } else {
          setAttendeeReady(false);
          setStage("profile");
        }
      }
      setIdentityLoading(false);
    });
    return () => { alive = false; };
  }, []);

  const checkEmail = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();
    setIdentityError("");
    setCheckingAttendee(true);
    if (!supabase) {
      setAttendeeEmail(normalizedEmail);
      setAttendeeReady(true);
      setStage("vote");
      setCheckingAttendee(false);
      return;
    }
    const { data, error } = await supabase.rpc("check_finding_talent_attendee", { p_email: normalizedEmail });
    if (error) {
      setIdentityError(error.message);
    } else {
      const result = data as { registered: boolean; rostered: boolean; display_name?: string | null };
      setAttendeeEmail(normalizedEmail);
      if (result.registered) {
        setAttendeeName(result.display_name ?? "");
        setAttendeeReady(true);
        setStage("vote");
        window.localStorage.setItem(ATTENDEE_EMAIL_KEY, normalizedEmail);
      } else {
        setStage("profile");
      }
    }
    setCheckingAttendee(false);
  };

  const saveProfile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!supabase) {
      setAttendeeEmail(email.trim().toLowerCase());
      setAttendeeReady(true);
      setStage("vote");
      return;
    }
    setIdentityBusy(true);
    setIdentityError("");
    const { error } = await supabase.rpc("register_finding_talent_participant", {
      p_email: attendeeEmail,
      p_role: role,
      p_organization: organization,
      p_company_url: companyUrl,
      p_linkedin_url: linkedinUrl,
    });
    if (error) setIdentityError(error.message);
    else {
      setAttendeeReady(true);
      setStage("vote");
      window.localStorage.setItem(ATTENDEE_EMAIL_KEY, attendeeEmail);
    }
    setIdentityBusy(false);
  };

  const changeEmail = () => {
    setAttendeeReady(false);
    setStage("email");
    setEmail("");
    setAttendeeEmail("");
    setAttendeeName("");
    setRole("");
    setCompanyUrl("");
    setOrganization("");
    setLinkedinUrl("");
    setSubmittedQuestions({});
    window.localStorage.removeItem(ATTENDEE_EMAIL_KEY);
  };

  useEffect(() => {
    setSelected(null);
    setVoteError("");
    if (supabase && attendeeReady && attendeeEmail) {
      let alive = true;
      void supabase.rpc("has_finding_talent_voted", { p_question_id: question.id, p_email: attendeeEmail })
        .then(({ data, error }) => {
          if (!alive) return;
          if (error) setVoteError(error.message);
          setSubmittedQuestions((current) => ({ ...current, [question.id]: data === true }));
        });
      return () => { alive = false; };
    }
    setSubmittedQuestions((current) => ({
      ...current,
      [question.id]: current[question.id] || (!isSupabaseConfigured && window.localStorage.getItem(`${EVENT_STORAGE_KEY}-cast-${question.id}`) === "1"),
    }));
  }, [question.id, attendeeEmail, attendeeReady]);

  const sendVote = async () => {
    if (!selected || existingVote || state.pollStatus !== "open") return;
    setSubmitting(true);
    setVoteError("");
    try {
      await submitEventVote(question.id, voterId, selected, attendeeEmail);
      if (!supabase) window.localStorage.setItem(`${EVENT_STORAGE_KEY}-cast-${question.id}`, "1");
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

  if (state.eventFinished) {
    return (
      <main className="ft-page ft-voter-page ft-thanks-page">
        <div className="ft-container ft-voter-container">
          <EventHeader section="Gracias por acompañarnos" compact />
          <section className="ft-thanks-card">
            <span className="ft-eyebrow">Finding the right talent in the agentic era</span>
            <h1>¡Gracias por ser parte de la conversación!</h1>
            <p>Esperamos que te lleves nuevas ideas para encontrar y desarrollar talento en la era de los agentes.</p>
            <h2>Conecta con los ponentes</h2>
            <div className="ft-thanks-speakers">
              {eventPanelists.map((person) => (
                person.linkedin ? (
                  <a key={person.name} href={person.linkedin} target="_blank" rel="noreferrer" className="ft-thanks-speaker">
                    <img className="ft-avatar ft-avatar-photo" src={person.image} alt={person.name} />
                    <span><strong>{person.name}</strong><small>{person.specialty}</small></span>
                    <Linkedin size={18} />
                  </a>
                ) : (
                  <div key={person.name} className="ft-thanks-speaker">
                    <img className="ft-avatar ft-avatar-photo" src={person.image} alt={person.name} />
                    <span><strong>{person.name}</strong><small>{person.specialty}</small></span>
                  </div>
                )
              ))}
            </div>
            <p className="ft-thanks-note">La biografía de Alan se agregará próximamente.</p>
          </section>
        </div>
      </main>
    );
  }

  if (isSupabaseConfigured && (!attendeeReady || stage !== "vote")) {
    return (
      <main className="ft-page ft-voter-page">
        <div className="ft-container ft-voter-container">
          <EventHeader section="Votación en vivo" compact />
          <section className="ft-auth-card ft-attendee-card">
            <span className="ft-eyebrow">Acceso al evento</span>
            {stage === "email" && <>
              <h1>Entra con tu correo.</h1>
              <p>Escribe el correo con el que te registraste al evento.</p>
              <form onSubmit={checkEmail} className="ft-auth-form">
                <label>Correo electrónico<input type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} /></label>
                <button className="ft-button ft-button-primary" disabled={checkingAttendee}>{checkingAttendee ? "Revisando…" : "Continuar"}</button>
              </form>
            </>}
            {stage === "profile" && <>
              <h1>Completa tu perfil.</h1>
              <p><strong>{attendeeEmail}</strong> no aparece en la lista actual. Comparte tu rol o LinkedIn para continuar.</p>
              <form onSubmit={saveProfile} className="ft-auth-form">
                <label>Rol <span>(obligatorio si no agregas LinkedIn)</span><input maxLength={120} value={role} onChange={(event) => setRole(event.target.value)} /></label>
                <label>LinkedIn <span>(obligatorio si no agregas tu rol)</span><input type="url" placeholder="https://linkedin.com/in/..." value={linkedinUrl} onChange={(event) => setLinkedinUrl(event.target.value)} /></label>
                <label>Organización <span>(opcional)</span><input autoComplete="organization" maxLength={120} value={organization} onChange={(event) => setOrganization(event.target.value)} /></label>
                <label>Sitio web de tu empresa <span>(opcional)</span><input type="url" placeholder="https://..." value={companyUrl} onChange={(event) => setCompanyUrl(event.target.value)} /></label>
                <button className="ft-button ft-button-primary" disabled={identityBusy || (!role.trim() && !linkedinUrl.trim())}>{identityBusy ? "Guardando…" : "Continuar a la votación"}</button>
              </form>
              <button type="button" className="ft-text-link ft-auth-toggle" onClick={changeEmail}>Cambiar correo</button>
            </>}
            {identityError && <div className="ft-form-error">{identityError}</div>}
            <p className="ft-auth-help">Cada correo puede votar una vez por pregunta.</p>
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
          <div className="ft-voter-event">FINDING THE RIGHT TALENT <span>·</span> {state.activeQuestionIndex + 1}/{eventQuestions.length}</div>
          {attendeeEmail && <button className="ft-voter-account" onClick={changeEmail}>{attendeeName || attendeeEmail} · Cambiar correo</button>}
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
          <SessionCommentsPanel attendeeEmail={attendeeEmail} />
        </div>
        {!isSupabaseConfigured && <p className="ft-prototype-note">Modo local: los cambios solo se sincronizan en este navegador.</p>}
      </div>
    </main>
  );
}
