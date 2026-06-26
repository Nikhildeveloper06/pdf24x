// ============================================================
// Central content + icon registry for the homepage.
// Icons use lucide-react as placeholders — swap any `icon`
// for your own SVG/image component without touching the layout.
//
// `path` routes a card to its tool page.
// `category` tags a tool to one of the CATEGORIES titles, used by
// the All Tools page to group tools under category headings.
// `badge` on HIGHLY_USED is an illustrative ranking label (NOT a
// real usage stat — no fabricated numbers, since that would mislead
// visitors). Swap to real data once usage tracking exists.
// FOOTER_COLS items are { label, path } so footer links route
// correctly instead of using dead href="#" anchors.
//
// NOTE: "All Tools" was removed from NAV_LINKS since the navbar's
// "Explore All Tools" CTA button already covers that destination.
// ============================================================
import {
  FileText, Image as ImageIcon, Code2, BookOpen, Music, Video,
  LayoutGrid, Download, Minimize2, Combine, Split, FileImage,
  Gift, Zap, Shield, Globe, RotateCw, Unlock, ShieldCheck,
  Droplets, Crop, Grid3x3, FileSpreadsheet, Code, Heart, Sparkles,
} from "lucide-react";

export const NAV_LINKS = [
  { label: "Highly Used Tools", path: "/highly-used-tools" },
  { label: "About Us", path: "/about" },
  { label: "Blogs", path: "/blogs" },
  { label: "Privacy Policy", path: "/privacy-policy" },
];
export const NAV_DROPDOWNS = ["Highly Used Tools"];

export const HERO_BADGES = ["100% Free", "No Sign Up", "Secure & Private"];

export const FEATURE_CHIPS = [
  { label: "Easy to Use", icon: Heart },
  { label: "No Installation", icon: ShieldCheck },
  { label: "Unlimited Access", icon: Sparkles },
  { label: "100% Secure", icon: Shield },
];

export const CATEGORIES = [
  { icon: FileText, color: "#EE4B3C", tint: "#FDE9E6", title: "PDF Converter", desc: "Convert PDF to Word, Excel, PPT, JPG and more.", path: "/all-tools#pdf-converter" },
  { icon: ImageIcon, color: "#27AE60", tint: "#E4F5EC", title: "Image Converter", desc: "Convert images to and from different formats.", path: "/all-tools#image-converter" },
  { icon: Code2, color: "#7B61FF", tint: "#ECE7FF", title: "Developer Tools", desc: "Format, encode, decode and minify code.", path: "/all-tools#developer-tools" },
  { icon: BookOpen, color: "#F2994A", tint: "#FCEEDD", title: "Publisher Tools", desc: "Helpful tools for writers, publishers and content creators.", path: "/all-tools#publisher-tools" },
  { icon: Music, color: "#EC4899", tint: "#FCE4EF", title: "YouTube to MP3", desc: "Convert YouTube videos to high quality MP3 files.", path: "/all-tools#youtube-to-mp3" },
  { icon: Video, color: "#3B82F6", tint: "#E5EEFC", title: "Video Downloader", desc: "Download videos from YouTube, Pinterest and more.", path: "/all-tools#video-downloader" },
  { icon: Download, color: "#E60023", tint: "#FDE6E9", title: "Pinterest Downloader", desc: "Download Pinterest videos, images and GIFs.", path: "/all-tools#pinterest-downloader" },
  { icon: LayoutGrid, color: "#F2C94C", tint: "#FCF4DA", title: "All Tools", desc: "Browse all our 200+ free tools in one place.", path: "/all-tools" },
];

