import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import MergePdfPage from "./pages/MergePdfPage.jsx";
import AllToolsPage from "./pages/AllToolsPage.jsx";
import HighlyUsedToolsPage from "./pages/HighlyUsedToolsPage.jsx";
import AboutUsPage from "./pages/AboutUsPage.jsx";
import BlogsPage from "./pages/BlogsPage.jsx";
import BlogPostPage from "./pages/BlogPostPage.jsx";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage.jsx";
import TermsOfUsePage from "./pages/TermsOfUsePage.jsx";
import DisclaimerPage from "./pages/DisclaimerPage.jsx";
import ContactUsPage from "./pages/ContactUsPage.jsx";

export default function App() {
  const [dark, setDark] = useState(false);

  // Toggle the `dark` class on <html> so the CSS-variable palette switches.
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="min-h-screen bg-cream text-ink">
      <Navbar dark={dark} onToggleTheme={() => setDark((d) => !d)} />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/all-tools" element={<AllToolsPage />} />
          <Route path="/highly-used-tools" element={<HighlyUsedToolsPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-use" element={<TermsOfUsePage />} />
          <Route path="/disclaimer" element={<DisclaimerPage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route path="/merge-pdf" element={<MergePdfPage />} />

          {/*
            TODO: add one Route per remaining tool as its page is built, e.g.:
            <Route path="/compress-pdf" element={<CompressPdfPage />} />
            <Route path="/split-pdf" element={<SplitPdfPage />} />
            <Route path="/pdf-to-word" element={<PdfToWordPage />} />
            ...

            Until a page exists, ToolCard links to that path will 404 —
            consider adding a catch-all "/*" NotFoundPage route too.
          */}
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
