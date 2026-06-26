import { FileText } from "lucide-react";

/** Brand wordmark. The square icon is an icon-placeholder — swap FileText
 *  for your own logo mark whenever ready. */
export default function Logo({ size = 26 }) {
  return (
    <a href="/" className="flex select-none items-center gap-2">
      <span
        className="flex items-center justify-center rounded-lg bg-brand"
        style={{ width: size + 8, height: size + 8 }}
      >
        <FileText size={size - 6} color="#fff" strokeWidth={2.4} />
      </span>
      <span className="font-extrabold tracking-tight text-ink" style={{ fontSize: size - 4 }}>
        PDF<span className="text-brand">24X</span>
      </span>
    </a>
  );
}
