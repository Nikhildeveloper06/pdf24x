import { useCallback, useState } from "react";
import { Minimize2, Loader2, Download, RefreshCcw, FileText, X } from "lucide-react";
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
  const [level, setLevel] = useState("medium");
  const [status, setStatus] = useState("idle"); // idle | compressing | done | error
  const [resultUrl, setResultUrl] = useState(null);
  const [resultSize, setResultSize] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFile = useCallback((newFiles) => {
    const pdf = newFiles.find((f) => f.type === "application/pdf");
    if (pdf) {
      setFile(pdf);
      setStatus("idle");
      setResultUrl(null);
    }
  }, []);

  const reset = () => {
    setFile(null);
    setStatus("idle");
    setResultUrl(null);
    setResultSize(null);
    setErrorMessage("");
  };

  const handleCompress = async () => {
    if (!file) return;
    setStatus("compressing");
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("level", level);

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
          // not JSON — keep generic message
        }
        throw new Error(detail);
      }

      const blob = await res.blob();
      setResultUrl(URL.createObjectURL(blob));
      setResultSize(blob.size);
      setStatus("done");
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message || "Something went wrong while compressing.");
      setStatus("error");
    }
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
        description="Reduce PDF file size for free with PDF24X. Choose low, medium, or high compression. No sign up required."
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
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-line bg-card p-8 text-center shadow-soft">
            <span
              className="flex h-14 w-14 items-center justify-center rounded-2xl"
              style={{ background: "#E4F5EC" }}
            >
              <Minimize2 size={26} className="text-[#27AE60]" />
            </span>
            <p className="text-base font-bold text-ink">Your PDF is compressed!</p>
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

          <div className="overflow-hidden rounded-2xl border border-line shadow-soft">
            <div className="border-b border-line bg-cream px-4 py-2 text-xs font-semibold text-sub">
              Preview
            </div>
            <iframe
              src={resultUrl}
              title="Compressed PDF preview"
              className="h-[70vh] w-full"
            />
          </div>
        </div>
      )}
    </ToolPageLayout>
  );
}
