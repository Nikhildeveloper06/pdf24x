import { BENEFITS } from "../data/tools.jsx";

export default function Benefits() {
  return (
    <section className="mt-6 grid grid-cols-1 gap-4 rounded-2xl border border-line bg-surface p-5 shadow-soft sm:grid-cols-2 sm:p-7 lg:grid-cols-4">
      {BENEFITS.map((b) => (
        <div key={b.title} className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-redsoft">
            <b.icon size={19} className="text-brand" />
          </span>
          <div>
            <p className="text-sm font-bold text-ink">{b.title}</p>
            <p className="mt-0.5 text-xs text-sub">{b.desc}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
