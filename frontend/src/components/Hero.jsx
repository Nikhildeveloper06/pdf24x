import { Search } from "lucide-react";
import ImagePlaceholder from "./ui/ImagePlaceholder.jsx";
import { HERO_BADGES, FEATURE_CHIPS } from "../data/tools.jsx";

export default function Hero() {
  return (
    <section className="grid grid-cols-1 items-center gap-8 pb-8 pt-10 sm:pt-14 lg:grid-cols-2 lg:gap-10">
      <div>
        <div className="mb-5 flex flex-wrap gap-2">
          {HERO_BADGES.map((b) => (
            <span
              key={b}
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-sub"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              {b}
            </span>
          ))}
        </div>

        <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
          All-in-One
          <br />
          <span className="text-brand">PDF</span> Tools Suite
        </h1>

        <p className="mt-4 max-w-lg text-base text-sub sm:text-lg">
          Your free, fast and secure platform to convert, edit, compress, merge,
          split PDF files and much more.
        </p>

        <div className="mt-6 flex max-w-lg items-center rounded-xl border border-line bg-surface p-1.5 shadow-soft">
          <Search size={18} className="ml-3 text-sub" />
          <input
            placeholder="Search any tool you need..."
            className="flex-1 bg-transparent px-3 py-2 text-sm text-ink outline-none placeholder:text-sub"
          />
          <button className="rounded-lg bg-brand p-2.5 text-white" aria-label="Search">
            <Search size={18} />
          </button>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {FEATURE_CHIPS.map(({ label, icon: Icon }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-1.5 text-xs font-medium text-sub"
            >
              <Icon size={13} className="text-brand" />
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Hero illustration card — drop image 1 here (src="/images/hero.png") */}
      <div className="rounded-2xl border border-line bg-surface p-6 shadow-soft sm:p-8">
        <ImagePlaceholder
          label="Hero Illustration"
          hint="Add image → /public/images/hero.png"
          ratio="16 / 11"
          rounded="rounded-xl"
          /* src="/images/hero.png" */
        />
        <h3 className="mt-6 text-lg font-bold text-ink">Powerful Tools. Simple Interface.</h3>
        <p className="mt-1 text-sm text-sub">
          All tools you need in one place. 100% free forever.
        </p>
      </div>
    </section>
  );
}
