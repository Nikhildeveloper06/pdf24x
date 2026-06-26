import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import SEO from "../components/SEO.jsx";
import { BLOG_POSTS } from "../data/blogPosts.jsx";
import ImagePlaceholder from "../components/ui/ImagePlaceholder.jsx";

const TOPIC_STYLES = {
  AI: "bg-[#ECE7FF] text-[#7B61FF]",
  Tools: "bg-[#E4F5EC] text-[#27AE60]",
  Tech: "bg-[#E5EEFC] text-[#3B82F6]",
  Productivity: "bg-[#FCEEDD] text-[#F2994A]",
};

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SEO
        title="Blog"
        description="Tech, AI, and productivity notes from PDF24X — short reads on tools and habits that actually save time."
        path="/blogs"
      />
      <header className="mb-10 text-center">
        <h1 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">
          Blog
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-sm text-sub sm:text-base">
          Tech, AI, and productivity notes — short reads on tools and habits
          that actually save time.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {BLOG_POSTS.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
          >
            <ImagePlaceholder
              label={post.title}
              hint={post.topic}
              rounded="rounded-none"
              ratio="16 / 9"
              className="border-x-0 border-t-0"
            />

            <div className="flex flex-1 flex-col p-5">
              <span
                className={`mb-3 inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-bold ${
                  TOPIC_STYLES[post.topic] || "bg-cream text-sub"
                }`}
              >
                {post.topic}
              </span>

              <h2 className="text-base font-bold leading-snug text-ink">
                {post.title}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-snug text-sub">
                {post.excerpt}
              </p>

              <div className="mt-4 flex items-center gap-4 text-xs text-sub">
                <span className="inline-flex items-center gap-1">
                  <Calendar size={13} />
                  {formatDate(post.date)}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock size={13} />
                  {post.readTime}
                </span>
              </div>

              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                Read more
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
