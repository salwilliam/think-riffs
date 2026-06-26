import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  source: string;
}

const DISMISS_KEY = "kw_subscribe_dismissed";
const DISMISS_TTL = 7 * 24 * 60 * 60 * 1000;

export default function SubscribeModal({ isOpen, onClose, source }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const data = await res.json();
      if (data.ok) {
        setStatus("success");
        localStorage.setItem(DISMISS_KEY, String(Date.now() + DISMISS_TTL));
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error — please try again.");
    }
  };

  const handleClose = () => {
    setStatus("idle");
    setEmail("");
    setErrorMsg("");
    onClose();
  };

  return (
    <div
      onClick={handleClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9000,
        background: "rgba(0,0,0,0.45)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "#fff", borderRadius: "12px", padding: "2rem 2rem 1.75rem",
          maxWidth: "420px", width: "100%", position: "relative",
          boxShadow: "0 8px 48px rgba(0,0,0,0.18)",
        }}
      >
        <button
          onClick={handleClose}
          style={{
            position: "absolute", top: "1rem", right: "1rem",
            background: "none", border: "none", cursor: "pointer",
            fontSize: "1.1rem", color: "#888", lineHeight: 1,
          }}
          aria-label="Close"
        >✕</button>

        {status === "success" ? (
          <div style={{ textAlign: "center", padding: "1rem 0" }}>
            <div style={{ fontSize: "2rem", marginBottom: ".5rem" }}>✓</div>
            <h2 style={{ margin: "0 0 .5rem", fontFamily: "'Faculty Glyphic', sans-serif", fontSize: "1.4rem" }}>
              You're in.
            </h2>
            <p style={{ color: "#555", margin: 0, fontSize: ".95rem" }}>
              Thanks for subscribing to Think Riffs.
            </p>
          </div>
        ) : (
          <>
            <h2 style={{ margin: "0 0 .5rem", fontFamily: "'Faculty Glyphic', sans-serif", fontSize: "1.4rem" }}>
              Subscribe to Think Riffs
            </h2>
            <p style={{ color: "#555", margin: "0 0 1.25rem", fontSize: ".9rem", lineHeight: 1.6 }}>
              Writing on crypto, markets, philosophy, politics, and art — by Salvatore Delle Palme.
            </p>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{
                  width: "100%", padding: ".65rem .85rem",
                  border: "1.5px solid #c9d8e8", borderRadius: "7px",
                  fontSize: ".95rem", marginBottom: ".75rem",
                  outline: "none", boxSizing: "border-box",
                  fontFamily: "Inter, sans-serif",
                }}
              />
              {status === "error" && (
                <p style={{ color: "#c0392b", fontSize: ".85rem", margin: "0 0 .6rem" }}>{errorMsg}</p>
              )}
              <button
                type="submit"
                disabled={status === "loading"}
                style={{
                  width: "100%", padding: ".7rem",
                  background: "hsl(210, 65%, 48%)", color: "#fff",
                  border: "none", borderRadius: "7px", cursor: "pointer",
                  fontSize: ".95rem", fontWeight: 700,
                  fontFamily: "'Faculty Glyphic', sans-serif",
                  opacity: status === "loading" ? .7 : 1,
                }}
              >
                {status === "loading" ? "Subscribing…" : "Subscribe"}
              </button>
            </form>
            <p style={{ fontSize: ".78rem", color: "#aaa", margin: ".85rem 0 0", textAlign: "center" }}>
              No spam. Unsubscribe any time.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
