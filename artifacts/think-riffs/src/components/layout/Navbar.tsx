import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMenu = () => setMobileMenuOpen(false);

  const links = [
    { label: "ABOUT", href: "/about", isExternal: false },
    { label: "ART", href: "/art", isExternal: false },
    { label: "X", href: "https://x.com/salwilliam", isExternal: true },
    { label: "SUBSTACK", href: "https://salwilliam.substack.com", isExternal: true },
    { label: "SUPERCYCLE", href: "https://sup3rcycl3.com", isExternal: true },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-serif font-bold text-xl tracking-tight" onClick={closeMenu}>
          Think Riffs
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => 
            link.isExternal ? (
              <a 
                key={link.label} 
                href={link.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm font-semibold tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                data-testid={`nav-external-${link.label.toLowerCase()}`}
              >
                {link.label}
              </a>
            ) : (
              <Link 
                key={link.label} 
                href={link.href}
                className="text-sm font-semibold tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                data-testid={`nav-internal-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Mobile menu toggle */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu} data-testid="nav-mobile-toggle">
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 p-4 shadow-sm animate-in slide-in-from-top-2">
          <nav className="flex flex-col space-y-4">
            {links.map((link) => 
              link.isExternal ? (
                <a 
                  key={link.label} 
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm font-semibold tracking-wider text-muted-foreground hover:text-foreground py-2 border-b border-gray-100 last:border-0"
                  onClick={closeMenu}
                  data-testid={`nav-mobile-external-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </a>
              ) : (
                <Link 
                  key={link.label} 
                  href={link.href}
                  className="text-sm font-semibold tracking-wider text-muted-foreground hover:text-foreground py-2 border-b border-gray-100 last:border-0"
                  onClick={closeMenu}
                  data-testid={`nav-mobile-internal-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
