import { ImageIcon } from "lucide-react";

/**
 * Drop-in placeholder for real images.
 * Replace by passing `src` once your asset is in /public/images.
 *
 * <ImagePlaceholder label="Hero Illustration" src="/images/hero.png" />
 */
export default function ImagePlaceholder({
  label = "Image",
  hint,
  src,
  alt = "",
  className = "",
  rounded = "rounded-2xl",
  ratio = "16 / 10",
}) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt || label}
        className={`w-full h-full object-cover ${rounded} ${className}`}
      />
    );
  }
  return (
    <div
      className={`flex w-full items-center justify-center border-2 border-dashed border-line bg-cream ${rounded} ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <div className="px-4 text-center text-sub">
        <ImageIcon className="mx-auto mb-2 opacity-60" size={28} />
        <p className="text-sm font-semibold">{label}</p>
        {hint && <p className="mt-0.5 text-xs opacity-80">{hint}</p>}
      </div>
    </div>
  );
}
