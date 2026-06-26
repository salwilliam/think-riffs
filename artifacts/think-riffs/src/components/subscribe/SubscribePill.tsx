import { useEffect, useState } from "react";
import SubscribeModal from "./SubscribeModal";

const DISMISS_KEY = "kw_subscribe_dismissed";
const DISMISS_TTL = 7 * 24 * 60 * 60 * 1000;

function isDismissed() {
  const val = localStorage.getItem(DISMISS_KEY);
  if (!val) return false;
  return Date.now() < Number(val);
}

export default function SubscribePill() {
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (isDismissed()) return;

    const handleScroll = () => {
      const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (scrolled >= 0.25) setVisible(true);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDismiss = () => {
    localStorage.setItem(DISMISS_KEY, String(Date.now() + DISMISS_TTL));
    setVisible(false);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
      <div
        style={{
          position: "fixed", bottom: "1.5rem", right: "1.5rem", zIndex: 8000,
          display: "flex", alignItems: "center", gap: ".6rem",
          background: "hsl(210, 65%, 48%)", color: "#fff",
          borderRadius: "999px", padding: ".55rem 1rem .55rem .85rem",
          boxShadow: "0 4px 20px rgba(0,0,0,0.22)",
          animation: "fadeSlideUp .35s ease",
        }}
      >
        <button
          onClick={() => setModalOpen(true)}
          style={{
            background: "none", border: "none", color: "#fff",
            fontWeight: 700, fontSize: ".9rem", cursor: "pointer",
            fontFamily: "'Faculty Glyphic', sans-serif", padding: 0,
            whiteSpace: "nowrap",
          }}
        >
          Subscribe to Think Riffs
        </button>
        <button
          onClick={handleDismiss}
          aria-label="Dismiss"
          style={{
            background: "rgba(255,255,255,0.2)", border: "none", color: "#fff",
            borderRadius: "50%", width: "1.4rem", height: "1.4rem",
            cursor: "pointer", fontSize: ".75rem", lineHeight: 1,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}
        >✕</button>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <SubscribeModal isOpen={modalOpen} onClose={handleModalClose} source="pill" />
    </>
  );
}
