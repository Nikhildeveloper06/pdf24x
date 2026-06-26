import SectionTitle from "./ui/SectionTitle.jsx";
import ToolCard from "./ui/ToolCard.jsx";
import { CATEGORIES } from "../data/tools.jsx";

export default function CategorySection() {
  return (
    <section>
      <SectionTitle emoji="🗂️" title="Explore by Category" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
        {CATEGORIES.map((c) => (
          <ToolCard key={c.title} {...c} link="Explore Tools" />
        ))}
      </div>
    </section>
  );
}
