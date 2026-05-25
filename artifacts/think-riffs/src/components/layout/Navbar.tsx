import { Link } from "wouter";

const links = [
  { label: "ABOUT", href: "/about", isExternal: false },
  { label: "ART", href: "/art", isExternal: false },
  { label: "X", href: "https://x.com/salwilliam", isExternal: true },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-serif font-bold text-xl tracking-tight">
          Think Riffs
        </Link>

        <nav className="flex items-center gap-4 sm:gap-6">
          {links.map((link) =>
            link.isExternal ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm font-semibold tracking-wider text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs sm:text-sm font-semibold tracking-wider text-muted-foreground hover:text-foreground transition-colors"
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
