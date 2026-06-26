import { ArrowRight } from "lucide-react";
import { HIGHLY_USED } from "../data/tools.jsx";

export default function HighlyUsed() {
  return (
    <section className="mt-12 rounded-2xl border border-line bg-surface p-5 shadow-soft sm:p-7">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-extrabold text-ink sm:text-xl">
          <span aria-hidden>🔥</span> Highly Used Tools
        </h2>
        <a href="#" className="inline-flex items-center gap-1 text-sm font-semibold text-brand">
          View All <ArrowRight size={15} />
        </a>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
        {HIGHLY_USED.map((h) => (
          <a
            key={h.title}
            href="#"
            className="group rounded-xl border border-line bg-cream p-4 transition-all hover:-translate-y-0.5 hover:shadow-soft"
          >
            <h.icon size={22} style={{ color: h.color }} />
            <p className="mt-3 text-sm font-semibold leading-tight text-ink">{h.title}</p>
            <ArrowRight size={15} className="mt-2 text-sub" />
          </a>
        ))}
      </div>
    </section>
  );
}
