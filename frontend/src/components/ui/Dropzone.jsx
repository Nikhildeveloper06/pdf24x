import { useCallback, useRef, useState } from "react";
import { UploadCloud } from "lucide-react";

/**
 * Drag-and-drop + click-to-browse file picker.
 * Styled to match the site's offset-shadow / hard-border aesthetic.
 *
 * Props:
 *  - accept: string   e.g. "application/pdf"
 *  - multiple: bool
 *  - onFiles: (File[]) => void   called with the accepted files
 *  - label: string    primary instruction text
 *  - hint: string     secondary text (file types / limits)
 */
export default function Dropzone({
  accept = "application/pdf",
  multiple = true,
  onFiles,
  label = "Drop your PDF files here",
  hint = "or click to browse — PDF files only",
}) {
  const inputRef = useRef(null);
  const [isOver, setIsOver] = useState(false);

  const handleFiles = useCallback(
    (fileList) => {
      const files = Array.from(fileList || []);
      if (!files.length) return;
      onFiles?.(files);
    },
    [onFiles]
  );

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsOver(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    setIsOver(true);
  }, []);

  const onDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsOver(false);
  }, []);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
      }}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      className={[
        "flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed",
        "px-6 py-14 text-center cursor-pointer select-none transition-all",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand",
        isOver
          ? "border-brand bg-redsoft shadow-lift -translate-y-0.5"
          : "border-line bg-card shadow-soft hover:-translate-y-0.5 hover:shadow-lift",
      ].join(" ")}
    >
      <span
        className="flex h-14 w-14 items-center justify-center rounded-xl"
        style={{ background: "var(--red-soft)" }}
      >
        <UploadCloud size={26} className="text-brand" />
      </span>

      <p className="text-base font-bold text-ink">{label}</p>
      <p className="text-sm text-sub">{hint}</p>

      <span className="mt-1 inline-flex items-center rounded-xl border border-line bg-cream px-4 py-2 text-sm font-semibold text-ink shadow-soft transition-transform group-hover:-translate-y-0.5">
        Choose Files
      </span>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}
