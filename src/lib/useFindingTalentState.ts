import { useCallback, useEffect, useState } from "react";
import {
  EVENT_STATE_CHANGED,
  eventQuestions,
  readEventState,
  type EventState,
  type VoteCounts,
} from "@/lib/findingTalent";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

type RemoteSnapshot = {
  singleton: boolean;
  active_question_id: string;
  screen_view: EventState["screenView"];
  poll_status: EventState["pollStatus"];
  event_finished: boolean;
  revealed_question_id: string | null;
  reveal_all: boolean;
};

type RemoteResult = {
  question_id: string;
  myth_votes: number;
  reality_votes: number;
  total_votes: number;
};

export function useFindingTalentState() {
  const [state, setState] = useState<EventState>(readEventState);
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!supabase) {
      setState(readEventState());
      setLoading(false);
      setError(null);
      return;
    }

    const [stateResponse, resultsResponse] = await Promise.all([
      supabase.from("finding_talent_state").select("*").eq("singleton", true).maybeSingle(),
      supabase.rpc("get_finding_talent_results"),
    ]);
    if (stateResponse.error) {
      setError(stateResponse.error.message);
      setLoading(false);
      return;
    }
    if (!stateResponse.data) {
      setError("La migración de Supabase está aplicada, pero falta inicializar el estado del evento.");
      setLoading(false);
      return;
    }
    if (resultsResponse.error) {
      setError(resultsResponse.error.message);
      setLoading(false);
      return;
    }

    const remote = stateResponse.data as RemoteSnapshot;
    const activeQuestionIndex = eventQuestions.findIndex((question) => question.id === remote.active_question_id);
    const voteResults = Object.fromEntries(
      ((resultsResponse.data ?? []) as RemoteResult[]).map((result) => [
        result.question_id,
        {
          myth: Number(result.myth_votes),
          reality: Number(result.reality_votes),
          total: Number(result.total_votes),
        } satisfies VoteCounts,
      ]),
    );
    setState({
      activeQuestionIndex: Math.max(0, activeQuestionIndex),
      screenView: remote.screen_view === "landing" ? "landing" : "questions",
      pollStatus: remote.poll_status,
      eventFinished: remote.event_finished ?? false,
      votes: [],
      revealedQuestionId: remote.revealed_question_id,
      revealAll: remote.reveal_all,
      voteResults,
    });
    setError(null);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!supabase) {
      const refreshLocal = () => setState(readEventState());
      window.addEventListener("storage", refreshLocal);
      window.addEventListener(EVENT_STATE_CHANGED, refreshLocal);
      refreshLocal();
      return () => {
        window.removeEventListener("storage", refreshLocal);
        window.removeEventListener(EVENT_STATE_CHANGED, refreshLocal);
      };
    }

    void refresh();
    const channel = supabase
      .channel("finding-talent-event-state")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "finding_talent_state", filter: "singleton=eq.true" },
        () => void refresh(),
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") void refresh();
      });
    const resultsInterval = window.setInterval(() => void refresh(), 2500);
    return () => {
      window.clearInterval(resultsInterval);
      void supabase.removeChannel(channel);
    };
  }, [refresh]);

  return { state, loading, error, isRemote: isSupabaseConfigured, refresh };
}
