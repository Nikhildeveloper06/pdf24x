import SectionTitle from "./ui/SectionTitle.jsx";
import ToolCard from "./ui/ToolCard.jsx";
import { MORE_TOOLS } from "../data/tools.jsx";

export default function MoreTools() {
  return (
    <section>
      <SectionTitle emoji="🧰" title="More Tools to Explore" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
        {MORE_TOOLS.map((c) => (
          <ToolCard key={c.title} {...c} link="Use Tool" />
        ))}
      </div>
    </section>
  );
}
