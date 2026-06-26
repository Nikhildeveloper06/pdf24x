import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { HIGHLY_USED } from "../data/tools.jsx";
import AdSlot from "./ui/AdSlot.jsx";

/**
 * Full-width mega-menu shown under the navbar's "Highly Used Tools" item.
 * `open` controls visibility via inline maxHeight + opacity.
 */
export default function HighlyUsedMegaMenu({ open, onClose }) {
  return (
    <div
      className="absolute left-0 top-full z-40 w-full overflow-hidden border-b border-line bg-surface shadow-lift transition-[max-height,opacity] duration-300 ease-out"
      style={{
        maxHeight: open ? "600px" : "0px",
        opacity: open ? 1 : 0,
        pointerEvents: open ? "auto" : "none",
      }}
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wide text-sub">
            Highly Used Tools
          </h3>
          <Link
            to="/highly-used-tools"
            onClick={onClose}
            className="relative z-20 inline-flex items-center gap-1 text-sm font-semibold text-brand"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {HIGHLY_USED.map((tool) => (
            <Link
              key={tool.title}
              to={tool.path}
              onClick={onClose}
              className="group rounded-xl border border-line bg-card p-4 transition-all hover:-translate-y-0.5 hover:shadow-soft"
            >
              <span
                className="flex h-9 w-9 items-center justify-center rounded-lg"
                style={{ background: tool.tint }}
              >
                <tool.icon size={18} style={{ color: tool.color }} />
              </span>
              <p className="mt-3 text-sm font-semibold leading-tight text-ink">
                {tool.title}
              </p>
            </Link>
          ))}
        </div>

        {/* border-t pt-6 only — no extra mt-* here, since AdSlot already
            carries its own mt-10, and stacking both pushed/overlapped
            the "View all" link above. */}
        <div className="border-t border-line pt-6">
          <AdSlot />
        </div>
      </div>
    </div>
  );
}
