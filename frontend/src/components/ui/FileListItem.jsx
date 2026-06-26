import { FileText, X, GripVertical } from "lucide-react";

/** Format bytes into a human string, e.g. 1532312 -> "1.5 MB" */
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

/**
 * One row representing a selected file.
 * Pass `draggable` + drag handlers from the parent if reordering is needed.
 */
export default function FileListItem({
  file,
  onRemove,
  draggable = false,
  dragHandlers = {},
  index,
}) {
  return (
    <li
      draggable={draggable}
      {...dragHandlers}
      className="flex items-center gap-3 rounded-xl border border-line bg-card px-4 py-3 shadow-soft"
    >
      {draggable && (
        <GripVertical size={18} className="cursor-grab text-sub shrink-0" />
      )}

      {typeof index === "number" && (
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cream text-xs font-bold text-sub border border-line">
          {index + 1}
        </span>
      )}

      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
        style={{ background: "var(--red-soft)" }}
      >
        <FileText size={16} className="text-brand" />
      </span>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-ink">{file.name}</p>
        <p className="text-xs text-sub">{formatBytes(file.size)}</p>
      </div>

      <button
        type="button"
        onClick={() => onRemove?.(file)}
        aria-label={`Remove ${file.name}`}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line bg-cream text-sub transition-colors hover:text-brand hover:border-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
      >
        <X size={15} />
      </button>
    </li>
  );
}
