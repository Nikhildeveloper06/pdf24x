import ImagePlaceholder from "./ui/ImagePlaceholder.jsx";
import TypingText from "./ui/TypingText.jsx";
import SearchBar from "./ui/SearchBar.jsx";
import { HERO_BADGES, FEATURE_CHIPS } from "../data/tools.jsx";

const HERO_WORDS = ["PDF", "Image", "Developers", "Publishers", "Creators"];

export default function Hero() {
  return (
    <section className="grid grid-cols-1 items-center gap-8 pb-8 pt-10 sm:pt-14 md:grid-cols-2 md:gap-10">
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
        </h1>
        <div className="text-4xl font-extrabold leading-[1.05] tracking-tight text-brand sm:text-5xl lg:text-6xl">
          <TypingText words={HERO_WORDS} />
        </div>
        <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
          Tools Suite
        </h1>

        <p className="mt-4 max-w-lg text-base text-sub sm:text-lg">
          Your free, fast and secure platform to convert, edit, compress, merge,
          split PDF files and much more.
        </p>

        <SearchBar />

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
      {/* Hero illustration card — now using the real image. */}
      <div className="rounded-2xl border border-line bg-surface p-6 shadow-soft sm:p-8">
        <ImagePlaceholder
          label="Hero Illustration"
          ratio="16 / 11"
          rounded="rounded-xl"
          src="/images/hero.png"
          alt="PDF24X — all-in-one PDF tools illustration"
        />
        <h3 className="mt-6 text-lg font-bold text-ink">Powerful Tools. Simple Interface.</h3>
        <p className="mt-1 text-sm text-sub">
          All tools you need in one place. 100% free forever.
        </p>
      </div>
    </section>
  );
}
