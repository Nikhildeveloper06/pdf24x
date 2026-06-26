import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, Sun, Moon } from "lucide-react";
import Logo from "./ui/Logo.jsx";
import HighlyUsedMegaMenu from "./HighlyUsedMegaMenu.jsx";
import { NAV_LINKS, NAV_DROPDOWNS } from "../data/tools.jsx";

export default function Navbar({ dark, onToggleTheme }) {
  const [open, setOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 border-b border-line bg-cream/90 backdrop-blur"
      onMouseLeave={() => setMegaMenuOpen(false)}
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Logo />
          <nav className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((item) => {
              const hasDropdown = NAV_DROPDOWNS.includes(item.label);
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  onMouseEnter={() => hasDropdown && setMegaMenuOpen(true)}
                  className="flex items-center gap-1 text-sm font-medium text-sub transition-colors hover:text-ink"
                >
                  {item.label}
                  {hasDropdown && (
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${
                        megaMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onToggleTheme}
              aria-label="Toggle theme"
              className="rounded-lg border border-line p-2 text-sub transition-colors hover:text-ink"
            >
              {dark ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <Link
              to="/all-tools"
              className="hidden rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white shadow-soft transition-transform hover:-translate-y-0.5 sm:inline-flex"
            >
              Explore All Tools
            </Link>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Menu"
              className="rounded-lg border border-line p-2 text-ink lg:hidden"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <HighlyUsedMegaMenu
          open={megaMenuOpen}
          onClose={() => setMegaMenuOpen(false)}
        />
      </div>

      {open && (
        <div className="space-y-1 border-t border-line px-4 pb-4 pt-1 lg:hidden">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-between py-2.5 text-sm font-medium text-sub"
            >
              {item.label}
              {NAV_DROPDOWNS.includes(item.label) && <ChevronDown size={15} />}
            </Link>
          ))}
          <Link
            to="/all-tools"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-lg bg-brand px-4 py-2.5 text-center text-sm font-semibold text-white"
          >
            Explore All Tools
          </Link>
        </div>
      )}
    </header>
  );
}
