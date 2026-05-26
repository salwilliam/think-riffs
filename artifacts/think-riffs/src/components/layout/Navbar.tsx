import { Link } from "wouter";

const links = [
  { label: "ABOUT", href: "/about", isExternal: false },
  { label: "ART", href: "/art", isExternal: false },
  { label: "X", href: "https://x.com/salwilliam", isExternal: true },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-blue-900 backdrop-blur" style={{ backgroundColor: 'hsla(201, 100%, 40%, 0.85)' }}>
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-3xl font-bold tracking-tight text-white" style={{ fontFamily: "'Faculty Glyphic', sans-serif" }}>
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
                className="text-xs sm:text-sm font-bold tracking-wider text-sky-100 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs sm:text-sm font-bold tracking-wider text-sky-100 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>
      </div>
    </header>
  );
}
