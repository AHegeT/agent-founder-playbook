import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { ArrowBigUp, Check, MessageCircle, Send } from "lucide-react";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

type Comment = {
  id: string;
  author: string;
  text: string;
  createdAt: number;
  votes: number;
  voted: boolean;
};

type RemoteComment = {
  id: string;
  author_name: string;
  body: string;
  created_at: string;
  vote_count: number;
  has_voted: boolean;
};

const demoComments: Comment[] = [
  { id: "c-1", author: "Ana", text: "¿Cómo evitamos que los filtros automáticos descarten perfiles atípicos pero valiosos?", createdAt: Date.now() - 2 * 60_000, votes: 8, voted: false },
  { id: "c-2", author: "Carlos", text: "La IA puede ayudar a encontrar candidatos, pero la decisión final necesita contexto humano.", createdAt: Date.now() - 5 * 60_000, votes: 5, voted: false },
  { id: "c-3", author: "Mariana", text: "¿Qué habilidades nuevas están buscando en sus equipos?", createdAt: Date.now() - 9 * 60_000, votes: 3, voted: false },
];

function relativeTime(timestamp: number) {
  const minutes = Math.max(1, Math.floor((Date.now() - timestamp) / 60_000));
  return `${minutes} min`;
}

function messageFor(error: unknown) {
  return error instanceof Error ? error.message : "No se pudo completar la acción.";
}

type Props = { moderator?: boolean; attendeeEmail?: string };

export function SessionCommentsPanel({ moderator = false, attendeeEmail = "" }: Props) {
  const [comments, setComments] = useState<Comment[]>(() => (supabase ? [] : demoComments));
  const [draft, setDraft] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const refresh = useCallback(async () => {
    if (!supabase) return;
    const { data, error: responseError } = await supabase.rpc("get_finding_talent_comments", {
      p_email: attendeeEmail || null,
    });
    if (responseError) {
      setError(responseError.message);
      setLoading(false);
      return;
    }
    setComments(((data ?? []) as RemoteComment[]).map((item) => ({
      id: item.id,
      author: item.author_name,
      text: item.body,
      createdAt: new Date(item.created_at).getTime(),
      votes: Number(item.vote_count),
      voted: item.has_voted,
    })));
    setError("");
    setLoading(false);
  }, [attendeeEmail]);

  useEffect(() => {
    if (!supabase) return;
    void refresh();
    const channel = supabase
      .channel("finding-talent-session-comments")
      .on("postgres_changes", { event: "*", schema: "public", table: "finding_talent_comments" }, () => void refresh())
      .subscribe();
    return () => { void supabase?.removeChannel(channel); };
  }, [refresh]);

  const sortedComments = useMemo(
    () => [...comments].sort((a, b) => b.votes - a.votes || b.createdAt - a.createdAt),
    [comments],
  );

  const submitComment = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text || busy) return;
    setError("");
    if (supabase) {
      if (!attendeeEmail) { setError("Verifica tu correo para publicar comentarios."); return; }
      setBusy(true);
      const { error: responseError } = await supabase.rpc("add_finding_talent_comment", { p_email: attendeeEmail, p_body: text });
      setBusy(false);
      if (responseError) { setError(responseError.message); return; }
      setDraft("");
      setExpanded(true);
      await refresh();
      return;
    }
    setComments((current) => [{ id: crypto.randomUUID(), author: "Tú", text, createdAt: Date.now(), votes: 0, voted: false }, ...current]);
    setDraft("");
    setExpanded(true);
  };

  const vote = async (id: string) => {
    const comment = comments.find((item) => item.id === id);
    if (!comment || comment.voted || busy) return;
    setError("");
    if (supabase) {
      if (!attendeeEmail) { setError("Verifica tu correo para votar en comentarios."); return; }
      setBusy(true);
      const { data, error: responseError } = await supabase.rpc("cast_finding_talent_comment_vote", { p_comment_id: id, p_email: attendeeEmail });
      setBusy(false);
      if (responseError) setError(responseError.message);
      else if (data !== true) setError("Ya registraste tu voto en este comentario.");
      await refresh();
      return;
    }
    setComments((current) => current.map((item) => item.id === id && !item.voted ? { ...item, votes: item.votes + 1, voted: true } : item));
  };

  const dismiss = async (id: string) => {
    setError("");
    if (supabase) {
      setBusy(true);
      const { error: responseError } = await supabase.rpc("dismiss_finding_talent_comment", { p_comment_id: id });
      setBusy(false);
      if (responseError) { setError(responseError.message); return; }
      await refresh();
      return;
    }
    setComments((current) => current.filter((comment) => comment.id !== id));
  };

  return (
    <section className={`ft-comments-card${moderator ? " ft-comments-moderator" : ""}`}>
      {moderator ? (
        <div className="ft-comments-heading">
          <div><span className="ft-eyebrow">Conversación de la sesión</span><h2>Comentarios del público</h2></div>
          <span className="ft-comments-count">{comments.length} activos</span>
        </div>
      ) : (
        <button type="button" className="ft-comments-toggle" onClick={() => setExpanded((open) => !open)} aria-expanded={expanded}>
          <span><MessageCircle size={17} /><strong>Comentarios de la sesión</strong><small>{comments.length}</small></span>
          <span className={`ft-comments-chevron${expanded ? " open" : ""}`}>⌄</span>
        </button>
      )}
      {(moderator || expanded) && <div className="ft-comments-content">
        {!moderator && <p className="ft-comments-intro">Comparte una idea o pregunta para toda la conversación.</p>}
        {!moderator && <form className="ft-comment-form" onSubmit={(event) => void submitComment(event)}>
          <label className="ft-sr-only" htmlFor="session-comment">Escribe un comentario</label>
          <textarea id="session-comment" value={draft} maxLength={400} onChange={(event) => setDraft(event.target.value)} placeholder="¿Qué te gustaría poner sobre la mesa?" rows={2} />
          <div><small>{draft.length}/400</small><button className="ft-button ft-button-primary" disabled={!draft.trim() || busy}><Send size={14} /> {busy ? "Enviando…" : "Publicar"}</button></div>
        </form>}
        {error && <p className="ft-comment-error" role="alert">{error}</p>}
        {loading ? <p className="ft-comments-empty">Cargando comentarios…</p> : <div className="ft-comment-list">
          {sortedComments.length ? sortedComments.map((comment) => <article className="ft-comment" key={comment.id}>
            {!moderator && <button type="button" className={`ft-comment-vote${comment.voted ? " voted" : ""}`} onClick={() => void vote(comment.id)} disabled={comment.voted || busy} aria-label={`${comment.voted ? "Ya votaste por" : "Votar por"} comentario`} aria-pressed={comment.voted}><ArrowBigUp size={17} /><span>{comment.votes}</span></button>}
            <div className="ft-comment-body"><div className="ft-comment-meta"><strong>{comment.author}</strong><time>{relativeTime(comment.createdAt)}</time></div><p>{comment.text}</p></div>
            {moderator && <div className="ft-comment-moderator-actions"><span className="ft-comment-score"><ArrowBigUp size={15} /> {comment.votes}</span><button type="button" className="ft-comment-dismiss" onClick={() => void dismiss(comment.id)} disabled={busy}><Check size={14} /> Discutido</button></div>}
          </article>) : <p className="ft-comments-empty">No hay comentarios activos. ¡Abre la conversación!</p>}
        </div>}
      </div>}
    </section>
  );
}
