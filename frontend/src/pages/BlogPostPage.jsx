import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { BLOG_POSTS } from "../data/blogPosts.jsx";
import ImagePlaceholder from "../components/ui/ImagePlaceholder.jsx";
import AdSlot from "../components/ui/AdSlot.jsx";

const TOPIC_STYLES = {
  AI: "bg-[#ECE7FF] text-[#7B61FF]",
  Tools: "bg-[#E4F5EC] text-[#27AE60]",
  Tech: "bg-[#E5EEFC] text-[#3B82F6]",
  Productivity: "bg-[#FCEEDD] text-[#F2994A]",
};

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  // Unknown slug — send to the blog listing rather than a blank page.
  if (!post) return <Navigate to="/blogs" replace />;

  const canonicalUrl = `https://pdf24x.example.com/blog/${post.slug}`;
  // TODO: replace pdf24x.example.com with your real production domain.

  return (
    <>
      <Helmet>
        <title>{post.title} | PDF24X Blog</title>
        <meta name="description" content={post.metaDescription} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph — controls how this looks when shared on social */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="article:published_time" content={post.date} />

        {/* Twitter card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.metaDescription} />
      </Helmet>

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          to="/blogs"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-sub transition-colors hover:text-brand"
        >
          <ArrowLeft size={15} />
          Back to blog
        </Link>

        <span
          className={`mb-4 inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-bold ${
            TOPIC_STYLES[post.topic] || "bg-cream text-sub"
          }`}
        >
          {post.topic}
        </span>

        {/* `<h1>` here is the page's single main heading — important for SEO */}
        <h1 className="font-display text-2xl font-extrabold leading-tight text-ink sm:text-3xl">
          {post.title}
        </h1>

        <div className="mt-3 flex items-center gap-4 text-sm text-sub">
          <span className="inline-flex items-center gap-1">
            <Calendar size={14} />
            {formatDate(post.date)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock size={14} />
            {post.readTime}
          </span>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-line shadow-soft">
          <ImagePlaceholder label={post.title} hint={post.topic} ratio="16 / 9" rounded="rounded-none" />
        </div>

        {/* Ad slot — top of article, above the fold */}
        <div className="mt-8">
          <AdSlot />
        </div>

        <article className="prose-pdf24x mt-8 space-y-5">
          {post.content.map((paragraph, i) => (
            <p key={i} className="text-base leading-relaxed text-ink">
              {paragraph}
            </p>
          ))}
        </article>

        {/* Ad slot — end of article, before related posts */}
        <div className="mt-10">
          <AdSlot />
        </div>

        <RelatedPosts currentSlug={post.slug} topic={post.topic} />
      </div>
    </>
  );
}

function RelatedPosts({ currentSlug, topic }) {
  const related = BLOG_POSTS.filter(
    (p) => p.slug !== currentSlug && p.topic === topic
  ).slice(0, 2);

  if (related.length === 0) return null;

  return (
    <div className="mt-12 border-t border-line pt-8">
      <h2 className="text-lg font-extrabold text-ink">More on {topic}</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {related.map((p) => (
          <Link
            key={p.slug}
            to={`/blog/${p.slug}`}
            className="rounded-xl border border-line bg-card p-4 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
          >
            <p className="text-sm font-bold text-ink">{p.title}</p>
            <p className="mt-1 text-xs text-sub">{p.readTime}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
