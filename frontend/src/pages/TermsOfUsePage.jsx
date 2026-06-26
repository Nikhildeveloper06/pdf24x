import SEO from "../components/SEO.jsx";

// NOTE: This is generic placeholder legal text, not legal advice.
// Have an actual lawyer review and customize this before real launch —
// especially liability limits, governing law, and acceptable-use scope.

export default function TermsOfUsePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <SEO
        title="Terms of Use"
        description="Read PDF24X's Terms of Use — acceptable use, your files, warranties, and liability for our free PDF tools."
        path="/terms-of-use"
      />
      <h1 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">
        Terms of Use
      </h1>
      <p className="mt-2 text-sm text-sub">Last updated: [TODO: add date]</p>

      <div className="prose-pdf24x mt-8 space-y-6 text-sm leading-relaxed text-ink sm:text-base">
        <section>
          <h2 className="text-lg font-bold text-ink">1. Acceptance of terms</h2>
          <p className="mt-2 text-sub">
            By accessing or using PDF24X, you agree to these Terms of Use. If
            you do not agree, please do not use the site.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-ink">2. Description of service</h2>
          <p className="mt-2 text-sub">
            PDF24X provides free online tools for converting, merging,
            compressing, and otherwise processing files such as PDFs and
            images. The service is provided "as is" without warranties of
            any kind.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-ink">3. Acceptable use</h2>
          <p className="mt-2 text-sub">
            You agree not to use PDF24X to process files you do not have the
            legal right to use, or for any unlawful purpose, including but
            not limited to copyright infringement, distribution of malware,
            or processing content that violates the rights of others.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-ink">4. Your files</h2>
          <p className="mt-2 text-sub">
            You retain all rights to files you upload. We do not claim
            ownership over your content. Files are processed solely to
            deliver the requested result and are deleted afterward — see our{" "}
            <a href="/privacy-policy" className="font-semibold text-brand">
              Privacy Policy
            </a>{" "}
            for details.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-ink">5. No warranty</h2>
          <p className="mt-2 text-sub">
            PDF24X is provided without warranty of any kind, express or
            implied. We do not guarantee the service will be uninterrupted,
            error-free, or that output files will be free of defects.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-ink">6. Limitation of liability</h2>
          <p className="mt-2 text-sub">
            To the fullest extent permitted by law, PDF24X and its operators
            are not liable for any indirect, incidental, or consequential
            damages arising from use of the service. [TODO: have this
            reviewed by a lawyer for your jurisdiction — liability limits
            vary significantly by region.]
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-ink">7. Changes to these terms</h2>
          <p className="mt-2 text-sub">
            We may revise these Terms at any time. Continued use of the
            service after changes constitutes acceptance of the revised
            Terms.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-ink">8. Governing law</h2>
          <p className="mt-2 text-sub">
            [TODO: specify the governing jurisdiction for these Terms, e.g.
            "the laws of [Country/State], without regard to conflict of law
            principles."]
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-ink">9. Contact</h2>
          <p className="mt-2 text-sub">
            Questions about these Terms can be sent to{" "}
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
