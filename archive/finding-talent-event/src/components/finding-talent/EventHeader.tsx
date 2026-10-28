import { Link } from "react-router-dom";

type EventHeaderProps = {
  section?: string;
  compact?: boolean;
};

export function EventHeader({ section = "", compact = false }: EventHeaderProps) {
  return (
    <header className={`ft-header ${compact ? "ft-header-compact" : ""}`}>
      <Link className="ft-brand" to="/events/finding-right-talent">
        AGENTS <span>&</span> FOUNDERS
      </Link>
      <div className="ft-header-right">
        {section && <span className="ft-header-section">{section}</span>}
        {!compact && (
          <Link className="ft-header-link" to="/events/finding-right-talent/vote">
            Votar <span aria-hidden="true">↗</span>
          </Link>
        )}
      </div>
    </header>
  );
}
