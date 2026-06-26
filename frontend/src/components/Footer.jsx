import { Link } from "react-router-dom";
import { Facebook, Twitter, Youtube, Linkedin, ChevronDown } from "lucide-react";
import Logo from "./ui/Logo.jsx";
import { FOOTER_COLS } from "../data/tools.jsx";

const SOCIALS = [Facebook, Twitter, Youtube, Linkedin];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-cream">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-sub">
              Your all-in-one platform for PDF, Image, Video and Developer tools.
            </p>
            <div className="mt-5 flex gap-3">
              {/* TODO: replace href="#" with your real social media URLs */}
              {SOCIALS.map((Ic, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="social link"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-sub transition-colors hover:bg-brand hover:text-white"
                >
                  <Ic size={16} />
                </a>
              ))}
            </div>
          </div>

          {FOOTER_COLS.map((col) => (
            <div key={col.head}>
              {/* Mobile (< sm): collapsible accordion using native <details>.
                  Tablet/desktop (>= sm): always-open list, header not clickable. */}
              <details className="group sm:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between border-b border-line py-3 text-sm font-bold text-ink">
                  {col.head}
                  <ChevronDown
                    size={16}
                    className="text-sub transition-transform duration-200 group-open:rotate-180"
                  />
                </summary>
                <ul className="space-y-2.5 pb-2 pt-3">
                  {col.items.map((it) => (
                    <li key={it.label}>
                      <Link to={it.path} className="text-sm text-sub transition-colors hover:text-ink">
                        {it.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>

              <div className="hidden sm:block">
                <h4 className="mb-4 text-sm font-bold text-ink">{col.head}</h4>
                <ul className="space-y-2.5">
                  {col.items.map((it) => (
                    <li key={it.label}>
                      <Link to={it.path} className="text-sm text-sub transition-colors hover:text-ink">
                        {it.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 border-t-0 pt-6 sm:mt-10 sm:border-t sm:border-line text-center text-sm text-sub">
          © 2025 <span className="font-semibold text-ink">PDF24X</span>. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
