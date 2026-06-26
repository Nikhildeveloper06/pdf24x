// NOTE: This is generic placeholder legal text, not legal advice.
// Have an actual lawyer review and customize this before real launch.

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">
        Disclaimer
      </h1>
      <p className="mt-2 text-sm text-sub">Last updated: [TODO: add date]</p>

      <div className="prose-pdf24x mt-8 space-y-6 text-sm leading-relaxed text-ink sm:text-base">
        <section>
          <h2 className="text-lg font-bold text-ink">No professional advice</h2>
          <p className="mt-2 text-sub">
            Content on PDF24X, including blog posts and tool descriptions, is
            provided for general informational purposes only. It does not
            constitute legal, financial, medical, or other professional
            advice. Always consult a qualified professional for advice
            specific to your situation.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-ink">Tool accuracy</h2>
          <p className="mt-2 text-sub">
            While we aim for our tools to work reliably, file conversion and
            processing can occasionally produce unexpected results depending
            on the source file's format, content, or corruption. We
            recommend reviewing output files before relying on them for
            important purposes.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-ink">Third-party content and links</h2>
          <p className="mt-2 text-sub">
            PDF24X may link to third-party websites or services. We are not
            responsible for the content, accuracy, or practices of any
            third-party site, and inclusion of a link does not imply
            endorsement.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-ink">No guarantee of availability</h2>
          <p className="mt-2 text-sub">
            We aim to keep PDF24X available and reliable, but we do not
            guarantee uninterrupted access. The service may be modified,
            suspended, or discontinued at any time without notice.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-ink">Contact</h2>
          <p className="mt-2 text-sub">
            Questions about this disclaimer can be sent to{" "}
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
