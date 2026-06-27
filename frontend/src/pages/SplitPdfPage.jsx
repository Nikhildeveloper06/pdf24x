import { useCallback, useState } from "react";
import {
  Split,
  Loader2,
  Download,
  RefreshCcw,
  X,
  Grid3x3,
  ListOrdered,
  Hash,
  FileText,
} from "lucide-react";
import SEO from "../components/SEO.jsx";
import ToolPageLayout from "../components/ToolPageLayout.jsx";
import Dropzone from "../components/ui/Dropzone.jsx";
import LazyPageThumbnail from "../components/ui/LazyPageThumbnail.jsx";

const MODES = [
  { id: "select", label: "Select Pages", icon: Grid3x3 },
  { id: "ranges", label: "Custom Ranges", icon: ListOrdered },
  { id: "every_n", label: "Every N Pages", icon: Hash },
];

export default function SplitPdfPage() {
  const [file, setFile] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [loadingInfo, setLoadingInfo] = useState(false);

  const [mode, setMode] = useState("select");
  const [selectedPages, setSelectedPages] = useState(new Set());
  const [extractMode, setExtractMode] = useState("together"); // "together" | "separate"
  const [rangesInput, setRangesInput] = useState("");
  const [everyN, setEveryN] = useState(1);

  const [status, setStatus] = useState("idle"); // idle | processing | done | error
  const [resultUrl, setResultUrl] = useState(null);
  const [resultIsZip, setResultIsZip] = useState(false);
  const [outputCount, setOutputCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFile = useCallback(async (newFiles) => {
    const pdf = newFiles.find((f) => f.type === "application/pdf");
    if (!pdf) return;

    setFile(pdf);
    setLoadingInfo(true);
    setStatus("idle");
    setResultUrl(null);
    setSelectedPages(new Set());

    try {
      const formData = new FormData();
      formData.append("file", pdf);
      const res = await fetch("/api/pdf/info", { method: "POST", body: formData });
      if (res.ok) {
        const data = await res.json();
        setSessionId(data.session_id);
        setPageCount(data.page_count);
      }
    } catch {
      // info fetch failing just means no thumbnails — not fatal
    } finally {
      setLoadingInfo(false);
    }
  }, []);

  const reset = () => {
    setFile(null);
    setSessionId(null);
    setPageCount(0);
    setSelectedPages(new Set());
    setRangesInput("");
    setEveryN(1);
    setStatus("idle");
    setResultUrl(null);
    setErrorMessage("");
  };

  const togglePage = (pageNum) => {
    setSelectedPages((prev) => {
      const next = new Set(prev);
      if (next.has(pageNum)) next.delete(pageNum);
      else next.add(pageNum);
      return next;
    });
  };

  const handleSplit = async () => {
    if (!file) return;
    setStatus("processing");
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      if (mode === "select") {
        if (selectedPages.size === 0) {
          throw new Error("Select at least one page first.");
        }
        const sortedPages = [...selectedPages].sort((a, b) => a - b);
        if (extractMode === "together") {
          // One file containing all selected pages, in order — expressed
          // as a single "range" list the backend's ranges mode understands.
          formData.append("mode", "ranges");
          formData.append("ranges", sortedPages.join(","));
        } else {
          formData.append("mode", "extract");
          formData.append("pages", sortedPages.join(","));
        }
      } else if (mode === "ranges") {
        if (!rangesInput.trim()) {
          throw new Error("Enter at least one page range, e.g. 1-3,5,8-10.");
        }
        formData.append("mode", "ranges");
        formData.append("ranges", rangesInput.trim());
      } else if (mode === "every_n") {
        if (!everyN || everyN < 1) {
          throw new Error("Enter a valid number of pages per file.");
        }
        formData.append("mode", "every_n");
        formData.append("n", everyN);
      }

      const res = await fetch("/api/pdf/split", { method: "POST", body: formData });

      if (!res.ok) {
        let detail = "Split failed.";
        try {
          const data = await res.json();
          detail = data.detail || detail;
        } catch {
          // not JSON
        }
        throw new Error(detail);
      }

      const contentType = res.headers.get("Content-Type") || "";
      const isZip = contentType.includes("zip");
      const count = parseInt(res.headers.get("X-Output-Count") || "1", 10);

      const blob = await res.blob();
      setResultUrl(URL.createObjectURL(blob));
      setResultIsZip(isZip);
      setOutputCount(count);
      setStatus("done");
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message || "Something went wrong while splitting.");
      setStatus("error");
    }
  };

  return (
    <ToolPageLayout
      icon={Split}
      color="#7B61FF"
      tint="#ECE7FF"
      title="Split PDF"
      wide
      desc="Pull out pages, split by ranges, or break a PDF into equal chunks."
    >
      <SEO
        title="Split PDF"
        description="Split a PDF into multiple files for free with PDF24X — select pages visually, use custom ranges, or split every N pages."
        path="/split-pdf"
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
              style={{ background: "#ECE7FF" }}
            >
              <FileText size={16} className="text-[#7B61FF]" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-ink">{file.name}</p>
              <p className="text-xs text-sub">
                {loadingInfo ? "Reading pages…" : `${pageCount} page${pageCount === 1 ? "" : "s"}`}
              </p>
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

          <div className="inline-flex flex-wrap rounded-xl border border-line bg-cream p-1">
            {MODES.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMode(m.id)}
                className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                  mode === m.id ? "bg-card text-ink shadow-soft" : "text-sub"
                }`}
              >
                <m.icon size={14} />
                {m.label}
              </button>
            ))}
          </div>

          {mode === "select" && (
            <div>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-sub">
                  Click pages to select them.{" "}
                  {selectedPages.size > 0 && (
                    <span className="font-semibold text-ink">
                      {selectedPages.size} selected
                    </span>
                  )}
                </p>
                {selectedPages.size > 0 && (
                  <div className="inline-flex rounded-lg border border-line bg-card p-1">
                    <button
                      type="button"
                      onClick={() => setExtractMode("together")}
                      className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                        extractMode === "together" ? "bg-brand text-white" : "text-sub"
                      }`}
                    >
                      As one file
                    </button>
                    <button
                      type="button"
                      onClick={() => setExtractMode("separate")}
                      className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                        extractMode === "separate" ? "bg-brand text-white" : "text-sub"
                      }`}
                    >
                      As separate files
                    </button>
                  </div>
                )}
              </div>

              {sessionId && pageCount > 0 ? (
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
                  {Array.from({ length: pageCount }, (_, i) => i + 1).map((pageNum) => (
                    <LazyPageThumbnail
                      key={pageNum}
                      sessionId={sessionId}
                      pageNumber={pageNum}
                      selected={selectedPages.has(pageNum)}
                      onClick={() => togglePage(pageNum)}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 rounded-xl border border-line bg-card p-10 text-sm text-sub">
                  <Loader2 size={16} className="animate-spin" />
                  Loading page thumbnails…
                </div>
              )}
            </div>
          )}

          {mode === "ranges" && (
            <div>
              <p className="mb-3 text-sm font-bold text-ink">Page ranges</p>
              <p className="mb-3 text-xs text-sub">
                Each range becomes its own file. Example: <code>1-3,5,8-10</code> creates
                three files — pages 1-3, page 5, and pages 8-10.
              </p>
              <input
                type="text"
                value={rangesInput}
                onChange={(e) => setRangesInput(e.target.value)}
                placeholder="e.g. 1-3,5,8-10"
                className="w-full max-w-md rounded-xl border border-line bg-card px-4 py-2.5 text-sm text-ink outline-none focus:border-brand"
              />
            </div>
          )}

          {mode === "every_n" && (
            <div>
              <p className="mb-3 text-sm font-bold text-ink">Pages per file</p>
              <p className="mb-3 text-xs text-sub">
                Splits the PDF into consecutive chunks of this many pages each.
              </p>
              <input
                type="number"
                min="1"
                max={pageCount || 999}
                value={everyN}
                onChange={(e) => setEveryN(parseInt(e.target.value, 10) || 1)}
                className="w-32 rounded-xl border border-line bg-card px-4 py-2.5 text-sm text-ink outline-none focus:border-brand"
              />
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              disabled={status === "processing"}
              onClick={handleSplit}
              className="inline-flex items-center gap-2 rounded-xl border border-line bg-brand px-5 py-2.5 text-sm font-bold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-soft"
            >
              {status === "processing" ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Splitting…
                </>
              ) : (
                <>
                  <Split size={16} />
                  Split PDF
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
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-line bg-card p-10 text-center shadow-soft">
          <span
            className="flex h-14 w-14 items-center justify-center rounded-2xl"
            style={{ background: "#E4F5EC" }}
          >
            <Split size={26} className="text-[#27AE60]" />
          </span>
          <p className="text-base font-bold text-ink">
            {outputCount > 1 ? `Split into ${outputCount} files!` : "Your PDF is ready!"}
          </p>
          <a
            href={resultUrl}
            download={resultIsZip ? "split_files.zip" : "split.pdf"}
            className="inline-flex items-center gap-2 rounded-xl border border-line bg-brand px-5 py-2.5 text-sm font-bold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
          >
            <Download size={16} />
            Download {resultIsZip ? "ZIP" : "PDF"}
          </a>
          <button
            type="button"
            onClick={reset}
            className="text-sm font-semibold text-sub transition-colors hover:text-brand"
          >
            Split another file
          </button>
        </div>
      )}
    </ToolPageLayout>
  );
}
