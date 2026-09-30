import { posts } from "../../data/portfolio";
import Section from "../layout/Section";

export default function Blog() {
  return (
    <Section id="blog" title="Blogs">
      <div className="space-y-6">
        {posts.map((p) => (
          <a key={p.title} href={p.url} className="group block">
            <h3 className="text-lg font-semibold group-hover:underline">{p.title}</h3>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted">
              <span>{p.date}</span>
              {p.tags.map((t) => <span key={t} className="rounded-md border border-line px-2 py-0.5 text-xs">{t}</span>)}
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
}
