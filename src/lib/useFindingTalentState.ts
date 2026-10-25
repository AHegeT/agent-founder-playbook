import { useEffect, useState } from "react";
import {
  EVENT_STATE_CHANGED,
  readEventState,
  type EventState,
} from "@/lib/findingTalent";

export function useFindingTalentState() {
  const [state, setState] = useState<EventState>(readEventState);

  useEffect(() => {
    const refresh = () => setState(readEventState());
    window.addEventListener("storage", refresh);
    window.addEventListener(EVENT_STATE_CHANGED, refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener(EVENT_STATE_CHANGED, refresh);
    };
  }, []);

  return state;
}
