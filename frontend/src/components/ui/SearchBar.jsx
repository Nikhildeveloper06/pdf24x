import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { HIGHLY_USED, MORE_TOOLS } from "../../data/tools.jsx";

// Every individual tool, name + path, for matching against.
const ALL_TOOLS = [...HIGHLY_USED, ...MORE_TOOLS];

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  const matches =
    query.trim().length > 0
      ? ALL_TOOLS.filter((t) =>
          t.title.toLowerCase().includes(query.trim().toLowerCase())
        )
      : [];

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Centralized submit logic — called from form onSubmit (covers Enter/Return
  // on every OS, since browsers map both to the same "Enter" key event) AND
  // from the search button's onClick, so both paths are guaranteed to work
  // even if one is ever blocked by an extension or other interference.
  const runSearch = () => {
    const trimmed = query.trim();
    if (!trimmed) return;

    const exact = ALL_TOOLS.find(
      (t) => t.title.toLowerCase() === trimmed.toLowerCase()
    );

    if (matches.length === 1) {
      navigate(matches[0].path);
    } else if (exact) {
      navigate(exact.path);
    } else {
      navigate(`/all-tools?search=${encodeURIComponent(trimmed)}`);
    }
    setShowSuggestions(false);
    inputRef.current?.blur();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    runSearch();
  };

  // Explicit key handler as a guaranteed fallback for Enter/Return,
  // independent of native form-submit timing.
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      runSearch();
    }
  };

  const handleSuggestionClick = (title) => {
    setQuery(title);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  return (
    <div ref={wrapperRef} className="relative mt-6 w-full max-w-lg">
      <form
        onSubmit={handleSubmit}
        className="flex w-full items-center rounded-xl border border-line bg-surface p-1.5 shadow-soft"
      >
        <Search size={18} className="ml-2 shrink-0 text-sub sm:ml-3" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => query && setShowSuggestions(true)}
          placeholder="Search any tool you need..."
          className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm text-ink outline-none placeholder:text-sub sm:px-3"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setShowSuggestions(false);
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
            className="shrink-0 p-1.5 text-sub hover:text-ink"
          >
            <X size={16} />
          </button>
        )}
        <button
          type="button"
          onClick={runSearch}
          className="shrink-0 rounded-lg bg-brand p-2.5 text-white"
          aria-label="Search"
        >
          <Search size={18} />
        </button>
      </form>

      {showSuggestions && matches.length > 0 && (
        <ul className="absolute left-0 top-full z-30 mt-2 w-full overflow-hidden rounded-xl border border-line bg-card shadow-lift">
          {matches.slice(0, 6).map((tool) => (
            <li key={tool.title}>
              <button
                type="button"
                onClick={() => handleSuggestionClick(tool.title)}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-ink transition-colors hover:bg-cream"
              >
                <tool.icon size={16} style={{ color: tool.color }} />
                {tool.title}
              </button>
            </li>
          ))}
        </ul>
      )}

      {showSuggestions && query.trim() && matches.length === 0 && (
        <div className="absolute left-0 top-full z-30 mt-2 w-full rounded-xl border border-line bg-card px-4 py-3 text-sm text-sub shadow-lift">
          No matching tools — press Enter to search all tools for "{query}"
        </div>
      )}
    </div>
  );
}
