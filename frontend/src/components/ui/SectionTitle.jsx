export default function SectionTitle({ emoji, title }) {
  return (
    <div className="mb-5 mt-12">
      <h2 className="flex items-center gap-2 text-xl font-extrabold text-ink sm:text-2xl">
        <span aria-hidden>{emoji}</span> {title}
      </h2>
    </div>
  );
}
