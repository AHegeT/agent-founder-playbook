import { EventHeader } from "@/components/finding-talent/EventHeader";
import "./FindingTalentEvent.css";

export default function FindingTalentQr() {
  const eventUrl = `${window.location.origin}/events/finding-right-talent`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=420x420&margin=2&data=${encodeURIComponent(eventUrl)}`;

  return (
    <main className="ft-page ft-qr-page">
      <div className="ft-container">
        <EventHeader section="QR del evento" compact />
        <section className="ft-qr-card">
          <span className="ft-eyebrow">Finding the right talent in the agentic era</span>
          <h1>Escanea para conocer el evento</h1>
          <img src={qrUrl} alt="Código QR para abrir Finding Right Talent" />
          <p>Abre la información del evento y conoce a los ponentes.</p>
        </section>
      </div>
    </main>
  );
}
