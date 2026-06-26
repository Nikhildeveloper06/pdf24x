// ============================================================
// Blog post registry. Add a new post by adding one object here —
// no new route or page file needed, since BlogPostPage.jsx reads
// from this list via the `slug` in the URL.
//
// `image` is a placeholder path — drop real images into
// public/images/blog/ and update the path, or swap for
// <ImagePlaceholder> if no image exists yet.
// `metaDescription` is what search engines show in results —
// keep it under ~155 characters.
// ============================================================

export const BLOG_POSTS = [
  {
    slug: "ai-assistants-daily-workflow",
    title: "How AI Assistants Are Quietly Reshaping Daily Workflows",
    excerpt: "From drafting emails to organizing files, AI tools are becoming the default first step — not the novelty they once were.",
    topic: "AI",
    date: "2026-05-12",
    readTime: "5 min read",
    image: "/images/blog/ai-workflow.jpg",
    metaDescription: "A look at how AI assistants have moved from novelty to default in everyday work — drafting, organizing, and decision support.",
    content: [
      "A few years ago, reaching for an AI assistant felt like a deliberate choice — something you did for a specific, unusual task. Today, for a lot of people, it's the opposite: the AI tab is open by default, and not opening it is the deliberate choice.",
      "This shift shows up in small ways. Drafting a tricky email, summarizing a long document, or untangling a spreadsheet formula are no longer 'AI use cases' — they're just tasks that happen to route through an assistant first.",
      "What's changed isn't just capability, it's trust calibration. People have learned where these tools are reliable (first drafts, summaries, brainstorming) and where they still need a careful human pass (anything with real stakes — legal, medical, financial specifics).",
      "The practical takeaway: the most productive users aren't the ones using AI for everything, but the ones who've built an accurate mental map of where it helps and where it doesn't — and who keep that map updated as the tools improve.",
    ],
  },
  {
    slug: "pdf-workflow-tips-2026",
    title: "Five PDF Habits That Quietly Save You Hours",
    excerpt: "Small workflow changes — batching conversions, naming conventions, compression before sharing — add up fast.",
    topic: "Tools",
    date: "2026-04-28",
    readTime: "4 min read",
    image: "/images/blog/pdf-tips.jpg",
    metaDescription: "Five small PDF workflow habits — batching, naming, compression — that save real time over a busy work week.",
    content: [
      "Most people only think about PDFs when something's gone wrong — a file's too big to email, a scan needs merging with a typed cover letter, a contract needs a quick page reorder. The fix is usually fast, but the friction of remembering how adds up.",
      "Habit one: compress before you send, not after someone complains it bounced. Habit two: adopt one consistent file-naming pattern (date-client-version) so you're never guessing which draft is current.",
      "Habit three: batch your conversions. If you're converting five receipts to PDF, do them in one sitting with one tool rather than reopening the task five separate times throughout the day.",
      "Habit four: merge before you organize, not after — it's much easier to reorder pages once everything's in a single file. Habit five: keep a 'scratch' folder for in-progress PDF edits so your downloads folder doesn't become an archaeology project.",
    ],
  },
  {
    slug: "evaluating-new-ai-features",
    title: "A Practical Framework for Evaluating New AI Features",
    excerpt: "Every week brings another model update or feature launch. Here's how to decide what's actually worth your attention.",
    topic: "AI",
    date: "2026-04-15",
    readTime: "6 min read",
    image: "/images/blog/ai-features.jpg",
    metaDescription: "A simple framework for cutting through AI feature-launch noise and deciding what's actually worth adopting.",
    content: [
      "The pace of AI feature announcements makes it tempting to either chase every update or tune all of them out. Neither is a great strategy. A better approach is a short filter you run new releases through.",
      "First: does this remove a step I currently do manually, or does it just do an existing step slightly faster? Removing steps tends to matter more than speeding up steps that weren't the bottleneck.",
      "Second: is this a capability I'd use weekly, or a neat demo I'd use once? Weekly-use features are worth the (small) learning cost; demo features rarely are.",
      "Third: what's the failure mode if it's wrong? Features that fail loudly (an obviously broken image) are safer to adopt early than features that fail quietly (a subtly wrong number in a spreadsheet).",
      "Running new features through these three questions cuts most of the noise without making you miss things that genuinely change your workflow.",
    ],
  },
  {
    slug: "file-organization-systems-that-stick",
    title: "File Organization Systems That Actually Stick",
    excerpt: "Most folder systems fail within a month. Here's what makes the rare ones survive.",
    topic: "Productivity",
    date: "2026-03-30",
    readTime: "5 min read",
    image: "/images/blog/file-organization.jpg",
    metaDescription: "Why most personal file organization systems collapse within weeks, and the few principles behind the ones that last.",
    content: [
      "Almost everyone has tried to build the 'perfect' folder system at some point, and almost everyone has abandoned it within a few weeks. The systems that survive tend to share a few unglamorous traits.",
      "They're shallow. Three folder levels deep is about the limit before people start dumping files at the top level out of friction. If finding the right folder takes longer than just searching, the system has already lost.",
      "They're named for retrieval, not creation. You file something the way your future self will look for it — by project or client, usually, not by file type.",
      "They have a designated 'inbox.' A single folder where new, unsorted files land until you process them, so organizing doesn't have to happen at the exact moment a file arrives.",
      "Finally, the systems that stick get revisited. Not redesigned — just glanced at every few months to archive what's stale. A system with zero maintenance eventually drifts into chaos no matter how good the original design was.",
    ],
  },
  {
    slug: "browser-based-tools-vs-desktop-software",
    title: "Why Browser-Based Tools Are Replacing Desktop Software",
    excerpt: "No installs, no updates to manage, works on any device — the case for the browser-first tool stack.",
    topic: "Tech",
    date: "2026-03-18",
    readTime: "4 min read",
    image: "/images/blog/browser-tools.jpg",
    metaDescription: "The practical reasons browser-based tools keep winning over installed desktop software for everyday tasks.",
    content: [
      "A decade ago, anything serious — photo editing, document conversion, even spreadsheets — meant installing dedicated software. That assumption has quietly flipped for a huge share of everyday tasks.",
      "The appeal isn't really about the browser itself; it's about what skipping installation removes. No version conflicts, no 'this only works on Windows,' no update prompts interrupting a task, no admin permissions needed on a work laptop.",
      "For occasional tasks — converting a file, resizing an image, merging a couple of PDFs — installing dedicated software for a five-minute job has always been a bad trade. Browser tools finally match that effort to that need.",
      "The tradeoff is real for heavy, repeated, professional workloads, where dedicated software still wins on power and offline reliability. But for the long tail of one-off file tasks most people actually have, browser-first has become the sensible default.",
    ],
  },
  {
    slug: "staying-current-without-burning-out",
    title: "Staying Current on Tech News Without Burning Out",
    excerpt: "The firehose of product launches and AI updates is real. Here's a sustainable way to keep up.",
    topic: "Productivity",
    date: "2026-02-22",
    readTime: "5 min read",
    image: "/images/blog/staying-current.jpg",
    metaDescription: "A sustainable approach to following tech and AI news without the constant low-grade anxiety of missing something.",
    content: [
      "There's a specific kind of fatigue that comes from trying to track every product launch, model update, and feature release across a dozen companies. It's not the volume alone — it's the sense that falling behind has real costs.",
      "One useful reframe: most updates don't need same-day attention. A weekly or biweekly batch-read of a couple of trusted sources catches nearly everything that matters, without the constant low-grade anxiety of an always-open feed.",
      "Another: separate 'interesting' from 'relevant to me.' Plenty of news is genuinely interesting without being something you need to act on. Reading it as entertainment rather than an obligation changes how draining it feels.",
      "Finally, accept that you will miss things, and that's fine. The cost of missing a minor update is almost always smaller than the cost of the anxiety of trying not to miss anything.",
    ],
  },
];
