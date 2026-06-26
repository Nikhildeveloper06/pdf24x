import { Mail } from "lucide-react";
import SEO from "../components/SEO.jsx";

export default function ContactUsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6 lg:px-8">
      <SEO
        title="Contact Us"
        description="Get in touch with the PDF24X team — questions, feedback, or bug reports welcome."
        path="/contact-us"
      />
      <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-line bg-card shadow-soft">
        <Mail size={24} className="text-brand" />
      </span>

      <h1 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">
        Contact Us
      </h1>

      <p className="mx-auto mt-3 max-w-md text-sm text-sub sm:text-base">
        Questions, feedback, or found a bug? Reach out anytime — we read
        every message.
      </p>

      <a
        href="mailto:contact@pdf24x.example.com"
        className="mt-6 inline-flex items-center gap-2 rounded-xl border border-line bg-brand px-6 py-3 text-base font-bold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
      >
        <Mail size={17} />
        contact@pdf24x.example.com
      </a>

      <p className="mt-3 text-xs text-sub">
        {/* TODO: replace with your real contact email above and here */}
        We typically reply within 1–2 business days.
      </p>
    </div>
  );
}
