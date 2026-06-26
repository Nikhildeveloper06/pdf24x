import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/** A single tool/category card. `icon` is a swappable icon-placeholder. */
export default function ToolCard({ icon: Icon, color, tint, title, desc, link, path = "/all-tools" }) {
  return (
    <Link
      to={path}
      className="group rounded-2xl border border-line bg-card p-5 text-left shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
    >
      <span
        className="flex h-11 w-11 items-center justify-center rounded-xl"
        style={{ background: tint }}
      >
        <Icon size={21} style={{ color }} />
      </span>
      <h3 className="mt-4 text-base font-bold text-ink">{title}</h3>
      <p className="mt-1.5 text-sm leading-snug text-sub">{desc}</p>
      <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand">
        {link}
        <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
