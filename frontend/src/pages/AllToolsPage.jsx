import { Link, useSearchParams } from "react-router-dom";
import { X } from "lucide-react";
import SEO from "../components/SEO.jsx";
import { CATEGORIES, HIGHLY_USED, MORE_TOOLS } from "../data/tools.jsx";

const ALL_TOOL_ENTRIES = [...HIGHLY_USED, ...MORE_TOOLS];

function slugify(title) {
  return title.toLowerCase().replace(/\s+/g, "-");
}

export default function AllToolsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = (searchParams.get("search") || "").trim();

  const visibleTools = search
    ? ALL_TOOL_ENTRIES.filter((t) =>
        t.title.toLowerCase().includes(search.toLowerCase())
      )
    : ALL_TOOL_ENTRIES;

  const grouped = CATEGORIES
    .map((cat) => ({
      ...cat,
      tools: visibleTools.filter((t) => t.category === cat.title),
    }))
    .filter((cat) => cat.tools.length > 0);

  const clearSearch = () => setSearchParams({});

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SEO
        title="All Tools"
        description="Browse all 200+ free PDF, image, video, and developer tools on PDF24X, organized by category."
        path="/all-tools"
      />
      <header className="mb-10 text-center">
        <h1 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">
          All Tools
        </h1>
        {search ? (
          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-1.5 text-sm text-sub shadow-soft">
            Showing results for <span className="font-bold text-ink">"{search}"</span>
            <button
              onClick={clearSearch}
              aria-label="Clear search filter"
              className="ml-1 text-sub hover:text-brand"
            >
              <X size={15} />
            </button>
          </div>
        ) : (
          <p className="mx-auto mt-2 max-w-xl text-sm text-sub sm:text-base">
            Browse every free tool, grouped by category. New tools are added regularly.
          </p>
        )}
      </header>

      {grouped.length === 0 ? (
        <p className="text-center text-sm text-sub">
          No tools matched "{search}". Try a different search, or{" "}
          <button onClick={clearSearch} className="font-semibold text-brand">
            browse all tools
          </button>
          .
        </p>
      ) : (
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
      )}
    </div>
  );
}
