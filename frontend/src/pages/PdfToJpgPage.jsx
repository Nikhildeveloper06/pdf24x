import { useCallback, useState } from "react";
import { FileImage, Loader2, Download, RefreshCcw, X } from "lucide-react";
import JSZip from "jszip";
import SEO from "../components/SEO.jsx";
import ToolPageLayout from "../components/ToolPageLayout.jsx";
import Dropzone from "../components/ui/Dropzone.jsx";

const QUALITY_LEVELS = [
  { id: "low", label: "Low", desc: "Smaller files, lower resolution" },
  { id: "medium", label: "Medium", desc: "Good balance for most uses" },
  { id: "high", label: "High", desc: "Best quality, larger files" },
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

export default function PdfToJpgPage() {
  const [file, setFile] = useState(null);
  const [quality, setQuality] = useState("medium");
  const [status, setStatus] = useState("idle"); // idle | converting | done | error
  const [resultUrl, setResultUrl] = useState(null);
  const [resultIsZip, setResultIsZip] = useState(false);
  const [outputCount, setOutputCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  // Gallery state — populated for both single-JPG and unzipped multi-page results.
  const [galleryImages, setGalleryImages] = useState([]); // [{ name, url }]
  const [unzipping, setUnzipping] = useState(false);

  const handleFile = useCallback((newFiles) => {
    const pdf = newFiles.find((f) => f.type === "application/pdf");
    if (pdf) {
      setFile(pdf);
      setStatus("idle");
      setResultUrl(null);
      setGalleryImages([]);
    }
  }, []);

  const reset = () => {
    setFile(null);
    setStatus("idle");
    setResultUrl(null);
    setErrorMessage("");
    setGalleryImages([]);
  };

  const buildGalleryFromZip = async (blob) => {
    setUnzipping(true);
    try {
      const zip = await JSZip.loadAsync(blob);
      const entries = Object.values(zip.files)
        .filter((f) => !f.dir)
        .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));

      const images = [];
      for (const entry of entries) {
        const imgBlob = await entry.async("blob");
        images.push({
          name: entry.name,
          url: URL.createObjectURL(imgBlob),
        });
      }
      setGalleryImages(images);
    } catch (err) {
      console.error("Failed to unzip preview:", err);
    } finally {
      setUnzipping(false);
    }
  };

  const handleConvert = async () => {
    if (!file) return;
    setStatus("converting");
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("quality", quality);

      const res = await fetch("/api/pdf/to-jpg", {
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

      const contentType = res.headers.get("Content-Type") || "";
      const isZip = contentType.includes("zip");
      const count = parseInt(res.headers.get("X-Output-Count") || "1", 10);

      const blob = await res.blob();
      setResultUrl(URL.createObjectURL(blob));
      setResultIsZip(isZip);
      setOutputCount(count);
      setStatus("done");

      if (isZip) {
        buildGalleryFromZip(blob);
      } else {
        setGalleryImages([{ name: "page.jpg", url: URL.createObjectURL(blob) }]);
      }
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message || "Something went wrong while converting.");
      setStatus("error");
    }
  };

  return (
    <ToolPageLayout
      icon={FileImage}
      color="#EC4899"
      tint="#FCE4EF"
      title="PDF to JPG"
      wide
      desc="Convert every page of your PDF into a JPG image."
    >
      <SEO
        title="PDF to JPG"
        description="Convert PDF pages to JPG images for free with PDF24X. Choose your quality level and preview every page. No sign up required."
        path="/pdf-to-jpg"
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
              style={{ background: "#FCE4EF" }}
            >
              <FileImage size={16} className="text-[#EC4899]" />
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
            <p className="mb-3 text-sm font-bold text-ink">Image quality</p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {QUALITY_LEVELS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setQuality(opt.id)}
                  className={`rounded-xl border p-4 text-left transition-all ${
                    quality === opt.id
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
              disabled={status === "converting"}
              onClick={handleConvert}
              className="inline-flex items-center gap-2 rounded-xl border border-line bg-brand px-5 py-2.5 text-sm font-bold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-soft"
            >
              {status === "converting" ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Converting…
                </>
              ) : (
                <>
                  <FileImage size={16} />
                  Convert to JPG
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
        <div className="space-y-6">
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-line bg-card p-8 text-center shadow-soft">
            <span
              className="flex h-14 w-14 items-center justify-center rounded-2xl"
              style={{ background: "#E4F5EC" }}
            >
              <FileImage size={26} className="text-[#27AE60]" />
            </span>
            <p className="text-base font-bold text-ink">
              {outputCount > 1 ? `${outputCount} pages converted!` : "Your JPG is ready!"}
            </p>
            <div className="flex flex-col items-center gap-3">
              <a
                href={resultUrl}
                download={resultIsZip ? "pages.zip" : "page.jpg"}
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-brand px-5 py-2.5 text-sm font-bold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
              >
                <Download size={16} />
                Download {resultIsZip ? "all as ZIP" : "JPG"}
              </a>
              <button
                type="button"
                onClick={reset}
                className="text-sm font-semibold text-sub transition-colors hover:text-brand"
              >
                Convert another file
              </button>
            </div>
          </div>

          {/* Thumbnail gallery — every converted page, with its own download link */}
          <div>
            <p className="mb-3 text-sm font-bold text-ink">Preview</p>
            {unzipping ? (
              <div className="flex items-center justify-center gap-2 rounded-xl border border-line bg-card p-10 text-sm text-sub">
                <Loader2 size={16} className="animate-spin" />
                Preparing preview…
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {galleryImages.map((img, i) => (
                  <a
                    key={img.name}
                    href={img.url}
                    download={img.name}
                    className="group relative overflow-hidden rounded-lg border border-line bg-card shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
                  >
                    <img
                      src={img.url}
                      alt={`Page ${i + 1}`}
                      className="aspect-[3/4] w-full object-cover"
                    />
                    <span className="absolute bottom-1 right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-cream/90 px-1 text-[10px] font-bold text-sub">
                      {i + 1}
                    </span>
                    <span className="absolute inset-0 flex items-center justify-center bg-ink/0 opacity-0 transition-opacity group-hover:bg-ink/40 group-hover:opacity-100">
                      <Download size={18} className="text-white" />
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </ToolPageLayout>
  );
}
