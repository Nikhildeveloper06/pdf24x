import { useCallback, useState } from "react";
import { Combine, Loader2, Download, RefreshCcw } from "lucide-react";
import SEO from "../components/SEO.jsx";
import ToolPageLayout from "../components/ToolPageLayout.jsx";
import Dropzone from "../components/ui/Dropzone.jsx";
import FileListItem from "../components/ui/FileListItem.jsx";

export default function MergePdfPage() {
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState("idle");
  const [resultUrl, setResultUrl] = useState(null);
  const [dragIndex, setDragIndex] = useState(null);

  const addFiles = useCallback((newFiles) => {
    const pdfsOnly = newFiles.filter((f) => f.type === "application/pdf");
    setFiles((prev) => [...prev, ...pdfsOnly]);
    setStatus("idle");
    setResultUrl(null);
  }, []);

  const removeFile = useCallback((file) => {
    setFiles((prev) => prev.filter((f) => f !== file));
  }, []);

  const reorder = useCallback((from, to) => {
    setFiles((prev) => {
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  }, []);

  const reset = () => {
    setFiles([]);
    setStatus("idle");
    setResultUrl(null);
  };

  const handleMerge = async () => {
    if (files.length < 2) return;
    setStatus("merging");

    try {
      // ------------------------------------------------------------------
      // TODO: wire to the real backend once it exists. Expected contract:
      //
      //   POST /api/pdf/merge
      //   Content-Type: multipart/form-data
      //   field "files" — repeated, in the order they should be merged
      //
      //   Response: 200 OK, body = the merged PDF (application/pdf)
      //
      // const formData = new FormData();
      // files.forEach((f) => formData.append("files", f));
      // const res = await fetch("/api/pdf/merge", { method: "POST", body: formData });
      // if (!res.ok) throw new Error("Merge failed");
      // const blob = await res.blob();
      // setResultUrl(URL.createObjectURL(blob));
      // ------------------------------------------------------------------

      await new Promise((r) => setTimeout(r, 1200));
      throw new Error("Backend not connected yet");
    } catch (err) {
      console.error(err);
      setStatus("error");
      return;
    }
  };

  return (
    <ToolPageLayout
      icon={Combine}
      color="#F2994A"
      tint="#FCEEDD"
      title="Merge PDF"
      desc="Combine multiple PDF files into one, in whatever order you choose."
    >
      <SEO
        title="Merge PDF"
        description="Combine multiple PDF files into one for free with PDF24X. No sign up, drag and drop, instant download."
        path="/merge-pdf"
      />
      {files.length === 0 && (
        <Dropzone
          label="Drop your PDF files here"
          hint="or click to browse — select 2 or more PDFs"
          onFiles={addFiles}
        />
      )}

      {files.length > 0 && status !== "done" && (
        <div className="space-y-5">
          <ul className="space-y-2.5">
            {files.map((file, i) => (
              <FileListItem
                key={`${file.name}-${i}`}
                file={file}
                index={i}
                draggable
                onRemove={removeFile}
                dragHandlers={{
                  onDragStart: () => setDragIndex(i),
                  onDragOver: (e) => e.preventDefault(),
                  onDrop: () => {
                    if (dragIndex !== null && dragIndex !== i) reorder(dragIndex, i);
                    setDragIndex(null);
                  },
                }}
              />
            ))}
          </ul>

          <Dropzone
            label="Add more PDFs"
            hint="drop here or click to browse"
            onFiles={addFiles}
          />

          {files.length < 2 && (
            <p className="text-sm font-medium text-brand">
              Add at least one more PDF to merge.
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              type="button"
              disabled={files.length < 2 || status === "merging"}
              onClick={handleMerge}
              className="inline-flex items-center gap-2 rounded-xl border border-line bg-brand px-5 py-2.5 text-sm font-bold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-soft"
            >
              {status === "merging" ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Merging…
                </>
              ) : (
                <>
                  <Combine size={16} />
                  Merge {files.length > 1 ? `${files.length} PDFs` : "PDFs"}
                </>
              )}
            </button>

            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-2 rounded-xl border border-line bg-cream px-5 py-2.5 text-sm font-semibold text-ink shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
            >
              <RefreshCcw size={15} />
              Clear all
            </button>
          </div>

          {status === "error" && (
            <p className="rounded-xl border border-line bg-redsoft px-4 py-3 text-sm font-medium text-ink">
              Couldn't merge your files just yet — the processing backend isn't
              connected in this build. The UI flow above is fully wired and
              ready for it.
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
            <Combine size={26} className="text-[#27AE60]" />
          </span>
          <p className="text-base font-bold text-ink">Your PDF is ready!</p>
          <a
            href={resultUrl}
            download="merged.pdf"
            className="inline-flex items-center gap-2 rounded-xl border border-line bg-brand px-5 py-2.5 text-sm font-bold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
          >
            <Download size={16} />
            Download merged PDF
          </a>
          <button
            type="button"
            onClick={reset}
            className="text-sm font-semibold text-sub transition-colors hover:text-brand"
          >
            Merge more files
          </button>
        </div>
      )}
    </ToolPageLayout>
  );
}
