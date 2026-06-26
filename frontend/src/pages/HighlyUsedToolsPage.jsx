import { Link } from "react-router-dom";
import { ArrowRight, Flame } from "lucide-react";
import { HIGHLY_USED } from "../data/tools.jsx";

// Small color variants per badge type so they read distinctly at a glance.
const BADGE_STYLES = {
  "#1 Pick": "bg-[#FFE7E3] text-[#EE4B3C]",
  "Trending": "bg-[#ECE7FF] text-[#7B61FF]",
  "Most Popular": "bg-[#E4F5EC] text-[#27AE60]",
  "Editor's Pick": "bg-[#FCEEDD] text-[#F2994A]",
};

export default function HighlyUsedToolsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-10 text-center">
        <span className="mx-auto mb-3 inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-3 py-1 text-xs font-bold text-brand shadow-soft">
          <Flame size={13} />
          Reader Favorites
        </span>
        <h1 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">
          Highly Used Tools
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-sm text-sub sm:text-base">
          The tools the majority of our visitors reach for first — ranked by
          how often they're picked.
        </p>
      </header>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {HIGHLY_USED.map((tool, i) => (
          <Link
            key={tool.title}
            to={tool.path}
            className="group relative flex flex-col rounded-2xl border border-line bg-card p-6 shadow-soft transition-all hover:-translate-y-1.5 hover:shadow-lift"
          >
            {/* Rank number */}
            <span className="absolute -top-3 -left-3 flex h-9 w-9 items-center justify-center rounded-full border border-line bg-cream text-sm font-extrabold text-ink shadow-soft">
              #{i + 1}
            </span>

            {/* Badge */}
            {tool.badge && (
              <span
                className={`mb-4 inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-bold ${
                  BADGE_STYLES[tool.badge] || "bg-cream text-sub"
                }`}
              >
                {tool.badge}
              </span>
            )}

            <span
              className="flex h-14 w-14 items-center justify-center rounded-2xl transition-transform group-hover:scale-110"
              style={{ background: tool.tint }}
            >
              <tool.icon size={26} style={{ color: tool.color }} />
            </span>

            <h3 className="mt-4 text-lg font-bold text-ink">{tool.title}</h3>
            <p className="mt-1.5 text-sm leading-snug text-sub">{tool.desc}</p>

            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand">
              Use this tool
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          to="/all-tools"
          className="inline-flex items-center gap-2 rounded-xl border border-line bg-cream px-5 py-2.5 text-sm font-semibold text-ink shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
        >
          Browse all tools
          <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}
