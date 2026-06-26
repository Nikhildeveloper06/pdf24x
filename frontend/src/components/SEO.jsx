import { Helmet } from "react-helmet-async";

const SITE_NAME = "PDF24X";
// TODO: replace with your real production domain once deployed.
const SITE_URL = "https://pdf24x.example.com";

/**
 * Drop this at the top of any page to set its <title>, meta description,
 * canonical URL, and Open Graph / Twitter tags. Falls back to sensible
 * site-wide defaults if a page doesn't pass its own values.
 *
 * <SEO title="Merge PDF" description="Combine PDFs for free." path="/merge-pdf" />
 */
export default function SEO({
  title,
  description = "Free online PDF, image, and developer tools — no sign up, no installs.",
  path = "/",
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — All-in-One PDF Tools Suite`;
  const canonicalUrl = `${SITE_URL}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
