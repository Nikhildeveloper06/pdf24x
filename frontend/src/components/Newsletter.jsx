import { Mail } from "lucide-react";

export default function Newsletter() {
  return (
    <div className="rounded-2xl border border-line bg-surface p-6 shadow-soft sm:p-8">
      <div className="flex items-start gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-redsoft">
          <Mail size={20} className="text-brand" />
        </span>
        <div>
          <h3 className="text-lg font-extrabold text-ink">Stay Updated</h3>
          <p className="mt-1 text-sm text-sub">
            Get tips, tool updates and helpful content straight to your inbox.
          </p>
        </div>
      </div>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <input
          placeholder="Enter your email address"
          className="flex-1 rounded-lg border border-line bg-cream px-4 py-2.5 text-sm text-ink outline-none placeholder:text-sub"
        />
        <button className="rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white">
          Subscribe
        </button>
      </div>
      <p className="mt-3 text-xs text-sub">No spam, unsubscribe anytime.</p>
    </div>
  );
}
