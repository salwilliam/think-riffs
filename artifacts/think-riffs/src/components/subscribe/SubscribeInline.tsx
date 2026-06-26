import { useState } from "react";

const DISMISS_KEY = "kw_subscribe_dismissed";
const DISMISS_TTL = 7 * 24 * 60 * 60 * 1000;

export default function SubscribeInline() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "inline" }),
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

  return (
    <div style={{
      margin: "3rem 0 0",
      padding: "2rem",
      background: "hsl(210, 60%, 96%)",
      borderRadius: "12px",
      border: "1.5px solid hsl(210, 50%, 88%)",
      textAlign: "center",
    }}>
      {status === "success" ? (
        <>
          <div style={{ fontSize: "1.75rem", marginBottom: ".4rem" }}>✓</div>
          <h3 style={{ margin: "0 0 .4rem", fontFamily: "'Faculty Glyphic', sans-serif", fontSize: "1.25rem" }}>
            You're subscribed.
          </h3>
          <p style={{ color: "#555", margin: 0, fontSize: ".9rem" }}>
            Thanks — you'll hear from me when there's something worth reading.
          </p>
        </>
      ) : (
        <>
          <h3 style={{ margin: "0 0 .4rem", fontFamily: "'Faculty Glyphic', sans-serif", fontSize: "1.25rem" }}>
            Enjoyed this? Subscribe to Think Riffs.
          </h3>
          <p style={{ color: "#555", margin: "0 0 1.25rem", fontSize: ".9rem", lineHeight: 1.6 }}>
            Crypto, markets, philosophy, politics, and art — direct to your inbox.
          </p>
          <form onSubmit={handleSubmit} style={{ display: "flex", gap: ".5rem", maxWidth: "380px", margin: "0 auto" }}>
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{
                flex: 1, padding: ".65rem .85rem",
                border: "1.5px solid #c9d8e8", borderRadius: "7px",
                fontSize: ".9rem", outline: "none",
                fontFamily: "Inter, sans-serif",
              }}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              style={{
                padding: ".65rem 1.1rem",
                background: "hsl(210, 65%, 48%)", color: "#fff",
                border: "none", borderRadius: "7px", cursor: "pointer",
                fontSize: ".9rem", fontWeight: 700,
                fontFamily: "'Faculty Glyphic', sans-serif",
                whiteSpace: "nowrap",
                opacity: status === "loading" ? .7 : 1,
              }}
            >
              {status === "loading" ? "…" : "Subscribe"}
            </button>
          </form>
          {status === "error" && (
            <p style={{ color: "#c0392b", fontSize: ".85rem", margin: ".6rem 0 0" }}>{errorMsg}</p>
          )}
          <p style={{ fontSize: ".78rem", color: "#aaa", margin: ".75rem 0 0" }}>
            No spam. Unsubscribe any time.
          </p>
        </>
      )}
    </div>
  );
}
