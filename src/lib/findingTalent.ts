import { supabase } from "@/lib/supabase";
import maryImage from "@/assets/members/mary_martinez.png";
import lauImage from "@/assets/members/lauyumi_rojas.jpeg";
import alanImage from "@/assets/members/alan_hegewisch.jpeg";
import urielImage from "@/assets/members/uriel_valtierra.jpeg";

export type VoteChoice = "myth" | "reality";
export type PollStatus = "open" | "closed" | "revealed";

export type EventQuestion = {
  id: string;
  block: string;
  group: string;
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
  { initials: "MM", name: "Mary Martínez", specialty: "Talento · Operaciones", bio: "Como consultora de Recursos Humanos en WIND HR, ha liderado operaciones de talento en Latinoamérica y creado funciones de RR. HH. desde cero en empresas en crecimiento. Su trayectoria incluye reclutamiento, gestión de personas y asesoría a líderes de equipos remotos y organizaciones en expansión.", linkedin: "https://www.linkedin.com/in/marymartinezhr/", image: maryImage },
  { initials: "LR", name: "Lauyumi Rojas", specialty: "Operaciones · Talento", bio: "Como COO y cofundadora de WIND HR, ha escalado negocios, creado sistemas para organizar operaciones y liderado equipos multidisciplinarios. También asesora a startups y empresas en crecimiento para optimizar procesos e incorporar automatización e inteligencia artificial.", linkedin: "https://www.linkedin.com/in/lauyumiopsmx/", image: lauImage },
  { initials: "AH", name: "Alan Hegewisch", specialty: "Ingeniería · Datos & IA", bio: "Como fundador y CTO de Synapse, lidera una PropTech que ayuda a desarrolladores inmobiliarios a tener visibilidad financiera sobre sus proyectos usando agentes de IA. Ingeniero de software con más de 10 años de experiencia, ha trabajado como tech lead y engineering manager, ayudando a escalar equipos distribuidos.", linkedin: "https://www.linkedin.com/in/alan-hegewisch/", image: alanImage },
  { initials: "UV", name: "Uriel Valtierra", specialty: "PropTech · Inmobiliario", bio: "Como fundador y CEO de Portofoly, lidera una PropTech que conecta a constructores, asesores inmobiliarios y compradores. Tiene 15 años de experiencia construyendo negocios. Hoy impulsa soluciones de software y agentes de IA para mejorar la comercialización inmobiliaria y la experiencia de compra.", linkedin: "https://www.linkedin.com/in/valtierrac/", image: urielImage },
];

export const eventQuestions: EventQuestion[] = [
  {
    id: "warmup-opening",
    block: "Pregunta del evento",
    group: "Pregunta del evento",
    statement: "La IA va a reemplazar a los humanos en los empleos.",
    assigned: "Voto del público · se retoma al cierre",
    kind: "warmup",
  },
  {
    id: "block-1-1",
    block: "Bloque 1 · Cómo encontramos talento",
    group: "Bloque 1 · Preguntas principales",
    statement: "La IA es más objetiva que un reclutador humano.",
    assigned: "Lauyumi Rojas y Mary Martínez",
    kind: "discussion",
  },
  {
    id: "block-1-2",
    block: "Bloque 1 · Cómo encontramos talento",
    group: "Bloque 1 · Preguntas principales",
    statement: "Si tu CV no tiene las palabras clave correctas, ningún humano lo va a ver.",
    assigned: "Mary Martínez",
    kind: "discussion",
  },
  {
    id: "block-1-3",
    block: "Bloque 1 · Cómo encontramos talento",
    group: "Bloque 1 · Preguntas principales",
    statement: "Usar IA para preparar tu CV o tu entrevista es trampa.",
    assigned: "Lauyumi Rojas y Uriel Valtierra",
    kind: "discussion",
  },
  {
    id: "block-1-extra-1",
    block: "Bloque 1 · Si hay tiempo",
    group: "Bloque 1 · Si hay tiempo",
    statement: "La IA puede detectar si mientes en una entrevista.",
    assigned: "Pregunta extra",
    kind: "discussion",
  },
  {
    id: "block-1-extra-2",
    block: "Bloque 1 · Si hay tiempo",
    group: "Bloque 1 · Si hay tiempo",
    statement: "Las empresas que no adopten IA en RH se van a quedar atrás.",
    assigned: "Pregunta extra",
    kind: "discussion",
  },
  {
    id: "block-2-1",
    block: "Bloque 2 · Qué talento buscamos",
    group: "Bloque 2 · Preguntas principales",
    statement: "Si un agente puede hacer la tarea, ya no necesitas contratar a alguien para ella.",
    assigned: "Alan Hegewisch y Lauyumi Rojas",
    kind: "discussion",
  },
  {
    id: "block-2-2",
    block: "Bloque 2 · Qué talento buscamos",
    group: "Bloque 2 · Preguntas principales",
    statement: "Saber usar IA ya es más importante que tener experiencia.",
    assigned: "Uriel Valtierra",
    kind: "discussion",
  },
  {
    id: "block-2-3",
    block: "Bloque 2 · Qué talento buscamos",
    group: "Bloque 2 · Preguntas principales",
    statement: "Un perfil promedio con buenos agentes rinde más que un perfil brillante sin ellos.",
    assigned: "Alan Hegewisch",
    kind: "discussion",
  },
  {
    id: "extra-1",
    block: "Preguntas extra",
    group: "Preguntas extra",
    statement: "El talento del futuro no ejecuta, supervisa agentes.",
    assigned: "Pregunta extra",
    kind: "discussion",
  },
  {
    id: "extra-2",
    block: "Preguntas extra",
    group: "Preguntas extra",
    statement: "Si sabes usar IA, nunca te vas a quedar sin trabajo.",
    assigned: "Pregunta extra",
    kind: "discussion",
  },
  {
    id: "extra-3",
    block: "Preguntas extra",
    group: "Preguntas extra",
    statement: "Si la IA te ayudó a hacer el trabajo, no es realmente tuyo.",
    assigned: "Pregunta extra",
    kind: "discussion",
  },
  {
    id: "warmup-closing",
    block: "Cierre · se revisita la pregunta del evento",
    group: "Cierre · se revisita la pregunta del evento",
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
