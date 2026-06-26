// ============================================================
// Central content + icon registry for the homepage.
// Icons use lucide-react as placeholders — swap any `icon`
// for your own SVG/image component without touching the layout.
// ============================================================
import {
  FileText, Image as ImageIcon, Code2, BookOpen, Music, Video,
  LayoutGrid, Download, Minimize2, Combine, Split, FileImage,
  Gift, Zap, Shield, Globe, RotateCw, Unlock, ShieldCheck,
  Droplets, Crop, Grid3x3, FileSpreadsheet, Code, Heart, Sparkles,
} from "lucide-react";

export const NAV_LINKS = ["All Tools", "Highly Used Tools", "About Us", "Blogs", "Privacy Policy"];
export const NAV_DROPDOWNS = ["All Tools", "Highly Used Tools"];

export const HERO_BADGES = ["100% Free", "No Sign Up", "Secure & Private"];

export const FEATURE_CHIPS = [
  { label: "Easy to Use", icon: Heart },
  { label: "No Installation", icon: ShieldCheck },
  { label: "Unlimited Access", icon: Sparkles },
  { label: "100% Secure", icon: Shield },
];

export const CATEGORIES = [
  { icon: FileText, color: "#EE4B3C", tint: "#FDE9E6", title: "PDF Converter", desc: "Convert PDF to Word, Excel, PPT, JPG and more." },
  { icon: ImageIcon, color: "#27AE60", tint: "#E4F5EC", title: "Image Converter", desc: "Convert images to and from different formats." },
  { icon: Code2, color: "#7B61FF", tint: "#ECE7FF", title: "Developer Tools", desc: "Format, encode, decode and minify code." },
  { icon: BookOpen, color: "#F2994A", tint: "#FCEEDD", title: "Publisher Tools", desc: "Helpful tools for writers, publishers and content creators." },
  { icon: Music, color: "#EC4899", tint: "#FCE4EF", title: "YouTube to MP3", desc: "Convert YouTube videos to high quality MP3 files." },
  { icon: Video, color: "#3B82F6", tint: "#E5EEFC", title: "Video Downloader", desc: "Download videos from YouTube, Pinterest and more." },
  { icon: Download, color: "#E60023", tint: "#FDE6E9", title: "Pinterest Downloader", desc: "Download Pinterest videos, images and GIFs." },
  { icon: LayoutGrid, color: "#F2C94C", tint: "#FCF4DA", title: "All Tools", desc: "Browse all our 200+ free tools in one place." },
];

export const HIGHLY_USED = [
  { icon: FileText, color: "#EE4B3C", title: "PDF to Word" },
  { icon: ImageIcon, color: "#27AE60", title: "Image to PDF" },
  { icon: Minimize2, color: "#3B82F6", title: "Compress PDF" },
  { icon: Combine, color: "#F2994A", title: "Merge PDF" },
  { icon: Split, color: "#7B61FF", title: "Split PDF" },
  { icon: FileImage, color: "#EC4899", title: "PDF to JPG" },
];

export const BENEFITS = [
  { icon: Gift, title: "100% Free", desc: "All tools are completely free to use." },
  { icon: Zap, title: "Fast & Easy", desc: "Get results in seconds with our optimized tools." },
  { icon: Shield, title: "Secure & Private", desc: "Your files are safe and automatically deleted." },
  { icon: Globe, title: "Works Anywhere", desc: "Use our tools on any device, anytime, anywhere." },
];

export const MORE_TOOLS = [
  { icon: RotateCw, color: "#EE4B3C", tint: "#FDE9E6", title: "Rotate PDF", desc: "Rotate pages of your PDF file." },
  { icon: Unlock, color: "#3B82F6", tint: "#E5EEFC", title: "Unlock PDF", desc: "Remove password from secured PDF." },
  { icon: ShieldCheck, color: "#27AE60", tint: "#E4F5EC", title: "Protect PDF", desc: "Add password protection to PDF file." },
  { icon: Droplets, color: "#EC4899", tint: "#FCE4EF", title: "Watermark PDF", desc: "Add text or image watermark to PDF." },
  { icon: Crop, color: "#F2994A", tint: "#FCEEDD", title: "Crop PDF", desc: "Crop pages of your PDF file." },
  { icon: Grid3x3, color: "#7B61FF", tint: "#ECE7FF", title: "Organize PDF", desc: "Reorder, add or remove pages in PDF." },
  { icon: FileSpreadsheet, color: "#27AE60", tint: "#E4F5EC", title: "PDF to Excel", desc: "Extract tables from PDF to Excel." },
  { icon: Code, color: "#EE4B3C", tint: "#FDE9E6", title: "HTML to PDF", desc: "Convert web pages to PDF." },
];

export const WHAT_CHECKS = [
  "200+ Tools for PDF, Image, Video & More",
  "No sign up or installation required",
  "Files are automatically deleted after processing",
  "Regularly updated with new tools",
];

export const FOOTER_COLS = [
  { head: "Quick Links", items: ["All Tools", "Highly Used Tools", "About Us", "Blogs"] },
  { head: "Legal", items: ["Privacy Policy", "Terms of Use", "Disclaimer", "Contact Us"] },
  { head: "Popular Tools", items: ["PDF to Word", "Compress PDF", "Image to PDF", "YouTube to MP3"] },
];
