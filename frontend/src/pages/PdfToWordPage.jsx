import { useCallback, useState } from "react";
import { FileText, Loader2, Download, RefreshCcw, X, Info } from "lucide-react";
import SEO from "../components/SEO.jsx";
import ToolPageLayout from "../components/ToolPageLayout.jsx";
import Dropzone from "../components/ui/Dropzone.jsx";

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

export default function PdfToWordPage() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | converting | done | error
  const [resultUrl, setResultUrl] = useState(null);
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
    setErrorMessage("");
  };

  const handleConvert = async () => {
    if (!file) return;
    setStatus("converting");
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/pdf/to-word", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        let detail = "Conversion failed.";
        try {
          const data = await res.json();
          detail = data.detail || detail;
        } catch {
          // not JSON
        }
        throw new Error(detail);
      }

      const blob = await res.blob();
      setResultUrl(URL.createObjectURL(blob));
      setStatus("done");
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message || "Something went wrong while converting.");
      setStatus("error");
    }
  };

  return (
    <ToolPageLayout
      icon={FileText}
      color="#EE4B3C"
      tint="#FDE9E6"
      title="PDF to Word"
      desc="Convert your PDF into an editable Word document."
    >
      <SEO
        title="PDF to Word"
        description="Convert PDF to an editable Word (.docx) document for free with PDF24X. No sign up required."
        path="/pdf-to-word"
      />

      {/* Honest expectation-setting, shown up front, not buried */}
      <div className="mb-5 flex items-start gap-3 rounded-xl border border-line bg-cream px-4 py-3 text-sm text-sub">
        <Info size={16} className="mt-0.5 shrink-0 text-brand" />
        <p>
          Works best on standard documents — letters, reports, articles with
          regular text and simple tables. Complex multi-column layouts, heavy
          design elements, or scanned/image-only PDFs may not convert
          perfectly and can need some manual cleanup afterward.
        </p>
      </div>

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
              style={{ background: "#FDE9E6" }}
            >
              <FileText size={16} className="text-[#EE4B3C]" />
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

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              disabled={status === "converting"}
              onClick={handleConvert}
              className="inline-flex items-center gap-2 rounded-xl border border-line bg-brand px-5 py-2.5 text-sm font-bold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-soft"
            >
              {status === "converting" ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Converting… this can take a moment
                </>
              ) : (
                <>
                  <FileText size={16} />
                  Convert to Word
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
            <FileText size={26} className="text-[#27AE60]" />
          </span>
          <p className="text-base font-bold text-ink">Your Word document is ready!</p>
          <p className="max-w-sm text-sm text-sub">
            Double-check formatting once you open it — some manual cleanup
            may be needed depending on the original PDF's layout.
          </p>
          <a
            href={resultUrl}
            download="converted.docx"
            className="inline-flex items-center gap-2 rounded-xl border border-line bg-brand px-5 py-2.5 text-sm font-bold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
          >
            <Download size={16} />
            Download Word document
          </a>
          <button
            type="button"
            onClick={reset}
            className="text-sm font-semibold text-sub transition-colors hover:text-brand"
          >
            Convert another file
          </button>
        </div>
      )}
    </ToolPageLayout>
  );
}
