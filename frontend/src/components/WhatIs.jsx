import { CheckCircle2 } from "lucide-react";
import ImagePlaceholder from "./ui/ImagePlaceholder.jsx";
import Newsletter from "./Newsletter.jsx";
import { WHAT_CHECKS } from "../data/tools.jsx";

export default function WhatIs() {
  return (
    <section className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border border-line bg-surface p-6 shadow-soft sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row">
          <div className="w-full shrink-0 sm:w-32">
            <ImagePlaceholder
              label="Illustration"
              ratio="3 / 4"
              rounded="rounded-xl"
              src="/images/what-is.png"
              alt="What is PDF24X illustration"
            />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-ink">What is PDF24X?</h2>
            <p className="mt-2 text-sm text-sub">
              PDF24X is a free online platform that offers a wide range of PDF,
              image, video and developer tools. Our mission is to provide
              easy-to-use, fast and secure tools for everyone.
            </p>
            <ul className="mt-4 space-y-2.5">
              {WHAT_CHECKS.map((c) => (
                <li key={c} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 size={17} className="mt-0.5 shrink-0" style={{ color: "#27AE60" }} />
                  <span className="text-ink">{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Newsletter />
    </section>
  );
}
