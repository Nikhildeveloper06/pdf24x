import { Link } from "react-router-dom";
import { Heart, ShieldCheck, Zap, Globe, ArrowRight } from "lucide-react";
import SEO from "../components/SEO.jsx";

const VALUES = [
  { icon: Heart, color: "#EE4B3C", tint: "#FDE9E6", title: "Built for everyone", desc: "No sign-ups, no paywalls — every tool stays free and open to use." },
  { icon: ShieldCheck, color: "#27AE60", tint: "#E4F5EC", title: "Privacy first", desc: "Files are processed and then deleted. We don't keep what isn't ours." },
  { icon: Zap, color: "#3B82F6", tint: "#E5EEFC", title: "Fast by default", desc: "We optimize every tool so you get results in seconds, not minutes." },
  { icon: Globe, color: "#7B61FF", tint: "#ECE7FF", title: "Works anywhere", desc: "No installs. Any device, any browser, any time." },
];

export default function AboutUsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <SEO
        title="About Us"
        description="Learn why PDF24X exists — free, fast, privacy-first PDF and file tools, with no sign-ups or hidden fees."
        path="/about"
      />
      <header className="text-center">
        <span className="mx-auto mb-3 inline-flex items-center rounded-full border border-line bg-card px-3 py-1 text-xs font-bold text-brand shadow-soft">
          About PDF24X
        </span>
        <h1 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">
          Tools that get out of your way
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-sub">
          {/* TODO: replace with your real mission statement */}
          PDF24X exists to make everyday file tasks — merging, converting,
          compressing, organizing — fast, free, and frustration-free. We
          believe useful tools shouldn't come with sign-up walls, hidden
          fees, or your data as the price of admission.
        </p>
      </header>

      <section className="mt-14 rounded-2xl border border-line bg-card p-7 shadow-soft sm:p-10">
        <h2 className="font-display text-xl font-extrabold text-ink sm:text-2xl">
          Why we built this
        </h2>
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-sub sm:text-base">
          {/* TODO: replace with your real story */}
          <p>
            We kept running into the same problem: needing to merge a couple
            of PDFs, or shrink one down to email it, and ending up on a site
            cluttered with ads, asking us to create an account just to
            download a file we already had the rights to.
          </p>
          <p>
            So we started building the tool we actually wanted to use —
            no clutter, no accounts, no catch. PDF24X is the result: a
            growing collection of simple, fast tools for PDFs, images, and
            more, built one tool at a time.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-center font-display text-xl font-extrabold text-ink sm:text-2xl">
          What we care about
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {VALUES.map((v) => (
            <div
              key={v.title}
              className="rounded-2xl border border-line bg-card p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
            >
              <span
                className="flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ background: v.tint }}
              >
                <v.icon size={22} style={{ color: v.color }} />
              </span>
              <h3 className="mt-4 text-base font-bold text-ink">{v.title}</h3>
              <p className="mt-1.5 text-sm leading-snug text-sub">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-14 text-center">
        <Link
          to="/all-tools"
          className="inline-flex items-center gap-2 rounded-xl border border-line bg-brand px-5 py-2.5 text-sm font-bold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
        >
          Explore all tools
          <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}
