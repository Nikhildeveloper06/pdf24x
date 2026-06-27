import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";

/**
 * Renders a single PDF page thumbnail, fetched only when scrolled
 * into view (via IntersectionObserver). Keeps a stable placeholder
 * size before/while loading so the grid layout never shifts.
 */
export default function LazyPageThumbnail({ sessionId, pageNumber, onClick, selected, dividerActive }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (hasLoaded) return;

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetch(`/api/pdf/render-page?session_id=${sessionId}&page=${pageNumber}`)
            .then((res) => (res.ok ? res.blob() : null))
            .then((blob) => {
              if (blob) setImageUrl(URL.createObjectURL(blob));
              setHasLoaded(true);
            })
            .catch(() => setHasLoaded(true));
          observer.disconnect();
        }
      },
      { rootMargin: "200px" } // start loading slightly before it's visible
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [sessionId, pageNumber, hasLoaded]);

  return (
    <button
      ref={containerRef}
      type="button"
      onClick={onClick}
      className={[
        "group relative flex aspect-[3/4] w-full flex-col items-center justify-center overflow-hidden rounded-lg border-2 bg-card transition-all",
        selected ? "border-brand shadow-lift" : "border-line hover:border-brand/50",
      ].join(" ")}
    >
      {imageUrl ? (
        <img src={imageUrl} alt={`Page ${pageNumber}`} className="h-full w-full object-contain" />
      ) : (
        <Loader2 size={20} className="animate-spin text-sub" />
      )}

      <span
        className={[
          "absolute bottom-1 right-1 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-bold",
          selected ? "bg-brand text-white" : "bg-cream/90 text-sub",
        ].join(" ")}
      >
        {pageNumber}
      </span>

      {selected && (
        <span className="absolute left-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand text-white">
          ✓
        </span>
      )}
    </button>
  );
}