export const HIGHLY_USED = [
  { icon: FileText, color: "#EE4B3C", tint: "#FDE9E6", title: "PDF to Word", desc: "Turn PDFs into fully editable Word documents.", path: "/pdf-to-word", category: "PDF Converter", badge: "#1 Pick" },
  { icon: ImageIcon, color: "#27AE60", tint: "#E4F5EC", title: "Image to PDF", desc: "Combine JPG, PNG or HEIC images into one PDF.", path: "/image-to-pdf", category: "Image Converter", badge: "Trending" },
  { icon: Minimize2, color: "#3B82F6", tint: "#E5EEFC", title: "Compress PDF", desc: "Shrink file size without losing quality.", path: "/compress-pdf", category: "PDF Converter", badge: "Most Popular" },
  { icon: Combine, color: "#F2994A", tint: "#FCEEDD", title: "Merge PDF", desc: "Combine multiple PDFs into a single file.", path: "/merge-pdf", category: "PDF Converter", badge: "Editor's Pick" },
  { icon: Split, color: "#7B61FF", tint: "#ECE7FF", title: "Split PDF", desc: "Pull specific pages out into new PDFs.", path: "/split-pdf", category: "PDF Converter", badge: "Trending" },
  { icon: FileImage, color: "#EC4899", tint: "#FCE4EF", title: "PDF to JPG", desc: "Export every page as a high-quality image.", path: "/pdf-to-jpg", category: "PDF Converter", badge: "Most Popular" },
];

export const BENEFITS = [
  { icon: Gift, title: "100% Free", desc: "All tools are completely free to use." },
  { icon: Zap, title: "Fast & Easy", desc: "Get results in seconds with our optimized tools." },
  { icon: Shield, title: "Secure & Private", desc: "Your files are safe and automatically deleted." },
  { icon: Globe, title: "Works Anywhere", desc: "Use our tools on any device, anytime, anywhere." },
];

export const MORE_TOOLS = [
  { icon: RotateCw, color: "#EE4B3C", tint: "#FDE9E6", title: "Rotate PDF", desc: "Rotate pages of your PDF file.", path: "/rotate-pdf", category: "PDF Converter" },
  { icon: Unlock, color: "#3B82F6", tint: "#E5EEFC", title: "Unlock PDF", desc: "Remove password from secured PDF.", path: "/unlock-pdf", category: "PDF Converter" },
  { icon: ShieldCheck, color: "#27AE60", tint: "#E4F5EC", title: "Protect PDF", desc: "Add password protection to PDF file.", path: "/protect-pdf", category: "PDF Converter" },
  { icon: Droplets, color: "#EC4899", tint: "#FCE4EF", title: "Watermark PDF", desc: "Add text or image watermark to PDF.", path: "/watermark-pdf", category: "PDF Converter" },
  { icon: Crop, color: "#F2994A", tint: "#FCEEDD", title: "Crop PDF", desc: "Crop pages of your PDF file.", path: "/crop-pdf", category: "PDF Converter" },
  { icon: Grid3x3, color: "#7B61FF", tint: "#ECE7FF", title: "Organize PDF", desc: "Reorder, add or remove pages in PDF.", path: "/organize-pdf", category: "PDF Converter" },
  { icon: FileSpreadsheet, color: "#27AE60", tint: "#E4F5EC", title: "PDF to Excel", desc: "Extract tables from PDF to Excel.", path: "/pdf-to-excel", category: "PDF Converter" },
  { icon: Code, color: "#EE4B3C", tint: "#FDE9E6", title: "HTML to PDF", desc: "Convert web pages to PDF.", path: "/html-to-pdf", category: "PDF Converter" },
];

export const WHAT_CHECKS = [
  "200+ Tools for PDF, Image, Video & More",
  "No sign up or installation required",
  "Files are automatically deleted after processing",
  "Regularly updated with new tools",
];

export const FOOTER_COLS = [
  {
    head: "Quick Links",
    items: [
      { label: "All Tools", path: "/all-tools" },
      { label: "Highly Used Tools", path: "/highly-used-tools" },
      { label: "About Us", path: "/about" },
      { label: "Blogs", path: "/blogs" },
    ],
  },
  {
    head: "Legal",
    items: [
      { label: "Privacy Policy", path: "/privacy-policy" },
      { label: "Terms of Use", path: "/terms-of-use" },
      { label: "Disclaimer", path: "/disclaimer" },
      { label: "Contact Us", path: "/contact-us" },
    ],
  },
  {
    head: "Popular Tools",
    items: [
      { label: "PDF to Word", path: "/pdf-to-word" },
      { label: "Compress PDF", path: "/compress-pdf" },
      { label: "Image to PDF", path: "/image-to-pdf" },
      { label: "YouTube to MP3", path: "/youtube-to-mp3" },
    ],
  },
];
