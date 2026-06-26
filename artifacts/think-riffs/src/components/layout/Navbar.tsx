import { useState } from "react";
import { Link } from "wouter";
import SubscribeModal from "@/components/subscribe/SubscribeModal";

const links = [
  { label: "ABOUT", href: "/about", isExternal: false },
  { label: "ART", href: "/art", isExternal: false },
  { label: "X", href: "https://x.com/salwilliam", isExternal: true },
];

export default function Navbar() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full backdrop-blur" style={{ backgroundColor: 'hsla(210, 70%, 78%, 0.85)' }}>
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-3xl font-bold tracking-tight text-black" style={{ fontFamily: "'Faculty Glyphic', sans-serif" }}>
            Think Riffs
          </Link>

          <nav className="flex items-center gap-4 sm:gap-6" style={{ fontFamily: "'Faculty Glyphic', sans-serif" }}>
            {links.map((link) =>
              link.isExternal ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm font-bold tracking-wider text-black hover:text-gray-700 transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-xs sm:text-sm font-bold tracking-wider text-black hover:text-gray-700 transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
            <button
              onClick={() => setModalOpen(true)}
              className="text-xs sm:text-sm font-bold tracking-wider transition-colors"
              style={{
                background: "hsl(210, 65%, 48%)", color: "#fff",
                border: "none", borderRadius: "6px",
                padding: ".35rem .75rem", cursor: "pointer",
                fontFamily: "'Faculty Glyphic', sans-serif",
              }}
            >
              SUBSCRIBE
            </button>
          </nav>
        </div>
      </header>

      <SubscribeModal isOpen={modalOpen} onClose={() => setModalOpen(false)} source="nav" />
    </>
  );
}
