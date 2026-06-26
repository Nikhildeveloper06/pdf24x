import { ArrowRight } from "lucide-react";

/**
 * Yellow CTA. The yellow is a solid brand color by default; to use a
 * background image (your image 3) uncomment the style line below and add
 * /public/images/cta-bg.png
 */
export default function CtaBanner() {
  return (
    <section
      className="relative mb-12 mt-10 overflow-hidden rounded-2xl bg-banner px-6 py-10 text-center sm:px-10 sm:py-14"
      /* style={{ backgroundImage: "url('/images/cta-bg.png')", backgroundSize: "cover", backgroundPosition: "center" }} */
    >
      {/* decorative corner blocks (match reference) */}
      <div className="pointer-events-none absolute -left-6 -top-6 h-28 w-28 rotate-12 rounded-2xl bg-black/10" />
      <div className="pointer-events-none absolute -bottom-8 -right-6 h-32 w-44 -rotate-6 rounded-2xl bg-black/5" />

      <div className="relative">
        <h2 className="text-2xl font-extrabold text-[#1A1A1A] sm:text-4xl">
          Powerful Tools. 100% Free.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-[#1A1A1A]/80 sm:text-base">
          Everything you need to work with PDFs and more — in one place.
        </p>
        <a
          href="#"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#1A1A1A] px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
        >
          Explore All Tools <ArrowRight size={16} />
        </a>
      </div>
    </section>
  );
}
