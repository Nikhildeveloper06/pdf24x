import { Link } from "react-router-dom";
import { CATEGORIES, HIGHLY_USED, MORE_TOOLS } from "../data/tools.jsx";

// Combine every individual tool into one list, then group by category.
const ALL_TOOL_ENTRIES = [...HIGHLY_USED, ...MORE_TOOLS];

function slugify(title) {
  return title.toLowerCase().replace(/\s+/g, "-");
}

export default function AllToolsPage() {
  // Build { categoryTitle: [tools...] } preserving CATEGORIES order.
  const grouped = CATEGORIES
    .map((cat) => ({
      ...cat,
      tools: ALL_TOOL_ENTRIES.filter((t) => t.category === cat.title),
    }))
    .filter((cat) => cat.tools.length > 0); // skip categories with no tools yet

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-10 text-center">
        <h1 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">
          All Tools
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-sm text-sub sm:text-base">
          Browse every free tool, grouped by category. New tools are added regularly.
        </p>
      </header>

      <div className="space-y-12">
        {grouped.map((cat) => (
          <section key={cat.title} id={slugify(cat.title)}>
            <div className="mb-4 flex items-center gap-3">
              <span
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ background: cat.tint }}
              >
                <cat.icon size={19} style={{ color: cat.color }} />
              </span>
              <h2 className="text-lg font-extrabold text-ink sm:text-xl">
                {cat.title}
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
              {cat.tools.map((tool) => (
                <Link
                  key={tool.title}
                  to={tool.path}
                  className="group rounded-xl border border-line bg-card p-4 transition-all hover:-translate-y-0.5 hover:shadow-soft"
                >
                  <tool.icon size={22} style={{ color: tool.color }} />
                  <p className="mt-3 text-sm font-semibold leading-tight text-ink">
                    {tool.title}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
