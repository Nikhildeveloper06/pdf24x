// NOTE: This is generic placeholder legal text, not legal advice.
// Have an actual lawyer review and customize this before real launch —
// especially the data retention, third-party, and jurisdiction sections.

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-sub">Last updated: [TODO: add date]</p>

      <div className="prose-pdf24x mt-8 space-y-6 text-sm leading-relaxed text-ink sm:text-base">
        <section>
          <h2 className="text-lg font-bold text-ink">1. What this policy covers</h2>
          <p className="mt-2 text-sub">
            This Privacy Policy explains how PDF24X ("we", "us") collects,
            uses, and protects information when you use our website and
            tools. By using PDF24X, you agree to the practices described
            here.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-ink">2. Files you upload</h2>
          <p className="mt-2 text-sub">
            Files you upload for processing (merging, compressing, converting,
            etc.) are used only to perform the requested action. We do not
            review, share, or sell the contents of your files. Uploaded files
            and their results are automatically deleted from our servers
            after a short period — [TODO: specify exact retention window,
            e.g. "1 hour" or "24 hours"].
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-ink">3. Information we collect</h2>
          <p className="mt-2 text-sub">
            We may collect basic technical information automatically, such as
            browser type, device type, and pages visited, to understand how
            the site is used and to fix problems. [TODO: list any analytics
            tools you actually use, e.g. Google Analytics, Plausible.]
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-ink">4. Cookies</h2>
          <p className="mt-2 text-sub">
            We may use cookies or similar technologies for basic site
            functionality (such as remembering your theme preference) and,
            if applicable, for analytics or advertising. [TODO: confirm
            actual cookie usage and add a cookie consent banner if required
            in your target regions, e.g. EU/UK under GDPR.]
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-ink">5. Third-party services</h2>
          <p className="mt-2 text-sub">
            We may use third-party services for hosting, analytics, or
            advertising. These providers may have their own privacy
            practices. [TODO: list actual third parties used, e.g. hosting
            provider, ad network.]
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-ink">6. Your rights</h2>
          <p className="mt-2 text-sub">
            Depending on your location, you may have rights to access,
            correct, or delete personal information we hold about you.
            [TODO: add specifics for your applicable jurisdiction(s), e.g.
            GDPR for EU users, CCPA for California users.]
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-ink">7. Changes to this policy</h2>
          <p className="mt-2 text-sub">
            We may update this policy from time to time. Material changes
            will be reflected by updating the "Last updated" date above.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-ink">8. Contact</h2>
          <p className="mt-2 text-sub">
            Questions about this policy can be sent to{" "}
            <a href="mailto:contact@pdf24x.example.com" className="font-semibold text-brand">
              contact@pdf24x.example.com
            </a>
            . [TODO: replace with your real contact email.]
          </p>
        </section>
      </div>
    </div>
  );
}
