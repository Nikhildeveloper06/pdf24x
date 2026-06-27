import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

/**
 * Shared chrome for every tool page: back link + icon badge + title/desc.
 * The actual tool workspace (dropzone, options, results) is passed as
 * `children` and is fully custom per page.
 *
 * `wide` opts into a wider container (max-w-7xl instead of max-w-4xl) —
 * use this for tools with side-by-side layouts (e.g. preview panels)
 * that need more horizontal room than the default single-column tools.
 */
export default function ToolPageLayout({ icon: Icon, color, tint, title, desc, wide = false, children }) {
  return (
    <div className={`mx-auto px-4 py-10 sm:px-6 lg:px-8 ${wide ? "max-w-7xl" : "max-w-4xl"}`}>
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-sub transition-colors hover:text-brand"
      >
        <ArrowLeft size={15} />
        Back to all tools
      </Link>

      <header className="mb-8 flex items-start gap-4">
        <span
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-line shadow-soft"
          style={{ background: tint }}
        >
          <Icon size={26} style={{ color }} />
        </span>
        <div>
          <h1 className="font-display text-2xl font-extrabold text-ink sm:text-3xl">
            {title}
          </h1>
          <p className="mt-1 text-sm text-sub sm:text-base">{desc}</p>
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}
