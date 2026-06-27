import { useCallback, useState } from "react";
import { Minimize2, Loader2, Download, RefreshCcw, FileText, X, Target, SlidersHorizontal, AlertTriangle, Lightbulb, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import SEO from "../components/SEO.jsx";
import ToolPageLayout from "../components/ToolPageLayout.jsx";
import Dropzone from "../components/ui/Dropzone.jsx";

const LEVELS = [
  { id: "low", label: "Low", desc: "Best quality, smaller savings" },
  { id: "medium", label: "Medium", desc: "Balanced — good for most files" },
  { id: "high", label: "High", desc: "Smallest file, more compression" },
];

function formatBytes(bytes) {
  if (!bytes) return "0 KB";
  const units = ["B", "KB", "MB", "GB"];
  let i = 0;
  let n = bytes;
  while (n >= 1024 && i < units.length - 1) {
    n /= 1024;
    i++;
  }
  return `${n.toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

export default function CompressPdfPage() {
  const [file, setFile] = useState(null);
  const [mode, setMode] = useState("level");
  const [level, setLevel] = useState("medium");
  const [targetValue, setTargetValue] = useState("");
  const [targetUnit, setTargetUnit] = useState("MB");
  const [status, setStatus] = useState("idle");
  const [resultUrl, setResultUrl] = useState(null);
  const [resultSize, setResultSize] = useState(null);
  const [targetReached, setTargetReached] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [analyzing, setAnalyzing] = useState(false);
  const [suggestion, setSuggestion] = useState(null);

  // Before/after comparison state
  const [originalSessionId, setOriginalSessionId] = useState(null);
  const [compressedSessionId, setCompressedSessionId] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [comparePage, setComparePage] = useState(1);
  const [showingCompressed, setShowingCompressed] = useState(true);
  const [compareImageUrl, setCompareImageUrl] = useState(null);
  const [compareLoading, setCompareLoading] = useState(false);

  const analyzeFile = useCallback(async (pdfFile) => {
    setAnalyzing(true);
    setSuggestion(null);
    try {
      const formData = new FormData();
      formData.append("file", pdfFile);
      const res = await fetch("/api/pdf/analyze", { method: "POST", body: formData });
      if (res.ok) {
        const data = await res.json();
        setSuggestion(data);
      }
    } catch {
      // hint only — fail silently
    } finally {
      setAnalyzing(false);
    }
  }, []);

  const handleFile = useCallback(
    (newFiles) => {
      const pdf = newFiles.find((f) => f.type === "application/pdf");
      if (pdf) {
        setFile(pdf);
        setStatus("idle");
        setResultUrl(null);
        analyzeFile(pdf);
      }
    },
    [analyzeFile]
  );

  const reset = () => {
    setFile(null);
    setStatus("idle");
    setResultUrl(null);
    setResultSize(null);
    setErrorMessage("");
    setTargetReached(true);
    setSuggestion(null);
    setOriginalSessionId(null);
    setCompressedSessionId(null);
    setPageCount(1);
    setComparePage(1);
    setShowingCompressed(true);
    setCompareImageUrl(null);
  };

  const loadComparePage = useCallback(
    async (pageNum, showCompressed, origId, compId) => {
      const sessionId = showCompressed ? compId : origId;
      if (!sessionId) return;
      setCompareLoading(true);
      try {
        const res = await fetch(`/api/pdf/render-page?session_id=${sessionId}&page=${pageNum}`);
        if (res.ok) {
          const blob = await res.blob();
          setCompareImageUrl(URL.createObjectURL(blob));
        }
      } catch {
        // comparison is a nice-to-have — fail silently
      } finally {
        setCompareLoading(false);
      }
    },
    []
  );

  const handleCompress = async () => {
    if (!file) return;

    if (mode === "target") {
      const numericValue = parseFloat(targetValue);
      if (!numericValue || numericValue <= 0) {
        setErrorMessage("Enter a valid target size greater than 0.");
        setStatus("error");
        return;
      }
    }

    setStatus("compressing");
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      if (mode === "target") {
        const numericValue = parseFloat(targetValue);
        const targetKb = targetUnit === "MB" ? Math.round(numericValue * 1024) : Math.round(numericValue);
        formData.append("target_kb", targetKb);
      } else {
        formData.append("level", level);
      }

      const res = await fetch("/api/pdf/compress", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        let detail = "Compression failed.";
        try {
          const data = await res.json();
          detail = data.detail || detail;
        } catch {
          // not JSON
        }
        throw new Error(detail);
      }

      const blob = await res.blob();
      const origId = res.headers.get("X-Original-Session-Id");
      const compId = res.headers.get("X-Compressed-Session-Id");
      const pages = parseInt(res.headers.get("X-Page-Count") || "1", 10);

      setResultUrl(URL.createObjectURL(blob));
      setResultSize(blob.size);
      setTargetReached(res.headers.get("X-Target-Reached") !== "false");
      setOriginalSessionId(origId);
      setCompressedSessionId(compId);
      setPageCount(pages);
      setComparePage(1);
      setShowingCompressed(true);
      setStatus("done");

      // Load the first comparison image right away.
      loadComparePage(1, true, origId, compId);
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message || "Something went wrong while compressing.");
      setStatus("error");
    }
  };

  const toggleCompareView = () => {
    const next = !showingCompressed;
    setShowingCompressed(next);
    loadComparePage(comparePage, next, originalSessionId, compressedSessionId);
  };

  const changeComparePage = (delta) => {
    const next = Math.min(pageCount, Math.max(1, comparePage + delta));
    if (next === comparePage) return;
    setComparePage(next);
    loadComparePage(next, showingCompressed, originalSessionId, compressedSessionId);
  };

  const savedPercent =
    file && resultSize ? Math.max(0, Math.round((1 - resultSize / file.size) * 100)) : null;

  return (
    <ToolPageLayout
      icon={Minimize2}
      color="#3B82F6"
      tint="#E5EEFC"
      title="Compress PDF"
      wide
      desc="Shrink your PDF's file size without losing readability."
    >
      <SEO
        title="Compress PDF"
        description="Reduce PDF file size for free with PDF24X. Choose a quality level or target an exact file size, with a before/after quality comparison. No sign up required."
        path="/compress-pdf"
      />

      {!file && (
        <Dropzone
          accept="application/pdf"
          multiple={false}
          label="Drop your PDF file here"
          hint="or click to browse — one PDF at a time"
          onFiles={handleFile}
        />
      )}

      {file && status !== "done" && (
        <div className="space-y-6">
          <div className="flex items-center gap-3 rounded-xl border border-line bg-card px-4 py-3 shadow-soft">
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
              style={{ background: "#E5EEFC" }}
            >
              <FileText size={16} className="text-[#3B82F6]" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-ink">{file.name}</p>
              <p className="text-xs text-sub">{formatBytes(file.size)}</p>
            </div>
            <button
              type="button"
              onClick={reset}
              aria-label="Remove file"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line bg-cream text-sub transition-colors hover:text-brand hover:border-brand"
            >
              <X size={15} />
            </button>
          </div>

          {analyzing && (
            <div className="flex items-center gap-2 rounded-xl border border-line bg-cream px-4 py-2.5 text-sm text-sub">
              <Loader2 size={14} className="animate-spin" />
              Analyzing your file…
            </div>
          )}

          {suggestion && mode === "level" && (
            <button
              type="button"
              onClick={() => setLevel(suggestion.suggested_level)}
              className="flex w-full items-start gap-3 rounded-xl border border-brand bg-redsoft px-4 py-3 text-left transition-all hover:-translate-y-0.5 hover:shadow-soft"
            >
              <Lightbulb size={18} className="mt-0.5 shrink-0 text-brand" />
              <span>
                <span className="text-sm font-bold text-ink">
                  Suggested: {LEVELS.find((l) => l.id === suggestion.suggested_level)?.label}
                </span>
                <span className="block text-xs text-sub">{suggestion.reason}</span>
              </span>
            </button>
          )}

          <div className="inline-flex rounded-xl border border-line bg-cream p-1">
            <button
              type="button"
              onClick={() => setMode("level")}
              className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                mode === "level" ? "bg-card text-ink shadow-soft" : "text-sub"
              }`}
            >
              <SlidersHorizontal size={14} />
              By Quality Level
            </button>
            <button
              type="button"
              onClick={() => setMode("target")}
              className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                mode === "target" ? "bg-card text-ink shadow-soft" : "text-sub"
              }`}
            >
              <Target size={14} />
              By Target Size
            </button>
          </div>

          {mode === "level" ? (
            <div>
              <p className="mb-3 text-sm font-bold text-ink">Compression level</p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {LEVELS.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setLevel(opt.id)}
                    className={`rounded-xl border p-4 text-left transition-all ${
                      level === opt.id
                        ? "border-brand bg-redsoft shadow-soft"
                        : "border-line bg-card hover:-translate-y-0.5 hover:shadow-soft"
                    }`}
                  >
                    <p className="text-sm font-bold text-ink">{opt.label}</p>
                    <p className="mt-1 text-xs text-sub">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <p className="mb-3 text-sm font-bold text-ink">Target file size</p>
              <p className="mb-3 text-xs text-sub">
                We'll compress as much as possible to try to hit this size. If
                the file's bulk isn't from images (e.g. lots of text or fonts),
                we'll tell you honestly if we couldn't fully reach it.
              </p>
              <div className="flex max-w-xs items-center gap-2">
                <input
                  type="number"
                  min="1"
                  step="any"
                  value={targetValue}
                  onChange={(e) => setTargetValue(e.target.value)}
                  placeholder="e.g. 2"
                  className="w-full rounded-xl border border-line bg-card px-4 py-2.5 text-sm text-ink outline-none focus:border-brand"
                />
                <select
                  value={targetUnit}
                  onChange={(e) => setTargetUnit(e.target.value)}
                  className="rounded-xl border border-line bg-card px-3 py-2.5 text-sm text-ink outline-none focus:border-brand"
                >
                  <option value="KB">KB</option>
                  <option value="MB">MB</option>
                </select>
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              disabled={status === "compressing"}
              onClick={handleCompress}
              className="inline-flex items-center gap-2 rounded-xl border border-line bg-brand px-5 py-2.5 text-sm font-bold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-soft"
            >
              {status === "compressing" ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Compressing…
                </>
              ) : (
                <>
                  <Minimize2 size={16} />
                  Compress PDF
                </>
              )}
            </button>
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-2 rounded-xl border border-line bg-cream px-5 py-2.5 text-sm font-semibold text-ink shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
            >
              <RefreshCcw size={15} />
              Start over
            </button>
          </div>

          {status === "error" && (
            <p className="rounded-xl border border-line bg-redsoft px-4 py-3 text-sm font-medium text-ink">
              {errorMessage}
            </p>
          )}
        </div>
      )}

      {status === "done" && resultUrl && (
        <div className="space-y-4">
          {!targetReached && (
            <div className="flex items-start gap-3 rounded-xl border border-line bg-redsoft px-4 py-3 text-sm text-ink">
              <AlertTriangle size={18} className="mt-0.5 shrink-0 text-brand" />
              <p>
                We couldn't fully reach your target size — this file's size
                mostly comes from non-image content (text, fonts, or vector
                graphics) that compression can't shrink further. Here's the
                smallest version we could produce.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-line bg-card p-8 text-center shadow-soft">
              <span
                className="flex h-14 w-14 items-center justify-center rounded-2xl"
                style={{ background: targetReached ? "#E4F5EC" : "#FCEEDD" }}
              >
                <Minimize2
                  size={26}
                  className={targetReached ? "text-[#27AE60]" : "text-[#F2994A]"}
                />
              </span>
              <p className="text-base font-bold text-ink">
                {targetReached ? "Your PDF is compressed!" : "Compressed as much as possible"}
              </p>
              {savedPercent !== null && (
                <p className="text-sm text-sub">
                  {formatBytes(file.size)} → {formatBytes(resultSize)}{" "}
                  <span className="font-bold text-[#27AE60]">
                    ({savedPercent}% smaller)
                  </span>
                </p>
              )}
              <div className="flex flex-col items-center gap-3">
                <a
                  href={resultUrl}
                  download="compressed.pdf"
                  className="inline-flex items-center gap-2 rounded-xl border border-line bg-brand px-5 py-2.5 text-sm font-bold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
                >
                  <Download size={16} />
                  Download compressed PDF
                </a>
                <button
                  type="button"
                  onClick={reset}
                  className="text-sm font-semibold text-sub transition-colors hover:text-brand"
                >
                  Compress another file
                </button>
              </div>
            </div>

            {/* Before/after visual comparison */}
            <div className="overflow-hidden rounded-2xl border border-line shadow-soft">
              <div className="flex items-center justify-between border-b border-line bg-cream px-4 py-2">
                <span className="text-xs font-semibold text-sub">
                  {showingCompressed ? "Showing: Compressed" : "Showing: Original"}
                </span>

                <div className="flex items-center gap-2">
                  {pageCount > 1 && (
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => changeComparePage(-1)}
                        disabled={comparePage <= 1}
                        aria-label="Previous page"
                        className="flex h-7 w-7 items-center justify-center rounded-md border border-line bg-card text-sub disabled:opacity-40"
                      >
                        <ChevronLeft size={14} />
                      </button>
                      <span className="text-xs text-sub">
                        Page {comparePage} / {pageCount}
                      </span>
                      <button
                        type="button"
                        onClick={() => changeComparePage(1)}
                        disabled={comparePage >= pageCount}
                        aria-label="Next page"
                        className="flex h-7 w-7 items-center justify-center rounded-md border border-line bg-card text-sub disabled:opacity-40"
                      >
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={toggleCompareView}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-card px-3 py-1.5 text-xs font-semibold text-ink transition-colors hover:bg-brand hover:text-white"
                  >
                    <Eye size={13} />
                    View {showingCompressed ? "Original" : "Compressed"}
                  </button>
                </div>
              </div>

              <div className="flex h-[60vh] items-center justify-center overflow-y-auto bg-cream p-4">
                {compareLoading ? (
                  <Loader2 size={28} className="animate-spin text-sub" />
                ) : compareImageUrl ? (
                  <img
                    src={compareImageUrl}
                    alt={showingCompressed ? "Compressed page preview" : "Original page preview"}
                    className="max-h-[65vh] w-auto rounded-lg border border-line shadow-soft"
                  />
                ) : (
                  <p className="text-sm text-sub">Preview unavailable.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </ToolPageLayout>
  );
}
