import { supabase } from "@/lib/supabase";

export type VoteChoice = "myth" | "reality";
export type PollStatus = "open" | "closed" | "revealed";

export type EventQuestion = {
  id: string;
  block: string;
  statement: string;
  assigned: string;
  kind: "warmup" | "discussion";
};

export type EventVote = {
  questionId: string;
  voterId: string;
  choice: VoteChoice;
};

export type EventState = {
  activeQuestionIndex: number;
  pollStatus: PollStatus;
  eventFinished: boolean;
  votes: EventVote[];
  revealedQuestionId: string | null;
  revealAll: boolean;
  voteResults: Record<string, VoteCounts>;
};

export type VoteCounts = { myth: number; reality: number; total: number };

export const EVENT_STORAGE_KEY = "finding-right-talent-event-v1";
export const EVENT_STATE_CHANGED = "finding-right-talent-state-changed";

export const eventPanelists = [
  { initials: "MM", name: "Mary Martínez", specialty: "Recursos Humanos", bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Como líder de talento, explora nuevas formas de conectar personas con oportunidades en un mundo de trabajo cambiante.", linkedin: "https://www.linkedin.com/in/example-mary-martinez" },
  { initials: "LR", name: "Lauyumi Rojas", specialty: "Operaciones", bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Convierte retos operativos en sistemas claros y escalables para equipos y negocios en crecimiento.", linkedin: "https://www.linkedin.com/in/example-lauyumi-rojas" },
  { initials: "AH", name: "Alan Hegewisch", specialty: "Tecnología", bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Construye productos con IA y ayuda a founders a llevar ideas con agentes a soluciones prácticas.", linkedin: "https://www.linkedin.com/in/example-alan-hegewisch" },
  { initials: "UV", name: "Uriel Valtierra", specialty: "Negocios", bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Trabaja en estrategia comercial y crecimiento de negocios preparados para la era de los agentes.", linkedin: "https://www.linkedin.com/in/example-uriel-valtierra" },
];

export const eventQuestions: EventQuestion[] = [
  {
    id: "warmup-opening",
    block: "Voto inicial",
    statement: "La IA va a reemplazar a los humanos en los empleos.",
    assigned: "Voto del público · se retoma al cierre",
    kind: "warmup",
  },
  {
    id: "block-1-1",
    block: "Bloque 1 · Cómo encontramos talento",
    statement: "La IA es más objetiva que un reclutador humano.",
    assigned: "Lauyumi Rojas y Mary Martínez",
    kind: "discussion",
  },
  {
    id: "block-1-2",
    block: "Bloque 1 · Cómo encontramos talento",
    statement: "Si tu CV no tiene las palabras clave correctas, ningún humano lo va a ver.",
    assigned: "Mary Martínez",
    kind: "discussion",
  },
  {
    id: "block-1-3",
    block: "Bloque 1 · Cómo encontramos talento",
    statement: "Usar IA para preparar tu CV o tu entrevista es trampa.",
    assigned: "Lauyumi Rojas y Uriel Valtierra",
    kind: "discussion",
  },
  {
    id: "block-2-1",
    block: "Bloque 2 · Qué talento buscamos",
    statement: "Si un agente puede hacer la tarea, ya no necesitas contratar a alguien para ella.",
    assigned: "Alan Hegewisch y Lauyumi Rojas",
    kind: "discussion",
  },
  {
    id: "block-2-2",
    block: "Bloque 2 · Qué talento buscamos",
    statement: "Saber usar IA ya es más importante que tener experiencia.",
    assigned: "Uriel Valtierra",
    kind: "discussion",
  },
  {
    id: "block-2-3",
    block: "Bloque 2 · Qué talento buscamos",
    statement: "Un perfil promedio con buenos agentes rinde más que un perfil brillante sin ellos.",
    assigned: "Alan Hegewisch",
    kind: "discussion",
  },
  {
    id: "warmup-closing",
    block: "Voto final",
    statement: "La IA va a reemplazar a los humanos en los empleos.",
    assigned: "Compara el resultado con el voto inicial",
    kind: "warmup",
  },
];

const initialState: EventState = {
  activeQuestionIndex: 0,
  pollStatus: "open",
  eventFinished: false,
  votes: [],
  revealedQuestionId: null,
  revealAll: false,
  voteResults: {},
};

export function readEventState(): EventState {
  if (typeof window === "undefined") return initialState;

  try {
    const saved = window.localStorage.getItem(EVENT_STORAGE_KEY);
    if (!saved) return initialState;
    const parsed = JSON.parse(saved) as Partial<EventState>;
    return {
      activeQuestionIndex: Math.min(
        Math.max(0, parsed.activeQuestionIndex ?? 0),
        eventQuestions.length - 1,
      ),
      pollStatus: parsed.pollStatus ?? "open",
      eventFinished: parsed.eventFinished ?? false,
      votes: Array.isArray(parsed.votes) ? parsed.votes : [],
      revealedQuestionId: parsed.revealedQuestionId ?? null,
      revealAll: parsed.revealAll ?? false,
      voteResults: {},
    };
  } catch {
    return initialState;
  }
}

export async function saveEventState(state: EventState) {
  if (supabase) {
    const question = eventQuestions[state.activeQuestionIndex];
    const { error } = await supabase
      .from("finding_talent_state")
      .update({
        active_question_id: question.id,
        poll_status: state.pollStatus,
        event_finished: state.eventFinished,
        revealed_question_id: state.revealedQuestionId,
        reveal_all: state.revealAll,
        updated_at: new Date().toISOString(),
      })
      .eq("singleton", true);
    if (error) throw error;
    return;
  }

  window.localStorage.setItem(EVENT_STORAGE_KEY, JSON.stringify(state));
  window.dispatchEvent(new Event(EVENT_STATE_CHANGED));
}

export async function submitEventVote(questionId: string, voterId: string, choice: VoteChoice, attendeeEmail?: string) {
  if (supabase) {
    if (!attendeeEmail) throw new Error("Ingresa tu correo antes de votar.");
    const { data, error } = await supabase.rpc("cast_finding_talent_vote", {
      p_question_id: questionId,
      p_voter_email: attendeeEmail,
      p_choice: choice,
    });
    if (error) throw error;
    if (!data) throw new Error("Este correo ya registró un voto o la votación se cerró.");
    return;
  }

  const state = readEventState();
  if (state.pollStatus !== "open") throw new Error("La votación ya está cerrada.");
  if (state.votes.some((vote) => vote.questionId === questionId && vote.voterId === voterId)) {
    throw new Error("Ya registraste tu voto en esta pregunta.");
  }
  saveEventState({ ...state, votes: [...state.votes, { questionId, voterId, choice }] });
}

export function getVoterId() {
  const key = `${EVENT_STORAGE_KEY}-voter`;
  let voterId = window.localStorage.getItem(key);
  if (!voterId) {
    voterId = typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
          const random = Math.random() * 16 | 0;
          return (char === "x" ? random : (random & 0x3 | 0x8)).toString(16);
        });
    window.localStorage.setItem(key, voterId);
  }
  return voterId;
}

export function getQuestionResults(state: EventState, questionId: string) {
  const savedCounts = state.voteResults[questionId];
  if (savedCounts) {
    return {
      ...savedCounts,
      mythPercent: savedCounts.total ? Math.round((savedCounts.myth / savedCounts.total) * 100) : 0,
      realityPercent: savedCounts.total ? Math.round((savedCounts.reality / savedCounts.total) * 100) : 0,
    };
  }
  const questionVotes = state.votes.filter((vote) => vote.questionId === questionId);
  const myth = questionVotes.filter((vote) => vote.choice === "myth").length;
  const reality = questionVotes.filter((vote) => vote.choice === "reality").length;
  const total = questionVotes.length;
  return {
    myth,
    reality,
    total,
    mythPercent: total ? Math.round((myth / total) * 100) : 0,
    realityPercent: total ? Math.round((reality / total) * 100) : 0,
  };
}
